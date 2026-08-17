#!/usr/bin/env python3
"""
================== SEKTOR HARITASI URETICI ==================
Worker'in gomulu SEKTOR_HARITA'si yalnizca ~111 hisse kapsiyor; havuzda 432
var, geri kalan hepsi "Diger" gorunuyordu. Bu script borsapy ile TUM BIST'in
sektor bilgisini cekip sektor.json yazar. Worker onu okur.

CIKTI (sektor.json):
  {"guncelleme":"2026-08-17T...","sayi":432,"kaynak":"borsapy",
   "sektor":{"THYAO":"Ulastirma","GARAN":"Bankacilik", ...}}

GUVENLIK KURALI: veri eksik gelirse ESKI DOSYA KORUNUR.
Mevcut sektor.json'dakinden daha AZ hisse bulunduysa yazmaz ve 0 ile ciker.
Boylece kaynak site bozulsa bile calisan sistem bozulmaz.

Calistirma:  pip install borsapy && python sektor-cek.py
"""
import json
import os
import sys
from datetime import datetime, timezone

CIKTI = "sektor.json"
ASGARI_ARTIS = 0.8   # eski dosyanin en az %80'i kadar hisse bulunmali


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


def sektorleri_topla():
    """borsapy screener'i sektor sektor gezip kod -> sektor haritasi kurar."""
    import borsapy as bp

    harita = {}
    try:
        sektorler = bp.sectors()
    except Exception as e:
        print(f"sectors() basarisiz: {type(e).__name__}: {e}")
        sektorler = []

    print(f"sektor sayisi: {len(sektorler)}")

    for ad in sektorler:
        try:
            df = bp.screen_stocks(sector=ad)
        except Exception as e:
            print(f"  ! {ad}: {type(e).__name__}")
            continue
        if df is None or len(df) == 0:
            print(f"  - {ad}: bos")
            continue
        # kolon adi surumden surume degisebiliyor; hepsini dene
        kolon = None
        for aday in ("ticker", "kod", "symbol", "code", "hisse"):
            if aday in getattr(df, "columns", []):
                kolon = aday
                break
        if kolon is None:
            # index ticker olabilir
            kodlar = [temiz_kod(x) for x in df.index]
        else:
            kodlar = [temiz_kod(x) for x in df[kolon]]
        n = 0
        for k in kodlar:
            if k and k not in harita:
                harita[k] = ad
                n += 1
        print(f"  + {ad}: {n} hisse")

    return harita


def kapsam_tamamla(harita):
    """Screener'a girmeyen hisseler icin en azindan sirket listesinden
    'Diger' yerine bos birak — worker gomulu haritasina dusecek."""
    try:
        import borsapy as bp
        df = bp.companies()
        toplam = len(df)
        print(f"companies(): {toplam} sirket")
        return toplam
    except Exception as e:
        print(f"companies() basarisiz: {type(e).__name__}")
        return 0


def main():
    eski = eski_oku()
    print(f"eski sektor.json: {len(eski)} hisse")

    try:
        harita = sektorleri_topla()
    except ImportError:
        print("borsapy kurulu degil — pip install borsapy")
        sys.exit(0)
    except Exception as e:
        print(f"beklenmeyen hata: {type(e).__name__}: {e}")
        sys.exit(0)

    print(f"bulunan: {len(harita)} hisse")
    kapsam_tamamla(harita)

    if not harita:
        print("HIC VERI YOK — dosya DEGISTIRILMEDI")
        sys.exit(0)

    if eski and len(harita) < len(eski) * ASGARI_ARTIS:
        print(f"KORUMA: yeni veri eskinin %{100*len(harita)/max(1,len(eski)):.0f}'i kadar "
              f"— dosya DEGISTIRILMEDI")
        sys.exit(0)

    cikti = {
        "guncelleme": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "sayi": len(harita),
        "kaynak": "borsapy",
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
