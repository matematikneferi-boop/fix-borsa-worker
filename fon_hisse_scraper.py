#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fon Hisse Scraper — TEFAS + KAP Portföy Dağılım Raporu
=========================================================

Ne yapar
--------
1) TEFAS'ın YENİ (2026, Next.js) resmi API'sinden (fonGnlBlgSiraliGetir)
   TÜM "YAT" fonlarının listesini çeker, unvanında SPK mevzuatınca ZORUNLU
   geçen "(HİSSE SENEDİ YOĞUN FON)" / "... DEĞİŞKEN FON" ibarelerine göre
   BIST'e bakan fonları filtreler — senin seçimin: sadece bu ikisi, para
   piyasası/borçlanma/altın fonları DIŞARIDA.
2) Her fon için KAP'ta o fonun kendi bildirim akışında "Portföy Dağılım
   Raporu" (Bildirim Tipi: DG, aylık) bildirimini arar, EN GÜNCEL olanı bulur.
3) O bildirimin PDF ekini indirir, içindeki hisse bazlı satırları (kod,
   adet/lot, TL değer, oran %) çıkarmaya çalışır.
4) Ters indeks kurar: hisse kodu -> [{fon_kodu, fon_adi, pay_yuzde, tahmini_lot}]
   ve fon kodu -> [{hisse, pay_yuzde, tahmini_lot}] (iki yönlü de sorgulanabilir
   olsun diye).

Çıktı: fon_hisse_haritasi.json — worker'daki KV'ye "fonHisseHaritasi" anahtarıyla
yazılması için push_to_worker() ile /api/fonYukle route'una POST eder.

DÜRÜST NOTLAR (gerçek kısıtlar, gizlenmedi)
--------------------------------------------
- 1. sürümde TEFAS'ın ESKİ /api/DB/BindComparisonFundReturns ucu kullanılmıştı
  — TEFAS 2026'da SİTEYİ TAMAMEN YENİLEDİ (Next.js), o uç 404 verip kaldı.
  Bu sürüm yeni resmi ucu (fonGnlBlgSiraliGetir) kullanıyor — bağımsız açık
  kaynak bir istemcinin (github.com/mirzazad/pytefas) canlı doğrulanmış
  kaynak kodundan teyit edildi, kör tahmin değil.
- Fon TÜRÜ (hisse yoğun/değişken) filtrelemesi TEFAS'ın döndürdüğü bir
  kategori alanına değil, fon UNVANINA dayanıyor — çünkü yeni API'nin
  kategori alanının kesin adı bu sandbox'ta (internet kapalı) CANLI
  DOĞRULANAMADI. Unvan deseni (SPK'nın zorunlu kıldığı ibare) daha güvenilir
  bir temel: var olduğunu bilmediğim bir alana güvenmek yerine.
- TEFAS, bir fonun VARLIK SINIFI dağılımını (örn. "%62 Hisse Senedi, %20
  Tahvil...") herkese açık API'sinden net veriyor. AMA "hangi hisse, ne kadar"
  bilgisi TEFAS'ta YOK. Bu bilgi KAP'a fonların her ay yüklediği "I-FONU
  TANITICI BİLGİLER" bildiriminin "III-FON PORTFÖY DEĞERİ TABLOSU" bölümünde
  var — GERÇEK bir belge (DOH, Ekim-2025) canlı çekilip tam içeriğiyle
  incelenerek satır yapısı doğrulandı (bkz. extract_hisseler_from_pdf başı).
  İlk sürümde "Portföy Dağılım Raporu" aranıyordu, bu YANLIŞ çıktı; doğru
  bildirim türü budur. Kaynak zorunlu olarak KAP — TEFAS sadece fon
  listesi/isim/büyüklük için kullanılıyor.
- KAP'ta fonların KENDİ ayrı kaydı var (kap.org.tr/tr/fon-bilgileri/...,
  şirketlerin kap.org.tr/tr/sirket-bilgileri/...'sinden AYRI bir alan) ve
  bildirim başlıkları fon koduyla başlıyor (ör. "DOH-Tera Portföy..."), bu
  CANLI doğrulandı. Ama TEFAS'ın 3 harfli fon kodu çoğu fonda KAP'ın kendi
  companyCode alanıyla BİREBİR AYNI DEĞİL (tara #3 sonucu: 610 fondan
  ~%85'i 'kap_uye_bulunamadi' verdi) — bu yüzden kap.fon_uyesi_bul() önce
  kodla, bulamazsa fon ADIYLA arayıp KELİME ÖRTÜŞMESİYLE doğruluyor.
- PDF içindeki hisse tablosunun sütun/başlık yapısı fondan fona, dönemden
  döneme değişebiliyor (ortaklık yapısı PDF'lerinde görülen sorunun aynısı).
  extract_hisseler_from_pdf() esnek başlık eşleştirmesi kullanıyor ve
  eşleşmeyen fonları "eksik" işaretliyor — ASLA sayı uydurmuyor.
- Taranmış görüntü (OCR gerektiren) PDF ekleri bu script'in kapsamı DIŞINDA.
- ⚠️ İLK ÇALIŞTIRMA ÖNERİSİ: SIRKET_SAYISI=5 gibi küçük bir örneklemle test et.
  "veri_eksik" alanı çoğunlukla doluysa (parse tutmuyorsa) çıktıdaki 2-3
  fonun ham PDF metnini bana yapıştır, gerçek sütun yapısına göre parse
  fonksiyonunu düzeltirim — kör kör "çalışıyor" demek yerine.
- Rate limit / zaman bütçesi / ara-kayıt mantığı kap_ortaklik_scraper.py ile
  birebir aynı.
"""

import json
import os
import re
import signal
import struct
import time
import unicodedata
import urllib.parse
from dataclasses import dataclass, field, asdict
from typing import Optional

import httpx
import contextlib

try:
    import pdfplumber
except ImportError:
    pdfplumber = None


class ZamanAsimi(Exception):
    pass


def _alarm_isleyici(signum, frame):
    raise ZamanAsimi()


@contextlib.contextmanager
def zaman_siniri(saniye: int):
    eski = signal.signal(signal.SIGALRM, _alarm_isleyici)
    signal.alarm(saniye)
    try:
        yield
    finally:
        signal.alarm(0)
        signal.signal(signal.SIGALRM, eski)


KAP_BASE = "https://www.kap.org.tr"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
RATE_LIMIT_SEC = 1.2
PDF_MAX_SAYFA = 25          # portföy tablosu genelde raporun ilk sayfalarında
PDF_MAX_SANIYE = 25
MAX_TOPLAM_SANIYE = 5 * 3600

# Senin seçimin: sadece BIST'e bakan (hisse yoğun / değişken) fonlar —
# bu iki fon tipinin resmi unvanında SPK mevzuatı gereği ZORUNLU olarak
# geçen ibareler (bkz. TefasIstemci.hisse_yogun_fon_listesi):
_TR_CEVIRI = str.maketrans({"i": "İ", "ı": "I", "ğ": "Ğ", "ü": "Ü", "ş": "Ş", "ö": "Ö", "ç": "Ç"})


def _tr_upper(s: str) -> str:
    """Python'un str.upper()'ı Türkçe i/İ ayrımını doğru yapmıyor
    (kap_ortaklik_scraper.py'deki normalize_isim ile aynı sorun/çözüm)."""
    return (s or "").translate(_TR_CEVIRI).upper()


HISSE_YOGUN_DESENI = re.compile(r"HİSSE SENEDİ YOĞUN FON")
DEGISKEN_DESENI = re.compile(r"DEĞİŞKEN FON")

# fon_uyesi_bul()'da isim eşleştirmesinde ELENEN, ayırt edici olmayan
# kelimeler — bunlar hemen her fon adında geçtiği için örtüşme sayılmaz.
_ANLAMSIZ_KELIME = {
    "FON", "FONU", "FONUN", "PORTFÖY", "PORTFOY", "PY", "YÖNETİMİ", "YONETIMI",
    "A.Ş.", "AŞ", "A.S.", "VE", "İLE", "ILE", "ÖZEL", "OZEL", "DEĞİŞKEN",
    "DEGISKEN", "HİSSE", "HISSE", "SENEDİ", "SENEDI", "YOĞUN", "YOGUN", "TL",
    "BİR", "BIR",
}


def _anlamli_kelimeler(isim: str) -> set:
    """Fon adından, eşleştirmede işe yarayacak (kurucu adı, ayırt edici
    kelime gibi) parçaları çıkarır — 'FON', 'PORTFÖY' gibi her fonda geçen
    kelimeleri saymaz, yoksa hemen her fon 'eşleşmiş' görünür. Min uzunluk
    2 (1 değil) — 'İŞ' (İş Portföy'ün kısaltması) gibi kısa ama ayırt edici
    kurucu adlarını elememek için; TEK harfli parçalar (noktalama artığı)
    hâlâ elenir."""
    n = _tr_upper(isim)
    n = re.sub(r"[().,]", " ", n)
    return {k for k in n.split() if len(k) >= 2 and k not in _ANLAMSIZ_KELIME}


# ───────────────────────── yardımcılar ─────────────────────────

def normalize_kod(s: str) -> str:
    if not s:
        return ""
    return re.sub(r"\s+", "", s.strip().upper())


def parse_tr_sayi(s) -> Optional[float]:
    """'1.234.567,89' / '19,10' / '%19.10' -> float"""
    if s is None:
        return None
    s = str(s).replace("%", "").replace("TL", "").strip()
    if not s or s.lower() == "nan":
        return None
    s = s.replace(".", "").replace(",", ".") if "," in s else s
    try:
        return float(s)
    except ValueError:
        return None


def extract_pdf_from_java_bytes(raw: bytes) -> Optional[bytes]:
    """KAP'ın /tr/api/file/download/{objId} ucu PDF'i Java byte[] serialization
    ile sarmalıyor — bkz. kap_ortaklik_scraper.py, aynı fonksiyon."""
    try:
        idx = raw.index(b"\x78\x70", 10)
        arr_len = struct.unpack(">I", raw[idx + 2: idx + 6])[0]
        return raw[idx + 6: idx + 6 + arr_len]
    except Exception:
        return None


# ───────────────────────── veri sınıfları ─────────────────────────

@dataclass
class HisseKalemi:
    hisse_kodu: str
    pay_yuzde: Optional[float]
    tl_deger: Optional[float] = None
    tahmini_lot: Optional[int] = None


@dataclass
class FonKarti:
    fon_kodu: str
    fon_adi: str
    semsiye_turu: str = ""
    kurucu: str = ""
    fon_buyuklugu_tl: Optional[float] = None
    rapor_donemi: str = ""              # örn. "2026-07"
    bildirim_index: Optional[int] = None
    hisseler: list = field(default_factory=list)   # list[HisseKalemi]
    veri_eksik: list = field(default_factory=list)


# ───────────────────────── TEFAS istemcisi ─────────────────────────

class TefasIstemci:
    """TEFAS 2026'da Next.js tabanlı yeni bir altyapıya geçti, ESKİ
    /api/DB/BindComparisonFundReturns ucu KALDIRILDI (404). Yeni resmi uçlar
    (bkz. github.com/mirzazad/pytefas — canlı kaynak kodundan doğrulandı):
      https://www.tefas.gov.tr/api/funds/fonGnlBlgSiraliGetir  (fon listesi/bilgisi)
      https://www.tefas.gov.tr/api/funds/dagilimSiraliGetirT   (portföy varlık dağılımı)
    Bu script sadece fon LİSTESİ için ilkini kullanıyor — hisse bazlı kırılım
    zaten TEFAS'ta yok, KAP'tan geliyor (bkz. dosya başındaki DÜRÜST NOTLAR)."""

    INFO_URL = "https://www.tefas.gov.tr/api/funds/fonGnlBlgSiraliGetir"

    def __init__(self):
        self.c = httpx.Client(
            headers={
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Origin": "https://www.tefas.gov.tr",
                "Referer": "https://www.tefas.gov.tr/tr/fon-verileri",
                "User-Agent": UA,
            },
            timeout=30.0,
            follow_redirects=True,
        )

    def hisse_yogun_fon_listesi(self) -> list:
        """TEFAS'ın YENİ fonGnlBlgSiraliGetir ucundan TÜM "YAT" (yatırım,
        emeklilik değil) fonlarını çeker, isim bazlı desenle "Hisse Senedi
        Yoğun Fon" / "Değişken Fon" olanları seçer.

        NEDEN İSİM DESENİ (kategori alanı değil): SPK mevzuatı gereği bu iki
        fon tipinin resmi unvanı "(HİSSE SENEDİ YOĞUN FON)" ibaresini ya da
        "... DEĞİŞKEN FON" kalıbını ZORUNLU olarak içerir — bu, TEFAS'ın yeni
        API'sinde kategori alanının kesin adını CANLI DOĞRULAYAMADIĞIM
        (bu sandbox'ta internet yok) bu aşamada isme dayanmak, var olduğunu
        bilmediğim bir alana güvenmekten daha sağlam.

        Tatil/hafta sonu için TEFAS boş sonuç dönebiliyor — son 10 günü
        geriye doğru dener, ilk dolu günde durur."""
        from datetime import date, timedelta

        satirlar, son_hata = None, None
        for gun_geri in range(10):
            gun = date.today() - timedelta(days=gun_geri)
            body = {
                "fonTipi": "YAT", "fonKodu": None, "aramaMetni": None,
                "fonTurKod": None, "fonGrubu": None, "sfonTurKod": None,
                "fonTurAciklama": None, "kurucuKod": None,
                "basTarih": gun.strftime("%Y%m%d"), "bitTarih": gun.strftime("%Y%m%d"),
                "basSira": 1, "bitSira": 100000, "dil": "TR",
                "sFonTurKod": "", "fonKod": "", "fonGrup": "", "fonUnvanTip": "",
            }
            try:
                r = self.c.post(self.INFO_URL, json=body)
                r.raise_for_status()
                veri = r.json()
            except Exception as e:
                son_hata = str(e)
                continue
            adaylar = veri.get("resultList") or []
            if adaylar:
                satirlar = adaylar
                break
            son_hata = veri.get("errorMessage") or "boş sonuç (tatil/hafta sonu olabilir)"

        if not satirlar:
            raise RuntimeError(f"TEFAS'tan son 10 günde hiç veri alınamadı (son hata: {son_hata})")
        if len(satirlar) < 200:
            raise RuntimeError(
                f"TEFAS'tan beklenenden az kayıt geldi ({len(satirlar)}, beklenen 900+) "
                "— API/alan adları yine değişmiş olabilir, canlı kontrol gerekiyor."
            )

        sonuc = []
        for k in satirlar:
            fon_adi = str(k.get("fonUnvan") or "").strip()
            ad_n = _tr_upper(fon_adi)
            hisse_yogun = bool(HISSE_YOGUN_DESENI.search(ad_n))
            degisken = bool(DEGISKEN_DESENI.search(ad_n))
            if not (hisse_yogun or degisken):
                continue
            kod = normalize_kod(k.get("fonKodu") or "")
            if not kod:
                continue
            sonuc.append({
                "fon_kodu": kod,
                "fon_adi": fon_adi,
                "semsiye_turu": "Hisse Senedi Şemsiye Fonu" if hisse_yogun else "Değişken Şemsiye Fonu",
                # kurucuUnvan yeni API'de dönüyor mu CANLI DOĞRULANAMADI —
                # gelmezse boş kalır, script'in geri kalanını etkilemez.
                "kurucu": str(k.get("kurucuUnvan") or k.get("kurucu") or "").strip(),
                "fon_buyuklugu_tl": parse_tr_sayi(k.get("portfoyBuyukluk")),
            })
        if not sonuc:
            raise RuntimeError(
                "İsim deseniyle (HİSSE SENEDİ YOĞUN FON / DEĞİŞKEN FON) hiç fon eşleşmedi "
                "— fonUnvan alan adı değişmiş olabilir, canlı kontrol gerekiyor."
            )
        return sonuc


# ───────────────────────── KAP istemcisi (fon bildirimleri) ─────────────────────────

class KapFonIstemci:
    """kap_ortaklik_scraper.py'daki KapIstemci ile aynı desen — orada zaten
    var olan bir client'ın olduğu projede, kodu ikiye bölmemek için o dosyadaki
    KapIstemci sınıfı DOĞRUDAN yeniden kullanılabilir (import edilebilir).
    Burada bağımsız çalışabilmesi için aynı mantık kısaca tekrarlandı."""

    def __init__(self):
        self.c = httpx.Client(
            base_url=KAP_BASE,
            headers={"User-Agent": UA, "Accept": "*/*", "Accept-Language": "tr"},
            timeout=20.0,
            follow_redirects=True,
        )
        self._son_istek = 0.0
        self.durum_sayaci = {}   # {http_status: kaç kez görüldü} — tara sonunda basılır, teşhis için
        self.debug = os.environ.get("KAP_DEBUG", "").strip() == "1"

    def _bekle(self):
        gecen = time.time() - self._son_istek
        if gecen < RATE_LIMIT_SEC:
            time.sleep(RATE_LIMIT_SEC - gecen)
        self._son_istek = time.time()

    _RETRY_DURUMLARI = {429, 500, 502, 503, 504}

    def _istek(self, method: str, yol: str, **kwargs):
        """DÜZELTME (tara #5 logu): script'in kendi DÜRÜST NOTLAR'ında canlı
        doğrulanmış diye belirtilen DOH dahil, run ilerledikçe art arda
        'kap_uye_bulunamadi' çıkması — eskiden SADECE bağlantı kopmasında
        (timeout/connection error) tekrar deniyorduk, KAP'ın 429/5xx HTTP
        durum koduyla döndüğü "çok hızlı gidiyorsun" / geçici hata
        durumlarında TEK denemede 'bulunamadı' sayıp geçiyorduk. Artık bu
        durum kodları da backoff ile (ve varsa Retry-After başlığına uyarak)
        tekrar deneniyor; son denemede hâlâ kötüyse yanıt YİNE DE dönülür
        (exception fırlatılmaz) ki çağıran taraf mevcut 'eksik' işaretleme
        mantığıyla devam edebilsin."""
        gecikmeler = [2, 5, 12, 30]
        r = None
        for deneme, gecikme in enumerate([0] + gecikmeler):
            if gecikme:
                time.sleep(gecikme)
            self._bekle()
            try:
                r = self.c.request(method, yol, **kwargs)
            except (httpx.RemoteProtocolError, httpx.ConnectError, httpx.ConnectTimeout,
                    httpx.ReadTimeout, httpx.ReadError, httpx.PoolTimeout):
                if deneme == len(gecikmeler):
                    raise
                continue
            if r.status_code not in self._RETRY_DURUMLARI:
                return r
            self.durum_sayaci[r.status_code] = self.durum_sayaci.get(r.status_code, 0) + 1
            if deneme == len(gecikmeler):
                return r
            ra = r.headers.get("Retry-After")
            if ra and ra.strip().isdigit():
                time.sleep(min(int(ra), 60))
        return r

    def member_filter(self, fon_kodu: str) -> Optional[dict]:
        """SADECE tam kod eşleşmesi — "ilk sonucu döndür" yedeği KALDIRILDI.
        O yedek, KAP'ın alakasız bir kaydını "bulundu" diye işaretleyip
        sessizce YANLIŞ fona bağlanma riski taşıyordu; hiç bulamamak, yanlış
        bulmaktan daha güvenli (bkz. fon_uyesi_bul — asıl arama artık orada,
        isim doğrulamalı)."""
        adaylar = self.uye_ara(fon_kodu)
        if self.debug:
            print(f"    🐛 member_filter('{fon_kodu}'): {len(adaylar)} aday, "
                  f"companyCode'lar: {[a.get('companyCode') for a in adaylar][:10]}")
        for kayit in adaylar:
            if isinstance(kayit, dict) and str(kayit.get("companyCode", "")).upper() == fon_kodu.upper():
                return kayit
        return None

    def uye_ara(self, sorgu: str) -> list:
        """KAP'ın genel üye arama ucu — ham aday listesi döner, hiçbir
        seçim/doğrulama yapmaz (onu çağıran taraf yapar)."""
        try:
            r = self._istek("GET", f"/tr/api/member/filter/{urllib.parse.quote(sorgu)}",
                             headers={"Referer": f"{KAP_BASE}/tr/bist-sirketler"})
        except Exception as e:
            if self.debug:
                print(f"    🐛 uye_ara('{sorgu}') İSTİSNA: {e}")
            return []
        if self.debug:
            gövde = r.text[:300] if r is not None else "(yanıt yok)"
            print(f"    🐛 uye_ara('{sorgu}') -> HTTP {r.status_code if r is not None else '?'}, gövde: {gövde!r}")
        if r.status_code != 200:
            return []
        try:
            veri = r.json()
        except Exception:
            return []
        if isinstance(veri, list):
            return [k for k in veri if isinstance(k, dict)]
        return [veri] if isinstance(veri, dict) else []

    def fon_uyesi_bul(self, fon_kodu: str, fon_adi: str) -> Optional[dict]:
        """DÜZELTME (bu, tara #3'te ~%85 'kap_uye_bulunamadi' ile sonuçlanan
        asıl kök sebep): TEFAS'ın 3 harfli fon kodu (AAV, ABJ, AC5...) çoğu
        fon için KAP'ın kendi 'companyCode' alanıyla AYNI DEĞİL — sadece bazı
        fonlarda (BIO, ADE, AKU gibi — log'da bunlar 'kap_uye' BULUNDU ama
        sonraki adımda bildirim bulunamadı diye düştü) tesadüfen örtüşüyor.
        Bu yüzden önce kod dener, bulamazsa fon ADIYLA arar ve KAP'tan gelen
        adayın başlığını fon_adi ile ANLAMLI KELİME örtüşmesiyle doğrular.
        En az 2 anlamlı kelime örtüşmesi YOKSA None döner — 'her ne bulduysan
        onu kabul et' YAPMIYORUZ, çünkü yanlış fonu doğru sanıp onun
        hisselerini göstermek, hiç göstermemekten daha kötü bir hata olurdu.
        """
        uye = self.member_filter(fon_kodu)
        if uye and uye.get("mkkMemberOid"):
            return uye

        hedef_kelimeler = _anlamli_kelimeler(fon_adi)
        if not hedef_kelimeler:
            if self.debug:
                print(f"    🐛 fon_uyesi_bul('{fon_kodu}'): fon_adi'ndan hiç anlamlı kelime çıkmadı (fon_adi={fon_adi!r})")
            return None
        arama_sorgusu = " ".join(list(hedef_kelimeler)[:4])
        adaylar = self.uye_ara(arama_sorgusu)
        en_iyi, en_iyi_skor = None, 0
        for k in adaylar:
            baslik = str(k.get("title") or k.get("companyTitle") or "")
            ortak = hedef_kelimeler & _anlamli_kelimeler(baslik)
            if len(ortak) > en_iyi_skor:
                en_iyi_skor, en_iyi = len(ortak), k
        if self.debug:
            print(f"    🐛 fon_uyesi_bul('{fon_kodu}'): isim araması='{arama_sorgusu}', "
                  f"{len(adaylar)} aday, en iyi skor={en_iyi_skor} "
                  f"(başlık={en_iyi.get('title') if en_iyi else None!r}, oid={en_iyi.get('mkkMemberOid') if en_iyi else None})")
        if en_iyi_skor >= 2 and en_iyi and en_iyi.get("mkkMemberOid"):
            return en_iyi
        return None

    def son_tanitici_bilgiler_bildirimi(self, mkk_member_oid: str, gun_geriye: int = 400) -> Optional[dict]:
        """Son ~13 ay içindeki bildirimleri tarar, EN GÜNCEL "I-FONU TANITICI
        BİLGİLER" bildirimini döndürür.

        DÜZELTME (kritik): İlk sürüm "Portföy Dağılım Raporu" başlığı
        arıyordu — CANLI bir KAP belgesini (DOH, Ekim-2025) tam içeriğiyle
        inceleyince, hisse bazlı kırılımın ASIL aylık bildirim türünün
        "I-FONU TANITICI BİLGİLER" olduğu görüldü (başlık formatı: "{Ay-Yıl}
        {FONKOD}-{FON ADI} · I-FONU TANITICI BİLGİLER"). Bu belge "III-FON
        PORTFÖY DEĞERİ TABLOSU" içinde "HİSSE SENETLERİ" alt bölümünde her
        hisse için kod, ISIN, TAM pay adedi (nominal değer) ve fon içindeki
        yüzdesini satır satır veriyor — DOH örneğinde bizzat doğrulandı."""
        from datetime import date, timedelta
        bugun = date.today()
        try:
            r = self._istek(
                "POST", "/tr/api/disclosure/members/byCriteria",
                json={
                    "fromDate": (bugun - timedelta(days=gun_geriye)).isoformat(),
                    "toDate": bugun.isoformat(),
                    "mkkMemberOidList": [mkk_member_oid],
                    "subjectList": [],
                },
                headers={"Referer": f"{KAP_BASE}/tr/bildirim-sorgu"},
            )
        except Exception:
            return None
        if r.status_code != 200:
            return None
        try:
            kayitlar = r.json()
        except Exception:
            return None
        adaylar = [
            k for k in kayitlar
            if isinstance(k, dict) and "TANITICI BİLGİLER" in _tr_upper(str(k.get("title", "") or k.get("subject", "")))
        ]
        if not adaylar:
            return None
        adaylar.sort(key=lambda k: str(k.get("publishDate", "") or k.get("basicDate", "")), reverse=True)
        return adaylar[0]

    def tum_tanitici_bilgiler_bildirimleri(self, mkk_member_oid: str, gun_geriye: int = 760) -> dict:
        """son_tanitici_bilgiler_bildirimi ile AYNI sorgu, ama sadece EN
        GÜNCEL'i değil, KAP'ın döndürdüğü penceredeki TÜM 'I-FONU TANITICI
        BİLGİLER' bildirimlerini AY BAZINDA döner: {AY(YYYY-MM): bildirim}.
        Bu, backfill (geçmiş doldurma) modunun temeli — TEFAS'ta geçmiş
        hisse kırılımı yok ama KAP'ın bildirim sorgusu zaten geriye dönük
        bir pencere döndürüyor, ayrı bir 'tarihsel API' gerekmiyor. Aynı ay
        için birden fazla bildirim varsa (düzeltme/tekrar), o ayın EN
        GÜNCELİ tutulur."""
        from datetime import date, timedelta
        bugun = date.today()
        try:
            r = self._istek(
                "POST", "/tr/api/disclosure/members/byCriteria",
                json={
                    "fromDate": (bugun - timedelta(days=gun_geriye)).isoformat(),
                    "toDate": bugun.isoformat(),
                    "mkkMemberOidList": [mkk_member_oid],
                    "subjectList": [],
                },
                headers={"Referer": f"{KAP_BASE}/tr/bildirim-sorgu"},
            )
        except Exception:
            return {}
        if r.status_code != 200:
            return {}
        try:
            kayitlar = r.json()
        except Exception:
            return {}
        adaylar = [
            k for k in kayitlar
            if isinstance(k, dict) and "TANITICI BİLGİLER" in _tr_upper(str(k.get("title", "") or k.get("subject", "")))
        ]
        sonuc = {}
        for k in adaylar:
            tarih = str(k.get("publishDate", "") or k.get("basicDate", ""))
            ay = tarih[:7]
            if not re.match(r"^\d{4}-\d{2}$", ay):
                continue
            mevcut = sonuc.get(ay)
            if not mevcut or tarih > str(mevcut.get("publishDate", "") or mevcut.get("basicDate", "")):
                sonuc[ay] = k
        return sonuc

    def disclosure_detay(self, disclosure_index: int) -> Optional[dict]:
        try:
            r = self._istek("GET", f"/tr/api/notification/attachment-detail/{disclosure_index}",
                             headers={"Referer": f"{KAP_BASE}/tr/Bildirim/{disclosure_index}"})
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


# ───────────────────────── PDF parse ─────────────────────────
#
# GERÇEK BİR KAP BELGESİNDEN (DOH-Tera Portföy Dördüncü Hisse Senedi Serbest
# TL Fon, Ekim-2025 "I-FONU TANITICI BİLGİLER" bildirimi, canlı çekilip tam
# içeriğiyle incelendi) doğrulanmış satır yapısı:
#
#   ASELS ASELSAN
#   ELEKTRON
#   İK SANAYİ
#   VE
#   TİCARET
#   A.Ş.
#   TL TRAASELS91H2 250.000,00 189,796215 30/10/25 80100511 203,600000 50.900.000,00 13,07 10,79 12,19
#
# Yani: TİCKER + ŞİRKET ÜNVANI (çok satıra sarabiliyor), sonra TEK satırda
# DÖVİZ, ISIN, NOMİNAL DEĞER (=TAM pay adedi, tahmini değil), fiyat/tarih
# alanları, TOPLAM DEĞER (TL), ve son 3 sayı: GRUP(%) / TOPLAM-FPD-GÖRE(%)
# / TOPLAM-FTD-GÖRE(%). "GRUP TOPLAMI" satırındaki (100,00 / 82,30 / 93,18)
# ile bölümün toplam değerleri çapraz kontrol edilip bu sıralama DOĞRULANDI.
# "TOPLAM (FPD GÖRE)" — yani ORTADAKİ yüzde — standart "portföy içindeki
# payı" kavramına karşılık geliyor, pay_yuzde bunu kullanıyor.
#
# NOT: Bu, TEK bir gerçek belgeden doğrulandı. Farklı fon/dönemlerde döviz
# cinsi farklı satırlar (USD/EUR), farklı sütun sırası çıkarsa regex
# genişletilmesi gerekebilir — bu yüzden hiç eşleşme yoksa "eksik"
# işaretlenir, ASLA sayı uydurulmaz.

HİSSE_SATIR_DESENI = re.compile(
    r"(TL|USD|EUR)\s+"                      # döviz cinsi
    r"([A-Z]{2}[A-Z0-9]{10})\s+"             # ISIN kodu (TRxxxxxxxxxx)
    r"([\d.,]+)\s+"                          # nominal değer (= pay adedi)
    r"([\d.,]+)\s+"                          # fiyat/oran alanı 1
    r"(\d{2}/\d{2}/\d{2})\s+"                # satın alış tarihi
    r"(\d+)\s+"                              # borsa sözleşme no
    r"([\d.,]+)\s+"                          # fiyat/oran alanı 2
    r"([\d.,\-]+)\s+"                        # toplam değer (TL)
    r"([\d.,\-]+)\s+"                        # GRUP (%)
    r"([\d.,\-]+)\s+"                        # TOPLAM (FPD GÖRE) (%) — kullandığımız
    r"([\d.,\-]+)"                           # TOPLAM (FTD GÖRE) (%)
)
TICKER_DESENI = re.compile(r"^[A-ZİĞÜŞÖÇ0-9]{2,6}$")
_HISSE_BOLUM_BASLANGIC = ["HİSSE SENETLERİ", "HISSE SENETLERI"]
_HISSE_BOLUM_BITIS = ["VIOP Nakit Teminatı", "GRUP TOPLAMI", "FON PORTFÖY DEĞERİ",
                       "IV-FON TOPLAM DEĞERİ", "IV-FON TOPLAM DEGERI"]


def extract_hisseler_from_pdf(pdf_bytes: bytes) -> tuple:
    """KAP'ın 'I-FONU TANITICI BİLGİLER' bildirimindeki 'III-FON PORTFÖY
    DEĞERİ TABLOSU' / 'HİSSE SENETLERİ' bölümünü ayrıştırır (yukarıdaki
    doğrulanmış satır yapısına göre). pdfplumber ile TAM METİN çıkarır
    (extract_tables DEĞİL — bu belge tipinde çok karmaşık/çok satırlı
    başlıklı bir tablo, hücre bazlı çıkarım güvenilir değil; tam metin +
    regex, GERÇEK örnekte doğrulanan yöntem). Eşleşme yoksa 'eksik'
    işaretler, ASLA sayı uydurmaz."""
    if pdfplumber is None:
        return [], ["pdfplumber_yuklu_degil"]

    import io
    tam_metin = ""
    try:
        with io.BytesIO(pdf_bytes) as buf, pdfplumber.open(buf) as pdf:
            for sayfa in pdf.pages[:PDF_MAX_SAYFA]:
                tam_metin += (sayfa.extract_text() or "") + "\n"
    except Exception as e:
        return [], [f"pdf_okuma_hata: {e}"]

    baslangic = -1
    for etiket in _HISSE_BOLUM_BASLANGIC:
        i = tam_metin.find(etiket)
        if i != -1:
            baslangic = i
            break
    if baslangic == -1:
        return [], ["hisse_senetleri_bolumu_bulunamadi"]

    bitis_adaylari = [tam_metin.find(e, baslangic + 20) for e in _HISSE_BOLUM_BITIS]
    bitis_adaylari = [b for b in bitis_adaylari if b != -1]
    bitis = min(bitis_adaylari) if bitis_adaylari else len(tam_metin)
    bolum = tam_metin[baslangic:bitis]

    hisseler = []
    onceki_bitis = 0
    _baslik_gurultu = {"HİSSE SENETLERİ", "HISSE SENETLERI", "HİSSE TÜRK", "HISSE TURK"}
    for m in HİSSE_SATIR_DESENI.finditer(bolum):
        # ticker, bu satırla BİR ÖNCEKİ eşleşme arasındaki (isim bloğu)
        # metnin İLK "gerçek" satırının İLK kelimesi — gerçek örnekte
        # doğrulandı. Bölüm başlığı/kolon başlığı gürültüsü (ör. "HİSSE
        # SENETLERİ", "Hisse Türk") İLK bloktan ELENİR, yoksa "HİSSE" ticker
        # sanılabiliyordu (tespit edilip düzeltildi).
        isim_bloku = bolum[onceki_bitis:m.start()]
        onceki_bitis = m.end()
        satirlar = [s.strip() for s in isim_bloku.splitlines() if s.strip()]
        satirlar = [s for s in satirlar if _tr_upper(s) not in _baslik_gurultu]
        if not satirlar:
            continue
        ilk_kelime = satirlar[0].split()[0] if satirlar[0].split() else ""
        if not TICKER_DESENI.fullmatch(ilk_kelime):
            continue
        (_doviz, _isin, nominal, _f1, _tarih, _kod, _f2, tl_deger,
         _grup_yuzde, fpd_yuzde, _ftd_yuzde) = m.groups()
        nominal_sayi = parse_tr_sayi(nominal)
        hisseler.append(HisseKalemi(
            hisse_kodu=ilk_kelime,
            pay_yuzde=parse_tr_sayi(fpd_yuzde),
            tl_deger=parse_tr_sayi(tl_deger),
            tahmini_lot=int(nominal_sayi) if nominal_sayi is not None else None,
        ))

    eksik = [] if hisseler else ["hisse_satiri_regex_eslesmedi"]
    return hisseler, eksik



# ───────────────────────── ana akış ─────────────────────────

def fon_isle(kap: KapFonIstemci, fon_kodu: str, fon_adi: str, semsiye_turu: str,
             kurucu: str, buyukluk: Optional[float]) -> FonKarti:
    kart = FonKarti(fon_kodu=fon_kodu, fon_adi=fon_adi, semsiye_turu=semsiye_turu,
                     kurucu=kurucu, fon_buyuklugu_tl=buyukluk)

    uye = kap.fon_uyesi_bul(fon_kodu, fon_adi)
    if not uye or not uye.get("mkkMemberOid"):
        kart.veri_eksik.append("kap_uye_bulunamadi")
        return kart

    bildirim = kap.son_tanitici_bilgiler_bildirimi(uye["mkkMemberOid"])
    if not bildirim:
        kart.veri_eksik.append("tanitici_bilgiler_bildirimi_bulunamadi")
        return kart
    kart.bildirim_index = bildirim.get("disclosureIndex") or bildirim.get("id")
    kart.rapor_donemi = str(bildirim.get("publishDate", ""))[:7]

    if not kart.bildirim_index:
        kart.veri_eksik.append("bildirim_index_yok")
        return kart

    detay = kap.disclosure_detay(kart.bildirim_index)
    if not detay or not detay.get("objId"):
        kart.veri_eksik.append("ek_dosya_bulunamadi")
        return kart

    try:
        with zaman_siniri(PDF_MAX_SANIYE):
            pdf_bytes = kap.pdf_indir(detay["objId"])
    except ZamanAsimi:
        kart.veri_eksik.append("pdf_indirme_zaman_asimi")
        return kart
    if not pdf_bytes:
        kart.veri_eksik.append("pdf_indirilemedi")
        return kart

    hisseler, eksik = extract_hisseler_from_pdf(pdf_bytes)
    kart.hisseler = hisseler
    kart.veri_eksik.extend(eksik)
    return kart


def ters_indeks_kur(fonlar: list) -> dict:
    """hisse kodu -> [{fon_kodu, fon_adi, pay_yuzde, tahmini_lot}]"""
    indeks = {}
    for f in fonlar:
        for h in f.hisseler:
            indeks.setdefault(h.hisse_kodu, []).append({
                "fon_kodu": f.fon_kodu,
                "fon_adi": f.fon_adi,
                "pay_yuzde": h.pay_yuzde,
                "tl_deger": h.tl_deger,
                "tahmini_lot": h.tahmini_lot,
                "rapor_donemi": f.rapor_donemi,
            })
    for hisse in indeks:
        indeks[hisse].sort(key=lambda x: x["pay_yuzde"] or 0, reverse=True)
    return indeks


def _cikti_olustur(fonlar: list) -> dict:
    return {
        "guncelleme": time.strftime("%Y-%m-%d %H:%M:%S"),
        "fonSayisi": len(fonlar),
        "fonlar": {f.fon_kodu: asdict(f) for f in fonlar},
        "hisseIndeksi": ters_indeks_kur(fonlar),
    }


def _ara_kayit_yaz(fonlar: list, cikti_yolu: str):
    try:
        gecici = _cikti_olustur(fonlar)
        gecici["tamamlandi"] = False
        with open(cikti_yolu, "w", encoding="utf-8") as f:
            json.dump(gecici, f, ensure_ascii=False, indent=2)
        print(f"  💾 Ara kayıt yazıldı ({len(fonlar)} fon)")
    except Exception as e:
        print(f"  ⚠️ Ara kayıt yazılamadı: {e}")
        return
    import os
    worker_url = os.environ.get("WORKER_URL", "").strip().rstrip("/")
    panel_key = os.environ.get("PANEL_KEY", "").strip()
    if worker_url and panel_key:
        try:
            push_to_worker(cikti_yolu, worker_url, panel_key)
            print(f"  📡 Ara kayıt worker'a da gönderildi ({len(fonlar)} fon)")
        except Exception as e:
            print(f"  ⚠️ Ara kayıt worker'a gönderilemedi: {e}")


def fon_karti_from_dict(d: dict) -> FonKarti:
    """asdict(FonKarti)'nin JSON'dan geri dönüşü — KALDIĞI YERDEN DEVAM için
    (kap_ortaklik_scraper.py'deki sirket_karti_from_dict ile aynı desen)."""
    return FonKarti(
        fon_kodu=d.get("fon_kodu", ""),
        fon_adi=d.get("fon_adi", ""),
        semsiye_turu=d.get("semsiye_turu", ""),
        kurucu=d.get("kurucu", ""),
        fon_buyuklugu_tl=d.get("fon_buyuklugu_tl"),
        rapor_donemi=d.get("rapor_donemi", ""),
        bildirim_index=d.get("bildirim_index"),
        hisseler=[HisseKalemi(**h) for h in (d.get("hisseler") or [])],
        veri_eksik=d.get("veri_eksik") or [],
    )


def onceki_veriyi_getir(worker_url: str, panel_key: str) -> Optional[dict]:
    """worker'daki KV'de duran EN SON push edilen fon_hisse_haritasi.json'u
    okur (bkz. worker.js /api/fonHam). Hata/yoklukta None — asla uydurma."""
    try:
        r = httpx.get(f"{worker_url}/api/fonHam", params={"key": panel_key}, timeout=30)
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


def main(sinirli_sayi: Optional[int] = None, cikti_yolu: str = "fon_hisse_haritasi.json"):
    print("TEFAS fon listesi çekiliyor…")
    tefas = TefasIstemci()
    ham_liste = tefas.hisse_yogun_fon_listesi()
    print(f"  {len(ham_liste)} hisse yoğun/değişken fon bulundu.")

    # ── KALDIĞI YERDEN DEVAM ───────────────────────────────────────────
    # kap_ortaklik_scraper.py'deki AYNI mantık: worker KV'sinden önceki
    # sonucu çek, hisseleri başarıyla çıkarılmış fonları bu run'da ATLA;
    # eksik kalanlar (zaman/ağ kaynaklı olabileceği için) her run'da
    # tekrar denenir.
    onceki_fonlar: dict = {}
    worker_url = os.environ.get("WORKER_URL", "").strip().rstrip("/")
    panel_key = os.environ.get("PANEL_KEY", "").strip()
    if worker_url and panel_key:
        try:
            onceki_ham = onceki_veriyi_getir(worker_url, panel_key)
            if onceki_ham and onceki_ham.get("fonlar"):
                onceki_fonlar = onceki_ham["fonlar"]
                print(f"  ↩️ Önceki taramadan {len(onceki_fonlar)} fon kaydı bulundu (worker KV).")
        except Exception as e:
            print(f"  ⚠️ Önceki veri alınamadı, bu run sıfırdan başlıyor: {e}")
    else:
        print("  ℹ️ WORKER_URL/PANEL_KEY yok — kaldığı yerden devam edilemiyor, sıfırdan başlanıyor.")

    tamamlanan_kodlar = {k for k, d in onceki_fonlar.items() if d.get("hisseler")}
    if tamamlanan_kodlar:
        print(f"  ✅ {len(tamamlanan_kodlar)} fon zaten başarıyla işlenmiş — bu run'da ATLANACAK.")

    fonlar = [fon_karti_from_dict(onceki_fonlar[k]) for k in tamamlanan_kodlar]

    if sinirli_sayi:
        ham_liste = ham_liste[:sinirli_sayi]
    islenecekler = [f for f in ham_liste if f["fon_kodu"] not in tamamlanan_kodlar]
    print(f"  İşlenecek: {len(islenecekler)} / toplam {len(ham_liste)} fon "
          f"({len(ham_liste)-len(islenecekler)} zaten tamam).")

    kap = KapFonIstemci()
    baslangic_t = time.monotonic()
    for i, f in enumerate(islenecekler):
        if time.monotonic() - baslangic_t > MAX_TOPLAM_SANIYE:
            print(f"\n⏹️ Zaman bütçesi doldu — kalan {len(islenecekler)-i} fon bir SONRAKİ run'a kalacak, "
                  "o ana kadarki veri (öncekilerle birleşik) kaydediliyor.")
            break
        print(f"[{i+1}/{len(islenecekler)}] {f['fon_kodu']} işleniyor…")
        try:
            with zaman_siniri(180):
                kart = fon_isle(kap, f["fon_kodu"], f["fon_adi"], f["semsiye_turu"],
                                 f["kurucu"], f["fon_buyuklugu_tl"])
        except ZamanAsimi:
            print(f"  ⏱️ {f['fon_kodu']} 3 dakikada bitmedi, atlanıyor")
            continue
        except Exception as e:
            print(f"  ⚠️ {f['fon_kodu']} hata: {e}")
            continue
        if kart.veri_eksik:
            print(f"  ⚠️ eksik: {', '.join(kart.veri_eksik)}")
        else:
            print(f"  ✅ {len(kart.hisseler)} hisse çıkarıldı")
        fonlar.append(kart)
        if len(fonlar) % 17 == 0:
            _ara_kayit_yaz(fonlar, cikti_yolu)

    cikti = _cikti_olustur(fonlar)
    cikti["tamamlandi"] = len(islenecekler) == 0 or (time.monotonic() - baslangic_t <= MAX_TOPLAM_SANIYE)
    with open(cikti_yolu, "w", encoding="utf-8") as f:
        json.dump(cikti, f, ensure_ascii=False, indent=2)

    eksikli = [f.fon_kodu for f in fonlar if f.veri_eksik]
    kalan = len(ham_liste) - len(fonlar)
    print(f"\n✅ {len(fonlar)} fon toplamda hazır ({len(fonlar)-len(tamamlanan_kodlar)} bu run'da işlendi). Çıktı: {cikti_yolu}")
    if kalan > 0:
        print(f"⏭️ {kalan} fon henüz hiç işlenmedi — bir sonraki run'da devam edecek.")
    print(f"⚠️ Eksik veri içeren {len(eksikli)} fon: {', '.join(eksikli[:30])}"
          + (" ..." if len(eksikli) > 30 else ""))
    if eksikli:
        print("   İlk çalıştırmaysa: bu fonlardan 2-3 tanesinin bildirim linkini")
        print("   (https://www.kap.org.tr/tr/Bildirim/<index>) yapıştır, parse'ı düzeltelim.")
    if kap.durum_sayaci:
        print(f"📊 KAP'tan alınan tekrar-denenen HTTP durum kodları: {kap.durum_sayaci} "
              "— bunlar yüksekse KAP bu IP'yi geçici sınırlıyor demektir, RATE_LIMIT_SEC artırılabilir.")


def push_to_worker(cikti_yolu: str, worker_url: str, panel_key: str):
    """worker.js'e /api/fonYukle route'u eklenmesi gerekiyor (bkz. worker.js
    tarafındaki /api/ortaklikYukle ile aynı desen — VERI KV'sine bu JSON'u
    'fonHisseHaritasi' anahtarıyla yazan bir route)."""
    with open(cikti_yolu, encoding="utf-8") as f:
        veri = json.load(f)
    r = httpx.post(f"{worker_url}/api/fonYukle", json={"key": panel_key, "veri": veri}, timeout=30)
    print(r.status_code, r.text[:300])
    if r.status_code != 200:
        raise RuntimeError(f"Worker push başarısız: HTTP {r.status_code} — {r.text[:300]}")
    try:
        cevap = r.json()
    except Exception:
        raise RuntimeError(f"Worker'dan geçersiz yanıt: {r.text[:300]}")
    if not cevap.get("ok"):
        raise RuntimeError(f"Worker push reddetti: {cevap.get('hata', 'bilinmeyen hata')}")


# ═══════════════════════ 🕰️ GEÇMİŞ DOLDURMA (backfill) ═══════════════════════
#
# main() SADECE en güncel ayı işler. Bu bölüm AYNI KAP kaynağından
# (tum_tanitici_bilgiler_bildirimleri) geriye dönük TÜM ayları tarar —
# TEFAS'ta hisse kırılımının geçmişi YOK, ama KAP'ın bildirim sorgusu
# zaten geriye dönük bir pencere (~25 ay) döndürüyor; ayrı bir "tarihsel
# API" gerekmiyor, sadece o pencerede bulduğun HER ayı (sadece en
# güncelini değil) işlemen gerekiyor.
#
# 610 fon × geçmişteki ay sayısı kadar PDF indirme — bu TEK run'a SIĞMAZ.
# Kaldığı yerden devam, worker KV'de iki katmanda:
#   - "fonGecmisListe"  (mevcut, worker.js'de zaten vardı) : KESİNLEŞMİŞ aylar.
#   - "fonGecmisTaslak" (yeni)  : sürmekte olan taramanın ARA hali —
#     {"islenenFonlar": [...], "aylar": {AY: {fonKodu: fonKartDict}}}.
#   Bir ay ancak fon_listesi'ndeki TÜM fonlar (bu run + önceki run'larda
#   birikerek) taranmış olunca "fonGecmis:AY" olarak KESİNLEŞTİRİLİR —
#   yoksa eksik fonlarla "tamamlanmış ay" diye YANLIŞ bir sonuç worker'a
#   yazılmış olurdu (dosya başındaki "asla sayı uydurma" ilkesiyle aynı
#   mantık, burada "asla eksik ayı tam diye işaretleme").

GECMIS_GUN_GERIYE = 760  # ~25 ay — KAP'ın döndürdüğü kadarını al, fazlası boş gelir


def taslak_getir(worker_url: str, panel_key: str) -> dict:
    try:
        r = httpx.get(f"{worker_url}/api/fonGecmisTaslakOku", params={"key": panel_key}, timeout=30)
        if r.status_code == 200 and r.json().get("ok"):
            return r.json().get("veri") or {"islenenFonlar": [], "aylar": {}}
    except Exception:
        pass
    return {"islenenFonlar": [], "aylar": {}}


def taslak_yaz(worker_url: str, panel_key: str, taslak: dict):
    try:
        r = httpx.post(f"{worker_url}/api/fonGecmisTaslakYaz", json={"key": panel_key, "veri": taslak}, timeout=60)
        if r.status_code != 200 or not r.json().get("ok"):
            print(f"  ⚠️ Taslak worker'a yazılamadı: {r.status_code} {r.text[:200]}")
    except Exception as e:
        print(f"  ⚠️ Taslak worker'a yazılamadı: {e}")


def tamamlanmis_aylari_getir(worker_url: str, panel_key: str) -> set:
    try:
        r = httpx.get(f"{worker_url}/api/fonGecmisListeOku", params={"key": panel_key}, timeout=30)
        if r.status_code == 200 and r.json().get("ok"):
            return set(r.json().get("aylar") or [])
    except Exception:
        pass
    return set()


def kap_uyesini_ve_gecmisini_isle(kap: "KapFonIstemci", f: dict, tamamlanmis_aylar: set) -> dict:
    """Bir fon için, henüz KESİNLEŞMEMİŞ (tamamlanmis_aylar dışındaki) tüm
    geçmiş aylık 'I-FONU TANITICI BİLGİLER' bildirimlerini indirir, parse
    eder. Dönüş: {ay: fonKartDict}. Üye/bildirim bulunamazsa boş dict döner
    — ama fon yine de çağıran tarafta 'islenen' sayılır: KAP'ta o an
    yoksa, tekrar denemek de bulmaz."""
    sonuc = {}
    uye = kap.fon_uyesi_bul(f["fon_kodu"], f["fon_adi"])
    if not uye or not uye.get("mkkMemberOid"):
        return sonuc
    bildirimler = kap.tum_tanitici_bilgiler_bildirimleri(uye["mkkMemberOid"], GECMIS_GUN_GERIYE)
    for ay, bildirim in bildirimler.items():
        if ay in tamamlanmis_aylar:
            continue
        kart = FonKarti(fon_kodu=f["fon_kodu"], fon_adi=f["fon_adi"],
                         semsiye_turu=f["semsiye_turu"], kurucu=f["kurucu"],
                         fon_buyuklugu_tl=f["fon_buyuklugu_tl"], rapor_donemi=ay)
        bildirim_index = bildirim.get("disclosureIndex") or bildirim.get("id")
        if not bildirim_index:
            kart.veri_eksik.append("bildirim_index_yok")
            sonuc[ay] = asdict(kart)
            continue
        kart.bildirim_index = bildirim_index
        detay = kap.disclosure_detay(bildirim_index)
        if not detay or not detay.get("objId"):
            kart.veri_eksik.append("ek_dosya_bulunamadi")
            sonuc[ay] = asdict(kart)
            continue
        try:
            with zaman_siniri(PDF_MAX_SANIYE):
                pdf_bytes = kap.pdf_indir(detay["objId"])
        except ZamanAsimi:
            kart.veri_eksik.append("pdf_indirme_zaman_asimi")
            sonuc[ay] = asdict(kart)
            continue
        if not pdf_bytes:
            kart.veri_eksik.append("pdf_indirilemedi")
            sonuc[ay] = asdict(kart)
            continue
        hisseler, eksik = extract_hisseler_from_pdf(pdf_bytes)
        kart.hisseler = hisseler
        kart.veri_eksik.extend(eksik)
        sonuc[ay] = asdict(kart)
    return sonuc


def _ay_veri_paketle(ay: str, fon_dict: dict) -> dict:
    """taslak['aylar'][ay] ({fonKodu: fonKartDict}) -> worker'ın
    /api/fonGecmisYukle beklediği {guncelleme, fonSayisi, fonlar, hisseIndeksi}."""
    fonlar_listesi = [fon_karti_from_dict(d) for d in fon_dict.values()]
    return {
        "guncelleme": f"{ay}-01 00:00:00",
        "fonSayisi": len(fonlar_listesi),
        "fonlar": {f.fon_kodu: asdict(f) for f in fonlar_listesi},
        "hisseIndeksi": ters_indeks_kur(fonlar_listesi),
    }


def gecmis_doldur():
    """Backfill ana akışı. Tek run'da bitmezse ('⏭️ Tarama TAM DEĞİL' mesajı)
    script'i AYNEN TEKRAR çalıştır — kaldığı fondan devam eder, hiçbir şeyi
    yeniden indirmez (worker'daki taslaktan okur)."""
    worker_url = os.environ.get("WORKER_URL", "").strip().rstrip("/")
    panel_key = os.environ.get("PANEL_KEY", "").strip()
    if not worker_url or not panel_key:
        print("❌ WORKER_URL / PANEL_KEY tanımlı değil — backfill worker'sız çalışamaz "
              "(taslak durumu orada, KV'de tutuluyor).")
        return

    print("TEFAS fon listesi çekiliyor…")
    tefas = TefasIstemci()
    fon_listesi = tefas.hisse_yogun_fon_listesi()
    print(f"  {len(fon_listesi)} hisse yoğun/değişken fon bulundu.")

    sinir_ham = os.environ.get("FON_SAYISI", "").strip()
    if sinir_ham and sinir_ham.lower() != "tumu":
        fon_listesi = fon_listesi[: int(sinir_ham)]
        print(f"  ℹ️ Test modu: sadece ilk {len(fon_listesi)} fon.")

    tamamlanmis_aylar = tamamlanmis_aylari_getir(worker_url, panel_key)
    print(f"  📅 Worker'da zaten kesinleşmiş {len(tamamlanmis_aylar)} ay var: {sorted(tamamlanmis_aylar)}")

    taslak = taslak_getir(worker_url, panel_key)
    islenen = set(taslak.get("islenenFonlar") or [])
    aylar = taslak.get("aylar") or {}
    print(f"  ↩️ Önceki run'lardan {len(islenen)} fon zaten taranmış (bu run'da atlanacak).")

    kap = KapFonIstemci()
    baslangic_t = time.monotonic()
    islenecekler = [f for f in fon_listesi if f["fon_kodu"] not in islenen]
    print(f"  İşlenecek: {len(islenecekler)} / toplam {len(fon_listesi)} fon.")

    for i, f in enumerate(islenecekler):
        if time.monotonic() - baslangic_t > MAX_TOPLAM_SANIYE:
            print(f"\n⏹️ Zaman bütçesi doldu — kalan {len(islenecekler)-i} fon SONRAKİ run'a kalacak.")
            break
        print(f"[{i+1}/{len(islenecekler)}] {f['fon_kodu']} geçmişi taranıyor…")
        try:
            with zaman_siniri(600):  # bir fonun TÜM geçmişi (çoklu PDF) tek aydan uzun sürer
                fon_aylari = kap_uyesini_ve_gecmisini_isle(kap, f, tamamlanmis_aylar)
        except ZamanAsimi:
            print(f"  ⏱️ {f['fon_kodu']} 10 dakikada bitmedi, atlanıyor (bu run'da 'islenen' SAYILMAYACAK)")
            continue
        except Exception as e:
            print(f"  ⚠️ {f['fon_kodu']} hata: {e}")
            continue
        for ay, kart_dict in fon_aylari.items():
            aylar.setdefault(ay, {})[f["fon_kodu"]] = kart_dict
        islenen.add(f["fon_kodu"])
        print(f"  ✅ {len(fon_aylari)} ay bulundu: {sorted(fon_aylari.keys())}")

        if (i + 1) % 10 == 0:
            taslak_yaz(worker_url, panel_key, {"islenenFonlar": sorted(islenen), "aylar": aylar})
            print(f"  💾 Taslak worker'a kaydedildi ({len(islenen)} fon işlenmiş, {len(aylar)} ay biriktirilmiş)")

    print("💾 Taslak worker'a kaydediliyor…")
    taslak_yaz(worker_url, panel_key, {"islenenFonlar": sorted(islenen), "aylar": aylar})

    tum_fon_kodlari = {f["fon_kodu"] for f in fon_listesi}
    tamamlandi = tum_fon_kodlari.issubset(islenen)
    if not tamamlandi:
        kalan = len(tum_fon_kodlari - islenen)
        print(f"\n⏭️ Tarama TAM DEĞİL — {kalan} fon henüz taranmadı. Script'i TEKRAR çalıştır, "
              "kaldığı yerden devam edecek. Hiçbir ay henüz kesinleştirilmedi (yarım veriyle "
              "'tamamlandı' izlenimi vermemek için).")
        if kap.durum_sayaci:
            print(f"📊 KAP'tan alınan tekrar-denenen HTTP durum kodları: {kap.durum_sayaci}")
        return

    print(f"\n✅ TÜM {len(fon_listesi)} fon tarandı. {len(aylar)} ay kesinleştiriliyor…")
    for ay in sorted(aylar.keys()):
        if ay in tamamlanmis_aylar:
            continue
        paket = _ay_veri_paketle(ay, aylar[ay])
        try:
            r = httpx.post(f"{worker_url}/api/fonGecmisYukle", timeout=60,
                            json={"key": panel_key, "ay": ay, "veri": paket})
            cevap = r.json() if r.status_code == 200 else {}
            if r.status_code == 200 and cevap.get("ok"):
                print(f"  📤 {ay} kesinleşti — {cevap.get('fonSayisi')} fon.")
            else:
                print(f"  ⚠️ {ay} worker'a yazılamadı: {r.status_code} {r.text[:200]}")
        except Exception as e:
            print(f"  ⚠️ {ay} worker'a gönderilemedi: {e}")

    taslak_yaz(worker_url, panel_key, {"islenenFonlar": [], "aylar": {}})
    print("🧹 Taslak temizlendi. Backfill tamamlandı — FONLAR sekmesi artık geçmiş verilerle dolu olmalı.")
    if kap.durum_sayaci:
        print(f"📊 KAP'tan alınan tekrar-denenen HTTP durum kodları: {kap.durum_sayaci}")


if __name__ == "__main__":
    import os
    import sys

    if os.environ.get("GECMIS_DOLDUR", "").strip() == "1" or (len(sys.argv) > 1 and sys.argv[1] == "gecmis"):
        print("🕰️ GEÇMİŞ DOLDURMA (backfill) modu başlıyor…")
        gecmis_doldur()
    else:
        sinir_ham = os.environ.get("FON_SAYISI", "").strip()
        sinirli = None if (not sinir_ham or sinir_ham.lower() == "tumu") else int(sinir_ham)
        cikti_yolu = "fon_hisse_haritasi.json"

        print(f"Başlıyor — fon sınırı: {sinirli or 'YOK (tüm hisse yoğun/değişken fonlar)'}")
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
            print("ℹ️ WORKER_URL / PANEL_KEY tanımlı değil — sadece dosya üretildi.")
