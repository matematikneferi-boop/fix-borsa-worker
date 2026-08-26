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
import re
import struct
import time
import unicodedata
from dataclasses import dataclass, field, asdict
from datetime import date, timedelta
from typing import Optional

import httpx
from bs4 import BeautifulSoup

BASE = "https://www.kap.org.tr"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
RATE_LIMIT_SEC = 0.5  # 2 istek/sn


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

    def sirket_listesi(self) -> list:
        """Tüm BIST-kotalı şirketler. memberType=IGS."""
        self._bekle()
        r = self.c.get("/tr/api/company/items/IGS/A")
        r.raise_for_status()
        return r.json()

    def member_filter(self, ticker: str) -> Optional[dict]:
        """ticker -> {companyCode, mkkMemberOid, title, permaLink}"""
        self._bekle()
        r = self.c.get(f"/tr/api/member/filter/{ticker}", headers={
            "Referer": f"{BASE}/tr/bist-sirketler"
        })
        if r.status_code != 200:
            return None
        try:
            return r.json()
        except Exception:
            return None

    def genel_sayfa_html(self, perma_link: str) -> Optional[str]:
        self._bekle()
        r = self.c.get(f"/tr/sirket-bilgileri/genel/{perma_link}")
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
            self._bekle()
            r = self.c.post(
                "/tr/api/disclosure/members/byCriteria",
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
            bitis = baslangic - timedelta(days=1)
            toplam_gun += pencere.days
        return sonuclar

    def disclosure_detay(self, disclosure_index: int) -> Optional[dict]:
        self._bekle()
        r = self.c.get(
            f"/tr/api/notification/attachment-detail/{disclosure_index}",
            headers={"Referer": f"{BASE}/tr/Bildirim/{disclosure_index}"},
        )
        if r.status_code != 200:
            return None
        try:
            arr = r.json()
            return arr[0] if arr else None
        except Exception:
            return None

    def pdf_indir(self, obj_id: str) -> Optional[bytes]:
        self._bekle()
        r = self.c.get(f"/tr/api/file/download/{obj_id}")
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
    "Pay Sahibinin Ünvanı/Adı Soyadı", "Pay Sahibi",
]
PAY_BASLIK_ANAHTARLARI = [
    "Sermayedeki Payı", "Sermaye Payı", "Pay Oranı (%)", "Oy Hakkı Oranı",
]


def extract_ortaklik_from_pdf_text(metin: str) -> list:
    """PDF'ten çıkarılan düz metinden ortaklık yapısı satırlarını yakalamaya
    çalışır. KAP genel kurul bilgilendirme dokümanlarında tipik satır:
      'AHMET YILMAZ                    120.000.000        24,00'
    yani: İSİM (büyük harf ağırlıklı) ... TUTAR ... YÜZDE
    Bu bir best-effort regex'tir; şirket/dönem bazında format farklılaşabilir.
    Eşleşmeyen şirketler 'veri_eksik' listesine düşer, UYDURULMAZ."""
    kalemler = []
    satir_deseni = re.compile(
        r"^([A-ZÇĞİÖŞÜ][A-ZÇĞİÖŞÜ\.\s&/]{4,60}?)\s{2,}[\d.,]+\s+(?:TL\s+)?%?\s*([\d]{1,3}[.,]\d{1,2})\s*$",
        re.MULTILINE,
    )
    for satir in metin.splitlines():
        satir = satir.strip()
        m = satir_deseni.match(satir + " ")  # tek satır bazlı, gevşek eşleşme
        if m:
            isim = m.group(1).strip(" .")
            yuzde = parse_tr_yuzde(m.group(2))
            if isim and yuzde is not None and 0 < yuzde <= 100:
                tuzel = bool(re.search(r"A\.?Ş\.?|LTD|LİMİTED|HOLDİNG|SANAYİ|TİCARET", isim))
                kalemler.append(OrtaklikKalemi(isim=isim, pay_yuzde=yuzde, tuzel_mi=tuzel, kaynak="pdf"))
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
        aday = [b for b in bildirimler if any(
            k in (b.get("subject") or "") for k in
            ["Genel Kurul", "Ortaklık Yapısı", "Payların Oranı"]
        )]
        # en yeniden en eskiye, ilk BAŞARILI parse'ı kabul et
        aday.sort(key=lambda b: b.get("publishDate", ""), reverse=True)
        bulundu = False
        for b in aday[:5]:  # gereksiz PDF indirmeyi sınırla
            detay = kap.disclosure_detay(b["disclosureIndex"])
            if not detay or not detay.get("attachments"):
                continue
            obj_id = detay["attachments"][0]["objId"]
            pdf_bytes = kap.pdf_indir(obj_id)
            if not pdf_bytes:
                continue
            try:
                import pdfplumber
                import io
                metin = ""
                with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
                    for sayfa in pdf.pages:
                        metin += (sayfa.extract_text() or "") + "\n"
            except Exception:
                metin = ""
            kalemler = extract_ortaklik_from_pdf_text(metin)
            if kalemler:
                for k in kalemler:
                    k.kaynak = f"pdf:{b['disclosureIndex']}"
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
    """isim(normalize) -> {goruntu_isim, kayitlar:[{ticker, unvan, rol, pay_yuzde}]}"""
    indeks = {}

    def ekle(isim, ticker, unvan, rol, pay=None):
        anahtar = normalize_isim(isim)
        if not anahtar:
            return
        if anahtar not in indeks:
            indeks[anahtar] = {"goruntu_isim": isim.strip(), "kayitlar": []}
        indeks[anahtar]["kayitlar"].append({
            "ticker": ticker, "unvan": unvan, "rol": rol, "pay_yuzde": pay,
        })

    for s in sirketler:
        for y in s.yonetim_kurulu:
            ekle(y.isim, s.ticker, s.unvan, y.gorev)
        for u in s.ust_yonetim:
            ekle(u.isim, s.ticker, s.unvan, u.gorev)
        for o in s.ortaklik_yapisi:
            if not o.tuzel_mi:  # sadece gerçek kişi ortaklar isim haritasına girer
                ekle(o.isim, s.ticker, s.unvan, "Ortak", o.pay_yuzde)

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
                "sirket_sayisi": len(tickerlar),
                "sirketler": [{"ticker": k["ticker"], "rol": k["rol"], "pay_yuzde": k["pay_yuzde"]}
                              for k in kayit["kayitlar"]],
            })
    sonuc.sort(key=lambda x: x["sirket_sayisi"], reverse=True)
    return sonuc


# ───────────────────────── ana akış ─────────────────────────

def main(sinirli_sayi: Optional[int] = None, cikti_yolu: str = "ortaklik_haritasi.json"):
    kap = KapIstemci()
    ham_liste = kap.sirket_listesi()
    if sinirli_sayi:
        ham_liste = ham_liste[:sinirli_sayi]

    sirketler = []
    for i, s in enumerate(ham_liste):
        ticker = s.get("stockCode")
        unvan = s.get("kapMemberTitle", "")
        if not ticker:
            continue
        print(f"[{i+1}/{len(ham_liste)}] {ticker} işleniyor…")
        try:
            kart = sirket_isle(kap, ticker, unvan)
        except Exception as e:
            print(f"  ⚠️ {ticker} hata: {e}")
            continue
        sirketler.append(kart)

    indeks = kisi_indeksi_kur(sirketler)

    cikti = {
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

    with open(cikti_yolu, "w", encoding="utf-8") as f:
        json.dump(cikti, f, ensure_ascii=False, indent=2)

    eksikli = [s.ticker for s in sirketler if s.veri_eksik]
    print(f"\n✅ {len(sirketler)} şirket işlendi. Çıktı: {cikti_yolu}")
    print(f"⚠️ Eksik veri içeren {len(eksikli)} şirket: {', '.join(eksikli[:30])}"
          + (" ..." if len(eksikli) > 30 else ""))
    print("Bu şirketleri elle/PDF formatını genişleterek tamamlaman gerekebilir.")


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
