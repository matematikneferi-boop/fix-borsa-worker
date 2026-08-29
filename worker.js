const e=new Set(["6819672343"]),t="kolayfix",a="12.0";let n="",i=t;const r=()=>n+"/panel?key="+encodeURIComponent(i),s=(e,a)=>{const n=a.searchParams.get("key")
;return!!n&&(n===(e.PUSH_KEY||t)||n===(e.PANEL_KEY||e.PUSH_KEY||t))},l="https://liste.local/veri";let o=null,oTS=0;const c=new Set(["potansiyel","fibo","uzunvade","haftalik","aday","adayOrta","adayOrtaVade","adayUzun","adayHafta"]),EM=new Set(["menu","davet","bilgi"]),d=t=>{const _s=String(t);return e.has(_s)||(EK_YON&&EK_YON.has(_s))};let BUN=null,KVSON=0
;const DAVET_METIN="📈 Fix Borsa Sinyal botunu kullanıyorum, hisse sinyallerini buradan takip ediyorum. Aşağıdaki bağlantıdan sen de katılabilirsin:"
;async function botAd(e){if(BUN)return BUN;if(e.VERI){const c=await e.VERI.get("botuser");if(c)return BUN=c}if(!e.BOT_TOKEN)return null
;const r=await b(e.BOT_TOKEN,"getMe",{}),u=r&&r.result&&r.result.username;return u?(BUN=u,e.VERI&&await e.VERI.put("botuser",u).catch(()=>{}),u):null}
function u(e){
/* TEK DÜĞME: bütün listeler, adaylar, takip, davet ve yönetici paneli
   artık uygulamanın içinde. Telegram menüsü tek düğmeye indirildi.
   Eski callback'ler yerinde duruyor — geçmiş mesajlardaki düğmeler
   çalışmaya devam etsin diye silinmedi. */
if(n)return{inline_keyboard:[[{text:"📱 UYGULAMAYI AÇ",web_app:{url:n+"/app?v="+Date.now()}}]]};
const t=[];
/* Dilim adlari KISA / ORTA / UZUN / HAFTA oldu. 1 HAFTA satirlari
   2026-08-20'de kaldirilmisti cunku o dilim hic taranmiyordu; 2026-08-24'te
   yumatu.html'deki ortak zaman dilimi motoru 1H'yi de cekmeye basladigi
   icin liste artik doluyor, dugme geri eklendi. */
t.push([{text:"🏅 Bu taramanın ilk 3'ü",callback_data:"ilk3"}],
[{text:"📊 KISA · 1 saat",callback_data:"potansiyel"}],[{text:"🟨 KISA adayları (Süper Üyelik)",callback_data:"adayOrta"}],
[{text:"📐 ORTA · 4 saat",callback_data:"fibo"}],[{text:"🟨 ORTA adayları (Süper Üyelik)",callback_data:"adayOrtaVade"}],
[{text:"🗓 UZUN · 1 gün",callback_data:"uzunvade"}],[{text:"🟨 UZUN adayları (Süper Üyelik)",callback_data:"adayUzun"}],
[{text:"📅 HAFTA · 1 hafta",callback_data:"haftalik"}],[{text:"🟨 HAFTA adayları (Süper Üyelik)",callback_data:"adayHafta"}],
[{text:"⭐ Takip listem",callback_data:"fav"}],[{text:"👑 Anlık uyarı ayarları (Süper Üyelik)",callback_data:"alarm"}],[{text:"ℹ️ Sistem nedir? Nasıl kullanılır?",callback_data:"bilgi"}]);
return d(e)&&(t.push([{text:"🔄 ŞİMDİ TARA VE YÜKLE 🔐",callback_data:"elletara"}]),
t.push([{text:"📋 Ham sonuç metni 🔐",callback_data:"karne"}]),n&&t.push([{text:"🛠 Yönetici paneli 🔐",url:r()}])),t.push([BUN?{text:"📤 Sistemi paylaş",url:"https://t.me/share/url?url="+encodeURIComponent("https://t.me/"+BUN+"?start=r"+e)+"&text="+encodeURIComponent(DAVET_METIN)}:{text:"📤 Sistemi paylaş",callback_data:"davet"}]),t.push([{
text:"🔄 Yenile",callback_data:"menu"}]),{inline_keyboard:t}}
const f="👋 <b>Fix Borsa Sinyal</b>\n<i>BIST hisselerini gün boyu tarar, kırılım ve hedefleri gösterir.</i>\n\n🏅 <b>İlk 3</b> — bugün öne çıkan üç hisse\n📊 <b>KISA</b> · 1 saat — hedefi en uzak olanlar\n📐 <b>ORTA</b> · 4 saat — bugün taze kıranlar\n🗓 <b>UZUN</b> · 1 gün — günlük pivot kırılımları\n📅 <b>HAFTA</b> · 1 hafta — haftalık pivot kırılımları\n🪜 <b>Adaylar</b> 👑 — her tarama için henüz kırmadı ama hazır <i>(Süper Üyelik)</i>\n⭐ <b>Takip listem</b> — kendi hisselerin, anlık kâr/zarar\n👑 <b>Anlık uyarı</b> — güçlü bir sinyale giren hisse anında sana gelir <i>(Süper Üyelik)</i>\n\n🔎 <b>Hisse kodunu yaz</b> (örn. <code>THYAO</code>) — yukarı ve aşağı hedeflerini birlikte gönderirim.\n\n🏷️ <code>/surum</code> — yüklü sürümü ve son tarama saatini gösterir\n📃 <code>/sinyal</code> — güncel listeyi <b>mesaj olarak</b> gönderir\n⚡ <code>/canli</code> — sadece bar kapanmadan kırılanlar\n<i>Uygulama açılmıyorsa bu iki komut her zaman çalışır.</i>\n\n📤 <b>Süper Üyelik:</b> her 20 davette 1 ay açılır, davet ettikçe uzar.\n\n🤖 <i>Yapay zekâ tabanlı otomatik tarama · 120.657 bar</i>\n\n<i>⚠️ Yatırım tavsiyesi değildir. Bu sonuçlarla işlem yapmak tehlikelidir; anaparanı kaybedebilirsin.</i>"
/* ══════════════════════════════════════════════════════════════════════════
   🛡 DAYANIKLILIK KATMANI (sürüm 11.6)
   Dört madde buraya toplandı. HİÇBİRİ mevcut davranışı değiştirmez:
   her parça "yoksa serbest bırak" (fail-open) mantığıyla yazıldı, yani
   binding tanımlamazsan / KV yoksa sistem eskisi gibi çalışmaya devam eder.
     1) Cloudflare yerel Rate Limiting binding sarmalayıcısı
     2) Telegram gönderim kovası + 429 retry_after bekleme
     3) KV tabanlı çakışma kilidi (aynı arka plan işi üst üste başlamasın)
     4) Panel anahtarı kaba-kuvvet koruması
   Hepsinin çıktısı 🛡 Sistem sekmesinde görünür — kör nokta kalmasın.
   ══════════════════════════════════════════════════════════════════════ */

/* Ortam (env) referansı: sayaç yazan yardımcıların imzasını değiştirmemek
   için her istekte tazelenir. Aynı isolate içinde geçerlidir. */
let ORTAM=null;
/* 👑 EK YÖNETİCİ(LER): Cloudflare → Settings → Variables kısmına ADMIN_IDS
   adında bir değişken ekleyip kendi Telegram numaranı (ör: 123456789,987654321)
   yazarsan, kod hiç değişmeden sen de yönetici sayılırsın — panel/backtest/
   sistem sekmeleri şifresiz, doğrudan Telegram kimliğinle açılır. */
let EK_YON=null;
/* Tüm yöneticilerin Telegram ID listesi (sabit + ADMIN_IDS ortam değişkeni). */
function yoneticiListesi(){return[...e,...(EK_YON?[...EK_YON]:[])]}

/* ---------- 📊 SAĞLIK SAYAÇLARI ----------
   Bellekte tutulur, en fazla 60 saniyede bir KV'ye yazılır (KV günlük yazma
   sınırını yakmamak için). Isolate geri dönüşürse sayaç sıfırlanır — bu
   yüzden KV'deki toplam "en az bu kadar" anlamına gelir. */
const SAGLIK_ANAHTAR="saglik";
let SAG={},SAG_SON_YAZIM=0,SAG_KIRLI=!1;
function saglikArtir(alan,adet){SAG[alan]=(SAG[alan]||0)+(adet||1);SAG_KIRLI=!0;saglikBelkiYaz()}
function saglikSet(alan,deger){SAG[alan]=deger;SAG_KIRLI=!0;saglikBelkiYaz()}
function saglikBelkiYaz(){
  const A=ORTAM;
  if(!A||!A.VERI||!SAG_KIRLI)return;
  if(Date.now()-SAG_SON_YAZIM<6e4)return;
  SAG_SON_YAZIM=Date.now();SAG_KIRLI=!1;
  const kopya=Object.assign({},SAG);SAG={};
  saglikBirlestir(A,kopya).catch(()=>{});
}
async function saglikBirlestir(A,ek){
  try{
    if(!A||!A.VERI)return;
    const ham=await A.VERI.get(SAGLIK_ANAHTAR);
    let v={};try{v=ham?JSON.parse(ham):{}}catch(e){v={}}
    const bugun=onayDonemi();
    if(v.gun!==bugun)v={gun:bugun};          /* her gün TR 09:00'da sıfırlanır */
    for(const k of Object.keys(ek)){
      if(k.indexOf("son")===0)v[k]=ek[k];    /* "son..." alanları üzerine yazılır */
      else v[k]=(v[k]||0)+ek[k];             /* diğerleri toplanır */
    }
    v.yazim=Math.floor(Date.now()/1000);
    await A.VERI.put(SAGLIK_ANAHTAR,JSON.stringify(v));
  }catch(e){}
}
async function saglikOku(A){
  try{
    if(!A||!A.VERI)return Object.assign({gun:onayDonemi()},SAG);
    const ham=await A.VERI.get(SAGLIK_ANAHTAR);
    let v={};try{v=ham?JSON.parse(ham):{}}catch(e){v={}}
    if(v.gun!==onayDonemi())v={gun:onayDonemi()};
    for(const k of Object.keys(SAG)){       /* henüz yazılmamış bellek sayaçları */
      if(k.indexOf("son")===0)v[k]=SAG[k];else v[k]=(v[k]||0)+SAG[k];
    }
    return v;
  }catch(e){return{}}
}

/* ---------- 1️⃣ CLOUDFLARE YEREL RATE LIMITING BINDING ----------
   wrangler.toml / Settings → Bindings → "Rate limiting" ile tanımlanır.
   Durable Object gerektirmez, ücretsiz planda çalışır.
   TANIMLI DEĞİLSE bu fonksiyon her zaman true döner — yani hiçbir şey kısıtlanmaz.
   Cloudflare bu sayacın "eventually consistent" olduğunu söylüyor: kesin
   değildir, o yüzden limitleri gerçek ihtiyacın %20 üstünde tut. */
async function sinirGec(A,bindingAdi,anahtar){
  try{
    const bnd=A&&A[bindingAdi];
    if(!bnd||"function"!=typeof bnd.limit)return!0;   /* binding yok → serbest */
    const s=await bnd.limit({key:String(anahtar||"?").slice(0,120)});
    if(s&&!1===s.success){saglikArtir("sinir:"+bindingAdi);return!1}
    return!0;
  }catch(e){return!0}                                  /* hata → serbest, sistemi durdurma */
}

/* ---------- 2️⃣ TELEGRAM GÖNDERİM KOVASI + 429 YÖNETİMİ ----------
   Telegram sınırları: global ~30 mesaj/sn, aynı sohbete ~1 msg/sn,
   gruplarda 20 msg/dk. Broadcast'te 429 yiyince mesajlar sessizce
   kayboluyordu (b() null dönüyor, sayaç "başarısız" diyordu, sebebi
   bilinmiyordu). Artık: sıraya sokuyoruz + 429 gelirse retry_after kadar
   bekleyip AYNI mesajı bir kez daha deniyoruz. */
const TG_SANIYE_LIMIT=25;                       /* 30'un %20 altı — pay bırakıldı */
const TG_ARA_MS=Math.ceil(1e3/TG_SANIYE_LIMIT);
const TG_AZAMI_BEKLEME=10;                      /* retry_after bundan uzunsa bekleme, bırak */
const TG_GONDERIM_RX=/^(send|copyMessage|forwardMessage|editMessage)/;
let TG_SIRA_SON=0;
async function tgSiraBekle(metod){
  if(!TG_GONDERIM_RX.test(metod))return;        /* getMe, getWebhookInfo vb. kısıtlanmaz */
  const simdi=Date.now(),hedef=Math.max(simdi,TG_SIRA_SON+TG_ARA_MS);
  TG_SIRA_SON=hedef;
  const bekle=hedef-simdi;
  if(bekle>0)await gecikmeli(bekle);
}
async function b(e,t,a){
  const AZAMI=3;
  for(let deneme=0;deneme<AZAMI;deneme++){
    await tgSiraBekle(t);
    let r=null,j=null;
    try{
      r=await fetch(`https://api.telegram.org/bot${e}/${t}`,{method:"POST",
        headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});
      j=await r.json().catch(()=>null);
    }catch(err){j=null}
    if(j&&j.ok){if(TG_GONDERIM_RX.test(t))saglikArtir("tgGonderim");return j}
    const kod=(j&&j.error_code)||(r&&r.status)||0;
    if(429===kod){
      const sn=Number((j&&j.parameters&&j.parameters.retry_after)||1);
      saglikArtir("tg429");saglikSet("son429",Math.floor(Date.now()/1e3));saglikSet("sonRetryAfter",sn);
      if(deneme<AZAMI-1&&sn<=TG_AZAMI_BEKLEME){await gecikmeli(1e3*sn+250);continue}
      return j;
    }
    if(403===kod){saglikArtir("tgEngelli");return j}   /* kullanıcı botu engellemiş — tekrar denemek boşuna */
    if(400===kod)  {saglikArtir("tgHata400");return j}
    if(kod>=500&&deneme<AZAMI-1){await gecikmeli(400*(deneme+1));continue}
    if(!j)saglikArtir("tgAgHatasi");
    return j;                                          /* null olabilir — eski davranışla birebir aynı */
  }
  return null;
}

/* ---------- 3️⃣ KV TABANLI ÇAKIŞMA KİLİDİ ----------
   Sürekli modda /push 10 saniyede bir geliyor; arka plan işleri (KAP taraması,
   geçmiş doldurma, alarm) önceki turu bitmeden yeniden başlıyordu. Bu hem
   Yahoo/KAP'a çift istek hem de KV yazma sınırını gereksiz yakma demekti.
   NOT: KV "eventually consistent" — bu kilit %100 garanti değil, ama üst üste
   binen çalıştırmaların büyük çoğunluğunu keser. Kesin garanti isteyen bir iş
   için Durable Object gerekir (şu an gerek yok).

   İKİ KADEMELİ TASARIM — sebebi önemli:
   • 1. kademe BELLEK kilidi: bedava, anında, KV'ye tek bir yazma bile yapmaz.
     /push 10 saniyede bir geldiği için asıl çakışma zaten aynı isolate
     içinde oluyor; bu kademe onu keser.
   • 2. kademe KV kilidi: SADECE seyrek ve pahalı işler için (GitHub Actions
     tetikleme gibi). Her push'ta KV kilidi almak günlük 1000 yazma sınırını
     dakikalar içinde yakardı — o yüzden varsayılan KAPALI. */
const KILITLER={};
function bellekKilitAl(ad,saniye){
  const simdi=Date.now();
  if(KILITLER[ad]&&KILITLER[ad]>simdi)return!1;
  KILITLER[ad]=simdi+1e3*saniye;return!0;
}
function bellekKilitBirak(ad){delete KILITLER[ad]}
async function kvKilitAl(A,ad,saniye){
  if(!A||!A.VERI)return!0;
  try{
    const k="kilit:"+ad,v=await A.VERI.get(k);
    if(v&&Number(v)>Date.now())return!1;
    await A.VERI.put(k,String(Date.now()+1e3*saniye),{expirationTtl:Math.max(60,saniye)});
    return!0;
  }catch(e){return!0}
}
async function kvKilitBirak(A,ad){try{if(A&&A.VERI)await A.VERI.delete("kilit:"+ad)}catch(e){}}
async function kilitli(A,ad,saniye,is,kvDe){
  if(!bellekKilitAl(ad,saniye)){saglikArtir("kilitAtlandi");return"kilitli"}
  let kvAlindi=!1;
  try{
    if(kvDe){
      if(!await kvKilitAl(A,ad,saniye)){saglikArtir("kilitAtlandi");return"kilitli"}
      kvAlindi=!0;
    }
    return await is();
  }finally{
    bellekKilitBirak(ad);
    if(kvAlindi)await kvKilitBirak(A,ad);
  }
}

/* ---------- 4️⃣ PANEL ANAHTARI KABA-KUVVET KORUMASI ----------
   Önceden /panel?key=... sadece düz string karşılaştırmasıydı: sınırsız
   deneme yapılabiliyordu. Artık IP başına yanlış deneme sayılıyor; eşik
   aşılınca o IP bir süre kapıdan giremiyor. Doğru anahtar sayacı sıfırlar,
   yani sen hiçbir şey hissetmezsin. */
const PANEL_AZAMI_YANLIS=8,PANEL_CEZA_SN=900;
function istekIP(p){try{return p.headers.get("CF-Connecting-IP")||p.headers.get("X-Forwarded-For")||"?"}catch(e){return"?"}}
/* Zamanlama saldırısına kapalı karşılaştırma (uzunluk farkı sızdırmaz). */
function esitMi(a,b2){
  const x=String(a||""),y=String(b2||"");
  let f=x.length^y.length;
  for(let i=0;i<Math.max(x.length,y.length);i++)f|=(x.charCodeAt(i%x.length||0)||0)^(y.charCodeAt(i%y.length||0)||0);
  return 0===f&&x.length===y.length;
}
async function kapiKontrol(A,$,p,yerelSinir){
  const ip=istekIP(p);
  try{
    if(A.VERI){
      const c=await A.VERI.get("panelCeza:"+ip);
      if(c&&Number(c)>Date.now()){saglikArtir("panelCeza");return{ok:!1,kod:429,mesaj:"çok fazla hatalı deneme — birkaç dakika sonra tekrar dene"}}
    }
    /* 1️⃣ maddeyle birleşim: binding tanımlıysa IP başına da sınır uygula */
    if(yerelSinir&&!await sinirGec(A,"SINIR_PANEL",ip))
      return{ok:!1,kod:429,mesaj:"çok fazla istek"};
    /* B) İmzalı, 30 dakikalık anahtar — bota /panel yazınca üretiliyor.
       Süresi dolduğunda kendiliğinden geçersiz olur. */
    try{
      const tok=$.searchParams&&$.searchParams.get("t");
      if(tok){
        if(await panelTokenGecerli(A,tok)){saglikArtir("panelToken");return{ok:!0}}
        saglikArtir("panelTokenGecersiz");
        return{ok:!1,kod:401,mesaj:"bağlantının süresi dolmuş — bota /panel yazıp yeni bağlantı al"};
      }
    }catch(e){}
    if(s(A,$)){
      /* KV YAZMA KORUMASI: sayaç zaten yoksa delete ÇAĞIRMA.
         delete bir "yazma" işlemidir; /push 10 saniyede bir geldiği için
         her doğru anahtarda silme yapmak günlük 1000 yazma sınırını
         saatler içinde yakardı. Okuma bedava sayılır (günde 100.000). */
      if(A.VERI){
        const n=await A.VERI.get("panelYanlis:"+ip);
        if(n)await A.VERI.delete("panelYanlis:"+ip).catch(()=>{});
      }
      return{ok:!0};
    }
    saglikArtir("panelYanlis");saglikSet("sonPanelYanlis",Math.floor(Date.now()/1e3));
    if(A.VERI){
      const n=Number(await A.VERI.get("panelYanlis:"+ip)||0)+1;
      await A.VERI.put("panelYanlis:"+ip,String(n),{expirationTtl:PANEL_CEZA_SN});
      if(n>=PANEL_AZAMI_YANLIS){
        await A.VERI.put("panelCeza:"+ip,String(Date.now()+1e3*PANEL_CEZA_SN),{expirationTtl:PANEL_CEZA_SN});
        saglikArtir("panelKilit");saglikSet("sonPanelKilitIP",String(ip).slice(0,45));
      }
    }
    return{ok:!1,kod:401,mesaj:"yetkisiz"};
  }catch(e){return{ok:s(A,$)?!0:!1,kod:401,mesaj:"yetkisiz"}}
}
let p=0;const DETAY_GUN=90,OZET_GUN=365;async function y(e){if(!e.VERI)return{gunler:{},ozet:{}};const t=await e.VERI.get("gecmis");if(!t)return{gunler:{},ozet:{}};const gp=JSON.parse(t);return gp.gunler=gp.gunler||{},gp.ozet=gp.ozet||{},gp}async function k(e,t,a){if(!e.VERI)return;if(!a&&Date.now()-p<6e5)return
;p=Date.now();const n=await y(e),i=new Date((r||Date.now())+108e5).toISOString().slice(0,10);var r;const s=function(e){const t={};if(!e||!e.kartlar)return t
;for(const a of Object.keys(e.kartlar))if("sira"!==a)for(const n of e.kartlar[a]||[])n&&n.kod&&n.fiyat>0&&(t[n.kod]=Number(n.fiyat));return t}(t);if(n.gunler[i]=n.gunler[i]||{kayitlar:{}},
t.kartlar)for(const e of Object.keys(t.kartlar)){if("sira"===e)continue;for(const a of t.kartlar[e]||[]){
if(!(a&&a.kod&&a.giris>0))continue;
/* ANAHTAR ARTIK kod@dilim: aynı hisse iki dilimde birden sinyal verirse
   ikisi de ayrı ayrı kaydedilir — dilim bazlı performans bunu gerektirir. */
const KK=a.kod+"@"+(a.tfKod||a.tf||"");
if(!n.gunler[i].kayitlar[KK])n.gunler[i].kayitlar[KK]={k:a.kod,g:Number(a.giris),s:Number(a.fiyat)||Number(a.giris),t:a.tfKod||a.tf||"",l:e,h:(a.hedef>0?Number(a.hedef):null),h1:(a.hedef1>0?Number(a.hedef1):null),r:1,max:Number(a.fiyat)||Number(a.giris),min:Number(a.fiyat)||Number(a.giris)}}}
for(const e of Object.keys(n.gunler))for(const t of Object.keys(n.gunler[e].kayitlar)){const kk=n.gunler[e].kayitlar[t],kd=kk.k||String(t).split("@")[0];if(s[kd]>0){kk.s=s[kd];if(!(kk.max>0)||s[kd]>kk.max)kk.max=s[kd];if(!(kk.min>0)||s[kd]<kk.min)kk.min=s[kd]}}
;n.ozet=n.ozet||{};const gt=Object.keys(n.gunler).sort().reverse(),gk=gt.slice(0,DETAY_GUN),gs=gt.slice(DETAY_GUN)
;for(const e of gs){if(!n.ozet[e]){const o=m(e,n.gunler[e]);if(o)n.ozet[e]=o}}const go={};for(const e of gk)go[e]=n.gunler[e];n.gunler=go
;const ot=Object.keys(n.ozet).sort().reverse();if(ot.length>OZET_GUN){const oo={};for(const e of ot.slice(0,OZET_GUN))oo[e]=n.ozet[e];n.ozet=oo}
;n.guncelleme=(new Date).toISOString(),await e.VERI.put("gecmis",JSON.stringify(n))}
const KODU=k=>String(k).split("@")[0];
function m(e,t){const a=Object.keys(t.kayitlar||{});if(!a.length)return null;let n=0,i=null,r=null;for(const e of a){const a=t.kayitlar[e];if(!(a.g>0&&a.s>0))continue;const s=100*(a.s/a.g-1),kd=a.k||KODU(e);n+=s,
(!i||s>i.y)&&(i={kod:kd,y:s}),(!r||s<r.y)&&(r={kod:kd,y:s})}const s=a.length,l=s?n/s:0;return{gun:e,n:s,ort:l,deger:1e5*(1+l/100),eniyi:i,enkotu:r}}/* DAYANIKLILIK: query1 tek nokta arızasıydı — düşerse/limitlenirse geçmiş
   doldurma tamamen sessiz kalıyordu. Yahoo'nun aynı şemayı döndüren ikinci
   sunucusu query2'yi yedek olarak deniyoruz (tahmini/doğrulanmamış üçüncü
   parti kaynak değil, aynı servisin belgeli ikinci ucu — davranış aynı). */
const YF_UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
;const YF_HEADERS={"User-Agent":YF_UA,"Accept":"application/json, text/plain, */*"}
;async function yfCekTek(host,kod){const u="https://"+host+"/v8/finance/chart/"+encodeURIComponent(kod+".IS")+"?range=1y&interval=1d"
;const res=await fetch(u,{headers:YF_HEADERS});if(!res.ok){console.error("yfCekTek HTTP",res.status,host,kod);return null}const j=await res.json().catch(()=>null)
;const rz=j&&j.chart&&j.chart.result&&j.chart.result[0];if(!rz||!rz.timestamp){console.error("yfCekTek boş sonuç",host,kod,j&&j.chart&&j.chart.error);return null}
;const kap=rz.indicators&&rz.indicators.quote&&rz.indicators.quote[0]&&rz.indicators.quote[0].close;if(!kap)return null;const out={}
;rz.timestamp.forEach((ts,idx)=>{const c=kap[idx];if(c==null||!(c>0))return;const gun=new Date(1e3*ts+108e5).toISOString().slice(0,10);out[gun]=Number(c)})
;return out}
/* MUM (OHLC) VERİSİ: yfCekTek yalnız kapanışı ayıklıyor — mini-app'teki
   TradingView mum grafiği için açılış/yüksek/düşük de gerekiyor. Ayrı
   tutuyoruz ki tarama tarafı (yfKapanislar) hiç etkilenmesin.
   CANLI SON BAR: cache-busting (_=Date.now()) + cache:"no-store" ile Yahoo/CDN
   önbelleğinden bayat veri gelmesini engelliyoruz. Ayrıca Yahoo'nun mum
   dizisindeki son bar (piyasa kapalıyken dünün kapanışı, açıkken bugünün
   barı) taramadaki "Şimdi" fiyatından (regularMarketPrice) farklıysa —
   aynı gün ise son barı günceller, farklı günse yeni (oluşmakta olan) bar
   ekler. Grafik ile "Şimdi" fiyatı hep aynı kaynağı göstersin diye. */
async function yfMumCek(host,kod,interval,range){interval=interval||"1d";range=range||"6mo"
;const u="https://"+host+"/v8/finance/chart/"+encodeURIComponent(kod+".IS")+"?range="+range+"&interval="+interval+"&_="+Date.now()
;let res;try{const _ac=new AbortController();const _to=setTimeout(()=>_ac.abort(),8000);try{res=await fetch(u,{headers:Object.assign({},YF_HEADERS,{"Cache-Control":"no-cache"}),cache:"no-store",signal:_ac.signal})}finally{clearTimeout(_to)}}catch(e){return{hata:"fetch istisnası (zaman aşımı olabilir): "+(e&&e.message||e)}}
;if(!res.ok)return{hata:"HTTP "+res.status+" ("+host+")"};const j=await res.json().catch(()=>null)
;if(!j)return{hata:"JSON parse edilemedi ("+host+")"}
;const rz=j&&j.chart&&j.chart.result&&j.chart.result[0];if(!rz||!rz.timestamp)return{hata:"Yahoo hatası: "+JSON.stringify((j.chart&&j.chart.error)||j).slice(0,200)}
;const q=rz.indicators&&rz.indicators.quote&&rz.indicators.quote[0];if(!q)return{hata:"quote alanı yok ("+host+")"};const out=[]
;rz.timestamp.forEach((ts,idx)=>{const c=q.close&&q.close[idx];if(c==null||!(c>0))return
;const o=q.open&&q.open[idx],hi=q.high&&q.high[idx],lo=q.low&&q.low[idx],ac=(o>0)?o:c
;const hc=q.volume&&q.volume[idx];out.push({time:ts,open:ac,high:(hi>0)?Math.max(hi,ac,c):Math.max(ac,c),low:(lo>0)?Math.min(lo,ac,c):Math.min(ac,c),close:c,hacim:(hc>0)?hc:0})})
;/* CANLI SON BAR yaması yalnızca GÜNLÜK dilimde anlamlı — saatlik dilimde
   "aynı gün mü" kontrolü barları yanlış birleştirir, o yüzden 1d dışında
   uygulanmıyor. */
;if(interval==="1d"){const canliF=rz.meta&&Number(rz.meta.regularMarketPrice),canliZ=rz.meta&&Number(rz.meta.regularMarketTime)
;if(canliF>0&&canliZ>0&&out.length){const son=out[out.length-1]
;const gunSon=Math.floor((son.time+108e5)/864e5),gunCanli=Math.floor((canliZ+108e5)/864e5)
;if(gunCanli===gunSon){son.close=canliF;son.high=Math.max(son.high,canliF);son.low=Math.min(son.low,canliF)}
else if(gunCanli>gunSon)out.push({time:canliZ,open:son.close,high:Math.max(son.close,canliF),low:Math.min(son.close,canliF),close:canliF})}}
;if(!out.length)return{hata:"0 bar döndü ("+host+")"}
;return{veri:out}}
async function yfMumlar(kod,interval,range){const hatalar=[]
;try{const a=await yfMumCek("query1.finance.yahoo.com",kod,interval,range);if(a.veri&&a.veri.length>=5)return{veri:a.veri,hatalar:hatalar};hatalar.push(a.hata||("sadece "+((a.veri&&a.veri.length)||0)+" bar döndü (query1)"))}catch(e){hatalar.push("query1 istisna: "+(e&&e.message||e))}
try{const b=await yfMumCek("query2.finance.yahoo.com",kod,interval,range);if(b.veri&&b.veri.length>=5)return{veri:b.veri,hatalar:hatalar};hatalar.push(b.hata||("sadece "+((b.veri&&b.veri.length)||0)+" bar döndü (query2)"))}catch(e){hatalar.push("query2 istisna: "+(e&&e.message||e))}
console.error("yfMumlar: her iki host de başarısız",kod,hatalar);return{veri:[],hatalar:hatalar}}
/* Dilim → Yahoo interval/range eşlemesi. Yahoo'da yerel "4 saat" mumu yok;
   4SA için de 60m çekiyoruz (çizgi uç noktaları gerçek saat damgası
   taşıdığından grafikte doğru yere oturuyor, sadece mum daha ince taneli
   görünüyor — yanlış görünmekten iyi). */
const MUM_ARALIK={
  "1SA":{interval:"60m",range:"3mo"},
  "4SA":{interval:"60m",range:"3mo"},
  "1G":{interval:"1d",range:"6mo"},
  "1HAF":{interval:"1wk",range:"2y"},
  "1AY":{interval:"1mo",range:"5y"}
};
function mumTfNormal(t){return(t&&MUM_ARALIK[t])?t:"1G"}
/* ================== 📐 FORMASYON ==================
   Tespit artik Worker'da YAPILMIYOR. Kama / ucgen / bayrak-flama / ikili dip
   taramasi GitHub Actions icinde Python ile kosuyor (formasyon.py) ve sonuc
   formasyon.json olarak yayinlaniyor. Worker sadece o dosyayi okur: hisse
   basina Yahoo istegi yok, CPU limiti yenmez, liste taramasi milisaniyeler
   surer. Eski JS tespit kodu (zigzagBul, kamaBul, desenBul ve yardimcilari)
   bu yuzden tamamen silindi. */
const FORMASYON_URL="https://raw.githubusercontent.com/matematikneferi-boop/fix-borsa-worker/main/formasyon.json";
let _fBellek=null,_fZaman=0;
async function formasyonlariGetir(A){
  const simdi=Date.now();
  if(_fBellek&&simdi-_fZaman<3e5)return _fBellek;
  if(A&&A.VERI){const c=await A.VERI.get("formasyonJson");
    if(c){try{_fBellek=JSON.parse(c);_fZaman=simdi;return _fBellek}catch(e){}}}
  try{
    const r=await fetch(FORMASYON_URL+"?_="+Math.floor(simdi/3e5),{cf:{cacheTtl:300}});
    if(!r.ok)return _fBellek||null;
    const j=await r.json();
    _fBellek=j;_fZaman=simdi;
    if(A&&A.VERI)await A.VERI.put("formasyonJson",JSON.stringify(j),{expirationTtl:600});
    return j;
  }catch(e){return _fBellek||null}
}
/* Formasyon satırında "şurayı kırarsa başlar" seviyesini üretir: yön "al"
   ise üst sınır (ust), "sat" ise alt sınır (alt) çizgisinin en güncel
   (son) noktası — o sınır kırılırsa formasyon teyit olur. Simetrik üçgen
   gibi yönsüz ("nötr") durumlarda tek bir kırılım seviyesi yoktur, null
   döner. */
function kirilimSeviyesi(d){
  if(!d)return null;
  var hat=d.yon==="al"?d.ust:(d.yon==="sat"?d.alt:null);
  if(!hat||!hat.length)return null;
  var son=hat[hat.length-1];
  return(son&&typeof son.value==="number")?son.value:null;
}
/* Kırılımın tam tersi: bu seviye kırılırsa formasyon geçersiz sayılır
   ("iptal" / stop seviyesi). yon="al" ise alt sınır, "sat" ise üst sınır. */
function iptalSeviyesi(d){
  if(!d)return null;
  var hat=d.yon==="al"?d.alt:(d.yon==="sat"?d.ust:null);
  if(!hat||!hat.length)return null;
  var son=hat[hat.length-1];
  return(son&&typeof son.value==="number")?son.value:null;
}
/* Formasyon hâlâ aktif mi? İki ayrı bitiş durumu var, ikisi de "artık
   gösterilmesin" demek:
   1) HEDEFE ULAŞILDI — kâr alındı, sinyal amacına erdi.
   2) İPTAL SEVİYESİ KIRILDI — kurulum bozuldu, fiyat ters yöne gitti.
   Örnek (gerçek bug): BLUME'de bearish "İkili Tepe" hedefi aşağı 34.30
   idi; fiyat bunun yerine iptal seviyesi 38.72'yi yukarı kırıp 42.60'a
   çıktı. Kurulum günler önce geçersiz olmuştu ama SADECE /api/kamalar
   (liste ekranı) hedefTamam diye bakıyordu — iptal hiç kontrol
   edilmiyordu, detay sayfası ve rozetler ise hiçbir kontrol yapmıyordu.
   Bu fonksiyon üç yerde de (liste, rozet, detay) tek kaynaktan kullanılır. */
function formasyonAktifMi(d,fiyat){
  if(!d||fiyat==null)return true;
  var hedef=(typeof d.hedef==="number")?d.hedef:null;
  var iptal=iptalSeviyesi(d);
  if(hedef!=null){
    if(d.yon==="al"&&fiyat>=hedef)return false;
    if(d.yon==="sat"&&fiyat<=hedef)return false;
  }
  if(iptal!=null){
    if(d.yon==="al"&&fiyat<iptal)return false;
    if(d.yon==="sat"&&fiyat>iptal)return false;
  }
  return true;
}
/* GÜVENLİK KEMERİ: formasyon.json'daki bazı kayıtlarda üst/alt sınır
   çizgileri ters etiketlenmiş geliyor (üst değeri alt değerinden küçük) —
   bu durumda onay/iptal/hedef yorumu da tersine dönüyor (ör. "iptal
   seviyesi" fiyatın altında görünüyor, oysa satış yönlü bir formasyonda
   iptal her zaman üstte olmalı). Çizgilerin SON noktalarına bakıp üst<alt
   ise ikisini yer değiştirir; girdiyi bozmadan (yeni obje) düzeltilmiş
   halini döner. Zaten doğru sıradaysa dokunmaz. */
function desenSinirDuzelt(d){
  if(!d||!d.ust||!d.alt||!d.ust.length||!d.alt.length)return d;
  var us=d.ust[d.ust.length-1],as=d.alt[d.alt.length-1];
  var uv=us&&typeof us.value==="number"?us.value:null;
  var av=as&&typeof as.value==="number"?as.value:null;
  if(uv==null||av==null||uv>=av)return d;
  return Object.assign({},d,{ust:d.alt,alt:d.ust,ustUz:d.altUz,altUz:d.ustUz});
}
/* KÜMÜLATİF ÇOK-DİLİM HEDEFİ: bir hisse aranıp açıldığında TÜM zaman
   dilimlerindeki (1SA/4SA/1G/1HAF/1AY) hâlâ AKTİF formasyonlar yöne göre
   (al/sat) ikiye ayrılır, her yönün hedefleri KENDİ İÇİNDE ortalanır.
   Yönler asla karıştırılıp tek bir sayıya indirilmez — biri "al" derken
   diğeri "sat" diyorsa iki ayrı ortalama döner, çelişki gizlenmez. */
function formasyonKumulatif(p){
  if(!p||!Array.isArray(p.dilimler)||!p.dilimler.length)return null;
  var fiyat=(typeof p.fiyat==="number")?p.fiyat:null;
  var gruplar={al:[],sat:[]};
  p.dilimler.forEach(function(d){
    if(!d||(d.yon!=="al"&&d.yon!=="sat")||typeof d.hedef!=="number")return;
    var dd=desenSinirDuzelt(d);
    if(!formasyonAktifMi(dd,fiyat))return;
    gruplar[d.yon].push(d);
  });
  function ozet(yon){
    var liste=gruplar[yon];
    if(!liste.length)return null;
    var toplam=0;liste.forEach(function(d){toplam+=d.hedef});
    var ort=toplam/liste.length;
    return{
      yon:yon,adet:liste.length,
      dilimler:liste.map(function(d){return d.tf}),
      ortalamaHedef:Math.round(ort*10000)/10000,
      ortalamaYuzde:(fiyat!=null&&fiyat>0)?Math.round((ort-fiyat)/fiyat*100000)/1000:null
    };
  }
  var al=ozet("al"),sat=ozet("sat");
  if(!al&&!sat)return null;
  return{al:al,sat:sat,fiyat:fiyat};
}
/* Fiyat, kırılım seviyesini yön yönünde geçmiş mi ("onay aldı") ? */
function onayDurumu(yon,fiyat,kirilim){
  if(fiyat==null||kirilim==null)return null;
  if(yon==="al")return fiyat>=kirilim;
  if(yon==="sat")return fiyat<=kirilim;
  return null;
}
/* Risk:Ödül oranı — (hedefe kalan kâr) / (iptale kadar olan risk).
   İkisi de pozitif olmalı, aksi halde (formasyon zaten geçersiz/gerçekleşmiş
   demektir) null döner — yanlış/yanıltıcı bir oran göstermemek için. */
function riskOdulHesapla(yon,fiyat,hedef,iptal){
  if(fiyat==null||hedef==null||iptal==null)return null;
  if(yon==="al"){
    var risk=fiyat-iptal,odul=hedef-fiyat;
    return(risk>0&&odul>0)?odul/risk:null;
  }
  if(yon==="sat"){
    var risk2=iptal-fiyat,odul2=fiyat-hedef;
    return(risk2>0&&odul2>0)?odul2/risk2:null;
  }
  return null;
}
function istGunu(ts){
  try{return new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Istanbul",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(ts||Date.now()))}
  catch(e){return new Date(ts||Date.now()).toISOString().slice(0,10)}
}
/* "Bugün onay aldı" etiketi için gün-başı anlık görüntüsüyle karşılaştırma.
   Gün değiştiğinde (ya da ilk çalıştırmada) o anki onay durumu KV'ye günün
   BAŞLANGIÇ referansı olarak kaydedilir; aynı gün içindeki sonraki
   çağrılarda hep bu sabit referansla kıyaslanır — böylece "bugün onaylandı"
   etiketi gün boyunca kararlı kalır, her istekte değişip durmaz. */
async function onayGunlukIsaretle(A,sonuc){
  var bugun=istGunu();
  var anahtar="formasyonOnayGecmisi";
  var onceki=null;
  try{if(A.VERI){var raw=await A.VERI.get(anahtar);if(raw)onceki=JSON.parse(raw)}}catch(e){}
  var oncekiDurum=(onceki&&onceki.durum)||{};
  var yeniDurum={};
  sonuc.forEach(function(x){
    var key=x.kod+"|"+x.tf;
    yeniDurum[key]=!!x.onaylandi;
    x.bugunOnay=!!(x.onaylandi&&oncekiDurum[key]===false);
  });
  if(!onceki||onceki.tarih!==bugun){
    try{if(A.VERI)await A.VERI.put(anahtar,JSON.stringify({tarih:bugun,durum:yeniDurum}),{expirationTtl:172800})}catch(e){}
  }
}
/* Artik grafik istenen dilime gore ciziliyor (bkz. MUM_ARALIK), o yuzden
   cizgi de o dilime gore secilir:
   1) tf==="1G" ve p.gunluk varsa → o (gunluk her zaman ayrica tutulur)
   2) formasyon.json'daki EN İYİ (ust seviye) kayit tam da istenen dilime
      aitse (p.tf===tf) → onun ust/alt/hedef geometrisi
   3) o dilimde formasyon var ama sadece dilimler[]'de özet (tip/yon/kalite)
      olarak duruyorsa → çizgisiz, sadece rozet icin dondur (eksikCizgi:true)
   4) hicbiri yoksa → null */
async function formasyonBul(A,kod,tf){
  const j=await formasyonlariGetir(A);
  const p=j&&j.sonuc&&j.sonuc[kod];
  if(!p)return null;
  const fiyat=(typeof p.fiyat==="number")?p.fiyat:null;
  tf=mumTfNormal(tf);
  let d=null;
  if(tf==="1G"&&p.gunluk)d=desenSinirDuzelt(Object.assign({tf:"1G"},p.gunluk));
  else if(p.tf===tf&&p.ust&&p.alt)d=desenSinirDuzelt({tf:tf,tip:p.tip,yon:p.yon,kalite:p.kalite,ust:p.ust,alt:p.alt,ustUz:p.ustUz,altUz:p.altUz,hedef:p.hedef,grup:p.grup});
  else if(Array.isArray(p.dilimler)){
    const dd=p.dilimler.find(x=>x&&x.tf===tf);
    if(dd)d=desenSinirDuzelt(Object.assign({tf:tf,eksikCizgi:!0},dd));
  }
  if(!d)return null;
  if(!formasyonAktifMi(d,fiyat))return null;
  return d;
}
/* TEK TUŞ: "TARA VE BULUTA YÜKLE" /push'a ulaştığı anda GitHub'daki formasyon
   taramasını da başlatır. Böylece tarayıcıdan tek düğmeye basmak yetiyor.
   KISITLAMA: sürekli modda /push 10 saniyede bir gelebilir; her seferinde
   tarama başlatmak hem GitHub'ı hem Yahoo'yu boğar. Bu yüzden en fazla
   FORMASYON_ARALIK'ta bir tetikleniyor — arada gelen istekler sessizce
   yok sayılır. Zamanlanmış (cron) taramalar bundan bağımsız devam eder.
   Kurulum: Cloudflare'de GH_TOKEN adında bir Secret tanımlanmalı. */
/* ══════════ 🔄 ELLE TARAMA (yalnız yönetici) ══════════
   Otomatik tarama bazen takiliyor: GitHub Actions'ta cron sarkabiliyor,
   bir tur ortasinda iptal olabiliyor. Boyle bir anda beklemek yerine
   Telegram'dan tek dokunusla yeni bir tarama baslatilabilsin.
   formasyonTetikle repository_dispatch kullaniyor (formasyon is akisi onu
   dinliyor); fibo-tara.yml ise yalnizca schedule + workflow_dispatch ile
   tetikleniyor. Bu yuzden burada workflow_dispatch ucu cagriliyor.
   Varsayilan dal adi bilinmedigi icin once main, olmazsa master denenir. */
const TARA_BEKLEME=45e3;          /* ard arda basmaya karsi */
let _taraTetik=0;
/* Token'in KENDISINI asla gostermeden bicimini anlatir: uzunluk, on ek ve
   gorunmez karakter var mi. "401 Bad credentials"in iki sebebi vardir —
   token IPTAL edilmistir, ya da yapistirirken bosluk/tirnak kacmistir.
   Bu ozet ikisini ayirt eder ve hicbir gizli bilgi sizdirmaz. */
function tokenTeshis(t){
  const ham=String(t==null?"":t);
  const kirp=ham.trim().replace(/^["']|["']$/g,"");
  const notlar=[];
  if(ham!==kirp)notlar.push("⚠️ başında/sonunda boşluk ya da tırnak var");
  if(/\s/.test(kirp))notlar.push("⚠️ içinde boşluk/satır sonu var");
  const onek=kirp.slice(0,4);
  const bilinen=["ghp_","gho_","ghu_","ghs_","ghr_","gith"];
  if(!kirp)notlar.push("⚠️ değer boş");
  else if(!bilinen.some(x=>onek.indexOf(x)===0))notlar.push("⚠️ tanıdık bir GitHub token ön eki değil");
  return "uzunluk "+kirp.length+" · ön ek "+(onek||"—")+
         (notlar.length?"\n"+notlar.join("\n"):"\n✅ biçim normal görünüyor");
}
async function taramaTetikle(A){
  if(!A||!A.GH_TOKEN)return{ok:!1,mesaj:"GH_TOKEN tanımlı değil — Cloudflare'de Secret olarak ekle."};
  const simdi=Date.now();
  if(simdi-_taraTetik<TARA_BEKLEME)
    return{ok:!1,mesaj:"Az önce bir tarama başlatıldı. "+
      Math.ceil((TARA_BEKLEME-(simdi-_taraTetik))/1000)+" sn sonra tekrar dene."};
  _taraTetik=simdi;
  const url="https://api.github.com/repos/matematikneferi-boop/fix-borsa-worker/actions/workflows/fibo-tara.yml/dispatches";
  const bas={"Authorization":"Bearer "+A.GH_TOKEN,"Accept":"application/vnd.github+json",
             "User-Agent":"fix-borsa-worker","Content-Type":"application/json"};
  let sonKod=0,sonGovde="";
  for(const dal of ["main","master"]){
    try{
      const r=await fetch(url,{method:"POST",headers:bas,body:JSON.stringify({ref:dal})});
      if(r.status===204||r.ok){
        saglikSet("sonElleTarama",Math.floor(Date.now()/1e3));
        return{ok:!0,mesaj:"Tarama başlatıldı ("+dal+"). Sonuç ~1 dakikada listelere düşer."};
      }
      sonKod=r.status; sonGovde=(await r.text().catch(()=>"")).slice(0,120);
    }catch(e){sonKod=-1;sonGovde=String(e&&e.message||e).slice(0,120)}
  }
  _taraTetik=0;                    /* basarisizsa bekleme uygulanmasin */
  saglikArtir("elleTaramaHata");
  return{ok:!1,mesaj:"GitHub reddetti ("+sonKod+").\n\n"+
    (sonKod===401?"GH_TOKEN reddedildi.\n\n🔎 Cloudflare'deki değerin biçimi:\n"+tokenTeshis(A.GH_TOKEN)+"\n\nBiçim normal görünüyorsa token İPTAL EDİLMİŞTİR. Depon herkese açık; GitHub, halka açık depoya sızan tokenları süresi ne olursa olsun otomatik iptal eder. wrangler.toml içinde token geçiyor mu bak.\n\nYeni token: GitHub → Settings → Developer settings → Personal access tokens, 'workflow' yetkisi işaretli.\nSonra Cloudflare → Worker → Settings → Variables → GH_TOKEN."
     :sonKod===404?"fibo-tara.yml bulunamadı ya da token'da 'workflow' yetkisi yok."
     :sonKod===403?"Token yetkisi yetersiz — 'workflow' kapsamı gerekli."
     :String(sonGovde||"").slice(0,120))};
}
const FORMASYON_ARALIK=18e5; /* 30 dakika */
let _fTetik=0;
async function formasyonTetikle(A){
  if(!A||!A.GH_TOKEN)return"token yok";
  const simdi=Date.now();
  if(simdi-_fTetik<FORMASYON_ARALIK)return"beklemede";
  /* 3️⃣ Çakışma kilidi: iki istek aynı anda gelirse GitHub Actions iki kez
     tetiklenmesin (Actions dakikası boşa gitmesin). Bellek kilidi bedava. */
  if(!bellekKilitAl("formasyonTetik",120)){saglikArtir("kilitAtlandi");return"beklemede"}
  try{return await formasyonTetikleIc(A,simdi)}finally{bellekKilitBirak("formasyonTetik")}
}
async function formasyonTetikleIc(A,simdi){
  if(A.VERI){
    const onceki=Number(await A.VERI.get("formasyonTetik")||0);
    if(simdi-onceki<FORMASYON_ARALIK)return"beklemede";
    await A.VERI.put("formasyonTetik",String(simdi));
  }
  _fTetik=simdi;
  try{
    const r=await fetch("https://api.github.com/repos/matematikneferi-boop/fix-borsa-worker/dispatches",{
      method:"POST",
      headers:{"Authorization":"Bearer "+A.GH_TOKEN,"Accept":"application/vnd.github+json",
               "User-Agent":"fix-borsa-worker","Content-Type":"application/json"},
      body:JSON.stringify({event_type:"tarama-bitti"})
    });
    saglikSet("sonFormasyonTetik",Math.floor(Date.now()/1e3));
    saglikSet("sonFormasyonSonuc",r.ok?"başlatıldı":("github "+r.status));
    if(!r.ok)saglikArtir("formasyonHata");
    return r.ok?"başlatıldı":("github "+r.status);
  }catch(e){saglikArtir("formasyonHata");saglikSet("sonFormasyonSonuc","hata");return"hata"}
}
/* ➕ 3. SIRA YEDEK KAYNAK (borsapy'den ilham — github.com/saidsurucu/borsapy):
   query1 VE query2 (ikisi de Yahoo aynası) başarısız olursa devreye girer.
   TAMAMEN EK bir katman: yfKapanislar'ın imzasını, dönüş şeklini (gün→kapanış
   sözlüğü) ya da onu çağıran hiçbir yeri DEĞİŞTİRMEZ. Kendi try/catch'i
   içinde fail-open çalışır — bu kaynak da düşerse zaten var olan
   "her kaynak da başarısız" davranışına sessizce geri döner.
   isyatirim.com.tr'nin kimlik gerektirmeyen genel JSON ucu kullanılıyor. */
async function isyCekTek(kod){
  try{
    const bugun=new Date(),birYilOnce=new Date(bugun);birYilOnce.setFullYear(birYilOnce.getFullYear()-1)
    ;const fmt=d=>String(d.getDate()).padStart(2,"0")+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+d.getFullYear()
    ;const u="https://www.isyatirim.com.tr/_layouts/15/IsYatirim.Website/Common/Data.aspx/HisseTekil"
      +"?hisse="+encodeURIComponent(kod)+"&startdate="+fmt(birYilOnce)+"&enddate="+fmt(bugun)
    ;const res=await fetch(u,{headers:{"Accept":"application/json"}})
    ;if(!res.ok)return null
    ;const j=await res.json().catch(()=>null),rows=j&&j.value
    ;if(!Array.isArray(rows)||!rows.length)return null
    ;const out={}
    ;for(const row of rows){const tarih=row.HGDG_TARIH,kapanis=row.HGDG_KAPANIS
      ;if(!tarih||!(kapanis>0))continue
      ;out[String(tarih).slice(0,10)]=Number(kapanis)}
    ;return Object.keys(out).length?out:null
  }catch(e){return null}
}
async function yfKapanislar(kod){try{const a=await yfCekTek("query1.finance.yahoo.com",kod);if(a)return a}catch(e){console.error("yfCekTek query1 hata",kod,e&&e.message)}
try{const b=await yfCekTek("query2.finance.yahoo.com",kod);if(b)return b}catch(e){console.error("yfCekTek query2 hata",kod,e&&e.message)}
try{const c=await isyCekTek(kod);if(c)return c}catch(e){console.error("isyCekTek hata",kod,e&&e.message)}
console.error("yfKapanislar: üç kaynak da başarısız",kod);return null}
const YF_PARTI=30;async function gecmisiDoldur(e,t){if(!e.VERI)return;if(await e.VERI.get("gecmisDolduruldu"))return
;const kodlar=new Set();if(t&&t.kartlar)for(const k of Object.keys(t.kartlar))if("sira"!==k)for(const rc of t.kartlar[k]||[])rc&&rc.kod&&kodlar.add(rc.kod)
;if(!kodlar.size)return
;const ilRaw=await e.VERI.get("gecmisIlerleme"),yapilan=new Set(ilRaw?JSON.parse(ilRaw):[])
;const kalan=[...kodlar].filter(k=>!yapilan.has(k))
;if(!kalan.length)return void await e.VERI.put("gecmisDolduruldu",(new Date).toISOString())
;const simdi={};for(const k of Object.keys(t.kartlar))if("sira"!==k)for(const rc of t.kartlar[k]||[])rc&&rc.kod&&rc.fiyat>0&&(simdi[rc.kod]=Number(rc.fiyat))
;const n=await y(e),bugun=new Date(Date.now()+108e5).toISOString().slice(0,10);let eklendi=0
;const parti=kalan.slice(0,YF_PARTI)
;for(let i=0;i<parti.length;i+=6){const grup=parti.slice(i,i+6),sonuclar=await Promise.all(grup.map(k=>yfKapanislar(k)))
;grup.forEach((kod,gi)=>{const kap=sonuclar[gi];if(!kap)return;for(const gun of Object.keys(kap)){if(gun>=bugun)continue
;n.gunler[gun]=n.gunler[gun]||{kayitlar:{}};const DK=kod+"@1G";if(!n.gunler[gun].kayitlar[DK]&&!n.gunler[gun].kayitlar[kod]){n.gunler[gun].kayitlar[DK]={k:kod,g:kap[gun],s:simdi[kod]||kap[gun],t:"1G",r:0},eklendi++}}})}
;parti.forEach(k=>yapilan.add(k)),await e.VERI.put("gecmisIlerleme",JSON.stringify([...yapilan]))
;if(eklendi){n.ozet=n.ozet||{};const gt=Object.keys(n.gunler).sort().reverse(),gk=gt.slice(0,DETAY_GUN),gs=gt.slice(DETAY_GUN)
;for(const gg of gs){if(!n.ozet[gg]){const oz=m(gg,n.gunler[gg]);if(oz)n.ozet[gg]=oz}}const go={};for(const gg of gk)go[gg]=n.gunler[gg];n.gunler=go
;const ot=Object.keys(n.ozet).sort().reverse();if(ot.length>OZET_GUN){const oo={};for(const gg of ot.slice(0,OZET_GUN))oo[gg]=n.ozet[gg];n.ozet=oo}
;n.guncelleme=(new Date).toISOString(),await e.VERI.put("gecmis",JSON.stringify(n))}
;if(yapilan.size>=kodlar.size)await e.VERI.put("gecmisDolduruldu",(new Date).toISOString())}
async function suparUyeSuresi(e,uid){if(!e.VERI)return 0;const t=await e.VERI.get("vipsure:"+uid);return t?Number(t):0}
async function suparUyeSuresiUzat(e,uid){if(!e.VERI)return;const simdi=Date.now(),mevcut=await suparUyeSuresi(e,uid),baslangic=Math.max(simdi,mevcut);await e.VERI.put("vipsure:"+uid,String(baslangic+2592e6))}
async function suparUyeMi(e,uid){if(d(uid))return!0;
/* ELLE VERİLEN ÜYELİK: paneldeki "vip" listesi (Sınırsız yap) artık süper
   üyelik de sayılıyor. Eskiden yalnızca bekleme süresini kaldırıyordu;
   yönetici ID eklese bile aday listesi ve anlık uyarı kapalı kalıyordu. */
if((await E(e)).includes(String(uid)))return!0;
if((await suparUyeSuresi(e,uid))>Date.now())return!0;
const toplam=(await F(e))[String(uid)]||0;return toplam>=20}
/* ================== ✅ GÜNLÜK RİSK ONAYI ==================
   Kullanıcı sistemi kullanmadan önce uyarıyı okuyup onaylamak zorunda.
   Onay HER GÜN saat 09:00'dan (TR) sonra yeniden istenir. Dönem hesabı:
   09:00'dan önceyse hâlâ ÖNCEKİ günün dönemindeyiz; 09:00'dan sonra yeni
   dönem başlar. Böylece gece yarısı değil, seans öncesi tazelenir. */
function onayDonemi(){const d=new Date(Date.now()+108e5);
if(d.getUTCHours()<9)d.setUTCDate(d.getUTCDate()-1);
const ik=n=>String(n).padStart(2,"0");
return d.getUTCFullYear()+"-"+ik(d.getUTCMonth()+1)+"-"+ik(d.getUTCDate())}
async function onayVarMi(e,uid){if(!e.VERI)return!0;
const t=await e.VERI.get("onay:"+uid);return t===onayDonemi()}
async function onayVer(e,uid){if(e.VERI)await e.VERI.put("onay:"+uid,onayDonemi())}
const ONAY_METIN="⚠️ <b>OKUMADAN GEÇME</b>\n\n"+
"Bu sistem bir <b>yapay zekâdır</b>. Sonuçlar <b>120.657 barlık</b> geçmiş veri üzerinde "+
"çalışan otomatik bir tarama motorundan çıkar. İnsan görüşü, şirket bilgisi ya da "+
"haber değerlendirmesi <b>içermez</b>.\n\n"+
"🔴 <b>Buradaki hiçbir çıktı yatırım tavsiyesi değildir.</b>\n"+
"🔴 Teknik tarama <b>geleceği bilmez</b>; hedefler tutmayabilir, zarar edebilirsin.\n"+
"🔴 Geçmiş performans gelecek için <b>garanti vermez</b>.\n"+
"🔴 Borsada <b>anaparanın tamamını kaybedebilirsin</b>.\n\n"+
"Devam etmek için aşağıdaki metni onaylaman gerekiyor:\n\n"+
"<b>«Bu sistemden çıkan sonuçlara dayanarak işlem yapmayacağım. Aldığım her "+
"kararın sorumluluğu bana aittir.»</b>\n\n"+
"<i>Bu onay her gün saat 09:00'dan sonra bir kez daha istenir.</i>";
const ONAY_KLAVYE={inline_keyboard:[[{text:"✅ Okudum, anladım, onaylıyorum",callback_data:"onay"}]]};

async function alarmKullanicilari(e){if(!e.VERI)return[];const out=[];let cursor=void 0
;for(;;){const liste=await e.VERI.list({prefix:"alarm:",limit:1e3,cursor});for(const k of liste.keys)out.push(k.name.slice(6))
;if(liste.list_complete||!liste.cursor)break;cursor=liste.cursor}if(!out.length)return[]
;const ref=await F(e);const durum=await Promise.all(out.map(async uid=>({uid,ok:d(uid)||(ref[String(uid)]||0)>=20||(await suparUyeSuresi(e,uid))>Date.now()})));return durum.filter(x=>x.ok).map(x=>x.uid)}

/* Üye kaydı + DAVET SAYACI. Onay ekranı eklendiğinde bu fonksiyon
   atlanıyordu; yeni üye kaydediliyor ama davet edenin sayacı artmıyordu.
   Artık her iki yoldan da bu tek fonksiyon çağrılıyor. */
const uyeKaydet=async function(e,t,a){if(!e.VERI)return!1;const n="u:"+t.id
;if(await e.VERI.get(n))return!1;const i={id:t.id,ad:((t.first_name||"")+" "+(t.last_name||"")).trim(),kullanici:t.username||"",katilim:(new Date).toISOString(),ref:a||null,basis:0}
;await e.VERI.put(n,JSON.stringify(i));const r=await L(e);if(r.toplam=(r.toplam||0)+1,r.gun=r.gun||{},r.gun[W()]=(r.gun[W()]||0)+1,await e.VERI.put("istatistik",JSON.stringify(r)),
a&&String(a)!==String(t.id)){const t=await F(e);t[a]=(t[a]||0)+1,await e.VERI.put("referanslar",JSON.stringify(t))
;const sy=t[a],kalan=20-(sy%20===0?20:sy%20),ac=sy%20===0
;e.BOT_TOKEN&&await fetch("https://api.telegram.org/bot"+e.BOT_TOKEN+"/sendMessage",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({chat_id:a,text:(ac?"🎉 Az önce davet ettiğin biri katıldı! Toplam davet sayın: "+sy+" — süper üyeliğin 1 ay açıldı/uzadı 👑":"🎉 Az önce davet ettiğin biri katıldı! Toplam davet sayın: "+sy+". Süper üyeliğe "+kalan+" davet kaldı.")})}).catch(()=>{})
;ac&&await suparUyeSuresiUzat(e,a)}return!0};
/* 📩 GERİ BİLDİRİM: "Bize Ulaşın" rozetinden gelen görüş/öneriler.
   Tek bir KV anahtarında (en yeni önde) sınırlı sayıda tutulur — panelde
   listelemek ve kimden geldiğini görüp panelin "Mesaj at" düğmesiyle
   geri dönmek için yeterli. */
async function uyeAl(A,uid){if(!A.VERI)return null;const t=await A.VERI.get("u:"+uid);return t?JSON.parse(t):null}
async function gbOku(A){if(!A.VERI)return[];const t=await A.VERI.get("geribildirim");return t?JSON.parse(t):[]}
async function gbEkle(A,giris){
  if(!A.VERI)return;
  const liste=await gbOku(A);
  liste.unshift(giris);
  if(liste.length>500)liste.length=500;
  await A.VERI.put("geribildirim",JSON.stringify(liste));
}
/* 🔔 OKUNMAMIŞ SAYACI — "Bize Ulaşın" yanındaki işaret için. Yöneticinin
   son ne zaman geri bildirimleri açtığı tek bir zaman damgasında tutulur;
   ondan sonra gelenler "okunmamış" sayılır. Aynı işaret bütün yöneticiler
   için ortaktır — biri okuyunca hepsinde söner (basit ve yeterli). */
async function gbSonOkunmaGetir(A){if(!A.VERI)return 0;const t=await A.VERI.get("gbSonOkunma");return t?Number(t)||0:0}
async function gbOkunmamisSayisi(A){
  const son=await gbSonOkunmaGetir(A);
  const liste=await gbOku(A);
  return liste.filter(g=>(g.tarih||0)>son).length;
}
async function gbOkunduIsaretle(A){if(A.VERI)await A.VERI.put("gbSonOkunma",String(Date.now()))}
/* ══════════ 📣 ALARM DAGITIMI — 784'DEN 30.000'E ══════════
   ESKI HALI: kullanicilar.slice(0,45) — alarm en fazla 45 kisiye gidiyordu,
   geri kalan HERKES sessizce dusuyordu. 45 rakami tesadufi degil: Cloudflare
   Workers ucretsiz planda bir istek en fazla 50 dis cagri yapabilir.

   OLCULEN GERCEK: Telegram botlara saniyede ~30 mesaj veriyor (burada 25'e
   ayarli). Yani OZEL MESAJLA:
       784 kisi  -> ~31 saniye
     5.000 kisi  -> ~3,3 dakika
    30.000 kisi  -> ~20 DAKIKA
   30 bin kisiye DM ile "anlik kirilim" duyurmak fizigen mumkun degil.

   COZUM IKI KATMANLI:
   1) KANAL YAYINI (asil olcek cozumu) — ALARM_KANAL tanimliysa mesaj tek
      istekle kanala gider. Abone 784 de olsa 300.000 de olsa sure ayni:
      bir saniyenin altinda, tek alt-istek. Olcek sorunu burada biter.
   2) OZEL MESAJ KUYRUGU (kisisel bildirim isteyenler icin) — alicilar KV'de
      bir ise yazilir, her /push turunda bir PARCA gonderilir ve IMLEC
      kaydedilir. Boylece kimse sessizce dusmez; is yarim kalirsa bir sonraki
      tur kaldigi yerden devam eder. Alt-istek sinirina carparsa da imlec o
      ana kadar gonderileni saklar — plan ucretsiz de olsa ucretli de olsa
      kendi kendini onarir. */
/* "AZAMI KAC KISI?" — PLANI BILMEDEN OGRENEN PARCA BOYU
   Bir /push icinde kac ozel mesaj gonderilebilecegini ONCEDEN bilemeyiz;
   iki ayri tavan var ve ikisi de plana bagli:
     · Cloudflare alt-istek siniri  (ucretsiz 50 · ucretli 1000)
     · Isteğin toplam calisma suresi (Telegram 25 msg/sn ile sinirli
       oldugumuz icin 500 mesaj ~20 saniye demek)
   Tahmin yerine OLCUYORUZ: her tur, sure tavanina ya da ilk hataya kadar
   gonderiyoruz. Hata gelirse ogrenilen tavan o ana kadar basarilanin %80'i
   olarak KV'ye yazilir; hatasiz tamamlanirsa tavan %25 buyutulur. Birkac
   turda sistem kendi plani icin gercek azamiyi bulur ve orada kalir.
   ALARM_PARCA degiskeni tanimlanirsa ogrenme devre disi kalir, o deger
   sabit kullanilir. */
const ALARM_PARCA_TAVAN=900;
const ALARM_PARCA_TABAN=10;
const ALARM_SURE_TAVAN_MS=2e4;     /* bir turda gonderime ayrilan azami sure */
async function alarmParcaOku(e){
  const sabit=Number(e&&e.ALARM_PARCA);
  if(isFinite(sabit)&&sabit>0)return Math.max(ALARM_PARCA_TABAN,Math.min(ALARM_PARCA_TAVAN,sabit));
  try{const v=Number(await e.VERI.get("alarmParcaOgrenilen"));
    if(isFinite(v)&&v>=ALARM_PARCA_TABAN)return Math.min(ALARM_PARCA_TAVAN,v)}catch(_){}
  return 300;                       /* ilk tur icin iyimser baslangic */
}
let _alarmParcaBellek=null;
async function alarmParcaYaz(e,v){
  const y=Math.max(ALARM_PARCA_TABAN,Math.min(ALARM_PARCA_TAVAN,Math.floor(v)));
  /* KV YAZMA BÜTÇESİ: ücretsiz planda günde 1000 yazma var. Bu değer her
     turda yeniden yazılıyordu (~600/gün) ve neredeyse hiç değişmiyordu.
     Artık yalnızca GERÇEKTEN değiştiğinde yazılıyor. */
  if(_alarmParcaBellek===y)return;
  _alarmParcaBellek=y;
  try{await e.VERI.put("alarmParcaOgrenilen",String(y))}catch(_){}
}
const ALARM_KUYRUK_TTL=3600;
const ALARM_IS_AZAMI=4;      /* kuyrukta bekleyebilecek en fazla alarm isi */

async function alarmKuyrugaKoy(e,metin,alicilar){
  if(!e.VERI||!Array.isArray(alicilar)||!alicilar.length)return;
  let kuyruk={isler:[]};
  try{const h=await e.VERI.get("alarmKuyruk");if(h)kuyruk=JSON.parse(h)||{isler:[]}}catch(_){}
  if(!Array.isArray(kuyruk.isler))kuyruk.isler=[];
  kuyruk.isler.push({metin:metin,alicilar:alicilar,ix:0,ts:Date.now()});
  /* Sinyal bayatladiysa kuyrukta bekletmenin anlami yok: en yeniler kalir. */
  if(kuyruk.isler.length>ALARM_IS_AZAMI)kuyruk.isler=kuyruk.isler.slice(-ALARM_IS_AZAMI);
  await e.VERI.put("alarmKuyruk",JSON.stringify(kuyruk),{expirationTtl:ALARM_KUYRUK_TTL});
}

async function alarmKuyrukBosalt(e){
  if(!e.VERI||!e.BOT_TOKEN)return;
  let kuyruk=null;
  try{const h=await e.VERI.get("alarmKuyruk");if(!h)return;kuyruk=JSON.parse(h)}catch(_){}
  /* Kuyruk zaten boşsa silme çağrısı da bir KV YAZIMIDIR ve her turda
     tekrarlanıyordu. Boşsa hiç dokunma — anahtar TTL ile kendiliğinden düşer. */
  if(!kuyruk||!Array.isArray(kuyruk.isler)||!kuyruk.isler.length)return;
  const is=kuyruk.isler[0];
  /* 30 dakikadan eski alarm gonderilmez — geciken sinyal yanlis sinyaldir. */
  if(!is||!Array.isArray(is.alicilar)||Date.now()-Number(is.ts||0)>18e5){
    kuyruk.isler.shift();
    await e.VERI.put("alarmKuyruk",JSON.stringify(kuyruk),{expirationTtl:ALARM_KUYRUK_TTL});
    return;
  }
  const parca=await alarmParcaOku(e);
  const bas=Number(is.ix)||0, son=Math.min(is.alicilar.length,bas+parca);
  const t0=Date.now();
  let i=bas, sureDoldu=false, hata=false;
  try{
    for(;i<son;i++){
      if(Date.now()-t0>ALARM_SURE_TAVAN_MS){sureDoldu=true;break}
      await b(e.BOT_TOKEN,"sendMessage",{chat_id:is.alicilar[i],text:is.metin,
        parse_mode:"HTML",disable_web_page_preview:!0}).catch(()=>{});
    }
  }catch(_){ hata=true; /* alt-istek siniri vb. — imlec o ana kadarini saklar */ }
  /* OGRENME: hata varsa geri cekil, temiz bittiyse biraz zorla. */
  const gonderilen=i-bas;
  if(hata) await alarmParcaYaz(e,Math.max(ALARM_PARCA_TABAN,gonderilen*0.8));
  else if(!sureDoldu && gonderilen>=parca) await alarmParcaYaz(e,parca*1.25);
  else if(sureDoldu) await alarmParcaYaz(e,Math.max(ALARM_PARCA_TABAN,gonderilen));
  is.ix=i;
  if(is.ix>=is.alicilar.length)kuyruk.isler.shift();
  if(!kuyruk.isler.length)await e.VERI.delete("alarmKuyruk").catch(()=>{});
  else await e.VERI.put("alarmKuyruk",JSON.stringify(kuyruk),{expirationTtl:ALARM_KUYRUK_TTL});
}

/* ---------- 📢 YAYIN (toplu duyuru) TEKRAR-DENEME KUYRUĞU ----------
   🐞 DÜZELTİLEN HATA: bir yayın turu bitince "başarısız" sayılan alıcılar
   sonsuza dek kayboluyordu — 403 (bot engellenmiş) veya 400 (geçersiz
   sohbet) gibi KALICI hatalar dışında (ör. 429 tükendi, 5xx, ağ hatası)
   bunlar aslında tekrar denenince gidebilirdi. Artık kalıcı olmayan
   başarısızlar bu kuyruğa düşüyor ve alarmKuyruk ile AYNI ritimde
   (her /push turunda bir parça) arka planda tek tuşa gerek kalmadan
   tekrar tekrar denenıyor. */
const YAYIN_KUYRUK_TTL=21600;        /* 6 saat — makul bir süre sonra vazgeçilir */
const YAYIN_KUYRUK_PARCA=15;         /* her /push turunda tekrar denenecek alıcı sayısı */
const YAYIN_KUYRUK_AZAMI_DENEME=6;   /* aynı alıcıya en fazla bu kadar tur tekrar denenir */

async function yayinKuyrugaKoy(e,is){
  if(!e.VERI||!Array.isArray(is.alicilar)||!is.alicilar.length)return;
  let kuyruk={isler:[]};
  try{const h=await e.VERI.get("yayinKuyruk");if(h)kuyruk=JSON.parse(h)||{isler:[]}}catch(_){}
  if(!Array.isArray(kuyruk.isler))kuyruk.isler=[];
  kuyruk.isler.push({metin:is.metin||"",fileId:is.fileId||"",tur:is.tur||"",
    alicilar:is.alicilar,ix:0,deneme:0,ts:Date.now()});
  /* Kuyrukta çok iş birikmesin — eski duyurular zaten bayatlamıştır. */
  if(kuyruk.isler.length>3)kuyruk.isler=kuyruk.isler.slice(-3);
  await e.VERI.put("yayinKuyruk",JSON.stringify(kuyruk),{expirationTtl:YAYIN_KUYRUK_TTL});
}

async function yayinKuyrukBosalt(e){
  if(!e.VERI||!e.BOT_TOKEN)return;
  let kuyruk=null;
  try{const h=await e.VERI.get("yayinKuyruk");if(!h)return;kuyruk=JSON.parse(h)}catch(_){return}
  if(!kuyruk||!Array.isArray(kuyruk.isler)||!kuyruk.isler.length)return;
  const is=kuyruk.isler[0];
  if(!is||!Array.isArray(is.alicilar)||!is.alicilar.length){
    kuyruk.isler.shift();
    if(!kuyruk.isler.length)await e.VERI.delete("yayinKuyruk").catch(()=>{});
    else await e.VERI.put("yayinKuyruk",JSON.stringify(kuyruk),{expirationTtl:YAYIN_KUYRUK_TTL});
    return;
  }
  const bas=Number(is.ix)||0,son=Math.min(is.alicilar.length,bas+YAYIN_KUYRUK_PARCA);
  const yeniTekrar=[],yeniBotEngelli=[];
  let i=bas;
  for(;i<son;i++){
    const hid=is.alicilar[i];
    let rr;
    try{
      if(is.fileId&&"video"===is.tur)rr=await b(e.BOT_TOKEN,"sendVideo",{chat_id:hid,video:is.fileId,caption:String(is.metin||"").slice(0,1024),parse_mode:"HTML"});
      else if(is.fileId)rr=await b(e.BOT_TOKEN,"sendPhoto",{chat_id:hid,photo:is.fileId,caption:String(is.metin||"").slice(0,1024),parse_mode:"HTML"});
      else rr=await b(e.BOT_TOKEN,"sendMessage",{chat_id:hid,text:is.metin,parse_mode:"HTML",disable_web_page_preview:!0});
    }catch(_){rr=null}
    if(!rr||!rr.ok){
      const kod=(rr&&rr.error_code)||0;
      if(403===kod)yeniBotEngelli.push(hid);
      else if(400!==kod)yeniTekrar.push(hid);   /* kalıcı hatalar bir daha denenmez */
    }
  }
  if(yeniBotEngelli.length)await botEngelliEkle(e,yeniBotEngelli).catch(()=>{});
  is.ix=i;
  is.deneme=(Number(is.deneme)||0)+1;
  if(is.ix>=is.alicilar.length){
    /* Bu partinin bir turu bitti — hâlâ başarısız olan var ve deneme hakkı
       kaldıysa, onları başa alıp bir tur daha dene; yoksa işi bırak. */
    if(yeniTekrar.length&&is.deneme<YAYIN_KUYRUK_AZAMI_DENEME){is.alicilar=yeniTekrar;is.ix=0}
    else kuyruk.isler.shift();
  }
  if(!kuyruk.isler.length)await e.VERI.delete("yayinKuyruk").catch(()=>{});
  else await e.VERI.put("yayinKuyruk",JSON.stringify(kuyruk),{expirationTtl:YAYIN_KUYRUK_TTL});
}
/* ================== 🚨 ALARM — GÜNLÜK HAFIZA ==================
   ESKİ MANTIK YALNIZCA BİR ÖNCEKİ TARAMAYA BAKIYORDU. Aralık 5 dakikayken
   iş görüyordu; SÜREKLİ MODDA (10 sn) iki tarama arasında liste neredeyse
   hiç değişmediği için "yeni giren" çıkmıyor ve alarm susuyordu. Ayrıca bir
   hisse listeden çıkıp geri girince aynı alarm tekrar tekrar gidiyordu.
   YENİ MANTIK: o gün alarm verilmiş kodlar KV'de tutulur; bir hisse güçlü
   sinyale girdiğinde günde BİR KEZ haber verilir — tarama sıklığı ne olursa
   olsun sonuç aynı. Liste her gün (TR 09:00) sıfırlanır. Hedefini çoktan
   aşmış hisseler "yeni sinyal" diye gönderilmez; yanıltıcıydı. */
async function alarmGecmisi(e){if(!e.VERI)return{gun:"",kodlar:[]};
const t=await e.VERI.get("alarmGun"),g=t?JSON.parse(t):{gun:"",kodlar:[]},bugun=onayDonemi();
return g.gun!==bugun?{gun:bugun,kodlar:[]}:g}
/* ANAHTAR = kod|dilim|C(anli)/K(apanmis).
   ESKIDEN SADECE KOD IDI. Anlik (canli) uyari gidince kod sete giriyordu;
   bar kapanip sinyal GERCEKTEN teyit oldugunda ikinci mesaj asla gitmiyordu.
   Ayni hisse iki farkli dilimde kirsa da tek mesaj cikiyordu. */
const alarmAnahtar=x=>String(x.kod)+"|"+String(x.tfKod||x.tf||"?")+"|"+(x.canli?"C":"K");
/* TAZELIK DILIME GORE. 6 saat sabit esik, 15 dakikalik bir sinyal icin
   fazlasiyla genisti: 5 bar once olusmus bir kirilim "yeni" diye gidiyordu.
   Canli (bar kapanmamis) sinyalde pencere en dar: gecikmis canli uyari
   yaniltir, cunku bar coktan kapanmis olabilir. */
const ALARM_TAZE={"15DK":45*60,"1SA":2*3600,"4SA":6*3600,"1G":20*3600,"1H":72*3600,"1A":240*3600};
/* CANLI sinyalde sinyalTs, olusmakta olan barin BASLANGIC damgasidir; 1 saatlik
   barda bu 59 dakika once olabilir. Bu yuzden canli pencere = bar suresi + 20 dk. */
const ALARM_BAR={"15DK":900,"1SA":3600,"4SA":14400,"1G":86400,"1H":604800,"1A":2592000};
const alarmTazeEsik=x=>x.canli
?((ALARM_BAR[String(x.tfKod||"")]||3600)+1200)
:(ALARM_TAZE[String(x.tfKod||"")]||6*3600);
/* ---------- 📃 MINI APP ACILMADIGINDA DA SINYAL GORULEBILSIN ----------
   Bazi operatorler *.workers.dev adresini sifirliyor (ERR_CONNECTION_RESET).
   O kullanicilar Mini App'i ACAMIYOR — cunku Mini App worker'da barinan bir
   web sayfasi ve istek hic worker'a varmiyor. Kodla duzeltilemez.
   AMA bot mesajlari Telegram'in kendi sunucularindan geliyor; kullanicinin
   cihazi worker'a hic baglanmiyor. Yani sinyaller MESAJ olarak sorunsuz
   ulasiyor. Tek eksik, listeyi mesaj olarak isteyebilecegi bir komut yoktu.
   /sinyal · /canli komutlari bu boslugu kapatiyor. */
/* Yeni surum ciktikca BU IKI SATIR guncellenir. */
const WORKER_SURUM="2026-08-24-i · 🔔 Filtre alarmı: 'alınıyor…' yazısının SONSUZA dek asılı kalma hatası bulundu ve düzeltildi — istek başarısız/geç olursa artık kilit HER ZAMAN çözülüyor ve ekran yeniden çiziliyor (eskiden hem kilit hem ekran donuk kalıyordu) + 8 saniyelik zaman aşımı + 5 saniyede bir kendiliğinden yeniden deneyen bekçi eklendi + arayüzdeki ekle/sil butonları da artık süper üyelere açık (eskiden HTML hâlâ yalnız yöneticiyi gösteriyordu) · 📢 Toplu duyuru: kalıcı olmayan başarısızlar arka planda otomatik tekrar deniyor + botu engelleyenler ayrı tespit ediliyor · 📊 Panel: net aktif/hiç kullanmayan/botu engellemiş segmentleri ve filtresi";
const BEKLENEN_TARAYICI_SURUM="2026-08-20-e";
async function sinyalMetniUret(A,yalnizCanli){
  const L=await g(A);
  const kartlar=(L&&L.kartlar)||{};
  let liste=[];
  for(const ad of ["potansiyel","fibo"]){
    for(const x of (kartlar[ad]||[])) if(x&&x.kod) liste.push(x);
  }
  /* ayni hisse iki listede olabilir */
  const gorulen=new Set(); liste=liste.filter(x=>{
    const a=x.kod+"|"+(x.tfKod||""); if(gorulen.has(a))return false; gorulen.add(a); return true;});
  if(yalnizCanli) liste=liste.filter(x=>!!x.canli);
  if(!liste.length) return yalnizCanli
    ?"⚡ Şu an bar kapanmadan kırılan hisse yok.\n\nBar içinde kırılım oluştuğunda burada görünür."
    :"Şu an listede sinyal yok.\n\nTarama sürüyor; kırılım oluştuğunda haber vereceğim.";
  const bas=yalnizCanli
    ?"⚡ <b>ANLIK KIRILIMLAR</b> · <i>bar kapanmadı</i>\n\n"
    :"📃 <b>GÜNCEL SİNYAL LİSTESİ</b>\n\n";
  const n=Math.min(liste.length,6);
  return bas+liste.slice(0,n).map(x=>j(x)).join("\n")+
    (liste.length>n?"\n<i>…ve "+(liste.length-n)+" hisse daha.</i>":"");
}
async function alarmGonder(e,eski,yeni){if(!e.VERI||!e.BOT_TOKEN)return;
/* ⚠️ ALARM SADECE "potansiyel" LİSTESİNİ OKUYORDU — yani yalnızca KISA.
   ORTA (fibo) ve UZUN (uzunvade) listelerine düşen sinyaller uygulamada
   görünüyor ama HİÇ bildirim göndermiyordu. Üç liste de alarma girer.
   Mükerrer gitmez: alarmAnahtar zaten kod|dilim|canlı olduğu için aynı
   hisse iki dilimde kırdıysa iki ayrı sinyaldir ve öyle sayılır. */
const K=(yeni&&yeni.kartlar)||{};
const yeniListe=[].concat(K.potansiyel||[],K.fibo||[],K.uzunvade||[]);
if(!yeniListe.length)return;
const gecmis=await alarmGecmisi(e),bilinen=new Set(gecmis.kodlar||[]);
/* ALARM SADECE GERÇEKTEN GÜÇLÜ OLANLARA:
   ⚪ İZLEMEDE (hiçbir kademesi kırılmamış) ve hedefini çoktan aşmış
   hisseler bildirim göndermez. Listede dururlar; ama 11 hisselik bir
   yığın yerine 3-4 gerçek sinyal gelmesi mesajın değerini korur. */
const uygun=yeniListe.filter(x=>x&&x.kod
&&!(null!=x.potansiyel&&Number(x.potansiyel)<=0)
/* Hedefe kalan pay %2.7'nin altındaki sinyaller LİSTEDE durur ama
   BİLDİRİM GÖNDERMEZ: liste dolu kalsın, mesaj değerli kalsın. */
&&!x.zayifHedef
/* 🔇 Bilanço açıklamasına 2 gün kala bildirim gönderilmez: o hareket
   teknik kırılım değil, olay riskidir. Kart listede kalır. */
&&!x.bilancoSessiz
&&!/İZLEMEDE/.test(String(x.guc||"")));
/* DUZELTME: "bilinen" seti gunde bir sifirlaniyor, ama hafta sonu piyasa
   kapaliyken bile takvim gunu degisiyor -- Cuma'nin sinyali Cumartesi/
   Pazar/Pazartesi her sifirlamada yeniden "yeni" sayilip tekrar tekrar
   gonderiliyordu. Simdi ek sart: sinyalin KENDI zaman damgasi (sinyalTs)
   gercekten son birkac saat icinde olmali -- gunler once olusmus bir
   sinyal bir daha asla "YENI" diye gonderilmez. */
const simdiSn=Math.floor(Date.now()/1000);
const yeniGirenler=uygun.filter(x=>!bilinen.has(alarmAnahtar(x))
&&x.sinyalTs&&(simdiSn-Number(x.sinyalTs))<=alarmTazeEsik(x));
if(!yeniGirenler.length)return;
for(const x of yeniGirenler)bilinen.add(alarmAnahtar(x));
await e.VERI.put("alarmGun",JSON.stringify({gun:onayDonemi(),kodlar:[...bilinen].slice(-600)}));
const kullanicilar=await alarmKullanicilari(e);
if(!kullanicilar.length)return;
/* Anlik kirilim ile teyitli kirilim ayni baslikta gitmemeli — biri
   "su an oluyor", digeri "bar kapandi, teyitli". */
const hepCanli=yeniGirenler.every(x=>!!x.canli);
const baslik=yeniGirenler.length>1
?(hepCanli?"⚡ <b>"+yeniGirenler.length+" ANLIK KIRILIM</b> · <i>bar kapanmadı</i>\n\n":"🚨 <b>"+yeniGirenler.length+" YENİ GÜÇLÜ SİNYAL</b>\n\n")
:(hepCanli?"⚡ <b>ANLIK KIRILIM</b> · <i>bar kapanmadı</i>\n\n":"🚨 <b>GÜÇLÜ SİNYALE GİRDİ</b>\n\n");
const metin=baslik+yeniGirenler.slice(0,6).map(hisse=>j(hisse)).join("\n")+
(yeniGirenler.length>6?"\n<i>…ve "+(yeniGirenler.length-6)+" hisse daha. Menüden ⚡ Kısa Trade listesine bak.</i>":"");
/* GONDERIM SIRAYLA yapiliyordu: 45 kisiye 45 ardisik Telegram cagrisi,
   her biri ~200-400 ms -> alarmin son alicisina varmasi 10-18 saniye.
   "Anlik kirilim" iddiasiyla celisen bir gecikme. Telegram farkli
   kullanicilara saniyede ~30 mesaji kaldirir; 15'erli paralel gruplar
   hem bu sinirin altinda kalir hem sureyi ~1 saniyeye indirir.
   Bir alicinin dusmesi (bot engellenmis vb.) digerlerini durdurmasin
   diye her gonderim kendi hatasini yutar. */
/* 1) KANAL — tek istek, abone sayisindan bagimsiz, once bu gider. */
const kanal=String((e.ALARM_KANAL||"")).trim();
if(kanal){
  await b(e.BOT_TOKEN,"sendMessage",{chat_id:kanal,text:metin,
    parse_mode:"HTML",disable_web_page_preview:!0}).catch(()=>{});
}
/* 2) OZEL MESAJ — kuyruga yaz, ilk parcayi hemen gonder, gerisi
      sonraki /push turlarinda kaldigi yerden devam eder. */
await alarmKuyrugaKoy(e,metin,kullanicilar);
await alarmKuyrukBosalt(e);}
/* ══════════════════════════════════════════════════════════════════════════
   🧩 İKİNCİ PAKET (sürüm 11.7)
     A) Absorpsiyon / order-flow tespiti (günlük barlardan)
     B) İmzalı, süresi dolan yönetici panel anahtarı + kademeli hız sınırı
   Hepsi eklenti: hiçbiri mevcut bir akışın içine girmiyor, hepsi kendi uç
   noktasından çağrılıyor, hata durumunda sessizce boş dönüyor.
   ══════════════════════════════════════════════════════════════════════ */

/* ---------- A) 🌊 ABSORPSİYON / ORDER-FLOW ----------
   MANTIK (order-flow kitaplarındaki "absorption" tanımı):
   Bir barda HACİM patlıyor ama FİYAT neredeyse hiç ilerlemiyorsa, gelen
   agresif emirleri karşı tarafta birileri sessizce yutuyor demektir.
   Yüksek hacim + dar aralık = büyük oyuncu pozisyon topluyor/dağıtıyor.

   DÜRÜST SINIR: gerçek order-flow tick ve bid/ask verisi ister; bizde
   sadece günlük OHLCV var. Bu yüzden bu bir YAKLAŞIKLAMA (proxy).
   Yanlış pozitif verebilir — tek başına al/sat sinyali değildir, mevcut
   sinyallerin üstüne "kim topluyor?" katmanıdır. Bunu ekranda da yazıyoruz.

   PUAN = hacim katı × aralık darlığı × kapanış konumu (0-100). */
/* Eşikler artık sabit değil — yönetici panelinden ayarlanabilir, KV'de
   saklanır ("absAyar" anahtarı). Varsayılanlar önceki denemelerden sonra
   iyice gevşetildi (1.4/0.95 → 1.15/1.15) çünkü taranan evren küçük
   (en fazla 16 hisse) ve BIST günlük barlarında klasik "1.8x hacim + dar
   aralık" birlikteliği nadir çıkıyor. */
const ABS_VARSAYILAN={hacimEsik:1.15,darlikEsik:1.15,puanEsik:0};
async function absAyarAl(A){
  if(!A.VERI)return ABS_VARSAYILAN;
  try{
    const c=await A.VERI.get("absAyar");
    if(c){
      const j=JSON.parse(c);
      const h=Number(j.hacimEsik),d=Number(j.darlikEsik),pz=Number(j.puanEsik);
      return{hacimEsik:(h>1&&h<10)?h:ABS_VARSAYILAN.hacimEsik,
             darlikEsik:(d>0&&d<3)?d:ABS_VARSAYILAN.darlikEsik,
             puanEsik:(pz>=0&&pz<=100)?pz:0}
    }
  }catch(e){}
  return ABS_VARSAYILAN;
}
async function absAyarKaydet(A,hacimEsik,darlikEsik,puanEsik){
  const h=Number(hacimEsik),d=Number(darlikEsik);
  let pz=Number(puanEsik); if(!(pz>=0&&pz<=100))pz=0;
  if(!(h>1&&h<10)||!(d>0&&d<3))return null;
  const ayar={hacimEsik:h,darlikEsik:d,puanEsik:pz};
  if(A.VERI)await A.VERI.put("absAyar",JSON.stringify(ayar)).catch(()=>{});
  return ayar;
}
function ortancaAl(dizi){
  if(!dizi.length)return 0;
  const d=dizi.slice().sort((a,b)=>a-b),m=Math.floor(d.length/2);
  return d.length%2?d[m]:(d[m-1]+d[m])/2;
}
function absorpsiyonHesapla(mumlar,ayar){
  ayar=ayar||ABS_VARSAYILAN;
  try{
    if(!mumlar||mumlar.length<25)return null;
    const son=mumlar[mumlar.length-1];
    if(!son||!(son.hacim>0)||!(son.close>0))return null;
    const gecmis=mumlar.slice(-21,-1);                 /* son bar hariç 20 bar */
    if(gecmis.length<15)return null;
    const hacimler=gecmis.map(x=>x.hacim||0).filter(x=>x>0);
    if(hacimler.length<10)return null;
    const hacimOrt=ortancaAl(hacimler);
    if(!(hacimOrt>0))return null;
    const hacimKat=son.hacim/hacimOrt;                 /* 1 = normal, 3 = üç kat */
    const aralik=(son.high-son.low)/son.close;
    const araliklar=gecmis.map(x=>(x.high-x.low)/(x.close||1)).filter(x=>x>0);
    const aralikOrt=ortancaAl(araliklar);
    if(!(aralikOrt>0))return null;
    const darlik=aralik/aralikOrt;                     /* 1 = normal, 0.4 = çok dar */
    const yayilim=son.high-son.low;
    const konum=yayilim>0?(son.close-son.low)/yayilim:0.5;  /* 1 = tepede kapandı */
    /* ⚠️ ESKIDEN BURADA ELENIYORDU — VE ASIL BUG BUYDU.
       Esigi gecemeyen hisse icin null donuluyordu; yani OLCUM ile SUZGEC
       ic ice gecmisti. Sonuc: esik degistirildiginde eldeki birikim
       (esigi gecmis eski hisseler) oldugu gibi duruyor, elenmisler ise
       hic kaydedilmedigi icin geri gelemiyordu. Kullanici esigi 1.01'den
       1.4'e cekiyor, ekranda hicbir sey degismiyordu.
       ARTIK: her hisse icin OLCUM her zaman kaydedilir (hacimKat, darlik,
       konum, puan). Esik SUZGEC olarak GOSTERIM aninda uygulanir. Boylece
       esigi degistirmek yeniden tarama gerektirmez, sonuc ANINDA degisir. */
    /* Puanlama sabit çapalarla yapılır (eşik değişse de ölçek bozulmasın):
       1x hacim → 0 puan, 4x → tam puan; aralık 1.0 → 0 puan, 0.3 → tam puan. */
    const hacimP=Math.min(1,Math.max(0,(hacimKat-1)/3));
    const darP=Math.min(1,Math.max(0,(1-darlik)/0.7));
    const konumP=Math.abs(konum-0.5)*2;                /* uçlara yakınlık */
    const puan=Math.round(100*(0.45*hacimP+0.35*darP+0.20*konumP));
    const yon=konum>=0.6?"talep":(konum<=0.4?"arz":"kararsız");
    return{gecti:!(hacimKat<ayar.hacimEsik||darlik>ayar.darlikEsik),
      puan:puan,hacimKat:Math.round(hacimKat*10)/10,
      darlik:Math.round(darlik*100)/100,konum:Math.round(konum*100),
      yon:yon,fiyat:son.close,zaman:son.time};
  }catch(e){return null}
}
/* Taranacak hisseler: sinyal listelerinde geçenler + kullanıcının takip
   ettikleri. Cloudflare bir istekte en fazla 50 alt-istek (subrequest)
   yapmaya izin veriyor; KV okuma/yazmaları da bu bütçeden düşüyor ve
   yfMumlar gerekirse iki host deniyor. En kötü durumda 16 hisse = 32 istek
   + ~8 KV işlemi = 40 — sınırın altında güvenli pay kalıyor. */
/* ══════════ 🌊 ABSORPSIYON EVRENI — 16'DAN TUM HAVUZA ══════════
   ESKI HALI: slice(0,16). Yalnizca sinyal listelerindeki ilk 16 hisse
   taraniyordu, havuzdaki 432'nin geri kalani hic bakilmadi. Ustelik
   dongu SIRAYLA calisiyordu (her hisse icin bir Yahoo cagrisi, arka
   arkaya) — 16'da bile birkac saniye.
   16'yi dogrudan 432 yapmak sistemi kirar:
     · Cloudflare alt-istek siniri (ucretsiz 50 · ucretli 1000)
     · 432 ardisik cagri = dakikalar; Mini App istegi zaman asimina ugrar
   COZUM — PARCALI VE KALDIGI YERDEN DEVAM EDEN TARAMA:
   Havuz tek seferde degil, her turda bir DILIM taranir; sonuclar KV'de
   birikir ve imlec nerede kalindigini tutar. Her /push turunda (~50 sn)
   bir dilim daha ilerler, birkac dakikada tum havuz taranmis olur ve
   surekli dondugu icin veri hep taze kalir. Mini App ise beklemeden
   BIRIKMIS tam listeyi gorur.
   Dilim boyu, alarm dagitimindaki gibi kendi kendini olcer. */
const ABS_CACHE_MS=18e5;              /* 30 dakika — tek hissenin olcum yasi */
/* DUR/DEVAM: arka plan taramasi istenildiginde durdurulabilir. Durdurulunca
   BIRIKIM SILINMEZ — tablo neyi bulmussa onu gostermeye devam eder, sadece
   yeni olcum alinmaz. Devam edilince imlec kaldigi yerden yurur. */
async function absCalisiyorMu(A){
  try{return (await A.VERI.get("absDurduruldu"))!=="1"}catch(_){return true}
}
async function absDurdurAyarla(A,dur){
  try{ if(dur)await A.VERI.put("absDurduruldu","1");
       else await A.VERI.delete("absDurduruldu"); }catch(_){}
}
const ABS_DILIM_TABAN=8, ABS_DILIM_TAVAN=120;
const ABS_SURE_TAVAN_MS=1e4;          /* bir turda absorpsiyona ayrilan azami sure */
const ABS_ES=6;                       /* es zamanli Yahoo cagrisi */
const ABS_BIRIKIM_TTL=7200;
const ABS_YAZMA_ARALIK=6e5;      /* KV'ye en fazla 10 dakikada bir yaz */
let _absBirikimBellek=null, _absBirikimYazma=0;

async function absDilimOku(A){
  const sabit=Number(A&&A.ABS_DILIM);
  if(isFinite(sabit)&&sabit>0)return Math.max(ABS_DILIM_TABAN,Math.min(ABS_DILIM_TAVAN,sabit));
  try{const v=Number(await A.VERI.get("absDilimOgrenilen"));
    if(isFinite(v)&&v>=ABS_DILIM_TABAN)return Math.min(ABS_DILIM_TAVAN,v)}catch(_){}
  return 32;
}
let _absDilimBellek=null;
async function absDilimYaz(A,v){
  const y=Math.max(ABS_DILIM_TABAN,Math.min(ABS_DILIM_TAVAN,Math.floor(v)));
  if(_absDilimBellek===y)return;          /* değişmediyse KV'ye dokunma */
  _absDilimBellek=y;
  try{await A.VERI.put("absDilimOgrenilen",String(y))}catch(_){}
}
/* Taranacak evren: sinyal listelerindeki hisseler + favori/portfoy +
   havuzun tamami (sektor.json tum BIST'i kapsiyor). */
const KOD_GECERLI=/^[A-Z][A-Z0-9]{2,5}$/;
const kodTemiz=v=>String(v||"").toUpperCase().replace(/\.IS$/,"").replace(/[^A-Z0-9]/g,"");
/* Evren nereden geliyor? Uc kaynak, dusme sirasiyla:
   1) SOZLUK — tarayici her turda TARADIGI TUM hisseler icin sozluk
      gonderiyor (tgSozluk sinSonVeri'nin tamamini geziyor). Yani havuzun
      tamami zaten KV'de duruyor, EK AG ISTEGI YOK. Asil kaynak budur.
   2) havuz.json — depodaki resmi liste (tara.py de bunu kullaniyor).
   3) sektor.json — SON CARE. Eskiden buradan okuyordum ve HATALIYDI:
      dosya duz bir kod listesi degil, kodlar j.sektor ALTINDA. Object.keys(j)
      ["sektor"] donuyordu; evren bu yuzden 432 yerine sadece sinyal
      listesindeki 27 hissede kaliyordu. */
const HAVUZ_URL="https://raw.githubusercontent.com/matematikneferi-boop/fix-borsa-worker/main/havuz.json";
async function absHavuzGetir(A){
  try{const c=A.VERI&&await A.VERI.get("absHavuz");
    if(c){const j=JSON.parse(c);
      if(Date.now()-j.ts<216e5&&Array.isArray(j.kodlar)&&j.kodlar.length)return j.kodlar}}catch(_){}
  try{
    const r=await fetch(HAVUZ_URL+"?_="+Math.floor(Date.now()/216e5),{cf:{cacheTtl:21600}});
    if(r.ok){
      const j=await r.json();
      let ham=[];
      if(Array.isArray(j))ham=j;
      else if(j&&Array.isArray(j.kodlar))ham=j.kodlar;
      else if(j&&Array.isArray(j.hisseler))ham=j.hisseler;
      else if(j&&typeof j==="object")ham=Object.keys(j);
      const kodlar=[...new Set(ham.map(x=>kodTemiz(
        typeof x==="string"?x:(x&&(x.kod||x.sembol||x.symbol))||"")).filter(k=>KOD_GECERLI.test(k)))];
      if(kodlar.length){
        if(A.VERI)await A.VERI.put("absHavuz",JSON.stringify({ts:Date.now(),kodlar}),{expirationTtl:86400}).catch(()=>{});
        return kodlar;
      }
    }
  }catch(_){}
  return [];
}
/* ══════════ 🌍 TARAMA EVRENİ — TEK KAYNAK, HAVUZUN TAMAMI ══════════
   ESKİ HÂLİ (ve 121 HİSSE BUG'I): absEvren kademeli bir yedekleme zinciri
   kullanıyordu — tarayıcı sözlüğü 100'den çok kod verdiyse sektor.json'a
   HİÇ bakmıyordu. Sözlükte 121 kod olduğu için havuzdaki 430 hissenin
   geri kalanı ne absorpsiyonda ne de yeni taramada hiç görülmedi.
   YENİ: zincir yok. Bütün kaynaklar KOŞULSUZ birleştirilir ve hangi
   kaynaktan kaç kod geldiği rapor edilir (arayüzde görünür).
   AYRICA KENDİ KENDİNİ ONARIR: sektör haritası KV önbelleğinden bayat
   ya da eksik gelirse (200'den az kod) önbellek atlanıp dosya doğrudan
   çekilir ve bozuk önbellek silinir. */
const EVREN_ESIK=200;              /* bundan az kod = şüpheli, tazele */
let _evrenBellek=null,_evrenZaman=0,_evrenRapor=[];
const EVREN_TTL=18e5;              /* 30 dakika */

/* Sektör haritasını GÜVENİLİR biçimde getirir: önce normal yol, sonuç
   şüpheliyse KV önbelleğini atlayıp dosyayı doğrudan çeker. */
async function evrenSektorKodlari(A){
  const cikar=(j)=>{
    const h=(j&&j.sektor&&typeof j.sektor==="object")?j.sektor:((j&&typeof j==="object")?j:null);
    return h?Object.keys(h):[];
  };
  let kodlar=[];
  try{kodlar=cikar(await sektorlariGetir(A))}catch(_){}
  if(kodlar.length>=EVREN_ESIK)return{kodlar:kodlar,not:"önbellek"};
  /* Şüpheli: önbelleği atla, dosyayı doğrudan çek. */
  for(const url of SEKTOR_URLLER){
    try{
      const r=await fetch(url+"?_="+Date.now(),{cf:{cacheTtl:0,cacheEverything:!1}});
      if(!r.ok)continue;
      const j=await r.json();
      const k=cikar(j);
      if(k.length>kodlar.length){
        kodlar=k;
        /* Bozuk önbelleği tazele ki bir daha bu yola girilmesin. */
        if(A&&A.VERI&&k.length>=EVREN_ESIK){
          _sBellek=j;_sZaman=Date.now();
          await A.VERI.put("sektorJson",JSON.stringify(j),{expirationTtl:86400}).catch(()=>{});
        }
      }
      if(kodlar.length>=EVREN_ESIK)return{kodlar:kodlar,not:"doğrudan çekildi"};
    }catch(_){}
  }
  return{kodlar:kodlar,not:kodlar.length?"eksik olabilir":"ulaşılamadı"};
}

async function tamEvren(A,ekKodlar){
  const simdi=Date.now(),ek=(ekKodlar||[]).length>0;
  if(_evrenBellek&&simdi-_evrenZaman<EVREN_TTL&&!ek)return _evrenBellek;
  const kodSet=new Set(),rapor=[];
  const ekle=(k)=>{const c=kodTemiz(k);
    if(KOD_GECERLI.test(c)){const y=!kodSet.has(c);kodSet.add(c);return y}return!1};
  const say=(ad,liste,not)=>{let n=0;for(const k of(liste||[]))if(ekle(k))n++;
    rapor.push({ad:ad,yeni:n,geldi:(liste||[]).length,not:not||""})};
  /* 1) sektör haritası — havuzun TAMAMI */
  try{const s=await evrenSektorKodlari(A);say("sektör",s.kodlar,s.not)}
  catch(_){rapor.push({ad:"sektör",yeni:0,geldi:0,not:"hata"})}
  /* 2) havuz.json */
  try{say("havuz",await absHavuzGetir(A))}catch(_){}
  /* 3) tarayıcı sözlüğü + sinyal kartları */
  try{
    const L=await g(A);
    if(L&&L.sozluk&&typeof L.sozluk==="object")say("sözlük",Object.keys(L.sozluk));
    if(L&&L.kartlar){
      const kk=[];
      for(const k of Object.keys(L.kartlar)){
        if("sira"===k||0===k.indexOf("aday"))continue;
        for(const x of(L.kartlar[k]||[]))if(x&&x.kod)kk.push(x.kod);
      }
      say("sinyal",kk);
    }
  }catch(_){}
  if(ek)say("favori/portföy",ekKodlar);
  const liste=[...kodSet].sort();
  liste.kaynak=rapor.filter(r=>r.yeni>0).map(r=>r.ad+":"+r.yeni+(r.not?"("+r.not+")":"")).join(" · ")||"kaynak yok";
  liste.rapor=rapor;
  _evrenRapor=rapor;
  if(!ek){_evrenBellek=liste;_evrenZaman=simdi}
  return liste;
}
/* Önbellekleri boşalt — yönetici "evreni yenile" dediğinde. */
async function evrenSifirla(A){
  _evrenBellek=null;_evrenZaman=0;_sBellek=null;_sZaman=0;
  _absBirikimBellek=null;
  try{if(A&&A.VERI){await A.VERI.delete("sektorJson");await A.VERI.delete("absHavuz")}}catch(_){}
}
/* Absorpsiyon da ARTIK AYNI evreni kullanıyor — 121 sınırı kalktı. */
async function absEvren(A,ekKodlar){return tamEvren(A,ekKodlar)}
/* Bir DILIM tarar, sonuclari birikime isler, imleci ilerletir.
   Mini App'i bekletmez — /push turlarinda arka planda cagrilir. */
async function absDilimTara(A,ekKodlar){
  if(!A||!A.VERI)return;
  if(!(await absCalisiyorMu(A)))return;      /* kullanici durdurdu */
  const ayar=await absAyarAl(A);
  const evren=await absEvren(A,ekKodlar);
  if(!evren.length)return;
  let bir=_absBirikimBellek||{ts:0,imlec:0,ayar:null,sonuc:{}};
  if(!_absBirikimBellek){try{const h=await A.VERI.get("absBirikim");if(h)bir=JSON.parse(h)||bir}catch(_){}}
  if(!bir.sonuc||typeof bir.sonuc!=="object")bir.sonuc={};
  /* Olcumler esikten BAGIMSIZ oldugu icin esik degisince artik sifirlama
     YOK — birikim aynen kullanilir, suzgec gosterimde uygulanir. */
  const dilim=await absDilimOku(A);
  const bas=(Number(bir.imlec)||0)%evren.length;
  const kodlar=[];
  for(let i=0;i<dilim;i++)kodlar.push(evren[(bas+i)%evren.length]);
  const t0=Date.now();
  let sira=0,islenen=0,hata=false;
  const isci=async()=>{
    while(sira<kodlar.length){
      if(Date.now()-t0>ABS_SURE_TAVAN_MS)return;
      const kod=kodlar[sira++];
      try{
        const r=await yfMumlar(kod);
        const a=absorpsiyonHesapla(r&&r.veri,ayar);
        /* Esigi gecmese bile KAYDEDILIR — suzgec gosterimde uygulanacak. */
        if(a)bir.sonuc[kod]=Object.assign({kod:kod,ts:Date.now()},a);
        else delete bir.sonuc[kod];        /* veri yetersiz: olculemedi */
        islenen++;
      }catch(_){hata=true}
    }
  };
  try{await Promise.all(Array.from({length:Math.min(ABS_ES,kodlar.length)},isci))}
  catch(_){hata=true}
  if(hata)await absDilimYaz(A,Math.max(ABS_DILIM_TABAN,islenen*0.8));
  else if(islenen>=dilim)await absDilimYaz(A,dilim*1.25);
  bir.imlec=(bas+islenen)%evren.length;
  bir.ts=Date.now();
  bir.evren=evren.length;
  bir.kaynak=evren.kaynak||"";
  /* Kac hisse en az bir kez olculdu — tablo dolarken ilerleme gostergesi.
     Absorpsiyon BULUNMAYAN hisse de olculmustur; ayri set'te tutulur. */
  if(!Array.isArray(bir.gorulen))bir.gorulen=[];
  const gs=new Set(bir.gorulen); for(const k of kodlar)gs.add(k);
  bir.gorulen=[...gs].slice(-1200);
  bir.olculen=bir.gorulen.length;
  /* Bayat olcumleri at: 2 saatten eski sonuc listede kalmasin. */
  const kes=Date.now()-2*ABS_CACHE_MS;
  for(const k of Object.keys(bir.sonuc))if(Number(bir.sonuc[k].ts||0)<kes)delete bir.sonuc[k];
  /* ⚠️ GÜNLÜK KV YAZMA SINIRI — BUGÜN PATLADI.
     Bu satır her /push turunda (yaklaşık 50 saniyede bir) çalışıyordu:
     tek başına günde ~600 yazma. Diğer yazıcılarla birlikte toplam 2000'i
     aştı ve ücretsiz plandaki 1000 sınırı dolunca KV'ye HİÇBİR ŞEY
     yazılamaz oldu — KAP önbelleği, alarm hafızası, absorpsiyon, hepsi
     aynı anda sustu. "KV put() limit exceeded" hatasının kaynağı budur.
     Çözüm: birikim BELLEKTE tutulur, KV'ye en fazla 10 dakikada bir
     yazılır. Worker yeniden başlarsa en fazla 10 dakikalık ölçüm
     tazelenir — kimse fark etmez, ama yazma 600'den ~50'ye iner. */
  _absBirikimBellek=bir;
  const simdiMs=Date.now();
  if(simdiMs-_absBirikimYazma>=ABS_YAZMA_ARALIK){
    _absBirikimYazma=simdiMs;
    await A.VERI.put("absBirikim",JSON.stringify(bir),{expirationTtl:ABS_BIRIKIM_TTL}).catch(()=>{});
  }
  saglikArtir("absTarama");
}
async function absorpsiyonTara(A,ekKodlar){
  const ayar=await absAyarAl(A);
  /* Önbellek anahtarına eşikler işleniyor: yönetici ayarı değiştirince
     eski (belki boş) sonuç değil, anında yeni tarama devreye girer. */
  /* v3: eski 16 hisselik paketler 30 dakika boyunca servis edilip
     "Taranan hisse: 16" yazmaya devam ediyordu. Anahtar degisince o
     paketler bir daha okunamaz. Ayrica artik paket ONBELLEKTEN degil,
     BIRIKIMDEN uretiliyor — tablo tarama ilerledikce dolsun diye. */
  const anahtar="absorpsiyon_v3:"+ayar.hacimEsik+":"+ayar.darlikEsik;
  /* Birikim bossa (ilk acilis, esik degisimi) kullaniciyi bos ekranla
     birakmamak icin hemen bir dilim tara; sonrasi arka planda ilerler. */
  let bir=_absBirikimBellek;
  if(!bir){try{const h=await A.VERI.get("absBirikim");if(h)bir=JSON.parse(h)}catch(_){}}
  if((!bir||!bir.sonuc||!Object.keys(bir.sonuc).length)&&await absCalisiyorMu(A)){
    await absDilimTara(A,ekKodlar).catch(()=>{});
    bir=_absBirikimBellek;
    if(!bir){try{const h=await A.VERI.get("absBirikim");if(h)bir=JSON.parse(h)}catch(_){}}
  }
  const sonuc=(bir&&bir.sonuc)||{};
  const tumu=Object.keys(sonuc).map(k=>sonuc[k]);
  /* SUZGEC BURADA — birikim ham olcumdur, esik anlik uygulanir. */
  const gecen=tumu.filter(x=>{
    if(!(Number(x.hacimKat)>=ayar.hacimEsik))return false;
    if(!(Number(x.darlik)<=ayar.darlikEsik))return false;
    if(Number(ayar.puanEsik)>0&&!(Number(x.puan)>=ayar.puanEsik))return false;
    return true;
  });
  gecen.sort((x,y)=>y.puan-x.puan);
  const evrenN=(bir&&bir.evren)||tumu.length;
  const olculenN=(bir&&bir.olculen)||0;
  const paket={ts:(bir&&bir.ts)||Date.now(),
    evren:evrenN,
    olculen:olculenN,
    kalan:Math.max(0,evrenN-olculenN),
    elenen:Math.max(0,tumu.length-gecen.length),
    cikan:gecen.length,
    taranan:evrenN,                       /* geriye uyum */
    imlec:(bir&&bir.imlec)||0,
    calisiyor:await absCalisiyorMu(A),
    kaynak:(bir&&bir.kaynak)||"",
    liste:gecen.slice(0,60),ayar:ayar};
  /* Paket zaten birikimden anlık üretiliyor; ayrıca KV'ye yazmak
     her açılışta bir yazma daha demekti ve hiçbir işe yaramıyordu. */
  saglikArtir("absTarama");
  return paket;
}

/* ══════════════════════════════════════════════════════════════════════════
   🐂🐻 MAL TOPLAMA/DAĞITIM + 571 AYI/BOĞA MOTORU  —  PINE'DAN BİREBİR PORT
   ══════════════════════════════════════════════════════════════════════════
   KAYNAK DOSYALAR (satır numaraları o dosyalara aittir):
     · "fix borsa kütüphane"  satır 135  → export mal_top_dagit()
     · "fix borsa kütüphane"  satır 1015 → pivots_571()
     · "fix borsa kütüphane"  satır 1026 → export levels_571()
     · "fix borsa 6.2"        satır 1214 → status_func_571()
     · "fix borsa 6.2"        satır 1702 → f_571_status_age()
     · "fix borsa 6.2"        satır 1736 → tf_panel_func()   (TF paneli)
     · "fix borsa 6.2"        satır 1787 → f_mal_scan_motor()
     · "fix borsa 6.2"        satır 1794 → f_mal_boga_scan_motor()
     · "fix borsa 6.2"        satır 1941 → MAL+BOĞA tarama tablosu

   MİLİM AYNILIK İÇİN DİKKAT EDİLENLER:
   1) levels_571 DURUMLUDUR (Pine "var"). pivotsH/pivotsL dizileri, isHighLast,
      startPrice, endPrice, offset barlar arasında TAŞINIR. Bu yüzden motor
      seriyi bar bar, baştan sona, aynı sırayla yürütür — tek barlık kestirme
      hesap YOKTUR.
   2) Pine tarafında her tüketici request.security(..., calc_bars_count=700)
      kullanıyor; yani alt-bağlam yalnızca SON 700 barı hesaplar ve var-state
      oradan taze başlar. Burada da seri slice(-700) ile kırpılır — aynı
      pencere, aynı başlangıç, aynı sonuç.
   3) Pine'da na ile yapılan karşılaştırmalar false döner. ta.lowest(low,10)
      ilk 9 barda, [1] kaydırmasıyla 10. bara kadar na; ta.sma(volume,20)
      19. bara kadar na. Motor bu barları aynen atlar.
   4) ta.barssince hiç true görmediyse na döner; Pine nz(...,9999) / nz(...,0)
      ile sarmalıyor — hangi varsayılan neredeyse birebir korundu.
   5) pivots_571 KENDİ pivot tanımını kullanır (ta.pivothigh DEĞİL): pencere
      içinde KESİN olarak daha yüksek/alçak başka bar yoksa pivottur. Eşitlik
      pivotu bozmaz. Bu tanım harfiyen kopyalandı.

   VERİ IZGARASI — DOĞRULANDI, YEDİ DİLİMDE DE BİREBİR:
   BIST seansı borsa metadata'sına göre 09:30-18:00'dir (10:00 DEĞİL).
   TradingView intraday barları seans açılışına çapalar; Yahoo da aynısını
   yapıyor. Ölçüldü:
     60m → 09:30 10:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 (+18:00 stub)
     15m → 09:30 09:45 10:00 …          5m → 09:30 09:35 09:40 …
   Yani 5DK / 15DK / 1SA barları TradingView ile AYNI ızgaradadır.
   4SA da seans açılışından itibaren 4 saatlik kovalara bölünür
   (09:30-13:30 · 13:30-17:30 · 17:30-…) — TradingView'in 240 dakikalık
   barlarıyla aynı sınırlar. Gruplama SAYARAK değil ZAMANA göre yapılır,
   böylece yarım gün / işlem görmeyen saat gibi eksik barlar kovaları
   kaydıramaz. Sonuç: yedi zaman diliminde de birebir aynı. */

/* Pine: ta.barssince(cond) — son true'dan bu yana kaç bar; hiç yoksa null. */
function mbBarsSince(seri,son){
  for(let k=son;k>=0;k--)if(seri[k])return son-k;
  return null;
}
/* ── kütüphane:135  export mal_top_dagit() ──────────────────────────────
   float prev_low  = ta.lowest(low,10)[1]
   float prev_high = ta.highest(high,10)[1]
   float vol_sma   = ta.sma(volume,20)
   mal_toplama = low<prev_low  and close>open and close>prev_low  and volume>vol_sma and volume>volume[1]
   mal_dagitim = high>prev_high and close<open and close<prev_high and volume>vol_sma and volume<volume[1] */
function mbMalTopDagit(m){
  const n=m.length,mt=new Array(n).fill(false),md=new Array(n).fill(false);
  for(let i=19;i<n;i++){                       /* i<10 → prev na, i<19 → sma na */
    let pl=Infinity,ph=-Infinity;
    for(let k=i-10;k<=i-1;k++){const b=m[k];if(b.low<pl)pl=b.low;if(b.high>ph)ph=b.high}
    let s=0;for(let k=i-19;k<=i;k++)s+=m[k].hacim;
    const vs=s/20,c=m[i],v=c.hacim,v1=m[i-1].hacim;
    mt[i]= c.low<pl  && c.close>c.open && c.close>pl && v>vs && v>v1;
    md[i]= c.high>ph && c.close<c.open && c.close<ph && v>vs && v<v1;
  }
  return[mt,md];
}
/* ── kütüphane:1015  pivots_571(src,length,isHigh) ──────────────────────
   price = nz(src[length]); pencere src[0..length*2] içinde KESİN daha
   yüksek (ya da alçak) bar varsa pivot değildir. */
function mbPivot571(src,zaman,i,uzun,tepeMi){
  if(i<uzun)return null;                        /* Pine: bar_index >= length */
  const fiyat=src[i-uzun];
  if(!isFinite(fiyat))return null;
  for(let j=0;j<=uzun*2;j++){
    const k=i-j;if(k<0)continue;                /* na → karşılaştırma false */
    if(tepeMi?src[k]>fiyat:src[k]<fiyat)return null;
  }
  return{t:zaman[i-uzun],p:fiyat};
}
/* ── kütüphane:1026  export levels_571(depth,lowTh,upTh,rev) ────────────
   Her bar için [doyum, 236, 382, 786, stop, close] üretir. */
function mb571Seri(m,depth,lowTh,upTh,rev){
  const n=m.length,uzun=Math.floor(depth/2);
  const high=m.map(x=>x.high),low=m.map(x=>x.low),zaman=m.map(x=>x.time);
  let pivotsH=[],pivotsL=[],lastH=null,lastL=null;
  let isHighLast=false,startPrice=NaN,endPrice=NaN,offset=NaN,diff=NaN;
  /* ⚡ HIZ: projeksiyon (isHighLast/startPrice/endPrice/offset) YALNIZCA
     pivot dizilerinden hesaplanır — o barın fiyatına hiç bakmaz. Yani
     pivot dizisi değişmediyse sonuç da değişmez. Eskiden her bar dizinin
     tam kopyası alınıp döngü baştan çalışıyordu (700 bar × ~200 pivot).
     Artık yalnız pivot eklendiği/değiştiği barda çalışır — pivotlar 5-15
     barda bir oluştuğu için ~10 kat az iş. SONUÇ BİREBİR AYNI.
     Not: yukarıdaki blok isHighLast'i her bar yazıyor ama orijinalde
     hemen ardından döngü onu ezip yeniden hesaplıyordu; döngüyü atladığımız
     barlarda "yerlesik" değeri geri konur ki davranış aynı kalsın. */
  let yerlesikIHL=false;
  const cikti=new Array(n);
  for(let i=0;i<n;i++){
    let H=mbPivot571(high,zaman,i,uzun,true);
    let L=mbPivot571(low ,zaman,i,uzun,false);
    let degisti=false;
    const cH=pivotsH.length,cL=pivotsL.length;
    if(cH>0&&cL>0){
      lastH=pivotsH[cH-1];lastL=pivotsL[cL-1];
      isHighLast=lastH.t>lastL.t;
      if(isHighLast){if(H){if(H.p>lastH.p){pivotsH[cH-1]=H;degisti=true}H=null}}
      else          {if(L){if(L.p<lastL.p){pivotsL[cL-1]=L;degisti=true}L=null}}
    }
    if(H){pivotsH.push(H);degisti=true}
    if(L){pivotsL.push(L);degisti=true}
    /* PERF FIX (kütüphanedeki yorumun aynısı): son 200 pivot yeter, sonuç
       değişmez — algoritma yalnız en SONDAKİ pivotlardan geriye bakar. */
    if(pivotsH.length>200){pivotsH.shift();degisti=true}
    if(pivotsL.length>200){pivotsL.shift();degisti=true}
    if(!degisti)isHighLast=yerlesikIHL;
    if(degisti&&pivotsH.length>0&&pivotsL.length>0){
      const hc=pivotsH.slice(),lc=pivotsL.slice();
      let kilit=0;
      while(hc.length>0&&lc.length>0){
        /* Pine'ın döngü sayacı yerine güvenlik freni — normalde hiç dolmaz:
           her tur hc ya da lc'den en az bir eleman eksilir. */
        if(++kilit>5000)break;
        lastH=hc.pop();lastL=lc.pop();
        isHighLast=lastH.t>lastL.t;
        let piv=isHighLast?hc:lc;
        for(let k=piv.length-1;k>=0;k--){       /* Pine: size-1 to 0, if i<0 break */
          if(k>=piv.length)break;
          const p=piv[k];
          if(p.t<lastL.t)break;
          const iyi=isHighLast?(p.p>lastH.p):(p.p<lastL.p);
          if(iyi){if(isHighLast)lastH=piv.pop();else lastL=piv.pop()}
          else piv.splice(k,1);
        }
        if(hc.length===0||lc.length===0)break;
        isHighLast=lastH.t>lastL.t;
        piv=isHighLast?hc:lc;
        startPrice=piv[piv.length-1].p;
        if(isHighLast){
          endPrice=lastL.p;
          const dt=Math.abs(startPrice-endPrice);
          if(lastH.p>endPrice+dt*lowTh||lastH.p<endPrice+dt*upTh){lc.push(lastL);continue}
          offset=lastL.p-lastH.p;
        }else{
          endPrice=lastH.p;
          const dt=Math.abs(startPrice-endPrice);
          if(lastL.p<endPrice-dt*lowTh||lastL.p>endPrice-dt*upTh){hc.push(lastH);continue}
          offset=lastH.p-lastL.p;
        }
        offset=(isHighLast?-1:1)*Math.abs(offset);
        break;
      }
      yerlesikIHL=isHighLast;      /* döngü atlanan barlarda buradan okunur */
    }
    diff=(isHighLast?-1:1)*Math.abs(startPrice-endPrice);
    if(isFinite(diff)&&isFinite(endPrice)&&isFinite(offset)){
      const ae=endPrice-offset,s=rev?-1:1;
      cikti[i]={doyum:ae+s*diff*4.236,s236:ae+s*diff*0.236,s382:ae+s*diff*0.382,
                s786:ae+s*diff*0.786,stop:ae+s*diff*0.0,close:m[i].close};
    }else cikti[i]=null;
  }
  return cikti;
}
/* 6.2:1210-1216 — depth_571=10, lowerThreshold=1.0, upperThreshold=0.236, reverse=false */
const MB_DEPTH=10,MB_LOW_TH=1.0,MB_UP_TH=0.236,MB_REV=!1,MB_PENCERE=700;
/* 6.2:1214  status_func_571() → doyum>close ? "BOĞA" : "AYI" */
function mbDurum571Seri(m){
  return mb571Seri(m,MB_DEPTH,MB_LOW_TH,MB_UP_TH,MB_REV)
    .map(x=>(x&&isFinite(x.doyum)&&isFinite(x.close))?(x.doyum>x.close?"BOĞA":"AYI"):null);
}
/* ── kütüphane:3200  ⚛ LATENT ENERGY REACTOR (enz_run + enz_scan) ──────
   Pine'daki sıkışma-zonu motorunun birebir çevirisi. Fiyat dar bir bantta
   sıkışırken "gizli enerji" birikir; bant kırılınca hareket başlar.
   Pine ile aynı olması için üç ince nokta korundu:
     · ta.atr(14) RMA'dır, SMA değil — ilk 14 barda seed, sonrası yumuşatma
     · zon YALNIZCA barsIn tam olarak minBars'a EŞİT olduğu barda doğar
       (>= değil; öyle olsaydı her barda yeni zon açılırdı)
     · ağır hesaplar (ağırlık merkezi, ret sayıları, kurumsal iz) Pine'da
       da sadece son barda çalışır — tarama için zaten yalnız o lazım */
const EZ_MINBARS=8, EZ_ATRMULT=2.5;
/* Pine ta.atr(14) — TR ilk barda high-low, sonra RMA (alpha=1/14) */
function mbATR(m,n){
  const out=new Array(m.length);let toplam=0,onceki=null;
  for(let i=0;i<m.length;i++){
    const tr=i===0?(m[0].high-m[0].low):
      Math.max(m[i].high-m[i].low,Math.abs(m[i].high-m[i-1].close),Math.abs(m[i].low-m[i-1].close));
    if(i<n-1){toplam+=tr;out[i]=null;continue}
    if(i===n-1){toplam+=tr;onceki=toplam/n;out[i]=onceki;continue}
    onceki=(onceki*(n-1)+tr)/n;out[i]=onceki;
  }
  return out;
}
/* Pine ta.sma(volume,20) — ilk 19 barda na */
function mbHacimSMA(m,n){
  const out=new Array(m.length);let s=0;
  for(let i=0;i<m.length;i++){
    s+=m[i].hacim||0;
    if(i>=n)s-=m[i-n].hacim||0;
    out[i]=i>=n-1?s/n:null;
  }
  return out;
}
function ezEnerji(dur,rngH,atr){
  if(!(rngH>0)||!(atr>0)||!(dur>0))return 0;
  const comp=Math.min((atr/rngH)*50,40);
  const tsc=Math.min(dur*2,35);
  const mat=dur>=30?15:dur>=20?10:dur>=15?5:0;
  const tight=rngH<atr*0.5?10:rngH<atr*0.75?5:0;
  return Math.min(Math.max(comp+tsc+mat+tight,5),100);
}
function ezEvre(dur){return dur<10?"Forming":dur<25?"Growth":dur<50?"Mature":"Exhaustion"}
/* _enz_gravity + _enz_touches + _enz_inst + _enz_direction + _enz_quality —
   Pine'da hepsi tek bir "son bar" bloğunda çalışır, burada da öyle.
   cBar: aktif zon için son bar, kırılmış zon için zonun bittiği bar. */
function ezAgirOlc(m,avol,z,cBar){
  const rngH=z.top-z.bottom,tol=rngH*0.1;
  const lb=Math.min(cBar-z.startBar,500);
  let sw=0,sv=0,tt=0,tb=0,ac=0,tv=0;
  const av=avol[cBar];
  for(let k=0;k<lb;k++){
    const c=m[cBar-k];
    const mp=(c.high+c.low+c.close)/3;
    if(mp<=z.top&&mp>=z.bottom){sw+=mp*(c.hacim||0);sv+=(c.hacim||0)}
    if(c.high>=z.top-tol&&c.high<=z.top+tol&&c.close<c.high-tol)tt++;
    if(c.low>=z.bottom-tol&&c.low<=z.bottom+tol&&c.close>c.low+tol)tb++;
    if(c.high<=z.top&&c.low>=z.bottom&&av!==null&&(c.hacim||0)>av*2){ac++;tv+=(c.hacim||0)}
  }
  z.gravityCenter=sv>0?sw/sv:(z.top+z.bottom)/2;
  z.touchesTop=tt;z.touchesBottom=tb;
  const ar=lb>0?ac/lb*100:0,vi=(av>0&&ac>0)?tv/(av*ac):0;
  z.instFootprint=Math.min(ar*0.5+Math.min(vi*10,50),100);
  const mid=(z.top+z.bottom)/2;
  const gb=(z.gravityCenter-mid)/(rngH/2);
  const tbv=(tt>0||tb>0)?(tb-tt)/Math.max(tt+tb,1):0;
  const cb=gb*0.6+tbv*0.4;
  z.direction=cb>0.1?"Bullish":cb<-0.1?"Bearish":"Neutral";
  z.dirConfidence=Math.min(Math.abs(cb)*100+50,100);
  z.breakoutQuality=ezKalite(z.energy,z.instFootprint,z.phase,z.dirConfidence);
}
function ezKalite(e,inst,ev,guv){
  const ps=ev==="Forming"?20:ev==="Growth"?50:ev==="Mature"?80:60;
  return Math.min((e||0)*0.3+(inst||0)*0.25+ps*0.25+(guv||0)*0.2,100);
}
function mbEnerjiMotor(m,minBars,atrMult){
  const n=m.length;if(n<25)return null;
  minBars=minBars||EZ_MINBARS;atrMult=atrMult||EZ_ATRMULT;
  const atr=mbATR(m,14),avol=mbHacimSMA(m,20),son=n-1;
  let zones=[],aktif=null,rHigh=null,rLow=null,rStart=0,barsIn=0;
  for(let i=0;i<n;i++){
    const a=atr[i],b=m[i];
    let lkH=null,lkL=null;
    if(i>=4){lkH=-Infinity;lkL=Infinity;
      for(let k=i-4;k<=i;k++){if(m[k].high>lkH)lkH=m[k].high;if(m[k].low<lkL)lkL=m[k].low}}
    const sikisma=(lkH!==null&&a!==null&&(lkH-lkL)<a*atrMult);
    let kirUp=!1,kirDn=!1;
    /* 1) kırılım — geçen barın aktif zonuna göre */
    if(aktif&&aktif.isActive&&a!==null){
      if(b.close>aktif.top){
        kirUp=!0;aktif.isActive=!1;aktif.isBroken=!0;aktif.breakDir="Bullish";aktif.endBar=i;
        const rsk=aktif.top-(aktif.bottom-a*0.5);
        aktif.entryPrice=aktif.top;aktif.slPrice=aktif.bottom-a*0.5;
        aktif.tp1Price=aktif.top+rsk;aktif.tp2Price=aktif.top+rsk*1.5;aktif.tp3Price=aktif.top+rsk*2;
      }else if(b.close<aktif.bottom){
        kirDn=!0;aktif.isActive=!1;aktif.isBroken=!0;aktif.breakDir="Bearish";aktif.endBar=i;
        const rsk2=(aktif.top+a*0.5)-aktif.bottom;
        aktif.entryPrice=aktif.bottom;aktif.slPrice=aktif.top+a*0.5;
        aktif.tp1Price=aktif.bottom-rsk2;aktif.tp2Price=aktif.bottom-rsk2*1.5;aktif.tp3Price=aktif.bottom-rsk2*2;
      }
    }
    /* 2) bant birikimi */
    if(sikisma){
      if(rHigh===null){rHigh=lkH;rLow=lkL;rStart=i-4;barsIn=5}
      else if(b.high<=rHigh+a*0.1&&b.low>=rLow-a*0.1){
        rHigh=Math.max(rHigh,b.high);rLow=Math.min(rLow,b.low);barsIn++;
      }else{rHigh=null;rLow=null;barsIn=0}
    }else{rHigh=null;rLow=null;barsIn=0}
    /* 3) yeni zon — barsIn TAM minBars olduğu barda, bir kez */
    if(barsIn===minBars&&rHigh!==null){
      const z={startBar:rStart,endBar:i,top:rHigh,bottom:rLow,isActive:!0,isBroken:!1,
        breakDir:"",touchesTop:0,touchesBottom:0,energy:null,phase:"",direction:"",
        dirConfidence:null,breakoutQuality:null,gravityCenter:null,instFootprint:null,
        entryPrice:null,slPrice:null,tp1Price:null,tp2Price:null,tp3Price:null};
      if(aktif&&aktif.isActive)aktif.isActive=!1;
      aktif=z;zones.push(z);while(zones.length>10)zones.shift();
    }
    /* 4) aktif zonu güncelle */
    if(aktif&&aktif.isActive&&!kirUp&&!kirDn){
      const dur=i-aktif.startBar,rngH=aktif.top-aktif.bottom,tol=rngH*0.1;
      if(b.high<=aktif.top+tol&&b.low>=aktif.bottom-tol){
        aktif.endBar=i;
        aktif.energy=ezEnerji(dur,rngH,a);
        aktif.phase=ezEvre(dur);
        if(i===son)ezAgirOlc(m,avol,aktif,i);   /* Pine: yalnız last_bar_index */
      }
    }
  }
  /* ⚠️ PINE'DAN AYRILAN TEK NOKTA — bilerek:
     Pine ağır ölçüleri yalnız AKTİF zon için ve yalnız son barda yapar;
     zon kırıldıysa güç/kalite/kurumsal iz alanları boş (na) kalır. Bu,
     "0B kırdı VE kalitesi ≥60" gibi bir süzgeci imkânsız kılıyordu.
     Kırılmış zon için aynı hesaplar zonun KENDİ ömrü üzerinden (startBar →
     endBar) yapılır. Aktif zon yolu bir satır bile değişmedi, dolayısıyla
     TradingView'in gösterdiği hiçbir sayı bundan etkilenmez; yalnız orada
     boş kalan yere sayı gelir. */
  if(aktif&&!aktif.isActive&&aktif.isBroken&&aktif.breakoutQuality===null&&
     aktif.endBar>aktif.startBar){
    if(aktif.energy===null)aktif.energy=ezEnerji(aktif.endBar-aktif.startBar,
      aktif.top-aktif.bottom,atr[aktif.endBar]);
    if(!aktif.phase)aktif.phase=ezEvre(aktif.endBar-aktif.startBar);
    ezAgirOlc(m,avol,aktif,aktif.endBar);
  }
  return{aktif:aktif,zones:zones,atr:atr[son]};
}
/* kütüphane:3420  export enz_scan — sembol başına skaler özet */
const EZ_Y2=v=>(v===null||v===undefined||!isFinite(v))?null:Math.round(v*100)/100;
const EZ_Y1=v=>(v===null||v===undefined||!isFinite(v))?null:Math.round(v*10)/10;
function mbEnerjiTara(m){
  const bos={ezAct:0,ezIns:0,ezAge:9999,ezTop:null,ezBot:null,ezEn:null,ezBq:null,
             ezDir:0,ezMes:null,ezTp1:null,ezEvre:"",ezInst:null,ezUst:0};
  let r=null;
  try{r=mbEnerjiMotor(m,EZ_MINBARS,EZ_ATRMULT)}catch(_){return bos}
  if(!r||!r.aktif)return bos;
  const z=r.aktif,son=m.length-1,kap=m[son].close;
  const o={ezAct:0,ezIns:0,ezAge:9999,ezTop:EZ_Y2(z.top),ezBot:EZ_Y2(z.bottom),
           ezEn:EZ_Y1(z.energy),ezBq:EZ_Y1(z.breakoutQuality),
           ezInst:EZ_Y1(z.instFootprint),
           ezDir:z.direction==="Bullish"?1:z.direction==="Bearish"?-1:0,
           /* 🐞 MESAFENİN YÖNÜ — Pine _mes'i mutlak değer verdiği için
              "üst çizgiyi %2,8 GEÇTİ" ile "üst çizgiye %2,8 KALDI" aynı
              sayıya düşüyordu; ekranda ikisi de "kaldı" gibi okunuyordu.
              Sayı Pine ile aynı kalır (süzgeç bozulmasın), yönü ezUst söyler. */
           ezUst:(kap>z.top?1:0),
           ezMes:null,ezTp1:null,ezEvre:z.phase||""};
  if(z.isActive){o.ezAct=1;if(kap<=z.top&&kap>=z.bottom)o.ezIns=1}
  if(z.isBroken&&z.breakDir==="Bullish")o.ezAge=son-z.endBar;
  if(z.tp1Price!==null&&isFinite(z.tp1Price))o.ezTp1=EZ_Y2(z.tp1Price);
  else if(isFinite(r.atr))o.ezTp1=EZ_Y2(z.top+(z.top-(z.bottom-r.atr*0.5)));
  if(z.top!==null&&kap>0)o.ezMes=EZ_Y2(Math.abs(z.top-kap)/kap*100);
  return o;
}

/* ── 6.2:1787 f_mal_scan_motor + 6.2:1794 f_mal_boga_scan_motor +
      6.2:1736 tf_panel_func  →  hepsi tek geçişte ────────────────────── */
function mbMotor(mumlar){
  if(!mumlar||mumlar.length<25)return null;
  const m=mumlar.slice(-MB_PENCERE);            /* calc_bars_count=700 */
  if(m.length<25)return null;
  const son=m.length-1;
  const[mtS,mdS]=mbMalTopDagit(m);
  const st=mbDurum571Seri(m);
  const lv=mb571Seri(m,MB_DEPTH,MB_LOW_TH,MB_UP_TH,MB_REV)[son];

  /* f_mal_scan_motor: yaş 5 barı geçtiyse 9999 sayılır (tarama penceresi) */
  const topHam=mbBarsSince(mtS,son),dagHam=mbBarsSince(mdS,son);
  const top_raw=topHam===null?9999:topHam,dag_raw=dagHam===null?9999:dagHam;
  const top_yas=top_raw<=5?top_raw:9999,dag_yas=dag_raw<=5?dag_raw:9999;

  /* f_571_status_age: degisti = st != st[1]; age = nz(ta.barssince(degisti),0)
     Bar 0'da st[1]=na; iki na eşit sayılır → degisti=false.
     Hiç değişim yoksa barssince na → nz ile 0. */
  const degisti=st.map((v,i)=>v!==(i===0?null:st[i-1]));
  const ageBs=mbBarsSince(degisti,son);
  const rej_yas=ageBs===null?0:ageBs;
  const rej_scan_yas=rej_yas<=5?rej_yas:9999;

  const rej=st[son],onceki=son>0?st[son-1]:null;
  const boga=rej==="BOĞA";
  const ayi=rej!==null&&!boga;                  /* FIX v96c: bilinmiyorsa AYI sayma */
  const boga_gec=boga&&!(onceki==="BOĞA");
  const ayi_gec=ayi&&(onceki==="BOĞA");
  const mt=mtS[son],md=mdS[son];
  const son_yas=Math.min(Math.min(top_yas,dag_yas),rej_scan_yas);

  const mal_txt=mt?"TOP☀ 0B":md?"DAĞ☀ 0B":(top_yas<=dag_yas?"TOP "+top_yas+"B":"DAĞ "+dag_yas+"B");
  const gec_txt=boga_gec?"BOĞA 0B":ayi_gec?"AYI 0B":((boga?"BOĞA ":ayi?"AYI ":"? ")+rej_yas+"B");
  const son_txt=mt?"BUGÜN TOP":md?"BUGÜN DAĞ":boga_gec?"BUGÜN BOĞA":ayi_gec?"BUGÜN AYI":"DEVAM";

  /* tf_panel_func: durum 1=toplama(yeşil) -1=dağıtım(kırmızı) 0=yok */
  let durum=0,yas=9999;
  if(topHam!==null||dagHam!==null){
    const tj=topHam===null?999999:topHam,dj=dagHam===null?999999:dagHam;
    if(tj<=dj){durum=1;yas=tj}else{durum=-1;yas=dj}
  }
  /* 6.2:2565 dip koşulu — dip taraması / formasyon ile BİREBİR AYNI:
     stop(0.0) < close < 786  VE  doyum > close */
  const dip=!!(lv&&isFinite(lv.stop)&&isFinite(lv.s236)&&isFinite(lv.s786)&&
    isFinite(lv.close)&&isFinite(lv.doyum)&&lv.stop<lv.close&&lv.close<lv.s786&&lv.doyum>lv.close);

  /* 6.2:1430 DİP TARAMA kademeli: aynı dip bölgesi içinde fiyat 382'nin ya
     da 236'nın altına sarkmışsa daha derindedir. */
  const dip382=!!(dip&&isFinite(lv.s382)&&lv.close<lv.s382);
  const dip236=!!(dip&&isFinite(lv.s236)&&lv.close<lv.s236);
  /* MERDİVENDEKİ KONUM — fiyat 0.0 çizgisinden kaç "birim" yukarıda.
     Birim, Pine'daki _diff ile aynı: (786 çizgisi − 0.0 çizgisi) / 0.786.
     Bölge taraması bu tek sayıdan türetilir; 0.618 = BOĞA, 1.0 = KARAR
     YERİ, 1.618 = DİRENÇ, 2.618 = GÜÇLÜ D/D çizgileri. */
  let oran=null;
  if(lv&&isFinite(lv.stop)&&isFinite(lv.s786)&&isFinite(lv.close)&&lv.s786!==lv.stop)
    oran=Math.round(((lv.close-lv.stop)/((lv.s786-lv.stop)/0.786))*1000)/1000;
  /* ⚛ enerji kırılımı — Pine enz_scan ile birebir */
  const ez=mbEnerjiTara(m);
  return{bar:m.length,mt:mt,md:md,dip382:dip382,dip236:dip236,oran:oran,
    ezAct:ez.ezAct,ezIns:ez.ezIns,ezAge:ez.ezAge,ezTop:ez.ezTop,ezBot:ez.ezBot,
    ezEn:ez.ezEn,ezBq:ez.ezBq,ezInst:ez.ezInst,ezUst:ez.ezUst,
    ezDir:ez.ezDir,ezMes:ez.ezMes,ezTp1:ez.ezTp1,ezEvre:ez.ezEvre,
    top:top_yas,dag:dag_yas,topHam:top_raw,dagHam:dag_raw,
    boga:boga,ayi:ayi,bogaGec:boga_gec,ayiGec:ayi_gec,
    rej:rej,rejYas:rej_yas,sonYas:son_yas,
    malTxt:mal_txt,gecTxt:gec_txt,sonTxt:son_txt,
    durum:durum,yas:yas,dip:dip,
    doyum:lv&&isFinite(lv.doyum)?Math.round(lv.doyum*100)/100:null,
    stop:lv&&isFinite(lv.stop)?Math.round(lv.stop*100)/100:null,
    s786:lv&&isFinite(lv.s786)?Math.round(lv.s786*100)/100:null,
    s382:lv&&isFinite(lv.s382)?Math.round(lv.s382*100)/100:null,
    s236:lv&&isFinite(lv.s236)?Math.round(lv.s236*100)/100:null,
    /* Yalnız GÖSTERİM için yuvarlanır; motorun içindeki bütün karşılaştırmalar
       ham kapanışla yapıldı — sonuç etkilenmez. */
    fiyat:Math.round(m[son].close*100)/100,zaman:m[son].time};
}

/* ── ZAMAN DİLİMLERİ ───────────────────────────────────────────────────
   grupSaat → 4SA saatlik barlardan türetilir (aynı Yahoo çekimini 1SA ile
   paylaşır, alt-istek bütçesi yarıya iner). */
const MB_TF={
  "5DK" :{ad:"5 dakika", ik:"⚡", interval:"5m",  range:"1mo"},
  "15DK":{ad:"15 dakika",ik:"⏱",  interval:"15m", range:"1mo"},
  "1SA" :{ad:"1 saat",   ik:"🕐", interval:"60m", range:"2y"},
  "4SA" :{ad:"4 saat",   ik:"🕓", interval:"60m", range:"2y", grupSaat:4},
  "1G"  :{ad:"1 gün",    ik:"🗓",  interval:"1d",  range:"5y",  hayaletAt:!0},
  "1HAF":{ad:"1 hafta",  ik:"📅", interval:"1wk", range:"max", hayaletAt:!0},
  "1AY" :{ad:"1 ay",     ik:"🗂",  interval:"1mo", range:"max", hayaletAt:!0}
};
const MB_TF_LISTE=["5DK","15DK","1SA","4SA","1G","1HAF","1AY"];
/* ── HAYALET BAR ── Yahoo, borsanın KAPALI olduğu günler için de bar
   üretiyor: hacim 0 ve O=H=L=C (fiyat kıpırdamamış, çünkü işlem yok).
   TradingView'de böyle bir bar YOKTUR — tatil günü grafikte atlanır.
   Bu dolgu barları hem bar sayımını kaydırıyor hem de ta.highest/lowest
   pencerelerini bozup olmayan sinyal üretiyordu (GARAN günlükte 2026-05-27
   /28/29 tatili yüzünden sahte bir MAL DAĞITIMI çıkıyordu).
   YALNIZ gün ve üstü dilimlerde uygulanır: gün-içi düz bar, seansın
   gerçekten işlem görmeyen bir aralığıdır ve TradingView onu gösterir. */
const mbHayaletAt=m=>m.filter(b=>b.hacim>0||b.high!==b.low);
const mbTfNormal=t=>MB_TF[t]?t:"1G";
/* Seans açılışının gün içi saniyesi — VERİDEN türetilir, hiçbir yere
   09:30 yazılmaz. Her günün en erken barı bulunur, bunların EN SIK olanı
   seans açılışıdır (tek bir tuhaf gün sonucu kaydırmasın diye mod alınır). */
function mbSeansBasi(mumlar){
  const gunEnErken={};
  for(const b of mumlar){
    const ist=b.time+10800,gun=Math.floor(ist/86400),gi=ist%86400;
    if(gunEnErken[gun]===undefined||gi<gunEnErken[gun])gunEnErken[gun]=gi;
  }
  const sayim={};let enIyi=null,enCok=0;
  for(const g in gunEnErken){
    const v=gunEnErken[g];sayim[v]=(sayim[v]||0)+1;
    if(sayim[v]>enCok){enCok=sayim[v];enIyi=v}
  }
  return enIyi===null?0:Number(enIyi);
}
/* 4 saatlik bar — TradingView ile AYNI sınırlar: seans açılışından itibaren
   4 saatlik kovalar (09:30-13:30 · 13:30-17:30 · 17:30-…).
   Sayarak değil ZAMANA göre kova hesaplanır: bir saatlik bar eksik olsa
   (yarım gün, hiç işlem görmemiş saat) bile kovalar kaymaz. */
function mbGrupla(mumlar,saat){
  if(!(saat>1)||!mumlar.length)return mumlar;
  const pencere=saat*3600,seans=mbSeansBasi(mumlar);
  const out=[];let anahtar=null,c=null;
  for(const b of mumlar){
    const ist=b.time+10800;
    const k=Math.floor(ist/86400)+"|"+Math.floor(((ist%86400)-seans)/pencere);
    if(k!==anahtar){
      anahtar=k;
      c={time:b.time,open:b.open,high:b.high,low:b.low,close:b.close,hacim:b.hacim};
      out.push(c);
    }else{
      c.high=Math.max(c.high,b.high);c.low=Math.min(c.low,b.low);
      c.close=b.close;c.hacim+=b.hacim;
    }
  }
  return out;
}
/* Tek hisse + tek dilim ölçümü. onbellek: aynı turda 1SA ve 4SA tek
   saatlik çekimi paylaşsın diye (alt-istek bütçesi yarıya iner). */
async function mbOlc(kod,tfKod,onbellek){
  const tf=MB_TF[mbTfNormal(tfKod)];
  const ck=tf.interval+"|"+tf.range;
  let ham=onbellek&&onbellek[ck];
  if(!ham){
    const r=await yfMumlar(kod,tf.interval,tf.range);
    ham=(r&&r.veri)||[];
    if(onbellek)onbellek[ck]=ham;
  }
  if(!ham.length)return null;
  const temiz=tf.hayaletAt?mbHayaletAt(ham):ham;
  const m=tf.grupSaat?mbGrupla(temiz,tf.grupSaat):temiz;
  const s=mbMotor(m);
  if(!s)return null;
  s.kod=kod;s.tf=mbTfNormal(tfKod);
  return s;
}
/* Tek hisse — TÜM zaman dilimleri (Pine'daki TF panelinin karşılığı). */
async function mbTekHisse(kod){
  const onbellek={},satir=[];
  for(const t of MB_TF_LISTE){
    try{const s=await mbOlc(kod,t,onbellek);satir.push(s||{kod:kod,tf:t,yok:!0})}
    catch(_){satir.push({kod:kod,tf:t,yok:!0})}
  }
  return{kod:kod,ts:Date.now(),satir:satir};
}

/* Mal+Ayı/Boğa da absorpsiyonla AYNI tam evreni kullanır — tek kaynak
   (bkz. tamEvren). Böylece 121 sınırı iki tarafta birden kalktı. */
async function mbEvren(A,ekKodlar){return tamEvren(A,ekKodlar)}

/* ═══════════════════ 🧪 DİP BACKTEST — yalnız yönetici görür ═══════════════
   Soru: "dip / derin dip (382 altı) / en dip (236 altı)" sinyalleri fiilen
   ne kadar işe yarıyor? Ve asıl soru: BİRDEN ÇOK ZAMAN DİLİMİ AYNI ANDA
   dipteyken başarı yükseliyor mu — yükseliyorsa ne kadar?

   HEDEFLER (571 fibo merdiveninden, TradingView'deki etiketlerin aynısı):
     TP1 = GÜÇLÜ D/D        → 2.618 uzantısı
     TP2 = ÇOK GÜÇLÜ D/D    → 3.618 uzantısı
     stop = 0.0 çizgisi ("DİKKAT AYI") altına KAPANIŞ
   Doyum noktası (4.236) hedef olarak kullanılmaz — çok uzakta kalıyor,
   ölçümü anlamsızlaştırıyordu. Yine de raporda mesafesi gösterilir.

   Kapanışla değerlendirilir (fitil sayılmaz). Dip formülü mbMotor ile
   BİREBİR AYNI — tek fark: mbMotor yalnız son barı üretir, burada her bar. */
const DBT_UFUK=200;                 /* TP'ye ulaşma için ileri taranacak azami bar */
/* ⚡ HIZ AYARLARI — ölçüm: sürenin %93'ü Yahoo çekimi, %7'si hesap.
   Yani hız = eşzamanlı çekim sayısı. Bir adımda 24 hisse × en çok 3 ayrı
   çekim = 72 alt-istek; Cloudflare ücretli planın 1000 sınırının çok
   altında, ücretsiz planın 50 sınırını aşar (o durumda DBT_ADIM_BOYUT'u
   12'ye çek). */
const DBT_ES=10;                    /* aynı anda kaç hisse çekilsin */
const DBT_SEVIYE=["dip","dip382","dip236"];
const DBT_SEVIYE_AD={dip:"dip bölgesi",dip382:"derin dip",dip236:"en dip"};
/* Fibo merdiveni — Pine'daki _lvls/_lbl_t dizileriyle aynı oranlar */
const DBT_TP1_ORAN=2.618, DBT_TP2_ORAN=3.618, DBT_DOYUM_ORAN=4.236;
/* STOP ÇİZGİSİ — 0.0'ın kaç birim ALTI. Merdivende 0.0'ın altındaki
   çizgiler de "D/D" etiketli: -0.236 / -0.382 / -0.618 / -0.786.
   ÖLÇÜLDÜ (30 hisse · 4 dilim · 3069 giriş, TP1 sabit):
     0.0    → ort +0.5% · kazanan %23 · stop %75
     -0.236 → ort +0.9% · kazanan %30 · stop %65
     -0.382 → ort +0.9% · kazanan %35 · stop %59
     -0.618 → ort +1.3% · kazanan %40 · stop %50
     -0.786 → ort +1.7% · kazanan %44 · stop %43
   0.0 çizgisi normal dalgalanmanın İÇİNDE kalıyor, giriş daha nefes
   almadan stop oluyordu. -0.382 orta yol: kazanan oranı %23'ten %35'e
   çıkıyor, risk hâlâ tanımlı. Değeri değiştirip yeniden koşabilirsin. */
const DBT_STOP_ORAN=0.382;
/* Zaman dilimi büyüklük sırası — "üst dilim uyumu" bunu kullanır */
const DBT_TF_SIRA={"5DK":1,"15DK":2,"1SA":3,"4SA":4,"1G":5,"1HAF":6,"1AY":7};

function dbtSeriUret(mumlar){
  if(!mumlar||mumlar.length<30)return null;
  const m=mumlar.slice(-MB_PENCERE);
  const uzun=Math.floor(MB_DEPTH/2);
  const lv=mb571Seri(m,MB_DEPTH,MB_LOW_TH,MB_UP_TH,MB_REV);
  const out=new Array(m.length);
  for(let i=0;i<m.length;i++){
    const x=lv[i];
    if(!x||i<uzun||!isFinite(x.stop)||!isFinite(x.s236)||!isFinite(x.s382)||
       !isFinite(x.s786)||!isFinite(x.close)||!isFinite(x.doyum)){out[i]=null;continue}
    const dip=x.stop<x.close&&x.close<x.s786&&x.doyum>x.close;
    /* Merdivenin birim adımı: 0.0 ile 0.786 arasındaki mesafeden türetilir
       (Pine'da _diff = (s786 - s0)/0.786 ile birebir aynı). */
    const birim=(x.s786-x.stop)/0.786;
    out[i]={time:m[i].time,close:x.close,stop:x.stop,s236:x.s236,s382:x.s382,s786:x.s786,
      doyum:x.doyum,
      birim:birim,
      tp1:x.stop+birim*DBT_TP1_ORAN,      /* GÜÇLÜ D/D */
      tp2:x.stop+birim*DBT_TP2_ORAN,      /* ÇOK GÜÇLÜ D/D */
      dip:!!dip,dip382:!!(dip&&x.close<x.s382),dip236:!!(dip&&x.close<x.s236)};
  }
  return out;
}
/* Bir barın dip derinliği: 0 yok · 1 dip · 2 derin · 3 en dip */
const dbtDerinlik=b=>!b?0:(b.dip236?3:b.dip382?2:b.dip?1:0);

/* Her seviye için false→true geçişi = "yeni giriş". Aynı dip bölgesinde
   kaldığı sürece tekrar sayılmaz — yoksa aynı sinyal onlarca kez girer. */
function dbtGirisleriBul(seri,seviyeler){
  const cikti=[];
  for(const sv of (seviyeler&&seviyeler.length?seviyeler:DBT_SEVIYE)){
    let onceki=!1;
    for(let i=0;i<seri.length;i++){
      const b=seri[i],su=!!(b&&b[sv]);
      if(su&&!onceki)cikti.push({i:i,seviye:sv,time:b.time});
      onceki=su;
    }
  }
  return cikti;
}
/* Bir girişin ileriye dönük sonucu.
   GERÇEKLEŞEN GETİRİ tek bir kurala göre hesaplanır — raporun can damarı:
     · önce TP1'e değdiyse   → TP1'de çık
     · önce stop'a düştüyse  → stop barında çık
     · ikisi de olmadıysa    → ufuk sonunda çık
   Böylece her giriş TEK bir sayıya iner, ortalaması da "bu kurulumu her
   seferinde alsaydım ortalama ne kazanırdım" sorusunun cevabı olur. */
function dbtSonucOlc(seri,girisIdx){
  const b0=seri[girisIdx];if(!b0)return null;
  const giris=b0.close,tp1=b0.tp1,tp2=b0.tp2;
  const stopSev=b0.stop-b0.birim*DBT_STOP_ORAN;   /* 0.0'ın DBT_STOP_ORAN kadar altı */
  let tp1Bar=null,tp2Bar=null,stopBar=null,enYuksek=0;
  let gerceklesen=null,cikisTip=null,cikisBar=null;
  const son=Math.min(seri.length-1,girisIdx+DBT_UFUK);
  for(let j=girisIdx+1;j<=son;j++){
    const b=seri[j];if(!b||!isFinite(b.close))continue;
    const getiri=100*(b.close/giris-1);
    if(getiri>enYuksek)enYuksek=getiri;
    if(tp1Bar===null&&b.close>=tp1){tp1Bar=j-girisIdx;
      if(gerceklesen===null){gerceklesen=getiri;cikisTip="tp1";cikisBar=tp1Bar}}
    if(tp2Bar===null&&b.close>=tp2)tp2Bar=j-girisIdx;
    if(stopBar===null&&b.close<stopSev){stopBar=j-girisIdx;
      if(gerceklesen===null){gerceklesen=getiri;cikisTip="stop";cikisBar=stopBar}}
    if(gerceklesen!==null&&tp2Bar!==null)break;
  }
  const ufukGetiri=son>girisIdx&&seri[son]?100*(seri[son].close/giris-1):0;
  if(gerceklesen===null){gerceklesen=ufukGetiri;cikisTip="ufuk";cikisBar=son-girisIdx}
  return{giris:giris,tp1:tp1,tp2:tp2,stop:stopSev,
    tp1Uzak:100*(tp1/giris-1),tp2Uzak:100*(tp2/giris-1),
    doyumUzak:100*(b0.doyum/giris-1),stopUzak:100*(stopSev/giris-1),
    tp1Bar:tp1Bar,tp2Bar:tp2Bar,stopBar:stopBar,
    gerceklesen:gerceklesen,cikisTip:cikisTip,cikisBar:cikisBar,
    enYuksekGetiri:enYuksek,ufukGetiri:ufukGetiri};
}
/* Havuz × seçili dilimler: her hisse için her dilimin serisini çıkarır,
   girişleri bulur, sonuçları ölçer ve GİRİŞ ANINDA diğer seçili
   dilimlerin dip durumunu ("uyum") kaydeder.

   ⚡ İki hız düzeltmesi:
   1) Aynı hissenin farklı dilimleri AYNI ANDA çekilir; aynı interval+range
      birden fazla dilimde geçiyorsa (1SA ve 4SA ikisi de 60m) tek çekilir.
   2) Uyum aramasında her giriş için diğer serinin başından taranıyordu
      (giriş sayısı × 700 bar). Girişler zaman sırasında olduğu için artık
      dilim başına tek bir İMLEÇ ileri kaydırılıyor — toplam maliyet
      giriş sayısı + bar sayısı. */
async function dbtKosu(kodlar,dilimler,seviyeler){
  const tumSonuclar=[],semboller=[];
  const ES=DBT_ES;let sira=0;
  const isci=async()=>{
    while(sira<kodlar.length){
      const kod=kodlar[sira++];
      try{
        const ckListe=[],ckGorulen={};
        for(const t of dilimler){
          const tf=MB_TF[mbTfNormal(t)],ck=tf.interval+"|"+tf.range;
          if(!ckGorulen[ck]){ckGorulen[ck]=!0;ckListe.push({ck:ck,interval:tf.interval,range:tf.range})}
        }
        const onbellek={};
        await Promise.all(ckListe.map(async x=>{
          const r=await yfMumlar(kod,x.interval,x.range);
          onbellek[x.ck]=(r&&r.veri)||[];
        }));
        const serilerTf={};
        for(const t of dilimler){
          const tf=MB_TF[mbTfNormal(t)],ck=tf.interval+"|"+tf.range;
          const ham=onbellek[ck]||[];
          if(!ham.length){serilerTf[t]=null;continue}
          const temiz=tf.hayaletAt?mbHayaletAt(ham):ham;
          const m=tf.grupSaat?mbGrupla(temiz,tf.grupSaat):temiz;
          serilerTf[t]=dbtSeriUret(m);
        }
        let hisseGiris=0;
        for(const t of dilimler){
          const seri=serilerTf[t];if(!seri)continue;
          const girisler=dbtGirisleriBul(seri,seviyeler);
          /* Girişler seviye seviye üretildiği için zamanı sıfırlanıyor;
             imleç tekniği için tek sıraya dizip zamana göre sıralıyoruz. */
          girisler.sort((a,b)=>a.time-b.time);
          const imlec={};for(const t2 of dilimler)imlec[t2]=-1;
          for(const gi of girisler){
            const sonuc=dbtSonucOlc(seri,gi.i);if(!sonuc)continue;
            let uyumSayisi=0,ustUyum=0,derinUyum=0;const uyumDetay=[];
            for(const t2 of dilimler){
              if(t2===t)continue;
              const seri2=serilerTf[t2];
              let k=imlec[t2];
              if(seri2){
                while(k+1<seri2.length&&seri2[k+1]&&seri2[k+1].time<=gi.time)k++;
                /* null barları atlarken imleci bozma: yalnız ilerlet */
                while(k+1<seri2.length&&!seri2[k+1])k++;
                imlec[t2]=k;
              }
              const b2=(seri2&&k>=0)?seri2[k]:null;
              const durum=dbtDerinlik(b2);
              if(durum>0){
                uyumSayisi++;
                if((DBT_TF_SIRA[t2]||0)>(DBT_TF_SIRA[t]||0))ustUyum++;
                if(durum>=2)derinUyum++;
              }
              uyumDetay.push({tf:t2,durum:durum});
            }
            tumSonuclar.push(Object.assign({kod:kod,tf:t,seviye:gi.seviye,time:gi.time,
              uyumSayisi:uyumSayisi,ustUyum:ustUyum,derinUyum:derinUyum,
              uyumDetay:uyumDetay},sonuc));
            hisseGiris++;
          }
        }
        semboller.push({kod:kod,giris:hisseGiris});
      }catch(e){semboller.push({kod:kod,hata:String((e&&e.message)||e)})}
    }
  };
  await Promise.all(Array.from({length:Math.min(ES,kodlar.length)},isci));
  return{sonuclar:tumSonuclar,semboller:semboller};
}
/* Rapor özeti. Tek karar sayısı: ORTALAMA GERÇEKLEŞEN GETİRİ.
   "Bu kurulumu her gördüğümde alsaydım, ortalama ne kazanırdım?"
   TP1 isabet oranı tek başına yanıltıcı (isabet yüksek ama stoplar büyükse
   sistem yine zarar ettirir), o yüzden sıralama hep bu sayıya göre. */
function dbtGrupOlc(liste){
  const n=liste.length;if(!n)return null;
  const ort=a=>a.length?a.reduce((s,v)=>s+v,0)/a.length:null;
  const tp1=liste.filter(x=>x.tp1Bar!==null);
  const tp2=liste.filter(x=>x.tp2Bar!==null);
  const stop=liste.filter(x=>x.cikisTip==="stop");
  const kazanan=liste.filter(x=>x.gerceklesen>0);
  return{n:n,
    tp1Oran:100*tp1.length/n, tp2Oran:100*tp2.length/n, stopOran:100*stop.length/n,
    basariOran:100*kazanan.length/n,
    ortGetiri:ort(liste.map(x=>x.gerceklesen)),          /* ← ana sayı */
    ortBar:ort(liste.map(x=>x.cikisBar)),
    tp1OrtBar:ort(tp1.map(x=>x.tp1Bar)),
    ortTp1Uzak:ort(liste.map(x=>x.tp1Uzak)),
    ortTp2Uzak:ort(liste.map(x=>x.tp2Uzak)),
    ortDoyumUzak:ort(liste.map(x=>x.doyumUzak)),
    ortStopUzak:ort(liste.map(x=>x.stopUzak)),
    ortEnYuksek:ort(liste.map(x=>x.enYuksekGetiri))};
}
const DBT_ASGARI=25;   /* bu sayının altındaki gruplar "az örnek" sayılır */

function dbtOzetle(sonuclar){
  const grupla=(anahtarFn)=>{
    const g={};for(const x of sonuclar){const k=anahtarFn(x);if(k===null)continue;(g[k]=g[k]||[]).push(x)}
    return g;
  };
  /* 1) dilim × seviye */
  const g1=grupla(x=>x.tf+"|"+x.seviye);
  const temel=Object.keys(g1).map(k=>{
    const [tf,seviye]=k.split("|");
    return Object.assign({tf:tf,seviye:seviye},dbtGrupOlc(g1[k]));
  }).sort((a,b)=>b.ortGetiri-a.ortGetiri);
  /* 2) UYUM — kaç dilim aynı anda dipte (asıl soru) */
  const g2=grupla(x=>String(x.uyumSayisi));
  const uyum=Object.keys(g2).map(k=>Object.assign({uyum:Number(k)},dbtGrupOlc(g2[k])))
    .sort((a,b)=>a.uyum-b.uyum);
  /* 3) ÜST DİLİM UYUMU — girişin dilimindEN BÜYÜK dilimler de dipte mi */
  const g3=grupla(x=>String(x.ustUyum));
  const ust=Object.keys(g3).map(k=>Object.assign({ust:Number(k)},dbtGrupOlc(g3[k])))
    .sort((a,b)=>a.ust-b.ust);
  /* 4) tam kombinasyon: dilim × seviye × uyum — "en iyi kurulum" buradan */
  const g4=grupla(x=>x.tf+"|"+x.seviye+"|"+x.uyumSayisi);
  const kombo=Object.keys(g4).map(k=>{
    const [tf,seviye,u]=k.split("|");
    return Object.assign({tf:tf,seviye:seviye,uyum:Number(u)},dbtGrupOlc(g4[k]));
  }).filter(r=>r.n>=DBT_ASGARI).sort((a,b)=>b.ortGetiri-a.ortGetiri);
  /* 5) genel */
  const genel=dbtGrupOlc(sonuclar);
  /* 6) uyumun etkisi tek cümlede: 0 uyum vs en yüksek uyum */
  let uyumEtki=null;
  const u0=uyum.filter(r=>r.uyum===0)[0];
  const uMax=uyum.filter(r=>r.n>=DBT_ASGARI).slice(-1)[0];
  if(u0&&uMax&&uMax.uyum>0)
    uyumEtki={dusuk:u0,yuksek:uMax,fark:uMax.ortGetiri-u0.ortGetiri,
      katsayi:u0.ortGetiri!==0?uMax.ortGetiri/Math.abs(u0.ortGetiri):null};
  return{genel:genel,temel:temel,uyum:uyum,ust:ust,kombo:kombo,uyumEtki:uyumEtki,
    enIyi:kombo[0]||null};
}
const DBT_STIL='<style>body{margin:0;background:#0d1117;color:#e6edf3;font:14px/1.5 system-ui,-apple-system,sans-serif;padding:16px 14px 60px}h1{font-size:19px;margin:0 0 6px}h2{font-size:15px;margin:22px 0 8px;color:#8b949e}.a{color:#8b949e;font-size:13px}table{border-collapse:collapse;width:100%;margin-top:6px;font-size:13px}th,td{padding:6px 8px;text-align:right;border-bottom:1px solid #21262d;white-space:nowrap}th{color:#8b949e;font-weight:600;text-align:right}td:first-child,th:first-child{text-align:left}.iy{color:#3fb950}.kt{color:#f85149}input,textarea,button{background:#161b22;border:1px solid #272e37;color:#e6edf3;border-radius:8px;padding:9px 10px;font-size:14px;box-sizing:border-box}textarea{width:100%;min-height:70px}button{background:#388bfd;border:none;font-weight:700;cursor:pointer;margin-top:10px}label{display:block;margin-top:12px;font-size:13px;color:#8b949e}.wrap{overflow-x:auto}.kur{background:#22171a;border:1px solid #6b2b2b;border-radius:12px;padding:13px;margin-top:12px}</style>';
const DBT_ADIM_BOYUT=24;              /* her "adım" isteğinde kaç hisse (10→24: adım sayısı yarıdan aza indi) */
async function dbtIsOku(A){
  if(!A.VERI)return null;
  try{const j=await A.VERI.get("dbtIs");return j?JSON.parse(j):null}catch(_){return null}
}
async function dbtIsYaz(A,job){
  if(!A.VERI)return;
  try{await A.VERI.put("dbtIs",JSON.stringify(job),{expirationTtl:86400})}catch(_){}
}
function dbtIlerlemeHTML(anahtar){
  return '<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Dip Backtest — tüm hisseler</title>'+DBT_STIL+'</head><body>'+
  '<h1>🧪 Dip Backtest — tüm hisseler taranıyor</h1>'+
  '<div class="kur" style="border-color:#272e37;background:#161b22"><div id="ilerYazi" class="a">başlıyor…</div>'+
  '<div style="background:#0d1117;border:1px solid #272e37;border-radius:8px;height:14px;margin-top:8px;overflow:hidden">'+
  '<div id="ilerBar" style="background:#388bfd;height:100%;width:0%"></div></div></div>'+
  '<div class="a" style="margin-top:10px">Bu sayfayı açık bırak — bitince otomatik olarak sonuç raporuna geçecek. Sekmeyi kapatırsan iş KV üzerinde kalmaya devam eder, /dipbacktest/rapor adresinden sonradan bakabilirsin.</div>'+
  '<script>'+
  'var key='+JSON.stringify(anahtar||'')+';'+
  'function adim(){fetch("/dipbacktest/adim?key="+encodeURIComponent(key)).then(function(r){return r.json()}).then(function(v){'+
  'if(!v||!v.ok){document.getElementById("ilerYazi").textContent="hata — sayfayı yenile";return}'+
  'var pct=v.toplam?Math.round(100*v.tamam/v.toplam):0;'+
  'document.getElementById("ilerBar").style.width=pct+"%";'+
  'document.getElementById("ilerYazi").textContent=v.tamam+" / "+v.toplam+" hisse tarandı ("+pct+"%)"+(v.toplamGiris?" · "+v.toplamGiris+" giriş bulundu":"");'+
  'if(v.tamamlandi){location.href="/dipbacktest/rapor?key="+encodeURIComponent(key)}else{setTimeout(adim,250)}'+
  '}).catch(function(){setTimeout(adim,2000)})}'+
  'adim();'+
  '</script></body></html>';
}

function dbtFormHTML(anahtar,kod,tf,is){
  const seviyeKutu=(deger,etiket)=>'<label style="display:inline-flex;align-items:center;gap:6px;margin:6px 12px 0 0;font-size:13px;color:#e6edf3"><input type="checkbox" name="sv" value="'+deger+'" checked style="width:auto">'+etiket+'</label>';
  let devamKutu='';
  if(is&&!is.tamamlandi&&is.toplam)
    devamKutu='<div class="kur" style="border-color:#1f6feb;background:#0d1b2e"><b>⏳ Sürmekte olan tam-havuz taraması var</b><div class="a" style="margin-top:4px">'+is.tamam+' / '+is.toplam+' hisse tarandı.</div>'+
      '<a class="a" style="color:#388bfd;display:inline-block;margin-top:6px" href="/dipbacktest/rapor?key='+encodeURIComponent(anahtar||'')+'">→ ilerlemeyi / şu ana kadarki sonucu aç</a></div>';
  else if(is&&is.tamamlandi)
    devamKutu='<div class="a" style="margin-top:10px">Son tam-havuz taraması bitti (' +is.tamam+' hisse). <a href="/dipbacktest/rapor?key='+encodeURIComponent(anahtar||'')+'" style="color:#388bfd">sonucu aç</a></div>';
  return '<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Dip Backtest</title>'+DBT_STIL+'</head><body>'+
  '<h1>🧪 Dip Backtest</h1><div class="a">571 sisteminin dip / derin dip (382 altı) / en dip (236 altı) sinyallerini geçmişe dönük ölçer. Hedefler fibo merdiveninden: <b>TP1 = GÜÇLÜ D/D (2.618)</b>, <b>TP2 = ÇOK GÜÇLÜ D/D (3.618)</b>. Doyum noktası (4.236) hedef olarak kullanılmaz — çok uzakta kalıyor. Bu sayfayı yalnız sen görebiliyorsun.</div>'+
  devamKutu+
  '<form method="get" action="/dipbacktest">'+
  '<input type="hidden" name="key" value="'+(anahtar||'').replace(/"/g,'')+'">'+
  '<label>Dip modelleri</label>'+
  seviyeKutu('dip','⬇️ Dip bölgesi')+seviyeKutu('dip382','⬇️⬇️ Derin (382 altı)')+seviyeKutu('dip236','⬇️⬇️⬇️ En dip (236 altı)')+
  '<label>Zaman dilimleri (virgülle)</label><input name="tf" value="'+(tf||'15DK,1SA,4SA,1G')+'" style="width:100%">'+
  '<label style="display:flex;align-items:center;gap:8px;margin-top:14px"><input type="checkbox" name="evren" value="1" style="width:auto">🌍 <b>Sistemde kayıtlı tüm hisseler</b> (430+, havuzun tamamı — birkaç dakika sürer, arka planda parça parça taranır)</label>'+
  '<label>Hisse kodları (yukarıdaki kutu işaretliyse bu alan yok sayılır; boş bırakırsan havuzdan ilk 25 alınır, virgülle ayır)</label>'+
  '<textarea name="kod" placeholder="THYAO, ASELS, GARAN...">'+(kod||'')+'</textarea>'+
  '<input type="hidden" name="git" value="1"><button type="submit">▶ Çalıştır</button></form>'+
  '<div class="a" style="margin-top:10px">"Tüm hisseler" işaretli değilse: Cloudflare alt-istek bütçesi yüzünden tek istekte azami 40 hisse × seçilen dilim taranır.</div>'+
  '</body></html>';
}
function dbtSayi(v,ondalik){return v===null||v===undefined||!isFinite(v)?'—':v.toFixed(ondalik===undefined?1:ondalik)}
function dbtYuzde(v,ond){return v===null||v===undefined||!isFinite(v)?'—':(v>0?'+':'')+v.toFixed(ond===undefined?1:ond)+'%'}
function dbtRenk(v,esik){return v===null||!isFinite(v)?'':(v>=(esik===undefined?0:esik)?' class="iy"':' class="kt"')}
function dbtSvAd(s){return DBT_SEVIYE_AD[s]||s}
/* Ortalama getiriye göre 0-100 arası bir çubuk — göz tek bakışta sıralasın */
function dbtCubuk(v,enBuyuk){
  const g=Math.max(0,Math.min(1,(v||0)/(enBuyuk||1)));
  return '<div style="background:#21262d;border-radius:3px;height:6px;width:70px;display:inline-block;vertical-align:middle;overflow:hidden">'+
    '<div style="background:'+(v>=0?'#3fb950':'#f85149')+';height:100%;width:'+(g*100).toFixed(0)+'%"></div></div>';
}
function dbtRaporHTML(o){
  const z=o.ozet||{};
  const g=z.genel||{};
  /* ── başlık kartı: ne ölçüldü ── */
  const aciklama='<div class="kur" style="border-color:#272e37;background:#161b22">'+
    '<b>Ne ölçüldü?</b><div class="a" style="margin-top:5px;line-height:1.7">'+
    '<b>Giriş</b> — fiyatın dip bölgesine <i>ilk girdiği</i> bar (kapanış). Bölgede kaldığı sürece tekrar sayılmaz.<br>'+
    '<b>TP1</b> — GÜÇLÜ D/D çizgisi (fibo 2.618) · <b>TP2</b> — ÇOK GÜÇLÜ D/D çizgisi (3.618)<br>'+
    '<b>Stop</b> — 0.0 çizgisinin <b>'+DBT_STOP_ORAN+' birim altına</b> kapanış (0.0 = "DİKKAT AYI"). '+
    'Tam 0.0 çizgisi normal dalgalanmanın içinde kaldığı için giriş nefes almadan stop oluyordu.<br>'+
    '<b>Gerçekleşen getiri</b> — önce TP1 geldiyse orada, önce stop geldiyse orada, hiçbiri gelmediyse '+DBT_UFUK+'. barda çıkılmış sayılır. Tablolardaki <b>ort. getiri</b> bunun ortalamasıdır: '+
    '<i>"bu kurulumu her gördüğümde alsaydım ortalama ne kazanırdım"</i>.</div></div>';
  /* ── en iyi kurulum ── */
  let enIyiHtml='';
  if(z.enIyi){
    const e=z.enIyi;
    enIyiHtml='<div class="kur" style="border-color:#238636;background:#0f2016">'+
      '<div style="font-size:16px;font-weight:700;margin-bottom:4px">⭐ En iyi kurulum</div>'+
      '<div style="font-size:15px"><b>'+e.tf+'</b> · '+dbtSvAd(e.seviye)+' · <b>'+e.uyum+' dilim uyumlu</b></div>'+
      '<div class="a" style="margin-top:6px;line-height:1.8">'+
      e.n+' giriş · ortalama <b class="iy">'+dbtYuzde(e.ortGetiri)+'</b> · '+
      'kazançla biten %'+dbtSayi(e.basariOran,0)+'<br>'+
      'TP1 isabet %'+dbtSayi(e.tp1Oran,0)+' (ort. '+dbtSayi(e.tp1OrtBar,0)+' bar) · '+
      'stop %'+dbtSayi(e.stopOran,0)+' · ort. çıkış '+dbtSayi(e.ortBar,0)+' bar</div></div>';
  }
  /* ── uyum etkisi: tek cümle ── */
  let etkiHtml='';
  if(z.uyumEtki){
    const u=z.uyumEtki;
    etkiHtml='<div class="kur" style="border-color:#1f6feb;background:#0d1b2e">'+
      '<b>🔗 Uyumun etkisi</b><div class="a" style="margin-top:5px;line-height:1.7">'+
      'Hiçbir dilim uyumlu değilken ortalama <b'+dbtRenk(u.dusuk.ortGetiri)+'>'+dbtYuzde(u.dusuk.ortGetiri)+'</b> ('+u.dusuk.n+' giriş)<br>'+
      '<b>'+u.yuksek.uyum+' dilim</b> aynı anda dipteyken ortalama <b'+dbtRenk(u.yuksek.ortGetiri)+'>'+dbtYuzde(u.yuksek.ortGetiri)+'</b> ('+u.yuksek.n+' giriş)<br>'+
      '<b>Fark: '+dbtYuzde(u.fark)+'</b></div></div>';
  }
  /* ── uyum tablosu ── */
  const uyumEn=Math.max(...(z.uyum||[]).map(r=>r.ortGetiri||0),0.01);
  const uyumHtml=(z.uyum||[]).map(r=>
    '<tr><td><b>'+r.uyum+' dilim</b></td><td>'+r.n+'</td>'+
    '<td'+dbtRenk(r.ortGetiri)+'><b>'+dbtYuzde(r.ortGetiri)+'</b> '+dbtCubuk(r.ortGetiri,uyumEn)+'</td>'+
    '<td>%'+dbtSayi(r.basariOran,0)+'</td><td>%'+dbtSayi(r.tp1Oran,0)+'</td>'+
    '<td>%'+dbtSayi(r.stopOran,0)+'</td><td>'+dbtSayi(r.ortBar,0)+'</td>'+
    (r.n<DBT_ASGARI?'<td class="a">az örnek</td>':'<td></td>')+'</tr>').join('');
  /* ── üst dilim uyumu ── */
  const ustHtml=(z.ust||[]).map(r=>
    '<tr><td><b>'+r.ust+' üst dilim</b></td><td>'+r.n+'</td>'+
    '<td'+dbtRenk(r.ortGetiri)+'><b>'+dbtYuzde(r.ortGetiri)+'</b></td>'+
    '<td>%'+dbtSayi(r.basariOran,0)+'</td><td>%'+dbtSayi(r.tp1Oran,0)+'</td>'+
    '<td>%'+dbtSayi(r.stopOran,0)+'</td>'+
    (r.n<DBT_ASGARI?'<td class="a">az örnek</td>':'<td></td>')+'</tr>').join('');
  /* ── kombinasyon sıralaması (ilk 20) ── */
  const komboEn=Math.max(...(z.kombo||[]).map(r=>r.ortGetiri||0),0.01);
  const komboHtml=(z.kombo||[]).slice(0,20).map((r,i)=>
    '<tr><td>'+(i+1)+'. <b>'+r.tf+'</b> · '+dbtSvAd(r.seviye)+' · uyum '+r.uyum+'</td>'+
    '<td>'+r.n+'</td><td'+dbtRenk(r.ortGetiri)+'><b>'+dbtYuzde(r.ortGetiri)+'</b> '+dbtCubuk(r.ortGetiri,komboEn)+'</td>'+
    '<td>%'+dbtSayi(r.basariOran,0)+'</td><td>%'+dbtSayi(r.tp1Oran,0)+'</td>'+
    '<td>%'+dbtSayi(r.stopOran,0)+'</td><td>'+dbtSayi(r.ortBar,0)+'</td></tr>').join('');
  /* ── dilim × seviye ── */
  const temelHtml=(z.temel||[]).map(r=>
    '<tr><td><b>'+r.tf+'</b> · '+dbtSvAd(r.seviye)+'</td><td>'+r.n+'</td>'+
    '<td'+dbtRenk(r.ortGetiri)+'><b>'+dbtYuzde(r.ortGetiri)+'</b></td>'+
    '<td>%'+dbtSayi(r.basariOran,0)+'</td><td>%'+dbtSayi(r.tp1Oran,0)+'</td>'+
    '<td>%'+dbtSayi(r.stopOran,0)+'</td><td>'+dbtYuzde(r.ortTp1Uzak,0)+'</td>'+
    '<td>'+dbtYuzde(r.ortStopUzak,0)+'</td><td>'+dbtYuzde(r.ortDoyumUzak,0)+'</td></tr>').join('');
  const semHtml=(o.semboller||[]).filter(s=>s.hata).map(s=>s.kod).join(', ');
  return '<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Dip Backtest sonuçları</title>'+DBT_STIL+'</head><body>'+
  '<h1>🧪 Dip Backtest sonuçları</h1>'+
  '<div class="a">'+o.kodlar.length+' hisse · '+o.dilimler.join(' · ')+' · <b>'+o.toplamGiris+'</b> giriş · '+o.sure+' sn</div>'+
  (g.n?'<div class="a" style="margin-top:3px">Genel ortalama: <b'+dbtRenk(g.ortGetiri)+'>'+dbtYuzde(g.ortGetiri)+'</b>'+
      ' · kazançla biten %'+dbtSayi(g.basariOran,0)+' · TP1 %'+dbtSayi(g.tp1Oran,0)+' · stop %'+dbtSayi(g.stopOran,0)+'</div>':'')+
  enIyiHtml+etkiHtml+
  '<h2>🔗 Kaç dilim aynı anda dipteydi?</h2>'+
  '<div class="a">Asıl soru bu: uyum arttıkça sonuç düzeliyor mu? Satırlar aşağı indikçe getiri yükseliyorsa uyum işe yarıyor demektir.</div>'+
  '<div class="wrap"><table><tr><th>uyum</th><th>giriş</th><th>ort. getiri</th><th>kazanan</th><th>TP1</th><th>stop</th><th>ort. bar</th><th></th></tr>'+uyumHtml+'</table></div>'+
  '<h2>⬆️ Üst dilimler de dipte miydi?</h2>'+
  '<div class="a">Girişin diliminden BÜYÜK kaç dilim aynı anda dipteydi (ör. 1SA girişinde 4SA ve 1G).</div>'+
  '<div class="wrap"><table><tr><th>üst uyum</th><th>giriş</th><th>ort. getiri</th><th>kazanan</th><th>TP1</th><th>stop</th><th></th></tr>'+ustHtml+'</table></div>'+
  '<h2>🏆 En iyi 20 kurulum</h2>'+
  '<div class="a">dilim × dip derinliği × uyum — en az '+DBT_ASGARI+' giriş olanlar, ortalama getiriye göre.</div>'+
  '<div class="wrap"><table><tr><th>kurulum</th><th>giriş</th><th>ort. getiri</th><th>kazanan</th><th>TP1</th><th>stop</th><th>ort. bar</th></tr>'+komboHtml+'</table></div>'+
  '<h2>📋 Dilim × dip derinliği</h2>'+
  '<div class="wrap"><table><tr><th>kurulum</th><th>giriş</th><th>ort. getiri</th><th>kazanan</th><th>TP1</th><th>stop</th><th>TP1 uzaklık</th><th>stop uzaklık</th><th>doyum uzaklık</th></tr>'+temelHtml+'</table></div>'+
  (semHtml?'<h2>⚠️ Veri alınamayan hisseler</h2><div class="a">'+semHtml+'</div>':'')+
  '<div class="a" style="margin-top:16px"><a href="/dipbacktest?key='+encodeURIComponent(o.anahtar||'')+'" style="color:#388bfd">← yeni koşum</a></div>'+
  '</body></html>';
}

/* ═══════════════ 🟢 YEŞİL KAPANIŞ ARAŞTIRMASI ═══════════════════════════
   Soru: hisse hangi zaman diliminde fibo merdiveninin hangi basamak
   aralığındayken ertesi günü YEŞİL kapatıyor?

   KURULUM — ileriye bakma YOK:
     · Durum, D gününün barı AÇILMADAN önceki son barlardan okunur.
     · Sonuç iki türlü ölçülür:
         GÜN İÇİ        : açılışta al, kapanışta sat  (= "yeşil mum")
         KAPANIŞ→KAPANIŞ: kapanışta al, ertesi kapanışta sat (geceyi de alır)

   AŞIRI UYDURMAYA KARŞI DÖRT BÖLME:
   Yüzlerce kombinasyon denenince rastgele veride bile parlak sonuç çıkar.
   Bu yüzden her kombinasyon DÖRT bağımsız bölmede birden sınanır:
     zaman: eski yarı / yeni yarı   (rejim değişince de tutuyor mu?)
     hisse: tek sıra / çift sıra    (birkaç hisseye mi özgü?)
   Dördünde de TABANI geçmeyen kurulum gürültü sayılır ve listeye girmez.
   Taban = o bölmedeki genel yeşil oranı; kaldıraç = kurulum − taban.

   ÖLÇEK: 430 hisse × ~450 gün = ~190 bin gözlem. Ham gözlemi saklamak KV'yi
   patlatırdı; onun yerine kombinasyon × bölme başına SAYAÇ biriktirilir
   (175 kombinasyon × 5 bölme = 875 sayaç, birkaç KB). */
const YK_LV=[-0.786,-0.618,-0.382,-0.236,0.0,0.236,0.382,0.5,0.618,0.786,1.0,1.272,1.618,2.618,3.618,4.236];
const YK_AD=["D/D-786","D/D-618","D/D-382","D/D-236","DİKKAT AYI","D/D236","D/D382","Hazırlık",
  "BOĞA","ZAYIF D/D","KARAR YERİ","KÜÇÜK DİRENÇ","DİRENÇ","GÜÇLÜ D/D","ÇOK GÜÇLÜ D/D","DOYUM"];
/* 🪜 DÜZELTME (Ağustos 2026): bu dört ad/sınır artık MB_BOLGE (satır ~6457,
   uygulamadaki "SEVİYE BÖLGESİ" taraması) ile BİREBİR aynı — 0-0.618 /
   0.618-1 / 1-1.618 / 1.618-2.618. Eskiden burada ayrı (0/0.786/1.618)
   sınırlar vardı; yani backtest'in ölçtüğü "bölge" ile ekranda gördüğün
   SEVİYE BÖLGESİ FARKLI şeylerdi. Artık ykBolge() doğrudan mbBolgeBul()'u
   çağırıyor — tek kaynak, iki yerde de aynı sonuç. */
const YK_BOLGE_AD=["DİKKAT AYI → BOĞA","BOĞA → KARAR YERİ","KARAR YERİ → DİRENÇ","DİRENÇ → GÜÇLÜ D/D"];
const YK_DILIM=["1SA","4SA","1G"];      /* 15DK/5DK: yalnız 60 gün veri, dışarıda */
const YK_PENCERE=4000;                  /* backtest için geniş pencere (canlı tarama 700 kullanır) */
const YK_ASGARI=40;                     /* bir bölmede en az kaç gözlem */
const YK_KALDIRAC=0.5;                  /* tabanı en az bu kadar geçmeli (yüzde puan) */

function ykBant(o){if(!isFinite(o))return null;for(let i=0;i<YK_LV.length;i++)if(o<YK_LV[i])return i;return YK_LV.length}
function ykBantAd(b){return b===null?"?":b===0?"< "+YK_AD[0]:b===YK_LV.length?"> "+YK_AD[15]:YK_AD[b-1]+" → "+YK_AD[b]}
/* mbBolgeBul (satır ~6463) MB_BOLGE dizisinde arar ve dörtten birine denk
   gelmezse (0.0 altı ya da 2.618 üstü) null döner — canlı taramanın
   davranışıyla birebir. Burada da aynı kural: dışında kalan gözlem hiçbir
   "Z|" kombinasyonuna girmez (aşağıda ykEslesenler bunu atlar). */
function ykBolge(o){if(!isFinite(o))return null;const b=mbBolgeBul(o);return b?MB_BOLGE.indexOf(b):null}
/* Her bar için merdivendeki konum (0.0 çizgisinden kaç birim yukarıda) */
function ykOranSeri(m){
  const s=m.slice(-YK_PENCERE);
  const lv=mb571Seri(s,MB_DEPTH,MB_LOW_TH,MB_UP_TH,MB_REV);
  const out=new Array(s.length);
  for(let i=0;i<s.length;i++){
    const x=lv[i];
    if(!x||!isFinite(x.stop)||!isFinite(x.s786)||x.s786===x.stop){out[i]=null;continue}
    out[i]={time:s[i].time,oran:(x.close-x.stop)/((x.s786-x.stop)/0.786)};
  }
  return out;
}
/* Kombinasyon listesi — hepsi tek yerde tanımlı, rapor da bunu kullanır. */
function ykKombinasyonlar(){
  const c=[];
  for(const t of YK_DILIM)for(let b=0;b<=YK_LV.length;b++)
    c.push({id:"B|"+t+"|"+b,ad:t+" · "+ykBantAd(b),tur:"bant"});
  for(const t of YK_DILIM)for(let z=0;z<4;z++)
    c.push({id:"Z|"+t+"|"+z,ad:t+" · "+YK_BOLGE_AD[z],tur:"bölge"});
  for(let i=0;i<YK_DILIM.length;i++)for(let j=i+1;j<YK_DILIM.length;j++)
    for(let z1=0;z1<4;z1++)for(let z2=0;z2<4;z2++)
      c.push({id:"P|"+YK_DILIM[i]+"|"+z1+"|"+YK_DILIM[j]+"|"+z2,
        ad:YK_DILIM[i]+" ["+YK_BOLGE_AD[z1]+"] + "+YK_DILIM[j]+" ["+YK_BOLGE_AD[z2]+"]",tur:"ikili"});
  for(let z1=0;z1<4;z1++)for(let z2=0;z2<4;z2++)for(let z3=0;z3<4;z3++)
    c.push({id:"U|"+z1+"|"+z2+"|"+z3,
      ad:"1SA ["+YK_BOLGE_AD[z1]+"] + 4SA ["+YK_BOLGE_AD[z2]+"] + 1G ["+YK_BOLGE_AD[z3]+"]",tur:"üçlü"});
  return c;
}
/* Bir gözlemin hangi kombinasyonlara girdiği */
function ykEslesenler(d){
  const out=[];
  for(const t of YK_DILIM){
    out.push("B|"+t+"|"+d[t].bant);
    if(d[t].bolge!==null)out.push("Z|"+t+"|"+d[t].bolge);   /* dışında ise atla */
  }
  for(let i=0;i<YK_DILIM.length;i++)for(let j=i+1;j<YK_DILIM.length;j++){
    const z1=d[YK_DILIM[i]].bolge,z2=d[YK_DILIM[j]].bolge;
    if(z1!==null&&z2!==null)out.push("P|"+YK_DILIM[i]+"|"+z1+"|"+YK_DILIM[j]+"|"+z2);
  }
  const z1=d["1SA"].bolge,z2=d["4SA"].bolge,z3=d["1G"].bolge;
  if(z1!==null&&z2!==null&&z3!==null)out.push("U|"+z1+"|"+z2+"|"+z3);
  return out;
}
/* Boş sayaç kabı. bolme: 0 genel · 1 zaman-eski · 2 zaman-yeni · 3 hisse-tek · 4 hisse-çift */
/* 🐞 DÜZELTİLEN ÇÖKME — sayaçlar DİZİ idi ve yalnız 0-4 indisleri
   doluyordu (seyrek dizi). JSON'a yazılıp geri okununca boşluklar null
   OLARAK geliyor; birleştirme sırasında null.n okunmaya çalışılınca
   istek çöküyordu. Rapor üretilirken patladığı için ekran boşalıyordu.
   Nesne kullanmak bu sınıf hatayı kökten kaldırır. */
function ykSayacYeni(){return{taban:{},komb:{}}}
/* YK_ALANLAR — sayaç kutusundaki tüm sayısal alanlar. Birleştirme (KV'den
   parça toplama, isolate'ler arası birleşim) hep bu listeyi döner; yeni bir
   alan eklenince yalnız burada tanımlanması yeterli.
     n3   → 3-bar-ileri ölçümü olan gözlem sayısı (son 3 bar eksiksizse dolar)
     m3S  → 3 bar içinde ulaşılan AZAMİ %'lerin toplamı (ortalama = m3S/n3)
     y3   → sonraki 3 barın ÜÇÜ DE yeşil kapandığı gözlem sayısı
     k3   → sonraki 3 barın ÜÇÜ DE kırmızı kapandığı gözlem sayısı
     g3T  → 3 bar sonraki kapanış getirisinin toplamı (toplam getiri) */
const YK_ALANLAR=["n","gY","gT","kN","kY","kT","n3","m3S","y3","k3","g3T","h1","h2","h3"];
function ykSayacEkle(S,anahtar,bolmeler,yesilG,getiriG,yesilK,getiriK,ileri3){
  const kutu=(hedef,b)=>{
    if(!hedef[b])hedef[b]={n:0,gY:0,gT:0,kN:0,kY:0,kT:0,n3:0,m3S:0,y3:0,k3:0,g3T:0,h1:0,h2:0,h3:0};
    return hedef[b];
  };
  const ekleIleri=(kut)=>{
    if(!ileri3)return;
    kut.n3++;kut.m3S+=ileri3.max3;kut.g3T+=ileri3.getiri3;
    if(ileri3.yesil3)kut.y3++;
    if(ileri3.kirmizi3)kut.k3++;
    if(ileri3.max3>=1)kut.h1++;
    if(ileri3.max3>=2)kut.h2++;
    if(ileri3.max3>=3)kut.h3++;
  };
  for(const b of bolmeler){
    const t=kutu(S.taban,b);
    t.n++;if(yesilG)t.gY++;t.gT+=getiriG;
    if(getiriK!==null){t.kN++;if(yesilK)t.kY++;t.kT+=getiriK}
    ekleIleri(t);
  }
  for(const a of anahtar){
    if(!S.komb[a])S.komb[a]={};
    for(const b of bolmeler){
      const c=kutu(S.komb[a],b);
      c.n++;if(yesilG)c.gY++;c.gT+=getiriG;
      if(getiriK!==null){c.kN++;if(yesilK)c.kY++;c.kT+=getiriK}
      ekleIleri(c);
    }
  }
}
function ykSayacBirlestir(A,B){
  if(!B)return A;
  if(!A.taban)A.taban={};if(!A.komb)A.komb={};
  const kat=(h,k)=>{
    if(!k)return;
    for(const b in k){
      const kay=k[b];
      if(!kay)continue;                       /* JSON'dan gelen null boşluk */
      if(!h[b])h[b]={n:0,gY:0,gT:0,kN:0,kY:0,kT:0,n3:0,m3S:0,y3:0,k3:0,g3T:0,h1:0,h2:0,h3:0};
      for(const alan of YK_ALANLAR)
        h[b][alan]+=Number(kay[alan])||0;
    }
  };
  kat(A.taban,B.taban);
  for(const a in B.komb){if(!A.komb[a])A.komb[a]={};kat(A.komb[a],B.komb[a])}
  return A;
}
/* 🐞 DÜZELTME (Ağustos 2026) — "434 hisse, 0 hisse-günü, 318 çekim hatası":
   DBT_ES(10) eşzamanlı hisse × 2 farklı Yahoo isteği = her anda ~20 istek
   birden gidiyordu. Yahoo bu kadar yoğun ardışık isteği kısa sürede
   engellemeye/geciktirmeye başlıyor (Cloudflare Workers'ın paylaşımlı IP
   havuzundan geldiği için özellikle savunmasız). Çözüm üç parçalı:
     1) Bu tarama için DBT_ES yerine daha düşük özel bir eşzamanlılık (YK_ES).
     2) Her "işçi" aynı anda değil, hafif kademeli (stagger) başlar.
     3) Bir hisse için HİÇ veri gelmezse (iki dilim de boş) — genelde geçici
        engel demektir — kısa bir bekleme sonrası TEK SEFER yeniden denenir.
   Bu üçü Yahoo'ya giden anlık yükü düşürür, geçici engelleri toparlar. */
const YK_ES=4;
function ykBekle(ms){return new Promise(r=>setTimeout(r,ms))}
/* 🩺 TEŞHİS EKİ: önceki iki düzeltme (kademeli başlangıç + tek seferlik
   yeniden deneme) sorunu çözmedi — hâlâ "0 hisse-günü" ve üstelik daha HIZLI
   bitiyor. Bu, ağır bir ipucu: gerçek hata muhtemelen Yahoo'nun ağır ağır
   engellemesi değil, ANINDA patlayan bir şey (örn. Cloudflare'in "50 alt-
   istek" sınırı ya da kod içinde başka bir istisna). Kör kör yama yapmak
   yerine artık İLK hatayı olduğu gibi 🩺 Hatalar sekmesine (hataYaz) yazıyoruz
   — bir sonraki denemede gerçek mesajı görüp KESİN teşhis koyabiliriz. Günde
   1000 KV yazma sınırını zorlamamak için bu, tarama başına YALNIZ BİR KEZ olur. */
let _ykIlkHataYazildi=!1;
/* Bir grup hisseyi tarar, sayaç üretir. zamanKesim: bu damgadan öncesi "eski". */
async function ykKosu(kodlar,zamanKesim,hisseTek,A){
  const S=ykSayacYeni();
  const semboller=[];
  /* TEŞHİS: gözlem 0 çıkarsa sebebini söyleyebilmek için hangi dilimde
     veri gelmediğini sayıyoruz. Sessiz boş rapor en kötü hatadır. */
  const teshis={veriYok:{},gozlemsiz:0,hata:0,yenidenDenendi:0,yenidenKurtardi:0};
  let sira=0;
  const isciCek=async(kod)=>{
    const ckListe=[],gor={};
    for(const t of YK_DILIM){
      const tf=MB_TF[mbTfNormal(t)],ck=tf.interval+"|"+tf.range;
      if(!gor[ck]){gor[ck]=!0;ckListe.push({ck:ck,interval:tf.interval,range:tf.range})}
    }
    const onb={};
    await Promise.all(ckListe.map(async x=>{
      const r=await yfMumlar(kod,x.interval,x.range);onb[x.ck]=(r&&r.veri)||[];
      /* İlk gerçek Yahoo hata metnini (KV'ye yazmadan, bedava) sakla — ekranda
         doğrudan görünsün, "çekim hatası" gibi anlamsız bir sayı değil. */
      if(!teshis.ornekHata&&(!r||!r.veri||!r.veri.length)&&r&&r.hatalar&&r.hatalar.length)
        teshis.ornekHata=kod+" ("+x.ck+"): "+r.hatalar[r.hatalar.length-1];
    }));
    return onb;
  };
  const isci=async(isciNo)=>{
    await ykBekle(isciNo*180);          /* kademeli başlangıç — tek anda patlama olmasın */
    while(sira<kodlar.length){
      const kod=kodlar[sira++];
      try{
        const onb=await isciCek(kod);
        /* NOT: burada eskiden "veri gelmezse bir daha dene" vardı — ama YK_ADIM
           zaten küçültüldüğü (20→10) ve Cloudflare'in alt-istek sınırı asıl
           şüpheli olduğu için KALDIRILDI: sınıra zaten yaklaşılmışken tekrar
           denemek isteği ikiye katlayıp sınırı daha ÇABUK aşırıyor, işi
           iyileştirmek yerine kötüleştiriyordu. query1→query2 yedeklemesi
           (yfMumlar içinde) zaten tek katmanlı bir tekrar deneme sağlıyor. */
        const sr={};
        for(const t of YK_DILIM){
          const tf=MB_TF[mbTfNormal(t)],ck=tf.interval+"|"+tf.range;
          let m=onb[ck]||[];
          if(!m.length){sr[t]=null;teshis.veriYok[t]=(teshis.veriYok[t]||0)+1;continue}
          if(tf.hayaletAt)m=mbHayaletAt(m);
          if(tf.grupSaat)m=mbGrupla(m,tf.grupSaat);
          sr[t]=ykOranSeri(m);
        }
        const gtf=MB_TF["1G"];
        let gm=mbHayaletAt(onb[gtf.interval+"|"+gtf.range]||[]).slice(-YK_PENCERE);
        const imlec={};for(const t of YK_DILIM)imlec[t]=-1;
        let say=0;
        const tekMi=hisseTek(kod);
        for(let i=1;i<gm.length-1;i++){
          const g=gm[i];
          if(!(g.open>0)||!(g.close>0))continue;
          const durum={};let eksik=!1;
          for(const t of YK_DILIM){
            const s2=sr[t];if(!s2){eksik=!0;break}
            let k=imlec[t];
            while(k+1<s2.length&&s2[k+1]&&s2[k+1].time<g.time)k++;
            while(k+1<s2.length&&!s2[k+1])k++;
            imlec[t]=k;
            const b2=k>=0?s2[k]:null;
            if(!b2){eksik=!0;break}
            durum[t]={bant:ykBant(b2.oran),bolge:ykBolge(b2.oran)};
          }
          if(eksik)continue;
          const yarin=gm[i+1];
          const gunIci=100*(g.close/g.open-1);
          const kapKap=(yarin&&yarin.close>0)?100*(yarin.close/g.close-1):null;
          const bolmeler=[0, g.time<zamanKesim?1:2, tekMi?3:4];
          /* 📐 3-BAR-İLERİ ÖLÇÜM: sinyal barından sonraki 3 bar tam mevcutsa
             ("hisse Tarama · fibo aralığı için ölçüm istasyonu" ölçüsü) —
             azami % (yüksekten), art arda 3 yeşil/3 kırmızı ve 3 bar sonraki
             kapanış getirisi hesaplanır. Eksikse (dizinin sonu) ileri3=null,
             o gözlem yalnız gün-içi/kapanış ölçülerine katılır. */
          let ileri3=null;
          const b1=gm[i+1],b2=gm[i+2],b3=gm[i+3];
          if(b1&&b2&&b3&&b1.close>0&&b2.close>0&&b3.close>0&&isFinite(b1.high)&&isFinite(b2.high)&&isFinite(b3.high)){
            const azamiFiyat=Math.max(b1.high,b2.high,b3.high);
            ileri3={
              max3:100*(azamiFiyat/g.close-1),
              yesil3:b1.close>b1.open&&b2.close>b2.open&&b3.close>b3.open,
              kirmizi3:b1.close<b1.open&&b2.close<b2.open&&b3.close<b3.open,
              getiri3:100*(b3.close/g.close-1)
            };
          }
          ykSayacEkle(S,ykEslesenler(durum),bolmeler,gunIci>0,gunIci,
            kapKap!==null&&kapKap>0,kapKap,ileri3);
          say++;
        }
        if(!say)teshis.gozlemsiz++;
        semboller.push({kod:kod,gun:say});
      }catch(e){
        teshis.hata++;
        semboller.push({kod:kod,hata:String((e&&e.message)||e)});
        if(!_ykIlkHataYazildi&&A){_ykIlkHataYazildi=!0;hataYaz(A,"ykKosu:"+kod,e).catch(()=>{})}
      }
    }
  };
  await Promise.all(Array.from({length:YK_ES},(_,i)=>isci(i)));
  return{sayac:S,semboller:semboller,teshis:teshis};
}
/* Sayaçlardan rapor. alan: "g" gün içi · "k" kapanış→kapanış */
/* İleri-3 (3-bar sonrası) alanlarını okunur hale getirir — hem taban hem
   kombinasyon satırları için ortak. n3 yoksa (eski veri / son 3 bar eksik)
   null döner, satırda "—" gösterilir. */
function ykIleri3Oku(c){
  if(!c||!c.n3)return null;
  return{n3:c.n3,max3Ort:c.m3S/c.n3,yesil3Oran:100*c.y3/c.n3,kirmizi3Oran:100*c.k3/c.n3,
    toplamGetiri3:c.g3T,ortGetiri3:c.g3T/c.n3,
    hedef1:100*(c.h1||0)/c.n3,hedef2:100*(c.h2||0)/c.n3,hedef3:100*(c.h3||0)/c.n3};
}
function ykOzetle(S,alan){
  const oku=(kutu,b)=>{
    const c=kutu&&kutu[b];
    if(!c||typeof c!=="object")return null;
    const n=alan==="g"?c.n:c.kN;
    if(!n)return null;
    return{n:n,yesil:100*(alan==="g"?c.gY:c.kY)/n,ort:(alan==="g"?c.gT:c.kT)/n,ileri3:ykIleri3Oku(c)};
  };
  const taban={};for(let b=0;b<=4;b++)taban[b]=oku(S.taban,b);
  if(!taban[0])return{taban:null,satirlar:[],denenen:0,gecen:0};
  const adlar={};for(const c of ykKombinasyonlar())adlar[c.id]={ad:c.ad,tur:c.tur};
  const satirlar=[];let denenen=0;
  for(const id in S.komb){
    const kutu=S.komb[id];
    const g=oku(kutu,0);if(!g||g.n<YK_ASGARI*2)continue;
    const b=[1,2,3,4].map(x=>oku(kutu,x));
    if(b.some(x=>!x||x.n<YK_ASGARI))continue;
    denenen++;
    const k=b.map((x,i)=>x.yesil-taban[i+1].yesil);
    const enAz=Math.min.apply(null,k);
    satirlar.push({id:id,ad:(adlar[id]||{}).ad||id,tur:(adlar[id]||{}).tur||"",
      n:g.n,yesil:g.yesil,ort:g.ort,kaldirac:g.yesil-taban[0].yesil,
      bolmeler:k,enAz:enAz,gecti:enAz>=YK_KALDIRAC,ileri3:g.ileri3});
  }
  satirlar.sort((x,y)=>y.enAz-x.enAz);
  return{taban:taban[0],satirlar:satirlar,denenen:denenen,
    gecen:satirlar.filter(r=>r.gecti).length};
}
/* ── Yeşil Kapanış: iş akışı (parçalı tarama) + sayfalar ── */
/* Bir adımda kaç hisse. Her hisse 2 ayrı Yahoo çekimi yapıyor (60m ve 1d);
   yfMumlar gerekirse ikinci sunucuyu da deniyor. 8 hisse = en kötü 32
   alt-istek — Cloudflare'in ücretsiz plandaki 50 sınırının altında kalır. */
/* 20→10: Cloudflare Workers'ta bir istekte en fazla 50 (ücretsiz) ya da 1000
   (ücretli) alt-istek hakkı var. 20 hisse × 2 benzersiz Yahoo isteği (60m+1d)
   × olası query1→query2 yedeklemesi en kötü ihtimalle 80 alt-isteğe kadar
   çıkabiliyordu — bu, ücretsiz planın 50 sınırını rahatça aşar ve o anda
   Cloudflare kalan bütün fetch() çağrılarını ANINDA reddeder (network
   gecikmesi beklemeden) — "hızlı ve toplu başarısızlık" örüntüsü tam
   olarak gözlemlenen buydu. 10'a düşürmek en kötü durumda bile 40 alt-istekte
   kalır, sınırın altında güvenli bir pay bırakır. */
const YK_ADIM=10;
/* 🐞 DÜZELTİLEN HATA — "tarama biterken ekrandaki her şey silindi"
   Cloudflare KV ANLIK TUTARLI DEĞİLDİR: yazdıktan hemen sonra okursan
   eski değeri alabilirsin. Tarama adımları 120 ms arayla oku-değiştir-yaz
   yaptığı için son adım çoğu kez ESKİ işi okuyor, "bitti" damgasını ona
   basıp geri yazıyordu — o ana kadar biriken bütün sayaçlar siliniyordu.
   ÇÖZÜM: iş bellekte de tutulur ve iki kopyadan DAHA İLERİDE olanı kazanır.
   Böylece aynı isolate içinde hiçbir adım kaybolmaz; KV yalnız yedek olur. */
let _ykBellek=null;
async function ykIsOku(A){
  let kv=null;
  if(A&&A.VERI){try{const j=await A.VERI.get("ykIs");kv=j?JSON.parse(j):null}catch(_){}}
  if(_ykBellek&&kv&&_ykBellek.baslangic===kv.baslangic)
    return (Number(_ykBellek.tamam)||0)>=(Number(kv.tamam)||0)?_ykBellek:kv;
  if(_ykBellek&&!kv&&_ykBellek.tamam<_ykBellek.toplam)return _ykBellek;
  _ykBellek=kv;
  return kv;
}
async function ykIsYaz(A,job){
  _ykBellek=job;                       /* önce bellek — kayıp olmasın */
  if(!A||!A.VERI)return;
  try{await A.VERI.put("ykIs",JSON.stringify(job),{expirationTtl:172800})}catch(_){}
}
function ykIsSil(){_ykBellek=null}
const ykHisseTek=(kodlar)=>{
  const har={};kodlar.forEach((k,i)=>har[k]=(i%2===0));
  return k=>!!har[k];
};
function ykYuzde(v,o){return v===null||v===undefined||!isFinite(v)?"—":(v>0?"+":"")+v.toFixed(o===undefined?1:o)}
function ykFormHTML(anahtar,is){
  let devam="";
  if(is&&!is.tamamlandi&&is.toplam)
    devam='<div class="kur" style="border-color:#1f6feb;background:#0d1b2e"><b>⏳ Süren tarama var</b>'+
      '<div class="a" style="margin-top:4px">'+is.tamam+' / '+is.toplam+' hisse.</div>'+
      '<a class="a" style="color:#388bfd;display:inline-block;margin-top:6px" href="/yesil/rapor?key='+encodeURIComponent(anahtar||'')+'">→ ilerlemeyi aç</a></div>';
  else if(is&&is.tamamlandi)
    devam='<div class="a" style="margin-top:10px">Son tarama bitti ('+is.tamam+' hisse). '+
      '<a href="/yesil/rapor?key='+encodeURIComponent(anahtar||'')+'" style="color:#388bfd">sonucu aç</a></div>';
  return '<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Fibo Aralığı Ölçüm İstasyonu</title>'+DBT_STIL+'</head><body>'+
  '<h1>📐 Fibo Aralığı Ölçüm İstasyonu</h1>'+
  '<div class="a">Hisse, fibo merdiveninin hangi basamak aralığındayken ertesi günü <b>yeşil</b> kapatıyor? '+
  'Yüzlerce kombinasyon denenir ve her biri <b>dört bağımsız bölmede</b> (zaman: eski/yeni yarı · hisse: tek/çift sıra) '+
  'ayrı ayrı sınanır. Dördünde de tabanı geçmeyen kurulum gürültü sayılıp elenir.</div>'+
  devam+
  '<form method="get" action="/yesil">'+
  '<input type="hidden" name="key" value="'+(anahtar||'').replace(/"/g,'')+'">'+
  '<label style="display:flex;align-items:center;gap:8px;margin-top:14px"><input type="checkbox" name="evren" value="1" checked style="width:auto">🌍 <b>Havuzun tamamı</b> (430+ hisse · birkaç dakika)</label>'+
  '<label>Ya da hisse kodları (virgülle · boş bırakırsan havuzdan ilk 40)</label>'+
  '<textarea name="kod" placeholder="THYAO, ASELS, GARAN..."></textarea>'+
  '<input type="hidden" name="git" value="1"><button type="submit">▶ Başlat</button></form>'+
  '<div class="a" style="margin-top:12px">Ölçülen iki sonuç: <b>gün içi</b> (açılışta al, kapanışta sat) ve '+
  '<b>kapanış→kapanış</b> (kapanışta al, ertesi kapanışta sat — geceyi de alır). '+
  'Durum her zaman gün <i>açılmadan önce</i> okunur, ileriye bakma yoktur.</div>'+
  '</body></html>';
}
function ykIlerlemeHTML(anahtar){
  return '<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Fibo Aralığı Ölçüm İstasyonu — taranıyor</title>'+DBT_STIL+'</head><body>'+
  '<h1>📐 Fibo Aralığı Ölçüm İstasyonu — taranıyor</h1>'+
  '<div class="kur" style="border-color:#272e37;background:#161b22"><div id="y" class="a">başlıyor…</div>'+
  '<div style="background:#0d1117;border:1px solid #272e37;border-radius:8px;height:14px;margin-top:8px;overflow:hidden">'+
  '<div id="c" style="background:#3fb950;height:100%;width:0%"></div></div></div>'+
  '<div class="a" style="margin-top:10px">Sayfayı açık bırak; bitince rapora geçer. Kapatırsan iş devam eder, /yesil/rapor adresinden bakabilirsin.</div>'+
  '<script>var key='+JSON.stringify(anahtar||'')+';'+
  'function a(){fetch("/yesil/adim?key="+encodeURIComponent(key)).then(function(r){return r.json()}).then(function(v){'+
  'if(!v||!v.ok){document.getElementById("y").textContent="hata — sayfayı yenile";return}'+
  'var p=v.toplam?Math.round(100*v.tamam/v.toplam):0;'+
  'document.getElementById("c").style.width=p+"%";'+
  'document.getElementById("y").textContent=v.tamam+" / "+v.toplam+" hisse ("+p+"%)"+(v.gozlem?" · "+v.gozlem+" hisse-günü":"");'+
  'if(v.tamamlandi){location.href="/yesil/rapor?key="+encodeURIComponent(key)}else{setTimeout(a,250)}'+
  '}).catch(function(){setTimeout(a,2000)})}a();</script></body></html>';
}
function ykTabloHTML(o,baslik,aciklama){
  if(!o.taban)return '<h2>'+baslik+'</h2><div class="a">yeterli veri yok</div>';
  const gecen=o.satirlar.filter(r=>r.gecti);
  const uc=(i3)=>i3?ykYuzde(i3.max3Ort,2)+'% <span style="opacity:.6">('+i3.yesil3Oran.toFixed(0)+'/'+i3.kirmizi3Oran.toFixed(0)+')</span>':'—';
  const satir=(r)=>'<tr><td>'+E2(r.ad)+'</td><td>'+r.n+'</td>'+
    '<td class="'+(r.yesil>=o.taban.yesil?'iy':'kt')+'"><b>%'+r.yesil.toFixed(0)+'</b></td>'+
    '<td class="'+(r.kaldirac>0?'iy':'kt')+'"><b>'+ykYuzde(r.kaldirac)+'</b></td>'+
    r.bolmeler.map(v=>'<td class="'+(v>0?'iy':'kt')+'">'+ykYuzde(v)+'</td>').join('')+
    '<td class="'+(r.ort>0?'iy':'kt')+'">'+ykYuzde(r.ort,2)+'</td>'+
    '<td>'+uc(r.ileri3)+'</td></tr>';
  const bas='<div class="wrap"><table><tr><th>kurulum</th><th>n</th><th>yeşil</th><th>kaldıraç</th>'+
    '<th>zaman<br>eski</th><th>zaman<br>yeni</th><th>hisse<br>tek</th><th>hisse<br>çift</th><th>ort.<br>getiri</th>'+
    '<th>3bar azami<br>(hep yeş/kırm %)</th></tr>';
  return '<h2>'+baslik+'</h2>'+
    '<div class="a">'+aciklama+'<br>TABAN: yeşil <b>%'+o.taban.yesil.toFixed(1)+'</b> · ortalama <b>'+
    ykYuzde(o.taban.ort,3)+'%</b> ('+o.taban.n+' hisse-günü)'+
    (o.taban.ileri3?' · 3 bar sonrası azami ortalama <b>'+ykYuzde(o.taban.ileri3.max3Ort,2)+'%</b>, hep yeşil <b>%'+
      o.taban.ileri3.yesil3Oran.toFixed(0)+'</b>, hep kırmızı <b>%'+o.taban.ileri3.kirmizi3Oran.toFixed(0)+
      '</b>, toplam getiri <b>'+ykYuzde(o.taban.ileri3.toplamGetiri3,1)+'%</b>':'')+'. '+
    '<b>Kaldıraç</b> = kurulumun tabandan farkı (yüzde puan). Dört bölme sütunu da artıysa kurulum sağlamdır.</div>'+
    '<div class="kur" style="border-color:'+(gecen.length?'#238636':'#6b2b2b')+';background:'+(gecen.length?'#0f2016':'#22171a')+'">'+
    '<b>'+o.denenen+' kombinasyon denendi · dört bölmenin dördünü geçen: '+gecen.length+'</b>'+
    '<div class="a" style="margin-top:4px">Saf gürültüden beklenen yanlış-pozitif ≈ '+
    Math.round(o.denenen*0.06)+'. Bunun belirgin üstündeyse gerçek sinyal var demektir.</div></div>'+
    (gecen.length?bas+gecen.slice(0,25).map(satir).join('')+'</table></div>':'')+
    '<div class="a" style="margin-top:10px;opacity:.7">— elenenler dahil ilk 15 (karşılaştırma için) —</div>'+
    bas+o.satirlar.slice(0,15).map(satir).join('')+'</table></div>';
}
function E2(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
/* 📋 Kolay-kopyala metin — sunucu tarafı (tarayıcıdaki /yesil/rapor sayfası).
   Mini App'teki ykMetinUret ile aynı düz-metin biçimi; hangi taraftan
   üretilirse üretilsin okuyan (insan ya da Claude) aynı formatı görür. */
function ykMetinSatirHTML(baslik,o,alan){
  if(!o.taban)return baslik+": yeterli veri yok\n";
  let out=baslik+"\n";
  out+="taban: n="+o.taban.n+" yesil%="+o.taban.yesil.toFixed(1)+" ort_getiri%="+ykYuzde(o.taban.ort,3)+"\n";
  if(o.taban.ileri3){const t3=o.taban.ileri3;
    out+="taban_3bar: n="+t3.n3+" azami_ort%="+ykYuzde(t3.max3Ort,2)+" hep_yesil%="+t3.yesil3Oran.toFixed(1)+
      " hep_kirmizi%="+t3.kirmizi3Oran.toFixed(1)+" toplam_getiri%="+ykYuzde(t3.toplamGetiri3,1)+
      " ort_getiri%="+ykYuzde(t3.ortGetiri3,2)+" hedef+1%="+t3.hedef1.toFixed(1)+" hedef+2%="+t3.hedef2.toFixed(1)+" hedef+3%="+t3.hedef3.toFixed(1)+"\n";
  }
  out+="denenen_kurulum="+o.denenen+" dort_sinavi_gecen="+o.gecen+"\n";
  o.satirlar.filter(r=>r.gecti).slice(0,25).forEach((r,i)=>{
    out+=(i+1)+") "+r.ad+" | n="+r.n+" yesil%="+r.yesil.toFixed(1)+" kaldirac="+ykYuzde(r.kaldirac)+
      " bolmeler=["+r.bolmeler.map(v=>ykYuzde(v)).join(",")+"]";
    if(r.ileri3){const i3=r.ileri3;
      out+=" | 3bar: n="+i3.n3+" azami_ort%="+ykYuzde(i3.max3Ort,2)+" hep_yesil%="+i3.yesil3Oran.toFixed(1)+
        " hep_kirmizi%="+i3.kirmizi3Oran.toFixed(1)+" toplam_getiri%="+ykYuzde(i3.toplamGetiri3,1)+
        " ort_getiri%="+ykYuzde(i3.ortGetiri3,2)+" hedef+1/+2/+3%="+i3.hedef1.toFixed(0)+"/"+i3.hedef2.toFixed(0)+"/"+i3.hedef3.toFixed(0);
    }
    out+="\n";
  });
  return out;
}
function ykRaporHTML(o){
  const g=ykOzetle(o.sayac,"g"), k=ykOzetle(o.sayac,"k");
  const hata=(o.semboller||[]).filter(s=>s.hata);
  let metin="FIBO ARALIĞI ÖLÇÜM İSTASYONU — SONUÇ\n";
  metin+="tarama: "+o.toplam+" hisse, "+(g.taban?g.taban.n:0)+" hisse-günü, "+o.sure+" sn\n\n";
  metin+=ykMetinSatirHTML("[GÜN İÇİ — açılış->kapanış]",g)+"\n";
  metin+=ykMetinSatirHTML("[KAPANIŞ->KAPANIŞ — geceyi de alır]",k)+"\n";
  metin+="not: kaldirac = kurulumun taban yesil oranindan farki (puan). 3bar = sinyal barindan sonraki 3 bar.\n";
  return '<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Fibo Aralığı Ölçüm İstasyonu — sonuçlar</title>'+DBT_STIL+'</head><body>'+
  '<h1>📐 Fibo Aralığı Ölçüm İstasyonu — sonuçlar</h1>'+
  '<div class="a">'+o.toplam+' hisse · '+(g.taban?g.taban.n:0)+' hisse-günü · '+o.sure+' sn</div>'+
  '<div class="kur" style="border-color:#272e37;background:#161b22"><b>Nasıl okunur?</b>'+
  '<div class="a" style="margin-top:5px;line-height:1.7">'+
  'Durum, gün <b>açılmadan önce</b> okunur — ileriye bakma yok.<br>'+
  '<b>Kaldıraç</b>, kurulumun taban yeşil oranından farkıdır. Taban zaten %45 ise %48 çıkan bir kural sadece +3 puan katıyor demektir.<br>'+
  'Dört bölme sütunu (zaman eski/yeni, hisse tek/çift) <b>ayrı ayrı</b> hesaplanır. Bir kurulum yalnız birinde parlıyorsa tesadüftür.<br>'+
  '<b>3bar azami</b> — sinyal barından sonraki 3 barda ulaşılan en yüksek fiyatın ortalama %\'si; parantez içi, o 3 barın hepsinin yeşil/hepsinin kırmızı kapandığı gözlemlerin oranı.</div></div>'+
  ykTabloHTML(g,'📈 Gün içi — açılışta al, kapanışta sat',
    'Bu, senin sorduğun "günü yeşil kapatsın" ölçüsü: mumun yeşil olması.')+
  ykTabloHTML(k,'🌙 Kapanış → kapanış — kapanışta al, ertesi kapanışta sat',
    'Gecelik boşluğu da alır. İki tabanı karşılaştır: fark, gün içi ile gecenin farklı davrandığını gösterir.')+
  (hata.length?'<h2>⚠️ Veri alınamayan</h2><div class="a">'+hata.map(s=>E2(s.kod)).join(', ')+'</div>':'')+
  '<h2>📋 Kolay kopyala</h2>'+
  '<div class="a">Aşağıdaki metni kopyalayıp bana (Claude\'a) gönderebilirsin — birlikte okuruz.</div>'+
  '<textarea id="ykMetinKutu" readonly style="width:100%;min-height:220px;margin-top:8px;background:#0b0f14;color:#e6edf3;border:1px solid #272e37;border-radius:8px;padding:10px;font:12.5px/1.5 ui-monospace,monospace">'+E2(metin)+'</textarea>'+
  '<button onclick="var t=document.getElementById(\'ykMetinKutu\');t.select();try{document.execCommand(\'copy\');this.textContent=\'✅ kopyalandı\'}catch(e){this.textContent=\'⚠️ elle kopyala\'}" style="margin-top:8px;background:#388bfd;color:#fff;border:0;border-radius:9px;padding:11px 16px;font-weight:700">📋 Kopyala</button>'+
  '<div class="a" style="margin-top:16px"><a href="/yesil?key='+encodeURIComponent(o.anahtar||'')+'" style="color:#388bfd">← yeni koşum</a></div>'+
  '</body></html>';
}

/* ── TÜM HAVUZ × TÜM DİLİM — PARÇALI, KALDIĞI YERDEN DEVAM EDEN TARAMA ──
   Absorpsiyon taramasındaki desenin aynısı: her /push turunda bir DİLİM
   ilerler, sonuçlar KV'de birikir, imleç nerede kalındığını tutar. Böylece
   Cloudflare alt-istek sınırı da Mini App bekleme süresi de zorlanmaz.
   Birikim DİLİM BAŞINA ayrı KV anahtarında tutulur (mbBirikim:1G gibi) —
   tek dev anahtar her turda baştan okunup yazılmasın diye. */
const MB_DILIM_TABAN=8,MB_DILIM_TAVAN=60,MB_SURE_TAVAN_MS=1e4,MB_ES=12;
/* Mini App isteğinin İÇİNDEN tetiklenen tarama küçük tutulur: o istek
   Cloudflare alt-istek bütçesini absorpsiyon ve KV işlemleriyle paylaşıyor. */
const MB_ANLIK_AZAMI=12;
/* Kullanıcı "şimdi doldur" derse bir istekte bu kadar hisse ölçülür.
   24 hisse × 1 çekim = 24 alt-istek — ücretsiz plandaki 50 sınırının altı. */
const MB_DOLDUR_AZAMI=40;
/* Uygulamanın tek istekte isteyebileceği en fazla hisse. 30 hisse = 30
   dış çağrı; Cloudflare'in ücretsiz plandaki 50 sınırının altında kalır. */
/* 🐞 "tarama hata veriyor, can çekişiyor" — parti 30 hisseydi. Her hisse
   1 Yahoo çekimi yapıyor, çekim başarısız olursa ikinci sunucu deneniyor:
   en kötü 60 dış çağrı. Cloudflare'in ücretsiz plandaki sınırı 50 — istek
   komple düşüyor, hiçbir ölçüm dönmüyordu (ekranda "0/434 · 4 hata").
   12 hisse = en kötü 24 çağrı, sınırın rahat altında. */
const MB_OLC_AZAMI=16;
/* ⚡ ÖLÇÜM ÖNBELLEĞİ — hızın asıl kaynağı.
   Kullanıcı aynı havuzu dakikada bir yeniden tarıyor; her seferinde 434
   hisse için Yahoo'ya gitmek işkence. Ölçüm sonuçları isolate belleğinde
   tutulur; aynı hisse-dilim yeniden istenirse ölçüm YENİDEN YAPILMAZ.
   Süre dilime göre: 5 dakikalık bar 2 dakikada bayatlar, aylık bar 2 saatte.
   KV kullanılmaz — bellek bedava ve anlık tutarlı. */
const _mbOnbellek={};
const MB_ONBELLEK_SURE={"5DK":12e4,"15DK":3e5,"1SA":9e5,"4SA":18e5,"1G":36e5,"1HAF":72e5,"1AY":72e5};
function mbOnbellekAl(kod,tf){
  const k=kod+"|"+tf,c=_mbOnbellek[k];
  if(!c)return null;
  if(Date.now()-c.ts>(MB_ONBELLEK_SURE[tf]||9e5)){delete _mbOnbellek[k];return null}
  return c.veri;
}
function mbOnbellekKoy(kod,tf,veri){
  _mbOnbellek[kod+"|"+tf]={ts:Date.now(),veri:veri};
  /* bellek şişmesin: 6000 kaydı aşınca en eskileri at */
  const anahtarlar=Object.keys(_mbOnbellek);
  if(anahtarlar.length>6000){
    anahtarlar.sort((a,b)=>_mbOnbellek[a].ts-_mbOnbellek[b].ts);
    for(let i=0;i<1500;i++)delete _mbOnbellek[anahtarlar[i]];
  }
}
/* Dilim başına tazelik eşiği — bakılan dilim bundan eskiyse önceliklendirilir.
   Hızlı dilim sık, yavaş dilim seyrek tazelenir; boşuna çekim yapılmaz. */
const MB_TAZELIK={"5DK":6e5,"15DK":12e5,"1SA":36e5,"4SA":72e5,"1G":108e5,"1HAF":216e5,"1AY":216e5};
const MB_BIRIKIM_TTL=21600,MB_YAZMA_ARALIK=6e5,MB_BAYAT_MS=216e5; /* 6 saat */
const _mbBellek={};let _mbYazma={},_mbImlec=null;

async function mbTfOku(A,tf,parcalarla){
  if(_mbBellek[tf]&&!parcalarla)return _mbBellek[tf];
  let v=_mbBellek[tf];
  if(!v){
    v={ts:0,sonuc:{}};
    try{const h=A&&A.VERI&&await A.VERI.get("mbBirikim:"+tf);if(h)v=JSON.parse(h)||v}catch(_){}
    if(!v.sonuc||typeof v.sonuc!=="object")v.sonuc={};
  }
  if(parcalarla)await mbParcalariKat(A,tf,v);
  _mbBellek[tf]=v;return v;
}
/* 🐞 DÜZELTİLEN HATA — "hep 20-25 hisse taranıyor, 434'e hiç ulaşmıyor"
   Sonuçlar 10 dakikada bir yazılıyordu ama İMLEÇ her tur yazılıyordu.
   Cloudflare her /push turunu başka bir isolate'de çalıştırabildiği için
   bellekteki sonuçlar çoğu turda diske hiç inmeden yok oluyordu; imleç ise
   yazıldığı için ilerlemeye devam ediyordu. Sonuç: imleç havuzu dolaşıp
   bitiriyor, elde yalnızca son turun ~20 hissesi kalıyordu.
   İKİSİ AYNI ANDA YAZILMALI — aksi hâlde ilerleme ile veri birbirinden
   kopuyor. Artık her turda yazılıyor (turda 1 ek KV yazımı; imleç zaten
   yazıldığı için maliyet iki katına çıkıyor, sıfırdan doğmuyor).
   Her şey ölçülüp tazeyken tarama hiç çalışmaz, o yüzden yazma da durur. */
async function mbTfYaz(A,tf){
  const v=_mbBellek[tf];if(!v||!A||!A.VERI)return;
  _mbYazma[tf]=Date.now();
  await A.VERI.put("mbBirikim:"+tf,JSON.stringify(v),{expirationTtl:MB_BIRIKIM_TTL}).catch(()=>{});
}
/* ── PARÇALI YAZMA — KV gecikmesine karşı asıl çözüm ────────────────────
   Tek büyük harita üzerinde oku-değiştir-yaz yapmak KV'de veri kaybettirir:
   iki istek arka arkaya gelince ikincisi birincinin yazdığını görmeden
   üstüne yazar. "Havuz 434'e bir türlü ulaşmıyor" sorununun kökü buydu.
   Doldurma sırasında her istek KENDİ parçasına yazar (mbP:DİLİM:NO) —
   iki istek asla aynı anahtara dokunmaz, dolayısıyla hiçbir ölçüm kaybolmaz.
   Parçalar okuma anında ana birikimle birleştirilir; doldurma bitince
   tek seferde ana birikime katılıp silinirler. */
async function mbParcaYaz(A,tf,no,yeni){
  if(!A||!A.VERI||!yeni||!Object.keys(yeni).length)return;
  try{await A.VERI.put("mbP:"+tf+":"+no,JSON.stringify(yeni),{expirationTtl:MB_BIRIKIM_TTL})}catch(_){}
}
async function mbParcalariKat(A,tf,bir){
  if(!A||!A.VERI)return bir;
  try{
    const l=await A.VERI.list({prefix:"mbP:"+tf+":"});
    if(!l||!l.keys||!l.keys.length)return bir;
    for(const k of l.keys){
      try{const h=await A.VERI.get(k.name);if(!h)continue;
        const v=JSON.parse(h);
        for(const kod in v)if(!bir.sonuc[kod]||(v[kod].ts||0)>(bir.sonuc[kod].ts||0))bir.sonuc[kod]=v[kod];
      }catch(_){}
    }
    bir.parca=l.keys.length;
  }catch(_){}
  return bir;
}
/* Parçaları ana birikime kalıcı olarak katar ve siler. */
async function mbParcalariBirlestir(A,tf){
  const bir=await mbTfOku(A,tf);
  await mbParcalariKat(A,tf,bir);
  bir.ts=Date.now();bir.olculen=Object.keys(bir.sonuc).length;
  _mbBellek[tf]=bir;
  await mbTfYaz(A,tf);
  try{
    const l=await A.VERI.list({prefix:"mbP:"+tf+":"});
    for(const k of (l&&l.keys)||[])await A.VERI.delete(k.name).catch(()=>{});
  }catch(_){}
  return bir;
}
/* Bu dilim tamamlandı mı: havuzun tamamı ölçülü ve hiçbiri bayat değil. */
function mbTfTamam(bir,evrenSayi){
  if(!bir||!bir.sonuc)return!1;
  const n=Object.keys(bir.sonuc).length;
  if(!evrenSayi||n<evrenSayi)return!1;
  return (Date.now()-(bir.ts||0))<(MB_BAYAT_MS/2);
}
async function mbCalisiyorMu(A){
  try{return(await A.VERI.get("mbDurduruldu"))!=="1"}catch(_){return!0}
}
async function mbDurdurAyarla(A,dur){
  try{if(dur)await A.VERI.put("mbDurduruldu","1");else await A.VERI.delete("mbDurduruldu")}catch(_){}
}
async function mbDilimOku(A){
  try{const v=Number(await A.VERI.get("mbDilimOgrenilen"));
    if(isFinite(v)&&v>=MB_DILIM_TABAN)return Math.min(MB_DILIM_TAVAN,Math.round(v))}catch(_){}
  return 40;                        /* 20→40: tam tur sayısı yarıya iner */
}
async function mbDilimYaz(A,v){
  const y=Math.max(MB_DILIM_TABAN,Math.min(MB_DILIM_TAVAN,Math.round(v)));
  try{await A.VERI.put("mbDilimOgrenilen",String(y))}catch(_){}
}
async function mbImlecOku(A){
  if(_mbImlec)return _mbImlec;
  let v={tf:0,kod:0};
  try{const h=A&&A.VERI&&await A.VERI.get("mbImlec");if(h)v=JSON.parse(h)||v}catch(_){}
  _mbImlec=v;return v;
}
/* Bir dilim tarar. oncelikTf verilirse imleç yerine o dilimden devam eder —
   kullanıcı bir dilimi açtığında o dilim öne alınsın diye. */
/* 🐞 Aynı KV tutarlılık sorunu burada da vardı: her doldurma isteği imleci
   KV'den okuyordu, okuma bayat gelince tarama hep aynı 20-25 hisseyi
   yeniden ölçüyor, havuz bir türlü dolmuyordu.
   ÇÖZÜM: doldurma sırasında imleci İSTEMCİ taşır (disImlec) — sunucu her
   cevapta nerede kaldığını söyler, istemci bir sonraki istekte geri verir.
   Böylece ilerleme KV'nin gecikmesinden tamamen bağımsız olur. */
async function mbDilimTara(A,oncelikTf,azami,disImlec){
  if(!A||!A.VERI)return null;
  if(!(await mbCalisiyorMu(A)))return null;
  const evren=await mbEvren(A);               /* havuzun TAMAMI */
  if(!evren.length)return null;
  const imlec=await mbImlecOku(A);
  let tfIdx=oncelikTf?Math.max(0,MB_TF_LISTE.indexOf(mbTfNormal(oncelikTf)))
                       :(Number(imlec.tf)||0)%MB_TF_LISTE.length;
  let tf=MB_TF_LISTE[tfIdx];
  /* Bu dilim baştan sona ölçülü ve tazeyse boşuna yeniden tarama:
     sıradaki eksik dilime geç. Hepsi tamamsa hiç tarama yapma — böylece
     havuz bir kez dolduktan sonra KV yazımı da kendiliğinden durur. */
  if(!oncelikTf){
    let atlandi=0;
    while(atlandi<MB_TF_LISTE.length&&mbTfTamam(await mbTfOku(A,tf),evren.length)){
      tfIdx=(tfIdx+1)%MB_TF_LISTE.length;tf=MB_TF_LISTE[tfIdx];atlandi++;
      imlec.tf=tfIdx;imlec.kod=0;
    }
    if(atlandi>=MB_TF_LISTE.length){          /* yedi dilim de tamam */
      _mbImlec=imlec;
      try{await A.VERI.put("mbImlec",JSON.stringify(imlec))}catch(_){}
      return _mbBellek[tf]||null;
    }
  }
  const bir=await mbTfOku(A,tf);              /* imleç için ÖNCE yüklenmeli */
  const kodIdx=(disImlec!==undefined&&disImlec!==null&&Number(disImlec)>=0)
    ?Number(disImlec)
    :(oncelikTf?(Number(bir.imlec)||0):(Number(imlec.kod)||0));
  let dilim=await mbDilimOku(A);
  if(azami>0)dilim=Math.min(dilim,azami);
  const bas=kodIdx%evren.length;
  const kodlar=[];for(let i=0;i<dilim;i++)kodlar.push(evren[(bas+i)%evren.length]);
  const t0=Date.now();let sira=0,islenen=0,hata=!1;
  const isci=async()=>{
    while(sira<kodlar.length){
      if(Date.now()-t0>MB_SURE_TAVAN_MS)return;
      const kod=kodlar[sira++];
      try{
        const s=await mbOlc(kod,tf,{});
        if(s){s.ts=Date.now();delete s.tf;bir.sonuc[kod]=s}   /* tf zaten anahtarda */
        else delete bir.sonuc[kod];
        islenen++;
      }catch(_){hata=!0}
    }
  };
  try{await Promise.all(Array.from({length:Math.min(MB_ES,kodlar.length)},isci))}catch(_){hata=!0}
  /* Dilim boyu kendi kendini ölçer — ama kısıtlı (anlık) turdan ders çıkarma:
     o tur zaten yapay olarak küçültülmüştü, büyütmek için kanıt değil. */
  if(hata)await mbDilimYaz(A,Math.max(MB_DILIM_TABAN,islenen*.8));
  else if(!(azami>0)&&islenen>=dilim)await mbDilimYaz(A,dilim*1.25);
  /* Bayat ölçümleri at */
  const kes=Date.now()-MB_BAYAT_MS;
  for(const k of Object.keys(bir.sonuc))if(Number(bir.sonuc[k].ts||0)<kes)delete bir.sonuc[k];
  /* DOLDURMA KİPİ: bu turun ölçümlerini kendi parçasına yaz, ana haritaya
     dokunma. Böylece eşzamanlı istekler birbirinin verisini ezemez. */
  if(disImlec!==undefined&&disImlec!==null&&Number(disImlec)>=0){
    const yeniler={};
    for(const kod of kodlar)if(bir.sonuc[kod])yeniler[kod]=bir.sonuc[kod];
    await mbParcaYaz(A,tf,Math.floor(bas/Math.max(1,dilim)),yeniler);
  }
  const yeniKod=(bas+islenen)%evren.length;
  bir.imlec=yeniKod;bir.ts=Date.now();bir.evren=evren.length;bir.kaynak=evren.kaynak||"";
  bir.olculen=Object.keys(bir.sonuc).length;
  _mbBellek[tf]=bir;
  /* Bu dilimin havuzu bittiyse sıradaki zaman dilimine geç */
  if(!oncelikTf){
    if(yeniKod<=bas&&islenen>0){imlec.tf=(tfIdx+1)%MB_TF_LISTE.length;imlec.kod=0}
    else{imlec.tf=tfIdx;imlec.kod=yeniKod}
    _mbImlec=imlec;
    try{await A.VERI.put("mbImlec",JSON.stringify(imlec))}catch(_){}
  }
  await mbTfYaz(A,tf);
  saglikArtir("mbTarama");
  return bir;
}
/* ══════════════════════════════════════════════════════════════════════
   🧩 KURAL MOTORU — SONSUZ KOMBİNASYON
   ══════════════════════════════════════════════════════════════════════
   Sabit "hazır kurulum" yok; kullanıcı kendi kurallarını üst üste koyar.
   Bir KURAL üç şeyden ibarettir:
       { tf: hangi zaman dilimi , kos: hangi koşul , n: son kaç bar }
   tf "*" ise "bakılan dilim" demektir — o zaman aynı kural her dilimde
   ayrı ayrı ölçülebilir ve dilim şeridinde hangi dilimde kaç hisse
   tuttuğu görünür. tf belirli bir dilimse (örn. "1G") kural HER ZAMAN o
   dilimden okunur; böylece "1 saatlikte mal toplansın ama günlükte boğa
   olsun" gibi dilimler arası kurulumlar kurulabilir.
   Kurallar VE (hepsi tutsun) ya da VEYA (biri yetsin) ile birleşir.
   Kural sayısı ve bileşim serbesttir — sınır yoktur.

   Yaş alanları (koşullar bunları okur):
     x.topHam / x.dagHam → HAM barssince (sınırsız) — "son N bar" burada işler
     x.top    / x.dag    → Pine tablosunun 5 barla sınırladığı hâli
     x.rejYas            → ayı/boğa rejiminin kaç bardır sürdüğü */
const MB_KOSUL={
  mal     :{ad:"📦 Mal toplama",        kisa:"MAL TOP",  aciklama:"Son N barda mal toplama barı oluştu"},
  malTemiz:{ad:"📦 Temiz mal toplama",  kisa:"TEMİZ TOP",aciklama:"Son N barda toplama var ve arasına dağıtım girmemiş"},
  dag     :{ad:"📤 Mal dağıtımı",       kisa:"MAL DAĞ",  aciklama:"Son N barda mal dağıtım barı oluştu"},
  boga    :{ad:"🐂 Boğa",               kisa:"BOĞA",     aciklama:"571 rejimi şu an boğa (doyum fiyatın üstünde)"},
  ayi     :{ad:"🐻 Ayı",                kisa:"AYI",      aciklama:"571 rejimi şu an ayı (doyum fiyatın altında)"},
  bogaGec :{ad:"🐂 Boğaya geçiş",       kisa:"BOĞA GEÇ", aciklama:"Boğa VE bu rejime son N bar içinde geçilmiş"},
  ayiGec  :{ad:"🐻 Ayıya geçiş",        kisa:"AYI GEÇ",  aciklama:"Ayı VE bu rejime son N bar içinde geçilmiş"},
  dip     :{ad:"⬇️ Dip bölgesi",        kisa:"DİP",      aciklama:"Pine DİP TARAMA ile birebir: stop < fiyat < 786 ve doyum fiyatın üstünde"},
  dip382  :{ad:"⬇️⬇️ Derin dip (382 altı)",kisa:"DİP382",aciklama:"Dip bölgesinde VE fiyat 0.382 seviyesinin altında"},
  dip236  :{ad:"⬇️⬇️⬇️ En dip (236 altı)",kisa:"DİP236",aciklama:"Dip bölgesinde VE fiyat 0.236 seviyesinin altında — stop'a en yakın bant"},
  bugun   :{ad:"☀ Bu barda olay",      kisa:"BU BAR",   aciklama:"Tam bu barda toplama/dağıtım ya da rejim değişimi"}
};
MB_KOSUL.mal.f      =(x,N)=>x.topHam<=N;
MB_KOSUL.malTemiz.f =(x,N)=>x.topHam<=N&&x.topHam<x.dagHam;
MB_KOSUL.dag.f      =(x,N)=>x.dagHam<=N;
MB_KOSUL.boga.f     =(x)=>!!x.boga;
MB_KOSUL.ayi.f      =(x)=>!!x.ayi;
MB_KOSUL.bogaGec.f  =(x,N)=>!!x.boga&&x.rejYas<=N;
MB_KOSUL.ayiGec.f   =(x,N)=>!!x.ayi&&x.rejYas<=N;
MB_KOSUL.dip.f      =(x)=>!!x.dip;
MB_KOSUL.dip382.f   =(x)=>!!x.dip382;
MB_KOSUL.dip236.f   =(x)=>!!x.dip236;
MB_KOSUL.bugun.f    =(x)=>!!(x.mt||x.md||x.bogaGec||x.ayiGec);
const MB_KOSUL_LISTE=["mal","malTemiz","dag","boga","ayi","bogaGec","ayiGec","dip","dip382","dip236","bugun"];
const MB_HEPSI="*";                 /* kuralın dilimi = "bakılan dilim" */
const MB_AZAMI_KURAL=24;

/* Gelen isteği güvene alır. Bilinmeyen alan sessizce varsayılana düşer. */
function mbYasNorm(v,vars){
  if(v===null||v===undefined||v==="")return vars;
  const n=Number(v);
  return (n>=0&&n<=500)?Math.round(n):vars;
}
function mbIstekNorm(gov){
  gov=gov||{};
  let tfler=(Array.isArray(gov.tfler)?gov.tfler:[]).filter(t=>MB_TF[t]);
  if(!tfler.length)tfler=["1G"];
  tfler=MB_TF_LISTE.filter(t=>tfler.indexOf(t)>=0);        /* sabit sıra */
  const m=gov.mal||{},d=gov.dip||{},a=gov.ab||{},ez=gov.enerji||{},bo=gov.bolge||{},pv=gov.pivot||{};
  /* Alan YOKSA varsayılan, VARSA doğruluk değeri. (m.top!==false yazılsaydı
     istemciden gelen 0 "tikli" sayılırdı — JSON'da tip garantisi yok.) */
  const bl=(v,vars)=>v===undefined||v===null?vars:!!v;
  /* 🐞 DÜZELTİLEN HATA — "filtreden su kaçıyor"
     Eskiden her dilim AYRI süzülüp ayrı kart olarak listeleniyordu: 1 saatlik
     kartı, 1 saatlikte boğa olan her hisseyi gösteriyordu — o hisse günlükte
     ayı olsa bile. Yani sonuç BİRLEŞİM'di, kullanıcı ise KESİŞİM bekliyordu.
     Artık varsayılan "hepsi": hisse, seçili dilimlerin HEPSİNDE şartı
     tutmalı. Her satırda dilim dilim durum da yazılır, gizli kalan olmaz. */
  const ist={
    kapsam:gov.kapsam==="herhangi"?"herhangi":"hepsi",
    tfler:tfler,
    mal:{acik:bl(m.acik,!1),top:bl(m.top,!0),dag:bl(m.dag,!1),temiz:bl(m.temiz,!1),
         sinirsiz:bl(m.sinirsiz,!1),n:mbYasNorm(m.n,5)},
    dip:{acik:bl(d.acik,!1),kademe:MB_DIP_KADEME[d.kademe]?d.kademe:"dip"},
    ab :{acik:bl(a.acik,!1),boga:bl(a.boga,!0),ayi:bl(a.ayi,!1),
         sinirsiz:bl(a.sinirsiz,!1),n:mbYasNorm(a.n,5)},
    /* ⚛ Enerji — 6.2:177 show_enz_tarama ile aynı tikler ve varsayılanlar */
    enerji:{acik:bl(ez.acik,!1),olustu:bl(ez.olustu,!0),icinde:bl(ez.icinde,!0),
            b0:bl(ez.b0,!0),b1:bl(ez.b1,!1),
            mesafeAcik:bl(ez.mesafeAcik,!0),mesafe:mbSayiNorm(ez.mesafe,5,0.1,30)},
    /* 🪜 Fibo bölgesi */
    bolge:{acik:bl(bo.acik,!1),
           secili:(Array.isArray(bo.secili)?bo.secili:[]).filter(v=>MB_BOLGE_S[v])},
    /* 📈 Pivot kırılım */
    pivot:{acik:bl(pv.acik,!1),
           dilimler:(Array.isArray(pv.dilimler)?pv.dilimler:[]).filter(v=>MB_PIVOT_S[v]),
           kirdi:bl(pv.kirdi,!0),yakin:bl(pv.yakin,!1),uzerinde:bl(pv.uzerinde,!1),
           yuzde:mbSayiNorm(pv.yuzde,3,0.1,50)}
  };
  if(!ist.bolge.secili.length)ist.bolge.acik=!1;
  if(!ist.pivot.dilimler.length)ist.pivot.dilimler=["KISA","ORTA","UZUN"];
  if(!ist.pivot.kirdi&&!ist.pivot.yakin&&!ist.pivot.uzerinde)ist.pivot.acik=!1;
  /* Bir modülde hiç yön tikli değilse o modül anlamsız kalır — kapat. */
  if(!ist.mal.top&&!ist.mal.dag)ist.mal.acik=!1;
  if(!ist.ab.boga&&!ist.ab.ayi)ist.ab.acik=!1;
  return ist;
}
const MB_DIP_KADEME={dip:1,dip382:1,dip236:1};
/* 🪜 Altı fibo bölgesi — server MB_BOLGE ile birebir aynı sınırlar (id:[alt,ust]).
   🔒 Ağustos 2026: b5/b6 eklendi (2.618–4.236) — bkz. MB_BOLGE üstündeki not.
   Bu tablo server MB_BOLGE'nin elle senkronize tutulan bir aynasıdır; ikisi
   ayrı diziler olduğu için biri güncellenip öbürü unutulursa iki tarama
   yolu (canlı ekran / KV-arka plan) yeniden birbirinden sapar — bölge
   sınırı değiştirilecekse İKİSİ DE değiştirilmeli. */
const MB_BOLGE_S={b1:[0.0,0.618],b2:[0.618,1.0],b3:[1.0,1.618],b4:[1.618,2.618],
                  b5:[2.618,3.618],b6:[3.618,4.236]};
const MB_PIVOT_S={KISA:"potansiyel",ORTA:"fibo",UZUN:"uzunvade"};
const MB_PIVOT_ADAY={KISA:"adayOrta",ORTA:"adayOrtaVade",UZUN:"adayUzun"};
function mbSayiNorm(v,vars,alt,ust){
  const n=Number(v);
  if(!isFinite(n))return vars;
  return Math.min(ust,Math.max(alt,n));
}
/* 🔒 KİLİT FİX (Ağustos 2026) — "boğa filtresine ayı sızması" burada da vardı:
   Bu fonksiyon yalnız "oran" (fiyatın merdivendeki konumu) alıyordu, rejimin
   (571 boğa/ayı) kendisine hiç bakmıyordu — canlı ekrandaki mbCondBolge'de
   düzeltilen sızıntının BİREBİR AYNISI, bu ayrı (KV arka plan) tarama
   yolunda hâlâ açıktı. Artık x'in tamamı alınıyor ve boğa şartı burada da
   dayatılıyor — "hisse boğa iken o aralıkta olanlar" iki yolda da geçerli. */
function mbBolgeGectiS(x,ist){
  if(!ist.bolge||!ist.bolge.acik)return!0;
  if(!x||!x.boga)return!1;
  const oran=x.oran;
  if(oran===null||oran===undefined||!isFinite(oran))return!1;
  for(const id of ist.bolge.secili){
    const b=MB_BOLGE_S[id];
    if(b&&oran>=b[0]&&oran<b[1])return!0;
  }
  return!1;
}
/* ⚛ 6.2:2903 — enerji süzgeci. Hiç durum tikli değilse durum şartı aranmaz
   (Pine'daki _ez_status_any davranışı), mesafe şartı yine de uygulanır. */
function mbEnerjiGectiS(x,ist){
  const e=ist.enerji;
  if(!e||!e.acik)return!0;
  const durumVar=e.olustu||e.icinde||e.b0||e.b1;
  let uydu=!durumVar;
  if(!uydu){
    if(e.olustu&&Number(x.ezAct)>0.5)uydu=!0;
    if(!uydu&&e.icinde&&Number(x.ezIns)>0.5)uydu=!0;
    if(!uydu&&e.b0&&Number(x.ezAge)===0)uydu=!0;
    if(!uydu&&e.b1&&Number(x.ezAge)===1)uydu=!0;
  }
  if(!uydu)return!1;
  if(e.mesafeAcik&&!(x.ezMes!==null&&x.ezMes!==undefined&&Number(x.ezMes)<=e.mesafe))return!1;
  return!0;
}
/* 📈 Pivot kırılım — uygulamadaki mbPivotGecti ile aynı kurallar, ama
   kartlar sunucuda g(A) ile okunur. Harita tur başına bir kez kurulur. */
let _mbPivotHar=null,_mbPivotTs=0;
async function mbPivotHaritasiS(A){
  if(_mbPivotHar&&Date.now()-_mbPivotTs<6e4)return _mbPivotHar;
  let K={};
  try{const v=await g(A);K=(v&&v.kartlar)||{}}catch(_){K={}}
  const har={};
  for(const ad of Object.keys(MB_PIVOT_S)){
    for(const x of (K[MB_PIVOT_S[ad]]||[])){
      if(!x||!x.kod)continue;
      if(!har[x.kod])har[x.kod]={};
      const giris=Number(x.giris),fiyat=Number(x.fiyat);
      har[x.kod][ad]={tip:"kirdi",sonBar:!!x.canli,
        uzerinde:(giris>0&&fiyat>0)?(fiyat>=giris):!!x.canli,yuzde:null};
    }
    for(const x of (K[MB_PIVOT_ADAY[ad]]||[])){
      if(!x||!x.kod)continue;
      if(!har[x.kod])har[x.kod]={};
      if(har[x.kod][ad]&&har[x.kod][ad].tip==="kirdi")continue;
      har[x.kod][ad]={tip:"aday",sonBar:!1,uzerinde:!1,
        yuzde:(x.tetikYuzde===null||x.tetikYuzde===undefined)?null:Number(x.tetikYuzde)};
    }
  }
  _mbPivotHar=har;_mbPivotTs=Date.now();
  return har;
}
function mbPivotGectiS(kod,ist,har){
  const p=ist.pivot;
  if(!p||!p.acik)return!0;
  const h=har&&har[kod];
  if(!h)return!1;
  for(const d of p.dilimler){
    const x=h[d];if(!x)continue;
    if(p.kirdi&&x.tip==="kirdi"&&x.sonBar)return!0;
    if(p.uzerinde&&x.tip==="kirdi"&&x.uzerinde)return!0;
    if(p.yakin&&x.tip==="aday"&&x.yuzde!==null&&Math.abs(x.yuzde)<=p.yuzde)return!0;
  }
  return!1;
}

/* Tek ölçüm (x) tek dilimde modüllerden geçiyor mu?
   MODÜLLER ARASI = VE (hepsi tutmalı, tikliyse zaten istenmiştir).
   MODÜL İÇİNDE çoklu tik = VEYA (toplama ya da dağıtım / boğa ya da ayı). */
function mbModulGecti(x,ist){
  if(ist.mal.acik){
    const N=ist.mal.sinirsiz?1e9:ist.mal.n;
    let ok=!1;
    if(ist.mal.top)ok=ok||(ist.mal.temiz?(x.topHam<=N&&x.topHam<x.dagHam):x.topHam<=N);
    if(ist.mal.dag)ok=ok||(x.dagHam<=N);
    if(!ok)return!1;
  }
  if(ist.dip.acik&&!x[ist.dip.kademe])return!1;
  if(!mbBolgeGectiS(x,ist))return!1;
  if(!mbEnerjiGectiS(x,ist))return!1;
  if(ist.ab.acik){
    const N=ist.ab.sinirsiz?1e9:ist.ab.n;
    let ok=!1;
    if(ist.ab.boga)ok=ok||(!!x.boga&&x.rejYas<=N);
    if(ist.ab.ayi) ok=ok||(!!x.ayi &&x.rejYas<=N);
    if(!ok)return!1;
  }
  return!0;
}
/* En taze olay kaç bar önce oldu — sıralama anahtarı. */
const mbTazelik=x=>Math.min(Number(x.topHam),Number(x.dagHam),Number(x.rejYas));

/* ── ÜÇ MODÜL × SEÇİLİ ZAMAN DİLİMLERİ ────────────────────────────────
   Sonuç dilim dilim gruplanır. Aynı hisse birden çok dilimde çıkarsa her
   satırda diğer dilimler de yazılır (kesişim kullanıcının asıl aradığı şey).
   TAZELEME: istek başına yalnız BİR dilim ilerletilir (en bayat olan) —
   yedi dilim birden tazelenirse tek istekte 84 Yahoo çağrısı olurdu. */
async function mbModulTara(A,ist){
  const calisiyor=await mbCalisiyorMu(A);
  /* 1) en bayat seçili dilimi bul ve onu ilerlet */
  if(calisiyor){
    let hedef=null,enKotu=-1;
    for(const tf of ist.tfler){
      const b=await mbTfOku(A,tf);
      const bos=!b.sonuc||!Object.keys(b.sonuc).length;
      const oran=bos?1e9:(Date.now()-(b.ts||0))/(MB_TAZELIK[tf]||36e5);
      if(oran>1&&oran>enKotu){enKotu=oran;hedef=tf}
    }
    if(hedef)await mbDilimTara(A,hedef,MB_ANLIK_AZAMI).catch(()=>{});
  }
  /* 2) her seçili dilimde süz */
  const gecenHar={},gruplar={},har={};
  for(const tf of ist.tfler){
    const bir=await mbTfOku(A,tf,!0);          /* parçalar dahil */
    const sonuc=bir.sonuc||{};har[tf]=sonuc;
    const liste=[];
    for(const kod of Object.keys(sonuc)){
      const x=sonuc[kod];
      if(mbModulGecti(x,ist))liste.push(Object.assign({kod:kod},x));
    }
    liste.sort((a,b)=>(mbTazelik(a)-mbTazelik(b))||(a.kod<b.kod?-1:1));
    gecenHar[tf]=new Set(liste.map(x=>x.kod));
    const n=Object.keys(sonuc).length;
    gruplar[tf]={tf:tf,ad:MB_TF[tf].ad,ik:MB_TF[tf].ik,
      olculen:n,evren:bir.evren||n,kalan:Math.max(0,(bir.evren||n)-n),
      yas:bir.ts?Math.round((Date.now()-bir.ts)/6e4):null,
      cikan:liste.length,liste:liste.slice(0,120)};
  }
  /* 3) bütün seçili dilimlerde birden geçenler = KESİŞİM */
  let ortak=null;
  for(const tf of ist.tfler)ortak=ortak===null?new Set(gecenHar[tf]):
    new Set([...ortak].filter(k=>gecenHar[tf].has(k)));
  const ortakListe=[...(ortak||[])].sort();
  /* Bir hissenin seçili dilimlerdeki durumu — satırda gösterilir ki
     "acaba şu dilimde ayı mı" sorusu hiç doğmasın. */
  const durumSeridi=(kod)=>ist.tfler.map(tf=>{
    const m=(har[tf]||{})[kod];
    if(!m)return{tf:tf,yok:!0};
    return{tf:tf,boga:!!m.boga,ayi:!!m.ayi,rejYas:m.rejYas,
      topHam:m.topHam,dagHam:m.dagHam,dip:!!m.dip,
      dip382:!!m.dip382,dip236:!!m.dip236,gecti:gecenHar[tf].has(kod)};
  });
  if(ist.kapsam==="hepsi"){
    /* TEK liste: yalnız her dilimde tutan hisseler. Gösterilen ölçüm en
       büyük seçili dilimden alınır (fiyat/rejim orada en anlamlı). */
    const enBuyuk=ist.tfler[ist.tfler.length-1];
    const kaynak=har[enBuyuk]||{};
    const liste=ortakListe.map(kod=>Object.assign({kod:kod},kaynak[kod]||{},
      {tfDurum:durumSeridi(kod),digerTfler:[]}))
      .sort((a,b)=>(mbTazelik(a)-mbTazelik(b))||(a.kod<b.kod?-1:1));
    const olculen=Math.min.apply(null,ist.tfler.map(t=>gruplar[t].olculen));
    const evren=Math.max.apply(null,ist.tfler.map(t=>gruplar[t].evren));
    return{kapsam:"hepsi",calisiyor:calisiyor,ortak:ortakListe,
      dilimDurum:ist.tfler.map(t=>({tf:t,ad:gruplar[t].ad,ik:gruplar[t].ik,
        olculen:gruplar[t].olculen,evren:gruplar[t].evren,cikan:gruplar[t].cikan,yas:gruplar[t].yas})),
      gruplar:[{tf:"HEPSİ",ad:ist.tfler.join(" + ")+" dilimlerinin HEPSİNDE",ik:"🎯",
        olculen:olculen,evren:evren,kalan:Math.max(0,evren-olculen),
        yas:gruplar[enBuyuk].yas,cikan:liste.length,liste:liste.slice(0,150)}]};
  }
  /* "herhangi" kipi: eski davranış — dilim dilim ayrı kartlar */
  const sirali=ist.tfler.map(t=>gruplar[t]);
  for(const g of sirali)
    for(const x of g.liste){
      const d=[];
      for(const tf of ist.tfler)if(tf!==g.tf&&gecenHar[tf].has(x.kod))d.push(tf);
      x.digerTfler=d;
      x.tfDurum=durumSeridi(x.kod);
    }
  return{kapsam:"herhangi",gruplar:sirali,ortak:ortakListe,calisiyor:calisiyor,
    dilimDurum:sirali.map(g=>({tf:g.tf,ad:g.ad,ik:g.ik,olculen:g.olculen,
      evren:g.evren,cikan:g.cikan,yas:g.yas}))};
}
/* Zaman dilimi seçicisinin altında görünen sayaçlar (her dilimde kaç ölçüm var). */
async function mbDilimDurum(A){
  const out=[];
  for(const t of MB_TF_LISTE){
    const b=await mbTfOku(A,t);
    const n=Object.keys(b.sonuc||{}).length;
    out.push({tf:t,ad:MB_TF[t].ad,ik:MB_TF[t].ik,olculen:n,evren:b.evren||0,
      yas:b.ts?Math.round((Date.now()-b.ts)/6e4):null});
  }
  return out;
}

/* ══════════════════════════════════════════════════════════════════════
   🔔 FİLTRE ALARMI — "bu taramayı seans içinde bana bildir"
   ══════════════════════════════════════════════════════════════════════
   Yönetici ekranda modülleri/dilimleri ayarlar ve "Bu filtreyi alarma
   gönder" der. Filtre KV'ye yazılır; her /push turunda arka planda
   yeniden ölçülür ve LİSTEYE YENİ GİREN hisseler bildirim olarak gider.
   Alıcılar: alarmKullanicilari() — yönetici + süper üyeler (mevcut alarm
   akışının aynı süzgeci).

   TASARIM KARARLARI:
   1) Alarm YENİ GİRENLERİ bildirir, listenin tamamını değil. Aksi hâlde
      aynı hisse her turda tekrar tekrar gelirdi.
   2) Filtre kaydedilirken o anki eşleşmeler "görülmüş" sayılır (tohumlama).
      Yoksa kaydettiğin anda 200 hisselik bir sel gelirdi. Kayıttan
      SONRA listeye girenler bildirilir.
   3) Yalnız SEANS İÇİNDE çalışır (BIST 09:30-18:10, hafta içi). Kapalıyken
      ölçüm zaten değişmiyor, boşuna bildirim gitmesin.
   4) Hafıza günlüktür: ertesi gün sıfırlanır, aynı hisse yeni günde
      yeniden bildirilebilir.
   5) Yahoo'ya EK ÇAĞRI YAPMAZ — birikimdeki ölçümleri süzer. Ölçümleri
      tazeleyen zaten mbDilimTara'dır. */
const MB_ALARM_ON="mbAlarmFiltre:";  /* + uid = o kullanıcının 5 yuvası */
const MB_ALARM_GUN_ON="mbAlarmGun:"; /* + uid = o kullanıcının günlük hafızası */
const MB_ALARM_AZAMI=12;            /* tek mesajda en fazla kaç hisse */
const MB_ALARM_YUVA=5;              /* kullanıcı başına en fazla kaç ayrı filtre alarmı */
const MB_BOLGE_AD={b1:"dikkat ayı→boğa",b2:"boğa→karar",b3:"karar→direnç",b4:"direnç→güçlü D/D",
                   b5:"güçlü D/D→çok güçlü D/D",b6:"çok güçlü D/D→doyum"};

/* ── KULLANICI BAŞINA BEŞ YUVA ────────────────────────────────────────
   🐞 DÜZELTİLEN HATA: eskiden TÜM SİSTEM tek bir global KV anahtarına
   (mbAlarmFiltre) yazıyordu — yani 5 yuva bir kullanıcıya değil, bütün
   bota aitti ve yalnız yönetici kurabiliyordu. Bir kullanıcı "alarm
   kurdum" sanırken aslında herkesin paylaştığı tek kaydı değiştiriyordu;
   silinmiş gibi görünmesinin asıl sebebi buydu.
   ARTIK: her kullanıcının kendi 5 yuvası kendi uid'ine göre KV'de ayrı
   tutuluyor (mbAlarmFiltre:UID), kendi "gördüklerim" günlük hafızası ayrı
   (mbAlarmGun:UID) ve bildirim doğrudan kendisine gidiyor. */
async function mbAlarmListeOku(A,uid){
  if(!uid)return[];
  let ham=null;
  try{const h=A&&A.VERI&&await A.VERI.get(MB_ALARM_ON+uid);if(h)ham=JSON.parse(h)}catch(_){}
  /* 🔁 TEK SEFERLİK GÖÇ: eski sürümde tek global anahtar (mbAlarmFiltre)
     vardı ve yalnız yönetici kurabiliyordu. Yöneticinin kendi uid'inde
     henüz kayıt yoksa eski global anahtara bakılır, bulunursa kendi
     hesabına taşınır — kurduğu alarm kaybolmasın. */
  if(!ham&&d(uid)){
    try{const eski=A&&A.VERI&&await A.VERI.get("mbAlarmFiltre");
      if(eski){const j=JSON.parse(eski);
        if(j&&(Array.isArray(j.liste)||j.ist)){ham=j;
          await A.VERI.put(MB_ALARM_ON+uid,eski).catch(()=>{});
          await A.VERI.delete("mbAlarmFiltre").catch(()=>{});}}}catch(_){}
  }
  if(!ham)return[];
  /* v1 (tek filtre) → v2 (liste) göçü */
  if(!Array.isArray(ham.liste)){
    if(ham.ist)return[{id:"a1",ist:ham.ist,ts:ham.ts||Date.now(),kuran:ham.kuran||""}];
    return[];
  }
  return ham.liste.filter(x=>x&&x.ist).slice(0,MB_ALARM_YUVA);
}
async function mbAlarmListeYaz(A,uid,liste){
  if(!A||!A.VERI||!uid)return[];
  const kirp=liste.slice(0,MB_ALARM_YUVA);
  await A.VERI.put(MB_ALARM_ON+uid,JSON.stringify({v:2,liste:kirp})).catch(()=>{});
  return kirp;
}
/* Yeni yuva ekle ya da var olanı değiştir. Dönen: {liste,yuva} */
async function mbAlarmYuvaYaz(A,ist,uid,id,ad){
  if(!uid)return{dolu:!0,liste:[]};
  const liste=await mbAlarmListeOku(A,uid);
  const yer0=liste.findIndex(x=>x.id===String(id||""));
  const eskiAd=yer0>=0?(liste[yer0].ad||""):"";
  const yeniAd=(ad!=null&&String(ad).trim())?String(ad).trim().slice(0,40):eskiAd;
  const kayit={id:String(id||("a"+Date.now().toString(36))),ist:ist,
               ts:Date.now(),kuran:String(uid||""),ad:yeniAd};
  const yer=liste.findIndex(x=>x.id===kayit.id);
  if(yer>=0)liste[yer]=kayit;
  else{
    if(liste.length>=MB_ALARM_YUVA)return{dolu:!0,liste:liste};
    liste.push(kayit);
  }
  return{liste:await mbAlarmListeYaz(A,uid,liste),yuva:kayit};
}
async function mbAlarmYuvaSil(A,uid,id){
  if(!A||!A.VERI||!uid)return[];
  if(!id){                                  /* hepsi — yalnız kendi yuvaları */
    try{await A.VERI.delete(MB_ALARM_ON+uid);await A.VERI.delete(MB_ALARM_GUN_ON+uid)}catch(_){}
    return[];
  }
  const liste=(await mbAlarmListeOku(A,uid)).filter(x=>x.id!==id);
  return await mbAlarmListeYaz(A,uid,liste);
}
/* Alarmı kurulu her kullanıcının uid listesi — arka plan taraması ve
   öncelik hesaplama bunu kullanır. */
async function mbAlarmKullanicilari(A){
  if(!A||!A.VERI)return[];
  const out=[];let cursor=void 0;
  for(;;){
    const liste=await A.VERI.list({prefix:MB_ALARM_ON,limit:1e3,cursor});
    for(const k of liste.keys)out.push(k.name.slice(MB_ALARM_ON.length));
    if(liste.list_complete||!liste.cursor)break;
    cursor=liste.cursor;
  }
  return out;
}
/* Günlük "bildirdim" hafızası — kullanıcı başına. anahtar: YUVA|KOD|DİLİM */
async function mbAlarmGecmisi(A,uid){
  const bugun=onayDonemi();
  if(!uid)return{gun:bugun,anahtarlar:[]};
  try{const h=await A.VERI.get(MB_ALARM_GUN_ON+uid);
    if(h){const j=JSON.parse(h);if(j&&j.gun===bugun&&Array.isArray(j.anahtarlar))return j}}catch(_){}
  return{gun:bugun,anahtarlar:[]};
}
async function mbAlarmGecmisiYaz(A,uid,g){
  if(!uid)return;
  g.anahtarlar=g.anahtarlar.slice(-4000);
  try{await A.VERI.put(MB_ALARM_GUN_ON+uid,JSON.stringify(g),{expirationTtl:172800})}catch(_){}
}
/* BIST seansı: hafta içi 09:30-18:10 (İstanbul). Yahoo barları da bu
   aralıkta değişiyor; dışında ölçüm sabit kaldığı için alarm da susar. */
function mbSeansIci(){
  const ist=new Date(Date.now()+108e5);          /* UTC+3 */
  const gun=ist.getUTCDay();                     /* 0 Pazar · 6 Cumartesi */
  if(gun===0||gun===6)return!1;
  const dk=ist.getUTCHours()*60+ist.getUTCMinutes();
  return dk>=570&&dk<=1090;                      /* 09:30 - 18:10 */
}
/* Filtreyi tek satırda özetler — bildirimde hangi tarama olduğu belli olsun. */
function mbFiltreOzet(ist){
  const p=[];
  if(ist.mal.acik){
    const y=[];if(ist.mal.top)y.push("toplama");if(ist.mal.dag)y.push("dağıtım");
    p.push("📦 "+y.join("/")+(ist.mal.temiz?" (temiz)":"")+
      (ist.mal.sinirsiz?"":" ≤"+ist.mal.n+"B"));
  }
  if(ist.dip.acik)p.push("⬇️ "+(ist.dip.kademe==="dip236"?"en dip":ist.dip.kademe==="dip382"?"derin dip":"dip"));
  if(ist.ab.acik){
    const y=[];if(ist.ab.boga)y.push("🐂 boğa");if(ist.ab.ayi)y.push("🐻 ayı");
    p.push(y.join("/")+(ist.ab.sinirsiz?"":" ≤"+ist.ab.n+"B"));
  }
  if(ist.bolge&&ist.bolge.acik)p.push("🪜 "+ist.bolge.secili.map(v=>MB_BOLGE_AD[v]||v).join("/"));
  if(ist.enerji&&ist.enerji.acik){
    const y=[];
    if(ist.enerji.olustu)y.push("oluştu");if(ist.enerji.icinde)y.push("içinde");
    if(ist.enerji.b0)y.push("0B");if(ist.enerji.b1)y.push("1B");
    p.push("⚛ "+(y.join("/")||"her durum")+
      (ist.enerji.mesafeAcik?" ≤%"+ist.enerji.mesafe:""));
  }
  if(ist.pivot&&ist.pivot.acik){
    const y=[];
    if(ist.pivot.kirdi)y.push("son bar");if(ist.pivot.yakin)y.push("≤%"+ist.pivot.yuzde);
    if(ist.pivot.uzerinde)y.push("üzerinde");
    p.push("📈 "+ist.pivot.dilimler.join("/")+" "+y.join("/"));
  }
  return p.join(" · ")||"(koşul yok)";
}
/* Filtrenin ŞU ANKİ eşleşmeleri — birikimden, ek çekim yok.
   Dönen: {anahtarlar:Set, satirlar:[{kod,tf,fiyat,...}]} */
async function mbAlarmEslesme(A,ist,yuvaId){
  const anahtarlar=[],satirlar=[];
  const on=yuvaId?(yuvaId+"|"):"";
  const pivotAktif=!!(ist.pivot&&ist.pivot.acik);
  const har=pivotAktif?await mbPivotHaritasiS(A).catch(()=>({})):null;
  /* 🐞 DÜZELTİLEN HATA — SAF PİVOT FİLTRESİ MALBOĞA MOTORUNA REHİN KALIYORDU.
     Eskiden buradaki tek aday kaynağı mbTfOku(tf).sonuc'tu — yani MAL/AYI-
     BOĞA motorunun o zaman dilimini taramış olması ŞARTTI. Kullanıcının
     filtresi yalnız 📈 pivot kırılımı istiyorsa (mal/dip/ab/bölge/enerji
     hiçbiri açık değilse) bu motorla hiçbir ilgisi yok; pivot verisi zaten
     ayrı bir haritadan (mbPivotHaritasiS → ana liste g(A).kartlar) geliyor.
     Sonuç: hisse pivotu kırmış olsa bile malboğa o hisseyi/tf'i henüz
     taramadıysa alarm HİÇ tetiklenmiyordu — bazen saatlerce. Artık saf
     pivot filtresi doğrudan pivot haritasından okunur, malboğa turunu
     beklemez. */
  const digerAktif=ist.mal.acik||ist.dip.acik||ist.ab.acik||
    (ist.bolge&&ist.bolge.acik)||(ist.enerji&&ist.enerji.acik);
  if(pivotAktif&&!digerAktif){
    let K={};
    try{const v=await g(A);K=(v&&v.kartlar)||{}}catch(_){K={}}
    for(const kod of Object.keys(har||{})){
      if(!mbPivotGectiS(kod,ist,har))continue;
      const kart=Z({kartlar:K},kod);
      anahtarlar.push(on+kod+"|piv");
      satirlar.push({kod:kod,tf:"piv",fiyat:kart?kart.fiyat:null,
        giris:kart?kart.giris:null,hedef:kart?kart.hedef:null,taze:0,piv:!0});
    }
    return{anahtarlar:anahtarlar,satirlar:satirlar};
  }
  /* "hepsi" kapsamı: hisse seçili dilimlerin HEPSİNDE tutmalı. Uygulamadaki
     kesişim kuralının aynısı — alarm ekranda görünenden farklı davranmasın. */
  const sayac={};
  for(const tf of ist.tfler){
    const bir=_mbBellek[tf]||await mbTfOku(A,tf);
    const sonuc=bir.sonuc||{};
    for(const kod of Object.keys(sonuc)){
      const x=sonuc[kod];
      if(!mbModulGecti(x,ist))continue;
      if(har&&!mbPivotGectiS(kod,ist,har))continue;
      sayac[kod]=(sayac[kod]||0)+1;
      anahtarlar.push(on+kod+"|"+tf);
      satirlar.push({kod:kod,tf:tf,fiyat:x.fiyat,topHam:x.topHam,dagHam:x.dagHam,
        boga:x.boga,ayi:x.ayi,rejYas:x.rejYas,dip:x.dip,taze:mbTazelik(x),
        ezAge:x.ezAge,ezMes:x.ezMes,oran:x.oran});
    }
  }
  if(ist.kapsam==="hepsi"&&ist.tfler.length>1){
    const tam=ist.tfler.length;
    return{anahtarlar:anahtarlar.filter(a=>sayac[a.slice(on.length).split("|")[0]]>=tam),
           satirlar:satirlar.filter(x=>sayac[x.kod]>=tam)};
  }
  return{anahtarlar:anahtarlar,satirlar:satirlar};
}
/* Kaydederken tohumla: o anki eşleşmeler "bildirildi" sayılsın.
   🐞 Eskiden bütün hafızayı EZİYORDU — beşinci yuva kurulunca diğer dört
   yuvanın "gördüm" listesi siliniyor, hepsi baştan sel gibi bildiriyordu.
   Artık yalnız KENDİ yuvasının anahtarları eklenir. */
async function mbAlarmTohumla(A,uid,ist,yuvaId){
  const e=await mbAlarmEslesme(A,ist,yuvaId);
  const g=await mbAlarmGecmisi(A,uid);
  const set=new Set(g.anahtarlar);
  for(const a of e.anahtarlar)set.add(a);
  await mbAlarmGecmisiYaz(A,uid,{gun:onayDonemi(),anahtarlar:[...set]});
  return e.anahtarlar.length;
}
/* Her /push turunda çalışır. Alarmı kurulu HER KULLANICI için, o kullanıcının
   kendi yuvalarına yeni girenleri bulur ve YALNIZ KENDİSİNE bildirir.
   Kullanıcılar birbirini etkilemez — kendi hafızası, kendi mesajı. */
async function mbAlarmTara(A){
  if(!A||!A.VERI||!A.BOT_TOKEN)return;
  if(!mbSeansIci())return;                           /* seans dışı */
  const kullanicilar=await mbAlarmKullanicilari(A);
  if(!kullanicilar.length)return;                     /* hiç kimse kurmamış */
  const kanal=String((A.ALARM_KANAL||"")).trim();
  for(const uid of kullanicilar){
    const yuvalar=await mbAlarmListeOku(A,uid).catch(()=>[]);
    if(!yuvalar.length)continue;
    const gecmis=await mbAlarmGecmisi(A,uid);
    const bilinen=new Set(gecmis.anahtarlar);
    const parcalar=[];
    let eklendi=0;
    for(let yi=0;yi<yuvalar.length;yi++){
      const yuva=yuvalar[yi];
      const ist=mbIstekNorm(yuva.ist);
      if(!mbFiltreVarMi(ist))continue;
      const e=await mbAlarmEslesme(A,ist,yuva.id).catch(()=>null);
      if(!e)continue;
      const yeni=e.satirlar.filter((sx,i)=>!bilinen.has(e.anahtarlar[i]));
      /* Hafızaya YENİLERİN HEPSİ yazılır (mesajda gösterilmeyenler dahil) —
         yoksa tavanın altında kalanlar her turda tekrar "yeni" sayılırdı. */
      for(let i=0;i<e.anahtarlar.length;i++)
        if(!bilinen.has(e.anahtarlar[i])){bilinen.add(e.anahtarlar[i]);
          gecmis.anahtarlar.push(e.anahtarlar[i]);eklendi++}
      if(!yeni.length)continue;
      /* En taze olay önce; mesaj kalabalık olmasın diye tavan var. */
      yeni.sort((a,b)=>(a.taze-b.taze)||(a.kod<b.kod?-1:1));
      const gosterilen=yeni.slice(0,MB_ALARM_AZAMI);
      const grup={};
      for(const sx of gosterilen){(grup[sx.tf]=grup[sx.tf]||[]).push(sx)}
      let m="🔔 <b>"+(yuva.ad?E2(yuva.ad):("ALARM "+(yi+1)+"/"+yuvalar.length))+"</b>\n<i>"+mbFiltreOzet(ist)+"</i>\n";
      /* Saf pivot satırları (tf:"piv") malboğa alanı taşımaz — kendi biçimiyle
         yazılır, tf grupları arasında değil, en üstte. */
      const gpiv=grup.piv;
      if(gpiv&&gpiv.length){
        m+="\n📈 <b>Pivot kırılımı</b>\n";
        for(const sx of gpiv){
          const f=v=>v===null||v===undefined?"?":Number(v).toFixed(2);
          m+="• <b>"+sx.kod+"</b>  "+f(sx.fiyat)+
            (sx.giris!==null&&sx.giris!==undefined?"  ·  giriş "+f(sx.giris):"")+
            (sx.hedef!==null&&sx.hedef!==undefined?"  ·  hedef "+f(sx.hedef):"")+"\n";
        }
      }
      for(const tf of ist.tfler){
        const gg=grup[tf];if(!gg||!gg.length)continue;
        m+="\n"+(MB_TF[tf]?MB_TF[tf].ik+" <b>"+MB_TF[tf].ad+"</b>":tf)+"\n";
        for(const sx of gg){
          const mal=sx.topHam<=sx.dagHam?("TOP "+(sx.topHam>999?"-":sx.topHam+"B")):("DAĞ "+(sx.dagHam>999?"-":sx.dagHam+"B"));
          m+="• <b>"+sx.kod+"</b>  "+sx.fiyat+"  ·  "+mal+"  ·  "+
            (sx.boga?"🐂":sx.ayi?"🐻":"?")+sx.rejYas+"B"+(sx.dip?"  ⬇️":"")+
            (ist.enerji.acik&&sx.ezMes!==null&&sx.ezMes!==undefined?
              "  ·  ⚛"+(sx.ezAge===0?"0B↑":sx.ezAge===1?"1B↑":"%"+sx.ezMes):"")+"\n";
        }
      }
      while(m.slice(-1)==="\n")m=m.slice(0,-1);
      if(yeni.length>gosterilen.length)
        m+="\n<i>…ve "+(yeni.length-gosterilen.length)+" hisse daha.</i>";
      parcalar.push(m);
    }
    if(eklendi)await mbAlarmGecmisiYaz(A,uid,gecmis);
    if(!parcalar.length)continue;
    const metin=parcalar.join("\n\n──────────\n\n")+"\n\n<i>⚠️ Yatırım tavsiyesi değildir.</i>";
    /* Doğrudan bu kullanıcıya özel mesaj. */
    await b(A.BOT_TOKEN,"sendMessage",{chat_id:uid,text:metin,
      parse_mode:"HTML",disable_web_page_preview:!0}).catch(()=>{});
    /* Yöneticinin kendi filtreleri eskisi gibi kanala da düşsün istiyorsa
       (ALARM_KANAL tanımlıysa) bu geriye dönük uyumluluk için korunuyor. */
    if(kanal&&d(uid))await b(A.BOT_TOKEN,"sendMessage",{chat_id:kanal,text:metin,
      parse_mode:"HTML",disable_web_page_preview:!0}).catch(()=>{});
    saglikArtir("mbAlarm");
  }
}
/* Kurulu alarmların ihtiyaç duyduğu dilimlerden EN EKSİK olanı önce ilerlet.
   Alarm yoksa eski davranış (yedi dilim sırayla) aynen sürer. */
async function mbAlarmOncelikliTara(A){
  const kullanicilar=await mbAlarmKullanicilari(A).catch(()=>[]);
  if(!kullanicilar.length)return mbDilimTara(A);
  const gerekli=[];
  for(const uid of kullanicilar){
    const yuvalar=await mbAlarmListeOku(A,uid).catch(()=>[]);
    for(const y of yuvalar){
      const ynorm=mbIstekNorm(y.ist);
      /* Saf pivot filtresi (mal/dip/ab/bölge/enerji hiçbiri açık değil)
         malboğa dilimine ihtiyaç duymuyor artık — öncelik listesine
         boşuna dilim eklenip tarama kaynağı çarçur edilmesin. */
      const digerAktif=ynorm.mal.acik||ynorm.dip.acik||ynorm.ab.acik||
        (ynorm.bolge&&ynorm.bolge.acik)||(ynorm.enerji&&ynorm.enerji.acik);
      if(ynorm.pivot&&ynorm.pivot.acik&&!digerAktif)continue;
      for(const t of ynorm.tfler)if(gerekli.indexOf(t)<0)gerekli.push(t);
    }
  }
  if(!gerekli.length)return mbDilimTara(A);
  const evrenSayi=(await mbEvren(A)).length||1;
  let hedef=null,enAz=1e9;
  for(const t of gerekli){
    const b=await mbTfOku(A,t);
    const n=Object.keys((b&&b.sonuc)||{}).length;
    if(n<enAz){enAz=n;hedef=t}
  }
  /* Alarmın bütün dilimleri doluysa sıradaki dilimlere dön — havuz taze kalsın. */
  if(hedef&&enAz>=evrenSayi)return mbDilimTara(A);
  return mbDilimTara(A,hedef);
}
/* Bir filtrede gerçekten aranan bir şey var mı? */
function mbFiltreVarMi(ist){
  return!!(ist.mal.acik||ist.dip.acik||ist.ab.acik||
           (ist.bolge&&ist.bolge.acik)||(ist.enerji&&ist.enerji.acik)||
           (ist.pivot&&ist.pivot.acik));
}
/* Alarm ekranı için özet — kaç yuva dolu, hangi filtreler kurulu. */
/* 🐞 DÜZELTİLEN HATA — "eklendi" yazıyor ama liste boş görünüyor.
   Eskiden alarmKur/alarmSil sonrası buraya HER SEFERİNDE yeniden KV'den
   okunuyordu. put() az önce yapılmış olsa da KV yaz-sonrası-oku garantisi
   anlık değil; aynı istek içinde bile bazen eski/boş veri dönebiliyor —
   ekranda "✅ eklendi" ile "0/5 dolu" birlikte görünüyordu. Artık BU
   fonksiyon KV'ye gitmiyor, elde zaten olan (yazma sonrası bellekteki)
   listeyi paketliyor. KV'den okuma yalnız ilk yüklemede (mbAlarmCek) olur. */
function mbAlarmOzetPaketle(liste){
  return{yuva:MB_ALARM_YUVA,seans:mbSeansIci(),
    liste:(liste||[]).map(y=>{const i2=mbIstekNorm(y.ist);
      return{id:y.id,ad:y.ad||"",ozet:mbFiltreOzet(i2),tfler:i2.tfler,ts:y.ts,ist:i2}})};
}
async function mbAlarmOzetListe(A,uid){
  return mbAlarmOzetPaketle(await mbAlarmListeOku(A,uid).catch(()=>[]));
}

/* ---------- B) 🔐 İMZALI PANEL ANAHTARI ----------
   ESKİ DURUM: /panel?key=kolayfix — anahtar sabit, süresiz, ekran
   görüntüsüne düşse ya da tarayıcı geçmişinde kalsa sonsuza kadar geçerli.
   YENİ: bota /panel yazınca 30 dakika geçerli, imzalı tek kullanımlık bir
   adres üretiliyor. İmza BOT_TOKEN ile atılıyor (zaten gizli), taklit
   edilemez. ESKİ ?key= ADRESİ ÇALIŞMAYA DEVAM EDİYOR — kayıtlı yer imlerin
   bozulmasın diye kaldırmadım. */
function b64url(buf){
  let s2="";const u8=new Uint8Array(buf);
  for(let i=0;i<u8.length;i++)s2+=String.fromCharCode(u8[i]);
  return btoa(s2).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
}
async function panelImzala(A,veri){
  const gizli=String(A.BOT_TOKEN||A.PANEL_KEY||A.PUSH_KEY||"fixborsa");
  const k=await crypto.subtle.importKey("raw",new TextEncoder().encode(gizli),
    {name:"HMAC",hash:"SHA-256"},!1,["sign"]);
  const im=await crypto.subtle.sign("HMAC",k,new TextEncoder().encode(veri));
  return b64url(im).slice(0,32);
}
const PANEL_TOKEN_SN=1800; /* 30 dakika */
async function panelTokenUret(A,uid){
  const bitis=Math.floor(Date.now()/1e3)+PANEL_TOKEN_SN,govde=String(uid)+"."+bitis;
  return govde+"."+await panelImzala(A,govde);
}
async function panelTokenGecerli(A,token){
  try{
    const p2=String(token||"").split(".");
    if(3!==p2.length)return!1;
    const[uid,bitis,imza]=p2;
    if(!d(uid))return!1;                                   /* sadece yönetici */
    if(Number(bitis)<Math.floor(Date.now()/1e3))return!1;   /* süresi dolmuş */
    const beklenen=await panelImzala(A,uid+"."+bitis);
    return imza===beklenen;
  }catch(e){return!1}
}

/* LİSTE OKUMA — TAZELİK GARANTİLİ.
   ESKİ HATA: bellekteki kopya (o) bir kez doldu mu bir daha ASLA
   tazelenmiyordu ("if(o)return o"). Cloudflare aynı worker'i birden çok
   izole kopyada calistirir; /push yalnız BİR kopyaya ulaşır, diğerleri
   ilk okudukları listeyi saatlerce servis eder. Kullanıcı uygulamayı iki
   kez açtığında iki farklı tarama sonucu görür — bir sekmede olan hisse
   diğerinde yoktur. ARTIK: bellek kopyası en fazla TAZE_MS kadar yaşar,
   sonra KV'den yeniden okunur. */
const TAZE_MS=2e4,YAS=v=>v&&v.guncelleme?Date.parse(v.guncelleme)||0:0;
async function g(e){
if(o&&Date.now()-oTS<TAZE_MS)return o;
let a=null,b=null;
if(e.VERI){const t=await e.VERI.get("listeler");if(t){try{a=JSON.parse(t)}catch(x){}}}
try{const t=await caches.default.match(new Request(l));if(t)b=await t.json().catch(()=>null)}catch(x){}
/* En YENİ kopya kazanır: KV en fazla 2 dk'da bir yazılıyor, önbellek her
   push'ta tazeleniyor ama yalnız kendi veri merkezinde. Elimizdeki kopya
   ikisinden de yeniyse (bu izole kopya push'u kendisi aldıysa) korunur. */
let y=o;
if(!y||YAS(a)>YAS(y))y=a||y;
if(!y||YAS(b)>YAS(y))y=b||y;
if(y){o=y,oTS=Date.now()}
return o}const h={kisitMin:7,
kisitMax:18};let w=null,O=0;async function S(e,t){if(!t&&w&&Date.now()-O<6e4)return w;let a={...h};if(e.VERI){const t=await e.VERI.get("ayar");t&&(a={...a,...JSON.parse(t)})}return w=a,O=Date.now(),a}
let T=null,x=0;async function E(e,t){if(!t&&T&&Date.now()-x<6e4)return T;if(!e.VERI)return T=[],x=Date.now(),T;const a=await e.VERI.get("vip");return T=a?JSON.parse(a):[],x=Date.now(),T}let v=null,R=0
;async function N(e,t){if(!t&&v&&Date.now()-R<6e4)return v;if(!e.VERI)return v=[],R=Date.now(),v;const a=await e.VERI.get("engel");return v=a?JSON.parse(a):[],R=Date.now(),v}
/* 🚫 BOTU ENGELLEYENLER — panelden elle "engel"lenenlerden FARKLI: bunlar
   kullanıcının kendisinin Telegram'da botu engellemesi/hesabını silmesi
   (403 Forbidden) sonucu otomatik tespit edilir. Toplu mesaj sırasında
   403 alınan her ID buraya işlenir, böylece panelde "botu engellemiş /
   ulaşılamayan" diye ayrı bir segment olarak görülüp gerçek net üye
   sayısı hesaplanabilir. */
let _beBellek=null,_beTS=0;
async function botEngelliOku(e,zorla){if(!zorla&&_beBellek&&Date.now()-_beTS<6e4)return _beBellek;if(!e.VERI)return _beBellek=[],_beTS=Date.now(),_beBellek;let l=[];try{const h=await e.VERI.get("botEngelli");if(h)l=JSON.parse(h)||[]}catch(_){}return _beBellek=l,_beTS=Date.now(),_beBellek}
async function botEngelliEkle(e,yeniListe){
  if(!e.VERI||!Array.isArray(yeniListe)||!yeniListe.length)return;
  const liste=await botEngelliOku(e,!0);const set=new Set(liste.map(String));let degisti=!1;
  for(const id of yeniListe){const s=String(id);if(!set.has(s)){set.add(s);degisti=!0}}
  if(degisti){const y=[...set];await e.VERI.put("botEngelli",JSON.stringify(y)).catch(()=>{});_beBellek=y;_beTS=Date.now()}
}
async function B(e,t){
return!d(t)&&(await N(e)).includes(String(t))}function M(e){return new Request("https://kisit.local/u/"+e)}function M60(e){return new Request("https://kisit60.local/u/"+e)}async function D(e){try{return await caches.default.delete(M(e)),!0}catch(e){return!1}}
/* TR gününe göre "bugün mü" — bot mesajlarındaki 🆕 işareti için. */
const BUGUN_MU=e=>{if(!e||!e.sinyalTs)return!1;const g=v=>Math.floor((Number(v)+10800)/86400);return g(e.sinyalTs)===g(Date.now()/1e3)};
function I(e){return void 0!==e.kar&&null!==e.kar?Number(e.kar):e.giris>0&&e.fiyat>0?100*(Number(e.fiyat)/Number(e.giris)-1):null}const A={pot:"🎯 Hedefe kalan",kar:"💰 Kâr/Zarar",yeni:"📅 Bugün"}
;function z(e,t,a){const n=e.kartlar&&e.kartlar[t]||[],i=n.length,r=[...Array(i).keys()];if("pot"===a)return r;const s=e.kartlar&&e.kartlar.sira&&e.kartlar.sira[t]&&e.kartlar.sira[t][a]
;return Array.isArray(s)&&s.length===i?s:"kar"===a?r.sort((e,t)=>(I(n[t])??-9999)-(I(n[e])??-9999)):r.sort((e,t)=>(n[t].sinyalTs||0)-(n[e].sinyalTs||0))}function U(e,t,a,n,i,r,YON){
const s=t.kartlar[a],l=Math.max(1,Math.ceil(r.length/8));let o=e+"\n";if(t.guncelleme&&YON){const e=new Date(t.guncelleme)
;o+="<i>"+String((e.getUTCHours()+3)%24).padStart(2,"0")+":"+String(e.getUTCMinutes()).padStart(2,"0")+" · "+s.length+" hisse</i>\n"}else o+="<i>"+s.length+" hisse</i>\n";o+="<i>Sıralama: "+(A[n]||A.pot)+" · sayfa "+(i+1)+"/"+l+"</i>\n",
o+="<i>Düğmede: solda hedefe kalan · sağda "+("aday"===a?"tetiğe kalan 🔓":"sinyalden bu yana")+"</i>\n\n";const c=8*i;return r.slice(c,c+8).forEach((e,t)=>{o+=function(e,t){const a=e=>Number(e).toFixed(2);let n="━━━━━━━━━━━━━━━━\n"
;n+="<b>"+t+". "+(e.rozet||"▫️")+" "+e.kod+"</b>"+(e.tf?"  ·  <i>"+e.tf+"</i>":"")+(e.etiket?"  ·  "+e.etiket:"")+"\n",
e.canli&&(n+="⚡ <i>bar kapanmadı — teyit bekliyor</i>\n"),
BUGUN_MU(e)&&(n+="🆕 <b>BUGÜN sinyal verdi</b>\n"),
void 0!==e.giris&&null!==e.giris?n+="💵 Sinyal <b>"+a(e.giris)+"</b> → Şimdi <b>"+a(e.fiyat)+"</b>\n":n+="💵 Şimdi <b>"+a(e.fiyat)+"</b>\n";const i=I(e)
;null!==i&&(n+=(i>=0?"🟢":"🔴")+" Sinyalden bu yana: <b>"+(i>=0?"+":"")+i.toFixed(2)+"%</b>\n"),null!=e.tetik&&(n+="🔓 Tetik <b>"+a(e.tetik)+"</b>"+(null!=e.tetikYuzde?"  ·  "+(e.tetikYuzde>=0?"+":"")+Number(e.tetikYuzde).toFixed(1)+"% kaldı":"")+"\n"),null!=e.hedef1&&(n+="🧱 Hedef 1 <b>"+a(e.hedef1)+"</b>"+(null!=e.hedef1Yuzde?"  ·  <b>+"+Number(e.hedef1Yuzde).toFixed(1)+"%</b>":"")+"\n"),void 0!==e.hedef&&null!==e.hedef&&(n+="🎯 Hedef 2 <b>"+a(e.hedef)+"</b>",
void 0!==e.potansiyel&&null!==e.potansiyel&&(n+=Number(e.potansiyel)<=0?"  ·  🏆 <b>TUTTU</b>":"  ·  hedefe <b>+"+Number(e.potansiyel).toFixed(1)+"%</b>"),n+="\n");const r=e.sinyalZaman||e.zaman
;return r&&(n+="🕐 <i>"+r+"</i>\n"),n}(s[e],c+t+1)}),o+="━━━━━━━━━━━━━━━━\n<i>Hisse düğmesine dokun, tam detayını gör.</i>\n",o+="<i>⚠️ Yatırım tavsiyesi değildir.</i>",o}const MINIAPP=`<!doctype html><html lang="tr"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
<title>Fix Borsa Sinyal</title>
<meta name="color-scheme" content="dark">
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lightweight-charts@5.2.0/dist/lightweight-charts.standalone.production.js" onerror="this.onerror=null;var s=document.createElement('script');s.src='https://unpkg.com/lightweight-charts@5.2.0/dist/lightweight-charts.standalone.production.js';document.head.appendChild(s)"></script>
<style>
:root{
  color-scheme:dark;
  --bg:#0e1116; --kart:#161b22; --kart2:#1c2330; --ciz:#262d38;
  --yazi:#e6edf3; --soluk:#8b949e; --mavi:#388bfd;
  --yes:#3fb950; --kir:#f85149; --sar:#d29922; --mor:#a371f7;
  --t1s:#3fb950; --t4s:#58a6ff; --t1g:#a371f7; --t1h:#ff9d4d; --tad:#d29922;
}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{margin:0;background:var(--bg);color:var(--yazi);
  font:15px/1.45 -apple-system,system-ui,"Segoe UI",Roboto,sans-serif;
  padding-bottom:calc(18px + env(safe-area-inset-bottom))}
.ust{position:sticky;top:0;z-index:20;background:var(--bg);
  padding:10px 12px 0;border-bottom:1px solid var(--ciz)}
.baslik{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}
.anaMenuBtn{background:var(--kart2);border:1px solid var(--ciz);color:var(--yazi);border-radius:9px;
  padding:7px 11px;font-size:12.5px;font-weight:700;white-space:nowrap;order:-1}
.sekmeAdi{font-size:15.5px;font-weight:800}
.baslik h1{font-size:16px;margin:0;font-weight:800;letter-spacing:.2px}
.saat{font-size:11.5px;color:var(--soluk);font-variant-numeric:tabular-nums}
.sekmeler{display:grid;grid-auto-flow:column;grid-template-rows:repeat(3,auto);gap:6px;
  overflow-x:auto;overflow-y:hidden;padding-bottom:9px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.sekmeler::-webkit-scrollbar{display:none}
.sek{flex:0 0 auto;background:var(--kart);border:1px solid var(--ciz);color:var(--soluk);
  border-radius:999px;padding:7px 13px;font-size:13px;font-weight:700;white-space:nowrap}
.sek.on{color:#fff;border-color:transparent}
.sek.on[data-r="1SA"]{background:var(--t1s);color:#08150c}
.sek.on[data-r="4SA"]{background:var(--t4s);color:#07182b}
.sek.on[data-r="1G"]{background:var(--t1g)}
.sek.on[data-r="1HAF"]{background:var(--t1h);color:#2a1400}
.sek.on[data-r="aday"]{background:var(--tad);color:#1d1503}
.sek.on[data-r="nötr"]{background:var(--mavi)}
.govde{padding:10px 12px}
.sirala{display:flex;gap:6px;margin-bottom:10px;overflow-x:auto;scrollbar-width:none}
.sirala::-webkit-scrollbar{display:none}
.sir{flex:0 0 auto;background:transparent;border:1px solid var(--ciz);color:var(--soluk);
  border-radius:8px;padding:5px 10px;font-size:12px;font-weight:600}
.sir.on{background:var(--kart2);color:var(--yazi);border-color:#3a4553}
.satir{display:flex;align-items:center;gap:10px;background:var(--kart);
  border:1px solid var(--ciz);border-left:3px solid var(--ciz);
  border-radius:12px;padding:11px 12px;margin-bottom:8px}
.satir:active{background:var(--kart2)}
.satir.adaySatir:active{background:var(--kart)}
.satir .sol{flex:1;min-width:0}
.ahBlok{display:flex;flex-direction:column;gap:2px;margin-top:4px}
.ahSat{font-size:12.5px;color:var(--yazi);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ahSat b{font-variant-numeric:tabular-nums}
.ahYuz{font-size:11.5px;color:var(--soluk);font-weight:600}
.ahYuz.sa{color:var(--sar)}
.kod{font-weight:800;font-size:15.5px;letter-spacing:.3px}
.altbilgi{font-size:11.5px;color:var(--soluk);margin-top:3px;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.alt2{font-size:11px;color:var(--soluk);margin-top:2px;font-variant-numeric:tabular-nums}
.alt2 b{color:var(--yazi)}
.rozetKucuk{display:inline-block;border:1px solid;border-radius:6px;padding:1px 7px;
  font-size:10px;font-weight:700;margin-top:5px}
.yorumSat{font-size:13px;color:var(--soluk);margin-top:5px;font-variant-numeric:tabular-nums}
.yorumSat b{color:var(--yazi);font-weight:800}
.anlatim{font-size:12.5px;color:var(--soluk);margin-top:8px;line-height:1.5}
.anlatim b{color:var(--yazi)}
.sag{text-align:right;flex:0 0 auto}
.fiyat{font-weight:800;font-size:15px;font-variant-numeric:tabular-nums}
.yuzde{font-size:12px;font-weight:700;margin-top:3px;font-variant-numeric:tabular-nums}
.ye{color:var(--yes)} .kr{color:var(--kir)} .sa{color:var(--sar)} .so{color:var(--soluk)}
.rz{font-size:13px;margin-right:2px}
/* BUGÜN vurgusu: bugün sinyal veren satır gözden kaçmasın. Rozet parlak,
   satırın kendisi hafif yeşil zeminli — listeyi kaydırırken göz doğrudan
   bunlara takılır. */
.bgn{display:inline-block;background:var(--yes);color:#05130a;font-size:10px;
  font-weight:900;letter-spacing:.4px;border-radius:6px;padding:2px 5px;
  margin-right:5px;vertical-align:2px}
.satir.bgnSatir{background:linear-gradient(90deg,rgba(63,185,80,.16),var(--kart) 55%);
  border-color:rgba(63,185,80,.45)}
.hotKart.bgnKart{box-shadow:0 0 0 1px rgba(63,185,80,.55) inset}
.hotKart.bgnKart .hotKod::after{content:"•";color:var(--yes);margin-left:4px;font-weight:900}
.bos{text-align:center;color:var(--soluk);padding:38px 18px;font-size:13.5px;line-height:1.7}
/* 🔄 ROTASYON: dört çeyrek grafiği + sektör listesi */
.rrgKutu{background:var(--kart);border:1px solid var(--ciz);border-radius:12px;padding:8px;margin-bottom:10px}
.rrgAcik{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 2px}
.rrgAcik span{font-size:10.5px;padding:3px 7px;border-radius:6px;font-weight:800}
.q1{background:rgba(63,185,80,.18);color:#7ee787}
.q2{background:rgba(210,153,34,.18);color:#e3b341}
.q3{background:rgba(56,139,253,.18);color:#79c0ff}
.q4{background:rgba(248,81,73,.18);color:#ff7b72}
.rrgGrup{font-size:12px;font-weight:800;color:var(--soluk);margin:14px 0 6px;
  text-transform:uppercase;letter-spacing:.5px}
.rrgSat{display:flex;align-items:center;gap:8px;background:var(--kart);
  border:1px solid var(--ciz);border-left:3px solid var(--ciz);border-radius:11px;
  padding:9px 11px;margin-bottom:7px}
.rrgAd{flex:1;min-width:0;font-weight:800;font-size:14px;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rrgSay{font-size:11px;color:var(--soluk);font-weight:600}
.rrgOlc{text-align:right;font-size:11px;color:var(--soluk);font-variant-numeric:tabular-nums}
.rrgHis{font-size:11.5px;color:var(--soluk);margin:-2px 0 9px 12px;line-height:1.7}
.rrgHis b{color:var(--yazi)}
.yukleniyor{text-align:center;color:var(--soluk);padding:40px;font-size:13px}
.kutu{background:var(--kart);border:1px solid var(--ciz);border-radius:12px;
  padding:13px;margin-bottom:10px}
.kutu h3{margin:0 0 9px;font-size:13.5px;font-weight:800}
.sat{display:flex;justify-content:space-between;gap:10px;padding:5px 0;font-size:13.5px;
  border-bottom:1px solid rgba(255,255,255,.045)}
.sat:last-child{border-bottom:0}
.sat b{font-variant-numeric:tabular-nums}
.et{color:var(--soluk);font-size:12.5px}
.tfSira{display:flex;flex-direction:column;gap:8px}
.tfKutu{background:var(--kart2);border-radius:10px;padding:9px 10px}
.tfKutu .sat{font-size:12.5px;padding:3px 0}
.tfBas{border-left:3px solid var(--ciz);padding-left:7px;font-size:12.5px;margin-bottom:4px}
.dg{display:block;width:100%;background:var(--mavi);color:#fff;border:0;border-radius:10px;
  padding:13px;font-size:14.5px;font-weight:700;margin-top:9px}
.dg.ik{background:var(--kart2);border:1px solid var(--ciz);color:var(--yazi)}
.dg.kirmizi{background:var(--kir)}
.gir{width:100%;background:var(--bg);border:1px solid var(--ciz);color:var(--yazi);
  -webkit-text-fill-color:var(--yazi);caret-color:var(--yazi);
  border-radius:9px;padding:11px;font-size:14px;margin-top:7px;font-family:inherit}
textarea.gir{min-height:88px;resize:vertical}
.katman{position:fixed;inset:0;z-index:60;background:var(--bg);overflow-y:auto;
  padding:14px 12px calc(30px + env(safe-area-inset-bottom));display:none}
.katman.ac{display:block}
/* FORMASYON SAYFASI: normal detaydan (sinyal kartı, portföy düğmeleri vb.)
   bilerek ayrı tutulur — "orası ayrı bir dünya" — kendi başlığı, daha
   büyük grafiği ve yalnız formasyona özel içeriği olan tam sayfa. */
.katman.genis{background:var(--bg)}
.fBaslikBuyuk{font-size:20px;font-weight:800;letter-spacing:.3px;margin-bottom:2px}
.fAltBaslik{font-size:12.5px;color:var(--soluk);margin-bottom:12px}
.mumKutu.genis{height:320px}
.kapat{position:sticky;top:0;display:flex;justify-content:space-between;align-items:center;
  background:var(--bg);padding:2px 0 12px;margin-bottom:2px}
.kapat button{background:var(--kart2);border:1px solid var(--ciz);color:var(--yazi);
  border-radius:9px;padding:8px 14px;font-size:13px;font-weight:700}
.dbas{display:flex;align-items:baseline;gap:9px;margin-bottom:3px}
.dbas .k{font-size:22px;font-weight:800;letter-spacing:.4px}
.dbas .f{font-size:19px;font-weight:800;margin-left:auto;font-variant-numeric:tabular-nums}
.rozetler{display:flex;flex-wrap:wrap;gap:5px;margin:9px 0 12px}
.rozet{background:var(--kart2);border:1px solid var(--ciz);border-radius:7px;
  padding:4px 9px;font-size:11.5px;font-weight:700;color:var(--soluk)}
.ayna{background:var(--kart);border:1px solid var(--ciz);border-radius:12px;padding:13px;
  font-size:13px;line-height:1.72;margin-bottom:10px;overflow-wrap:anywhere}
.ayna b{color:var(--yazi)} .ayna i{color:var(--soluk);font-style:italic}
.uyari{font-size:11.5px;color:var(--soluk);text-align:center;padding:14px 6px 4px;line-height:1.6}
.kilit{text-align:center;padding:32px 18px}
.kilit .buyuk{font-size:34px;margin-bottom:10px}
.kilit h2{font-size:16px;margin:0 0 8px}
.kilit p{color:var(--soluk);font-size:13px;line-height:1.65;margin:0 0 6px}
.sayac{display:flex;gap:8px;margin-bottom:10px}
.sayac div{flex:1;background:var(--kart);border:1px solid var(--ciz);border-radius:11px;
  padding:11px 8px;text-align:center}
.sayac .n{font-size:19px;font-weight:800;font-variant-numeric:tabular-nums}
.sayac .a{font-size:10.5px;color:var(--soluk);margin-top:2px}
.bilgi{font-size:12.5px;color:var(--soluk);line-height:1.65;margin:9px 2px 4px}
.mumKutu{height:220px;position:relative}
.link{background:var(--bg);border:1px solid var(--ciz);border-radius:9px;padding:11px;
  font-size:12.5px;word-break:break-all;font-family:ui-monospace,monospace;color:var(--mavi)}
.durum{font-size:12.5px;color:var(--soluk);margin-top:8px;min-height:17px}
.pz{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}
.pzEt{font-size:10.5px;font-weight:800;color:var(--soluk);text-transform:uppercase;
  letter-spacing:.5px;margin:10px 2px 5px}
.pzEt:first-child{margin-top:2px}
.mesafeManuel{display:flex;align-items:center;gap:6px;margin-bottom:10px}
.mesafeManuel input{width:64px;background:var(--bg);border:1px solid var(--ciz);color:var(--yazi);
  border-radius:8px;padding:6px 8px;font-size:13px;font-family:inherit}
.mesafeManuel span{font-size:12px;color:var(--soluk)}
.mesafeManuel button{background:var(--mavi);color:#fff;border:0;border-radius:8px;
  padding:6px 11px;font-size:12px;font-weight:700}
.mesafeManuel button.temiz{background:transparent;border:1px solid var(--ciz);color:var(--soluk)}
.pz::-webkit-scrollbar{display:none}
.buyukN{font-size:26px;font-weight:800;font-variant-numeric:tabular-nums;line-height:1.15}
.altN{font-size:11px;color:var(--soluk);margin-top:3px}
.ikili{display:flex;gap:8px}
.ikili>div{flex:1;background:var(--kart2);border:1px solid var(--ciz);border-radius:10px;padding:10px;text-align:center}
.cubuk{height:7px;background:var(--kart2);border-radius:4px;overflow:hidden;margin-top:7px}
.cubuk>i{display:block;height:100%;background:var(--yes)}
.dilimBas{display:flex;align-items:center;gap:7px;margin:0 0 9px}
.nokta{width:9px;height:9px;border-radius:50%;flex:0 0 auto}
.grafik{display:flex;align-items:flex-end;gap:2px;height:66px;margin-top:10px;
  padding-top:4px;border-bottom:1px solid var(--ciz)}
.grafik>i{flex:1;min-width:2px;border-radius:2px 2px 0 0;display:block}
.gtab{width:100%;border-collapse:collapse;font-size:12.5px;margin-top:4px}
.gtab th{text-align:left;color:var(--soluk);font-weight:600;font-size:11px;
  padding:5px 4px;border-bottom:1px solid var(--ciz)}
.gtab td{padding:7px 4px;border-bottom:1px solid rgba(255,255,255,.045);font-variant-numeric:tabular-nums}
.gtab tr:last-child td{border-bottom:0}
.onizle{width:100%;border-radius:10px;margin-top:9px;border:1px solid var(--ciz);display:block}
.etiketDosya{display:block;background:var(--kart2);border:1px dashed #3a4553;border-radius:10px;
  padding:14px;text-align:center;font-size:13.5px;font-weight:700;margin-top:9px;color:var(--soluk)}
.serit{overflow:hidden;white-space:nowrap;background:var(--kart);border-top:1px solid var(--ciz);
  border-bottom:1px solid var(--ciz);margin:0 -12px 0;padding:7px 0;font-size:12.5px;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 26px,#000 calc(100% - 26px),transparent);
          mask-image:linear-gradient(90deg,transparent,#000 26px,#000 calc(100% - 26px),transparent)}
.serit>span{display:inline-block;padding-left:100%;animation:kay 34s linear infinite;will-change:transform}
.serit b{color:var(--yazi)} .serit .ay{color:#3a4553;margin:0 12px}
.serit .ay2{color:var(--soluk);font-size:10.5px}
.serit .ay3{color:#ffb020;font-weight:700}
.ozIki{display:flex;gap:9px;margin:4px 0 10px}
.ozKart{flex:1;background:var(--kart);border:1px solid var(--ciz);border-radius:10px;padding:11px 8px;text-align:center}
.ozBuyuk{font-size:23px;font-weight:800;line-height:1.15}
.ozAlt{font-size:11px;color:var(--soluk);margin-top:2px}
.btGun{padding:9px 0;border-bottom:1px solid var(--ciz)}
.btGun:last-child{border-bottom:0}
.btUst{display:flex;align-items:baseline;gap:8px;font-size:13px}
.btUst b:first-child{font-family:ui-monospace,monospace}
.btN{color:var(--soluk);font-size:11px;flex:1}
.btBar{height:5px;background:var(--ciz);border-radius:3px;overflow:hidden;margin:5px 0 4px}
.btDolgu{height:100%}
.btYe{background:#25d366}
.btKr{background:#ff5a5f}
.btAlt{font-size:10.5px;color:var(--soluk);line-height:1.5}
.btAc{font-size:10.5px;color:var(--soluk);line-height:1.5;opacity:.8;margin:-2px 0 6px}
.tSuz{display:flex;gap:8px;margin:6px 0}
.tGir{flex:1;min-width:0;background:var(--kart);border:1px solid var(--ciz);color:var(--yazi);
  border-radius:8px;padding:8px 10px;font-size:13px;font-family:inherit}
.tEt{flex:1;font-size:11px;color:var(--soluk);display:flex;flex-direction:column;gap:3px}
.tEt b{color:var(--yazi);font-size:12px}
.tEt input[type=range]{width:100%;accent-color:var(--in)}
.dusBas{font-size:13px;font-weight:700;margin-bottom:3px}
.dusAc{font-size:10.5px;color:var(--soluk);line-height:1.5;margin-bottom:8px}
.dusSat{padding:7px 0;border-bottom:1px solid var(--ciz)}
.dusSat:last-child{border-bottom:0}
.dusUst{display:flex;align-items:baseline;gap:8px;font-size:13px}
.dusUst .btN{flex:1}
.dusAlt{font-size:10.5px;color:var(--soluk);margin-top:2px;line-height:1.5}
.serYe{color:#25d366}
.serKr{color:#ff5a5f}
.serY{font-weight:800}
/* 🔒 Buğulu kod: yüzde görünür, hisse adı okunmaz. Süper Üyelik kancası. */
.buguluKod{filter:blur(6px);-webkit-filter:blur(6px);user-select:none;
  pointer-events:none;letter-spacing:1px}
.buguluKilit{margin-left:6px;font-size:11px;opacity:.9}
.buguluSatir{position:relative}
.hotSerit{margin:0 0 6px}
.araSat{display:flex;align-items:center;gap:6px;margin-bottom:8px}
.araGir{flex:0 1 88px;min-width:0;background:var(--kart);border:1px solid var(--ciz);color:var(--yazi);
  border-radius:8px;padding:6px 7px;font-size:13px;font-weight:700;text-transform:uppercase}
.araGir::placeholder{color:var(--soluk);text-transform:none;font-weight:400}
.roz{display:inline-block;font-size:10.5px;line-height:1.5;padding:1px 6px;margin:3px 4px 0 0;
  border-radius:5px;border:1px solid var(--ciz);white-space:nowrap}
.roz-iy{color:var(--ye);border-color:rgba(47,191,113,.35);background:rgba(47,191,113,.08)}
.roz-ko{color:var(--kr);border-color:rgba(229,72,77,.35);background:rgba(229,72,77,.08)}
.roz-no{color:var(--soluk);border-color:rgba(139,148,158,.35);background:rgba(139,148,158,.08)}
.roz-gunes{color:#ffb020;border-color:rgba(255,176,32,.5);background:rgba(255,176,32,.12);font-weight:700}
.rozSat{margin-top:4px}
.havaIkon{font-size:13px;margin-right:2px}
.yardimBtn{background:var(--kart);border:1px solid var(--ciz);color:var(--yazi);border-radius:8px;
  padding:6px 9px;font-size:14px;line-height:1.4}
.ydBlok{background:var(--kart);border:1px solid var(--ciz);border-radius:12px;padding:12px;margin-bottom:10px}
.ydBaslik{font-weight:800;font-size:14.5px;margin-bottom:4px}
.ydAlt{color:var(--soluk);font-size:12.5px;line-height:1.55;margin-bottom:2px}
.ydOr{margin-top:6px;font-size:12.5px;line-height:1.5;background:var(--kart2);border-radius:8px;padding:7px 9px}
.ydGrup{font-size:11px;font-weight:800;color:var(--sar);text-transform:uppercase;letter-spacing:.4px;
  margin:14px 0 6px}
.ydGrup:first-child{margin-top:0}
.araBtn{background:var(--kart);border:1px solid var(--ciz);color:var(--yazi);border-radius:8px;
  padding:6px 11px;font-size:14px;line-height:1.4}
.araBtn.on{background:#ffb020;border-color:#ffb020;color:#1a1200}
.hotBaslik{font-size:10px;font-weight:700;color:var(--sar);margin-bottom:3px}
.hotSira{display:flex;gap:5px;overflow-x:auto;scrollbar-width:none;padding-bottom:1px}
.hotKart{flex:0 0 54px;background:var(--kart);border:1px solid var(--ciz);
  border-left:3px solid var(--ciz);border-radius:7px;padding:4px 5px;cursor:pointer}
.hotKart:active{background:var(--kart2)}
.hotKod{font-weight:700;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hotDil{font-size:8.5px;color:var(--soluk);margin:1px 0}
.hotYuzde{font-size:9.5px;font-weight:700}
.hotKilit{font-size:11.5px;color:var(--soluk);line-height:1.5;background:var(--kart);
  border:1px solid var(--ciz);border-radius:9px;padding:8px 10px}
.hotKilitLink{color:#ffb020;font-weight:700;white-space:nowrap;cursor:pointer}
.simSatir{margin-bottom:8px}
.simSatir label{display:block;font-size:11.5px;color:var(--soluk);margin-bottom:4px}
.simSatir input{width:100%;box-sizing:border-box;background:var(--kart2);border:1px solid var(--ciz);
  border-radius:8px;padding:9px 10px;color:var(--yazi);font-size:14px;font-family:inherit}
.gunlukListe{margin-top:8px;max-height:260px;overflow-y:auto;border-top:1px solid var(--ciz)}
.gunSat{padding:8px 0;border-bottom:1px solid var(--ciz);font-size:12px}
.gunSat:last-child{border-bottom:0}
.sinSar{margin-top:5px;display:flex;flex-wrap:wrap;gap:5px}
.sinP{background:var(--kart2);border-radius:7px;padding:3px 7px;font-size:11px;font-weight:700}
.sinP.ye{color:var(--yes)} .sinP.kr{color:var(--kir)}
.sinP i{font-style:normal;color:var(--soluk);font-weight:400;margin-left:2px}
@keyframes kay{0%{transform:translateX(0)}100%{transform:translateX(-100%)}}
@media (prefers-reduced-motion:reduce){.serit>span{animation:none;padding-left:12px}}
#splash{position:fixed;inset:0;z-index:999;background:radial-gradient(120% 120% at 50% 20%,#161f2e 0%,var(--bg) 62%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;
  transition:opacity .5s ease,visibility .5s ease}
#splash.gizli{opacity:0;visibility:hidden;pointer-events:none}
#splash svg{width:96px;height:96px;filter:drop-shadow(0 6px 24px rgba(63,185,80,.25))}
#splash .sad{font-size:19px;font-weight:800;letter-spacing:.3px;color:var(--yazi);opacity:0;animation:sfade .6s ease .25s forwards}
#splash .salt{font-size:12.5px;color:var(--soluk);opacity:0;animation:sfade .6s ease .45s forwards}
#splash .spin{width:26px;height:26px;border-radius:50%;border:2.5px solid var(--ciz);
  border-top-color:var(--yes);animation:sspin .8s linear infinite;opacity:0;animation:sspin .8s linear infinite,sfade .6s ease .6s forwards}
@keyframes sfade{to{opacity:1}}
@keyframes sspin{to{transform:rotate(360deg)}}
#splash .mum{animation:mumbelir .9s ease backwards}
#splash .mum1{animation-delay:.05s}#splash .mum2{animation-delay:.15s}
#splash .mum3{animation-delay:.25s}#splash .mum4{animation-delay:.35s}
@keyframes mumbelir{from{transform:scaleY(0);opacity:0}to{transform:scaleY(1);opacity:1}}
</style></head><body>

<div id="splash">
  <svg viewBox="0 0 100 100" fill="none">
    <rect x="14" y="52" width="10" height="30" rx="2.5" class="mum mum1" fill="#f85149" transform-origin="19 82"/>
    <rect x="30" y="34" width="10" height="48" rx="2.5" class="mum mum2" fill="#3fb950" transform-origin="35 82"/>
    <rect x="46" y="44" width="10" height="38" rx="2.5" class="mum mum3" fill="#f85149" transform-origin="51 82"/>
    <rect x="62" y="18" width="10" height="64" rx="2.5" class="mum mum4" fill="#3fb950" transform-origin="67 82"/>
    <path d="M14 57 L35 39 L51 49 L67 23" stroke="#58a6ff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="67" cy="23" r="5.5" fill="#58a6ff"/>
    <path d="M67 23 L79 11" stroke="#58a6ff" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M72 11 L80 10 L79 18" stroke="#58a6ff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>
  <div class="sad">📊 Fix Borsa Sinyal</div>
  <div class="salt">BIST için teknik tarama &amp; sinyal sistemi</div>
  <div class="spin"></div>
</div>

<div class="ust">
  <div class="baslik"><button id="anaMenuBtn" class="anaMenuBtn">🏠 Ana Menü</button><button id="baslikYazi" class="anaMenuBtn">📩 Bize Ulaşın</button><span id="sekmeAdi" class="sekmeAdi"></span><div class="saat" id="saat"></div></div>
  <div class="araSat" id="araSat"><input id="araGir" class="araGir" placeholder="Hisse ara" maxlength="6" autocomplete="off" autocapitalize="characters"><button id="araBtn" class="araBtn">🔍</button><button id="taraBtn" class="araBtn" style="display:none" title="Şimdi tara ve buluta yükle">🔄</button><button id="yardimBtn" class="yardimBtn" title="Rozetler ve sekmeler ne demek?">❓</button><button id="davetBtn" class="yardimBtn" title="Sistemi paylaş, Süper Üyelik kazan">📤</button><button id="onizBtn" class="araBtn" style="display:none" title="Sıradan (süper olmayan) üye gözünden gör">👁️</button></div>
  <div class="serit" id="serit"></div>
  <div class="hotSerit" id="hotSerit"></div>
  <div class="sekmeler" id="sekmeler"></div>
</div>
<div class="govde" id="govde"><div class="yukleniyor">yükleniyor…</div></div>
<div class="katman" id="katman"></div>

<script>
function splashKapat(){
  var s=el("splash"); if(!s)return;
  s.classList.add("gizli");
  setTimeout(function(){s&&s.parentNode&&s.parentNode.removeChild(s)},600);
}
var TG=window.Telegram&&window.Telegram.WebApp;
try{TG.ready();TG.expand();if(TG.setHeaderColor)TG.setHeaderColor("#0e1116");
    if(TG.setBackgroundColor)TG.setBackgroundColor("#0e1116")}catch(e){}
function tit(){try{TG.HapticFeedback.impactOccurred("light")}catch(e){}try{if(typeof temizleAcikGrafikler==="function")temizleAcikGrafikler()}catch(e){}}
/* ═══════ 🎖️ YENİ ÖLÇÜ ROZETLERİ ═══════
   Dört ölçü de "iyi/kötü" değil, BAĞLAM taşır. O yüzden rozetler eşiğin
   iki yanını farklı renkte gösterir ve nötr bölgede hiç görünmez —
   her kartta rozet olursa rozet anlamını yitirir. */
/* Rozet ve Güneş sistemi AYNI eşikleri kullanır; ikisi ayrışırsa kullanıcı
   "rozet var ama şart sayılmamış" durumuyla karşılaşır. Tek yerden yönetilir. */
var RAF_ESIK=1.25, ER_ESIK=0.38;
function rozRaf(v){          /* hacim rafı: kırılan seviyenin altındaki yığın */
  if(!(v>0))return "";
  if(v>=RAF_ESIK)return '<span class="roz roz-iy">📚 kalın raf '+v+'x</span>';
  if(v<=0.5)return '<span class="roz roz-ko">📚 ince raf '+v+'x</span>';
  return "";
}
function rozEr(v){           /* verimlilik: trend mi testere mi */
  if(!(v>0))return "";
  if(v>=ER_ESIK)return '<span class="roz roz-iy">📐 temiz trend '+v+'</span>';
  if(v<=0.20)return '<span class="roz roz-ko">📐 testere '+v+'</span>';
  return "";
}
/* 🏭 Sektöre göre: hisse kendi sektörünün neresinde? Endeks rozetinden
   keskindir — bankacılık toptan yükselirken sıradan bir banka hissesi
   "endeksi geçiyor" görünür ama sektöründe geride kalabilir. */
function rozSektor(k){
  if(k.sektorGuc==null||!isFinite(k.sektorGuc))return "";
  var v=Number(k.sektorGuc);
  if(v>=0.5)return '<span class="roz roz-iy">🏭 sektörünü geçiyor +'+v.toFixed(2)+'</span>';
  if(v<=-0.5)return '<span class="roz roz-ko">🏭 sektöründe geride '+v.toFixed(2)+'</span>';
  return "";
}
function rozGguc(v,b){       /* endekse göre göreli güç (alfa) */
  if(v==null||!isFinite(v))return "";
  var bt=(b!=null&&isFinite(b))?' · β'+b:'';
  if(v>=3)return '<span class="roz roz-iy">📊 endeksi geçiyor +'+v+'%'+bt+'</span>';
  if(v<=-3)return '<span class="roz roz-ko">📊 endeksin gerisinde '+v+'%'+bt+'</span>';
  return "";
}
function rozAvwap(k){
  if(!(k.avwap>0)||!(k.avwapBar>=3))return "";
  return k.avwapUst!==false
    ? '<span class="roz roz-iy">⚓ ortalama üstü</span>'
    : '<span class="roz roz-ko">⚓ ortalama altı</span>';
}
/* ═══════ ☀️ HAVA DURUMU ROZETİ — 4 bağlam şartından kaçı sağlanıyor? ═══════
   Şartlar: ⚓ ortalama üstü · 📚 kalın raf (≥1.5x) · 📐 temiz trend (≥0.45)
   · 📊 endeksi geçiyor (alfa ≥ +3%). Hiçbiri tek başına "al" demiyor,
   ama dördü birden aynı hissede yeşilse tesadüf olma ihtimali düşük. */
/* ☀️ ÜÇ ŞART — endeks ölçüsü SİSTEMDEN ÇIKARILDI.
   Sebebi: göreli güç eşiği (+%3) pratikte neredeyse her kırılım yapmış
   hissede sağlanıyordu; betası düşük hisselerde endeksin açıkladığı kısım
   sıfıra yaklaşıyor ve "alfa" hissenin kendi getirisine eşitleniyordu.
   Yani dördüncü şart bir ayrım yapmıyor, sadece diğer üçünü seyreltiyordu.
   Rozet olarak duruyor (bilgi değerli), ama Güneş'e sayılmıyor.
   Eşikler de gevşetildi: 1.5x raf ve 0.45 verimlilik aynı anda çok
   nadir tutuyordu — 4/4 pratikte hiç çıkmıyordu. */
function havaSartlari(k){
  var s=0;
  if(k.avwap>0&&k.avwapBar>=3&&k.avwapUst!==false)s++;
  if(k.raf!=null&&isFinite(k.raf)&&k.raf>=RAF_ESIK)s++;
  if(k.er!=null&&isFinite(k.er)&&k.er>=ER_ESIK)s++;
  return s;
}
function havaEtiket(s){
  if(s>=3)return{ik:"☀️",ad:"Güneş",sinif:"roz-gunes",aciklama:"3/3 şart birden sağlanıyor: ⚓ ortalama üstü + 📚 kalın raf + 📐 temiz trend."};
  if(s===2)return{ik:"⛅",ad:"Parçalı bulutlu",sinif:"roz-iy",aciklama:"3 bağlam şartından 2'si sağlanıyor — güçlü ama eksik bir tarafı var."};
  if(s===1)return{ik:"☁️",ad:"Bulutlu",sinif:"roz-no",aciklama:"3 şarttan yalnızca 1'i sağlanıyor — zayıf görünüm."};
  return null;
}
/* ☀️ Güneş (3/3) katmanı Süper Üyeliğe kilitli — hangi hissenin ☀️ olduğu
   bilgisi non-super kullanıcıya sızdırılmaz, yerine kilit rozeti gösterilir.
   ⛅ (2/3) ve ☁️ (1/3) herkese açık kalır. */
function havaKilitliMi(s){ return s>=4&&!(D&&D.super); }
function havaRozet(k){                 /* satır altındaki rozet sırasında tam etiket */
  var s=havaSartlari(k);
  if(havaKilitliMi(s))
    return'<span class="roz roz-gunes" title="☀️ Güneş sinyali — sadece Süper Üyelere açık">🔒 Güneş (Süper Üyelik)</span>';
  var e=havaEtiket(s);
  if(!e)return"";
  return'<span class="roz '+e.sinif+'" title="'+e.aciklama+'">'+e.ik+" "+e.ad+"</span>";
}
function havaIkon(k){                  /* hisse kodunun hemen önünde tek karakterlik özet */
  var s=havaSartlari(k);
  if(havaKilitliMi(s))
    return'<span class="havaIkon" title="☀️ Güneş sinyali — sadece Süper Üyelere açık">🔒</span>';
  var e=havaEtiket(s);
  if(!e)return"";
  return'<span class="havaIkon" title="'+e.aciklama+'">'+e.ik+"</span>";
}
/* 📋 Temel taraf: yalnız uçlar gösterilir — her kartta rozet olursa
   rozet anlamını yitirir. */
function rozTemel(k){
  var t=k.temel; if(!t)return "";
  var r="";
  if(t.fskorOlculen>=5){
    var o=t.fskor/t.fskorOlculen;
    if(o>=0.75)r+='<span class="roz roz-iy">📊 F-Skor '+t.fskor+'/'+t.fskorOlculen+'</span>';
    else if(o<=0.35)r+='<span class="roz roz-ko">📊 F-Skor '+t.fskor+'/'+t.fskorOlculen+'</span>';
  }
  if(k.bilancoSessiz)r+='<span class="roz roz-ko">📅 bilanço yakın · bildirim yok</span>';
  return r;
}
function rozlerHepsi(k){
  return havaRozet(k)+rozAvwap(k)+rozRaf(k.raf)+rozEr(k.er)+rozSektor(k)+rozGguc(k.gguc,k.beta)+rozTemel(k);
}
/* Varsayılan sıralama "kar": liste açılır açılmaz en çok kazandıran sinyal
   en üstte. Kullanıcı istediğinde 🎯 Hedefe kalan / 🕐 En yeni'ye geçebilir. */
var D=null, sekme="potansiyel", sira="kar", adayTf="adayOrta", presetSec="kaliteli", portfoySirala="deger";
/* 📍 TAKİP — hangi dilimde hangi kategori (yolda/hedef1/hedef2/stop) açık
   tutulduğunu hatırlar; ad (potansiyel/fibo/uzunvade/haftalik) başına ayrı. */
var takipAcik={};
var ONIZLEME=(function(){try{return localStorage.getItem("onizlemeModu")==="1"}catch(e){return false}})();
/* 👁️ SIRADAN ÜYE ÖNİZLEMESİ — yalnız yöneticide görünür bir düğme.
   Gerçek yon/super bayrakları D.yonGercek / D.superGercek'te saklanır;
   önizleme açıkken D.yon ve D.super sahte olarak false yapılır, böylece
   tüm ekran (kilit rozetleri, gizli sekmeler, kayan yazı reklamı vb.)
   sıradan, süper olmayan bir kullanıcının göreceği gibi çizilir. Bu SADECE
   görünümü etkiler — sunucu tarafı yetki kontrolleri initData'ya bakar,
   bu sahte bayraktan etkilenmez. */
function onizUygula(){
  if(!D)return;
  if(D.yonGercek===undefined)D.yonGercek=D.yon;
  if(D.superGercek===undefined)D.superGercek=D.super;
  if(ONIZLEME){D.yon=false;D.super=false}
  else{D.yon=D.yonGercek;D.super=D.superGercek}
}
/* ---------- GERİ / İLERİ ----------
   Uygulama tek sayfa olduğu için tarayıcı geçmişi yok; her ekran değişimi
   kendi yığınımıza yazılır. Telegram'ın kendi geri düğmesi de buna bağlanır:
   detay açıkken önce detayı kapatır, sonra ekranlar arasında geri gider. */
var yol=[], yolIx=-1, yolKilit=false;
function durumAl(){return{sekme:sekme,sira:sira,adayTf:adayTf,perfDonem:perfDonem}}
function durumYaz(d){sekme=d.sekme;sira=d.sira;adayTf=d.adayTf;perfDonem=d.perfDonem}
function yolYaz(){
  if(yolKilit)return;
  var y=durumAl();
  if(yolIx>=0&&JSON.stringify(yol[yolIx])===JSON.stringify(y))return;
  yol=yol.slice(0,yolIx+1);yol.push(y);
  if(yol.length>40){yol.shift()}
  yolIx=yol.length-1;gezCiz();
}
function yolGit(adim){
  var ye=yolIx+adim;if(ye<0||ye>=yol.length)return;
  yolIx=ye;yolKilit=true;durumYaz(yol[yolIx]);ciz();yolKilit=false;
  gezCiz();window.scrollTo(0,0);
}
function ekranAdi(){
  if(sekme==="hata")return"🩺 Hatalar";
  if(sekme==="sag")return"🛡 Sistem";
  if(sekme==="abs")return"🌊 Absorpsiyon";
  if(sekme==="malboga")return"🔎 Hisse Taraması";
  if(sekme==="yesil")return"📐 Fibo Aralığı Ölçüm İstasyonu";
  if(sekme==="rot")return"🔄 Sektör Rotasyonu";
  if(sekme==="perf")return"📈 Performans";
  if(sekme==="davet")return"📤 Davet";
  if(sekme==="panel")return"🛠 Panel";
  if(sekme==="fav")return"⭐ Takip listem";
  if(sekme==="portfoy")return"💼 Portföyüm";
  if(sekme==="preset")return"🎛 Hazır filtreler";
  if(sekme==="backtest")return"📊 Backtest";
  if(sekme==="temel")return"📋 Temel Analiz";
  if(sekme==="yardim")return"❓ Rozetler ve Sekmeler";
  if(sekme==="alarm")return"🔔 Anlık Alarm";
  if(sekme==="aday")return(TF[adayTf]?TF[adayTf].ad:"Adaylar");
  return TF[sekme]?TF[sekme].ik+" "+TF[sekme].ad:"";
}
function gezCiz(){
  tgGeriDugme();
}
function tgGeriDugme(){
  try{
    var acik=el("katman").classList.contains("ac");
    if(acik||yolIx>0)TG.BackButton.show();else TG.BackButton.hide();
  }catch(e){}
}
var TF={potansiyel:{ad:"KISA",kisa:"KISA",r:"1SA",ik:"📊",renk:"var(--t1s)"},
        fibo:{ad:"ORTA",kisa:"ORTA",r:"4SA",ik:"📐",renk:"var(--t4s)"},
        uzunvade:{ad:"UZUN",kisa:"UZUN",r:"1G",ik:"🗓",renk:"var(--t1g)"},
        haftalik:{ad:"1 HAFTA",kisa:"1HAF",r:"1HAF",ik:"📅",renk:"var(--t1h)"},
        adayOrta:{ad:"KISA adayları",kisa:"KISA",r:"aday",ik:"🟨",renk:"var(--tad)"},
        adayOrtaVade:{ad:"ORTA adayları",kisa:"ORTA",r:"aday",ik:"🟨",renk:"var(--tad)"},
        adayUzun:{ad:"UZUN adayları",kisa:"UZUN",r:"aday",ik:"🟨",renk:"var(--tad)"},
        adayHafta:{ad:"1 HAFTA adayları",kisa:"1HAF",r:"1HAF",ik:"📅",renk:"var(--tad)"}};
/* detay()'a gelen "ad" ya bir liste anahtarı (potansiyel/fibo/uzunvade/…)
   ya da doğrudan bir dilim kodu (1SA/4SA/1G/1HAF — kama listesinden) olabilir.
   Grafiğin doğru dilimi Yahoo'dan çekebilmesi için ikisini de tek bir
   kanonik koda (1SA/4SA/1G/1HAF/1AY) indiriyoruz. */
function tfCoz(ad){
  if(TF[ad]&&TF[ad].kisa)return TF[ad].kisa;
  if(/^(1SA|4SA|1G|1HAF|1AY)$/.test(ad))return ad;
  return"1G";
}
function E(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
function N(v,b){return(v==null||isNaN(v))?"—":Number(v).toFixed(b==null?2:b)}
function Y(v){if(v==null||isNaN(v))return"";return(v>=0?"+":"")+Number(v).toFixed(2)+"%"}
function el(id){return document.getElementById(id)}
/* 👣 Ayak izi: hangi sekmede ne kadar süre geçirildiğini ölçer, birikeni
   periyodik olarak ve sekme değişince sunucuya gönderir. Sayfa tamamen
   kapanırken sendBeacon kullanılır (fetch, unload sırasında güvenilir
   tamamlanmayabiliyor). Kullanıcı deneyimini hiçbir şekilde etkilemez —
   tüm istekler sessiz ve arka plandadır. */
var izSekme=null, izBaslangic=0, izGirisGonderildi=!1;
function izBirikenSn(){
  if(!izSekme||!izBaslangic||document.hidden)return 0;
  return Math.max(0,Math.round((Date.now()-izBaslangic)/1000));
}
function izGonder(sekmeAdi,sn,kapanisMi){
  if(!sekmeAdi||!(sn>0))return;
  var gov={sekme:sekmeAdi,sn:sn,initData:(TG&&TG.initData)||""};
  if(kapanisMi&&navigator.sendBeacon){
    try{navigator.sendBeacon("/api/iz",new Blob([JSON.stringify(gov)],{type:"application/json"}));return}catch(e){}
  }
  try{fetch("/api/iz",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(gov),keepalive:!0}).catch(function(){})}catch(e){}
}
function izSekmeDegisti(yeniSekme){
  var sn=izBirikenSn();
  if(sn>0&&izSekme)izGonder(izSekme,sn);
  izSekme=yeniSekme;izBaslangic=Date.now();
  if(!izGirisGonderildi){
    izGirisGonderildi=!0;
    try{fetch("/api/iz",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({giris:!0,initData:(TG&&TG.initData)||""}),keepalive:!0}).catch(function(){})}catch(e){}
  }
}
try{
  document.addEventListener("visibilitychange",function(){
    if(document.hidden){var sn=izBirikenSn();if(sn>0&&izSekme)izGonder(izSekme,sn);izBaslangic=0}
    else if(izSekme){izBaslangic=Date.now()}
  });
  window.addEventListener("pagehide",function(){var sn=izBirikenSn();if(sn>0&&izSekme)izGonder(izSekme,sn,!0)});
  setInterval(function(){var sn=izBirikenSn();if(sn>=20&&izSekme){izGonder(izSekme,sn);izBaslangic=Date.now()}},2e4);
}catch(e){}
function post(yol,gov){
  gov=gov||{}; gov.initData=(TG&&TG.initData)||"";
  return fetch(yol,{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify(gov)}).then(function(r){
      /* Eskiden doğrudan r.json() çağrılıyordu: Cloudflare 1102 gibi bir hata
         sayfası (HTML) dönünce json() patlıyor, ekranda sebepsiz "hata"
         yazıyordu. Şimdi önce metni okuyoruz; JSON değilse durum kodunu ve
         ilk birkaç kelimeyi gösteriyoruz — asıl sebep görünür oluyor. */
      return r.text().then(function(t){
        var j=null;try{j=JSON.parse(t)}catch(e){}
        if(j)return j;
        var ozet=(t||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().slice(0,140);
        return{ok:!1,mesaj:"⚠️ sunucu hatası (HTTP "+r.status+")"+(ozet?": "+ozet:"")};
      });
    });
}
/* TR takvimine göre "bugün mü?" — sinyalTs saniye cinsinden, +3 saat ofsetle
   gün numarasına çevrilip bugünün gün numarasıyla karşılaştırılıyor. */
function trGun(sn){return Math.floor((Number(sn)+10800)/86400)}
function bugunMu(k){
  if(!k||!k.sinyalTs)return false;
  return trGun(k.sinyalTs)===trGun(Date.now()/1000);
}
function kar(k){
  if(k.kar!=null)return Number(k.kar);
  if(k.giris>0&&k.fiyat>0)return(k.fiyat/k.giris-1)*100;
  return null;
}
function basla(){
  post("/api/veri").then(function(v){
    splashKapat();
    if(!v||!v.ok){el("govde").innerHTML='<div class="bos">Doğrulanamadı.<br>Uygulamayı Telegram üzerinden aç.</div>';return}
    D=v;
    onizUygula();
    if(D.yon)gbRozetGoster(D.gbYeni||0);
    if(!D.onay)return onayCiz();
    izSekmeDegisti(sekme);
    ciz();
  }).catch(function(){splashKapat();el("govde").innerHTML='<div class="bos">Bağlantı kurulamadı.<br>Birazdan tekrar dene.</div>'});
  setTimeout(splashKapat,4000); /* güvenlik: yavaş bağlantıda sonsuza dek takılı kalmasın */
}
function onayCiz(){
  el("sekmeler").innerHTML="";
  el("govde").innerHTML='<div class="ayna">'+(D.onayMetin||"").replace(/\\n/g,"<br>")+"</div>"+
    '<button class="dg" id="onayDg">✅ Okudum, anladım, onaylıyorum</button>'+
    '<div class="uyari">Onaylamadan listeler açılmaz.</div>';
  el("onayDg").onclick=function(){
    tit();var b=el("onayDg");b.disabled=true;b.textContent="…";
    post("/api/onay").then(function(){D.onay=true;ciz();window.scrollTo(0,0)})
      .catch(function(){b.disabled=false;b.textContent="✅ Okudum, anladım, onaylıyorum"});
  };
}
function sekCiz(){
  var s=[];
  /* 🔝 ÖNCELİKLİ İKİ SEKME: Formasyon ve Hisse Taraması artık şeridin en
     başında — Ana Menü'nün hemen altında ilk görülen iki düğme bunlar. */
  s.push('<button class="sek'+(sekme==="kama"?" on":"")+'" data-r="nötr" data-s="kama">📐 Formasyon Tarama'+(D.super?"":" 🔒")+'</button>');
  s.push('<button class="sek'+(sekme==="malboga"?" on":"")+'" data-r="nötr" data-s="malboga">🔎 Hisse Taraması'+(D.super?"":" 🔒")+'</button>');
  ["potansiyel","fibo","uzunvade"].forEach(function(k){
    var t=TF[k],n=((D.kartlar&&D.kartlar[k])||[]).filter(hedefEsikGecti).length;
    s.push('<button class="sek'+(sekme===k?" on":"")+'" data-r="'+t.r+'" data-s="'+k+'">'+
      t.ik+" "+t.kisa+(n?' <span style="opacity:.75">'+n+"</span>":"")+"</button>");
  });
  /* 📋 Temel Analiz — KISA/ORTA/UZUN'un hemen ardında, dördüncü sırada.
     Sekme şeridi yatay kaydırmalı; arkalara koyunca kimse bulamıyor.
     Sinyalin arkasında şirket var mı sorusu, listeye bakmakla aynı
     sıklıkta sorulan bir sorudur — o yüzden görünür yerde. */
  s.push('<button class="sek'+(sekme==="temel"?" on":"")+'" data-r="nötr" data-s="temel">📋 Temel</button>');
  s.push('<button class="sek'+(sekme==="aday"?" on":"")+'" data-r="aday" data-s="aday">🟨 Adaylar'+(D.super?"":" 🔒")+'</button>');
  s.push('<button class="sek'+(sekme==="alarm"?" on":"")+'" data-r="nötr" data-s="alarm">🔔 Anlık Alarm'+(D.super?"":" 🔒")+'</button>');
  s.push('<button class="sek'+(sekme==="rot"?" on":"")+'" data-r="nötr" data-s="rot">🔄 Rotasyon</button>');
  /* 📈 PERFORMANS SEKMESİ KAPALI (kullanıcı kararı 19/08).
     Motor SILINMEDI — /api/performans ve "gecmis" kaydi calismaya devam
     ediyor, cunku portfoy grafigi ve gunluk ozetler de ayni kayittan
     besleniyor; silmek onlari da kirardi. Yalnizca sekme gizlendi.
     GERI ACMAK ICIN: asagidaki satirin basindaki // isaretini kaldir. */
  //s.push('<button class="sek'+(sekme==="perf"?" on":"")+'" data-r="nötr" data-s="perf">📈 Performans</button>');
  /* 📊 Backtest — yalnız yönetici. Üyeye açmak istersen d(uid) şartını kaldır. */
  if(D&&D.yon)s.push('<button class="sek'+(sekme==="backtest"?" on":"")+'" data-r="nötr" data-s="backtest">📊 Backtest 🔐</button>');
  s.push('<button class="sek'+(sekme==="fav"?" on":"")+'" data-r="nötr" data-s="fav">⭐ Takip</button>');
  s.push('<button class="sek'+(sekme==="portfoy"?" on":"")+'" data-r="nötr" data-s="portfoy">💼 Portföy</button>');
  s.push('<button class="sek'+(sekme==="preset"?" on":"")+'" data-r="nötr" data-s="preset">🎛 Presetler</button>');
  s.push('<button class="sek'+(sekme==="abs"?" on":"")+'" data-r="nötr" data-s="abs">🌊 Absorpsiyon</button>');
  s.push('<button class="sek'+(sekme==="ortaklik"?" on":"")+'" data-r="nötr" data-s="ortaklik">🔗 Ortaklık Haritası</button>');
  s.push('<button class="sek'+(sekme==="fonlar"?" on":"")+'" data-r="nötr" data-s="fonlar">🐣 Fonlar</button>');
  if(D&&D.yon)s.push('<button class="sek'+(sekme==="yesil"?" on":"")+'" data-r="nötr" data-s="yesil">📐 Fibo Aralığı Ölçüm İstasyonu 🔐</button>');
  if(D.yon)s.push('<button class="sek'+(sekme==="panel"?" on":"")+'" data-r="nötr" data-s="panel">🛠 Panel</button>');
  if(D.yon)s.push('<button class="sek'+(sekme==="hata"?" on":"")+'" data-r="nötr" data-s="hata">🩺 Hatalar</button>');
  if(D.yon)s.push('<button class="sek'+(sekme==="sag"?" on":"")+'" data-r="nötr" data-s="sag">🛡 Sistem</button>');
  el("sekmeler").innerHTML=s.join("");
  [].forEach.call(el("sekmeler").children,function(b){
    b.onclick=function(){tit();sekme=b.dataset.s;sira="kar";izSekmeDegisti(sekme);ciz();window.scrollTo(0,0)};
    b.oncontextmenu=function(e2){e2.preventDefault()};
  });
}
function ciz(){
  yolYaz();
  taraDugmeCiz();          /* D geldikten sonra yönetici düğmesi belirir */
  onizDugmeCiz();          /* sıradan üye önizleme düğmesi */
  el("saat").textContent=(D.yon&&D.guncelleme)?("🔐 son tarama "+D.guncelleme):"";
  /* Ana sekme dışında: başlık logosu, arama kutusu, kayan yazı ve "hot"
     şeridi kalkar — üstte sadece 🏠 Ana Menü ve o sekmenin adı kalır,
     geri kalan tüm dikey alan doğrudan o sekmenin içeriğine ayrılır. */
  var basYazi=el("baslikYazi"),sekAdi=el("sekmeAdi"),araS=el("araSat");
  if(sekme==="potansiyel"){
    if(basYazi)basYazi.style.display="";
    if(sekAdi)sekAdi.style.display="none";
    if(araS)araS.style.display="";
    seritCiz();hotCiz();
  }else{
    if(basYazi)basYazi.style.display="none";
    if(sekAdi){sekAdi.style.display="";sekAdi.textContent=ekranAdi()}
    /* Formasyon sekmesinde de arama kutusu görünsün — hisse ismi yazıp
       Enter'a basınca detay(kod) açılır, o da kümülatif hedef kutusunu
       zaten gösteriyor. Diğer sekmelerde eskisi gibi gizli kalır. */
    if(araS)araS.style.display=(sekme==="kama"?"":"none");
    el("serit").innerHTML="";el("hotSerit").innerHTML="";
  }
  sekCiz();
  /* 🖥 TAM EKRAN: mal+ayı/boğa taraması dar telefon ekranında bütün dikey
     alana ihtiyaç duyuyor. Bu sekmede üstteki sekme şeridi ve sekme adı
     tamamen kalkar; 🏠 Ana Menü düğmesi başlıkta kalır, dilimler arası
     geri/ileri ise ekranın kendi çubuğundan yapılır. */
  var sekS=el("sekmeler");
  if(sekme==="malboga"){
    if(sekS){sekS.innerHTML="";sekS.style.display="none"}
    if(sekAdi)sekAdi.style.display="none";
  }else if(sekS)sekS.style.display="";
  if(sekme==="hata")return hataCiz();
  if(sekme==="sag")return saglikCiz();
  if(sekme==="abs")return absCiz();
  if(sekme==="ortaklik")return ortaklikCiz();
  if(sekme==="fonlar")return fonlarCiz();
  if(sekme==="malboga")return mbCiz();
  if(sekme==="yesil")return ykCiz();
  if(sekme==="rot")return rotCiz();
  if(sekme==="perf")return perfCiz();
  if(sekme==="kama")return kamaCiz();
  if(sekme==="alarm")return alarmCiz();
  if(sekme==="davet")return davetCiz();
  if(sekme==="panel")return panelCiz();
  if(sekme==="fav")return favCiz();
  if(sekme==="portfoy")return portfoyCiz();
  if(sekme==="preset")return presetCiz();
  if(sekme==="backtest")return backtestCiz();
  if(sekme==="temel")return temelCiz();
  if(sekme==="yardim")return yardimCiz();
  if(sekme==="aday")return adayCiz();
  listeCiz(sekme);
}
/* ---------- KAYAN YAZI ----------
   İçerik veriden üretilir: hangi dilimde kaç sinyal var, günün en iyileri,
   davet durumu ve sabit uyarı. Kesintisiz akması için içerik iki kez basılır. */
/* Kayan yazı artık YALNIZ son sinyalleri, rastgele karışık sırada gösterir —
   dilim sayacı / üyelik / sabit uyarı metinleri kaldırıldı. */
var PROMO_METINLER=["👑 <b>Süper Üyelik</b>: adaylar + anlık alarm + beklemesiz erişim",
"🔔 Sinyal oluşmadan <b>önce</b> haberdar ol — 👑 Süper Üye ol",
"☀️ Güneş sinyalleri sadece <b>Süper Üyelere</b> özel",
"📤 Arkadaşını davet et, <b>Süper Üyelik</b> kazan",
"🪜 Kırılmadan önce gör: Aday listeleri <b>Süper Üyelikte</b>",
"📐 Formasyon taraması <b>Süper Üyelikte</b> açık",
"⏳ Süper Üyelikte bekleme yok — anında sonuç"];
function seritCiz(){
  var hepsi=[];
  ["potansiyel","fibo","uzunvade"].forEach(function(k){
    (D.kartlar&&D.kartlar[k]||[]).forEach(function(x){
      /* Kayan yazı kilidi delik bırakıyordu: buğuladığımız hisse burada
         adıyla ve yüzdesiyle akıyordu. Kilitli olanlar şeride girmez. */
      if(buguluMu(x))return;
      var kr=kar(x);if(kr!=null)hepsi.push({kod:x.kod,y:kr,tf:TF[k].kisa});
    });
  });
  if(!hepsi.length){el("serit").innerHTML="";return}
  /* Fisher-Yates karıştır — her açılışta farklı bir sıra/seçim görünsün */
  for(var i=hepsi.length-1;i>0;i--){
    var j=Math.floor(Math.random()*(i+1)),t=hepsi[i];hepsi[i]=hepsi[j];hepsi[j]=t;
  }
  var gosterilen=hepsi.slice(0,20);
  /* Kayan yazıda yön RENKLE okunsun: yükseliş yeşil, düşüş kırmızı.
     Emoji tek başına küçük ekranda ayırt edilmiyordu; kod ve yüzde
     birlikte renkleniyor, yüzde ayrıca kalın. */
  var par=gosterilen.map(function(x){
    var sn=x.y>=0?"serYe":"serKr";
    return '<span class="'+sn+'">'+(x.y>=0?"▲":"▼")+" <b>"+E(x.kod)+"</b> "+
           '<b class="serY">'+Y(x.y)+'</b></span> <span class="ay2">'+x.tf+"</span>";
  });
  /* 👑 SÜPER ÜYELİK TANITIMI — her 3-4 hissede bir araya bir tanıtım
     metni serpiştirilir (rastgele metin, rastgele 3 ya da 4 aralık).
     Zaten Süper Üye olana hiç gösterilmez. */
  if(!(D&&D.super)&&PROMO_METINLER.length){
    var karisikPar=[],sayac=0,esik=3+Math.floor(Math.random()*2);
    for(var pi=0;pi<par.length;pi++){
      karisikPar.push(par[pi]);sayac++;
      if(sayac>=esik&&pi<par.length-1){
        karisikPar.push('<span class="ay3">'+PROMO_METINLER[Math.floor(Math.random()*PROMO_METINLER.length)]+"</span>");
        sayac=0;esik=3+Math.floor(Math.random()*2);
      }
    }
    par=karisikPar;
  }
  var ic=par.join('<span class="ay">◆</span>');
  /* hız: içerik ne kadar uzunsa animasyon o kadar sürsün, aksi halde çok
     sinyal olduğunda şerit okunamayacak kadar hızlı akıyordu. */
  var sure=Math.max(45,Math.round(gosterilen.length*4.2));
  el("serit").innerHTML='<span style="animation-duration:'+sure+'s">'+ic+'<span class="ay">◆</span>'+ic+'<span class="ay">◆</span></span>';
}
/* ---------- 🔥 EN GÜÇLÜ SİNYALLER — TÜM SEKMELERİN ÜSTÜNDE SABİT ÖZET ----------
   Tek satır: kalite puanı en yüksek 5 hisse ("genel top") + her dilimin
   (1SA/4SA/1G/1HAF) kendi en iyisi — genel top'a girmemiş olsa bile eklenir,
   zaten genelde çakıştığı için satır fazla uzamaz. Önceden iki ayrı başlıklı
   satırdı, okuma alanı için tek satıra indirildi. Dokununca satirBagla() ile
   aynı detay ekranı açılır. */
function araBagla(){
  var g=el("araGir"),b=el("araBtn");
  if(!g||!b||g.dataset.bagli)return;
  g.dataset.bagli="1";
  function git(){
    var kod=(g.value||"").trim().toUpperCase();
    if(!kod)return;
    tit();detay(kod,"");g.value="";g.blur();
  }
  b.onclick=git;
  g.onkeydown=function(e){if(e.key==="Enter")git()};
  /* 🔄 ELLE TARAMA — yalnız yönetici. Otomatik tarama takıldığında
     beklemeden yeni tur başlatır. Düğme diğer kullanıcılarda hiç
     görünmez (D.yon sunucudan geliyor, istemcide uydurulamaz). */
  var yb=el("yardimBtn");
  if(yb&&!yb.dataset.bagli){
    yb.dataset.bagli="1";
    yb.onclick=function(){tit();sekme="yardim";izSekmeDegisti(sekme);ciz();window.scrollTo(0,0)};
  }
  var db=el("davetBtn");
  if(db&&!db.dataset.bagli){
    db.dataset.bagli="1";
    db.onclick=function(){tit();sekme="davet";izSekmeDegisti(sekme);ciz();window.scrollTo(0,0)};
  }
}
/* 🔄 ELLE TARAMA DÜĞMESİ — yalnız yönetici.
   HATALIYDI: bu blok araBagla() içindeydi. araBagla, g.dataset.bagli
   kilidiyle SADECE BİR KEZ çalışır ve ilk çalıştığında D (sunucudan gelen
   kullanıcı verisi) henüz null oluyor. D.yon false görülüp düğme gizli
   kalıyor, kilit yüzünden de bir daha hiç denenmiyordu. Artık her çizimde
   ayrıca çağrılıyor; D geldiği anda düğme beliriyor. */
function onizDugmeCiz(){
  var ob=el("onizBtn");
  if(!ob)return;
  if(!(D&&D.yonGercek)){ob.style.display="none";return}
  ob.style.display="";
  ob.classList.toggle("on",!!ONIZLEME);
  ob.title=ONIZLEME?"Önizleme açık — kendi (yönetici) görünümüne dön":"Sıradan (süper olmayan) üye gözünden gör";
  if(ob.dataset.bagli)return;
  ob.dataset.bagli="1";
  ob.onclick=function(){
    tit();
    ONIZLEME=!ONIZLEME;
    try{localStorage.setItem("onizlemeModu",ONIZLEME?"1":"0")}catch(e){}
    onizUygula();
    ciz();
    window.scrollTo(0,0);
  };
}
function taraDugmeCiz(){
  var tb=el("taraBtn");
  if(!tb)return;
  if(!(D&&D.yon)){tb.style.display="none";return}
  tb.style.display="";
  if(tb.dataset.bagli)return;
  tb.dataset.bagli="1";
  function uyarGoster(m){try{TG.showAlert(String(m))}catch(e){try{console.log(m)}catch(_){}}}
  tb.onclick=function(){
    tit(); tb.disabled=true; var eski=tb.textContent; tb.textContent="…";
    post("/api/tara",{}).then(function(v){
      tb.textContent=(v&&v.ok)?"✅":"⚠️";
      if(v&&v.mesaj)uyarGoster(v.mesaj);
      setTimeout(function(){tb.textContent=eski;tb.disabled=false},4000);
    }).catch(function(){
      tb.textContent="⚠️";uyarGoster("İstek gönderilemedi.");
      setTimeout(function(){tb.textContent=eski;tb.disabled=false},4000);
    });
  };
}
function hotCiz(){
  var kutu=el("hotSerit"); if(!kutu)return;
  var hepsi=[];
  ["potansiyel","fibo","uzunvade"].forEach(function(ad){
    (D.kartlar&&D.kartlar[ad]||[]).forEach(function(x){
      var y=Object.assign({},x);y._ad=ad;hepsi.push(y);
    });
  });
  if(!hepsi.length){kutu.innerHTML="";return}

  /* ☀️ GÜÇLÜLERİN GÜÇLÜSÜ — artık genel kalite sıralaması değil, 4 bağlam
     şartını (ortalama üstü + kalın raf + temiz trend)
     BİRDEN sağlayan hisseler. Böylece bu şerit yalnız ☀️ rozetli olanları
     gösterir; şartları tam sağlayan hisse yoksa şerit boş kalır. */
  var enIyiKod={};
  hepsi.forEach(function(x){
    if(!x.kod)return;
    /* HATALIYDI: sistem 3 şarta indirildiğinde bu eşik 4'te kalmıştı,
       yani ☀️ şeridi HİÇBİR ZAMAN dolmuyordu. */
    if(havaSartlari(x)<3)return;
    var mv=enIyiKod[x.kod];
    if(!mv||(x.kalite||0)>(mv.kalite||0))enIyiKod[x.kod]=x;
  });
  var secilen=Object.keys(enIyiKod).map(function(k){return enIyiKod[k]});
  secilen.sort(function(a,b){return(b.kalite||0)-(a.kalite||0)});
  secilen=secilen.slice(0,12);

  /* 🔒 ☀️ Güneş katmanı Süper Üyeliğe kilitli — non-super kullanıcıya
     hangi hisselerin ☀️ olduğu gösterilmez, sadece kaç tane olduğu ve
     kilit + davet çağrısı gösterilir. */
  if(!D.super){
    var say=secilen.length;
    var h2='<div class="hotBaslik">🔒 ☀️ Güçlülerin güçlüsü — Süper Üyelik</div>'+
      '<div class="hotKilit" id="hotKilit">'+
        (say?'Şu an <b>'+say+' hisse</b> 4 şartı birden sağlıyor, ama hangileri olduğunu görmek Süper Üyelik gerektiriyor.':'Bu bölüm Süper Üyelere özel.')+
        ' <span class="hotKilitLink" id="hotKilitLink">📤 Süper Üye ol</span></div>';
    kutu.innerHTML=h2;
    var hl=el("hotKilitLink");
    if(hl)hl.onclick=function(){tit();sekme="davet";izSekmeDegisti(sekme);ciz();window.scrollTo(0,0)};
    return;
  }

  function kartHtml(x){
    var t=TF[x._ad]||{kisa:x.tf||"",renk:"var(--ciz)"};
    var kr=kar(x);
    return '<div class="hotKart'+(bugunMu(x)?" bgnKart":"")+'" data-kod="'+E(x.kod)+'" data-l="'+x._ad+'" style="border-left-color:#ffb020">'+
      '<div class="hotKod">☀️ '+E(x.kod)+'</div>'+
      '<div class="hotDil">'+t.kisa+'</div>'+
      '<div class="hotYuzde '+(kr==null?"so":(kr>=0?"ye":"kr"))+'">'+(kr==null?"":Y(kr))+'</div>'+
    '</div>';
  }

  var h='<div class="hotBaslik">☀️ Güçlülerin güçlüsü — 3/3 şart birden</div>';
  if(secilen.length)
    h+='<div class="hotSira">'+secilen.map(kartHtml).join("")+"</div>";
  else
    h+='<div class="hotAltYazi" style="font-size:11px;color:var(--soluk)">Şu an 3 şartı birden sağlayan hisse yok — bu normaldir, nadir görülür.</div>';
  kutu.innerHTML=h;
  satirBagla();
}
function sirCiz(akt){
  var o=[["kar","💰 Kâr/Zarar"],["pot","🎯 Hedefe kalan"],["yeni","📅 Bugün"]];
  return '<div class="sirala">'+o.map(function(x){
    return '<button class="sir'+(akt===x[0]?" on":"")+'" data-sr="'+x[0]+'">'+x[1]+"</button>";
  }).join("")+"</div>";
}
function sirBagla(){
  [].forEach.call(document.querySelectorAll("[data-sr]"),function(b){
    b.onclick=function(){tit();sira=b.dataset.sr;ciz()};
  });
}
/* 🎯 3.7% EŞİĞİ — hedefe kalan yüzde 3.7'den azsa (hedef neredeyse
   tutmuş ya da zaten tutmuşsa) ne adaylarda ne de gerçek KISA/ORTA/UZUN
   listelerinde gösterilmesin. Alanı olmayan (potansiyel hesaplanamayan)
   kayıtlar süzülmez — yalnız değeri BİLİNEN ve eşiğin altında kalanlar. */
var HEDEF_ESIK_YUZDE=3.7;
function hedefEsikGecti(x){
  if(!x)return!0;
  if(x.potansiyel==null)return!0;
  var p=Number(x.potansiyel);
  if(!isFinite(p))return!0;
  return p>=HEDEF_ESIK_YUZDE;
}
function dizil(ad){
  var l=((D.kartlar&&D.kartlar[ad])||[]).filter(hedefEsikGecti);
  /* 📅 BUGÜN: eskiden "En yeni" idi ve yalnızca zamana göre sıralıyordu —
     dünkü sinyaller de listede kalıyordu. Artık bir SÜZGEÇ: sadece bugün
     oluşan sinyaller, en çok kazandırandan en aza doğru. "Bugün ne oldu?"
     sorusunun tek ekranda cevabı. */
  if(sira==="yeni"){
    return l.filter(bugunMu).sort(function(a,b){
      return(kar(b)==null?-9999:kar(b))-(kar(a)==null?-9999:kar(a));
    });
  }
  var ix=(D.kartlar&&D.kartlar.sira&&D.kartlar.sira[ad]&&D.kartlar.sira[ad][sira])||null;
  if(ix&&ix.length===l.length)return ix.map(function(i){return l[i]}).filter(hedefEsikGecti);
  var c=l.slice();
  if(sira==="kar")c.sort(function(a,b){return(kar(b)==null?-9999:kar(b))-(kar(a)==null?-9999:kar(a))});
  return c;
}
/* ══════════════════════════════════════════════════════════════════════
   📍 TAKİP — DURUM BÖLÜMÜ. Eskiden burası "şeffaflık" amacıyla %3.7
   eşiğini (hedefEsikGecti) hiç uygulamıyordu — amaç sinyallerin "sessizce
   kaybolmuş" gibi görünmesini önlemekti. 2026-08-29'da karar değişti:
   kullanıcı "süzgeç heryerde olsun" dedi, yani artık burası da ana
   listeyle (dizil→hedefEsikGecti) AYNI %3.7 eşiğini uyguluyor — Yolda ve
   Hedef1 sayıları artık ana listedeki rozet sayılarıyla tutarlı. Hedef2
   (zaten tutmuş) ve Stop (D.dusenler) bu eşikten muaf, çünkü onlar zaten
   kapanmış birer sonuç, "hedefe ne kadar kaldı" sorusu onlar için
   anlamsız. ══════════════════════════════════════════════════════════ */
function takipHam(ad){
  var ham=((D.kartlar&&D.kartlar[ad])||[]).slice();
  var yolda=[],hedef1=[],hedef2=[];
  ham.forEach(function(k){
    var pot=(k.potansiyel==null)?null:Number(k.potansiyel);
    var pot1=(k.hedef1Yuzde==null)?null:Number(k.hedef1Yuzde);
    /* Hedef2'yi zaten tutmuş bir sinyal milestone'a ulaşmıştır — %3.7
       eşiği burada anlamsız, doğrudan gösterilir. */
    if(pot!=null&&pot<=0){hedef2.push(k);return}
    /* 🎯 %3.7 EŞİĞİ artık burada da: ana listeyle (dizil→hedefEsikGecti)
       birebir aynı kural. Hedefe (H2) kalan yüzde 3.7'nin altındaysa —
       henüz tutmamış olsa bile — ne Yolda'da ne Hedef1'de gösterilir.
       Kullanıcı isteği: "süzgeç heryerde olsun" — Takip artık ana listeyle
       tutarlı sayım veriyor, süzgeçsiz eski davranış kaldırıldı. */
    if(!hedefEsikGecti(k))return;
    if(pot1!=null&&pot1<=0)hedef1.push(k);
    else yolda.push(k);
  });
  var stop=(D.dusenler||[]).filter(function(x){return x.liste===ad});
  return{yolda:yolda,hedef1:hedef1,hedef2:hedef2,stop:stop};
}
/* KISA (1SA) dilimde stop noktası henüz tanımlı değil — alt dilim (15dk)
   kurulmadığı için. Diğer tüm dilimlerde (ORTA/UZUN/HAFTA) bir alt dilimin
   pivotuna göre hesaplanan stop noktası zaten var, D.dusenler üzerinden gelir. */
function takipStopVar(ad){return ad!=="potansiyel"}
/* 🛑 TAKİP ÖZETİ İÇİN ZİNCİR STOP: hisse detayındaki tfStopBul (satır ~6143)
   ile birebir aynı mantık — ORTA'nın stop'u KISA'nın kırdığı seviye (giriş),
   UZUN'unki ORTA'nın kırdığı seviye. Yön (boğa/ayı) uyuşmuyorsa ya da alt
   dilimde o kod için sinyal yoksa null döner. KISA'nın (potansiyel) kendi
   alt dilimi (15DK) ayrı izlenmediği için orada stop çıkmaz — mevcut
   sınırlamayla birebir aynı, davranış değişmiyor. Kaynak D.kartlar olduğu
   için bugün alarm/kırılımla oluşmuş sinyaller de otomatik dahildir —
   ayrı bir "bugünkü alarmlar" yolu yok, hepsi aynı listeden gelir. */
var TAKIP_ALT_AD={fibo:"potansiyel",uzunvade:"fibo"};
function takipStopBul(ad,k){
  var altAd=TAKIP_ALT_AD[ad];if(!altAd)return null;
  if(k.giris==null||k.hedef==null)return null;
  var altListe=(D.kartlar&&D.kartlar[altAd])||[];
  var altKart=altListe.filter(function(x){return x.kod===k.kod})[0];
  if(!altKart||altKart.giris==null||altKart.hedef==null)return null;
  var yon=Number(k.hedef)>=Number(k.giris)?"boga":"ayi";
  var altYon=Number(altKart.hedef)>=Number(altKart.giris)?"boga":"ayi";
  if(altYon!==yon)return null;
  var sev=Number(altKart.giris);
  return{sev:sev,yuzde:(k.fiyat>0?100*(sev/Number(k.fiyat)-1):null)};
}
function takipSatirHtml(k,acik,ad){
  var kr=kar(k);
  var pot1=(k.hedef1Yuzde==null)?null:Number(k.hedef1Yuzde);
  var pot2=(k.potansiyel==null)?null:Number(k.potansiyel);
  var orta;
  if(acik==="hedef1"){
    /* Hedef1'i tutmuş ama Hedef2'yi henüz tutmamış — H2'ye kalan yüzde. */
    orta="sinyal <b>"+N(k.giris)+"</b> · 🏆 Hedef1 <b>"+N(k.hedef1)+"</b> tuttu"+
      (k.hedef!=null?" · H2 <b>"+N(k.hedef)+"</b>"+(pot2!=null?" (%"+pot2.toFixed(1)+" kaldı)":""):"");
  }else if(acik==="hedef2"){
    orta="sinyal <b>"+N(k.giris)+"</b> · 🏆 Hedef2 <b>"+N(k.hedef)+"</b> tuttu (nihai)";
  }else{
    /* Yolda: iki hedefe de kalan yüzdeyi göster, mükerrer "şimdi fiyat" yazma —
       sağ tarafta zaten güncel fiyat var. */
    orta="sinyal <b>"+N(k.giris)+"</b>"+
      (k.hedef1!=null?" · H1 <b>"+N(k.hedef1)+"</b>"+(pot1!=null?" (%"+pot1.toFixed(1)+" kaldı)":""):"")+
      (k.hedef!=null?" · H2 <b>"+N(k.hedef)+"</b>"+(pot2!=null?" (%"+pot2.toFixed(1)+" kaldı)":""):"");
  }
  /* 🛑 Stop satırı: pozisyon hâlâ açıkken (Yolda / Hedef1 tuttu) anlamlı —
     Hedef2'yi tutmuş bir sinyal zaten hedefte kapanmış sayılır, stop gösterilmez. */
  var stopAlt="";
  if(acik!=="hedef2"){
    var stopBilgi=takipStopBul(ad,k);
    if(stopBilgi)stopAlt='<div class="altbilgi">🛑 Stop <b>'+N(stopBilgi.sev)+"</b>"+
      (stopBilgi.yuzde!=null?"  ·  buradan "+Y(stopBilgi.yuzde):"")+"</div>";
  }
  return '<div class="satir" data-kod="'+E(k.kod)+'" style="border-left-color:var(--ciz)">'+
    '<div class="sol"><div class="kod">'+kodHtml(k)+"</div>"+
    '<div class="altbilgi">'+orta+"</div>"+stopAlt+"</div>"+
    '<div class="sag"><div class="fiyat">'+N(k.fiyat)+" ₺</div>"+
    '<div class="yuzde '+(kr==null?"so":(kr>=0?"ye":"kr"))+'">'+(kr==null?"":Y(kr))+"</div></div></div>";
}
function takipStopSatirHtml(x){
  var kr=(x.kar==null)?null:Number(x.kar);
  return '<div class="dusSat"><div class="dusUst"><b>'+E(x.kod)+"</b>"+
    (x.saat?'<span class="btN">'+E(x.saat)+"</span>":"")+
    (kr==null?"":'<span class="'+(kr>=0?"ye":"kr")+'"><b>'+Y(kr)+"</b></span>")+
    '</div><div class="dusAlt">'+E(x.sebep||"stop oldu")+
    (x.sinyalFiyat!=null?" · sinyal "+N(x.sinyalFiyat):"")+
    (x.sonFiyat!=null?" → "+N(x.sonFiyat):"")+"</div></div>";
}
function takipKutuCiz(ad){
  var v=takipHam(ad), acik=takipAcik[ad]||null, stopVar=takipStopVar(ad);
  var pil=function(key,ik,baslik,n){
    return '<button class="sir'+(acik===key?" on":"")+'" data-tk="'+key+'">'+ik+" "+baslik+" ("+n+")</button>";
  };
  var h='<div class="kutu" style="margin-bottom:10px"><h3 style="margin:0 0 8px">📍 Takip — bu dilimde her sinyalin durumu</h3>'+
    '<div class="altbilgi" style="margin-bottom:8px">Ana listeyle aynı %3.7 eşiği burada da geçerli — hedefe çok yakın/hedefte olanlar ayrı gösterilir.</div>'+
    '<div class="sirala">'+
      pil("yolda","🟢","Yolda",v.yolda.length)+
      pil("hedef1","🧱","Hedef1 tuttu",v.hedef1.length)+
      pil("hedef2","🎯","Hedef2 tuttu",v.hedef2.length)+
      (stopVar?pil("stop","🔴","Stop oldu",v.stop.length):"")+
    "</div>";
  if(!stopVar)h+='<div class="altbilgi" style="margin-top:6px">ℹ️ Bu dilimde (1 saat) alt zaman dilimi (15 dk) henüz kurulmadığı için stop takibi yok.</div>';
  if(acik){
    var liste=v[acik]||[];
    h+='<div style="margin-top:8px">'+(liste.length?
      (acik==="stop"?liste.map(takipStopSatirHtml).join(""):liste.map(function(k){return takipSatirHtml(k,acik,ad)}).join(""))
      :'<div class="bos" style="padding:14px">Bu kategoride şu an hisse yok.</div>')+"</div>";
  }
  return h+"</div>";
}
function takipBagla(ad){
  [].forEach.call(document.querySelectorAll("[data-tk]"),function(b){
    b.onclick=function(){tit();var k=b.dataset.tk;takipAcik[ad]=(takipAcik[ad]===k)?null:k;ciz();window.scrollTo(0,0)};
  });
}
/* 🟨 ADAYLAR: bu dört liste anahtarında satır hem tıklanamaz hem de
   ilk görünen kısımda Sinyal (tetik), Hedef 1 (hedef1) ve Hedef 2 (hedef · potansiyel)
   birlikte gösterilir — genel detaya atlayıp yanlış/eski bir dilimin
   verisini göstermesin diye (bkz. adayCiz ve satirBagla). */
var ADAY_ANAHTAR={adayOrta:1,adayOrtaVade:1,adayUzun:1,adayHafta:1};
function satirHtml(k,ad){
  var t=TF[ad]||{kisa:k.tf||"",renk:"var(--ciz)"};
  var kr=kar(k), pot=(k.potansiyel==null?null:Number(k.potansiyel));
  var isAday=!!ADAY_ANAHTAR[ad];
  var sag=(pot==null)?"":(pot<=0?'<span class="sa">🏆 TUTTU</span>':'<span class="so">hedefe <b>+'+pot.toFixed(1)+"%</b></span>");
  if(isAday)sag=""; /* aynı bilgi aşağıdaki Sinyal/Hedef bloğunda zaten var */
  var alt=[];
  alt.push(t.kisa);
  /* CANLI: kırılım oluşan barda — bar kapanınca geri dönebilir. */
  if(k.canli)alt.push("⚡ canlı");
  if(!isAday){
    if(k.tetik!=null)alt.push("🔓 tetik "+N(k.tetik)+(k.tetikYuzde!=null?" · %"+Number(k.tetikYuzde).toFixed(1)+" kaldı":""));
    /* Giriş fiyatı da bir ipucudur: "sinyal 138.70" ile hisse bulunabilir.
       Kilitliyken sayı yerine kilit yazılır. */
    else if(k.giris!=null)alt.push(buguluMu(k)?"sinyal 🔒":("sinyal "+N(k.giris)));
  }
  /* ⚓ Kirilimdan bu yana alanlarin ortalama maliyetine gore konum.
     Listede tek kelime yeter; ayrinti detay ekraninda. */
  if(k.avwap>0&&k.avwapBar>=3)
    alt.push("⚓ "+(k.avwapUst!==false?"ortalama üstü":"ORTALAMA ALTI"));
  if(k.zayifHedef)alt.push("🎯 hedef dar");
  if(k.sinyalZaman||k.zaman)alt.push(k.sinyalZaman||k.zaman);
  var bg=bugunMu(k);
  var kilitli=buguluMu(k);
  var adayBlok="";
  if(isAday){
    var direncYuzde=(k.tetikYuzde==null)?null:Number(k.tetikYuzde);
    adayBlok='<div class="ahBlok">'+
      '<div class="ahSat">🔓 Sinyal <b>'+(k.tetik!=null?N(k.tetik):"—")+"</b>"+
      (direncYuzde!=null?' <span class="ahYuz">%'+direncYuzde.toFixed(1)+" kaldı</span>":"")+"</div>"+
      (k.hedef1!=null?'<div class="ahSat">🧱 Hedef 1 <b>'+N(k.hedef1)+"</b>"+
      (k.hedef1Yuzde!=null?' <span class="ahYuz">%'+Number(k.hedef1Yuzde).toFixed(1)+" kaldı</span>":"")+"</div>":"")+
      '<div class="ahSat">🎯 Hedef 2 <b>'+(k.hedef!=null?N(k.hedef):"—")+"</b>"+
      (pot!=null?(pot<=0?' <span class="ahYuz sa">🏆 TUTTU</span>':' <span class="ahYuz">%'+pot.toFixed(1)+" kaldı</span>"):"")+"</div></div>";
  }
  return '<div class="satir'+(bg?" bgnSatir":"")+(isAday?" adaySatir":"")+'" data-kod="'+E(k.kod)+'" data-l="'+ad+'"'+
    (kilitli?' data-kilit="1"':"")+(isAday?' data-noklik="1"':"")+' style="border-left-color:'+t.renk+'">'+
    '<div class="sol"><div class="kod">'+havaIkon(k)+(k.rozet?'<span class="rz">'+k.rozet+"</span>":"")+
    (bg?'<span class="bgn">BUGÜN</span>':"")+kodHtml(k)+"</div>"+
    adayBlok+
    '<div class="altbilgi">'+E(alt.join(" · "))+"</div>"+
    (function(){var rz=rozlerHepsi(k);return rz?'<div class="rozSat">'+rz+"</div>":""})()+"</div>"+
    '<div class="sag"><div class="fiyat'+(kilitli?" buguluKod":"")+'">'+N(k.fiyat)+" ₺</div>"+
    '<div class="yuzde '+(kr==null?"so":(kr>=0?"ye":"kr"))+'">'+(kr==null?sag:Y(kr))+"</div></div></div>";
}
/* ══════ 🔒 BUĞULU KOD ══════
   Bugün sinyal vermiş VE yüzde 5'ten fazla kazandırmış hisselerin ADI
   Süper Üye olmayana buğulu gösterilir. Yüzde açıkta kalır — "sistem
   bunu buldu, ama hangisi olduğu Süper Üyelere özel" mesajı.
   Kilit yalnız GÖRSEL değil: satır tıklaması detay yerine davet
   ekranına gider, yoksa kod detay ekranından okunabilirdi. */
var BUGULU_ESIK=5;
function buguluMu(k){
  if(D&&D.super)return false;
  if(!bugunMu(k))return false;
  var kr=kar(k);
  return kr!=null&&kr>=BUGULU_ESIK;
}
function kodHtml(k){
  if(!buguluMu(k))return E(k.kod);
  return '<span class="buguluKod">'+E(k.kod)+'</span>'+
         '<span class="buguluKilit">🔒</span>';
}
function satirBagla(){
  [].forEach.call(document.querySelectorAll("[data-kod]"),function(b){
    /* 🟨 ADAYLAR: bilerek TIKLANAMAZ — genel detay ekranı bu hissenin
       başka bir dilimdeki kaydını gösterebiliyor (yanlış/eski yüzde
       sorununun kaynağı buydu), o yüzden aday satırında tıklama yok. */
    if(b.dataset.noklik)return;
    b.onclick=function(){
      tit();
      /* Buğulu satır: kod detay ekranından okunabilirdi, o yüzden
         tıklama detaya değil davet ekranına gider. */
      if(b.dataset.kilit){sekme="davet";izSekmeDegisti(sekme);ciz();window.scrollTo(0,0);return}
      if(b.dataset.form)formasyonDetay(b.dataset.kod,b.dataset.l);
      else detay(b.dataset.kod,b.dataset.l);
    };
  });
  formasyonRozetUygula();
}
/* FORMASYON ROZETİ: DOM'daki satırların kodlarını toplayıp tek istekte
   sorar, dönen sonuca göre kod adının başına küçük bir ikon ekler. Liste
   zaten çizildikten SONRA (async) geldiği için sayfa akışını yavaşlatmaz;
   rozet birkaç yüz ms gecikmeli "belirir". */
var formasyonOnbellek={};
function formasyonRozetUygula(){
  var elemanlar=[].slice.call(document.querySelectorAll("[data-kod]"));
  if(!elemanlar.length)return;
  var kodlar=[];
  elemanlar.forEach(function(b){var k=b.dataset.kod;if(k&&kodlar.indexOf(k)===-1)kodlar.push(k)});
  var bilinmeyen=kodlar.filter(function(k){return !(k in formasyonOnbellek)});
  function uygula(){
    elemanlar.forEach(function(b){
      var k=b.dataset.kod, d=formasyonOnbellek[k];
      var kutu=b.querySelector(".kod"); if(!kutu||!d||kutu.querySelector(".frz"))return;
      var ikon=d.yon==="al"?"📈":(d.yon==="sat"?"📉":"📐");
      var span=document.createElement("span");
      span.className="frz"; span.title=d.tip; span.textContent=ikon;
      span.style.marginRight="4px";
      kutu.insertBefore(span,kutu.firstChild);
    });
  }
  if(!bilinmeyen.length){uygula();return}
  post("/api/formasyonlar",{kodlar:bilinmeyen}).then(function(v){
    var s=(v&&v.sonuc)||{};
    bilinmeyen.forEach(function(k){formasyonOnbellek[k]=s[k]||null});
    uygula();
  }).catch(function(){});
}
/* 📉 LİSTEDEN DÜŞENLER — sinyal sessizce kaybolmasın.
   Kullanıcı bir sinyali görüp sonra bulamayınca sisteme güvenini
   kaybediyordu. Düşen her hisse, SEBEBİYLE ve son durumuyla burada
   duruyor. Kaybolmuyor, açıklanıyor. */
function dusenlerCiz(ad){
  var ds=((D&&D.dusenler)||[]).filter(function(x){return x.liste===ad});
  if(!ds.length)return "";
  var h='<div class="dusBas">📉 Bugün listeden düşenler ('+ds.length+')</div>'+
        '<div class="dusAc">Sinyal kayboldu sanma — sebebi burada yazıyor. '+
        'Bir kırılım geçersizleşebilir; bunu gizlemiyoruz.</div>';
  ds.slice(0,25).forEach(function(x){
    var kr=(x.kar==null)?null:Number(x.kar);
    h+='<div class="dusSat">'+
       '<div class="dusUst"><b>'+E(x.kod)+'</b>'+
       '<span class="btN">'+E(x.tf||"")+(x.saat?" · "+E(x.saat):"")+'</span>'+
       (kr==null?"":'<span class="'+(kr>=0?"ye":"kr")+'"><b>'+Y(kr)+'</b></span>')+
       '</div><div class="dusAlt">'+E(x.sebep||"")+
       (x.sinyalFiyat!=null?' · sinyal '+N(x.sinyalFiyat):"")+
       (x.sonFiyat!=null?' → '+N(x.sonFiyat):"")+'</div></div>';
  });
  return '<div class="kutu" style="margin-top:12px">'+h+'</div>';
}
function listeCiz(ad){
  var l=dizil(ad), t=TF[ad];
  if(!l.length){
    el("govde").innerHTML=takipKutuCiz(ad)+'<div class="bos"><b>'+t.ik+" "+t.ad+'</b><br><br>'+
      (sira==="yeni"
        ? 'Bugün bu dilimde henüz sinyal çıkmadı.<br>Önceki günlerin sinyalleri için 💰 ya da 🎯 sekmesine geç.'
        : 'Şu an bu dilimde sinyal yok.<br>Bu dilimde henüz pivot kırılımı oluşmadı. Bar kapanışlarında liste yenilenir.')+
      '</div>'+dusenlerCiz(ad);
    takipBagla(ad);
    return;
  }
  el("govde").innerHTML=takipKutuCiz(ad)+sirCiz(sira)+l.map(function(k){return satirHtml(k,ad)}).join("")+
    '<div class="uyari">⚠️ Yatırım tavsiyesi değildir. Teknik tarama geleceği bilmez.</div>'+
    dusenlerCiz(ad);
  takipBagla(ad);sirBagla();satirBagla();
}
function adayCiz(){
  if(!D.super){
    el("govde").innerHTML='<div class="kilit"><div class="buyuk">👑</div>'+
      "<h2>Süper Üyelik gerekli</h2>"+
      "<p>Aday listeleri, sinyal <b>oluşmadan önce</b> hangi hisselerin kırılıma hazır olduğunu gösterir: "+
      "tetik seviyesi ve kırarsa gideceği hedef.</p>"+
      "<p>Toplam davetin: <b>"+D.ref+"</b> · açılması için <b>"+D.kalan+" kişi</b> daha.</p>"+
      '<button class="dg" id="davetGit">📤 Sistemi paylaş</button></div>';
    el("davetGit").onclick=function(){tit();sekme="davet";izSekmeDegisti(sekme);ciz()};
    return;
  }
  var alt=["adayOrta","adayOrtaVade","adayUzun","adayHafta"];
  var h='<div class="sirala">'+alt.map(function(a){
    var n=((D.kartlar&&D.kartlar[a])||[]).filter(hedefEsikGecti).length;
    return '<button class="sir'+(adayTf===a?" on":"")+'" data-at="'+a+'">'+TF[a].kisa+(n?" ("+n+")":"")+"</button>";
  }).join("")+"</div>";
  var l=dizil(adayTf);
  h+=l.length?l.map(function(k){return satirHtml(k,adayTf)}).join("")
    :'<div class="bos">Bu dilimde şu an aday yok.<br>Aday: o dilimin direncine yaklaşmış ama henüz kırmamış hisse.</div>';
  h+='<div class="uyari">🔓 Tetik kırılırsa o dilimin sinyali başlar. Tetik giriş fiyatı değildir.</div>';
  el("govde").innerHTML=h;
  [].forEach.call(document.querySelectorAll("[data-at]"),function(b){
    b.onclick=function(){tit();adayTf=b.dataset.at;ciz()};
  });
  satirBagla();
}
/* KAMA (WEDGE) LİSTESİ: tüm zaman dilimlerindeki hisseleri tek tek açıp
   bakmak yorucu olduğu için — sunucu tüm listedeki kodları tarar (KV
   önbellekten), sadece kama formasyonu tespit edilenleri, kalite skoruna
   göre sıralı döndürür. İlk taramada önbellek boşsa "taranıyor" gösterip
   birkaç saniye sonra kendini yeniler. */
var kamaD=null, kamaTararken=false;
function kamaCiz(){
  if(!D.super){
    el("govde").innerHTML='<div class="kilit"><div class="buyuk">🔒</div>'+
      "<h2>📐 Formasyon — Süper Üyelik gerekli</h2>"+
      '<p style="text-align:left">Bu ekran, <b>400+ BIST hissesini</b> klasik grafik formasyonları için sürekli tarar — üçgen, bayrak, omuz-baş-omuz, kama ve daha fazlası. Sen bakmadan, kırılım daha oluşmadan hangi hissenin hangi formasyonun içinde olduğunu görürsün.</p>'+
      '<p style="text-align:left"><b>Süper Üyelikte neler açılır?</b><br>'+
      '📐 Her hissenin aktif formasyonu + grafik üzerinde çizilmiş kırılım seviyeleri<br>'+
      '🧮 O hissenin <b>tüm zaman dilimlerindeki</b> formasyonlarının birleştirilmiş (kümülatif) hedefi — tek tek bakmana gerek kalmaz<br>'+
      '🔓 Onay (kırılım) ve 🚫 iptal seviyeleri, hedefe kalan yüzde ile birlikte<br>'+
      '🎯 Formasyon henüz kırılmadan hazırlanmış hedefler — piyasa hareket etmeden sen pozisyon planlarsın</p>'+
      "<p>Toplam davetin: <b>"+D.ref+"</b> · açılması için <b>"+D.kalan+" kişi</b> daha.</p>"+
      '<button class="dg" id="davetGit">📤 Sistemi paylaş, hemen aç</button></div>';
    var dg0=el("davetGit");if(dg0)dg0.onclick=function(){tit();sekme="davet";izSekmeDegisti(sekme);ciz()};
    return;
  }
  if(kamaD){kamaGoster();return}
  el("govde").innerHTML='<div class="yukleniyor">formasyonlar yükleniyor…</div>';
  kamaTara();
}
function kamaTara(){
  if(kamaTararken)return; kamaTararken=true;
  post("/api/kamalar",{}).then(function(v){
    kamaTararken=false;
    if(!v||!v.ok){el("govde").innerHTML='<div class="bos">Formasyon listesi okunamadı.</div>';return}
    kamaD=v;
    if(v.eksik&&sekme==="kama"){
      setTimeout(function(){if(sekme==="kama"){kamaD=null;kamaCiz()}},3500);
    }
    kamaGoster();
  }).catch(function(){kamaTararken=false;el("govde").innerHTML='<div class="bos">Bağlantı hatası.</div>'});
}
var fDilim="hepsi";
var fTip="hepsi";
var fDurum="hepsi";
var fMesafe="hepsi";
var fMesafeManuel=null;
var fSirala="kalite";
var FDILIM=[["hepsi","Tümü"],["1SA","1SA"],["4SA","4SA"],
            ["1G","1G"],["1HAF","Hafta"],["1AY","Ay"]];
var FDURUM=[["hepsi","Tümü"],["bugun","🆕 Bugün onay aldı"],["onay","✅ Onaylandı"],["bekliyor","⏳ Bekliyor"]];
var FMESAFE=[["hepsi","Tümü"],["2","🔥 ≤%2"],["5","≤%5"],["10","≤%10"],["uzak","🌙 >%10"]];
var FSIRALA=[["kalite","Kaliteye göre"],["yakin","Onaya en yakın"],["rr","En iyi Risk:Ödül"]];
/* TİP SÜZGECİ artık yön (Boğa/Ayı) fark etmeksizin ANA ŞEKLE göre
   grupluyor: "Boğa Flaması" + "Ayı Flaması" → tek "Flama" butonu.
   Aksi halde aynı formasyon yön yüzünden ikiye bölünüp "flama seçtim ama
   yarısı gözükmüyor" hissi veriyordu. İkili Dip / İkili Tepe ayrı kalıyor
   çünkü ikisi zaten tek yönlü ve genelde bilerek ayrı aranıyor. */
function tipTemel(tip){
  if(!tip)return tip;
  if(tip.indexOf("Flama")>=0)return"Flama";
  if(tip.indexOf("Bayrağı")>=0)return"Bayrak";
  if(tip.indexOf("Kama")>=0)return"Kama";
  if(tip.indexOf("Üçgen")>=0)return"Üçgen";
  return tip;
}
function tipListesiCikar(tum){
  var s=[];
  tum.forEach(function(x){var t=tipTemel(x.tip);if(t&&s.indexOf(t)===-1)s.push(t)});
  return s;
}
/* Onaya kalan mesafeyi (kırılımYuzde mutlak değeri) kovaya ayırır —
   "şurayı kırarsa başlar" seviyesine ne kadar yakınız sorusuna cevap. */
function mesafeBucket(x){
  if(x.kirilimYuzde==null)return null;
  var m=Math.abs(x.kirilimYuzde);
  if(m<=2)return"2";
  if(m<=5)return"5";
  if(m<=10)return"10";
  return"uzak";
}
function durumUyar(x){
  if(fDurum==="hepsi")return true;
  if(fDurum==="onay")return x.onaylandi===true;
  if(fDurum==="bekliyor")return x.onaylandi===false;
  if(fDurum==="bugun")return x.bugunOnay===true;
  return true;
}
/* Elle girilen yüzde eşiği (ör. "%1.5 kaldı") hazır kovaların (≤%2, ≤%5…)
   ÖNÜNE geçer — kullanıcı kendi mesafesini yazdıysa hazır seçenek yok
   sayılır. Boşsa eski kova mantığına döner. */
function mesafeUyar(x){
  if(fMesafeManuel!=null)return x.kirilimYuzde!=null&&Math.abs(x.kirilimYuzde)<=fMesafeManuel;
  return fMesafe==="hepsi"||mesafeBucket(x)===fMesafe;
}
function dilimTipUyar(x){return(fDilim==="hepsi"||x.tf===fDilim)&&(fTip==="hepsi"||tipTemel(x.tip)===fTip)}
function kamaGoster(){
  var tum=(kamaD&&kamaD.sonuc)||[];
  var l=tum.filter(function(x){return dilimTipUyar(x)&&durumUyar(x)&&mesafeUyar(x)});
  if(fSirala==="yakin")l.sort(function(a,b){
    var av=a.kirilimYuzde==null?1e9:Math.abs(a.kirilimYuzde),bv=b.kirilimYuzde==null?1e9:Math.abs(b.kirilimYuzde);
    return av-bv;
  });
  else if(fSirala==="rr")l.sort(function(a,b){
    var av=a.riskOdul==null?-1:a.riskOdul,bv=b.riskOdul==null?-1:b.riskOdul;
    return bv-av;
  });
  else l.sort(function(a,b){return(b.kalite||0)-(a.kalite||0)});
  var h='';
  if(tum.length){
    /* Dilim + tip filtreleri birbirini, durum/mesafe kendini süzer —
       her satır kendi ekseninde sayar, diğerlerini sabit tutar. Her grubun
       üstünde küçük bir başlık var artık — aksi halde art arda gelen dört
       "Tümü" düğmesi aynı satırın kopyası gibi görünüyordu. */
    h+='<div class="pzEt">⏱ Zaman dilimi</div><div class="pz">'+FDILIM.map(function(x){
      var n=tum.filter(function(y){return(x[0]==="hepsi"||y.tf===x[0])&&(fTip==="hepsi"||tipTemel(y.tip)===fTip)&&durumUyar(y)&&mesafeUyar(y)}).length;
      if(x[0]!=="hepsi"&&!n)return"";
      return '<button class="sir'+(fDilim===x[0]?" on":"")+'" data-fd="'+x[0]+'">'+x[1]+' <b>'+n+'</b></button>';
    }).join("")+"</div>";
    var tipler=tipListesiCikar(tum);
    if(tipler.length>1){
      h+='<div class="pzEt">📐 Formasyon tipi</div><div class="pz">'+[["hepsi","Tümü"]].concat(tipler.map(function(t){return[t,t]})).map(function(x){
        var n=tum.filter(function(y){return(x[0]==="hepsi"||tipTemel(y.tip)===x[0])&&(fDilim==="hepsi"||y.tf===fDilim)&&durumUyar(y)&&mesafeUyar(y)}).length;
        if(x[0]!=="hepsi"&&!n)return"";
        return '<button class="sir'+(fTip===x[0]?" on":"")+'" data-ft="'+E(x[0])+'">'+E(x[1])+' <b>'+n+'</b></button>';
      }).join("")+"</div>";
    }
    h+='<div class="pzEt">📍 Durum</div><div class="pz">'+FDURUM.map(function(x){
      var n=tum.filter(function(y){return dilimTipUyar(y)&&mesafeUyar(y)&&(x[0]==="hepsi"||(x[0]==="onay"?y.onaylandi===true:x[0]==="bekliyor"?y.onaylandi===false:x[0]==="bugun"?y.bugunOnay===true:true))}).length;
      if(x[0]!=="hepsi"&&!n)return"";
      return '<button class="sir'+(fDurum===x[0]?" on":"")+'" data-fu="'+x[0]+'">'+x[1]+' <b>'+n+'</b></button>';
    }).join("")+"</div>";
    h+='<div class="pzEt">🎯 Onaya mesafe</div><div class="pz">'+FMESAFE.map(function(x){
      var n=tum.filter(function(y){return dilimTipUyar(y)&&durumUyar(y)&&(x[0]==="hepsi"||mesafeBucket(y)===x[0])}).length;
      if(x[0]!=="hepsi"&&!n)return"";
      return '<button class="sir'+(fMesafeManuel==null&&fMesafe===x[0]?" on":"")+'" data-fm="'+x[0]+'">'+x[1]+' <b>'+n+'</b></button>';
    }).join("")+"</div>";
    /* Elle mesafe girişi: hazır kovalar (≤%2/≤%5…) yetmediğinde kullanıcı
       kendi eşiğini yazabilsin diye — ör. "1.3" yazınca sadece onaya
       %1.3 ve daha yakın kalanlar listelenir. */
    h+='<div class="mesafeManuel"><span>elle: kalan ≤ %</span>'+
      '<input type="number" inputmode="decimal" step="0.1" min="0" id="mesafeManuelKutu" value="'+(fMesafeManuel!=null?fMesafeManuel:"")+'" placeholder="ör. 1.5">'+
      '<button id="mesafeManuelUygula">Uygula</button>'+
      (fMesafeManuel!=null?'<button class="temiz" id="mesafeManuelTemizle">✕ Temizle</button>':'')+
      "</div>";
    h+='<div class="pzEt">↕️ Sıralama</div><div class="pz">'+FSIRALA.map(function(x){
      return '<button class="sir'+(fSirala===x[0]?" on":"")+'" data-fs="'+x[0]+'">↕️ '+x[1]+'</button>';
    }).join("")+"</div>";
  }
  if(kamaD&&kamaD.eksik)h+='<div class="bos" style="padding:10px 14px;font-size:12.5px">⏳ Formasyon dosyası henüz yayınlanmadı — tarama gecelik çalışır.</div>';
  else if(kamaD&&kamaD.guncelleme)h+='<div class="et" style="padding:8px 14px;font-size:11.5px">🕒 Son tarama: '+E(String(kamaD.guncelleme).slice(0,16).replace("T"," "))+'</div>';
  if(!l.length){
    h+='<div class="bos"><b>📐 Formasyonlar</b><br><br>'+
      (tum.length?"Bu süzgeçte formasyon yok — üstten başka bir filtre seç."
                 :"Şu an hiçbir hissede yeterli kalitede formasyon (kama, üçgen, bayrak, ikili dip) tespit edilmedi.<br>Formasyonlar sürekli değişir, birazdan tekrar bakın.")+
      "</div>";
    el("govde").innerHTML=h; fdBagla(); ftBagla(); fuBagla(); fmBagla(); fsBagla(); mesafeManuelBagla(); return;
  }
  h+=l.map(function(x){
    var renk=x.yon==="al"?"#3fb950":(x.yon==="sat"?"#f85149":"#d29922");
    var ikon=x.yon==="al"?"📈":"📉";
    var altSat='';
    if(x.kirilim!=null)altSat+='<div class="alt2">🔓 Kırılım <b>'+N(x.kirilim)+'</b>'+
      (x.kirilimYuzde!=null?'  ·  '+(x.kirilimYuzde>=0?"+":"")+Number(x.kirilimYuzde).toFixed(1)+'% kaldı':'')+'</div>';
    if(x.hedef!=null)altSat+='<div class="alt2">🎯 Hedef <b>'+N(x.hedef)+'</b>'+
      (x.hedefYuzde!=null?'  ·  '+(x.hedefYuzde>=0?"+":"")+Number(x.hedefYuzde).toFixed(1)+'%':'')+'</div>';
    if(x.riskOdul!=null)altSat+='<div class="alt2">⚖️ Risk:Ödül <b>1 : '+x.riskOdul.toFixed(1)+'</b></div>';
    if(x.digerDilimler&&x.digerDilimler.length)altSat+='<div class="alt2">🕒 Diğer dilimlerde de var: <b>'+x.digerDilimler.map(E).join(", ")+'</b></div>';
    var durumEt='';
    if(x.bugunOnay)durumEt='<span class="rozetKucuk" style="color:#3fb950;border-color:#3fb950">🆕 Bugün onay</span>';
    else if(x.onaylandi===true)durumEt='<span class="rozetKucuk" style="color:#58a6ff;border-color:#58a6ff">✅ Onaylandı</span>';
    else if(x.onaylandi===false)durumEt='<span class="rozetKucuk" style="color:var(--soluk);border-color:var(--ciz)">⏳ Bekliyor</span>';
    /* Sağ üstteki büyük rakam artık seçili SIRALAMAYA göre değişiyor —
       "onaya en yakın" seçiliyken kalite değil, sıralamanın kendisi olan
       mesafe % görünsün; aksi halde hangi ölçüte göre sıralandığı hiç
       görünmüyordu, kullanıcı sıralamanın çalışıp çalışmadığını anlayamıyordu.
       Kalite her zaman altında küçük olarak da yazılı kalıyor. */
    var sagUst;
    if(fSirala==="yakin"&&x.kirilimYuzde!=null)
      sagUst='<div class="yuzde so">kalan <b>'+(x.kirilimYuzde>=0?"+":"")+Number(x.kirilimYuzde).toFixed(1)+'%</b></div><div class="altN" style="margin-top:2px">kalite %'+x.kalite+'</div>';
    else if(fSirala==="rr"&&x.riskOdul!=null)
      sagUst='<div class="yuzde so">R:Ö <b>1:'+x.riskOdul.toFixed(1)+'</b></div><div class="altN" style="margin-top:2px">kalite %'+x.kalite+'</div>';
    else
      sagUst='<div class="yuzde so">kalite <b>%'+x.kalite+'</b></div>';
    return '<div class="satir" data-kod="'+E(x.kod)+'" data-l="'+E(x.tf)+'" data-form="1" style="border-left-color:'+renk+'">'+
      '<div class="sol"><div class="kod">'+E(x.kod)+'</div>'+
      '<div class="altbilgi">'+ikon+' '+E(x.tip)+' · '+E(x.tf||"")+'</div>'+altSat+durumEt+'</div>'+
      '<div class="sag">'+sagUst+'</div></div>';
  }).join('');
  el("govde").innerHTML=h;
  satirBagla(); fdBagla(); ftBagla(); fuBagla(); fmBagla(); fsBagla(); mesafeManuelBagla();
}
/* Elle yazılan yüzde eşiğini bağlar: Uygula'ya basınca ya da Enter'a
   basınca değeri okur, geçerliyse hazır kova filtresinin önüne geçirir. */
function mesafeManuelBagla(){
  var kutu=el("mesafeManuelKutu");
  if(!kutu)return;
  var uygula=function(){
    tit();
    var v=Number(String(kutu.value).replace(",","."));
    fMesafeManuel=(kutu.value!==""&&v>=0)?v:null;
    kamaGoster();
  };
  var b=el("mesafeManuelUygula");if(b)b.onclick=uygula;
  kutu.onkeydown=function(e){if(e.key==="Enter")uygula()};
  var t=el("mesafeManuelTemizle");
  if(t)t.onclick=function(){tit();fMesafeManuel=null;kamaGoster()};
}
/* Dilim / tip / durum / mesafe / sıralama süzgeçleri: veri zaten yüklü,
   filtreleme tamamen tarayıcıda — yeni istek atılmaz. */
function fdBagla(){
  Array.prototype.forEach.call(document.querySelectorAll("[data-fd]"),function(b){
    b.onclick=function(){tit();fDilim=b.dataset.fd;kamaGoster()};
  });
}
function ftBagla(){
  Array.prototype.forEach.call(document.querySelectorAll("[data-ft]"),function(b){
    b.onclick=function(){tit();fTip=b.dataset.ft;kamaGoster()};
  });
}
function fuBagla(){
  Array.prototype.forEach.call(document.querySelectorAll("[data-fu]"),function(b){
    b.onclick=function(){tit();fDurum=b.dataset.fu;kamaGoster()};
  });
}
function fmBagla(){
  Array.prototype.forEach.call(document.querySelectorAll("[data-fm]"),function(b){
    b.onclick=function(){tit();fMesafe=b.dataset.fm;kamaGoster()};
  });
}
function fsBagla(){
  Array.prototype.forEach.call(document.querySelectorAll("[data-fs]"),function(b){
    b.onclick=function(){tit();fSirala=b.dataset.fs;kamaGoster()};
  });
}
/* HAZIR PRESETLER: dört ana listeyi (tavan/potansiyel/fibo/uzunvade) birleştirip
   var olan alanlarla (kalite, potansiyel, sinyalTs, kar) hazır filtreler sunar.
   Yabancı payı / temettü verimi gibi KAP-kaynaklı alanlar şu an taramada YOK,
   bu yüzden yalnız gerçekten hesaplanabilen filtreler eklendi — yanlış/boş
   veri göstermemek için. */
function presetCiz(){
  var hepsi=[];
  ["potansiyel","fibo","uzunvade"].forEach(function(ad){
    (D.kartlar&&D.kartlar[ad]||[]).forEach(function(x){
      var y=Object.assign({},x);y._ad=ad;hepsi.push(y);
    });
  });
  var chipler=[
    ["kaliteli","🔥 En kaliteli 10"],
    ["tuttu","🏆 Hedef tuttu"],
    ["yakin","🎯 Hedefe yakın"],
    ["yeni","🆕 Az önce sinyal verdi"],
    ["kazandiran","💰 En çok kazandıran"]
  ];
  var h='<div class="sirala" style="flex-wrap:wrap">'+chipler.map(function(c){
    return '<button class="sir'+(presetSec===c[0]?" on":"")+'" data-pr="'+c[0]+'">'+c[1]+"</button>";
  }).join("")+"</div>";
  var liste=hepsi.slice();
  if(presetSec==="kaliteli")liste.sort(function(a,b){return(b.kalite||0)-(a.kalite||0)});
  else if(presetSec==="tuttu")liste=liste.filter(function(x){return x.potansiyel!=null&&Number(x.potansiyel)<=0});
  else if(presetSec==="yakin")liste=liste.filter(function(x){return x.potansiyel!=null&&Number(x.potansiyel)>0}).sort(function(a,b){return Number(a.potansiyel)-Number(b.potansiyel)});
  else if(presetSec==="yeni")liste.sort(function(a,b){return(b.sinyalTs||0)-(a.sinyalTs||0)});
  else if(presetSec==="kazandiran")liste=liste.filter(function(x){return kar(x)!=null}).sort(function(a,b){return kar(b)-kar(a)});
  liste=liste.slice(0,15);
  el("govde").innerHTML=h+(liste.length?liste.map(function(x){return satirHtml(x,x._ad)}).join(""):
    '<div class="bos">Bu filtreye uyan hisse yok şu an.<br>Az sonra tekrar dene.</div>');
  bindPresetChips();
  satirBagla();
}
function bindPresetChips(){
  [].forEach.call(document.querySelectorAll("[data-pr]"),function(b){
    b.onclick=function(){tit();presetSec=b.dataset.pr;presetCiz()};
  });
}
/* 📰 KAP sekmesi: son bildirimleri listeler, satıra dokununca KAP'ın kendi
   sayfasına götürür (bu bot bildirimi yorumlamaz/tavsiye vermez, sadece
   gösterir). Arka planda otomatik push'tan (kapKontrolVeGonder) tamamen
   ayrı bir uç nokta (/api/kap) — sekme her açıldığında taze veri çeker. */
/* ═══════════ 📊 BACKTEST — KURULUŞTAN BUGÜNE GÜN GÜN ═══════════
   YENİ HİÇBİR KAYIT TUTULMAZ. Kaynak, zaten var olan "gecmis" verisi;
   bu sayfa yalnızca okur ve toplar. Yapıya dokunmamasının sebebi budur:
   kayıt motoru, /push akışı ve alarm yolu hiç bilmiyor bile.
   Günlük getiri = o gün açılan sinyallerin ortalama getirisi.
   Birikimli = her günün ortalaması bileşik olarak çarpılır; yani
   "her gün o günün sinyallerine eşit dağılmış olsaydın" senaryosu. */
var btD=null;
function backtestCiz(){
  if(btD){backtestGoster(btD);return}
  el("govde").innerHTML='<div class="yukleniyor">geçmiş okunuyor…</div>';
  post("/api/backtest",{}).then(function(v){btD=v;backtestGoster(v)})
    .catch(function(){el("govde").innerHTML='<div class="bos">Geçmiş okunamadı.</div>'});
}
function btSat(et,dg,sn,ac){
  return '<div class="sat"><span class="et">'+et+'</span><b'+(sn?' class="'+sn+'"':"")+'>'+dg+'</b></div>'+
         (ac?'<div class="btAc">'+ac+'</div>':"");
}
function backtestGoster(v){
  if(!v||!v.ok||!v.genel){el("govde").innerHTML='<div class="bos">Kuruluştan bu yana ölçülebilir kayıt yok.</div>';return}
  var G=v.genel, yon=!!v.yonetici, h='';

  /* ── 1. ÖZET: bir tarayıcının tek dürüst sayısı beklentidir ── */
  h+='<div class="kutu"><h3>🏁 '+E(v.kurulus)+' → '+E(v.bugun)+'</h3>'+
     '<div class="ozIki">'+
       '<div class="ozKart"><div class="ozBuyuk '+(G.beklenti>=0?"ye":"kr")+'">'+Y(G.beklenti)+'</div>'+
         '<div class="ozAlt">sinyal başına beklenti</div></div>'+
       '<div class="ozKart"><div class="ozBuyuk">'+G.isabet.toFixed(1)+'%</div>'+
         '<div class="ozAlt">isabet</div></div>'+
     '</div>'+
     '<div class="btAc" style="margin:-2px 0 9px">Beklenti = isabet×ortalama kazanç + ıskalama×ortalama kayıp. '+
     'Her sinyalin matematiksel karşılığı. Artıysa sistem uzun vadede kazandırır.</div>';

  h+=btSat("Ölçülen sinyal",G.n+" <span class='btN'>("+G.hisse+" farklı hisse)</span>","", 
       "Aynı hisse aynı gün birden fazla dilimde kırdıysa tek sinyal sayıldı.");
  h+=btSat("Ortalama getiri",Y(G.ort),G.ort>=0?"ye":"kr");
  h+=btSat("Medyan getiri",Y(G.medyan),G.medyan>=0?"ye":"kr",
       "Ortalamayı birkaç uç sinyal şişirebilir; medyan tipik sonucu gösterir.");
  h+=btSat("Ortalama kazanç",Y(G.ortKazanc),"ye");
  h+=btSat("Ortalama kayıp",Y(G.ortKayip),"kr");
  h+=btSat("Kâr faktörü",G.karFaktoru==null?"—":G.karFaktoru.toFixed(2),
       G.karFaktoru>=1?"ye":"kr",
       "Toplam kazanç ÷ toplam kayıp. 1'in altı zarar eden sistem demektir.");
  h+=btSat("Sinyalden sonraki zirve",Y(G.ortZirve),"ye");
  h+=btSat("Zirveden geri veriş",Y(-G.geriVeris),"kr",
       "Sinyaller en iyi noktasından ortalama bu kadar geri geldi. Yüksekse kâr alma kuralı gerekir.");
  h+=btSat("Ortalama tutma süresi",G.ortYas.toFixed(1)+" gün","",
       "Getiriler o günden BUGÜNE ölçülür; eski sinyallerin süresi daha uzundur.");
  if(G.enIyi)h+=btSat("En iyi",E(G.enIyi.kod)+" "+Y(G.enIyi.getiri)+" <span class='btN'>"+G.enIyi.tf+"</span>","ye");
  if(G.enKotu)h+=btSat("En kötü",E(G.enKotu.kod)+" "+Y(G.enKotu.getiri)+" <span class='btN'>"+G.enKotu.tf+"</span>","kr");
  /* 🔐 Hedefe değen — yalnız yönetici. */
  if(yon&&G.hedefN)
    h+=btSat("🔐 Hedefe değen",G.hedefTut+"/"+G.hedefN+" (%"+Math.round(100*G.hedefTut/G.hedefN)+")","");
  h+='</div>';

  /* ── 2. DAĞILIM: ortalama tek başına yalan söyleyebilir ── */
  if(v.dagilim&&v.dagilim.length){
    var enB=1; v.dagilim.forEach(function(d){enB=Math.max(enB,d.n)});
    h+='<div class="kutu"><h3>📊 Getiri dağılımı</h3>'+
       '<div class="btAc" style="margin-bottom:8px">Ortalama tek bir sayıdır; '+
       'gerçekte sinyaller nereye düştü?</div>';
    v.dagilim.forEach(function(d){
      var art=d.ad.indexOf("+")===0||d.ad.indexOf("0 /")===0;
      h+='<div class="btGun" style="padding:6px 0">'+
         '<div class="btUst"><b style="font-family:inherit">'+E(d.ad)+'</b>'+
         '<span class="btN" style="flex:1"></span><span>'+d.n+'</span></div>'+
         '<div class="btBar"><div class="btDolgu '+(art?"btYe":"btKr")+'" style="width:'+
           Math.round(d.n/enB*100)+'%"></div></div></div>';
    });
    h+='</div>';
  }

  /* ── 3. DİLİM TABLOSU: hangi vade gerçekten çalışıyor ── */
  if(v.dilimler&&v.dilimler.length){
    h+='<div class="kutu"><h3>⏱ Dilim karşılaştırması</h3>';
    v.dilimler.forEach(function(d){
      var i2=d.ist;
      h+='<div class="btGun">'+
         '<div class="btUst"><b style="font-family:inherit">'+E(d.tf)+'</b>'+
         '<span class="btN">'+i2.n+' sinyal · isabet %'+i2.isabet.toFixed(0)+'</span>'+
         '<span class="'+(i2.beklenti>=0?"ye":"kr")+'"><b>'+Y(i2.beklenti)+'</b></span></div>'+
         '<div class="btAlt">ortalama '+Y(i2.ort)+' · kâr faktörü '+
           (i2.karFaktoru==null?"—":i2.karFaktoru.toFixed(2))+
           ' · zirve '+Y(i2.ortZirve)+'</div></div>';
    });
    h+='<div class="btAc" style="margin-top:7px">Sağdaki sayı beklentidir. '+
       'Bir dilim sürekli eksideyse o dilimi kapatmayı düşün.</div></div>';
  }

  /* ── 3b. HEDEF1/HEDEF2/STOP ORANI — dilime göre (KISA/ORTA/UZUN/HAFTA) ── */
  if(v.dilimRapor&&v.dilimRapor.length){
    h+='<div class="kutu"><h3>🎯 Hedef / Stop oranı (dilime göre)</h3>'+
       '<div class="btAc" style="margin-bottom:8px">Her dilimin kendi sinyalleri ayrı ayrı sayılır (üstteki tablodaki gibi aynı kod aynı gün birden fazla dilimde kırınca tekilleştirme yok). '+
       'Stop yalnız ORTA ve UZUN için ölçülebilir (alt dilimin kırdığı seviyeye göre) ve yalnız <b>2026-08-29</b>\'dan sonra açılan sinyallerde — daha eski kayıtlarda "ölçülemedi" ayrı gösterilir, uydurma sayı üretilmez.</div>';
    v.dilimRapor.forEach(function(d){
      var h1=d.hedef1.oran==null?"—":d.hedef1.tut+"/"+d.hedef1.n+" (%"+Math.round(d.hedef1.oran)+")";
      var h2=d.hedef2.oran==null?"—":d.hedef2.tut+"/"+d.hedef2.n+" (%"+Math.round(d.hedef2.oran)+")";
      var st=d.stop.oran==null?"ölçülemedi":d.stop.oldu+"/"+d.stop.n+" (%"+Math.round(d.stop.oran)+")";
      h+='<div class="btGun"><div class="btUst"><b style="font-family:inherit">'+E(d.ad)+'</b>'+
         '<span class="btN">'+d.toplam+' sinyal</span></div>'+
         '<div class="btAlt">🧱 Hedef1 '+h1+'  ·  🎯 Hedef2 '+h2+'  ·  🛑 Stop '+st+
         (d.stop.olcumsuz?' <span class="btN">('+d.stop.olcumsuz+' ölçülemedi)</span>':'')+
         '</div></div>';
    });
    h+='</div>';
  }

  /* ── 4. GÜN GÜN ── */
  if(v.gunler&&v.gunler.length){
    var enN=1; v.gunler.forEach(function(g){enN=Math.max(enN,Math.abs(g.ort))});
    h+='<div class="kutu"><h3>📅 Gün gün</h3>'+
       '<div class="btAc" style="margin-bottom:8px">Her satır, O GÜN açılan sinyallerin '+
       'BUGÜNE kadarki durumudur. Eski günler daha uzun süre tutulmuş sayılır; '+
       'bu yüzden günler birbiriyle doğrudan kıyaslanamaz.</div>';
    v.gunler.forEach(function(g){
      h+='<div class="btGun">'+
         '<div class="btUst"><b>'+E(g.gun)+'</b>'+
           '<span class="btN">'+g.n+' sinyal · isabet %'+g.isabet.toFixed(0)+
             ' · '+g.yas+' gün</span>'+
           '<span class="'+(g.ort>=0?"ye":"kr")+'"><b>'+Y(g.ort)+'</b></span></div>'+
         '<div class="btBar"><div class="btDolgu '+(g.ort>=0?"btYe":"btKr")+'" style="width:'+
           Math.round(Math.abs(g.ort)/enN*100)+'%"></div></div>'+
         '<div class="btAlt">zirve '+Y(g.zirve)+
           (yon&&g.hedefN?' · 🔐 hedefe değen '+g.hedefTut+'/'+g.hedefN:'')+
           (g.eniyi?' · en iyi '+E(g.eniyi.kod)+" "+Y(g.eniyi.getiri):'')+
           (g.enkotu?' · en kötü '+E(g.enkotu.kod)+" "+Y(g.enkotu.getiri):'')+
         '</div></div>';
    });
    h+='</div>';
  }

  h+='<div class="btAc" style="margin:10px 2px 24px">'+
     'Ham kayıt '+v.hamSayi+' · aynı gün aynı hisse tekilleştirildi'+
     (v.elenenAykiri?' · aykırı elenen '+v.elenenAykiri+' (bedelsiz/sermaye artırımı)':'')+
     (v.elenenTaze?' · '+v.ayar.olgunluk+' günden genç elenen '+v.elenenTaze:'')+
     '.<br>Komisyon, makas ve vergi dahil değildir. Portföy eğrisi verilmez: '+
     'günde onlarca sinyal üreten bir tarayıcıda tüm sinyallere aynı anda '+
     'girmek mümkün olmadığı için böyle bir eğri gerçeği yansıtmaz.</div>';

  el("govde").innerHTML=h;
}
/* ═══════════════ 📋 TEMEL ANALİZ SAYFASI ═══════════════
   Sinyal listelerindeki hisselerin temel verisi tek ekranda. Veri
   kaynağı haftalık temel.json; bu sayfa yalnızca okur ve sıralar.
   Sinyal üretimine, alarma ve taramaya hiçbir etkisi yoktur. */
/* ═══════════════ 📋 TEMEL ANALİZ ═══════════════
   Havuzun TAMAMI (432 hisse), sektöre göre persantillerle. Süzgeç ve
   sıralama istemcide çalışır — veri bir kez çekilir, her dokunuşta
   sunucuya gidilmez. Kendi detay ekranı vardır: hisseye tıklayınca
   sinyal kartı değil, ŞİRKET karnesi açılır. */
var temelD=null, temelSira="skor", temelSekt="", temelAra="";
var temelMinF=0, temelMinUcuz=0, temelSadeceSinyal=false, temelKarli=false;

function tYuzde(v,ek){ return (v==null||!isFinite(v))?"—":((v>0?"+":"")+v.toFixed(1)+(ek||"%")); }
function tSayi(v,b){ return (v==null||!isFinite(v))?"—":v.toFixed(b==null?2:b); }

function temelCiz(){
  if(temelD){temelGoster();return}
  el("govde").innerHTML='<div class="yukleniyor">temel veri okunuyor…</div>';
  post("/api/temelListe",{}).then(function(v){
    if(!v||!v.ok){
      el("govde").innerHTML='<div class="bos"><b>📋 Temel Analiz</b><br><br>'+
        '<b style="color:var(--kr)">'+E(String((v&&v.hata)||"okunamadı"))+'</b><br><br>'+
        '<span class="altbilgi">GitHub → Actions → <b>Temel Analiz Verisi</b> → Run workflow.</span></div>';
      return;
    }
    temelD=v; temelGoster();
  }).catch(function(){el("govde").innerHTML='<div class="bos">Bağlantı kurulamadı.</div>'});
}

function temelSuz(){
  var l=(temelD.liste||[]).slice();
  if(temelSekt)l=l.filter(function(x){return x.sektor===temelSekt});
  if(temelAra)l=l.filter(function(x){return x.kod.indexOf(temelAra)===0});
  if(temelMinF>0)l=l.filter(function(x){
    return x.fskorOlculen>=5 && (x.fskor/x.fskorOlculen)*9>=temelMinF;});
  if(temelMinUcuz>0)l=l.filter(function(x){return x.fkP!=null&&x.fkP>=temelMinUcuz});
  if(temelSadeceSinyal)l=l.filter(function(x){return !!x.sinyal});
  if(temelKarli)l=l.filter(function(x){return x.roa!=null&&x.roa>0&&x.netMarj!=null&&x.netMarj>0});
  var s={
    skor:function(a,b){return(b.skor==null?-1:b.skor)-(a.skor==null?-1:a.skor)},
    fskor:function(a,b){
      var oa=a.fskorOlculen?a.fskor/a.fskorOlculen:-1, ob=b.fskorOlculen?b.fskor/b.fskorOlculen:-1;
      return ob-oa;},
    ucuz:function(a,b){return(b.fkP==null?-1:b.fkP)-(a.fkP==null?-1:a.fkP)},
    buyume:function(a,b){return(b.buyumeCiro==null?-9999:b.buyumeCiro)-(a.buyumeCiro==null?-9999:a.buyumeCiro)},
    roe:function(a,b){return(b.roe==null?-9999:b.roe)-(a.roe==null?-9999:a.roe)},
    borc:function(a,b){return(a.netBorcFavok==null?9999:a.netBorcFavok)-(b.netBorcFavok==null?9999:b.netBorcFavok)}
  };
  l.sort(s[temelSira]||s.skor);
  return l;
}

function temelGoster(){
  var v=temelD, l=temelSuz(), h='';

  /* ── Sıralama ── */
  h+='<div class="sirala">'+
    [["skor","🎯 Uyum"],["fskor","📊 F-Skor"],["ucuz","💰 Ucuzluk"],
     ["buyume","📈 Büyüme"],["roe","🏆 ROE"],["borc","🏦 Az borç"]]
    .map(function(o){return '<button class="sir'+(temelSira===o[0]?" on":"")+
      '" data-tsir="'+o[0]+'">'+o[1]+'</button>'}).join("")+'</div>';

  /* ── Süzgeçler ── */
  h+='<div class="tSuz">'+
     '<input id="tAra" class="tGir" placeholder="Hisse ara" maxlength="6" '+
       'autocomplete="off" autocapitalize="characters" value="'+E(temelAra)+'">'+
     '<select id="tSekt" class="tGir"><option value="">Tüm sektörler</option>'+
       (v.sektorler||[]).map(function(s2){return '<option value="'+E(s2.ad)+'"'+
         (temelSekt===s2.ad?" selected":"")+'>'+E(s2.ad)+' ('+s2.n+')</option>'}).join("")+
     '</select></div>'+
     '<div class="tSuz">'+
     '<label class="tEt">F-Skor ≥ <b id="tFv">'+temelMinF+'</b>'+
       '<input id="tF" type="range" min="0" max="9" step="1" value="'+temelMinF+'"></label>'+
     '<label class="tEt">Ucuzluk ≥ <b id="tUv">'+temelMinUcuz+'</b>%'+
       '<input id="tU" type="range" min="0" max="90" step="10" value="'+temelMinUcuz+'"></label>'+
     '</div>'+
     '<div class="sirala">'+
     '<button class="sir'+(temelSadeceSinyal?" on":"")+'" data-tflt="sinyal">⚡ Sinyali olanlar</button>'+
     '<button class="sir'+(temelKarli?" on":"")+'" data-tflt="karli">✅ Kâr eden</button>'+
     '<button class="sir" data-tflt="sifirla">↺ Sıfırla</button>'+
     '</div>';

  h+='<div class="btAc" style="margin:6px 2px 10px">'+
     '<b>'+l.length+'</b> / '+(v.toplam||0)+' hisse'+
     (v.guncelleme?' · veri '+E(String(v.guncelleme).slice(0,10)):'')+
     '. <b>Uyum skoru</b> şirketin sağlamlığını 100 üzerinden özetler; '+
     'sinyal üretmez, sinyali etiketler.'+
     (v.kilitSayi?' <span style="color:var(--sar)">🔒 En sağlam '+v.kilitSayi+
       ' şirketin adı Süper Üyelere açık.</span>':'')+
     '</div>';

  if(!l.length){
    h+='<div class="bos">Bu süzgeçlere uyan hisse yok.<br>'+
       '<span class="altbilgi">↺ Sıfırla ile süzgeçleri kaldır.</span></div>';
  }

  l.slice(0,150).forEach(function(x){
    var sk=x.skor, kil=!!x.kilit;
    var oran=x.fskorOlculen?x.fskor/x.fskorOlculen:null;
    h+='<div class="satir" data-tkod="'+E(x.kod)+'"'+(kil?' data-tkilit="1"':'')+
       ' style="border-left-color:'+(sk==null?"var(--ciz)":(sk>=65?"#2FBF71":(sk<=35?"#E5484D":"#E8A33D")))+'">'+
       '<div class="sol"><div class="kod">'+
         (kil?'<span class="buguluKod">'+E(x.kod)+'</span><span class="buguluKilit">🔒</span>'
             :E(x.kod))+
         (x.sektor?' <span class="btN">'+E(x.sektor)+'</span>':"")+
         (x.sinyal?' <span class="roz roz-iy" style="margin:0 0 0 5px">⚡</span>':"")+
       '</div>'+
       '<div class="altbilgi">F/K '+tSayi(x.fk,1)+' · PD/DD '+tSayi(x.pddd)+
         ' · ROE '+tYuzde(x.roe)+' · marj '+tYuzde(x.netMarj)+'</div>'+
       '<div class="altbilgi">'+
         (x.enflasyonUyari?'<span style="color:var(--sar)">⚠️ enflasyon geçişi — büyüme kıyaslanamaz</span>'
           :('ciro '+tYuzde(x.buyumeCiro)+' · kâr '+tYuzde(x.buyumeKar)))+
       '</div>'+
       '<div class="rozSat">'+
         (oran!=null?'<span class="roz '+(oran>=.75?"roz-iy":(oran<=.35?"roz-ko":""))+
           '">📊 '+x.fskor+'/'+x.fskorOlculen+'</span>':"")+
         (x.fkP!=null?'<span class="roz '+(x.fkP>=70?"roz-iy":(x.fkP<=30?"roz-ko":""))+
           '">💰 %'+x.fkP+'</span>':"")+
         (x.netBorcFavok!=null?'<span class="roz '+(x.netBorcFavok<=2?"roz-iy":
           (x.netBorcFavok>=4?"roz-ko":""))+'">🏦 '+x.netBorcFavok+'</span>':"")+
         (x.bilancoGun!=null&&x.bilancoGun>=0&&x.bilancoGun<=7?
           '<span class="roz roz-ko">📅 bilanço '+(x.bilancoGun===0?"bugün":x.bilancoGun+"g")+'</span>':"")+
       '</div></div>'+
       '<div class="sag"><div class="fiyat">'+(sk==null?"—":sk)+'</div>'+
       '<div class="yuzde so">skor</div></div></div>';
  });

  if(l.length>150)h+='<div class="btAc" style="margin:8px 2px">İlk 150 gösteriliyor — '+
    'süzgeçle daralt.</div>';

  h+='<div class="btAc" style="margin:12px 2px 24px">'+
     '<b>F-Skor</b> (Piotroski): kârlılık, borç, likidite ve verimlilikten 9 ölçüt. '+
     'Eksik veri varsa o ölçüt sayılmaz — <b>7/9</b> ile <b>7/7</b> farklıdır.<br>'+
     '<b>Ucuzluk</b>: F/K&#39;nın kendi sektöründeki persantili. %80 = sektörünün en ucuz beşte biri.<br>'+
     '<b>⚠️ Enflasyon</b>: BIST şirketleri 31.12.2023&#39;ten beri enflasyona göre düzeltilmiş '+
     'rapor veriyor; düzeltilmiş ile düzeltilmemiş dönem kıyaslanamaz, öyle durumlarda '+
     'büyüme hiç gösterilmez.<br>Temel veri haftada bir güncellenir ve <b>sinyal üretmez</b>.</div>';

  el("govde").innerHTML=h;
  temelBagla();
}

function temelBagla(){
  [].forEach.call(document.querySelectorAll("#govde [data-tsir]"),function(b){
    b.onclick=function(){tit();temelSira=b.getAttribute("data-tsir");temelGoster();window.scrollTo(0,0)};
  });
  [].forEach.call(document.querySelectorAll("#govde [data-tflt]"),function(b){
    b.onclick=function(){
      tit();var k=b.getAttribute("data-tflt");
      if(k==="sinyal")temelSadeceSinyal=!temelSadeceSinyal;
      else if(k==="karli")temelKarli=!temelKarli;
      else{temelSadeceSinyal=false;temelKarli=false;temelSekt="";temelAra="";
           temelMinF=0;temelMinUcuz=0;temelSira="skor"}
      temelGoster();window.scrollTo(0,0);
    };
  });
  var a=el("tAra");
  if(a)a.oninput=function(){temelAra=(a.value||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
    var k=a.selectionStart; temelGoster();
    var y=el("tAra"); if(y){y.focus();try{y.setSelectionRange(k,k)}catch(e){}}};
  var s2=el("tSekt");
  if(s2)s2.onchange=function(){tit();temelSekt=s2.value;temelGoster();window.scrollTo(0,0)};
  var f=el("tF");
  if(f)f.oninput=function(){temelMinF=Number(f.value)||0;
    var v2=el("tFv"); if(v2)v2.textContent=temelMinF; temelGoster();};
  var u=el("tU");
  if(u)u.oninput=function(){temelMinUcuz=Number(u.value)||0;
    var v3=el("tUv"); if(v3)v3.textContent=temelMinUcuz; temelGoster();};
  [].forEach.call(document.querySelectorAll("#govde [data-tkod]"),function(b){
    b.onclick=function(){
      tit();
      /* Kilitli satır kodu ele vermesin: davete gider. */
      if(b.dataset.tkilit){sekme="davet";izSekmeDegisti(sekme);ciz();window.scrollTo(0,0);return}
      temelDetay(b.getAttribute("data-tkod"));
    };
  });
}

/* ═══ ŞİRKET KARNESİ — sinyal kartı değil, temel detay ═══ */
function temelDetay(kod){
  var x=null,l=(temelD&&temelD.liste)||[];
  for(var i=0;i<l.length;i++)if(l[i].kod===kod){x=l[i];break}
  if(!x)return;
  var K=el("katman"); if(!K)return;
  var oran=x.fskorOlculen?x.fskor/x.fskorOlculen:null;
  var h='<div class="kapat"><b>📋 '+E(x.kod)+(x.sektor?' · '+E(x.sektor):'')+
        '</b><button id="tkapat">✕ Kapat</button></div>';

  h+='<div class="kutu"><div class="ozIki">'+
     '<div class="ozKart"><div class="ozBuyuk '+(x.skor==null?"":(x.skor>=65?"ye":(x.skor<=35?"kr":"")))+
       '">'+(x.skor==null?"—":x.skor)+'</div><div class="ozAlt">uyum skoru</div></div>'+
     '<div class="ozKart"><div class="ozBuyuk">'+(oran==null?"—":x.fskor+"/"+x.fskorOlculen)+
       '</div><div class="ozAlt">F-Skor</div></div></div>';
  if(x.sinyal)h+='<div class="sat"><span class="et">⚡ Açık sinyal</span><b class="ye">'+
    E(x.sinyal.join(" · "))+'</b></div>';
  h+='</div>';

  /* F-Skor dökümü — hangi ölçüt geçti, hangisi ölçülemedi */
  if(x.fskorDetay){
    var adlar={netKarPozitif:"Net kâr pozitif",roaPozitif:"Aktif kârlılığı pozitif",
      nakitAkisiPozitif:"Faaliyet nakit akışı pozitif",
      kazancKalitesi:"Nakit akışı net kârdan büyük (kazanç kalitesi)",
      borcAzaldi:"Uzun vadeli borç oranı azaldı",cariOranArtti:"Cari oran arttı",
      seyreltmeYok:"Hisse sayısı artmadı (seyreltme yok)",
      marjArtti:"Brüt kâr marjı arttı",devirHiziArtti:"Aktif devir hızı arttı"};
    h+='<div class="kutu"><h3>📊 F-Skor dökümü</h3>';
    for(var k2 in adlar){
      if(!Object.prototype.hasOwnProperty.call(adlar,k2))continue;
      var d2=x.fskorDetay[k2];
      h+='<div class="oz '+(d2===true?"v":(d2===false?"y":""))+'">'+
         '<span class="tik">'+(d2===true?"✓":(d2===false?"✗":"—"))+'</span>'+
         '<span>'+adlar[k2]+(d2==null?' <span class="btN">veri yok</span>':'')+'</span></div>';
    }
    h+='<div class="btAc" style="margin-top:7px">Veri olmayan ölçüt sayılmaz. '+
       'Bu yüzden skor "kaç ölçütten kaç" biçiminde verilir.</div></div>';
  }

  h+='<div class="kutu"><h3>💰 Değerleme</h3>'+
     '<div class="sat"><span class="et">F/K</span><b>'+tSayi(x.fk,1)+
       (x.fkP!=null?' <span class="btN">sektörde ucuzluk %'+x.fkP+'</span>':'')+'</b></div>'+
     '<div class="sat"><span class="et">PD/DD</span><b>'+tSayi(x.pddd)+
       (x.pdddP!=null?' <span class="btN">%'+x.pdddP+'</span>':'')+'</b></div>'+
     (x.pd?'<div class="sat"><span class="et">Piyasa değeri</span><b>'+
       (x.pd/1e9).toFixed(2)+' milyar ₺</b></div>':'')+
     (x.temettu!=null?'<div class="sat"><span class="et">Temettü verimi</span><b>'+
       tYuzde(x.temettu)+'</b></div>':'')+
     '</div>';

  h+='<div class="kutu"><h3>🏆 Kârlılık</h3>'+
     '<div class="sat"><span class="et">Özsermaye kârlılığı (ROE)</span><b class="'+
       (x.roe>0?"ye":"kr")+'">'+tYuzde(x.roe)+'</b></div>'+
     '<div class="sat"><span class="et">Net kâr marjı</span><b class="'+
       (x.netMarj>0?"ye":"kr")+'">'+tYuzde(x.netMarj)+
       (x.marjP!=null?' <span class="btN">sektörde %'+x.marjP+'</span>':'')+'</b></div>'+
     '<div class="sat"><span class="et">Aktif kârlılığı (ROA)</span><b class="'+
       (x.roa>0?"ye":"kr")+'">'+tYuzde(x.roa)+'</b></div>'+
     '</div>';

  h+='<div class="kutu"><h3>📈 Büyüme ve borç</h3>';
  if(x.enflasyonUyari){
    h+='<div class="altbilgi" style="color:var(--sar)">⚠️ Karşılaştırma dönemi enflasyon '+
       'muhasebesi geçişini kapsıyor. Düzeltilmiş bir dönemi düzeltilmemişle kıyaslamak '+
       'yanlış sonuç verir; bu yüzden büyüme oranı gösterilmiyor.</div>';
  } else {
    h+='<div class="sat"><span class="et">Ciro büyümesi (yıllık)</span><b class="'+
       (x.buyumeCiro>=0?"ye":"kr")+'">'+tYuzde(x.buyumeCiro)+'</b></div>'+
       '<div class="sat"><span class="et">Net kâr büyümesi</span><b class="'+
       (x.buyumeKar>=0?"ye":"kr")+'">'+tYuzde(x.buyumeKar)+'</b></div>';
  }
  h+='<div class="sat"><span class="et">Net borç / FAVÖK</span><b class="'+
     (x.netBorcFavok==null?"":(x.netBorcFavok<=2?"ye":(x.netBorcFavok>=4?"kr":"")))+'">'+
     tSayi(x.netBorcFavok)+'</b></div>'+
     '<div class="btAc" style="margin-top:6px">2&#39;nin altı rahat, 4&#39;ün üstü '+
     'baskı demektir. Eksi değer net nakit fazlasıdır.</div>';
  if(x.bilancoTarihi)h+='<div class="sat"><span class="et">📅 Bilanço tarihi</span><b class="'+
    (x.bilancoGun!=null&&x.bilancoGun>=0&&x.bilancoGun<=2?"kr":"")+'">'+E(x.bilancoTarihi)+
    (x.bilancoGun!=null?' <span class="btN">('+(x.bilancoGun===0?"bugün":x.bilancoGun+" gün")+')</span>':'')+
    '</b></div>';
  h+='</div>';

  h+='<div class="btAc" style="margin:10px 2px 20px">Temel veri haftada bir güncellenir '+
     've <b>sinyal üretmez</b>. Yatırım tavsiyesi değildir.</div>';

  K.innerHTML=h; K.classList.add("ac"); window.scrollTo(0,0);
  var kp=el("tkapat");
  if(kp)kp.onclick=function(){tit();K.classList.remove("ac");K.innerHTML=""};
  try{tgGeriDugme()}catch(e){}
}
/* ═══════════ ❓ YARDIM SAYFASI — rozetler ve sekmeler tek tek ═══════════
   Amaç: hiçbir teknik terimi bilmeyen biri bile okuyunca anlasın. Her
   blokta ne olduğu + neden önemli olduğu + somut bir örnek var. */
function ydBlok(baslik,aciklama,ornek){
  return '<div class="ydBlok"><div class="ydBaslik">'+baslik+'</div>'+
    '<div class="ydAlt">'+aciklama+'</div>'+
    (ornek?'<div class="ydOr">'+ornek+'</div>':"")+'</div>';
}
function yardimCiz(){
  var h='';
  h+='<div class="uyari" style="margin-top:0;text-align:left">Bu sayfa, uygulamadaki her rozetin ve her sekmenin ne anlama geldiğini basitçe anlatır. Hiçbir yerde "al/sat" demez — hepsi karar vermene yardımcı olacak bağlam bilgisidir.</div>';

  h+='<div class="ydGrup">☀️ Hava durumu rozeti (yeni)</div>';
  h+=ydBlok("☀️ Güneş — 3/3 şart 🔒 Süper Üyelik",
    "Üç bağlam şartının HEPSİ birden sağlanıyor: ⚓ ortalama üstü + 📚 kalın raf + 📐 temiz trend. En sağlam görünüm budur. Endeks ölçüsü bilerek dışarıda bırakıldı — kırılım yapmış neredeyse her hissede sağlandığı için ayrım yapmıyor, sadece sistemi seyreltiyordu. Hangi hissenin ☀️ olduğu Süper Üyelere özel; Süper Üye değilsen yerine 🔒 rozeti ve kaç hissenin şartı sağladığı görünür, hangileri olduğu görünmez.",
    "Örnek: bir hisse kırılımdan sonra hâlâ alıcıların ortalamasının üstünde, kırdığı seviyenin altı yoğun işlem görmüş ve fiyat düzgün bir çizgide gidiyorsa → ☀️ Güneş.");
  h+=ydBlok("⛅ Parçalı bulutlu — 3'te 2 şart",
    "Dört şarttan üçü sağlanıyor, biri eksik. Hâlâ güçlü bir görüntü ama bir tarafı zayıf — hangi şartın eksik olduğunu satırdaki diğer rozetlerden görebilirsin.",
    "Örnek: her şey tamam ama endeksin gerisinde kalmış (📊 şartı yok) → ⛅.");
  h+=ydBlok("☁️ Bulutlu — 3'te 1 şart",
    "Sadece iki şart sağlanıyor. Orta karar bir görüntü; tek başına yeterli değil, diğer bilgilerle birlikte değerlendir.",
    "Örnek: ortalama üstü ve temiz trend var ama raf ince ve endeksin gerisinde → ☁️.");
  h+=ydBlok("Rozetsiz — 0 veya 1 şart",
    "İki şarttan azı sağlanıyorsa hiç hava durumu rozeti gösterilmez. Bu “kötü” demek değil, sadece bağlam açısından net bir sinyal yok demektir.");

  h+='<div class="ydGrup">🎖️ Tek tek bağlam rozetleri</div>';
  h+=ydBlok("⚓ ortalama üstü / ORTALAMA ALTI",
    "Kırılım anından bu yana o hisseyi alanların ortalama maliyeti hesaplanır (hacimle ağırlıklı). Fiyat bu ortalamanın üstündeyse alanların çoğu kârda demektir, satış baskısı düşüktür. Altındaysa alanlar zarardadır, her toparlanmada satış gelebilir.",
    "Örnek: 1830'dan kırdı, şimdi 1880'de → “ortalama üstü”, o kırılımdan alanlar kârda.");
  h+=ydBlok("📚 kalın raf (X'x) / ince raf (X'x)",
    "Kırılan seviyenin hemen altında ne kadar işlem (hacim) birikmiş, ona bakar. 1.5x ve üzeri “kalın raf”: o seviyede gerçekten çok alım-satım olmuş, kırılınca destek olur — sağlam. 0.5x ve altı “ince raf”: kimse işlem yapmamış boş bölge, sahte kırılıma açık.",
    "Örnek: “kalın raf 2.29x” → seviyenin altı normalin iki katından fazla dolu, güvenilir.");
  h+=ydBlok("📐 temiz trend (X) / testere (X)",
    "Son 20 barda fiyatın NET yol aldığı mesafe ile TOPLAM gidip-geldiği mesafenin oranı. 0.45 ve üzeri “temiz trend”: fiyat düz bir çizgide ilerlemiş. 0.20 ve altı “testere”: fiyat aynı yerde defalarca gidip gelmiş — kırılımlar burada en çok yanıltır.",
    "Örnek: “testere 0.18” yazan bir hissede kırılım görünse bile fiyat o bölgede sürekli delip geri gelmiş demektir, güvenme.");
  h+=ydBlok("📊 endeksi geçiyor / endeksin gerisinde (%X · βY)",
    "Hisse mi yükseliyor, yoksa tüm BIST100 mü onu taşıyor? β (beta) hissenin endeksle birlikte ne kadar sert oynadığını gösterir. Yüzdelik kısım (alfa) ise endeksin payı çıkarıldıktan sonra geriye kalan, HİSSEYE ÖZGÜ fazla getiridir.",
    "Örnek: “+24.72% · β0.21” → düşük beta (endeksten bağımsız hareket) ve endeksin çok üstünde performans, hisseye özgü gerçek bir güç. “-11.46% · β-0.49” ise kırılım olsa da hisse aslında endeksin gerisinde kalıyor demek, uyarı işareti.");
  h+=ydBlok("🦅 Kartal",
    "Trend çizgisi kırılımı + hacim patlaması + bir momentum göstergesi (RSI/DMI/OBV) aynı anda tetiklendiğinde verilen kozmetik bir rozet. Birden fazla bağımsız sinyalin aynı anda yeşil yanması anlamına gelir.");
  h+=ydBlok("⚡ canlı",
    "Kırılım şu an oluşan bar üzerinde gerçekleşmiş — bar henüz kapanmadı. Bar kapanana kadar sinyal geri dönebilir (yalanlanabilir), bu yüzden “canlı” işaretli sinyallere biraz daha temkinli yaklaş.");

  h+='<div class="ydGrup">📑 Sekmeler ne işe yarar</div>';
  h+=ydBlok("📊 KISA · 1 saat / 📐 ORTA · 4 saat / 🗓 UZUN · 1 gün",
    "Aynı tarama mantığı, sadece zaman dilimi farklı. KISA = 1 saatlik mumlarda oluşan kırılımlar (en hızlı, en çok sinyal, en kısa vadeli). ORTA = 4 saatlik mumlar. UZUN = günlük mumlar (en yavaş ama en az yanıltan, pozisyon/uzun vade için).");
  h+=ydBlok("🟨 Adaylar 🔒 Süper Üyelik",
    "Henüz kırılım OLUŞMAMIŞ ama tetik seviyesine yaklaşmış hisseler. Kırarsa nereye gideceği (hedef) burada önceden görünür — kırılımı beklemeden hazırlıklı olmak için. Süper Üyelik gerektirir.");
  h+=ydBlok("📐 Formasyon 🔒 Süper Üyelik",
    "Klasik grafik formasyonlarını (üçgen, bayrak, omuz-baş-omuz vb.) otomatik tarayan liste; kırılım beklemeden formasyon aşamasındaki hisseleri gösterir. Süper Üyelik gerektirir.");
  h+=ydBlok("🔔 Anlık Alarm 🔒 Süper Üyelik",
    "Güçlü bir sinyale giren hisse oluştuğu an sana Telegram'da özel mesaj gelir, listeyi kontrol etmene gerek kalmaz. Süper Üyelik gerektirir; açıp kapatmak için bota /alarm yazman yeterli.");
  h+=ydBlok("🔄 Sektör Rotasyonu",
    "Hangi sektörün parada olduğunu, para akışının sektörler arasında nasıl döndüğünü gösterir (Gelişen → Lider → Zayıflayan → Geride sırasıyla saat yönünde döner).");
  h+=ydBlok("⭐ Takip",
    "Kendi seçtiğin hisseler; anlık kâr/zarar durumlarını buradan tek ekranda görürsün.");
  h+=ydBlok("💼 Portföy",
    "Gerçek pozisyonlarını (adet/maliyet) girdiğin yer; toplam değer ve kâr/zarar özeti burada hesaplanır.");
  h+=ydBlok("🎛 Presetler",
    "Hazır filtre kombinasyonları — “kaliteli” gibi tek dokunuşla belirli bir kalite eşiğinin üstündeki hisseleri gösteren kısayollar.");
  h+=ydBlok("🌊 Absorpsiyon",
    "Günlük barlardan order-flow (emir akışı) tespiti: büyük hacmin fiyatı yükseltmeden “emildiği” (absorbe edildiği) noktaları arar — genelde büyük oyuncuların sessizce topladığı bölgelerdir.");
  h+=ydBlok("📤 Davet",
    "Uygulamayı başkalarına davet ederek Süper Üyelik süresi kazanma bölümü.");

  h+='<div class="uyari">⚠️ Buradaki hiçbir rozet veya sekme tek başına yatırım tavsiyesi değildir. Teknik tarama geçmiş veriye bakar, geleceği bilemez.</div>';
  el("govde").innerHTML=h;
}
/* 🔔 ANLIK ALARM — açma/kapama Telegram sohbetinde /alarm komutuyla
   yapılır (bot tarafı, mini-app dışı); burası sadece Süper Üyelik
   kapısı + nasıl açılacağının anlatımı. */
function alarmCiz(){
  if(!D.super){
    el("govde").innerHTML='<div class="kilit"><div class="buyuk">🔒</div>'+
      "<h2>Süper Üyelik gerekli</h2>"+
      "<p>Anlık uyarı, güçlü bir sinyale giren hisse oluştuğu an sana <b>özel mesaj</b> olarak gelir — listeyi açıp kontrol etmene gerek kalmaz.</p>"+
      "<p>Toplam davetin: <b>"+D.ref+"</b> · açılması için <b>"+D.kalan+" kişi</b> daha.</p>"+
      '<button class="dg" id="davetGit">📤 Sistemi paylaş</button></div>';
    el("davetGit").onclick=function(){tit();sekme="davet";izSekmeDegisti(sekme);ciz()};
    return;
  }
  el("govde").innerHTML='<div class="kutu"><h3>🔔 Anlık Alarm</h3>'+
    '<p class="ydAlt">Süper Üyesin, bu özellik senin için açık. Anlık uyarıyı açıp kapatmak için Telegram sohbetinde bota <code>/alarm</code> yaz — orada tek dokunuşla 🔔 Aç / 🔕 Kapat seçebilirsin.</p>'+
    '<p class="ydAlt">Açıkken: güçlü bir sinyale giren hisse oluştuğu an, sohbete otomatik mesaj gelir.</p></div>';
}
function portfoyBul(kod){
var k=null,ad=null;
Object.keys(D.kartlar||{}).forEach(function(a){
if(a==="sira"||k)return;
var x=(D.kartlar[a]||[]).filter(function(y){return y.kod===kod})[0];
if(x){k=x;ad=a}});
return k?{k:k,ad:ad}:null;
}
/* 💼 Portföy sekmesi: tüm pozisyonlar (D.fav'da olsun olmasın), toplam
   değer/K-Z özeti, satır tıklayınca detay+düzenle paneli açılır, üstte
   doğrudan "Yeni Pozisyon Ekle" ile kod yazmadan Takip listesine girmeye
   gerek kalmadan pozisyon eklenebilir. */
function portfoySiraUygula(satirlar){
  var m={
    deger:function(a,b){return b.satirDeger-a.satirDeger},
    kz:function(a,b){return (b.kz==null?-1e9:b.kz)-(a.kz==null?-1e9:a.kz)},
    alfa:function(a,b){return a.kod<b.kod?-1:1}
  };
  return satirlar.slice().sort(m[portfoySirala]||m.deger);
}
function portfoyCiz(){
  var pf=D.portfoy||{}, kodlar=Object.keys(pf), gecmis=D.portfoyGecmis||[];
  var h='';
  if(!kodlar.length&&!gecmis.length){
    h='<div class="bos"><b>💼 Portföyüm</b><br><br>Henüz pozisyon eklemedin.</div>';
    h+='<button class="dg ik" id="portfoyYeniDg" style="margin-top:10px">➕ Yeni Pozisyon Ekle</button>';
    el("govde").innerHTML=h;
    portfoyYeniBagla();
    return;
  }
  var toplamMaliyet=0,toplamDeger=0,adet=0,satirlar=[];
  kodlar.forEach(function(kod){
    var poz=pf[kod];
    if(!(poz&&poz.lot>0&&poz.maliyet>0))return;
    var bul=portfoyBul(kod);
    var fiyat=bul&&bul.k.fiyat>0?bul.k.fiyat:null;
    var satirMaliyet=poz.lot*poz.maliyet;
    var satirDeger=fiyat!=null?poz.lot*fiyat:null;
    if(satirDeger!=null){toplamMaliyet+=satirMaliyet;toplamDeger+=satirDeger;adet++}
    var kz=fiyat!=null?(fiyat/poz.maliyet-1)*100:null, tutar=fiyat!=null?(fiyat-poz.maliyet)*poz.lot:null;
    satirlar.push({kod:kod,poz:poz,fiyat:fiyat,kz:kz,tutar:tutar,satirDeger:satirDeger||0,ad:bul?bul.ad:""});
  });
  var kzToplam=toplamMaliyet>0?100*(toplamDeger/toplamMaliyet-1):0, farkToplam=toplamDeger-toplamMaliyet;
  var gercekToplam=gecmis.reduce(function(a,x){return a+(x.kar||0)},0);
  var enIyi=null,enKotu=null;
  satirlar.forEach(function(s){if(s.kz==null)return;if(!enIyi||s.kz>enIyi.kz)enIyi=s;if(!enKotu||s.kz<enKotu.kz)enKotu=s});
  h+='<div class="kutu" style="margin-bottom:12px"><h3>💼 Portföyüm ('+adet+' hisse)</h3>'+
    '<div class="ikili"><div><div class="buyukN">'+toplamDeger.toFixed(2)+' ₺</div><div class="altN">güncel değer</div></div>'+
    '<div><div class="buyukN '+(kzToplam>=0?"ye":"kr")+'">'+Y(kzToplam)+'</div><div class="altN">'+(farkToplam>=0?"+":"")+farkToplam.toFixed(2)+' ₺</div></div></div>'+
    '<div class="altN" style="margin-top:6px">toplam maliyet '+toplamMaliyet.toFixed(2)+' ₺</div>'+
    (gecmis.length?'<div class="altN" style="margin-top:4px">gerçekleşen K/Z (kapanan satışlar): <b class="'+(gercekToplam>=0?"ye":"kr")+'">'+(gercekToplam>=0?"+":"")+gercekToplam.toFixed(2)+' ₺</b> ('+gecmis.length+' satış)</div>':'')+
    (enIyi&&enKotu&&satirlar.length>1?'<div class="altN" style="margin-top:4px">🏆 en iyi <b class="ye">'+E(enIyi.kod)+'</b> '+Y(enIyi.kz)+'  ·  🥶 en kötü <b class="kr">'+E(enKotu.kod)+'</b> '+Y(enKotu.kz)+'</div>':'')+
    '</div>';
  if(satirlar.length>1){
    h+='<div class="sirala" style="margin-bottom:10px">'+
      ['deger','kz','alfa'].map(function(s){
        var etiket={deger:'Değer',kz:'K/Z%',alfa:'A-Z'}[s];
        return '<button class="sir'+(portfoySirala===s?' on':'')+'" data-sirala="'+s+'">'+etiket+'</button>';
      }).join('')+'</div>';
  }
  satirlar=portfoySiraUygula(satirlar);
  h+=satirlar.map(function(s){
    var pay=toplamDeger>0&&s.satirDeger>0?100*s.satirDeger/toplamDeger:0;
    return '<div class="satir" style="cursor:pointer;flex-direction:column;align-items:stretch" data-kod="'+E(s.kod)+'">'+
      '<div style="display:flex;align-items:center;gap:10px;width:100%">'+
      '<div class="sol"><div class="kod">'+E(s.kod)+'</div>'+
      '<div class="altbilgi">'+s.poz.lot+' lot · maliyet '+N(s.poz.maliyet)+' ₺'+(s.fiyat!=null?' · şimdi '+N(s.fiyat)+' ₺':' · fiyat yok')+'</div></div>'+
      '<div class="sag">'+(s.kz!=null?'<div class="yuzde '+(s.kz>=0?"ye":"kr")+'">'+Y(s.kz)+'</div><div class="altN">'+(s.tutar>=0?"+":"")+s.tutar.toFixed(2)+' ₺</div>':'<div class="altN">fiyat yok</div>')+'</div></div>'+
      (pay>0?'<div style="height:4px;border-radius:3px;background:var(--ciz);margin-top:8px;overflow:hidden"><div style="height:100%;width:'+pay.toFixed(1)+'%;background:var(--mavi)"></div></div><div class="altN" style="margin-top:3px">portföyün %'+pay.toFixed(1)+"'i</div>":'')+
      '</div>';
  }).join("");
  h+='<button class="dg ik" id="portfoyYeniDg" style="margin-top:10px">➕ Yeni Pozisyon Ekle</button>';
  if(satirlar.length>1){
    h+='<div style="display:flex;gap:8px;margin-top:8px">'+
      '<button class="dg" id="portfoySektorDg" style="flex:1">🥧 Sektör Dağılımı</button>'+
      '<button class="dg" id="portfoyPerfDg" style="flex:1">📈 Performans</button></div>';
  }
  if(gecmis.length)h+='<button class="dg" id="portfoyGecmisDg" style="margin-top:8px">📜 Gerçekleşen K/Z geçmişi ('+gecmis.length+')</button>';
  h+='<div class="uyari">Satıra dokun: detay/düzenle/sat. Yatırım tavsiyesi değildir.</div>';
  el("govde").innerHTML=h;
  [].forEach.call(document.querySelectorAll("#govde .satir"),function(row){
    row.onclick=function(){var kod=row.getAttribute("data-kod");tit();detay(kod,(portfoyBul(kod)||{}).ad||"")};
  });
  [].forEach.call(document.querySelectorAll("#govde [data-sirala]"),function(btn){
    btn.onclick=function(){portfoySirala=btn.getAttribute("data-sirala");portfoyCiz()};
  });
  if(el("portfoyGecmisDg"))el("portfoyGecmisDg").onclick=function(){tit();portfoyGecmisCiz()};
  if(el("portfoySektorDg"))el("portfoySektorDg").onclick=function(){tit();portfoySektorCiz(satirlar,toplamDeger)};
  if(el("portfoyPerfDg"))el("portfoyPerfDg").onclick=function(){tit();portfoyPerformansCiz()};
  portfoyYeniBagla();
}
/* 🥧 SEKTÖR DAĞILIMI: statik BIST sektör haritasıyla (bkz. backend SEKTOR_HARITA)
   pozisyonları grupluyor. Harita eksiksiz değildir; eşleşmeyenler "Diğer". */
function portfoySektorCiz(satirlar,toplamDeger){
  var K=el("katman"), sek=D.portfoySektor||{}, grup={};
  satirlar.forEach(function(s){
    var ad=sek[s.kod]||"Diğer";
    if(!grup[ad])grup[ad]={deger:0,kodlar:[]};
    grup[ad].deger+=s.satirDeger||0; grup[ad].kodlar.push(s.kod);
  });
  var siraliSek=Object.keys(grup).sort(function(a,b){return grup[b].deger-grup[a].deger});
  var h='<div class="kapat"><b>🥧 Sektör Dağılımı</b><button id="sekapat">✕ Kapat</button></div>';
  h+=siraliSek.map(function(ad){
    var g=grup[ad], pay=toplamDeger>0?100*g.deger/toplamDeger:0;
    return '<div class="satir" style="flex-direction:column;align-items:stretch">'+
      '<div style="display:flex;justify-content:space-between"><div class="kod">'+E(ad)+'</div><div class="altN">%'+pay.toFixed(1)+'</div></div>'+
      '<div class="altbilgi">'+g.kodlar.map(E).join(", ")+'</div>'+
      '<div style="height:4px;border-radius:3px;background:var(--ciz);margin-top:6px;overflow:hidden"><div style="height:100%;width:'+pay.toFixed(1)+'%;background:var(--mor)"></div></div>'+
      '</div>';
  }).join("")+'<div class="uyari">Sektör eşlemesi en likit BIST kodları için elle derlenmiştir, eksiksiz olmayabilir.</div>';
  K.innerHTML=h;K.classList.add("ac");tgGeriDugme();
  el("sekapat").onclick=function(){tit();K.classList.remove("ac");K.innerHTML="";tgGeriDugme();if(sekme==="fav"||sekme==="portfoy")basla()};
}
/* 📈 PERFORMANS: günlük anlık görüntülerden (bkz. backend portfoyGunlukSnapshotAl)
   toplam portföy değerinin zaman içindeki değişimini çizer. Yeni portföylerde
   birkaç güne kadar veri birikmemiş olabilir — bu normaldir, kademeli dolar. */
function portfoyPerformansCiz(deneme){
  deneme=deneme||0;
  var K=el("katman");
  var h='<div class="kapat"><b>📈 Portföy Performansı</b><button id="pfkapat">✕ Kapat</button></div>';
  var gunluk=D.portfoyGunluk||[];
  if(gunluk.length<2){
    h+='<div class="bos">Henüz yeterli geçmiş yok.<br>Portföy değeri günde bir kez kaydedilir, birkaç gün sonra burada grafik oluşur.</div>';
    K.innerHTML=h;K.classList.add("ac");tgGeriDugme();
    el("pfkapat").onclick=function(){tit();K.classList.remove("ac");K.innerHTML="";tgGeriDugme();if(sekme==="fav"||sekme==="portfoy")basla()};
    return;
  }
  h+='<div id="pfGrafikKutu" style="height:220px;margin:10px 0"></div>';
  var ilk=gunluk[0].deger,son=gunluk[gunluk.length-1].deger,degisim=ilk>0?100*(son/ilk-1):0;
  h+='<div class="kutu"><div class="ikili"><div><div class="buyukN">'+son.toFixed(2)+' ₺</div><div class="altN">güncel</div></div>'+
    '<div><div class="buyukN '+(degisim>=0?"ye":"kr")+'">'+Y(degisim)+'</div><div class="altN">'+gunluk[0].gun+' → bugün</div></div></div></div>';
  h+='<div class="uyari">Değer, o günkü kapanış/anlık fiyatlarla hesaplanır; para yatırma/çekme ayrıştırılmaz.</div>';
  K.innerHTML=h;K.classList.add("ac");tgGeriDugme();
  el("pfkapat").onclick=function(){tit();K.classList.remove("ac");K.innerHTML="";tgGeriDugme();if(sekme==="fav"||sekme==="portfoy")basla()};
  if(!window.LightweightCharts&&deneme<20){setTimeout(function(){
    if(el("pfGrafikKutu"))portfoyPerformansGrafikCiz(gunluk);else portfoyPerformansCiz(deneme+1);
  },150);return}
  portfoyPerformansGrafikCiz(gunluk);
}
function portfoyPerformansGrafikCiz(gunluk){
  var kutu=el("pfGrafikKutu"); if(!kutu||!window.LightweightCharts)return;
  try{
    var chart=LightweightCharts.createChart(kutu,{
      width:kutu.clientWidth||320, height:220,
      layout:{background:{color:"transparent"},textColor:"#e6edf3",attributionLogo:false},
      grid:{vertLines:{color:"#262d38"},horzLines:{color:"#262d38"}},
      timeScale:{timeVisible:false,secondsVisible:false},
      rightPriceScale:{borderVisible:false}
    });
    var alanAyar={
      lineColor:"#388bfd",topColor:"rgba(56,139,253,0.35)",bottomColor:"rgba(56,139,253,0.02)",lineWidth:2
    };
    var seri=null;
    if(chart.addSeries&&LightweightCharts.AreaSeries)seri=chart.addSeries(LightweightCharts.AreaSeries,alanAyar);
    else if(chart.addAreaSeries)seri=chart.addAreaSeries(alanAyar);
    if(!seri){kutu.innerHTML='<p class="bilgi">Grafik kütüphanesi bu sürümde alan serisi oluşturamadı.</p>';return}
    seri.setData(gunluk.map(function(x){return{time:x.gun,value:x.deger}}));
    chart.timeScale().fitContent();
    var pfBoyutla=function(){try{chart.applyOptions({width:kutu.clientWidth||320})}catch(e){}};
    window.addEventListener("resize",pfBoyutla);
    grafikKaydet(chart,pfBoyutla);
  }catch(e){kutu.innerHTML='<p class="bilgi">Grafik çizilemedi.</p>'}
}
/* 📜 GERÇEKLEŞEN K/Z GEÇMİŞİ: kapanan (kısmi/tam satılan) pozisyonların
   gerçek kâr/zararını listeler. Eski panelde bu bilgi hiç tutulmuyordu —
   pozisyon silindiğinde geçmişi de siliniyordu. */
function portfoyGecmisCiz(){
  var K=el("katman"), gecmis=D.portfoyGecmis||[];
  var toplam=gecmis.reduce(function(a,x){return a+(x.kar||0)},0);
  var h='<div class="kapat"><b>📜 Gerçekleşen K/Z Geçmişi</b><button id="gdkapat">✕ Kapat</button></div>';
  h+='<div class="kutu" style="margin:10px 0"><div class="ikili"><div><div class="buyukN '+(toplam>=0?"ye":"kr")+'">'+(toplam>=0?"+":"")+toplam.toFixed(2)+' ₺</div><div class="altN">toplam gerçekleşen K/Z</div></div>'+
    '<div><div class="buyukN">'+gecmis.length+'</div><div class="altN">satış işlemi</div></div></div></div>';
  h+=gecmis.map(function(x){
    var d=new Date(x.tarih);
    return '<div class="satir"><div class="sol"><div class="kod">'+E(x.kod)+'</div>'+
      '<div class="altbilgi">'+x.lot+' lot · '+N(x.alisMaliyet)+' ₺ → '+N(x.satisFiyat)+' ₺ · '+d.toLocaleDateString("tr-TR")+'</div></div>'+
      '<div class="sag"><div class="yuzde '+(x.kar>=0?"ye":"kr")+'">'+Y(x.karYuzde)+'</div><div class="altN">'+(x.kar>=0?"+":"")+x.kar.toFixed(2)+' ₺</div></div></div>';
  }).join("")+'<div class="uyari">Yatırım tavsiyesi değildir.</div>';
  K.innerHTML=h;K.classList.add("ac");tgGeriDugme();
  el("gdkapat").onclick=function(){tit();K.classList.remove("ac");K.innerHTML="";tgGeriDugme();if(sekme==="fav"||sekme==="portfoy")basla()};
}
function portfoyYeniBagla(){
  el("portfoyYeniDg").onclick=function(){
    tit();
    var kod=prompt("Hisse kodu (örn: THYAO)?","");
    if(!kod)return;
    kod=kod.trim().toUpperCase();
    if(!kod)return;
    var lotStr=prompt(kod+" — kaç lot elinde var?","");
    if(lotStr===null)return;
    var lot=Number(String(lotStr).replace(",","."));
    if(!(lot>0)){alert("Geçerli bir lot sayısı gir.");return}
    var malStr=prompt(kod+" — ortalama alış maliyetin (₺)?","");
    if(malStr===null)return;
    var mal=Number(String(malStr).replace(",","."));
    if(!(mal>0)){alert("Geçerli bir maliyet gir.");return}
    var b=el("portfoyYeniDg");b.disabled=true;
    post("/api/portfoy",{kod:kod,lot:lot,maliyet:mal}).then(function(r){
      b.disabled=false;
      if(r&&r.ok){D.portfoy=r.portfoy;if(sekme==="portfoy")portfoyCiz()}
      else alert("Kaydedilemedi, tekrar dene.");
    });
  };
}
function favCiz(){
  var f=D.fav||[], bul=[];
  f.forEach(function(kod){
    var k=null,ad=null;
    Object.keys(D.kartlar||{}).forEach(function(a){
      if(a==="sira"||k)return;
      var x=(D.kartlar[a]||[]).filter(function(y){return y.kod===kod})[0];
      if(x){k=x;ad=a}
    });
    if(k)bul.push({k:k,ad:ad}); else bul.push({k:{kod:kod,fiyat:null},ad:"",yok:true});
  });
  if(!bul.length){
    el("govde").innerHTML='<div class="bos"><b>⭐ Takip listem</b><br><br>Listen boş.<br>'+
      "Bir hissenin detayını aç, <b>⭐ Takibe al</b>'a dokun — burada toplanır.</div>";
    return;
  }
  var pf=D.portfoy||{};
  el("govde").innerHTML=portfoyOzetiCiz(pf,bul)+bul.map(function(x){
    var satir=x.yok?'<div class="satir" data-kod="'+E(x.k.kod)+'" data-l="">'+
      '<div class="sol"><div class="kod">'+E(x.k.kod)+"</div>"+
      '<div class="altbilgi">şu an hiçbir listede değil</div></div>'+
      '<div class="sag"><div class="yuzde so">detay ▸</div></div></div>'
      :satirHtml(x.k,x.ad);
    var poz=pf[x.k.kod];
    if(poz&&poz.lot>0&&poz.maliyet>0&&x.k.fiyat>0){
      var kz=(x.k.fiyat/poz.maliyet-1)*100, tutar=(x.k.fiyat-poz.maliyet)*poz.lot;
      satir+='<div class="uyari" style="margin:-6px 0 10px;padding-left:14px">💼 '+poz.lot+' lot · maliyet '+N(poz.maliyet)+
        ' ₺ · <b class="'+(kz>=0?"ye":"kr")+'">'+Y(kz)+"</b> ("+(tutar>=0?"+":"")+tutar.toFixed(2)+" ₺)</div>";
    }
    return satir;
  }).join("")+'<div class="uyari">Takipten çıkarmak için hisseyi aç, ⭐ düğmesine tekrar dokun.<br>Portföy K/Z için hisseyi aç, 💼 düğmesine dokun.</div>';
  satirBagla();
}
/* PORTFÖY ÖZETİ: yalnız D.fav içinde olup portfoy'da lot+maliyet girilmiş
   hisseleri toplar. Fiyat kaynağı fav listesindeki 'bul' (o an taramada
   görünen kart) — hisse hiçbir listede değilse fiyatı yok, o satır özete
   girmez (yanlış/eksik toplam göstermemek için sessizce atlanır). */
function portfoyOzetiCiz(pf,bul){
  var kodlar=Object.keys(pf||{});
  if(!kodlar.length)return"";
  var toplamMaliyet=0,toplamDeger=0,adet=0;
  kodlar.forEach(function(kod){
    var poz=pf[kod];
    if(!(poz&&poz.lot>0&&poz.maliyet>0))return;
    var satir=bul.filter(function(x){return x.k.kod===kod})[0];
    var fiyat=satir&&satir.k.fiyat>0?satir.k.fiyat:null;
    if(fiyat==null)return;
    toplamMaliyet+=poz.lot*poz.maliyet;
    toplamDeger+=poz.lot*fiyat;
    adet++;
  });
  if(!adet)return"";
  var kz=toplamMaliyet>0?100*(toplamDeger/toplamMaliyet-1):0, fark=toplamDeger-toplamMaliyet;
  return '<div class="kutu" style="margin-bottom:12px"><h3>💼 Portföyüm ('+adet+' hisse)</h3>'+
    '<div class="ikili"><div><div class="buyukN">'+toplamDeger.toFixed(2)+' ₺</div><div class="altN">güncel değer</div></div>'+
    '<div><div class="buyukN '+(kz>=0?"ye":"kr")+'">'+Y(kz)+'</div><div class="altN">'+(fark>=0?"+":"")+fark.toFixed(2)+' ₺</div></div></div></div>';
}
/* 📐 FORMASYON SAYFASI: Formasyon listesindeki bir satıra dokununca açılır.
   Genel detay() kartını (sinyal fiyatı, portföy düğmeleri, favoriler…)
   BİLEREK kullanmaz — formasyonun tek işi olan geniş grafik + yorum kutusu
   dışında hiçbir şeyle karışmasın diye kendi sade sayfası vardır. */
function formasyonDetay(kod,ad){
  var K=el("katman");
  var kapatEt=function(){tit();K.classList.remove("ac");K.classList.remove("genis");K.innerHTML="";tgGeriDugme()};
  K.innerHTML='<div class="kapat"><b>📐 '+E(kod)+'</b><button id="dkapat">✕ Kapat</button></div>'+
    '<div class="yukleniyor">yükleniyor…</div>';
  K.classList.add("ac");K.classList.add("genis");tgGeriDugme();
  el("dkapat").onclick=kapatEt;
  var h='<div class="kapat"><b>📐 Formasyon</b><button id="dkapat">✕ Kapat</button></div>';
  h+='<div class="fBaslikBuyuk">'+E(kod)+'</div>';
  h+='<div class="fAltBaslik">'+E(ad||"")+' dilimi · bu sayfa yalnız formasyona odaklanır</div>';
  h+='<div class="kutu"><h3>📊 Grafik<span id="desenRozet"></span></h3>'+
     '<div id="mumKutu" class="mumKutu genis"><div class="yukleniyor" style="padding:20px 0">grafik yükleniyor…</div></div>'+
     '<div id="desenYorum"></div></div>';
  h+='<div id="desenKumulatif"></div>';
  h+='<button class="dg ik" id="fHisseDg">📈 Bu hissenin sinyal kartını gör</button>';
  h+='<button class="dg" id="fPaylasDg">📤 Paylaş</button>';
  h+='<div class="uyari">⚠️ Yatırım tavsiyesi değildir. Formasyon geçmişi gelecek performansı garanti etmez.</div>';
  K.innerHTML=h;
  grafikCiz(kod,ad,0,320);
  el("dkapat").onclick=kapatEt;
  el("fHisseDg").onclick=function(){tit();K.classList.remove("genis");detay(kod,ad)};
  el("fPaylasDg").onclick=function(){
    tit();
    var m="📐 "+kod+" · "+(ad||"")+" formasyonu\\\\n\\\\n🤖 Fix Borsa Sinyal ile takip ediyorum, sen de katıl 👇";
    var u="https://t.me/share/url?url="+encodeURIComponent(D.link)+"&text="+encodeURIComponent(m);
    try{TG.openTelegramLink(u)}catch(e){location.href=u}
  };
}
/* 📩 BİZE ULAŞIN: eskiden sabit "Fix Borsa Sinyal" başlığının yerinde artık
   bu rozet var. Kullanıcı görüş/öneri yazınca sunucu, gönderenin kim
   olduğunu (ad/kullanıcı adı/ID) da ekleyerek yöneticiye Telegram'dan
   bildirim atıyor; yönetici panelindeki "Mesaj at" düğmesiyle de aynı
   kişiye geri dönebiliyor. */
function bizeUlasin(){
  /* 🔔 Yönetici için "Bize Ulaşın" artık okuma kutusuna açılır — mesajı
     Telegram'a çıkmadan, sistemin içinden okuyup yine içinden yanıtlar.
     Normal kullanıcı için değişiklik yok: görüş/öneri gönderme formu. */
  if(D&&D.yon)return gbInboxAc();
  tit();
  var K=el("katman");
  var kapatEt=function(){tit();K.classList.remove("ac");K.innerHTML="";tgGeriDugme()};
  var h='<div class="kapat"><b>📩 Bize Ulaşın</b><button id="dkapat">✕ Kapat</button></div>';
  h+='<div class="kutu"><h3>💬 Görüş ve Önerileriniz</h3>';
  h+='<div class="bilgi">Sistemle ilgili aklına takılan her şeyi buraya yazabilirsin — istek, hata bildirimi, öneri. Doğrudan yöneticiye ulaşır, gerekirse sana geri dönüş yapılır.</div>';
  h+='<textarea class="gir" id="buMetin" placeholder="Buraya yaz…" maxlength="2000"></textarea>';
  h+='<button class="dg" id="buGonder">📩 Gönder</button>';
  h+='<div class="durum" id="buDurum"></div></div>';
  K.innerHTML=h;
  K.classList.add("ac");tgGeriDugme();
  el("dkapat").onclick=kapatEt;
  el("buGonder").onclick=function(){
    tit();
    var metin=(el("buMetin").value||"").trim();
    if(!metin){el("buDurum").textContent="⚠️ önce bir şeyler yaz";return}
    var btn=el("buGonder");btn.disabled=true;el("buDurum").textContent="gönderiliyor…";
    post("/api/geribildirim",{metin:metin}).then(function(r){
      btn.disabled=false;
      if(!r||!r.ok){el("buDurum").textContent="⚠️ gönderilemedi, tekrar dene";return}
      el("buMetin").value="";
      el("buDurum").textContent="✅ gönderildi, teşekkürler!";
    }).catch(function(){btn.disabled=false;el("buDurum").textContent="⚠️ bağlantı hatası"});
  };
}
/* ═══════ 📩 GERİ BİLDİRİM KUTUSU (yalnız yönetici) ═══════════════════════
   "Bize Ulaşın"a gelen mesajları sistemin içinden okuyup, yine sistemin
   içinden (bot üzerinden) yanıtlamayı sağlar — Telegram DM'lerini karıştırıp
   kimin neye cevap verdiğini unutma derdi olmasın diye. Açılınca sunucu
   "son okunma" damgasını günceller, böylece başlıktaki 🔔 işareti söner. */
function gbRozetGoster(n){
  var b=el("baslikYazi");if(!b)return;
  var r=el("gbRozet");
  if(!n){if(r)r.remove();return}
  if(!r){r=document.createElement("span");r.id="gbRozet";
    r.style.cssText="display:inline-block;min-width:16px;height:16px;padding:0 4px;margin-left:5px;"+
      "background:var(--kir);color:#fff;border-radius:9px;font-size:10.5px;line-height:16px;font-weight:800;vertical-align:middle";
    b.appendChild(r)}
  r.textContent=n>99?"99+":String(n);
}
function gbInboxAc(){
  tit();
  var K=el("katman");
  var kapatEt=function(){tit();K.classList.remove("ac");K.innerHTML="";tgGeriDugme();gbRozetGoster(0)};
  K.innerHTML='<div class="kapat"><b>📩 Bize Ulaşın · Gelen Kutusu</b><button id="dkapat">✕ Kapat</button></div>'+
    '<div class="yukleniyor">yükleniyor…</div>';
  K.classList.add("ac");tgGeriDugme();
  el("dkapat").onclick=kapatEt;
  post("/api/yon",{is:"geribildirimler"}).then(function(r){
    var liste=(r&&r.liste)||[];
    gbRozetGoster(0); /* sunucu zaten "okundu" işaretledi */
    var h='<div class="kapat"><b>📩 Bize Ulaşın · Gelen Kutusu</b><button id="dkapat">✕ Kapat</button></div>';
    if(!liste.length){
      h+='<div class="bos">Henüz bir mesaj yok.</div>';
    }else{
      h+='<div class="altbilgi" style="padding:8px 14px 0">Yanıt, sistem üzerinden (bot mesajı olarak) doğrudan kullanıcıya gider.</div>';
      liste.forEach(function(g,idx){
        var ad=g.ad||(g.kullanici?"@"+g.kullanici:("ID "+g.id));
        var tarih=g.tarih?new Date(g.tarih).toLocaleString("tr-TR"):"";
        h+='<div class="kutu" style="margin:10px 14px"><h3 style="margin:0 0 4px;font-size:14px">👤 '+E(ad)+
          '<span class="altbilgi" style="float:right;font-weight:400">'+E(tarih)+'</span></h3>'+
          '<div class="bilgi" style="white-space:pre-wrap">'+E(g.metin||"")+'</div>'+
          '<textarea class="gir" id="gbYanit'+idx+'" placeholder="Yanıt yaz…" maxlength="2000" style="margin-top:8px"></textarea>'+
          '<button class="sir" data-gbid="'+E(String(g.id))+'" data-gbidx="'+idx+'" style="margin-top:6px">📤 Yanıtla</button>'+
          '<div class="durum" id="gbDurum'+idx+'"></div></div>';
      });
    }
    K.innerHTML=h;
    el("dkapat").onclick=kapatEt;
    [].forEach.call(document.querySelectorAll("[data-gbid]"),function(btn){
      btn.onclick=function(){
        tit();
        var idx=btn.dataset.gbidx,hid=btn.dataset.gbid;
        var metin=(el("gbYanit"+idx).value||"").trim();
        if(!metin){el("gbDurum"+idx).textContent="⚠️ önce bir şeyler yaz";return}
        btn.disabled=true;el("gbDurum"+idx).textContent="gönderiliyor…";
        post("/api/yon",{is:"geribildirimYanitla",id:hid,metin:metin}).then(function(rr){
          btn.disabled=false;
          el("gbDurum"+idx).textContent=(rr&&rr.mesaj)||(rr&&rr.ok?"✅ gönderildi":"⚠️ hata");
          if(rr&&rr.ok)el("gbYanit"+idx).value="";
        }).catch(function(){btn.disabled=false;el("gbDurum"+idx).textContent="⚠️ bağlantı hatası"});
      };
    });
  }).catch(function(){K.innerHTML='<div class="kapat"><b>📩 Bize Ulaşın</b><button id="dkapat">✕ Kapat</button></div><div class="bos">⚠️ yüklenemedi</div>';el("dkapat").onclick=kapatEt});
}
/* 🗂 VADEYE GÖRE SENARYO — "Hisse Ara" ile bulunan bir kod için KISA/
   ORTA/UZUN'un HER BİRİNİN kendi (varsa) sinyal ya da aday kaydını ayrı
   ayrı gösterir. Böylece tek bir dilimin (Z() ile rastgele bulunan)
   kaydı diğerlerinin yerine geçmez — her vade kendi yorumunu taşır. */
var TF_META={KISA:TF.potansiyel,ORTA:TF.fibo,UZUN:TF.uzunvade};
/* 🛑 ZİNCİR STOP (istemci tarafı): sunucudaki AYNA() metin özetinde zaten
   vardı (bkz. server tarafındaki zincirStop), ama hisse detay ekranındaki
   "Vadeye göre senaryo" kutusunda hiç gösterilmiyordu. Aynı mantık:
   ORTA'nın stop'u KISA'nın kırdığı seviye, UZUN'unki ORTA'nın kırdığı
   seviye — yön (boğa/ayı) uyuşmuyorsa ya da alt dilim henüz aday
   (kırılmamış) ise gösterilmez. KISA'nın kendi alt dilimi (15DK) ayrı
   izlenmediği için KISA'da stop satırı çıkmaz — bu, mevcut sunucu
   mantığıyla birebir aynı sınırlama. */
var TF_ALT={ORTA:"KISA",UZUN:"ORTA"};
function tfStopBul(tfKartlar,tfKey,x){
  if(!tfKartlar||!x||x.giris==null||x.hedef==null)return null;
  var altKey=TF_ALT[tfKey];if(!altKey)return null;
  var altG=tfKartlar[altKey];if(!altG||!altG.kart||altG.tip!=="sinyal")return null;
  var altX=altG.kart;if(altX.giris==null||altX.hedef==null)return null;
  var yon=Number(x.hedef)>=Number(x.giris)?"boga":"ayi";
  var altYon=Number(altX.hedef)>=Number(altX.giris)?"boga":"ayi";
  if(altYon!==yon)return null;
  var sev=Number(altX.giris);
  return{sev:sev,yuzde:(x.fiyat>0?100*(sev/Number(x.fiyat)-1):null)};
}
function tfSenaryoBlok(tfKartlar){
  if(!tfKartlar)return "";
  /* 🚫 ÜÇÜ DE BOŞSA HİÇ GÖSTERME — GARAN örneğinde olduğu gibi bir hisse
     o an KISA/ORTA/UZUN'un HİÇBİRİNDE sinyal ya da aday değilse, "3 boş
     kutu" göstermek "bug" gibi algılanıyordu. Bu durumda blok tamamen
     gizlenir; sayfadaki genel "hiçbir listede değil" mesajı ve aşağıdaki
     🔎 iki yönlü (ayna) özet zaten aynı bilgiyi veriyor. */
  var varMi=["KISA","ORTA","UZUN"].some(function(tfKey){return tfKartlar[tfKey]&&tfKartlar[tfKey].kart});
  if(!varMi)return "";
  var parcalar=["KISA","ORTA","UZUN"].map(function(tfKey){
    var giris=tfKartlar[tfKey], meta=TF_META[tfKey]||{ik:"",ad:tfKey,renk:"var(--ciz)"};
    var baslik='<div class="tfBas" style="border-left-color:'+meta.renk+'">'+meta.ik+" <b>"+meta.ad+"</b></div>";
    if(!giris||!giris.kart)
      return '<div class="tfKutu">'+baslik+'<div class="altbilgi">Bu dilimde aktif sinyal ya da aday yok.</div></div>';
    var x=giris.kart, adayMi=(giris.tip==="aday");
    var s="";
    if(adayMi){
      s+='<div class="sat"><span class="et">Durum</span><b class="sa">🟨 Aday — henüz kırılmadı</b></div>';
      if(x.tetik!=null)s+='<div class="sat"><span class="et">🔓 Sinyal</span><b>'+N(x.tetik)+
        (x.tetikYuzde!=null?"  ("+Number(x.tetikYuzde).toFixed(1)+"% kaldı)":"")+"</b></div>";
    }else{
      var krX=kar(x);
      s+='<div class="sat"><span class="et">Durum</span><b class="ye">🟢 Sinyal aktif'+(x.canli?" · ⚡ canlı":"")+"</b></div>";
      if(x.giris!=null)s+='<div class="sat"><span class="et">Sinyal fiyatı</span><b>'+N(x.giris)+" ₺</b></div>";
      if(krX!=null)s+='<div class="sat"><span class="et">Sinyalden bu yana</span><b class="'+(krX>=0?"ye":"kr")+'">'+Y(krX)+"</b></div>";
    }
    if(x.hedef1!=null)s+='<div class="sat"><span class="et">🧱 Hedef 1</span><b>'+N(x.hedef1)+"</b></div>";
    if(x.hedef!=null)s+='<div class="sat"><span class="et">🎯 Hedef 2</span><b>'+N(x.hedef)+"</b></div>";
    if(x.potansiyel!=null)s+='<div class="sat"><span class="et">Hedefe kalan</span><b class="'+
      (Number(x.potansiyel)<=0?"sa":"ye")+'">'+(Number(x.potansiyel)<=0?"🏆 hedef tuttu":"+"+Number(x.potansiyel).toFixed(1)+"%")+"</b></div>";
    if(!adayMi){
      var stopBilgi=tfStopBul(tfKartlar,tfKey,x);
      if(stopBilgi)s+='<div class="sat"><span class="et">🛑 Stop</span><b>'+N(stopBilgi.sev)+
        (stopBilgi.yuzde!=null?"  ("+Y(stopBilgi.yuzde)+")":"")+"</b></div>";
    }
    return '<div class="tfKutu">'+baslik+s+"</div>";
  });
  return '<div class="kutu"><h3>🗂 Vadeye göre senaryo</h3><div class="tfSira">'+parcalar.join("")+"</div></div>";
}
function detay(kod,ad){
  var K=el("katman");
  K.innerHTML='<div class="kapat"><b>'+E(kod)+'</b><button id="dkapat">✕ Kapat</button></div>'+
    '<div class="yukleniyor">yükleniyor…</div>';
  K.classList.add("ac");tgGeriDugme();
  el("dkapat").onclick=function(){tit();K.classList.remove("ac");K.innerHTML="";tgGeriDugme()};
  post("/api/hisse",{kod:kod}).then(function(v){
    var k=(v&&v.kart)||null, ayna=(v&&v.ayna)||"", fav=!!(v&&v.fav), poz=(v&&v.poz)||null;
    var t=TF[ad]||{kisa:(k&&k.tf)||"",ad:""};
    var h='<div class="kapat"><b>'+E(kod)+'</b><button id="dkapat">✕ Kapat</button></div>';
    if(k){
      var kr=kar(k);
      h+='<div class="dbas"><div class="k">'+E(k.kod)+'</div><div class="f">'+N(k.fiyat)+" ₺</div></div>";
      h+='<div class="rozetler"><span class="rozet">'+E(t.kisa)+"</span>"+
         (k.etiket?'<span class="rozet">'+E(k.etiket)+"</span>":"")+
         (k.sinyalZaman||k.zaman?'<span class="rozet">🕐 '+E(k.sinyalZaman||k.zaman)+"</span>":"")+"</div>";
      h+='<div class="kutu"><h3>📈 Sinyal</h3>';
      /* CANLI sinyal: kırılım henüz kapanmamış barda. Kullanıcı bunu
         kapanmış bir sinyalle karıştırmasın diye açıkça yazılıyor. */
      if(k.canli)h+='<div class="sat" style="color:var(--sar)"><span class="et">⚡ Canlı</span>'+
        '<b>bar kapanmadı — teyit bekliyor</b></div>';
      if(k.giris!=null)h+='<div class="sat"><span class="et">Sinyal fiyatı</span><b>'+N(k.giris)+" ₺</b></div>";
      h+='<div class="sat"><span class="et">Şimdi</span><b>'+N(k.fiyat)+" ₺</b></div>";
      if(kr!=null)h+='<div class="sat"><span class="et">Sinyalden bu yana</span><b class="'+(kr>=0?"ye":"kr")+'">'+Y(kr)+"</b></div>";
      if(k.tetik!=null)h+='<div class="sat"><span class="et">🔓 Tetik seviyesi</span><b>'+N(k.tetik)+
        (k.tetikYuzde!=null?" ("+Number(k.tetikYuzde).toFixed(2)+"% kaldı)":"")+"</b></div>";
      /* ⚓ KIRILIM ORTALAMASI (capalanmis VWAP)
         Kirilim anindan bu yana el degistiren her lotun hacimle
         agirliklandirilmis ortalama fiyati = kirilimi alanlarin maliyeti.
         Ustunde: alanlar karda, kirilim tasiniyor.
         Altinda: alanlar zararda, arz baskisi ve geri donus riski. */
      if(k.avwap>0&&k.avwapBar>=3){
        var aUst=k.avwapUst!==false;
        h+='<div class="sat"><span class="et">⚓ Kırılım ortalaması</span><b>'+N(k.avwap)+" ₺</b></div>"+
           '<div class="sat"><span class="et">Ortalamaya göre</span><b class="'+(aUst?"ye":"kr")+'">'+
           (aUst?"üstünde":"altında")+" ("+Y(k.avwapFark)+")</b></div>"+
           '<div class="altbilgi" style="margin-top:5px;opacity:.7">'+
           (aUst?"Kırılımdan sonra alanlar kârda — kırılım taşınıyor."
                :"Kırılımdan sonra alanlar zararda — geri dönüş riski yüksek.")+
           " "+k.avwapBar+" barlık ölçüm.</div>";
      }
      /* ── Dört bağlam ölçüsü: raf · verimlilik · beta/alfa ── */
      if(k.raf>0||k.er>0||k.gguc!=null){
        h+='<div class="kutu"><h3>🔬 Bağlam</h3>';
        if(k.raf>0){
          h+='<div class="sat"><span class="et">📚 Hacim rafı</span><b class="'+
             (k.raf>=1.5?"ye":(k.raf<=0.5?"kr":""))+'">'+k.raf+'x</b></div>'+
             '<div class="altbilgi" style="opacity:.7;margin-bottom:6px">'+
             (k.raf>=1.5?"Kırılan seviyenin altında kalın bir hacim yığını var — gerçek bir direnç aşıldı."
              :(k.raf<=0.5?"Seviyenin altı boş — kimsenin işlem yapmadığı bir yerden geçildi, sahte kırılıma açık."
                :"Seviye altındaki hacim normal düzeyde."))+'</div>';
        }
        if(k.er>0){
          h+='<div class="sat"><span class="et">📐 Verimlilik</span><b class="'+
             (k.er>=0.45?"ye":(k.er<=0.20?"kr":""))+'">'+k.er+'</b></div>'+
             '<div class="altbilgi" style="opacity:.7;margin-bottom:6px">'+
             (k.er>=0.45?"Fiyat düz bir çizgide ilerliyor — temiz trend."
              :(k.er<=0.20?"Fiyat aynı yeri gidip geliyor — testere. Kırılımlar burada en çok yanıltır."
                :"Trend ile testere arasında."))+'</div>';
        }
        if(k.temel){
          var T2=k.temel;
          h+='<div class="sat"><span class="et">📊 F-Skor (Piotroski)</span><b class="'+
             (T2.fskorOlculen>=5?(T2.fskor/T2.fskorOlculen>=0.75?"ye":(T2.fskor/T2.fskorOlculen<=0.35?"kr":"")):"")+
             '">'+T2.fskor+' / '+T2.fskorOlculen+'</b></div>';
          if(T2.fk!=null)h+='<div class="sat"><span class="et">F/K</span><b>'+T2.fk.toFixed(1)+
            (T2.fkP!=null?' <span class="btN">(sektörde ucuzluk %'+T2.fkP+')</span>':"")+'</b></div>';
          if(T2.pddd!=null)h+='<div class="sat"><span class="et">PD/DD</span><b>'+T2.pddd.toFixed(2)+'</b></div>';
          if(T2.ozsermayeKarliligi!=null)h+='<div class="sat"><span class="et">Özsermaye kârlılığı</span><b>%'+T2.ozsermayeKarliligi+'</b></div>';
          if(T2.netBorcFavok!=null)h+='<div class="sat"><span class="et">Net borç / FAVÖK</span><b class="'+
            (T2.netBorcFavok<=2?"ye":(T2.netBorcFavok>=4?"kr":""))+'">'+T2.netBorcFavok+'</b></div>';
          if(T2.enflasyonUyari)
            h+='<div class="altbilgi" style="color:var(--sar);margin:4px 0">⚠️ Enflasyon muhasebesi geçişi nedeniyle büyüme kıyaslanamıyor.</div>';
          else if(T2.buyumeCiro!=null)
            h+='<div class="sat"><span class="et">Ciro büyümesi (yıllık)</span><b class="'+(T2.buyumeCiro>=0?"ye":"kr")+'">'+Y(T2.buyumeCiro)+'</b></div>';
          if(T2.bilancoTarihi)h+='<div class="sat"><span class="et">📅 Bilanço tarihi</span><b class="'+
            (k.bilancoSessiz?"kr":"")+'">'+E(T2.bilancoTarihi)+
            (T2.bilancoGun!=null?' <span class="btN">('+(T2.bilancoGun===0?"bugün":T2.bilancoGun+" gün")+')</span>':"")+'</b></div>';
          if(k.bilancoSessiz)h+='<div class="altbilgi" style="color:var(--kr);margin-top:4px">Bilanço açıklamasına 2 günden az kaldı — bu sinyal için bildirim gönderilmiyor. Bilanço hareketi teknik seviyelerden bağımsızdır.</div>';
          if(T2.skor!=null)h+='<div class="sat"><span class="et">🎯 Temel uyum skoru</span><b class="'+
            (T2.skor>=65?"ye":(T2.skor<=35?"kr":""))+'">'+T2.skor+' / 100</b></div>';
        }
        if(k.sektorGuc!=null&&isFinite(k.sektorGuc)){
          var sg=Number(k.sektorGuc), sr=Number(k.sektorRs);
          h+='<div class="sat"><span class="et">🏭 Sektör</span><b>'+E(String(k.sektor||"—"))+
             ' <span class="btN">('+(k.sektorUye||0)+' hisse)</span></b></div>'+
             '<div class="sat"><span class="et">Sektörüne göre</span><b class="'+
             (sg>=0.5?"ye":(sg<=-0.5?"kr":""))+'">'+(sg>0?"+":"")+sg.toFixed(2)+'</b></div>'+
             (isFinite(sr)?'<div class="sat"><span class="et">Sektör piyasaya göre</span><b class="'+
               (sr>=0?"ye":"kr")+'">'+(sr>0?"+":"")+sr.toFixed(2)+'</b></div>':"")+
             '<div class="altbilgi" style="margin-top:5px;opacity:.7">'+
             (sg>=0.5?"Hisse kendi sektörünün önünde — hareket hisseye özgü."
              :(sg<=-0.5?"Sektörü yükseliyor ama hisse geride kalıyor; yükseliş hisseden değil sektörden geliyor olabilir."
                :"Hisse sektörüyle birlikte hareket ediyor."))+
             (isFinite(sr)?(sr>=0?" Sektörün kendisi de piyasanın önünde.":" Sektörün kendisi piyasanın gerisinde."):"")+
             '</div>';
        }
        if(k.gguc!=null){
          h+='<div class="sat"><span class="et">📊 Endekse göre</span><b class="'+
             (k.gguc>=3?"ye":(k.gguc<=-3?"kr":""))+'">'+(k.gguc>0?"+":"")+k.gguc+'%</b></div>'+
             (k.beta!=null?'<div class="sat"><span class="et">Beta (XU100)</span><b>'+k.beta+'</b></div>':"")+
             '<div class="altbilgi" style="opacity:.7">'+
             (k.gguc>=3?"Hareket hisseye özgü — endeksin taşıdığından fazlasını yapıyor."
              :(k.gguc<=-3?"Endeksin gerisinde kalıyor; yükseliş piyasadan geliyor olabilir."
                :"Endeksle birlikte hareket ediyor."))+
             '</div>';
        }
        h+="</div>";
      }
      h+="</div>";
      h+='<div class="kutu"><h3>🎯 Hedefler</h3>';
      if(k.hedef1!=null)h+='<div class="sat"><span class="et">🧱 Hedef 1</span><b>'+N(k.hedef1)+
        (k.hedef1Yuzde!=null?"  (+"+Number(k.hedef1Yuzde).toFixed(1)+"%)":"")+"</b></div>";
      else if(k.direncler&&k.direncler.length)h+='<div class="sat"><span class="et">🧱 Hedef 1</span><b>'+
        k.direncler.filter(function(x){return x!=null}).map(function(x){return N(x)}).join(" · ")+"</b></div>";
      if(k.hedef!=null)h+='<div class="sat"><span class="et">🎯 Hedef 2</span><b>'+N(k.hedef)+"</b></div>";
      if(k.potansiyel!=null)h+='<div class="sat"><span class="et">Hedefe kalan</span><b class="'+
        (Number(k.potansiyel)<=0?"sa":"ye")+'">'+(Number(k.potansiyel)<=0?"🏆 hedef tuttu":
        "+"+Number(k.potansiyel).toFixed(1)+"%")+"</b></div>";
      h+="</div>";
      if(k.guc)h+='<div class="ayna">'+k.guc+"</div>";
    }else{
      h+='<div class="dbas"><div class="k">'+E(kod)+"</div></div>"+
         '<div class="bilgi">Bu hisse şu an hiçbir listede değil — aşağıda güncel iki yönlü durumu var.</div>';
    }
    h+=tfSenaryoBlok(v&&v.tfKartlar);
    h+='<div class="kutu"><h3>📊 Grafik<span id="desenRozet"></span></h3><div id="mumKutu" class="mumKutu"><div class="yukleniyor" style="padding:20px 0">grafik yükleniyor…</div></div><div id="desenYorum"></div></div>';
    h+='<div id="desenKumulatif"></div>';
    var G=(v&&v.gecmis)||[];
    var gG=G.filter(function(x){return !x.dolgu});
    if(gG.length){
      var kaz=gG.filter(function(x){return x.yuzde>=0}).length;
      var ort=gG.reduce(function(a,x){return a+x.yuzde},0)/gG.length;
      h+='<div class="kutu"><h3>📜 Bu hissenin geçmiş sinyalleri</h3>'+
        '<div class="ikili"><div><div class="buyukN '+(kaz>=gG.length-kaz?"ye":"kr")+'">'+
        Math.round(100*kaz/gG.length)+'%</div><div class="altN">isabet ('+gG.length+' sinyal)</div></div>'+
        '<div><div class="buyukN '+(ort>=0?"ye":"kr")+'">'+Y(ort)+'</div><div class="altN">ortalama getiri</div></div></div>'+

        '<table class="gtab"><tr><th>Gün</th><th>Dilim</th><th>Sinyal</th><th style="text-align:right">Sonuç</th></tr>'+
        gG.slice(0,12).map(function(x){
          return "<tr><td>"+E(x.gun.slice(8)+"."+x.gun.slice(5,7))+'</td><td><span class="et">'+E(x.tf||"—")+
            "</span></td><td>"+N(x.giris)+'</td><td style="text-align:right"><b class="'+(x.yuzde>=0?"ye":"kr")+'">'+
            Y(x.yuzde)+"</b></td></tr>";
        }).join("")+"</table>"+
        '<div class="bilgi">Sonuç, sinyalin verildiği günün fiyatından bugüne kadarki değişimdir.</div></div>';
    }
    if(ayna)h+='<div class="ayna">'+ayna.replace(/\\n/g,"<br>")+"</div>";
    if(!k&&!ayna)h+='<div class="bos">Bu kod son taramada bulunamadı.<br>Yazımı kontrol et ya da yeni tarama sonrası dene.</div>';
    h+='<button class="dg ik" id="favDg">'+(fav?"⭐ Takipten çıkar":"⭐ Takibe al")+"</button>";
    h+='<button class="dg ik" id="portfoyDg">'+(poz?"💼 Alış bilgisini düzenle ("+poz.lot+" lot)":"💼 Portföye ekle")+"</button>";
    if(poz)h+='<button class="dg ik" id="portfoySatDg">📉 Sat / Azalt (kısmi olabilir)</button>';
    if(poz)h+='<button class="dg ik" id="portfoySil" style="opacity:.7">🗑 Portföyden çıkar (kayıt tutmadan)</button>';
    h+='<button class="dg" id="paylasDg">📤 Paylaş</button>';
    h+='<div class="uyari">⚠️ Yatırım tavsiyesi değildir.</div>';
    K.innerHTML=h;
    grafikCiz(kod,ad);
    el("dkapat").onclick=function(){tit();K.classList.remove("ac");K.innerHTML="";tgGeriDugme();if(sekme==="fav"||sekme==="portfoy")basla()};
    el("favDg").onclick=function(){
      tit();var b=el("favDg");b.disabled=true;
      post("/api/fav",{kod:kod}).then(function(r){
        b.disabled=false;
        if(r&&r.ok){D.fav=r.fav;b.textContent=r.ekli?"⭐ Takipten çıkar":"⭐ Takibe al"}
      });
    };
    el("portfoyDg").onclick=function(){
      tit();
      var lotStr=prompt("Kaç lot elinde var?",poz?String(poz.lot):"");
      if(lotStr===null)return;
      var lot=Number(String(lotStr).replace(",","."));
      if(!(lot>0)){alert("Geçerli bir lot sayısı gir.");return}
      var malStr=prompt("Ortalama alış maliyetin (₺)?",poz?String(poz.maliyet):"");
      if(malStr===null)return;
      var mal=Number(String(malStr).replace(",","."));
      if(!(mal>0)){alert("Geçerli bir maliyet gir.");return}
      var b=el("portfoyDg");b.disabled=true;
      post("/api/portfoy",{kod:kod,lot:lot,maliyet:mal}).then(function(r){
        b.disabled=false;
        if(r&&r.ok){D.portfoy=r.portfoy;poz=D.portfoy[kod];
          b.textContent="💼 Alış bilgisini düzenle ("+poz.lot+" lot)";
          if(!el("portfoySil")){var s=document.createElement("button");s.className="dg ik";s.id="portfoySil";
            s.style.opacity=".7";s.textContent="🗑 Portföyden çıkar";b.parentNode.insertBefore(s,b.nextSibling);
            s.onclick=portfoySilTikla}}
      });
    };
    function portfoySilTikla(){
      tit();
      post("/api/portfoy",{kod:kod,sil:!0}).then(function(r){
        if(r&&r.ok){D.portfoy=r.portfoy;K.classList.remove("ac");K.innerHTML="";tgGeriDugme();if(sekme==="fav"||sekme==="portfoy")basla()}
      });
    }
    if(el("portfoySil"))el("portfoySil").onclick=portfoySilTikla;
    /* 📉 SAT/AZALT: gerçek bir satış işlemidir — "Portföyden çıkar" (kayıtsız
       silme, örn. yanlış girilen pozisyonu düzeltmek için) düğmesinden farklı
       olarak burada girilen satış fiyatı, gerçekleşen K/Z geçmişine yazılır. */
    if(el("portfoySatDg"))el("portfoySatDg").onclick=function(){
      tit();
      var lotStr=prompt("Kaç lot satıyorsun? (elindeki "+poz.lot+" lotun tamamı ya da bir kısmı)",String(poz.lot));
      if(lotStr===null)return;
      var lot=Number(String(lotStr).replace(",","."));
      if(!(lot>0)){alert("Geçerli bir lot sayısı gir.");return}
      var fiyatStr=prompt("Satış fiyatın (₺)?",k&&k.fiyat>0?String(k.fiyat):"");
      if(fiyatStr===null)return;
      var fiyat=Number(String(fiyatStr).replace(",","."));
      if(!(fiyat>0)){alert("Geçerli bir fiyat gir.");return}
      var b=el("portfoySatDg");b.disabled=true;
      post("/api/portfoy",{kod:kod,sat:!0,lot:lot,fiyat:fiyat}).then(function(r){
        b.disabled=false;
        if(!(r&&r.ok)){alert("Kaydedilemedi, tekrar dene.");return}
        D.portfoy=r.portfoy;D.portfoyGecmis=r.portfoyGecmis;
        K.classList.remove("ac");K.innerHTML="";tgGeriDugme();
        if(sekme==="fav"||sekme==="portfoy")basla()
      });
    };
    el("paylasDg").onclick=function(){
      tit();
      var kr=k?kar(k):null;
      var satirlar=["📈 "+kod+(k?" · "+N(k.fiyat)+" ₺":"")];
      if(k&&t.kisa)satirlar.push("⏱ "+t.kisa+" dilimi");
      if(k&&k.giris!=null)satirlar.push("🚪 Sinyal fiyatı: "+N(k.giris)+" ₺");
      if(kr!=null)satirlar.push((kr>=0?"📈":"📉")+" Sinyalden bu yana: "+Y(kr));
      if(k&&k.hedef1!=null)satirlar.push("🧱 Hedef 1: "+N(k.hedef1));
      if(k&&k.hedef!=null)satirlar.push("🎯 Hedef 2: "+N(k.hedef)+(k.potansiyel!=null?(Number(k.potansiyel)<=0?" (🏆 tuttu)":" (+"+Number(k.potansiyel).toFixed(1)+"% kaldı)"):""));
      if(k&&k.kalite)satirlar.push("⭐ Kalite: %"+k.kalite);
      var m=satirlar.join("\\n")+"\\n\\n🤖 Fix Borsa Sinyal ile takip ediyorum, sen de katıl 👇";
      var u="https://t.me/share/url?url="+encodeURIComponent(D.link)+"&text="+encodeURIComponent(m);
      try{TG.openTelegramLink(u)}catch(e){location.href=u}
    };
  });
}
/* GRAFİK TEMİZLİĞİ: createChart() her çağrıldığında bir canvas + kalıcı bir
   window "resize" dinleyicisi yaratıyor. Panel kapatma kodu eskiden yalnız
   K.innerHTML="" yapıyordu — bu DOM'u söker ama chart nesnesini/dinleyiciyi
   ASLA temizlemez. Formasyon kartları arasında çok gezinince bu birikiyor;
   mobil WebView'lerin canvas/GPU context sınırı aşılınca eski grafikler
   JS'e hiçbir hata vermeden sessizce boyanmaz oluyor (veri/rozet/yorum
   doğru gelmeye devam eder, sadece canvas boş kalır — tam da bu yüzden
   "birden bire" bozuluyormuş gibi görünüyordu). Her createChart() burada
   kayda giriyor; her panel geçişinden önce temizleAcikGrafikler() ile eski
   olanlar düzgünce remove() ediliyor. */
window._acikGrafikler=window._acikGrafikler||[];
function grafikKaydet(chart,resizeFn){
  window._acikGrafikler.push({chart:chart,resizeFn:resizeFn});
}
function temizleAcikGrafikler(){
  var liste=window._acikGrafikler||[];
  liste.forEach(function(g){
    try{if(g.resizeFn)window.removeEventListener("resize",g.resizeFn)}catch(e){}
    try{if(g.chart&&g.chart.remove)g.chart.remove()}catch(e){}
  });
  window._acikGrafikler=[];
}
/* MUM GRAFİĞİ: detay() paneli içinde ayrı, engellemeyen bir çağrı — detay
   metni beklemeden kendi hızında gelir. CDN veya veri yoksa sessizce bir
   uyarı yazar, panelin geri kalanını hiçbir şekilde etkilemez. */
function grafikCiz(kod,ad,deneme,yukseklik){
  deneme=deneme||0;
  var tf=tfCoz(ad);
  if(!window.LightweightCharts&&deneme<20){setTimeout(function(){grafikCiz(kod,ad,deneme+1,yukseklik)},150);return}
  post("/api/mumlar",{kod:kod,tf:tf}).then(function(v){
    var kutu=el("mumKutu"); if(!kutu)return;
    try{
      if(!window.LightweightCharts){kutu.innerHTML='<p class="bilgi">Grafik kütüphanesi yüklenemedi (internet bağlantısını kontrol et).</p>';return}
      var veri=(v&&v.mumlar)||[];
      if(!v||!v.ok||veri.length<5){
        var dbg=(v&&v.debug&&v.debug.length)?('<br><span style="font-size:11px;opacity:.7">'+v.debug.join('<br>')+'</span>'):'';
        kutu.innerHTML='<p class="bilgi">Bu hisse için grafik verisi yetersiz.'+dbg+'</p>';return}
      kutu.innerHTML='';
      var saatlik=(tf==="1SA"||tf==="4SA");
      var chart=LightweightCharts.createChart(kutu,{
        width:kutu.clientWidth||320, height:yukseklik||220,
        layout:{background:{color:"transparent"},textColor:"#e6edf3",attributionLogo:false},
        grid:{vertLines:{color:"#262d38"},horzLines:{color:"#262d38"}},
        timeScale:{timeVisible:saatlik,secondsVisible:false},
        rightPriceScale:{borderVisible:false}
      });
      /* Grafik kütüphanesinin iki farklı sürüm API'si var:
           v5 → chart.addSeries(LightweightCharts.CandlestickSeries,…)
           v4 → chart.addCandlestickSeries(…)
         CDN hangi sürümü verirse versin çalışsın diye ikisi de deneniyor.
         Eskiden yalnız v5 yolu vardı; CDN v4 döndürdüğünde grafik sessizce
         boş kalıyordu (yalnız köşedeki logo görünüyordu). */
      var mumAyar={upColor:"#3fb950",downColor:"#f85149",borderVisible:false,
        wickUpColor:"#3fb950",wickDownColor:"#f85149"};
      var seri=null;
      if(chart.addSeries&&LightweightCharts.CandlestickSeries)
        seri=chart.addSeries(LightweightCharts.CandlestickSeries,mumAyar);
      else if(chart.addCandlestickSeries)
        seri=chart.addCandlestickSeries(mumAyar);
      if(!seri){kutu.innerHTML='<p class="bilgi">Grafik kütüphanesi bu sürümde mum serisi oluşturamadı.</p>';return}
      seri.setData(veri.map(function(b){return{time:b.time,open:b.open,high:b.high,low:b.low,close:b.close}}));
      var rz=el("desenRozet"),yr=el("desenYorum"),d=v&&v.desen;
      var sonFiyat=veri.length?veri[veri.length-1].close:null;
      if(d&&d.ust&&d.alt){
        var renk=d.yon==="al"?"#3fb950":(d.yon==="sat"?"#f85149":"#d29922");
        /* Pine gibi: P1-P3 / P2-P4 arası DÜZ çizgi, sonrası NOKTALI uzatma. */
        var cizgi=function(nokta,stil){
          if(!nokta||nokta.length<2)return;
          var ay={color:renk,lineWidth:2,lineStyle:stil,
            crosshairMarkerVisible:false,lastValueVisible:false,priceLineVisible:false};
          var s=null;
          if(chart.addSeries&&LightweightCharts.LineSeries)s=chart.addSeries(LightweightCharts.LineSeries,ay);
          else if(chart.addLineSeries)s=chart.addLineSeries(ay);
          if(s)s.setData(nokta);
        };
        cizgi(d.ust,0);cizgi(d.alt,0);cizgi(d.ustUz,2);cizgi(d.altUz,2);
        if(rz)rz.innerHTML='<span class="rozet" style="margin-left:6px;color:'+renk+';border-color:'+renk+'">📐 '+d.tip+(d.kalite?" · %"+d.kalite:"")+"</span>";
        if(yr)yr.innerHTML=desenYorumHtml(d,sonFiyat,renk);
      }else if(d&&d.tip){
        /* Bu dilimde formasyon var ama çizgi geometrisi tarama tarafında
           henüz üretilmiyor (yalnız özet) — rozeti göster, çizgi çizme,
           kullanıcıyı yanıltma. */
        var renk2=d.yon==="al"?"#3fb950":(d.yon==="sat"?"#f85149":"#d29922");
        if(rz)rz.innerHTML='<span class="rozet" style="margin-left:6px;color:'+renk2+';border-color:'+renk2+'">📐 '+d.tip+(d.kalite?" · %"+d.kalite:"")+" · çizgi yok</span>";
        if(yr)yr.innerHTML=desenYorumOzetHtml(d,sonFiyat,renk2);
      }else{if(rz)rz.innerHTML="";if(yr)yr.innerHTML=""}
      var kk=el("desenKumulatif");
      if(kk){
        var ku=v&&v.kumulatif;
        if(ku&&(ku.al||ku.sat)){
          var satir=function(g){
            if(!g)return"";
            var rk=g.yon==="al"?"#3fb950":"#f85149";
            var etiket=g.yon==="al"?"⬆️ AL yönlü":"⬇️ SAT yönlü";
            var yzd=(g.ortalamaYuzde==null)?"":" ("+(g.ortalamaYuzde>0?"+":"")+g.ortalamaYuzde+"%)";
            return '<div class="btGun"><div class="btUst">'+
              '<b style="color:'+rk+'">'+etiket+'</b>'+
              '<span class="btN">'+g.adet+' dilim: '+g.dilimler.join(", ")+'</span></div>'+
              '<div class="btAlt">Ortalama hedef <b>'+g.ortalamaHedef+'</b>'+yzd+'</div></div>';
          };
          var uyari=(ku.al&&ku.sat)?'<div class="btAc" style="margin-top:7px;color:#d29922">⚠️ Dilimler çelişiyor — bazıları AL, bazıları SAT diyor. İki ortalama da ayrı ayrı gösteriliyor, birleştirilmedi.</div>':"";
          kk.innerHTML='<div class="kutu"><h3>🧮 Kümülatif hedef (tüm dilimler)</h3>'+
            satir(ku.al)+satir(ku.sat)+uyari+'</div>';
        }else{
          /* Hiçbir dilimde net/aktif formasyon yoksa kutu boş kalmasın diye
             — ama yalan formasyon UYDURMADAN — elimizdeki mum verisinden
             sade bir trend özeti çıkarılır: son 20 mum başına göre fiyat
             yüzde kaç değişmiş. Bu bir formasyon iddiası değil, dürüst bir
             "şu an net bir şekil yok, ama genel yön bu" notudur. */
          var trend="";
          if(veri.length>=20){
            var ref=veri[veri.length-20].close,son=veri[veri.length-1].close;
            if(ref>0){
              var yzd2=Math.round((son-ref)/ref*1000)/10;
              var rk2=yzd2>=0?"#3fb950":"#f85149";
              trend='<div class="btAc">Son 20 mumda fiyat <b style="color:'+rk2+'">'+
                (yzd2>=0?"+":"")+yzd2+'%</b> — net bir formasyon şekli oluşmadı, bu sadece genel yön.</div>';
            }
          }
          /* Kutu tamamen boş kalmasın diye: elimizdeki mum verisinden
             SMA20/EMA20 hesaplanır (uydurma değil, aynı mumlardan çıkan
             standart bir gösterge). Yalnız fiyatın bu ortalamalara göre
             nerede olduğu gösterilir; formasyon iddiasıyla karıştırılmasın
             diye ayrı, açık etiketli bir kutuda durur. */
          var gosterge="";
          var kapanislar=veri.map(function(b){return b.close});
          var sma20=smaSon(kapanislar,20), ema20=emaSon(kapanislar,20);
          if(sma20!=null||ema20!=null){
            gosterge='<div class="kutu" style="margin-top:8px;opacity:.85"><h3>📊 Göstergeler (SMA/EMA)</h3>'+
              (sma20!=null?'<div class="yorumSat">SMA20 <b>'+N(sma20)+'</b>'+
                (sonFiyat!=null?'  ·  fiyat <b class="'+(sonFiyat>=sma20?"ye":"kr")+'">'+(sonFiyat>=sma20?"üstünde":"altında")+'</b>':'')+'</div>':'')+
              (ema20!=null?'<div class="yorumSat">EMA20 <b>'+N(ema20)+'</b>'+
                (sonFiyat!=null?'  ·  fiyat <b class="'+(sonFiyat>=ema20?"ye":"kr")+'">'+(sonFiyat>=ema20?"üstünde":"altında")+'</b>':'')+'</div>':'')+
              '<div class="altbilgi" style="opacity:.7;margin-top:4px">Bu bir formasyon değil, standart bir hareketli ortalama göstergesidir.</div></div>';
          }
          kk.innerHTML='<div class="kutu" style="opacity:.85"><h3>🧮 Kümülatif hedef</h3>'+
            '<div class="btAc">Şu an hiçbir zaman diliminde aktif/net bir formasyon hedefi yok.</div>'+
            trend+'</div>'+gosterge;
        }
      }
      chart.timeScale().fitContent();
      var yenidenBoyutla=function(){try{chart.applyOptions({width:kutu.clientWidth||320})}catch(e){}};
      window.addEventListener("resize",yenidenBoyutla);
      grafikKaydet(chart,yenidenBoyutla);
    }catch(e){
      /* Sessiz kalmak en kötüsü: sebebi yaz ki ne olduğu anlaşılsın. */
      var k2=el("mumKutu");
      if(k2)k2.innerHTML='<p class="bilgi">Grafik çizilemedi.<br>'+
        '<span style="font-size:11px;opacity:.7">'+E(String((e&&e.message)||e)).slice(0,160)+
        '<br>kütüphane: '+(window.LightweightCharts?(LightweightCharts.version?LightweightCharts.version():"yüklü"):"YOK")+
        ' · mum: '+(((v&&v.mumlar)||[]).length)+'</span></p>';
    }
  }).catch(function(){var k2=el("mumKutu"); if(k2)k2.innerHTML='<p class="bilgi">Grafik verisi alınamadı.</p>'});
}
/* Formasyon detayını "şurası şu, burası bu" diye somut seviyelere döken
   yorum kutusu. Üst/alt sınır her zaman görsel olarak ust/alt çizgisinin
   son noktası; onay/iptal ise yöne göre hangisinin tetik hangisinin geçersiz
   kılma seviyesi olduğunu belirler (yon="al" → onay üstte, iptal altta). */
/* Çizgisiz (yalnız özet) formasyonlar için kısa yorum. desenYorumHtml
   üst/alt çizgi olmadan hiçbir şey yazmıyordu — bu yüzden "formasyon var
   ama açıklama boş" hissi oluyordu. Burada yalnız GERÇEKTEN elimizde olan
   alanlar (yön, hedef, kalite) kullanılır; üst/alt/onay/iptal seviyesi
   UYDURULMAZ, çünkü o veri bu dilimde yok. */
function smaSon(kapanislar,n){
  if(!kapanislar||kapanislar.length<n)return null;
  var t=0;for(var i=kapanislar.length-n;i<kapanislar.length;i++)t+=kapanislar[i];
  return t/n;
}
function emaSon(kapanislar,n){
  if(!kapanislar||kapanislar.length<n)return null;
  var k=2/(n+1),s=0;for(var i=0;i<n;i++)s+=kapanislar[i];
  var e=s/n;
  for(var i=n;i<kapanislar.length;i++)e=kapanislar[i]*k+e*(1-k);
  return e;
}
function desenYorumOzetHtml(d,sonFiyat){
  var h='<h3 style="margin-top:12px">🧭 Formasyon yorumu</h3>';
  var yonMetin=d.yon==="al"?"⬆️ AL yönlü":(d.yon==="sat"?"⬇️ SAT yönlü":"yönü belirsiz");
  h+='<div class="yorumSat">📐 Tip <b>'+E(d.tip||"—")+'</b>  ·  '+yonMetin+'</div>';
  if(d.kalite)h+='<div class="yorumSat">⭐ Kalite <b>%'+d.kalite+'</b></div>';
  if(typeof d.hedef==="number"){
    var hedefYuzde=(sonFiyat>0)?(d.hedef-sonFiyat)/sonFiyat*100:null;
    h+='<div class="yorumSat">🎯 Hedef <b>'+N(d.hedef)+'</b>'+
      (hedefYuzde!=null?'  ·  '+(hedefYuzde>=0?"+":"")+hedefYuzde.toFixed(1)+'%':'')+'</div>';
  }
  h+='<p class="anlatim">Bu dilimde formasyon tespit edildi, ancak kırılım çizgilerinin tam geometrisi bu vadede henüz üretilmiyor — bu yüzden grafikte çizgi görünmüyor. Yön ve hedef yukarıdaki gibi; onay/iptal seviyeleri için üst kutudaki ana dilim (çizgili) sonucuna bakabilirsin.</p>';
  return h;
}
function desenYorumHtml(d,sonFiyat,renk){
  var ustV=d.ust&&d.ust.length?d.ust[d.ust.length-1].value:null;
  var altV=d.alt&&d.alt.length?d.alt[d.alt.length-1].value:null;
  if(ustV==null||altV==null)return"";
  var onay,iptal,onayLbl,iptalLbl;
  if(d.yon==="al"){onay=ustV;iptal=altV;onayLbl="Yukarı";iptalLbl="Aşağı"}
  else if(d.yon==="sat"){onay=altV;iptal=ustV;onayLbl="Aşağı";iptalLbl="Yukarı"}
  else{onay=null;iptal=null}
  var h='<h3 style="margin-top:12px">🧭 Formasyon yorumu</h3>';
  h+='<div class="yorumSat">🧱 Üst direnç <b>'+N(ustV)+'</b></div>';
  h+='<div class="yorumSat">🛟 Alt destek <b>'+N(altV)+'</b></div>';
  if(onay!=null){
    var onayYuzde=(sonFiyat>0)?(onay-sonFiyat)/sonFiyat*100:null;
    h+='<div class="yorumSat">🔓 Onay (kırılım) <b>'+N(onay)+'</b>'+
      (onayYuzde!=null?'  ·  '+(onayYuzde>=0?"+":"")+onayYuzde.toFixed(1)+'% kaldı':'')+'</div>';
  }
  if(iptal!=null)h+='<div class="yorumSat">🚫 İptal seviyesi <b>'+N(iptal)+'</b></div>';
  if(d.hedef!=null){
    var hedefYuzde=(sonFiyat>0)?(d.hedef-sonFiyat)/sonFiyat*100:null;
    h+='<div class="yorumSat">🎯 Hedef <b>'+N(d.hedef)+'</b>'+
      (hedefYuzde!=null?'  ·  '+(hedefYuzde>=0?"+":"")+hedefYuzde.toFixed(1)+'%':'')+'</div>';
  }
  var anlatim;
  if(d.yon==="al")anlatim="Yukarı <b>"+N(onay)+"</b> üzerinde kapanış görülürse formasyon teyit olur"+(d.hedef!=null?", hedef <b>"+N(d.hedef)+"</b> bölgesi":"")+". Aşağı <b>"+N(iptal)+"</b> altına sarkarsa formasyon geçersiz sayılır.";
  else if(d.yon==="sat")anlatim="Aşağı <b>"+N(onay)+"</b> altına iniş görülürse formasyon teyit olur"+(d.hedef!=null?", hedef <b>"+N(d.hedef)+"</b> bölgesi":"")+". Yukarı <b>"+N(iptal)+"</b> üzerine çıkarsa formasyon geçersiz sayılır.";
  else anlatim="Yön belirsiz — iki taraflı kırılım bekleniyor. Yukarı <b>"+N(ustV)+"</b> kırılırsa yükseliş, aşağı <b>"+N(altV)+"</b> kırılırsa düşüş sinyali sayılır; kırılım teyit olana kadar yön net değildir.";
  h+='<p class="anlatim">'+anlatim+'</p>';
  return h;
}
/* ================== 🔄 SEKTÖR ROTASYONU SEKMESİ ==================
   "Bugün hangi sektör öne geçiyor?" — dört çeyrek grafiği + sektör listesi.
   Ölçüm tarayıcıda (yumatu.html) yapılıyor, burası sadece gösteriyor.
     yatay eksen  = RS-Ratio   → piyasaya göre GÜÇ    (100 = piyasa ortalaması)
     dikey eksen  = RS-Momentum → o gücün İVMESİ
   Rotasyon saat yönünde döner: Gelişen → Lider → Zayıflayan → Geride. */
/* ================== 🩺 HATALAR SEKMESİ (yalnız yönetici) ==================
   Worker'da sessizce yutulan hataları görünür kılar. Boş olması iyi haber.
   "Test kaydı at" düğmesi zincirin çalıştığını doğrulamak için. */
function hataCiz(){
  el("govde").innerHTML='<div class="yukleniyor">hata kaydı okunuyor…</div>';
  post("/api/hatalar",{}).then(hataGoster)
    .catch(function(){el("govde").innerHTML='<div class="bos">Okunamadı.</div>'});
}
function hataGoster(v){
  if(!v||!v.ok){el("govde").innerHTML='<div class="bos">Yetkisiz ya da okunamadı.</div>';return}
  var l=v.liste||[];
  var h='<div class="sirala"><button class="sir" id="htDene">🧪 Test kaydı at</button>'+
        '<button class="sir" id="htYenile">🔄 Yenile</button>'+
        (l.length?'<button class="sir" id="htSil">🗑 Temizle</button>':"")+'</div>';
  h+='<div class="uyari" style="margin-top:0">Kayıt yeri: KV · son '+l.length+' hata · '+
     'Sentry: '+(v.sentry?"<b>bağlı</b>":"kapalı (SENTRY_DSN tanımlı değil)")+'</div>';
  if(!l.length){
    h+='<div class="bos"><b>✅ Kayıtlı hata yok</b><br><br>'+
       'Worker son dağıtımdan bu yana beklenmeyen bir hata üretmedi.<br>'+
       'Zincirin çalıştığını görmek için 🧪 Test kaydı at.</div>';
  }else{
    h+=l.map(function(x){
      var d=new Date((x.t||0)*1000);
      var s2=function(n){return String(n).padStart(2,"0")};
      var zm=s2((d.getUTCHours()+3)%24)+":"+s2(d.getUTCMinutes())+" · "+
             s2(d.getUTCDate())+"/"+s2(d.getUTCMonth()+1);
      return '<div class="satir" style="border-left-color:var(--kir);align-items:flex-start">'+
        '<div class="sol"><div class="kod" style="font-size:13.5px">'+E(x.msg||"?")+'</div>'+
        '<div class="altbilgi" style="white-space:normal">'+E(x.yer||"")+
        (x.yol?" · "+E(x.yol):"")+" · "+zm+'</div>'+
        (x.iz?'<div class="altbilgi" style="white-space:normal;opacity:.6;margin-top:4px">'+
          E(x.iz)+'</div>':"")+
        '</div></div>';
    }).join("");
  }
  el("govde").innerHTML=h;
  var d1=el("htDene");if(d1)d1.onclick=function(){tit();d1.disabled=true;
    post("/api/hatalar",{dene:1}).then(hataGoster)};
  var d2=el("htYenile");if(d2)d2.onclick=function(){tit();hataCiz()};
  var d3=el("htSil");if(d3)d3.onclick=function(){tit();d3.disabled=true;
    post("/api/hatalar",{temizle:1}).then(hataGoster)};
}
/* ================== 🌊 ABSORPSİYON SEKMESİ ==================
   "Hacim patladı ama fiyat kıpırdamadı" barlarını gösterir. Bu, birinin
   gelen emirleri sessizce yuttuğu anlamına gelir — genelde büyük oyuncu
   ya topluyor (talep) ya dağıtıyor (arz).
   Sekmenin en üstünde ne olduğu ve sınırları yazıyor; tek başına al/sat
   sinyali DEĞİL, mevcut sinyalin üstüne bir katman. */
var absD=null;
function absCiz(){
  if(absD){absGoster(absD);return}
  el("govde").innerHTML='<div class="yukleniyor">hacim/fiyat dengesi ölçülüyor… (ilk açılış 10-20 sn sürebilir)</div>';
  post("/api/absorpsiyon",{}).then(function(v){absD=v;absGoster(v)})
    .catch(function(){el("govde").innerHTML='<div class="bos">Ölçüm alınamadı. Birazdan tekrar dene.</div>'});
}
function absGoster(v){
  var l=(v&&v.liste)||[];
  var calisiyor=!v||v.calisiyor!==false;
  var h='<div class="sirala"><button class="sir" id="absYenile">🔄 Yenile</button>'+
        (D.yon?'<button class="sir" id="absDur">'+(calisiyor?"⏸ Taramayı durdur":"▶️ Taramayı sürdür")+'</button>':"")+
        '</div>';
  h+='<div class="uyari" style="margin-top:0"><b>🌊 Absorpsiyon nedir?</b><br>'+
     'Bir günde hacim normalin çok üstüne çıkıp fiyat neredeyse hiç oynamadıysa, '+
     'gelen satışları/alışları birileri yutuyor demektir. <b>Talep</b> = alıcı yutuyor (gün tepede kapandı), '+
     '<b>Arz</b> = satıcı yutuyor (gün dipte kapandı).<br><br>'+
     '⚠️ Bu bir <b>yaklaşık ölçüm</b>: gerçek order-flow verisi (her emrin tek tek kaydı) '+
     'bizde yok, günlük barlardan hesaplanıyor. Yanılabilir. Tek başına al/sat sebebi değildir.</div>';
  /* 🔐 Eşik ayarları — YALNIZ yöneticiye görünür. Kaydedince önbellek
     anahtarı da değiştiği için hemen yeni eşiklerle taranır. */
  if(D.yon&&v&&v.ayar){
    h+='<div class="kutu" style="margin-bottom:10px"><h3>🔐 Eşikler (sadece sende)</h3>'+
       '<div class="altbilgi" style="margin-bottom:8px">Ne kadar küçükse o kadar gevşek — daha çok hisse yakalanır.</div>'+
       '<div class="sat"><span class="et">Hacim eşiği (kat)</span>'+
       '<input id="absHacim" type="number" step="0.05" min="1.01" max="9.99" value="'+E(String(v.ayar.hacimEsik))+'" '+
       'style="width:70px;background:var(--kart);border:1px solid var(--ciz);color:var(--yazi);border-radius:7px;padding:5px 7px;font-size:13px;text-align:right"></div>'+
       '<div class="sat"><span class="et">Aralık darlığı eşiği</span>'+
       '<input id="absDarlik" type="number" step="0.05" min="0.05" max="2.99" value="'+E(String(v.ayar.darlikEsik))+'" '+
       'style="width:70px;background:var(--kart);border:1px solid var(--ciz);color:var(--yazi);border-radius:7px;padding:5px 7px;font-size:13px;text-align:right"></div>'+
       '<div class="sat"><span class="et">En düşük puan</span>'+
       '<input id="absPuan" type="number" step="5" min="0" max="100" value="'+E(String((v.ayar.puanEsik)||0))+'" '+
       'style="width:70px;background:var(--kart);border:1px solid var(--ciz);color:var(--yazi);border-radius:7px;padding:5px 7px;font-size:13px;text-align:right"></div>'+
       '<button class="dg" id="absAyarKaydet" style="margin-top:8px">💾 Kaydet ve süz (anında)</button>'+
       '<div class="altbilgi" id="absAyarDurum" style="margin-top:6px"></div></div>';
  }
  /* İLERLEME — tarama arka planda dönerken tablo dolar. Kullanici
     "16 hisse" gibi sabit bir sayi degil, gercek ilerlemeyi gorur. */
  var evren=(v&&v.taranan)||0, olculen=(v&&v.olculen)||0;
  var yuzde=evren?Math.min(100,Math.round(olculen/evren*100)):0;
  h+='<div class="kutu" style="margin:10px 0 8px;padding:9px 11px">'+
     '<div class="altbilgi" style="opacity:.85">'+
     (calisiyor?"🔄 Arka planda taranıyor":"⏸ Tarama durduruldu")+
     ' · son ölçüm '+((v&&v.yas)||0)+' dk önce</div>'+
     '<div class="altbilgi" style="margin-top:4px">'+
     'ölçülen <b>'+olculen+'</b> / '+evren+'  ·  kalan <b>'+((v&&v.kalan)||0)+'</b>'+
     '  ·  eşiği geçen <b style="color:var(--yes)">'+((v&&v.cikan)||0)+'</b>'+
     '  ·  elenen '+((v&&v.elenen)||0)+'</div>'+
     ((v&&v.kaynak)?'<div class="altbilgi" style="margin-top:3px;opacity:.55">evren kaynağı: '+E(v.kaynak)+'</div>':"")+
     '<div style="height:6px;background:var(--ciz);border-radius:4px;overflow:hidden;margin-top:7px">'+
     '<div style="height:100%;width:'+yuzde+'%;background:'+(calisiyor?"var(--yes)":"var(--sar)")+'"></div></div>'+
     '<div class="altbilgi" style="margin-top:6px;opacity:.6">Tarama tur tur ilerler; '+
     'sonuç çıktıkça liste kendiliğinden dolar. Sayfayı kapatsan da arka planda devam eder. '+
     'Eşik değişikliği yeniden tarama gerektirmez — ölçümler saklı, süzgeç anında uygulanır.</div>'+
     '</div>';
  if(!l.length){
    h+='<div class="bos"><b>Şu an absorpsiyon bulunamadı</b><br><br>'+
       'Taranan hisselerin hiçbirinde "yüksek hacim + dar aralık" birleşimi yok. '+
       'Bu normaldir; absorpsiyon her gün oluşmaz.</div>';
  }else{
    h+=l.map(function(x){
      var talep=x.yon==="talep";
      var renk=talep?"var(--yes)":(x.yon==="arz"?"var(--kir)":"var(--sar)");
      var etiket=talep?"🟢 TALEP · alıcı yutuyor":(x.yon==="arz"?"🔴 ARZ · satıcı yutuyor":"🟡 KARARSIZ");
      return '<div class="satir" style="border-left-color:'+renk+';align-items:flex-start">'+
        '<div class="sol"><div class="kod">'+E(x.kod)+
        (x.takipte?' <span class="rozet">⭐ izlediğin</span>':"")+'</div>'+
        '<div class="altbilgi" style="white-space:normal">'+etiket+
        '<br>hacim normalin <b>'+E(String(x.hacimKat))+' katı</b> · '+
        'gün aralığı normalin <b>%'+Math.round(x.darlik*100)+'</b>\u0131 kadar · '+
        'kapanış barın <b>%'+E(String(x.konum))+'</b> seviyesinde</div></div>'+
        '<div class="sag"><div class="yuzde" style="color:'+renk+'">'+E(String(x.puan))+'</div>'+
        '<div class="altbilgi">puan</div></div></div>';
    }).join("");
  }
  el("govde").innerHTML=h;
  var y=el("absYenile");if(y)y.onclick=function(){tit();absD=null;
    el("govde").innerHTML='<div class="yukleniyor">yeniden ölçülüyor…</div>';
    post("/api/absorpsiyon",{}).then(function(v2){absD=v2;absGoster(v2)})};
  var dd=el("absDur");if(dd)dd.onclick=function(){tit();dd.disabled=true;
    post("/api/absorpsiyon",{dur:calisiyor?1:0}).then(function(v2){absD=v2;absGoster(v2)})
      .catch(function(){dd.disabled=false})};
  var k=el("absAyarKaydet");
  if(k)k.onclick=function(){
    tit();k.disabled=true;k.textContent="…";
    var hacimEsik=Number(el("absHacim").value),darlikEsik=Number(el("absDarlik").value);
    var puanEsik=Number((el("absPuan")||{}).value||0);
    post("/api/absAyar",{hacimEsik:hacimEsik,darlikEsik:darlikEsik,puanEsik:puanEsik}).then(function(r){
      k.disabled=false;k.textContent="💾 Kaydet ve yeniden tara";
      if(r&&r.ok){
        el("absAyarDurum").textContent="✅ Kaydedildi, yeniden taranıyor…";
        absD=null;
        post("/api/absorpsiyon",{}).then(function(v2){absD=v2;absGoster(v2)});
      }else{
        el("absAyarDurum").textContent="⚠️ "+((r&&r.hata)||"kaydedilemedi");
      }
    }).catch(function(){k.disabled=false;k.textContent="💾 Kaydet ve yeniden tara";
      el("absAyarDurum").textContent="⚠️ bağlantı hatası"});
  };
}
/* ================== 🔗 ORTAKLIK HARİTASI SEKMESİ ==================
   Şirket kartındaki her ortak/yönetici tıklanabilir: o isme basınca
   borsadaki TÜM şirketlerdeki ortaklık/yönetim kurulu/üst yönetim
   kayıtları listelenir. Ayrıca 4 modüllük tarama: tek ortak kontrolü,
   %50+ hakim ortak, düşük halka açıklık, birden fazla şirkette görünen
   isimler. Veri KV'de "ortaklikHaritasi" anahtarında; kap_ortaklik_scraper.py
   tarafından periyodik üretilip yazılıyor (canlı hesaplama DEĞİL). */
var ortD=null, ortAktifModul="tekOrtakKontrolu", ortSeciliKisi=null;
var ortSeciliSirket=null;    // ticker seçiliyse şirket kartı gösterilir
var ortAramaTip="isim";      // "isim" (kişi/fon) veya "sirket"
var ortAramaMetin="";        // aramanın kendisi (kutuda yazan)
var ortAramaSonuc=null;      // son arama sonucu {tip,sonuclar}
var ortAramaZamanlayici=null;
function ortaklikCiz(){
  if(ortD){ortaklikGoster(ortD);return}
  el("govde").innerHTML='<div class="yukleniyor">ortaklık haritası okunuyor…</div>';
  post("/api/ortaklik",{}).then(function(v){ortD=v;ortaklikGoster(v)})
    .catch(function(){el("govde").innerHTML='<div class="bos">Okunamadı. Birazdan tekrar dene.</div>'});
}
var ORT_MODUL_AD={
  tekOrtakKontrolu:"👤 Tek ortağın kontrol ettiği şirketler",
  hakimOrtak50:"🏛 %50+ hakim ortaklı tahtalar",
  dusukHalkaAciklik:"🔒 Düşük halka açıklık",
  cokluSirketIsimler:"🔁 Birden fazla şirkette görünen isim/fon"
};
function ortaklikGoster(v){
  if(!v||!v.ok){
    el("govde").innerHTML='<div class="bos">Ortaklık haritası henüz hazır değil.<br>'+
      'Veri kaynağı (KAP taraması) ilk çalıştırmasını bekliyor olabilir.</div>';
    return;
  }
  if(ortSeciliKisi){ortaklikKisiGoster(ortSeciliKisi);return}
  if(ortSeciliSirket){ortaklikSirketGoster(ortSirketD);return}
  var h='<div class="uyari" style="margin-top:0"><b>🔗 Ortaklık Haritası</b><br>'+
    'Bir isme dokun, borsadaki tüm şirketlerini gör. Aşağıdaki 4 modül, '+
    'bilinen ortaklık/yönetim verisi üzerinden otomatik süzülür.<br>'+
    '<span style="opacity:.7">Kaynak: KAP genel kurul/faaliyet raporu dokümanları · '+
    'güncelleme: '+E(v.guncelleme||"—")+' · '+(v.sirketSayisi||0)+' şirket tarandı</span></div>';

  // ── ARAMA KUTUSU ─────────────────────────────────────────────
  h+='<div class="sirala" style="flex-wrap:wrap">'+
    '<button class="sir'+(ortAramaTip==="isim"?" on":"")+'" id="ortAramaTipIsim">👤🏦 İsim/Fon Ara</button>'+
    '<button class="sir'+(ortAramaTip==="sirket"?" on":"")+'" id="ortAramaTipSirket">🏢 Şirket Ara</button>'+
    '</div>';
  h+='<input id="ortAramaKutu" type="text" placeholder="'+
    (ortAramaTip==="sirket"?"Ticker veya şirket adı yaz…":"İsim veya fon adı yaz…")+
    '" value="'+E(ortAramaMetin)+'" style="width:100%;box-sizing:border-box;padding:10px;'+
    'margin:6px 0;border-radius:8px;border:1px solid #444;background:#111;color:#eee;font-size:15px">';

  if(ortAramaMetin.trim().length>=2){
    h+='<div id="ortAramaSonuclar">'+ortaklikAramaSonucHtml()+'</div>';
    el("govde").innerHTML=h;
    ortaklikAramaOlaylariBagla();
    return;
  }

  h+='<div class="sirala" style="flex-wrap:wrap">'+Object.keys(ORT_MODUL_AD).map(function(k){
    return '<button class="sir'+(ortAktifModul===k?" on":"")+'" data-om="'+k+'">'+ORT_MODUL_AD[k]+'</button>';
  }).join("")+'</div>';

  var liste=(v.modul&&v.modul[ortAktifModul])||[];
  if(!liste.length){
    h+='<div class="bos">Bu filtreye uyan şirket/kişi bulunamadı.</div>';
  }else if(ortAktifModul==="cokluSirketIsimler"){
    h+=liste.map(function(x){
      var etiket=x.tuzelMi?"🏦 ":"👤 ";
      return '<div class="satir" data-isim="'+E(x.isim)+'" style="cursor:pointer">'+
        '<div class="sol"><div class="kod">'+etiket+E(x.isim)+'</div>'+
        '<div class="altbilgi">'+x.sirketSayisi+' şirkette görünüyor · '+
        x.sirketler.slice(0,4).map(function(s2){return E(s2.ticker)}).join(", ")+
        (x.sirketler.length>4?" +"+(x.sirketler.length-4):"")+'</div></div>'+
        '<div class="sag">👉</div></div>';
    }).join("");
  }else if(ortAktifModul==="dusukHalkaAciklik"){
    h+=liste.map(function(x){
      return '<div class="satir"><div class="sol"><div class="kod">'+E(x.ticker)+' — '+E(x.unvan)+'</div></div>'+
        '<div class="sag"><div class="yuzde">%'+x.halkaAciklikTahmini+'</div>'+
        '<div class="altbilgi">tahmini halka açıklık</div></div></div>';
    }).join("");
  }else{
    h+=liste.map(function(x){
      return '<div class="satir"><div class="sol">'+
        '<div class="kod">'+E(x.ticker)+' — '+E(x.unvan)+'</div>'+
        '<div class="altbilgi"><span data-isim="'+E(x.ortak)+'" style="text-decoration:underline;cursor:pointer">'+
        E(x.ortak)+'</span> · %'+E(String(x.payYuzde))+'</div></div></div>';
    }).join("");
  }
  el("govde").innerHTML=h;
  [].forEach.call(document.querySelectorAll("[data-om]"),function(b){
    b.onclick=function(){tit();ortAktifModul=b.dataset.om;ortaklikGoster(v)};
  });
  [].forEach.call(document.querySelectorAll("[data-isim]"),function(b){
    b.onclick=function(){tit();ortSeciliKisi=b.dataset.isim;ortaklikKisiAc(ortSeciliKisi)};
  });
  ortaklikAramaOlaylariBagla();
}
function ortaklikAramaOlaylariBagla(){
  var ti=el("ortAramaTipIsim"), ts=el("ortAramaTipSirket"), kutu=el("ortAramaKutu");
  if(ti)ti.onclick=function(){ortAramaTip="isim";ortAramaSonuc=null;ortaklikGoster(ortD)};
  if(ts)ts.onclick=function(){ortAramaTip="sirket";ortAramaSonuc=null;ortaklikGoster(ortD)};
  if(kutu){
    kutu.focus();
    kutu.selectionStart=kutu.selectionEnd=kutu.value.length;
    kutu.oninput=function(){
      ortAramaMetin=kutu.value;
      clearTimeout(ortAramaZamanlayici);
      ortAramaZamanlayici=setTimeout(function(){
        if(ortAramaMetin.trim().length<2){ortAramaSonuc=null;ortaklikGoster(ortD);return}
        /* DÜZELTME: 2 karaktere İLK ULAŞILDIĞINDA #ortAramaSonuclar alanı
           DOM'da henüz yok (o alan sadece tam yeniden çizimde, uzunluk>=2
           koşuluyla ekleniyor). Eskiden burada direkt innerHTML güncellemesi
           deneniyordu, alan yoksa sessizce hiçbir şey olmuyordu — "yazarken
           hiçbir şey görünmüyor" hatası buydu. Alan yoksa önce tam çizimi
           tetikleyip (kutu odağı ortaklikAramaOlaylariBagla() içinde zaten
           korunuyor), öyle devam ediyoruz. */
        if(!el("ortAramaSonuclar"))ortaklikGoster(ortD);
        post("/api/ortaklikAra",{q:ortAramaMetin.trim(),tip:ortAramaTip}).then(function(r){
          ortAramaSonuc=r;
          var kap=el("ortAramaSonuclar");
          if(kap){kap.innerHTML=ortaklikAramaSonucHtml();ortaklikAramaSonucOlaylariBagla()}
          else{ortaklikGoster(ortD)}  // güvenlik ağı — yine de yoksa tam çiz
        });
      },350);
    };
  }
  ortaklikAramaSonucOlaylariBagla();
}
function ortaklikAramaSonucHtml(){
  if(!ortAramaSonuc)return '<div class="yukleniyor">aranıyor…</div>';
  var liste=ortAramaSonuc.sonuclar||[];
  if(!liste.length)return '<div class="bos">Eşleşme bulunamadı.</div>';
  if(ortAramaSonuc.tip==="sirket"){
    return liste.map(function(x){
      return '<div class="satir" data-ticker="'+E(x.ticker)+'" style="cursor:pointer">'+
        '<div class="sol"><div class="kod">'+E(x.ticker)+' — '+E(x.unvan)+'</div></div>'+
        '<div class="sag">👉</div></div>';
    }).join("");
  }
  return liste.map(function(x){
    var etiket=x.tuzelMi?"🏦 ":"👤 ";
    return '<div class="satir" data-isim="'+E(x.isim)+'" style="cursor:pointer">'+
      '<div class="sol"><div class="kod">'+etiket+E(x.isim)+'</div>'+
      '<div class="altbilgi">'+x.sirketSayisi+' şirkette görünüyor'+
      (x.sirketler&&x.sirketler.length?' · '+x.sirketler.map(function(t){return E(t)}).join(", "):"")+
      '</div></div><div class="sag">👉</div></div>';
  }).join("");
}
function ortaklikAramaSonucOlaylariBagla(){
  [].forEach.call(document.querySelectorAll("#ortAramaSonuclar [data-isim]"),function(b){
    b.onclick=function(){tit();ortSeciliKisi=b.dataset.isim;ortaklikKisiAc(ortSeciliKisi)};
  });
  [].forEach.call(document.querySelectorAll("#ortAramaSonuclar [data-ticker]"),function(b){
    b.onclick=function(){tit();ortSeciliSirket=b.dataset.ticker;ortaklikSirketAc(ortSeciliSirket)};
  });
}
var ortSirketD=null;
function ortaklikSirketAc(ticker){
  el("govde").innerHTML='<div class="yukleniyor">'+E(ticker)+' için kart çıkarılıyor…</div>';
  post("/api/ortaklikSirket",{ticker:ticker}).then(function(v){ortSirketD=v;ortaklikSirketGoster(v)})
    .catch(function(){el("govde").innerHTML='<div class="bos">Bulunamadı.</div>'});
}
function ortaklikSirketGoster(v){
  var h='<button class="sir" id="ortGeri">◀ Haritaya dön</button>';
  if(!v||!v.ok||v.bulunamadi){
    h+='<div class="bos">'+E(v&&v.ticker||"")+' için kayıt bulunamadı.</div>';
  }else{
    h+='<div class="kutu"><h3>🏢 '+E(v.ticker)+' — '+E(v.unvan)+'</h3>'+
      (v.halkaAciklikTahmini!=null?'<div class="altbilgi">Tahmini halka açıklık: %'+E(String(v.halkaAciklikTahmini))+'</div>':"")+
      '</div>';
    if(v.ortaklikYapisi&&v.ortaklikYapisi.length){
      h+='<div class="uyari"><b>Ortaklık yapısı</b></div>';
      h+=v.ortaklikYapisi.map(function(o){
        var etiket=o.tuzelMi?"🏦 ":"👤 ";
        return '<div class="satir"><div class="sol">'+
          '<div class="kod"><span data-isim="'+E(o.isim)+'" style="text-decoration:underline;cursor:pointer">'+
          etiket+E(o.isim)+'</span></div></div>'+
          '<div class="sag"><div class="yuzde">%'+E(String(o.payYuzde))+'</div></div></div>';
      }).join("");
    }
    if(v.yonetimKurulu&&v.yonetimKurulu.length){
      h+='<div class="uyari"><b>Yönetim kurulu</b></div>';
      h+=v.yonetimKurulu.map(function(y){
        return '<div class="satir"><div class="sol">'+
          '<div class="kod"><span data-isim="'+E(y.isim)+'" style="text-decoration:underline;cursor:pointer">'+
          E(y.isim)+'</span></div><div class="altbilgi">'+E(y.gorev)+'</div></div></div>';
      }).join("");
    }
    if(!(v.ortaklikYapisi&&v.ortaklikYapisi.length)&&!(v.yonetimKurulu&&v.yonetimKurulu.length)){
      h+='<div class="bos">Bu şirket için ortaklık/yönetim verisi bulunamadı'+
        (v.veriEksik&&v.veriEksik.length?' ('+v.veriEksik.map(function(e){return E(e)}).join(", ")+')':"")+
        '.</div>';
    }
  }
  el("govde").innerHTML=h;
  var g=el("ortGeri");if(g)g.onclick=function(){tit();ortSeciliSirket=null;ortaklikGoster(ortD)};
  [].forEach.call(document.querySelectorAll("[data-isim]"),function(b){
    b.onclick=function(){tit();ortSeciliSirket=null;ortSeciliKisi=b.dataset.isim;ortaklikKisiAc(ortSeciliKisi)};
  });
}
function ortaklikKisiAc(isim){
  el("govde").innerHTML='<div class="yukleniyor">'+E(isim)+' için borsa haritası çıkarılıyor…</div>';
  post("/api/ortaklikKisi",{isim:isim}).then(ortaklikKisiGoster)
    .catch(function(){el("govde").innerHTML='<div class="bos">Bulunamadı.</div>'});
}
function ortaklikKisiGoster(v){
  var h='<button class="sir" id="ortGeri">◀ Haritaya dön</button>';
  if(!v||!v.ok||!v.kayitlar||!v.kayitlar.length){
    h+='<div class="bos">'+E(v&&v.isim||"")+' için kayıt bulunamadı.</div>';
  }else{
    h+='<div class="kutu"><h3>'+(v.tuzelMi?"🏦 ":"👤 ")+E(v.goruntuIsim||v.isim)+'</h3>'+
      '<div class="altbilgi">'+v.kayitlar.length+' şirkette kayıt bulundu — '+
      'aynı görünen farklı kişiler otomatik ayrıştırılmadı, isim tam eşleşmesi kullanıldı.</div></div>';
    /* 🐣 Bu bir fon/kurumsa (tuzelMi), o fonun KENDİ portföyündeki hisseleri
       de göster — kaynak farklı: TEFAS+KAP Portföy Dağılım Raporu üzerinden
       fon_hisse_scraper.py'nin ürettiği ayrı veri seti (fonHisseHaritasi).
       Burada sadece isim eşleştirmesiyle bağlanıyor, %100 garantili değil —
       eşleşme yoksa bölüm hiç gösterilmiyor (uydurma/boş kutu yok). */
    if(v.tuzelMi)h+='<div id="ortFonPortfoy"></div>';
    h+=v.kayitlar.map(function(k){
      return '<div class="satir"><div class="sol"><div class="kod">'+E(k.ticker)+' — '+E(k.unvan)+'</div>'+
        '<div class="altbilgi">'+E(k.rol)+(k.payYuzde!=null?' · %'+E(String(k.payYuzde)):"")+'</div></div></div>';
    }).join("");
  }
  el("govde").innerHTML=h;
  var g=el("ortGeri");if(g)g.onclick=function(){tit();ortSeciliKisi=null;ortSeciliSirket=null;ortaklikGoster(ortD)};
  if(v&&v.ok&&v.tuzelMi&&v.kayitlar&&v.kayitlar.length){
    post("/api/fonHisseleri",{isim:v.goruntuIsim||v.isim}).then(function(r){
      var kap=el("ortFonPortfoy");
      if(!kap)return;
      if(!r||!r.ok||!r.eslesme||!r.fonlar||!r.fonlar.length){kap.innerHTML="";return}
      kap.innerHTML=r.fonlar.map(function(f){
        var hisseler=f.hisseler||[];
        if(!hisseler.length)return "";
        return '<div class="kutu"><h3>📦 '+E(f.fonAdi)+' — portföyü</h3>'+
          '<div class="altbilgi">'+(f.rapordonemi?"dönem: "+E(f.rapordonemi)+" · ":"")+
          hisseler.length+' hisse · kaynak: KAP Portföy Dağılım Raporu</div></div>'+
          hisseler.map(function(hh){
            return '<div class="satir"><div class="sol"><div class="kod">'+E(hh.hisseKodu)+'</div></div>'+
              '<div class="sag"><div class="yuzde">'+(hh.payYuzde!=null?'%'+E(String(hh.payYuzde)):"—")+'</div>'+
              (hh.tahminiLot!=null?'<div class="altbilgi">'+E(String(hh.tahminiLot))+' lot</div>':"")+
              '</div></div>';
          }).join("");
      }).join("");
    }).catch(function(){var kap=el("ortFonPortfoy");if(kap)kap.innerHTML=""});
  }
}
/* ================== 🐣 FONLAR SEKMESİ ==========
   Kaynak: fon_hisse_scraper.py'nin ürettiği fonHisseHaritasi + worker'ın
   /api/fonYukle push'unda otomatik arşivlediği önceki ay kovaları.
   Dashboard: yeni giren / artıran / azaltan / çıkan (diff, sadece geçmiş
   varsa) + en çok fon tarafından tutulan (konsensüs, her zaman var).
   Hisse koduna dokununca detay, fon adına dokununca "benzer fonlar"
   (hisse örtüşmesi) açılır. */
var fonD=null;            // /api/fonOzet sonucu
var fonAramaKod="";       // seçili/aranan hisse kodu
var fonDetay=null;        // /api/fonHisseDetay sonucu
var fonBenzerFonKodu=null,fonBenzerD=null; // /api/fonBenzer sonucu
function fonlarCiz(){
  if(fonD){fonlarGoster(fonD);return}
  el("govde").innerHTML='<div class="yukleniyor">fon verisi okunuyor…</div>';
  post("/api/fonOzet",{}).then(function(v){fonD=v;fonlarGoster(v)})
    .catch(function(){el("govde").innerHTML='<div class="bos">Okunamadı. Birazdan tekrar dene.</div>'});
}
function fonlarBolumHtml(baslik,liste,satirFn){
  if(!liste||!liste.length)return "";
  var h='<div class="uyari"><b>'+baslik+'</b></div>';
  h+=liste.map(function(x){
    return '<div class="satir" data-fonhisse="'+E(x.hisse)+'" style="cursor:pointer">'+
      '<div class="sol"><div class="kod">'+satirFn(x)+'</div></div><div class="sag">👉</div></div>';
  }).join("");
  return h;
}
function fonlarGoster(v){
  if(!v||!v.ok){
    el("govde").innerHTML='<div class="bos">Fon verisi henüz hazır değil.<br>Veri kaynağı (TEFAS+KAP taraması) ilk çalıştırmasını bekliyor olabilir.</div>';
    return;
  }
  if(v.hazirDegil){
    el("govde").innerHTML='<div class="bos">Fon verisi henüz hiç yüklenmemiş.</div>';
    return;
  }
  if(fonBenzerFonKodu){fonBenzerGoster(fonBenzerD);return}
  if(fonAramaKod){fonDetayGoster(fonDetay);return}
  var h='<div class="uyari" style="margin-top:0"><b>🐣 Fonlar</b><br>'+
    'TEFAS hisse yoğun/değişken fonların KAP\\'a bildirdiği aylık portföyler üzerinden — '+
    'kim ne alıyor, kim ne satıyor, hangi hisseye kaç fon aynı anda giriyor.<br>'+
    '<span style="opacity:.7">Kaynak: TEFAS + KAP aylık portföy bildirimi · güncelleme: '+E(v.guncelleme||"—")+'</span></div>';
  h+='<input id="fonAramaKutu" type="text" placeholder="Hisse kodu yaz (örn. THYAO) ve Enter…" value="" '+
    'style="width:100%;box-sizing:border-box;padding:10px;margin:6px 0;border-radius:8px;'+
    'border:1px solid #444;background:#111;color:#eee;font-size:15px;text-transform:uppercase">';
  if(!v.gecmisVarMi){
    h+='<div class="uyari">📌 Bu ilk tarama — henüz karşılaştırılacak önceki ay yok. '+
      'Bir sonraki aylık taramadan itibaren "yeni giren / artıran / azaltan / çıkan" listeleri burada dolacak. '+
      'Aşağıda şu an itibariyle en çok fon tarafından tutulan hisseler var.</div>';
  }else{
    h+='<div class="altbilgi" style="margin:4px 0 10px">Karşılaştırma: '+E(v.oncekiAy)+' → '+E(v.guncelAy)+'</div>';
    h+=fonlarBolumHtml("🆕 Bu ay yeni giren",v.yeniAlim,function(x){
      return E(x.hisse)+' <span style="opacity:.7">— '+x.fonSayisi+' fon</span>';
    });
    h+=fonlarBolumHtml("📈 Payını artıranlar",v.artiranlar,function(x){
      return E(x.hisse)+' <span style="opacity:.7">— %'+x.toplamPayOnce+' → %'+x.toplamPaySimdi+
        (x.farkYuzde!=null?' ('+(x.farkYuzde>0?"+":"")+x.farkYuzde+'%)':'')+'</span>';
    });
    h+=fonlarBolumHtml("📉 Payını azaltanlar",v.azaltanlar,function(x){
      return E(x.hisse)+' <span style="opacity:.7">— %'+x.toplamPayOnce+' → %'+x.toplamPaySimdi+
        (x.farkYuzde!=null?' ('+x.farkYuzde+'%)':'')+'</span>';
    });
    h+=fonlarBolumHtml("🚪 Bu ay tamamen çıkan",v.cikanlar,function(x){
      return E(x.hisse)+' <span style="opacity:.7">— önceden '+x.fonSayisiOnce+' fon tutuyordu</span>';
    });
  }
  h+=fonlarBolumHtml("🏆 En çok fon tarafından tutulan (konsensüs)",v.konsensus,function(x){
    return E(x.hisse)+' <span style="opacity:.7">— '+x.fonSayisi+' fon · toplam pay %'+x.toplamPay+'</span>';
  });
  h+='<div class="uyari" style="opacity:.7">🔒 Kurumsal alım-satımı şirket içi (yönetici/pay sahibi) işlemleriyle '+
    'çakıştırma henüz eklenmedi — bunun için KAP\\'taki yönetici işlem bildirimlerini çeken ayrı bir tarayıcı gerekiyor.</div>';
  el("govde").innerHTML=h;
  var kutu=el("fonAramaKutu");
  if(kutu)kutu.onkeydown=function(e2){if(e2.key==="Enter")fonAramaCalistir(kutu.value)};
  [].forEach.call(document.querySelectorAll("[data-fonhisse]"),function(b){
    b.onclick=function(){tit();fonAramaCalistir(b.dataset.fonhisse)};
  });
}
function fonAramaCalistir(kod){
  kod=String(kod||"").trim().toUpperCase();
  if(!kod)return;
  fonAramaKod=kod;fonDetay=null;
  el("govde").innerHTML='<div class="yukleniyor">'+E(kod)+' için fon bilgisi çıkarılıyor…</div>';
  post("/api/fonHisseDetay",{kod:kod}).then(function(v){fonDetay=v;fonlarGoster(fonD)})
    .catch(function(){el("govde").innerHTML='<div class="bos">Bulunamadı.</div>'});
}
function fonDetayGoster(v){
  var h='<button class="sir" id="fonGeri">◀ Fonlara dön</button>';
  if(!v||!v.ok||v.bulunamadi){
    h+='<div class="bos">'+E(fonAramaKod)+' hiçbir fon portföyünde bulunamadı.</div>';
  }else{
    h+='<div class="kutu"><h3>'+E(v.kod)+'</h3>'+
      '<div class="altbilgi">'+v.fonSayisi+' fon tutuyor · toplam pay %'+v.toplamPay+
      (v.gecmisVarMi?(' · önceki ay ('+E(v.oncekiAy)+'): '+v.oncekiFonSayisi+' fon · %'+v.oncekiToplamPay):
        ' · henüz karşılaştırılacak önceki ay yok')+'</div></div>';
    h+='<div class="uyari"><b>Bu hisseyi tutan fonlar</b></div>';
    h+=v.fonlar.map(function(f){
      return '<div class="satir"><div class="sol">'+
        '<div class="kod"><span data-fonkodu="'+E(f.fonKodu)+'" style="text-decoration:underline;cursor:pointer">'+
        E(f.fonKodu)+' — '+E(f.fonAdi)+'</span></div>'+
        '<div class="altbilgi">'+(f.rapordonemi?E(f.rapordonemi)+' dönemi':'')+'</div></div>'+
        '<div class="sag"><div class="yuzde">%'+E(String(f.payYuzde))+'</div></div></div>';
    }).join("");
  }
  el("govde").innerHTML=h;
  var g=el("fonGeri");if(g)g.onclick=function(){tit();fonAramaKod="";fonDetay=null;fonlarGoster(fonD)};
  [].forEach.call(document.querySelectorAll("[data-fonkodu]"),function(b){
    b.onclick=function(){tit();fonBenzerFonKodu=b.dataset.fonkodu;fonBenzerAc(fonBenzerFonKodu)};
  });
}
function fonBenzerAc(fonKodu){
  el("govde").innerHTML='<div class="yukleniyor">'+E(fonKodu)+' için benzer fonlar aranıyor…</div>';
  post("/api/fonBenzer",{fonKodu:fonKodu}).then(function(v){fonBenzerD=v;fonBenzerGoster(v)})
    .catch(function(){el("govde").innerHTML='<div class="bos">Bulunamadı.</div>'});
}
function fonBenzerGoster(v){
  var h='<button class="sir" id="fonBenzerGeri">◀ Geri</button>';
  if(!v||!v.ok||v.bulunamadi||!v.benzerler||!v.benzerler.length){
    h+='<div class="bos">'+E((v&&v.fonAdi)||fonBenzerFonKodu||"")+' için örtüşen fon bulunamadı.</div>';
  }else{
    h+='<div class="kutu"><h3>'+E(v.fonKodu)+' — '+E(v.fonAdi)+'</h3>'+
      '<div class="altbilgi">'+v.hisseSayisi+' hisse tutuyor. En çok örtüşen fonlar (aynı hisselere aynı anda giren):</div></div>';
    h+=v.benzerler.map(function(b){
      return '<div class="satir"><div class="sol"><div class="kod">'+E(b.fonKodu)+' — '+E(b.fonAdi)+'</div>'+
        '<div class="altbilgi">'+b.ortakHisseSayisi+' ortak hisse / '+b.toplamHisseSayisi+' toplam</div></div></div>';
    }).join("");
  }
  el("govde").innerHTML=h;
  var g=el("fonBenzerGeri");if(g)g.onclick=function(){tit();fonBenzerFonKodu=null;fonBenzerD=null;fonlarGoster(fonD)};
}
/* ================== 🐂🐻 TARAMA SEKMESİ (MAL · DİP · AYI/BOĞA) ==========
   Üç bağımsız tarama modülü tek ekranda. Her modülün kendi aç/kapa tiki
   var; açık olanların şartları BİRLİKTE aranır (modüller arası VE).
   Bir modül içinde iki yön birden tiklenirse (toplama+dağıtım gibi)
   "ya biri ya öteki" demektir.
   Zaman dilimleri en üstte çoklu seçilir; sonuçlar dilim dilim kartlarda
   gruplanır ve aynı hisse birden çok dilimde çıkarsa satırında diğer
   dilimler de yazar. Bu sekmede üst sekme şeridi gizlenir — tüm dikey
   alan taramaya kalır. */
var mbD=null, mbTek=null, mbBekle=false;
/* Alarm listesi paketten AYRI gelir: tarama artık uygulamada yürüdüğü için
   sunucu paketi üretmiyor, alarm bilgisi de o pakette taşınamıyor. */
var mbAlarmD=null, mbAlarmIstendi=false, mbAlarmDeneme=0, mbAlarmIlkTs=0;
/* 🐞 "Alarm ekledim, çıkıp girince silinmiş gibi görünüyor" — sebep KV'nin
   yaz-sonrası-oku gecikmesi: az önce eklenen alarm, uygulama yeniden
   açıldığında sunucudan henüz gelmeyebilir. Çözüm: son bilinen listeyi
   localStorage'a da yazıyoruz. Açılışta önce ONU gösteriyoruz (kayıp
   görünmesin), sunucu cevabı gelince KARŞILAŞTIRIYORUZ: önbellekte olup
   sunucuda eksik bir alarm varsa ve önbellek tazeyse (son 3 dk), bunu
   gecikme sayıp sunucuyu değil önbelleği gösteriyoruz ve birkaç kez
   daha deniyoruz — gerçekten silinmişse (başka yerden) birkaç deneme
   sonunda zaten sunucu ile eşitleniyor.
   🐞 2. HATA (bulundu): istek gerçekten başarısız olursa (ağ kopması,
   sunucudan geç/garip cevap) eski kod mbAlarmIstendi kilidini HİÇ
   çözmüyordu VE ekranı yeniden çizmiyordu — sonuç: "alınıyor…" yazısı
   ekranda SONSUZA dek asılı kalıyordu, bir daha da denenmiyordu. Şimdi:
   8 sn'de zaman aşımı var, her durumda kilit çözülüyor, ekran her
   durumda yeniden çiziliyor. */
function mbAlarmOnbellekOku(){
  try{var h=localStorage.getItem("mbAlarmOnbellek");if(h)return JSON.parse(h)}catch(_){}
  return null;
}
function mbAlarmOnbellekYaz(d){
  try{localStorage.setItem("mbAlarmOnbellek",JSON.stringify({d:d,ts:Date.now()}))}catch(_){}
}
function mbAlarmCek(zorla){
  if(mbAlarmIstendi&&!zorla)return;
  mbAlarmIstendi=true;
  if(!mbAlarmIlkTs)mbAlarmIlkTs=Date.now();
  try{
    if(!mbAlarmD){
      var onbIlk=mbAlarmOnbellekOku();
      if(onbIlk&&onbIlk.d)mbAlarmD=onbIlk.d;
    }
    var zamanAsimi=new Promise(function(res){setTimeout(function(){res(null)},8000)});
    Promise.race([post("/api/malboga",{is:"alarmListe"}),zamanAsimi]).then(function(r){
      if(!r){                                 /* 8sn'de cevap gelmedi — vazgeç, tekrar denenebilsin */
        mbAlarmIstendi=false;
        if(!mbAlarmD)mbAlarmD={yuva:5,seans:false,liste:[]};
        if(sekme==="malboga")mbCizYenile();
        return;
      }
      var sunucu=(r&&r.alarm)||{yuva:5,seans:false,liste:[]};
      var onb=mbAlarmOnbellekOku();
      var eksik=onb&&onb.d&&onb.d.liste&&onb.d.liste.some(function(a){
        return!(sunucu.liste||[]).some(function(b2){return b2.id===a.id})});
      if(eksik&&onb.ts&&(Date.now()-onb.ts)<18e4&&mbAlarmDeneme<15){
        mbAlarmDeneme++;
        setTimeout(function(){mbAlarmIstendi=false;mbAlarmCek(true)},4000);
        if(sekme==="malboga")mbCizYenile();
        return;
      }
      mbAlarmDeneme=0;mbAlarmIstendi=false;
      mbAlarmD=sunucu;
      mbAlarmOnbellekYaz(sunucu);
      if(sekme==="malboga")mbCizYenile();
    }).catch(function(){
      mbAlarmIstendi=false;
      if(!mbAlarmD)mbAlarmD={yuva:5,seans:false,liste:[]};
      if(sekme==="malboga")mbCizYenile();
    });
  }catch(_){
    mbAlarmIstendi=false;
    if(!mbAlarmD)mbAlarmD={yuva:5,seans:false,liste:[]};
    if(sekme==="malboga")mbCizYenile();
  }
}
/* Bekçi: alarm ekranındayken 5 sn geçtiği hâlde hâlâ null ise (ör. sekme
   açılırken istek başlamadan bir yerlerde takıldıysa) kilidi zorla açıp
   yeniden dener. Kullanıcı hiçbir şey yapmadan kendiliğinden düzelir. */
function mbAlarmBekci(){
  if(mbAlarmD===null&&mbAlarmIlkTs&&(Date.now()-mbAlarmIlkTs)>2000){
    mbAlarmIstendi=false;mbAlarmCek(true);
  }
}
/* Açılış = TradingView varsayılanına yakın: günlükte son 5 barda mal toplanmış. */
var mbIst={
  kapsam:"hepsi",          /* hepsi = seçili dilimlerin HEPSİNDE tutsun */
  tfler:["1G"],
  /* tfler:null → modül GENEL dilim seçimini (yukarıdaki mbIst.tfler) kullanır.
     tfler:[...] → modül KENDİ dilimini kullanır, genelden bağımsız çalışır.
     Varsayılan hep null: kimse dokunmazsa sistem birebir eskisi gibi davranır. */
  mal:{acik:true, top:true, dag:false, temiz:true, sinirsiz:false, n:5, tfler:null},
  dip:{acik:false,kademe:"dip", tfler:null},
  pivot:{acik:false,dilimler:["KISA","ORTA","UZUN"],kirdi:true,yakin:false,uzerinde:false,yuzde:3},
  bolge:{acik:false,secili:["b2"], tfler:null},
  enerji:{acik:false,olustu:true,icinde:true,b0:true,b1:false,mesafeAcik:true,mesafe:5, tfler:null},
  ab :{acik:false,boga:true, ayi:false, sinirsiz:false, n:5, tfler:null}
};
/* ═══ 🕒 MODÜL BAZLI ZAMAN DİLİMİ ═══════════════════════════════════════
   Her modül (mal/dip/bölge/enerji/ayı-boğa) isterse kendi zaman dilimini
   seçebilir; seçmezse (tfler null/boşsa) en üstteki GENEL dilim seçimini
   kullanır. Pivot zaten kendi "dilimler" alanına sahip, buna dahil değil. */
var MB_TF_SIRA=["5DK","15DK","1SA","4SA","1G","1HAF","1AY"];
function mbModOzelMi(mod){return !!(mod&&Array.isArray(mod.tfler)&&mod.tfler.length)}
function mbModTf(mod){return mbModOzelMi(mod)?mod.tfler:mbIst.tfler}
function mbHerhangiOzelTf(){
  return mbModOzelMi(mbIst.mal)||mbModOzelMi(mbIst.dip)||mbModOzelMi(mbIst.bolge)||
         mbModOzelMi(mbIst.enerji)||mbModOzelMi(mbIst.ab);
}
/* Ölçüm/ilerleme/tazeleme fonksiyonlarının kullandığı GERÇEK dilim kümesi:
   genel seçim ∪ her modülün kendi özel seçimi. Kimse özel seçim yapmazsa bu
   küme mbIst.tfler ile birebir aynıdır (dizi referansı bile aynı kalır). */
function mbEfektifTfler(){
  if(!mbHerhangiOzelTf())return mbIst.tfler;
  var out=mbIst.tfler.slice();
  [mbIst.mal,mbIst.dip,mbIst.bolge,mbIst.enerji,mbIst.ab].forEach(function(mod){
    mbModTf(mod).forEach(function(t){if(out.indexOf(t)<0)out.push(t)});
  });
  return MB_TF_SIRA.filter(function(t){return out.indexOf(t)>=0});
}
var MB_BAR=[0,1,2,3,4];
var MB_KADEME=[["dip","⬇️ Dip bölgesi"],["dip382","⬇️⬇️ Derin (382 altı)"],["dip236","⬇️⬇️⬇️ En dip (236 altı)"]];

function mbCiz(){
  if(!D.super){
    el("govde").innerHTML='<div class="kilit"><div class="buyuk">🔒</div>'+
      "<h2>🔎 Hisse Taraması — Süper Üyelik gerekli</h2>"+
      '<p style="text-align:left">Bu ekran, sistemin en derin tarama motoru: hisseler <b>kurumsal para akışına</b> göre sınıflanır — kim topluyor, kim dağıtıyor, piyasa şu an "boğa" mı "ayı" rejiminde mi. Manuel yapmaya kalksan saatler sürer, burada saniyeler içinde tüm evren taranır.</p>'+
      '<p style="text-align:left"><b>Süper Üyelikte neler açılır?</b><br>'+
      '📦 Mal toplama / dağıtım taraması — büyük oyuncu bir hissede sessizce topluyor mu, dağıtıyor mu<br>'+
      '🐂🐻 Ayı/Boğa rejim takibi — rejime yeni geçenler ayrı vurgulanır<br>'+
      '⬇️ Dip bölgesi taraması (derin dip / en dip kademeleri dahil)<br>'+
      '🪜 Seviye bölgesi filtreleri — hisse hangi bölgede, o bölgeden çıkarsa ne olur<br>'+
      '🔔 Kendi filtrenle <b>kişisel alarm kur</b> — kriterlerine uyan hisse çıktığı an özelden haber gelir<br>'+
      '🔎 Tek hisse sorgulama — herhangi bir kodu yazıp anında bu derinlikte bak</p>'+
      "<p>Toplam davetin: <b>"+D.ref+"</b> · açılması için <b>"+D.kalan+" kişi</b> daha.</p>"+
      '<button class="dg" id="davetGit">📤 Sistemi paylaş, hemen aç</button></div>';
    var dg=el("davetGit");if(dg)dg.onclick=function(){tit();sekme="davet";izSekmeDegisti(sekme);ciz()};
    return;
  }
  if(mbTek){mbTekGoster(mbTek);return}
  /* 🔧 KRİTİK DÜZELTME: alarm kontrolü artık evren/tarama verisinin
     yüklenmesini BEKLEMİYOR. Eskiden mbAlarmCek() yalnız aşağıdaki
     "!mbEvrenKod" bloğunun ARKASINDA çağrılıyordu — evren ilk seferde
     boşsa fonksiyon orada return ediyor ve alarm isteği o oturum
     boyunca BİR DAHA HİÇ tetiklenmiyordu (istendi=false, mbAlarmD=null
     sonsuza dek kalıyordu). Alarm, taramadan bağımsız bir veri olduğu
     için artık sekmeye her girişte hemen, evrenin durumundan bağımsız
     olarak tetikleniyor. */
  mbAlarmCek();
  mbTazelemeKur();
  setTimeout(mbAlarmBekci,2500);
  /* Ölçümler uygulamanın belleğinde; hiç tarama yapılmadıysa boş paketle
     çizeriz ve kullanıcı "Taramayı başlat" der. */
  if(!mbEvrenKod){
    el("govde").innerHTML='<div class="yukleniyor">hazırlanıyor…</div>';
    post("/api/malboga",{is:"evren"}).then(function(r){
      if(r&&r.ok&&r.kodlar){mbEvrenKod=r.kodlar;mbEvrenKaynak=r.kaynak||""}
      mbCizYenile();mbOtomatikBaslat();
    }).catch(function(){mbCizYenile()});
    return;
  }
  mbCizYenile();
  /* Sekmeye girildiğinde tarama KENDİLİĞİNDEN başlar — her seferinde
     düğmeye basmaya gerek yok. Ölçümler bellekte durduğu için ikinci
     girişte yeniden taramaz, yalnız eksik kalanları tamamlar. */
  mbOtomatikBaslat();
}
/* ⏱ OTOMATİK TAZELEME — kullanıcı elle "başlat"a basmasın diye.
   Tarama bitince ölçümlerin yaşı takip edilir; seçili dilimlerin en
   hızlısına göre bir süre sonra kendiliğinden yeniden taranır. Sunucudaki
   ölçüm önbelleği sayesinde tazeleme çok ucuz. */
var MB_TAZE_SURE={"5DK":12e4,"15DK":3e5,"1SA":9e5,"4SA":18e5,"1G":18e5,"1HAF":36e5,"1AY":36e5};
var mbSonTarama=0, mbZamanlayici=null;
function mbTazelemeKur(){
  if(mbZamanlayici)return;
  mbZamanlayici=setInterval(function(){
    if(sekme!=="malboga"){return}
    mbAlarmBekci();
    if(mbTaraDurum&&mbTaraDurum.suruyor)return;
    var tfl=mbEfektifTfler();
    if(!tfl.length)return;
    var enHizli=1e9;
    for(var i=0;i<tfl.length;i++){
      var sr=MB_TAZE_SURE[tfl[i]]||9e5;
      if(sr<enHizli)enHizli=sr;
    }
    if(Date.now()-mbSonTarama<enHizli)return;
    mbOlcum={};                    /* taze ölçüm iste */
    mbTaraBaslat();
  },20000);
}
function mbOtomatikBaslat(){
  /* Tarama "sürüyor" görünüyorsa gerçekten sürüyor mu bak: sekme dışında
     durmuş olabilir. Nöbetçiyi kur ve döngüyü ittir. */
  if(mbTaraDurum&&mbTaraDurum.suruyor){mbNobetciKur();mbTaraTur();return}
  if(!mbEfektifTfler().length)return;
  var ilr=mbIlerleme();
  if(ilr.gereken&&ilr.olculen>=ilr.gereken)return;   /* zaten tamam */
  mbTaraBaslat();
}
/* Tik değişti → seçimi hemen boya, sonucu tazele. */
function mbUygula(){ mbCizYenile(); }
function mbTazele(){ mbCizYenile(); }   /* eski çağrı adları için */
function mbGetir(){ mbCizYenile(); }

/* ═══ 📈 PİVOT KIRILIM MODÜLÜ ═══════════════════════════════════════════
   Pivot kırılım taraması zaten sistemde var: KISA (1 saat), ORTA (4 saat),
   UZUN (1 gün) listeleri ve bunların aday listeleri. Bu modül o veriyi
   YENİDEN ÖLÇMEZ — uygulamada zaten yüklü olan kartları süzer, dolayısıyla
   sunucuya tek istek bile gitmez, sonuç anında çıkar.
   Üç durum:
     ⚡ son barda kırdı      — kırılım en son barda oldu
     🎯 kırılıma %X kaldı    — henüz kırmadı ama yakın (aday listesi)
     ✅ kırılımın üzerinde   — kırmış ve fiyat hâlâ seviyenin üstünde */
/* 🪜 Altı fibo bölgesi — sınırlar TradingView çizgi adlarının birebir karşılığı:
     🟠 DİKKAT AYI → BOĞA      0.0   – 0.618   dip bölgesi, toparlanma
     🟢 BOĞA → KARAR YERİ      0.618 – 1.0     boğaya geçmiş, karara yürüyor
     🔵 KARAR YERİ → DİRENÇ    1.0   – 1.618   kararı geçmiş, dirence yürüyor
     🟣 DİRENÇ → GÜÇLÜ D/D     1.618 – 2.618   direnci geçmiş, güçlü bölge
     🔴 GÜÇLÜ D/D → ÇOK GÜÇLÜ D/D  2.618 – 3.618   çok güçlü trend bölgesi
     ⚫ ÇOK GÜÇLÜ D/D → DOYUM      3.618 – 4.236   doyuma yaklaşan aşırı uzama
   🔒 KİLİT FİX (Ağustos 2026) — "DOHOL her dilimde boğa ama listede yok":
   Merdiven aslında 4.236'daki (doyum) noktasına kadar sürüyor ama bu dizi
   eskiden 2.618'de (GÜÇLÜ D/D) kesiliyordu. Sonuç: çok güçlü, sürdürülebilir
   bir boğa trendinde olup fiyatı 2.618'i geçmiş HER hisse — ki "her zaman
   diliminde boğa" tarif tam da böyle bir hisseyi anlatıyor — dört bölgenin
   HİÇBİRİNE denk gelmiyor, bölge taraması onu hiç göremiyordu. b5/b6 bu
   boşluğu kapatıyor; artık merdivenin tamamı (doyuma kadar) taranabiliyor. */
var MB_BOLGE=[
  {id:"b1",ik:"🟠",ad:"DİKKAT AYI → BOĞA",alt:0.0,ust:0.618},
  {id:"b2",ik:"🟢",ad:"BOĞA → KARAR YERİ",alt:0.618,ust:1.0},
  {id:"b3",ik:"🔵",ad:"KARAR YERİ → DİRENÇ",alt:1.0,ust:1.618},
  {id:"b4",ik:"🟣",ad:"DİRENÇ → GÜÇLÜ D/D",alt:1.618,ust:2.618},
  {id:"b5",ik:"🔴",ad:"GÜÇLÜ D/D → ÇOK GÜÇLÜ D/D",alt:2.618,ust:3.618},
  {id:"b6",ik:"⚫",ad:"ÇOK GÜÇLÜ D/D → DOYUM",alt:3.618,ust:4.236}
];
function mbBolgeBul(oran){
  if(oran===null||oran===undefined||!isFinite(oran))return null;
  for(var i=0;i<MB_BOLGE.length;i++){
    var b=MB_BOLGE[i];
    if(oran>=b.alt&&oran<b.ust)return b;
  }
  return null;    /* dört ana bölgenin dışında (0.0 altı ya da güçlü D/D üstü) */
}
/* ═══ ⚛ ENERJİ KIRILIMI ═════════════════════════════════════════════
   6.2'deki "⚛ Enerji Taraması" bölümünün karşılığı. Sunucu her ölçümde
   Pine'daki enz_scan çıktısını da veriyor (ezAct/ezIns/ezAge/ezMes…);
   burada yalnız süzülür — ek istek yok.
     Oluştu  : ortada aktif bir sıkışma zonu var
     İçinde  : fiyat o zonun İÇİNDE (henüz kırmadı)
     0B ↑    : zonu SON BARDA yukarı kırdı
     1B ↑    : bir bar önce yukarı kırdı
     Mesafe  : fiyat zonun üst çizgisine %X'ten yakın
   Pine'daki gibi: hiç durum tiki yoksa durum aranmaz, yalnız mesafe. */
var MB_EZ_DURUM=[["olustu","Oluştu","aktif sıkışma zonu var"],
                 ["icinde","İçinde","fiyat zonun içinde"],
                 ["b0","0B ↑","son barda yukarı kırdı"],
                 ["b1","1B ↑","bir bar önce kırdı"]];
var MB_EZ_MESAFE=[1,2,3,5,10];
function mbEnerjiGecti(x,ist){
  var e=ist.enerji;
  if(!e||!e.acik)return true;
  var durumVar=(e.olustu||e.icinde||e.b0||e.b1);
  var uydu=!durumVar;
  if(!uydu){
    if(e.olustu&&Number(x.ezAct)>0.5)uydu=true;
    if(!uydu&&e.icinde&&Number(x.ezIns)>0.5)uydu=true;
    if(!uydu&&e.b0&&Number(x.ezAge)===0)uydu=true;
    if(!uydu&&e.b1&&Number(x.ezAge)===1)uydu=true;
  }
  if(!uydu)return false;
  if(e.mesafeAcik&&!(x.ezMes!=null&&Number(x.ezMes)<=e.mesafe))return false;
  return true;
}
/* Satırdaki ⚛ hücresi — Pine tablosundaki ENERJİ sütununun karşılığı */
function mbEnerjiRozet(x,ist){
  if(!ist.enerji||!ist.enerji.acik)return "";
  var durum=Number(x.ezAge)===0?"0B↑":Number(x.ezAge)===1?"1B↑":
            Number(x.ezIns)>0.5?"İçinde":Number(x.ezAct)>0.5?"Zon":null;
  if(!durum)return "";
  var rk=durum==="0B↑"?"#00e676":durum==="1B↑"?"#69f0ae":durum==="İçinde"?"#FFD700":"#FF9800";
  var par='<span style="color:'+rk+';font-weight:800">⚛ '+durum+'</span>';
  if(x.ezMes!=null)par+=' · üst çizgiyi %'+Number(x.ezMes).toFixed(1)+(x.ezUst?' GEÇTİ':' kaldı');
  if(x.ezEn!=null)par+=' · güç %'+Math.round(Number(x.ezEn));
  if(x.ezTp1!=null)par+=' · GFH '+Number(x.ezTp1).toFixed(2);
  return '<div style="font-size:10px;margin:3px 0 2px;opacity:.95">'+par+'</div>';
}
var MB_PIVOT_DILIM=[["KISA","potansiyel","adayOrta","1 saat","📊"],
                    ["ORTA","fibo","adayOrtaVade","4 saat","📐"],
                    ["UZUN","uzunvade","adayUzun","1 gün","🗓"]];
/* Bir barın saniyesi — "son barda kırdı" bununla ölçülür */
var MB_PIVOT_BAR={KISA:3600,ORTA:14400,UZUN:86400};
var mbPivotHar=null, mbPivotDamga=0;
function mbPivotHaritasi(){
  /* D.kartlar değişmediyse yeniden kurma */
  var damga=(D&&D.guncelleme)||"";
  if(mbPivotHar&&mbPivotDamga===damga)return mbPivotHar;
  var har={};
  var K=(D&&D.kartlar)||{};
  var simdi=Math.floor(Date.now()/1000);   /* sinyal yaşı gösterimi için */
  MB_PIVOT_DILIM.forEach(function(p){
    var ad=p[0], kirListe=K[p[1]]||[], adayListe=K[p[2]]||[];
    var bar=MB_PIVOT_BAR[ad]||86400;
    kirListe.forEach(function(x){
      if(!x||!x.kod)return;
      if(!har[x.kod])har[x.kod]={};
      var ts=Number(x.sinyalTs)||0;
      /* SON BAR = uygulamanın "⚡ canlı" rozetiyle BİREBİR aynı ölçüt.
         Tahmin yok: kart canlıysa kırılım şu anki barda olmuştur. */
      var sonBar=!!x.canli;
      /* KIRILAN SEVİYE = giriş fiyatı (pivot kartında alan adı budur).
         Fiyat o seviyenin üstündeyse hisse hâlâ kırılımın üzerinde. */
      var giris=Number(x.giris),fiyat=Number(x.fiyat);
      var ust=(giris>0&&fiyat>0)?(fiyat>=giris):sonBar;
      har[x.kod][ad]={tip:"kirdi",kirilim:(giris>0?giris:null),fiyat:(fiyat>0?fiyat:null),
        yuzde:(giris>0&&fiyat>0)?((giris-fiyat)/fiyat*100):null,
        kalite:x.kalite,canli:!!x.canli,ts:ts,bar:bar,
        sonBar:sonBar,uzerinde:ust};
    });
    adayListe.forEach(function(x){
      if(!x||!x.kod)return;
      if(!har[x.kod])har[x.kod]={};
      /* Kırılmış kaydı varsa adayla ezme — kırılım daha ileri bir durum */
      if(har[x.kod][ad]&&har[x.kod][ad].tip==="kirdi")return;
      har[x.kod][ad]={tip:"aday",kirilim:x.tetik,fiyat:x.fiyat,
        yuzde:(x.tetikYuzde===null||x.tetikYuzde===undefined)?null:Number(x.tetikYuzde),
        kalite:x.kalite,canli:false,ts:Number(x.sinyalTs)||0,bar:bar,
        sonBar:false,uzerinde:false};
    });
  });
  mbPivotHar=har;mbPivotDamga=damga;
  return har;
}
/* Bir hisse pivot şartını sağlıyor mu? Seçili dilimlerden HERHANGİ birinde
   seçili durumlardan HERHANGİ biri tutuyorsa geçer. */
function mbPivotGecti(kod,ist){
  var p=ist.pivot;
  if(!p||!p.acik)return true;
  var har=mbPivotHaritasi();
  var h=har[kod];
  if(!h)return false;
  var dilimler=(p.dilimler&&p.dilimler.length)?p.dilimler:["KISA","ORTA","UZUN"];
  for(var i=0;i<dilimler.length;i++){
    var d=h[dilimler[i]];
    if(!d)continue;
    if(p.kirdi&&d.tip==="kirdi"&&d.sonBar)return true;
    if(p.uzerinde&&d.tip==="kirdi"&&d.uzerinde)return true;
    if(p.yakin&&d.tip==="aday"&&d.yuzde!=null&&Math.abs(Number(d.yuzde))<=p.yuzde)return true;
  }
  return false;
}
/* Satırda gösterilecek kısa özet */
function mbPivotRozet(kod,ist){
  var p=ist.pivot;
  if(!p||!p.acik)return "";
  var har=mbPivotHaritasi(), h=har[kod];
  if(!h)return "";
  var dilimler=(p.dilimler&&p.dilimler.length)?p.dilimler:["KISA","ORTA","UZUN"];
  var par=[];
  dilimler.forEach(function(ad){
    var d=h[ad];if(!d)return;
    var im,rk;
    var ustu=(d.yuzde!=null&&d.tip==="kirdi")?(" %"+Math.abs(Number(d.yuzde)).toFixed(1)):"";
    if(d.tip==="kirdi"&&d.sonBar){im="⚡ son bar"+ustu;rk="var(--yes)"}
    else if(d.tip==="kirdi"&&d.uzerinde){im="✅ üzerinde"+ustu;rk="var(--yes)"}
    else if(d.tip==="kirdi"){im="kırdı"+ustu;rk="#8b949e"}
    else if(d.yuzde!=null){im="🎯 %"+Math.abs(Number(d.yuzde)).toFixed(1)+" kaldı";rk="var(--sar)"}
    else return;
    par.push('<span style="font-size:10px;padding:2px 5px;border-radius:4px;'+
      'background:rgba(124,77,255,.15);color:'+rk+';font-weight:700">'+E(ad)+' '+im+'</span>');
  });
  return par.length?'<div style="display:flex;flex-wrap:wrap;gap:3px;margin:4px 0 2px">'+par.join("")+'</div>':"";
}
/* ═══ TARAMAYI UYGULAMA YÜRÜTÜR ═══════════════════════════════════════
   Ölçümler burada, uygulamanın belleğinde birikir. Sunucudan yalnız
   "şu hisseleri ölç" diye ham sonuç istenir. KV, isolate ve arka plan
   turu denklemden çıktığı için havuzun tamamı her zaman taranabilir.
   Süzme de burada yapılır — sonuç anında, sunucuya gitmeden değişir. */
var mbOlcum={};          /* dilim → kod → ölçüm */
var mbEvrenKod=null;     /* havuzdaki bütün kodlar */
var mbEvrenKaynak="";
var mbTaraDurum=null;    /* {suruyor,tf,idx,olculen,toplam,baslangic} */

function mbOlcumSay(tf){return mbOlcum[tf]?Object.keys(mbOlcum[tf]).length:0}
/* Seçili dilimlerde toplam kaç ölçüm gerekiyor / kaçı var */
function mbIlerleme(){
  var ger=0,var_=0;
  var n=mbEvrenKod?mbEvrenKod.length:0;
  var tfl=mbEfektifTfler();
  for(var i=0;i<tfl.length;i++){ger+=n;var_+=mbOlcumSay(tfl[i])}
  return{gereken:ger,olculen:var_};
}
/* Sunucudaki mbModulGecti ile AYNI kurallar — tek kaynak olması için
   birebir aynı sırayla yazıldı. */
/* Tek tek modül şartları — mbGectiMi'nin AYNI mantığı, dışarı alındı ki
   özel-dilim yolunda (mbPaketUretOzel) her modül kendi ölçümüyle tek tek
   çağrılabilsin. Davranış birebir korunuyor, yalnız yeniden düzenlendi. */
function mbCondMal(x,ist){
  var m=ist.mal;
  if(!m||!m.acik)return true;
  var N=m.sinirsiz?1e9:m.n, ok=false;
  if(m.top)ok=ok||(m.temiz?(x.topHam<=N&&x.topHam<x.dagHam):x.topHam<=N);
  if(m.dag)ok=ok||(x.dagHam<=N);
  return ok;
}
function mbCondDip(x,ist){
  var d=ist.dip;
  if(!d||!d.acik)return true;
  return !!x[d.kademe];
}
function mbCondBolge(x,ist){
  var b=ist.bolge;
  if(!b||!b.acik)return true;
  /* YENİ (Ağustos 2026): Fibo bölge/aralık taraması artık AYRICA rejimin
     BOĞA olmasını şart koşuyor. Bölge (oran) tek başına 571'in doyum>close
     rejim şartından BAĞIMSIZ bir ölçüdür (yalnız fiyatın fibo merdiveninde
     hangi basamakta olduğunu söyler) — bu yüzden "aralıkta ama aslında
     ayı rejiminde" hisseler de listeye giriyordu. Artık AYI/BOĞA modülü
     (ist.ab) ayrıca açılmasa bile, bölge taraması kendi içinde x.boga
     şartını dayatıyor: "hisse boğa iken o aralıkta olanlar" tanımı budur. */
  if(!x.boga)return false;
  var bl=mbBolgeBul(x.oran);
  return !!(bl&&b.secili.indexOf(bl.id)>=0);
}
function mbCondAb(x,ist){
  var a=ist.ab;
  if(!a||!a.acik)return true;
  var M=a.sinirsiz?1e9:a.n, ok=false;
  if(a.boga)ok=ok||(!!x.boga&&x.rejYas<=M);
  if(a.ayi) ok=ok||(!!x.ayi &&x.rejYas<=M);
  return ok;
}
function mbGectiMi(x,ist,kod){
  if(!x)return false;
  if(ist.pivot&&ist.pivot.acik&&kod&&!mbPivotGecti(kod,ist))return false;
  if(!mbCondMal(x,ist))return false;
  if(!mbCondDip(x,ist))return false;
  if(!mbCondBolge(x,ist))return false;
  if(!mbEnerjiGecti(x,ist))return false;
  if(!mbCondAb(x,ist))return false;
  return true;
}
function mbTazelikSay(x){return Math.min(Number(x.topHam),Number(x.dagHam),Number(x.rejYas))}
/* Bellekteki ölçümlerden ekranın beklediği paketi üretir — böylece çizim
   kodunun tamamı olduğu gibi kalır. */
function mbPaketUret(){
  /* Kimse hiçbir modülde özel dilim seçmediyse eskisi gibi (GENEL yol)
     davran — sıfır risk. Bir modülde bile özel dilim seçilirse ÖZEL yola
     geçilir. */
  return mbHerhangiOzelTf()?mbPaketUretOzel():mbPaketUretGenel();
}
function mbPaketUretGenel(){
  var TFAD={"5DK":["5 dakika","⚡"],"15DK":["15 dakika","⏱"],"1SA":["1 saat","🕐"],
    "4SA":["4 saat","🕓"],"1G":["1 gün","🗓"],"1HAF":["1 hafta","📅"],"1AY":["1 ay","🗂"]};
  var SIRA=["5DK","15DK","1SA","4SA","1G","1HAF","1AY"];
  var evren=mbEvrenKod?mbEvrenKod.length:0;
  var dilimler=SIRA.map(function(t){return{tf:t,ad:TFAD[t][0],ik:TFAD[t][1],
    olculen:mbOlcumSay(t),evren:evren,yas:null}});
  var sozluk={tfler:SIRA.map(function(t){return{tf:t,ad:TFAD[t][0],ik:TFAD[t][1]}})};
  var v={ok:true,sozluk:sozluk,dilimler:dilimler,calisiyor:true,
    evrenBilgi:{sayi:evren,kaynak:mbEvrenKaynak},ortak:[],gruplar:[]};
  if(!mbIst.tfler.length)return v;
  /* dilim dilim geçenler */
  var gecen={},har={};
  mbIst.tfler.forEach(function(t){
    var h=mbOlcum[t]||{};har[t]=h;
    var set={};
    for(var k in h)if(mbGectiMi(h[k],mbIst,k))set[k]=true;
    gecen[t]=set;
  });
  /* kesişim */
  var ortak=null;
  mbIst.tfler.forEach(function(t){
    if(ortak===null){ortak={};for(var k in gecen[t])ortak[k]=true}
    else{var y={};for(var k2 in ortak)if(gecen[t][k2])y[k2]=true;ortak=y}
  });
  var ortakListe=Object.keys(ortak||{}).sort();
  v.ortak=ortakListe;
  function serit(kod){
    return mbIst.tfler.map(function(t){
      var m=har[t][kod];
      if(!m)return{tf:t,yok:true};
      return{tf:t,boga:!!m.boga,ayi:!!m.ayi,rejYas:m.rejYas,topHam:m.topHam,
        dagHam:m.dagHam,dip:!!m.dip,dip382:!!m.dip382,dip236:!!m.dip236,gecti:!!gecen[t][kod]};
    });
  }
  if(mbIst.kapsam==="hepsi"){
    /* 🐞 Satırdaki MAL / A-B değerleri EN BÜYÜK seçili dilimden gelir.
       Eskiden bu hiçbir yerde yazmıyordu; kullanıcı 7 dilim seçince satırda
       AYLIK değerleri görüp TradingView'in günlüğüyle karşılaştırıyor ve
       "tutmuyor" diyordu. Artık hangi dilim olduğu satırda yazıyor. */
    var enBuyuk=mbIst.tfler[mbIst.tfler.length-1];
    var kaynak=har[enBuyuk]||{};
    var liste=ortakListe.map(function(k){
      var o={kod:k};var m=kaynak[k]||{};
      for(var a in m)o[a]=m[a];
      o.tfDurum=serit(k);o.digerTfler=[];return o;
    }).sort(function(a,b){return (mbTazelikSay(a)-mbTazelikSay(b))||(a.kod<b.kod?-1:1)});
    var olculen=Math.min.apply(null,mbIst.tfler.map(function(t){return mbOlcumSay(t)}));
    v.kapsam="hepsi";
    v.kaynakTf=enBuyuk;
    v.gruplar=[{tf:"HEPSİ",ad:mbIst.tfler.join(" + ")+" dilimlerinin HEPSİNDE"+
      (mbIst.tfler.length>1?" · satırdaki MAL/AB değerleri "+enBuyuk+" diliminden":""),ik:"🎯",
      olculen:olculen,evren:evren,kalan:Math.max(0,evren-olculen),yas:null,
      cikan:liste.length,liste:liste.slice(0,150)}];
    return v;
  }
  v.kapsam="herhangi";
  v.gruplar=mbIst.tfler.map(function(t){
    var liste=Object.keys(gecen[t]).map(function(k){
      var o={kod:k},m=har[t][k];
      for(var a in m)o[a]=m[a];
      o.tfDurum=serit(k);
      o.digerTfler=mbIst.tfler.filter(function(t2){return t2!==t&&gecen[t2][k]});
      return o;
    }).sort(function(a,b){return (mbTazelikSay(a)-mbTazelikSay(b))||(a.kod<b.kod?-1:1)});
    return{tf:t,ad:TFAD[t][0],ik:TFAD[t][1],olculen:mbOlcumSay(t),evren:evren,
      kalan:Math.max(0,evren-mbOlcumSay(t)),yas:null,cikan:liste.length,liste:liste.slice(0,120)};
  });
  return v;
}
/* ═══ 🕒 ÖZEL DİLİM YOLU ═══════════════════════════════════════════════
   En az bir modülde kendi dilimi seçildiyse buraya düşülür. Her aktif
   modül KENDİ dilim listesinde (kapsam=hepsi→kesişim, herhangi→birleşim)
   geçenleri bulur; modüller arası VE hâlâ geçerli — sadece artık her
   modül kendi zaman dilimine bakıyor. Pivot zaten bağımsızdı, aynen
   kullanılır. Paketin ŞEKLİ (alan adları) GENEL yolla birebir aynı
   tutuldu ki ekran/kart çizim kodu hiç değişmesin. */
function mbPaketUretOzel(){
  var TFAD={"5DK":["5 dakika","⚡"],"15DK":["15 dakika","⏱"],"1SA":["1 saat","🕐"],
    "4SA":["4 saat","🕓"],"1G":["1 gün","🗓"],"1HAF":["1 hafta","📅"],"1AY":["1 ay","🗂"]};
  var SIRA=MB_TF_SIRA;
  var evren=mbEvrenKod?mbEvrenKod.length:0;
  var dilimler=SIRA.map(function(t){return{tf:t,ad:TFAD[t][0],ik:TFAD[t][1],
    olculen:mbOlcumSay(t),evren:evren,yas:null}});
  var sozluk={tfler:SIRA.map(function(t){return{tf:t,ad:TFAD[t][0],ik:TFAD[t][1]}})};
  var v={ok:true,sozluk:sozluk,dilimler:dilimler,calisiyor:true,
    evrenBilgi:{sayi:evren,kaynak:mbEvrenKaynak},ortak:[],gruplar:[]};

  var MOD_LISTE=[
    {k:"mal",   ist:mbIst.mal,   cond:mbCondMal},
    {k:"dip",   ist:mbIst.dip,   cond:mbCondDip},
    {k:"bolge", ist:mbIst.bolge, cond:mbCondBolge},
    {k:"enerji",ist:mbIst.enerji,cond:mbEnerjiGecti},
    {k:"ab",    ist:mbIst.ab,    cond:mbCondAb}
  ];
  var aktifler=MOD_LISTE.filter(function(m){return m.ist&&m.ist.acik});
  var pivotAktif=!!(mbIst.pivot&&mbIst.pivot.acik);
  if(!aktifler.length&&!pivotAktif)return v;

  var tumTf=mbEfektifTfler();
  var har={};
  tumTf.forEach(function(t){har[t]=mbOlcum[t]||{}});

  /* Her modül kendi dilim kümesinde geçenleri bulur.
     🔒 KİLİT FİX (Ağustos 2026) — "boğa filtresine ayı sızması":
     Eskiden yalnızca kod bazında geçti/geçmedi (true/false) tutuluyordu;
     HANGİ dilimde geçtiği unutuluyordu. Aşağıdaki satırlarda ise kartta
     gösterilen boğa/ayı/oran değerleri HER ZAMAN "en büyük seçili dilim"den
     (enBuyuk) okunuyordu — modülün asıl geçtiği dilimden değil. Sonuç:
     bir hisse örn. 1SA'da boğa+bölge şartını gerçekten sağlayıp listeye
     girebiliyordu, ama kartta 1G ya da 1HAF gibi daha büyük bir dilimin
     (o an AYI olan) verisi basılıyordu — filtre doğruydu, gösterim
     yanlış hisseyi/dilimi gösteriyordu. Artık her modül, kodun HANGİ
     dilim(ler)de geçtiğini de (modGecenTf) ayrıca kaydediyor; gösterim
     bu bilgiden kurulur (aşağıda). */
  var modGecen={}, modGecenTf={};
  aktifler.forEach(function(m){
    var tfl=mbModTf(m.ist);
    var birlesim=mbIst.kapsam!=="hepsi";     /* herhangi=birleşim, hepsi=kesişim */
    var sonuc=null, gecTf={};
    tfl.forEach(function(t){
      var h=har[t]||{},s={};
      for(var k in h)if(m.cond(h[k],mbIst)){s[k]=true;(gecTf[k]=gecTf[k]||[]).push(t)}
      if(sonuc===null){sonuc={};for(var k1 in s)sonuc[k1]=true}
      else if(birlesim){for(var k2 in s)sonuc[k2]=true}
      else{var y={};for(var k3 in sonuc)if(s[k3])y[k3]=true;sonuc=y}
    });
    modGecen[m.k]=sonuc||{};
    modGecenTf[m.k]=gecTf;
  });

  var pivotGecen=null;
  if(pivotAktif){
    pivotGecen={};
    (mbEvrenKod||[]).forEach(function(kod){if(mbPivotGecti(kod,mbIst))pivotGecen[kod]=true});
  }

  /* Modüller arası VE (eskisiyle aynı kural — sadece artık her modül
     kendi diliminde ölçülmüş oluyor) */
  var ortakObj=null;
  aktifler.forEach(function(m){
    var s=modGecen[m.k];
    if(ortakObj===null){ortakObj={};for(var k in s)ortakObj[k]=true}
    else{var y={};for(var k2 in ortakObj)if(s[k2])y[k2]=true;ortakObj=y}
  });
  if(pivotAktif){
    if(ortakObj===null){ortakObj={};for(var k3 in pivotGecen)ortakObj[k3]=true}
    else{var y2={};for(var k4 in ortakObj)if(pivotGecen[k4])y2[k4]=true;ortakObj=y2}
  }
  var ortakListe=Object.keys(ortakObj||{}).sort();
  v.ortak=ortakListe;

  /* Satırda gösterilecek MAL/AB değerleri: eskiden KOŞULSUZ en büyük seçili
     dilimden okunuyordu (aşağıdaki enBuyuk hâlâ SON ÇARE / geriye dönük
     uyumluluk içindir). 🔒 KİLİT FİX: "bölge" ya da "ab" modülü aktifse —
     yani ekranda boğa/ayı/oran gibi 571-rejim alanları GÖSTERİLECEKSE —
     her kod için o modülün GERÇEKTEN geçtiği dilim kullanılır. Böylece
     kartta yazan boğa/ayı değeri, o hisseyi listeye sokan koşulla HER
     ZAMAN birebir aynı dilime ait olur; başka bir dilimin (çelişen)
     rejimi asla karta sızamaz. */
  var enBuyuk=tumTf.length?tumTf[tumTf.length-1]:(mbIst.tfler[mbIst.tfler.length-1]||"1G");
  var oncelikliMod=aktifler.some(function(m){return m.k==="bolge"})?"bolge":
                    (aktifler.some(function(m){return m.k==="ab"})?"ab":null);
  function enBuyukTf(liste){
    if(!liste||!liste.length)return null;
    for(var i=tumTf.length-1;i>=0;i--)if(liste.indexOf(tumTf[i])>=0)return tumTf[i];
    return liste[liste.length-1];
  }
  function gosterimTf(kod){
    if(oncelikliMod){
      var g=(modGecenTf[oncelikliMod]||{})[kod];
      var t=enBuyukTf(g);
      if(t)return t;
    }
    return enBuyuk;   /* geriye dönük son çare — hiçbir modül geçiş dilimi bulamadıysa */
  }
  var kaynakGenel=har[enBuyuk]||{};
  function serit(kod){
    return tumTf.map(function(t){
      var m=har[t][kod];
      if(!m)return{tf:t,yok:true};
      return{tf:t,boga:!!m.boga,ayi:!!m.ayi,rejYas:m.rejYas,topHam:m.topHam,
        dagHam:m.dagHam,dip:!!m.dip,dip382:!!m.dip382,dip236:!!m.dip236,gecti:true};
    });
  }
  var liste=ortakListe.map(function(k){
    var gtf=gosterimTf(k);
    var kaynak=(gtf&&har[gtf])||kaynakGenel;
    var o={kod:k,gosterimTf:gtf||enBuyuk},m=kaynak[k]||kaynakGenel[k]||{};
    for(var a in m)o[a]=m[a];
    o.tfDurum=serit(k);o.digerTfler=[];return o;
  }).sort(function(a,b){return (mbTazelikSay(a)-mbTazelikSay(b))||(a.kod<b.kod?-1:1)});

  var olculen=tumTf.length?Math.min.apply(null,tumTf.map(function(t){return mbOlcumSay(t)})):0;
  var aciklama=aktifler.map(function(m){return m.k+"("+mbModTf(m.ist).join("+")+")"}).join(", ")+
    (pivotAktif?", pivot("+mbIst.pivot.dilimler.join("+")+")":"");
  v.kapsam="hepsi";
  v.kaynakTf=enBuyuk;
  v.ozelDilim=true;      /* çizim tarafına "her modül kendi dilimini kullanıyor" bilgisini taşır */
  v.gruplar=[{tf:"HEPSİ",ad:"Her modül kendi dilimi: "+aciklama+
    (oncelikliMod?" · satırdaki boğa/ayı/oran değerleri her hissenin KENDİ geçtiği "+oncelikliMod+" dilimden (kilitli)":
    " · satırdaki değerler "+enBuyuk+" diliminden"),ik:"🎯",
    olculen:olculen,evren:evren,kalan:Math.max(0,evren-olculen),yas:null,
    cikan:liste.length,liste:liste.slice(0,150)}];
  return v;
}
/* ── Tarama döngüsü ── */
var MB_KANAL=3;              /* aynı anda yolda kaç istek */
var MB_PARCA=16;             /* bir istekte kaç hisse (sunucu tavanı 16) */
var MB_ISTEK_ZAMAN=20000;    /* bir parça bu kadar sürerse askıda sayılır */
var MB_HATA_TAVAN=60;        /* bu kadar hatadan sonra tarama durur */
var mbNobetci=null;

function mbKuyrukKur(){
  var k=[];
  var tfl=mbEfektifTfler();
  for(var i=0;i<tfl.length;i++){
    var tf=tfl[i];
    /* Zaten ölçülmüş hisseleri yeniden isteme — tazeleme mbOlcum'u boşaltır */
    var var_=mbOlcum[tf]||{};
    var eksik=[];
    for(var j=0;j<mbEvrenKod.length;j++){
      var kod=mbEvrenKod[j];
      if(!var_[kod])eksik.push(kod);
    }
    for(var b=0;b<eksik.length;b+=MB_PARCA)
      k.push({tf:tf,kodlar:eksik.slice(b,b+MB_PARCA)});
  }
  return k;
}
function mbTaraBaslat(){
  if(mbTaraDurum&&mbTaraDurum.suruyor){mbTaraDurum.suruyor=false;mbNobetciKapat();mbCizYenile();return}
  if(!mbEfektifTfler().length){mbCizYenile();return}
  if(!mbEvrenKod){
    el("govde").innerHTML='<div class="yukleniyor">hisse listesi alınıyor…</div>';
    post("/api/malboga",{is:"evren"}).then(function(r){
      if(!r||!r.ok||!r.kodlar||!r.kodlar.length){
        mbTaraDurum=null;el("govde").innerHTML='<div class="bos">Hisse listesi alınamadı.</div>';return}
      mbEvrenKod=r.kodlar;mbEvrenKaynak=r.kaynak||"";
      mbTaraBaslat();
    }).catch(function(){mbTaraDurum=null;
      el("govde").innerHTML='<div class="bos">Bağlantı kurulamadı.</div>'});
    return;
  }
  mbTaraDurum={suruyor:true,tf:mbEfektifTfler()[0],baslangic:Date.now(),hata:0,
               acik:0,onbellekten:0,kuyruk:mbKuyrukKur(),ucusta:[],sonHareket:Date.now()};
  mbNobetciKur();
  mbTaraTur();
}
/* ⏱ NÖBETÇİ — askıda kalan parçaları kuyruğa geri koyar ve döngüyü iter.
   İkinci görevi: kullanıcı sekmeden çıkıp döndüğünde taramayı sürdürmek. */
function mbNobetciKur(){
  if(mbNobetci)return;
  mbNobetci=setInterval(function(){
    var d=mbTaraDurum;
    if(!d||!d.suruyor){mbNobetciKapat();return}
    if(sekme!=="malboga")return;          /* sekme dışında bekle, iptal etme */
    var simdi=Date.now(),kurtarilan=0;
    for(var i=d.ucusta.length-1;i>=0;i--){
      if(simdi-d.ucusta[i].ts>MB_ISTEK_ZAMAN){
        var u=d.ucusta.splice(i,1)[0];
        u.olu=true;                        /* geç gelen cevap sayılmasın */
        d.kuyruk.push({tf:u.tf,kodlar:u.kodlar});
        d.acik=Math.max(0,d.acik-1);
        d.hata++;kurtarilan++;
      }
    }
    if(kurtarilan)mbCizYenile();
    /* Hiçbir kanal yolda değilse ama iş varsa döngü ölmüş demektir — ittir. */
    if(d.acik===0&&d.kuyruk.length)mbTaraTur();
    else if(d.acik===0&&!d.kuyruk.length){d.suruyor=false;mbSonTarama=Date.now();
      mbNobetciKapat();mbCizYenile()}
  },4000);
}
function mbNobetciKapat(){if(mbNobetci){clearInterval(mbNobetci);mbNobetci=null}}
function mbTaraTur(){
  var d=mbTaraDurum;
  if(!d||!d.suruyor)return;
  /* Sekme dışındayken YENİ istek açma ama taramayı da iptal etme —
     nöbetçi, sekmeye dönülünce kaldığı yerden sürdürür. */
  if(sekme!=="malboga")return;
  while(d.acik<MB_KANAL&&d.kuyruk.length){
    var is=d.kuyruk.shift();
    d.acik++;d.tf=is.tf;
    var kayit={tf:is.tf,kodlar:is.kodlar,ts:Date.now(),olu:false};
    d.ucusta.push(kayit);
    (function(is2,kyt){
      var bitir=function(){
        if(kyt.olu)return true;            /* nöbetçi çoktan kurtardı */
        kyt.olu=true;
        var y=d.ucusta.indexOf(kyt);if(y>=0)d.ucusta.splice(y,1);
        d.acik=Math.max(0,d.acik-1);
        d.sonHareket=Date.now();
        return false;
      };
      post("/api/malboga",{is:"olc",tf:is2.tf,kodlar:is2.kodlar}).then(function(r){
        if(bitir())return;
        if(!mbTaraDurum||!mbTaraDurum.suruyor)return;
        if(r&&r.ok&&r.olcum){
          if(!mbOlcum[is2.tf])mbOlcum[is2.tf]={};
          for(var k in r.olcum)mbOlcum[is2.tf][k]=r.olcum[k];
          if(r.onbellekten)d.onbellekten=(d.onbellekten||0)+r.onbellekten;
          /* Sunucu istenenlerin hepsini döndürmediyse eksikler kuyruğa döner */
          var eksik=[];
          for(var i2=0;i2<is2.kodlar.length;i2++)
            if(!mbOlcum[is2.tf][is2.kodlar[i2]])eksik.push(is2.kodlar[i2]);
          if(eksik.length&&d.hata<MB_HATA_TAVAN){d.hata++;d.kuyruk.push({tf:is2.tf,kodlar:eksik})}
        }else{
          d.hata++;
          if(d.hata<MB_HATA_TAVAN)d.kuyruk.push({tf:is2.tf,kodlar:is2.kodlar});
        }
        mbCizYenile();
        setTimeout(mbTaraTur,20);
      }).catch(function(){
        if(bitir())return;
        if(!mbTaraDurum||!mbTaraDurum.suruyor)return;
        d.hata++;
        /* Başarısız parça KUYRUĞA GERİ — imleç geri sarma yok, kayıp yok. */
        if(d.hata<MB_HATA_TAVAN){d.kuyruk.push({tf:is2.tf,kodlar:is2.kodlar});
          mbCizYenile();setTimeout(mbTaraTur,1200);
        }else{d.suruyor=false;mbNobetciKapat();mbCizYenile()}
      });
    })(is,kayit);
  }
  /* iş kalmadı ve uçuşta istek yoksa bitti */
  if(!d.acik&&!d.kuyruk.length){d.suruyor=false;mbSonTarama=Date.now();
    mbNobetciKapat();mbCizYenile()}
}
function mbCizYenile(){mbD=mbPaketUret();mbGoster(mbD)}
/* MAL hücresi — Pine tablosuyla aynı: toplama yaşı 5 barı geçtiyse "-" */
function mbMalHucre(x){
  if(x.top<9999)return{t:(x.top===0?"TOP☀":"TOP")+" "+x.top+"B",r:x.top<=2?"var(--yes)":"#40E0D0"};
  if(x.dag<9999)return{t:(x.dag===0?"DAĞ☀":"DAĞ")+" "+x.dag+"B",r:"var(--kir)"};
  if(x.topHam<9999||x.dagHam<9999){
    var top=x.topHam<=x.dagHam;
    return{t:(top?"top ":"dağ ")+(top?x.topHam:x.dagHam)+"B",r:"#6b7280"};
  }
  return{t:"-",r:"#6b7280"};
}
function mbAbHucre(x){
  if(x.boga)return{t:"🐂 "+x.rejYas+"B",r:"var(--yes)"};
  if(x.ayi) return{t:"🐻 "+x.rejYas+"B",r:"var(--kir)"};
  return{t:"?",r:"#6b7280"};
}
function mbCip(attr,ad,ac,pas){
  return '<button class="sir'+(ac?" on":"")+'" '+attr+' style="'+
    (ac?"background:var(--yes);color:#04140a;font-weight:800;":"")+
    (pas?"opacity:.4;":"")+'">'+ad+'</button>';
}
/* Modül başlığı — sağda aç/kapa tiki */
function mbModulBas(id,ik,ad,acik){
  return '<div style="display:flex;align-items:center;gap:8px;margin-bottom:'+(acik?"8px":"0")+'">'+
    '<div style="flex:1;font-weight:800;font-size:14px;'+(acik?"":"opacity:.5")+'">'+ik+' '+ad+'</div>'+
    '<button class="sir" data-mbmod="'+id+'" style="padding:4px 12px;font-size:16px;'+
    (acik?"background:var(--yes);color:#04140a;font-weight:800":"opacity:.6")+'">'+
    (acik?"✓":"○")+'</button></div>';
}
/* Modülün kendi zaman dilimi seçici şeridi — "Genel" ya da modüle özel
   dilimler. Genel seçiliyken bu modül en üstteki 🕒 Zaman dilimleri
   kutusunu kullanır; özel seçilirse kendi dilimiyle bağımsız çalışır. */
function mbModulTfSatir(mod,dilimler){
  var ozel=mbModOzelMi(mbIst[mod]);
  var h='<div class="altbilgi" style="margin:8px 0 3px;opacity:.7">🕒 Bu modülün zaman dilimi</div>'+
    '<div class="sirala" style="flex-wrap:wrap">'+
    mbCip('data-mbmodtfg="'+mod+'"','🌐 Genel ('+E(mbIst.tfler.join(","))+')',!ozel);
  dilimler.forEach(function(t){
    h+=mbCip('data-mbmodtf="'+mod+':'+t.tf+'"',E(t.ik+" "+t.tf),
      ozel&&mbIst[mod].tfler.indexOf(t.tf)>=0);
  });
  return h+'</div>';
}
/* 0B 1B 2B 3B 4B + elle kutu + sınırsız */
function mbYasSatir(mod,st){
  var h='<div class="sirala" style="flex-wrap:wrap">';
  MB_BAR.forEach(function(n){
    h+=mbCip('data-mbyas="'+mod+':'+n+'"',n+"B",!st.sinirsiz&&st.n===n)});
  h+='<input data-mbelle="'+mod+'" type="number" min="0" max="500" step="1" placeholder="elle" '+
     'value="'+((!st.sinirsiz&&MB_BAR.indexOf(st.n)<0)?E(String(st.n)):"")+'" '+
     'style="width:72px;background:var(--kart);border:1px solid var(--ciz);color:var(--yazi);'+
     'border-radius:7px;padding:5px 7px;font-size:13px;text-align:right">';
  h+=mbCip('data-mbsinir="'+mod+'"',"sınırsız",st.sinirsiz);
  return h+'</div>';
}
function mbGoster(v,yerel){
  var sz=(v&&v.sozluk)||{tfler:[]}, dilimler=(v&&v.dilimler)||[];
  var gruplar=(v&&v.gruplar)||[], ortak=(v&&v.ortak)||[];
  var calisiyor=!v||v.calisiyor!==false;
  var h="";
  /* ── 1) ZAMAN DİLİMLERİ ── */
  h+='<div class="kutu" style="margin-top:0;border-left:3px solid var(--yes)">'+
     '<div style="display:flex;align-items:center;gap:8px;margin-bottom:7px">'+
     '<div style="flex:1;font-weight:800;font-size:14px">🕒 Zaman dilimleri</div>'+
     '<button class="sir" id="mbTfHepsi" style="padding:4px 10px">'+
     (mbIst.tfler.length===dilimler.length?"hiçbiri":"hepsi")+'</button></div>'+
     '<div class="sirala" style="flex-wrap:wrap">';
  dilimler.forEach(function(t){
    h+=mbCip('data-mbtf="'+E(t.tf)+'"',
      E(t.ik+" "+t.ad)+(t.olculen?' <span style="opacity:.72;font-size:11px">'+t.olculen+'</span>':""),
      mbIst.tfler.indexOf(t.tf)>=0)});
  h+='</div>';
  /* Birden çok dilim seçiliyken en kritik ayar: hepsinde mi, birinde mi?
     (genelde >1 ya da bir modülün kendi seçiminde >1 varsa gösterilir,
     çünkü bu ayar her iki durumda da o modülün kesişim/birleşim kuralını
     belirler) */
  var mbCoklu=mbIst.tfler.length>1||mbModTf(mbIst.mal).length>1||mbModTf(mbIst.dip).length>1||
    mbModTf(mbIst.bolge).length>1||mbModTf(mbIst.enerji).length>1||mbModTf(mbIst.ab).length>1;
  if(mbCoklu){
    h+='<div class="altbilgi" style="margin:10px 0 5px;opacity:.85">Seçili '+mbIst.tfler.length+' dilimde şart nasıl aransın?</div>'+
       '<div class="sirala" style="flex-wrap:wrap">'+
       mbCip('data-mbkapsam="hepsi"','✅ HEPSİNDE tutsun',mbIst.kapsam==="hepsi")+
       mbCip('data-mbkapsam="herhangi"','➕ HERHANGİ birinde',mbIst.kapsam==="herhangi")+
       '</div>'+
       '<div class="altbilgi" style="margin-top:5px;opacity:.7;white-space:normal">'+
       (mbIst.kapsam==="hepsi"
         ?"Hisse, seçtiğin dilimlerin <b>hepsinde</b> şartı tutmalı. Tek liste çıkar, her satırda dilim dilim durum yazar."
         :"Hisse, dilimlerden <b>birinde</b> tutsa yeter. Her dilim ayrı kart olur — bir dilimde boğa olan hisse başka dilimde ayı olabilir.")+
       '</div>';
  }
  h+='</div>';
  /* ── 2) MAL TARAMA ── */
  h+='<div class="kutu" style="margin:8px 0">'+mbModulBas("mal","📦","MAL TARAMA",mbIst.mal.acik);
  if(mbIst.mal.acik){
    h+='<div class="sirala" style="flex-wrap:wrap">'+
       mbCip('data-mbmalyon="top"',"📦 Toplama",mbIst.mal.top)+
       mbCip('data-mbmalyon="dag"',"📤 Dağıtım",mbIst.mal.dag)+
       mbCip('data-mbtemiz="1"',"temiz",mbIst.mal.temiz)+'</div>';
    h+='<div class="altbilgi" style="margin:8px 0 5px;opacity:.7">en fazla kaç bar önce</div>';
    h+=mbYasSatir("mal",mbIst.mal);
    h+=mbModulTfSatir("mal",dilimler);
  }
  h+='</div>';
  /* ── 3) DİP TARAMA ── */
  h+='<div class="kutu" style="margin:8px 0">'+mbModulBas("dip","⬇️","DİP TARAMA",mbIst.dip.acik);
  if(mbIst.dip.acik){
    h+='<div class="sirala" style="flex-wrap:wrap">';
    MB_KADEME.forEach(function(k){
      h+=mbCip('data-mbkademe="'+k[0]+'"',k[1],mbIst.dip.kademe===k[0])});
    h+='</div>';
    h+=mbModulTfSatir("dip",dilimler);
  }
  h+='</div>';
  /* ── 4) AYI/BOĞA TARAMA ── */
  h+='<div class="kutu" style="margin:8px 0">'+mbModulBas("ab","🐂🐻","AYI / BOĞA TARAMA",mbIst.ab.acik);
  if(mbIst.ab.acik){
    h+='<div class="sirala" style="flex-wrap:wrap">'+
       mbCip('data-mbabyon="boga"',"🐂 Boğa",mbIst.ab.boga)+
       mbCip('data-mbabyon="ayi"',"🐻 Ayı",mbIst.ab.ayi)+'</div>';
    h+='<div class="altbilgi" style="margin:8px 0 5px;opacity:.7">bu rejime en fazla kaç bar önce geçilmiş</div>';
    h+=mbYasSatir("ab",mbIst.ab);
    h+=mbModulTfSatir("ab",dilimler);
  }
  h+='</div>';
  /* ── 3b) FİBO BÖLGESİ ── */
  h+='<div class="kutu" style="margin:8px 0">'+mbModulBas("bolge","🪜","SEVİYE BÖLGESİ",mbIst.bolge.acik);
  if(mbIst.bolge.acik){
    h+='<div class="altbilgi" style="margin-bottom:7px;white-space:normal;opacity:.75">'+
       'Fiyat merdivenin hangi ana bölgesinde? Sınırlar TradingView’deki çizgi adlarının aynısı.</div>'+
       '<div style="display:flex;flex-direction:column;gap:5px">';
    MB_BOLGE.forEach(function(b){
      var ac=mbIst.bolge.secili.indexOf(b.id)>=0;
      h+='<button class="sir'+(ac?" on":"")+'" data-mbbolge="'+b.id+'" '+
         'style="text-align:left;'+(ac?"background:var(--yes);color:#04140a;font-weight:800":"")+'">'+
         b.ik+' '+E(b.ad)+' <span style="opacity:.65;font-size:11px">('+b.alt+' – '+b.ust+')</span></button>';
    });
    h+='</div>';
    h+=mbModulTfSatir("bolge",dilimler);
  }
  h+='</div>';
  /* ── 4c) ⚛ ENERJİ KIRILIMI ── */
  h+='<div class="kutu" style="margin:8px 0">'+mbModulBas("enerji","⚛","ENERJİ KIRILIMI",mbIst.enerji.acik);
  if(mbIst.enerji.acik){
    h+='<div class="altbilgi" style="margin-bottom:7px;white-space:normal;opacity:.75">'+
       'Fiyat dar bir bantta sıkıştıkça enerji birikir; bant kırılınca hareket başlar. '+
       'TradingView’deki ⚛ Enerji Taraması ile aynı motor.</div>';
    h+='<div class="sirala" style="flex-wrap:wrap">';
    MB_EZ_DURUM.forEach(function(d){
      h+=mbCip('data-mbez="'+d[0]+'" title="'+E(d[2])+'"',d[1],!!mbIst.enerji[d[0]]);
    });
    h+='</div>';
    h+='<div class="sirala" style="flex-wrap:wrap;margin-top:9px">'+
       mbCip('data-mbezm="0"','📏 Mesafe şartı',mbIst.enerji.mesafeAcik);
    if(mbIst.enerji.mesafeAcik){
      MB_EZ_MESAFE.forEach(function(n){
        h+=mbCip('data-mbezy="'+n+'"','≤%'+n,mbIst.enerji.mesafe===n)});
      h+='<input id="mbEZSerbest" type="number" min="0.1" max="30" step="0.5" placeholder="elle" '+
         'value="'+(MB_EZ_MESAFE.indexOf(mbIst.enerji.mesafe)<0?E(String(mbIst.enerji.mesafe)):"")+'" '+
         'style="width:78px;background:var(--kart);border:1px solid var(--ciz);color:var(--yazi);'+
         'border-radius:7px;padding:5px 7px;font-size:13px;text-align:right">';
    }
    h+='</div>';
    if(!(mbIst.enerji.olustu||mbIst.enerji.icinde||mbIst.enerji.b0||mbIst.enerji.b1))
      h+='<div class="altbilgi" style="margin-top:7px;color:var(--sar);white-space:normal">'+
         'Hiç durum seçili değil — yalnız mesafe şartı aranıyor (TradingView’de de böyle).</div>';
    h+=mbModulTfSatir("enerji",dilimler);
  }
  h+='</div>';
  /* ── 4b) PİVOT KIRILIM ── */
  h+='<div class="kutu" style="margin:8px 0">'+mbModulBas("pivot","📈","PİVOT KIRILIM",mbIst.pivot.acik);
  if(mbIst.pivot.acik){
    h+='<div class="altbilgi" style="margin-bottom:7px;white-space:normal;opacity:.75">'+
       'Sistemin pivot kırılım listelerini süzer — yeniden ölçüm yapmaz, anında sonuç verir.</div>';
    h+='<div class="sirala" style="flex-wrap:wrap">';
    MB_PIVOT_DILIM.forEach(function(p){
      h+=mbCip('data-mbpd="'+p[0]+'"',p[4]+' '+p[0]+' <span style="opacity:.7;font-size:11px">'+p[3]+'</span>',
        mbIst.pivot.dilimler.indexOf(p[0])>=0);
    });
    h+='</div>';
    h+='<div class="altbilgi" style="margin:9px 0 5px;opacity:.8">Hangi durum?</div>'+
       '<div class="sirala" style="flex-wrap:wrap">'+
       mbCip('data-mbpdurum="kirdi"','⚡ Son barda kırdı',mbIst.pivot.kirdi)+
       mbCip('data-mbpdurum="yakin"','🎯 Kırılıma yakın',mbIst.pivot.yakin)+
       mbCip('data-mbpdurum="uzerinde"','✅ Kırılımın üzerinde',mbIst.pivot.uzerinde)+
       '</div>';
    if(mbIst.pivot.yakin){
      h+='<div class="altbilgi" style="margin:9px 0 5px;opacity:.8">Kırılıma en fazla yüzde kaç kalmış?</div>'+
         '<div class="sirala" style="flex-wrap:wrap">';
      [1,2,3,5,10].forEach(function(n){
        h+=mbCip('data-mbpy="'+n+'"','%'+n,mbIst.pivot.yuzde===n)});
      h+='<input id="mbPYSerbest" type="number" min="0.1" max="50" step="0.5" placeholder="elle" '+
         'value="'+([1,2,3,5,10].indexOf(mbIst.pivot.yuzde)<0?E(String(mbIst.pivot.yuzde)):"")+'" '+
         'style="width:78px;background:var(--kart);border:1px solid var(--ciz);color:var(--yazi);'+
         'border-radius:7px;padding:5px 7px;font-size:13px;text-align:right"></div>';
    }
  }
  h+='</div>';
  /* ── 5) DÜĞMELER ── */
  h+='<div class="sirala" style="flex-wrap:wrap;margin:8px 0">'+
     '<button class="'+((mbTaraDurum&&mbTaraDurum.suruyor)?"sir":"dg")+'" id="mbTaraBtn" style="width:auto;padding:9px 16px">'+
     ((mbTaraDurum&&mbTaraDurum.suruyor)?"⏹ Durdur":"🔄 Şimdi tazele")+'</button>'+
     '</div>';
  /* ── tarama durumu ── */
  var ilr=mbIlerleme();
  if(mbTaraDurum&&mbTaraDurum.suruyor){
    var yuz=ilr.gereken?Math.min(100,Math.round(100*ilr.olculen/ilr.gereken)):0;
    var gecen=Math.round((Date.now()-mbTaraDurum.baslangic)/1000);
    var kalanSn=ilr.olculen>20?Math.round(gecen*(ilr.gereken-ilr.olculen)/ilr.olculen):null;
    h+='<div class="kutu" style="margin:8px 0;border-left:3px solid var(--sar)">'+
      '<div class="altbilgi"><b>🔎 Taranıyor…</b> şu an '+E(mbTaraDurum.tf)+' dilimi<br>'+
      ilr.olculen+' / '+ilr.gereken+' ölçüm · '+gecen+' sn'+
      (kalanSn!==null?' · yaklaşık '+kalanSn+' sn kaldı':'')+
      (mbTaraDurum.kuyruk?' · '+mbTaraDurum.kuyruk.length+' parça sırada':'')+
      (mbTaraDurum.hata?' · <span style="color:var(--kir)">'+mbTaraDurum.hata+' yeniden deneme</span>':'')+'</div>'+
      '<div style="height:8px;background:var(--ciz);border-radius:5px;overflow:hidden;margin-top:7px">'+
      '<div style="height:100%;width:'+yuz+'%;background:var(--yes);transition:width .25s"></div></div>'+
      '<div class="altbilgi" style="margin-top:6px;opacity:.7">Sekmede kaldığın sürece sürer. '+
      'Sonuçlar aşağıda dolarken de süzülür.</div></div>';
  }else if(ilr.olculen<ilr.gereken&&mbEfektifTfler().length){
    h+='<div class="kutu" style="margin:8px 0"><div class="altbilgi">'+
      'Ölçülen: <b>'+ilr.olculen+'</b> / '+ilr.gereken+' — tarama birazdan tamamlanır.</div></div>';
  }else if(ilr.olculen&&mbSonTarama){
    var dk=Math.round((Date.now()-mbSonTarama)/60000);
    h+='<div class="altbilgi" style="margin:6px 0;opacity:.65">'+
      ilr.olculen+' ölçüm hazır · '+(dk<1?"az önce":dk+" dk önce")+' tarandı · '+
      'kendiliğinden tazelenir</div>';
  }
  /* ── 6) TEK HİSSE ── */
  h+='<div class="kutu" style="margin:8px 0;padding:9px 11px">'+
     '<div style="display:flex;gap:6px">'+
     '<input id="mbKod" placeholder="Tek hisse: THYAO" maxlength="6" autocapitalize="characters" '+
     'style="flex:1;background:var(--kart);border:1px solid var(--ciz);color:var(--yazi);border-radius:7px;padding:7px 9px;font-size:14px;text-transform:uppercase">'+
     '<button class="dg" id="mbKodBtn" style="width:auto;padding:7px 14px">🔎 Bak</button></div></div>';
  /* ── 7) HİÇ MODÜL AÇIK DEĞİLSE ── */
  var acikSayi=(mbIst.mal.acik?1:0)+(mbIst.dip.acik?1:0)+(mbIst.ab.acik?1:0)+
    (mbIst.bolge.acik?1:0)+(mbIst.pivot.acik?1:0)+(mbIst.enerji.acik?1:0);
  if(!acikSayi){
    h+='<div class="bos"><b>Hiç modül açık değil</b><br><br>'+
       'Yukarıdaki altı modülden (📦 mal · ⬇️ dip · 🐂🐻 ayı/boğa · 🪜 seviye bölgesi · '+
       '⚛ enerji · 📈 pivot) en az birinin sağındaki <b>○</b> tikine dokun.</div>';
    el("govde").innerHTML=h;mbBagla(v,dilimler);return;
  }
  if(!mbEfektifTfler().length){
    h+='<div class="bos"><b>Zaman dilimi seçilmedi</b><br><br>En üstten en az bir dilim seç, ya da bir modülün kendi dilimini aç.</div>';
    el("govde").innerHTML=h;mbBagla(v,dilimler);return;
  }
  /* ── 8) HEPSİNDE ÇIKANLAR ── */
  if(!mbHerhangiOzelTf()&&mbIst.kapsam!=="hepsi"&&mbIst.tfler.length>1&&ortak.length){
    h+='<div class="kutu" style="margin:10px 0;border-left:3px solid #ffea00">'+
       '<div style="font-weight:800;font-size:14px;margin-bottom:5px">⭐ Seçili '+
       mbIst.tfler.length+' dilimin HEPSİNDE çıkanlar ('+ortak.length+')</div>'+
       '<div style="display:flex;flex-wrap:wrap;gap:5px">'+
       ortak.map(function(k){return '<span class="rozet" style="background:#ffea00;color:#161b22;font-weight:800">'+E(k)+'</span>'}).join("")+
       '</div></div>';
  }
  /* ── 9) DİLİM DİLİM SONUÇLAR ── */
  gruplar.forEach(function(g){
    h+='<div style="margin:12px 0 5px;display:flex;align-items:baseline;gap:8px">'+
       '<span style="font-weight:800;font-size:15px">'+E(g.ik+" "+g.ad)+'</span>'+
       '<span class="altbilgi" style="opacity:.75">'+g.cikan+' hisse · '+g.olculen+'/'+g.evren+' ölçüldü'+
       (g.yas!=null?' · '+g.yas+' dk önce':"")+'</span></div>';
    if(!g.liste.length){
      h+='<div class="altbilgi" style="opacity:.55;padding:4px 0 8px">— bu dilimde şartları tutan yok —</div>';
      return;
    }
    h+=g.liste.map(function(x){
      var mal=mbMalHucre(x), ab=mbAbHucre(x);
      var kenar=x.boga?"var(--yes)":(x.ayi?"var(--kir)":"var(--ciz)");
      var olay=(x.mt||x.md||x.bogaGec||x.ayiGec);
      var dip=x.dip236?"⬇️⬇️⬇️":x.dip382?"⬇️⬇️":x.dip?"⬇️":"";
      /* Dilim şeridi — hangi dilimde ne durumda olduğu satırda görünür,
         böylece "acaba şu dilimde ayı mı" sorusu doğmaz. */
      /* Şerit YALNIZ birden çok dilim seçiliyken anlamlı. Tek dilimde
         alttaki MAL/AB satırıyla aynı şeyi tekrar ediyordu ve "35 t3" gibi
         okunmaz görünüyordu. */
      var serit="";
      if(x.tfDurum&&x.tfDurum.length>1){
        serit='<div style="display:flex;flex-wrap:wrap;gap:3px;margin:4px 0 2px">'+
          x.tfDurum.map(function(d){
            if(d.yok)return '<span style="font-size:10px;padding:1px 4px;border-radius:4px;background:rgba(139,148,158,.18);color:#8b949e">'+E(d.tf)+' —</span>';
            var im=d.boga?"🐂":d.ayi?"🐻":"?";
            var rk=d.gecti?"rgba(0,230,118,.20)":"rgba(248,81,73,.16)";
            var yz=d.gecti?"var(--yes)":"var(--kir)";
            /* MAL yaşı da yazılır: her dilimi TradingView ile doğrudan
               karşılaştırabilmek için. top=toplama, dağ=dağıtım. */
            /* Okunur biçim:  1G 🐂12b · TOP 7b
               "12b" = 12 bardır boğa · "TOP 7b" = 7 bar önce mal toplama */
            var mal="";
            if(d.topHam!==undefined&&d.dagHam!==undefined){
              var t=Number(d.topHam),g=Number(d.dagHam);
              if(t<9999||g<9999)mal=" · "+(t<=g?"TOP "+t:"DAĞ "+g)+"b";
            }
            return '<span style="font-size:10px;padding:2px 5px;border-radius:4px;background:'+rk+';color:'+yz+';font-weight:700">'+
              E(d.tf)+' '+im+E(String(d.rejYas===undefined?"":d.rejYas))+'b'+E(mal)+'</span>';
          }).join("")+'</div>';
      }
      return '<div class="satir" style="border-left-color:'+kenar+';align-items:flex-start">'+
        '<div class="sol"><div class="kod">'+E(x.kod)+
        (x.takipte?' <span class="rozet">⭐</span>':"")+
        (olay?' <span class="rozet" style="background:var(--yes);color:#04140a">☀</span>':"")+
        (dip?' <span class="rozet">'+dip+'</span>':"")+'</div>'+
        mbEnerjiRozet(x,mbIst)+
        (function(){var bl=mbBolgeBul(x.oran);
          return bl?'<div style="margin:4px 0 2px"><span style="font-size:10px;padding:2px 5px;'+
            'border-radius:4px;background:rgba(124,77,255,.15);color:#b39dff;font-weight:700">'+
            bl.ik+' '+E(bl.ad)+(x.oran!=null?' · '+Number(x.oran).toFixed(2):'')+'</span></div>':""})()+
        (mbIst.pivot.acik?mbPivotRozet(x.kod,mbIst):"")+
        serit+
        ((x.digerTfler&&x.digerTfler.length)?
          '<div style="margin:3px 0 2px"><span class="rozet" style="background:rgba(124,77,255,.22);color:#b39dff">'+
          'ayrıca '+x.digerTfler.map(function(t){return E(t)}).join(" · ")+'</span></div>':"")+
        '<div class="altbilgi" style="white-space:normal">'+
        '<b style="color:'+mal.r+'">MAL '+E(mal.t)+'</b> · <b style="color:'+ab.r+'">REJİM '+E(ab.t)+'</b>'+
        '</div></div>'+
        '<div class="sag"><div class="yuzde" style="color:'+kenar+';font-size:15px">'+E(String(x.fiyat))+'</div>'+
        '<div class="altbilgi">fiyat</div></div></div>';
    }).join("");
  });
  /* ── 10) 🔔 FİLTRE ALARMI (5 YUVA) ──
     Sonuçların hemen altında: ekranda ne görüyorsan onu alarma bağlarsın. */
  var alL=(mbAlarmD&&mbAlarmD.liste)||[];
  var alYuva=(mbAlarmD&&mbAlarmD.yuva)||5;
  h+='<div class="kutu" style="margin:14px 0 0;border-left:3px solid '+
     (alL.length?"var(--yes)":"var(--ciz)")+'">'+
     '<div style="font-weight:800;font-size:14px;margin-bottom:6px">🔔 Filtre alarmı '+
     '<span style="opacity:.6;font-weight:600;font-size:12px">'+
     (mbAlarmD===null?"yükleniyor…":alL.length+' / '+alYuva+' yuva dolu')+'</span></div>';
  if(mbAlarmD===null){
    h+='<div class="altbilgi" style="opacity:.6">alarm listesi alınıyor — sayı henüz kesinleşmedi…</div>';
  }else if(alL.length){
    h+='<div class="altbilgi" style="margin-bottom:7px">'+
       (mbAlarmD.seans?"🟢 Seans açık — listeye <b>yeni giren</b> hisseler bildiriliyor."
                      :"🌙 Seans kapalı — bildirim seans açılınca sürer.")+'</div>';
    alL.forEach(function(a,i){
      h+='<div style="display:flex;align-items:flex-start;gap:8px;padding:7px 0;'+
         (i?'border-top:1px solid var(--ciz)':'')+'">'+
         '<div style="flex:1;min-width:0'+(D.super?';cursor:pointer':'')+'"'+
         (D.super?' data-mbalyukle="'+i+'"':'')+'>'+
         '<div style="font-weight:700;font-size:13px">'+(i+1)+'. '+(a.ad?E(a.ad):E(a.ozet))+'</div>'+
         (a.ad?'<div class="altbilgi" style="opacity:.7">'+E(a.ozet)+'</div>':'')+
         '<div class="altbilgi" style="opacity:.7">'+a.tfler.map(function(t){return E(t)}).join(" · ")+'</div>'+
         (D.super?'<div class="altbilgi" style="opacity:.5">↩️ dokun — kriterleri yukarıya geri yükle</div>':'')+
         '</div>'+
         (D.super?'<button class="sir" data-mbalsil="'+E(a.id)+'" '+
           'style="padding:4px 9px;font-size:12px;flex:0 0 auto">🚫</button>':"")+
         '</div>';
    });
  }else{
    h+='<div class="altbilgi" style="margin-bottom:7px;white-space:normal">Kurulu alarm yok. '+
       'Yukarıdaki tikleri istediğin gibi ayarla, sonra bu filtreyi alarma ekle — '+
       'seans içinde listeye <b>yeni giren</b> hisseler sana bildirim olarak gider. '+
       'En fazla <b>'+alYuva+'</b> ayrı filtre aynı anda kurulu kalabilir.</div>';
  }
  if(D.super){
    h+='<div class="sirala" style="flex-wrap:wrap;margin-top:6px">'+
       '<button class="dg" id="mbAlarmKur" style="width:auto;padding:8px 14px"'+
       (alL.length>=alYuva?' disabled':'')+'>'+
       (alL.length>=alYuva?"🔔 Yuvalar dolu":"🔔 Bu filtreyi alarma ekle ("+(alL.length+1)+". yuva)")+'</button>'+
       (alL.length>1?'<button class="sir" id="mbAlarmHepsi">🚫 Hepsini kaldır</button>':"")+'</div>'+
       '<div class="altbilgi" id="mbAlarmDurum" style="margin-top:6px"></div>';
  }else{
    h+='<div class="altbilgi" style="opacity:.6">Alarm filtresi süper üyelik gerektirir.</div>';
  }
  h+='</div>';
  /* ── 11) DURUM ── */
  var eb=(v&&v.evrenBilgi)||{};
  h+='<div class="kutu" style="margin:12px 0 0;padding:9px 11px">'+
     '<div class="altbilgi" style="opacity:.8">'+(calisiyor?"🔄 Arka planda taranıyor":"⏸ Tarama durduruldu")+
     ' · 🌍 evren <b>'+(eb.sayi||0)+'</b> hisse'+(eb.kaynak?' · '+E(eb.kaynak):"")+'</div>';
  if(D.yon&&eb.rapor&&eb.rapor.length)
    h+='<div class="altbilgi" style="margin-top:4px;opacity:.55">'+
       eb.rapor.map(function(r){return E(r.ad)+":"+r.geldi+"→+"+r.yeni+(r.not?"("+E(r.not)+")":"")}).join(" · ")+'</div>';
  h+='<div class="altbilgi" style="margin-top:5px;opacity:.6">Yedi dilim arka planda sırayla taranır; '+
     'seçtiğin dilimlerden bayat olan öncelikli tazelenir.</div></div>';
  el("govde").innerHTML=h;
  mbBagla(v,dilimler);
}
/* Kurulu bir alarmın kriterlerini yukarıdaki tik/kutulara geri yükler —
   "ne ayarlamıştım" hatırlanabilsin diye. Modül-özel dilim override'ları
   alarm kaydında tutulmuyor (yalnız genel dilim listesi), o yüzden her
   modül "Genel"e döner; en azından koşulların kendisi birebir geri gelir. */
function mbAlKriterYukle(ist){
  if(!ist)return;
  mbIst.kapsam=ist.kapsam==="herhangi"?"herhangi":"hepsi";
  mbIst.tfler=(ist.tfler&&ist.tfler.length)?ist.tfler.slice():["1G"];
  ["mal","dip","ab","enerji","bolge"].forEach(function(m){
    if(!ist[m])return;
    for(var k in ist[m])mbIst[m][k]=ist[m][k];
    mbIst[m].tfler=null;
  });
  if(ist.pivot)for(var k2 in ist.pivot)mbIst.pivot[k2]=ist.pivot[k2];
}
/* Bütün tik/düğme olayları — tek yerde. */
function mbBagla(v,dilimler){
  var T=function(sec,fn){[].forEach.call(document.querySelectorAll(sec),function(b){
    b.onclick=function(){tit();fn(b)}})};
  T("[data-mbtf]",function(b){
    var t=b.dataset.mbtf,i=mbIst.tfler.indexOf(t);
    if(i>=0)mbIst.tfler.splice(i,1);else mbIst.tfler.push(t);
    mbUygula()});
  var hp=el("mbTfHepsi");if(hp)hp.onclick=function(){tit();
    mbIst.tfler=(mbIst.tfler.length===dilimler.length)?[]:dilimler.map(function(t){return t.tf});
    mbUygula()};
  T("[data-mbkapsam]",function(b){mbIst.kapsam=b.dataset.mbkapsam;mbUygula()});
  /* Modül "Genel" e dönsün — kendi özel dilimini bırakır */
  T("[data-mbmodtfg]",function(b){
    var m=b.dataset.mbmodtfg;mbIst[m].tfler=null;mbUygula()});
  /* Modül kendi dilimini tikler/tik kaldırır — ilk tike basıldığında
     özel moda geçer (boş diziyle başlar). */
  T("[data-mbmodtf]",function(b){
    var par=b.dataset.mbmodtf.split(":"),m=par[0],t=par[1];
    if(!mbModOzelMi(mbIst[m]))mbIst[m].tfler=[];
    var i=mbIst[m].tfler.indexOf(t);
    if(i>=0)mbIst[m].tfler.splice(i,1);else mbIst[m].tfler.push(t);
    if(!mbIst[m].tfler.length)mbIst[m].tfler=null;    /* boş kalırsa Genel'e dön */
    mbUygula()});
  T("[data-mbmod]",function(b){
    var m=b.dataset.mbmod;mbIst[m].acik=!mbIst[m].acik;mbUygula()});
  T("[data-mbmalyon]",function(b){
    var y=b.dataset.mbmalyon;mbIst.mal[y]=!mbIst.mal[y];
    if(!mbIst.mal.top&&!mbIst.mal.dag)mbIst.mal[y]=true;   /* en az biri kalsın */
    mbUygula()});
  T("[data-mbtemiz]",function(){mbIst.mal.temiz=!mbIst.mal.temiz;mbUygula()});
  T("[data-mbkademe]",function(b){mbIst.dip.kademe=b.dataset.mbkademe;mbUygula()});
  T("[data-mbez]",function(b){
    var k=b.dataset.mbez;
    mbIst.enerji[k]=!mbIst.enerji[k];mbUygula();
  });
  T("[data-mbezm]",function(){mbIst.enerji.mesafeAcik=!mbIst.enerji.mesafeAcik;mbUygula()});
  T("[data-mbezy]",function(b){mbIst.enerji.mesafe=Number(b.dataset.mbezy);mbUygula()});
  (function(){
    var ez=el("mbEZSerbest");
    if(ez)ez.onchange=function(){
      var n=Number(ez.value);
      if(isFinite(n)&&n>=0.1&&n<=30){mbIst.enerji.mesafe=n;mbUygula()}
    };
  })();
  T("[data-mbbolge]",function(b){
    var id=b.dataset.mbbolge,i=mbIst.bolge.secili.indexOf(id);
    if(i>=0)mbIst.bolge.secili.splice(i,1);else mbIst.bolge.secili.push(id);
    if(!mbIst.bolge.secili.length)mbIst.bolge.secili.push(id);   /* en az biri */
    mbUygula()});
  T("[data-mbpd]",function(b){
    var d=b.dataset.mbpd,i=mbIst.pivot.dilimler.indexOf(d);
    if(i>=0)mbIst.pivot.dilimler.splice(i,1);else mbIst.pivot.dilimler.push(d);
    if(!mbIst.pivot.dilimler.length)mbIst.pivot.dilimler.push(d);   /* en az biri */
    mbUygula()});
  T("[data-mbpdurum]",function(b){
    var d=b.dataset.mbpdurum;mbIst.pivot[d]=!mbIst.pivot[d];
    if(!mbIst.pivot.kirdi&&!mbIst.pivot.yakin&&!mbIst.pivot.uzerinde)mbIst.pivot[d]=true;
    mbUygula()});
  T("[data-mbpy]",function(b){mbIst.pivot.yuzde=Number(b.dataset.mbpy);mbUygula()});
  var pys=el("mbPYSerbest");
  if(pys){var uyg=function(){
    var n=Number(pys.value);
    if(pys.value===""||!isFinite(n)||n<=0)return;
    n=Math.max(0.1,Math.min(50,n));
    if(mbIst.pivot.yuzde===n)return;
    mbIst.pivot.yuzde=n;tit();mbUygula();
  };pys.onkeydown=function(e2){if(e2.key==="Enter"){e2.preventDefault();uyg()}};pys.onblur=uyg}
  T("[data-mbabyon]",function(b){
    var y=b.dataset.mbabyon;mbIst.ab[y]=!mbIst.ab[y];
    if(!mbIst.ab.boga&&!mbIst.ab.ayi)mbIst.ab[y]=true;
    mbUygula()});
  T("[data-mbyas]",function(b){
    var p=b.dataset.mbyas.split(":");
    mbIst[p[0]].n=Number(p[1]);mbIst[p[0]].sinirsiz=false;mbUygula()});
  T("[data-mbsinir]",function(b){
    var m=b.dataset.mbsinir;mbIst[m].sinirsiz=!mbIst[m].sinirsiz;mbUygula()});
  /* elle bar kutusu — Enter ya da odak kaybında uygulanır */
  [].forEach.call(document.querySelectorAll("[data-mbelle]"),function(inp){
    var uy=function(){
      var m=inp.dataset.mbelle,n=Number(inp.value);
      if(inp.value===""||!isFinite(n))return;
      n=Math.max(0,Math.min(500,Math.round(n)));
      if(mbIst[m].n===n&&!mbIst[m].sinirsiz)return;
      mbIst[m].n=n;mbIst[m].sinirsiz=false;tit();mbUygula();
    };
    inp.onkeydown=function(e2){if(e2.key==="Enter"){e2.preventDefault();uy()}};
    inp.onblur=uy;
  });
  var tb=el("mbTaraBtn");if(tb)tb.onclick=function(){tit();mbTaraBaslat()};
  var dd=el("mbDur");if(dd)dd.onclick=function(){tit();dd.disabled=true;
    var o={};for(var k in mbIst)o[k]=mbIst[k];o.dur=(!v||v.calisiyor!==false)?1:0;
    post("/api/malboga",o).then(function(v2){mbD=v2;mbGoster(v2)}).catch(function(){dd.disabled=false})};
  var ev=el("mbEvrenBtn");if(ev)ev.onclick=function(){tit();ev.disabled=true;ev.textContent="🌍 …";
    var o={};for(var k in mbIst)o[k]=mbIst[k];o.evrenYenile=1;
    post("/api/malboga",o).then(function(v2){mbD=v2;mbGoster(v2)})
      .catch(function(){ev.disabled=false;ev.textContent="🌍 Evreni yenile"})};
  var ak=el("mbAlarmKur");
  if(ak)ak.onclick=function(){tit();
    var isim=window.prompt("Bu alarma bir isim ver (istersen boş bırak):","");
    if(isim===null)return;
    ak.disabled=true;ak.textContent="⏳ ekleniyor…";
    var o={};for(var k in mbIst)o[k]=mbIst[k];o.alarmKur=1;o.ad=isim;
    post("/api/malboga",o).then(function(r){
      ak.disabled=false;
      if(r&&r.ok){
        mbAlarmD=r.alarm||mbAlarmD;
        mbAlarmOnbellekYaz(mbAlarmD);
        mbCizYenile();
        var dv=el("mbAlarmDurum");
        if(dv)dv.innerHTML='✅ Alarm eklendi. Şu anki <b>'+(r.tohum||0)+'</b> eşleşme '+
          '"görülmüş" sayıldı; bundan sonra listeye <b>yeni girenler</b> bildirilecek.';
      }else{
        if(r&&r.alarm){mbAlarmD=r.alarm;mbAlarmOnbellekYaz(mbAlarmD)}
        mbCizYenile();
        var dv2=el("mbAlarmDurum");if(dv2)dv2.textContent="⚠️ "+((r&&r.hata)||"eklenemedi");
      }
    }).catch(function(){ak.disabled=false;
      var dv3=el("mbAlarmDurum");if(dv3)dv3.textContent="⚠️ bağlantı hatası"});
  };
  T("[data-mbalyukle]",function(b){
    var i=Number(b.dataset.mbalyukle),a=mbAlarmD&&mbAlarmD.liste&&mbAlarmD.liste[i];
    if(!a||!a.ist)return;
    mbAlKriterYukle(a.ist);mbUygula();
    var dv=el("mbAlarmDurum");if(dv)dv.textContent="↩️ "+(i+1)+". alarmın kriterleri yukarı yüklendi.";
  });
  T("[data-mbalsil]",function(b){
    b.disabled=true;b.textContent="…";
    post("/api/malboga",{alarmSil:1,alarmId:b.dataset.mbalsil}).then(function(r){
      if(r&&r.alarm){mbAlarmD=r.alarm;mbAlarmOnbellekYaz(mbAlarmD)}mbCizYenile();
    }).catch(function(){b.disabled=false;b.textContent="🚫"});
  });
  var ah=el("mbAlarmHepsi");
  if(ah)ah.onclick=function(){tit();ah.disabled=true;
    post("/api/malboga",{alarmSil:1,alarmId:true}).then(function(r){
      mbAlarmD=(r&&r.alarm)||{yuva:5,seans:false,liste:[]};
      mbAlarmOnbellekYaz(mbAlarmD);mbCizYenile();
    }).catch(function(){ah.disabled=false})};
  var kb=el("mbKodBtn"),ki=el("mbKod");
  var bak=function(){var k=String((ki&&ki.value)||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
    if(k.length<3)return;tit();
    el("govde").innerHTML='<div class="yukleniyor">'+k+' — yedi zaman dilimi ölçülüyor…</div>';
    post("/api/malboga",{kod:k}).then(function(v2){
      if(v2&&v2.ok&&v2.tek){mbTek=v2;mbTekGoster(v2)}else{mbD=null;mbCiz()}})
      .catch(function(){mbD=null;mbCiz()})};
  if(kb)kb.onclick=bak;
  if(ki)ki.onkeydown=function(e2){if(e2.key==="Enter")bak()};
}
/* ⏩ Havuzu elle doldurma döngüsü: her turda bir dilimi biraz ilerletir,
   eksik dilim kalmayınca kendiliğinden durur ve listeyi tazeler. */
/* İMLECİ İSTEMCİ TAŞIR. Sunucu her cevapta "şu dilimde şuraya kadar
   geldim" der, biz onu bir sonraki istekte geri veririz. Böylece ilerleme
   KV'nin gecikmesine takılmaz — bu, havuzun bir türlü dolmamasının sebebiydi. */
var mbDolduruyor=false, mbDoldurSayac=0, mbDoldurDilim="", mbDoldurImlec=null;
function mbDoldurTur(){
  if(!mbDolduruyor||sekme!=="malboga")return;
  var o={};for(var k in mbIst)o[k]=mbIst[k];
  o.doldur=1;
  if(mbDoldurDilim){o.imlecTf=mbDoldurDilim;o.imlecKod=mbDoldurImlec}
  post("/api/malboga",o).then(function(r){
    if(!mbDolduruyor)return;
    mbDoldurSayac++;
    var oncekiDilim=mbDoldurDilim;
    mbDoldurDilim=(r&&r.dilim)||"";
    /* dilim değiştiyse imleç sıfırdan başlar */
    mbDoldurImlec=(mbDoldurDilim&&mbDoldurDilim===oncekiDilim)?(r&&r.imlecKod):0;
    if(mbDoldurDilim!==oncekiDilim)mbDoldurImlec=(r&&r.imlecKod)||0;
    if(r&&r.dilimler&&mbD)mbD.dilimler=r.dilimler;
    if(!r||!r.dilim||r.eksik===0){        /* hepsi tamam */
      mbDolduruyor=false;mbDoldurImlec=null;mbTazele();return;
    }
    if(mbD)mbGoster(mbD);
    setTimeout(mbDoldurTur,1200);
  }).catch(function(){
    if(mbDolduruyor)setTimeout(mbDoldurTur,2500);
  });
}
/* Tek hissenin bütün dilimleri — Pine'daki TF/DURUM/MAL panelinin aynısı. */
function mbTekGoster(v){
  var t=v.tek, s=t.satir||[];
  var h='<div class="sirala"><button class="sir" id="mbGeri">← Taramaya dön</button>'+
        '<button class="sir" id="mbTekYenile">🔄 Yenile</button></div>';
  h+='<div class="kutu" style="margin:8px 0"><h3>'+E(t.kod)+' — bütün zaman dilimleri</h3>'+
     '<div class="altbilgi">Alt dilimlerde toplama başlarken üst dilim hâlâ ayıysa erken, '+
     'hepsi boğaysa geç kalmış olabilirsin.</div></div>';
  h+=s.map(function(x){
    var tfAd=(x.tf||"");
    if(x.yok)return '<div class="satir" style="border-left-color:var(--ciz)"><div class="sol">'+
      '<div class="kod">'+E(tfAd)+'</div>'+
      '<div class="altbilgi">veri yetersiz — bu dilimde ölçüm alınamadı</div></div></div>';
    var mal=mbMalHucre(x), ab=mbAbHucre(x);
    var kenar=x.boga?"var(--yes)":(x.ayi?"var(--kir)":"var(--ciz)");
    var olay=(x.mt||x.md||x.bogaGec||x.ayiGec);
    var dip=x.dip236?"⬇️⬇️⬇️":x.dip382?"⬇️⬇️":x.dip?"⬇️":"";
    return '<div class="satir" style="border-left-color:'+kenar+';align-items:flex-start">'+
      '<div class="sol"><div class="kod">'+E(tfAd)+
      (olay?' <span class="rozet" style="background:var(--yes);color:#04140a">☀ '+E(x.sonTxt)+'</span>':"")+
      (dip?' <span class="rozet">'+dip+'</span>':"")+'</div>'+
      '<div class="altbilgi" style="white-space:normal">'+
      '<b style="color:'+mal.r+'">MAL '+E(mal.t)+'</b> · '+
      '<b style="color:'+ab.r+'">A/B '+E(ab.t)+'</b>'+
      (x.doyum!=null?'<br>doyum <b>'+E(String(x.doyum))+'</b> · stop '+E(String(x.stop))+
        ' · 786 '+E(String(x.s786))+(x.s382!=null?' · 382 '+E(String(x.s382)):"")+
        (x.s236!=null?' · 236 '+E(String(x.s236)):""):"")+
      /* ⚛ Enerji — TradingView’deki ⚛ sütununun aynısı; tek hisse ekranında
         dilim dilim görünsün ki TV ile karşılaştırılabilsin. */
      (function(){
        var d=Number(x.ezAge)===0?"0B↑":Number(x.ezAge)===1?"1B↑":
              Number(x.ezIns)>0.5?"İçinde":Number(x.ezAct)>0.5?"Zon":null;
        if(!d)return "";
        return '<br>⚛ <b>'+d+'</b>'+
          (x.ezBot!=null?' · zon '+E(String(x.ezBot))+'–'+E(String(x.ezTop)):"")+
          (x.ezMes!=null?' · üste %'+E(String(x.ezMes)):"")+
          (x.ezEn!=null?' · güç %'+E(String(Math.round(x.ezEn))):"")+
          (x.ezTp1!=null?' · GFH '+E(String(x.ezTp1)):"");
      })()+
      '<br><span style="opacity:.6">'+x.bar+' bar · fiyat '+E(String(x.fiyat))+'</span></div></div>'+
      '<div class="sag"><div class="yuzde" style="color:'+kenar+';font-size:20px">'+(x.boga?"🐂":x.ayi?"🐻":"?")+'</div>'+
      '<div class="altbilgi">'+(x.durum===1?"topluyor":x.durum===-1?"dağıtıyor":"—")+'</div></div></div>';
  }).join("");
  el("govde").innerHTML=h;
  var g2=el("mbGeri");if(g2)g2.onclick=function(){tit();mbTek=null;mbCiz()};
  var y2=el("mbTekYenile");if(y2)y2.onclick=function(){tit();
    var k=t.kod;el("govde").innerHTML='<div class="yukleniyor">'+k+' yeniden ölçülüyor…</div>';
    post("/api/malboga",{kod:k}).then(function(v2){if(v2&&v2.ok&&v2.tek){mbTek=v2;mbTekGoster(v2)}})};
}
/* ================== 🟢 YEŞİL KAPANIŞ SEKMESİ (yalnız yönetici) ==========
   Baştan sona uygulamanın içinde: başlat → ilerleme → rapor. Tarayıcıda
   ayrı sayfa açılmaz. Tarama arka planda parça parça ilerler; sekmeden
   çıkıp geri gelsen kaldığı yerden devam eder. */
var ykD=null, ykSuruyor=false, ykAcik={};
/* ── TARAMAYI UYGULAMA YÜRÜTÜR ──
   Hisse listesi, sıra ve sayaçlar burada; sunucu yalnız ölçer. Böylece
   KV gecikmesi ve isolate değişimi denklemden çıkar. */
var ykKuyruk=null, ykIdx=0, ykSayac=null, ykTekler=null, ykKesim=0,
    ykBaslangic=0, ykTeshis=null, ykHatali=[];
var YK_ALANLAR_I=["n","gY","gT","kN","kY","kT","n3","m3S","y3","k3","g3T","h1","h2","h3"];
function ykSayacKat(A,B){
  if(!B)return A;
  if(!A.taban)A.taban={};if(!A.komb)A.komb={};
  var kat=function(h,k){
    if(!k)return;
    for(var b in k){var kay=k[b];if(!kay)continue;
      if(!h[b])h[b]={n:0,gY:0,gT:0,kN:0,kY:0,kT:0,n3:0,m3S:0,y3:0,k3:0,g3T:0,h1:0,h2:0,h3:0};
      YK_ALANLAR_I.forEach(function(al){h[b][al]+=Number(kay[al])||0});
    }
  };
  kat(A.taban,B.taban);
  for(var a in B.komb){if(!A.komb[a])A.komb[a]={};kat(A.komb[a],B.komb[a])}
  return A;
}
function ykGozlem(){return (ykSayac&&ykSayac.taban&&ykSayac.taban[0]&&ykSayac.taban[0].n)||0}
function ykDurumPaketi(){
  var bitti=!!(ykKuyruk&&ykIdx>=ykKuyruk.length);
  return{ok:true,yerel:true,tamam:ykKuyruk?Math.min(ykIdx,ykKuyruk.length):0,
    toplam:ykKuyruk?ykKuyruk.length:0,tamamlandi:bitti,gozlem:ykGozlem(),
    sure:ykBaslangic?Math.round((Date.now()-ykBaslangic)/1000):0,
    teshis:ykTeshis,hatali:ykHatali.slice(0,40),bekle:true};
}
/* ── Rapor da uygulamada üretilir (sunucudaki ykOzetle ile aynı kurallar).
   Sayaçları her turda sunucuya göndermek gereksiz yük olurdu. ── */
var YK_LV_I=[-0.786,-0.618,-0.382,-0.236,0.0,0.236,0.382,0.5,0.618,0.786,1.0,1.272,1.618,2.618,3.618,4.236];
var YK_AD_I=["D/D-786","D/D-618","D/D-382","D/D-236","DİKKAT AYI","D/D236","D/D382","Hazırlık",
  "BOĞA","ZAYIF D/D","KARAR YERİ","KÜÇÜK DİRENÇ","DİRENÇ","GÜÇLÜ D/D","ÇOK GÜÇLÜ D/D","DOYUM"];
var YK_BOLGE_I=["0.0 altı","dip bölgesi","karar/direnç","güçlü D/D üstü"];
var YK_DILIM_I=["1SA","4SA","1G"];
var YK_ASGARI_I=40, YK_KALDIRAC_I=0.5;
function ykBantAdI(b){b=Number(b);
  return b===0?"< "+YK_AD_I[0]:b===YK_LV_I.length?"> "+YK_AD_I[15]:YK_AD_I[b-1]+" → "+YK_AD_I[b]}
function ykKombAd(id){
  var p=String(id).split("|");
  if(p[0]==="B")return p[1]+" · "+ykBantAdI(p[2]);
  if(p[0]==="Z")return p[1]+" · "+YK_BOLGE_I[Number(p[2])];
  if(p[0]==="P")return p[1]+" ["+YK_BOLGE_I[Number(p[2])]+"] + "+p[3]+" ["+YK_BOLGE_I[Number(p[4])]+"]";
  if(p[0]==="U")return "1SA ["+YK_BOLGE_I[Number(p[1])]+"] + 4SA ["+YK_BOLGE_I[Number(p[2])]+"] + 1G ["+YK_BOLGE_I[Number(p[3])]+"]";
  return id;
}
function ykIleri3OkuI(c){
  if(!c||!c.n3)return null;
  return{n3:c.n3,max3Ort:c.m3S/c.n3,yesil3Oran:100*c.y3/c.n3,kirmizi3Oran:100*c.k3/c.n3,
    toplamGetiri3:c.g3T,ortGetiri3:c.g3T/c.n3,
    hedef1:100*(c.h1||0)/c.n3,hedef2:100*(c.h2||0)/c.n3,hedef3:100*(c.h3||0)/c.n3};
}
function ykOzetleYerel(S,alan){
  if(!S||!S.taban)return null;
  var oku=function(kutu,b){
    var c=kutu&&kutu[b];
    if(!c||typeof c!=="object")return null;
    var n=alan==="g"?c.n:c.kN;
    if(!n)return null;
    return{n:n,yesil:100*(alan==="g"?c.gY:c.kY)/n,ort:(alan==="g"?c.gT:c.kT)/n,ileri3:ykIleri3OkuI(c)};
  };
  var taban={};for(var b=0;b<=4;b++)taban[b]=oku(S.taban,b);
  if(!taban[0])return null;
  var satirlar=[],denenen=0;
  for(var id in S.komb){
    var kutu=S.komb[id];
    var g=oku(kutu,0);if(!g||g.n<YK_ASGARI_I*2)continue;
    var bl=[1,2,3,4].map(function(x){return oku(kutu,x)});
    var eksik=false;
    for(var i=0;i<4;i++)if(!bl[i]||bl[i].n<YK_ASGARI_I)eksik=true;
    if(eksik)continue;
    denenen++;
    var k=bl.map(function(x,i2){return x.yesil-taban[i2+1].yesil});
    var enAz=Math.min.apply(null,k);
    satirlar.push({id:id,ad:ykKombAd(id),n:g.n,yesil:g.yesil,ort:g.ort,
      kaldirac:g.yesil-taban[0].yesil,bolmeler:k,enAz:enAz,gecti:enAz>=YK_KALDIRAC_I,ileri3:g.ileri3});
  }
  satirlar.sort(function(a,b2){return b2.enAz-a.enAz});
  var gecen=satirlar.filter(function(r){return r.gecti});
  return{taban:{n:taban[0].n,yesil:taban[0].yesil,ort:taban[0].ort,ileri3:taban[0].ileri3},
    denenen:denenen,gecen:gecen.length,beklenenGurultu:Math.round(denenen*0.06),
    gecenler:gecen.slice(0,25),
    elenenler:satirlar.filter(function(r){return !r.gecti}).slice(0,10)};
}
/* ── Tarama döngüsü ── */
function ykCiz(){
  if(ykD){ykGoster(ykD);return}
  ykD=ykDurumPaketi();
  if(!ykKuyruk){ykD.yok=true}
  ykGoster(ykD);
}
function ykBaslat(hizli){
  el("govde").innerHTML='<div class="yukleniyor">hisse listesi alınıyor…</div>';
  post("/api/malboga",{is:"evren"}).then(function(r){
    if(!r||!r.ok||!r.kodlar||!r.kodlar.length){
      el("govde").innerHTML='<div class="bos">Hisse listesi alınamadı.</div>';return}
    ykKuyruk=hizli?r.kodlar.slice(0,40):r.kodlar.slice();
    ykTekler=ykKuyruk.filter(function(_,i){return i%2===0});
    ykIdx=0;ykSayac={taban:{},komb:{}};ykHatali=[];ykTeshis={veriYok:{},gozlemsiz:0,hata:0};
    ykKesim=Math.floor(Date.now()/1000)-330*86400;
    ykBaslangic=Date.now();ykSuruyor=true;
    ykTur();
  }).catch(function(){el("govde").innerHTML='<div class="bos">Bağlantı kurulamadı.</div>'});
}
function ykDur(){ykSuruyor=false;ykYenidenCiz()}
function ykYenidenCiz(){
  var v=ykDurumPaketi();
  v.gun=ykOzetleYerel(ykSayac,"g");
  v.kap=ykOzetleYerel(ykSayac,"k");
  ykD=v;ykGoster(v);
}
function ykTur(){
  if(!ykSuruyor||sekme!=="yesil"||!ykKuyruk)return;
  if(ykIdx>=ykKuyruk.length){ykSuruyor=false;ykYenidenCiz();return}
  var parca=ykKuyruk.slice(ykIdx,ykIdx+20);
  post("/api/yesil",{is:"parti",kodlar:parca,tekler:ykTekler,zamanKesim:ykKesim})
    .then(function(r){
      if(!ykSuruyor)return;
      if(r&&r.ok&&r.sayac)ykSayacKat(ykSayac,r.sayac);
      if(r&&r.teshis){
        for(var k in (r.teshis.veriYok||{}))ykTeshis.veriYok[k]=(ykTeshis.veriYok[k]||0)+r.teshis.veriYok[k];
        ykTeshis.gozlemsiz+=r.teshis.gozlemsiz||0;ykTeshis.hata+=r.teshis.hata||0;
        ykTeshis.yenidenDenendi=(ykTeshis.yenidenDenendi||0)+(r.teshis.yenidenDenendi||0);
        ykTeshis.yenidenKurtardi=(ykTeshis.yenidenKurtardi||0)+(r.teshis.yenidenKurtardi||0);
        if(!ykTeshis.ornekHata&&r.teshis.ornekHata)ykTeshis.ornekHata=r.teshis.ornekHata;
      }
      if(r&&r.hatali&&r.hatali.length)ykHatali=ykHatali.concat(r.hatali);
      ykIdx+=parca.length;
      ykYenidenCiz();
      setTimeout(ykTur,60);
    }).catch(function(){
      if(!ykSuruyor)return;
      ykTeshis.hata++;
      if(ykTeshis.hata>30){ykSuruyor=false;ykYenidenCiz();return}
      setTimeout(ykTur,1500);
    });
}
/* Bir adım ilerlet, bitene kadar kendini çağırır. */
/* Neden veri gelmedi — sessiz boş rapor yerine açık sebep. */
function ykTeshisHTML(v){
  var t=v&&v.teshis;if(!t)return"";
  var p=[];
  if(t.veriYok)for(var k in t.veriYok)if(t.veriYok[k])p.push(E(k)+" verisi gelmedi: <b>"+t.veriYok[k]+"</b> hisse");
  if(t.gozlemsiz)p.push("hiç gün üretmeyen hisse: <b>"+t.gozlemsiz+"</b>");
  if(t.hata)p.push("çekim hatası: <b>"+t.hata+"</b>");
  if(t.yenidenDenendi)p.push("yeniden denendi: <b>"+t.yenidenDenendi+"</b>"+(t.yenidenKurtardi?" (kurtarılan: <b>"+t.yenidenKurtardi+"</b>)":""));
  var oh=t.ornekHata?'<div style="margin-top:6px;opacity:.85">🔎 örnek hata: <code>'+E(String(t.ornekHata).slice(0,180))+'</code></div>':"";
  if(!p.length&&!oh)return"";
  return '<div class="altbilgi" style="margin-top:8px;padding:7px 9px;background:rgba(248,81,73,.10);'+
    'border-radius:8px;white-space:normal">📋 '+p.join(" · ")+oh+'</div>';
}
function ykYuz(v,o){return v===null||v===undefined||!isFinite(v)?"—":(v>0?"+":"")+v.toFixed(o===undefined?1:o)}
/* Bir kurulum satırı — dört bölme kutucuk olarak gösterilir. */
function ykIleri3HTML(i3){
  if(!i3)return "";
  return '<div class="altbilgi" style="margin-top:5px;padding:6px 8px;background:rgba(88,166,255,.08);border-radius:7px">'+
    '📐 <b>3 bar sonrası</b> ('+i3.n3+' gözlem) — azami ortalama <b>'+ykYuz(i3.max3Ort,2)+'%</b> · '+
    'toplam getiri <b>'+ykYuz(i3.toplamGetiri3,1)+'%</b> (ort. '+ykYuz(i3.ortGetiri3,2)+'%)<br>'+
    '🟢 üçü de yeşil: <b>%'+i3.yesil3Oran.toFixed(0)+'</b> · 🔴 üçü de kırmızı: <b>%'+i3.kirmizi3Oran.toFixed(0)+'</b><br>'+
    '🎯 hedefe ulaşma: +1% → <b>%'+i3.hedef1.toFixed(0)+'</b> · +2% → <b>%'+i3.hedef2.toFixed(0)+'</b> · +3% → <b>%'+i3.hedef3.toFixed(0)+'</b></div>';
}
function ykSatir(r,taban){
  var kutu=(r.bolmeler||[]).map(function(v,i){
    var ad=["eski dönem","yeni dönem","hisse A","hisse B"][i];
    return '<span title="'+ad+'" style="display:inline-block;min-width:38px;text-align:center;'+
      'background:'+(v>0?"rgba(63,185,80,.18)":"rgba(248,81,73,.18)")+';'+
      'color:'+(v>0?"var(--yes)":"var(--kir)")+';border-radius:5px;padding:1px 4px;font-size:11px;font-weight:700">'+
      ykYuz(v)+'</span>';
  }).join(" ");
  return '<div class="satir" style="border-left-color:'+(r.kaldirac>0?"var(--yes)":"var(--kir)")+';align-items:flex-start;flex-direction:column">'+
    '<div style="display:flex;width:100%;align-items:flex-start">'+
    '<div class="sol"><div class="kod" style="font-size:13px;white-space:normal;line-height:1.35">'+E(r.ad)+'</div>'+
    '<div class="altbilgi" style="margin-top:4px">'+r.n+' hisse-günü · yeşil <b>%'+r.yesil.toFixed(0)+'</b>'+
    ' · ortalama <b>'+ykYuz(r.ort,2)+'%</b></div>'+
    '<div style="margin-top:5px">'+kutu+'</div></div>'+
    '<div class="sag"><div class="yuzde" style="color:'+(r.kaldirac>0?"var(--yes)":"var(--kir)")+';font-size:17px">'+
    ykYuz(r.kaldirac)+'</div><div class="altbilgi">kaldıraç</div></div></div>'+
    ykIleri3HTML(r.ileri3)+'</div>';
}
function ykBolum(p,anahtar,baslik,aciklama){
  if(!p)return '<div class="kutu"><h3>'+baslik+'</h3><div class="altbilgi">yeterli veri toplanmadı</div></div>';
  var ac=ykAcik[anahtar];
  var h='<div class="kutu" style="border-left:3px solid '+(p.gecen?"var(--yes)":"var(--ciz)")+'">'+
    '<h3 style="margin:0 0 5px">'+baslik+'</h3>'+
    '<div class="altbilgi" style="white-space:normal;margin-bottom:8px">'+aciklama+'</div>'+
    '<div class="altbilgi" style="margin-bottom:8px">'+
    '<b>TABAN: yeşil %'+p.taban.yesil.toFixed(1)+'</b> · ortalama '+ykYuz(p.taban.ort,3)+'% · '+
    p.taban.n+' hisse-günü<br>'+
    '<span style="opacity:.75">Yani hiçbir kural kullanmadan rastgele bir gün alsan sonuç bu. '+
    'Aşağıdaki kurulumlar bunu ne kadar geçiyor, ona bak.</span></div>'+
    ykIleri3HTML(p.taban.ileri3)+
    '<div class="altbilgi" style="padding:7px 9px;background:'+(p.gecen?"rgba(63,185,80,.10)":"rgba(248,81,73,.10)")+';border-radius:8px">'+
    '<b>'+p.denenen+' kurulum denendi · '+p.gecen+' tanesi dört sınavı da geçti</b><br>'+
    '<span style="opacity:.8">Şans eseri geçmesi beklenen: yaklaşık '+p.beklenenGurultu+'. '+
    (p.gecen>p.beklenenGurultu*1.5?"Bu sayının belirgin üstünde — gerçek bir sinyal var."
      :"Bu sayıya yakın — bulunanlar büyük ölçüde şans olabilir.")+'</span></div>';
  if(p.gecenler&&p.gecenler.length){
    h+='<div class="altbilgi" style="margin:10px 0 4px;opacity:.8">SINAVI GEÇENLER (en iyi '+
      Math.min(p.gecenler.length,25)+')</div>';
    h+=p.gecenler.map(function(r){return ykSatir(r,p.taban)}).join("");
  }else{
    h+='<div class="bos" style="margin-top:10px">Dört sınavı da geçen kurulum yok.</div>';
  }
  h+='<button class="sir" data-ykac="'+anahtar+'" style="margin-top:10px">'+
    (ac?"▲ elenenleri gizle":"▼ elenenleri de gör")+'</button>';
  if(ac&&p.elenenler&&p.elenenler.length){
    h+='<div class="altbilgi" style="margin:8px 0 4px;opacity:.7">ELENENLER — biri ya da birkaç sınavda düştüler</div>'+
      p.elenenler.map(function(r){return ykSatir(r,p.taban)}).join("");
  }
  return h+'</div>';
}
function ykGoster(v){
  var h='<div class="kutu" style="margin-top:0;border-left:3px solid var(--yes)">'+
    '<h3 style="margin:0 0 6px">📐 Fibo Aralığı Ölçüm İstasyonu</h3>'+
    '<div class="altbilgi" style="white-space:normal;line-height:1.65">'+
    'Şu soruyu araştırır: <b>hisse, fibo merdiveninin hangi basamağındayken ertesi günü yeşil kapatıyor?</b><br><br>'+
    'Yüzlerce kurulum denenir. Ama çok deneyince rastgele veride bile parlak sonuçlar çıkar — '+
    'o yüzden her kurulum <b>dört ayrı sınavdan</b> geçirilir:<br>'+
    '• eski dönem · • yeni dönem · • hisselerin yarısı · • diğer yarısı<br>'+
    'Dördünde birden tabanı geçemeyen kurulum şans sayılıp elenir.</div></div>';
  var suruyor=v&&v.ok&&!v.yok&&!v.tamamlandi;
  var bitti=v&&v.ok&&!v.yok&&v.tamamlandi;
  /* ── durum / ilerleme ── */
  if(suruyor){
    var p=v.toplam?Math.min(100,Math.round(100*v.tamam/v.toplam)):0;
    h+='<div class="kutu" style="margin:10px 0"><h3 style="margin:0 0 7px">⏳ Taranıyor…</h3>'+
      '<div class="altbilgi">'+v.tamam+' / '+v.toplam+' hisse · '+(v.gozlem||0)+' hisse-günü toplandı · '+
      (v.sure||0)+' sn</div>'+
      '<div style="height:9px;background:var(--ciz);border-radius:5px;overflow:hidden;margin-top:8px">'+
      '<div style="height:100%;width:'+p+'%;background:var(--yes);transition:width .3s"></div></div>'+
      '<div class="altbilgi" style="margin-top:7px;opacity:.7">Sekmede kaldığın sürece ilerler. '+
      'Çıkıp geri gelirsen kaldığı yerden devam eder. Sonuçlar aşağıda tarama sürerken de dolar.</div>'+
      ykTeshisHTML(v)+
      '<button class="sir" id="ykIptal" style="margin-top:9px">✕ Taramayı iptal et</button></div>';
  }else{
    h+='<div class="kutu" style="margin:10px 0"><h3 style="margin:0 0 7px">▶ Yeni tarama</h3>'+
      (bitti?'<div class="altbilgi" style="margin-bottom:8px">Son tarama bitti: '+v.toplam+' hisse · '+
        (v.gozlem||0)+' hisse-günü · '+(v.sure||0)+' sn.</div>':"")+
      '<div class="altbilgi" style="margin-bottom:8px">Havuzun tamamı 2-3 dakika sürer ve en güvenilir '+
      'sonucu verir. Hızlı deneme 40 hisseyle yaklaşık 20 saniyede biter ama örnek az olur.</div>'+
      '<button class="dg" id="ykTam">🌍 Havuzun tamamını tara</button>'+
      '<button class="sir" id="ykHizli" style="margin-top:8px">⚡ Hızlı deneme (40 hisse)</button>'+
      '</div>';
  }
  /* ── sonuçlar ── (tarama sürerken de gösterilir) */
  if(!suruyor&&!bitti){/* hiç iş yok — sonuç bölümü çizilmez */}
  else if(v&&(v.gun||v.kap)){
    h+=ykBolum(v.gun,"gun","📈 Gün içi — sabah al, akşam sat",
      "Senin sorduğun ölçü bu: mumun yeşil kapanması. Sabah açılışta alıp akşam kapanışta satmak.");
    h+=ykBolum(v.kap,"kap","🌙 Kapanıştan kapanışa — akşam al, ertesi akşam sat",
      "Geceyi de elinde tutmak. İki bölümün TABAN satırlarını karşılaştır: aradaki fark, "+
      "yükselişin gece mi gündüz mü olduğunu gösterir.");
    h+='<div class="uyari" style="margin-top:12px"><b>Nasıl okunur?</b><br>'+
      '<b>Kaldıraç</b> — kurulumun tabandan kaç puan iyi olduğu. Taban %45 ise %48 çıkan bir kurulumun kaldıracı +3  puandır.<br>'+
      '<b>Dört küçük kutucuk</b> — sırasıyla eski dönem, yeni dönem, hisselerin bir yarısı, öbür yarısı. '+
      'Dördü de yeşilse kurulum her koşulda tutmuş demektir. İçlerinden biri kırmızıysa güvenme.<br>'+
      '<b>hisse-günü</b> — kaç örnek üzerinde ölçüldüğü. Sayı büyüdükçe sonuç güvenilir olur.<br><br>'+
      '⚠️ Yüksek kaldıraçlı bir kurulum bile kesinlik değildir. %54 yeşil demek, her 100 işlemin '+
      '46 tanesinin kırmızı kapanması demektir.</div>';
    if(v.hatali&&v.hatali.length)
      h+='<div class="altbilgi" style="margin-top:10px;opacity:.6">veri alınamayan: '+
        v.hatali.map(function(k){return E(k)}).join(", ")+'</div>';
    h+='<button class="dg ik" id="ykKopyala" style="margin-top:12px">📋 Sonucu kopyala (bana göndermek için)</button>'+
      '<div class="altbilgi" id="ykKopyalaDurum" style="margin-top:6px"></div>';
  }else if(bitti){
    /* Tarama bitti ama tek gözlem toplanamadı — sebebini söyle. */
    h+='<div class="kutu" style="margin:10px 0;border-left:3px solid var(--kir)">'+
      '<h3 style="margin:0 0 6px">⚠️ Hiç veri toplanamadı</h3>'+
      '<div class="altbilgi" style="white-space:normal">Tarama bitti ama ölçülebilir tek bir '+
      'hisse-günü çıkmadı. Bu neredeyse her zaman veri sağlayıcıdan kaynaklanır: '+
      'çok sayıda hisse üst üste istenince Yahoo istekleri geri çevirmeye başlar.</div>'+
      ykTeshisHTML(v)+
      '<div class="altbilgi" style="margin-top:8px;white-space:normal">Ne yapmalı: birkaç dakika '+
      'bekleyip <b>⚡ Hızlı deneme</b> ile tekrar dene. O çalışıyorsa sorun geçicidir, '+
      'tam havuzu sonra tararsın.</div></div>';
  }
  el("govde").innerHTML=h;
  var t=el("ykTam");if(t)t.onclick=function(){tit();ykBaslat(false)};
  var z=el("ykHizli");if(z)z.onclick=function(){tit();ykBaslat(true)};
  var ip=el("ykIptal");if(ip)ip.onclick=function(){tit();ykDur()};
  [].forEach.call(document.querySelectorAll("[data-ykac]"),function(b){
    b.onclick=function(){tit();var k=b.dataset.ykac;ykAcik[k]=!ykAcik[k];ykGoster(v)}});
  var kp=el("ykKopyala");
  if(kp)kp.onclick=function(){
    tit();
    var metin=ykMetinUret(v);
    var d2=el("ykKopyalaDurum");
    try{navigator.clipboard.writeText(metin);d2.textContent="✅ kopyalandı — şimdi yapıştırabilirsin"}
    catch(e){
      try{var ta=document.createElement("textarea");ta.value=metin;ta.style.position="fixed";ta.style.opacity="0";
        document.body.appendChild(ta);ta.select();document.execCommand("copy");document.body.removeChild(ta);
        d2.textContent="✅ kopyalandı"}
      catch(e2){d2.innerHTML="⚠️ otomatik kopyalanamadı — metni elle seç:<br><textarea readonly style='width:100%;min-height:160px;margin-top:6px'>"+metin.replace(/</g,"&lt;")+"</textarea>"}
    }
  };
}
/* 📋 KOLAY KOPYALA — rapor kısa, sade bir metne dönüştürülür; Claude'a ya
   da başka birine yapıştırıp "şu sonucu okur musun" demek için tasarlandı.
   HTML/emoji süsü yok, yalnız sayılar ve etiketler — LLM'in ayrıştırması
   (parse) kolay olsun diye satır satır aynı düzende yazılır. */
function ykMetinSatir(baslik,p){
  if(!p||!p.taban)return baslik+": yeterli veri yok\\n";
  var out=baslik+"\\n";
  out+="taban: n="+p.taban.n+" yesil%="+p.taban.yesil.toFixed(1)+" ort_getiri%="+ykYuz(p.taban.ort,3)+"\\n";
  if(p.taban.ileri3){var t3=p.taban.ileri3;
    out+="taban_3bar: n="+t3.n3+" azami_ort%="+ykYuz(t3.max3Ort,2)+" hep_yesil%="+t3.yesil3Oran.toFixed(1)+
      " hep_kirmizi%="+t3.kirmizi3Oran.toFixed(1)+" toplam_getiri%="+ykYuz(t3.toplamGetiri3,1)+
      " ort_getiri%="+ykYuz(t3.ortGetiri3,2)+" hedef+1%="+t3.hedef1.toFixed(1)+" hedef+2%="+t3.hedef2.toFixed(1)+" hedef+3%="+t3.hedef3.toFixed(1)+"\\n";
  }
  out+="denenen_kurulum="+p.denenen+" dort_sinavi_gecen="+p.gecen+" beklenen_gurultu="+p.beklenenGurultu+"\\n";
  (p.gecenler||[]).forEach(function(r,i){
    out+=(i+1)+") "+r.ad+" | n="+r.n+" yesil%="+r.yesil.toFixed(1)+" kaldirac="+ykYuz(r.kaldirac)+
      " bolmeler=["+r.bolmeler.map(function(v){return ykYuz(v)}).join(",")+"]";
    if(r.ileri3){var i3=r.ileri3;
      out+=" | 3bar: n="+i3.n3+" azami_ort%="+ykYuz(i3.max3Ort,2)+" hep_yesil%="+i3.yesil3Oran.toFixed(1)+
        " hep_kirmizi%="+i3.kirmizi3Oran.toFixed(1)+" toplam_getiri%="+ykYuz(i3.toplamGetiri3,1)+
        " ort_getiri%="+ykYuz(i3.ortGetiri3,2)+" hedef+1/+2/+3%="+i3.hedef1.toFixed(0)+"/"+i3.hedef2.toFixed(0)+"/"+i3.hedef3.toFixed(0);
    }
    out+="\\n";
  });
  return out;
}
function ykMetinUret(v){
  var out="FIBO ARALIĞI ÖLÇÜM İSTASYONU — SONUÇ\\n";
  out+="tarama: "+(v.toplam||0)+" hisse, "+(v.gozlem||0)+" hisse-günü, "+(v.sure||0)+" sn\\n\\n";
  out+=ykMetinSatir("[GÜN İÇİ — açılış->kapanış]",v.gun)+"\\n";
  out+=ykMetinSatir("[KAPANIŞ->KAPANIŞ — geceyi de alır]",v.kap)+"\\n";
  out+="not: kaldirac = kurulumun taban yesil oranindan farki (puan). 3bar = sinyal barindan sonraki 3 bar.\\n";
  return out;
}
/* ================== 🛡 SİSTEM SEKMESİ (yalnız yönetici) ==================
   Altı dayanıklılık maddesinin tamamı burada görünür:
   Telegram 429/engelli sayaçları, çakışma kilidi atlamaları, panel
   kaba-kuvvet denemeleri ve Cloudflare rate-limit binding'lerinin bağlı olup olmadığı.
   Hepsi "sessizce olan" şeyler — bu sekme onları görünür kılmak için var. */
function sagSaat(ts){
  if(!ts)return"—";
  var d=new Date(ts*1000),s2=function(n){return String(n).padStart(2,"0")};
  return s2((d.getUTCHours()+3)%24)+":"+s2(d.getUTCMinutes())+" · "+s2(d.getUTCDate())+"/"+s2(d.getUTCMonth()+1);
}
function sagKart(durum,baslik,alt){
  var renk=durum==="iyi"?"var(--yes)":(durum==="uyari"?"var(--sar)":(durum==="kotu"?"var(--kir)":"var(--mavi)"));
  var ik=durum==="iyi"?"✅":(durum==="uyari"?"⚠️":(durum==="kotu"?"⛔":"ℹ️"));
  return '<div class="satir" style="border-left-color:'+renk+';align-items:flex-start">'+
    '<div class="sol"><div class="kod" style="font-size:13.5px">'+ik+" "+baslik+'</div>'+
    '<div class="altbilgi" style="white-space:normal">'+alt+'</div></div></div>';
}
function saglikCiz(){
  el("govde").innerHTML='<div class="yukleniyor">sistem durumu okunuyor…</div>';
  post("/api/saglik",{}).then(saglikGoster)
    .catch(function(){el("govde").innerHTML='<div class="bos">Okunamadı.</div>'});
}
function saglikGoster(v){
  if(!v||!v.ok){el("govde").innerHTML='<div class="bos">Yetkisiz ya da okunamadı.</div>';return}
  var c=v.sayac||{},bd=v.binding||{};
  var sy=function(x){return Number(c[x]||0)};
  var h='<div class="sirala"><button class="sir" id="sgYenile">🔄 Yenile</button></div>';
  h+='<div class="uyari" style="margin-top:0">Sayaçlar her gün TR 09:00 itibarıyla sıfırlanır · '+
     'sürüm <b>'+E(v.surum||"")+'</b> · bugünkü push: <b>'+sy("push")+'</b></div>';

  /* --- 2️⃣ Telegram gönderim sağlığı --- */
  var r429=sy("tg429"),gnd=sy("tgGonderim"),eng=sy("tgEngelli"),ag=sy("tgAgHatasi");
  var oran=gnd?Math.round(1000*r429/gnd)/10:0;
  h+='<div class="altbilgi" style="margin:14px 0 6px;opacity:.75">2️⃣ TELEGRAM GÖNDERİM</div>';
  h+=sagKart(r429===0?"iyi":(oran<2?"uyari":"kotu"),
      "429 (hız sınırı): <b>"+r429+"</b> · başarılı gönderim: <b>"+gnd+"</b>",
      r429===0?"Bugün hiç hız sınırına takılmadın. Kova saniyede "+(v.tgLimit||25)+" mesaja ayarlı."
              :"Mesajların %"+oran+"'i 429 yedi, hepsi retry_after kadar beklenip tekrar denendi. "+
               "Son 429: "+sagSaat(c.son429)+" · beklenen süre: "+(c.sonRetryAfter||"?")+" sn. "+
               "Oran %2'yi geçerse kovayı düşür.");
  if(eng||ag)h+=sagKart(eng>gnd*0.1&&gnd?"uyari":"bilgi",
      "Botu engelleyen: <b>"+eng+"</b> · ağ hatası: <b>"+ag+"</b>",
      "403 alan kullanıcılar botu silmiş/engellemiş demektir — tekrar denenmiyor, boşuna kota harcanmıyor.");

  /* --- 3️⃣ Çakışma kilidi --- */
  var atl=sy("kilitAtlandi");
  h+='<div class="altbilgi" style="margin:14px 0 6px;opacity:.75">3️⃣ ÇAKIŞMA KİLİDİ</div>';
  h+=sagKart(atl>500?"uyari":"iyi","Atlanan tekrar tur: <b>"+atl+"</b>",
      atl?"Bu kadar kez bir arka plan işi (geçmiş/alarm/formasyon) önceki turu bitmeden yeniden başlatılmak istendi ve engellendi. Yüksek sayı normaldir — push 10 saniyede bir geliyor."
         :"Henüz çakışma olmadı.");
  h+=sagKart(v.gh?"iyi":"uyari","Formasyon tetikleme: <b>"+E(c.sonFormasyonSonuc||"—")+"</b>",
      (v.gh?"GH_TOKEN tanımlı. ":"GH_TOKEN yok — GitHub Actions taraması tetiklenemiyor. ")+
      "Son deneme: "+sagSaat(c.sonFormasyonTetik)+" · başarısız: "+sy("formasyonHata"));

  /* --- 4️⃣ Panel güvenliği --- */
  var yan=sy("panelYanlis"),kil=sy("panelKilit");
  h+='<div class="altbilgi" style="margin:14px 0 6px;opacity:.75">4️⃣ PANEL GÜVENLİĞİ</div>';
  h+=sagKart(kil?"kotu":(yan?"uyari":"iyi"),
      "Yanlış anahtar denemesi: <b>"+yan+"</b> · kilitlenen IP: <b>"+kil+"</b>",
      yan?("Son yanlış deneme: "+sagSaat(c.sonPanelYanlis)+
           (c.sonPanelKilitIP?" · son kilitlenen IP: "+E(String(c.sonPanelKilitIP)):"")+
           ". 8 yanlış denemeden sonra o IP 15 dakika kapıdan giremiyor.")
         :"Kimse yanlış anahtarla girmeye çalışmadı.");

  /* --- 1️⃣ Cloudflare yerel rate limit --- */
  h+='<div class="altbilgi" style="margin:14px 0 6px;opacity:.75">1️⃣ CLOUDFLARE HIZ SINIRI</div>';
  h+=sagKart(bd.panel&&bd.api?"iyi":"uyari",
      "SINIR_PANEL: <b>"+(bd.panel?"bağlı":"yok")+"</b> · SINIR_API: <b>"+(bd.api?"bağlı":"yok")+"</b>",
      (bd.panel||bd.api)
        ? ("Engellenen istek: panel "+sy("sinir:SINIR_PANEL")+" · api "+sy("sinir:SINIR_API")+
           ". Cloudflare bu sayacın kesin olmadığını söylüyor — limiti gerçek ihtiyacın %20 üstünde tut.")
        : "Binding tanımlı değil, bu yüzden hiçbir kısıt uygulanmıyor (sistem eskisi gibi çalışıyor). Eklemek için: Worker → Settings → Bindings → Rate limiting. Öneri: SINIR_PANEL 20 istek/60 sn, SINIR_API 300 istek/60 sn.");

  /* --- İkinci paket: panel anahtarı, absorpsiyon --- */
  h+='<div class="altbilgi" style="margin:14px 0 6px;opacity:.75">🔐 İMZALI PANEL ANAHTARI</div>';
  h+=sagKart(sy("panelTokenGecersiz")?"uyari":"iyi",
      "Süreli bağlantıyla giriş: <b>"+sy("panelToken")+"</b> · süresi dolmuş/geçersiz: <b>"+sy("panelTokenGecersiz")+"</b>",
      "Bota <b>/panel</b> yazdığında 30 dakika geçerli, imzalı bir adres üretiliyor. Eski sabit adres de çalışmaya devam ediyor.");
  h+='<div class="altbilgi" style="margin:14px 0 6px;opacity:.75">🌊 ABSORPSİYON</div>';
  h+=sagKart("bilgi","Yapılan tarama: <b>"+sy("absTarama")+"</b>",
      "Her tarama en fazla 16 hisseye bakar (Cloudflare istek başına 50 alt-istek sınırı) ve sonuç 30 dakika saklanır.");
  h+='<div class="altbilgi" style="margin:14px 0 6px;opacity:.75">🐂🐻 MAL + AYI/BOĞA</div>';
  h+=sagKart("bilgi","Filtre alarmı gönderimi: <b>"+sy("mbAlarm")+"</b>",
      "Kurulu tarama filtresine YENİ giren hisseler seans içinde bildirilir. "+
      "Alıcılar: yönetici + süper üyeler (+ tanımlıysa alarm kanalı).");
  h+=sagKart("bilgi","İlerleyen dilim sayısı: <b>"+sy("mbTarama")+"</b>",
      "Yedi zaman dilimi sırayla taranır; bir dilimin havuzu bitince sıradakine geçilir. "+
      "Ölçümler dilim başına ayrı anahtarda birikir, 6 saat sonra bayatlayıp düşer.");
  el("govde").innerHTML=h;
  var y=el("sgYenile");if(y)y.onclick=function(){tit();saglikCiz()};
}
var rotD=null;
function rotCeyrek(x){
  return x.o>=100?(x.i>=100?1:2):(x.i>=100?3:4);
}
var ROT_AD={1:"🟢 LİDER",2:"🟡 ZAYIFLAYAN",3:"🔵 GELİŞEN",4:"🔴 GERİDE"};
var ROT_ACIK={1:"güçlü ve hızlanıyor",2:"hâlâ güçlü ama ivme kaybediyor",
              3:"zayıf ama toparlıyor — erken sinyal burada",4:"zayıf ve yavaşlıyor"};
var ROT_RENK={1:"var(--yes)",2:"var(--sar)",3:"var(--mavi)",4:"var(--kir)"};
function rotCiz(){
  if(rotD){rotGoster();return}
  el("govde").innerHTML='<div class="yukleniyor">rotasyon hesaplanıyor…</div>';
  post("/api/rotasyon",{}).then(function(v){
    if(!v||!v.ok){el("govde").innerHTML='<div class="bos">Rotasyon verisi okunamadı.</div>';return}
    rotD=v;rotGoster();
  }).catch(function(){el("govde").innerHTML='<div class="bos">Bağlantı hatası.</div>'});
}
function rotSvg(liste){
  var W=320,H=300,P=26;
  var deg=[];liste.forEach(function(x){deg.push(x.o);deg.push(x.i)});
  var enUz=1;deg.forEach(function(v){enUz=Math.max(enUz,Math.abs(v-100))});
  enUz=enUz*1.15;
  var X=function(v){return P+(W-2*P)*((v-100)/(2*enUz)+0.5)};
  var Y=function(v){return H-P-(H-2*P)*((v-100)/(2*enUz)+0.5)};
  var mx=X(100),my=Y(100);
  var h='<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;height:auto;display:block">';
  /* çeyrek zeminleri */
  h+='<rect x="'+mx+'" y="'+P+'" width="'+(W-P-mx)+'" height="'+(my-P)+'" fill="rgba(63,185,80,.09)"/>';
  h+='<rect x="'+mx+'" y="'+my+'" width="'+(W-P-mx)+'" height="'+(H-P-my)+'" fill="rgba(210,153,34,.09)"/>';
  h+='<rect x="'+P+'" y="'+P+'" width="'+(mx-P)+'" height="'+(my-P)+'" fill="rgba(56,139,253,.09)"/>';
  h+='<rect x="'+P+'" y="'+my+'" width="'+(mx-P)+'" height="'+(H-P-my)+'" fill="rgba(248,81,73,.09)"/>';
  h+='<line x1="'+mx+'" y1="'+P+'" x2="'+mx+'" y2="'+(H-P)+'" stroke="#3a4552" stroke-width="1"/>';
  h+='<line x1="'+P+'" y1="'+my+'" x2="'+(W-P)+'" y2="'+my+'" stroke="#3a4552" stroke-width="1"/>';
  h+='<text x="'+(W-P-2)+'" y="'+(P+11)+'" text-anchor="end" font-size="9" fill="#7ee787">LİDER</text>';
  h+='<text x="'+(W-P-2)+'" y="'+(H-P-3)+'" text-anchor="end" font-size="9" fill="#e3b341">ZAYIFLAYAN</text>';
  h+='<text x="'+(P+2)+'" y="'+(P+11)+'" font-size="9" fill="#79c0ff">GELİŞEN</text>';
  h+='<text x="'+(P+2)+'" y="'+(H-P-3)+'" font-size="9" fill="#ff7b72">GERİDE</text>';
  /* sektör noktaları — en güçlü 12 tanesi etiketli */
  liste.slice(0,12).forEach(function(x){
    var cx=X(x.o),cy=Y(x.i),c=ROT_RENK[rotCeyrek(x)];
    var r=Math.max(3.5,Math.min(8,3+Math.sqrt(x.n)));
    h+='<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="'+r.toFixed(1)+
       '" fill="'+c+'" fill-opacity=".85"/>';
    h+='<text x="'+(cx+r+3).toFixed(1)+'" y="'+(cy+3).toFixed(1)+
       '" font-size="8.5" fill="#c9d3de">'+E(x.ad.slice(0,11))+'</text>';
  });
  h+='<text x="'+(W/2)+'" y="'+(H-6)+'" text-anchor="middle" font-size="8.5" fill="#6e7a88">'+
     '← zayıf   ·   GÜÇ (piyasaya göre)   ·   güçlü →</text>';
  return h+'</svg>';
}
function rotGoster(){
  if(rotD.yok){
    el("govde").innerHTML='<div class="bos"><b>🔄 Sektör Rotasyonu</b><br><br>'+
      'Henüz rotasyon verisi yok.<br>Bir sonraki taramadan sonra burası dolar.</div>';
    return;
  }
  var liste=rotD.liste||[];
  if(!liste.length){el("govde").innerHTML='<div class="bos">Gruplanacak sektör bulunamadı.</div>';return}
  var h='<div class="rrgKutu">'+rotSvg(liste)+'</div>';
  h+='<div class="rrgAcik">'+
     '<span class="q1">LİDER güçlü+hızlanıyor</span>'+
     '<span class="q3">GELİŞEN toparlıyor</span>'+
     '<span class="q2">ZAYIFLAYAN ivme kaybı</span>'+
     '<span class="q4">GERİDE zayıf</span></div>';
  [1,3,2,4].forEach(function(q){
    var grup=liste.filter(function(x){return rotCeyrek(x)===q});
    if(!grup.length)return;
    h+='<div class="rrgGrup">'+ROT_AD[q]+' — '+ROT_ACIK[q]+'</div>';
    grup.forEach(function(x){
      h+='<div class="rrgSat" style="border-left-color:'+ROT_RENK[q]+'">'+
         '<div><div class="rrgAd">'+E(x.ad)+'</div>'+
         '<div class="rrgSay">'+x.n+' hisse</div></div>'+
         '<div style="flex:1"></div>'+
         '<div class="rrgOlc">güç <b style="color:var(--yazi)">'+x.o.toFixed(1)+'</b><br>'+
         'ivme <b style="color:var(--yazi)">'+x.i.toFixed(1)+'</b></div>'+
         '<div class="yuzde '+(x.g>=0?"ye":"kr")+'" style="min-width:52px;text-align:right">'+Y(x.g)+'</div>'+
         '</div>';
      if(x.hisseler&&x.hisseler.length){
        h+='<div class="rrgHis">'+x.hisseler.map(function(y){
          return '<b>'+E(y.kod)+'</b> '+(y.g>=0?"+":"")+Number(y.g).toFixed(1)+'%';
        }).join(" · ")+'</div>';
      }
    });
  });
  h+='<div class="uyari">Ölçüm '+(rotD.toplam||0)+' hissenin son 60 günlük getirisi üzerinden, '+
     'referans <b>eşit ağırlıklı piyasa ortalaması</b> (endeks değil). '+
     '100 = piyasayla aynı. 5 günlük getiri yüzdesi sağda.'+
     (rotD.sektorKaynak?'':'<br><br>⚠️ <b>sektor.json henüz yok</b> — hisselerin çoğu "Diğer" grubunda '+
     'toplanıyor. Sektör dosyasını üretince bu ekran gerçek anlamına kavuşur.')+
     '</div>';
  el("govde").innerHTML=h;
}
var perfD=null, perfDonem="a1";
var DONEM=[["h1","Son 1 hafta"],["a1","Son 1 ay"],["a3","Son 3 ay"],["y1","Son 1 yıl"]];
var DRENK={"1SA":"var(--t1s)","4SA":"var(--t4s)","1G":"var(--t1g)","1HAF":"var(--t1h)"};
var DAD={"1SA":"📊 1 SAAT","4SA":"📐 4 SAAT","1G":"🗓 1 GÜN","1HAF":"📅 1 HAFTA"};
function perfCiz(){
  if(!perfD){
    el("govde").innerHTML='<div class="yukleniyor">performans hesaplanıyor…</div>';
    post("/api/performans").then(function(v){
      if(!v||!v.ok){el("govde").innerHTML='<div class="bos">Performans verisi okunamadı.</div>';return}
      perfD=v;perfCiz();
    }).catch(function(){el("govde").innerHTML='<div class="bos">Bağlantı hatası.</div>'});
    return;
  }
  var P=perfD.donem[perfDonem]||{};
  var h='<div class="pz">'+DONEM.map(function(x){
    return '<button class="sir'+(perfDonem===x[0]?" on":"")+'" data-pd="'+x[0]+'">'+x[1]+"</button>";
  }).join("")+"</div>";
  var g=P.genel;
  if(!g&&!P.uzunGenel){
    h+='<div class="bos"><b>Bu dönemde ölçülecek sinyal yok.</b><br><br>'+
      "Performans, her taramada kaydedilen sinyallerden hesaplanır. Sistem yeni çalışmaya başladıysa "+
      "birkaç gün içinde burası dolacak.</div>";
    el("govde").innerHTML=h;pdBagla();return;
  }
  
  /* 🔧 ÖLÇÜM SÜZGEÇLERİ — yalnız yöneticide görünür.
     Elenen kayıt sayısı her zaman yazılır: rakamın neden değiştiğini
     görmeden eşik oynatmak körlemesine ayar yapmaktır. */
  if(v&&v.yonetici&&v.ayar){
    h+='<div class="kutu"><h3>🔧 Ölçüm süzgeçleri</h3>'+
      '<div class="altbilgi" style="margin-bottom:9px">Bunlar sinyalleri değil, <b>ölçümü</b> etkiler.</div>'+
      '<div class="sat"><span class="et">Aykırı eşiği (%)<br>'+
      '<i style="opacity:.6;font-size:11px">bedelsiz/sermaye artırımı artefaktını eler · 0 = kapalı</i></span>'+
      '<input id="pfAykiri" type="number" step="5" min="0" max="500" value="'+E(String(v.ayar.aykiri))+'" '+
      'style="width:72px;background:var(--kart);border:1px solid var(--ciz);color:var(--yazi);border-radius:7px;padding:5px 7px;font-size:13px;text-align:right"></div>'+
      '<div class="sat"><span class="et">Olgunluk (gün)<br>'+
      '<i style="opacity:.6;font-size:11px">bu yaştan genç sinyal ölçüme girmez · 0 = kapalı</i></span>'+
      '<input id="pfOlgun" type="number" step="1" min="0" max="30" value="'+E(String(v.ayar.olgunluk))+'" '+
      'style="width:72px;background:var(--kart);border:1px solid var(--ciz);color:var(--yazi);border-radius:7px;padding:5px 7px;font-size:13px;text-align:right"></div>'+
      '<button class="dg" id="pfKaydet" style="margin-top:8px">💾 Kaydet ve yeniden ölç</button>'+
      '<div class="altbilgi" style="margin-top:8px">Elenen: <b>'+((v&&v.elenenTaze)||0)+'</b> taze · '+
      '<b>'+((v&&v.elenenAykiri)||0)+'</b> aykırı</div></div>';
  }
  if(g){
    h+='<div class="kutu"><h3>📊 Genel · '+E(DONEM.filter(function(x){return x[0]===perfDonem})[0][1])+"</h3>"+
      '<div class="ikili"><div><div class="buyukN '+(g.isabet>=50?"ye":"kr")+'">'+g.isabet.toFixed(0)+
      '%</div><div class="altN">isabet</div></div>'+
      '<div><div class="buyukN '+(g.ort>=0?"ye":"kr")+'">'+Y(g.ort)+
      '</div><div class="altN">ortalama getiri</div></div></div>'+
      '<div class="sat" style="margin-top:10px"><span class="et">Ölçülen sinyal</span><b>'+g.n+"</b></div>"+
      '<div class="sat"><span class="et">Sinyalden sonraki zirve (ort.)</span><b class="ye">'+Y(g.zirve)+"</b></div>"+

      (g.eniyi?'<div class="sat"><span class="et">🔝 En iyi</span><b class="ye">'+E(g.eniyi.kod)+" "+Y(g.eniyi.y)+"</b></div>":"")+
      (g.enkotu?'<div class="sat"><span class="et">🔻 En kötü</span><b class="kr">'+E(g.enkotu.kod)+" "+Y(g.enkotu.y)+"</b></div>":"")+
      (g.hedefN?'<div class="sat"><span class="et">🎯 Hedefe değen</span><b class="ye">'+g.hedefTut+"/"+g.hedefN+" (%"+Math.round(100*g.hedefTut/g.hedefN)+")</b></div>":"")+
      (g.direncN?'<div class="sat"><span class="et">🧱 Dirençten dönen</span><b class="kr">'+g.direncDon+"/"+g.direncN+" (%"+Math.round(100*g.direncDon/g.direncN)+")</b></div>":"")+
      grafikHtml(P.seri)+gunlukListHtml(P.seri)+"</div>";
  }
  (P.dilimler||[]).forEach(function(x){
    var i=x.ist;
    h+='<div class="kutu"><div class="dilimBas"><span class="nokta" style="background:'+DRENK[x.tf]+'"></span>'+
      "<h3 style=\\"margin:0\\">"+DAD[x.tf]+"</h3></div>";
    if(!i){h+='<div class="et">bu dönemde bu dilimden ölçülmüş sinyal yok</div></div>';return}
    h+='<div class="ikili"><div><div class="buyukN '+(i.isabet>=50?"ye":"kr")+'">'+i.isabet.toFixed(0)+
      '%</div><div class="altN">isabet</div></div>'+
      '<div><div class="buyukN '+(i.ort>=0?"ye":"kr")+'">'+Y(i.ort)+'</div><div class="altN">ort. getiri</div></div>'+
      '<div><div class="buyukN">'+i.n+'</div><div class="altN">sinyal</div></div></div>'+
      '<div class="cubuk"><i style="width:'+Math.max(2,Math.min(100,i.isabet)).toFixed(0)+
      '%;background:'+DRENK[x.tf]+'"></i></div>'+
      '<div class="sat" style="margin-top:9px"><span class="et">Zirve (ort.)</span><b class="ye">'+Y(i.zirve)+"</b></div>"+

      (i.eniyi?'<div class="sat"><span class="et">🔝 En iyi</span><b class="ye">'+E(i.eniyi.kod)+" "+Y(i.eniyi.y)+"</b></div>":"")+
      (i.enkotu?'<div class="sat"><span class="et">🔻 En kötü</span><b class="kr">'+E(i.enkotu.kod)+" "+Y(i.enkotu.y)+"</b></div>":"")+
      (i.hedefN?'<div class="sat"><span class="et">🎯 Hedefe değen</span><b class="ye">'+i.hedefTut+"/"+i.hedefN+" (%"+Math.round(100*i.hedefTut/i.hedefN)+")</b></div>":"")+
      (i.direncN?'<div class="sat"><span class="et">🧱 Dirençten dönen</span><b class="kr">'+i.direncDon+"/"+i.direncN+" (%"+Math.round(100*i.direncDon/i.direncN)+")</b></div>":"")+
      "</div>";
  });
  if(P.uzunGenel){
    h+='<div class="kutu"><h3>🗄 Uzun dönem özeti</h3>'+
      '<div class="sat"><span class="et">Kayıtlı sinyal</span><b>'+P.uzunGenel.n+"</b></div>"+
      '<div class="sat"><span class="et">Ortalama getiri</span><b class="'+(P.uzunGenel.ort>=0?"ye":"kr")+'">'+
      Y(P.uzunGenel.ort)+"</b></div>"+
      '<div class="sat"><span class="et">Kayıtlı gün</span><b>'+P.uzunGenel.gun+"</b></div>"+
      '<div class="bilgi">Dilim kırılımı ayrıntılı geçmişin tutulduğu son '+P.detaySinir+
      " gün için verilir; bu özet daha eski günleri de kapsar.</div></div>";
  }
  h+=simKutusuHtml();
  h+='<div class="uyari">Ölçüm, sinyalin verildiği günün fiyatı ile bugünkü fiyat arasındaki farktır. '+
    "Komisyon, kayma ve temettü hesaba katılmaz. Geçmiş performans gelecek için garanti vermez.<br>"+
    "⚠️ Yatırım tavsiyesi değildir.</div>";
  el("govde").innerHTML=h;pdBagla();
}
function pdBagla(){
  [].forEach.call(document.querySelectorAll("[data-pd]"),function(b){
    b.onclick=function(){tit();perfDonem=b.dataset.pd;perfCiz();window.scrollTo(0,0)};
  });
  var pk=el("pfKaydet");
  if(pk)pk.onclick=function(){
    tit();pk.disabled=true;pk.textContent="…";
    post("/api/perfAyar",{aykiri:Number(el("pfAykiri").value),olgunluk:Number(el("pfOlgun").value)})
      .then(function(){ perfD=null; perfCiz(); })
      .catch(function(){ pk.disabled=false; pk.textContent="💾 Kaydet ve yeniden ölç"; });
  };
  simBagla();
}
var simSonuc=null;
function simVarsayilanTarih(){
  var d=new Date(Date.now()+108e5);d.setUTCDate(d.getUTCDate()-30);
  return d.toISOString().slice(0,10);
}
function simKutusuHtml(){
  var t=(el("simTarih")&&el("simTarih").value)||simVarsayilanTarih();
  var k=(el("simKod")&&el("simKod").value)||"";
  var h='<div class="kutu"><h3>🧮 10.000 ₺ ile simülasyon</h3>'+
    '<div class="alt" style="margin-bottom:8px">Seçtiğin tarihte 10.000 ₺ ile başlayıp, o günden bugüne kadar '+
    "çıkan HER sinyalde işlem yapılsaydı bakiye nasıl değişirdi? Her sinyal günü, o günün ortalama getirisi "+
    "önceki bakiyeye uygulanır (zincirleme/bileşik) — yani ertesi gün yeni bakiyeyle devam edilmiş gibi.</div>"+
    '<div class="simSatir"><label>Başlangıç tarihi</label><input type="date" id="simTarih" value="'+E(t)+'"></div>'+
    '<div class="simSatir"><label>Hisse kodu (boş = tüm sinyaller)</label><input type="text" id="simKod" placeholder="örn. THYAO" value="'+E(k)+'" style="text-transform:uppercase"></div>'+
    '<button class="dg ik" id="simDg" style="margin-top:6px">Simüle et</button>'+
    '<div id="simSonucAlan" style="margin-top:10px">'+simSonucHtml()+"</div></div>";
  return h;
}
function simSonucHtml(){
  if(!simSonuc)return"";
  if(!simSonuc.ok)return '<div class="bos">'+(simSonuc.hata||"Hesaplanamadı.")+"</div>";
  var s=simSonuc;
  if(!s.gunler.length)return '<div class="bos">Bu tarih aralığında'+(s.kod?" "+E(s.kod)+" için":"")+" ölçülecek sinyal yok.</div>";
  var h='<div class="ikili"><div><div class="buyukN '+(s.bakiye>=10000?"ye":"kr")+'">'+s.bakiye.toLocaleString("tr-TR")+
    ' ₺</div><div class="altN">güncel bakiye</div></div>'+
    '<div><div class="buyukN '+(s.getiri>=0?"ye":"kr")+'">'+(s.getiri>=0?"+":"")+s.getiri.toFixed(1)+
    '%</div><div class="altN">toplam getiri</div></div></div>'+
    '<div class="sat" style="margin-top:9px"><span class="et">Başlangıç</span><b>'+E(s.tarih)+" · 10.000 ₺</b></div>"+
    (s.sinirlandi?'<div class="sat"><span class="et">⚠️ Not</span><b>'+E(s.kod)+" için ayrıntılı geçmiş yalnız "+
      E(s.gercekTarih)+" tarihinden beri tutuluyor, simülasyon oradan başlatıldı.</b></div>":"")+
    '<div class="sat"><span class="et">İşlem yapılan gün</span><b>'+s.gunler.length+"</b></div>"+
    '<div class="sat"><span class="et">Toplam sinyal</span><b>'+s.toplamSinyal+"</b></div>"+
    '<div class="gunlukListe" style="margin-top:8px">'+s.gunler.slice().reverse().map(function(x){
      var sinH=(x.sin||[]).map(function(sn){
        return '<span class="sinP '+(sn.y>=0?"ye":"kr")+'">'+E(sn.k)+" "+(sn.y>=0?"+":"")+sn.y.toFixed(1)+"%</span>";
      }).join("");
      return '<div class="gunSat"><b>'+x.gun+'</b> <span class="et">('+x.n+" sinyal, ort "+
        (x.ort>=0?"+":"")+x.ort.toFixed(2)+'%)</span> → <b class="num">'+x.bakiye.toLocaleString("tr-TR")+" ₺</b>"+
        (sinH?'<div class="sinSar">'+sinH+"</div>":"")+"</div>";
    }).join("")+"</div>";
  return h;
}
function simBagla(){
  var dg=el("simDg");if(!dg)return;
  dg.onclick=function(){
    tit();
    var tarih=el("simTarih").value||simVarsayilanTarih();
    var kod=(el("simKod").value||"").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,10);
    dg.disabled=true;dg.textContent="⏳ hesaplanıyor…";
    post("/api/simulasyon",{tarih:tarih,kod:kod||undefined}).then(function(v){
      simSonuc=v;dg.disabled=false;dg.textContent="Simüle et";
      el("simSonucAlan").innerHTML=simSonucHtml();
    }).catch(function(){
      dg.disabled=false;dg.textContent="Simüle et";
      el("simSonucAlan").innerHTML='<div class="bos">Bağlantı hatası, tekrar dene.</div>';
    });
  };
}
function grafikHtml(seri){
  if(!seri||seri.length<2)return"";
  var mx=1;seri.forEach(function(x){mx=Math.max(mx,Math.abs(x.ort))});
  return '<div class="bilgi" style="margin-top:12px">Günlük ortalama getiri</div><div class="grafik">'+
    seri.map(function(x){
      var h2=Math.max(3,Math.round(60*Math.abs(x.ort)/mx));
      return '<i style="height:'+h2+"px;background:"+(x.ort>=0?"var(--yes)":"var(--kir)")+'"></i>';
    }).join("")+"</div>";
}
function gunlukListHtml(seri){
  if(!seri||!seri.length)return"";
  var gunler=seri.slice().reverse();
  return '<div class="bilgi" style="margin-top:12px">📅 Günlük sinyal detayı — hangi sinyal ne kazandırdı</div>'+
    '<div class="gunlukListe">'+gunler.map(function(x){
      var sat=(x.sin||[]).map(function(s){
        return '<span class="sinP '+(s.y>=0?"ye":"kr")+'">'+E(s.k)+" "+(s.y>=0?"+":"")+s.y.toFixed(1)+"% <i>"+E(s.tf)+"</i></span>";
      }).join("");
      var fazla=x.n>(x.sin||[]).length?'<span class="et"> · +'+(x.n-x.sin.length)+" diğer</span>":"";
      return '<div class="gunSat"><b>'+x.gun+'</b> <span class="et">('+x.n+" sinyal, ort "+
        (x.ort>=0?"+":"")+x.ort.toFixed(2)+"%)</span>"+fazla+'<div class="sinSar">'+sat+"</div></div>";
    }).join("")+"</div>";
}
function davetCiz(){
  var h='<div class="sayac"><div><div class="n">'+D.ref+'</div><div class="a">toplam davet</div></div>'+
    '<div><div class="n">'+(D.super?"👑":D.kalan)+'</div><div class="a">'+(D.super?"süper üye":"kalan kişi")+"</div></div></div>";
  h+='<div class="kutu"><h3>📤 Sistemi paylaş</h3>'+
    '<div class="bilgi">Her <b>20 davette</b> süper üyeliğin <b>1 ay</b> açılır; zaten süper üyeysen mevcut sürenin üstüne <b>1 ay eklenir</b>. Sayaç asla sıfırlanmaz.</div>'+
    '<div class="link">'+E(D.link)+"</div>"+
    '<button class="dg" id="paylas">📤 Telegram\\'da paylaş</button>'+
    '<button class="dg ik" id="kopyala">📋 Bağlantıyı kopyala</button>'+
    '<div class="durum" id="dvDurum"></div></div>';
  h+='<div class="kutu"><h3>👑 Süper Üyelikte ne açılır?</h3>'+
    '<div class="sat"><span class="et">🟨 Aday listeleri</span><b>her dilim</b></div>'+
    '<div class="sat"><span class="et">🔔 Anlık uyarı</span><b>açık</b></div>'+
    '<div class="sat"><span class="et">⏳ Bekleme</span><b>yok</b></div></div>';
  el("govde").innerHTML=h;
  el("paylas").onclick=function(){
    tit();
    var u="https://t.me/share/url?url="+encodeURIComponent(D.link)+"&text="+encodeURIComponent(D.davetMetin||"");
    try{TG.openTelegramLink(u)}catch(e){location.href=u}
  };
  el("kopyala").onclick=function(){
    tit();
    try{navigator.clipboard.writeText(D.link);el("dvDurum").textContent="✅ kopyalandı"}
    catch(e){el("dvDurum").textContent="kopyalanamadı — bağlantıya basılı tut"}
  };
}
function panelCiz(){
  el("govde").innerHTML='<div class="yukleniyor">panel yükleniyor…</div>';
  post("/api/yon",{is:"ozet"}).then(function(v){
    if(!v||!v.ok){el("govde").innerHTML='<div class="bos">Panel açılamadı.</div>';return}
    var h='<div class="sayac"><div><div class="n">'+v.uye+'</div><div class="a">üye</div></div>'+
      '<div><div class="n">'+v.aktif24+'</div><div class="a">24s aktif</div></div>'+
      '<div><div class="n">'+v.super+'</div><div class="a">süper</div></div></div>';
    h+='<div class="kutu"><h3>📦 Liste durumu</h3>'+
      '<div class="sat"><span class="et">Son yükleme</span><b>'+E(v.guncelleme||"—")+"</b></div>"+
      '<div class="sat"><span class="et">Depo (KV)</span><b>'+(v.depo?"bağlı ✅":"YOK ⚠️")+"</b></div>"+
      v.ozet.map(function(x){return '<div class="sat"><span class="et">'+E(x.ad)+"</span><b>"+x.n+" hisse</b></div>"}).join("")+
      "</div>";
    h+='<div class="kutu"><h3>👑 Süper üyelik</h3>'+
      '<input class="gir" id="pkId" inputmode="numeric" placeholder="kullanıcı ID (örn. 123456789)">'+
      '<input class="gir" id="pkAy" inputmode="numeric" placeholder="kaç ay (boş = 1)">'+
      '<button class="dg" id="pkVer">👑 Süper üyelik ver</button>'+
      '<button class="dg ik" id="pkSor">🔎 Durumunu sor</button>'+
      '<button class="dg kirmizi" id="pkKapat">🔻 Üyeliği kapat</button>'+
      '<div class="durum" id="pkDurum"></div></div>';
    h+='<div class="kutu"><h3>🚫 Engelleme</h3>'+
      '<input class="gir" id="peId" inputmode="numeric" placeholder="kullanıcı ID">'+
      '<button class="dg kirmizi" id="peEkle">🚫 Engelle</button>'+
      '<button class="dg ik" id="peSil">↩️ Engeli kaldır</button>'+
      '<div class="durum" id="peDurum">engelli: '+v.engel+" kişi</div></div>";
    h+='<div class="kutu"><h3>📢 Duyuru</h3>'+
      '<textarea class="gir" id="pyMetin" placeholder="Mesaj (HTML: <b>kalın</b> yazabilirsin)"></textarea>'+
      '<label class="etiketDosya" for="pyDosya">🖼 Fotoğraf / 🎬 video ekle (isteğe bağlı)</label>'+
      '<input id="pyDosya" type="file" accept="image/*,video/*" style="display:none">'+
      '<div id="pyOnizle"></div>'+
      '<button class="dg ik" id="pyTest">🧪 Önce bana gönder</button>'+
      '<button class="dg kirmizi" id="pyHepsi">📢 HERKESE gönder</button>'+
      '<div class="durum" id="pyDurum">'+(v.sonYayin?"son duyuru: "+E(v.sonYayin):"")+"</div></div>";
    h+='<div class="kutu"><h3>🛠 Tam panel</h3>'+
      '<div class="bilgi">Üye tablosu, CSV dışa aktarma, davet ağacı ve ayarlar tarayıcıda.</div>'+
      '<button class="dg ik" id="pTam">🌐 Tam paneli aç</button></div>';
    h+='<div class="kutu"><h3>📐 Fibo Aralığı Ölçüm İstasyonu</h3>'+
      '<div class="bilgi">Hisse hangi fibo aralığındayken ertesi gün yeşil kapanıyor, 3 bar sonra azami nereye gidiyor — dört sınavlı araştırma. Uygulamanın içinde, 📐 Fibo Aralığı Ölçüm İstasyonu sekmesinde.</div></div>';
    el("govde").innerHTML=h;
    function id(x){return(el(x).value||"").replace(/\\D/g,"")}
    function calis(is,gov,kutu,btn){
      var b=el(btn);b.disabled=true;el(kutu).textContent="…";
      gov=gov||{};gov.is=is;
      post("/api/yon",gov).then(function(r){
        b.disabled=false;
        /* 🐞 Sunucu 500 döndüğünde alanlar "hata"/"sebep" oluyor, "mesaj" yok —
           eskiden bu yüzden sebepsiz "işlem tamam" ya da boş çıktı gösteriliyordu.
           Artık gerçek sebep varsa o gösterilir. */
        el(kutu).innerHTML=(r&&r.mesaj)?r.mesaj:(r&&(r.hata||r.sebep))?("⚠️ "+(r.hata||"")+(r.sebep?" — "+r.sebep:"")):"işlem tamam";
      }).catch(function(e){b.disabled=false;el(kutu).textContent="⚠️ bağlantı hatası"+(e&&e.message?" — "+e.message:"")});
    }
    el("pkVer").onclick=function(){tit();calis("super",{id:id("pkId"),ay:(el("pkAy").value||"1").replace(/\\D/g,"")},"pkDurum","pkVer")};
    el("pkSor").onclick=function(){tit();calis("kim",{id:id("pkId")},"pkDurum","pkSor")};
    el("pkKapat").onclick=function(){tit();calis("superkapat",{id:id("pkId")},"pkDurum","pkKapat")};
    el("peEkle").onclick=function(){tit();calis("engel",{id:id("peId")},"peDurum","peEkle")};
    el("peSil").onclick=function(){tit();calis("engelkaldir",{id:id("peId")},"peDurum","peSil")};
    var medya=null;
    el("pyDosya").onchange=function(){
      var f=el("pyDosya").files&&el("pyDosya").files[0];if(!f)return;
      if(f.size>45*1024*1024){el("pyDurum").textContent="⚠️ dosya çok büyük (en fazla 45 MB)";return}
      el("pyDurum").textContent="⏳ yükleniyor… ("+Math.round(f.size/1024)+" KB)";
      var fd=new FormData();fd.append("initData",(TG&&TG.initData)||"");fd.append("dosya",f,f.name);
      fetch("/api/medyayukle",{method:"POST",body:fd}).then(function(r){return r.json()}).then(function(r){
        if(!r||!r.ok){el("pyDurum").textContent="⚠️ "+((r&&r.hata)||"yüklenemedi");return}
        medya={fileId:r.fileId,tur:r.tur};
        el("pyDurum").innerHTML="✅ "+(r.tur==="video"?"video":"fotoğraf")+" hazır — test mesajı olarak sana gönderildi";
        el("pyOnizle").innerHTML='<div class="sat"><span class="et">Ekli medya</span><b>'+
          (r.tur==="video"?"🎬 video":"🖼 fotoğraf")+'</b></div><button class="dg ik" id="pyMedyaSil">🗑 Medyayı kaldır</button>';
        el("pyMedyaSil").onclick=function(){medya=null;el("pyOnizle").innerHTML="";el("pyDosya").value="";
          el("pyDurum").textContent="medya kaldırıldı"};
      }).catch(function(){el("pyDurum").textContent="⚠️ yükleme başarısız"});
    };
    el("pyTest").onclick=function(){tit();calis("yayin",{metin:el("pyMetin").value,hedef:"test",
      fileId:medya&&medya.fileId,tur:medya&&medya.tur},"pyDurum","pyTest")};
    function yayinTur(imlec,toplam,toplamKuyruk){
      toplamKuyruk=toplamKuyruk||0;
      post("/api/yon",{is:"yayin",metin:el("pyMetin").value,hedef:"hepsi",imlec:imlec,
        fileId:medya&&medya.fileId,tur:medya&&medya.tur}).then(function(r){
        /* 🐞 DÜZELTİLEN HATA: hata anında sunucu {hata,sebep} döndürüyor ama
           burada yalnızca "mesaj" alanına bakılıyordu, bulunamayınca ekrana
           salt "hata" yazılıyor — asıl sebep (ör. KV limiti, engelli liste
           okunamadı) hiç görünmüyordu. Artık gerçek sebep gösteriliyor. */
        if(!r||!r.ok){el("pyDurum").textContent=(r&&(r.mesaj||r.hata))?("⚠️ "+(r.mesaj||r.hata)+(r&&r.sebep?" — "+r.sebep:"")):"⚠️ hata — sunucudan yanıt alınamadı";el("pyHepsi").disabled=false;return}
        toplam+=r.gonderilen||0;toplamKuyruk+=r.kuyruklandi||0;
        el("pyDurum").textContent=(r.bitti?"✅ bitti · ":"gönderiliyor… ")+toplam+" kişiye gitti"+(r.basarisiz?" · başarısız: "+r.basarisiz:"")+(toplamKuyruk?" · "+toplamKuyruk+" kişiye arka planda tekrar denenecek":"");
        if(!r.bitti&&r.imlec)setTimeout(function(){yayinTur(r.imlec,toplam,toplamKuyruk)},350);
        else el("pyHepsi").disabled=false;
      }).catch(function(e){el("pyDurum").textContent="⚠️ bağlantı hatası"+(e&&e.message?" — "+e.message:"");el("pyHepsi").disabled=false});
    }
    el("pyHepsi").onclick=function(){
      tit();
      var g=function(){
        if(medya&&el("pyMetin").value.length>1024){el("pyDurum").textContent=
          "⚠️ medya varken yazı en fazla 1024 karakter olabilir";return}
        el("pyHepsi").disabled=true;el("pyDurum").textContent="başlıyor…";yayinTur("",0,0)};
      try{TG.showConfirm("Duyuru TÜM üyelere gönderilsin mi?",function(o){if(o)g()})}
      catch(e){if(confirm("Tüm üyelere gönderilsin mi?"))g()}
    };
    el("pTam").onclick=function(){tit();try{TG.openLink(v.panelUrl)}catch(e){location.href=v.panelUrl}};
  });
}
try{
  TG.BackButton.onClick(function(){
    var K=el("katman");
    if(K.classList.contains("ac")){K.classList.remove("ac");K.innerHTML="";tgGeriDugme();if(sekme==="fav"||sekme==="portfoy")basla();return}
    if(yolIx>0){yolGit(-1);return}
    TG.close();
  });
}catch(e){}
araBagla();
/* 🏠 ANA MENÜ: her ekranda üstte sabit duran tek düğme. Açık bir detay/
   formasyon katmanı varsa önce onu kapatır, sonra hangi sekmede olursak
   olalım ana listeye (varsayılan sekme) döner — "geri" tuşu gibi değil,
   doğrudan başa sıfırlar. */
function anaMenu(){
  tit();
  var K=el("katman");
  if(K&&K.classList.contains("ac")){K.classList.remove("ac");K.classList.remove("genis");K.innerHTML=""}
  sekme="potansiyel";sira="kar";adayTf="adayOrta";
  fDilim="hepsi";fTip="hepsi";fDurum="hepsi";fMesafe="hepsi";fMesafeManuel=null;
  tgGeriDugme();
  ciz();
  window.scrollTo(0,0);
}
var amb=el("anaMenuBtn");if(amb)amb.onclick=anaMenu;
var bub=el("baslikYazi");if(bub)bub.onclick=bizeUlasin;
basla();
</script></body></html>
`;
const BILGI_METIN="ℹ️ <b>YUMATU 1 NEDİR?</b>\n\nBIST hisseleri için otomatik teknik tarama yapan bir <b>yapay zekâ</b> sistemidir. Sonuçlar <b>120.657 barlık</b> geçmiş veri üzerinde çalışan tarama motorundan çıkar. Gün içinde düzenli aralıklarla taranır, sonuçlar burada listelenir.\n\n<b>İçermez:</b> insan görüşü, şirket analizi, haber ya da bilanço değerlendirmesi. Yalnızca fiyat ve hacim matematiğidir.\n\n<b>3 liste — her biri YALNIZ kendi zaman diliminden:</b>\n📊 <b>1 SAAT</b> — yalnız 1 saatlik sinyaller\n📐 <b>4 SAAT</b> — yalnız 4 saatlik sinyaller\n🗓 <b>1 GÜN</b> — yalnız günlük sinyaller\n\nBir liste başka bir dilimin sinyalini <b>asla</b> göstermez; başlıkta yazan dilim ile kartın içindeki dilim her zaman aynıdır.\n\n🔎 <b>Hisse sorgulama</b>\nSohbete hisse kodunu yaz (örn. <code>THYAO</code>). O hissenin <b>iki yönünü birden</b> gönderirim: yukarı için direnç ve yükseliş hedefi, aşağı için destek ve düşüş hedefi. Hisse listelerde olmasa bile cevap alırsın.\n\n<b>Diğer düğmeler:</b>\n🏅 <b>İlk 3\'ü</b> — son taramanın en iyi 3 sonucu\n⭐ <b>Takip listem</b> — seçtiğin hisseleri anlık kâr/zararıyla takip et; eklemek/çıkarmak için hep aynı ⭐ düğmesine dokun\n🟨 <b>Adaylar</b> 👑 — her dilim için <i>henüz kırmadı ama makul mesafede.</i> Tetik seviyesini ve kırarsa gideceği hedefi gösterir; yani sinyal oluşmadan ÖNCE görürsün <b>(Süper Üyelik)</b>\n👑 <b>Anlık uyarı (Süper Üyelik)</b> — bir hisse güçlü bir sinyale girdiği an sana özel mesaj gelir\n\n<b>Süper Üyelikte neler açılıyor?</b>\n🟨 Aday listeleri (her dilim için)\n👑 Anlık uyarı mesajları\n⏳ Bekleme yok — listeler ve hisse sorguları anında\n\n<b>Süper Üyelik nasıl kazanılır?</b>\n📤 Sistemi paylaş düğmesiyle arkadaşlarını davet et. Davet sayacın hiç sıfırlanmaz, tüm zamanların toplamı olarak birikir. <b>Her 20 davette</b> süper üyeliğin <b>1 ay</b> açılır ya da (zaten süper üyeysen) mevcut süren üzerine <b>1 ay daha eklenir</b> — yani davet etmeye devam ettikçe süper üyeliğin otomatik uzar.\n\n<b>Neden bazen bekleme çıkıyor?</b>\nSistem çok sayıda kullanıcıya aynı anda hizmet verir; bu yüzden bazı işlemlerde kısa bir bekleme uygulanır. Bu, herkesin hizmeti düzgün alabilmesi içindir.\n\n<b>🔴 RİSK UYARISI</b>\n• Buradaki hiçbir çıktı <b>yatırım tavsiyesi değildir</b>.\n• Teknik tarama <b>geleceği bilmez</b>; hedefler tutmayabilir.\n• Geçmiş performans gelecek için <b>garanti vermez</b>.\n• Borsada <b>anaparanın tamamını kaybedebilirsin</b>.\n• Bu sonuçlara dayanarak işlem yapmak <b>tehlikelidir</b>. Sorumluluk tamamen sana aittir.\n\n<i>⚠️ Yatırım tavsiyesi değildir.</i>";function FAVKB(e){const t=[];for(let a=0;a<e.length;a+=2)t.push(e.slice(a,a+2).map(a=>({text:"❌ "+a,callback_data:"fav:"+a})));return t.push([{text:"◀️ Menü",callback_data:"menu"}]),{inline_keyboard:t}}
function K(e,t,a,n,i){
const r=e.kartlar[t],s=Math.max(1,Math.ceil(i.length/8)),l=[];l.push(["pot","kar","yeni"].map(e=>({text:(e===a?"✅ ":"")+A[e],callback_data:"l:"+t+":"+e+":0"})));const o=8*n,c=i.slice(o,o+8),d=e=>{
const t=I(e),a=void 0!==e.potansiyel&&null!==e.potansiyel?Number(e.potansiyel):null,n=null===a?"":a<=0?"🏆 ":"+"+a.toFixed(1)+"% ",i=null!==t?"  "+(t>=0?"+":"")+t.toFixed(1)+"%":(null!=e.tetikYuzde?"  🔓"+Number(e.tetikYuzde).toFixed(1)+"%":"")
;return n+(e.rozet||"")+e.kod+i};for(let e=0;e<c.length;e+=2)l.push(c.slice(e,e+2).map(e=>({text:d(r[e]),callback_data:"d:"+t+":"+e+":"+a+":"+n})));const u=[];return n>0&&u.push({text:"◀️ Önceki",
callback_data:"l:"+t+":"+a+":"+(n-1)}),n<s-1&&u.push({text:"Sonraki ▶️",callback_data:"l:"+t+":"+a+":"+(n+1)}),u.length&&l.push(u),l.push([{text:"◀️ Menü",callback_data:"menu"}]),{inline_keyboard:l}}
async function V(e,t,a,n,i,r,s){const l={chat_id:a,text:i,parse_mode:"HTML",disable_web_page_preview:!0,reply_markup:r};if(s&&!n&&t.message&&t.message.message_id){
const a=await b(e.BOT_TOKEN,"editMessageText",Object.assign({message_id:t.message.message_id},l));if(a&&a.ok)return a}return b(e.BOT_TOKEN,"sendMessage",l)}function j(e){
const t=e=>Number(e).toFixed(2),kar=I(e),tuttu=void 0!==e.potansiyel&&null!==e.potansiyel&&Number(e.potansiyel)<=0;
let a="┏━━━━━━━━━━━━━━━━━━┓\n┃  <b>"+e.kod+"</b>  ·  <b>"+t(e.fiyat)+" ₺</b>\n┗━━━━━━━━━━━━━━━━━━┛\n";
if(tuttu)a+="🏆 <b>HEDEF TUTTU!</b>\n\n";else if(e.guc)a+=e.guc+"\n";
if(e.canli)a+="⚡ <b>CANLI</b> — bar henüz kapanmadı. Kırılım şu an geçerli ama bar kapanışında geri alınabilir.\n";
/* ⚓ Kirilimdan bu yana alanlarin ortalama maliyeti. Fiyat ustundeyse
   kirilim tasiniyor; altindaysa alanlar zararda, geri donus riski yuksek. */
if(e.avwap>0&&e.avwapBar>=3){
  const u=e.avwapUst!==!1;
  a+="⚓ Kırılım ortalaması: <b>"+e.avwap+"</b> · fiyat "+
     (u?"üstünde ✅":"<b>altında</b> ⚠️")+" ("+(e.avwapFark>0?"+":"")+e.avwapFark+"%)\n";
}
/* 🎖️ Bağlam rozetleri — yalnız eşiği geçenler yazılır. Her kartta
   görünürlerse anlamlarını yitirirler; nötr bölgede sessiz kalırlar. */
{
  const rz=[];
  if(e.raf>=1.5)rz.push("📚 kalın raf "+e.raf+"x");
  else if(e.raf>0&&e.raf<=0.5)rz.push("📚 <b>ince raf</b> "+e.raf+"x");
  if(e.er>=0.45)rz.push("📐 temiz trend "+e.er);
  else if(e.er>0&&e.er<=0.20)rz.push("📐 <b>testere</b> "+e.er);
  if(e.gguc!=null&&isFinite(e.gguc)){
    if(e.gguc>=3)rz.push("📊 endeksi geçiyor +"+e.gguc+"%");
    else if(e.gguc<=-3)rz.push("📊 <b>endeksin gerisinde</b> "+e.gguc+"%");
  }
  if(rz.length)a+=rz.join("  ·  ")+"\n";
}
if(e.zaman&&(a+="⏱ Sinyal: "+e.zaman+(e.tf?"  ·  "+e.tf:"")+"\n"),void 0!==e.giris&&null!==e.giris){a+="🚪 Sinyal fiyatı: <b>"+t(e.giris)+"</b>\n";null!==kar&&(a+=(kar>=0?"🟢":"🔴")+" Sinyalden bu yana: <b>"+(kar>=0?"+":"")+kar.toFixed(2)+"%</b>\n")}
return null!=e.tetik&&(a+="🔓 Tetik seviyesi: <b>"+t(e.tetik)+"</b>"+(null!=e.tetikYuzde?"  ·  "+(e.tetikYuzde>=0?"+":"")+Number(e.tetikYuzde).toFixed(2)+"% kaldı":"")+"\n<i>Bu seviye kırılırsa o dilimin sinyali başlar — giriş fiyatı değildir.</i>\n"),null!=e.hedef1&&(a+="🎯 Hedef 1: <b>"+t(e.hedef1)+"</b>"+(null!=e.hedef1Yuzde?"  ·  +"+Number(e.hedef1Yuzde).toFixed(1)+"%":"")+"\n"),e.direncler&&e.direncler.length&&(a+=(null!=e.hedef1?"🧱 Hedef 1: ":"🧱 Hedef 1: ")+e.direncler.filter(x=>null!=x).map(e=>t(e)).join(" · ")+"\n"),void 0!==e.hedef&&null!==e.hedef&&(a+="🎯 Hedef 2: <b>"+t(e.hedef)+"</b>",
void 0!==e.potansiyel&&null!==e.potansiyel&&(a+=tuttu?"  ·  🏆 fiyat hedefin "+Math.abs(e.potansiyel).toFixed(1)+"% üstünde":"  ·  "+(e.rozet||"➡️")+" <b>+"+Number(e.potansiyel).toFixed(1)+"%</b>"),a+="\n"),
e.sinyalZaman&&(a+="🕐 Sinyal zamanı: <b>"+e.sinyalZaman+"</b>\n"),a+="━━━━━━━━━━━━━━━━\n<i>⚠️ Yatırım tavsiyesi değildir.</i>",a}let H={},C=0;async function L(e){if(!e.VERI)return{toplam:0,basis:{},
gun:{}};const t=await e.VERI.get("istatistik");return t?JSON.parse(t):{toplam:0,basis:{},gun:{}}}async function F(e){if(!e.VERI)return{};const t=await e.VERI.get("referanslar")
;return t?JSON.parse(t):{}}async function PK(e){if(!e.VERI)return{};const t=await e.VERI.get("paylasim");return t?JSON.parse(t):{}}async function PKArtir(e,t){if(!e.VERI)return;const a=await PK(e);a[t]=(a[t]||0)+1,await e.VERI.put("paylasim",JSON.stringify(a))}
/* 👣 İZ (ayak izi): kullanıcı bazlı oturum süresi + sekme kullanım istatistiği.
   Her kullanıcı kendi KV anahtarında tutulur (iz:{uid}) — farklı kullanıcılar
   aynı anda yazınca tek bir anahtarda çakışma/limit sorunu yaşanmasın diye. */
async function izOku(A,uid){if(!A.VERI)return null;const t=await A.VERI.get("iz:"+uid);return t?JSON.parse(t):null}
async function izYaz(A,uid,sekme,sn){
  if(!A.VERI||!uid)return;
  const girisMi=sekme==="__giris__";
  sn=Math.max(0,Math.min(300,Number(sn)||0)); /* tek bildirimde en fazla 5dk say — hatalı/art niyetli çok büyük değerleri engelle */
  if(!girisMi&&sn<=0)return;
  const mevcut=await izOku(A,uid)||{toplamSn:0,sekmeler:{},girisSayisi:0,ilkGiris:Date.now(),sonGiris:Date.now(),sonSekme:null,sonGorulme:Date.now()};
  if(girisMi){
    mevcut.girisSayisi=(mevcut.girisSayisi||0)+1;
  }else{
    const sk=String(sekme||"bilinmiyor").slice(0,30);
    mevcut.toplamSn=(mevcut.toplamSn||0)+sn;
    mevcut.sekmeler[sk]=(mevcut.sekmeler[sk]||0)+sn;
    mevcut.sonSekme=sk;
  }
  mevcut.sonGiris=Date.now();mevcut.sonGorulme=Date.now();
  await A.VERI.put("iz:"+uid,JSON.stringify(mevcut),{expirationTtl:60*60*24*400});
}
/* Panelde toplu göstermek için: en çok vakit geçiren kullanıcılar + sekme popülerliği.
   Not: her çağrı KV'den kullanıcı sayısı kadar okuma yapar — bu yüzden /panel/iz
   ayrı ve istek üzerine (panel sekmesi açıldığında) çağrılan bir uç, /panel/veri'nin
   her açılışında otomatik tetiklenmiyor. */
async function izListele(A,limit){
  if(!A.VERI)return{kullanicilar:[],sekmeToplam:{}};
  limit=limit||500;
  let liste=[],cursor;
  for(let i=0;i<20&&liste.length<limit;i++){
    const s=await A.VERI.list({prefix:"iz:",limit:1000,cursor});
    for(const k of s.keys){
      const v=await A.VERI.get(k.name);
      if(v)liste.push({id:k.name.slice(3),...JSON.parse(v)});
      if(liste.length>=limit)break;
    }
    if(s.list_complete||!s.cursor)break;
    cursor=s.cursor;
  }
  const sekmeToplam={};
  for(const u of liste)for(const[sk,sn]of Object.entries(u.sekmeler||{}))sekmeToplam[sk]=(sekmeToplam[sk]||0)+sn;
  liste.sort((a,b)=>(b.toplamSn||0)-(a.toplamSn||0));
  return{kullanicilar:liste,sekmeToplam};
}
async function hmacSHA256(e,t){const a=await crypto.subtle.importKey("raw",e,{name:"HMAC",hash:"SHA-256"},!1,["sign"]);return new Uint8Array(await crypto.subtle.sign("HMAC",a,t))}function bytesToHex(e){let t="";for(const a of e)t+=a.toString(16).padStart(2,"0");return t}
/* GÜVENLİK: /tg webhook'u kimden geldiğini doğrulamıyordu — Telegram dışından
   sahte bir update POST edilip from.id sahtelenerek yönetici komutları
   tetiklenebiliyordu. Telegram'ın secret_token mekanizmasını kullanıyoruz:
   BOT_TOKEN'dan sabit bir imza türetiyoruz (ekstra ortam değişkeni gerekmez,
   BOT_TOKEN değişirse imza da otomatik değişir), setWebhook'a veriyoruz ve
   her /tg isteğinde Telegram'ın gönderdiği başlıkla karşılaştırıyoruz. */
let WHS=null;async function whS(e){if(WHS)return WHS;if(!e.BOT_TOKEN)return null;const t=new TextEncoder(),a=await hmacSHA256(t.encode("fixborsa-tg-webhook"),t.encode(e.BOT_TOKEN));return WHS=bytesToHex(a).slice(0,32)}
async function dogrulaInitData(e,t){const a=new URLSearchParams(e),n=a.get("hash");if(!n)return null;a.delete("hash");const i=[];for(const[e,t]of a.entries())i.push(e+"="+t);i.sort();const r=i.join("\n"),s=new TextEncoder(),l=await hmacSHA256(s.encode("WebAppData"),s.encode(t)),o=await hmacSHA256(l,s.encode(r));if(bytesToHex(o)!==n)return null;const c=a.get("user");if(!c)return null;try{const e=JSON.parse(c);return e&&e.id?String(e.id):null}catch(e){return null}}function W(){return(new Date).toISOString().slice(0,10)}let _={};async function Y(e){if(!e.VERI)return{};const t=await e.VERI.get("kullanim");return t?JSON.parse(t):{}}
const J=["H4sIAAAAAAACA7192XLbOLvg/TwFgtRvk0cULdnORpnycTr+8/vE6aRip6ty0rmASEhCkwQ1AOhYlvUG8w7zEFM1cz/zQvMIUx9AcNFmJ909N7FIYv32DcjJkziP1HxG0VRl6fAE/kUp4ZMQK4GHJ1NK4uFJRhVB0ZQISVWICzXuvsTlW04yGuIbRr/PcqEwinKuKFch","/s5iNQ1jesMi2tUPHuNMMZJ2ZURSGvY926s7ZiqM8hsKMyqmUjr8J7tFr3MhCfrf/wt9+T//k1PFInZyYL6eSDVP6TAQea4W3e5oEjztxf1+/8Wg202IUMHT/vP+6PBw0O1G7C54evjikB7Bxzm5C57S5zQeHw26XZmnwdOXo1fHryh8o8HTo/Ho1bMejMJE8HT88ln/","+BU0JCJ4Gh++eqWHzMgNC54evXw5GsfLf1uM8tuuZHeMT4JRLmIquqP8dtD9TkcJU11FZt0pm0xTNpmqbpSnuQiUIFzOiKBcLUd5PF9kREwYD3qDEYmSicgLHgc3RDiwNXdgOpnnOblzB+Ocq6D/bHZ70PefITmXimbdgnldMpultGteeJJw2ZVUsPFgRuIY1tc/nN0i","/c+L3ux2Oe0vYChYPQ36L2e3A7sQ1ENHs9ulT1K1aE4v89RMX/Y59J9Bs6RQRUrEImZylpJ5MBEsHsA/XUWzWUoUhZ0XGZeBoDNKlEMKlQPavYzxjNw6/d7x7Nbrj4XrDiZkFjQWo9fbM5Ms1gAE6HYHBvBBf3aLZJ6yGJmPEbuz37qCxKyQQb8/u63h0bOrRz5vwOLw","aHZrtvmdAt6Cl73eIGWcdqfmue/3bT+6E0A9ANBA0VvV1Vgf5yILitmMiohIOkipUlR05YxEsB6/d0SzZUwVYan8C/Z62IBiD6A4ACYbp/n3YMrimPKlLLKMiPmigsgRUMjxyvZf9HrNTR3rTUWFkLkIZjnjiopByqTqar4MeM7pwNLCOKW3gz8Kqdh43i2lQwAbpt0R","Vd8p5QOSsgnvMkUzGURUj1bSgF1fEFh+KoHTzYhIaE1xMGXdmIwVFQs7Gf798NnrczzYhScg43Lor/mM8m9o12DH2M6FfDlvIuppPzo8Ouqtz9XGzGGvSYWzW/TKQtwsp68hvIKCpc+iClE9jSX9z1KRUUoXWsYG/V7vH3ayKE9TMpM0sD+aUwB/q+lCk6ZGQJDSsdoC","pHIRz3u9atXPZ7eDSt4plWebKfL7lCmqCRzo4rsgs6WKFz82yNJPyDxmYmGpt3sbgACphGz1XkYiT1MYWeVFNF36QJV0kZFby7nHPQB91WGuB1pGeUw3obGJomf1WkssHreRdgjCpGiTw1Hcj/vxNp5NmFjj2d6KfFph4CYGtfBlfFYoD9BIBCWepCmNVIsYGsvpjXrj","/vFOEbKmbXatr19CwGqj44Y2augfs4WuymeA8aVd7CJjvJKoemBB9dZuqFAsIulyVCiV83VJCCrYLvXpeDy2O+o9tFrUt4wFxIyMKNu86BX51tiDVk710o8B8WalPksYj1iLBA77h88P421w3Uzw5WgJE62hjkl/3B/X+x4dE7o+ztPno8PR4cgOMl+h7MOjqB/ZMV5Q","2ns53jBGf/x8dNSvFtLkWKShumoFNCHSqwyJcoAgZhKEVLzIQdWpeeAfP1v6kgmyaCkKq/ubKgE+dCmPTfthzG4W8CromxeoJJINksYXd9XwjGsFPkrzKHlIGr9ckcabZLG482+2A7bEM3W3gxZGoJuExSPR6xfJ4gd5+wFTyNJ4KYpfanmWIH+0+AFlvhWDUhGhzIAk","XjxkXpiG8aQ9tR4IUBvAP3qu5/W6gTdfQVeWUpHSRUmNsJqtgLLAeN7QCqVx1BxWg2cXx5ZzIlYt2FCaFW8rkrimDyOpewNtHjLFch7oV8g/fCaXPpsV0W4TvL3/F7D/zAK4Nm58SRQTh48x0ftjgfrj2gbzkzxZ/CBZrVHSmuUJow79EZFtJur3Xx7WevdVS9psJhet","Bgd/kkKN2bn0Y5KWW+2CORQcbtpvuTnd4FXNQ+YFbH/px8WkyCqh+WJNdVdtgBnYYsXI0rJh9gN25WaaPDkwfvLJgXHjwdccnkz7De+6i77k1ree9ocnMbtBUUqkDDFJFUYsDnEhFR7OiySlnM1z4fv+yUHMbkxjaFC6f3ho3xtDGoEhPTwpLeXh5y/nl+ef0ImcEW7n","kHMzhZx/nlM87J0cwNfhyYHt1FwQi/DwRJs7ug8RBKNZSiI6zdOYihAzyTIPJUWaEs4ihkjM0A2dE3TxBunWOdfdQ1zM6S/sznHx8MQYTGaj8ys6yShX0DKaEj6hjaZIAzPEbUMAD0/yGXAtuiFpQUM8pTPJ8PC6yIqTA/NptQlJFBvj4Rn8QQ7liNyhPpK5mBTutj5m","VxmZE46H/2IRarzY1meUK8onNE0ZHr7OVYHME82Y3NZlRjhNq04f4SmmvOzItvWSjDMh2R0eXpW/EBWAjWaXAwPpNkpnRYSH74hQiiQMxcUko0aOyvZA6IYKD41oktKMIlmAocgZkmzMREo8pGiCEibZnKKMSvIHIsqg3nRnKCEzolYJt5jDbNiuRjsLm/AMIqiibmNu","VDvQBp8mmJRFSYgjeXPBYyaAuK6LDJk5GPrl6jfE4MPJgRnBjndQsss2vnl7/ukCvb64fHPx6eL9Dg56O3oUA61B//N8UqQkIzFgAL9mdxR9TolkHCOR31HFOFDABMgCTXJRFBLdUJRzKkDleYhyNKecwd9CKkV99IVwpgArRJIJ0+Ne57O0QO81akagZwpeoNyiLOcR","hUniPI0LUaRZIZGkCUtjikhExCreJqNLg6ofQtwWcNeQvvrw6e1ndHnx5vzTJQB9C6CvgFF/FNbGg0XlSvVAMMwli6l4/ArfnP12fv3wCt+QG6r+/ApjGOanVnj29uyXras7m5DoR2X9hERnf0LeQ38r8NcY4F9UoCRPPHQHrCwYiDuk6AxETEwTpqkUQNO1FAuvMkmR","BhCiKqMxQyQjKEcjIhOSEgHSyX5WzEdnKTCSFnIkTYnwYKw8UZRDlxTEOFJFVvaxK2FokktFBRM++kgE4YreIdiqJHOGwnI9nAHrTEQRE96YdGJWrttK5iH8McCISYpmZJ4SiVQhC05g+oyUjVYZDeD2V3PZx7Mvl2dX6Prz1SN47aNe6s8JtndAHRIWnTG7Z61hJOMU","JSRCCRUU9q9h5VTYZBLlqSw4mhMUE5SnGYhDD02pSKhEo0KQmLhNWG1lITPto3hIt5+TOeOv0zzBNcCuP3y8/Izen1+d/ceO7adkRNOm7Qb7pycH+n3LzNFz/IvGdNy0c6bw4g2dMKmY5pNtZk2p0bbZAjdshodXJKbRmhJP2Y5+iiZ4eF2p8S12A6xf0eRdoYqKEpsx","4I2AuKYpnQiSoYs3FTxq2aLBcU2Tixgj/TbLYxpiXmRUsGhF5PQPj46fPX/x8lWFzbXpVpdl/MA1dtG6sFqODYnVK3oPmndl9vdUTMmIPEGvi0nBC24oTZsXk4JHYNvxmPm+D6uzQ26SeNfvL0u5SUYsBRzxAO2lajDam6hBQlLG4elAP+oPDH4xRVKW6C+s+kLQVNBx","iGFaeJkybpoQePJLpQ+afVKgCRsxNAF28BABkUgMSyKw7HhG7zZwlfFccWV5VaaWhtPbnMcUrK0G/yiOh+Z9bWw9YLaVVCAV0P5rwglSVCpE1Kq51gSmNlVBUdVz/1KMCmDeA7ahQ+VS6aZvClFkm+Tpc6CPKbkDW/GRlsvFrxefri7+E51/uri6eL9Nmv4GvPljohQi","bObNj3PWDZv9JFOtYvqGzc6TlAJu4O8unGgCf10Y1gD1nVKx6jhQNGURApcjzcidjy7e7M8ZyDUEKTbQ0xwl+WxOQC9rBrGqQBgz+WRUezpzMjs5GA0r1cJWOWtVqd6w2eVfo0oNti/Qu7OPZ5cXl2dbfYNz8N/+f6JeO4x/DvlWpzLRYFM9bkUKxp19kBrKdpxyYxCN","ckXQnNxJjVPrdGpLwLyK6A2ZIQJe0Z2HlPZdtFuZEmH6kClLEY1ZuiKyqr3/RRh+/eH6Mzr/9e355eX5l/Nfd7h/r3P1U1gubSVrRIMtmYAWMWalxfJ+TABsdQiBSlbyxJRKMjLOeKpfy5wXUdEEGwJSAmuaoFzlGVEsAfE6Y0rDkAnkHPeO0D9zMdLBQddHrwuuga1o","Iogoh5lomQ7TzCmKSMpkycBfCE+ZtGPeEAhtmdVZhBd2JBIpNpfEygeOIpYQUTGrh0ZMwBYE8LmW03G1ihhoiK25o6MS9H8Vzs/fXZ6/P0dXnz+dX108kletjtzCrec6yOSA8EqIu4FhAU7qPVgcGzi2wVlbBo/y5OHRye3O0bdw71vKaWrQZWJk4F0hZ1JEaQEW5pyk","Og4xLxJJEzTLFQTS5zT1TFwiYYKlLEuJcMErNGQoiFQQ0kCjAl6mLFHEaAnAL7owbhWKKYj6npbvczIDuuKVMlEkIxnIFJImRPjoDVVk7mlaB8kBURJJ5mOCJvSOcc0aUxYBed2RrB6nkh+rSo/MiXhH5jHVNon59WDwqCajd58vL89+vXiP3py9vbi8eP8QJWlKJpLJ","x1Pq28+/Xn5+h96dXcMEj6PUhnM0KXhqjKXHTXf25ewduvjPrc7ixd3PCT8IABRAK7x0F2OqpRfJkHYUYyLQDUmYQhMaMRGzCdDGDYU4ARA+eFAMAlaZscWN/i+b1Q68DbQhErEkoRzNqGDzPGYJykHWJWZSTsDxTCAEl2hhlKdRkcWF8JAkHMJl5Z8ErA0U0wlLYxj/","HUnJCEi5cgtiit79hvKkqBx8zhBYOCIjGUkgksBLGiURSxmPGgLaRPzX6XObBc3uvhRGMWt0sDtthn+hnDVVtKU0dvfhjqoHhWUtQtjdnwkAsbsHgvj1uv6K0KKMBJupYZRz8CE4mSoiQk6/o8+fLq8oEdEUojmZdNI8IuDm+lK/df0JVQ5O6By7UByG4nCx9IxjodXd","PBfhk/5gXPBIO89URg51F4KqQnB0pQTjE4e6vqAaUM7B172TIf52MPFoOHQWeA8HeI9kswH28An8ThX8HMLPCfzcx/sB3vuvRa4GePmVfnPdZTWZnNdzOb8W2YgKh7r39z3XV/llDlWd5QqwEt3rT7jRF3JEDvWU7b/fipuAO99iTIqH+x3a2V9XChy+yLmj3A5uQh/X","c01oRDkslY2dJ9Q1E+IuVIABPlT4nqipP07zXDhviKI+z7877kGfHrldOihhqU6Onvd6p7qprlD09E+djnPUwfOe63YwihMdvMaBOnn5/Ni2t41gBGglSdmq9VV3gM+TgpvvSyLnPELVRsiMGZiZhbOQfCdMoTFV0dShHXya0HmIO5RD/dLnTxe/5Nks55Qrp6Q511On","i4yqaR4H+OOHq2vsQSqQChks8C8mO9q9ns8oDjAUjzJDjQd/yJzjpQcJw+A/rj786kuNVzYGuC+Dm5zFqOcOAL7MzxNXTUX+HQGBnwuRCwcLGsdg2sUMObjDfKmIKmQHu9i1AGY+zOK4q5ueGymyUGK+iMsdAyDwgU5OHdxQwbC7jIgGQkX7sCYnzqMCEnjARuegXLl6","Pb+IHZ3DdH0IifxiC5TnVIGWv0NdRGJBpdKhXjpHc21MwhQa6jR0YGNAKEDnF1cfSiJ3fZmyiDo9r99zPRV+GP1BI+XreJZ0Yl8r0/v7xRLYMS4i6mhkhkPaUZ6B3gPrZZxTAcEaWC3IUR4zhDut9Ri+u2bZKu91MNrLWBznalBaT7jjxKYi7m0ZLcroqR1r/dNWrg7w","PE+w23FsHxDl9/dfv7k+5A7V9BQD1hsf/YzMHBoOqU/iDg5wh/rc9f/IGXcwOkCwWBcHuL3omM5ys2b4dYpHZJIyHOAvH95h19sKOpuNboKvGgMHLcFTzCGsNHwDM+nhjTr1tcH3WccD5pDKEsyrg5kGmDe05eFob0T7It8F4ZOUCk3ekdaxWg3D+AQiyTbWldpw+77b","WROHOp++39FiE18bY6SYU+zFvjFN3PKbDgWihCiWEo49J/YnBddU95V+A9lctjs8RpIQpSgy6Wcv9vWPw2Pb4gUIonj1+4uJ216FtsGxp+xrGwjRc9+wWZMQbJvzMqMMTbQHuanRJzqmUASTEpNt1K1F+dJ0WOMjn3sgiM0AH+u8BizfxN7NqhuAWEmeQ8spi97VbyrI","tlPmejnW1UvZph38ShUqwHBLjT8JY3OqPjdeVVoLb6dgUw3RFldyDtxWmTopEa0F7BrM5Cs3DVenIB89mEktbhqsjalHDAXRyE0DrdLQrjFMyGPTKOtkBhQ9J8JqUxpuFyHWGQax/kArcovdQdUGogs3tGz2JAzp3p5DjUoIzfS+Hbyxr9Veam/PUZt6kVt3CWjjX8Ak","3Nt70jYN9/a2a5RGyHlFEUpQuvA1QLjTUAd2Gl8RwaZbtUGnFPZVc51J0qres8UzXgpEZn4mLGXK/NQa0vw0vqD5XWVrPcPCZYuR/lubeXbwCp/bNw/OgGsAen+PsdnLdyp+IZI6rq8EyxzXk3SyHdt1cVA5kKe0RX9FVYtoQdMZCLmux5pNGhTZajSizVarEqbZVLsE","PFyXAwOgMx5yf8xSRYWjwqHjKJ/EercdDGpU1b3qt8pn8So0GI/SIqbSoa7remW1UhiGkk5OG3Noda4lyLDnBq0CpY2Nn5St3aBZmLSx6Yj6UyId687AGl03aBcnbezINvarypNMnzaoaDhUG3q5pbNAdlGErh4yZjC3UqZpjpKGCbK/mggaatsCzfPEWgEavWmI8WCc","C6ekapSPEa8szaNez7UEz8MNC/dIuAEI3igPNwF1kHbaC9PhmMbzyIYUm4uPtXMGnqehsC7YgrQmr9P9doRG7/bfbZeqmVaFOlhjTL/9zQmz4Ql4NzCjz2Looh9rMxGDN2hpC5wt+NH8XLqDIKB0yd32mbQVxTK0r7djHmoDuXpVi0J4v2Ycl+AQdHzatGZBcUYMmd2A","BSxASpbbaUOgXl0Zd2ic0hFQJAoIcPjpfgvM4g7d4CoVWIJ2Xw/skFWciDtE8dAkjtpNR/nmtq8/XJeZiHaH/W3h23hSLXMlpYPaSZ0bNrtiqfP7vsXxvvt7XUoItXtps24ObPjVAecUr2ULL+JtQ5Y5u3I42MLqeGvRrSRX5MpUG9aj7v++D9liE8edV+WI25LOG4ZV","NNH58dWVvi+LGOtVahzu3rcWjRsgeV7WQJJoJwy3ZNrWwXjerKlswlHTzu41WvW2YZmvc2V8K2lKDnViprFirbPaIR8rdYdHvd7enrMqzTRTszRBR72eDcSmYCh5EB7MiI5KSShFNELJCmKvKbjT2uKorZgFiGrqqcFWK/rUoSE+0UfzhifKFGArAT+hNmOqf7xjklUP","xlGpHt9CfqN6+phD8WrVTWc0qmedeKiernJufh/AdAd2al38rX2Y1fWOc3FOoqnjKI+54XBBAYp6qbEFZGZkvtMLw5Cd4r6Pg775eejj4ND8PPJxwDr9DvYNohRMG4Ook1FpjGhzo/HtZDTU4ltVTi0G17vR13wkN+CW4dX3da5nw8cxG+UbXkOMdq6llnnfopX9Ulko","UBZVZwAkXroe7YTwxpTRHxjUYjegG4huSnlxV6oiXRXW0PM7/Jm6JLQZvaDeFvfq1FE/RmOQq7dEA/qoevoQF+luqmnPX9EMNTRjLZLHEohH6qYoj4u00b58rjqVz9Tnw7DfO8W6KhnEwUBtpVS+RoANW6VBf5UybpgWa9QJwao1wiSr1KE2U4faSh1iJd7xKBJp1OQ2","SUTVQorEr4sUAqM22r0xbjBmEIMOh6X1ohkzDMMqg1CFadWpYd2m/3CK/x1ch+pZ2zzwTyPeX3l5tXtmojYmKt82l9dBZIJso1yWENG2MWtQu6HMhqXMwVKmLgM0GJqo0MvXcWuIwsCKu015sNXkekBh7ndUBzv7ejatz35p6a8GsVQR8M46wSwHW1Ff1Q21ZEPte3ql","IbUrONqoTVkdpXJPvcqQwNYLGkEcou2ZDnZEZapalLXAzIg+HNVpl1M0l1n1PqXOiHpNYwK7wTY+M7Xa7eqVmJV0VVNsI9ZQkqymQWAfCEhYtql9X9Nh2HNBoyrHId7IDYej8n2XlD+aaYKeuwtsZbHzGtD0OizcSowk2/3SZs2xcU5bAzQd1GSng9oE34aa8QqGxnGd","/rQqet2oQN+uhAZmF6uaZ/p3WCv6vEHMQA7+hLYo8d5UGVZJNAE+3cT+tRivlmAzXEaDtRxtkMO0KYexe3/v4Is3yKzSbY+3Ttw1bXtEkF0RtPIExsNRtCkRTJFwsVyNYugZXfP5azMM8S2kJVVHeVQkKRFbe5eLF6Hxr6tRBB27AS/SFOhduAvHjvRVfAsbvw0XzwoJ","qcPlsjkH49X0btWDfmsxdz1sOfNIr79pk3XX2pC1Nvf3jhUTkJjoOqTx5NbZfWMUn6XKYbE30fnsSTOIoyNVJXX0BhOfxHHzUxkuXFvQ6nIaoI4A1Fvb805YLyny9aKsMuPLRlFCSiUTDt205jK+Zno96bdXXUalQGYRQWyjHrxo8KSOXNJdkUvoXPd+YHu0xg8bO3bx","kTdpDGGXW28yJimwE/WgIpGnLNm+2ft722Z4+MyWI+BtOyeC7O09qWFYxobdumO5Fxlu30kpkVsyXZ83hnMlzdBczGwwrynz9ssID9oYe8MdJ5JWE6/Him5gxKoBFEkYV6MR6quE5IbuMzz8GMCMpsVKkNBmzwBS1Ryu0QLNvZIUD/fXMC/daScsMRdVmOv0gY6n2n43","cYWSpqdlCUCSa6FUKqDKBHhYGJW1Mk/E/f2TUvCJb+7enrODBm1Io7d0B2bilgiqGRBkT0Ud3fo9ab6v7IVCFeFO6Y532ib60N6aZVKuz5omwLftVy1jo1DFI+yN1gm4tfD4tB0eTwCtZkrNfW3mSWowwFUAjBdW0UxsysUjqWoItaQJu8EqVSX5angczqZpAh7+3//+","3/4HanNSApxUsVCiI4aV1WCqFDexDklVZ18XLle1jKvxYHuxwMvyfgRkqtH2OyVtJ17Pm6xFy1YQML2/X8eBBl1GG3CvRV6drqt8uoUOzQT4bbsaF3t1aCbAX1Yrc7EHwZkAf2nX52IvIYLTAH/gERTj6EJy/V4HbQL8Lybh1CU8MOxpQgmwDmQgOHXEsGeKbwN8VRbh","HujqRrysy3MoV4Kt1ucYBjP+qfra/9alX/vfDD2rTaS83XfRBbTuI8gcypha1G1rvNTX3rev/W/39/1Sf2/3eb8SL/2Wj5ECzVx5vbjj0K/k2/09WakrKc8rWSIqryZ51r5A5FiXNTLbyFxPst9pVK71e71/Sw+Y29n/R+ug0yMcaFO6l66bxoMfgCjfaTc3EskVla6h","3pbIrCC+981PdV4HCumIoA792vvm1g7c87Lmjf4QTZRlzruJYo0cAPdqF+6Zx7/piIdq4Z49LpRhMMF/BBMb9qF2o2K0yeGYUMFGumSZZQ8FEt6OHukN79Ru9rqAh5zhx+knWD+yG3hIP00q16UVBagqOiXLwonx6yYrfl3jOShduokxEqd/KmkLcz6cbJ00tVWdxdyv","C0QmD9WF7K/rrfYhx9blgDNB9c1OdpkTP4MTsKv5xY1Zxh/Ms03q3F15VcX6sQqt+VYV5vK/rNSqVucSH64pMochoaDIFgQZH7qq1P79zcHEwyWRKkuZJKVCOfgKgiMk1ecBGifv0IQJH7sDUyVb5z2V69mqI7xWVVw3o6bKdkONLZthbwF5zaCKCC9dzzQsC3TrCtxy","jR9SiAkF2jfLqJRkAi72+uSQ+jPF2VHOx0xkUMq8Ul5Z5f9YCoccMnaKXXfXWiVL/+qlNs4aPoxee+Dxb0VwMye7E8XNhuugBtPSHO+zt+PUR5lmUOLwEMj18H8TgVRJ7K3EaWf/G1DezE6vw+3izb5kaL8ZSZ5TnlKxv563roCIXjfOEzYqhtdPFW4Fty2X+nv23Kxs","2ApzaIS9BYvbs5tpXrdOV9sqCLiJAP/kmppH3yreK0+cPKJq0/AFnEzx1CO7QRln3Q1YVJ3QFR4tzznGFEwAffERuSufNOKTIir0WS6oA8fuYDMoYW/YW9jVBtSzKwhUBVMIXdO9PfijTisAN04cgvWRAoQDrAGlz1poqHZwF0MqCsUJ/jkCqdBQ32W1qA4qmcseyr1E","8ubhMyj1eO07RhZbUWJv+HB9bTf45VUa5pKQMAx3F7maq01KbJ5iff8GDrC+HqReS2UR0B0LWR/PrMFr78TbPYC5XMQOQKtjSLt76Vtg3IHy4Tqw8EnPU7653viCq/w3Rr87ixGdkhuWiwDLLM/VFDIMuwc1t4pA/j4q5IazN/UtGA+rvNaAem9lCmDQPHdlmQd8eiP5","4Fh1xR8WFut8oofH3kKbgQE1IA8wXMuBlztiVdsLnfWNHvYMuTmZpHz7TDmULP+cuGpdRAJao12WXUJi8PMQ9dSP0LzHQucHKHKXmfIILLKxY/lS7e09YSs9NhgzMLDVq9hUuuFOPcgp62DEi0yfyy6vA8KBvljIiMNN1wpBi+vP75G5ZfJclzdXqI1o4qPzTCtkyTgY","NiVKVo9W9ga2kuUB5lQcuwPu23uN654kfBRleukD7cxFMsaplCFEk7087Hki7HlR2POS0E5YhDXk+g0wrZ+kCOzZIdBwwHzgpw4GdT3xY5lQeSxLaRRIj8UBW2qM5p2QN5gJdK+AVyMiCaDpDt4k8CYp5gKC3zxm8E6G3NfDeVGn46WlyDf/fYhTlAcwGYewk7cShXLy","jnAPCtcNuD9iSrHTfq8XPINDlf/AHmlzPxzMIfqMQ95xxCmcO4NXumId3gqTmUj0FyISAmeNVy9/AFKCxolpbKfFqGuUs94VDuA5pjckg/stzJ2p2PXK1vf3EdQruiNBSbJsSJz2eqdEkZbcWY4ZJ2k6X6ydB/aahNhfLnWtzN1vVDBNOIMVcVWd1C4RP9pOiuYUtzsY","tSh9tHKSsnk3LNaUVc6+TlDsbnee4eJuPeJjBmsVMdUpB32OXMeZBuUh7xqiO7alT5/vDsmZbelikQAi+xYPNiKxXyGkCZ3+KnTMCXjcMKvATv5C7hzJ3YXk1kCV3Fqekp8871kxKjk4x9xm/eIkbDCB5AdlTDJOGn3ixJh/ZR9Jmiee4wT6eHBLIX+ThHHyj+c2v4kk","0aeVcccpP59CqrX8bcYEwm9sBS49OIvZ57uCO4klKFsC0EwCfGxE/xOSkQD/MxcZkfOcYy8j6SifEBvhv9bVuZJhT9EMOl/DH+yRGLIAZzEkBgX24J7FLMBnkMNDZ/CAPZGrAH/KVTkwXKEMaj/Ar8tf2BuTmwBfkwTiBvDfD43zOSxP/8DeTFAJaYWP+q/OZZCRDPDZ","SOZiBhzHsTen4IjhL/AHvSMzwuF8oKbwAOtbc7Gn+Rf/iyiiFyvJBNIScL1EO3WBvTkRMcsC/EX/xUuLjTJjmHy7v0+WDe6tKF6X0hnuaNsYUoUl02gE2TOQi6U3YYLJlIrVmLhUK2VMkAUhkAWpA5eHrkf5Z6lCO4jNAdtnk7kI+puyz82r8dq3g+vrzhTcbkn0oS5g","tprryw/6AOd+HYgsr94oZUJKeHX/RhnCa8XNG5ngr4kndeDcLtptVBCVsccVqv770iiSH2iI/mwupRYkIJSacfz9wY8Iv92lSKVcXae2BxIf9i6N3WIWbj5ARkj+vj/Xt3Ct5MR2VyaZi0EerEsyh6t0DmKDPtGJCJ08NvmFdq6/gON0Res4XfFg+cnjchMVjP5kbmLz","YbKVbESxIRvxrM5GWA4KncK3v+tDiDIcrvGG9EnslidAK2L0gRzh+Kc94F+fxfqzuQuDgzIbolHwcCaj2JzJKC/4qZmoKI3jK94SNFoWFb6WFjpIC4lPlCsw4+tWcIYWLsdOM4rsIYKGzgWA5vytaQCiTF82Uq19v+NYeJ8+JDQr4bLfsX2qYTacxyotlSZhDfvP4LDM","dNthmf6zHzsss5YlKaNNnqTqAv5bhRuSOlaYOO6K+Xp//7hTuzaE5R3RY3dwclBesXNyUEot/f8X/j+S3k28z3AAAA=="].join("")
;let G=null;async function X(e,t){if(!e.VERI)return[];const a=await e.VERI.get("fav:"+t);return a?JSON.parse(a):[]}
/* PORTFÖY: fav (⭐ takip) listesinden bilerek AYRI bir KV anahtarı.
   fav yalnız "izle", portfoy ise "lot + maliyet" tutar — birini bozmadan
   diğerini eklemek/kaldırmak için yapısal olarak birbirinden bağımsız. */
async function XP(e,t){if(!e.VERI)return{};const a=await e.VERI.get("portfoy:"+t);return a?JSON.parse(a):{}}
async function XPSET(e,t,a){e.VERI&&await e.VERI.put("portfoy:"+t,JSON.stringify(a))}
/* GERÇEKLEŞEN K/Z GEÇMİŞİ: kısmi/tam satışlarda kapanan pozisyonun kâr/zararı
   burada birikir — düzenleme/silme akışından ayrı, portföyün asıl "gelişmiş"
   tarafı budur (satış anındaki gerçek kazanç, sadece anlık K/Z değil). */
async function XPG(e,t){if(!e.VERI)return[];const a=await e.VERI.get("portfoyGecmis:"+t);return a?JSON.parse(a):[]}
async function XPGEKLE(e,t,a){const liste=await XPG(e,t);liste.unshift(a);const kirp=liste.slice(0,100);e.VERI&&await e.VERI.put("portfoyGecmis:"+t,JSON.stringify(kirp));return kirp}
/* ============ 🏷 SEKTÖR HARİTASI (statik, en likit ~140 BIST kodu) ============
   KAP/tarama verisinde sektör alanı yok; canlı bir sektör API'si de yok.
   Bu yüzden yaygın BIST30/50/100 kodları için elle derlenmiş, en iyi çaba
   (best-effort) statik bir eşleme kullanıyoruz. Harita eksiksiz DEĞİL —
   listede olmayan kodlar "Diğer" altında toplanır, bu normaldir.
   Admin, KV'de "sektorEk" anahtarına {"KOD":"Sektör Adı"} JSON'u yazarak
   koda dokunmadan ekleme/düzeltme yapabilir (aşağıdaki harita ile birleşir). */
const SEKTOR_HARITA={
AKBNK:"Bankacılık",GARAN:"Bankacılık",ISCTR:"Bankacılık",YKBNK:"Bankacılık",HALKB:"Bankacılık",VAKBN:"Bankacılık",SKBNK:"Bankacılık",ICBCT:"Bankacılık",QNBFB:"Bankacılık",TSKB:"Bankacılık",ALBRK:"Bankacılık",
KCHOL:"Holding",SAHOL:"Holding",DOHOL:"Holding",ALARK:"Holding",TKFEN:"Holding",AGHOL:"Holding",GLYHO:"Holding",POLHO:"Holding",EUHOL:"Holding",
FROTO:"Otomotiv",TOASO:"Otomotiv",DOAS:"Otomotiv",OTKAR:"Otomotiv",TTRAK:"Otomotiv",ASUZU:"Otomotiv",KARSN:"Otomotiv",
BIMAS:"Perakende",MGROS:"Perakende",SOKM:"Perakende",BIZIM:"Perakende",
THYAO:"Havacılık/Ulaştırma",PGSUS:"Havacılık/Ulaştırma",TAVHL:"Havacılık/Ulaştırma",CLEBI:"Havacılık/Ulaştırma",RYSAS:"Havacılık/Ulaştırma",
TUPRS:"Enerji/Petrokimya",PETKM:"Enerji/Petrokimya",AKSEN:"Enerji/Petrokimya",AKSA:"Enerji/Petrokimya",ENJSA:"Enerji/Petrokimya",ODAS:"Enerji/Petrokimya",ZOREN:"Enerji/Petrokimya",AYDEM:"Enerji/Petrokimya",GWIND:"Enerji/Petrokimya",YEOTK:"Enerji/Petrokimya",AKENR:"Enerji/Petrokimya",AYEN:"Enerji/Petrokimya",
EREGL:"Demir-Çelik/Metal",KRDMD:"Demir-Çelik/Metal",KRDMA:"Demir-Çelik/Metal",KRDMB:"Demir-Çelik/Metal",ISDMR:"Demir-Çelik/Metal",BRSAN:"Demir-Çelik/Metal",CEMTS:"Demir-Çelik/Metal",BURCE:"Demir-Çelik/Metal",
ASELS:"Savunma/Elektronik",KONTR:"Savunma/Elektronik",
SISE:"Cam/Kimya",SASA:"Cam/Kimya",GUBRF:"Cam/Kimya",HEKTS:"Cam/Kimya",BAGFS:"Cam/Kimya",ALKIM:"Cam/Kimya",SODA:"Cam/Kimya",
TCELL:"Telekom",TTKOM:"Telekom",NETAS:"Telekom",
EKGYO:"GYO/İnşaat",ENKAI:"GYO/İnşaat",YKGYO:"GYO/İnşaat",ISGYO:"GYO/İnşaat",TRGYO:"GYO/İnşaat",KLGYO:"GYO/İnşaat",VKGYO:"GYO/İnşaat",OZKGY:"GYO/İnşaat",
AEFES:"Gıda/İçecek",ULKER:"Gıda/İçecek",CCOLA:"Gıda/İçecek",TATGD:"Gıda/İçecek",PINSU:"Gıda/İçecek",BANVT:"Gıda/İçecek",KRSTL:"Gıda/İçecek",PENGD:"Gıda/İçecek",
KOZAL:"Madencilik",KOZAA:"Madencilik",IPEKE:"Madencilik",
TURSG:"Sigorta",ANHYT:"Sigorta",ANSGR:"Sigorta",AKGRT:"Sigorta",RAYSG:"Sigorta",
KORDS:"Tekstil",YUNSA:"Tekstil",SKTAS:"Tekstil",
ARCLK:"Dayanıklı Tüketim",VESTL:"Dayanıklı Tüketim",
LOGO:"Teknoloji/Yazılım",KAREL:"Teknoloji/Yazılım",ARENA:"Teknoloji/Yazılım",INDES:"Teknoloji/Yazılım",LINK:"Teknoloji/Yazılım",PAPIL:"Teknoloji/Yazılım",
DSTKF:"Finansal Kiralama",GARFA:"Finansal Kiralama",ISFIN:"Finansal Kiralama",
ASTOR:"Enerji/Petrokimya",PETUN:"Gıda/İçecek",MAVI:"Perakende",LKMNH:"Sağlık",SELEC:"Sağlık",
};
/* ================== 🩺 HATA KAYDI ==================
   Worker'da bir şey patladığında bugüne kadar HİÇBİR YERDE görünmüyordu:
   catch(e){} blokları hatayı sessizce yutuyor, kullanıcı "çalışmıyor" diyor,
   sebebi bilinmiyordu. (İzole-kopya bug'ı aylarca böyle yaşadı.)
   Sentry SDK'sı bir derleme adımı gerektirdiği ve sen worker'ı elle
   yapıştırarak dağıttığın için BAĞIMLILIKSIZ çözüm: son 60 hata KV'de bir
   halka tamponda tutulur, 🩺 Hatalar sekmesinde görünür.
   SENTRY_DSN tanımlarsan ayrıca oraya da düz fetch ile gönderilir — SDK yok. */
const HATA_AZAMI=60;
async function hataYaz(A,yer,err,istek){
  try{
    if(!A||!A.VERI)return;
    const kayit={
      t:Math.floor(Date.now()/1000),
      yer:String(yer||"?").slice(0,40),
      msg:String((err&&err.message)||err||"?").slice(0,300),
      iz:String((err&&err.stack)||"").split("\n").slice(0,4).join(" | ").slice(0,400),
      yol:istek?String(new URL(istek.url).pathname).slice(0,60):""
    };
    const eski=await A.VERI.get("hatalar");
    let liste=[];try{liste=eski?JSON.parse(eski):[]}catch(e){liste=[]}
    liste.unshift(kayit);
    if(liste.length>HATA_AZAMI)liste=liste.slice(0,HATA_AZAMI);
    await A.VERI.put("hatalar",JSON.stringify(liste));
    if(A.SENTRY_DSN)await sentryGonder(A,kayit).catch(()=>{});
  }catch(e){/* hata kaydederken hata: sessiz geç, sistemi durdurma */}
}
/* Sentry'ye SDK'sız gönderim: DSN'i parçalayıp store uç noktasına POST.
   DSN yoksa hiç çağrılmaz — yani tamamen isteğe bağlı. */
async function sentryGonder(A,kayit){
  const m=/^https:\/\/([^@]+)@([^/]+)\/(.+)$/.exec(String(A.SENTRY_DSN||""));
  if(!m)return;
  const [,anahtar,host,proje]=m;
  await fetch("https://"+host+"/api/"+proje+"/store/",{
    method:"POST",
    headers:{"Content-Type":"application/json",
      "X-Sentry-Auth":"Sentry sentry_version=7, sentry_key="+anahtar+", sentry_client=fixborsa/1.0"},
    body:JSON.stringify({
      timestamp:kayit.t,platform:"javascript",level:"error",
      logger:kayit.yer,
      message:{formatted:kayit.msg},
      extra:{iz:kayit.iz,yol:kayit.yol}
    })
  });
}
async function hatalariOku(A){
  if(!A||!A.VERI)return[];
  try{const c=await A.VERI.get("hatalar");return c?JSON.parse(c):[]}catch(e){return[]}
}
/* ---------- SEKTÖR KAYNAĞI ----------
   Gömülü SEKTOR_HARITA yalnız ~111 hisse kapsıyor, havuzda 432 var — geri
   kalan hepsi "Diğer" görünüyordu. sektor.json (GitHub Actions'ta borsapy
   ile üretiliyor) tüm BIST'i kapsar. Öncelik sırası:
     1) elle düzeltme (KV: sektorEk)  2) sektor.json  3) gömülü harita  4) Diğer
   sektor.json okunamazsa sistem eskisi gibi çalışmaya devam eder. */
/* ═══════════ 🏭 SEKTÖRE GÖRE GÖRELİ GÜÇ ═══════════
   "Hisse mi yükseliyor, sektörü mü taşıyor?" Endekse göre göreli güçten
   daha keskindir: bankacılık %6 yükselirken %6.2 yapan bir banka hissesi
   endeksi geçiyor görünür ama KENDİ SEKTÖRÜNDE sıradandır.

   VERİ ZATEN VAR — ne yeni ağ isteği, ne tarayıcı değişikliği:
     · RRG kaydı (tarayıcının kendi tgRotasyon çıktısı) her hisse için
       RS-Ratio (o) taşıyor: 60 barlık göreli seriden z-normalize edilmiş,
       100 merkezli değer.
     · sektor.json hangi hissenin hangi sektörde olduğunu söylüyor.
   İkisi birleşince:
     sektorGuc = hissenin RS-Ratio'su − kendi sektörünün ortalaması
     sektorRs  = sektörün ortalaması − 100  (sektör piyasayı yeniyor mu)
   İki ayrı soru ayrı ayrı cevaplanır: hisse sektörünün neresinde,
   sektör piyasanın neresinde.
   YAPIYA DOKUNMAZ: yalnızca okur ve karta alan ekler. */
const SEKTOR_ASGARI_UYE=3;
async function sektorGucEkle(A,paket){
  try{
    const R2=paket&&paket.rrg&&paket.rrg.hisse;
    if(!R2||!paket.kartlar)return;
    const sk=await sektorlariGetir(A);
    const harita=(sk&&sk.sektor&&typeof sk.sektor==="object")?sk.sektor:
                 ((sk&&typeof sk==="object")?sk:null);
    if(!harita)return;
    const kova={};
    for(const kod of Object.keys(R2)){
      const sekt=harita[kod]; if(!sekt)continue;
      const o=Number(R2[kod]&&R2[kod].o); if(!isFinite(o))continue;
      (kova[sekt]=kova[sekt]||[]).push(o);
    }
    const sektOrt={};
    for(const sekt of Object.keys(kova)){
      const a=kova[sekt];
      if(a.length<SEKTOR_ASGARI_UYE)continue;
      sektOrt[sekt]={ort:a.reduce((x,y2)=>x+y2,0)/a.length,n:a.length};
    }
    for(const ad of Object.keys(paket.kartlar)){
      const l=paket.kartlar[ad]; if(!Array.isArray(l))continue;
      for(const k of l){
        if(!k||!k.kod)continue;
        const sekt=harita[k.kod]; if(!sekt)continue;
        const so=sektOrt[sekt]; if(!so)continue;
        const o=Number(R2[k.kod]&&R2[k.kod].o); if(!isFinite(o))continue;
        k.sektor=sekt; k.sektorUye=so.n;
        k.sektorGuc=Math.round((o-so.ort)*100)/100;
        k.sektorRs=Math.round((so.ort-100)*100)/100;
      }
    }
  }catch(e){}
}
/* ═══════════════ 📋 TEMEL ANALİZ KATMANI ═══════════════
   Kaynak: depodaki temel.json — haftalık bir Actions işi Yahoo'dan çekip
   yazıyor. Burada YALNIZCA OKUNUR. Tarama akışı, /push yolu, alarm ve
   tarayıcı bu katmanın varlığından habersizdir; dosya hiç yoksa ya da
   bozuksa her şey eskisi gibi çalışmaya devam eder.

   ⚠️ TMS 29: Python tarafı, enflasyon düzeltmesi geçişini kapsayan
   karşılaştırmalarda büyüme oranı ÜRETMİYOR (None) ve bayrak açıyor.
   Burada da o bayrak varsa büyüme hiç gösterilmez — yanlış sayı
   göstermektense hiç göstermemek doğrudur. */
const TEMEL_URLLER=[
  "https://raw.githubusercontent.com/matematikneferi-boop/fix-borsa-worker/main/temel.json",
  "https://raw.githubusercontent.com/matematikneferi-boop/Hisse-havuzu/main/temel.json"
];
const TEMEL_TTL=6*3600;
let _temelBellek=null,_temelZaman=0;
async function temelGetir(A){
  if(_temelBellek&&Date.now()-_temelZaman<TEMEL_TTL*1000)return _temelBellek;
  try{const c=A.VERI&&await A.VERI.get("temelVeri");
    if(c){const j=JSON.parse(c);
      if(j&&j.ts&&Date.now()-j.ts<TEMEL_TTL*1000&&j.paket){
        _temelBellek=j.paket;_temelZaman=Date.now();return _temelBellek}}}catch(e){}
  for(const url of TEMEL_URLLER){
    try{
      /* ⚠️ ÖNBELLEK ZEHİRLENMESİ — DOSYA OLUŞTU AMA GÖRÜNMÜYORDU.
         Dosya henüz yokken yapılan istek 404 döndü; cacheTtl:21600
         yüzünden Cloudflare o 404'ü 6 SAAT sakladı. Actions işi yeşil
         yanıp temel.json'u yazdıktan sonra bile worker eski 404'ü okudu.
         Artık başarısız yanıt kısa süre tutulur, damga 10 dk'da değişir. */
      const r=await fetch(url+"?_="+Math.floor(Date.now()/6e5),
        {cf:{cacheTtl:300,cacheEverything:!1}});
      if(!r.ok)continue;
      const j=await r.json();
      if(j&&j.hisse&&typeof j.hisse==="object"&&Object.keys(j.hisse).length){
        _temelBellek=j;_temelZaman=Date.now();
        try{await A.VERI.put("temelVeri",JSON.stringify({ts:Date.now(),paket:j}),
          {expirationTtl:TEMEL_TTL*2})}catch(e){}
        return j;
      }
    }catch(e){}
  }
  return _temelBellek;
}

/* Bilanço açıklamasına kaç gün kaldı? Negatif = geçmiş. */
function bilancoGunFark(tarihMetin){
  if(!tarihMetin)return null;
  const t=Date.parse(String(tarihMetin)+"T00:00:00Z");
  if(!isFinite(t))return null;
  const bugun=Date.parse(new Date(Date.now()+108e5).toISOString().slice(0,10)+"T00:00:00Z");
  return Math.round((t-bugun)/864e5);
}
/* Bilanço penceresi: açıklamaya 2 gün kala ve açıklama gününde sinyal
   BİLDİRİMİ gönderilmez. Bu teknik analiz değil, olay riskidir —
   bilanço fiyatı teknik seviyelerden bağımsız uçurur ya da çakar.
   Kart LİSTEDE kalır, yalnızca alarm susar. */
const BILANCO_PENCERE=2;
function bilancoYakinMi(gun){ return gun!=null&&gun>=0&&gun<=BILANCO_PENCERE; }

/* Sektöre göre persantil: F/K 12 tek başına anlamsızdır, "kendi
   sektöründe en ucuz %15" anlamlıdır. Düşük daha iyi olan ölçütlerde
   (F/K, PD/DD, net borç) persantil TERSİNE çevrilir — her zaman
   "yüksek = iyi" okunsun diye. */
function persantil(dizi,deger,tersMi){
  if(!dizi.length||deger==null||!isFinite(deger))return null;
  let alt=0;
  for(const v of dizi)if(v<deger)alt++;
  let p=Math.round(100*alt/dizi.length);
  if(tersMi)p=100-p;
  return Math.max(0,Math.min(100,p));
}

/* Temel + teknik uyum skoru (0-100). Kırılımın ARKASINDA şirket var mı?
   F-Skoru 7+ bir hissedeki pivot kırılımı ile F-Skoru 2'deki aynı sinyal
   değildir. NOT: bu skor sinyal ÜRETMEZ, yalnızca etiketler. */
function temelSkor(t){
  if(!t)return null;
  let puan=0,agirlik=0;
  if(t.fskorOlculen>=5){ puan+=45*(t.fskor/t.fskorOlculen); agirlik+=45; }
  if(t.fkP!=null){ puan+=20*(t.fkP/100); agirlik+=20; }
  if(t.roa!=null){ puan+=15*(t.roa>0?Math.min(1,t.roa/20):0); agirlik+=15; }
  if(t.netMarj!=null){ puan+=10*(t.netMarj>0?Math.min(1,t.netMarj/25):0); agirlik+=10; }
  if(t.buyumeCiro!=null){ puan+=10*Math.max(0,Math.min(1,t.buyumeCiro/50)); agirlik+=10; }
  if(agirlik<45)return null;                /* yeterli veri yok */
  return Math.round(100*puan/agirlik);
}

/* 📋 Temel veri NEDEN yok? "Henüz yüklenmedi" hiçbir şey söylemiyordu.
   Bu fonksiyon kesin durumu döndürür: dosya var mı, kaç hisse, ne zaman
   güncellendi, hangi adresten geldi. Kullanıcı tahmin etmesin. */
async function temelDurumAl(A){
  try{
    const T=await temelGetir(A);
    if(T&&T.hisse&&Object.keys(T.hisse).length){
      return{var:!0,hisse:Object.keys(T.hisse).length,
             guncelleme:T.guncelleme||null,dolu:T.dolu||null,toplam:T.toplam||null};
    }
  }catch(e){ return{var:!1,adresler:TEMEL_URLLER.slice(),
      hata:String((e&&e.message)||e).slice(0,140)}; }
  return{var:!1,adresler:TEMEL_URLLER.slice(),hata:"dosya boş ya da okunamadı"};
}
async function temelEkle(A,paket){
  try{
    if(!paket||!paket.kartlar)return;
    const T=await temelGetir(A);
    if(!T||!T.hisse)return;
    const sk=await sektorlariGetir(A);
    const harita=(sk&&sk.sektor&&typeof sk.sektor==="object")?sk.sektor:
                 ((sk&&typeof sk==="object")?sk:null);
    /* Sektör bazlı değer dağılımları — persantil için */
    const kova={};
    if(harita){
      for(const kod of Object.keys(T.hisse)){
        const sekt=harita[kod]; if(!sekt)continue;
        const t=T.hisse[kod]; if(!t)continue;
        const k=(kova[sekt]=kova[sekt]||{fk:[],pddd:[],roa:[]});
        if(t.fk>0)k.fk.push(t.fk);
        if(t.pddd>0)k.pddd.push(t.pddd);
        if(t.roa!=null)k.roa.push(t.roa);
      }
    }
    for(const ad of Object.keys(paket.kartlar)){
      const l=paket.kartlar[ad]; if(!Array.isArray(l))continue;
      for(const k of l){
        if(!k||!k.kod)continue;
        const t=T.hisse[k.kod]; if(!t)continue;
        const sekt=harita?harita[k.kod]:null;
        const kv=(sekt&&kova[sekt])||null;
        const yeter=kv&&kv.fk.length>=5;
        const tt={
          fskor:t.fskor, fskorOlculen:t.fskorOlculen, roa:t.roa,
          fk:t.fk, pddd:t.pddd, netMarj:t.netMarj,
          ozsermayeKarliligi:t.ozsermayeKarliligi,
          netBorcFavok:t.netBorcFavok, temettuVerimi:t.temettuVerimi,
          buyumeCiro:t.enflasyonKarsilastirilamaz?null:t.buyumeCiro,
          buyumeKar:t.enflasyonKarsilastirilamaz?null:t.buyumeKar,
          enflasyonUyari:!!t.enflasyonKarsilastirilamaz,
          sektor:sekt||null,
          fkP:yeter?persantil(kv.fk,t.fk,!0):null,
          pdddP:(kv&&kv.pddd.length>=5)?persantil(kv.pddd,t.pddd,!0):null,
          roaP:(kv&&kv.roa.length>=5)?persantil(kv.roa,t.roa,!1):null,
          bilancoTarihi:t.bilancoTarihi||null,
          bilancoGun:bilancoGunFark(t.bilancoTarihi)
        };
        tt.skor=temelSkor(tt);
        k.temel=tt;
        /* 🔇 Bilanço penceresi — yalnız BİLDİRİM susar, kart listede kalır. */
        if(bilancoYakinMi(tt.bilancoGun))k.bilancoSessiz=!0;
      }
    }
  }catch(e){}
}
/* ⚠️ sektor.json bu depoda OLMAYABİLİR — havuz.json ayrı bir depoda
   (Hisse-havuzu) duruyor ve sektor.json da oraya yazılıyor olabilir.
   Tek adrese bağlı kalmak sektör özelliklerinin sessizce ölmesi demekti.
   Sırayla denenir; ilk çalışan kullanılır ve hangisinin tuttuğu kaydedilir. */
const SEKTOR_URLLER=[
  "https://raw.githubusercontent.com/matematikneferi-boop/fix-borsa-worker/main/sektor.json",
  "https://raw.githubusercontent.com/matematikneferi-boop/Hisse-havuzu/main/sektor.json"
];
let SEKTOR_SON_KAYNAK="";
let _sBellek=null,_sZaman=0;
async function sektorlariGetir(A){
  const simdi=Date.now();
  if(_sBellek&&simdi-_sZaman<216e5)return _sBellek;   /* 6 saat */
  if(A&&A.VERI){const c=await A.VERI.get("sektorJson");
    if(c){try{_sBellek=JSON.parse(c);_sZaman=simdi;return _sBellek}catch(e){}}}
  for(const url of SEKTOR_URLLER){
    try{
      /* Aynı önbellek tuzağı: dosya sonradan oluşursa 404 saklanmasın. */
      const r=await fetch(url+"?_="+Math.floor(simdi/6e5),
        {cf:{cacheTtl:300,cacheEverything:!1}});
      if(!r.ok)continue;
      const j=await r.json();
      /* Boş ya da alakasız bir dosyayı kabul etme; sıradakini dene. */
      const harita=(j&&j.sektor&&typeof j.sektor==="object")?j.sektor:j;
      if(!harita||typeof harita!=="object"||Object.keys(harita).length<20)continue;
      _sBellek=j;_sZaman=simdi;SEKTOR_SON_KAYNAK=url;
      if(A&&A.VERI)await A.VERI.put("sektorJson",JSON.stringify(j),{expirationTtl:86400});
      return j;
    }catch(e){}
  }
  return _sBellek||null;
}
async function sektorEkAl(e){
if(!e._sektorEk){
try{const s=e.VERI&&await e.VERI.get("sektorEk");e._sektorEk=s?JSON.parse(s):{}}catch(err){e._sektorEk={}}}
return e._sektorEk||{}}
async function sektorAl(e,kod){
const ek=await sektorEkAl(e);
if(ek[kod])return ek[kod];
const j=await sektorlariGetir(e);
const d=j&&j.sektor&&j.sektor[kod];
return d||SEKTOR_HARITA[kod]||"Diğer"}
/* ============ 📅 GÜNLÜK PORTFÖY DEĞER ANLIK GÖRÜNTÜSÜ (performans grafiği için) ============
   Bu worker'da native bir cron yok; mevcut mimariye sadık kalarak, gelen her
   Telegram webhook isteğinde bir KEZ tetiklenip KV'deki zaman damgasıyla
   günde ~1 kez çalışacak şekilde kendini kısıtlayan "fırsatçı" bir arka plan
   işi (kapKontrolVeGonder ile aynı desen). Her kullanıcı için o günkü toplam
   portföy değerini/maliyetini tek bir noktaya yazar; 180 günlük geçmiş tutulur. */
const PORTFOY_SNAPSHOT_MS=2e4*3600;
async function portfoyGunlukSnapshotAl(e){
if(!e.VERI)return;
const son=await e.VERI.get("portfoySnapshotSon");
if(son&&Date.now()-Number(son)<PORTFOY_SNAPSHOT_MS)return;
await e.VERI.put("portfoySnapshotSon",String(Date.now()));
const L2=await g(e);if(!L2)return;
const gun=new Date(Date.now()+108e5).toISOString().slice(0,10);
const kullanicilar=await portfoyKullanicilari(e);
for(const uid of kullanicilar.slice(0,500)){
try{
const pf=await XP(e,uid),kodlar=Object.keys(pf);
if(!kodlar.length)continue;
let deger=0,maliyet=0;
for(const kod of kodlar){const poz=pf[kod];if(!(poz&&poz.lot>0&&poz.maliyet>0))continue;
maliyet+=poz.lot*poz.maliyet;const kart=Z(L2,kod);if(kart&&kart.fiyat>0)deger+=poz.lot*kart.fiyat}
if(!(deger>0))continue;
const gs=await e.VERI.get("portfoyGunluk:"+uid);
let gecmis=gs?JSON.parse(gs):[];
gecmis=gecmis.filter(x=>x.gun!==gun);
gecmis.push({gun:gun,deger:Math.round(100*deger)/100,maliyet:Math.round(100*maliyet)/100});
gecmis=gecmis.slice(-180);
await e.VERI.put("portfoyGunluk:"+uid,JSON.stringify(gecmis))
}catch(err){}}}
async function XPGUNLUK(e,t){if(!e.VERI)return[];const a=await e.VERI.get("portfoyGunluk:"+t);return a?JSON.parse(a):[]}
async function portfoyKullanicilari(e){if(!e.VERI)return[];const out=[];let cursor=void 0
;for(;;){const liste=await e.VERI.list({prefix:"portfoy:",limit:1e3,cursor});for(const k of liste.keys)out.push(k.name.slice(8))
;if(!liste.list_complete&&liste.cursor){cursor=liste.cursor}else break}return out}function Z(e,t){if(!e||!e.kartlar)return null;for(const a of Object.keys(e.kartlar)){
if("sira"===a)continue;const n=(e.kartlar[a]||[]).find(e=>e&&e.kod===t);if(n)return n}return null}
/* 🔎 HİSSE ARA — üç dilim ayrı ayrı: Z() ilk bulduğu listeyi (hangi
   dilimden olursa olsun) döndürüyordu, bu yüzden aday listesindeki bir
   hissenin detayına girildiğinde başka bir dilimin (örn. zaten kırılmış
   KISA sinyalinin) kaydı gösterilebiliyordu — "adaylarda %40, detayda %7"
   şikayetinin kök nedeni buydu. ZTum, KISA/ORTA/UZUN'un HER BİRİ için
   kendi sinyal listesini (varsa) yoksa kendi aday listesini ayrı ayrı
   arar; hiçbiri diğerinin verisini karıştırmaz. */
function ZTum(e,t){
  const out={};
  if(!e||!e.kartlar)return out;
  for(const tf of Object.keys(MB_PIVOT_S)){
    const sinyalListe=e.kartlar[MB_PIVOT_S[tf]]||[];
    let bulunan=sinyalListe.find(x=>x&&x.kod===t)||null,tip="sinyal";
    if(!bulunan){
      const adayListe=e.kartlar[MB_PIVOT_ADAY[tf]]||[];
      bulunan=adayListe.find(x=>x&&x.kod===t)||null;tip="aday";
    }
    out[tf]=bulunan?{kart:bulunan,tip:tip}:null;
  }
  return out;
}function AYNA_TS(ts){const d=new Date(ts*1000+108e5),ik=n=>String(n).padStart(2,"0");return ik(d.getUTCDate())+"/"+ik(d.getUTCMonth()+1)+" "+ik(d.getUTCHours())+":"+ik(d.getUTCMinutes())}
/* 🙈 DİLİM GİZLEME: kullanıcı ham kodu (4SA/1SA/1G…) görüp "aa bu 4 saatlik"
   diye deşifre etmesin — yalnız KISA/ORTA/UZUN gibi kaba bir vade adı görsün. */
const TF_GIZLE={"15DK":"Kısa","1SA":"Kısa","4SA":"Orta","1G":"Uzun","1HAF":"Uzun","1AY":"Uzun",
KISA:"Kısa",ORTA:"Orta",UZUN:"Uzun"};
const TF_KANONIK={"15DK":"KISA","1SA":"KISA","4SA":"ORTA","1G":"UZUN","1HAF":"UZUN","1AY":"UZUN"};
/* 🛑 ZİNCİR STOP: her dilim bir alt dilime bakar (ORTA→KISA, UZUN→ORTA).
   KISA'nın kendi alt dilimi (15DK) şu an ayrı bir kırılım katmanı olarak
   izlenmiyor — o eklenene kadar KISA seviyesinde bu satır çıkmaz.
   Alt dilimin YÖNÜ, kendi giriş/hedef ilişkisinden çıkarılır (hedef>giriş
   ise yukarı/boğa) ve ana dilimin yönüyle AYNI olmak zorunda — aksi halde
   mantıken "üste doğru kırılan nokta fiyatın altında" garantisi bozulur,
   o yüzden yön uyuşmuyorsa hiç kullanılmaz. Alt dilim henüz aday (kırılmamış)
   ise de kullanılmaz — "kırdığı" bir seviye yok demektir. */
const ALT_TF={ORTA:"KISA",UZUN:"ORTA"};
function zincirStop(tfKartlar,anaTfKey,yon){
if(!tfKartlar)return null;
const altKey=ALT_TF[anaTfKey];if(!altKey)return null;
const g=tfKartlar[altKey];if(!g||!g.kart||"sinyal"!==g.tip)return null;
const x=g.kart;if(null==x.giris||null==x.hedef)return null;
const altYon=Number(x.hedef)>=Number(x.giris)?"boga":"ayi";
if(altYon!==yon)return null;
return Number(x.giris)}
function AYNA(kod,z,tfKartlar){const f=v=>Number(v).toFixed(2),yz=y=>(y>=0?"+":"")+Number(y).toFixed(1)+"%",fiyat=z.f;
const yukHed=z.yuk&&z.yuk.length?z.yuk[z.yuk.length-1].v:null;
const asgHed=z.asg&&z.asg.length?z.asg[z.asg.length-1].v:null;
const anaTfKey=TF_KANONIK[z.tf]||null;
let m="🔎 <b>"+kod+"</b>  ·  <b>"+f(fiyat)+" ₺</b>"+(z.tf&&TF_GIZLE[z.tf]?"  ·  <i>"+TF_GIZLE[z.tf]+" vade</i>":"")+"\n";
/* ---------- DURUM 1: YUKARI KIRILIM ZATEN OLDU ---------- */
if("boga"===z.yon&&null!=z.ust){const giris=z.ust,kar=100*(fiyat/giris-1);
m+="\n🟢🟢🟢🟢🟢🟢🟢🟢\n<b>YUKARI KIRILIM AKTİF</b>\n";
m+="🚪 <b>GİRİŞ (kırılan seviye): "+f(giris)+"</b>\n";
if(z.taze&&z.taze.ts)m+="🕐 Kırılım anı: <b>"+AYNA_TS(z.taze.ts)+"</b>"+(z.taze.tf?" · "+z.taze.tf:"")+"\n";
m+="💵 Şimdi <b>"+f(fiyat)+"</b>  ·  girişten <b>"+yz(kar)+"</b>\n";
if(null!=yukHed){const yol=yukHed>giris?100*(fiyat-giris)/(yukHed-giris):0;
m+="🎯 <b>HEDEF: "+f(yukHed)+"</b>  ·  girişten "+yz(100*(yukHed/giris-1))+"  ·  buradan <b>"+yz(100*(yukHed/fiyat-1))+"</b>\n";
m+="📍 Yolun <b>%"+Math.max(0,Math.min(100,yol)).toFixed(0)+"</b>'i tamamlandı\n";
if(z.yuk.length>1)m+="🧱 Ara dirençler: "+z.yuk.slice(0,z.yuk.length-1).map(x=>f(x.v)).join(" · ")+"\n"}
{const st=zincirStop(tfKartlar,anaTfKey,"boga");
if(null!=st)m+="🛑 <b>STOP (alt dilim kırılımı):</b> "+f(st)+"  ·  buradan "+yz(100*(st/fiyat-1))+"\n"}
if(null!=z.alt)m+="⛔ <b>Geçersiz olur:</b> "+f(z.alt)+" altına inerse ("+yz(100*(z.alt/fiyat-1))+")\n";
if(null!=asgHed)m+="<i>O durumda aşağı hedef: "+f(asgHed)+"</i>\n"}
/* ---------- DURUM 2: AŞAĞI KIRILIM ZATEN OLDU ---------- */
else if("ayi"===z.yon&&null!=z.alt){const giris=z.alt,kar=100*(fiyat/giris-1);
m+="\n🔴🔴🔴🔴🔴🔴🔴🔴\n<b>AŞAĞI KIRILIM AKTİF</b>\n";
m+="🚪 <b>GİRİŞ (kırılan seviye): "+f(giris)+"</b>\n";
if(z.taze&&z.taze.ts)m+="🕐 Kırılım anı: <b>"+AYNA_TS(z.taze.ts)+"</b>"+(z.taze.tf?" · "+z.taze.tf:"")+"\n";
m+="💵 Şimdi <b>"+f(fiyat)+"</b>  ·  girişten <b>"+yz(kar)+"</b>\n";
if(null!=asgHed){const yol=giris>asgHed?100*(giris-fiyat)/(giris-asgHed):0;
m+="🎯 <b>DÜŞÜŞ HEDEFİ: "+f(asgHed)+"</b>  ·  girişten "+yz(100*(asgHed/giris-1))+"  ·  buradan <b>"+yz(100*(asgHed/fiyat-1))+"</b>\n";
m+="📍 Yolun <b>%"+Math.max(0,Math.min(100,yol)).toFixed(0)+"</b>'i tamamlandı\n";
if(z.asg.length>1)m+="🧱 Ara destekler: "+z.asg.slice(0,z.asg.length-1).map(x=>f(x.v)).join(" · ")+"\n"}
{const st=zincirStop(tfKartlar,anaTfKey,"ayi");
if(null!=st)m+="🛑 <b>STOP (alt dilim kırılımı):</b> "+f(st)+"  ·  buradan "+yz(100*(st/fiyat-1))+"\n"}
if(null!=z.ust)m+="⛔ <b>Geçersiz olur:</b> "+f(z.ust)+" üstüne çıkarsa ("+yz(100*(z.ust/fiyat-1))+")\n";
if(null!=yukHed)m+="<i>O durumda yukarı hedef: "+f(yukHed)+"</i>\n"}
/* ---------- DURUM 3: ARA BÖLGE — İKİ SENARYO ---------- */
else{m+="🟡 <b>ARA BÖLGE — henüz kırılım yok</b>\n<i>Hangi seviye kırılırsa ne olacağı aşağıda.</i>\n";
m+="\n🟩🟩🟩🟩🟩🟩🟩🟩\n▲ <b>YUKARI SENARYO</b>\n";
if(null!=z.ust){m+="🚪 <b>GİRİŞ: "+f(z.ust)+"</b> üstünde kapanış  ("+yz(100*(z.ust/fiyat-1))+" uzakta)\n";
if(z.yuk&&z.yuk.length){if(z.yuk.length>1)m+="🧱 Direnç: "+z.yuk.slice(0,z.yuk.length-1).map(x=>f(x.v)).join(" · ")+"\n";
m+="🎯 <b>HEDEF: "+f(yukHed)+"</b>  ·  girişten <b>"+yz(100*(yukHed/z.ust-1))+"</b>"+(z.yukTf?"  <i>("+z.yukTf+")</i>":"")+"\n"}
else m+="<i>yukarı bacak oluşmamış</i>\n";
if(null!=z.alt)m+="⛔ Kırılmazsa / "+f(z.alt)+" altına inerse bu senaryo iptal\n"}
else m+="<i>üst seviye belirlenemedi</i>\n";
m+="\n🟥🟥🟥🟥🟥🟥🟥🟥\n▼ <b>AŞAĞI SENARYO</b>\n";
if(null!=z.alt){m+="🚪 <b>GİRİŞ: "+f(z.alt)+"</b> altında kapanış  ("+yz(100*(z.alt/fiyat-1))+" uzakta)\n";
if(z.asg&&z.asg.length){if(z.asg.length>1)m+="🧱 Destek: "+z.asg.slice(0,z.asg.length-1).map(x=>f(x.v)).join(" · ")+"\n";
m+="🎯 <b>HEDEF: "+f(asgHed)+"</b>  ·  girişten <b>"+yz(100*(asgHed/z.alt-1))+"</b>"+(z.asgTf?"  <i>("+z.asgTf+")</i>":"")+"\n"}
else m+="<i>aşağı bacak oluşmamış</i>\n";
if(null!=z.ust)m+="⛔ "+f(z.ust)+" üstüne çıkarsa bu senaryo iptal\n"}
else m+="<i>alt seviye belirlenemedi</i>\n"}
if(z.atr)m+="\n📏 Günlük oynaklık (ATR): <b>"+z.atr+"%</b>\n";
/* ⏳ BEKLEYEN SENARYO: yukarıdaki tek dilimin (ORTA gösterilen) dışında
   KISA ve UZUN dilimde ne durumda olduğumuzu — aday mı, zaten sinyal mi,
   hiç yok mu — kısaca ekliyoruz. tfKartlar = ZTum(liste,kod) çıktısı;
   çağıran taraf vermezse (eski kullanım) bu blok sessizce atlanır. */
if(tfKartlar){
const BEK_AD={KISA:"Kısa vade",UZUN:"Uzun vade"};
const bekParca=tfKey=>{const g=tfKartlar[tfKey];
if(!g||!g.kart)return "▫️ <b>"+BEK_AD[tfKey]+":</b> aktif sinyal/aday yok\n";
const x=g.kart,adayMi="aday"===g.tip;let s="▫️ <b>"+BEK_AD[tfKey]+":</b> ";
if(adayMi){s+="🟨 aday — henüz kırılmadı";if(null!=x.tetik)s+=" · tetik "+f(x.tetik)}
else{s+="🟢 zaten sinyal aktif";if(null!=x.giris)s+=" · giriş "+f(x.giris)}
if(null!=x.hedef1)s+=" · Hedef 1 "+f(x.hedef1);
if(null!=x.hedef)s+=" · Hedef 2 "+f(x.hedef);
if(null!=x.potansiyel)s+=Number(x.potansiyel)<=0?" (🏆 tuttu)":" (+"+Number(x.potansiyel).toFixed(1)+"% kaldı)";
return s+"\n"};
m+="\n⏳ <b>BEKLEYEN SENARYO</b>\n"+bekParca("KISA")+bekParca("UZUN");
}
return m+"\n<i>Seviyeler kapanışa göre değerlendirilir. Fitil kırılımı sinyal sayılmaz.</i>\n<i>⚠️ Yatırım tavsiyesi değildir.</i>"}
function P(e,t){const a=Z(e,t),z=e&&e.sozluk&&e.sozluk[t],tfK=ZTum(e,t);
if(z&&a)return j(a)+"\n\n"+AYNA(t,z,tfK);
if(z)return AYNA(t,z,tfK);
if(a)return "🔎 <b>"+t+"</b> için güncel durum\n\n"+j(a);
return "🔎 <b>"+t+"</b>\n\nBu kod taramada bulunamadı. Yazımı kontrol et (örn. <code>THYAO</code>) ya da yeni tarama sonrası tekrar dene."}function PY(uname,userId,chatId){const link="https://t.me/"+uname+"?start=r"+userId,paylas="https://t.me/share/url?url="+encodeURIComponent(link)+"&text="+encodeURIComponent(DAVET_METIN),menu=u(userId);menu.inline_keyboard=[[{text:"📤 Paylaş",url:paylas}]].concat(menu.inline_keyboard);return{chat_id:chatId,parse_mode:"HTML",disable_web_page_preview:!0,text:"📤 <b>Sistemi paylaş</b>\n\nAşağıdaki düğmeye dokun, Telegram'da kime göndereceğini seç. Davet bağlantın otomatik olarak gönderilir.",reply_markup:menu}}
const Q={potansiyel:"🟩🟩🟩🟩🟩🟩🟩🟩\n📊 <b>1 SAAT</b> · orta trade\n<i>yalnız 1 saatlik sinyaller</i>\n🟩🟩🟩🟩🟩🟩🟩🟩",fibo:"🟦🟦🟦🟦🟦🟦🟦🟦\n📐 <b>4 SAAT</b> · orta vade\n<i>yalnız 4 saatlik sinyaller</i>\n🟦🟦🟦🟦🟦🟦🟦🟦",uzunvade:"🟪🟪🟪🟪🟪🟪🟪🟪\n🗓 <b>1 GÜN</b> · uzun vade\n<i>yalnız günlük sinyaller</i>\n🟪🟪🟪🟪🟪🟪🟪🟪",haftalik:"🟫🟫🟫🟫🟫🟫🟫🟫\n📅 <b>1 HAFTA</b> · pozisyon\n<i>yalnız haftalık sinyaller</i>\n🟫🟫🟫🟫🟫🟫🟫🟫",adayHafta:"🟨🟨🟨🟨🟨🟨🟨🟨\n📅 <b>1 HAFTA</b> · adaylar\n<i>henüz kırılmadı — tetik bekliyor</i>\n🟨🟨🟨🟨🟨🟨🟨🟨",adayOrta:"🟨🟨🟨🟨🟨🟨🟨🟨\n📊 <b>1 SAAT</b> · adaylar\n<i>henüz kırılmadı — tetik bekliyor</i>\n🟨🟨🟨🟨🟨🟨🟨🟨",adayOrtaVade:"🟨🟨🟨🟨🟨🟨🟨🟨\n📐 <b>4 SAAT</b> · adaylar\n<i>henüz kırılmadı — tetik bekliyor</i>\n🟨🟨🟨🟨🟨🟨🟨🟨",adayUzun:"🟨🟨🟨🟨🟨🟨🟨🟨\n🗓 <b>1 GÜN</b> · adaylar\n<i>henüz kırılmadı — tetik bekliyor</i>\n🟨🟨🟨🟨🟨🟨🟨🟨"};const _ANA={async fetch(p,A,q){ORTAM=A;if(A&&A.ADMIN_IDS)try{EK_YON=new Set(String(A.ADMIN_IDS).split(",").map(x=>x.trim()).filter(Boolean))}catch(_){}const $=new URL(p.url);if(n=$.origin,
i=A.PANEL_KEY||A.PUSH_KEY||t,"/surum"===$.pathname)return new Response("Fix Borsa Sinyal worker surum "+a,{headers:{"content-type":"text/plain; charset=utf-8","Access-Control-Allow-Origin":"*"}})
;if("/setup"===$.pathname){
const e=(e,t)=>new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="margin:0;background:#0d1117;color:#e6edf3;font:15px/1.6 system-ui,sans-serif;padding:18px"><h2 style="margin:0 0 10px">'+e+"</h2>"+t+'<p style="margin-top:18px"><a href="/" style="color:#388bfd">← Durum sayfasına dön</a></p></body>',{
headers:{"content-type":"text/html; charset=utf-8"}})
;if(!A.BOT_TOKEN)return e("⚠️ Bot anahtarı yok","<p>Cloudflare'de <b>BOT_TOKEN</b> tanımlı değil. Worker → Settings → Variables and Secrets → Add: isim <code>BOT_TOKEN</code>, değer BotFather'ın verdiği anahtar. Sonra <b>Deploy</b>.</p>")
;const t=await b(A.BOT_TOKEN,"getMe",{})
;if(!t||!t.ok)return e("⚠️ Bot anahtarı geçersiz","<p>Telegram bu anahtarı tanımıyor"+(t&&t.error_code?" (hata "+t.error_code+")":"")+".</p><p>En sık sebep: değeri yapıştırırken başına/sonuna <b>tırnak</b> veya <b>boşluk</b> karışmış olması. Anahtar şuna benzer görünür: <code>1234567890:AAH...</code> — tırnak yok, boşluk yok.</p><p>BotFather'da <code>/mybots</code> → botun → <i>API Token</i> ile doğrulayıp Settings → Variables kısmına yeniden yapıştır ve <b>Deploy</b> et.</p>")
;const a=await b(A.BOT_TOKEN,"setWebhook",{url:`${$.origin}/tg`,allowed_updates:["message","callback_query"],secret_token:await whS(A)})
;await b(A.BOT_TOKEN,"setChatMenuButton",{menu_button:{type:"web_app",text:"📱 Uygulamayı aç",web_app:{url:$.origin+"/app?v="+Date.now()}}}).catch(()=>{})
;return a&&a.ok?e("✅ Bağlantı kuruldu","<p>Bot: <b>@"+(t.result.username||"?")+"</b></p><p>Artık Telegram'da bota <b>/start</b> yazabilirsin.</p>"):e("⚠️ Bağlanamadı","<p>"+(a&&a.description||"bilinmeyen hata")+"</p>")
}const ee={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"POST, GET, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Max-Age":"86400"}
;if("OPTIONS"===p.method)return new Response(null,{status:204,headers:ee});if("/push"===$.pathname){const e=(e,t)=>new Response(JSON.stringify(e),{status:t||200,headers:Object.assign({
"content-type":"application/json; charset=utf-8"},ee)});if("POST"!==p.method)return e({ok:!1,hata:"POST bekleniyor"},405);
/* 4️⃣ /push için de kaba-kuvvet sayacı — ama yerel rate limit YOK:
   tarayıcı uygulaman 10 saniyede bir buraya yazıyor, onu kısıtlamak
   sistemi durdururdu. Sadece YANLIŞ anahtar denemeleri sayılıyor. */
{const kk=await kapiKontrol(A,$,p,!1);if(!kk.ok)return e({ok:!1,hata:429===kk.kod?kk.mesaj:"Şifre yanlış"},kk.kod)}
;const t=await p.json().catch(()=>null);if(!t||"object"!=typeof t)return e({ok:!1,hata:"Paket okunamadı"},400);t.guncelleme=(new Date).toISOString()
;const eskiListe=await g(A).catch(()=>null)
/* 🏭 Sektör göreli gücünü kartlara işle — kaydedilmeden ÖNCE, böylece
   hem Mini App hem bot mesajı aynı veriyi görür. Hata olursa sessizce
   atlanır; tarama akışı hiçbir koşulda durmaz. */
;await sektorGucEkle(A,t).catch(()=>{})
/* 📋 Temel analiz katmanı — hata olursa sessizce atlanır, akış durmaz. */
;await temelEkle(A,t).catch(()=>{})
;await async function(e,t){o=t,oTS=Date.now();
/* KV YAZMA KORUMASI: sürekli mod (10 sn'de bir tarama) KV'nin günlük
   ücretsiz yazma sınırını (1000) yakabilir. Önbellek HER ZAMAN tazelenir
   (bedava ve hızlı); kalıcı KV yazımı en fazla 2 dakikada bir yapılır.
   Bot okurken önce bellek, sonra KV, sonra önbelleğe bakar; aradaki
   farkta bile veri tazedir. */
const SIMDI=Date.now();
/* KV günlük yazma sınırı dolduğunda put() HATA FIRLATIR ve bu hata bütün
   /push isteğini düşürüyordu: tarama sonucu önbelleğe bile yazılamıyor,
   tarayıcı "buluta yüklenemedi" diyordu. Oysa önbellek (caches.default)
   bedava ve sınırsız — KV yazılamasa da sistem çalışmaya devam edebilir.
   Bu yüzden KV yazımı artık isteği öldürmüyor, sadece sağlıkta işaretleniyor. */
if(e.VERI&&(SIMDI-KVSON>12e4)){KVSON=SIMDI;
  try{await e.VERI.put("listeler",JSON.stringify(t))}
  catch(kvErr){saglikArtir("kvYazmaHatasi");saglikSet("kvSonHata",String((kvErr&&kvErr.message)||kvErr).slice(0,120))}}
await caches.default.put(new Request(l),new Response(JSON.stringify(t),{headers:{"Cache-Control":"max-age=86400",
"content-type":"application/json"}}))}(A,t),/* 3️⃣ ÇAKIŞMA KİLİDİ: işler eskisi gibi PARALEL başlar (davranış aynı),
   ama her biri kendi kilidini alır — bir öncekinin turu bitmeden aynı iş
   ikinci kez başlamaz. Kilit alınamazsa o tur sessizce atlanır ve
   🛡 Sistem sekmesinde "atlanan tur" olarak sayılır. */
q.waitUntil(kilitli(A,"gecmisKaydi",60,()=>k(A,t)).catch(()=>{})),
q.waitUntil(kilitli(A,"gecmisiDoldur",180,()=>gecmisiDoldur(A,t)).catch(()=>{})),
q.waitUntil(kilitli(A,"alarm",60,()=>alarmGonder(A,eskiListe,t)).catch(()=>{})),
/* Yeni alarm olmasa bile bekleyen kuyruk her turda bir parca ilerler:
   yarim kalmis bir dagitim bir sonraki taramada tamamlanir. */
q.waitUntil(kilitli(A,"alarmKuyruk",50,()=>alarmKuyrukBosalt(A)).catch(()=>{})),
/* 📢 Toplu duyuru tekrar-deneme kuyruğu: her turda bir parça ilerler,
   yarım kalan/kalıcı olmayan başarısız gönderimler tek tuşa gerek
   kalmadan arka planda tekrar denenir. */
q.waitUntil(kilitli(A,"yayinKuyruk",50,()=>yayinKuyrukBosalt(A)).catch(()=>{})),
/* Absorpsiyon havuzu her turda bir dilim ilerler; birkac dakikada
   tum evren taranmis ve surekli tazelenir olur. */
q.waitUntil(kilitli(A,"absDilim",50,()=>absDilimTara(A,[])).catch(()=>{})),
/* 🐂🐻 MAL+AYI/BOĞA: her turda bir zaman diliminden bir dilim hisse
   ilerler; havuz bitince sıradaki zaman dilimine geçilir. Böylece yedi
   dilimin tamamı sırayla ve sürekli tazelenir. */
q.waitUntil(kilitli(A,"mbDilim",50,()=>mbAlarmOncelikliTara(A)).catch(()=>{})),
/* 🔔 Kurulu tarama filtresi varsa listeye YENİ girenleri bildir.
   mbDilimTara'dan sonra sıraya girer ki o turun taze ölçümünü görsün. */
q.waitUntil(kilitli(A,"mbAlarm",50,()=>mbAlarmTara(A)).catch(()=>{})),
q.waitUntil(kilitli(A,"portfoySnapshot",60,()=>portfoyGunlukSnapshotAl(A)).catch(()=>{})),
saglikArtir("push")   /* sayaç bellekte artar, KV'ye en fazla 60 sn'de bir yazılır */
/* Formasyon taramasini da tetikle — arka planda, yanit beklemeden. */
;const frmDurum=await formasyonTetikle(A).catch(()=>"hata")
;const n=t.kartlar?Object.keys(t.kartlar).filter(e=>"sira"!==e).map(e=>e+":"+(t.kartlar[e]||[]).length).join(" · "):""
;return e({ok:!0,surum:a,depo:!!A.VERI,sayim:n,guncelleme:t.guncelleme,formasyon:frmDurum})}if("/dipbacktest"===$.pathname){
/* 🧪 Panelle AYNI kapı: PANEL_KEY (?key=) veya /panel'den alınan geçici
   token (?t=) ile açılır. Başka kimse göremez. */
const kk=await kapiKontrol(A,$,p,!0);
if(!kk.ok)return new Response(kk.mesaj||"yetkisiz",{status:kk.kod||401});
const anahtar=$.searchParams.get("key")||$.searchParams.get("t")||"";
const kodParam=($.searchParams.get("kod")||"").trim();
const dilimParam=($.searchParams.get("tf")||"15DK,1SA,4SA,1G").trim();
if($.searchParams.get("git")!=="1"){
  const mevcutIs=await dbtIsOku(A);
  return new Response(dbtFormHTML(anahtar,kodParam,dilimParam,mevcutIs),{headers:{"content-type":"text/html; charset=utf-8"}});
}
const seviyeler=$.searchParams.getAll("sv").filter(v=>DBT_SEVIYE.includes(v));
const dilimler=dilimParam.split(",").map(s=>s.trim().toUpperCase()).filter(t=>MB_TF[mbTfNormal(t)]);
const dilimlerSon=dilimler.length?dilimler:["15DK","1SA","4SA","1G"];
if($.searchParams.get("evren")==="1"){
  /* 🌍 TÜM HAVUZ: tek istekte sığmaz, KV'de kalıcı bir "iş" başlatıp
     /dipbacktest/adim ile parça parça ilerletiyoruz. */
  const evren=await mbEvren(A,[]);
  const job={anahtar:anahtar,kuyruk:evren.slice(),toplam:evren.length,tamam:0,
    dilimler:dilimlerSon,seviyeler:seviyeler.length?seviyeler:DBT_SEVIYE,
    sonuclar:[],semboller:[],baslangic:Date.now(),guncelleme:Date.now(),tamamlandi:!1};
  await dbtIsYaz(A,job);
  return new Response(dbtIlerlemeHTML(anahtar),{headers:{"content-type":"text/html; charset=utf-8"}});
}
let kodlar=kodParam?kodParam.split(/[,\s]+/).map(s=>s.toUpperCase().trim()).filter(Boolean):null;
if(!kodlar||!kodlar.length){const evren=await mbEvren(A,[]);kodlar=evren.slice(0,25)}
kodlar=kodlar.slice(0,40);
const dbtT0=Date.now();
const{sonuclar:dbtSonuclar,semboller:dbtSemboller}=await dbtKosu(kodlar,dilimlerSon,seviyeler.length?seviyeler:DBT_SEVIYE);
const dbtOzet=dbtOzetle(dbtSonuclar);
const dbtSure=((Date.now()-dbtT0)/1000).toFixed(1);
return new Response(dbtRaporHTML({kodlar:kodlar,dilimler:dilimlerSon,
  ozet:dbtOzet,semboller:dbtSemboller,sure:dbtSure,
  toplamGiris:dbtSonuclar.length,anahtar:anahtar}),{headers:{"content-type":"text/html; charset=utf-8"}})}
if("/dipbacktest/adim"===$.pathname){
  const kk=await kapiKontrol(A,$,p,!0);
  if(!kk.ok)return new Response(JSON.stringify({ok:!1,mesaj:kk.mesaj||"yetkisiz"}),{status:kk.kod||401,headers:{"content-type":"application/json"}});
  const job=await dbtIsOku(A);
  if(!job)return new Response(JSON.stringify({ok:!1,mesaj:"aktif tarama yok"}),{headers:{"content-type":"application/json"}});
  if(!job.tamamlandi&&job.kuyruk.length){
    const grup=job.kuyruk.splice(0,DBT_ADIM_BOYUT);
    const{sonuclar,semboller}=await dbtKosu(grup,job.dilimler,job.seviyeler);
    /* Toplam sonuç listesi çok büyümesin diye 20.000 girişte kırpılır —
       özet istatistikler etkilenmez, yalnız en eski girişler atılır. */
    job.sonuclar=job.sonuclar.concat(sonuclar).slice(-20000);
    job.semboller=job.semboller.concat(semboller);
    job.tamam+=grup.length;
    job.guncelleme=Date.now();
    if(!job.kuyruk.length)job.tamamlandi=!0;
    await dbtIsYaz(A,job);
  }
  return new Response(JSON.stringify({ok:!0,tamam:job.tamam,toplam:job.toplam,tamamlandi:job.tamamlandi,toplamGiris:job.sonuclar.length}),{headers:{"content-type":"application/json"}})
}
if("/dipbacktest/rapor"===$.pathname){
  const kk=await kapiKontrol(A,$,p,!0);
  if(!kk.ok)return new Response(kk.mesaj||"yetkisiz",{status:kk.kod||401});
  const job=await dbtIsOku(A);
  if(!job)return new Response("Aktif ya da tamamlanmış bir tam-havuz taraması yok. /dipbacktest adresinden 🌍 Tüm hisseler kutusunu işaretleyip başlat.",{headers:{"content-type":"text/plain; charset=utf-8"}});
  const anahtar=$.searchParams.get("key")||$.searchParams.get("t")||job.anahtar||"";
  if(!job.tamamlandi)
    return new Response(dbtIlerlemeHTML(anahtar),{headers:{"content-type":"text/html; charset=utf-8"}});
  const ozet=dbtOzetle(job.sonuclar);
  const sure=((job.guncelleme-job.baslangic)/1000).toFixed(1);
  return new Response(dbtRaporHTML({kodlar:{length:job.toplam},dilimler:job.dilimler,
    ozet:ozet,semboller:job.semboller,sure:sure,
    toplamGiris:job.sonuclar.length,anahtar:anahtar}),{headers:{"content-type":"text/html; charset=utf-8"}})
}
if("/yesil"===$.pathname){
  const kk=await kapiKontrol(A,$,p,!0);
  if(!kk.ok)return new Response(kk.mesaj||"yetkisiz",{status:kk.kod||401});
  const anahtar=$.searchParams.get("key")||$.searchParams.get("t")||"";
  const mevcut=await ykIsOku(A);
  if($.searchParams.get("git")!=="1")
    return new Response(ykFormHTML(anahtar,mevcut),{headers:{"content-type":"text/html; charset=utf-8"}});
  let kodlar=String($.searchParams.get("kod")||"").toUpperCase().split(/[^A-Z0-9]+/).filter(x=>KOD_GECERLI.test(x));
  if($.searchParams.get("evren")==="1"||!kodlar.length){
    const ev=await mbEvren(A,[]);
    kodlar=$.searchParams.get("evren")==="1"?ev.slice():ev.slice(0,40);
  }
  kodlar=[...new Set(kodlar)];
  /* Zaman kesimi: en eski gözlem ile bugünün ortası. Veriyi görmeden
     sabitlenir ki "en iyi bölme"yi seçme yanlılığı olmasın. */
  const simdi=Math.floor(Date.now()/1000);
  const job={anahtar:anahtar,kodlar:kodlar,kuyruk:kodlar.slice(),toplam:kodlar.length,tamam:0,
    zamanKesim:simdi-330*86400,   /* ~11 ay önce: 1SA verisinin kapsadığı aralığın ortası */
    sayac:ykSayacYeni(),semboller:[],baslangic:Date.now(),guncelleme:Date.now(),tamamlandi:!1};
  await ykIsYaz(A,job);
  return new Response(ykIlerlemeHTML(anahtar),{headers:{"content-type":"text/html; charset=utf-8"}});
}
if("/yesil/adim"===$.pathname){
  const kk=await kapiKontrol(A,$,p,!0);
  if(!kk.ok)return new Response(JSON.stringify({ok:!1}),{status:kk.kod||401,headers:{"content-type":"application/json"}});
  const job=await ykIsOku(A);
  if(!job)return new Response(JSON.stringify({ok:!1,mesaj:"aktif tarama yok"}),{headers:{"content-type":"application/json"}});
  if(!job.tamamlandi&&job.kuyruk.length){
    const grup=job.kuyruk.splice(0,YK_ADIM);
    const tek=ykHisseTek(job.kodlar);
    const{sayac,semboller}=await ykKosu(grup,job.zamanKesim,tek,A);
    job.sayac=ykSayacBirlestir(job.sayac,sayac);
    job.semboller=job.semboller.concat(semboller).slice(-600);
    job.tamam+=grup.length;
    job.guncelleme=Date.now();
    if(!job.kuyruk.length)job.tamamlandi=!0;
    await ykIsYaz(A,job);
  }
  /* Rapor PARÇALARDAN üretilir; bellekteki iş yalnız yedek olarak katılır.
     Böylece bir adımın yazdığı hiçbir ölçüm kaybolmaz. */
  const toplu=await ykParcalariTopla(A);
  let raporSayac=toplu.sayac;
  if(job.sayac){
    const a=(raporSayac.taban&&raporSayac.taban[0]&&raporSayac.taban[0].n)||0;
    const b=(job.sayac.taban&&job.sayac.taban[0]&&job.sayac.taban[0].n)||0;
    if(b>a)raporSayac=job.sayac;            /* hangisi daha çoksa o */
  }
  const t=raporSayac&&raporSayac.taban&&raporSayac.taban[0];
  return new Response(JSON.stringify({ok:!0,tamam:job.tamam,toplam:job.toplam,
    tamamlandi:job.tamamlandi,gozlem:t?t.n:0}),{headers:{"content-type":"application/json"}});
}
if("/yesil/rapor"===$.pathname){
  const kk=await kapiKontrol(A,$,p,!0);
  if(!kk.ok)return new Response(kk.mesaj||"yetkisiz",{status:kk.kod||401});
  const job=await ykIsOku(A);
  if(!job)return new Response("Aktif ya da tamamlanmış tarama yok. /yesil adresinden başlat.",{headers:{"content-type":"text/plain; charset=utf-8"}});
  const anahtar=$.searchParams.get("key")||job.anahtar||"";
  if(!job.tamamlandi)return new Response(ykIlerlemeHTML(anahtar),{headers:{"content-type":"text/html; charset=utf-8"}});
  return new Response(ykRaporHTML({sayac:job.sayac,semboller:job.semboller,toplam:job.toplam,
    sure:((job.guncelleme-job.baslangic)/1000).toFixed(1),anahtar:anahtar}),
    {headers:{"content-type":"text/html; charset=utf-8"}});
}
if($.pathname.startsWith("/panel")){
/* 4️⃣ + 1️⃣ Panel kapısı: IP başına yanlış deneme sayacı + (tanımlıysa)
   Cloudflare yerel rate limit. Doğru anahtarla girişte hiçbir fark yok. */
const kk=await kapiKontrol(A,$,p,!0);
if(!kk.ok)return new Response(kk.mesaj||"yetkisiz",{status:kk.kod||401})
;const t="POST"===p.method?await p.json().catch(()=>({})):{},a=async e=>{const t=[];if(!A.VERI)return t;let a=null;for(;t.length<e;){const n=await A.VERI.list({prefix:"u:",limit:1e3,cursor:a||void 0})
;for(const a of n.keys){const n=await A.VERI.get(a.name);if(n&&t.push(JSON.parse(n)),t.length>=e)break}if(n.list_complete||!n.cursor)break;a=n.cursor}return t};if("/panel/vip"===$.pathname){
let e=[...await E(A,!0)];if(t.ekle){const a=String(t.ekle).replace(/\D/g,"");a&&!e.includes(a)&&e.push(a)}return t.sil&&(e=e.filter(e=>e!==String(t.sil))),await async function(e,t){
return e.VERI&&await e.VERI.put("vip",JSON.stringify(t)),T=t,x=Date.now(),t}(A,e),t.ekle&&q.waitUntil(D(String(t.ekle).replace(/\D/g,""))),new Response(JSON.stringify({vip:e}),{headers:{
"content-type":"application/json; charset=utf-8"}})}if("/panel/engel"===$.pathname){let e=[...await N(A,!0)];if(t.ekle){const a=String(t.ekle).replace(/\D/g,"");a&&!e.includes(a)&&e.push(a)}
return t.sil&&(e=e.filter(e=>e!==String(t.sil))),await async function(e,t){return e.VERI&&await e.VERI.put("engel",JSON.stringify(t)),v=t,R=Date.now(),t}(A,e),new Response(JSON.stringify({engel:e}),{
headers:{"content-type":"application/json; charset=utf-8"}})}if("/panel/botengel"===$.pathname){
/* Otomatik tespit edilen "botu engellemiş" listesi — elle EKLENMEZ, sadece
   yanlış tespit varsa ya da kullanıcı botu tekrar açtıysa listeden
   çıkarılabilir (böylece bir sonraki yayında tekrar denenir). */
let e=await botEngelliOku(A,!0);if(t.sil){const a=String(t.sil);e=e.filter(e=>String(e)!==a);await A.VERI.put("botEngelli",JSON.stringify(e)).catch(()=>{});_beBellek=e;_beTS=Date.now()}
return new Response(JSON.stringify({botEngelli:e}),{headers:{"content-type":"application/json; charset=utf-8"}})}if("/panel/ayar"===$.pathname){const e="POST"===p.method?await async function(e,t){const a={...h,...await S(e,!0),...t}
;return a.kisitMin=Math.max(0,Math.min(600,Number(a.kisitMin)||0)),a.kisitMax=Math.max(a.kisitMin,Math.min(600,Number(a.kisitMax)||0)),e.VERI&&await e.VERI.put("ayar",JSON.stringify(a)),w=a,
O=Date.now(),a}(A,t):await S(A,!0);return new Response(JSON.stringify({ayar:e}),{headers:{"content-type":"application/json; charset=utf-8"}})}if("/panel/kota"===$.pathname){
const e=await D(String(t.id||"").replace(/\D/g,""));return new Response(JSON.stringify({ok:e}),{headers:{"content-type":"application/json; charset=utf-8"}})}if("/panel/yayin"===$.pathname){
const a=String(t.metin||"").trim();if(!a)return new Response(JSON.stringify({hata:"mesaj boş"}),{status:400,headers:{"content-type":"application/json"}});const n=t.hedef||"hepsi",i=60
;let r=[],s=null,l=!0;if("test"===n)r=[...e];else if("tek"===n)r=[String(t.id||"").replace(/\D/g,"")].filter(Boolean);else if("vip"===n){const e=await E(A,!0),a=Number(t.imlec||0);r=e.slice(a,a+i),
l=a+i>=e.length,s=l?null:String(a+i)}else if(A.VERI){const e=await A.VERI.list({prefix:"u:",limit:i,cursor:t.imlec||void 0});r=e.keys.map(e=>e.name.slice(2)),l=!!e.list_complete||!e.cursor,
s=l?null:e.cursor}const o=new Set(await N(A,!0));let c=0,d=0;const pyTekrar=[],pyBotEngelli=[];
for(const e2 of r){if(o.has(String(e2)))continue;
  let rr;try{rr=await b(A.BOT_TOKEN,"sendMessage",{chat_id:e2,text:a,parse_mode:"HTML",disable_web_page_preview:!0})}catch(_){rr=null}
  if(rr&&rr.ok)c++;else{d++;const kod=(rr&&rr.error_code)||0;if(403===kod)pyBotEngelli.push(e2);else if(400!==kod)pyTekrar.push(e2)}
}
if(A.VERI&&pyTekrar.length&&"hepsi"===n)q.waitUntil(yayinKuyrugaKoy(A,{metin:a,fileId:"",tur:"",alicilar:pyTekrar}).catch(()=>{}));
if(A.VERI&&pyBotEngelli.length)q.waitUntil(botEngelliEkle(A,pyBotEngelli).catch(()=>{}));
return A.VERI&&l&&q.waitUntil(A.VERI.put("sonYayin",JSON.stringify({tarih:(new Date).toISOString(),metin:a.slice(0,300),hedef:n}))),
new Response(JSON.stringify({gonderilen:c,basarisiz:d,kuyruklandi:pyTekrar.length,imlec:s,bitti:l}),{headers:{"content-type":"application/json; charset=utf-8"}})}if("/panel/csv"===$.pathname){
const e=await a(5e3),t=await Y(A),n=await F(A),py=await PK(A),i=new Set(await E(A,!0)),eng2=new Set(await N(A,!0)),be2=new Set(await botEngelliOku(A)),r=e=>e.map(e=>'"'+String(null==e?"":e).replace(/"/g,'""')+'"').join(",")
;let s=r(["id","ad","kullanici","katilim","davetci","davet_ettigi","paylas_tusu","sorgu","son_aktif","sinirsiz","panelden_engelli","botu_engellemis"])+"\n";for(const a of e){const e=t[String(a.id)]||{}
;s+=r([a.id,a.ad,a.kullanici,a.katilim,a.ref,n[String(a.id)]||0,py[String(a.id)]||0,e.toplam||0,e.son?new Date(1e3*e.son).toISOString():"",i.has(String(a.id))?"evet":"",eng2.has(String(a.id))?"evet":"",be2.has(String(a.id))?"evet":""])+"\n"}return new Response("\ufeff"+s,{headers:{
"content-type":"text/csv; charset=utf-8","content-disposition":'attachment; filename="fixborsa-uyeler.csv"'}})}if("/panel/iz"===$.pathname){
const lz=await a(2e3);
const isim=e=>{const t=lz.find(t=>String(t.id)===String(e));return t&&(t.ad||(t.kullanici?"@"+t.kullanici:""))||("id:"+e)};
const{kullanicilar:ham,sekmeToplam}=await izListele(A,500);
const kullanicilar=ham.slice(0,200).map(u=>({id:u.id,ad:isim(u.id),toplamSn:u.toplamSn||0,girisSayisi:u.girisSayisi||0,
  sonGorulme:u.sonGorulme||null,sonSekme:u.sonSekme||null,
  sekmeler:Object.entries(u.sekmeler||{}).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([ad,sn])=>({ad,sn}))
}));
return new Response(JSON.stringify({kullanicilar,sekmeToplam,taranan:ham.length}),{headers:{"content-type":"application/json; charset=utf-8"}})}
if("/panel/veri"===$.pathname){
const e=await L(A),t=await F(A),n=await Y(A),i=await E(A,!0),r=await N(A,!0),s=await S(A,!0),py=await PK(A),gb=await gbOku(A),be=await botEngelliOku(A);let l=await a(1e3);const o=e=>{const t=l.find(t=>String(t.id)===String(e))
;return t&&(t.ad||(t.kullanici?"@"+t.kullanici:""))||""};for(const e of l){const t=n[String(e.id)]||{};e.sorgu=t.toplam||0,e.sonAktif=t.son||null,e.paylas=py[String(e.id)]||0}
l.sort((e,t)=>(t.katilim||"").localeCompare(e.katilim||""));const c=Object.entries(t).map(([e,t])=>({id:e,n:t,ad:o(e),paylas:py[String(e)]||0})).sort((e,t)=>t.n-e.n).slice(0,50),d=Object.entries(n).map(([e,t])=>({id:e,
ad:o(e),toplam:t.toplam||0,potansiyel:t.potansiyel||0,fibo:t.fibo||0,detay:t.detay||0,son:t.son||null
})).sort((e,t)=>t.toplam-e.toplam).slice(0,50),u=Math.floor(Date.now()/1e3),f=Object.values(n).filter(e=>e.son&&u-e.son<86400).length,b=Object.values(n).filter(e=>e.son&&u-e.son<604800).length,p=await g(A)
/* 📊 SEGMENTASYON — "kayıtlı" ile "gerçekte ulaşılabilir/aktif" farklı
   şeyler: engel (admin kapatmış) ve botEngelli (kullanıcı botu engellemiş/
   silinmiş hesap) çıkarılınca gerçek net alıcı kitlesi ortaya çıkar; sorgu
   sayısı 0 olanlar da kayıtlı ama hiç kullanmamış demektir. l en fazla
   1000 kayıt üzerinden taranır (taraliUye alanına bakılabilir). */
;const hk=l.filter(e=>!e.sorgu).length,net=(e.toplam||0)-r.length-be.length
;let y=null;if(A.VERI){const e=await A.VERI.get("sonYayin");e&&(y=JSON.parse(e))}return new Response(JSON.stringify({toplam:e.toplam||0,gun:e.gun||{},basis:e.basis||{},kullanicilar:l.slice(0,400),
referans:c,sorguLider:d,vip:i,engel:r,botEngelli:be,hicKullanmayan:hk,netUlasilabilir:net,taraliUye:l.length,ayar:s,aktif24:f,aktif7g:b,sonYayin:y,listeGuncelleme:p?p.guncelleme:null,listeOzet:p&&p.kartlar?Object.keys(p.kartlar).filter(e=>"sira"!==e).map(e=>({ad:e,
n:p.kartlar[e].length})):[],depo:!!A.VERI,agac:l.map(e=>({id:e.id,ad:e.ad,kullanici:e.kullanici,ref:e.ref,paylas:e.paylas})),paylasToplam:Object.values(py).reduce((a,b)=>a+(Number(b)||0),0),geribildirim:gb.slice(0,100)}),{headers:{"content-type":"application/json; charset=utf-8"}})}return new Response(await async function(){if(G)return G
;const e=Uint8Array.from(atob(J),e=>e.charCodeAt(0)),t=new Blob([e]).stream().pipeThrough(new DecompressionStream("gzip"));return G=await new Response(t).text(),G}(),{headers:{
"content-type":"text/html; charset=utf-8"}})};if("/paylas"===$.pathname){const ref=($.searchParams.get("r")||"").replace(/\D/g,""),uname=await botAd(A).catch(()=>null)||"bot",link="https://t.me/share/url?url="+encodeURIComponent("https://t.me/"+uname+"?start=r"+ref)+"&text="+encodeURIComponent(DAVET_METIN);return new Response('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><script src="https://telegram.org/js/telegram-web-app.js" async></script></head><body style="margin:0;background:#0d1117;color:#e6edf3;font:15px system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh"><div>Yönlendiriliyor…</div><script>(function(){var link='+JSON.stringify(link)+';var done=false;function git(){if(done)return;done=true;var tg=window.Telegram&&window.Telegram.WebApp;try{if(tg&&tg.initData){try{fetch("/paylas/log",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({initData:tg.initData})}).catch(function(){})}catch(e){}}if(tg&&tg.openTelegramLink){try{tg.ready&&tg.ready()}catch(e){}tg.openTelegramLink(link);try{tg.close()}catch(e){}}else{location.href=link}}catch(e){location.href=link}}setTimeout(git,1200);var iv=setInterval(function(){if(window.Telegram&&window.Telegram.WebApp){clearInterval(iv);git()}},50)})()</script></body></html>',{headers:{"content-type":"text/html; charset=utf-8"}})}
if("/paylas/log"===$.pathname&&"POST"===p.method){const e=await p.json().catch(()=>null),t=e&&e.initData;if(t&&A.BOT_TOKEN){const e=await dogrulaInitData(t,A.BOT_TOKEN).catch(()=>null);e&&await PKArtir(A,String(e))}return new Response(JSON.stringify({ok:!0}),{headers:{"content-type":"application/json; charset=utf-8"}})}
if("/app"===$.pathname||"/mini"===$.pathname)return new Response(MINIAPP,{headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store","X-Frame-Options":"ALLOWALL"}});
if("/api/medyayukle"===$.pathname&&"POST"===p.method){
const JS2=(o,st)=>new Response(JSON.stringify(o),{status:st||200,headers:Object.assign({"content-type":"application/json; charset=utf-8","cache-control":"no-store"},ee)});
let fd=null;try{fd=await p.formData()}catch(e){}
if(!fd)return JS2({ok:!1,hata:"dosya okunamadi"},400);
const initData=String(fd.get("initData")||"");
if(!initData||!A.BOT_TOKEN)return JS2({ok:!1,hata:"initData yok"},401);
const uid2=await dogrulaInitData(initData,A.BOT_TOKEN).catch(()=>null);
if(!uid2||!d(uid2))return JS2({ok:!1,hata:"yetkisiz"},403);
const dosya=fd.get("dosya");
if(!dosya||"string"==typeof dosya)return JS2({ok:!1,hata:"dosya yok"},400);
const tip=String(dosya.type||"");
const video=tip.indexOf("video")===0,metot=video?"sendVideo":"sendPhoto",alan=video?"video":"photo";
const gonder=new FormData();
gonder.append("chat_id",String(uid2));
gonder.append("caption","🧪 <b>Medya yüklendi</b>\n<i>duyuruda bu görsel kullanılacak</i>");
gonder.append("parse_mode","HTML");
gonder.append(alan,dosya,dosya.name||(video?"video.mp4":"foto.jpg"));
const rr=await fetch("https://api.telegram.org/bot"+A.BOT_TOKEN+"/"+metot,{method:"POST",body:gonder}).then(x=>x.json()).catch(()=>null);
if(!rr||!rr.ok)return JS2({ok:!1,hata:(rr&&rr.description)||"Telegram reddetti"},400);
const res=rr.result;
const fid=video?(res.video&&res.video.file_id):(res.photo&&res.photo.length?res.photo[res.photo.length-1].file_id:null);
if(!fid)return JS2({ok:!1,hata:"file_id alinamadi"},400);
return JS2({ok:!0,tur:video?"video":"foto",fileId:fid})}
/* 📥 Toplu yükleme ucu — kap_ortaklik_scraper.py'nin push_to_worker()
   fonksiyonu buraya POST atar. Telegram initData GÖNDEREMEZ (bu bir
   GitHub Actions script'i, Telegram oturumu yok) — bu yüzden bu route
   genel /api/ initData kapısından ÖNCE, kendi PANEL_KEY korumasıyla
   ayrı tutuluyor (bkz. /api/medyayukle ile aynı desen). */
if("/api/ortaklikYukle"===$.pathname&&"POST"===p.method){
  const JS2=(o,st)=>new Response(JSON.stringify(o),{status:st||200,headers:Object.assign({"content-type":"application/json; charset=utf-8","cache-control":"no-store"},ee)});
  const gov2=await p.json().catch(()=>null);
  const anahtar=A.PANEL_KEY||t;
  if(!gov2||gov2.key!==anahtar)return JS2({ok:!1,hata:"yetkisiz"},403);
  if(!A.VERI)return JS2({ok:!1,hata:"KV bağlı değil"});
  await A.VERI.put("ortaklikHaritasi",JSON.stringify(gov2.veri||{}));
  return JS2({ok:!0})
}
/* 📥 fon_hisse_scraper.py'nin push_to_worker() fonksiyonu buraya POST atar.
   /api/ortaklikYukle ile BİREBİR AYNI desen — ayrı bir KV anahtarına
   (fonHisseHaritasi) yazıyor ki ortaklık haritası verisiyle karışmasın. */
if("/api/fonYukle"===$.pathname&&"POST"===p.method){
  const JS2=(o,st)=>new Response(JSON.stringify(o),{status:st||200,headers:Object.assign({"content-type":"application/json; charset=utf-8","cache-control":"no-store"},ee)});
  const gov2=await p.json().catch(()=>null);
  const anahtar=A.PANEL_KEY||t;
  if(!gov2||gov2.key!==anahtar)return JS2({ok:!1,hata:"yetkisiz"},403);
  if(!A.VERI)return JS2({ok:!1,hata:"KV bağlı değil"});
  const yeniVeri=gov2.veri||{};
  /* 📦 AYLIK ARŞİV — FONLAR sekmesindeki diff/konsensüs/geçmiş özellikleri
     için, üzerine yazmadan ÖNCE mevcut halini "fonGecmis:YYYY-MM" anahtarına
     arşivle. Kova, YENİ verinin değil, bu push'tan HEMEN ÖNCEKİ verinin
     KENDİ guncelleme ayına göre seçilir. Aynı ay içinde tekrar push edilirse
     aynı kovanın üzerine yazılır (idempotent) — farklı aylar ASLA silinmez,
     bu append-only bir geçmiş (bkz. fonGecmisListe). */
  const eskiHam=await A.VERI.get("fonHisseHaritasi");
  if(eskiHam){
    try{
      const eskiVeri=JSON.parse(eskiHam);
      const eskiAy=String(eskiVeri.guncelleme||"").slice(0,7);
      if(/^\d{4}-\d{2}$/.test(eskiAy)){
        await A.VERI.put("fonGecmis:"+eskiAy,eskiHam);
        let liste=[];
        try{liste=JSON.parse(await A.VERI.get("fonGecmisListe"))||[]}catch(e){}
        if(!liste.includes(eskiAy)){liste.push(eskiAy);liste.sort();await A.VERI.put("fonGecmisListe",JSON.stringify(liste))}
      }
    }catch(e){}
  }
  await A.VERI.put("fonHisseHaritasi",JSON.stringify(yeniVeri));
  return JS2({ok:!0})
}
/* 🕰️ TARİHSEL YEDEKLEME — fon_hisse_scraper.py'nin backfill modu, TEFAS'ın
   GEÇMİŞ tarihli Fon Portföy Dağılım raporlarından çektiği ESKİ ayları
   doğrudan buraya POST eder. /api/fonYukle'den farkı: güncel
   fonHisseHaritasi'ye HİÇ dokunmaz, doğrudan "fonGecmis:YYYY-MM" kovasına
   yazar — böylece FONLAR sekmesi aylarca gerçek zamanlı push beklemeden
   geçmişle dolar. Dolu bir ay kazara ezilmesin diye uzerineYaz:true
   gönderilmediği sürece üzerine yazmaz. */
if("/api/fonGecmisYukle"===$.pathname&&"POST"===p.method){
  const JS2=(o,st)=>new Response(JSON.stringify(o),{status:st||200,headers:Object.assign({"content-type":"application/json; charset=utf-8","cache-control":"no-store"},ee)});
  const gov2=await p.json().catch(()=>null);
  const anahtar=A.PANEL_KEY||t;
  if(!gov2||gov2.key!==anahtar)return JS2({ok:!1,hata:"yetkisiz"},403);
  if(!A.VERI)return JS2({ok:!1,hata:"KV bağlı değil"});
  const ay=String(gov2.ay||"").trim();
  if(!/^\d{4}-\d{2}$/.test(ay))return JS2({ok:!1,hata:"ay YYYY-MM formatında olmalı"},400);
  const veri=gov2.veri||{};
  if(!veri.fonlar||!veri.hisseIndeksi)return JS2({ok:!1,hata:"veri eksik (fonlar/hisseIndeksi gerekli)"},400);
  if(!gov2.uzerineYaz&&await A.VERI.get("fonGecmis:"+ay))
    return JS2({ok:!1,hata:"bu ay zaten dolu — üzerine yazmak için uzerineYaz:true gönder",ay});
  await A.VERI.put("fonGecmis:"+ay,JSON.stringify(veri));
  let liste=[];
  try{liste=JSON.parse(await A.VERI.get("fonGecmisListe"))||[]}catch(e){}
  if(!liste.includes(ay)){liste.push(ay);liste.sort();await A.VERI.put("fonGecmisListe",JSON.stringify(liste))}
  return JS2({ok:!0,ay,fonSayisi:Object.keys(veri.fonlar).length})
}
/* 📋 Kesinleşmiş (fonGecmis:AY olarak yazılmış) ayların listesi — backfill
   script'i hangi ayları ATLAYABİLECEĞİNİ (zaten tamam) buradan öğrenir. */
if("/api/fonGecmisListeOku"===$.pathname){
  const JS2=(o,st)=>new Response(JSON.stringify(o),{status:st||200,headers:Object.assign({"content-type":"application/json; charset=utf-8","cache-control":"no-store"},ee)});
  const anahtar=A.PANEL_KEY||t;
  if(($.searchParams.get("key")||"")!==anahtar)return JS2({ok:!1,hata:"yetkisiz"},403);
  if(!A.VERI)return JS2({ok:!1,hata:"KV bağlı değil"});
  let liste=[];
  try{liste=JSON.parse(await A.VERI.get("fonGecmisListe"))||[]}catch(e){}
  return JS2({ok:!0,aylar:liste})
}
/* 🚧 BACKFILL TASLAĞI — 610 fonun tüm geçmişini taramak tek run'a sığmaz.
   Script, run'lar arasında "hangi fonları taradım + o taramadan çıkan
   ay->fon verisi" durumunu buraya yazar/buradan okur; hiçbir ay TAM
   taranmadan "fonGecmis:AY" olarak KESİNLEŞTİRİLMEZ (bkz. fonGecmisYukle) —
   bu sadece ARA durak, worker KV'de "fonGecmisTaslak" anahtarında durur. */
if("/api/fonGecmisTaslakOku"===$.pathname){
  const JS2=(o,st)=>new Response(JSON.stringify(o),{status:st||200,headers:Object.assign({"content-type":"application/json; charset=utf-8","cache-control":"no-store"},ee)});
  const anahtar=A.PANEL_KEY||t;
  if(($.searchParams.get("key")||"")!==anahtar)return JS2({ok:!1,hata:"yetkisiz"},403);
  if(!A.VERI)return JS2({ok:!1,hata:"KV bağlı değil"});
  const ham=await A.VERI.get("fonGecmisTaslak");
  if(!ham)return JS2({ok:!0,veri:null});
  try{return JS2({ok:!0,veri:JSON.parse(ham)})}catch(e){return JS2({ok:!1,hata:"veri bozuk"})}
}
if("/api/fonGecmisTaslakYaz"===$.pathname&&"POST"===p.method){
  const JS2=(o,st)=>new Response(JSON.stringify(o),{status:st||200,headers:Object.assign({"content-type":"application/json; charset=utf-8","cache-control":"no-store"},ee)});
  const gov2=await p.json().catch(()=>null);
  const anahtar=A.PANEL_KEY||t;
  if(!gov2||gov2.key!==anahtar)return JS2({ok:!1,hata:"yetkisiz"},403);
  if(!A.VERI)return JS2({ok:!1,hata:"KV bağlı değil"});
  await A.VERI.put("fonGecmisTaslak",JSON.stringify(gov2.veri||{}));
  return JS2({ok:!0})
}
/* 📤 KALDIĞI YERDEN DEVAM — kap_ortaklik_scraper.py ve fon_hisse_scraper.py
   her run'ın başında BUNLARI çağırıp önceki sonucu okuyor, daha önce
   başarıyla işlenmiş kayıtları atlıyor. GET (query'de key) — script'ler
   POST /api/*Yukle ile YAZIYOR, bunlar sadece OKUYOR, aynı PANEL_KEY ile
   korunuyor. initData gerektiren genel /api/ kapısından önce, /api/*Yukle
   ile aynı yerde tutuluyor. */
if("/api/ortaklikHam"===$.pathname){
  const JS2=(o,st)=>new Response(JSON.stringify(o),{status:st||200,headers:Object.assign({"content-type":"application/json; charset=utf-8","cache-control":"no-store"},ee)});
  const anahtar=A.PANEL_KEY||t;
  if(($.searchParams.get("key")||"")!==anahtar)return JS2({ok:!1,hata:"yetkisiz"},403);
  if(!A.VERI)return JS2({ok:!1,hata:"KV bağlı değil"});
  const ham=await A.VERI.get("ortaklikHaritasi");
  if(!ham)return JS2({ok:!0,veri:null});
  try{return JS2({ok:!0,veri:JSON.parse(ham)})}catch(e){return JS2({ok:!1,hata:"veri bozuk"})}
}
if("/api/fonHam"===$.pathname){
  const JS2=(o,st)=>new Response(JSON.stringify(o),{status:st||200,headers:Object.assign({"content-type":"application/json; charset=utf-8","cache-control":"no-store"},ee)});
  const anahtar=A.PANEL_KEY||t;
  if(($.searchParams.get("key")||"")!==anahtar)return JS2({ok:!1,hata:"yetkisiz"},403);
  if(!A.VERI)return JS2({ok:!1,hata:"KV bağlı değil"});
  const ham=await A.VERI.get("fonHisseHaritasi");
  if(!ham)return JS2({ok:!0,veri:null});
  try{return JS2({ok:!0,veri:JSON.parse(ham)})}catch(e){return JS2({ok:!1,hata:"veri bozuk"})}
}
if($.pathname.startsWith("/api/")){
const JS=(o,st)=>new Response(JSON.stringify(o),{status:st||200,headers:Object.assign({"content-type":"application/json; charset=utf-8","cache-control":"no-store"},ee)});
if("POST"!==p.method)return JS({ok:!1,hata:"POST bekleniyor"},405);
const gov=await p.json().catch(()=>null);
if(!gov||!gov.initData||!A.BOT_TOKEN)return JS({ok:!1,hata:"initData yok"},401);
const uid=await dogrulaInitData(gov.initData,A.BOT_TOKEN).catch(()=>null);
if(!uid)return JS({ok:!1,hata:"dogrulanamadi"},401);
if(await B(A,uid))return JS({ok:!1,hata:"erisim kapali"},403);
/* 1️⃣ + B) KADEMELİ hız sınırı. SINIR_API binding'i TANIMLI DEĞİLSE
   hiçbir kısıt yok (fail-open). Kademeler:
     yönetici  → hiç sınırlanmaz (kendi panelin yavaşlamasın)
     süper üye → SINIR_API_VIP varsa o, yoksa SINIR_API
     normal    → SINIR_API
   Önerilen: SINIR_API 300 istek/60 sn (normal kullanım ~20/dk, 15 kat pay). */
if(!d(uid)){
  const vipMi=await suparUyeMi(A,uid).catch(()=>!1);
  const bindingAdi=vipMi&&A.SINIR_API_VIP?"SINIR_API_VIP":"SINIR_API";
  if(!await sinirGec(A,bindingAdi,(vipMi?"v":"n")+uid))
    return JS({ok:!1,hata:"çok hızlı — birkaç saniye bekle"},429);
}
const YON=d(uid),KOD=v=>String(v||"").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,10),ID=v=>String(v||"").replace(/\D/g,"");
if("/api/geribildirim"===$.pathname){
const metin=String(gov.metin||"").trim().slice(0,2000);
if(!metin)return JS({ok:!1,hata:"mesaj boş"},400);
q.waitUntil((async()=>{
  const uy=await uyeAl(A,uid).catch(()=>null);
  const ad=(uy&&uy.ad)||"",kullanici=(uy&&uy.kullanici)||"";
  await gbEkle(A,{id:String(uid),ad,kullanici,metin,tarih:Date.now()}).catch(()=>{});
  const gosterAd=ad||(kullanici?"@"+kullanici:("ID "+uid));
  const bildirim="📩 <b>Yeni görüş/öneri</b>\n\n👤 "+gosterAd+(kullanici?" (@"+kullanici+")":"")+"\n🆔 <code>"+uid+"</code>\n\n💬 "+metin;
  /* 🔔 DÜZELTME: eskiden bildirim salt metindi, yöneticiye "cevabı nereden
     yazacağım" belli değildi (Telegram'dan doğrudan DM atmak sistemin
     dışına çıkıyordu). Artık mesajın altında "sistem üzerinden yanıtla"
     düğmesi var — uygulamayı doğrudan geri bildirim kutusuna açar. */
  const dugme={inline_keyboard:[[{text:"📩 Sistem üzerinden yanıtla",web_app:{url:$.origin+"/app?v="+Date.now()}}]]};
  for(const y of yoneticiListesi())await b(A.BOT_TOKEN,"sendMessage",{chat_id:y,text:bildirim,parse_mode:"HTML",reply_markup:dugme}).catch(()=>{});
})());
return JS({ok:!0})}
if("/api/iz"===$.pathname){
/* 👣 İstemciden gelen ayak izi bildirimi: sekme değişiminde/otomatik aralıkla
   biriken saniye, ya da oturum başlangıcı ("giris"). Sessizce kabul eder —
   panel istatistiği için, kullanıcı deneyimini asla etkilememeli. */
const sekme=String(gov.sekme||"").slice(0,30),sn=Number(gov.sn)||0,giris=!!gov.giris;
if(giris)q.waitUntil(izYaz(A,uid,"__giris__",0).catch(()=>{}));
if(sekme&&sn>0)q.waitUntil(izYaz(A,uid,sekme,sn).catch(()=>{}));
return JS({ok:!0})}
if("/api/veri"===$.pathname){
const L2=await g(A),sup=await suparUyeMi(A,uid),ref=(await F(A))[String(uid)]||0,fav=await X(A,uid),portfoy=await XP(A,uid),portfoyGecmis=await XPG(A,uid),portfoyGunluk=await XPGUNLUK(A,uid);
const un=BUN||await botAd(A).catch(()=>null)||"bot";
const temelDurum=await temelDurumAl(A).catch(()=>({var:!1}));
const kart={};
/* ⏱️ ZENGİNLEŞTİRME ARTIK OKUMA ANINDA.
   Temel veri ve sektör gücü yalnızca /push sırasında kartlara işleniyordu.
   Sonuç: temel.json bir taramadan SONRA oluşursa, o günün kartlarında
   hiç görünmüyordu — kullanıcı "veri yüklü ama liste boş" tuhaflığıyla
   karşılaşıyordu. Temel veri haftada bir, kartlar dakikada bir değişir;
   doğru yer okuma anıdır. Maliyeti bellekten bir okuma. */
if(L2&&L2.kartlar)for(const k of Object.keys(L2.kartlar)){
if("sira"===k){kart.sira=L2.kartlar.sira;continue}
if(k.indexOf("aday")===0&&!sup)continue;
kart[k]=L2.kartlar[k]}
/* Kartlar hazır — şimdi temel veriyi ve sektör gücünü üstlerine işle.
   Hata olursa sessizce atlanır; liste her koşulda döner. */
{ const zeng={kartlar:kart,rrg:(L2&&L2.rrg)||null};
  await sektorGucEkle(A,zeng).catch(()=>{});
  await temelEkle(A,zeng).catch(()=>{}); }
let gun=null;
/* Son tarama saati YALNIZ yöneticiye gösterilir. */
if(YON&&L2&&L2.guncelleme){const dt=new Date(L2.guncelleme);gun=String((dt.getUTCHours()+3)%24).padStart(2,"0")+":"+String(dt.getUTCMinutes()).padStart(2,"0")}
const onayli=await onayVarMi(A,uid);
const portfoySektor={};for(const kod of Object.keys(portfoy))portfoySektor[kod]=await sektorAl(A,kod);
/* 🔔 Yönetici için okunmamış geri bildirim sayısı — yalnız yöneticiye
   hesaplanır (herkeste gereksiz KV okuması olmasın). */
const gbYeni=YON?await gbOkunmamisSayisi(A).catch(()=>0):0;
return JS({ok:!0,onay:onayli,onayMetin:onayli?null:ONAY_METIN,yon:YON,super:sup,ref:ref,kalan:ref%20===0?20:20-ref%20,fav:fav,portfoy:portfoy,portfoyGecmis:portfoyGecmis,portfoyGunluk:portfoyGunluk,portfoySektor:portfoySektor,kartlar:kart,guncelleme:gun,temelDurum:temelDurum,dusenler:(L2&&L2.dusenler)||[],
link:"https://t.me/"+un+"?start=r"+uid,davetMetin:DAVET_METIN,gbYeni:gbYeni})}
if("/api/hisse"===$.pathname){
const kod=KOD(gov.kod);if(!kod)return JS({ok:!1,hata:"kod yok"},400);
const L2=await g(A),kart=Z(L2,kod),tfKartlar=ZTum(L2,kod),z=L2&&L2.sozluk&&L2.sozluk[kod],fav=(await X(A,uid)).includes(kod),poz=(await XP(A,uid))[kod]||null;
/* GEÇMİŞ SİNYALLER: bu hisse daha önce hangi gün, hangi dilimde sinyal
   verdi ve o günden bugüne ne oldu. Kayıt anahtarı kod@dilim. */
const GC=[];
try{const G2=await y(A),GD=G2.gunler||{},bg=new Date(Date.now()+108e5).toISOString().slice(0,10);
for(const gun of Object.keys(GD).sort().reverse()){
const kay=GD[gun].kayitlar||{};
for(const key of Object.keys(kay)){const rec=kay[key];
if((rec.k||String(key).split("@")[0])!==kod)continue;
if(!(rec.g>0&&rec.s>0))continue;
GC.push({gun:gun,tf:rec.t||"",dolgu:rec.r===0,giris:rec.g,son:rec.s,
yuzde:100*(rec.s/rec.g-1),zirve:rec.max>0?100*(rec.max/rec.g-1):null,
yas:Math.max(0,Math.round((new Date(bg)-new Date(gun))/864e5))})}
if(GC.length>=24)break}}catch(e){}
return JS({ok:!0,kart:kart||null,tfKartlar:tfKartlar,ayna:z?AYNA(kod,z,tfKartlar):"",fav:fav,poz:poz,gecmis:GC})}
if("/api/mumlar"===$.pathname){
const kod=KOD(gov.kod);if(!kod)return JS({ok:!1,hata:"kod yok"},400);
const tf=mumTfNormal(gov.tf);
const ar=MUM_ARALIK[tf];
const r=await yfMumlar(kod,ar.interval,ar.range).catch(e=>({veri:[],hatalar:["yfMumlar istisna: "+(e&&e.message||e)]}));
const mumlar=r.veri||[];
const desen=await formasyonBul(A,kod,tf);
const fj=await formasyonlariGetir(A);
const kumulatif=formasyonKumulatif(fj&&fj.sonuc&&fj.sonuc[kod]);
return JS({ok:!0,mumlar:mumlar,desen:desen,tf:tf,kumulatif:kumulatif,debug:r.hatalar||[]})}
/* FORMASYON ROZETİ + LİSTESİ — ikisi de tek kaynaktan, GitHub Actions'in
   yayinladigi formasyon.json'dan okunuyor. Yahoo istegi yok, hisse basina KV
   onbellegi yok, "en fazla 48 hisse" tavani yok. */
if("/api/formasyonlar"===$.pathname){
const kodlar=[...new Set((Array.isArray(gov.kodlar)?gov.kodlar:[]).map(k=>KOD(k)).filter(Boolean))].slice(0,300);
const j=await formasyonlariGetir(A);const sonuc={};
if(j&&j.sonuc)for(const kod of kodlar){const p=j.sonuc[kod]
;if(p&&p.tip&&formasyonAktifMi(desenSinirDuzelt(p),(typeof p.fiyat==="number")?p.fiyat:null))sonuc[kod]={tip:p.tip,yon:p.yon,kalite:p.kalite||0}}
return JS({ok:!0,sonuc:sonuc})}
/* 📐 FORMASYON LİSTESİ — kök sebep düzeltmesi:
   Gönderdiğin formasyon.json örneğinde HER hissede fiyat zaten var
   (tara.py 8 dakikada bir çalışıp tazeliyor) — sorun fiyat eksikliği
   değilmiş. Asıl hata: p.dilimler[] dizisi yalnızca "bu hissede şu
   dilimde de bir şeyler var" ÖZETİ (sadece tf/tip/yon/kalite) — kırılım
   çizgilerini (ust/alt), hedefi ve kırılım seviyesini İÇERMİYOR. Önceki
   kod bu özet dizisini geometriymiş gibi işleyip geometrisiz satırlar
   üretiyordu; kırılımSeviyesi() de hep null dönüyor, mesafe hiç
   hesaplanamıyordu — süzgeçler bu yüzden "çalışmıyormuş" gibi görünüyordu.
   Artık her hissenin TEK "en iyi" formasyonu (tam geometrisi olan üst
   seviye kayıt) kullanılıyor — taramadaki TÜM hisseler (187/240 gibi)
   dahil, tek bir Yahoo isteği bile atmadan. */
if("/api/kamalar"===$.pathname){
const j=await formasyonlariGetir(A);
if(!j||!j.sonuc)return JS({ok:!0,sonuc:[],eksik:!0,guncelleme:null});
const grup=typeof gov.grup==="string"?gov.grup:"";
const sonuc=[];
for(const kod of Object.keys(j.sonuc)){
  const p=j.sonuc[kod];if(!p||!p.tip)continue;
  if(grup&&p.grup!==grup)continue;
  const d=desenSinirDuzelt(p);
  const fiyat=(typeof p.fiyat==="number")?p.fiyat:null;
  const hedef=(typeof d.hedef==="number")?d.hedef:null;
  const kirilim=kirilimSeviyesi(d);
  const iptal=iptalSeviyesi(d);
  const onaylandi=onayDurumu(d.yon,fiyat,kirilim);
  /* Hedefine ulaşmış YA DA iptal seviyesi kırılmış formasyon artık aktif
     sayılmaz, listeden düşer (bkz. formasyonAktifMi). */
  if(!formasyonAktifMi(d,fiyat))continue;
  const digerDilimler=(Array.isArray(p.dilimler)?p.dilimler:[])
    .filter(x=>x&&x.tf&&x.tf!==p.tf).map(x=>x.tf);
  sonuc.push({
    kod:kod,tf:p.tf||"",tip:p.tip,yon:p.yon,kalite:p.kalite||0,grup:p.grup||"",
    fiyat:fiyat,
    hedef:hedef,hedefYuzde:(hedef!=null&&fiyat>0)?(hedef-fiyat)/fiyat*100:null,
    kirilim:kirilim,kirilimYuzde:(kirilim!=null&&fiyat>0)?(kirilim-fiyat)/fiyat*100:null,
    iptal:iptal,
    onaylandi:onaylandi,
    digerDilimler:digerDilimler,
    riskOdul:riskOdulHesapla(d.yon,fiyat,hedef,iptal)
  });
}
await onayGunlukIsaretle(A,sonuc);
sonuc.sort((a,b)=>b.kalite-a.kalite);
return JS({ok:!0,sonuc:sonuc.slice(0,300),eksik:!1,guncelleme:j.guncelleme||null})}


/* 🔄 SEKTÖR ROTASYONU: tarayıcının hesapladığı RS-Ratio / RS-Momentum
   değerlerini sektöre göre gruplar. Ağır iş tarayıcıda yapıldığı için
   burada yalnız toplama var. Sekme açıldığında çağrılır. */
/* 🩺 HATA KAYDI — yalnız yönetici. Silme de buradan. */
if("/api/hatalar"===$.pathname){
if(!YON)return JS({ok:!1,hata:"yetkisiz"},403);
if(gov.temizle){if(A.VERI)await A.VERI.put("hatalar","[]");return JS({ok:!0,liste:[]})}
if(gov.dene){await hataYaz(A,"test",new Error("test kaydı — bu bir arıza değil"),p);}
return JS({ok:!0,liste:await hatalariOku(A),sentry:!!A.SENTRY_DSN})}
/* 🛡 SİSTEM SAĞLIĞI — yalnız yönetici.
   Altı dayanıklılık maddesinin tamamının çıktısı tek ekranda. */
if("/api/saglik"===$.pathname){
if(!YON)return JS({ok:!1,hata:"yetkisiz"},403);
const sg=await saglikOku(A);
const L2=await g(A);
return JS({ok:!0,
  surum:a,
  sayac:sg,
  binding:{panel:!(!A.SINIR_PANEL),api:!(!A.SINIR_API)},
  depo:!!A.VERI,gh:!!A.GH_TOKEN,
  tgLimit:TG_SANIYE_LIMIT,
  sonTarama:(L2&&L2.guncelleme)||""})}
if("/api/rotasyon"===$.pathname){
const L2=await g(A);
const R=L2&&L2.rrg&&L2.rrg.hisse;
if(!R||!Object.keys(R).length)return JS({ok:!0,yok:!0});
const ek=await sektorEkAl(A),SJ=await sektorlariGetir(A),hj=(SJ&&SJ.sektor)||{};
const bul=k=>ek[k]||hj[k]||SEKTOR_HARITA[k]||"Diğer";
const grup={};
for(const kod of Object.keys(R)){
const v=R[kod];if(!v||typeof v.o!=="number")continue;
const ad=bul(kod),gg=grup[ad]||(grup[ad]={ad:ad,n:0,o:0,i:0,g:0,hisseler:[]});
gg.n++,gg.o+=v.o,gg.i+=v.i,gg.g+=Number(v.g)||0,gg.hisseler.push({kod:kod,o:v.o,i:v.i,g:v.g});
}
const R2=x=>Math.round(100*x)/100;
const liste=Object.keys(grup).map(k=>grup[k]).filter(x=>x.n>=2).map(x=>({
ad:x.ad,n:x.n,o:R2(x.o/x.n),i:R2(x.i/x.n),g:R2(x.g/x.n),
hisseler:x.hisseler.sort((a,b)=>(b.o+b.i)-(a.o+a.i)).slice(0,6)}));
liste.sort((a,b)=>(b.o+b.i)-(a.o+a.i));
return JS({ok:!0,liste:liste,toplam:Object.keys(R).length,
sektorKaynak:SJ?(SJ.sayi||Object.keys(hj).length):0,
referans:(L2.rrg&&L2.rrg.referans)||"",guncelleme:(L2.rrg&&L2.rrg.guncelleme)||null})}
if("/api/fav"===$.pathname){
const kod=KOD(gov.kod);if(!kod)return JS({ok:!1,hata:"kod yok"},400);
let f=await X(A,uid);const ekli=!f.includes(kod);f=ekli?[kod,...f]:f.filter(x=>x!==kod);f=f.slice(0,30);
if(A.VERI)await A.VERI.put("fav:"+uid,JSON.stringify(f));
return JS({ok:!0,fav:f,ekli:ekli})}
if("/api/portfoy"===$.pathname){
const kod=KOD(gov.kod);if(!kod)return JS({ok:!1,hata:"kod yok"},400);
let pf=await XP(A,uid),gecmis=null;
if(gov.sat){
/* KISMİ/TAM SATIŞ: pozisyonu azaltır ve gerçekleşen K/Z'yi ayrı bir geçmiş
   kaydına düşer — bu, "sadece anlık K/Z" gösteren eski panelden farklı olarak
   kapanan pozisyonların GERÇEK getirisini kalıcı olarak tutar. */
const mevcut=pf[kod];
if(!mevcut||!(mevcut.lot>0))return JS({ok:!1,hata:"pozisyon yok"},400);
const satLot=Number(gov.lot),satFiyat=Number(gov.fiyat);
if(!(satLot>0)||!(satFiyat>0))return JS({ok:!1,hata:"lot/fiyat gecersiz"},400);
const kirpilanLot=Math.min(satLot,mevcut.lot);
const kar=(satFiyat-mevcut.maliyet)*kirpilanLot,karYuzde=100*(satFiyat/mevcut.maliyet-1);
gecmis=await XPGEKLE(A,uid,{kod:kod,lot:kirpilanLot,alisMaliyet:mevcut.maliyet,satisFiyat:satFiyat,kar:kar,karYuzde:karYuzde,tarih:Date.now()});
const kalanLot=mevcut.lot-kirpilanLot;
if(kalanLot>1e-9)pf[kod]={lot:kalanLot,maliyet:mevcut.maliyet,eklendi:mevcut.eklendi};else delete pf[kod]
}else if(gov.sil){delete pf[kod]}else{
const lot=Number(gov.lot),mal=Number(gov.maliyet);
if(!(lot>0)||!(mal>0))return JS({ok:!1,hata:"lot/maliyet gecersiz"},400);
pf[kod]={lot:lot,maliyet:mal,eklendi:(pf[kod]&&pf[kod].eklendi)||Date.now()}}
await XPSET(A,uid,pf);
if(!gecmis)gecmis=await XPG(A,uid);
return JS({ok:!0,portfoy:pf,portfoyGecmis:gecmis})}
/* 🌊 ABSORPSİYON — sinyal listelerindeki hisseler + senin takip ettiklerin.
   Sonuç 30 dakika önbellekte; her açılışta Yahoo'ya yeniden gidilmez. */
if("/api/absorpsiyon"===$.pathname){
const fav=await X(A,uid),pf=await XP(A,uid);
/* DUR / DEVAM — yalniz yonetici. Birikim korunur, sadece yeni olcum durur. */
if(gov&&(gov.dur===1||gov.dur===0)){
  if(!YON)return JS({ok:!1,hata:"yetkisiz"},403);
  await absDurdurAyarla(A,gov.dur===1);
}
const paket=await absorpsiyonTara(A,[...fav,...Object.keys(pf)]).catch(()=>null);
if(!paket)return JS({ok:!0,liste:[],taranan:0,olculen:0,yas:0,calisiyor:!0});
const izlenen=new Set([...fav,...Object.keys(pf)]);
return JS({ok:!0,taranan:paket.taranan||0,olculen:paket.olculen||0,
evren:paket.evren||0,kalan:paket.kalan||0,cikan:paket.cikan||0,elenen:paket.elenen||0,
kaynak:paket.kaynak||"",
calisiyor:paket.calisiyor!==!1,
yas:Math.round((Date.now()-(paket.ts||0))/6e4),
liste:(paket.liste||[]).map(x=>Object.assign({takipte:izlenen.has(x.kod)},x)),
ayar:YON?(paket.ayar||await absAyarAl(A)):null})}
/* 🔗 ORTAKLIK HARİTASI — KV'de önceden hesaplanmış veriyi servis eder.
   Canlı hesaplama YAPMAZ (KAP taraması dakikalar sürer); kap_ortaklik_scraper.py
   periyodik çalışıp KV'yi güncelliyor. Veri yoksa dürüstçe ok:false döner. */
if("/api/ortaklik"===$.pathname){
  if(!A.VERI)return JS({ok:!1,hata:"KV bağlı değil"});
  const ham=await A.VERI.get("ortaklikHaritasi");
  if(!ham)return JS({ok:!1});
  let v;try{v=JSON.parse(ham)}catch(e){return JS({ok:!1,hata:"veri bozuk"})}
  /* kap_ortaklik_scraper.py çıktısı snake_case (pay_yuzde, sirket_sayisi, ...)
     üretiyor, arayüz (ortaklikGoster) camelCase okuyor — /api/ortaklikKisi
     bu dönüşümü zaten yapıyordu, burada eksikti. "undefined şirkette
     görünüyor" hatasının kaynağı buydu. */
  const m=v.modul||{};
  const modul={
    tekOrtakKontrolu:(m.tekOrtakKontrolu||[]).map(x=>({ticker:x.ticker,unvan:x.unvan,ortak:x.ortak,payYuzde:x.pay_yuzde})),
    hakimOrtak50:(m.hakimOrtak50||[]).map(x=>({ticker:x.ticker,unvan:x.unvan,ortak:x.ortak,payYuzde:x.pay_yuzde,tuzelMi:x.tuzel_mi})),
    dusukHalkaAciklik:(m.dusukHalkaAciklik||[]).map(x=>({ticker:x.ticker,unvan:x.unvan,halkaAciklikTahmini:x.halka_aciklik_tahmini})),
    cokluSirketIsimler:(m.cokluSirketIsimler||[]).map(x=>({isim:x.isim,tuzelMi:x.tuzel_mi,sirketSayisi:x.sirket_sayisi,
      sirketler:(x.sirketler||[]).map(s=>({ticker:s.ticker,rol:s.rol,payYuzde:s.pay_yuzde}))}))
  };
  return JS({ok:!0,guncelleme:v.guncelleme,sirketSayisi:v.sirketSayisi,modul:modul})
}
/* 🔎 SERBEST ARAMA — isim/fon (kisiIndeksi) veya şirket (ticker/unvan) için.
   gov.tip: "isim" (varsayılan) veya "sirket". gov.q: en az 2 karakter.
   Sadece ≥2 şirkette görünenler değil, TEK şirkette geçen isim/fon da
   eşleşir — "birden fazla şirkette görünen" modülünden farklı olarak
   burada amaç belirli bir ismi/şirketi DOĞRUDAN bulmak. */
if("/api/ortaklikAra"===$.pathname){
  if(!A.VERI)return JS({ok:!1,hata:"KV bağlı değil"});
  const q=String((gov&&gov.q)||"").trim();
  if(q.length<2)return JS({ok:!0,sonuclar:[]});
  const tip=String((gov&&gov.tip)||"isim");
  const ham=await A.VERI.get("ortaklikHaritasi");
  if(!ham)return JS({ok:!1});
  let v;try{v=JSON.parse(ham)}catch(e){return JS({ok:!1,hata:"veri bozuk"})}
  const normTR=s=>String(s||"").replace(/i/g,"İ").replace(/ı/g,"I").replace(/ğ/g,"Ğ")
    .replace(/ü/g,"Ü").replace(/ş/g,"Ş").replace(/ö/g,"Ö").replace(/ç/g,"Ç")
    .toUpperCase().replace(/\s+/g," ").trim();
  const qN=normTR(q);
  if(tip==="sirket"){
    const sirketler=v.sirketler||{};
    const sonuclar=[];
    for(const ticker in sirketler){
      const kart=sirketler[ticker]||{};
      const unvan=kart.unvan||"";
      if(normTR(ticker).includes(qN)||normTR(unvan).includes(qN)){
        sonuclar.push({ticker:ticker,unvan:unvan});
        if(sonuclar.length>=30)break;
      }
    }
    return JS({ok:!0,tip:"sirket",sonuclar:sonuclar})
  }
  // tip==="isim" (kişi/fon)
  const indeks=v.kisiIndeksi||{};
  const sonuclar=[];
  for(const anahtar in indeks){
    if(anahtar.includes(qN)){
      const kayit=indeks[anahtar]||{};
      const tickerlar=[...new Set((kayit.kayitlar||[]).map(k=>k.ticker))];
      sonuclar.push({
        isim:kayit.goruntu_isim||anahtar,
        tuzelMi:kayit.tuzel_mi,
        sirketSayisi:tickerlar.length,
        sirketler:tickerlar.slice(0,4),
      });
      if(sonuclar.length>=30)break;
    }
  }
  sonuclar.sort((a,b)=>b.sirketSayisi-a.sirketSayisi);
  return JS({ok:!0,tip:"isim",sonuclar:sonuclar})
}
/* 🏢 Tek bir şirketin tam kartı (yönetim kurulu + ortaklık yapısı) —
   "Şirket Ara" sonucuna dokununca açılır. */
if("/api/ortaklikSirket"===$.pathname){
  if(!A.VERI)return JS({ok:!1,hata:"KV bağlı değil"});
  const ticker=String((gov&&gov.ticker)||"").trim().toUpperCase();
  if(!ticker)return JS({ok:!1,hata:"ticker gerekli"});
  const ham=await A.VERI.get("ortaklikHaritasi");
  if(!ham)return JS({ok:!1});
  let v;try{v=JSON.parse(ham)}catch(e){return JS({ok:!1,hata:"veri bozuk"})}
  const kart=(v.sirketler||{})[ticker];
  if(!kart)return JS({ok:!0,bulunamadi:!0,ticker:ticker});
  return JS({ok:!0,ticker:ticker,unvan:kart.unvan,
    yonetimKurulu:(kart.yonetim_kurulu||[]).map(y=>({isim:y.isim,gorev:y.gorev})),
    ustYonetim:(kart.ust_yonetim||[]).map(u=>({isim:u.isim,gorev:u.gorev})),
    ortaklikYapisi:(kart.ortaklik_yapisi||[]).map(o=>({isim:o.isim,payYuzde:o.pay_yuzde,tuzelMi:o.tuzel_mi})),
    halkaAciklikTahmini:kart.halka_aciklik_tahmini,
    veriEksik:kart.veri_eksik||[]})
}
/* 📦 Bir fonun (kişi/kurum ismiyle) KENDİ portföyündeki hisseleri —
   kaynak fonHisseHaritasi (fon_hisse_scraper.py, TEFAS+KAP Portföy Dağılım
   Raporu). Ortaklık haritasındaki isim (KAP ortaklık yapısı tablosundan
   gelir) ile TEFAS fon adı BİREBİR aynı yazılmayabiliyor — bu yüzden tam
   eşleşme değil, normalize edilmiş metin İÇERME eşleşmesi kullanılıyor.
   Eşleşme yoksa dürüstçe eslesme:false döner, uydurma sonuç YOK. */
if("/api/fonHisseleri"===$.pathname){
  if(!A.VERI)return JS({ok:!1,hata:"KV bağlı değil"});
  const isim=String((gov&&gov.isim)||"").trim();
  if(!isim)return JS({ok:!1,hata:"isim gerekli"});
  const ham=await A.VERI.get("fonHisseHaritasi");
  if(!ham)return JS({ok:!0,eslesme:!1});
  let v;try{v=JSON.parse(ham)}catch(e){return JS({ok:!1,hata:"veri bozuk"})}
  const normTR=s=>String(s||"").replace(/i/g,"İ").replace(/ı/g,"I").replace(/ğ/g,"Ğ")
    .replace(/ü/g,"Ü").replace(/ş/g,"Ş").replace(/ö/g,"Ö").replace(/ç/g,"Ç")
    .toUpperCase().replace(/\(.*?\)/g," ").replace(/\s+/g," ").trim();
  const hedef=normTR(isim);
  const fonlar=v.fonlar||{};
  const eslesenler=[];
  for(const kod in fonlar){
    const f=fonlar[kod]||{};
    const adN=normTR(f.fon_adi);
    if(adN&&hedef&&(adN===hedef||adN.includes(hedef)||hedef.includes(adN)))eslesenler.push(f);
  }
  if(!eslesenler.length)return JS({ok:!0,eslesme:!1});
  return JS({ok:!0,eslesme:!0,fonlar:eslesenler.map(f=>({
    fonKodu:f.fon_kodu,fonAdi:f.fon_adi,rapordonemi:f.rapor_donemi,
    hisseler:(f.hisseler||[]).map(h=>({hisseKodu:h.hisse_kodu,payYuzde:h.pay_yuzde,tahminiLot:h.tahmini_lot}))
      .sort((a,b)=>(b.payYuzde||0)-(a.payYuzde||0))
  }))})
}
/* 🔎 Tek kişinin borsadaki tüm haritası. İsim eşleştirme normalize edilmiş
   anahtar üzerinden TAM eşleşme — benzer/kısmi isimler asla birleştirilmez. */
if("/api/ortaklikKisi"===$.pathname){
  if(!A.VERI)return JS({ok:!1,hata:"KV bağlı değil"});
  const isim=String((gov&&gov.isim)||"").trim();
  if(!isim)return JS({ok:!1,hata:"isim gerekli"});
  const ham=await A.VERI.get("ortaklikHaritasi");
  if(!ham)return JS({ok:!1});
  let v;try{v=JSON.parse(ham)}catch(e){return JS({ok:!1,hata:"veri bozuk"})}
  const anahtar=isim.trim().replace(/i/g,"İ").replace(/ı/g,"I").replace(/ğ/g,"Ğ")
    .replace(/ü/g,"Ü").replace(/ş/g,"Ş").replace(/ö/g,"Ö").replace(/ç/g,"Ç")
    .toUpperCase().replace(/\s+/g," ").trim();
  const kayit=(v.kisiIndeksi||{})[anahtar];
  if(!kayit)return JS({ok:!0,isim:isim,kayitlar:[]});
  return JS({ok:!0,isim:isim,goruntuIsim:kayit.goruntu_isim,tuzelMi:kayit.tuzel_mi,
    kayitlar:(kayit.kayitlar||[]).map(k=>({ticker:k.ticker,unvan:k.unvan,rol:k.rol,payYuzde:k.pay_yuzde,tuzelMi:k.tuzel_mi}))})
}
/* ═══ 🐣 FON ANALİZ KATMANI — FONLAR sekmesi ═══
   /api/fonYukle push'unda arşivlenen "fonGecmis:YYYY-MM" kovalarını, güncel
   "fonHisseHaritasi" ile karşılaştırıp diff/konsensüs/örtüşme üretir.
   İlk taramada (henüz arşiv yokken) diff alanları BOŞ döner — UYDURMA SAYI
   ASLA yok, sadece "henüz karşılaştırılacak ay yok" bilgisi verilir. */
async function fonVeriOku(A){
  const ham=await A.VERI.get("fonHisseHaritasi");
  if(!ham)return null;
  try{return JSON.parse(ham)}catch(e){return null}
}
async function fonOncekiAyVeriOku(A,guncelAy){
  let liste=[];
  try{liste=JSON.parse(await A.VERI.get("fonGecmisListe"))||[]}catch(e){}
  liste=liste.filter(ay=>ay<guncelAy).sort();
  if(!liste.length)return null;
  const oncekiAy=liste[liste.length-1];
  const ham=await A.VERI.get("fonGecmis:"+oncekiAy);
  if(!ham)return null;
  try{const v=JSON.parse(ham);v.__ay=oncekiAy;return v}catch(e){return null}
}
/* hisse_kodu -> {fonSayisi, toplamPay} — hisseIndeksi zaten fon_hisse_scraper.py
   tarafından ters-indekslenmiş geliyor, burada sadece toplam pay çıkarılıyor. */
function fonHisseOzetCikar(veri){
  const ozet={};
  const idx=(veri&&veri.hisseIndeksi)||{};
  for(const hisse in idx){
    const kayitlar=idx[hisse]||[];
    let toplamPay=0;
    for(const k of kayitlar)toplamPay+=(k.pay_yuzde||0);
    ozet[hisse]={fonSayisi:kayitlar.length,toplamPay:toplamPay};
  }
  return ozet;
}
if("/api/fonOzet"===$.pathname){
  if(!A.VERI)return JS({ok:!1,hata:"KV bağlı değil"});
  const guncel=await fonVeriOku(A);
  if(!guncel)return JS({ok:!0,hazirDegil:!0});
  const guncelAy=String(guncel.guncelleme||"").slice(0,7);
  const oncekiVeri=/^\d{4}-\d{2}$/.test(guncelAy)?await fonOncekiAyVeriOku(A,guncelAy):null;
  const guncelOzet=fonHisseOzetCikar(guncel);
  const oncekiOzet=oncekiVeri?fonHisseOzetCikar(oncekiVeri):null;
  const yeniAlim=[],artiranlar=[],azaltanlar=[],cikanlar=[];
  for(const hisse in guncelOzet){
    if(!oncekiOzet)break; // geçmiş yoksa diff hesaplanamaz — uydurma yok
    const g=guncelOzet[hisse],o=oncekiOzet[hisse];
    if(!o){yeniAlim.push({hisse,fonSayisi:g.fonSayisi,toplamPay:Math.round(g.toplamPay*100)/100});continue}
    const fark=g.toplamPay-o.toplamPay;
    const farkYuzde=o.toplamPay>0?Math.round((fark/o.toplamPay*100)*100)/100:null;
    const satir={hisse,fonSayisiOnce:o.fonSayisi,fonSayisiSimdi:g.fonSayisi,
      toplamPayOnce:Math.round(o.toplamPay*100)/100,toplamPaySimdi:Math.round(g.toplamPay*100)/100,farkYuzde};
    if(fark>0.01)artiranlar.push(satir);
    else if(fark<-0.01)azaltanlar.push(satir);
  }
  if(oncekiOzet)for(const hisse in oncekiOzet)
    if(!guncelOzet[hisse])cikanlar.push({hisse,fonSayisiOnce:oncekiOzet[hisse].fonSayisi,toplamPayOnce:Math.round(oncekiOzet[hisse].toplamPay*100)/100});
  yeniAlim.sort((a,b)=>b.fonSayisi-a.fonSayisi);
  artiranlar.sort((a,b)=>(b.farkYuzde||0)-(a.farkYuzde||0));
  azaltanlar.sort((a,b)=>(a.farkYuzde||0)-(b.farkYuzde||0));
  cikanlar.sort((a,b)=>b.fonSayisiOnce-a.fonSayisiOnce);
  const konsensus=Object.keys(guncelOzet).map(h=>({hisse:h,fonSayisi:guncelOzet[h].fonSayisi,toplamPay:Math.round(guncelOzet[h].toplamPay*100)/100}))
    .sort((a,b)=>b.fonSayisi-a.fonSayisi).slice(0,30);
  return JS({ok:!0,guncelleme:guncel.guncelleme,guncelAy:guncelAy,
    gecmisVarMi:!!oncekiOzet,oncekiAy:oncekiOzet?oncekiVeri.__ay:null,
    yeniAlim:yeniAlim.slice(0,30),artiranlar:artiranlar.slice(0,30),
    azaltanlar:azaltanlar.slice(0,30),cikanlar:cikanlar.slice(0,30),konsensus})
}
/* 🔎 Tek hissenin fon derinliği: kim tutuyor + varsa önceki ayla farkı. */
if("/api/fonHisseDetay"===$.pathname){
  if(!A.VERI)return JS({ok:!1,hata:"KV bağlı değil"});
  const kod=KOD(gov.kod||"");
  if(!kod)return JS({ok:!1,hata:"kod gerekli"});
  const veri=await fonVeriOku(A);
  if(!veri)return JS({ok:!0,hazirDegil:!0});
  const kayitlar=(veri.hisseIndeksi||{})[kod]||[];
  if(!kayitlar.length)return JS({ok:!0,bulunamadi:!0,kod});
  const guncelAy=String(veri.guncelleme||"").slice(0,7);
  const onceki=/^\d{4}-\d{2}$/.test(guncelAy)?await fonOncekiAyVeriOku(A,guncelAy):null;
  const oncekiKayitlar=onceki?((onceki.hisseIndeksi||{})[kod]||null):null;
  const oncekiToplam=oncekiKayitlar?oncekiKayitlar.reduce((s,k)=>s+(k.pay_yuzde||0),0):null;
  const guncelToplam=kayitlar.reduce((s,k)=>s+(k.pay_yuzde||0),0);
  return JS({ok:!0,kod,fonSayisi:kayitlar.length,toplamPay:Math.round(guncelToplam*100)/100,
    fonlar:kayitlar.map(k=>({fonKodu:k.fon_kodu,fonAdi:k.fon_adi,payYuzde:k.pay_yuzde,tahminiLot:k.tahmini_lot,rapordonemi:k.rapor_donemi}))
      .sort((a,b)=>(b.payYuzde||0)-(a.payYuzde||0)),
    gecmisVarMi:!!oncekiKayitlar,oncekiAy:onceki?onceki.__ay:null,
    oncekiFonSayisi:oncekiKayitlar?oncekiKayitlar.length:null,
    oncekiToplamPay:oncekiToplam==null?null:Math.round(oncekiToplam*100)/100})
}
/* 🔗 Bir fona en çok "hisse örtüşen" diğer fonlar — akıllı para kümelenmesi. */
if("/api/fonBenzer"===$.pathname){
  if(!A.VERI)return JS({ok:!1,hata:"KV bağlı değil"});
  const fonKodu=String((gov&&gov.fonKodu)||"").trim().toUpperCase();
  if(!fonKodu)return JS({ok:!1,hata:"fonKodu gerekli"});
  const veri=await fonVeriOku(A);
  if(!veri)return JS({ok:!0,hazirDegil:!0});
  const fonlar=veri.fonlar||{};
  const hedef=fonlar[fonKodu];
  if(!hedef)return JS({ok:!0,bulunamadi:!0});
  const hedefHisseler=new Set((hedef.hisseler||[]).map(h=>h.hisse_kodu));
  const sonuclar=[];
  for(const kod in fonlar){
    if(kod===fonKodu)continue;
    const f=fonlar[kod];
    const hisseler=(f.hisseler||[]).map(h=>h.hisse_kodu);
    let ortak=0;
    for(const h of hisseler)if(hedefHisseler.has(h))ortak++;
    if(ortak>0)sonuclar.push({fonKodu:kod,fonAdi:f.fon_adi,ortakHisseSayisi:ortak,toplamHisseSayisi:hisseler.length});
  }
  sonuclar.sort((a,b)=>b.ortakHisseSayisi-a.ortakHisseSayisi);
  return JS({ok:!0,fonKodu,fonAdi:hedef.fon_adi,hisseSayisi:hedefHisseler.size,benzerler:sonuclar.slice(0,15)})
}
/* ═══ 🐂🐻 MAL TOPLAMA/DAĞITIM + AYI/BOĞA — TÜM ZAMAN DİLİMLERİ ═══
   Üç iş tek uçta:
     gov.kod  → tek hissenin BÜTÜN dilimleri (Pine'daki TF panelinin aynısı)
     gov.tf   → o dilimde tüm havuz taraması (Pine'daki MAL+BOĞA tablosu)
     her ikisi de yoksa → dilim özetleri (hangi dilimde ne var) */
if("/api/malboga"===$.pathname){
  /* DUR / DEVAM — yalnız yönetici. Birikim korunur, yalnız yeni ölçüm durur. */
  if(gov&&(gov.dur===1||gov.dur===0)){
    if(!YON)return JS({ok:!1,hata:"yetkisiz"},403);
    await mbDurdurAyarla(A,gov.dur===1);
  }
  /* EVRENİ YENİLE — yalnız yönetici. Sektör/havuz önbelleklerini siler. */
  if(gov&&gov.evrenYenile){
    if(!YON)return JS({ok:!1,hata:"yetkisiz"},403);
    await evrenSifirla(A);
  }
  const sozluk={tfler:MB_TF_LISTE.map(t=>({tf:t,ad:MB_TF[t].ad,ik:MB_TF[t].ik}))};
  const kod=KOD(gov.kod||"");
  if(kod){
    const r=await mbTekHisse(kod).catch(()=>null);
    if(!r)return JS({ok:!1,hata:"ölçüm alınamadı"});
    return JS({ok:!0,tek:r,sozluk:sozluk});
  }
  /* 🔔 FİLTREYİ ALARMA GÖNDER / KALDIR — her SÜPER ÜYE kendi 5 yuvasını
     kurar (eskiden yalnız yönetici kurabiliyordu ve tek bir global kayıt
     herkes arasında paylaşılıyordu — "alarm siliniyor" şikayetinin asıl
     sebebi buydu). Yönetici zaten suparUyeMi() içinde otomatik geçer. */
  if(gov&&gov.is==="alarmListe"){
    return JS({ok:!0,alarm:await mbAlarmOzetListe(A,uid)});
  }
  if(gov&&gov.alarmKur){
    if(!await suparUyeMi(A,uid))return JS({ok:!1,hata:"yetkisiz — süper üyelik gerekli"},403);
    const kur=mbIstekNorm(gov);
    if(!mbFiltreVarMi(kur))return JS({ok:!1,hata:"önce en az bir modül aç"},400);
    if(!kur.tfler.length)return JS({ok:!1,hata:"önce zaman dilimi seç"},400);
    const r=await mbAlarmYuvaYaz(A,kur,uid,gov.alarmId,gov.ad);
    if(r.dolu)return JS({ok:!1,hata:"beş yuva da dolu — önce birini kaldır",
      alarm:mbAlarmOzetPaketle(r.liste)},400);
    const tohum=await mbAlarmTohumla(A,uid,kur,r.yuva.id).catch(()=>0);
    return JS({ok:!0,alarmKuruldu:!0,tohum:tohum,yuvaId:r.yuva.id,
      alarm:mbAlarmOzetPaketle(r.liste)});
  }
  if(gov&&gov.alarmSil){
    if(!await suparUyeMi(A,uid))return JS({ok:!1,hata:"yetkisiz — süper üyelik gerekli"},403);
    const kalanListe=await mbAlarmYuvaSil(A,uid,gov.alarmId===true?null:(gov.alarmId||null));
    return JS({ok:!0,alarmSilindi:!0,alarm:mbAlarmOzetPaketle(kalanListe)});
  }
  /* ⚡ DOĞRUDAN ÖLÇÜM — KV'YE HİÇ DOKUNMAZ
     Üç tur boyunca KV üzerinden biriktirmeyi düzeltmeye çalıştık; her
     seferinde başka bir yerden sızdı (gecikmeli okuma, isolate değişimi,
     arka plan turunun çalışıp çalışmaması). Kökten çözüm: taramayı
     uygulamanın kendisi yürütsün. Uygulama "şu dilimde şu hisseleri ölç"
     der, sunucu ölçer ve HAM sonucu döner; biriktirme uygulamanın
     belleğinde olur. Böylece KV, isolate ve cron denklemden tamamen çıkar
     — havuzun tamamı her zaman taranabilir.
     KV'deki birikim yalnız ALARM için kullanılmaya devam ediyor. */
  if(gov&&gov.is==="evren"){
    const ev=await tamEvren(A);
    return JS({ok:!0,kodlar:ev.slice(),kaynak:ev.kaynak||"",sayi:ev.length});
  }
  if(gov&&gov.is==="olc"){
    const tf=mbTfNormal(gov.tf);
    const kodlar=[...new Set((Array.isArray(gov.kodlar)?gov.kodlar:[])
      .map(k=>KOD(k)).filter(k=>KOD_GECERLI.test(k)))].slice(0,MB_OLC_AZAMI);
    const cikti={};
    let onbellekten=0;
    /* önce bellekte olanları topla — bunlar için ölçüm yapılmaz */
    const kalan=[];
    for(const kod of kodlar){
      const c=mbOnbellekAl(kod,tf);
      if(c){cikti[kod]=c;onbellekten++}else kalan.push(kod);
    }
    let sira=0;
    const isci=async()=>{
      while(sira<kalan.length){
        const kod=kalan[sira++];
        try{const r=await mbOlc(kod,tf,{});
          if(r){delete r.tf;cikti[kod]=r;mbOnbellekKoy(kod,tf,r)}}catch(_){}
      }
    };
    await Promise.all(Array.from({length:Math.min(MB_ES,kalan.length)},isci));
    return JS({ok:!0,tf:tf,olcum:cikti,istenen:kodlar.length,onbellekten:onbellekten});
  }
  /* ⏩ ELLE DOLDUR — arka plan taraması havuzu saatler içinde doldurur;
     kullanıcı beklemek istemezse bu uç seçili dilimleri hemen ilerletir.
     Bir istekte tek dilim × sınırlı hisse: alt-istek bütçesi taşmasın. */
  if(gov&&gov.doldur){
    const d=mbIstekNorm(gov);
    const evSayi=(await tamEvren(A)).length;
    let ilerleyen=null;
    for(const tf of d.tfler){
      const b=await mbTfOku(A,tf,!0);            /* parçalar dahil */
      if(Object.keys(b.sonuc||{}).length<evSayi){ilerleyen=tf;break}
      await mbParcalariBirlestir(A,tf).catch(()=>{});  /* tamamsa kalıcılaştır */
    }
    /* İstemci aynı dilimde devam ediyorsa kendi imlecini gönderir. */
    const dis=(gov.imlecTf&&gov.imlecTf===ilerleyen)?Number(gov.imlecKod):null;
    let yeniImlec=0;
    if(ilerleyen){
      const b2=await mbDilimTara(A,ilerleyen,MB_DOLDUR_AZAMI,dis).catch(()=>null);
      yeniImlec=(b2&&Number(b2.imlec))||0;
    }
    const durum=[];
    for(const t of MB_TF_LISTE){
      const b=d.tfler.indexOf(t)>=0?await mbTfOku(A,t,!0):await mbTfOku(A,t);
      durum.push({tf:t,ad:MB_TF[t].ad,ik:MB_TF[t].ik,
        olculen:Object.keys(b.sonuc||{}).length,evren:b.evren||evSayi,
        yas:b.ts?Math.round((Date.now()-b.ts)/6e4):null});
    }
    const eksik=durum.filter(x=>d.tfler.indexOf(x.tf)>=0&&x.olculen<evSayi).length;
    if(!eksik)for(const t of d.tfler)await mbParcalariBirlestir(A,t).catch(()=>{});
    return JS({ok:!0,dolduruldu:!0,dilim:ilerleyen,imlecKod:yeniImlec,
      dilimler:durum,evren:evSayi,eksik:eksik});
  }
  /* ÜÇ MODÜL × SEÇİLİ ZAMAN DİLİMLERİ */
  const ist=mbIstekNorm(gov);
  const paket=await mbModulTara(A,ist).catch(()=>null);
  const dilimler=await mbDilimDurum(A).catch(()=>[]);
  let evrenBilgi={sayi:0,kaynak:"okunamadı",rapor:null};
  try{const ev=await tamEvren(A);evrenBilgi={sayi:ev.length,kaynak:ev.kaynak,rapor:YON?ev.rapor:null}}catch(_){}
  const alarm=await mbAlarmOzetListe(A,uid).catch(()=>null);
  if(!paket)return JS({ok:!0,sozluk:sozluk,dilimler:dilimler,evrenBilgi:evrenBilgi,
    ist:ist,gruplar:[],ortak:[],calisiyor:!0,alarm:alarm});
  const fav=await X(A,uid),pf=await XP(A,uid),izlenen=new Set([...fav,...Object.keys(pf)]);
  for(const g of paket.gruplar)
    g.liste=g.liste.map(x=>Object.assign({takipte:izlenen.has(x.kod)},x));
  return JS({ok:!0,sozluk:sozluk,dilimler:dilimler,evrenBilgi:evrenBilgi,ist:ist,
    gruplar:paket.gruplar,ortak:paket.ortak,calisiyor:paket.calisiyor,alarm:alarm});
}
/* 🌊 Absorpsiyon eşiklerini kaydet — SADECE yönetici. Kaydedince yeni
   önbellek anahtarına düştüğü için bir sonraki istekte anında yeni
   eşiklerle taranır, 30 dakika beklemeye gerek yok. */
/* 🔄 Elle tarama — yalnız yönetici. */
/* ═══ 🔄 TEMEL VERİYİ ELLE YENİLE — yalnız yönetici ═══
   Cloudflare önbelleği bir kez 404 sakladığında saatlerce eski cevabı
   veriyor. Bu uç belleği ve KV'yi temizler, HER ADRESİ tek tek dener ve
   HTTP kodunu geri bildirir. "Bulunamadı" demek yetmiyordu; hangi adres
   ne dedi, ekranda görünsün. */
if("/api/temelYenile"===$.pathname){
if(!YON)return JS({ok:!1,mesaj:"Yetkin yok."},403);
_temelBellek=null;_temelZaman=0;_sBellek=null;_sZaman=0;
try{await A.VERI.delete("temelVeri")}catch(e){}
try{await A.VERI.delete("sektorJson")}catch(e){}
const rapor=[];
for(const url of TEMEL_URLLER){
  const satir={url:url,kod:0,kayit:0,hata:null};
  try{
    const r=await fetch(url+"?_="+Date.now(),{cf:{cacheTtl:0,cacheEverything:!1}});
    satir.kod=r.status;
    if(r.ok){
      const j=await r.json();
      satir.kayit=(j&&j.hisse&&typeof j.hisse==="object")?Object.keys(j.hisse).length:0;
    }
  }catch(e){ satir.hata=String((e&&e.message)||e).slice(0,90); }
  rapor.push(satir);
}
const T=await temelGetir(A).catch(()=>null);
const S=await sektorlariGetir(A).catch(()=>null);
const sh=(S&&S.sektor&&typeof S.sektor==="object")?S.sektor:(S||{});
return JS({ok:!!(T&&T.hisse&&Object.keys(T.hisse).length),
 temel:(T&&T.hisse)?Object.keys(T.hisse).length:0,
 sektor:(sh&&typeof sh==="object")?Object.keys(sh).length:0,
 guncelleme:(T&&T.guncelleme)||null,rapor:rapor})}
/* ═══════ 📋 TEMEL ANALİZ — TÜM HAVUZ ═══════
   Sayfa yalnızca sinyal listesindeki hisseleri gösteriyordu; oysa
   temel.json 432 hissenin tamamını taşıyor. Bu uç havuzun tamamını,
   sektöre göre persantilleri hesaplanmış hâlde döndürür. Sekme
   açıldığında BİR KEZ çağrılır; süzgeç ve sıralama istemcide çalışır. */
if("/api/temelListe"===$.pathname){
const T=await temelGetir(A);
if(!T||!T.hisse||!Object.keys(T.hisse).length)
  return JS({ok:!1,hata:"temel.json okunamadı"});
const sk=await sektorlariGetir(A);
const harita=(sk&&sk.sektor&&typeof sk.sektor==="object")?sk.sektor:((sk&&typeof sk==="object")?sk:{});
const L3=await g(A).catch(()=>null);
/* Hangi hisseler şu an sinyal veriyor — "sinyali olanlar" süzgeci için */
const sinyalli={};
if(L3&&L3.kartlar)for(const ad of ["potansiyel","fibo","uzunvade"])
  for(const c of (L3.kartlar[ad]||[]))if(c&&c.kod)sinyalli[c.kod]=(sinyalli[c.kod]||[]).concat([c.tf||ad]);
/* Sektör dağılımları — persantil için */
const kova={};
for(const kod of Object.keys(T.hisse)){
  const s2=harita[kod]; if(!s2)continue;
  const t=T.hisse[kod]; if(!t)continue;
  const k=(kova[s2]=kova[s2]||{fk:[],pddd:[],roa:[],marj:[]});
  if(t.fk>0)k.fk.push(t.fk);
  if(t.pddd>0)k.pddd.push(t.pddd);
  if(t.roa!=null)k.roa.push(t.roa);
  if(t.netMarj!=null)k.marj.push(t.netMarj);
}
const sup=await suparUyeMi(A,uid);
const liste=[];
for(const kod of Object.keys(T.hisse)){
  const t=T.hisse[kod]; if(!t)continue;
  const s2=harita[kod]||null, kv=(s2&&kova[s2])||null;
  const yeter=n=>kv&&kv[n]&&kv[n].length>=5;
  const kayit={
    kod:kod, sektor:s2,
    fskor:t.fskor, fskorOlculen:t.fskorOlculen, fskorDetay:t.fskorDetay||null,
    fk:t.fk, pddd:t.pddd, roa:t.roa, netMarj:t.netMarj,
    roe:t.ozsermayeKarliligi, netBorcFavok:t.netBorcFavok,
    temettu:t.temettuVerimi, pd:t.pd,
    buyumeCiro:t.enflasyonKarsilastirilamaz?null:t.buyumeCiro,
    buyumeKar:t.enflasyonKarsilastirilamaz?null:t.buyumeKar,
    enflasyonUyari:!!t.enflasyonKarsilastirilamaz,
    bilancoTarihi:t.bilancoTarihi||null,
    bilancoGun:bilancoGunFark(t.bilancoTarihi),
    fkP:yeter("fk")?persantil(kv.fk,t.fk,!0):null,
    pdddP:yeter("pddd")?persantil(kv.pddd,t.pddd,!0):null,
    roaP:yeter("roa")?persantil(kv.roa,t.roa,!1):null,
    marjP:yeter("marj")?persantil(kv.marj,t.netMarj,!1):null,
    sinyal:sinyalli[kod]||null
  };
  kayit.skor=temelSkor(kayit);
  liste.push(kayit);
}
liste.sort((a,b)=>(b.skor==null?-1:b.skor)-(a.skor==null?-1:a.skor));
/* 🔒 Süper Üyelik kancası: en yüksek skorlu ilk 20 şirketin ADI
   süper üye olmayana kapalı. Puan, sektör ve bütün oranlar açık —
   "sistem bunları buldu, hangileri olduğu üyelere özel". */
const KILIT=20;
if(!sup&&!YON)for(let i=0;i<Math.min(KILIT,liste.length);i++)liste[i].kilit=!0;
const sekSay={};
for(const x of liste)if(x.sektor)sekSay[x.sektor]=(sekSay[x.sektor]||0)+1;
return JS({ok:!0,guncelleme:T.guncelleme||null,toplam:liste.length,
 super:!!sup||!!YON,kilitSayi:(!sup&&!YON)?Math.min(KILIT,liste.length):0,
 sektorler:Object.keys(sekSay).sort().map(s2=>({ad:s2,n:sekSay[s2]})),
 liste:liste})}
/* 🟢 YEŞİL KAPANIŞ ARAŞTIRMASI — artık tamamen uygulamanın içinden yönetilir.
   Üç iş tek uçta: başlat · bir adım ilerlet · sonucu getir.
   Tarayıcıda ayrı sayfa açmaya gerek yok. */
/* 🟢 YEŞİL KAPANIŞ — sayaçlar PARÇALI yazılır.
   Tek bir "iş" nesnesini oku-değiştir-yaz yapmak KV'nin gecikmesi yüzünden
   veri kaybettiriyordu (tarama biterken ekrandaki her şeyin silinmesinin
   sebebi buydu). Artık her adım KENDİ parçasına yazar (ykP:NO) — iki adım
   asla aynı anahtara dokunmaz. Rapor bütün parçaları toplayarak üretilir. */
async function ykParcaYaz(A,no,sayac){
  if(!A||!A.VERI)return;
  try{await A.VERI.put("ykP:"+no,JSON.stringify(sayac),{expirationTtl:172800})}catch(_){}
}
async function ykParcalariTopla(A){
  const S=ykSayacYeni();let adet=0;
  if(!A||!A.VERI)return{sayac:S,adet:0};
  try{
    const l=await A.VERI.list({prefix:"ykP:"});
    for(const k of (l&&l.keys)||[]){
      try{const h=await A.VERI.get(k.name);if(!h)continue;
        ykSayacBirlestir(S,JSON.parse(h));adet++;
      }catch(_){}
    }
  }catch(_){}
  return{sayac:S,adet:adet};
}
async function ykParcalariSil(A){
  if(!A||!A.VERI)return;
  try{const l=await A.VERI.list({prefix:"ykP:"});
    for(const k of (l&&l.keys)||[])await A.VERI.delete(k.name).catch(()=>{});
  }catch(_){}
}
if("/api/yesil"===$.pathname){
  if(!YON)return JS({ok:!1,hata:"Yetkin yok."},403);
  const is=String(gov.is||"durum");
  /* ⚡ DURUMSUZ ÖLÇÜM — sunucu hiçbir şey hatırlamaz.
     Eskiden "başlat" KV'ye bir iş yazıyor, hemen ardından gelen "adım"
     isteği başka bir isolate'e düşünce o işi bulamıyor ve "iş yok" diyordu;
     ekran da başlangıç menüsüne geri dönüyordu. Artık hisse listesini ve
     nerede kalındığını UYGULAMA tutuyor, sunucu yalnız verilen partiyi
     ölçüp sayacı geri veriyor. */
  if(is==="parti"){
    const kodlar=[...new Set((Array.isArray(gov.kodlar)?gov.kodlar:[])
      .map(k=>KOD(k)).filter(k=>KOD_GECERLI.test(k)))].slice(0,YK_ADIM);
    if(!kodlar.length)return JS({ok:!1,hata:"kod yok"});
    const kesim=Number(gov.zamanKesim)||(Math.floor(Date.now()/1000)-330*86400);
    const tekSet=new Set((Array.isArray(gov.tekler)?gov.tekler:[]));
    const{sayac,semboller,teshis}=await ykKosu(kodlar,kesim,k=>tekSet.has(k),A);
    return JS({ok:!0,sayac:sayac,teshis:teshis,
      hatali:(semboller||[]).filter(x=>x.hata).map(x=>x.kod)});
  }
  if(is==="basla"){
    let kodlar;
    const ev=await mbEvren(A,[]);
    if(gov.kodlar&&String(gov.kodlar).trim()){
      kodlar=String(gov.kodlar).toUpperCase().split(/[^A-Z0-9]+/).filter(x=>KOD_GECERLI.test(x));
    }else kodlar=ev.slice();
    if(gov.hizli)kodlar=kodlar.slice(0,40);
    kodlar=[...new Set(kodlar)];
    if(!kodlar.length)return JS({ok:!1,hata:"taranacak hisse bulunamadı"});
    const simdi=Math.floor(Date.now()/1000);
    await ykParcalariSil(A);
    await ykIsYaz(A,{anahtar:"",kodlar:kodlar,kuyruk:kodlar.slice(),toplam:kodlar.length,tamam:0,
      zamanKesim:simdi-330*86400,sayac:ykSayacYeni(),semboller:[],
      baslangic:Date.now(),guncelleme:Date.now(),tamamlandi:!1});
    return JS({ok:!0,baslatildi:!0,toplam:kodlar.length});
  }
  if(is==="iptal"){ykIsSil();await ykParcalariSil(A);
    try{await A.VERI.delete("ykIs")}catch(_){}return JS({ok:!0,iptal:!0})}
  const job=await ykIsOku(A);
  if(!job)return JS({ok:!0,yok:!0});
  if(is==="adim"&&!job.tamamlandi&&job.kuyruk.length){
    const grup=job.kuyruk.splice(0,YK_ADIM);
    const parcaNo=Math.floor(job.tamam/YK_ADIM);
    const{sayac,semboller,teshis}=await ykKosu(grup,job.zamanKesim,ykHisseTek(job.kodlar),A);
    await ykParcaYaz(A,parcaNo,sayac);          /* kendi parçası — çakışma yok */
    job.sayac=ykSayacBirlestir(job.sayac,sayac);
    job.semboller=job.semboller.concat(semboller).slice(-600);
    /* teşhisi biriktir — sonunda "neden boş" sorusunu cevaplayabilelim */
    if(!job.teshis)job.teshis={veriYok:{},gozlemsiz:0,hata:0,yenidenDenendi:0,yenidenKurtardi:0};
    for(const k in teshis.veriYok)job.teshis.veriYok[k]=(job.teshis.veriYok[k]||0)+teshis.veriYok[k];
    job.teshis.gozlemsiz+=teshis.gozlemsiz;job.teshis.hata+=teshis.hata;
    job.teshis.yenidenDenendi=(job.teshis.yenidenDenendi||0)+(teshis.yenidenDenendi||0);
    job.teshis.yenidenKurtardi=(job.teshis.yenidenKurtardi||0)+(teshis.yenidenKurtardi||0);
    if(!job.teshis.ornekHata&&teshis.ornekHata)job.teshis.ornekHata=teshis.ornekHata;
    job.tamam+=grup.length;job.guncelleme=Date.now();
    if(!job.kuyruk.length)job.tamamlandi=!0;
    await ykIsYaz(A,job);
  }
  const t=job.sayac&&job.sayac.taban&&job.sayac.taban[0];
  const cvp={ok:!0,tamam:job.tamam,toplam:job.toplam,tamamlandi:!!job.tamamlandi,
    gozlem:t?t.n:0,sure:Math.round((job.guncelleme-job.baslangic)/1000),
    teshis:job.teshis||null};
  /* Rapor HER adımda üretilir — kullanıcı sonucu beklemeden görsün, boş
     kalıyorsa da hemen anlasın. Maliyeti yok: yalnız sayaçlar özetlenir. */
  {
    const paket=(alan)=>{
      const o=ykOzetle(raporSayac,alan);
      if(!o.taban)return null;
      return{taban:{n:o.taban.n,yesil:o.taban.yesil,ort:o.taban.ort},
        denenen:o.denenen,gecen:o.gecen,beklenenGurultu:Math.round(o.denenen*0.06),
        gecenler:o.satirlar.filter(r=>r.gecti).slice(0,25).map(r=>({
          ad:r.ad,tur:r.tur,n:r.n,yesil:r.yesil,ort:r.ort,kaldirac:r.kaldirac,bolmeler:r.bolmeler})),
        elenenler:o.satirlar.filter(r=>!r.gecti).slice(0,10).map(r=>({
          ad:r.ad,n:r.n,yesil:r.yesil,kaldirac:r.kaldirac,bolmeler:r.bolmeler}))};
    };
    cvp.gun=paket("g");cvp.kap=paket("k");
    cvp.hatali=(job.semboller||[]).filter(s=>s.hata).map(s=>s.kod).slice(0,40);
  }
  return JS(cvp);
}
if("/api/tara"===$.pathname){
if(!YON)return JS({ok:!1,mesaj:"Yetkin yok."},403);
const s2=await taramaTetikle(A);
return JS({ok:!!s2.ok,mesaj:s2.mesaj})}
if("/api/absAyar"===$.pathname){
if(!YON)return JS({ok:!1,hata:"yetki yok"},403);
const ayar=await absAyarKaydet(A,gov.hacimEsik,gov.darlikEsik,gov.puanEsik);
if(!ayar)return JS({ok:!1,hata:"geçersiz değer"},400);
return JS({ok:!0,ayar:ayar})}
if("/api/onay"===$.pathname){await onayVer(A,uid);return JS({ok:!0})}
if("/api/performans"===$.pathname){
/* ================== 📈 PERFORMANS (geriye dönük ölçüm) ==================
   Kaynak: her taramada yazılan "gecmis" kaydı. Bir sinyal, verildiği günün
   giriş fiyatıyla ve o günden bugüne kadarki en yüksek fiyatıyla saklanır.
   Ölçülenler:
     · isabet   — sinyalden bu yana artıda kapatan oranı
     · ortalama — sinyalden bu yana ortalama getiri
     · zirve    — sinyalden sonra görülen en iyi noktanın ortalaması
     · hedef    — TP hedefine değen sinyallerin oranı
   DOLGU kayıtlar (r=0, geçmiş kapanışlardan üretilmiş) sayıma girmez.
   Dilim kırılımı yalnız ayrıntılı geçmişin durduğu son 90 gün için verilir. */
const G2=await y(A),GD=G2.gunler||{},OZ=G2.ozet||{};
const bg=new Date(Date.now()+108e5).toISOString().slice(0,10);
const fark=gg=>Math.round((new Date(bg)-new Date(gg))/864e5);
const TFL=["1SA","4SA","1G","1HAF"],
DUZELT=t=>({"15D":"15DK","1S":"1SA","4S":"4SA","1G":"1G","1H":"1HAF","1HAF":"1HAF","15DK":"15DK","1SA":"1SA","4SA":"4SA"})[t]||t;
const bos=()=>({n:0,kaz:0,top:0,zirve:0,eniyi:null,enkotu:null,hedefN:0,hedefTut:0,direncN:0,direncDon:0});
const kapat=o=>o.n?{n:o.n,isabet:100*o.kaz/o.n,ort:o.top/o.n,zirve:o.zirve/o.n,
eniyi:o.eniyi,enkotu:o.enkotu,on10k:Math.round(10000*(1+(o.top/o.n)/100)),
hedefN:o.hedefN,hedefTut:o.hedefTut,direncN:o.direncN,direncDon:o.direncDon}:null;
/* ════════ ÖLÇÜM SÜZGEÇLERİ (18/08 · iki gerçek ölçüm hatası) ════════
   1) SERMAYE ARTIRIMI / BEDELSİZ. Kayıttaki giriş fiyatı (g) ham bir
      sayıdır; bedelsiz sonrası fiyat bölününce getiri -%80'lere düşer.
      AKFIS -82.80% bir sinyal hatası değil, bir BEDELSIZ artefaktıdır.
      Böyle bir kayıt hem ortalamayı hem isabeti bozar.
   2) OLGUNLAŞMAMIŞ SİNYAL. Kayıt, sinyal doğduğu an yazılır ve o anda
      fiyat pivotun hemen üstündedir; getiri ~0'dır. Beş dakika önce
      doğmuş bir sinyalin "isabet etti mi" sorusuna cevabı yoktur —
      yazı tura atmakla aynıdır. Tarama sıklığı arttıkça bu taze
      kayıtların payı büyür ve isabet oranını mekanik olarak 50'ye
      çeker. Ölçüme girmesi için sinyalin en az OLGUNLUK gün yaşaması
      beklenir.
   Her iki eşik de panelden ayarlanabilir; 0 = süzgeç kapalı. */
const PERF_VARSAYILAN={aykiri:60,olgunluk:1};
const perfAyarOku=async()=>{
  try{const c=await A.VERI.get("perfAyar");
    if(c){const j=JSON.parse(c);
      const a=Number(j.aykiri),o=Number(j.olgunluk);
      return{aykiri:(a>=0&&a<=500)?a:PERF_VARSAYILAN.aykiri,
             olgunluk:(o>=0&&o<=30)?o:PERF_VARSAYILAN.olgunluk}}}catch(e){}
  return PERF_VARSAYILAN;
};
const PA=await perfAyarOku();
let elenenAykiri=0, elenenTaze=0;
const olc=gunSay=>{
const kutu={},genel=bos();TFL.forEach(t=>kutu[t]=bos());
const gunler=new Set();let seri=[];
const detaySinir=Math.min(gunSay,90);
for(const gun of Object.keys(GD)){
const f=fark(gun);if(f<0||f>detaySinir)continue;
const kay=GD[gun].kayitlar||{};let gt=0,gn=0,gsin=[];
for(const key of Object.keys(kay)){const rec=kay[key];
if(!(rec&&rec.g>0&&rec.s>0)||rec.r===0)continue;
const tf=DUZELT(rec.t||String(key).split("@")[1]||""),kd=rec.k||String(key).split("@")[0];
const y2=100*(rec.s/rec.g-1),zr=rec.max>0?100*(rec.max/rec.g-1):y2;
/* taze sinyal: henüz hüküm verilebilecek yaşta değil */
if(PA.olgunluk>0&&f<PA.olgunluk){elenenTaze++;continue}
/* aykırı: bedelsiz/sermaye artırımı artefaktı */
if(PA.aykiri>0&&Math.abs(y2)>PA.aykiri){elenenAykiri++;continue}
/* hedefe değdi mi: sinyalden sonraki zirve, o sinyalin hedef fiyatına ulaştı mı.
   dirençten döndü mü: zirve, kayıtlı direnç (hedef1) seviyesinin altında kaldı —
   yani fiyat o seviyeyi kıramadan geri çekildi. Bu alanlar yalnız o bilgi
   kaydedilmişse (h/h1>0) sayılır; eski kayıtlarda yoksa ölçüme girmez. */
const hedefDegdi=(rec.h>0)?(rec.max>=rec.h):null;
const direncDondu=(rec.h1>0)?(rec.max<rec.h1):null;
const ek=o=>{o.n++;o.top+=y2;o.zirve+=zr;if(y2>=0)o.kaz++;
if(!o.eniyi||y2>o.eniyi.y)o.eniyi={kod:kd,y:y2};
if(!o.enkotu||y2<o.enkotu.y)o.enkotu={kod:kd,y:y2};
if(hedefDegdi!==null){o.hedefN++;if(hedefDegdi)o.hedefTut++}
if(direncDondu!==null){o.direncN++;if(direncDondu)o.direncDon++}};
if(kutu[tf])ek(kutu[tf]);ek(genel);gt+=y2;gn++;
gsin.push({k:kd,tf:tf,y:Math.round(100*y2)/100})}
if(gn){gunler.add(gun);gsin.sort((a2,b2)=>b2.y-a2.y);
seri.push({gun:gun,ort:gt/gn,n:gn,sin:gsin.slice(0,20)})}}
/* 90 günü aşan pencerelerde ayrıntı yok; günlük özetten toplanır */
let uzunGenel=null;
if(gunSay>90){let n2=0,top2=0,g2=0;
for(const gun of Object.keys(OZ)){const f=fark(gun);if(f<0||f>gunSay)continue;
const o=OZ[gun];if(!o||!o.n)continue;n2+=o.n;top2+=o.ort*o.n;g2++}
if(n2)uzunGenel={n:n2,ort:top2/n2,gun:g2,on10k:Math.round(10000*(1+(top2/n2)/100))}}
seri.sort((a2,b2)=>a2.gun<b2.gun?-1:1);
return{gunSay:gunSay,detaySinir:detaySinir,gunSayisi:gunler.size,
dilimler:TFL.map(t=>({tf:t,ist:kapat(kutu[t])})),genel:kapat(genel),uzunGenel:uzunGenel,
/* Backtest sayfası günlük dökümü buradan okuyor; 30 gün kuruluştan
   bu yanayı kapsamayabilir, 200'e çıkarıldı. Ölçüm mantığı aynı. */
seri:seri.slice(-200)}};
/* 🏁 SİSTEMİN KURULUŞ TARİHİ. Backtest sayfası bu günden bugüne kadar
   olan HER GÜNÜ tek tek gösterir. Tek değiştirilecek yer burasıdır. */
const KURULUS="2026-08-12";
const kurulusGun=Math.max(1,Math.round((new Date(bg)-new Date(KURULUS))/864e5));
const cikti=JS({ok:!0,donem:{h1:olc(7),a1:olc(30),a3:olc(90),y1:olc(365)},
kurulus:{tarih:KURULUS,gun:kurulusGun,ist:olc(kurulusGun)},
ayar:PA,elenenAykiri:elenenAykiri,elenenTaze:elenenTaze,yonetici:!!YON,
guncelleme:G2.guncelleme||null,dipbacktestUrl:YON?(n+"/dipbacktest?key="+encodeURIComponent(i)):null});return cikti}
/* ═══════════════════ 📊 BACKTEST — DÜRÜST ÖLÇÜM ═══════════════════
   İLK SÜRÜM ÜÇ AYRI YERDE YANLIŞTI, HEPSİ BURADA DÜZELTİLDİ:

   1) BİRİKİMLİ EĞRİ UYDURMAYDI. Günlük ortalamalar bileşik çarpılıyordu;
      yani 279 sinyalin hepsine tam sermayeyle girildiği varsayılıyordu.
      Kaldırıldı. Sinyal tarayıcısının doğru ölçüsü portföy eğrisi değil,
      SİNYAL BAŞINA BEKLENTİ'dir (expectancy).

   2) AYNI HİSSE DEFALARCA SAYILIYORDU. Kayıt anahtarı kod@dilim olduğu
      için BJKAS üç dilimde kırdıysa üç sinyal görünüyordu. Artık gün
      içinde hisse başına TEK kayıt sayılır (en iyi zirveli olan);
      dilim kırılımı ayrıca verilir ama genel toplamı şişirmez.

   3) GÜNLÜK YÜZDELER KIYASLANAMAZDI. Kayıttaki "s" güncel fiyattır;
      yani 7 gün önceki sinyalin getirisi 7 günlük, dünkünün 1 günlük.
      Bunları aynı grafikte yan yana koymak elmayla armut toplamaktı.
      Artık her gün için TUTMA SÜRESİ de veriliyor ve günlük getiri
      "o günden bugüne" diye açıkça etiketleniyor.

   Eklenen gerçek ölçüler: beklenti, kâr faktörü, ortalama kazanç/kayıp,
   medyan, getiri dağılımı, en kötü seri (drawdown yerine sinyal bazlı),
   zirveden geri veriş, dilim tablosu. */
if("/api/backtest"===$.pathname){
const G3=await y(A),GD3=G3.gunler||{};
const bugun3=new Date(Date.now()+108e5).toISOString().slice(0,10);
const KURULUS3="2026-08-12";
const gunFark=(a,b)=>Math.round((new Date(b)-new Date(a))/864e5);
const DZ=t=>({"15D":"15DK","1S":"1SA","4S":"4SA","1H":"1HAF"})[t]||t||"?";

/* Süzgeçler — performans sayfasıyla aynı mantık, aynı gerekçe. */
let ayar3={aykiri:60,olgunluk:1};
try{const c=await A.VERI.get("perfAyar");if(c){const j=JSON.parse(c);
  const a2=Number(j.aykiri),o2=Number(j.olgunluk);
  if(a2>=0&&a2<=500)ayar3.aykiri=a2; if(o2>=0&&o2<=30)ayar3.olgunluk=o2}}catch(e){}

const gunler=[],hepsi=[];
let elenenAyk=0,elenenTaze=0,hamSayi=0;

for(const gun of Object.keys(GD3).sort()){
  if(gun<KURULUS3||gun>bugun3)continue;
  const yas=gunFark(gun,bugun3);
  const kay=GD3[gun].kayitlar||{};
  /* ── Hisse başına TEK kayıt: aynı gün farklı dilimlerde kıran hisse
        bir kez sayılır. Seçim ölçütü: en yüksek zirve (en bilgi verici). */
  const teklestir={};
  for(const key of Object.keys(kay)){
    const rec=kay[key];
    if(!(rec&&rec.g>0&&rec.s>0)||rec.r===0)continue;
    hamSayi++;
    const kod=rec.k||String(key).split("@")[0];
    const getiri=100*(rec.s/rec.g-1);
    if(ayar3.olgunluk>0&&yas<ayar3.olgunluk){elenenTaze++;continue}
    if(ayar3.aykiri>0&&Math.abs(getiri)>ayar3.aykiri){elenenAyk++;continue}
    const zirve=rec.max>0?100*(rec.max/rec.g-1):getiri;
    const kt={kod:kod,tf:DZ(rec.t||String(key).split("@")[1]),
      getiri:getiri,zirve:zirve,yas:yas,gun:gun,
      hedefVar:!!(rec.h>0),hedefTut:!!(rec.h>0&&rec.max>0&&rec.max>=rec.h),
      direncVar:!!(rec.h1>0),direncTut:!!(rec.h1>0&&rec.max>0&&rec.max>=rec.h1)};
    const v=teklestir[kod];
    if(!v||kt.zirve>v.zirve)teklestir[kod]=kt;
  }
  const liste=Object.keys(teklestir).map(k2=>teklestir[k2]);
  if(!liste.length)continue;
  for(const x of liste)hepsi.push(x);
  const kaz=liste.filter(x=>x.getiri>0).length;
  gunler.push({gun:gun,yas:yas,n:liste.length,
    isabet:100*kaz/liste.length,
    ort:liste.reduce((a2,b2)=>a2+b2.getiri,0)/liste.length,
    zirve:liste.reduce((a2,b2)=>a2+b2.zirve,0)/liste.length,
    hedefN:liste.filter(x=>x.hedefVar).length,
    hedefTut:liste.filter(x=>x.hedefTut).length,
    eniyi:liste.slice().sort((a2,b2)=>b2.getiri-a2.getiri)[0],
    enkotu:liste.slice().sort((a2,b2)=>a2.getiri-b2.getiri)[0]});
}

const ozet=(liste)=>{
  if(!liste.length)return null;
  const g=liste.map(x=>x.getiri).sort((a2,b2)=>a2-b2);
  const kazl=liste.filter(x=>x.getiri>0),kayl=liste.filter(x=>x.getiri<=0);
  const ortl=a2=>a2.length?a2.reduce((x,y2)=>x+y2,0)/a2.length:0;
  const ortKaz=ortl(kazl.map(x=>x.getiri)),ortKay=ortl(kayl.map(x=>x.getiri));
  const isb=kazl.length/liste.length;
  const topKaz=kazl.reduce((a2,b2)=>a2+b2.getiri,0);
  const topKay=Math.abs(kayl.reduce((a2,b2)=>a2+b2.getiri,0));
  const med=g.length%2?g[(g.length-1)/2]:(g[g.length/2-1]+g[g.length/2])/2;
  const hedefli=liste.filter(x=>x.hedefVar);
  return{
    n:liste.length,
    hisse:new Set(liste.map(x=>x.kod)).size,
    isabet:100*isb,
    ort:ortl(liste.map(x=>x.getiri)),
    medyan:med,
    ortKazanc:ortKaz, ortKayip:ortKay,
    /* BEKLENTİ: sinyal başına ortalama sonuç. Bir tarayıcının tek
       dürüst özet sayısı budur — kaç kazandığın değil, her denemenin
       matematiksel karşılığı. */
    beklenti:isb*ortKaz+(1-isb)*ortKay,
    /* KÂR FAKTÖRÜ: toplam kazanç / toplam kayıp. 1'in altı = zarar eden
       sistem. 1.5 üstü genelde sağlıklı sayılır. */
    karFaktoru:topKay>0?topKaz/topKay:null,
    ortZirve:ortl(liste.map(x=>x.zirve)),
    /* ZİRVEDEN GERİ VERİŞ: sinyal en iyi noktasından ne kadar geri geldi.
       Yüksekse "kâr alma kuralı yok" demektir. */
    geriVeris:ortl(liste.map(x=>x.zirve-x.getiri)),
    enIyi:liste.slice().sort((a2,b2)=>b2.getiri-a2.getiri)[0],
    enKotu:liste.slice().sort((a2,b2)=>a2.getiri-b2.getiri)[0],
    hedefN:hedefli.length, hedefTut:hedefli.filter(x=>x.hedefTut).length,
    ortYas:ortl(liste.map(x=>x.yas))
  };
};

/* Getiri dağılımı — ortalama tek başına yalan söyleyebilir. */
const kovalar=[{ad:"-10% altı",alt:-1e9,ust:-10},{ad:"-10 / -5",alt:-10,ust:-5},
{ad:"-5 / 0",alt:-5,ust:0},{ad:"0 / +5",alt:0,ust:5},{ad:"+5 / +10",alt:5,ust:10},
{ad:"+10 / +20",alt:10,ust:20},{ad:"+20% üstü",alt:20,ust:1e9}];
const dagilim=kovalar.map(k2=>({ad:k2.ad,
  n:hepsi.filter(x=>x.getiri>k2.alt&&x.getiri<=k2.ust).length}));

/* Dilim tablosu — hangi vade gerçekten çalışıyor? */
const dilimAd=["1SA","4SA","1G","1HAF","15DK"];
const dilimler=dilimAd.map(t=>({tf:t,ist:ozet(hepsi.filter(x=>x.tf===t))}))
  .filter(x=>x.ist&&x.ist.n>0);

/* 🎯 HEDEF1/HEDEF2/STOP ORANI — dilime göre (KISA/ORTA/UZUN/HAFTA).
   Yukarıdaki "dilimler" tablosundan farkı: orada aynı kod aynı gün
   birden fazla dilimde kırdıysa TEK sinyal sayılıyordu (teklestir) —
   burada öyle bir tekilleştirme YOK, her dilimin kendi sinyali kendi
   başına sayılır, yoksa dilimler arası kıyas yanlış çıkar.
   Stop: bir dilimin stop'u, bir alt dilimin AYNI GÜN kırdığı seviyedir
   (bkz. istemci tarafındaki tfStopBul/takipStopBul ile birebir aynı
   zincir mantığı). Bunun için "min" (görülen en düşük fiyat) gerekir;
   bu alan yalnız 2026-08-29'dan sonra kaydedilmeye başladı, o tarihten
   önceki kayıtlarda stop "ölçülemedi" sayılır — UYDURMA SAYI ÜRETİLMEZ. */
const BT_AD_ADI={potansiyel:"KISA",fibo:"ORTA",uzunvade:"UZUN",haftalik:"HAFTA"};
const BT_AD_ALT={fibo:"potansiyel",uzunvade:"fibo"};
const btDilimAgirlik={};
for(const gun of Object.keys(GD3)){
  if(gun<KURULUS3||gun>bugun3)continue;
  const kay=GD3[gun].kayitlar||{};
  for(const key of Object.keys(kay)){
    const rec=kay[key];
    if(!(rec&&rec.g>0&&rec.s>0)||rec.r===0)continue;
    const ad=rec.l;if(!BT_AD_ADI[ad])continue;
    if(!btDilimAgirlik[ad])btDilimAgirlik[ad]={toplam:0,h1Tut:0,h1Var:0,h2Tut:0,h2Var:0,stopOldu:0,stopOlcNormal:0,stopOlcumsuz:0};
    const g2=btDilimAgirlik[ad];
    g2.toplam++;
    if(rec.h1>0){g2.h1Var++;if(rec.max>0&&rec.max>=rec.h1)g2.h1Tut++}
    if(rec.h>0){g2.h2Var++;if(rec.max>0&&rec.max>=rec.h)g2.h2Tut++}
    const altAd=BT_AD_ALT[ad];
    const recKod=rec.k||String(key).split("@")[0];
    let stopSev=null;
    if(altAd){
      for(const key2 of Object.keys(kay)){
        const r2=kay[key2];
        if(r2&&r2.l===altAd&&r2.g>0&&(r2.k||String(key2).split("@")[0])===recKod){stopSev=Number(r2.g);break}
      }
    }
    if(stopSev==null||!(rec.min>0))g2.stopOlcumsuz++;
    else{g2.stopOlcNormal++;if(rec.min<=stopSev)g2.stopOldu++}
  }
}
const dilimRapor=Object.keys(BT_AD_ADI).filter(ad=>btDilimAgirlik[ad]).map(ad=>{
  const g2=btDilimAgirlik[ad];
  return{ad:BT_AD_ADI[ad],toplam:g2.toplam,
    hedef1:{n:g2.h1Var,tut:g2.h1Tut,oran:g2.h1Var>0?100*g2.h1Tut/g2.h1Var:null},
    hedef2:{n:g2.h2Var,tut:g2.h2Tut,oran:g2.h2Var>0?100*g2.h2Tut/g2.h2Var:null},
    stop:{n:g2.stopOlcNormal,oldu:g2.stopOldu,oran:g2.stopOlcNormal>0?100*g2.stopOldu/g2.stopOlcNormal:null,olcumsuz:g2.stopOlcumsuz}};
});

return JS({ok:!0,kurulus:KURULUS3,bugun:bugun3,
genel:ozet(hepsi),dagilim:dagilim,dilimler:dilimler,dilimRapor:dilimRapor,
gunler:gunler.reverse(),
hamSayi:hamSayi,elenenAykiri:elenenAyk,elenenTaze:elenenTaze,
ayar:ayar3,yonetici:!!YON})}
/* 📈 Ölçüm süzgeçlerini kaydet — yalnız yönetici. */
if("/api/perfAyar"===$.pathname){
if(!YON)return JS({ok:!1,hata:"yetki yok"},403);
let a=Number(gov.aykiri),o=Number(gov.olgunluk);
if(!(a>=0&&a<=500))a=60; if(!(o>=0&&o<=30))o=1;
if(A.VERI)await A.VERI.put("perfAyar",JSON.stringify({aykiri:a,olgunluk:o})).catch(()=>{});
return JS({ok:!0,ayar:{aykiri:a,olgunluk:o}})}
if("/api/simulasyon"===$.pathname){
/* ================== 🧮 10.000 ₺ ZİNCİRLEME SİMÜLASYON ==================
   "Bugün ne olurdu" gibi tek seferlik ortalama getiri çarpımı YANLIŞTIR —
   burada gerçek mantık uygulanır: seçilen tarihten başlanır, sinyal çıkan
   her gün o günün ortalama getirisi o ANKİ bakiyeye uygulanır, ertesi gün
   yeni bakiyeyle devam edilir (bileşik/zincirleme). kod verilirse yalnız
   o hissenin sinyalleri sayılır. Ayrıntılı günlük kayıt yalnız son
   DETAY_GUN (90) gün için tutulur; kod belirtilmişse bu pencereyi aşan
   tarihler günün başına (en eski ayrıntılı güne) çekilir ve kullanıcıya
   bildirilir. kod verilmemişse 90 günü aşan kısım özet (ozet) ile
   tamamlanır — orada yalnız günlük ortalama vardır, hisse bazlı ayrım yok. */
const G2=await y(A),GD=G2.gunler||{},OZ=G2.ozet||{};
const bg=new Date(Date.now()+108e5).toISOString().slice(0,10);
const DUZELT=t=>({"15D":"15DK","1S":"1SA","4S":"4SA","1G":"1G","1H":"1HAF","1HAF":"1HAF","15DK":"15DK","1SA":"1SA","4SA":"4SA"})[t]||t;
let tarih=String(gov.tarih||"").slice(0,10);
if(!/^\d{4}-\d{2}-\d{2}$/.test(tarih))tarih=bg;
if(tarih>bg)tarih=bg;
const kod=gov.kod?KOD(gov.kod):null;
const gdGunler=Object.keys(GD).sort();
const gdBaslangic=gdGunler[0]||bg;
let sinirlandi=false,gercekTarih=tarih;
if(kod&&tarih<gdBaslangic){gercekTarih=gdBaslangic;sinirlandi=true}
let bakiye=1e4,gunlukKayit=[],toplamSinyal=0;
if(!kod){
const ozetGunler=Object.keys(OZ).filter(g=>g>=tarih&&g<gdBaslangic).sort();
for(const gun of ozetGunler){
const o=OZ[gun];if(!o||!o.n)continue;
bakiye*=1+o.ort/100;toplamSinyal+=o.n;
gunlukKayit.push({gun:gun,ort:Math.round(o.ort*100)/100,n:o.n,bakiye:Math.round(bakiye),sin:[]})}}
const detayBaslangic=kod?gercekTarih:tarih;
for(const gun of gdGunler){
if(gun<detayBaslangic)continue;
const kay=GD[gun].kayitlar||{};let gt=0,gn=0,gsin=[];
for(const key of Object.keys(kay)){const rec=kay[key];
if(!(rec&&rec.g>0&&rec.s>0)||rec.r===0)continue;
const kd=rec.k||String(key).split("@")[0];
if(kod&&kd!==kod)continue;
const tf=DUZELT(rec.t||String(key).split("@")[1]||"");
const y2=100*(rec.s/rec.g-1);
gt+=y2;gn++;gsin.push({k:kd,tf:tf,y:Math.round(y2*100)/100})}
if(gn){const ort=gt/gn;bakiye*=1+ort/100;toplamSinyal+=gn;
gsin.sort((a2,b2)=>b2.y-a2.y);
gunlukKayit.push({gun:gun,ort:Math.round(ort*100)/100,n:gn,bakiye:Math.round(bakiye),sin:gsin.slice(0,10)})}}
return JS({ok:!0,kod:kod||null,tarih:tarih,gercekTarih:gercekTarih,sinirlandi:sinirlandi,
bakiye:Math.round(bakiye),getiri:Math.round((bakiye/1e4-1)*1e4)/100,
toplamSinyal:toplamSinyal,gunler:gunlukKayit})}
if("/api/medya"===$.pathname){
/* Fotoğraf/video bir kez Telegram'a yüklenir, dönen file_id saklanır;
   duyuru o file_id ile gönderilir — her kişi için yeniden yüklenmez. */
if(!YON)return JS({ok:!1,hata:"yetkisiz"},403);
return JS({ok:!1,hata:"medya multipart ile gonderilmeli"},400)}
if("/api/yon"===$.pathname){
if(!YON)return JS({ok:!1,hata:"yetkisiz"},403);
const is=String(gov.is||"");
if("ozet"===is){
const st=await L(A),kl=await Y(A),vip=await E(A,!0),eng=await N(A,!0),L2=await g(A);
const simdi=Math.floor(Date.now()/1e3);
let sup=vip.length;
if(A.VERI){try{const li=await A.VERI.list({prefix:"vipsure:",limit:1e3});for(const kk of li.keys){const vv=await A.VERI.get(kk.name);if(vv&&Number(vv)>Date.now())sup++}}catch(e){}}
let sy=null;if(A.VERI){const e2=await A.VERI.get("sonYayin");if(e2){try{const j2=JSON.parse(e2);sy=new Date(j2.tarih).toLocaleDateString("tr-TR")+" · "+String(j2.metin||"").slice(0,60)}catch(e){}}}
const gbYeni=await gbOkunmamisSayisi(A).catch(()=>0);
return JS({ok:!0,uye:st.toplam||0,aktif24:Object.values(kl).filter(x=>x.son&&simdi-x.son<86400).length,
super:sup,engel:eng.length,depo:!!A.VERI,
guncelleme:L2&&L2.guncelleme?new Date(L2.guncelleme).toLocaleString("tr-TR"):null,
ozet:L2&&L2.kartlar?Object.keys(L2.kartlar).filter(x=>"sira"!==x).map(x=>({ad:x,n:L2.kartlar[x].length})):[],
sonYayin:sy,panelUrl:r(),dipbacktestUrl:n+"/dipbacktest?key="+encodeURIComponent(i),gbYeni:gbYeni})}
if("geribildirimler"===is){
/* 📩 Geri bildirimleri sistem içinden okuma — mini panelde "Bize Ulaşın"
   kutusu. Açılışta son okunma zamanı güncellenir, işaret (🔔) söner. */
const liste=(await gbOku(A)).slice(0,60);
q.waitUntil(gbOkunduIsaretle(A));
return JS({ok:!0,liste:liste})}
if("geribildirimYanitla"===is){
const hid=ID(gov.id);const metin=String(gov.metin||"").trim();
if(!hid||!metin)return JS({ok:!1,mesaj:"⚠️ ID ve mesaj gerekli."});
const rr=await b(A.BOT_TOKEN,"sendMessage",{chat_id:hid,text:"💬 <b>Ekipten yanıt:</b>\n\n"+metin,parse_mode:"HTML"}).catch(()=>null);
if(!rr||!rr.ok)return JS({ok:!1,mesaj:"⚠️ gönderilemedi — kullanıcı botu engellemiş olabilir."});
return JS({ok:!0,mesaj:"✅ yanıt gönderildi"})}
if("super"===is){
const hid=ID(gov.id);if(!hid)return JS({ok:!0,mesaj:"⚠️ ID gir."});
const ay=Math.max(1,Math.min(60,parseInt(gov.ay||"1",10)||1));
const mevcut=await suparUyeSuresi(A,hid),bas=Math.max(Date.now(),mevcut),bitis=bas+ay*2592e6;
if(A.VERI)await A.VERI.put("vipsure:"+hid,String(bitis));
const bit=new Date(bitis).toLocaleDateString("tr-TR");
q.waitUntil(b(A.BOT_TOKEN,"sendMessage",{chat_id:hid,parse_mode:"HTML",text:"👑 <b>Süper üyeliğin açıldı!</b>\n\n🟨 Aday listeleri (her dilim için)\n🔔 Anlık uyarı\n⏳ Bekleme yok\n\nBitiş: <b>"+bit+"</b>",reply_markup:u(hid)}).catch(()=>{}));
return JS({ok:!0,mesaj:"👑 <b>"+hid+"</b> · "+ay+" ay eklendi.<br>Bitiş: <b>"+bit+"</b>"})}
if("superkapat"===is){
const hid=ID(gov.id);if(!hid)return JS({ok:!0,mesaj:"⚠️ ID gir."});
if(A.VERI)await A.VERI.delete("vipsure:"+hid);
let vl=[...await E(A,!0)];if(vl.includes(hid)){vl=vl.filter(x=>x!==hid);if(A.VERI)await A.VERI.put("vip",JSON.stringify(vl));T=vl;x=Date.now()}
return JS({ok:!0,mesaj:"🔻 <b>"+hid+"</b> süper üyeliği kapatıldı."})}
if("kim"===is){
const hid=ID(gov.id);if(!hid)return JS({ok:!0,mesaj:"⚠️ ID gir."});
const sure=await suparUyeSuresi(A,hid),vipte=(await E(A,!0)).includes(hid),ref2=(await F(A))[hid]||0,sp=await suparUyeMi(A,hid),eng=(await N(A,!0)).includes(hid);
return JS({ok:!0,mesaj:"🔎 <b>"+hid+"</b><br>Süper üye: <b>"+(sp?"EVET":"hayır")+"</b><br>Elle sınırsız: <b>"+(vipte?"evet":"hayır")+
"</b><br>Süreli üyelik: <b>"+(sure>Date.now()?new Date(sure).toLocaleDateString("tr-TR"):"yok")+"</b><br>Toplam davet: <b>"+ref2+"</b><br>Engelli: <b>"+(eng?"EVET":"hayır")+"</b>"})}
if("engel"===is||"engelkaldir"===is){
const hid=ID(gov.id);if(!hid)return JS({ok:!0,mesaj:"⚠️ ID gir."});
let el2=[...await N(A,!0)];
if("engel"===is){if(!el2.includes(hid))el2.push(hid)}else el2=el2.filter(x=>x!==hid);
if(A.VERI)await A.VERI.put("engel",JSON.stringify(el2));v=el2;R=Date.now();
return JS({ok:!0,mesaj:("engel"===is?"🚫 <b>":"↩️ <b>")+hid+"</b> "+("engel"===is?"engellendi":"engeli kaldırıldı")+" · toplam engelli: "+el2.length})}
if("yayin"===is){
const metin=String(gov.metin||"").trim();
if(!metin&&!gov.fileId)return JS({ok:!1,mesaj:"⚠️ Mesaj boş."});
const hedef=gov.hedef||"test",BOY=40;
let liste=[],imlec=null,bitti=!0;
try{
  if("test"===hedef)liste=[String(uid)];
  else if("tek"===hedef){const hid=ID(gov.id);if(!hid)return JS({ok:!1,mesaj:"⚠️ ID gir."});liste=[hid]}
  else if(A.VERI){const li=await A.VERI.list({prefix:"u:",limit:BOY,cursor:gov.imlec||void 0});
  liste=li.keys.map(k=>k.name.slice(2));bitti=!!li.list_complete||!li.cursor;imlec=bitti?null:li.cursor}
}catch(err){
  /* KV'den liste okurken patlarsa (ör. KV limiti) çökme yerine anlaşılır hata döndür. */
  return JS({ok:!1,mesaj:"⚠️ Alıcı listesi okunamadı: "+String((err&&err.message)||err).slice(0,150)});
}
const eng=new Set(await N(A,!0).catch(()=>[]));let gonderilen=0,basarisiz=0;
const fid=String(gov.fileId||""),tur=String(gov.tur||"");
/* 📢 kalıcı olmayan başarısızlar (429 tükendi / 5xx / ağ hatası) burada
   biriktirilip turun sonunda yayinKuyruk'a atılır — bkz. aşağıdaki not.
   403 (bot engellenmiş) alanlar ise ayrıca botEngelli listesine işlenir. */
const tekrarListesi=[],yeniBotEngelli=[];
for(const hid of liste){
  if(eng.has(String(hid)))continue;
  /* 🐞 DÜZELTİLEN HATA: tek bir alıcıda çıkan beklenmeyen bir hata (ör. ağ
     kesintisi) tüm turu çökertip "hata" yazdırıyor, geri kalan herkese
     mesaj gitmiyordu — ama admin genelde listede ilk sırada olduğu için
     ONA gidiyordu, sonra patlıyordu. Artık her alıcı kendi try/catch'inde;
     biri patlarsa yalnız o "başarısız" sayılır, tur devam eder. */
  try{
    let rr;
    if(fid&&"video"===tur)rr=await b(A.BOT_TOKEN,"sendVideo",{chat_id:hid,video:fid,caption:metin.slice(0,1024),parse_mode:"HTML"});
    else if(fid)rr=await b(A.BOT_TOKEN,"sendPhoto",{chat_id:hid,photo:fid,caption:metin.slice(0,1024),parse_mode:"HTML"});
    else rr=await b(A.BOT_TOKEN,"sendMessage",{chat_id:hid,text:metin,parse_mode:"HTML",disable_web_page_preview:!0});
    if(rr&&rr.ok)gonderilen++;
    else{
      basarisiz++;
      /* 403 = kullanıcı botu engellemiş, 400 = geçersiz sohbet vb. — bunlar
         KALICI, tekrar denemek anlamsız. Geri kalan her şey (429 tükendi,
         5xx, rr=null → ağ hatası) tekrar denenebilir, kuyruğa aday. */
      const kod=(rr&&rr.error_code)||0;
      if(403===kod)yeniBotEngelli.push(hid);
      else if(400!==kod)tekrarListesi.push(hid);
    }
  }catch(err){basarisiz++;tekrarListesi.push(hid)}
}
if(A.VERI&&tekrarListesi.length&&"hepsi"===hedef)q.waitUntil(yayinKuyrugaKoy(A,{metin:metin,fileId:fid,tur:tur,alicilar:tekrarListesi}).catch(()=>{}));
if(A.VERI&&yeniBotEngelli.length)q.waitUntil(botEngelliEkle(A,yeniBotEngelli).catch(()=>{}));
if(A.VERI&&bitti&&"test"!==hedef&&"tek"!==hedef)q.waitUntil(A.VERI.put("sonYayin",JSON.stringify({tarih:(new Date).toISOString(),metin:metin.slice(0,300),hedef:hedef})).catch(()=>{}));
return JS({ok:!0,gonderilen:gonderilen,basarisiz:basarisiz,kuyruklandi:tekrarListesi.length,botuEngelledi:yeniBotEngelli.length,imlec:imlec,bitti:bitti,
mesaj:"test"===hedef?"🧪 Test gönderildi ("+gonderilen+")":"tek"===hedef?"✅ gönderildi":"gönderildi: "+gonderilen+(basarisiz?" · başarısız: "+basarisiz:"")+(tekrarListesi.length?" (arka planda tekrar denenecek: "+tekrarListesi.length+")":"")})}
return JS({ok:!1,hata:"bilinmeyen is"},400)}
return JS({ok:!1,hata:"bilinmeyen yol"},404)}
if("/durum"===$.pathname){const e=(A.VERI?"DEPO BAĞLI ✅":"DEPO YOK ⚠️ (kullanıcılar liste göremeyebilir)")+"\nformasyon tetikleyici: "+(A.GH_TOKEN?"HAZIR ✅":"GH_TOKEN TANIMLI DEĞİL ⚠️"),t=await g(A)
;if(!t)return new Response(e+"\nliste yok — telefondan yükle");const a=t.kartlar?Object.keys(t.kartlar).filter(e=>"sira"!==e).map(e=>e+":"+t.kartlar[e].length).join(" · "):"kart yok"
;return new Response(e+"\nliste var · "+Object.keys(t).filter(e=>"guncelleme"!==e).join(", ")+"\nkartlar: "+a+"\ngüncelleme: "+t.guncelleme)}if("/tg"===$.pathname&&"POST"===p.method){
const _whs=await whS(A);if(_whs&&p.headers.get("X-Telegram-Bot-Api-Secret-Token")!==_whs)return new Response("forbidden",{status:403});
const e=await p.json().catch(()=>null);if(!e)return new Response("ok");await botAd(A).catch(()=>{});if(e.message){const t=e.message,a=(t.text||"").trim(),n=a.toLowerCase(),i="private"===t.chat.type;let s=null
;const l=a.match(/^\/start\s+r(\d+)/i);if(l&&(s=l[1]),await B(A,t.from.id))return new Response("ok");
/* SOL ALT DÜĞMESİ: Telegram'ın sohbet menüsünü bu kullanıcı için doğrudan
   uygulamaya çevirir. /setup'ta bir kez ayarlanan genel varsayılan, botu
   daha önce açmış kullanıcılara işlemiyordu — bu yüzden onlarda düğme
   görünmüyordu. Artık her kullanıcı için tek tek ayarlanıyor.
   İstek arka planda gidiyor, yanıtı beklemiyoruz. */
if(i&&t.chat&&t.chat.id)q.waitUntil(b(A.BOT_TOKEN,"setChatMenuButton",{
  chat_id:t.chat.id,
  menu_button:{type:"web_app",text:"📱 Uygulamayı aç",web_app:{url:$.origin+"/app?v="+Date.now()}}
}).catch(()=>{}));
/* ================== 👑 YÖNETİCİ KOMUTLARI ==================
   Panele girmeden, sohbetten süper üyelik verme/alma:
     /super 123456789        → 1 ay ver
     /super 123456789 6      → 6 ay ver
     /superkapat 123456789   → üyeliği bitir
     /kim 123456789          → o kişinin durumunu göster
   Yalnızca yöneticiler kullanabilir. */
if(i&&d(t.from.id)&&/^\/(super|superkapat|kim)\b/i.test(a)){
const par=a.trim().split(/\s+/),komut=par[0].toLowerCase().replace("/",""),hid=String(par[1]||"").replace(/\D/g,"");
if(!hid)return q.waitUntil(b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,parse_mode:"HTML",
text:"Kullanım:\n<code>/super 123456789</code> — 1 ay ver\n<code>/super 123456789 6</code> — 6 ay ver\n<code>/superkapat 123456789</code> — bitir\n<code>/kim 123456789</code> — durum sor"})),new Response("ok");
return q.waitUntil((async()=>{
if("superkapat"===komut){if(A.VERI)await A.VERI.delete("vipsure:"+hid);
let vl=[...await E(A,!0)];if(vl.includes(hid)){vl=vl.filter(x=>x!==hid);if(A.VERI)await A.VERI.put("vip",JSON.stringify(vl));T=vl;x=Date.now()}
await b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,parse_mode:"HTML",text:"🔻 <code>"+hid+"</code> süper üyeliği <b>kapatıldı</b>."});return}
if("super"===komut){const ay=Math.max(1,Math.min(60,parseInt(par[2]||"1",10)||1));
const simdi=Date.now(),mevcut=await suparUyeSuresi(A,hid),bas=Math.max(simdi,mevcut),yeniBitis=bas+ay*2592e6;
if(A.VERI)await A.VERI.put("vipsure:"+hid,String(yeniBitis));
const bit=new Date(yeniBitis).toLocaleDateString("tr-TR");
await b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,parse_mode:"HTML",
text:"👑 <code>"+hid+"</code> için süper üyelik <b>"+ay+" ay</b> eklendi.\nBitiş: <b>"+bit+"</b>"});
try{await b(A.BOT_TOKEN,"sendMessage",{chat_id:hid,parse_mode:"HTML",
text:"👑 <b>Süper üyeliğin açıldı!</b>\n\n🟨 Aday listeleri (her dilim için)\n🔔 Anlık uyarı\n⏳ Bekleme yok\n\nBitiş: <b>"+bit+"</b>",reply_markup:u(hid)})}catch(e){}
return}
/* /kim */
const sure=await suparUyeSuresi(A,hid),vipte=(await E(A,!0)).includes(hid),ref=(await F(A))[hid]||0;
const supar=await suparUyeMi(A,hid);
await b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,parse_mode:"HTML",
text:"🔎 <code>"+hid+"</code>\n\nSüper üye: <b>"+(supar?"EVET":"hayır")+"</b>\n"+
"Elle sınırsız listede: <b>"+(vipte?"evet":"hayır")+"</b>\n"+
"Süreli üyelik: <b>"+(sure>Date.now()?new Date(sure).toLocaleDateString("tr-TR")+" tarihine kadar":"yok")+"</b>\n"+
"Toplam daveti: <b>"+ref+"</b>"});
})()),new Response("ok")}
if(i&&!await onayVarMi(A,t.from.id)){q.waitUntil(uyeKaydet(A,t.from,s).catch(()=>{}));
return q.waitUntil(b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,text:ONAY_METIN,parse_mode:"HTML",reply_markup:ONAY_KLAVYE})),new Response("ok")}if(i&&q.waitUntil(uyeKaydet(A,t.from,s)),
i&&(n.startsWith("/panel")||n.startsWith("/yonetici")))return d(t.from.id)?(q.waitUntil((async()=>{
/* B) Her /panel komutunda 30 dakika geçerli, imzalı YENİ bir adres
   üretilir. Eski sabit ?key= adresi de çalışmaya devam ediyor. */
let baglanti;
try{baglanti=n+"/panel?t="+encodeURIComponent(await panelTokenUret(A,t.from.id))}
catch(e){baglanti=r()}
await b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,parse_mode:"HTML",disable_web_page_preview:!0,
text:"🛠 <b>Yönetici paneli</b>\n\nAşağıdaki düğmeye dokun — panel tarayıcıda açılır.\n\n⏳ Bu bağlantı <b>30 dakika</b> geçerli; süresi dolunca yeniden <code>/panel</code> yaz.\n\nAdres:\n<code>"+baglanti+"</code>",
reply_markup:{inline_keyboard:[[{text:"🛠 Paneli aç",url:baglanti}],[{text:"◀️ Menü",callback_data:"menu"}]]}})
})()),new Response("ok")):(q.waitUntil(b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,text:"Bu komut yöneticiye özeldir.",reply_markup:u(t.from.id)})),new Response("ok"))
;if(i&&n.startsWith("/tara"))return q.waitUntil((async()=>{
if(!d(t.from.id)){await b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,
text:"Bu komut yalnızca yöneticiye açık."});return}
await b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,text:"🔄 Tarama isteniyor…"});
const s2=await taramaTetikle(A);
await b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,
text:(s2.ok?"✅ ":"⚠️ ")+E(s2.mesaj),parse_mode:"HTML",reply_markup:u(t.from.id)})})()),new Response("ok")
;if(i&&n.startsWith("/surum"))return q.waitUntil((async()=>{
/* 🏷️ MOBILDE SURUM KONTROLU
   824 KB'lik yumatu.html'i telefonda acip YAMA_SURUM aramak donduruyor,
   GitHub dosya listesindeki tarih ise yanilticidir (depoya baska bir
   islem gelince "simdi" yazar ama dosya degismemis olabilir).
   Tek guvenilir kanit: TARAYICININ KENDI BILDIRDIGI surum. Damga her
   /push turunda pakete konuyor, burada geri okunuyor. Yeni dosya
   yuklenmediyse burada ESKI surum gorunur — dosya acmaya gerek kalmaz. */
let m="🏷️ <b>SÜRÜM</b>\n\n";
try{
  const L=await g(A);
  const ts=L&&L.guncelleme?new Date(L.guncelleme):null;
  const yas=ts?Math.round((Date.now()-ts.getTime())/6e4):null;
  m+="🖥 <b>Tarayıcı</b> (yumatu.html)\n<code>"+
     E(String((L&&L.tarayiciSurum)||"— damga yok, ESKİ DOSYA —"))+"</code>\n\n";
  m+="🕐 Son tarama: "+(ts?tgTarihSaat(Math.floor(ts.getTime()/1e3)):"—")+
     (yas!=null?" ("+yas+" dk önce)":"")+"\n";
  m+="📦 Beklenen: <code>"+E(BEKLENEN_TARAYICI_SURUM)+"</code>\n\n";
  const uygun=String((L&&L.tarayiciSurum)||"").indexOf(BEKLENEN_TARAYICI_SURUM)===0;
  m+=uygun?"✅ Tarayıcı güncel.":"⚠️ <b>Tarayıcı ESKİ.</b> yumatu.html yüklemesi tutmamış.";
  m+="\n\n⚙️ <b>Worker</b>\n<code>"+E(WORKER_SURUM)+"</code>";
}catch(e){m+="Okunamadı."}
await b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,text:m,parse_mode:"HTML",
disable_web_page_preview:!0,reply_markup:u(t.from.id)})})()),new Response("ok")
;if(i&&(n.startsWith("/sinyal")||n.startsWith("/canli")))return q.waitUntil((async()=>{
const yalnizCanli=n.startsWith("/canli");
let metin;
try{metin=await sinyalMetniUret(A,yalnizCanli)}catch(e){metin="Liste şu an okunamadı, birazdan tekrar dene."}
await b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,text:metin,parse_mode:"HTML",
disable_web_page_preview:!0,reply_markup:u(t.from.id)})})()),new Response("ok")
;if(i&&n.startsWith("/davet"))return q.waitUntil((async()=>{const e=(await b(A.BOT_TOKEN,"getMe",{}))?.result?.username||"bot";await b(A.BOT_TOKEN,"sendMessage",PY(e,t.from.id,t.chat.id))})()),new Response("ok")
const o=a.toUpperCase().replace(/[^A-ZÇĞİÖŞÜ]/g,"");return i&&!a.startsWith("/")&&o.length>=3&&o.length<=6&&o.length===a.trim().length?(q.waitUntil((async()=>{const e=await g(A)
;await b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,parse_mode:"HTML",disable_web_page_preview:!0,text:P(e,o),reply_markup:u(t.from.id)})})()),
new Response("ok")):((i||n.startsWith("/start")||n.startsWith("/liste"))&&q.waitUntil(b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,text:f,parse_mode:"HTML",reply_markup:u(t.from.id)})),
new Response("ok"))}if(e.callback_query){const t=e.callback_query,a=t.from.id,n="private"!==t.message.chat.type,i=n?a:t.message.chat.id,r=t.data
;if(await B(A,a))return await b(A.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id,text:"Erişimin kapatılmış.",show_alert:!0}),new Response("ok");
/* 🔄 Yalniz yonetici: Actions takilirsa Telegram'dan yeni tarama baslatir. */
if("elletara"===r){
  if(!d(a))return await b(A.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id,text:"Yetkin yok.",show_alert:!0}),new Response("ok");
  await b(A.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id,text:"Tarama isteniyor…"});
  return q.waitUntil((async()=>{const s2=await taramaTetikle(A);
    await b(A.BOT_TOKEN,"sendMessage",{chat_id:i,text:(s2.ok?"✅ ":"⚠️ ")+E(s2.mesaj),
      parse_mode:"HTML",reply_markup:u(a)})})()),new Response("ok");
}
if("onay"===r){await onayVer(A,a);await b(A.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id,text:"Onaylandı. İyi çalışmalar."});return q.waitUntil(b(A.BOT_TOKEN,"sendMessage",{chat_id:i,text:f,parse_mode:"HTML",reply_markup:u(a)})),new Response("ok")}
if(!await onayVarMi(A,a))return await b(A.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id}),q.waitUntil(b(A.BOT_TOKEN,"sendMessage",{chat_id:i,text:ONAY_METIN,parse_mode:"HTML",reply_markup:ONAY_KLAVYE})),new Response("ok");if("bilgi"===r)return await b(A.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id}),q.waitUntil(b(A.BOT_TOKEN,"sendMessage",{chat_id:i,text:BILGI_METIN,parse_mode:"HTML",disable_web_page_preview:!0,reply_markup:{inline_keyboard:[[{text:"◀️ Menü",callback_data:"menu"}]]}})),new Response("ok");if("davet"===r){
await b(A.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id});const e=(await b(A.BOT_TOKEN,"getMe",{}))?.result?.username||"bot";return q.waitUntil(b(A.BOT_TOKEN,"sendMessage",PY(e,a,i))),new Response("ok")}
if("menu"===r)return await b(A.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id}),q.waitUntil(b(A.BOT_TOKEN,"sendMessage",{chat_id:i,text:f,parse_mode:"HTML",reply_markup:u(a)})),
new Response("ok");if("karne"===r&&!d(a))return await b(A.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id,text:"🔐 Bu bölüm yöneticiye özeldir.",show_alert:!0}),new Response("ok")
;const ADAY_RX=/^(l:|d:)?aday/;if(ADAY_RX.test(r)&&!await suparUyeMi(A,a)){await b(A.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id});const REF=(await F(A))[String(a)]||0,KALAN=(REF%20===0?20:20-REF%20);return q.waitUntil(b(A.BOT_TOKEN,"sendMessage",{chat_id:i,parse_mode:"HTML",disable_web_page_preview:!0,text:"👑 <b>SÜPER ÜYELİK GEREKLİ</b>\n\n🟨 <b>Aday listeleri</b>, toplamda <b>en az 20 kişi</b> davet eden Süper Üyeler içindir.\n\nBu listeler, sinyal <b>oluşmadan önce</b> hangi hisselerin kırılıma hazır olduğunu gösterir:\n🔓 Tetik seviyesi — kırarsa o vadenin sinyali başlar\n🎯 İlk hedef — kırarsa gideceği yer\n\nDiğerleri sinyal oluştuktan sonra görür; sen önce görürsün.\n\nToplam davet sayın: <b>"+REF+"</b>\n\nAçmak için <b>"+KALAN+" kişi</b> daha davet etmen gerekiyor.\n\n<i>Sayaç asla sıfırlanmaz, davet ettikçe birikir. Her 20 davette süper üyeliğin 1 ay açılır ya da mevcut süren 1 ay daha uzar.</i>",reply_markup:u(a)})),new Response("ok")}
;const s=c.has(r)&&!await async function(e,t){return!!d(t)||(await E(e)).includes(String(t))}(A,a)?await async function(e,t){const a=caches.default,n=M(t),i=await a.match(n);if(i){
const e=parseInt(await i.text(),10)-Math.floor(Date.now()/1e3);if(e>0)return e}const r=await S(e),s=60*(r.kisitMin+Math.floor((r.kisitMax-r.kisitMin+1)*Math.random()));if(s<=0)return 0
;const l=Math.floor(Date.now()/1e3)+s;return await a.put(n,new Response(String(l),{headers:{"Cache-Control":"max-age="+s}})),0}(A,a):!c.has(r)&&!EM.has(r)&&!d(a)?await async function(e,t){const a=caches.default,n=M60(t),i=await a.match(n);if(i){const e=parseInt(await i.text(),10)-Math.floor(Date.now()/1e3);if(e>0)return e}return await a.put(n,new Response("60",{headers:{"Cache-Control":"max-age=60"}})),0}(A,a):0;if(s>0)return await b(A.BOT_TOKEN,"answerCallbackQuery",{
callback_query_id:t.id,
text:s<=60?"⏳ Az önce bir işlem yaptın, "+s+" saniye sonra tekrar dene.\n\nWorker kaynaklarını dengeli kullanmak için ardışık işlemler arasında kısa bir bekleme uygulanıyor.":"⏳ Sıradaki listen "+Math.ceil(s/60)+" dakika sonra açılacak.\n\nBot çok sayıda kullanıcıya aynı anda hizmet veriyor; erişim sırayla veriliyor. Yoğunluk azaldıkça sıra hızlanır.",show_alert:!0}),
new Response("ok");await b(A.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id}),q.waitUntil(async function(e,t,a,n){if(H[a]=(H[a]||0)+1,n){const e=_[n]||(_[n]={});e[a]=(e[a]||0)+1,
e.toplam=(e.toplam||0)+1,e.son=Math.floor(Date.now()/1e3)}const i=Date.now();if(i-C<3e5||!e.VERI)return;C=i;const r=H,s=_;H={},_={},t.waitUntil((async()=>{const t=await L(e);t.basis=t.basis||{}
;for(const e of Object.keys(r))t.basis[e]=(t.basis[e]||0)+r[e];if(await e.VERI.put("istatistik",JSON.stringify(t)),Object.keys(s).length){const t=await Y(e);for(const e of Object.keys(s)){
const a=t[e]||(t[e]={});for(const t of Object.keys(s[e]))"son"===t?a.son=s[e].son:a[t]=(a[t]||0)+s[e][t]}await e.VERI.put("kullanim",JSON.stringify(t))}})())
}(A,q,r.startsWith("d:")?"detay":r.startsWith("l:")?"sirala":r,String(a)));const l=await g(A);if(r.startsWith("d:")){
const[,e,s,o,c]=r.split(":"),d=o||"pot",f=Number(c||0),b=l&&l.kartlar&&l.kartlar[e],p=b&&b[Number(s)];let y=u(a);return b&&b.length&&(y=K(l,e,d,f,z(l,e,d))),q.waitUntil((async()=>{
if(p&&y&&y.inline_keyboard){const e=(await X(A,a)).includes(p.kod),PL=BUN?("https://t.me/share/url?url="+encodeURIComponent("https://t.me/"+BUN+"?start=r"+a)+"&text="+encodeURIComponent("📈 "+p.kod+" "+Number(p.fiyat).toFixed(2)+" ₺"+(null!=p.hedef1?" · hedef "+Number(p.hedef1).toFixed(2):(null!=p.hedef?" · hedef "+Number(p.hedef).toFixed(2):""))+" — Fix Borsa Sinyal sinyalleri:")):null,ust=[{text:(e?"⭐ Takipten çıkar":"⭐ Takibe al"),callback_data:"fav:"+p.kod}];if(PL)ust.push({text:"📤 Paylaş",url:PL});y={inline_keyboard:[ust].concat(y.inline_keyboard)}}
await V(A,t,i,n,p?j(p):"Bu hisse artık listede değil. Menüden yeniden bak.",y,!0)})()),new Response("ok")}if("karne7"===r)return q.waitUntil((async()=>{let e;try{e=await async function(e){
const t=await y(e),GD=t.gunler||{},gunler=Object.keys(GD).sort().reverse().slice(0,7);
if(!gunler.length)return"📊 <b>KARNE</b>\n\nHenüz yeterli geçmiş birikmedi. Kayıt her taramada işleniyor; birkaç gün sonra burada dolu bir tablo olacak.";
const bugun=new Date(Date.now()+108e5).toISOString().slice(0,10);
const gunFark=(g)=>Math.max(0,Math.round((new Date(bugun)-new Date(g))/864e5));
const yz=v=>(v>=0?"+":"")+v.toFixed(2)+"%";
let n="📊 <b>SİNYAL KARNESİ</b>\n<i>Sinyalin verildiği günden bugüne kadarki sonuç</i>\n";
let tN=0,tHedef=0,tKar=0,tZarar=0,tTop=0,tGercek=0;
for(const gun of gunler){
const kayit=GD[gun]&&GD[gun].kayitlar||{};
const kodlar=Object.keys(kayit).filter(k=>{const r=kayit[k];return r&&r.g>0&&r.s>0});
if(!kodlar.length)continue;
/* GERÇEK SİNYAL / DOLGU AYRIMI: r=0 kayıtlar geçmiş kapanışlardan
   üretilmiş dolgu verisidir, gerçek sinyal değildir. Karışmasınlar. */
const gercek=kodlar.filter(k=>kayit[k].r!==0);
const kullan=gercek.length?gercek:kodlar;
const dolguMu=!gercek.length;
let top=0,eniyi=null,enkotu=null,hedefTutan=0,hedefliSayi=0,karda=0,zararda=0;
for(const k of kullan){const r=kayit[k],y2=100*(r.s/r.g-1);
top+=y2; if(y2>=0)karda++;else zararda++;

if(!eniyi||y2>eniyi.y)eniyi={kod:r.k||KODU(k),y:y2};
if(!enkotu||y2<enkotu.y)enkotu={kod:r.k||KODU(k),y:y2}}
const adet=kullan.length,ort=top/adet,yas=gunFark(gun);
tN+=adet; tTop+=top; tKar+=karda; tZarar+=zararda; tHedef+=hedefTutan; tGercek+=hedefliSayi;
const [yil,ay,gg]=gun.split("-");
n+="━━━━━━━━━━━━━━━━\n<b>"+gg+"/"+ay+"</b>  ·  "+adet+" sinyal  ·  <i>"+(yas===0?"bugün":yas+" gün önce")+"</i>"+(dolguMu?"  ·  <i>dolgu verisi</i>":"")+"\n";
n+=(ort>=0?"🟢":"🔴")+" Ortalama: <b>"+yz(ort)+"</b>  <i>(sinyalden bu yana)</i>\n";
n+="📈 Kârda: <b>"+karda+"</b>  ·  📉 Zararda: <b>"+zararda+"</b>";

n+="\n";
n+="💰 O gün 100.000 ₺ eşit dağıtılsaydı → <b>"+Math.round(1e5*(1+ort/100)).toLocaleString("tr-TR")+" ₺</b>\n";
if(eniyi)n+="🔝 "+eniyi.kod+" "+yz(eniyi.y)+(yas?"  <i>("+yas+" günde)</i>":"");
if(enkotu)n+="   🔻 "+enkotu.kod+" "+yz(enkotu.y);
n+="\n"}
if(tN){const ortT=tTop/tN;
n+="━━━━━━━━━━━━━━━━\n<b>TOPLAM</b>  ·  "+tN+" sinyal\n";
n+=(ortT>=0?"🟢":"🔴")+" Ortalama getiri: <b>"+yz(ortT)+"</b>  <i>(sinyalden bugüne)</i>\n";
n+="📈 Kârda: <b>"+tKar+"</b> (%"+Math.round(100*tKar/tN)+")  ·  📉 Zararda: <b>"+tZarar+"</b>\n";
}
n+="━━━━━━━━━━━━━━━━\n";
n+="<i>ℹ️ Rakamlar <b>günlük kâr değildir</b>: her sinyalin verildiği günden bugüne kadarki toplam değişimdir. Eski günlerdeki yüksek yüzdeler birkaç günün birikimidir.</i>\n";
n+="<i>Aynı hisse birden çok günde sinyal verdiyse her gün ayrı sayılır. Pozisyonlar kapatılmaz; hedefe ulaşan da listede kalmaya devam eder.</i>\n";
n+="<i>Fiyatlar son taramaya göredir. Geçmiş performans geleceği garanti etmez.</i>\n<i>⚠️ Yatırım tavsiyesi değildir.</i>";
return n}(A)}catch(t){
e="📊 Karne şu an hazırlanamadı, birazdan tekrar dene."}await V(A,t,i,n,e,u(a),!1)})()),new Response("ok");if("yillik"===r)return q.waitUntil((async()=>{let e;try{e=await async function(e){
const g=await y(e),oy=Object.keys(g.ozet||{}),gy=Object.keys(g.gunler||{}),tum=[...oy];for(const d of gy)oy.includes(d)||tum.push(d);tum.sort()
;if(!tum.length)return"📆 <b>UZUN VADELİ ÖZET</b>\n\nHenüz yeterli geçmiş birikmedi. Kayıt her taramada işleniyor; sistem kendi geçmişini biriktirdikçe burası dolacak."
;let bakiye=1e5,toplamN=0,ilk=null,eniyi=null,enkotu=null;for(const d of tum){const rec=g.ozet[d]||m(d,g.gunler[d]);if(!rec)continue;ilk=ilk||d,bakiye*=1+rec.ort/100,toplamN+=rec.n
;(!eniyi||rec.ort>eniyi.ort)&&(eniyi={gun:d,ort:rec.ort}),(!enkotu||rec.ort<enkotu.ort)&&(enkotu={gun:d,ort:rec.ort})}
const getiri=100*(bakiye/1e5-1);let n="📆 <b>UZUN VADELİ ÖZET</b>\n<i>"+(ilk||tum[0])+" ↦ bugün · "+tum.length+" günlük kayıt · "+toplamN+" sinyal</i>\n\n"
;n+="<i>İlk günden bu yana her günün ortalama getirisi zincirleme (bileşik) uygulansaydı</i>\n\n"
;n+=(getiri>=0?"🟢":"🔴")+" Bileşik getiri: <b>"+(getiri>=0?"+":"")+getiri.toFixed(1)+"%</b>\n"
;n+="💰 100.000 ₺ → <b>"+Math.round(bakiye).toLocaleString("tr-TR")+" ₺</b>\n"
;eniyi&&(n+="🔝 En iyi gün: "+eniyi.gun+"  "+(eniyi.ort>=0?"+":"")+eniyi.ort.toFixed(1)+"%\n")
;enkotu&&(n+="🔻 En kötü gün: "+enkotu.gun+"  "+(enkotu.ort>=0?"+":"")+enkotu.ort.toFixed(1)+"%\n")
;return n+"\n<i>Detaylı (hisse bazlı) kayıtlar son "+DETAY_GUN+" gün için tutulur; daha eskisi günlük özet olarak "+OZET_GUN+" güne kadar saklanır.</i>\n<i>⚠️ Bu rakam her günün kazancının bir öncekinin üzerine tam olarak yeniden yatırıldığı varsayımına dayanır; komisyon, kayma (slipaj) ve likidite sınırlarını hesaba katmaz. Gün sayısı arttıkça zincirleme etkisiyle rakam hızla büyür — gerçekte elde edilebilecek bir garanti değil, teorik bir üst sınırdır.</i>\n<i>⚠️ Yatırım tavsiyesi değildir.</i>"
}(A)}catch(t){e="📆 Özet şu an hazırlanamadı, birazdan tekrar dene."}await V(A,t,i,n,e,u(a),!1)})()),new Response("ok");if("alarm"===r||"alarm:on"===r||"alarm:off"===r)return q.waitUntil((async()=>{const supar=await suparUyeMi(A,a)
;if(!supar){const refMap=await F(A),sayi=refMap[String(a)]||0,eksik=sayi%20,kalan=eksik===0?20:20-eksik
;const metin="👑 <b>SÜPER ÜYELİK GEREKLİ</b>\n\nAnlık uyarı özelliği, toplamda <b>en az 20 kişi</b> davet eden Süper Üyeler içindir.\n\nToplam davet sayın: <b>"+sayi+"</b>\n\nAçmak için <b>"+kalan+" kişi</b> daha davet etmen gerekiyor.\n\n<i>Sayaç asla sıfırlanmaz, davet ettikçe birikir. Her 20 davette süper üyeliğin 1 ay açılır/uzar — zaten süper üyeysen bile yeni 20 davet süreni 1 ay daha uzatır.</i>"
;return void await V(A,t,i,n,metin,{inline_keyboard:[[{text:"📤 Sistemi paylaş",callback_data:"davet"}],[{text:"◀️ Menü",callback_data:"menu"}]]},!0)}
if(A.VERI){if("alarm:on"===r)await A.VERI.put("alarm:"+a,"1");else if("alarm:off"===r)await A.VERI.delete("alarm:"+a)}
const acik=!!(A.VERI&&await A.VERI.get("alarm:"+a))
;/* BUGÜN SİNYAL VERENLER: alarm hafızasındaki kodlar, güncel fiyat ve
   sinyalden bu yana getirisiyle birlikte. Kullanıcı "bugün ne çıktı"
   sorusunu tek ekranda görsün diye. */
const gec=await alarmGecmisi(A),bugKod=(gec.kodlar||[]);
const listeAn=await g(A);
let bugBlok="";
if(bugKod.length){bugBlok="\n\n━━━━━━━━━━━━━━━━\n📋 <b>BUGÜN SİNYAL VERENLER</b> ("+bugKod.length+")\n";
const satirlar=bugKod.slice().reverse().slice(0,25).map(kod=>{const k=Z(listeAn,kod);
if(!k)return "▫️ <b>"+kod+"</b>";
const kr=I(k);
return (null===kr?"▫️":kr>=0?"🟢":"🔴")+" <b>"+kod+"</b>  "+Number(k.fiyat).toFixed(2)+" ₺"+
(null===kr?"":"  ·  <b>"+(kr>=0?"+":"")+kr.toFixed(2)+"%</b>")+
(null!=k.potansiyel?"  ·  hedefe "+(Number(k.potansiyel)<=0?"🏆":"+"+Number(k.potansiyel).toFixed(1)+"%"):"")});
bugBlok+=satirlar.join("\n");
if(bugKod.length>25)bugBlok+="\n<i>…ve "+(bugKod.length-25)+" hisse daha</i>";
bugBlok+="\n<i>En yeni üstte. Liste her gün 09:00'da sıfırlanır.</i>"}
else bugBlok="\n\n━━━━━━━━━━━━━━━━\n📋 <b>BUGÜN SİNYAL VERENLER</b>\n<i>Bugün henüz güçlü sinyal veren hisse olmadı.</i>";
const metin="🔔 <b>ANLIK UYARI AYARLARI</b> 👑\n\n"+(acik?"✅ Şu an <b>açık</b>.\n\nBir hisse ⚡ <b>Kısa Trade</b> listesine girdiği an sana özelden mesaj gönderilir.":"🔕 Şu an <b>kapalı</b>.\n\nAçarsan, bir hisse ⚡ <b>Kısa Trade</b> listesine girdiği an sana özelden mesaj gönderilir.")+"\n\n<i>Aynı hisse günde bir kez bildirilir; her taramada tekrar gelmez.</i>"+bugBlok
;await V(A,t,i,n,metin,{inline_keyboard:[[{text:acik?"🔕 Kapat":"🔔 Aç",callback_data:acik?"alarm:off":"alarm:on"}],[{text:"◀️ Menü",callback_data:"menu"}]]},!0)})()),new Response("ok")
;if("fav"===r||r.startsWith("fav:"))return q.waitUntil((async()=>{let e=await X(A,a)
;if(r.startsWith("fav:")){const t=r.slice(4);e=e.includes(t)?e.filter(e=>e!==t):[t,...e],await async function(e,t,a){return e.VERI&&await e.VERI.put("fav:"+t,JSON.stringify(a.slice(0,30))),a}(A,a,e)}
await V(A,t,i,n,function(e,t){
if(!t.length)return"⭐ <b>TAKİP LİSTEM</b>\n\nListen boş.\n\nBir hissenin detayını açtığında <b>⭐ Takibe al</b> düğmesi çıkar. Eklediklerin burada, anlık kâr/zararıyla toplanır."
;let a="⭐ <b>TAKİP LİSTEM</b>\n<i>"+t.length+" hisse</i>\n\n",n=0,i=0;for(const r of t){const t=Z(e,r);if(!t){a+="▫️ <b>"+r+"</b> — güncel listede yok\n";continue}const s=I(t);null!==s&&(n+=s,i++),
a+=(null===s?"▫️":s>=0?"🟢":"🔴")+" <b>"+r+"</b>  "+Number(t.fiyat).toFixed(2)+" ₺"+(null===s?"":"  ·  <b>"+(s>=0?"+":"")+s.toFixed(2)+"%</b>")+(void 0!==t.potansiyel&&null!==t.potansiyel?"  ·  hedefe +"+Number(t.potansiyel).toFixed(1)+"%":"")+"\n"
}if(i){const e=n/i;a+="\n"+(e>=0?"🟢":"🔴")+" <b>Ortalama: "+(e>=0?"+":"")+e.toFixed(2)+"%</b>"}return a+="\n\n<i>⚠️ Yatırım tavsiyesi değildir.</i>",a}(l,e),e.length?FAVKB(e):u(a),!1)})()),new Response("ok")
if("ilk3"===r){const e=l&&l.kartlar&&l.kartlar.ilk3&&l.kartlar.ilk3.length
;return q.waitUntil(V(A,t,i,n,e?function(e,YON){const t=e.kartlar&&e.kartlar.ilk3||[],a=e=>Number(e).toFixed(2),n=["🥇","🥈","🥉"];let i="🏅 <b>BU TARAMANIN İLK 3'Ü</b>\n";if(e.guncelleme&&YON){
const t=new Date(e.guncelleme);i+="<i>"+String((t.getUTCHours()+3)%24).padStart(2,"0")+":"+String(t.getUTCMinutes()).padStart(2,"0")+" taramasından</i>\n"}return i+="\n",t.forEach((e,t)=>{
i+="━━━━━━━━━━━━━━━━\n"+n[t]+" <b>"+e.kod+"</b>"+(e.tf?"  ·  <i>"+e.tf+"</i>":"")+(e.neden?"  ·  <i>"+e.neden+"</i>":"")+"\n",
void 0!==e.giris&&null!==e.giris&&(i+="💵 Sinyal <b>"+a(e.giris)+"</b> → Şimdi <b>"+a(e.fiyat)+"</b>\n");const r=I(e)
;null!==r&&(i+=(r>=0?"🟢":"🔴")+" Sinyalden bu yana: <b>"+(r>=0?"+":"")+r.toFixed(2)+"%</b>\n"),void 0!==e.hedef&&null!==e.hedef&&(i+="🎯 Hedef <b>"+a(e.hedef)+"</b>",
void 0!==e.potansiyel&&null!==e.potansiyel&&(i+=Number(e.potansiyel)<=0?"  ·  🏆 <b>TUTTU</b>":"  ·  <b>+"+Number(e.potansiyel).toFixed(1)+"%</b>"),i+="\n");const s=e.sinyalZaman||e.zaman
;s&&(i+="🕐 <i>"+s+"</i>\n")}),i+="━━━━━━━━━━━━━━━━\n<i>Sıralama tazelik, likidite ve dilim puanına göre; yalnız hedef uzaklığına göre değil.</i>\n<i>⚠️ Yatırım tavsiyesi değildir.</i>",i
}(l,d(a)):"🏅 <b>BU TARAMANIN İLK 3'Ü</b>\n\nHenüz liste hazırlanmadı. Birazdan tekrar dene.",u(a),!1)),new Response("ok")}let o,p=r,k="pot",h=0;if(r.startsWith("l:")){const e=r.split(":");p=e[1],
k=e[2]||"pot",h=Number(e[3]||0)}if(l&&l.kartlar&&l.kartlar[p]&&l.kartlar[p].length){const e=z(l,p,k),a=Math.max(1,Math.ceil(e.length/8));h<0&&(h=0),h>=a&&(h=a-1);const s=Q[p]||"<b>LİSTE</b>"
;return q.waitUntil(V(A,t,i,n,U(s,l,p,k,h,e,d(a)),K(l,p,k,h,e),r.startsWith("l:"))),new Response("ok")}if(l&&l[p]){if(o=l[p],l.guncelleme&&d(a)){const e=new Date(l.guncelleme)
;o+=`\n\n<i>Son güncelleme: ${String((e.getUTCHours()+3)%24).padStart(2,"0")+":"+String(e.getUTCMinutes()).padStart(2,"0")}</i>`}}else o="⏳ Liste henüz hazırlanmadı. Birazdan tekrar dene."
;const w=function(e){const t=[];for(;e.length>3900;){let a=e.lastIndexOf("\n",3900);a<2e3&&(a=3900),t.push(e.slice(0,a)),e=e.slice(a)}return t.push(e),t}(o);return q.waitUntil((async()=>{
for(let e=0;e<w.length;e++){const r=await b(A.BOT_TOKEN,"sendMessage",{chat_id:i,text:w[e],parse_mode:"HTML",disable_web_page_preview:!0,reply_markup:e===w.length-1?u(a):void 0})
;if(n&&(!r||!1===r.ok)){const e=(await b(A.BOT_TOKEN,"getMe",{}))?.result?.username;await b(A.BOT_TOKEN,"sendMessage",{chat_id:t.message.chat.id,
text:'👋 <a href="tg://user?id='+a+'">Listeyi görmek</a> için önce botu başlatman gerekiyor: @'+(e||"bot")+" → <b>Başlat</b>. Sonra buradaki düğmeler sana özelden cevap verir.",parse_mode:"HTML",
disable_web_page_preview:!0});break}}})()),new Response("ok")}return new Response("ok")}{const e=!!A.VERI,a=await g(A);let n=null,i=!1,r=null,s="";if(A.BOT_TOKEN){try{
const e=await b(A.BOT_TOKEN,"getMe",{});e&&e.ok&&(i=!0,n=e.result.username)}catch(e){}if(i)try{const e=await b(A.BOT_TOKEN,"getWebhookInfo",{});e&&e.result&&(r=e.result.url||"",
e.result.last_error_message&&(s=e.result.last_error_message))}catch(e){}}
const l=A.PUSH_KEY||t,o=a&&a.kartlar?Object.keys(a.kartlar).filter(e=>"sira"!==e).map(e=>e+": "+a.kartlar[e].length).join(" · "):"",c=(e,t,a)=>'<div class="s '+(e?"ok":"yok")+'"><div class="i">'+(e?"✅":"⚠️")+"</div><div><b>"+t+'</b><div class="a">'+a+"</div></div></div>",d='<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Fix Borsa Sinyal · Durum</title><style>body{margin:0;background:#0d1117;color:#e6edf3;font:15px/1.55 system-ui,-apple-system,sans-serif;padding:16px 14px 60px}h1{font-size:19px;margin:0 0 14px}.s{display:flex;gap:10px;background:#161b22;border:1px solid #272e37;border-radius:12px;padding:12px;margin-bottom:9px}.s.yok{border-color:#6b2b2b;background:#22171a}.i{font-size:18px;line-height:1.3}.a{color:#8b949e;font-size:13px;margin-top:3px}a.d{display:block;background:#388bfd;color:#fff;text-decoration:none;text-align:center;border-radius:11px;padding:13px;font-weight:700;margin-top:10px}a.d.ikinci{background:#21262d;border:1px solid #272e37;color:#e6edf3}code{background:#1c2330;padding:2px 6px;border-radius:5px;font-size:13px;word-break:break-all}ol{padding-left:20px;margin:8px 0 0}li{margin-bottom:7px}.kur{background:#22171a;border:1px solid #6b2b2b;border-radius:12px;padding:13px;margin-top:12px;font-size:14px}</style></head><body><h1>Fix Borsa Sinyal · Durum</h1><div class="a" style="margin:-8px 0 12px">yazılım sürümü <b>'+a+'</b></div>'+c(i,"Bot anahtarı",A.BOT_TOKEN?i?"geçerli · @"+(n||"?"):"TANIMLI AMA GEÇERSİZ — Telegram bu anahtarı tanımıyor. Başına/sonuna tırnak veya boşluk karışmış olabilir.":"BOT_TOKEN tanımlı değil — Settings → Variables kısmından ekle")+c(!!r,"Telegram bağlantısı",r?"bağlı"+(s?" · son hata: "+s:""):"bağlı değil — aşağıdaki Bağla düğmesine bas")+c(e,"Hafıza (üye kayıtları)",e?"bağlı":"BAĞLI DEĞİL — üyeler, davetler ve panel çalışmaz")+c(!!a,"Hisse listeleri",a?"yüklü · "+(o||"")+" · "+new Date(a.guncelleme).toLocaleString("tr-TR"):"henüz yüklenmedi — telefondaki uygulamada Worker adresi <code>"+$.origin+"</code> ve şifre <code>"+l+"</code> yazılı olmalı, sonra <b>TARA VE BULUTA YÜKLE</b>")+'<a class="d" href="/panel?key='+encodeURIComponent(l)+'">🛠 Yönetici panelini aç</a><div class="a" style="margin-top:8px">Panel bir <b>web sayfası</b>, Telegram\'da değil. Telegram\'da botun menüsünde de <b>🛠 Yönetici paneli</b> düğmesi var (sadece sen görürsün) ya da bota <code>/panel</code> yazabilirsin — ikisi de bu sayfayı açar. Bu adresi telefonun ana ekranına kısayol olarak eklemen en pratiği.</div>'+(r&&i&&!s?"":'<a class="d ikinci" href="/setup">🔗 Telegram\'a bağla</a>')+'<div style="margin-top:16px" class="a">Telefondaki uygulamaya yazacakların:<br>Worker adresi: <code>'+$.origin+"</code><br>Şifre: <code>"+l+"</code></div>"+(e?"":'<div class="kur"><b>⚠️ Hafıza bağlı değil — nasıl bağlanır</b><div class="a" style="margin:6px 0">Bot listeleri gösterir ama kimin üye olduğunu, kimin kimi davet ettiğini hatırlayamaz. Panel de boş kalır. Bir kez yapılır, 2 dakika sürer:</div><ol><li>Cloudflare panelinde soldaki menüden <b>Storage &amp; Databases</b> → <b>KV</b>.</li><li><b>Create a namespace</b> / <b>Oluştur</b>. Adına <code>fixborsa</code> yaz, kaydet.</li><li>Soldan <b>Compute (Workers)</b> → bu worker\'ı aç → <b>Settings</b> → <b>Bindings</b>.</li><li><b>Add binding</b> → <b>KV namespace</b> seç.</li><li><b>Variable name</b> kutusuna tam olarak <code>VERI</code> yaz (büyük harf, Türkçe İ değil düz I).</li><li><b>KV namespace</b> kutusundan az önce oluşturduğun <code>fixborsa</code>\'ı seç ve <b>Deploy</b>.</li><li>Bu sayfayı yenile — burası ✅ olacak.</li></ol></div>')+"</body></html>"
;return new Response(d,{headers:{"content-type":"text/html; charset=utf-8"}})}}};
/* Tüm istekler bu kapıdan geçer: beklenmeyen bir hata çıkarsa artık sessizce
   kaybolmuyor, 🩺 Hatalar sekmesine düşüyor. Davranış değişmiyor — hata
   yoksa hiçbir ek iş yapılmıyor. */
export default{
/* ⏰ GERÇEK CRON — ROOT-CAUSE ÇÖZÜM (2026-08-26)
   19 aydır çözülemeyen sorunun kökü: bu worker'da native bir zamanlayıcı
   HİÇ yoktu (bkz. yukarıdaki eski not: "Bu worker'da native bir cron yok").
   Hisse Taraması (malboğa: mal/dip/bölge/enerji/ab modülleri + bu
   modüllere kurulan kişisel filtre alarmları) o havuzu YALNIZ İKİ yoldan
   dolduruyordu:
     1) Mini App açıkken tarayıcıdaki mbTazelemeKur() döngüsü (sekmeye
        girince başlar, sekmeden çıkınca / uygulama kapanınca JS durur,
        döngü de durur — Telegram kapatılınca bu yol tamamen ölür).
     2) tara.py'nin her 8 dakikada bir vurduğu /push isteği içindeki
        mbAlarmOncelikliTara() — ama bu, HER 8 DAKİKADA BİR yalnız TEK bir
        zaman diliminden küçük bir parti (8-60 hisse) ilerletiyor. Evren
        400+ hisseyse bir dilimin baştan sona tazelenmesi saatler
        sürebiliyor; kullanıcı uygulamayı kapattığı an alarm pratikte
        durma noktasına geliyordu. Bu davranış "arada bir tazeleniyor"
        gibi görünüp aslında neredeyse hiç ilerlemediği için hata
        19 ay boyunca "bulunamadı" — aslında hep oradaydı, sadece kanıtı
        (Cloudflare Cron Trigger paneli) hiç açılmamıştı.
   ÇÖZÜM: Cloudflare Workers'ın kendi native "Cron Trigger" özelliği
   kullanılıyor. Bu, tara.py'den, Telegram'dan, mini app'ten TAMAMEN
   BAĞIMSIZ çalışır — Cloudflare'in kendi sunucuları saati geldiğinde
   worker'ı tetikler, sen telefonu kapatsan da, tara.py dursa da çalışır.
   KURULUM (bir kez, ~30 saniye):
     Cloudflare panelinde bu worker'ı aç → Settings → Triggers →
     Cron Triggers → Add Cron Trigger → şu ifadeyi yaz: * * * * *
     (Cloudflare'in izin verdiği en sık aralık budur: HER DAKİKA.)
     Kaydet — kod tarafında başka hiçbir şey yapmana gerek yok, aşağıdaki
     scheduled() bunu otomatik yakalayacak.
   Bu değişiklik mevcut hiçbir davranışı bozmaz: fetch() ve /push akışı
   birebir aynı kalıyor, yalnız YENİ bir giriş noktası (scheduled)
   ekleniyor. */
async scheduled(ev,A,ctx){
  ORTAM=A;
  if(A&&A.ADMIN_IDS)try{EK_YON=new Set(String(A.ADMIN_IDS).split(",").map(x=>x.trim()).filter(Boolean))}catch(_){}
  ctx.waitUntil((async()=>{
    try{
      /* Aynı dakikada dilimi iki kez ilerlet: 8 dakikada 1 parti yerine
         dakikada 2 parti — havuzun tamamı artık dakikalar içinde,
         saatler değil, tazelenir. Kilit mekanizması /push ile çakışmayı
         zaten engelliyor (bellekKilitAl aynı isim üzerinden). */
      await kilitli(A,"mbDilim",50,()=>mbAlarmOncelikliTara(A)).catch(()=>{});
      await kilitli(A,"mbDilim",50,()=>mbAlarmOncelikliTara(A)).catch(()=>{});
      /* Taze ölçümü hemen süz ve kurulu her alarma yeni girenleri gönder. */
      await kilitli(A,"mbAlarm",50,()=>mbAlarmTara(A)).catch(()=>{});
    }catch(err){
      try{await hataYaz(A,"scheduled",err,null)}catch(e){}
    }
  })());
},
async fetch(p,A,q){
try{return await _ANA.fetch(p,A,q)}
catch(err){
try{q.waitUntil(hataYaz(A,"fetch",err,p))}catch(e){await hataYaz(A,"fetch",err,p).catch(()=>{})}
/* ⚠️ CORS BAŞLIĞI EKSİKTİ — VE BU, HATAYI GİZLİYORDU.
   Worker içeride patladığında (bugünkü örnek: KV günlük yazma sınırı
   dolunca put() hata fırlatıyor) buradan CORS'suz bir 500 dönüyordu.
   Tarayıcı CORS'suz yanıtı OKUYAMAZ; hata mesajını göremez ve olayı
   "Failed to fetch" diye bildirir. Yani gerçek sebep ("KV put() limit
   exceeded") tarayıcıya hiç ulaşmıyordu — kullanıcı "worker eski ya da
   ulaşılamıyor" sanıyordu, oysa worker ayakta ve cevap veriyordu.
   Artık hata yanıtı da CORS taşıyor ve SEBEBİ içeriyor. */
const mesaj=String((err&&err.message)||err||"bilinmeyen").slice(0,200);
return new Response(JSON.stringify({ok:!1,hata:"sunucu hatası",sebep:mesaj}),
  {status:500,headers:{"content-type":"application/json; charset=utf-8",
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods":"POST, GET, OPTIONS",
    "Access-Control-Allow-Headers":"Content-Type"}})}}};
