#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
================= 📋 TEMEL ANALİZ VERİSİ ÇEKİCİ =================
Havuzdaki her hisse için Yahoo Finance quoteSummary'den temel veriyi çeker,
skorları hesaplar ve temel.json olarak yazar.

NEDEN AYRI BİR İŞ:
  Temel veri ÇEYREKTE BİR değişir. Her taramada (50 saniyede bir) Yahoo'ya
  sormak hem anlamsız hem de tarama süresini katlar. Bu yüzden sektor.json
  ile aynı desen: Actions çalışır, dosya yazılır, worker okur.
  Tarama akışına, worker'a ve tarayıcıya SIFIR yük biner.

⚠️ TMS 29 — ENFLASYON MUHASEBESİ TUZAĞI
  BIST şirketleri 31.12.2023'ten itibaren enflasyona göre DÜZELTİLMİŞ
  finansal tablo yayımlıyor. Düzeltilmiş bir dönemi düzeltilmemiş bir
  dönemle karşılaştırıp "ciro %300 arttı" demek tamamen yanlıştır — o artışın
  büyük kısmı enflasyon düzeltmesinin kendisidir.
  Bu yüzden büyüme oranları YALNIZCA iki dönem de geçiş tarihinden sonraysa
  hesaplanır. Değilse büyüme None döner ve "enflasyonKarsilastirilamaz"
  bayrağı açılır. Yanlış sayı üretmektense hiç üretmemek doğrudur.
"""

import json
import os
import sys
import time
import urllib.request
import urllib.error
import urllib.parse
from datetime import datetime, timezone, timedelta

# ⚠️ havuz.json BU DEPODA DEĞİL — ayrı bir depoda duruyor ve tara.py de
# oradan okuyor. Aynı kaynağı kullanıyoruz ki iki iş aynı hisse listesini
# taradığından emin olalım. HAVUZ_URL ortam değişkeniyle değiştirilebilir.
HAVUZ_URL = os.environ.get(
    "HAVUZ_URL",
    "https://raw.githubusercontent.com/matematikneferi-boop/Hisse-havuzu/main/havuz.json")
# Ağ erişilemezse sırayla denenecek YEREL dosyalar:
YEDEK_DOSYALAR = ("havuz.json", "sektor.json", "formasyon.json")
CIKTI = "temel.json"
SEKTOR_CIKTI = "sektor.json"

# ⚠️ sektor.json HİÇ OLUŞTURULMAMIŞTI — worker onu arıyor, bulamıyor ve
# sektör bazlı bütün ölçüler (sektöre göre göreli güç, sektör persantili)
# sessizce devre dışı kalıyordu. Yahoo'nun assetProfile modülü sektörü
# zaten veriyor; ayrı bir iş kurmak yerine bu iş ikisini birden yazıyor.
# Yahoo sektör adları İngilizce gelir; ekranda Türkçe görünsün diye
# çeviriyoruz. Listede olmayan bir ad gelirse olduğu gibi bırakılır.
SEKTOR_TR = {
    "Financial Services": "Finans", "Basic Materials": "Temel Malzeme",
    "Industrials": "Sanayi", "Consumer Cyclical": "Çevrimsel Tüketim",
    "Consumer Defensive": "Temel Tüketim", "Technology": "Teknoloji",
    "Energy": "Enerji", "Utilities": "Kamu Hizmetleri",
    "Real Estate": "Gayrimenkul", "Healthcare": "Sağlık",
    "Communication Services": "İletişim",
}

# TMS 29 geçişi: bu tarihten ÖNCEKİ dönemler düzeltilmemiştir.
TMS29_GECIS = datetime(2023, 12, 1, tzinfo=timezone.utc)

MODULLER = ",".join([
    "assetProfile",                       # sektör/endüstri — sektor.json buradan
    "defaultKeyStatistics", "financialData", "summaryDetail",
    "incomeStatementHistory", "incomeStatementHistoryQuarterly",
    "balanceSheetHistory", "balanceSheetHistoryQuarterly",
    "cashflowStatementHistory", "calendarEvents",
])

BASLIK = {
    "User-Agent": ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                   "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"),
    "Accept": "application/json",
}

# ═══════════ 🔑 YAHOO ÇEREZ + CRUMB ═══════════
# Yahoo, quoteSummary ucunu kimliksiz isteklere KAPATTI: önce çerez almak,
# sonra o çerezle bir "crumb" (tek kullanımlık anahtar) istemek ve her
# çağrıya eklemek gerekiyor. Tarayıcıdan çalışır ama GitHub Actions gibi
# veri merkezi IP'lerinden 401 "Invalid Cookie" döner.
# İlk sürüm bunu bilmediği için 432 hissenin hepsi boş döndü ve iş
# kırmızı yandı. Artık oturum bir kez kurulur, 401 gelirse yenilenir.
_cerez_yonetici = urllib.request.HTTPCookieProcessor()
_acici = urllib.request.build_opener(_cerez_yonetici)
_crumb = None


def oturum_kur():
    """Çerez al, sonra crumb iste. Başarısızsa None döner; çağrılar
    yine de denenir (Yahoo bazı bölgelerde crumb istemiyor)."""
    global _crumb
    _crumb = None
    for tohum in ("https://fc.yahoo.com",
                  "https://finance.yahoo.com/quote/THYAO.IS"):
        try:
            _acici.open(urllib.request.Request(tohum, headers=BASLIK), timeout=20).read(2048)
        except Exception:
            pass
    try:
        istek = urllib.request.Request(
            "https://query2.finance.yahoo.com/v1/test/getcrumb", headers=BASLIK)
        with _acici.open(istek, timeout=20) as c:
            k = c.read().decode("utf-8").strip()
        if k and len(k) < 40 and "<" not in k:
            _crumb = k
            gunluk(f"🔑 Yahoo oturumu kuruldu (crumb alındı).")
            return True
    except Exception as e:
        gunluk(f"! crumb alınamadı ({e}) — crumbsuz denenecek.")
    return False


def gunluk(*a):
    print(*a, flush=True)


def sayi(v):
    """Yahoo bazen {'raw': 123}, bazen düz sayı döner; ikisini de karşıla."""
    if v is None:
        return None
    if isinstance(v, dict):
        v = v.get("raw")
    try:
        f = float(v)
    except (TypeError, ValueError):
        return None
    return f if f == f and abs(f) != float("inf") else None


def tarih(v):
    t = sayi(v)
    if t is None:
        return None
    try:
        return datetime.fromtimestamp(t, tz=timezone.utc)
    except (ValueError, OSError, OverflowError):
        return None


def cek(sembol, deneme=3):
    for i in range(deneme):
        for alan in ("query2", "query1"):        # biri kapalıysa diğeri
            url = (f"https://{alan}.finance.yahoo.com/v10/finance/quoteSummary/"
                   f"{sembol}?modules={MODULLER}")
            if _crumb:
                url += "&crumb=" + urllib.parse.quote(_crumb)
            try:
                istek = urllib.request.Request(url, headers=BASLIK)
                with _acici.open(istek, timeout=25) as c:
                    veri = json.loads(c.read().decode("utf-8"))
                sonuc = (veri.get("quoteSummary") or {}).get("result") or []
                if sonuc:
                    return sonuc[0]
            except urllib.error.HTTPError as e:
                if e.code == 401:
                    # Crumb düşmüş: oturumu yenile ve bu turu tekrarla.
                    oturum_kur()
                    continue
                if e.code in (429, 503):
                    time.sleep(4 * (i + 1))
                    continue
            except Exception:
                pass
        time.sleep(1.5 * (i + 1))
    return None


def kalem(rapor, *adlar):
    """Bir tablo satırından ilk bulunan alanı döndür (Yahoo alan adları değişebiliyor)."""
    if not rapor:
        return None
    for ad in adlar:
        v = sayi(rapor.get(ad))
        if v is not None:
            return v
    return None


def fskor_hesapla(gt, bs, nk):
    """
    Piotroski F-Skoru — 9 ikili ölçüt, kârlılık + kaldıraç/likidite + verimlilik.
    Eksik veri varsa o ölçüt SAYILMAZ; skor kaç ölçütten kaç aldığıyla birlikte
    döner. "3 ölçütten 3" ile "9 ölçütten 3" aynı şey değildir.
    """
    puan, olculen, detay = 0, 0, {}

    def ol(ad, kosul):
        nonlocal puan, olculen
        if kosul is None:
            detay[ad] = None
            return
        olculen += 1
        if kosul:
            puan += 1
        detay[ad] = bool(kosul)

    gt0, gt1 = (gt + [None, None])[:2]
    bs0, bs1 = (bs + [None, None])[:2]
    nk0, nk1 = (nk + [None, None])[:2]

    netKar0 = kalem(gt0, "netIncome")
    netKar1 = kalem(gt1, "netIncome")
    aktif0 = kalem(bs0, "totalAssets")
    aktif1 = kalem(bs1, "totalAssets")
    fno0 = kalem(nk0, "totalCashFromOperatingActivities", "operatingCashFlow")
    fno1 = kalem(nk1, "totalCashFromOperatingActivities", "operatingCashFlow")

    roa0 = (netKar0 / aktif0) if (netKar0 is not None and aktif0) else None
    roa1 = (netKar1 / aktif1) if (netKar1 is not None and aktif1) else None

    # ── Kârlılık ──
    ol("netKarPozitif", (netKar0 > 0) if netKar0 is not None else None)
    ol("roaPozitif", (roa0 > 0) if roa0 is not None else None)
    ol("nakitAkisiPozitif", (fno0 > 0) if fno0 is not None else None)
    ol("kazancKalitesi",
       (fno0 > netKar0) if (fno0 is not None and netKar0 is not None) else None)

    # ── Kaldıraç, likidite, kaynak ──
    borc0 = kalem(bs0, "longTermDebt")
    borc1 = kalem(bs1, "longTermDebt")
    if borc0 is not None and borc1 is not None and aktif0 and aktif1:
        ol("borcAzaldi", (borc0 / aktif0) <= (borc1 / aktif1))
    else:
        ol("borcAzaldi", None)

    d0, y0 = kalem(bs0, "totalCurrentAssets"), kalem(bs0, "totalCurrentLiabilities")
    d1, y1 = kalem(bs1, "totalCurrentAssets"), kalem(bs1, "totalCurrentLiabilities")
    if d0 and y0 and d1 and y1:
        ol("cariOranArtti", (d0 / y0) > (d1 / y1))
    else:
        ol("cariOranArtti", None)

    his0 = kalem(bs0, "commonStock")
    his1 = kalem(bs1, "commonStock")
    ol("seyreltmeYok",
       (his0 <= his1) if (his0 is not None and his1 is not None) else None)

    # ── Faaliyet verimliliği ──
    ciro0, ciro1 = kalem(gt0, "totalRevenue"), kalem(gt1, "totalRevenue")
    brut0, brut1 = kalem(gt0, "grossProfit"), kalem(gt1, "grossProfit")
    if ciro0 and ciro1 and brut0 is not None and brut1 is not None:
        ol("marjArtti", (brut0 / ciro0) > (brut1 / ciro1))
    else:
        ol("marjArtti", None)

    if ciro0 and ciro1 and aktif0 and aktif1:
        ol("devirHiziArtti", (ciro0 / aktif0) > (ciro1 / aktif1))
    else:
        ol("devirHiziArtti", None)

    return {"puan": puan, "olculen": olculen, "detay": detay,
            "roa": round(roa0 * 100, 2) if roa0 is not None else None}


def buyume_hesapla(gt_ceyrek):
    """
    ⚠️ TMS 29 KORUMASI. Büyüme yalnızca İKİ dönem de enflasyon düzeltmesi
    geçişinden sonraysa hesaplanır. Aksi hâlde None döner ve bayrak açılır.
    """
    if len(gt_ceyrek) < 5:
        return {"ciro": None, "netKar": None, "enflasyonKarsilastirilamaz": None}
    simdi, gecen = gt_ceyrek[0], gt_ceyrek[4]     # yıllık karşılaştırma
    t_simdi, t_gecen = tarih(simdi.get("endDate")), tarih(gecen.get("endDate"))
    if not t_simdi or not t_gecen:
        return {"ciro": None, "netKar": None, "enflasyonKarsilastirilamaz": None}
    if t_gecen < TMS29_GECIS:
        return {"ciro": None, "netKar": None, "enflasyonKarsilastirilamaz": True}

    def oran(a, b):
        if a is None or b is None or b == 0:
            return None
        return round((a / abs(b) - (1 if b > 0 else -1)) * 100, 2)

    return {
        "ciro": oran(kalem(simdi, "totalRevenue"), kalem(gecen, "totalRevenue")),
        "netKar": oran(kalem(simdi, "netIncome"), kalem(gecen, "netIncome")),
        "enflasyonKarsilastirilamaz": False,
        "donem": t_simdi.strftime("%Y-%m-%d"),
    }


def sektor_al(ham):
    ap = (ham or {}).get("assetProfile") or {}
    ad = (ap.get("sector") or "").strip()
    if not ad:
        return None
    return SEKTOR_TR.get(ad, ad)


def isle(kod, ham):
    if not ham:
        return None
    dks = ham.get("defaultKeyStatistics") or {}
    fd = ham.get("financialData") or {}
    sd = ham.get("summaryDetail") or {}
    ce = ham.get("calendarEvents") or {}

    gt = [x for x in ((ham.get("incomeStatementHistory") or {}).get("incomeStatementHistory") or [])]
    gtq = [x for x in ((ham.get("incomeStatementHistoryQuarterly") or {}).get("incomeStatementHistory") or [])]
    bs = [x for x in ((ham.get("balanceSheetHistory") or {}).get("balanceSheetStatements") or [])]
    nk = [x for x in ((ham.get("cashflowStatementHistory") or {}).get("cashflowStatements") or [])]

    f = fskor_hesapla(gt, bs, nk)
    b = buyume_hesapla(gtq)

    # Bilanço takvimi — sinyal susturması için
    bilanco = None
    try:
        eq = (ce.get("earnings") or {}).get("earningsDate") or []
        if eq:
            t = tarih(eq[0])
            if t:
                bilanco = t.strftime("%Y-%m-%d")
    except Exception:
        pass

    nakit = sayi(fd.get("totalCash"))
    borc = sayi(fd.get("totalDebt"))
    favok = sayi(fd.get("ebitda"))
    netBorc = (borc - nakit) if (borc is not None and nakit is not None) else None

    kayit = {
        "fskor": f["puan"], "fskorOlculen": f["olculen"], "fskorDetay": f["detay"],
        "roa": f["roa"],
        "fk": sayi(sd.get("trailingPE")) or sayi(dks.get("forwardPE")),
        "pddd": sayi(dks.get("priceToBook")),
        "pd": sayi(sd.get("marketCap")) or sayi(dks.get("enterpriseValue")),
        "ozsermayeKarliligi": (round(sayi(fd.get("returnOnEquity")) * 100, 2)
                               if sayi(fd.get("returnOnEquity")) is not None else None),
        "netMarj": (round(sayi(fd.get("profitMargins")) * 100, 2)
                    if sayi(fd.get("profitMargins")) is not None else None),
        "netBorcFavok": (round(netBorc / favok, 2)
                         if (netBorc is not None and favok and favok > 0) else None),
        "temettuVerimi": (round(sayi(sd.get("dividendYield")) * 100, 2)
                          if sayi(sd.get("dividendYield")) is not None else None),
        "buyumeCiro": b["ciro"], "buyumeKar": b["netKar"],
        "enflasyonKarsilastirilamaz": b["enflasyonKarsilastirilamaz"],
        "buyumeDonem": b.get("donem"),
        "bilancoTarihi": bilanco,
    }
    # Tamamen boş kayıt yazma
    if all(kayit[k] is None for k in ("fk", "pddd", "roa", "netMarj")) and f["olculen"] == 0:
        return None
    return kayit


def _gecerli_kod(x):
    k = str(x).upper().replace(".IS", "").strip()
    return k if (3 <= len(k) <= 6 and k.isalnum() and not k.isdigit()) else None


def _kodlari_ayikla(j, derinlik=0):
    """
    havuz.json, sektor.json ve formasyon.json'un biçimleri birbirinden farklı
    ve zamanla da değişebiliyor. Anahtar adı tahmin etmek yerine ARIYORUZ:
    her sözlük/liste adayı için "kaç elemanı geçerli hisse koduna benziyor"
    diye puanlanır, en yüksek puanlı aday seçilir. Böylece {"imlec":{...}}
    gibi bir sarmalayıcı da, düz liste de, sektör haritası da çalışır.
    """
    if derinlik > 3:
        return []
    if isinstance(j, list):
        return [k for k in (_gecerli_kod(x) for x in j if isinstance(x, (str, int))) if k]
    if not isinstance(j, dict):
        return []

    # a) Bu sözlüğün KENDİ anahtarları hisse kodu mu?
    kendi = [k for k in (_gecerli_kod(x) for x in j.keys()) if k]
    en_iyi = kendi if len(kendi) >= 20 else []

    # b) Değilse, alt sözlük/listelerde ara ve en çok kod içereni seç
    for v in j.values():
        if isinstance(v, (dict, list)):
            alt = _kodlari_ayikla(v, derinlik + 1)
            if len(alt) > len(en_iyi):
                en_iyi = alt

    # c) Hiçbiri eşiği geçmediyse kendi anahtarlarına düş
    return en_iyi or kendi


def havuzu_oku():
    # 1) Asıl kaynak: ayrı depodaki havuz.json
    try:
        istek = urllib.request.Request(HAVUZ_URL, headers=BASLIK)
        with urllib.request.urlopen(istek, timeout=30) as c:
            kodlar = _kodlari_ayikla(json.loads(c.read().decode("utf-8")))
        if kodlar:
            gunluk(f"Havuz kaynağı: {HAVUZ_URL} · {len(kodlar)} kod")
            return sorted(set(kodlar))
    except Exception as e:
        gunluk(f"! havuz.json alınamadı ({e}); yerel dosyalara düşülüyor.")

    # 2) Yedek: depodaki yerel dosyalar
    for dosya in YEDEK_DOSYALAR:
        if not os.path.exists(dosya):
            continue
        try:
            with open(dosya, encoding="utf-8") as f:
                kodlar = _kodlari_ayikla(json.load(f))
        except Exception:
            continue
        if kodlar:
            gunluk(f"Havuz kaynağı (yedek): {dosya} · {len(kodlar)} kod")
            return sorted(set(kodlar))
    return []


def main():
    oturum_kur()
    kodlar = havuzu_oku()
    if not kodlar:
        gunluk("✗ Havuz okunamadı (havuz.json / sektor.json bulunamadı).")
        return 1

    sonuc, sektorler, basarili, bos = {}, {}, 0, 0
    t0 = time.time()
    for i, kod in enumerate(kodlar, 1):
        ham = cek(kod + ".IS")
        sekt = sektor_al(ham)
        if sekt:
            sektorler[kod] = sekt
        kayit = isle(kod, ham)
        if kayit:
            sonuc[kod] = kayit
            basarili += 1
        else:
            bos += 1
        # İlk 15 hissenin hepsi boşsa devam etmenin anlamı yok: kimlik ya da
        # ağ sorunu vardır. 4 dakika bekleyip kırmızı yanmaktansa hemen söyle.
        if i == 15 and basarili == 0:
            gunluk("✗ İlk 15 hissenin hiçbiri okunamadı — Yahoo erişimi engelli "
                   "görünüyor (çerez/crumb ya da IP engeli). İş durduruluyor.")
            return 2
        if i % 25 == 0:
            gunluk(f"  {i}/{len(kodlar)} · dolu {basarili} · boş {bos} "
                   f"· {int(time.time()-t0)} sn")
        time.sleep(0.35)          # Yahoo'yu dövme

    paket = {
        "guncelleme": datetime.now(timezone.utc).astimezone(
            timezone(timedelta(hours=3))).strftime("%Y-%m-%dT%H:%M%z"),
        "kaynak": "yahoo-quoteSummary",
        "tms29Gecis": TMS29_GECIS.strftime("%Y-%m-%d"),
        "toplam": len(kodlar), "dolu": basarili, "bos": bos,
        "hisse": sonuc,
    }
    with open(CIKTI, "w", encoding="utf-8") as f:
        json.dump(paket, f, ensure_ascii=False, separators=(",", ":"))
    gunluk(f"✅ {CIKTI} yazıldı · {basarili}/{len(kodlar)} hisse "
           f"· {int(time.time()-t0)} sn")

    # sektor.json — worker'ın beklediği biçim: {"sektor": {KOD: "Ad"}, ...}
    #
    # ⚠️ ÜSTÜNE YAZMA KORUMASI
    # Depoda zaten bir sektor.yml / sektor-cek.py var. O iş kendi sektör
    # haritasını üretiyorsa (muhtemelen BIST'e özgü, daha doğru adlarla),
    # buradan gelen Yahoo kaynaklı genel harita onu EZMEMELİ. Bu yüzden
    # mevcut dosya bizimki kadar ya da daha zenginse dokunulmaz.
    # Yahoo haritası yalnızca BOŞLUĞU doldurur, yerini almaz.
    mevcut = 0
    try:
        if os.path.exists(SEKTOR_CIKTI):
            with open(SEKTOR_CIKTI, encoding="utf-8") as f:
                mj = json.load(f)
            mh = mj.get("sektor") if isinstance(mj.get("sektor"), dict) else mj
            mevcut = len(mh) if isinstance(mh, dict) else 0
    except Exception:
        mevcut = 0

    if mevcut >= len(sektorler) and mevcut > 0:
        gunluk(f"↷ sektor.json korundu — mevcut dosyada {mevcut} kayıt var "
               f"(bizimki {len(sektorler)}). Üstüne yazılmadı.")
    elif len(sektorler) >= 50:
        dagilim = {}
        for v in sektorler.values():
            dagilim[v] = dagilim.get(v, 0) + 1
        sp = {"guncelleme": paket["guncelleme"], "kaynak": "yahoo-assetProfile",
              "toplam": len(sektorler), "dagilim": dagilim, "sektor": sektorler}
        with open(SEKTOR_CIKTI, "w", encoding="utf-8") as f:
            json.dump(sp, f, ensure_ascii=False, separators=(",", ":"))
        gunluk(f"✅ {SEKTOR_CIKTI} yazıldı · {len(sektorler)} hisse · "
               + " · ".join(f"{k}:{v}" for k, v in
                            sorted(dagilim.items(), key=lambda x: -x[1])[:6]))
    else:
        gunluk(f"! sektor.json yazılmadı — yalnızca {len(sektorler)} sektör bulundu.")

    return 0 if basarili else 1


if __name__ == "__main__":
    sys.exit(main())
