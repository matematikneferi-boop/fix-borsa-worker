"""
Fix Borsa — BIST Formasyon Tarayici  (TEK DOSYA)
=================================================
Kama, ucgen, bayrak/flama ve ikili dip-tepe formasyonlarini bulur,
formasyon.json yazar. Telegram worker'i bu dosyayi okur.

Hisse listesi havuz.json'dan otomatik okunur; elle bir sey yapman gerekmez.
"""

import json
import os
import sys
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone, timedelta

import numpy as np

# ============================================================================
#  TARANACAK HISSELER
#  Liste otomatik olarak KENDI HAVUZUNDAN okunur — elle guncellemen gerekmez.
#  Tarayicin havuz.json'a yeni bir hisse ekledigi anda burasi da onu tarar.
#  Havuza ulasilamazsa asagidaki yedek liste devreye girer.
# ============================================================================

HAVUZ_URL = os.environ.get(
    "HAVUZ_URL",
    "https://raw.githubusercontent.com/matematikneferi-boop/Hisse-havuzu/main/havuz.json",
)

YEDEK_HISSELER = """
THYAO ASELS GARAN AKBNK ISCTR YKBNK VAKBN HALKB SASA KCHOL
SAHOL EREGL BIMAS SISE TUPRS FROTO TOASO TTKOM TCELL PGSUS
KOZAL KOZAA IPEKE PETKM ARCLK TAVHL ENKAI HEKTS ODAS ALARK
EKGYO KRDMD TKFEN SOKM MGROS AEFES CCOLA ULKER VESTL DOHOL
GUBRF AKSEN ZOREN SMRTG BRSAN CIMSA OYAKC KONTR ASTOR EUPWR
"""


# ----------------------------------------------------------------------------
# TEMEL GOSTERGELER
# ----------------------------------------------------------------------------

def _rma(src, length):
    """Wilder yumusatmasi (Pine ta.rma karsiligi)."""
    n = len(src)
    out = np.full(n, np.nan)
    total = 0.0
    count = 0
    prev = np.nan
    for i in range(n):
        v = src[i] if np.isfinite(src[i]) else 0.0
        if not np.isfinite(prev):
            total += v
            count += 1
            if count >= length:
                prev = total / length
                out[i] = prev
        else:
            prev = (prev * (length - 1) + v) / length
            out[i] = prev
    return out


def _series(high, low, close):
    """TR, ATR(10/14/50), ADX(14) ve bar araligi."""
    n = len(close)
    tr = np.zeros(n)
    pdm = np.zeros(n)
    mdm = np.zeros(n)
    rng = high - low
    tr[0] = high[0] - low[0]
    for i in range(1, n):
        pc = close[i - 1]
        tr[i] = max(high[i] - low[i], abs(high[i] - pc), abs(low[i] - pc))
        up = high[i] - high[i - 1]
        dn = low[i - 1] - low[i]
        pdm[i] = up if (up > dn and up > 0) else 0.0
        mdm[i] = dn if (dn > up and dn > 0) else 0.0
    tr_r = _rma(tr, 14)
    p_r = _rma(pdm, 14)
    m_r = _rma(mdm, 14)
    dx = np.zeros(n)
    with np.errstate(invalid="ignore", divide="ignore"):
        for i in range(n):
            if tr_r[i] and np.isfinite(tr_r[i]) and tr_r[i] > 0:
                pdi = 100 * p_r[i] / tr_r[i]
                mdi = 100 * m_r[i] / tr_r[i]
                if np.isfinite(pdi) and np.isfinite(mdi):
                    dx[i] = abs(pdi - mdi) / max(pdi + mdi, 1) * 100
    return {
        "rng": rng,
        "atr_fast": _rma(tr, 10),
        "atr_slow": _rma(tr, 50),
        "atr14": _rma(tr, 14),
        "adx": _rma(dx, 14),
    }


def _roll_stat(arr, length, i, fn):
    if i < length - 1:
        return np.nan
    w = arr[i - length + 1: i + 1]
    w = w[np.isfinite(w)]
    return fn(w) if len(w) else np.nan


# ----------------------------------------------------------------------------
# PIVOT SISTEMLERI
# ----------------------------------------------------------------------------

def _adaptive_left(i, S, pmin=5, pmax=15):
    """Pine calc_adaptive_pivot: volatiliteye gore sol bar sayisi 5-15."""
    def ratio(a, b, default):
        if b and np.isfinite(a) and np.isfinite(b) and b > 0:
            return a / b
        return default

    vol = min(ratio(S["atr_fast"][i], S["atr_slow"][i], 1.0), 2.0) / 2
    adx = S["adx"][i] if np.isfinite(S["adx"][i]) else 0.0
    trend = min(adx / 50, 1.0)
    std = _roll_stat(S["atr_fast"], 20, i, np.std)
    mean = _roll_stat(S["atr_fast"], 20, i, np.mean)
    stab = min(ratio(std, mean, 0.5) * 2, 1.0)
    pct = _roll_stat(S["atr_fast"], 100, i, lambda w: np.percentile(w, 50, method="nearest"))
    ctx = min(ratio(S["atr_fast"][i], pct, 1.0), 2.0) / 2
    arng = _roll_stat(S["rng"], 10, i, np.mean)
    rsc = min(ratio(S["rng"][i], arng, 1.0), 2.0) / 2
    score = vol * .30 + trend * .25 + stab * .20 + ctx * .15 + rsc * .10
    return max(pmin, min(pmax, pmin + int((pmax - pmin) * score)))


def adaptive_pivots(high, low, S, right=2):
    """Uyarlanir sol barli pivot tespiti. Ileri bakis yok (repaint etmez)."""
    n = len(high)
    piv = []
    for i in range(right, n):
        left = _adaptive_left(i, S)
        p = i - right
        if p - left < 0:
            continue
        lo_i, hi_i = p - left, p + right
        seg_h = high[lo_i:hi_i + 1]
        seg_l = low[lo_i:hi_i + 1]
        k = p - lo_i
        if high[p] > np.max(np.delete(seg_h, k)):
            piv.append((p, float(high[p]), "tepe"))
        if low[p] < np.min(np.delete(seg_l, k)):
            piv.append((p, float(low[p]), "dip"))
    piv.sort(key=lambda x: x[0])
    return piv


def fixed_pivots(high, low, order=6):
    """Sabit pencereli pivot — ucgen/ikili dip icin daha kararli."""
    n = len(high)
    tops, bots = [], []
    for i in range(order, n - order):
        seg_h = high[i - order:i + order + 1]
        seg_l = low[i - order:i + order + 1]
        if high[i] >= seg_h.max() and (seg_h == high[i]).sum() == 1:
            tops.append((i, float(high[i])))
        if low[i] <= seg_l.min() and (seg_l == low[i]).sum() == 1:
            bots.append((i, float(low[i])))
    return tops, bots


# ----------------------------------------------------------------------------
# TREND CIZGISI OTURTMA  (neurotrader888, MIT — uyarlandi)
# ----------------------------------------------------------------------------

def _line_error(support, pivot, slope, y):
    intercept = -slope * pivot + y[pivot]
    vals = slope * np.arange(len(y)) + intercept
    diffs = vals - y
    if support and diffs.max() > 1e-5:
        return -1.0
    if not support and diffs.min() < -1e-5:
        return -1.0
    return float((diffs ** 2).sum())


def _optimize_slope(support, pivot, init_slope, y):
    unit = (y.max() - y.min()) / len(y)
    if unit <= 0:
        return None
    step, min_step = 1.0, 1e-4
    best_slope = init_slope
    best_err = _line_error(support, pivot, init_slope, y)
    if best_err < 0:
        return None
    need_deriv = True
    deriv = None
    guard = 0
    while step > min_step and guard < 2000:
        guard += 1
        if need_deriv:
            test = _line_error(support, pivot, best_slope + unit * min_step, y)
            deriv = test - best_err
            if test < 0:
                test = _line_error(support, pivot, best_slope - unit * min_step, y)
                deriv = best_err - test
            if test < 0:
                return None
            need_deriv = False
        trial = best_slope - unit * step if deriv > 0 else best_slope + unit * step
        err = _line_error(support, pivot, trial, y)
        if err < 0 or err >= best_err:
            step *= 0.5
        else:
            best_err, best_slope = err, trial
            need_deriv = True
    return best_slope, -best_slope * pivot + y[pivot]


def fit_channel(high, low, close):
    """Fiyati hic kesmeyen ust (direnc) ve alt (destek) dogrularini bulur."""
    n = len(close)
    if n < 5:
        return None
    x = np.arange(n)
    coefs = np.polyfit(x, close, 1)
    fit = coefs[0] * x + coefs[1]
    upper_piv = int((high - fit).argmax())
    lower_piv = int((low - fit).argmin())
    up = _optimize_slope(False, upper_piv, coefs[0], high)
    lo = _optimize_slope(True, lower_piv, coefs[0], low)
    if up is None or lo is None:
        return None
    return up, lo


def _fit_sapma(xs, ys, ref):
    """Pivotlarin oturtulan dogruya en buyuk sapmasi (fiyatin yuzdesi olarak).
    R-kare yerine bunu kullaniyoruz: yatay bir direnc cizgisinde egim sifir
    oldugu icin korelasyon ~0 cikar ve R-kare filtresi yukselen ucgeni eler."""
    if len(xs) < 3 or ref <= 0:
        return 999.0
    sl, ic = np.polyfit(np.asarray(xs, float), np.asarray(ys, float), 1)
    dev = [abs(y - (sl * x + ic)) for x, y in zip(xs, ys)]
    return float(max(dev) / ref * 100)


# ----------------------------------------------------------------------------
# ORTAK YARDIMCILAR
# ----------------------------------------------------------------------------

def _prior_trend(close, atr14, idx, length=30):
    b = idx - length
    if b < 0 or not np.isfinite(atr14[idx]) or atr14[idx] <= 0:
        return 0.0
    return float((close[idx] - close[b]) / atr14[idx])


def _clip(v, lo=0.0, hi=100.0):
    return float(max(lo, min(hi, v)))


def _mk(kind, direction, quality, upper, lower, target, start, end, extra=None):
    d = {
        "tip": kind,
        "yon": direction,
        "kalite": int(round(quality)),
        "ust": upper,
        "alt": lower,
        "hedef": round(float(target), 4) if target and target > 0 else None,
        "bas": int(start),
        "bit": int(end),
    }
    if extra:
        d.update(extra)
    return d


# ----------------------------------------------------------------------------
# 1) KAMA  (Pine port — dogrulanmis)
# ----------------------------------------------------------------------------

WEDGE = dict(min_gap=5, min_width=20, max_width=200, lookback=100,
             convergence=0.75, max_wait=50, trend_min=0.5, min_quality=85)
# min_quality 55->85: kendi_dogrula() ile olculdu — rastgele (formasyon
# icermeyen) grafiklerde 55 esiginde %8 yanlis pozitif cikiyordu, kalite
# skoru gurultuyle gercek kamayi ayirt etmiyordu. 85'te %0.06'ya dusuyor.


def _calc_price(f1, b1, f2, b2, target, log=True):
    if b2 == b1 or f1 <= 0 or f2 <= 0:
        return f2
    if log:
        return f2 * np.exp((np.log(f2) - np.log(f1)) / (b2 - b1) * (target - b2))
    return f2 + (f2 - f1) / (b2 - b1) * (target - b2)


def find_wedge(high, low, close, S):
    cfg = WEDGE
    n = len(close)
    if n < 60:
        return None
    piv = adaptive_pivots(high, low, S)
    if len(piv) < 4:
        return None
    last = n - 1
    atr = S["atr14"][last]
    if not (np.isfinite(atr) and atr > 0):
        return None
    oldest = max(0, last - cfg["lookback"])
    tops = [(i, y) for i, y, t in piv if t == "tepe" and i >= oldest]
    bots = [(i, y) for i, y, t in piv if t == "dip" and i >= oldest]
    best = None

    for falling in (True, False):
        A13 = tops if falling else bots
        A24 = bots if falling else tops
        if len(A13) < 2 or len(A24) < 2:
            continue
        for i4 in range(len(A24) - 1, 0, -1):
            p4 = A24[i4]
            if p4[0] < last - cfg["max_wait"]:
                break
            for i3 in range(len(A13) - 1, 0, -1):
                p3 = A13[i3]
                if p3[0] >= p4[0] or p4[0] - p3[0] < cfg["min_gap"]:
                    continue
                for i2 in range(i4 - 1, -1, -1):
                    p2 = A24[i2]
                    if p2[0] >= p3[0] or p3[0] - p2[0] < cfg["min_gap"]:
                        continue
                    if (p2[1] <= p4[1]) if falling else (p2[1] >= p4[1]):
                        continue
                    for i1 in range(i3 - 1, -1, -1):
                        p1 = A13[i1]
                        if p1[0] >= p2[0] or p2[0] - p1[0] < cfg["min_gap"]:
                            continue
                        if (p1[1] <= p3[1]) if falling else (p1[1] >= p3[1]):
                            continue
                        width = p4[0] - p1[0]
                        if width < cfg["min_width"] or width > cfg["max_width"]:
                            continue
                        u1, u2 = (p1, p3) if falling else (p2, p4)
                        l1, l2 = (p2, p4) if falling else (p1, p3)
                        uf = lambda x: _calc_price(u1[1], u1[0], u2[1], u2[0], x)
                        lf = lambda x: _calc_price(l1[1], l1[0], l2[1], l2[0], x)
                        us = (np.log(u2[1]) - np.log(u1[1])) / (u2[0] - u1[0])
                        ls = (np.log(l2[1]) - np.log(l1[1])) / (l2[0] - l1[0])
                        if falling:
                            if not (us < 0 and ls < 0 and us < ls):
                                continue
                        else:
                            if not (us > 0 and ls > 0 and ls > us):
                                continue
                        g0 = uf(p1[0]) - lf(p1[0])
                        g1 = uf(p4[0]) - lf(p4[0])
                        if g0 <= 0 or g1 <= 0 or g1 / g0 >= cfg["convergence"]:
                            continue
                        seg_h = high[p1[0]:p4[0] + 1]
                        seg_l = low[p1[0]:p4[0] + 1]
                        if falling:
                            if p1[1] < seg_h.max() - 1e-9 or p4[1] > seg_l.min() + 1e-9:
                                continue
                        else:
                            if p1[1] > seg_l.min() + 1e-9 or p4[1] < seg_h.max() - 1e-9:
                                continue
                        ok = True
                        for b in range(p1[0], p4[0] + 1):
                            u, l = uf(b), lf(b)
                            if u <= l or close[b] > u or close[b] < l:
                                ok = False
                                break
                        if not ok:
                            continue
                        tr = _prior_trend(close, S["atr14"], p1[0])
                        if falling and tr > -cfg["trend_min"]:
                            continue
                        if (not falling) and tr < cfg["trend_min"]:
                            continue
                        maxh = max(abs(uf(b) - lf(b)) for b in range(p1[0], p4[0] + 1, 5))
                        conv = g1 / g0
                        sr = abs(ls / us) if abs(us) > 1e-12 else 1.0
                        q = (_clip((1 - conv) * 100) * .30
                             + _clip(100 - abs(sr - 1) * 50) * .25
                             + _clip(100 if 40 <= width <= 100 else
                                     (width / 40 * 100 if width < 40 else 100 - (width - 100) / 2)) * .20
                             + _clip(min(abs(tr) / 2, 1) * 100) * .15
                             + _clip(min(maxh / (atr * 3), 1) * 100) * .10)
                        if q < cfg["min_quality"]:
                            continue
                        if best and not (p4[0] > best["_p4"] or (p4[0] == best["_p4"] and q > best["kalite"])):
                            continue
                        end = min(last, p4[0] + cfg["max_wait"])
                        tgt = uf(end) + maxh * 0.618 if falling else lf(end) - maxh * 0.618
                        best = _mk("Düşen Kama" if falling else "Yükselen Kama",
                                   "al" if falling else "sat", q,
                                   [[u1[0], u1[1]], [end, uf(end)]],
                                   [[l1[0], l1[1]], [end, lf(end)]],
                                   tgt, p1[0], end,
                                   {"kirilim": round(float(uf(end) if falling else lf(end)), 4)})
                        best["_p4"] = p4[0]
    if best:
        best.pop("_p4", None)
    return best


# ----------------------------------------------------------------------------
# 2) UCGEN
# ----------------------------------------------------------------------------

TRI = dict(order=4, min_piv=3, window=90, min_bars=22, sapma_max=1.8,
           flat=0.0006, converge=0.80, min_quality=75, max_age=14)
# min_quality 55->75: ucgen zaten en temiz dedektordu (rastgele veride
# %0.9 yanlis pozitif) ama 75'te %0.3'e iniyor, dusuk maliyetli bir marj.


def find_triangle(high, low, close, S):
    cfg = TRI
    n = len(close)
    if n < cfg["min_bars"] + 10:
        return None
    last = n - 1
    atr = S["atr14"][last]
    if not (np.isfinite(atr) and atr > 0):
        return None
    best = None
    for win in (cfg["window"], 60, 40):
        if n < win:
            continue
        s0 = n - win
        h, l, c = high[s0:], low[s0:], close[s0:]
        tops, bots = fixed_pivots(h, l, cfg["order"])
        if len(tops) < cfg["min_piv"] or len(bots) < cfg["min_piv"]:
            continue
        tops = tops[-5:]
        bots = bots[-5:]
        tx = [p[0] for p in tops]
        ty = [p[1] for p in tops]
        bx = [p[0] for p in bots]
        by = [p[1] for p in bots]
        ref = float(np.mean(c))
        du, dl = _fit_sapma(tx, ty, ref), _fit_sapma(bx, by, ref)
        if du > cfg["sapma_max"] or dl > cfg["sapma_max"]:
            continue
        su, iu = np.polyfit(tx, ty, 1)
        sl, il = np.polyfit(bx, by, 1)
        start, end = min(tx[0], bx[0]), max(tx[-1], bx[-1])
        if end - start < cfg["min_bars"]:
            continue
        if last - (s0 + end) > cfg["max_age"]:
            continue
        uf = lambda x: su * x + iu
        lf = lambda x: sl * x + il
        g0, g1 = uf(start) - lf(start), uf(end) - lf(end)
        if g0 <= 0 or g1 <= 0:
            continue
        mid = ref
        nu, nl = su / mid, sl / mid
        conv = g1 / g0
        if conv >= cfg["converge"]:
            continue
        flat = cfg["flat"]
        if abs(nu) < flat and nl > flat:
            kind, side = "Yükselen Üçgen", "al"
        elif abs(nl) < flat and nu < -flat:
            kind, side = "Alçalan Üçgen", "sat"
        elif nu < -flat and nl > flat:
            kind, side = "Simetrik Üçgen", "nötr"
        else:
            continue
        broke = False
        for b in range(start, end + 1):
            u, lo_ = uf(b), lf(b)
            if c[b] > u * 1.002 or c[b] < lo_ * 0.998:
                broke = True
                break
        if broke:
            continue
        height = g0
        q = (_clip(100 - (du + dl) / 2 / cfg["sapma_max"] * 100) * .35
             + _clip((1 - conv) * 100) * .25
             + _clip(100 if 30 <= (end - start) <= 80 else max(0, 100 - abs((end - start) - 55) * 1.5)) * .20
             + _clip(min(height / (atr * 3), 1) * 100) * .20)
        if q < cfg["min_quality"]:
            continue
        if best and q <= best["kalite"]:
            continue
        e2 = min(len(c) - 1, end + 20)
        tgt = uf(e2) + height * 0.7 if side == "al" else (lf(e2) - height * 0.7 if side == "sat" else None)
        best = _mk(kind, side, q,
                   [[s0 + start, float(uf(start))], [s0 + e2, float(uf(e2))]],
                   [[s0 + start, float(lf(start))], [s0 + e2, float(lf(e2))]],
                   tgt, s0 + start, s0 + e2)
    return best


# ----------------------------------------------------------------------------
# 3) BAYRAK ve FLAMA
# ----------------------------------------------------------------------------

FLAG = dict(order=5, max_flag_ratio=0.55, max_height_ratio=0.30,
            min_flag=7, max_flag=24, min_pole_atr=8.0, min_pole_pct=0.18,
            min_quality=82, max_age=6)
# min_quality 66->82: rastgele veride 66'da fiilen %6.8 yanlis pozitif
# uretiyordu (esik pratikte hicbir sey elemiyordu). 82'de %0.5'e iniyor.


def find_flag(high, low, close, S):
    cfg = FLAG
    n = len(close)
    if n < 50:
        return None
    last = n - 1
    atr = S["atr14"][last]
    if not (np.isfinite(atr) and atr > 0):
        return None
    best = None

    for bull in (True, False):
        for flag_len in range(cfg["min_flag"], cfg["max_flag"] + 1, 2):
            f0 = last - flag_len
            if f0 - 10 < 0:
                continue
            if bull:
                pole_end = f0 + int(np.argmax(high[f0:last + 1]))
            else:
                pole_end = f0 + int(np.argmin(low[f0:last + 1]))
            if pole_end > f0 + 3:
                continue
            pole_end = f0
            search = max(0, pole_end - 60)
            if bull:
                pole_start = search + int(np.argmin(low[search:pole_end + 1]))
                pole_h = high[pole_end] - low[pole_start]
            else:
                pole_start = search + int(np.argmax(high[search:pole_end + 1]))
                pole_h = high[pole_start] - low[pole_end]
            pole_w = pole_end - pole_start
            if pole_w < 5 or pole_h <= 0:
                continue
            if pole_h < atr * cfg["min_pole_atr"]:
                continue
            # Direk, oransal olarak da anlamli bir hamle olmali (gurultu degil)
            base = low[pole_start] if bull else high[pole_start]
            if base <= 0 or pole_h / base < cfg["min_pole_pct"]:
                continue
            # Direk tek yonlu olmali: geri cekilmeler hamlenin yarisini gecmesin
            seg = close[pole_start:pole_end + 1]
            if len(seg) >= 3:
                if bull:
                    dd = float((np.maximum.accumulate(seg) - seg).max())
                else:
                    dd = float((seg - np.minimum.accumulate(seg)).max())
                if dd > pole_h * 0.45:
                    continue
            if flag_len > pole_w * cfg["max_flag_ratio"]:
                continue
            seg_h = high[f0:last + 1]
            seg_l = low[f0:last + 1]
            flag_h = seg_h.max() - seg_l.min()
            if flag_h > pole_h * cfg["max_height_ratio"]:
                continue
            fit = fit_channel(seg_h, seg_l, close[f0:last + 1])
            if fit is None:
                continue
            (su, iu), (sl, il) = fit
            m = len(seg_h)
            mid = float(np.mean(close[f0:last + 1]))
            nu, nl = su / mid, sl / mid
            g0 = (iu) - (il)
            g1 = (su * (m - 1) + iu) - (sl * (m - 1) + il)
            if g0 <= 0 or g1 <= 0:
                continue
            conv = g1 / g0
            parallel = abs(nu - nl) < 0.0015
            pennant = conv < 0.7
            if bull:
                if pennant:
                    kind = "Boğa Flaması"
                elif parallel and nu < -0.0002:
                    kind = "Boğa Bayrağı"
                else:
                    continue
            else:
                if pennant:
                    kind = "Ayı Flaması"
                elif parallel and nu > 0.0002:
                    kind = "Ayı Bayrağı"
                else:
                    continue
            pole_score = min(pole_h / (atr * 6), 1) * 100
            shape = (1 - conv) * 100 if pennant else max(0, 100 - abs(nu - nl) / 0.0015 * 100)
            tight = max(0, 100 - (flag_h / pole_h) / cfg["max_height_ratio"] * 100)
            q = _clip(pole_score) * .35 + _clip(shape) * .25 + _clip(tight) * .25 + \
                _clip(100 if 8 <= flag_len <= 20 else 60) * .15
            if q < cfg["min_quality"]:
                continue
            if best and q <= best["kalite"]:
                continue
            e2 = last
            tgt = close[last] + pole_h * 0.8 if bull else close[last] - pole_h * 0.8
            best = _mk(kind, "al" if bull else "sat", q,
                       [[f0, float(iu)], [e2, float(su * (m - 1) + iu)]],
                       [[f0, float(il)], [e2, float(sl * (m - 1) + il)]],
                       tgt, f0, e2, {"direk": round(float(pole_h), 4)})
    return best


# ----------------------------------------------------------------------------
# 4) IKILI DIP / TEPE
# ----------------------------------------------------------------------------

DBL = dict(order=6, max_diff=0.010, min_sep=12, max_sep=38, min_depth_atr=5.5,
           min_depth_pct=0.08, trend_min=2.2, min_quality=85, max_age=12,
           uc_pencere=40)
# En "morfinli" (en yuksek yanlis pozitifli) dedektor buydu: eski ayarlarla
# rastgele veride %8.2, kalite esigini 62->90 cikarsan bile %2.3 kaliyordu —
# yani kalite skoru bu formasyonda gurultuyu ayirt etmiyordu, geometrik
# toleranslarin kendisi gevsekti (iki dip/tepe arasi fark toleransi %1.8,
# 55 bara kadar ayri olabiliyordu -> cok genis bir kombinasyon uzayinda
# "en iyi uyani" ariyordu, bu da tesadufen de kolay tutturuluyordu).
# max_diff %1.8->%1.0, max_sep 55->38 bar, derinlik esikleri yukseltildi,
# min_quality 62->85: sonuc rastgele veride %8.2 -> %0.5 yanlis pozitif.


def find_double(high, low, close, S):
    cfg = DBL
    n = len(close)
    if n < 60:
        return None
    last = n - 1
    atr = S["atr14"][last]
    if not (np.isfinite(atr) and atr > 0):
        return None
    tops, bots = fixed_pivots(high, low, cfg["order"])
    best = None

    for bottom in (True, False):
        pts = bots if bottom else tops
        if len(pts) < 2:
            continue
        for a in range(len(pts) - 1):
            for b in range(a + 1, len(pts)):
                i1, y1 = pts[a]
                i2, y2 = pts[b]
                sep = i2 - i1
                if sep < cfg["min_sep"] or sep > cfg["max_sep"]:
                    continue
                if last - i2 > cfg["max_age"] + cfg["order"]:
                    continue
                if abs(y2 - y1) / max(y1, 1e-9) > cfg["max_diff"]:
                    continue
                mid = high[i1:i2 + 1].max() if bottom else low[i1:i2 + 1].min()
                depth = (mid - max(y1, y2)) if bottom else (min(y1, y2) - mid)
                if depth < atr * cfg["min_depth_atr"]:
                    continue
                if depth / max(mid, 1e-9) < cfg["min_depth_pct"]:
                    continue
                # Iki dip/tepe, genis bir pencerenin de gercek ucu olmali
                w0 = max(0, i1 - cfg["uc_pencere"])
                if bottom and low[w0:i2 + 1].min() < min(y1, y2) - 1e-9:
                    continue
                if (not bottom) and high[w0:i2 + 1].max() > max(y1, y2) + 1e-9:
                    continue
                if bottom and low[i1:i2 + 1].min() < min(y1, y2) - 1e-9:
                    continue
                if (not bottom) and high[i1:i2 + 1].max() > max(y1, y2) + 1e-9:
                    continue
                tr = _prior_trend(close, S["atr14"], i1)
                if bottom and tr > -cfg["trend_min"]:
                    continue
                if (not bottom) and tr < cfg["trend_min"]:
                    continue
                sym = _clip(100 - abs(y2 - y1) / max(y1, 1e-9) / cfg["max_diff"] * 100)
                dep = _clip(min(depth / (atr * 5), 1) * 100)
                spc = _clip(100 if 15 <= sep <= 45 else max(0, 100 - abs(sep - 30) * 2))
                tsc = _clip(min(abs(tr) / 2.5, 1) * 100)
                q = sym * .30 + dep * .30 + spc * .20 + tsc * .20
                if q < cfg["min_quality"]:
                    continue
                if best and q <= best["kalite"]:
                    continue
                tgt = mid + depth if bottom else mid - depth
                best = _mk("İkili Dip" if bottom else "İkili Tepe",
                           "al" if bottom else "sat", q,
                           [[i1, float(mid)], [last, float(mid)]],
                           [[i1, float(y1)], [i2, float(y2)]],
                           tgt, i1, last, {"boyun": round(float(mid), 4)})
    return best


# ----------------------------------------------------------------------------
# GIRIS NOKTASI
# ----------------------------------------------------------------------------

DETECTORS = [
    ("kama", find_wedge),
    ("ucgen", find_triangle),
    ("bayrak", find_flag),
    ("ikili", find_double),
]


def tara(bars, times=None):
    """
    bars: [{'open','high','low','close'}, ...] veya (o,h,l,c) numpy dizileri
    Doner: en yuksek kaliteli formasyon (dict) ya da None.
    Cizgi koordinatlari bar indeksidir; times verilirse unix zamana cevrilir.
    """
    if isinstance(bars, dict):
        high, low, close = bars["high"], bars["low"], bars["close"]
    else:
        high = np.array([b["high"] for b in bars], float)
        low = np.array([b["low"] for b in bars], float)
        close = np.array([b["close"] for b in bars], float)
    if len(close) < 60:
        return None
    S = _series(high, low, close)
    found = []
    for name, fn in DETECTORS:
        try:
            r = fn(high, low, close, S)
        except Exception:
            r = None
        if r:
            r["grup"] = name
            found.append(r)
    if not found:
        return None
    best = max(found, key=lambda r: r["kalite"])
    if times is not None:
        for key in ("ust", "alt"):
            best[key] = [{"time": int(times[max(0, min(len(times) - 1, int(i)))]),
                          "value": round(float(v), 4)} for i, v in best[key]]
    best.pop("bas", None)
    best.pop("bit", None)
    return best

# ============================================================================
#  KENDINI DOGRULAMA — motoru rastgele veride olcer (gercekte formasyon yok,
#  ne kadarinda "buldum" diyor). Esikleri degistirirsen bunu calistir.
# ============================================================================

def kendini_dogrula(N=150):
    rng = np.random.default_rng(42)

    def rastgele(n=160, vol=0.02):
        p = 100 * np.exp(np.cumsum(rng.normal(0, vol, n)))
        o = p * (1 + rng.normal(0, 0.004, n))
        hi = np.maximum(o, p) * (1 + np.abs(rng.normal(0, 0.004, n)))
        lo = np.minimum(o, p) * (1 - np.abs(rng.normal(0, 0.004, n)))
        return hi, lo, p

    say = {k: 0 for k, _ in DETECTORS}
    herhangi = 0
    for _ in range(N):
        hi, lo, c = rastgele()
        S = _series(hi, lo, c)
        bulundu = False
        for k, fn in DETECTORS:
            try:
                r = fn(hi, lo, c, S)
            except Exception:
                r = None
            if r:
                say[k] += 1
                bulundu = True
        if bulundu:
            herhangi += 1
    print(f"KENDINI DOGRULAMA — {N} rastgele grafik (gercekte formasyon YOK)")
    for k, v in say.items():
        print(f"  {k:8s}: %{100*v/N:5.1f} yanlis pozitif")
    print(f"  {'TOPLAM':8s}: %{100*herhangi/N:5.1f}")
    return herhangi / N

import json
import os
import sys
import time
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone, timedelta


# ============================================================================
#  ZAMAN DILIMLERI
#  (ad, Yahoo araligi, Yahoo menzili, kac barla sinirla)
#  4SA'yi Yahoo vermiyor — 1 saatlikten gun ici gruplayarak uretiyoruz.
# ============================================================================

DILIMLER = [
    ("15DK", "15m", "60d",  260),
    ("1SA",  "1h",  "2y",   320),
    ("4SA",  "1h",  "2y",   320),   # 1h cekilir, 4 saatlige donusturulur
    ("1G",   "1d",  "2y",   300),
    ("1HAF", "1wk", "10y",  300),
    ("1AY",  "1mo", "max",  240),
]

HOSTS = ["query1.finance.yahoo.com", "query2.finance.yahoo.com"]
BASLIK = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Accept": "application/json",
}
ISCI = int(os.environ.get("ISCI", "5"))
MIN_KALITE = int(os.environ.get("MIN_KALITE", "80"))
# 72->80: dedektorlerin kendi min_quality'leri artik 75-85 araliginda,
# 72'lik global esik pratikte hicbir sey elemiyordu. 80, en gevsek dedektor
# (ucgen, 75) haricindekilerde zaten asilan bir taban; ucgen icin ek bir
# guvenlik marji ekliyor.


def _getir(url, timeout=20):
    req = urllib.request.Request(url, headers=BASLIK)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read().decode("utf-8", "replace"))


def evreni_yukle():
    """Hisse listesini havuz.json'daki imlec alanindan okur."""
    kodlar = []
    try:
        j = _getir(HAVUZ_URL, timeout=45)
        for alan in ("imlec", "hisseler", "kodlar"):
            v = j.get(alan)
            if isinstance(v, dict) and len(v) > 20:
                kodlar = list(v.keys()); break
            if isinstance(v, list) and len(v) > 20:
                kodlar = [str(x) for x in v]; break
        print(f"evren: havuz.json'dan {len(kodlar)} hisse okundu")
    except Exception as e:
        print(f"evren: havuz okunamadi ({type(e).__name__}), yedek liste kullaniliyor")
    if not kodlar:
        kodlar = YEDEK_HISSELER.split()
    kodlar = " ".join(kodlar).replace(",", " ").split()
    temiz = []
    for k in kodlar:
        k = "".join(c for c in k.upper() if c.isalnum())
        if 3 <= len(k) <= 6 and k not in temiz:
            temiz.append(k)
    return temiz


def mumlari_cek(kod, aralik="1d", menzil="2y"):
    """Yahoo'dan OHLC ceker. Iki host, host basina 2 deneme."""
    for host in HOSTS:
        for deneme in range(2):
            url = (f"https://{host}/v8/finance/chart/{kod}.IS"
                   f"?range={menzil}&interval={aralik}")
            try:
                j = _getir(url)
                break
            except Exception:
                if deneme == 0:
                    time.sleep(1.5)     # rate limit yediyse biraz bekle
                j = None
        if j is None:
            continue
        try:
            rz = j["chart"]["result"][0]
            ts = rz["timestamp"]
            q = rz["indicators"]["quote"][0]
        except Exception:
            continue
        o, h, l, c, t = [], [], [], [], []
        for i, zaman in enumerate(ts):
            kap = q["close"][i] if q.get("close") else None
            if kap is None or not (kap > 0):
                continue
            ac = q["open"][i] if q.get("open") and q["open"][i] else kap
            yu = q["high"][i] if q.get("high") and q["high"][i] else max(ac, kap)
            du = q["low"][i] if q.get("low") and q["low"][i] else min(ac, kap)
            o.append(ac); h.append(max(yu, ac, kap)); l.append(min(du, ac, kap))
            c.append(kap); t.append(int(zaman))
        if len(c) >= 70:
            return (np.array(h, float), np.array(l, float),
                    np.array(c, float), t)
    return None


def dort_saatlik(high, low, close, times):
    """1 saatlik barlari 4 saatlige cevirir. Gun sinirini korur: her gun
    kendi icinde 4'erli gruplanir, boylece bar bir sonraki seansa tasmaz."""
    gruplar = {}
    sira = []
    for i, ts in enumerate(times):
        gun = (ts + 10800) // 86400          # Turkiye saatine gore gun
        if gun not in gruplar:
            gruplar[gun] = []
            sira.append(gun)
        gruplar[gun].append(i)
    H, L, C, T = [], [], [], []
    for gun in sira:
        idx = gruplar[gun]
        for k in range(0, len(idx), 4):
            par = idx[k:k + 4]
            H.append(float(high[par].max()))
            L.append(float(low[par].min()))
            C.append(float(close[par[-1]]))
            T.append(int(times[par[0]]))
    if len(C) < 70:
        return None
    return np.array(H), np.array(L), np.array(C), T


def bir_hisse(kod):
    """Hisseyi TUM zaman dilimlerinde tarar.
    Doner: en iyi formasyon + dilim dokumu + gunluk formasyon (grafik icin)."""
    try:
        bulunan = {}
        saatlik = None
        for ad, aralik, menzil, tavan in DILIMLER:
            try:
                if ad == "4SA":
                    if saatlik is None:
                        continue
                    veri = dort_saatlik(*saatlik)
                else:
                    veri = mumlari_cek(kod, aralik, menzil)
                    if ad == "1SA" and veri is not None:
                        saatlik = veri
                if veri is None:
                    continue
                high, low, close, times = veri
                if len(close) > tavan:      # cok uzun gecmis gereksiz, yavaslatir
                    high, low, close = high[-tavan:], low[-tavan:], close[-tavan:]
                    times = times[-tavan:]
                r = tara({"high": high, "low": low, "close": close}, times=times)
                if r and r.get("kalite", 0) >= MIN_KALITE:
                    r["tf"] = ad
                    r["fiyat"] = round(float(close[-1]), 4)
                    bulunan[ad] = r
            except Exception:
                continue
        if not bulunan:
            return kod, None, None
        # En iyi: once kalite, esitlikte uzun vade tercih edilir
        oncelik = {"1AY": 6, "1HAF": 5, "1G": 4, "4SA": 3, "1SA": 2, "15DK": 1}
        en_iyi = max(bulunan.values(),
                     key=lambda r: (r["kalite"], oncelik.get(r["tf"], 0)))
        kayit = dict(en_iyi)
        # Grafik gunluk mumlarla ciziliyor — cizgiler yalnizca 1G'den alinmali,
        # yoksa 15dk'lik bir kamanin cizgisi gunluk grafige yanlis oturur.
        g = bulunan.get("1G")
        kayit["gunluk"] = {k: g[k] for k in ("tip", "yon", "kalite", "ust", "alt",
                                             "hedef", "grup")} if g else None
        # Onceden dilimler[] sadece ozet (tip/yon/kalite) tutuyordu — sadece
        # "en iyi" formasyonun cizgisi vardi, digerleri worker'da rozet
        # olarak gorunup grafige cizilemiyordu. Artik HER dilim kendi tam
        # cizgi geometrisini (ust/alt/hedef) tasiyor, boylece hangi dilime
        # tiklanirsa tiklansin grafik o dilimin gercek cizgisini cizebiliyor.
        kayit["dilimler"] = [
            {k: r[k] for k in ("tf", "tip", "yon", "kalite", "ust", "alt", "hedef", "grup")}
            for r in sorted(bulunan.values(), key=lambda x: -x["kalite"])
        ]
        return kod, kayit, None
    except Exception as e:
        return kod, None, f"{type(e).__name__}: {e}"


def main():
    t0 = time.time()
    kodlar = evreni_yukle()
    if not kodlar:
        print("HATA: hisse listesi bos. EVREN_URL ya da bist.txt gerekli.")
        sys.exit(1)
    print(f"{len(kodlar)} hisse × {len(DILIMLER)} zaman dilimi taraniyor "
          f"({ISCI} es zamanli istek)…")

    sonuc, hatalar, bos = {}, {}, 0
    with ThreadPoolExecutor(max_workers=ISCI) as ex:
        for i, (kod, r, hata) in enumerate(ex.map(bir_hisse, kodlar), 1):
            if r:
                sonuc[kod] = r
            elif hata:
                hatalar[kod] = hata
            else:
                bos += 1
            if i % 50 == 0:
                print(f"  {i}/{len(kodlar)} — {len(sonuc)} formasyon")

    sayim, dilim_sayim = {}, {}
    for r in sonuc.values():
        sayim[r["tip"]] = sayim.get(r["tip"], 0) + 1
        for d in r.get("dilimler", []):
            dilim_sayim[d["tf"]] = dilim_sayim.get(d["tf"], 0) + 1

    tr = timezone(timedelta(hours=3))
    cikti = {
        "guncelleme": datetime.now(tr).isoformat(timespec="minutes"),
        "taranan": len(kodlar),
        "bulunan": len(sonuc),
        "dagilim": sayim,
        "dilim_dagilim": dilim_sayim,
        "min_kalite": MIN_KALITE,
        "sonuc": sonuc,
    }
    with open("formasyon.json", "w", encoding="utf-8") as f:
        json.dump(cikti, f, ensure_ascii=False, separators=(",", ":"))

    boyut = os.path.getsize("formasyon.json") / 1024
    print(f"\n{'='*46}")
    print(f"taranan       : {len(kodlar)}")
    print(f"formasyon     : {len(sonuc)}  (%{100*len(sonuc)/len(kodlar):.1f})")
    print(f"formasyonsuz  : {bos}")
    print(f"veri hatasi   : {len(hatalar)}")
    for k, v in sorted(sayim.items(), key=lambda x: -x[1]):
        print(f"  {k:16s}: {v}")
    print("zaman dilimi dagilimi:")
    for ad, _, _, _ in DILIMLER:
        print(f"  {ad:16s}: {dilim_sayim.get(ad, 0)}")
    print(f"dosya         : formasyon.json ({boyut:.0f} KB)")
    print(f"sure          : {time.time()-t0:.0f} sn")
    if hatalar:
        ilk = list(hatalar.items())[:5]
        print("ilk hatalar   :", ", ".join(f"{k}({v[:30]})" for k, v in ilk))




if __name__ == "__main__":
    if "--test" in sys.argv:
        kendini_dogrula(int(os.environ.get("TEST_N", "150")))
    else:
        main()
