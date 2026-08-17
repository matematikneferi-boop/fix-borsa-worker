#!/usr/bin/env python3
"""
================== SEKTOR HARITASI URETICI (v3) ==================
v2'DEKI GIZLI HATA: veri gelmeyince (companies() bosdondu / hepsi
Ticker.info'da patladi / KAP-IsYatirim gecici blokladi) script
sys.exit(0) ile cikiyordu. GitHub Actions bunu YESIL/BASARILI
gosteriyor ama sektor.json HIC yazilmiyor - kullanici hicbir uyari
gormeden "Diger" grubunda kalmaya devam ediyordu.

YENI KURAL: veri gelmezse veya yetersiz gelirse script ARTIK
sys.exit(1) ile HATALI cikiyor -> Actions sekmesi KIRMIZI yanar,
GitHub'dan e-posta uyarisi gelir. Sessiz basarisizlik YOK.

IKINCI DUZELTME: 460+ hisse icin tek tek Ticker(kod).info['sector']
cekmek, aralarinda bekleme olmadan İş Yatırım'i art arda dovup
gecici blok (403/rate-limit) riskini artiriyordu. Artik:
  - istekler arasi kucuk bekleme (BEKLEME_SN)
  - her kod icin MAX_DENEME kez tekrar dene (ustel bekleme ile)
  - art arda cok fazla hata gelirse (COKLU_HATA_ESIK) script
    kendini yavaslatir / erken durur, sonsuz bloklanmaya devam etmez

CIKTI (sektor.json):
  {"guncelleme":"2026-08-17T...","sayi":432,"kaynak":"borsapy-ticker-info",
   "sektor":{"THYAO":"Ulastirma","GARAN":"Bankacilik", ...}}

GUVENLIK KURALI (v2'den korunuyor): veri eksik gelirse ESKI DOSYA
KORUNUR, ustune yazilmaz. Ama artik bu durum da HATA ile bildirilir.

Calistirma:  pip install borsapy && python sektor-cek.py
"""
import json
import os
import sys
import time
from datetime import datetime, timezone

CIKTI = "sektor.json"
ASGARI_ARTIS = 0.8      # eski dosyanin en az %80'i kadar hisse bulunmali
ILERLEME_ARALIK = 50     # her N hissede bir ilerleme yazdir
BEKLEME_SN = 0.35        # her Ticker.info istegi arasi bekleme (bloklanmayi azaltir)
MAX_DENEME = 3           # tek bir kod icin kac kez tekrar denensin
COKLU_HATA_ESIK = 40     # art arda bu kadar hata gelirse yavaslat/uyar


def eski_oku():
    try:
        with open(CIKTI, "r", encoding="utf-8") as f:
            j = json.load(f)
        return j.get("sektor") or {}
    except Exception:
        return {}


def temiz_kod(k):
    k = "".join(c for c in str(k).upper() if c.isalnum())
    return k if 3 <= len(k) <= 6 else None


def companies_al(bp, max_deneme=3):
    """companies() gecici olarak 403/hata verebiliyor - birkac kez dene."""
    son_hata = None
    for deneme in range(1, max_deneme + 1):
        try:
            df = bp.companies()
            if df is not None and len(df) > 0:
                return df
            print(f"  companies() bos dondu (deneme {deneme}/{max_deneme})")
        except Exception as e:
            son_hata = e
            print(f"  companies() hata (deneme {deneme}/{max_deneme}): {type(e).__name__}: {e}")
        if deneme < max_deneme:
            time.sleep(3 * deneme)  # ustel bekleme: 3sn, 6sn, ...
    if son_hata:
        print(f"companies() {max_deneme} denemede de basarisiz: {type(son_hata).__name__}: {son_hata}")
    return None


def sektor_cek_tek(bp, kod, max_deneme=MAX_DENEME):
    """Tek bir kod icin sektoru dener, gecici hatalarda tekrar dener."""
    for deneme in range(1, max_deneme + 1):
        try:
            t = bp.Ticker(kod)
            sektor = t.info.get("sector")
            return str(sektor).strip() if sektor else None
        except Exception:
            if deneme < max_deneme:
                time.sleep(0.6 * deneme)
    return None


def sektorleri_topla():
    """bp.companies() ile tum kodlari al, her kod icin Ticker.info['sector']
    cek. Istekler arasinda bekleme var, gecici hatalarda tekrar denenir."""
    import borsapy as bp

    df = companies_al(bp)
    if df is None:
        return {}, "companies() veri getiremedi"

    kolon = "ticker" if "ticker" in getattr(df, "columns", []) else df.columns[0]
    kodlar = sorted(set(k for k in (temiz_kod(x) for x in df[kolon]) if k))
    print(f"companies(): {len(kodlar)} hisse kodu bulundu")

    harita = {}
    hata_sayisi = 0
    ardarda_hata = 0
    for i, kod in enumerate(kodlar, 1):
        sektor = sektor_cek_tek(bp, kod)
        if sektor:
            harita[kod] = sektor
            ardarda_hata = 0
        else:
            hata_sayisi += 1
            ardarda_hata += 1
            if ardarda_hata == COKLU_HATA_ESIK:
                print(f"  ⚠️ art arda {ardarda_hata} hata — muhtemelen gecici blok (403/rate-limit), "
                      f"10 sn bekleyip yavaslatarak devam ediliyor")
                time.sleep(10)
        time.sleep(BEKLEME_SN)
        if i % ILERLEME_ARALIK == 0:
            print(f"  ... {i}/{len(kodlar)} islendi, {len(harita)} sektor bulundu, {hata_sayisi} hata")

    print(f"bitti: {len(harita)}/{len(kodlar)} hissede sektor bulundu ({hata_sayisi} hata)")
    return harita, None


def main():
    eski = eski_oku()
    print(f"eski sektor.json: {len(eski)} hisse")

    baslangic = time.time()
    try:
        harita, sebep = sektorleri_topla()
    except ImportError:
        print("HATA: borsapy kurulu degil — pip install borsapy")
        sys.exit(1)
    except Exception as e:
        print(f"HATA: beklenmeyen hata: {type(e).__name__}: {e}")
        sys.exit(1)

    print(f"sure: {time.time() - baslangic:.0f} sn")
    print(f"bulunan: {len(harita)} hisse")

    if not harita:
        print(f"HATA: HIC VERI YOK ({sebep}) — dosya DEGISTIRILMEDI")
        sys.exit(1)   # <-- v2'de burasi sys.exit(0) idi, hata GIZLENIYORDU

    if eski and len(harita) < len(eski) * ASGARI_ARTIS:
        print(f"HATA: KORUMA — yeni veri eskinin %{100*len(harita)/max(1,len(eski)):.0f}'i kadar "
              f"— dosya DEGISTIRILMEDI")
        sys.exit(1)   # <-- burasi da ayni sekilde artik hata olarak isaretleniyor

    cikti = {
        "guncelleme": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "sayi": len(harita),
        "kaynak": "borsapy-ticker-info",
        "sektor": dict(sorted(harita.items())),
    }
    with open(CIKTI, "w", encoding="utf-8") as f:
        json.dump(cikti, f, ensure_ascii=False, separators=(",", ":"))

    kb = os.path.getsize(CIKTI) / 1024
    farkli = len(set(harita.values()))
    print("─────────────────────────────")
    print(f"yazildi   : {CIKTI} ({kb:.1f} KB)")
    print(f"hisse     : {len(harita)}")
    print(f"sektor    : {farkli}")
    print(f"eklenen   : {len(harita) - len(eski):+d}")


if __name__ == "__main__":
    main()
  
