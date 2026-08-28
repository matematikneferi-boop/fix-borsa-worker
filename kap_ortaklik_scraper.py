#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
KAP Ortaklık Haritası — veri toplama hattı
============================================

Ne yapar
--------
BIST'te işlem gören her şirket için:
  1) Yönetim Kurulu + Üst Yönetim listesini KAP'ın "Şirket Genel Bilgileri"
     sayfasından (server-rendered HTML) çeker.
  2) Ortaklık yapısını (ortak adı + pay oranı) genel kurul bilgilendirme
     dokümanı / faaliyet raporu PDF'lerinden çıkarmaya çalışır (KAP'ta bu
     veri için temiz bir JSON uç noktası YOK — tek gerçek kaynak PDF'ler).
  3) İsim bazlı ters-indeks kurar: "AHMET YILMAZ" -> [{ticker, rol, pay}, ...]
  4) 4 modüllük ortaklık taraması filtrelerini üretir.

Çıktı: ortaklik_haritasi.json — worker'daki KV'ye (VERI) bu JSON'u
"ortaklikHaritasi" anahtarıyla yazman yeterli (bkz. dosya sonundaki
push_to_worker() — kendi push mekanizmana göre uçlarını doldur).

DÜRÜST NOTLAR (gerçek kısıtlar, gizlenmedi)
--------------------------------------------
- Yönetim kurulu / üst yönetim tablo yapısı 2026-05-28 tarihli canlı
  bir keşifle doğrulandı (bkz. aşağıdaki yorum). KAP zaman zaman HTML/CSS
  sınıflarını değiştirebilir — TABLO_BASLIK_ANAHTARI eşleşmesi bunun için
  esnek tutuldu (class ismine değil, <th> METNİNE göre eşleşiyor).
- Ortaklık yapısı (pay oranı) tablosu için KAP'ta doğrulanmış tek bir
  sabit format YOK. Şirketten şirkete, dönemden döneme format değişiyor.
  Bu yüzden extract_ortaklik_from_pdf() olabildiğince genel bir regex/tablo
  arama stratejisi kullanıyor ve bulamadığı şirketleri "eksik" olarak
  işaretliyor — UYDURMA VERİ ÜRETMİYOR. Gerçek kullanımdan önce çıktıyı
  örnekleyip (ör. 20 şirket) elle doğrulaman şiddetle önerilir.
- Rate limit: KAP WAF'ı saniyede ~2 istekten fazlasında bağlantıyı
  düşürebiliyor. Varsayılan: 2 istek/sn, jitter'lı.
- Bu betik network gerektirir; senin ortamında (tara.py'nin çalıştığı
  yerde) çalıştırılmalı. Bu sohbetin sandbox'ında internet KAPALI,
  bu yüzden buradan test edilemedi — canlı ortamda ilk çalıştırmayı
  küçük bir örneklemle (ör. 10 şirket) yapıp çıktıyı gözden geçir.
"""

import json
import os
import re
import signal
import struct
import time
import unicodedata
from dataclasses import dataclass, field, asdict
from datetime import date, timedelta
from typing import Optional

import httpx
from bs4 import BeautifulSoup
import contextlib


class ZamanAsimi(Exception):
    """zaman_siniri() bloğu süresini aşınca fırlatılır."""
    pass


def _alarm_isleyici(signum, frame):
    raise ZamanAsimi()


@contextlib.contextmanager
def zaman_siniri(saniye: int):
    """GERÇEK zorlayıcı üst süre — sinyal tabanlı (SIGALRM), sadece
    Unix'te çalışır (GitHub Actions Linux runner'ları için yeterli).

    NEDEN GEREKLİ: httpx'in timeout=20.0 ayarı sadece AĞ seviyesinde işliyor.
    Gerçek çalıştırmada script >1 saat hiçbir ilerleme kaydetmeden takılı
    kaldı — muhtemelen KAP'ın döndürdüğü Excel dosyasını openpyxl'in
    ayrıştırması (CPU-bound, ağ değil) beklenenden çok yavaş/patolojik bir
    durumda kaldı. httpx timeout'u bunu YAKALAYAMAZ çünkü ağ isteği çoktan
    bitmiş, sorun yerel işlemde. SIGALRM ise ne olursa olsun (ağ, CPU-bound
    parse, sonsuz döngü) süre dolunca ZamanAsimi fırlatarak bloğu keser."""
    eski = signal.signal(signal.SIGALRM, _alarm_isleyici)
    signal.alarm(saniye)
    try:
        yield
    finally:
        signal.alarm(0)
        signal.signal(signal.SIGALRM, eski)

BASE = "https://www.kap.org.tr"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
RATE_LIMIT_SEC = 1.2  # ~0.8 istek/sn — 0.5sn (2/sn) gerçek çalıştırmada WAF'ı tetikleyip
                       # "Server disconnected" hatasına yol açtığı görüldü, yavaşlatıldı
PDF_MAX_SAYFA = 40     # Bir PDF'te bu sayfadan sonrası taranmaz — ortaklık yapısı
                       # tablosu neredeyse hep dokümanın başında olur; 300 sayfalık
                       # faaliyet raporlarında saatlerce takılmayı önler
PDF_MAX_SANIYE = 25    # Bir PDF'in işlenmesine tanınan üst süre (sn)
MAX_TOPLAM_SANIYE = 5 * 3600  # Toplam tarama bütçesi (5 saat) — GH Actions'ın
                               # 6 saatlik iş sınırına çarpıp HİÇBİR ŞEY
                               # kaydedilmemesindense, süre dolunca kalan
                               # şirketler atlanıp o ana kadarki veri yazılır


# ───────────────────────── yardımcılar ─────────────────────────

def normalize_isim(s: str) -> str:
    """İsim eşleştirme anahtarı: büyük/küçük harf, Türkçe İ/ı/i/I karmaşası,
    fazladan boşluk, unvan ekleri (A.Ş., Ltd. vb. TÜZEL kişiler ayrı tutulur)
    dahil hepsini normalize eder. GÖRÜNEN isim ayrı saklanır, bu sadece
    eşleştirme anahtarıdır — 'aynı isim hiç yoktur' talimatına göre yalnız
    TAM normalize eşleşme aynı kişi sayılır, kısmi/benzer isim asla
    birleştirilmez."""
    if not s:
        return ""
    s = s.strip()
    # Türkçe büyütme kuralı: i -> İ, ı -> I (Python'un varsayılan upper()'ı
    # bunu yanlış yapar, o yüzden elle çeviriyoruz)
    ceviri = str.maketrans({"i": "İ", "ı": "I", "ğ": "Ğ", "ü": "Ü", "ş": "Ş", "ö": "Ö", "ç": "Ç"})
    s = s.translate(ceviri).upper()
    s = unicodedata.normalize("NFC", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def parse_tr_yuzde(s: str) -> Optional[float]:
    """'% 19,10' / '19,10' / '%19.10' -> 19.10 (float, yüzde biriminde)."""
    if not s:
        return None
    s = s.replace("%", "").strip()
    s = s.replace(".", "").replace(",", ".") if "," in s else s
    try:
        return float(s)
    except ValueError:
        return None


def extract_pdf_from_java_bytes(raw: bytes) -> Optional[bytes]:
    """KAP'ın /tr/api/file/download/{objId} uç noktası PDF'i çıplak değil,
    Java'nın byte[] serialization formatıyla sarmalanmış döndürüyor.
    Gerçek PDF baytlarını bu sarmalayıcıdan çıkarır."""
    try:
        idx = raw.index(b"\x78\x70", 10)
        arr_len = struct.unpack(">I", raw[idx + 2: idx + 6])[0]
        return raw[idx + 6: idx + 6 + arr_len]
    except Exception:
        return None


# ───────────────────────── veri sınıfları ─────────────────────────

@dataclass
class YonetimUyesi:
    isim: str
    gorev: str
    bagimsiz: Optional[bool] = None
    ilk_secilme: Optional[str] = None


@dataclass
class OrtaklikKalemi:
    isim: str
    pay_yuzde: Optional[float]
    tuzel_mi: bool
    kaynak: str  # "genel_sayfa" | "pdf:{disclosureIndex}"


@dataclass
class SirketKarti:
    ticker: str
    unvan: str
    mkk_member_oid: str = ""
    perma_link: str = ""
    yonetim_kurulu: list = field(default_factory=list)      # list[YonetimUyesi]
    ust_yonetim: list = field(default_factory=list)          # list[YonetimUyesi]
    ortaklik_yapisi: list = field(default_factory=list)      # list[OrtaklikKalemi]
    halka_aciklik_tahmini: Optional[float] = None            # 100 - bilinen ortak paylari
    veri_eksik: list = field(default_factory=list)           # hangi kısımlar bulunamadı


# ───────────────────────── KAP istemcisi ─────────────────────────

class KapIstemci:
    def __init__(self):
        self.c = httpx.Client(
            base_url=BASE,
            headers={"User-Agent": UA, "Accept": "*/*", "Accept-Language": "tr"},
            timeout=20.0,
            follow_redirects=True,
        )
        self._son_istek = 0.0
        self._ardarda_hata = 0
        # Oturum ısıtma — WAF'ın timeout ile bağlantı kesmesini azalttığı
        # gözlemlendi (bkz. recon notları).
        try:
            self.c.get("/tr/bildirim-sorgu")
        except Exception:
            pass

    def _bekle(self):
        gecen = time.time() - self._son_istek
        if gecen < RATE_LIMIT_SEC:
            time.sleep(RATE_LIMIT_SEC - gecen)
        self._son_istek = time.time()

    def _istek(self, method: str, yol: str, **kwargs):
        """TÜM HTTP isteklerinin geçtiği tek nokta. GERÇEK ÇALIŞTIRMADA GÖRÜLEN
        SORUN: KAP'ın WAF'ı art arda istekleri belirli bir noktadan sonra
        'Server disconnected without sending a response' ile kesiyor —
        eskiden bu hata tek şirketi tamamen iptal ediyordu (784 şirketin
        neredeyse tamamı boş dönüyordu). Şimdi:
          1) Bağlantı hatalarında (disconnect/timeout/reset) artan bekleme
             süreleriyle (2sn, 5sn, 12sn) 3 kez tekrar deniyor.
          2) Art arda çok sayıda istek başarısız olursa (WAF geçici blok
             koymuş olabilir) çok daha uzun bir soğuma (60sn) uygulayıp
             devam ediyor — taramayı komple bırakmak yerine yavaşlayarak
             tamamlamayı deniyor."""
        gecikmeler = [2, 5, 12]
        for deneme, gecikme in enumerate([0] + gecikmeler):
            if gecikme:
                time.sleep(gecikme)
            self._bekle()
            try:
                r = self.c.request(method, yol, **kwargs)
                self._ardarda_hata = 0
                return r
            except (httpx.RemoteProtocolError, httpx.ConnectError, httpx.ConnectTimeout,
                    httpx.ReadTimeout, httpx.ReadError, httpx.PoolTimeout) as e:
                if deneme == len(gecikmeler):
                    self._ardarda_hata += 1
                    if self._ardarda_hata >= 5:
                        print(f"  ⏳ {self._ardarda_hata} istek üst üste koptu — WAF geçici blok koymuş olabilir, 60sn soğuyoruz…")
                        time.sleep(60)
                        self._ardarda_hata = 0
                    raise
                continue

    def sirket_listesi(self) -> list:
        """Tüm BIST-kotalı şirketler.

        DÜZELTME (kritik): Eskiden '/tr/api/company/items/IGS/A' kullanılıyordu.
        Bu uç KAP'ın arama kutusu (autocomplete) için var — TÜM şirketleri değil,
        SINIRLI/kısmi bir sonuç kümesi döndürüyor. Gerçek taramada 700+ olması
        gereken BIST evreni bu yüzden 137'ye düşüyordu; PDF/fon iyileştirmeleri
        bir işe yaramıyordu çünkü daha ilk adımda şirketlerin çoğu listeye hiç
        girmiyordu.
        KAP'ın kendi 'BIST Şirketleri' sayfasının (kap.org.tr/tr/bist-sirketler)
        kullandığı GERÇEK tam liste kaynağı bir Excel dışa aktarma uç noktası —
        onu kullanıyoruz. JSON uç noktası ağ hatası/format değişikliği gibi bir
        sebeple çalışmazsa eski uca düşülüyor (hiç veri dönmemesindense eksik
        de olsa veri dönsün), ama bu durum konsola açıkça yazılıyor."""
        self._bekle()
        try:
            with zaman_siniri(90):  # ağ + pandas/openpyxl ayrıştırma dahil TÜM adım
                r = self._istek("GET", "/tr/api/company/generic/excel/IGS/A")
                r.raise_for_status()
                import pandas as pd
                import io
                df = pd.read_excel(io.BytesIO(r.content))
                sonuc = []
                for _, row in df.iterrows():
                    if len(row) < 2:
                        continue
                    ticker = str(row.iloc[0]).strip() if pd.notna(row.iloc[0]) else ""
                    unvan = str(row.iloc[1]).strip() if pd.notna(row.iloc[1]) else ""
                    if not ticker or ticker.lower() == "nan":
                        continue
                    sonuc.append({"stockCode": ticker, "kapMemberTitle": unvan})
            if len(sonuc) < 200:
                # Beklenenden çok azsa (Excel formatı değişmiş olabilir) bunu
                # sessizce kabul etme — açıkça uyar ve eski uca düş.
                print(f"⚠️ Excel'den sadece {len(sonuc)} şirket geldi (beklenen 500+), eski JSON uca düşülüyor…")
                raise RuntimeError("excel_beklenenden_az")
            return sonuc
        except Exception as e:
            print(f"⚠️ Excel tam liste alınamadı ({e}), yedek (sınırlı) JSON listeye düşülüyor…")
            r = self._istek("GET", "/tr/api/company/items/IGS/A")
            r.raise_for_status()
            return r.json()

    def member_filter(self, ticker: str) -> Optional[dict]:
        """ticker -> {companyCode, mkkMemberOid, title, permaLink}

        NOT: KAP bu uç için tek bir obje DEĞİL, bir LİSTE döndürüyor
        (ticker'la eşleşen/başlayan tüm şirketler). Eskiden kod bunun
        her zaman tek obje olduğunu varsayıyordu ve listeye .get()
        çağırınca 'list' object has no attribute 'get' hatası veriyordu.
        Şimdi listeden companyCode'u tam eşleşen kaydı seçiyoruz."""
        try:
            r = self._istek("GET", f"/tr/api/member/filter/{ticker}", headers={
                "Referer": f"{BASE}/tr/bist-sirketler"
            })
        except Exception:
            return None
        if r.status_code != 200:
            return None
        try:
            veri = r.json()
        except Exception:
            return None
        if isinstance(veri, list):
            for kayit in veri:
                if isinstance(kayit, dict) and str(kayit.get("companyCode", "")).upper() == ticker.upper():
                    return kayit
            # tam eşleşme yoksa ilk kaydı dene (yine de dict olduğundan emin ol)
            return veri[0] if veri and isinstance(veri[0], dict) else None
        if isinstance(veri, dict):
            return veri
        return None

    def genel_sayfa_html(self, perma_link: str) -> Optional[str]:
        try:
            r = self._istek("GET", f"/tr/sirket-bilgileri/genel/{perma_link}")
        except Exception:
            return None
        if r.status_code != 200:
            return None
        return r.text

    def disclosure_ara(self, mkk_member_oid: str, gun_geriye: int = 730) -> list:
        """Şirketin son N gündeki bildirimleri (genel kurul / ortaklık yapısı
        dokümanlarını bulmak için). 7 günlük pencerelerle geriye tarar
        (byCriteria 2000 sonuçla sınırlı, tek şirket için sorun olmaz ama
        yine de pencereli gidiyoruz)."""
        sonuclar = []
        bugun = date.today()
        pencere = timedelta(days=180)
        bitis = bugun
        toplam_gun = 0
        while toplam_gun < gun_geriye:
            baslangic = bitis - pencere
            try:
                r = self._istek(
                    "POST", "/tr/api/disclosure/members/byCriteria",
                    json={
                        "fromDate": baslangic.isoformat(),
                        "toDate": bitis.isoformat(),
                        "mkkMemberOidList": [mkk_member_oid],
                        "subjectList": [],
                    },
                    headers={"Referer": f"{BASE}/tr/bildirim-sorgu"},
                )
                if r.status_code == 200:
                    try:
                        sonuclar.extend(r.json())
                    except Exception:
                        pass
            except Exception:
                pass  # bu pencere kayboldu, diğer pencerelerle devam
            bitis = baslangic - timedelta(days=1)
            toplam_gun += pencere.days
        return sonuclar

    def disclosure_detay(self, disclosure_index: int) -> Optional[dict]:
        try:
            r = self._istek(
                "GET", f"/tr/api/notification/attachment-detail/{disclosure_index}",
                headers={"Referer": f"{BASE}/tr/Bildirim/{disclosure_index}"},
            )
        except Exception:
            return None
        if r.status_code != 200:
            return None
        try:
            arr = r.json()
            return arr[0] if arr else None
        except Exception:
            return None

    def pdf_indir(self, obj_id: str) -> Optional[bytes]:
        try:
            r = self._istek("GET", f"/tr/api/file/download/{obj_id}")
        except Exception:
            return None
        if r.status_code != 200:
            return None
        return extract_pdf_from_java_bytes(r.content)


# ───────────────────────── parse fonksiyonları ─────────────────────────

def parse_yonetim_ve_ust_yonetim(html: str) -> tuple:
    """Genel sayfa HTML'inden yönetim kurulu (17 sütun) ve üst yönetim
    (5 sütun) tablolarını ayıklar. Tablo class'larına değil, <th> METNİNE
    göre eşleşir — KAP class isimlerini değiştirse bile kırılmasın diye."""
    soup = BeautifulSoup(html, "html.parser")
    yonetim, ust_yon = [], []

    for tablo in soup.find_all("table"):
        basliklar = [th.get_text(strip=True) for th in tablo.find_all("th")]
        if not basliklar:
            continue
        baslik_metni = " ".join(basliklar)

        satirlar = tablo.find_all("tr")[1:]  # ilk satır başlık

        if "Bağımsız Yönetim Kurulu Üyesi Olup Olmadığı" in baslik_metni:
            # 17 sütunlu yönetim kurulu tablosu
            for tr in satirlar:
                td = [c.get_text(strip=True) for c in tr.find_all("td")]
                if len(td) < 13 or not td[0]:
                    continue
                bagimsiz = None
                if len(td) > 12:
                    if "Değil" in td[12]:
                        bagimsiz = False
                    elif "Bağımsız" in td[12]:
                        bagimsiz = True
                yonetim.append(YonetimUyesi(
                    isim=td[0],
                    gorev=td[3] if len(td) > 3 else "",
                    ilk_secilme=td[5] if len(td) > 5 else None,
                    bagimsiz=bagimsiz,
                ))
        elif basliklar and basliklar[0] == "Adı-Soyadı" and len(basliklar) <= 6:
            # 5 sütunlu üst yönetim (yöneticiler) tablosu
            for tr in satirlar:
                td = [c.get_text(strip=True) for c in tr.find_all("td")]
                if len(td) < 2 or not td[0]:
                    continue
                ust_yon.append(YonetimUyesi(isim=td[0], gorev=td[1]))

    return yonetim, ust_yon


ORTAKLIK_BASLIK_ANAHTARLARI = [
    "Ortağın Ticaret Unvanı", "Ortağın Adı Soyadı", "Ortak Adı",
    "Pay Sahibinin Ünvanı/Adı Soyadı", "Pay Sahibi", "Ortağın Unvanı",
    "Ortak", "Hissedar", "Adı Soyadı/Ticaret Unvanı", "Pay Sahibinin Adı",
]
PAY_BASLIK_ANAHTARLARI = [
    "Sermayedeki Payı", "Sermaye Payı", "Pay Oranı (%)", "Oy Hakkı Oranı",
    "Sermaye Payı (%)", "Pay Oranı", "Payı (%)", "%",
]

# Tüzel kişi / fon / kurum tespiti — hem PDF metninden hem tablodan gelen
# isimlerde ortak kullanılır. Sadece A.Ş./LTD değil, portföy yönetimi
# fonları, emeklilik/sigorta şirketleri, vakıflar, bankalar da tüzel kişi
# sayılır — 'bütün fonların çıkması' talebi için genişletildi.
ISTISNA_DESENI = re.compile(
    r"^(TOPLAM|GENEL TOPLAM|DİĞER|HALKA AÇIK|HALKA AÇIK KISIM|HALKA AÇIK OLAN|SERMAYE|TAHSISLI)\b",
    re.IGNORECASE,
)
TUZEL_DESENI = re.compile(
    r"A\.?Ş\.?|A\.?O\.?|LTD|LİMİTED|HOLDİNG|SANAYİ|TİCARET|\bFON\b|FONU\b|"
    r"PORTFÖY|PORTFOY|EMEKLİLİK|SİGORTA|VARLIK KİRALAMA|GİRİŞİM SERMAYESİ|"
    r"YATIRIM ORTAKLIĞI|YATIRIM FONU|VAKF?I|VAKIF|BANKASI|KOOPERATİF",
    re.IGNORECASE,
)


def _hucre_temizle(x) -> str:
    if x is None:
        return ""
    return re.sub(r"\s+", " ", str(x).replace("\n", " ")).strip()


def extract_ortaklik_from_pdf_tables(pdf) -> list:
    """pdfplumber'ın extract_tables() ile PDF içindeki GERÇEK tablo yapısını
    okur (satır/sütun korunur). Yönetim kurulu tablosu için kullanılan
    'sabit pozisyona değil BAŞLIK METNİNE göre eşleş' stratejisinin aynısı
    burada da uygulanıyor: ORTAKLIK_BASLIK_ANAHTARLARI / PAY_BASLIK_ANAHTARLARI
    ile başlık hücrelerini eşleştirip o sütunlardan okuyor. Bu, düz metin
    üzerinde regex tahmini yapan extract_ortaklik_from_pdf_text'ten çok daha
    güvenilir: karışık büyük/küçük harfli fon isimlerini, sayı/parantez
    içeren unvanları da doğru yakalar. Önce bu denenir, bulamazsa metin
    regex'ine düşülür (bkz. sirket_isle).

    GÜVENLİK SINIRI (kritik): Gerçek çalıştırmada script bir 'Faaliyet
    Raporu'nda (200-300 sayfa olabiliyor) SAATLERCE takılı kaldı — her
    sayfada extract_tables() çağırmak büyük PDF'lerde çok yavaş. Ortaklık
    yapısı tablosu KAP dokümanlarında hemen hemen HER ZAMAN ilk birkaç
    sayfada olduğundan, ilk PDF_MAX_SAYFA sayfadan sonrası taranmıyor;
    ayrıca PDF_MAX_SANIYE'yi aşarsa (yavaş/karmaşık sayfalar) erken çıkılıyor."""
    kalemler = []
    baslangic_t = time.monotonic()
    for i, sayfa in enumerate(pdf.pages):
        if i >= PDF_MAX_SAYFA:
            break
        if time.monotonic() - baslangic_t > PDF_MAX_SANIYE:
            break
        try:
            tablolar = sayfa.extract_tables()
        except Exception:
            continue
        for tablo in (tablolar or []):
            if not tablo or len(tablo) < 2:
                continue
            baslik = [_hucre_temizle(h) for h in tablo[0]]
            isim_col = pay_col = None
            for i, h in enumerate(baslik):
                hl = h.lower()
                if isim_col is None and any(k.lower() in hl for k in ORTAKLIK_BASLIK_ANAHTARLARI):
                    isim_col = i
                if pay_col is None and any(k.lower() in hl for k in PAY_BASLIK_ANAHTARLARI):
                    pay_col = i
            if isim_col is None or pay_col is None:
                continue
            for satir in tablo[1:]:
                if not satir or len(satir) <= max(isim_col, pay_col):
                    continue
                isim = _hucre_temizle(satir[isim_col])
                yuzde = parse_tr_yuzde(_hucre_temizle(satir[pay_col]))
                if not isim or yuzde is None or not (0 < yuzde <= 100):
                    continue
                # başlık satırı tekrar tabloya karışmışsa (bazı PDF'lerde olur) atla
                if isim.lower() in [k.lower() for k in ORTAKLIK_BASLIK_ANAHTARLARI]:
                    continue
                # 'Diğer', 'Halka Açık', 'Toplam' gibi özet satırları isim sayma
                if ISTISNA_DESENI.match(isim):
                    continue
                tuzel = bool(TUZEL_DESENI.search(isim))
                kalemler.append(OrtaklikKalemi(isim=isim, pay_yuzde=yuzde, tuzel_mi=tuzel, kaynak="pdf-tablo"))
    return kalemler


def extract_ortaklik_from_pdf_text(metin: str) -> list:
    """Tablo yapısı pdfplumber tarafından çıkarılamadığında (bazı PDF'ler
    tabloyu değil serbest metni andırır) düz metinden ortaklık yapısı
    satırlarını yakalamaya çalışır. KAP genel kurul bilgilendirme
    dokümanlarında tipik satır:
      'AHMET YILMAZ                    120.000.000        24,00'
    veya fon/kurum örneği:
      'ABC Portföy Yönetimi A.Ş. Değişken Fon    45.000.000    9,00'
    yani: İSİM (büyük/karışık harf) ... TUTAR ... YÜZDE. Artık sadece
    tamamen büyük harfli isimlerle sınırlı değil — karışık harf, rakam,
    parantez içeren fon/kurum unvanlarını da kabul ediyor.
    Bu bir best-effort regex'tir; şirket/dönem bazında format farklılaşabilir.
    Eşleşmeyen şirketler 'veri_eksik' listesine düşer, UYDURULMAZ."""
    kalemler = []
    satir_deseni = re.compile(
        r"^([A-Za-zÇĞİÖŞÜçğıöşü0-9][A-Za-zÇĞİÖŞÜçğıöşü0-9\.\s&/,()\-]{4,80}?)\s{2,}[\d.,]+\s+(?:TL\s+)?%?\s*([\d]{1,3}[.,]\d{1,2})\s*$",
        re.MULTILINE,
    )
    for satir in metin.splitlines():
        satir = satir.strip()
        m = satir_deseni.match(satir + " ")  # tek satır bazlı, gevşek eşleşme
        if m:
            isim = m.group(1).strip(" .")
            yuzde = parse_tr_yuzde(m.group(2))
            if isim and yuzde is not None and 0 < yuzde <= 100 and not ISTISNA_DESENI.match(isim):
                tuzel = bool(TUZEL_DESENI.search(isim))
                kalemler.append(OrtaklikKalemi(isim=isim, pay_yuzde=yuzde, tuzel_mi=tuzel, kaynak="pdf-metin"))
    return kalemler


# ───────────────────────── tek şirket işleme ─────────────────────────

def sirket_isle(kap: KapIstemci, ticker: str, unvan: str) -> SirketKarti:
    kart = SirketKarti(ticker=ticker, unvan=unvan)

    mf = kap.member_filter(ticker)
    if not mf:
        kart.veri_eksik.append("member_filter_basarisiz")
        return kart
    kart.mkk_member_oid = mf.get("mkkMemberOid", "")
    kart.perma_link = mf.get("permaLink", "")

    html = kap.genel_sayfa_html(kart.perma_link) if kart.perma_link else None
    if html:
        yonetim, ust_yon = parse_yonetim_ve_ust_yonetim(html)
        kart.yonetim_kurulu = yonetim
        kart.ust_yonetim = ust_yon
        if not yonetim:
            kart.veri_eksik.append("yonetim_kurulu_bulunamadi")
    else:
        kart.veri_eksik.append("genel_sayfa_erisilemedi")

    # Ortaklık yapısı: genel kurul bilgilendirme dokümanı / faaliyet raporu
    # ara. Konu (subject) alanına göre client-side filtre.
    if kart.mkk_member_oid:
        try:
            bildirimler = kap.disclosure_ara(kart.mkk_member_oid, gun_geriye=730)
        except Exception:
            bildirimler = []
        # Sadece "Genel Kurul" değil, ortaklık/sermaye yapısını içerebilecek
        # her bildirim türü aday sayılıyor — fonlar ve kurumsal ortaklar
        # genelde bu geniş listedeki dokümanlarda geçiyor (tek başlığa
        # güvenmek çoğu şirketi 'bulunamadı'ya düşürüyordu).
        # ÖNCELİK SIRASI ÖNEMLİ: 'Faaliyet Raporu' 200-300 sayfa olabilen en
        # yavaş/riskli doküman türü — gerçek çalıştırmada bunda saatlerce
        # takılı kalındı. Küçük/hedefli belgeler önce denenir, faaliyet
        # raporuna sadece hiçbiri işe yaramazsa başvurulur.
        ONCELIK_SIRASI = [
            "Ortaklık Yapısı", "Payların Oranı", "Sermaye Yapısı", "Pay Sahipliği",
            "Genel Kurul", "Kurumsal Yönetim", "Sermaye Artırımı", "İzahname",
            "Halka Arz", "Faaliyet Raporu",
        ]

        def _oncelik(b):
            konu = b.get("subject") or ""
            for i, k in enumerate(ONCELIK_SIRASI):
                if k in konu:
                    return i
            return len(ONCELIK_SIRASI)

        aday = [b for b in bildirimler if any(k in (b.get("subject") or "") for k in ONCELIK_SIRASI)]
        # önce en yeniden en eskiye, sonra (kararlı sort sayesinde) belge türü
        # önceliğine göre grupla — böylece her öncelik grubu içinde en yeni
        # belge önce denenir, ama tüm gruplar arasında öncelik sırası korunur
        aday.sort(key=lambda b: b.get("publishDate", ""), reverse=True)
        aday.sort(key=_oncelik)
        bulundu = False
        for b in aday[:10]:  # gereksiz PDF indirmeyi sınırla ama eskiden 5'ti — çok az deniyordu
            detay = kap.disclosure_detay(b["disclosureIndex"])
            if not detay or not detay.get("attachments"):
                continue
            obj_id = detay["attachments"][0]["objId"]
            pdf_bytes = kap.pdf_indir(obj_id)
            if not pdf_bytes:
                continue
            kalemler = []
            try:
                import pdfplumber
                import io
                with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
                    # 1) Önce gerçek tablo yapısını dene (en güvenilir —
                    #    fon/kurum isimlerini karışık harfle de yakalar)
                    kalemler = extract_ortaklik_from_pdf_tables(pdf)
                    # 2) Tablo bulunamadıysa düz metin regex'ine düş
                    #    (aynı sayfa/süre sınırı burada da uygulanıyor)
                    if not kalemler:
                        metin = ""
                        t0 = time.monotonic()
                        for i, sayfa in enumerate(pdf.pages):
                            if i >= PDF_MAX_SAYFA or time.monotonic() - t0 > PDF_MAX_SANIYE:
                                break
                            metin += (sayfa.extract_text() or "") + "\n"
                        kalemler = extract_ortaklik_from_pdf_text(metin)
            except Exception:
                kalemler = []
            if kalemler:
                for k in kalemler:
                    k.kaynak = f"{k.kaynak}:{b['disclosureIndex']}"
                kart.ortaklik_yapisi = kalemler
                bulundu = True
                break
        if not bulundu:
            kart.veri_eksik.append("ortaklik_yapisi_bulunamadi")
    else:
        kart.veri_eksik.append("ortaklik_yapisi_atlandi_oid_yok")

    if kart.ortaklik_yapisi:
        bilinen_toplam = sum(k.pay_yuzde or 0 for k in kart.ortaklik_yapisi)
        kart.halka_aciklik_tahmini = round(max(0.0, 100.0 - bilinen_toplam), 2)

    return kart


# ───────────────────────── indeks + 4 modül filtre ─────────────────────────

def kisi_indeksi_kur(sirketler: list) -> dict:
    """isim(normalize) -> {goruntu_isim, tuzel_mi, kayitlar:[{ticker, unvan, rol, pay_yuzde, tuzel_mi}]}

    ARTIK sadece gerçek kişi ortaklar değil, TÜZEL ortaklar da (fon, holding,
    portföy yönetim şirketi, sigorta/emeklilik şirketi vb.) bu indekse giriyor
    — önceden 'if not o.tuzel_mi' filtresiyle tüm fonlar haritadan siliniyordu,
    'birden fazla şirkette görünen fonlar/kurumlar' hiç çıkmıyordu."""
    indeks = {}

    def ekle(isim, ticker, unvan, rol, pay=None, tuzel=False):
        anahtar = normalize_isim(isim)
        if not anahtar:
            return
        if anahtar not in indeks:
            indeks[anahtar] = {"goruntu_isim": isim.strip(), "tuzel_mi": tuzel, "kayitlar": []}
        indeks[anahtar]["kayitlar"].append({
            "ticker": ticker, "unvan": unvan, "rol": rol, "pay_yuzde": pay, "tuzel_mi": tuzel,
        })

    for s in sirketler:
        for y in s.yonetim_kurulu:
            ekle(y.isim, s.ticker, s.unvan, y.gorev, tuzel=False)
        for u in s.ust_yonetim:
            ekle(u.isim, s.ticker, s.unvan, u.gorev, tuzel=False)
        for o in s.ortaklik_yapisi:
            rol = "Ortak (Fon/Kurum)" if o.tuzel_mi else "Ortak"
            ekle(o.isim, s.ticker, s.unvan, rol, o.pay_yuzde, tuzel=o.tuzel_mi)

    return indeks


def modul_tek_ortak_kontrolu(sirketler: list, esik_oran=2.0) -> list:
    """En büyük ortağın payı, ikinci en büyük ortaktan en az `esik_oran`
    kat fazlaysa 've' o şirketteki toplam bilinen pay >= %25 ise
    'tek ortağın fiilen kontrol ettiği' şirket sayılır."""
    sonuc = []
    for s in sirketler:
        paylar = sorted([o.pay_yuzde for o in s.ortaklik_yapisi if o.pay_yuzde], reverse=True)
        if not paylar or paylar[0] < 25:
            continue
        ikinci = paylar[1] if len(paylar) > 1 else 0
        if ikinci == 0 or paylar[0] >= ikinci * esik_oran:
            en_buyuk = max(s.ortaklik_yapisi, key=lambda o: o.pay_yuzde or 0)
            sonuc.append({"ticker": s.ticker, "unvan": s.unvan,
                          "ortak": en_buyuk.isim, "pay_yuzde": en_buyuk.pay_yuzde})
    return sonuc


def modul_hakim_ortak_50(sirketler: list) -> list:
    sonuc = []
    for s in sirketler:
        for o in s.ortaklik_yapisi:
            if o.pay_yuzde and o.pay_yuzde >= 50:
                sonuc.append({"ticker": s.ticker, "unvan": s.unvan,
                              "ortak": o.isim, "pay_yuzde": o.pay_yuzde,
                              "tuzel_mi": o.tuzel_mi})
    return sonuc


def modul_dusuk_halka_aciklik(sirketler: list, esik=20.0) -> list:
    sonuc = []
    for s in sirketler:
        if s.halka_aciklik_tahmini is not None and s.halka_aciklik_tahmini <= esik:
            sonuc.append({"ticker": s.ticker, "unvan": s.unvan,
                          "halka_aciklik_tahmini": s.halka_aciklik_tahmini})
    return sonuc


def modul_coklu_sirket_isimler(indeks: dict, min_sirket=2) -> list:
    sonuc = []
    for anahtar, kayit in indeks.items():
        tickerlar = {k["ticker"] for k in kayit["kayitlar"]}
        if len(tickerlar) >= min_sirket:
            sonuc.append({
                "isim": kayit["goruntu_isim"],
                "tuzel_mi": kayit.get("tuzel_mi", False),
                "sirket_sayisi": len(tickerlar),
                "sirketler": [{"ticker": k["ticker"], "rol": k["rol"], "pay_yuzde": k["pay_yuzde"]}
                              for k in kayit["kayitlar"]],
            })
    sonuc.sort(key=lambda x: x["sirket_sayisi"], reverse=True)
    return sonuc


# ───────────────────────── ana akış ─────────────────────────

def _cikti_olustur(sirketler: list) -> dict:
    indeks = kisi_indeksi_kur(sirketler)
    return {
        "guncelleme": time.strftime("%Y-%m-%d %H:%M:%S"),
        "sirketSayisi": len(sirketler),
        "sirketler": {s.ticker: asdict(s) for s in sirketler},
        "kisiIndeksi": {k: v for k, v in indeks.items()},
        "modul": {
            "tekOrtakKontrolu": modul_tek_ortak_kontrolu(sirketler),
            "hakimOrtak50": modul_hakim_ortak_50(sirketler),
            "dusukHalkaAciklik": modul_dusuk_halka_aciklik(sirketler),
            "cokluSirketIsimler": modul_coklu_sirket_isimler(indeks),
        },
    }


def _ara_kayit_yaz(sirketler: list, cikti_yolu: str):
    """Tarama bitmeden ARA KAYIT — iş iptal edilirse/kesilirse elde ne
    varsa diskte kalsın diye. Ana dosyanın üzerine yazar (aynı yol),
    böylece iş normal bitince zaten TAM veriyle üzerine yazılmış olur.
    Ayrıca WORKER_URL/PANEL_KEY tanımlıysa canlı worker'a da gönderilir —
    eskiden bu sadece tarama TAMAMEN bitince oluyordu; iş yarıda kesilirse
    Telegram botunda hiçbir güncelleme görünmüyordu."""
    try:
        gecici = _cikti_olustur(sirketler)
        gecici["tamamlandi"] = False  # ara kayıt olduğunu belirt
        with open(cikti_yolu, "w", encoding="utf-8") as f:
            json.dump(gecici, f, ensure_ascii=False, indent=2)
        print(f"  💾 Ara kayıt yazıldı ({len(sirketler)} şirket, {cikti_yolu})")
    except Exception as e:
        print(f"  ⚠️ Ara kayıt yazılamadı: {e}")
        return

    import os
    worker_url = os.environ.get("WORKER_URL", "").strip().rstrip("/")
    panel_key = os.environ.get("PANEL_KEY", "").strip()
    if worker_url and panel_key:
        try:
            push_to_worker(cikti_yolu, worker_url, panel_key)
            print(f"  📡 Ara kayıt worker'a da gönderildi ({len(sirketler)} şirket)")
        except Exception as e:
            print(f"  ⚠️ Ara kayıt worker'a gönderilemedi: {e}")


def main(sinirli_sayi: Optional[int] = None, cikti_yolu: str = "ortaklik_haritasi.json"):
    kap = KapIstemci()
    ham_liste = kap.sirket_listesi()

    # ── KALDIĞI YERDEN DEVAM ─────────────────────────────────────────
    # Tek çalıştırma 5 saatlik zaman bütçesine sığmıyor (784 şirket için
    # ~784*45sn ≈ 10 saat). Eskiden her run SIFIRDAN başlıyordu, yani hep
    # aynı ~420 şirkette takılıp kalınıyordu, geri kalan 360+ şirkete HİÇ
    # sıra gelmiyordu. Şimdi: worker'daki KV'den önceki sonucu çekip, DAHA
    # ÖNCE BAŞARIYLA ortaklık yapısı bulunmuş şirketleri bu run'da atlıyoruz
    # — böylece her run bir öncekinin ÜZERİNE, kaldığı yerden devam ediyor.
    # "Eksik" kalanlar bilerek ATLANMIYOR, her run'da tekrar denenir (zira
    # eksik kalma sebebi çoğunlukla zaman/ağ, kalıcı olmayabilir).
    onceki_sirketler: dict = {}
    worker_url = os.environ.get("WORKER_URL", "").strip().rstrip("/")
    panel_key = os.environ.get("PANEL_KEY", "").strip()
    if worker_url and panel_key:
        try:
            onceki_ham = onceki_veriyi_getir(worker_url, panel_key)
            if onceki_ham and onceki_ham.get("sirketler"):
                onceki_sirketler = onceki_ham["sirketler"]
                print(f"↩️ Önceki taramadan {len(onceki_sirketler)} şirket kaydı bulundu (worker KV).")
        except Exception as e:
            print(f"⚠️ Önceki veri alınamadı, bu run sıfırdan başlıyor: {e}")
    else:
        print("ℹ️ WORKER_URL/PANEL_KEY yok — kaldığı yerden devam edilemiyor, sıfırdan başlanıyor.")

    tamamlanan_tickerlar = {t for t, d in onceki_sirketler.items() if d.get("ortaklik_yapisi")}
    if tamamlanan_tickerlar:
        print(f"✅ {len(tamamlanan_tickerlar)} şirket zaten başarıyla işlenmiş — bu run'da ATLANACAK.")

    sirketler = [sirket_karti_from_dict(onceki_sirketler[t]) for t in tamamlanan_tickerlar]

    if sinirli_sayi:
        ham_liste = ham_liste[:sinirli_sayi]
    islenecekler = [s for s in ham_liste if s.get("stockCode") and s["stockCode"] not in tamamlanan_tickerlar]
    print(f"İşlenecek: {len(islenecekler)} / toplam {len(ham_liste)} şirket "
          f"({len(ham_liste)-len(islenecekler)} zaten tamam).")

    baslangic_t = time.monotonic()
    for i, s in enumerate(islenecekler):
        if time.monotonic() - baslangic_t > MAX_TOPLAM_SANIYE:
            print(f"\n⏹️ Zaman bütçesi doldu ({MAX_TOPLAM_SANIYE/3600:.1f} saat) — "
                  f"kalan {len(islenecekler)-i} şirket bir SONRAKİ run'a kalacak, "
                  "o ana kadar toplanan veri (öncekilerle birleşik) kaydediliyor.")
            break
        ticker = s.get("stockCode")
        unvan = s.get("kapMemberTitle", "")
        if not ticker:
            continue
        print(f"[{i+1}/{len(islenecekler)}] {ticker} işleniyor…")
        try:
            with zaman_siniri(180):  # bir şirket en fazla 3 dakika işlenir, ne olursa olsun
                kart = sirket_isle(kap, ticker, unvan)
        except ZamanAsimi:
            print(f"  ⏱️ {ticker} 3 dakikada bitmedi, atlanıyor")
            continue
        except Exception as e:
            print(f"  ⚠️ {ticker} hata: {e}")
            continue
        sirketler.append(kart)

        # ARA KAYIT (kritik): İş İPTAL EDİLİRSE / GitHub'ın 6 saatlik sınırına
        # ÇARPARSA / elektrik giderse — daha önce JSON sadece döngü TAMAMEN
        # bitince yazılıyordu, yani saatlerce sürüp yarıda kesilen bir koşuda
        # HİÇBİR ŞEY kaydedilmiyordu (gerçekte yaşandı: 8+ saatlik ilerleme
        # riske girdi). Artık her 17 şirkette bir o ana kadarki veri diske
        # (ve worker'a) yazılıyor — en kötü ihtimalle 17 şirketlik ilerleme
        # kaybedilir, tüm koşu değil.
        if len(sirketler) % 17 == 0:
            _ara_kayit_yaz(sirketler, cikti_yolu)

    cikti = _cikti_olustur(sirketler)
    cikti["tamamlandi"] = len(islenecekler) == 0 or (time.monotonic() - baslangic_t <= MAX_TOPLAM_SANIYE)

    with open(cikti_yolu, "w", encoding="utf-8") as f:
        json.dump(cikti, f, ensure_ascii=False, indent=2)

    eksikli = [s.ticker for s in sirketler if s.veri_eksik]
    kalan = len(ham_liste) - len(sirketler)
    print(f"\n✅ {len(sirketler)} şirket toplamda hazır ({len(sirketler)-len(tamamlanan_tickerlar)} bu run'da işlendi). Çıktı: {cikti_yolu}")
    if kalan > 0:
        print(f"⏭️ {kalan} şirket henüz hiç işlenmedi — bir sonraki run'da devam edecek.")
    print(f"⚠️ Eksik veri içeren {len(eksikli)} şirket: {', '.join(eksikli[:30])}"
          + (" ..." if len(eksikli) > 30 else ""))
    print("Bu şirketleri elle/PDF formatını genişleterek tamamlaman gerekebilir.")


def sirket_karti_from_dict(d: dict) -> SirketKarti:
    """asdict(SirketKarti)'nin JSON'dan geri dönüşü — KALDIĞI YERDEN DEVAM
    özelliği için: worker'daki KV'de duran ÖNCEKİ taramanın sonucunu tekrar
    SirketKarti nesnelerine çeviriyoruz ki bu run'da yeniden işlemeyelim."""
    return SirketKarti(
        ticker=d.get("ticker", ""),
        unvan=d.get("unvan", ""),
        mkk_member_oid=d.get("mkk_member_oid", ""),
        perma_link=d.get("perma_link", ""),
        yonetim_kurulu=[YonetimUyesi(**y) for y in (d.get("yonetim_kurulu") or [])],
        ust_yonetim=[YonetimUyesi(**y) for y in (d.get("ust_yonetim") or [])],
        ortaklik_yapisi=[OrtaklikKalemi(**o) for o in (d.get("ortaklik_yapisi") or [])],
        halka_aciklik_tahmini=d.get("halka_aciklik_tahmini"),
        veri_eksik=d.get("veri_eksik") or [],
    )


def onceki_veriyi_getir(worker_url: str, panel_key: str) -> Optional[dict]:
    """worker'ın KV'sinde duran EN SON push edilen ortaklik_haritasi.json'u
    okur (bkz. worker.js /api/ortaklikHam — bu script için eklendi).
    Ağ/format hatasında None döner — çağıran taraf sıfırdan başlamaya düşer,
    asla eski veri UYDURMAZ."""
    try:
        r = httpx.get(f"{worker_url}/api/ortaklikHam", params={"key": panel_key}, timeout=30)
    except Exception:
        return None
    if r.status_code != 200:
        return None
    try:
        cevap = r.json()
    except Exception:
        return None
    if not cevap.get("ok"):
        return None
    return cevap.get("veri")


def push_to_worker(cikti_yolu: str, worker_url: str, panel_key: str):
    """Üretilen JSON'u worker'ın KV'sine (VERI) yazdırmak için — worker
    tarafında bunu kabul edecek bir /panel veya /internal-push route'u
    olmalı; mevcut kodda böyle bir 'toplu KV yaz' ucu yok, bunu worker.js
    tarafına eklemen gerekiyor (bkz. worker_ortaklik_ekleme.md → backend
    route örneğindeki KAYDET bloğu, aynı desenle bir de bu JSON için yaz)."""
    with open(cikti_yolu, encoding="utf-8") as f:
        veri = json.load(f)
    r = httpx.post(f"{worker_url}/api/ortaklikYukle", json={"key": panel_key, "veri": veri}, timeout=30)
    print(r.status_code, r.text[:300])
    # ÖNEMLİ: durum kodunu kontrol et. Eskiden burada sadece print yapılıp
    # geçiliyordu — worker 403 "yetkisiz" dönse bile script bunu fark etmiyor,
    # Action yeşil bitiyor ve sen verinin gittiğini sanıyordun.
    if r.status_code != 200:
        raise RuntimeError(f"Worker push başarısız: HTTP {r.status_code} — {r.text[:300]}")
    try:
        cevap = r.json()
    except Exception:
        raise RuntimeError(f"Worker'dan geçersiz yanıt: {r.text[:300]}")
    if not cevap.get("ok"):
        raise RuntimeError(
            f"Worker push reddetti: {cevap.get('hata', 'bilinmeyen hata')} — "
            "PANEL_KEY, GitHub secret'ı ile Cloudflare Worker'daki değerle "
            "birebir aynı mı kontrol et."
        )


if __name__ == "__main__":
    import os
    import sys

    sinir_ham = os.environ.get("SIRKET_SAYISI", "").strip()
    sinirli = None if (not sinir_ham or sinir_ham.lower() == "tumu") else int(sinir_ham)
    cikti_yolu = "ortaklik_haritasi.json"

    print(f"Başlıyor — şirket sınırı: {sinirli or 'YOK (tüm BIST)'}")
    main(sinirli_sayi=sinirli, cikti_yolu=cikti_yolu)

    worker_url = os.environ.get("WORKER_URL", "").strip().rstrip("/")
    panel_key = os.environ.get("PANEL_KEY", "").strip()

    if worker_url and panel_key:
        print(f"Worker'a gönderiliyor: {worker_url}")
        try:
            push_to_worker(cikti_yolu, worker_url, panel_key)
            print("✅ Worker'a gönderildi.")
        except Exception as e:
            print(f"⚠️ Worker'a gönderilemedi: {e}")
            sys.exit(1)
    else:
        print("ℹ️ WORKER_URL / PANEL_KEY tanımlı değil — sadece dosya üretildi, worker'a gönderilmedi.")
        print("   (GitHub Actions'ta bu ikisini 'secret' olarak eklersen otomatik gönderilir.)")
