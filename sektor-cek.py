#!/usr/bin/env python3
"""
================== SEKTOR HARITASI URETICI (v2) ==================
ONCEKI SURUM KIRIKTI: bp.sectors() + bp.screen_stocks(sector=..) yontemi
Is Yatirim'in tarama sayfasindaki cok kirilgan bir ASP.NET dropdown ID'sini
kaziyordu (ctl00_ctl58_g_877a6dc3_...ddlStockSector). Sayfa degisince bu ID
bulunamiyor, sectors() SESSIZCE bos liste donduruyor (except: return []),
script "HIC VERI YOK" deyip sessizce cikiyor - Action yesil gorunuyor ama
sektor.json hic yazilmiyor.

YENI YONTEM: bp.companies() ile TUM BIST kod listesini al, her kod icin
ayri ayri Ticker(kod).info["sector"] cek. Dropdown kazima YOK, tek tek
veri alani sorgusu var - daha yavas ama kirilma noktasi cok daha az.

CIKTI (sektor.json):
  {"guncelleme":"2026-08-17T...","sayi":432,"kaynak":"borsapy-ticker-info",
   "sektor":{"THYAO":"Ulastirma","GARAN":"Bankacilik", ...}}

GUVENLIK KURALI: veri eksik gelirse ESKI DOSYA KORUNUR.
Mevcut sektor.json'dakinden daha AZ hisse bulunduysa yazmaz ve 0 ile ciker.

Calistirma:  pip install borsapy && python sektor-cek.py
"""
import json
import os
import sys
import time
from datetime import datetime, timezone

CIKTI = "sektor.json"
ASGARI_ARTIS = 0.8   # eski dosyanin en az %80'i kadar hisse bulunmali
ILERLEME_ARALIK = 50  # her N hissede bir ilerleme yazdir


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
    """bp.companies() ile tum kodlari al, her kod icin Ticker.info['sector']
    cek. Dropdown scraping'e bagimli DEGIL - kirilma riski cok daha dusuk."""
    import borsapy as bp

    try:
        df = bp.companies()
    except Exception as e:
        print(f"companies() basarisiz: {type(e).__name__}: {e}")
        return {}

    if df is None or len(df) == 0:
        print("companies() bos dondu")
        return {}

    kolon = "ticker" if "ticker" in getattr(df, "columns", []) else df.columns[0]
    kodlar = sorted(set(k for k in (temiz_kod(x) for x in df[kolon]) if k))
    print(f"companies(): {len(kodlar)} hisse kodu bulundu")

    harita = {}
    hata_sayisi = 0
    for i, kod in enumerate(kodlar, 1):
        try:
            t = bp.Ticker(kod)
            sektor = t.info.get("sector")
            if sektor:
                harita[kod] = str(sektor).strip()
        except Exception:
            hata_sayisi += 1
        if i % ILERLEME_ARALIK == 0:
            print(f"  ... {i}/{len(kodlar)} islendi, {len(harita)} sektor bulundu, {hata_sayisi} hata")

    print(f"bitti: {len(harita)}/{len(kodlar)} hissede sektor bulundu ({hata_sayisi} hata)")
    return harita


def main():
    eski = eski_oku()
    print(f"eski sektor.json: {len(eski)} hisse")

    baslangic = time.time()
    try:
        harita = sektorleri_topla()
    except ImportError:
        print("borsapy kurulu degil — pip install borsapy")
        sys.exit(0)
    except Exception as e:
        print(f"beklenmeyen hata: {type(e).__name__}: {e}")
        sys.exit(0)

    print(f"sure: {time.time() - baslangic:.0f} sn")
    print(f"bulunan: {len(harita)} hisse")

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
