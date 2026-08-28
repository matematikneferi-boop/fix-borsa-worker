#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fon Hisse Scraper — TEFAS + KAP Portföy Dağılım Raporu
=========================================================

Ne yapar
--------
1) TEFAS'ın herkese açık karşılaştırma uç noktasından (BindComparisonFundReturns)
   TÜM TEFAS fonlarının listesini çeker, "Hisse Senedi Şemsiye Fonu" ve
   "Değişken Şemsiye Fonu" (BIST'e bakan, hisse yoğun/değişken) türündekileri
   filtreler — senin seçimin: sadece bu ikisi, para piyasası/borçlanma/altın
   fonları DIŞARIDA.
2) Her fon için KAP'ta o fonun kendi bildirim akışında "Portföy Dağılım
   Raporu" (Bildirim Tipi: DG, aylık) bildirimini arar, EN GÜNCEL olanı bulur.
3) O bildirimin PDF ekini indirir, içindeki hisse bazlı satırları (kod,
   adet/lot, TL değer, oran %) çıkarmaya çalışır.
4) Ters indeks kurar: hisse kodu -> [{fon_kodu, fon_adi, pay_yuzde, tahmini_lot}]
   ve fon kodu -> [{hisse, pay_yuzde, tahmini_lot}] (iki yönlü de sorgulanabilir
   olsun diye).

Çıktı: fon_hisse_haritasi.json — worker'daki KV'ye "fonHisseHaritasi" anahtarıyla
yazılması için push_to_worker() ile /api/fonYukle route'una POST eder (bu route
worker.js'e ayrıca eklenmeli, bkz. dosya sonu).

DÜRÜST NOTLAR (gerçek kısıtlar, gizlenmedi)
--------------------------------------------
- TEFAS, bir fonun VARLIK SINIFI dağılımını (örn. "%62 Hisse Senedi, %20
  Tahvil...") herkese açık API'sinden net veriyor. AMA "hangi hisse, ne kadar"
  bilgisi TEFAS'ta YOK. Bu bilgi sadece SPK mevzuatı gereği fonların her ayın
  ilk haftasında KAP'a yüklediği "Aylık Portföy Dağılım Raporu" ekinde var.
  Kaynak zorunlu olarak KAP — TEFAS sadece fon listesi/isim/tür/büyüklük için
  kullanılıyor.
- KAP tarafı, kap_ortaklik_scraper.py'daki AYNI KapIstemci makinesini
  (member/filter, disclosure/byCriteria, attachment-detail, file/download)
  kullanıyor. Fonların da (BIO, TTE, KPH, TGE gibi) şirket ticker'ları gibi
  3 harfli KAP kodları olduğu ve aynı uçlarla sorgulanabildiği, KAP'ın halka
  açık bildirim sayfalarında GÖZLEMLENDİ (bkz. isportfoy.com.tr KAP duyuru
  listesi) — ama bu varsayım BU SANDBOX'TA CANLI TEST EDİLEMEDİ (internet
  kapalı, kap.org.tr ve tefas.gov.tr'ye bu ortamdan erişim yok).
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
TEFAS_BASE = "https://www.tefas.gov.tr"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
RATE_LIMIT_SEC = 1.2
PDF_MAX_SAYFA = 25          # portföy tablosu genelde raporun ilk sayfalarında
PDF_MAX_SANIYE = 25
MAX_TOPLAM_SANIYE = 5 * 3600

# Senin seçimin: sadece BIST'e bakan (hisse yoğun / değişken) şemsiye fon türleri
HEDEF_SEMSIYE_TURLERI = {
    "Hisse Senedi Şemsiye Fonu",
    "Değişken Şemsiye Fonu",
}


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
    def __init__(self):
        self.c = httpx.Client(
            base_url=TEFAS_BASE,
            headers={
                "User-Agent": UA,
                "Accept": "application/json, text/plain, */*",
                "X-Requested-With": "XMLHttpRequest",
                "Referer": f"{TEFAS_BASE}/TarihselVeriler.aspx",
            },
            timeout=20.0,
            follow_redirects=True,
        )
        try:
            self.c.get("/TarihselVeriler.aspx")  # oturum çerezi almak için
        except Exception:
            pass

    def hisse_yogun_fon_listesi(self) -> list:
        """BindComparisonFundReturns üzerinden tüm fon listesini çeker,
        HEDEF_SEMSIYE_TURLERI ile filtreler.

        NOT: Bu uç yaygın Python/Node TEFAS scraper'larında (pytefas, tefas_scraper
        vb.) kullanılan, tersine mühendislikle bulunmuş GAYRIRESMI bir uçtur.
        Alan adları (fontip/sfontur/...) TEFAS'ın kendi ön yüzünün gönderdiği
        form alanlarıdır. TEFAS bunu değiştirirse bu fonksiyon 0 sonuç
        döndürür — sessizce geçmek yerine RuntimeError fırlatır ki fark edilsin.
        """
        try:
            r = self.c.post(
                "/api/DB/BindComparisonFundReturns",
                data={
                    "fontip": "YAT",       # yatırım fonu (emeklilik değil)
                    "sfontur": "",
                    "fonkod": "",
                    "fongrup": "",
                    "bastarih": "",
                    "bittarih": "",
                    "fonturkod": "",
                    "fonunvantip": "",
                    "strperiod": "1A",
                    "islemdurum": "1",
                },
            )
            r.raise_for_status()
            veri = r.json()
        except Exception as e:
            raise RuntimeError(f"TEFAS fon listesi alınamadı: {e}")

        kayitlar = veri.get("data", veri) if isinstance(veri, dict) else veri
        if not isinstance(kayitlar, list) or len(kayitlar) < 50:
            raise RuntimeError(
                f"TEFAS'tan beklenenden az/hatalı kayıt geldi ({len(kayitlar) if isinstance(kayitlar, list) else 'liste değil'}) "
                "— TEFAS uç noktası/alan adları değişmiş olabilir, canlı kontrol gerekiyor."
            )

        sonuc = []
        for k in kayitlar:
            tur = str(k.get("FONTURACIKLAMA") or k.get("fontur") or k.get("SFONTURACIKLAMA") or "").strip()
            if HEDEF_SEMSIYE_TURLERI and not any(h in tur for h in HEDEF_SEMSIYE_TURLERI):
                continue
            kod = normalize_kod(k.get("FONKODU") or k.get("fonkodu") or "")
            if not kod:
                continue
            sonuc.append({
                "fon_kodu": kod,
                "fon_adi": str(k.get("FONUNVAN") or k.get("fonunvan") or "").strip(),
                "semsiye_turu": tur,
                "kurucu": str(k.get("KURUCU") or k.get("kurucu") or "").strip(),
                "fon_buyuklugu_tl": parse_tr_sayi(k.get("PORTFOYBUYUKLUK") or k.get("portfoyBuyukluk")),
            })
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

    def _bekle(self):
        gecen = time.time() - self._son_istek
        if gecen < RATE_LIMIT_SEC:
            time.sleep(RATE_LIMIT_SEC - gecen)
        self._son_istek = time.time()

    def _istek(self, method: str, yol: str, **kwargs):
        gecikmeler = [2, 5, 12]
        for deneme, gecikme in enumerate([0] + gecikmeler):
            if gecikme:
                time.sleep(gecikme)
            self._bekle()
            try:
                return self.c.request(method, yol, **kwargs)
            except (httpx.RemoteProtocolError, httpx.ConnectError, httpx.ConnectTimeout,
                    httpx.ReadTimeout, httpx.ReadError, httpx.PoolTimeout):
                if deneme == len(gecikmeler):
                    raise
                continue

    def member_filter(self, fon_kodu: str) -> Optional[dict]:
        try:
            r = self._istek("GET", f"/tr/api/member/filter/{fon_kodu}",
                             headers={"Referer": f"{KAP_BASE}/tr/bist-sirketler"})
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
                if isinstance(kayit, dict) and str(kayit.get("companyCode", "")).upper() == fon_kodu.upper():
                    return kayit
            return veri[0] if veri and isinstance(veri[0], dict) else None
        return veri if isinstance(veri, dict) else None

    def son_portfoy_dagilim_bildirimi(self, mkk_member_oid: str, gun_geriye: int = 400) -> Optional[dict]:
        """Son ~13 ay içindeki bildirimleri tarar, "Portföy Dağılım Raporu"
        başlıklı / DG tipli EN GÜNCEL bildirimi döndürür."""
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
            if isinstance(k, dict) and "portföy dağılım" in str(k.get("title", "") or k.get("subject", "")).lower()
        ]
        if not adaylar:
            return None
        adaylar.sort(key=lambda k: str(k.get("publishDate", "") or k.get("basicDate", "")), reverse=True)
        return adaylar[0]

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

HISSE_KOD_BASLIK = ["Hisse Kodu", "Kod", "Menkul Kıymet Kodu", "Sembol", "Enstrüman"]
ORAN_BASLIK = ["Portföy İçindeki Oranı (%)", "Fon Toplam Değerine Oranı (%)", "Oran (%)", "Pay (%)", "%"]
ADET_BASLIK = ["Nominal/Adet", "Adet", "Nominal Adet", "Lot"]
TL_BASLIK = ["Rayiç Değer (TL)", "Piyasa Değeri (TL)", "TL Değer", "Değer (TL)"]

# BIST hisse kodları 4-6 büyük harf; tabloda "TOPLAM", "HİSSE SENEDİ" gibi
# alt toplam/başlık satırlarını elemek için basit bir filtre
GECERSIZ_SATIR = re.compile(
    r"^(TOPLAM|GENEL TOPLAM|ARA TOPLAM|HİSSE SENEDİ|PAY SENEDİ|DİĞER|NAKİT)\b", re.IGNORECASE
)


def _baslik_indeksi(basliklar: list, adaylar: list) -> Optional[int]:
    for i, b in enumerate(basliklar):
        for a in adaylar:
            if a.lower() in b.lower():
                return i
    return None


def extract_hisseler_from_pdf(pdf_bytes: bytes) -> tuple:
    """PDF'teki tabloları tarar, hisse kodu + oran (+ varsa adet/TL değer)
    sütunlarını başlık metnine göre bulur. Bulamazsa boş liste + 'eksik' notu
    döner — UYDURMA VERİ ÜRETİLMEZ."""
    if pdfplumber is None:
        return [], ["pdfplumber_yuklu_degil"]

    import io
    hisseler = []
    eksik = []
    try:
        with io.BytesIO(pdf_bytes) as buf, pdfplumber.open(buf) as pdf:
            for sayfa_no, sayfa in enumerate(pdf.pages[:PDF_MAX_SAYFA]):
                for tablo in (sayfa.extract_tables() or []):
                    if not tablo or len(tablo) < 2:
                        continue
                    basliklar = [_hucre(x) for x in tablo[0]]
                    kod_i = _baslik_indeksi(basliklar, HISSE_KOD_BASLIK)
                    oran_i = _baslik_indeksi(basliklar, ORAN_BASLIK)
                    if kod_i is None or oran_i is None:
                        continue
                    adet_i = _baslik_indeksi(basliklar, ADET_BASLIK)
                    tl_i = _baslik_indeksi(basliklar, TL_BASLIK)
                    for satir in tablo[1:]:
                        kod = _hucre(satir[kod_i]) if kod_i < len(satir) else ""
                        if not kod or GECERSIZ_SATIR.match(kod):
                            continue
                        if not re.fullmatch(r"[A-ZİĞÜŞÖÇ]{3,6}", kod.upper()):
                            continue
                        oran = parse_tr_sayi(satir[oran_i]) if oran_i < len(satir) else None
                        adet = parse_tr_sayi(satir[adet_i]) if (adet_i is not None and adet_i < len(satir)) else None
                        tl = parse_tr_sayi(satir[tl_i]) if (tl_i is not None and tl_i < len(satir)) else None
                        hisseler.append(HisseKalemi(
                            hisse_kodu=kod.upper(),
                            pay_yuzde=oran,
                            tl_deger=tl,
                            tahmini_lot=int(adet) if adet is not None else None,
                        ))
    except Exception as e:
        eksik.append(f"pdf_parse_hata: {e}")

    if not hisseler:
        eksik.append("hisse_tablosu_bulunamadi")
    return hisseler, eksik


def _hucre(x) -> str:
    if x is None:
        return ""
    return re.sub(r"\s+", " ", str(x).replace("\n", " ")).strip()


# ───────────────────────── ana akış ─────────────────────────

def fon_isle(kap: KapFonIstemci, fon_kodu: str, fon_adi: str, semsiye_turu: str,
             kurucu: str, buyukluk: Optional[float]) -> FonKarti:
    kart = FonKarti(fon_kodu=fon_kodu, fon_adi=fon_adi, semsiye_turu=semsiye_turu,
                     kurucu=kurucu, fon_buyuklugu_tl=buyukluk)

    uye = kap.member_filter(fon_kodu)
    if not uye or not uye.get("mkkMemberOid"):
        kart.veri_eksik.append("kap_uye_bulunamadi")
        return kart

    bildirim = kap.son_portfoy_dagilim_bildirimi(uye["mkkMemberOid"])
    if not bildirim:
        kart.veri_eksik.append("portfoy_dagilim_bildirimi_bulunamadi")
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


if __name__ == "__main__":
    import os
    import sys

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
