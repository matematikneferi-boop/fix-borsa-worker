/* ============================================================
   Fix Borsa · Telegram Bot Worker — sinyal 9
   ------------------------------------------------------------
   DEĞİŞENLER (kullanıcı isteği):
     1) Izgara artık ÇIPLAK DEĞİL. Listenin metninde her hisse KENDİ KARTI
        içinde: sinyal fiyatı, şu anki fiyat, sinyalden bu yana kâr/zarar,
        hedef ve hedefe kalan süre.
     2) İKİ SIRALAMA: 💰 kâr/zarar · ⏳ hedefe kalan süre. Düğmeyle geçilir,
        aktif olan ✅ ile işaretlenir.
     3) SAYFALAMA: kartlar yer kapladığı için sayfa başına 8 hisse.
        ◀️ ▶️ düğmeleriyle gezilir; ızgara sadece o sayfanın hisselerini
        gösterir, dokununca detay açılır.
   Sıralama indeksleri telefondan gelen pakette hazır geliyor (kartlar.sira),
   yoksa worker kendi hesaplıyor — eski paketler de çalışsın diye.

   YÖNETİCİ PANELİ  →  /panel?key=PANEL_KEY   (mobil için tasarlandı)
     · üye listesi + arama, kişi başına sorgu ve son aktiflik
     · sorgu liderleri ve davet liderleri sıralaması
     · sınırsız erişim listesi (bekleme süresine takılmayanlar)
     · erişim kapatma (engel), tek tuşla bekleme sıfırlama
     · bekleme süresini dakika olarak ayarlama (0/0 = bekleme yok)
     · toplu mesaj: tüm üyeler / sınırsızlar / tek kişi, ayrıca test gönderimi
     · CSV dışa aktarma
   Panel uçları: /panel/veri /panel/vip /panel/engel /panel/ayar /panel/kota
                 /panel/yayin /panel/csv — hepsi key ile korumalı.
   ============================================================ */

const YONETICILER = new Set(["6819672343"]);

/* ================== 🔑 ŞİFRE ==================
   Cloudflare'de ayar yapmaya gerek yok: şifre burada yazılı.
   Telefondaki uygulamaya ve panel adresine bunu yazacaksın.
   (İstersen Cloudflare'de PUSH_KEY diye bir değişken tanımlayıp
   başka bir şifre verebilirsin; varsa o geçerli olur.) */
const SIFRE = "kolayfix";
/* Worker kendi adresini istek geldiğinde öğrenir; panel linkini
   Telegram'da düğme olarak verebilmek için saklıyoruz. */
let KOK = "", AKTIF_SIFRE = SIFRE;
const panelLinki = () => KOK + "/panel?key=" + encodeURIComponent(AKTIF_SIFRE);
const sifreDogru = (env, url) => {
  const gelen = url.searchParams.get("key");
  return !!gelen && (gelen === (env.PUSH_KEY || SIFRE) || gelen === (env.PANEL_KEY || env.PUSH_KEY || SIFRE));
};
const CACHE_ANAHTAR = "https://liste.local/veri";
let bellekListe = null;

const SAYFA_BOY = 8;   /* kart uzun olduğu için sayfa başına 8 hisse */

/* ---------- ZAMAN SINIRINA TAKILAN DÜĞMELER ----------
   Kota SADECE genel liste sorgularında işler. Detay (d:), sıralama/sayfa
   (l:), davet ve menü serbesttir — kullanıcı açtığı listenin içinde
   beklemeden dolaşabilsin diye. */
const GENEL_SORGULAR = new Set(["tavan", "potansiyel", "fibo"]);

/* ---------- MENÜ ----------
   "Önceki sonuçlar" (karne) YÖNETİCİYE ÖZEL: düğme normal kullanıcıda
   hiç görünmez, callback ile elle denense de reddedilir. */
const yoneticiMi = id => YONETICILER.has(String(id));

function menuYap(kisi) {
  const satirlar = [
    [{ text: "🏅 Bu taramanın ilk 3'ü", callback_data: "ilk3" }],
    [{ text: "🎯 Güçlü sinyaller", callback_data: "tavan" }],
    [{ text: "📈 Yüksek potansiyel", callback_data: "potansiyel" }],
    [{ text: "📐 Yeni kırılımlar", callback_data: "fibo" }]
  ];
  if (yoneticiMi(kisi)) {
    satirlar.push([{ text: "📊 Önceki sonuçlar 🔐", callback_data: "karne" }]);
    /* Panel bir WEB SAYFASI. Telegram'dan tek dokunuşla açılsın diye
       doğrudan link düğmesi koyuyoruz — adres/şifre yazmaya gerek yok. */
    if (KOK) satirlar.push([{ text: "🛠 Yönetici paneli 🔐", url: panelLinki() }]);
  }
  satirlar.push([{ text: "🎁 Davet linkim", callback_data: "davet" }]);
  satirlar.push([{ text: "🔄 Yenile", callback_data: "menu" }]);
  return { inline_keyboard: satirlar };
}

const KARSILAMA = "👋 <b>Fix Borsa</b>\n\nAşağıdaki düğmelerden istediğin listeyi aç.\nListeler gün içinde düzenli güncellenir.\n\n<i>⚠️ Yatırım tavsiyesi değildir.</i>";

async function tg(token, metot, govde) {
  return fetch(`https://api.telegram.org/bot${token}/${metot}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(govde)
  }).then(r => r.json()).catch(() => null);
}

async function listeYaz(env, veri) {
  bellekListe = veri;
  if (env.VERI) await env.VERI.put("listeler", JSON.stringify(veri));
  await caches.default.put(new Request(CACHE_ANAHTAR), new Response(JSON.stringify(veri), {
    headers: { "Cache-Control": "max-age=86400", "content-type": "application/json" }
  }));
}

async function listeOku(env) {
  if (bellekListe) return bellekListe;
  if (env.VERI) {
    const ham = await env.VERI.get("listeler");
    if (ham) { bellekListe = JSON.parse(ham); return bellekListe; }
  }
  const c = await caches.default.match(new Request(CACHE_ANAHTAR));
  if (!c) return null;
  bellekListe = await c.json().catch(() => null);
  return bellekListe;
}

/* ================== ⚙️ AYARLAR (panelden değişir) ==================
   Bekleme süresi artık kodda sabit değil; panelden dakika olarak
   ayarlanır, KV'de tutulur, 60 sn bellek önbelleği ile okunur. */
const AYAR_VARSAYILAN = { kisitMin: 10, kisitMax: 30 };
let ayarBellek = null, ayarZaman = 0;
async function ayarOku(env, zorla) {
  if (!zorla && ayarBellek && Date.now() - ayarZaman < 6e4) return ayarBellek;
  let a = { ...AYAR_VARSAYILAN };
  if (env.VERI) { const h = await env.VERI.get("ayar"); if (h) a = { ...a, ...JSON.parse(h) }; }
  ayarBellek = a; ayarZaman = Date.now();
  return a;
}
async function ayarYaz(env, a) {
  const yeni = { ...AYAR_VARSAYILAN, ...(await ayarOku(env, true)), ...a };
  yeni.kisitMin = Math.max(0, Math.min(600, Number(yeni.kisitMin) || 0));
  yeni.kisitMax = Math.max(yeni.kisitMin, Math.min(600, Number(yeni.kisitMax) || 0));
  if (env.VERI) await env.VERI.put("ayar", JSON.stringify(yeni));
  ayarBellek = yeni; ayarZaman = Date.now();
  return yeni;
}

/* ================== 🔓 SINIRSIZ ERİŞİM / 🚫 ENGEL ==================
   İki liste de panelden yönetilir. Her düğme basışında KV okumak pahalı
   olurdu; 60 saniyelik bellek önbelleği tutulur, panelden değişince
   önbellek anında tazelenir. */
let vipBellek = null, vipZaman = 0;
async function vipOku(env, zorla) {
  if (!zorla && vipBellek && Date.now() - vipZaman < 6e4) return vipBellek;
  if (!env.VERI) { vipBellek = []; vipZaman = Date.now(); return vipBellek; }
  const h = await env.VERI.get("vip");
  vipBellek = h ? JSON.parse(h) : [];
  vipZaman = Date.now();
  return vipBellek;
}
async function vipYaz(env, liste) {
  if (env.VERI) await env.VERI.put("vip", JSON.stringify(liste));
  vipBellek = liste; vipZaman = Date.now();
  return liste;
}
async function sinirsizMi(env, id) {
  if (yoneticiMi(id)) return true;
  const v = await vipOku(env);
  return v.includes(String(id));
}

let engelBellek = null, engelZaman = 0;
async function engelOku(env, zorla) {
  if (!zorla && engelBellek && Date.now() - engelZaman < 6e4) return engelBellek;
  if (!env.VERI) { engelBellek = []; engelZaman = Date.now(); return engelBellek; }
  const h = await env.VERI.get("engel");
  engelBellek = h ? JSON.parse(h) : [];
  engelZaman = Date.now();
  return engelBellek;
}
async function engelYaz(env, liste) {
  if (env.VERI) await env.VERI.put("engel", JSON.stringify(liste));
  engelBellek = liste; engelZaman = Date.now();
  return liste;
}
async function engelliMi(env, id) {
  if (yoneticiMi(id)) return false;
  return (await engelOku(env)).includes(String(id));
}

function kisitAnahtari(chatId) { return new Request("https://kisit.local/u/" + chatId); }

async function kisitliMi(env, chatId) {
  const c = caches.default, anahtar = kisitAnahtari(chatId);
  const varMi = await c.match(anahtar);
  if (varMi) {
    const kalan = parseInt(await varMi.text(), 10) - Math.floor(Date.now() / 1e3);
    if (kalan > 0) return kalan;
  }
  const a = await ayarOku(env);
  const sure = 60 * (a.kisitMin + Math.floor((a.kisitMax - a.kisitMin + 1) * Math.random()));
  if (sure <= 0) return 0;
  const bitis = Math.floor(Date.now() / 1e3) + sure;
  await c.put(anahtar, new Response(String(bitis), { headers: { "Cache-Control": "max-age=" + sure } }));
  return 0;
}
/* Panelden "kotayı sıfırla": kişinin bekleme kaydını siler. */
async function kotaSifirla(chatId) {
  try { await caches.default.delete(kisitAnahtari(chatId)); return true; } catch (e) { return false; }
}

/* ================== ⏳ SÜRE BİÇİMİ ==================
   Telefon kalan süreyi hazır metin olarak gönderiyor (k.kalan). Eski
   paketlerde yoksa bitisTs'den burada hesaplanır. */
function kalanSn(k) {
  if (k.kalanSn !== undefined && k.kalanSn !== null) return k.kalanSn;
  if (k.bitisTs) return k.bitisTs - Math.floor(Date.now() / 1e3);
  return null;
}
function kalanMetin(k) {
  if (k.kalan) return k.kalan;
  const sn = kalanSn(k);
  if (sn === null) return null;
  if (sn <= 0) return "süre doldu";
  const s = Math.round(sn / 3600);
  if (s < 1) return "1 saatten az";
  if (s < 48) return s + " saat";
  return Math.round(s / 24) + " gün";
}
/* Sinyalden bu yana kâr/zarar — pakette varsa o, yoksa fiyat/giriş farkı. */
function karYuzde(k) {
  if (k.kar !== undefined && k.kar !== null) return Number(k.kar);
  if (k.giris > 0 && k.fiyat > 0) return (Number(k.fiyat) / Number(k.giris) - 1) * 100;
  return null;
}

/* ================== 🔃 SIRALAMA ==================
   mod: "pot" (potansiyel — varsayılan geliş sırası) · "kar" · "sure" */
const SIRA_AD = { pot: "🎯 Potansiyel", kar: "💰 Kâr/Zarar", sure: "⏳ Kalan süre" };

function siraDizisi(veri, tip, mod) {
  const dizi = (veri.kartlar && veri.kartlar[tip]) || [];
  const n = dizi.length;
  const varsayilan = [...Array(n).keys()];
  if (mod === "pot") return varsayilan;
  /* telefondan hazır geldiyse onu kullan */
  const hazir = veri.kartlar && veri.kartlar.sira && veri.kartlar.sira[tip] && veri.kartlar.sira[tip][mod];
  if (Array.isArray(hazir) && hazir.length === n) return hazir;
  /* gelmediyse burada hesapla (eski paket uyumu) */
  if (mod === "kar") {
    return varsayilan.sort((a, b) => (karYuzde(dizi[b]) ?? -9999) - (karYuzde(dizi[a]) ?? -9999));
  }
  return varsayilan.sort((a, b) => {
    const A = kalanSn(dizi[a]), B = kalanSn(dizi[b]);
    const av = (A === null || A <= 0) ? Infinity : A;
    const bv = (B === null || B <= 0) ? Infinity : B;
    return av - bv;
  });
}

/* ================== 🃏 KART METNİ ==================
   Izgarada hisse adı tek başına duruyordu; artık her hisse kendi kartında.
   Dört zorunlu bilgi: sinyal fiyatı · şu anki fiyat · sinyalden bu yana
   kâr/zarar · hedefe kalan süre. */
function kartMetni(k, sira) {
  const f = v => Number(v).toFixed(2);
  let m = "━━━━━━━━━━━━━━━━\n";
  m += "<b>" + sira + ". " + (k.rozet || "▫️") + " " + k.kod + "</b>" + (k.tf ? "  ·  <i>" + k.tf + "</i>" : "") + "\n";
  if (k.giris !== undefined && k.giris !== null)
    m += "💵 Sinyal <b>" + f(k.giris) + "</b> → Şimdi <b>" + f(k.fiyat) + "</b>\n";
  else
    m += "💵 Şimdi <b>" + f(k.fiyat) + "</b>\n";
  const kar = karYuzde(k);
  if (kar !== null)
    m += (kar >= 0 ? "🟢" : "🔴") + " Sinyalden bu yana: <b>" + (kar >= 0 ? "+" : "") + kar.toFixed(2) + "%</b>\n";
  if (k.hedef !== undefined && k.hedef !== null) {
    m += "🎯 Hedef <b>" + f(k.hedef) + "</b>";
    if (k.potansiyel !== undefined && k.potansiyel !== null)
      m += (Number(k.potansiyel) <= 0 ? "  ·  🏆 <b>TUTTU</b>" : "  ·  <b>+" + Number(k.potansiyel).toFixed(1) + "%</b>");
    m += "\n";
  }
  const kal = kalanMetin(k);
  if (kal) m += (kal === "süre doldu" ? "⌛" : "⏳") + " Hedefe kalan: <b>" + kal + "</b>" +
    (k.zaman ? "  ·  <i>sinyal: " + k.zaman + "</i>" : "") + "\n";
  else if (k.zaman) m += "⏱ Sinyal: <b>" + k.zaman + "</b>\n";
  return m;
}

function listeMetni(baslik, veri, tip, mod, sayfa, sira) {
  const dizi = veri.kartlar[tip];
  const toplamSayfa = Math.max(1, Math.ceil(sira.length / SAYFA_BOY));
  let m = baslik + "\n";
  if (veri.guncelleme) {
    const d = new Date(veri.guncelleme);
    m += "<i>" + String((d.getUTCHours() + 3) % 24).padStart(2, "0") + ":" +
      String(d.getUTCMinutes()).padStart(2, "0") + " · " + dizi.length + " hisse</i>\n";
  }
  m += "<i>Sıralama: " + (SIRA_AD[mod] || SIRA_AD.pot) + " · sayfa " + (sayfa + 1) + "/" + toplamSayfa + "</i>\n\n";
  const bas = sayfa * SAYFA_BOY;
  sira.slice(bas, bas + SAYFA_BOY).forEach((ix, j) => { m += kartMetni(dizi[ix], bas + j + 1); });
  m += "━━━━━━━━━━━━━━━━\n<i>Hisse düğmesine dokun, tam detayını gör.</i>\n";
  m += "<i>⚠️ Yatırım tavsiyesi değildir.</i>";
  return m;
}

function listeKlavye(veri, tip, mod, sayfa, sira) {
  const dizi = veri.kartlar[tip];
  const toplamSayfa = Math.max(1, Math.ceil(sira.length / SAYFA_BOY));
  const satirlar = [];
  /* sıralama şeridi */
  satirlar.push(["pot", "kar", "sure"].map(x => ({
    text: (x === mod ? "✅ " : "") + SIRA_AD[x],
    callback_data: "l:" + tip + ":" + x + ":0"
  })));
  /* O sayfadaki hisseler — 2'Lİ ızgara.
     4'lü dizilimde düğmeye sadece kod sığıyordu ve kullanıcı hiçbir şey
     bilmeden dokunmak zorunda kalıyordu. 2 sütunda kâr/zarar ve kalan süre
     de düğmenin üstünde görünüyor; dokunmadan önce ön bilgi var. */
  const bas = sayfa * SAYFA_BOY;
  const sayfaIx = sira.slice(bas, bas + SAYFA_BOY);
  const dugmeMetni = k => {
    const kar = karYuzde(k);
    const kal = kalanMetin(k);
    let t = (k.rozet || "") + k.kod;
    if (kar !== null) t += "  " + (kar >= 0 ? "+" : "") + kar.toFixed(1) + "%";
    if (kal) t += " · " + (kal === "süre doldu" ? "⌛" : kal.replace(" gün", "g").replace(" saat", "s"));
    return t;
  };
  for (let i = 0; i < sayfaIx.length; i += 2) {
    satirlar.push(sayfaIx.slice(i, i + 2).map(ix => ({
      text: dugmeMetni(dizi[ix]),
      callback_data: "d:" + tip + ":" + ix + ":" + mod + ":" + sayfa
    })));
  }
  /* sayfa gezinme */
  const gez = [];
  if (sayfa > 0) gez.push({ text: "◀️ Önceki", callback_data: "l:" + tip + ":" + mod + ":" + (sayfa - 1) });
  if (sayfa < toplamSayfa - 1) gez.push({ text: "Sonraki ▶️", callback_data: "l:" + tip + ":" + mod + ":" + (sayfa + 1) });
  if (gez.length) satirlar.push(gez);
  satirlar.push([{ text: "◀️ Menü", callback_data: "menu" }]);
  return { inline_keyboard: satirlar };
}

/* ================== ✉️ GÖNDER veya DÜZENLE ==================
   Sıralama/sayfa/detay gezinmesinde her dokunuş yeni mesaj atıyordu; 40
   hisselik listede sohbet çöplüğe dönüyor ve her mesaj Telegram kotasından
   yeniyordu. Artık özel sohbette AYNI MESAJ düzenleniyor: tek istek, temiz
   ekran, geri dönünce liste hâlâ yerinde. Grupta düzenlenemez (mesaj bize
   ait değil), orada yeni mesaj gider. */
async function yanitla(env, cq, chat, grupMu, metin, klavye, duzenle) {
  const ortak = { chat_id: chat, text: metin, parse_mode: "HTML", disable_web_page_preview: true, reply_markup: klavye };
  if (duzenle && !grupMu && cq.message && cq.message.message_id) {
    const y = await tg(env.BOT_TOKEN, "editMessageText",
      Object.assign({ message_id: cq.message.message_id }, ortak));
    if (y && y.ok) return y;
    /* "message is not modified" ya da mesaj çok eski → yeni mesaj at */
  }
  return tg(env.BOT_TOKEN, "sendMessage", ortak);
}

function detayMetni(k) {
  const f = v => Number(v).toFixed(2);
  let m = "━━━━━━━━━━━━━━━━\n";
  m += "<b>" + k.kod + "</b>  ·  <b>" + f(k.fiyat) + " ₺</b>\n";
  if (k.guc) m += k.guc + "\n";
  if (k.zaman) m += "⏱ Sinyal: " + k.zaman + (k.tf ? "  ·  " + k.tf : "") + "\n";
  if (k.giris !== undefined && k.giris !== null) {
    m += "🚪 Sinyal fiyatı: <b>" + f(k.giris) + "</b>\n";
    const kar = karYuzde(k);
    if (kar !== null)
      m += (kar >= 0 ? "🟢" : "🔴") + " Sinyalden bu yana: <b>" + (kar >= 0 ? "+" : "") + kar.toFixed(2) + "%</b>\n";
  }
  if (k.direncler && k.direncler.length)
    m += "🧱 Dirençler: " + k.direncler.map(v => f(v)).join(" · ") + "\n";
  if (k.hedef !== undefined && k.hedef !== null) {
    m += "🎯 Hedef: <b>" + f(k.hedef) + "</b>\n";
    if (k.potansiyel !== undefined && k.potansiyel !== null)
      m += Number(k.potansiyel) <= 0
        ? "🏆 <b>HEDEF TUTTU</b> — fiyat hedefin " + Math.abs(k.potansiyel).toFixed(1) + "% üstünde\n"
        : (k.rozet || "➡️") + " Potansiyel: <b>+" + Number(k.potansiyel).toFixed(1) + "%</b>\n";
  }
  const kal = kalanMetin(k);
  if (kal) m += (kal === "süre doldu" ? "⌛" : "⏳") + " Hedefe kalan süre: <b>" + kal + "</b>\n";
  m += "━━━━━━━━━━━━━━━━\n<i>⚠️ Yatırım tavsiyesi değildir.</i>";
  return m;
}

/* ---------- istatistik / referans ---------- */
let sayacBirikim = {}, sayacSonYazma = 0;
async function istOku(env) {
  if (!env.VERI) return { toplam: 0, basis: {}, gun: {} };
  const h = await env.VERI.get("istatistik");
  return h ? JSON.parse(h) : { toplam: 0, basis: {}, gun: {} };
}
async function refOku(env) {
  if (!env.VERI) return {};
  const h = await env.VERI.get("referanslar");
  return h ? JSON.parse(h) : {};
}
function bugun() { return (new Date).toISOString().slice(0, 10); }

async function kullaniciKaydet(env, from, refKod) {
  if (!env.VERI) return false;
  const anahtar = "u:" + from.id;
  if (await env.VERI.get(anahtar)) return false;
  const kayit = {
    id: from.id, ad: ((from.first_name || "") + " " + (from.last_name || "")).trim(),
    kullanici: from.username || "", katilim: (new Date).toISOString(), ref: refKod || null, basis: 0
  };
  await env.VERI.put(anahtar, JSON.stringify(kayit));
  const ist = await istOku(env);
  ist.toplam = (ist.toplam || 0) + 1;
  ist.gun = ist.gun || {};
  ist.gun[bugun()] = (ist.gun[bugun()] || 0) + 1;
  await env.VERI.put("istatistik", JSON.stringify(ist));
  if (refKod && String(refKod) !== String(from.id)) {
    const ref = await refOku(env);
    ref[refKod] = (ref[refKod] || 0) + 1;
    await env.VERI.put("referanslar", JSON.stringify(ref));
  }
  return true;
}

/* ================== 📈 KİŞİ BAZLI KULLANIM ==================
   "Kim neyi kullanıyor / kim sorguda lider" için kişi başına sayaç lazım.
   Her basışta o kişinin KV kaydını güncellemek yazma kotasını yakardı;
   bunun yerine TEK bir "kullanim" anahtarında {id:{tip:adet}} tutulur ve
   bellekte biriktirilip 60 saniyede bir topluca yazılır. */
let kulBirikim = {};
async function kullanimOku(env) {
  if (!env.VERI) return {};
  const h = await env.VERI.get("kullanim");
  return h ? JSON.parse(h) : {};
}

async function kullanimSay(env, ctx, tip, kisi) {
  sayacBirikim[tip] = (sayacBirikim[tip] || 0) + 1;
  if (kisi) {
    const k = kulBirikim[kisi] || (kulBirikim[kisi] = {});
    k[tip] = (k[tip] || 0) + 1;
    k.toplam = (k.toplam || 0) + 1;
    k.son = Math.floor(Date.now() / 1e3);
  }
  /* YAZMA ARALIĞI 5 DAKİKA. 1 dakikaydı: isolate başına günde 1440 yazma
     demek ve KV'nin ücretsiz günlük yazma sınırı 1000. Sayaçlar birkaç
     dakika geriden gelir, karşılığında yazma yükü beşte bire iner. */
  const simdi = Date.now();
  if (simdi - sayacSonYazma < 3e5 || !env.VERI) return;
  sayacSonYazma = simdi;
  const kopya = sayacBirikim, kopyaKul = kulBirikim;
  sayacBirikim = {}; kulBirikim = {};
  ctx.waitUntil((async () => {
    const ist = await istOku(env);
    ist.basis = ist.basis || {};
    for (const k of Object.keys(kopya)) ist.basis[k] = (ist.basis[k] || 0) + kopya[k];
    await env.VERI.put("istatistik", JSON.stringify(ist));
    if (Object.keys(kopyaKul).length) {
      const kul = await kullanimOku(env);
      for (const id of Object.keys(kopyaKul)) {
        const hedef = kul[id] || (kul[id] = {});
        for (const t of Object.keys(kopyaKul[id])) {
          if (t === "son") hedef.son = kopyaKul[id].son;
          else hedef[t] = (hedef[t] || 0) + kopyaKul[id][t];
        }
      }
      await env.VERI.put("kullanim", JSON.stringify(kul));
    }
  })());
}

function parcala(metin) {
  const p = [];
  while (metin.length > 3900) {
    let kes = metin.lastIndexOf("\n", 3900);
    if (kes < 2e3) kes = 3900;
    p.push(metin.slice(0, kes));
    metin = metin.slice(kes);
  }
  p.push(metin);
  return p;
}

/* Panel HTML gzip+base64 olarak gömülü — yapıştırılacak dosya 12 KB küçülüyor.
   Çalışma anında bir kez açılıp bellekte tutulur. */
const PANEL_GZ = "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";
let panelBellek = null;
async function panelHtml() {
  if (panelBellek) return panelBellek;
  const ham = Uint8Array.from(atob(PANEL_GZ), c => c.charCodeAt(0));
  const akis = new Blob([ham]).stream().pipeThrough(new DecompressionStream("gzip"));
  panelBellek = await new Response(akis).text();
  return panelBellek;
}

/* ================== 🏅 İLK 3 ==================
   Telefon tarafı her taramada bir "ilk 3" hesaplıyor: tazelik + likidite +
   kademe ödüllendirilmiş, süresi dolmuş sinyaller cezalandırılmış. Kullanıcı
   40 hisseye bakmak istemiyorsa gideceği tek yer burası. */
function ilk3Metni(veri) {
  const dizi = (veri.kartlar && veri.kartlar.ilk3) || [];
  const f = v => Number(v).toFixed(2);
  const madalya = ["🥇", "🥈", "🥉"];
  let m = "🏅 <b>BU TARAMANIN İLK 3'Ü</b>\n";
  if (veri.guncelleme) {
    const d = new Date(veri.guncelleme);
    m += "<i>" + String((d.getUTCHours() + 3) % 24).padStart(2, "0") + ":" +
      String(d.getUTCMinutes()).padStart(2, "0") + " taramasından</i>\n";
  }
  m += "\n";
  dizi.forEach((k, i) => {
    m += "━━━━━━━━━━━━━━━━\n" + madalya[i] + " <b>" + k.kod + "</b>" +
      (k.tf ? "  ·  <i>" + k.tf + "</i>" : "") + (k.neden ? "  ·  <i>" + k.neden + "</i>" : "") + "\n";
    if (k.giris !== undefined && k.giris !== null)
      m += "💵 Sinyal <b>" + f(k.giris) + "</b> → Şimdi <b>" + f(k.fiyat) + "</b>\n";
    const kar = karYuzde(k);
    if (kar !== null)
      m += (kar >= 0 ? "🟢" : "🔴") + " Sinyalden bu yana: <b>" + (kar >= 0 ? "+" : "") + kar.toFixed(2) + "%</b>\n";
    if (k.hedef !== undefined && k.hedef !== null) {
      m += "🎯 Hedef <b>" + f(k.hedef) + "</b>";
      if (k.potansiyel !== undefined && k.potansiyel !== null)
        m += (Number(k.potansiyel) <= 0 ? "  ·  🏆 <b>TUTTU</b>" : "  ·  <b>+" + Number(k.potansiyel).toFixed(1) + "%</b>");
      m += "\n";
    }
    const kal = kalanMetin(k);
    if (kal) m += (kal === "süre doldu" ? "⌛" : "⏳") + " Hedefe kalan: <b>" + kal + "</b>\n";
    if (k.zaman) m += "⏱ İlk sinyal: <b>" + k.zaman + "</b>\n";
  });
  m += "━━━━━━━━━━━━━━━━\n<i>Sıralama tazelik, likidite ve kademe puanına göre; " +
    "yalnız potansiyele göre değil.</i>\n<i>⚠️ Yatırım tavsiyesi değildir.</i>";
  return m;
}

const BASLIKLAR = {
  tavan: "🟥 <b>GÜÇLÜ SİNYALLER</b>",
  potansiyel: "🟩 <b>YÜKSEK POTANSİYEL</b>",
  fibo: "🟦 <b>YENİ KIRILIMLAR</b>"
};

export default {
  async fetch(istek, env, ctx) {
    const url = new URL(istek.url);
    KOK = url.origin;
    AKTIF_SIFRE = env.PANEL_KEY || env.PUSH_KEY || SIFRE;

    if ("/setup" === url.pathname) {
      const s = await tg(env.BOT_TOKEN, "setWebhook", { url: `${url.origin}/tg`, allowed_updates: ["message", "callback_query"] });
      return new Response(JSON.stringify(s, null, 2), { headers: { "content-type": "application/json" } });
    }

    if ("/push" === url.pathname && "POST" === istek.method) {
      if (!sifreDogru(env, url)) return new Response("yetkisiz", { status: 401 });
      const veri = await istek.json().catch(() => null);
      if (!veri || "object" != typeof veri) return new Response("gecersiz", { status: 400 });
      veri.guncelleme = (new Date).toISOString();
      await listeYaz(env, veri);
      return new Response("ok");
    }

    if (url.pathname.startsWith("/panel")) {
      if (!sifreDogru(env, url)) return new Response("yetkisiz", { status: 401 });
      const govde = "POST" === istek.method ? (await istek.json().catch(() => ({}))) : {};

      /* ---------- üye listesini topla (birden çok uç kullanıyor) ---------- */
      const uyeleriTopla = async (sinir) => {
        const cikti = [];
        if (!env.VERI) return cikti;
        let imlec = null;
        while (cikti.length < sinir) {
          const l = await env.VERI.list({ prefix: "u:", limit: 1000, cursor: imlec || undefined });
          for (const k of l.keys) {
            const h = await env.VERI.get(k.name);
            if (h) cikti.push(JSON.parse(h));
            if (cikti.length >= sinir) break;
          }
          if (l.list_complete || !l.cursor) break;
          imlec = l.cursor;
        }
        return cikti;
      };

      /* ---------- 🔓 sınırsız erişim listesi ---------- */
      if ("/panel/vip" === url.pathname) {
        let liste = [...(await vipOku(env, true))];
        if (govde.ekle) { const id = String(govde.ekle).replace(/\D/g, ""); if (id && !liste.includes(id)) liste.push(id); }
        if (govde.sil) liste = liste.filter(x => x !== String(govde.sil));
        await vipYaz(env, liste);
        if (govde.ekle) ctx.waitUntil(kotaSifirla(String(govde.ekle).replace(/\D/g, "")));
        return new Response(JSON.stringify({ vip: liste }), { headers: { "content-type": "application/json; charset=utf-8" } });
      }

      /* ---------- 🚫 engelli listesi ---------- */
      if ("/panel/engel" === url.pathname) {
        let liste = [...(await engelOku(env, true))];
        if (govde.ekle) { const id = String(govde.ekle).replace(/\D/g, ""); if (id && !liste.includes(id)) liste.push(id); }
        if (govde.sil) liste = liste.filter(x => x !== String(govde.sil));
        await engelYaz(env, liste);
        return new Response(JSON.stringify({ engel: liste }), { headers: { "content-type": "application/json; charset=utf-8" } });
      }

      /* ---------- ⚙️ bekleme süresi ayarı ---------- */
      if ("/panel/ayar" === url.pathname) {
        const a = "POST" === istek.method ? await ayarYaz(env, govde) : await ayarOku(env, true);
        return new Response(JSON.stringify({ ayar: a }), { headers: { "content-type": "application/json; charset=utf-8" } });
      }

      /* ---------- ⏱ tek kişinin bekleme kaydını sıfırla ---------- */
      if ("/panel/kota" === url.pathname) {
        const ok = await kotaSifirla(String(govde.id || "").replace(/\D/g, ""));
        return new Response(JSON.stringify({ ok: ok }), { headers: { "content-type": "application/json; charset=utf-8" } });
      }

      /* ---------- 📣 toplu mesaj (parça parça) ----------
         Bir istekte en fazla YAYIN_PARCA kişiye gönderilir, kalan için imleç
         döner. Panel bitene kadar tekrar çağırır; böylece binlerce üyede bile
         Worker zaman aşımına uğramaz. */
      if ("/panel/yayin" === url.pathname) {
        const metin = String(govde.metin || "").trim();
        if (!metin) return new Response(JSON.stringify({ hata: "mesaj boş" }), { status: 400, headers: { "content-type": "application/json" } });
        const hedef = govde.hedef || "hepsi";
        const YAYIN_PARCA = 60;
        let alicilar = [], imlec = null, bitti = true;

        if ("test" === hedef) {
          alicilar = [...YONETICILER];
        } else if ("tek" === hedef) {
          alicilar = [String(govde.id || "").replace(/\D/g, "")].filter(Boolean);
        } else if ("vip" === hedef) {
          const v = await vipOku(env, true);
          const bas = Number(govde.imlec || 0);
          alicilar = v.slice(bas, bas + YAYIN_PARCA);
          bitti = bas + YAYIN_PARCA >= v.length;
          imlec = bitti ? null : String(bas + YAYIN_PARCA);
        } else {
          if (env.VERI) {
            const l = await env.VERI.list({ prefix: "u:", limit: YAYIN_PARCA, cursor: govde.imlec || undefined });
            alicilar = l.keys.map(k => k.name.slice(2));
            bitti = !!l.list_complete || !l.cursor;
            imlec = bitti ? null : l.cursor;
          }
        }

        const engelliler = new Set(await engelOku(env, true));
        let gonderilen = 0, basarisiz = 0;
        for (const id of alicilar) {
          if (engelliler.has(String(id))) continue;
          const y = await tg(env.BOT_TOKEN, "sendMessage", {
            chat_id: id, text: metin, parse_mode: "HTML", disable_web_page_preview: true,
            reply_markup: menuYap(id)
          });
          if (y && y.ok) gonderilen++; else basarisiz++;
        }
        if (env.VERI && bitti) ctx.waitUntil(env.VERI.put("sonYayin", JSON.stringify({
          tarih: (new Date).toISOString(), metin: metin.slice(0, 300), hedef: hedef
        })));
        return new Response(JSON.stringify({ gonderilen, basarisiz, imlec, bitti }),
          { headers: { "content-type": "application/json; charset=utf-8" } });
      }

      /* ---------- 📄 üye listesini CSV indir ---------- */
      if ("/panel/csv" === url.pathname) {
        const uyeler = await uyeleriTopla(5000);
        const kul = await kullanimOku(env), ref = await refOku(env);
        const vip = new Set(await vipOku(env, true));
        const satir = a => a.map(x => '"' + String(x === undefined || x === null ? "" : x).replace(/"/g, '""') + '"').join(",");
        let csv = satir(["id", "ad", "kullanici", "katilim", "davetci", "davet_ettigi", "sorgu", "son_aktif", "sinirsiz"]) + "\n";
        for (const u of uyeler) {
          const k = kul[String(u.id)] || {};
          csv += satir([u.id, u.ad, u.kullanici, u.katilim, u.ref, ref[String(u.id)] || 0,
            k.toplam || 0, k.son ? new Date(k.son * 1e3).toISOString() : "", vip.has(String(u.id)) ? "evet" : ""]) + "\n";
        }
        return new Response("\uFEFF" + csv, {
          headers: {
            "content-type": "text/csv; charset=utf-8",
            "content-disposition": 'attachment; filename="fixborsa-uyeler.csv"'
          }
        });
      }

      /* ---------- 📊 panel verisi ---------- */
      if ("/panel/veri" === url.pathname) {
        const ist = await istOku(env), ref = await refOku(env);
        const kul = await kullanimOku(env);
        const vip = await vipOku(env, true), engel = await engelOku(env, true);
        const ayar = await ayarOku(env, true);
        let kullanicilar = await uyeleriTopla(1000);
        const adBul = id => {
          const k = kullanicilar.find(x => String(x.id) === String(id));
          return (k && (k.ad || (k.kullanici ? "@" + k.kullanici : ""))) || "";
        };
        /* her üyeye sorgu sayısı ve son aktiflik iliştir */
        for (const u of kullanicilar) {
          const k = kul[String(u.id)] || {};
          u.sorgu = k.toplam || 0;
          u.sonAktif = k.son || null;
        }
        kullanicilar.sort((a, b) => (b.katilim || "").localeCompare(a.katilim || ""));

        const davetLider = Object.entries(ref).map(([id, n]) => ({ id, n, ad: adBul(id) }))
          .sort((a, b) => b.n - a.n).slice(0, 50);
        const sorguLider = Object.entries(kul).map(([id, k]) => ({
          id, ad: adBul(id), toplam: k.toplam || 0, tavan: k.tavan || 0,
          potansiyel: k.potansiyel || 0, fibo: k.fibo || 0, detay: k.detay || 0, son: k.son || null
        })).sort((a, b) => b.toplam - a.toplam).slice(0, 50);

        const simdi = Math.floor(Date.now() / 1e3);
        const aktif24 = Object.values(kul).filter(k => k.son && simdi - k.son < 86400).length;
        const aktif7g = Object.values(kul).filter(k => k.son && simdi - k.son < 604800).length;
        const liste = await listeOku(env);
        let sonYayin = null;
        if (env.VERI) { const h = await env.VERI.get("sonYayin"); if (h) sonYayin = JSON.parse(h); }

        return new Response(JSON.stringify({
          toplam: ist.toplam || 0, gun: ist.gun || {}, basis: ist.basis || {},
          kullanicilar: kullanicilar.slice(0, 400), referans: davetLider, sorguLider,
          vip, engel, ayar, aktif24, aktif7g, sonYayin,
          listeGuncelleme: liste ? liste.guncelleme : null,
          listeOzet: liste && liste.kartlar
            ? Object.keys(liste.kartlar).filter(k => k !== "sira").map(k => ({ ad: k, n: liste.kartlar[k].length }))
            : [],
          depo: !!env.VERI
        }), { headers: { "content-type": "application/json; charset=utf-8" } });
      }

      return new Response(await panelHtml(), { headers: { "content-type": "text/html; charset=utf-8" } });
    }

    if ("/durum" === url.pathname) {
      const depo = env.VERI ? "DEPO BAĞLI ✅" : "DEPO YOK ⚠️ (kullanıcılar liste göremeyebilir)";
      const v = await listeOku(env);
      if (!v) return new Response(depo + "\nliste yok — telefondan yükle");
      const kartSayi = v.kartlar
        ? Object.keys(v.kartlar).filter(k => k !== "sira").map(k => k + ":" + v.kartlar[k].length).join(" · ")
        : "kart yok";
      return new Response(depo + "\nliste var · " + Object.keys(v).filter(k => "guncelleme" !== k).join(", ") +
        "\nkartlar: " + kartSayi + "\ngüncelleme: " + v.guncelleme);
    }

    if ("/tg" === url.pathname && "POST" === istek.method) {
      const u = await istek.json().catch(() => null);
      if (!u) return new Response("ok");

      /* ---------- düz mesajlar ---------- */
      if (u.message) {
        const m = u.message, metin = (m.text || "").trim(), kucuk = metin.toLowerCase();
        const ozel = "private" === m.chat.type;
        let refKod = null;
        const eslesme = metin.match(/^\/start\s+r(\d+)/i);
        if (eslesme) refKod = eslesme[1];
        if (await engelliMi(env, m.from.id)) return new Response("ok");
        if (ozel) ctx.waitUntil(kullaniciKaydet(env, m.from, refKod));
        if (ozel && (kucuk.startsWith("/panel") || kucuk.startsWith("/yonetici"))) {
          if (!yoneticiMi(m.from.id)) {
            ctx.waitUntil(tg(env.BOT_TOKEN, "sendMessage", {
              chat_id: m.chat.id, text: "Bu komut yöneticiye özeldir.", reply_markup: menuYap(m.from.id) }));
            return new Response("ok");
          }
          ctx.waitUntil(tg(env.BOT_TOKEN, "sendMessage", {
            chat_id: m.chat.id, parse_mode: "HTML", disable_web_page_preview: true,
            text: "🛠 <b>Yönetici paneli</b>\n\nAşağıdaki düğmeye dokun — panel tarayıcıda açılır.\n\n" +
              "Adres:\n<code>" + panelLinki() + "</code>",
            reply_markup: { inline_keyboard: [
              [{ text: "🛠 Paneli aç", url: panelLinki() }],
              [{ text: "◀️ Menü", callback_data: "menu" }]] }
          }));
          return new Response("ok");
        }
        if (ozel && kucuk.startsWith("/davet")) {
          const kadi = (await tg(env.BOT_TOKEN, "getMe", {}))?.result?.username || "bot";
          const sayi = (await refOku(env))[String(m.from.id)] || 0;
          ctx.waitUntil(tg(env.BOT_TOKEN, "sendMessage", {
            chat_id: m.chat.id, parse_mode: "HTML", disable_web_page_preview: true,
            text: "🎁 <b>Davet linkin</b>\n\n<code>https://t.me/" + kadi + "?start=r" + m.from.id +
              "</code>\n\nBu linkle katılan herkes senin davetin sayılır.\n📊 Şu ana kadar davetin: <b>" +
              sayi + " kişi</b>\n\n<i>En çok davet edenleri ödüllendiriyoruz.</i>",
            reply_markup: menuYap(m.from.id)
          }));
          return new Response("ok");
        }
        if (ozel || kucuk.startsWith("/start") || kucuk.startsWith("/liste"))
          ctx.waitUntil(tg(env.BOT_TOKEN, "sendMessage", { chat_id: m.chat.id, text: KARSILAMA, parse_mode: "HTML", reply_markup: menuYap(m.from.id) }));
        return new Response("ok");
      }

      /* ---------- düğmeler ---------- */
      if (u.callback_query) {
        const cq = u.callback_query;
        const kisi = cq.from.id;
        const grupMu = "private" !== cq.message.chat.type;
        const chat = grupMu ? kisi : cq.message.chat.id;
        const secim = cq.data;

        if (await engelliMi(env, kisi)) {
          await tg(env.BOT_TOKEN, "answerCallbackQuery", {
            callback_query_id: cq.id, text: "Erişimin kapatılmış.", show_alert: true });
          return new Response("ok");
        }

        if ("davet" === secim) {
          await tg(env.BOT_TOKEN, "answerCallbackQuery", { callback_query_id: cq.id });
          const kadi = (await tg(env.BOT_TOKEN, "getMe", {}))?.result?.username || "bot";
          const ref = await refOku(env);
          ctx.waitUntil(tg(env.BOT_TOKEN, "sendMessage", {
            chat_id: chat, parse_mode: "HTML", disable_web_page_preview: true,
            text: "🎁 <b>Davet linkin</b>\n\n<code>https://t.me/" + kadi + "?start=r" + kisi +
              "</code>\n\nBu linkle katılan herkes senin davetin sayılır.\n📊 Şu ana kadar davetin: <b>" +
              (ref[String(kisi)] || 0) + " kişi</b>\n\n<i>En çok davet edenleri ödüllendiriyoruz.</i>",
            reply_markup: menuYap(kisi)
          }));
          return new Response("ok");
        }

        if ("menu" === secim) {
          await tg(env.BOT_TOKEN, "answerCallbackQuery", { callback_query_id: cq.id });
          ctx.waitUntil(tg(env.BOT_TOKEN, "sendMessage", { chat_id: chat, text: KARSILAMA, parse_mode: "HTML", reply_markup: menuYap(kisi) }));
          return new Response("ok");
        }

        /* ---------- ÖNCEKİ SONUÇLAR: YÖNETİCİYE ÖZEL ----------
           Düğme menüde zaten görünmüyor; eski mesajlardaki düğmeye ya da
           elle gönderilen callback'e karşı burada da kapatılıyor. */
        if ("karne" === secim && !yoneticiMi(kisi)) {
          await tg(env.BOT_TOKEN, "answerCallbackQuery", {
            callback_query_id: cq.id,
            text: "🔐 Bu bölüm yöneticiye özeldir.",
            show_alert: true
          });
          return new Response("ok");
        }

        /* ---------- ZAMAN SINIRI ----------
           SADECE genel liste sorgularında (güçlü sinyaller · yüksek
           potansiyel · yeni kırılımlar) işler. Detay, sıralama, sayfa,
           davet ve menü hiçbir zaman beklemez. */
        const kalan = (GENEL_SORGULAR.has(secim) && !(await sinirsizMi(env, kisi)))
          ? await kisitliMi(env, kisi) : 0;
        if (kalan > 0) {
          await tg(env.BOT_TOKEN, "answerCallbackQuery", {
            callback_query_id: cq.id,
            text: "⏳ Sıradaki listen " + Math.ceil(kalan / 60) + " dakika sonra açılacak.\n\nBot çok sayıda kullanıcıya aynı anda hizmet veriyor; erişim sırayla veriliyor. Yoğunluk azaldıkça sıra hızlanır.",
            show_alert: true
          });
          return new Response("ok");
        }
        await tg(env.BOT_TOKEN, "answerCallbackQuery", { callback_query_id: cq.id });
        ctx.waitUntil(kullanimSay(env, ctx,
          secim.startsWith("d:") ? "detay" : (secim.startsWith("l:") ? "sirala" : secim), String(kisi)));

        const veri = await listeOku(env);

        /* --- hisse detayı: d:tip:ix:mod:sayfa --- */
        if (secim.startsWith("d:")) {
          const [, tip, ixS, modS, sayfaS] = secim.split(":");
          const mod = modS || "pot", sayfa = Number(sayfaS || 0);
          const dizi = veri && veri.kartlar && veri.kartlar[tip];
          const k = dizi && dizi[Number(ixS)];
          let klavye = menuYap(kisi);
          if (dizi && dizi.length) klavye = listeKlavye(veri, tip, mod, sayfa, siraDizisi(veri, tip, mod));
          ctx.waitUntil(yanitla(env, cq, chat, grupMu,
            k ? detayMetni(k) : "Bu hisse artık listede değil. Menüden yeniden bak.",
            klavye, true));
          return new Response("ok");
        }

        /* --- 🏅 ilk 3 --- */
        if ("ilk3" === secim) {
          const varMi = veri && veri.kartlar && veri.kartlar.ilk3 && veri.kartlar.ilk3.length;
          ctx.waitUntil(yanitla(env, cq, chat, grupMu,
            varMi ? ilk3Metni(veri)
                  : "🏅 <b>BU TARAMANIN İLK 3'Ü</b>\n\nHenüz liste hazırlanmadı. Birazdan tekrar dene.",
            menuYap(kisi), false));
          return new Response("ok");
        }

        /* --- liste görünümü: l:tip:mod:sayfa veya doğrudan tip --- */
        let tip = secim, mod = "pot", sayfa = 0;
        if (secim.startsWith("l:")) {
          const p = secim.split(":");
          tip = p[1]; mod = p[2] || "pot"; sayfa = Number(p[3] || 0);
        }

        if (veri && veri.kartlar && veri.kartlar[tip] && veri.kartlar[tip].length) {
          const sira = siraDizisi(veri, tip, mod);
          const toplamSayfa = Math.max(1, Math.ceil(sira.length / SAYFA_BOY));
          if (sayfa < 0) sayfa = 0;
          if (sayfa >= toplamSayfa) sayfa = toplamSayfa - 1;
          const baslik = BASLIKLAR[tip] || "<b>LİSTE</b>";
          ctx.waitUntil(yanitla(env, cq, chat, grupMu,
            listeMetni(baslik, veri, tip, mod, sayfa, sira),
            listeKlavye(veri, tip, mod, sayfa, sira),
            secim.startsWith("l:")));   /* menüden ilk açılışta yeni mesaj, gezinirken düzenle */
          return new Response("ok");
        }

        /* --- kart yoksa düz metin listesi (karne vb.) --- */
        let metin;
        if (veri && veri[tip]) {
          metin = veri[tip];
          if (veri.guncelleme) {
            const d = new Date(veri.guncelleme);
            metin += `\n\n<i>Son güncelleme: ${String((d.getUTCHours() + 3) % 24).padStart(2, "0") + ":" + String(d.getUTCMinutes()).padStart(2, "0")}</i>`;
          }
        } else {
          metin = "⏳ Liste henüz hazırlanmadı. Birazdan tekrar dene.";
        }
        const p = parcala(metin);
        ctx.waitUntil((async () => {
          for (let i = 0; i < p.length; i++) {
            const y = await tg(env.BOT_TOKEN, "sendMessage", {
              chat_id: chat, text: p[i], parse_mode: "HTML", disable_web_page_preview: true,
              reply_markup: i === p.length - 1 ? menuYap(kisi) : undefined
            });
            if (grupMu && (!y || false === y.ok)) {
              const kadi = (await tg(env.BOT_TOKEN, "getMe", {}))?.result?.username;
              await tg(env.BOT_TOKEN, "sendMessage", {
                chat_id: cq.message.chat.id,
                text: '👋 <a href="tg://user?id=' + kisi + '">Listeyi görmek</a> için önce botu başlatman gerekiyor: @' +
                  (kadi || "bot") + " → <b>Başlat</b>. Sonra buradaki düğmeler sana özelden cevap verir.",
                parse_mode: "HTML", disable_web_page_preview: true
              });
              break;
            }
          }
        })());
        return new Response("ok");
      }
      return new Response("ok");
    }

    /* ================== 🏠 DURUM SAYFASI ==================
       Worker adresini tarayıcıda açınca ne kurulu ne eksik, sade Türkçe
       yazar. Kod bilgisi gerektirmeden kontrol edilebilsin diye. */
    {
      const depoVar = !!env.VERI;
      const liste = await listeOku(env);
      let kanca = null;
      try {
        const w = await tg(env.BOT_TOKEN, "getWebhookInfo", {});
        kanca = w && w.result ? (w.result.url || "") : null;
      } catch (e) { }
      const sifre = env.PUSH_KEY || SIFRE;
      const kartSayi = liste && liste.kartlar
        ? Object.keys(liste.kartlar).filter(k => k !== "sira").map(k => k + ": " + liste.kartlar[k].length).join(" · ")
        : "";
      const sat = (tamam, baslik, aciklama) =>
        '<div class="s ' + (tamam ? "ok" : "yok") + '"><div class="i">' + (tamam ? "✅" : "⚠️") + '</div>' +
        '<div><b>' + baslik + '</b><div class="a">' + aciklama + '</div></div></div>';

      const sayfa = '<!doctype html><html lang="tr"><head><meta charset="utf-8">' +
        '<meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<title>Fix Borsa · Durum</title><style>' +
        'body{margin:0;background:#0d1117;color:#e6edf3;font:15px/1.55 system-ui,-apple-system,sans-serif;padding:16px 14px 60px}' +
        'h1{font-size:19px;margin:0 0 14px}' +
        '.s{display:flex;gap:10px;background:#161b22;border:1px solid #272e37;border-radius:12px;padding:12px;margin-bottom:9px}' +
        '.s.yok{border-color:#6b2b2b;background:#22171a}.i{font-size:18px;line-height:1.3}' +
        '.a{color:#8b949e;font-size:13px;margin-top:3px}' +
        'a.d{display:block;background:#388bfd;color:#fff;text-decoration:none;text-align:center;' +
        'border-radius:11px;padding:13px;font-weight:700;margin-top:10px}' +
        'a.d.ikinci{background:#21262d;border:1px solid #272e37;color:#e6edf3}' +
        'code{background:#1c2330;padding:2px 6px;border-radius:5px;font-size:13px;word-break:break-all}' +
        'ol{padding-left:20px;margin:8px 0 0}li{margin-bottom:7px}' +
        '.kur{background:#22171a;border:1px solid #6b2b2b;border-radius:12px;padding:13px;margin-top:12px;font-size:14px}' +
        '</style></head><body><h1>Fix Borsa · Durum</h1>' +
        sat(!!env.BOT_TOKEN, "Bot anahtarı", env.BOT_TOKEN ? "tanımlı" : "BOT_TOKEN eksik — bot hiç çalışmaz") +
        sat(!!kanca, "Telegram bağlantısı", kanca ? "bağlı" : "bağlı değil — aşağıdaki Bağla düğmesine bas") +
        sat(depoVar, "Hafıza (üye kayıtları)", depoVar ? "bağlı" : "BAĞLI DEĞİL — üyeler, davetler ve panel çalışmaz") +
        sat(!!liste, "Hisse listeleri", liste ? ("yüklü · " + (kartSayi || "") + " · " + new Date(liste.guncelleme).toLocaleString("tr-TR")) : "henüz yüklenmedi — telefondan yükle") +
        '<a class="d" href="/panel?key=' + encodeURIComponent(sifre) + '">🛠 Yönetici panelini aç</a>' +
        '<div class="a" style="margin-top:8px">Panel bir <b>web sayfası</b>, Telegram\'da değil. ' +
        'Telegram\'da botun menüsünde de <b>🛠 Yönetici paneli</b> düğmesi var (sadece sen görürsün) ' +
        'ya da bota <code>/panel</code> yazabilirsin — ikisi de bu sayfayı açar. ' +
        'Bu adresi telefonun ana ekranına kısayol olarak eklemen en pratiği.</div>' +
        (kanca ? '' : '<a class="d ikinci" href="/setup">🔗 Telegram\'a bağla</a>') +
        '<div style="margin-top:16px" class="a">Telefondaki uygulamaya yazacakların:<br>' +
        'Worker adresi: <code>' + url.origin + '</code><br>Şifre: <code>' + sifre + '</code></div>' +
        (depoVar ? '' :
          '<div class="kur"><b>⚠️ Hafıza bağlı değil — nasıl bağlanır</b>' +
          '<div class="a" style="margin:6px 0">Bot listeleri gösterir ama kimin üye olduğunu, kimin kimi davet ettiğini hatırlayamaz. ' +
          'Panel de boş kalır. Bir kez yapılır, 2 dakika sürer:</div><ol>' +
          '<li>Cloudflare panelinde soldaki menüden <b>Storage &amp; Databases</b> → <b>KV</b>.</li>' +
          '<li><b>Create a namespace</b> / <b>Oluştur</b>. Adına <code>fixborsa</code> yaz, kaydet.</li>' +
          '<li>Soldan <b>Compute (Workers)</b> → bu worker\'ı aç → <b>Settings</b> → <b>Bindings</b>.</li>' +
          '<li><b>Add binding</b> → <b>KV namespace</b> seç.</li>' +
          '<li><b>Variable name</b> kutusuna tam olarak <code>VERI</code> yaz (büyük harf, Türkçe İ değil düz I).</li>' +
          '<li><b>KV namespace</b> kutusundan az önce oluşturduğun <code>fixborsa</code>\'ı seç ve <b>Deploy</b>.</li>' +
          '<li>Bu sayfayı yenile — burası ✅ olacak.</li></ol></div>') +
        '</body></html>';
      return new Response(sayfa, { headers: { "content-type": "text/html; charset=utf-8" } });
    }
  }
};
