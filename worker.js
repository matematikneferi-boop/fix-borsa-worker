const e=new Set(["6819672343"]),t="kolayfix",a="11.7";let n="",i=t;const r=()=>n+"/panel?key="+encodeURIComponent(i),s=(e,a)=>{const n=a.searchParams.get("key")
;return!!n&&(n===(e.PUSH_KEY||t)||n===(e.PANEL_KEY||e.PUSH_KEY||t))},l="https://liste.local/veri";let o=null,oTS=0;const c=new Set(["potansiyel","fibo","uzunvade","haftalik","aday","adayOrta","adayOrtaVade","adayUzun","adayHafta"]),EM=new Set(["menu","davet","bilgi"]),d=t=>e.has(String(t));let BUN=null,KVSON=0
;const DAVET_METIN="📈 Fix Borsa Sinyal botunu kullanıyorum, hisse sinyallerini buradan takip ediyorum. Aşağıdaki bağlantıdan sen de katılabilirsin:"
;async function botAd(e){if(BUN)return BUN;if(e.VERI){const c=await e.VERI.get("botuser");if(c)return BUN=c}if(!e.BOT_TOKEN)return null
;const r=await b(e.BOT_TOKEN,"getMe",{}),u=r&&r.result&&r.result.username;return u?(BUN=u,e.VERI&&await e.VERI.put("botuser",u).catch(()=>{}),u):null}
function u(e){
/* TEK DÜĞME: bütün listeler, adaylar, takip, davet ve yönetici paneli
   artık uygulamanın içinde. Telegram menüsü tek düğmeye indirildi.
   Eski callback'ler yerinde duruyor — geçmiş mesajlardaki düğmeler
   çalışmaya devam etsin diye silinmedi. */
if(n)return{inline_keyboard:[[{text:"📱 UYGULAMAYI AÇ",web_app:{url:n+"/app"}}]]};
const t=[];
/* Dilim adlari KISA / ORTA / UZUN oldu; 1 HAFTA satirlari kaldirildi
   (o dilim artik hic taranmiyor, liste hep bos geliyordu). */
t.push([{text:"🏅 Bu taramanın ilk 3'ü",callback_data:"ilk3"}],
[{text:"📊 KISA · 1 saat",callback_data:"potansiyel"}],[{text:"🟨 KISA adayları (Süper Üyelik)",callback_data:"adayOrta"}],
[{text:"📐 ORTA · 4 saat",callback_data:"fibo"}],[{text:"🟨 ORTA adayları (Süper Üyelik)",callback_data:"adayOrtaVade"}],
[{text:"🗓 UZUN · 1 gün",callback_data:"uzunvade"}],[{text:"🟨 UZUN adayları (Süper Üyelik)",callback_data:"adayUzun"}],
[{text:"⭐ Takip listem",callback_data:"fav"}],[{text:"👑 Anlık uyarı ayarları (Süper Üyelik)",callback_data:"alarm"}],[{text:"ℹ️ Sistem nedir? Nasıl kullanılır?",callback_data:"bilgi"}]);
return d(e)&&(t.push([{text:"🔄 ŞİMDİ TARA VE YÜKLE 🔐",callback_data:"elletara"}]),
t.push([{text:"📋 Ham sonuç metni 🔐",callback_data:"karne"}]),t.push([{text:"🎲 Monte Carlo (deneme) 🔐",callback_data:"mc"}]),n&&t.push([{text:"🛠 Yönetici paneli 🔐",url:r()}])),t.push([BUN?{text:"📤 Sistemi paylaş",url:"https://t.me/share/url?url="+encodeURIComponent("https://t.me/"+BUN+"?start=r"+e)+"&text="+encodeURIComponent(DAVET_METIN)}:{text:"📤 Sistemi paylaş",callback_data:"davet"}]),t.push([{
text:"🔄 Yenile",callback_data:"menu"}]),{inline_keyboard:t}}
const f="👋 <b>Fix Borsa Sinyal</b>\n<i>BIST hisselerini gün boyu tarar, kırılım ve hedefleri gösterir.</i>\n\n🏅 <b>İlk 3</b> — bugün öne çıkan üç hisse\n📊 <b>KISA</b> · 1 saat — hedefi en uzak olanlar\n📐 <b>ORTA</b> · 4 saat — bugün taze kıranlar\n🗓 <b>UZUN</b> · 1 gün — günlük pivot kırılımları\n🪜 <b>Adaylar</b> 👑 — her tarama için henüz kırmadı ama hazır <i>(Süper Üyelik)</i>\n⭐ <b>Takip listem</b> — kendi hisselerin, anlık kâr/zarar\n👑 <b>Anlık uyarı</b> — güçlü bir sinyale giren hisse anında sana gelir <i>(Süper Üyelik)</i>\n\n🔎 <b>Hisse kodunu yaz</b> (örn. <code>THYAO</code>) — yukarı ve aşağı hedeflerini birlikte gönderirim.\n\n🏷️ <code>/surum</code> — yüklü sürümü ve son tarama saatini gösterir\n📃 <code>/sinyal</code> — güncel listeyi <b>mesaj olarak</b> gönderir\n⚡ <code>/canli</code> — sadece bar kapanmadan kırılanlar\n<i>Uygulama açılmıyorsa bu iki komut her zaman çalışır.</i>\n\n📤 <b>Süper Üyelik:</b> her 20 davette 1 ay açılır, davet ettikçe uzar.\n\n🤖 <i>Yapay zekâ tabanlı otomatik tarama · 120.657 bar</i>\n\n<i>⚠️ Yatırım tavsiyesi değildir. Bu sonuçlarla işlem yapmak tehlikelidir; anaparanı kaybedebilirsin.</i>"
/* ══════════════════════════════════════════════════════════════════════════
   🛡 DAYANIKLILIK KATMANI (sürüm 11.6)
   Altı madde buraya toplandı. HİÇBİRİ mevcut davranışı değiştirmez:
   her parça "yoksa serbest bırak" (fail-open) mantığıyla yazıldı, yani
   binding tanımlamazsan / KV yoksa sistem eskisi gibi çalışmaya devam eder.
     1) Cloudflare yerel Rate Limiting binding sarmalayıcısı
     2) Telegram gönderim kovası + 429 retry_after bekleme
     3) KV tabanlı çakışma kilidi (aynı arka plan işi üst üste başlamasın)
     4) Panel anahtarı kaba-kuvvet koruması
     5) KAP çekiminde zaman aşımı + tekrar deneme + sağlık kaydı
     6) KAP çoklu bildirim (fon/pay işlemi) tespiti
   Hepsinin çıktısı 🛡 Sistem sekmesinde görünür — kör nokta kalmasın.
   ══════════════════════════════════════════════════════════════════════ */

/* Ortam (env) referansı: sayaç yazan yardımcıların imzasını değiştirmemek
   için her istekte tazelenir. Aynı isolate içinde geçerlidir. */
let ORTAM=null;

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
if(!n.gunler[i].kayitlar[KK])n.gunler[i].kayitlar[KK]={k:a.kod,g:Number(a.giris),s:Number(a.fiyat)||Number(a.giris),t:a.tfKod||a.tf||"",l:e,h:(a.hedef>0?Number(a.hedef):null),h1:(a.hedef1>0?Number(a.hedef1):null),r:1,max:Number(a.fiyat)||Number(a.giris)}}}
for(const e of Object.keys(n.gunler))for(const t of Object.keys(n.gunler[e].kayitlar)){const kk=n.gunler[e].kayitlar[t],kd=kk.k||String(t).split("@")[0];if(s[kd]>0){kk.s=s[kd];if(!(kk.max>0)||s[kd]>kk.max)kk.max=s[kd]}}
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
;let res;try{res=await fetch(u,{headers:Object.assign({},YF_HEADERS,{"Cache-Control":"no-cache"}),cache:"no-store"})}catch(e){return{hata:"fetch istisnası: "+(e&&e.message||e)}}
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
  tf=mumTfNormal(tf);
  if(tf==="1G"&&p.gunluk)return desenSinirDuzelt(Object.assign({tf:"1G"},p.gunluk));
  if(p.tf===tf&&p.ust&&p.alt)return desenSinirDuzelt({tf:tf,tip:p.tip,yon:p.yon,kalite:p.kalite,ust:p.ust,alt:p.alt,ustUz:p.ustUz,altUz:p.altUz,hedef:p.hedef,grup:p.grup});
  if(Array.isArray(p.dilimler)){
    const d=p.dilimler.find(x=>x&&x.tf===tf);
    if(d)return desenSinirDuzelt(Object.assign({tf:tf,eksikCizgi:!0},d));
  }
  return null;
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
async function yfKapanislar(kod){try{const a=await yfCekTek("query1.finance.yahoo.com",kod);if(a)return a}catch(e){console.error("yfCekTek query1 hata",kod,e&&e.message)}
try{const b=await yfCekTek("query2.finance.yahoo.com",kod);if(b)return b}catch(e){console.error("yfCekTek query2 hata",kod,e&&e.message)}
console.error("yfKapanislar: her iki host de başarısız",kod);return null}
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
const WORKER_SURUM="2026-08-21-a · temel analiz: tüm havuz · süzgeç · şirket karnesi";
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
   🧩 İKİNCİ PAKET (sürüm 11.7) — beş yeni katman
     A) Absorpsiyon / order-flow tespiti (günlük barlardan)
     B) İmzalı, süresi dolan yönetici panel anahtarı + kademeli hız sınırı
     C) KAP bildirimlerini kategoriye ayırma + önem puanı
     D) TEFAS fon akışı (ikinci kaynak — çapraz doğrulama)
     E) KAP'tan kendi kendine büyüyen şirket adı haritası
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
async function absEvren(A,ekKodlar){
  const kodSet=new Set(); const kaynak=[];
  let L=null; try{ L=await g(A) }catch(_){}
  /* 1) sozluk = tarayicinin taradigi TUM havuz */
  try{
    if(L&&L.sozluk&&typeof L.sozluk==="object"){
      let n=0;
      for(const k of Object.keys(L.sozluk)){const c=kodTemiz(k);if(KOD_GECERLI.test(c)){kodSet.add(c);n++}}
      if(n)kaynak.push("sözlük:"+n);
    }
  }catch(_){}
  /* 2) havuz.json */
  if(kodSet.size<100){
    try{const hv=await absHavuzGetir(A);
      if(hv.length){for(const k of hv)kodSet.add(k);kaynak.push("havuz.json:"+hv.length)}}catch(_){}
  }
  /* 3) sektor.json — DOGRU KATMAN: kodlar j.sektor icinde */
  if(kodSet.size<100){
    try{
      const sk=await sektorlariGetir(A);
      const harita=(sk&&sk.sektor&&typeof sk.sektor==="object")?sk.sektor:
                   ((sk&&typeof sk==="object")?sk:null);
      if(harita){
        let n=0;
        for(const k of Object.keys(harita)){const c=kodTemiz(k);if(KOD_GECERLI.test(c)){kodSet.add(c);n++}}
        if(n)kaynak.push("sektör.json:"+n);
      }
    }catch(_){}
  }
  /* 4) sinyal listeleri + favori/portfoy — her hâlükârda eklenir */
  try{
    if(L&&L.kartlar)for(const k of Object.keys(L.kartlar)){
      if("sira"===k||0===k.indexOf("aday"))continue;
      for(const x of(L.kartlar[k]||[]))if(x&&x.kod){const c=kodTemiz(x.kod);if(KOD_GECERLI.test(c))kodSet.add(c)}
    }
  }catch(_){}
  for(const k of(ekKodlar||[])){const c=kodTemiz(k);if(KOD_GECERLI.test(c))kodSet.add(c)}
  const liste=[...kodSet];
  liste.kaynak=kaynak.join(" · ")||"yalnız sinyal listesi";
  return liste;
}
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

/* ---------- C) 🧠 KAP BİLDİRİM SINIFLANDIRMA ----------
   alperaydyn/KAP_Notifications projesindeki fikir: bildirimi sadece iletme,
   NE OLDUĞUNU anla ve önemliyse öne çıkar. Orada makine öğrenmesi var;
   burada kural tabanlı sözlük kullanıyorum — sebebi: Worker'da model
   çalıştıramayız, kurallar şeffaftır (neden bu kategoriye girdiğini
   görebilirsin) ve KAP konu başlıkları zaten standart kalıplarla yazılır.
   ÖNEM PUANI: fiyata etki potansiyeline göre elle verilmiş ağırlık. */
const KAP_KATEGORI=[
  {kod:"geri",  ad:"Pay Geri Alım",      ik:"🔁", onem:90, rx:/GERI ALIM|GERI ALINAN PAY|PAY GERI/},
  {kod:"pay",   ad:"Pay Alım / Satım",   ik:"🔀", onem:85, rx:/PAY ALIM|PAY SATIS|PAY SAHIPLIGI|ORTAKLIK YAPISI|SERMAYEDE PAY/},
  {kod:"birles",ad:"Birleşme / Devralma",ik:"🤝", onem:95, rx:/BIRLESME|DEVRALMA|BOLUNME|SATIN ALINMASI|HISSE DEVRI/},
  {kod:"serm",  ad:"Sermaye Artırımı",   ik:"📈", onem:80, rx:/SERMAYE ARTIRIM|BEDELLI|BEDELSIZ|TAHSISLI|RUCHAN/},
  {kod:"temet", ad:"Temettü",            ik:"💰", onem:75, rx:/KAR PAYI|TEMETTU/},
  {kod:"ihale", ad:"Sözleşme / İhale",   ik:"📝", onem:70, rx:/IHALE|SOZLESME|SIPARIS|ANLASMA|PROTOKOL|IS ALIMI/},
  {kod:"yatir", ad:"Yatırım / Kapasite", ik:"🏭", onem:65, rx:/YATIRIM|KAPASITE|TESIS|FABRIKA|URETIM ARTIS|LISANS/},
  {kod:"finans",ad:"Finansal Rapor",     ik:"📊", onem:60, rx:/FINANSAL RAPOR|FAALIYET RAPORU|BILANCO|KAR ZARAR|BAGIMSIZ DENETIM/},
  {kod:"dava",  ad:"Dava / Ceza",        ik:"⚖️", onem:70, rx:/DAVA|CEZA|SORUSTURMA|ICRA|IFLAS|KONKORDATO|TEDBIR/},
  {kod:"yonet", ad:"Yönetim Değişikliği",ik:"👤", onem:50, rx:/YONETIM KURULU|GENEL MUDUR|ISTIFA|ATAMA|IMZA YETKI/},
  {kod:"genel", ad:"Genel Kurul",        ik:"🏛", onem:45, rx:/GENEL KURUL|ESAS SOZLESME|TADIL/},
  {kod:"diger", ad:"Diğer",              ik:"📄", onem:25, rx:/./}
];
function kapSinifla(konu){
  const t=trSad(konu||"");
  for(const k of KAP_KATEGORI)if(k.rx.test(t))
    return{kod:k.kod,ad:k.ad,ik:k.ik,onem:k.onem};
  const s2=KAP_KATEGORI[KAP_KATEGORI.length-1];
  return{kod:s2.kod,ad:s2.ad,ik:s2.ik,onem:s2.onem};
}
/* Önem puanını bağlamla düzelt: piyasa kapalıyken gelen bildirim daha
   çok dikkat çeker, aynı hisseye gün içinde çoklu bildirim gelmişse önem artar. */
function kapOnemDuzelt(temel,d2,fonSayisi){
  let p=temel;
  const sa=Number(String(d2.publishDate||"").slice(11,13));
  if(sa>=18||sa<9)p+=8;                       /* seans dışı bildirim */
  if(fonSayisi>=2)p+=10;                      /* aynı hisseye çoklu bildirim */
  if(fonSayisi>=4)p+=8;
  return Math.max(0,Math.min(100,Math.round(p)));
}

/* ---------- E) 🏷 ŞİRKET ADI HARİTASI ----------
   pykap'ta hazır paketlenmiş bir BIST şirket listesi var. Onu kopyalamak
   yerine haritayı KAP akışından KENDİMİZ büyütüyoruz: her bildirimde
   hisse kodu ve şirket ünvanı zaten geliyor. Böylece kimsenin verisine
   bağımlı olmuyoruz ve liste hep güncel kalıyor.
   KV YAZMA KORUMASI: en fazla 10 dakikada bir ve sadece YENİ kod
   bulunduğunda yazılır. */
let SIRKET_SON_YAZIM=0;
async function kapSirketGuncelle(A,liste){
  try{
    if(!A||!A.VERI||!liste||!liste.length)return;
    if(Date.now()-SIRKET_SON_YAZIM<6e5)return;
    const ham=await A.VERI.get("kapSirket");
    let m={};try{m=ham?JSON.parse(ham):{}}catch(e){m={}}
    let yeni=0;
    for(const d2 of liste){
      const unvan=String(d2.companyTitle||d2.companyName||"").trim();
      if(!unvan||!d2.relatedStocks)continue;
      for(const kh of String(d2.relatedStocks).split(",")){
        const kod=kh.trim().toUpperCase();
        if(kod&&!m[kod]){m[kod]=unvan.slice(0,60);yeni++}
      }
    }
    if(!yeni)return;
    SIRKET_SON_YAZIM=Date.now();
    await A.VERI.put("kapSirket",JSON.stringify(m));
    saglikSet("sirketSayisi",Object.keys(m).length);
  }catch(e){}
}
async function kapSirketOku(A){
  try{const h=A.VERI&&await A.VERI.get("kapSirket");return h?JSON.parse(h):{}}catch(e){return{}}
}

/* ---------- D) 💵 TEFAS FON AKIŞI (İKİNCİ KAYNAK) ----------
   AMAÇ: KAP "kim pay aldı" der ama sadece eşik aşılınca. TEFAS ise hisse
   fonlarının toplam büyüklüğünü günlük verir — yani paranın borsaya
   girip girmediğini bağımsız bir kaynaktan görürsün.

   ⚠️ DÜRÜST OLMAM GEREKEN İKİ ŞEY:
   1) TEFAS fonların HANGİ HİSSEYİ aldığını AÇIKLAMIYOR. Sadece kategori
      dağılımı ve fon büyüklüğü var. Yani "şu hisseyi fonlar topluyor"
      diyemez; "hisse fonlarına para giriyor/çıkıyor" diyebilir.
   2) Bu uç noktayı buradan test edemedim (geliştirme ortamının ağ erişimi
      kısıtlı). Çalışmazsa sekmede kırmızı uyarı ve ham hata mesajı
      görünür — sessizce yanlış veri GÖSTERMEZ. */
const TEFAS_URL="https://www.tefas.gov.tr/api/DB/BindComparisonFundReturns";
const TEFAS_CACHE_MS=216e5; /* 6 saat */
function tefasTarih(gunOnce){
  const d2=new Date(Date.now()+108e5-(gunOnce||0)*864e5);
  const ik2=n2=>String(n2).padStart(2,"0");
  return ik2(d2.getUTCDate())+"."+ik2(d2.getUTCMonth()+1)+"."+d2.getUTCFullYear();
}
async function tefasCek(){
  const govde=new URLSearchParams({
    calismatipi:"2",fontip:"YAT",sfontur:"",kurucukod:"",fongrup:"HSA",
    bastarih:tefasTarih(7),bittarih:tefasTarih(0),
    fonturkod:"",fonunvantip:"",strperiod:"1,1,1,1,1,1,1",islemdurum:"1"
  }).toString();
  const iptal=new AbortController();
  const zt=setTimeout(()=>{try{iptal.abort()}catch(e){}},9e3);
  try{
    const r=await fetch(TEFAS_URL,{method:"POST",signal:iptal.signal,
      headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent":YF_UA,"Referer":"https://www.tefas.gov.tr/FonKarsilastirma.aspx",
        "X-Requested-With":"XMLHttpRequest"},body:govde});
    clearTimeout(zt);
    if(!r.ok)return{ok:!1,hata:"HTTP "+r.status};
    const j=await r.json().catch(()=>null);
    const dizi=j&&(j.data||j.Data);
    if(!Array.isArray(dizi))return{ok:!1,hata:"beklenmeyen yanıt biçimi"};
    return{ok:!0,dizi:dizi};
  }catch(e){clearTimeout(zt);return{ok:!1,hata:String((e&&e.message)||e).slice(0,140)}}
}
async function tefasOzet(A,zorla){
  if(!zorla&&A.VERI){
    const c=await A.VERI.get("tefas");
    if(c){try{const j=JSON.parse(c);if(Date.now()-j.ts<TEFAS_CACHE_MS)return j}catch(e){}}
  }
  const r=await tefasCek();
  if(!r.ok){saglikArtir("tefasHata");saglikSet("sonTefasHata",r.hata);return{ts:Date.now(),ok:!1,hata:r.hata}}
  /* Alan adları TEFAS tarafında değişebiliyor — birden çok isim deniyoruz. */
  const say=(o,adlar)=>{for(const a2 of adlar){const v=o&&o[a2];if(null!=v&&""!==v&&!isNaN(Number(v)))return Number(v)}return null};
  let toplamDeger=0,toplamKisi=0,fonSayisi=0,getiriTop=0,getiriSay=0;
  for(const f of r.dizi){
    const dg=say(f,["PORTFOYBUYUKLUK","PortfoyBuyukluk","TOPLAMDEGER","FONTOPLAMDEGER"]);
    const ks=say(f,["KISISAYISI","KisiSayisi","YATIRIMCISAYISI"]);
    const gt=say(f,["GETIRIORANI","GetiriOrani","GETIRI"]);
    if(null!=dg)toplamDeger+=dg;
    if(null!=ks)toplamKisi+=ks;
    if(null!=gt){getiriTop+=gt;getiriSay++}
    fonSayisi++;
  }
  const paket={ts:Date.now(),ok:!0,fonSayisi:fonSayisi,toplamDeger:toplamDeger,
    toplamKisi:toplamKisi,ortGetiri:getiriSay?Math.round(100*getiriTop/getiriSay)/100:null};
  /* Bir önceki ölçümle karşılaştır: asıl bilgi DEĞİŞİM. */
  if(A.VERI){
    try{
      const eskiHam=await A.VERI.get("tefasOnceki");
      if(eskiHam){const e2=JSON.parse(eskiHam);
        if(e2.toplamDeger>0)paket.degerDegisim=Math.round(1e4*(paket.toplamDeger/e2.toplamDeger-1))/100;
        if(e2.toplamKisi>0)paket.kisiDegisim=Math.round(1e4*(paket.toplamKisi/e2.toplamKisi-1))/100;
        paket.oncekiTs=e2.ts;
      }
      /* Günde bir kez referans noktasını güncelle (KV yazma dostu). */
      if(!eskiHam||Date.now()-JSON.parse(eskiHam).ts>828e5)
        await A.VERI.put("tefasOnceki",JSON.stringify({ts:Date.now(),toplamDeger:paket.toplamDeger,toplamKisi:paket.toplamKisi}));
      await A.VERI.put("tefas",JSON.stringify(paket));
    }catch(e){}
  }
  saglikArtir("tefasCagri");
  return paket;
}

/* ============ 📰 KAP ANLIK BİLDİRİM ============
   kap.org.tr resmi/belgeli bir dış geliştirici API'si sunmuyor, ama sitenin
   kendi Next.js uygulamasının kullandığı uç nokta kimlik doğrulama istemiyor
   ve herkese açık veridir (KAP'ın kendi mevzuat amacı zaten "kamuya açıklama").
   KIRILGAN: KAP bu uç noktayı habersiz değiştirebilir/kapatabilir — bu yüzden
   her adım try/catch içinde, hata durumunda sessizce vazgeçer, botun geri
   kalanını asla etkilemez. */
const KAP_API="https://www.kap.org.tr/tr/api/disclosure/members/byCriteria";
const KAP_POLL_MS=175000;
/* 5️⃣ KAP ÇEKİMİ — ZAMAN AŞIMI + TEKRAR DENEME + SAĞLIK KAYDI
   pykap / kap-tr-sdk gibi olgun istemcilerin yaptığı üç şeyi ekledik:
   (a) istek asılı kalmasın diye zaman aşımı, (b) tek seferlik ağ hatasında
   pes etmeyip bir kez daha deneme, (c) "en son ne zaman veri gelebildi"
   kaydı. Eskiden KAP sessizce boş dönünce KAP sekmesi boş kalıyordu ve
   sebebini anlamanın yolu yoktu; artık 🛡 Sistem sekmesinde görünüyor.
   İmza aynı: kapBildirimleriGetir(gunSayisi) — tüm eski çağrılar çalışır.
   İsteğe bağlı ikinci parametre: {konular:[...]} → KAP subjectList filtresi. */
const KAP_ZAMAN_ASIMI_MS=9e3;
async function kapSaglikYaz(A,alan,deger){
  try{
    if(!A||!A.VERI)return;
    const ham=await A.VERI.get("kapSaglik");
    let v={};try{v=ham?JSON.parse(ham):{}}catch(e){v={}}
    v[alan]=deger;v.yazim=Math.floor(Date.now()/1e3);
    await A.VERI.put("kapSaglik",JSON.stringify(v));
  }catch(e){}
}
let KAP_SON_BASARI=0,KAP_ARDISIK_HATA=0,KAP_SON_HATA="";
async function kapBildirimleriGetir(gunSayisi,secenek){
  const simdi=new Date(Date.now()+108e5),bas=new Date(simdi.getTime()-gunSayisi*864e5),
        fmt=d=>d.toISOString().slice(0,10),
        govde=JSON.stringify({fromDate:fmt(bas),toDate:fmt(simdi),mkkMemberOidList:[],
          subjectList:(secenek&&secenek.konular)||[]});
  for(let deneme=0;deneme<2;deneme++){
    const iptal=new AbortController();
    const zamanlayici=setTimeout(()=>{try{iptal.abort()}catch(e){}},KAP_ZAMAN_ASIMI_MS);
    try{
      const r=await fetch(KAP_API,{method:"POST",signal:iptal.signal,
        headers:{"Content-Type":"application/json","Referer":"https://www.kap.org.tr/tr/bildirim-sorgu","User-Agent":YF_UA},
        body:govde});
      clearTimeout(zamanlayici);
      if(!r.ok){
        KAP_SON_HATA="HTTP "+r.status;
        if(r.status>=500&&0===deneme){await gecikmeli(600);continue}
        KAP_ARDISIK_HATA++;saglikArtir("kapHata");
        kapSaglikYaz(ORTAM,"sonHata",KAP_SON_HATA);return[];
      }
      const j=await r.json().catch(()=>null);
      if(!Array.isArray(j)){
        KAP_SON_HATA="beklenmeyen yanıt (JSON dizi değil)";KAP_ARDISIK_HATA++;saglikArtir("kapHata");
        kapSaglikYaz(ORTAM,"sonHata",KAP_SON_HATA);return[];
      }
      KAP_SON_BASARI=Math.floor(Date.now()/1e3);KAP_ARDISIK_HATA=0;KAP_SON_HATA="";
      saglikArtir("kapCagri");saglikSet("sonKapBasari",KAP_SON_BASARI);
      return j;
    }catch(err){
      clearTimeout(zamanlayici);
      KAP_SON_HATA=String((err&&err.message)||err||"?").slice(0,120);
      if(0===deneme){await gecikmeli(600);continue}
      KAP_ARDISIK_HATA++;saglikArtir("kapHata");
      kapSaglikYaz(ORTAM,"sonHata",KAP_SON_HATA);
      return[];
    }
  }
  return[];
}

/* 6️⃣ ÇOKLU BİLDİRİM (FON / PAY İŞLEMİ) TESPİTİ
   kap-notifier'ın mantığı: bildirimi sadece iletme — SAY ve tekrarı yakala.
   Aynı hisse için gün içinde birden fazla "pay alım/satım, geri alım,
   ortaklık yapısı" bildirimi çıkması kurumsal/fon hareketinin en ucuz
   göstergesidir. Burada sadece SAYIYORUZ ve 🛡 Sistem sekmesinde
   gösteriyoruz — kimseye ekstra mesaj gitmiyor, yani spam riski yok. */
const FON_KONU_RX=/(PAY ALIM|PAY SATIS|PAY GERI ALIM|GERI ALIM|ORTAKLIK YAPISI|PAY SAHIPLIGI|SERMAYEDE PAY|ONEMLI NITELIKTE|BIRLESME|DEVRALMA|BEDELLI|TAHSISLI)/;
async function kapFonIzle(A,yeniBildirimler){
  try{
    if(!A||!A.VERI||!yeniBildirimler||!yeniBildirimler.length)return;
    const bugun=onayDonemi();
    const ham=await A.VERI.get("kapFon");
    let v={};try{v=ham?JSON.parse(ham):{}}catch(e){v={}}
    if(v.gun!==bugun)v={gun:bugun,hisseler:{}};
    v.hisseler=v.hisseler||{};
    let degisti=!1;
    for(const d of yeniBildirimler){
      if(!d||!d.relatedStocks||!d.subject)continue;
      if(!FON_KONU_RX.test(trSad(d.subject)))continue;
      for(const kodHam of String(d.relatedStocks).split(",")){
        const kod=kodHam.trim().toUpperCase();if(!kod)continue;
        const h=v.hisseler[kod]||(v.hisseler[kod]={n:0,konular:[],son:0});
        h.n++;h.son=Math.floor(Date.now()/1e3);
        const kisa=String(d.subject).slice(0,60);
        if(h.konular.indexOf(kisa)<0)h.konular=h.konular.concat([kisa]).slice(-4);
        degisti=!0;
      }
    }
    if(!degisti)return;
    /* En çok bildirim alan 25 hisse yeter — KV kaydı şişmesin. */
    const sirali=Object.keys(v.hisseler).sort((x,y)=>v.hisseler[y].n-v.hisseler[x].n).slice(0,25);
    const yeni={};for(const k of sirali)yeni[k]=v.hisseler[k];
    v.hisseler=yeni;
    await A.VERI.put("kapFon",JSON.stringify(v));
    saglikArtir("fonKaydi");
  }catch(e){}
}
/* İzlenen kod → uid eşlemesi: ⭐ takip listesi + 💼 portföy birleşimi (union).
   fav:/portfoy: KV'lerini olduğu gibi okuyor — yeni bir yapı eklenmedi. */
async function kapIzleyicileriGetir(e){
if(!e.VERI)return{};const out={};
for(const pre of["fav:","portfoy:"]){let cursor=void 0;
for(;;){const liste=await e.VERI.list({prefix:pre,limit:1e3,cursor});
for(const k of liste.keys){const uid=k.name.slice(pre.length),v=await e.VERI.get(k.name);if(!v)continue;
try{const veri=JSON.parse(v),kodlar=pre==="fav:"?veri:Object.keys(veri||{});
if(kodlar&&kodlar.length){out[uid]=out[uid]||new Set();kodlar.forEach(k2=>out[uid].add(String(k2)))}}catch(err){}}
if(liste.list_complete||!liste.cursor)break;cursor=liste.cursor}}
return out}
async function kapKontrolVeGonder(e){
if(!e.VERI||!e.BOT_TOKEN)return;
const simdi=Date.now(),sonKontrol=await e.VERI.get("kapSonKontrol");
if(sonKontrol&&simdi-Number(sonKontrol)<KAP_POLL_MS)return;
await e.VERI.put("kapSonKontrol",String(simdi));
const liste=await kapBildirimleriGetir(1);if(!liste.length)return;
let maxIndex=0;for(const d of liste)if(d.disclosureIndex>maxIndex)maxIndex=d.disclosureIndex;
const sonIndexStr=await e.VERI.get("kapSonIndex"),sonIndex=sonIndexStr?Number(sonIndexStr):0;
await e.VERI.put("kapSonIndex",String(maxIndex));
if(!sonIndex)return;
const yeni=liste.filter(d=>d.disclosureIndex>sonIndex&&d.relatedStocks);if(!yeni.length)return;
/* 6️⃣ Fon/pay işlemi sayacı — izleyici olsun olmasın her zaman işler. */
await kapFonIzle(e,yeni).catch(()=>{});
await kapSirketGuncelle(e,liste).catch(()=>{});
const izleyiciler=await kapIzleyicileriGetir(e);if(!Object.keys(izleyiciler).length)return;
for(const d of yeni.slice(0,20)){
const kodlar=String(d.relatedStocks).split(",").map(x=>x.trim()).filter(Boolean);if(!kodlar.length)continue;
const aliciSet=new Set();
for(const uid of Object.keys(izleyiciler))if(kodlar.some(k=>izleyiciler[uid].has(k)))aliciSet.add(uid);
if(!aliciSet.size)continue;
const metin="📰 <b>KAP BİLDİRİMİ</b>\n\n🏷 <b>"+kodlar.join(", ")+"</b>\n📋 "+(d.subject||"Bildirim")+"\n🕐 "+(d.publishDate||"")+"\n\n🔗 https://www.kap.org.tr/tr/Bildirim/"+d.disclosureIndex+"\n\n<i>⚠️ Yatırım tavsiyesi değildir.</i>";
let i=0;for(const uid of aliciSet){if(i++>=40)break;await b(e.BOT_TOKEN,"sendMessage",{chat_id:uid,parse_mode:"HTML",disable_web_page_preview:!0,text:metin}).catch(()=>{})}}}
/* ============ 💰 TEMETTÜ TAKVİMİ ============
   bilancoveri.com'un temettü sayfası için JSON API'si yok, sadece HTML var.
   Daha sağlam bir yol: aynı doğrulanmış KAP uç noktasını "Kar Payı Dağıtım
   İşlemlerine İlişkin Bildirim" konu filtresiyle kullanmak — bilinen, gerçek
   bir KAP disclosure subject'i. NOT: Bu, "kâr payı dağıtım KARARI açıklandı"
   bildirimlerini gösterir; KAP'ın temel API'si ödeme tarihini yapılandırılmış
   alan olarak vermiyor (o bilgi bildirimin PDF/tablo ekinde) — o yüzden
   "kesin ödeme tarihi" değil "yeni temettü kararı" habercisi olarak çalışır. */
const TEMETTU_KONU="Kar Payı Dağıtım";
const TEMETTU_POLL_MS=18e5;
async function temettuTakvimiGetir(gunSayisi){
const liste=await kapBildirimleriGetir(gunSayisi||30);
return liste.filter(d=>d.subject&&trSad(d.subject).indexOf("KAR PAYI DAGITIM")>=0&&d.relatedStocks)
.map(d=>({kod:String(d.relatedStocks).split(",")[0].trim().toUpperCase(),tarih:(d.publishDate||"").slice(0,10),disclosureIndex:d.disclosureIndex,konu:d.subject}))}
async function temettuKontrolVeGonder(e){
if(!e.VERI||!e.BOT_TOKEN)return;
const simdi=Date.now(),sonKontrol=await e.VERI.get("temettuSonKontrol");
if(sonKontrol&&simdi-Number(sonKontrol)<TEMETTU_POLL_MS)return;
await e.VERI.put("temettuSonKontrol",String(simdi));
const liste=await temettuTakvimiGetir(3);if(!liste.length)return;
const bilinenStr=await e.VERI.get("temettuBilinen"),bilinen=new Set(bilinenStr?JSON.parse(bilinenStr):[]),ilkCalisma=!bilinenStr;
const yeni=liste.filter(x=>!bilinen.has(x.kod+":"+x.disclosureIndex));
liste.forEach(x=>bilinen.add(x.kod+":"+x.disclosureIndex));
await e.VERI.put("temettuBilinen",JSON.stringify([...bilinen].slice(-1000)));
if(ilkCalisma||!yeni.length)return;
const izleyiciler=await kapIzleyicileriGetir(e);if(!Object.keys(izleyiciler).length)return;
for(const x of yeni.slice(0,20)){
const aliciSet=new Set();
for(const uid of Object.keys(izleyiciler))if(izleyiciler[uid].has(x.kod))aliciSet.add(uid);
if(!aliciSet.size)continue;
const metin="💰 <b>TEMETTÜ HABERİ</b>\n\n🏷 <b>"+x.kod+"</b>\n📅 "+x.tarih+"\n📋 "+x.konu+"\n\n🔗 https://www.kap.org.tr/tr/Bildirim/"+x.disclosureIndex+"\n\n<i>⚠️ Yatırım tavsiyesi değildir. Kesin ödeme tarihi/tutarı için KAP bildirimindeki tabloyu kontrol edin.</i>";
let i=0;for(const uid of aliciSet){if(i++>=40)break;await b(e.BOT_TOKEN,"sendMessage",{chat_id:uid,parse_mode:"HTML",disable_web_page_preview:!0,text:metin}).catch(()=>{})}}}
/* Mini App'in 📰 KAP / 💰 Temettü sekmeleri için kısa süreli KV önbellek —
   push ile gelen arka plan kontrolünden BAĞIMSIZ: kullanıcı sekmeyi her
   açtığında KAP'ı yeniden çekmesin diye. */
async function kapListesiCache(e){
const c=e.VERI&&await e.VERI.get("kapCache");
if(c){try{const j=JSON.parse(c);if(Date.now()-j.ts<3e5)return j.liste}catch(err){}}
const liste=await kapBildirimleriGetir(3);
if(e.VERI&&liste.length)await e.VERI.put("kapCache",JSON.stringify({ts:Date.now(),liste:liste.slice(0,200)}));
/* E) Sirket adi haritasini bu akistan besle (en fazla 10 dk'da bir yazar). */
await kapSirketGuncelle(e,liste).catch(()=>{});
return liste}
/* ============ 💰 GERÇEK ÖDEME TARİHLİ TEMETTÜ TAKVİMİ (v3) ============
   ahlatciyatirim.com.tr denendi, Cloudflare'dan HTTP 525 (origin TLS
   handshake hatası) döndü — o siteye Worker'dan erişilemiyor, bu benim
   kontrolümde değil, terk edildi.
   Gerçek kaynak: KAP'ın KENDİ bildirim DETAY sayfası. KAP'ın liste API'si
   (byCriteria) ödeme tarihini vermiyor ama her "Kar Payı Dağıtım" bildiriminin
   DETAY sayfasında (kap.org.tr/tr/Bildirim/{id}) sunucu tarafında render
   edilmiş "Kar Payı Ödeme Tarihleri" tablosu var — "Ödeme Tarihi (3)" sütunu
   gerçek ödeme tarihi. Bu domain zaten kapBildirimleriGetir() ile çalışıyor,
   yeni bir dış siteye bağımlılık yok. */
const KAP_DETAY_HEADERS={"User-Agent":YF_UA,"Referer":"https://www.kap.org.tr/tr/bildirim-sorgu","Accept":"text/html,application/xhtml+xml"};
function stripEtiket(h){return String(h||"").replace(/<[^>]*>/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g," ").trim()}
function trNoktaTarihToISO(s){const m=String(s||"").trim().match(/(\d{2})\.(\d{2})\.(\d{4})/);
if(!m)return null;return m[3]+"-"+m[2]+"-"+m[1]}
/* "Kar Payı Ödeme Tarihleri" tablosunu bul: 5'li hücre grupları
   [Ödeme yöntemi, Teklif(1), Kesinleşen(2), Ödeme Tarihi(3), Kayıt Tarihi(4)].
   Taksitli ödemelerde birden fazla satır olabilir — en ileri (son) ödeme
   tarihini esas alıyoruz. */
function kapOdemeTarihiCikar(html){
const i=html.indexOf("Kar Payı Ödeme Tarihleri");
if(i<0)return null;
const j=html.indexOf("Nakit Kar Payı Ödeme Zaman Aralığı",i);
const parca=html.slice(i,j>i?j:i+5000);
const hucreler=(parca.match(/<td[\s\S]*?<\/td>/g)||[]).map(stripEtiket);
let en=null;
for(let k=0;k+4<hucreler.length;k+=5){
const iso=trNoktaTarihToISO(hucreler[k+3]);
if(iso&&(!en||iso>en.iso))en={iso:iso,ham:hucreler[k+3],hakKazanmaHam:hucreler[k+2],hakKazanmaISO:trNoktaTarihToISO(hucreler[k+2])}}
return en}
async function kapBildirimDetayGetir(disclosureIndex){
try{
const r=await fetch("https://www.kap.org.tr/tr/Bildirim/"+disclosureIndex,{headers:KAP_DETAY_HEADERS});
if(!r.ok)return null;
return kapOdemeTarihiCikar(await r.text())
}catch(err){return null}}
async function gecikmeli(ms){return new Promise(res=>setTimeout(res,ms))}
/* Türkçe karakter/case farklarına (â/a, büyük-küçük harf) karşı dayanıklı
   karşılaştırma — KAP'ın subject metni bazen "Kâr" bazen "Kar" olarak
   dönebiliyor, ham metin karşılaştırması kırılgan. */
function trSad(s){return String(s||"").toUpperCase().replace(/İ/g,"I").replace(/Â/g,"A").replace(/Ş/g,"S").replace(/Ğ/g,"G").replace(/Ü/g,"U").replace(/Ö/g,"O").replace(/Ç/g,"C")}
/* KAP'ın byCriteria API'si 2000 kayıtta kesiliyor (resmi limit) — 50 günlük
   TEK istek, hiç ilgisi olmayan binlerce bildirimle (finansal rapor, KGK
   uyum formu vb.) bu tavana çarpıp temettü bildirimlerine hiç sıra
   bırakmıyor. Çözüm: 50 günü 6'şar günlük küçük pencerelere bölüp ayrı ayrı
   istemek — her pencere tavana çarpma riski taşımıyor. */
/* Tek bir [bas,ucIleri) penceresini ister; 2000 tavanına çarparsa (eskiden
   sadece UYARI verip verinin bir kısmını SESSİZCE KAYBEDİYORDUK — asıl "0 aday"
   hatasının kaynağı muhtemelen buydu: yoğun günlerde (çeyrek rapor sezonu vb.)
   6 günlük pencere bile 2000'i aşıyor ve kesilen kısımda kâr payı bildirimleri
   kalabiliyordu) artık pencereyi ikiye bölüp HER İKİ YARIYI DA ayrı ayrı ister,
   1 güne inene kadar rekürsif olarak devam eder. Böylece veri kaybı olmaz. */
async function kapTekPencereGetir(bas,ucIleri,tani,derinlik){
const fmt=d=>d.toISOString().slice(0,10);
try{
const r=await fetch(KAP_API,{method:"POST",headers:{"Content-Type":"application/json","Referer":"https://www.kap.org.tr/tr/bildirim-sorgu","User-Agent":YF_UA},body:JSON.stringify({fromDate:fmt(bas),toDate:fmt(ucIleri),mkkMemberOidList:[],subjectList:[]})});
if(!r.ok){tani.push("pencere "+fmt(bas)+".."+fmt(ucIleri)+": HTTP "+r.status);return[]}
const j=await r.json().catch(()=>null);
if(!Array.isArray(j))return[];
const gunFarki=Math.round((ucIleri-bas)/864e5);
if(j.length>=2000&&gunFarki>1&&derinlik<6){
const orta=new Date(bas.getTime()+Math.floor(gunFarki/2)*864e5);
tani.push("bilgi: pencere "+fmt(bas)+".."+fmt(ucIleri)+" 2000 tavanına çarptı → "+fmt(bas)+".."+fmt(orta)+" ve "+fmt(orta)+".."+fmt(ucIleri)+" olarak ikiye bölünüp yeniden istendi (veri kaybı yok)");
await gecikmeli(200);
const sol=await kapTekPencereGetir(bas,orta,tani,derinlik+1);
const sag=await kapTekPencereGetir(orta,ucIleri,tani,derinlik+1);
return sol.concat(sag)}
if(j.length>=2000)tani.push("uyarı: pencere "+fmt(bas)+".."+fmt(ucIleri)+" 2000 tavanına çarptı ve 1 güne inildiği için daha fazla bölünemedi — bu tek günde gerçekten 2000+ bildirim var demektir");
return j
}catch(err){tani.push("pencere istisnası: "+String(err&&err.message||err));return[]}}
async function kapBildirimleriPencereli(toplamGun,pencereGun,tani){
const tumuMap=new Map();
const simdiTR=new Date(Date.now()+108e5);
let ucIleri=simdiTR,kalan=toplamGun,pencereSayisi=0;
while(kalan>0){
const bu=Math.min(pencereGun,kalan);
const bas=new Date(ucIleri.getTime()-bu*864e5);
const parca=await kapTekPencereGetir(bas,ucIleri,tani,0);
/* disclosureIndex'e göre tekilleştir: bölünen pencerelerin sınır günleri
   veya art arda pencereler aynı kaydı iki kez getirmiş olabilir. */
for(const d of parca)if(d&&d.disclosureIndex!=null)tumuMap.set(d.disclosureIndex,d);
ucIleri=bas;kalan-=bu;pencereSayisi++;
if(pencereSayisi%3===0)await gecikmeli(250)}
return[...tumuMap.values()]}
async function temettuTakvimiGercekGetir(tani){
/* ESKİ HATA: pencere yalnız SON 50 GÜNdü. BIST'te "Kar Payı Dağıtım
   İşlemlerine İlişkin Bildirim" duyuruları çoğunlukla Mart–Temmuz genel
   kurul sezonunda çıkıyor; Ağustos ortası gibi sezon dışı bir tarihte son
   50 günde GERÇEKTEN sıfır yeni duyuru olabiliyor (12k+ bildirim arasında
   temettüyle hiç ilgisi olmayanlar dahil) — bu "hata" değil, "şu an yok"
   durumuydu ama arayüzde hata gibi görünüyordu. Pencere 100 güne çıkarıldı
   ki sezonun kuyruğundaki (ödeme tarihi hâlâ ileride olan) duyurular da
   yakalansın. */
const TEMETTU_GUN=100;
const ham=await kapBildirimleriPencereli(TEMETTU_GUN,6,tani);
tani.push(ham.length+" ham KAP bildirimi (son "+TEMETTU_GUN+" gün, tekilleştirilmiş, filtresiz)");
if(ham.length)tani.push("örnek subject alanları: "+ham.slice(0,5).map(d=>JSON.stringify(d.subject)).join(" | "));
const map1=d=>({kod:String(d.relatedStocks).split(",")[0].trim().toUpperCase(),tarih:(d.publishDate||"").slice(0,10),disclosureIndex:d.disclosureIndex,konu:d.subject});
let adaylar=ham.filter(d=>d.subject&&trSad(d.subject).indexOf("KAR PAYI DAGITIM")>=0&&d.relatedStocks).map(map1);
/* Birincil filtre 0 sonuç verirse (KAP subject metnini sessizce değiştirmiş
   olabilir, ya da 2000-tavanı geçmişte veriyi kırpmış olabilir) daha geniş
   bir ikinci filtreyle tekrar dene: "KAR PAYI" veya "TEMETTU" geçen HERHANGİ
   bir subject. Bu, kesin isabeti biraz düşürür ama sıfır sonuç görme riskini
   ortadan kaldırır; TANI'ya hangi filtrenin kullanıldığı açıkça yazılır. */
if(!adaylar.length){
const genis=ham.filter(d=>d.subject&&d.relatedStocks&&/KAR PAYI|TEMETTU/.test(trSad(d.subject))).map(map1);
if(genis.length){tani.push("not: birincil 'KAR PAYI DAGITIM' filtresi 0 sonuç verdi → geniş 'KAR PAYI / TEMETTU' filtresine düşüldü");adaylar=genis}}
tani.push(adaylar.length+" aday KAP bildirimi (subject filtre, Türkçe-toleranslı)");
/* aynı hisse için birden fazla bildirim varsa (teklif → kesinleşen gibi)
   en yeni disclosureIndex'i (en güncel bildirim) esas al */
const sonBildirim={};
for(const x of adaylar)if(!sonBildirim[x.kod]||Number(x.disclosureIndex)>Number(sonBildirim[x.kod].disclosureIndex))sonBildirim[x.kod]=x;
const hedefler=Object.values(sonBildirim).slice(0,30);
tani.push(hedefler.length+" farklı hisse için detay sayfası çekilecek");
const bugunISO=new Date().toISOString().slice(0,10);
const sonuc=[];
let i=0,basarisiz=0;
for(const x of hedefler){
i++;
const detay=await kapBildirimDetayGetir(x.disclosureIndex);
if(!detay){basarisiz++;continue}
if(detay.iso&&detay.iso>=bugunISO)
sonuc.push({kod:x.kod,odemeTarihi:detay.ham,odemeTarihiISO:detay.iso,hakKazanma:detay.hakKazanmaHam||"",disclosureIndex:x.disclosureIndex,konu:x.konu});
if(i%4===0)await gecikmeli(300)}
tani.push(hedefler.length-basarisiz+" detay OK, "+basarisiz+" detay başarısız, "+sonuc.length+" ileri tarihli ödeme");
sonuc.sort((a,b)=>a.odemeTarihiISO<b.odemeTarihiISO?-1:1);
return sonuc}
async function temettuListesiCache(e){
const c=e.VERI&&await e.VERI.get("temettuCacheV3");
if(c){try{const j=JSON.parse(c);if(Date.now()-j.ts<18e5)return{liste:j.liste,tani:["v3 kv cache"]}}catch(err){}}
const tani=[];
let liste=[];
try{liste=await temettuTakvimiGercekGetir(tani)}catch(err){tani.push("genel istisna: "+String(err&&err.message||err))}
if(liste.length){if(e.VERI)await e.VERI.put("temettuCacheV3",JSON.stringify({ts:Date.now(),liste:liste.slice(0,150)}));return{liste:liste,tani:tani}}
if(e.VERI)await e.VERI.put("temettuSonHata",JSON.stringify({ts:Date.now(),tani:tani})).catch(()=>{});
/* Detay sayfaları erişilemezse (KAP WAF/yoğunluk) eski duyuru listesine düş. */
const eskiC=e.VERI&&await e.VERI.get("temettuCache");
if(eskiC){try{const j=JSON.parse(eskiC);if(Date.now()-j.ts<18e5)return{liste:j.liste,tani:tani.concat(["eski kv cache"])}}catch(err){}}
let eski=[];try{eski=await temettuTakvimiGetir(90)}catch(err){tani.push("eski KAP istisnası: "+String(err&&err.message||err))}
if(e.VERI&&eski.length)await e.VERI.put("temettuCache",JSON.stringify({ts:Date.now(),liste:eski.slice(0,150)}));
return{liste:eski,tani:tani}}
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
;async function N(e,t){if(!t&&v&&Date.now()-R<6e4)return v;if(!e.VERI)return v=[],R=Date.now(),v;const a=await e.VERI.get("engel");return v=a?JSON.parse(a):[],R=Date.now(),v}async function B(e,t){
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
;null!==i&&(n+=(i>=0?"🟢":"🔴")+" Sinyalden bu yana: <b>"+(i>=0?"+":"")+i.toFixed(2)+"%</b>\n"),null!=e.tetik&&(n+="🔓 Tetik <b>"+a(e.tetik)+"</b>"+(null!=e.tetikYuzde?"  ·  "+(e.tetikYuzde>=0?"+":"")+Number(e.tetikYuzde).toFixed(1)+"% kaldı":"")+"\n"),null!=e.hedef1&&(n+="🧱 Direnç <b>"+a(e.hedef1)+"</b>"+(null!=e.hedef1Yuzde?"  ·  <b>+"+Number(e.hedef1Yuzde).toFixed(1)+"%</b>":"")+"\n"),void 0!==e.hedef&&null!==e.hedef&&(n+="🎯 Hedef <b>"+a(e.hedef)+"</b>",
void 0!==e.potansiyel&&null!==e.potansiyel&&(n+=Number(e.potansiyel)<=0?"  ·  🏆 <b>TUTTU</b>":"  ·  hedefe <b>+"+Number(e.potansiyel).toFixed(1)+"%</b>"),n+="\n");const r=e.sinyalZaman||e.zaman
;return r&&(n+="🕐 <i>"+r+"</i>\n"),n}(s[e],c+t+1)}),o+="━━━━━━━━━━━━━━━━\n<i>Hisse düğmesine dokun, tam detayını gör.</i>\n",o+="<i>⚠️ Yatırım tavsiyesi değildir.</i>",o}const MINIAPP=`<!doctype html><html lang="tr"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
<title>Fix Borsa Sinyal</title>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lightweight-charts@5.2.0/dist/lightweight-charts.standalone.production.js" onerror="this.onerror=null;var s=document.createElement('script');s.src='https://unpkg.com/lightweight-charts@5.2.0/dist/lightweight-charts.standalone.production.js';document.head.appendChild(s)"></script>
<style>
:root{
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
.satir .sol{flex:1;min-width:0}
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
.dg{display:block;width:100%;background:var(--mavi);color:#fff;border:0;border-radius:10px;
  padding:13px;font-size:14.5px;font-weight:700;margin-top:9px}
.dg.ik{background:var(--kart2);border:1px solid var(--ciz);color:var(--yazi)}
.dg.kirmizi{background:var(--kir)}
.gir{width:100%;background:var(--bg);border:1px solid var(--ciz);color:var(--yazi);
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
  <div class="baslik"><button id="anaMenuBtn" class="anaMenuBtn">🏠 Ana Menü</button><h1 id="baslikYazi">📊 Fix Borsa Sinyal</h1><span id="sekmeAdi" class="sekmeAdi"></span><div class="saat" id="saat"></div></div>
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
function tit(){try{TG.HapticFeedback.impactOccurred("light")}catch(e){}}
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
  if(sekme==="rad")return"🧠 KAP Radar";
  if(sekme==="rot")return"🔄 Sektör Rotasyonu";
  if(sekme==="perf")return"📈 Performans";
  if(sekme==="davet")return"📤 Davet";
  if(sekme==="panel")return"🛠 Panel";
  if(sekme==="fav")return"⭐ Takip listem";
  if(sekme==="portfoy")return"💼 Portföyüm";
  if(sekme==="preset")return"🎛 Hazır filtreler";
  if(sekme==="backtest")return"📊 Backtest";
  if(sekme==="temel")return"📋 Temel Analiz";
  if(sekme==="kap")return"📰 KAP Bildirimleri";
  if(sekme==="temettu")return"💰 Temettü Takvimi";
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
function post(yol,gov){
  gov=gov||{}; gov.initData=(TG&&TG.initData)||"";
  return fetch(yol,{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify(gov)}).then(function(r){return r.json()});
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
    if(!D.onay)return onayCiz();
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
  ["potansiyel","fibo","uzunvade"].forEach(function(k){
    var t=TF[k],n=(D.kartlar&&D.kartlar[k]&&D.kartlar[k].length)||0;
    s.push('<button class="sek'+(sekme===k?" on":"")+'" data-r="'+t.r+'" data-s="'+k+'">'+
      t.ik+" "+t.kisa+(n?' <span style="opacity:.75">'+n+"</span>":"")+"</button>");
  });
  /* 📋 Temel Analiz — KISA/ORTA/UZUN'un hemen ardında, dördüncü sırada.
     Sekme şeridi yatay kaydırmalı; arkalara koyunca kimse bulamıyor.
     Sinyalin arkasında şirket var mı sorusu, listeye bakmakla aynı
     sıklıkta sorulan bir sorudur — o yüzden görünür yerde. */
  s.push('<button class="sek'+(sekme==="temel"?" on":"")+'" data-r="nötr" data-s="temel">📋 Temel</button>');
  s.push('<button class="sek'+(sekme==="aday"?" on":"")+'" data-r="aday" data-s="aday">🟨 Adaylar'+(D.super?"":" 🔒")+'</button>');
  s.push('<button class="sek'+(sekme==="kama"?" on":"")+'" data-r="nötr" data-s="kama">📐 Formasyon'+(D.super?"":" 🔒")+'</button>');
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
  s.push('<button class="sek'+(sekme==="rad"?" on":"")+'" data-r="nötr" data-s="rad">🧠 KAP Radar</button>');
  /* 📋 Temel Analiz — HERKESE AÇIK ve üst sıralarda: sinyalin arkasında
     şirket olup olmadığını görmek kilitlenecek bir ayrıcalık değil,
     sistemin ciddiyetinin göstergesidir. */
  s.push('<button class="sek'+(sekme==="kap"?" on":"")+'" data-r="nötr" data-s="kap">📰 KAP</button>');
  s.push('<button class="sek'+(sekme==="temettu"?" on":"")+'" data-r="nötr" data-s="temettu">💰 Temettü</button>');
  if(D.yon)s.push('<button class="sek'+(sekme==="panel"?" on":"")+'" data-r="nötr" data-s="panel">🛠 Panel</button>');
  if(D.yon)s.push('<button class="sek'+(sekme==="hata"?" on":"")+'" data-r="nötr" data-s="hata">🩺 Hatalar</button>');
  if(D.yon)s.push('<button class="sek'+(sekme==="sag"?" on":"")+'" data-r="nötr" data-s="sag">🛡 Sistem</button>');
  el("sekmeler").innerHTML=s.join("");
  [].forEach.call(el("sekmeler").children,function(b){
    b.onclick=function(){tit();sekme=b.dataset.s;sira="kar";ciz();window.scrollTo(0,0)};
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
    if(araS)araS.style.display="none";
    el("serit").innerHTML="";el("hotSerit").innerHTML="";
  }
  sekCiz();
  if(sekme==="hata")return hataCiz();
  if(sekme==="sag")return saglikCiz();
  if(sekme==="abs")return absCiz();
  if(sekme==="rad")return radCiz();
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
  if(sekme==="kap")return kapCiz();
  if(sekme==="temettu")return temettuCiz();
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
    yb.onclick=function(){tit();sekme="yardim";ciz();window.scrollTo(0,0)};
  }
  var db=el("davetBtn");
  if(db&&!db.dataset.bagli){
    db.dataset.bagli="1";
    db.onclick=function(){tit();sekme="davet";ciz();window.scrollTo(0,0)};
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
    if(hl)hl.onclick=function(){tit();sekme="davet";ciz();window.scrollTo(0,0)};
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
function dizil(ad){
  var l=(D.kartlar&&D.kartlar[ad])||[];
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
  if(ix&&ix.length===l.length)return ix.map(function(i){return l[i]});
  var c=l.slice();
  if(sira==="kar")c.sort(function(a,b){return(kar(b)==null?-9999:kar(b))-(kar(a)==null?-9999:kar(a))});
  return c;
}
function satirHtml(k,ad){
  var t=TF[ad]||{kisa:k.tf||"",renk:"var(--ciz)"};
  var kr=kar(k), pot=(k.potansiyel==null?null:Number(k.potansiyel));
  var sag=(pot==null)?"":(pot<=0?'<span class="sa">🏆 TUTTU</span>':'<span class="so">hedefe <b>+'+pot.toFixed(1)+"%</b></span>");
  var alt=[];
  alt.push(t.kisa);
  /* CANLI: kırılım oluşan barda — bar kapanınca geri dönebilir. */
  if(k.canli)alt.push("⚡ canlı");
  if(k.tetik!=null)alt.push("🔓 tetik "+N(k.tetik)+(k.tetikYuzde!=null?" · %"+Number(k.tetikYuzde).toFixed(1)+" kaldı":""));
  /* Giriş fiyatı da bir ipucudur: "sinyal 138.70" ile hisse bulunabilir.
     Kilitliyken sayı yerine kilit yazılır. */
  else if(k.giris!=null)alt.push(buguluMu(k)?"sinyal 🔒":("sinyal "+N(k.giris)));
  /* ⚓ Kirilimdan bu yana alanlarin ortalama maliyetine gore konum.
     Listede tek kelime yeter; ayrinti detay ekraninda. */
  if(k.avwap>0&&k.avwapBar>=3)
    alt.push("⚓ "+(k.avwapUst!==false?"ortalama üstü":"ORTALAMA ALTI"));
  if(k.zayifHedef)alt.push("🎯 hedef dar");
  if(k.sinyalZaman||k.zaman)alt.push(k.sinyalZaman||k.zaman);
  var bg=bugunMu(k);
  var kilitli=buguluMu(k);
  return '<div class="satir'+(bg?" bgnSatir":"")+'" data-kod="'+E(k.kod)+'" data-l="'+ad+'"'+
    (kilitli?' data-kilit="1"':"")+' style="border-left-color:'+t.renk+'">'+
    '<div class="sol"><div class="kod">'+havaIkon(k)+(k.rozet?'<span class="rz">'+k.rozet+"</span>":"")+
    (bg?'<span class="bgn">BUGÜN</span>':"")+kodHtml(k)+"</div>"+
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
    b.onclick=function(){
      tit();
      /* Buğulu satır: kod detay ekranından okunabilirdi, o yüzden
         tıklama detaya değil davet ekranına gider. */
      if(b.dataset.kilit){sekme="davet";ciz();window.scrollTo(0,0);return}
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
    el("govde").innerHTML='<div class="bos"><b>'+t.ik+" "+t.ad+'</b><br><br>'+
      (sira==="yeni"
        ? 'Bugün bu dilimde henüz sinyal çıkmadı.<br>Önceki günlerin sinyalleri için 💰 ya da 🎯 sekmesine geç.'
        : 'Şu an bu dilimde sinyal yok.<br>Bu dilimde henüz pivot kırılımı oluşmadı. Bar kapanışlarında liste yenilenir.')+
      '</div>'+dusenlerCiz(ad);
    return;
  }
  el("govde").innerHTML=sirCiz(sira)+l.map(function(k){return satirHtml(k,ad)}).join("")+
    '<div class="uyari">⚠️ Yatırım tavsiyesi değildir. Teknik tarama geleceği bilmez.</div>'+
    dusenlerCiz(ad);
  sirBagla();satirBagla();
}
function adayCiz(){
  if(!D.super){
    el("govde").innerHTML='<div class="kilit"><div class="buyuk">👑</div>'+
      "<h2>Süper Üyelik gerekli</h2>"+
      "<p>Aday listeleri, sinyal <b>oluşmadan önce</b> hangi hisselerin kırılıma hazır olduğunu gösterir: "+
      "tetik seviyesi ve kırarsa gideceği hedef.</p>"+
      "<p>Toplam davetin: <b>"+D.ref+"</b> · açılması için <b>"+D.kalan+" kişi</b> daha.</p>"+
      '<button class="dg" id="davetGit">📤 Sistemi paylaş</button></div>';
    el("davetGit").onclick=function(){tit();sekme="davet";ciz()};
    return;
  }
  var alt=["adayOrta","adayOrtaVade","adayUzun","adayHafta"];
  var h='<div class="sirala">'+alt.map(function(a){
    var n=(D.kartlar&&D.kartlar[a]&&D.kartlar[a].length)||0;
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
      "<h2>Süper Üyelik gerekli</h2>"+
      "<p>Formasyon taraması, klasik grafik formasyonlarını (üçgen, bayrak, omuz-baş-omuz vb.) kırılım oluşmadan tespit eder.</p>"+
      "<p>Toplam davetin: <b>"+D.ref+"</b> · açılması için <b>"+D.kalan+" kişi</b> daha.</p>"+
      '<button class="dg" id="davetGit">📤 Sistemi paylaş</button></div>';
    el("davetGit").onclick=function(){tit();sekme="davet";ciz()};
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
  /* "ONAY ALANLAR" ÖZETİ: kullanıcı hiçbir filtreye dokunmadan da, üst
     direncini/desteğini kırıp onay almış hisseleri görsün diye — seçili
     süzgeçten bağımsız olarak HER ZAMAN üstte, en fazla 8 tanesi. */
  var onayAlanlar=tum.filter(function(x){return x.onaylandi===true})
    .sort(function(a,b){return(b.kalite||0)-(a.kalite||0)});
  if(onayAlanlar.length){
    h+='<div class="pzEt">✅ Onay noktasını kıranlar ('+onayAlanlar.length+')</div>';
    h+=onayAlanlar.slice(0,8).map(function(x){
      var renk=x.yon==="al"?"#3fb950":(x.yon==="sat"?"#f85149":"#d29922");
      var ikon=x.yon==="al"?"📈":"📉";
      return '<div class="satir" data-kod="'+E(x.kod)+'" data-l="'+E(x.tf)+'" data-form="1" style="border-left-color:'+renk+'">'+
        '<div class="sol"><div class="kod">'+E(x.kod)+'</div>'+
        '<div class="altbilgi">'+ikon+' '+E(x.tip)+' · '+E(x.tf||"")+
        (x.bugunOnay?' · <span class="rozetKucuk" style="color:#3fb950;border-color:#3fb950">🆕 Bugün</span>':'')+
        '</div></div><div class="sag"><div class="yuzde so">kalite <b>%'+x.kalite+'</b></div></div></div>';
    }).join("");
  }
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
      if(b.dataset.tkilit){sekme="davet";ciz();window.scrollTo(0,0);return}
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
function kapCiz(){
  el("govde").innerHTML='<div class="yukleniyor">yükleniyor…</div>';
  post("/api/kap",{}).then(function(v){
    var liste=(v&&v.liste)||[];
    if(!liste.length){
      var tes="";
      if(v&&v.sonHata)tes+='<br><br><span style="color:var(--kr)">Hata: '+E(String(v.sonHata))+'</span>';
      if(v&&v.ardisikHata)tes+='<br><span class="altbilgi">ardışık hata: '+v.ardisikHata+'</span>';
      if(v&&v.sonBasari)tes+='<br><span class="altbilgi">son başarılı çekim: '+
        new Date(v.sonBasari*1000).toLocaleString("tr-TR")+'</span>';
      else if(v)tes+='<br><span class="altbilgi">bu worker açıldığından beri hiç başarılı çekim olmadı</span>';
      if(v&&v.hamSayi)tes+='<br><span class="altbilgi">KAP '+v.hamSayi+
        ' bildirim döndü ama hiçbirinde hisse kodu yok</span>';
      el("govde").innerHTML='<div class="bos"><b>📰 KAP Bildirimleri</b><br><br>'+
        'Şu an gösterilecek bildirim yok.'+tes+'</div>';
      return;
    }
    el("govde").innerHTML=liste.map(function(d){
      return '<div class="satir" style="cursor:pointer">'+
        '<div class="sol"><div class="kod">'+E((d.kodlar||[]).join(", ")||"—")+
        (d.takipte?' <span class="rozet">⭐ izlediğin</span>':"")+'</div>'+
        '<div class="altbilgi">'+E(d.konu||"Bildirim")+'</div></div>'+
        '<div class="sag"><div class="yuzde so">'+E((d.tarih||"").slice(0,16).replace("T"," "))+'</div></div></div>';
    }).join("")+'<div class="uyari">Kaynak: kap.org.tr · yalnız bilgilendirme amaçlıdır, yatırım tavsiyesi değildir.</div>';
    [].forEach.call(document.querySelectorAll("#govde .satir"),function(row,i){
      row.onclick=function(){
        tit();
        var u2="https://www.kap.org.tr/tr/Bildirim/"+liste[i].disclosureIndex;
        try{TG.openLink(u2)}catch(e){location.href=u2}
      };
    });
  });
}
/* 💰 Temettü sekmesi: KAP'ın kendi bildirim detay sayfasından (Ödeme
   Tarihi (3) alanı) çekilen GERÇEK ödeme tarihli yaklaşan kar payı takvimi.
   Detay sayfaları erişilemezse eski KAP-duyuru listesine (sadece "karar
   açıklandı" haberi, ödeme tarihi yok) düşülür — bu durumda gercekTarih=false
   döner ve satır görünümü buna göre değişir. */
function temettuCiz(){
  el("govde").innerHTML='<div class="yukleniyor">yükleniyor…</div>';
  post("/api/temettu",{}).then(function(v){
    var liste=(v&&v.liste)||[],gercek=!!(v&&v.gercekTarih);
    if(!liste.length){
      el("govde").innerHTML='<div class="bos"><b>💰 Temettü Takvimi</b><br><br>Şu an ödeme tarihi ileride olan bir kâr payı duyurusu yok.<br>BIST\\'te temettü duyuruları çoğunlukla Mart–Temmuz genel kurul sezonunda çıkar; sezon dışında liste boş görünmesi normaldir. Yeni bir duyuru çıktığında burada listelenir.</div>'+
        (v&&v.tani?'<div class="uyari" style="text-align:left;white-space:pre-wrap">TANI (sadece admin):\\n'+E(v.tani.join("\\n"))+'</div>':"");
      return;
    }
    if(gercek){
      el("govde").innerHTML=liste.map(function(x){
        return '<div class="satir" style="cursor:pointer">'+
          '<div class="sol"><div class="kod">'+E(x.kod)+
          (x.takipte?' <span class="rozet">⭐ izlediğin</span>':"")+'</div>'+
          '<div class="altbilgi">Hak kazanma (kesinleşen) '+E(x.hakKazanma||"—")+'</div></div>'+
          '<div class="sag"><div class="yuzde so">💵 '+E(x.odemeTarihi||"—")+'</div></div></div>';
      }).join("")+'<div class="uyari">Kaynak: kap.org.tr bildirim detay sayfası, "Ödeme Tarihi (3)" alanı. Yatırım tavsiyesi değildir.</div>';
      [].forEach.call(document.querySelectorAll("#govde .satir"),function(row,i){
        row.onclick=function(){
          tit();
          var u2="https://www.kap.org.tr/tr/Bildirim/"+liste[i].disclosureIndex;
          try{TG.openLink(u2)}catch(e){location.href=u2}
        };
      });
      return;
    }
    el("govde").innerHTML=liste.map(function(x){
      return '<div class="satir" style="cursor:pointer">'+
        '<div class="sol"><div class="kod">'+E(x.kod)+
        (x.takipte?' <span class="rozet">⭐ izlediğin</span>':"")+'</div>'+
        '<div class="altbilgi">'+E(x.konu||"KAP kâr payı bildirimi")+'</div></div>'+
        '<div class="sag"><div class="yuzde so">'+E(x.tarih||"")+'</div></div></div>';
    }).join("")+'<div class="uyari">Kaynak: kap.org.tr · "Kar Payı Dağıtım" konulu bildirimler, kararın açıklandığı tarihle listelenir (kesin ödeme tarihi için bildirimin ekindeki tabloya bak). Yatırım tavsiyesi değildir.</div>';
    [].forEach.call(document.querySelectorAll("#govde .satir"),function(row,i){
      row.onclick=function(){
        tit();
        var u2="https://www.kap.org.tr/tr/Bildirim/"+liste[i].disclosureIndex;
        try{TG.openLink(u2)}catch(e){location.href=u2}
      };
    });
  });
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
  h+=ydBlok("🧠 KAP Radar",
    "Kamuyu Aydınlatma Platformu'ndaki (KAP) önemli şirket bildirimlerini (pay alım/satım, birleşme, bedelli/bedelsiz sermaye artırımı vb.) otomatik tarar ve önem sırasına göre listeler.");
  h+=ydBlok("📰 KAP",
    "Ham KAP bildirim akışı; KAP Radar'daki önem filtrelemesi olmadan tüm bildirimleri kronolojik gösterir.");
  h+=ydBlok("💰 Temettü Takvimi",
    "Kâr payı (temettü) dağıtım kararı açıklanan ve ödeme tarihi ileride olan hisseleri listeler.");
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
    el("davetGit").onclick=function(){tit();sekme="davet";ciz()};
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
  h+='<div id="portfoyTemettuKutu"></div>';
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
  portfoyTemettuKutusuDoldur(kodlar);
  portfoyYeniBagla();
}
/* 💰 Portföydeki hisseler için bekleyen kâr payı bildirimlerini gösterir.
   Ana ekranı bloklamadan, arkada tek bir /api/temettu isteğiyle doldurulur
   (temettü takvimiyle aynı kaynak — "takipte" alanı zaten portföyü kapsıyor). */
function portfoyTemettuKutusuDoldur(kodlar){
  var kutu=el("portfoyTemettuKutu"); if(!kutu||!kodlar.length)return;
  var set={}; kodlar.forEach(function(k){set[k]=1});
  post("/api/temettu",{}).then(function(v){
    var kutu2=el("portfoyTemettuKutu"); if(!kutu2)return;
    var liste=((v&&v.liste)||[]).filter(function(x){return set[x.kod]});
    if(!liste.length)return;
    kutu2.innerHTML='<div class="kutu" style="margin-top:10px"><h3>💰 Portföyünde bekleyen kâr payı</h3>'+
      liste.map(function(x){
        var tarih=x.odemeTarihi?("ödeme "+E(x.odemeTarihi)):("bildirim "+E(x.tarih||""));
        return '<div class="altN" style="margin-top:4px">• <b>'+E(x.kod)+'</b> — '+tarih+'</div>';
      }).join('')+'<div class="altN" style="margin-top:6px">Tutar bilgisi KAP listesinde yapısal olarak yer almıyor; detay için bildirime dokun (Temettü Takvimi sekmesi).</div></div>';
  }).catch(function(){});
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
      layout:{background:{color:"transparent"},textColor:"#e6edf3"},
      grid:{vertLines:{color:"#262d38"},horzLines:{color:"#262d38"}},
      timeScale:{timeVisible:false,secondsVisible:false},
      rightPriceScale:{borderVisible:false}
    });
    var seri=chart.addSeries(LightweightCharts.AreaSeries,{
      lineColor:"#388bfd",topColor:"rgba(56,139,253,0.35)",bottomColor:"rgba(56,139,253,0.02)",lineWidth:2
    });
    seri.setData(gunluk.map(function(x){return{time:x.gun,value:x.deger}}));
    chart.timeScale().fitContent();
    window.addEventListener("resize",function(){try{chart.applyOptions({width:kutu.clientWidth||320})}catch(e){}});
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
      if(k.hedef1!=null)h+='<div class="sat"><span class="et">🧱 Direnç</span><b>'+N(k.hedef1)+
        (k.hedef1Yuzde!=null?"  (+"+Number(k.hedef1Yuzde).toFixed(1)+"%)":"")+"</b></div>";
      else if(k.direncler&&k.direncler.length)h+='<div class="sat"><span class="et">🧱 Direnç</span><b>'+
        k.direncler.filter(function(x){return x!=null}).map(function(x){return N(x)}).join(" · ")+"</b></div>";
      if(k.hedef!=null)h+='<div class="sat"><span class="et">🎯 Hedef</span><b>'+N(k.hedef)+"</b></div>";
      if(k.potansiyel!=null)h+='<div class="sat"><span class="et">Hedefe kalan</span><b class="'+
        (Number(k.potansiyel)<=0?"sa":"ye")+'">'+(Number(k.potansiyel)<=0?"🏆 hedef tuttu":
        "+"+Number(k.potansiyel).toFixed(1)+"%")+"</b></div>";
      h+="</div>";
      if(k.guc)h+='<div class="ayna">'+k.guc+"</div>";
    }else{
      h+='<div class="dbas"><div class="k">'+E(kod)+"</div></div>"+
         '<div class="bilgi">Bu hisse şu an hiçbir listede değil — aşağıda güncel iki yönlü durumu var.</div>';
    }
    h+='<div class="kutu"><h3>📊 Grafik<span id="desenRozet"></span></h3><div id="mumKutu" class="mumKutu"><div class="yukleniyor" style="padding:20px 0">grafik yükleniyor…</div></div><div id="desenYorum"></div></div>';
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
      if(k&&k.hedef1!=null)satirlar.push("🧱 Direnç: "+N(k.hedef1));
      if(k&&k.hedef!=null)satirlar.push("🎯 Hedef: "+N(k.hedef)+(k.potansiyel!=null?(Number(k.potansiyel)<=0?" (🏆 tuttu)":" (+"+Number(k.potansiyel).toFixed(1)+"% kaldı)"):""));
      if(k&&k.kalite)satirlar.push("⭐ Kalite: %"+k.kalite);
      var m=satirlar.join("\\n")+"\\n\\n🤖 Fix Borsa Sinyal ile takip ediyorum, sen de katıl 👇";
      var u="https://t.me/share/url?url="+encodeURIComponent(D.link)+"&text="+encodeURIComponent(m);
      try{TG.openTelegramLink(u)}catch(e){location.href=u}
    };
  });
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
        layout:{background:{color:"transparent"},textColor:"#e6edf3"},
        grid:{vertLines:{color:"#262d38"},horzLines:{color:"#262d38"}},
        timeScale:{timeVisible:saatlik,secondsVisible:false},
        rightPriceScale:{borderVisible:false}
      });
      var seri=chart.addSeries(LightweightCharts.CandlestickSeries,{
        upColor:"#3fb950",downColor:"#f85149",borderVisible:false,
        wickUpColor:"#3fb950",wickDownColor:"#f85149"
      });
      seri.setData(veri.map(function(b){return{time:b.time,open:b.open,high:b.high,low:b.low,close:b.close}}));
      var rz=el("desenRozet"),yr=el("desenYorum"),d=v&&v.desen;
      var sonFiyat=veri.length?veri[veri.length-1].close:null;
      if(d&&d.ust&&d.alt){
        var renk=d.yon==="al"?"#3fb950":(d.yon==="sat"?"#f85149":"#d29922");
        /* Pine gibi: P1-P3 / P2-P4 arası DÜZ çizgi, sonrası NOKTALI uzatma. */
        var cizgi=function(nokta,stil){
          if(!nokta||nokta.length<2)return;
          var s=chart.addSeries(LightweightCharts.LineSeries,{color:renk,lineWidth:2,lineStyle:stil,
            crosshairMarkerVisible:false,lastValueVisible:false,priceLineVisible:false});
          s.setData(nokta);
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
        if(yr)yr.innerHTML="";
      }else{if(rz)rz.innerHTML="";if(yr)yr.innerHTML=""}
      chart.timeScale().fitContent();
      var yenidenBoyutla=function(){try{chart.applyOptions({width:kutu.clientWidth||320})}catch(e){}};
      window.addEventListener("resize",yenidenBoyutla);
    }catch(e){
      var k2=el("mumKutu"); if(k2)k2.innerHTML='<p class="bilgi">Grafik çizilemedi.</p>';
    }
  }).catch(function(){var k2=el("mumKutu"); if(k2)k2.innerHTML='<p class="bilgi">Grafik verisi alınamadı.</p>'});
}
/* Formasyon detayını "şurası şu, burası bu" diye somut seviyelere döken
   yorum kutusu. Üst/alt sınır her zaman görsel olarak ust/alt çizgisinin
   son noktası; onay/iptal ise yöne göre hangisinin tetik hangisinin geçersiz
   kılma seviyesi olduğunu belirler (yon="al" → onay üstte, iptal altta). */
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
/* ================== 🧠 KAP RADAR SEKMESİ ==================
   Ham KAP listesi (📰 sekmesi) her şeyi tarih sırasıyla verir. Radar ise
   her bildirimi KATEGORİYE ayırır ve ÖNEM PUANI verir; en üstte en çok
   fiyat etkileyebilecek olan durur. Üstte TEFAS fon akışı şeridi var. */
var radD=null,radFiltre="";
function radCiz(){
  if(radD){radGoster(radD);return}
  el("govde").innerHTML='<div class="yukleniyor">bildirimler sınıflandırılıyor…</div>';
  post("/api/kapradar",{}).then(function(v){radD=v;radGoster(v)})
    .catch(function(e){
      /* "Okunamadı." tek başına hiçbir şey söylemiyordu. Sunucu hata
         fırlattıysa mesajını, KAP boş döndüyse sebebini yazıyoruz. */
      el("govde").innerHTML='<div class="bos"><b>🧠 KAP Radar</b><br><br>'+
        'Bildirimler okunamadı.<br><span style="color:var(--kr)">'+
        E(String((e&&e.message)||e||"bilinmeyen hata")).slice(0,200)+'</span>'+
        '<br><br><span class="altbilgi">Kaynak kap.org.tr — sorun dışarıda da olabilir. '+
        '📰 KAP sekmesindeki teşhis satırı sebebi söyler.</span></div>';
    });
}
function radTefasSerit(t){
  if(!t)return '<div class="uyari" style="margin-top:0">💵 <b>TEFAS fon akışı</b> henüz ölçülmedi. '+
    'Aşağıdaki düğmeye basınca ilk ölçüm alınır.<br>'+
    '<button class="sir" id="radTefas" style="margin-top:8px">💵 TEFAS verisini çek</button></div>';
  if(!t.ok)return '<div class="uyari" style="margin-top:0;border-color:var(--kir)">⛔ <b>TEFAS bağlanamadı</b><br>'+
    'Hata: '+E(String(t.hata||"?"))+'<br>'+
    'Bu kaynak devlet sitesinde barındığı için erişim engellenebiliyor. Sistemin geri kalanı bundan etkilenmez.<br>'+
    '<button class="sir" id="radTefas" style="margin-top:8px">🔄 Tekrar dene</button></div>';
  var dd=t.degerDegisim,kd=t.kisiDegisim;
  var ok=function(x){return x==null?"—":((x>0?"▲ +":"▼ ")+x+"%")};
  var renk=function(x){return x==null?"var(--mavi)":(x>0?"var(--yes)":"var(--kir)")};
  return '<div class="uyari" style="margin-top:0">💵 <b>TEFAS · hisse fonları</b> ('+((t.fonSayisi)||0)+' fon)<br>'+
    'Fon büyüklüğü: <b style="color:'+renk(dd)+'">'+ok(dd)+'</b> · '+
    'Yatırımcı sayısı: <b style="color:'+renk(kd)+'">'+ok(kd)+'</b>'+
    (t.ortGetiri!=null?' · ort. getiri: <b>'+E(String(t.ortGetiri))+'%</b>':"")+'<br>'+
    '<span style="opacity:.75">Bu, borsaya para girip girmediğinin bağımsız göstergesidir. '+
    'TEFAS fonların hangi hisseyi aldığını açıklamaz — sadece toplam akışı verir.</span><br>'+
    '<button class="sir" id="radTefas" style="margin-top:8px">🔄 Tazele</button></div>';
}
function radGoster(v){
  if(!v||!v.ok){
    /* Sunucu artik hata sebebini gonderiyor; ekrana yaziyoruz. */
    var t="";
    if(v&&v.hata)t+='<br><br><span style="color:var(--kr)">'+E(String(v.hata))+'</span>';
    if(v&&v.sonHata)t+='<br><span class="altbilgi">KAP son hata: '+E(String(v.sonHata))+'</span>';
    el("govde").innerHTML='<div class="bos"><b>🧠 KAP Radar</b><br><br>Bildirimler okunamadı.'+t+
      '<br><br><span class="altbilgi">Kaynak kap.org.tr — sorun dışarıda da olabilir.</span></div>';
    return;
  }
  if(!(v.liste||[]).length){
    var t2="";
    if(v.sonHata)t2+='<br><br><span style="color:var(--kr)">KAP hatası: '+E(String(v.sonHata))+'</span>';
    if(v.ardisikHata)t2+='<br><span class="altbilgi">ardışık hata: '+v.ardisikHata+'</span>';
    t2+=v.sonBasari
      ? '<br><span class="altbilgi">son başarılı çekim: '+new Date(v.sonBasari*1000).toLocaleString("tr-TR")+'</span>'
      : '<br><span class="altbilgi">bu worker açıldığından beri hiç başarılı çekim olmadı</span>';
    el("govde").innerHTML='<div class="bos"><b>🧠 KAP Radar</b><br><br>Bildirim yok.'+t2+'</div>';
    return;
  }
  var l=(v.liste||[]).filter(function(x){return !radFiltre||x.kat===radFiltre});
  var say=v.sayim||{};
  var h=radTefasSerit(v.tefas);
  h+='<div class="sirala"><button class="sir'+(radFiltre?"":" on")+'" data-k="">Tümü</button>'+
     (v.kategoriler||[]).filter(function(k){return say[k.kod]}).map(function(k){
       return '<button class="sir'+(radFiltre===k.kod?" on":"")+'" data-k="'+k.kod+'">'+
              k.ik+" "+E(k.ad)+" ("+say[k.kod]+")</button>";
     }).join("")+'</div>';
  h+='<div class="altbilgi" style="margin:2px 0 8px;opacity:.75">Önem puanına göre sıralı · '+
     'tanınan şirket: '+((v.sirketSayisi)||0)+' · listeye dokununca KAP sayfası açılır</div>';
  if(!l.length){h+='<div class="bos">Bu kategoride bildirim yok.</div>'}
  else{
    h+=l.map(function(x){
      var renk=x.onem>=85?"var(--kir)":(x.onem>=65?"var(--sar)":"var(--mavi)");
      return '<div class="satir rsat" data-i="'+(x.disclosureIndex||"")+'" style="cursor:pointer;border-left-color:'+renk+';align-items:flex-start">'+
        '<div class="sol"><div class="kod">'+x.ik+" "+E((x.kodlar||[]).join(", "))+
        (x.takipte?' <span class="rozet">⭐</span>':"")+
        (x.fonSay>=2?' <span class="rozet">🔁 '+x.fonSay+' bildirim</span>':"")+'</div>'+
        '<div class="altbilgi" style="white-space:normal">'+E(x.katAd)+' · '+E(x.konu||"")+
        (x.sirket?'<br><span style="opacity:.7">'+E(x.sirket)+'</span>':"")+'</div></div>'+
        '<div class="sag"><div class="yuzde" style="color:'+renk+'">'+x.onem+'</div>'+
        '<div class="altbilgi">'+E(String(x.tarih||"").slice(5,16).replace("T"," "))+'</div></div></div>';
    }).join("");
  }
  h+='<div class="uyari">Kaynak: kap.org.tr · kategori ve önem puanı bizim kural tabanlı '+
     'sınıflandırmamızdır, KAP tarafındaki resmî etiket değildir. Yatırım tavsiyesi değildir.</div>';
  el("govde").innerHTML=h;
  [].forEach.call(document.querySelectorAll("#govde .sir[data-k]"),function(bt){
    bt.onclick=function(){tit();radFiltre=bt.dataset.k;radGoster(radD);window.scrollTo(0,0)};
  });
  [].forEach.call(document.querySelectorAll("#govde .rsat"),function(row){
    row.onclick=function(){
      var i2=row.dataset.i;if(!i2)return;tit();
      var url="https://www.kap.org.tr/tr/Bildirim/"+i2;
      try{TG.openLink(url)}catch(e){window.open(url,"_blank")}
    };
  });
  var tb=el("radTefas");
  if(tb)tb.onclick=function(){tit();tb.disabled=true;tb.textContent="çekiliyor…";
    post("/api/tefas",{yenile:1}).then(function(r){
      if(radD)radD.tefas=(r&&r.tefas)||null;radGoster(radD);
    }).catch(function(){tb.textContent="hata";tb.disabled=false})};
}
/* ================== 🛡 SİSTEM SEKMESİ (yalnız yönetici) ==================
   Altı dayanıklılık maddesinin tamamı burada görünür:
   Telegram 429/engelli sayaçları, çakışma kilidi atlamaları, panel
   kaba-kuvvet denemeleri, KAP çekim sağlığı, KAP çoklu bildirim (fon)
   radarı ve Cloudflare rate-limit binding'lerinin bağlı olup olmadığı.
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
  var c=v.sayac||{},k=v.kap||{},f=v.fon||{},bd=v.binding||{};
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
      atl?"Bu kadar kez bir arka plan işi (KAP/geçmiş/alarm/formasyon) önceki turu bitmeden yeniden başlatılmak istendi ve engellendi. Yüksek sayı normaldir — push 10 saniyede bir geliyor."
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

  /* --- 5️⃣ KAP çekim sağlığı --- */
  var kh=Number(k.ardisikHata||0);
  h+='<div class="altbilgi" style="margin:14px 0 6px;opacity:.75">5️⃣ KAP VERİ SAĞLIĞI</div>';
  h+=sagKart(kh>=2?"kotu":(kh===1?"uyari":"iyi"),
      "Son başarılı çekim: <b>"+sagSaat(k.sonBasari)+"</b>",
      "Bugün çağrı: "+sy("kapCagri")+" · hata: "+sy("kapHata")+" · art arda hata: "+kh+
      (k.sonHata?" · son hata: "+E(String(k.sonHata)):"")+
      ". Tarama aralığı "+(k.aralikSn||175)+" sn (KV yazma sınırı yüzünden bilinçli olarak düşürülmedi). "+
      "Her istekte 9 sn zaman aşımı + 1 kez tekrar deneme var.");

  /* --- 6️⃣ Fon / pay işlemi radarı --- */
  h+='<div class="altbilgi" style="margin:14px 0 6px;opacity:.75">6️⃣ KAP ÇOKLU BİLDİRİM RADARI</div>';
  var fl=f.liste||[];
  if(!fl.length){
    h+=sagKart("bilgi","Bugün çoklu bildirim yok",
      "Aynı hisseye gün içinde birden fazla pay alım/satım, geri alım veya ortaklık yapısı bildirimi gelirse burada listelenir. Kimseye ekstra mesaj gitmez — bu sadece senin radarın.");
  }else{
    h+=fl.map(function(x){
      var cok=x.n>=2;
      return '<div class="satir" style="border-left-color:'+(cok?"var(--sar)":"var(--mavi)")+';align-items:flex-start">'+
        '<div class="sol"><div class="kod">'+E(x.kod)+' <span class="rozet">'+x.n+' bildirim</span></div>'+
        '<div class="altbilgi" style="white-space:normal">'+E((x.konular||[]).join(" · ").slice(0,150))+
        '<br>son: '+sagSaat(x.son)+'</div></div></div>';
    }).join("");
  }
  /* --- İkinci paket: panel anahtarı, TEFAS, şirket haritası, absorpsiyon --- */
  h+='<div class="altbilgi" style="margin:14px 0 6px;opacity:.75">🔐 İMZALI PANEL ANAHTARI</div>';
  h+=sagKart(sy("panelTokenGecersiz")?"uyari":"iyi",
      "Süreli bağlantıyla giriş: <b>"+sy("panelToken")+"</b> · süresi dolmuş/geçersiz: <b>"+sy("panelTokenGecersiz")+"</b>",
      "Bota <b>/panel</b> yazdığında 30 dakika geçerli, imzalı bir adres üretiliyor. Eski sabit adres de çalışmaya devam ediyor.");
  h+='<div class="altbilgi" style="margin:14px 0 6px;opacity:.75">💵 TEFAS + 🏷 ŞİRKET HARİTASI</div>';
  h+=sagKart(sy("tefasHata")?"uyari":(sy("tefasCagri")?"iyi":"bilgi"),
      "TEFAS çağrı: <b>"+sy("tefasCagri")+"</b> · hata: <b>"+sy("tefasHata")+"</b>",
      sy("tefasHata")?("Son hata: "+E(String(c.sonTefasHata||"?"))+". TEFAS erişilemezse KAP Radar sekmesi bunu kırmızı yazar; başka hiçbir şey etkilenmez.")
                     :"TEFAS hisse fonlarının toplam büyüklüğünü verir — borsaya para girip girmediğinin ikinci kaynağı.");
  h+=sagKart("bilgi","Tanınan şirket sayısı: <b>"+(c.sirketSayisi||0)+"</b>",
      "Bu harita KAP akışından kendi kendine büyüyor: her bildirimde hisse kodu + şirket ünvanı geliyor. Dışarıdan hazır liste indirmiyoruz.");
  h+='<div class="altbilgi" style="margin:14px 0 6px;opacity:.75">🌊 ABSORPSİYON</div>';
  h+=sagKart("bilgi","Yapılan tarama: <b>"+sy("absTarama")+"</b>",
      "Her tarama en fazla 16 hisseye bakar (Cloudflare istek başına 50 alt-istek sınırı) ve sonuç 30 dakika saklanır.");
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
    el("govde").innerHTML=h;
    function id(x){return(el(x).value||"").replace(/\\D/g,"")}
    function calis(is,gov,kutu,btn){
      var b=el(btn);b.disabled=true;el(kutu).textContent="…";
      gov=gov||{};gov.is=is;
      post("/api/yon",gov).then(function(r){
        b.disabled=false;
        el(kutu).innerHTML=(r&&r.mesaj)?r.mesaj:"işlem tamam";
      }).catch(function(){b.disabled=false;el(kutu).textContent="hata"});
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
    function yayinTur(imlec,toplam){
      post("/api/yon",{is:"yayin",metin:el("pyMetin").value,hedef:"hepsi",imlec:imlec,
        fileId:medya&&medya.fileId,tur:medya&&medya.tur}).then(function(r){
        if(!r||!r.ok){el("pyDurum").textContent=(r&&r.mesaj)||"hata";el("pyHepsi").disabled=false;return}
        toplam+=r.gonderilen||0;
        el("pyDurum").textContent=(r.bitti?"✅ bitti · ":"gönderiliyor… ")+toplam+" kişiye gitti";
        if(!r.bitti&&r.imlec)setTimeout(function(){yayinTur(r.imlec,toplam)},350);
        else el("pyHepsi").disabled=false;
      }).catch(function(){el("pyDurum").textContent="bağlantı hatası";el("pyHepsi").disabled=false});
    }
    el("pyHepsi").onclick=function(){
      tit();
      var g=function(){
        if(medya&&el("pyMetin").value.length>1024){el("pyDurum").textContent=
          "⚠️ medya varken yazı en fazla 1024 karakter olabilir";return}
        el("pyHepsi").disabled=true;el("pyDurum").textContent="başlıyor…";yayinTur("",0)};
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
return null!=e.tetik&&(a+="🔓 Tetik seviyesi: <b>"+t(e.tetik)+"</b>"+(null!=e.tetikYuzde?"  ·  "+(e.tetikYuzde>=0?"+":"")+Number(e.tetikYuzde).toFixed(2)+"% kaldı":"")+"\n<i>Bu seviye kırılırsa o dilimin sinyali başlar — giriş fiyatı değildir.</i>\n"),null!=e.hedef1&&(a+="🎯 Direnç: <b>"+t(e.hedef1)+"</b>"+(null!=e.hedef1Yuzde?"  ·  +"+Number(e.hedef1Yuzde).toFixed(1)+"%":"")+"\n"),e.direncler&&e.direncler.length&&(a+=(null!=e.hedef1?"🧱 Direnç: ":"🧱 Direnç: ")+e.direncler.filter(x=>null!=x).map(e=>t(e)).join(" · ")+"\n"),void 0!==e.hedef&&null!==e.hedef&&(a+="🎯 Hedef: <b>"+t(e.hedef)+"</b>",
void 0!==e.potansiyel&&null!==e.potansiyel&&(a+=tuttu?"  ·  🏆 fiyat hedefin "+Math.abs(e.potansiyel).toFixed(1)+"% üstünde":"  ·  "+(e.rozet||"➡️")+" <b>+"+Number(e.potansiyel).toFixed(1)+"%</b>"),a+="\n"),
e.sinyalZaman&&(a+="🕐 Sinyal zamanı: <b>"+e.sinyalZaman+"</b>\n"),a+="━━━━━━━━━━━━━━━━\n<i>⚠️ Yatırım tavsiyesi değildir.</i>",a}let H={},C=0;async function L(e){if(!e.VERI)return{toplam:0,basis:{},
gun:{}};const t=await e.VERI.get("istatistik");return t?JSON.parse(t):{toplam:0,basis:{},gun:{}}}async function F(e){if(!e.VERI)return{};const t=await e.VERI.get("referanslar")
;return t?JSON.parse(t):{}}async function PK(e){if(!e.VERI)return{};const t=await e.VERI.get("paylasim");return t?JSON.parse(t):{}}async function PKArtir(e,t){if(!e.VERI)return;const a=await PK(e);a[t]=(a[t]||0)+1,await e.VERI.put("paylasim",JSON.stringify(a))}
async function hmacSHA256(e,t){const a=await crypto.subtle.importKey("raw",e,{name:"HMAC",hash:"SHA-256"},!1,["sign"]);return new Uint8Array(await crypto.subtle.sign("HMAC",a,t))}function bytesToHex(e){let t="";for(const a of e)t+=a.toString(16).padStart(2,"0");return t}
/* GÜVENLİK: /tg webhook'u kimden geldiğini doğrulamıyordu — Telegram dışından
   sahte bir update POST edilip from.id sahtelenerek yönetici komutları
   tetiklenebiliyordu. Telegram'ın secret_token mekanizmasını kullanıyoruz:
   BOT_TOKEN'dan sabit bir imza türetiyoruz (ekstra ortam değişkeni gerekmez,
   BOT_TOKEN değişirse imza da otomatik değişir), setWebhook'a veriyoruz ve
   her /tg isteğinde Telegram'ın gönderdiği başlıkla karşılaştırıyoruz. */
let WHS=null;async function whS(e){if(WHS)return WHS;if(!e.BOT_TOKEN)return null;const t=new TextEncoder(),a=await hmacSHA256(t.encode("fixborsa-tg-webhook"),t.encode(e.BOT_TOKEN));return WHS=bytesToHex(a).slice(0,32)}
async function dogrulaInitData(e,t){const a=new URLSearchParams(e),n=a.get("hash");if(!n)return null;a.delete("hash");const i=[];for(const[e,t]of a.entries())i.push(e+"="+t);i.sort();const r=i.join("\n"),s=new TextEncoder(),l=await hmacSHA256(s.encode("WebAppData"),s.encode(t)),o=await hmacSHA256(l,s.encode(r));if(bytesToHex(o)!==n)return null;const c=a.get("user");if(!c)return null;try{const e=JSON.parse(c);return e&&e.id?String(e.id):null}catch(e){return null}}function W(){return(new Date).toISOString().slice(0,10)}let _={};async function Y(e){if(!e.VERI)return{};const t=await e.VERI.get("kullanim");return t?JSON.parse(t):{}}
const J=["H4sIAAAAAAACA708W3LbSJJXKcMxEjEEIVKSZRkUqZFtrUdjue2w7I7odfujCBTJaoIAByhIoijeYO+wh9iI3f/dC+0RNrMeePEhyd294bCER1VWVr4zK6GTZ0Hsi/mMkb","GYhv0T/ElCGo16lkgsuGc06J9MmaDEH9MkZaJnZWLYOrb004hOWc+65uxmFifCIn4cCRbBqBseiHEvYNfcZy154/CIC07DVurTkPU6jpnVGnLR8+NrhisKLkLW/xd+S17H","SUrJf/8X+eV//jNigvv8ZE+9PUnFHH55SRyLRas1GHnP20Gn03nZbbUmNBHe885RZ7C/D7c+v/Oe77/cZwf4ck7hjh2xYHgAd2kces+PB68OXzF8x7znB8PBqxdthMIT7/","nw+EXn8BUOpHAX7L96JUFO6TWHocfHg2Gw/OtiEN+2Un7Ho5E3iJOAJS140m3dsMGEi5ags9aYj8Yh/BctPw7jxBMJjdIZTYBOy0EczBdTmox45LW7A+pPRkmcRYF3TZMG","bs3uqknqHjZgd4dAY6/zYna713FfkHSeCjZtZdxp0dksZC31wElhkVbKEj7szmgQIH6d/dktkT9etme3y3FngaAQe+Z1jme3XYMIaZMDGODSUCzKywPF1PJ6zr77AodNMp","GFNFkEPJ2FdO6NEh508UcLEIEnguHOs2mUegmbMSoaNBMxst2Z8mhKbxud9uHs1ukME9vujujMKyEj8W2rRRYrBEJ2211FeK8DIwFFHhD1Ephv3rUSGvAs9TowpqBH22BP","3KhEi33YvNrmDUO+ecftdjfkEWuN1X3H7Zh5bCuB2kigrmC3IAnI9WGcTL1sNmOJT1PWDZkQgBsIg4/4uO0DNl0GoFc8TP+Ave6XqNhGKnZRyYZhfOONeRCwaJlmUxgwX+","QUOUAJOaxt/yVsv7SpQ7kpP0tS2Pcs5qDxCZAnhfeol14UR6xrZGEYstvub1kq+HDe0tbBww2z1oCJG8aiLgXliFocZCX1fCahaRkw+Hme0SdNHFDCZMIKicMli8F0CDAW","ZjHr1/0Xr8+t7jY+oRhr0N/iGYu+k23ADi2zFnHTeZlRzzv+/sFBe3WtKmf222UpBJK/MhRX6HQkhWssWLrczxnVllySP5aCDkK2kDYW+Nz+i1kMkAjpLGWeuSgvgfotxg","spmpIBXsiGYgORNBJHIAcGgSNAMLd3QsTT9RJ5Mwa+SgFHubhJ6GwpgsXTgICq0XnAk4WR3tathwYkN7L589RPYKsIWcSZP166KJUM7Out0dzDNpI+nzCXgJZ+HLB1bCyz","6EWBq+biYZVp+2hMsqo4HAQd+LdJZ8HLrOhsu2afagpc5qA0vjyaZcJBNoJDoU7KQuaLijCU0GkP2sPO4VYTsuJttuHX0RQw3uiw5I1K/kdtoSXiGXJ8aZBdgPHPLaoEnD","C5NeAOuHsaLgcZCEW0agnRBRtUnw+HQ7Oj9kPYko5RLBRmokzZeqRr9q20B+mcCtQPkfEKU5dPeOTzigjsd/aP9oNNdF0v8BoayEcF1CHtDDvDYt+DQ8pW4Tw/GuzDPwNk","XpPs/QO/4xsYLxlrHw/XwOgMjwYHnRyRssYSSdV6FFCmSDsPJDQAD+w0GqlgEaOrE3PPPXyxdFOe0EXFURjfX3YJ+KLFokCN7wf8eoGPvI56QLSQrLE0bnKXg+eRdOCDMP","YnD1nj45o1XmeLkzv3ejNhNZ+ZvZm0CIGtMxaPZK+bTRZP1O0HQiEj49oUH0t7NiHuYPEEZ76RgynovFAAabB4KLxQA4NRdWkJCFnr4Q+51lGBN+rmK5zKQ5aAR9TSiNhs","JJQhxlHJK+jgqAxWkmebxuo1Cc8RVpJmzFvNEhfyoSx1uyvDQ8iPQFnkI+Luv0gB7Czzt4fg1f2/xP1PDYGL4MZNqeDJ/mNCdIjCCfzPYzB3EoOkPU2sViRpJfJEqH13QN","OqEnU6x/uF331VsTbrxUW6we7vlFAVdi7dgIZ6qy0Mh7z9dfvVm5MDXhU6pB7g9gFONsqmudF8ueK68zGoDHxRC7KkbZg9Ia5cL5MneypPPtlTaTzmmpDSd0rZdYv8Epvc","Gl6cgHElfkjTtGdB7mcRHkC+nwqrP88mIYv4PE5c1z3Zg3FqMA7Q6R8k7/q5CqQJBtKQq6tIuf/1l/PL88/kBJgRmTXSuVoinX+dM6vfBozhLcAxk8oIcR9WkOGOnEMTah","Hguc/GcQg0gAEpnzpkkkGwG8GOCFCWXLM5JRdviRwdR3I6bGnO3vC7hm1VFwBds/rvwUwJOuEE+DNlSqtTHvEEWEcgMoBFAGrikAEDkkzhZYZhS8Rh1JAnIXWIYBMygYFz","RqYspb8RKhQiajonEzqjok5GQApWsww2MnS1iGRhz6rZopzWyvnlO5DhB27UD7k/6Vl+en0RQeiMW/0C0qbW4OTN1c+E44uTPQXBwNvTzMu5WDDw6uPnd1/J5cXb88/AyI","tNnLyKk1H2KF6W7lWAT/SeJSAEc8kDVsjVgxi+Pfv5/MvDGL6l10z8fgwDBPNDGJ69O3uzEbuzEfWfqgow5ex3qAPO36gPf2cJAVvtkDuUrYRHhEUg4TOU+YCBnqCkI2la","JFZSj4+mKSOSQISJKYOV6ZTCe7D3Ewq2AtXFvBbcJWehAGhS6yjgC9oV46JgvXEKGHaglAD5VXMMJpyMYmBHwhOXfIItgQ2/I7jVlAISPY0P7JIE8SjJAgBSLDpSmMuxKX","eI9ckDFgDaMzqH/cNyaRZRXB4wV4PqGot0e6K+Pighn85+uTy7Il++Xj1C1z5JVJ8qytrOoXSkiDQYJL1nafKAYgwslE8mLGG4f0mrRs5NDpY9BNoQEKUAmBpOKUxxyJgl","E5ZCOA6BALXLtNqoQmrZR+mQHD8HNkSvw3hiFQT78vHT5Vfy4fzq7B9bth/SAQvLrg33z0725HMAJtPmYo2/s4ANpR0d02gE/Bzjg7dsBLhzqSfxDGM1cLdhJl/PUl42sS","d7akB94DWfWf0rGjB/xauEfMs8cCkAPvcrxbA9hXohlDDyPTjkXBLLJbK1hPgCAEYJnYJdyOlR2BZJDlj4IgCW4dNpHADUKJsC1n7N5EAOdPji6OXxq5ybK8vV0VJh8oq6","fEC/maNjKgYFRh8gaIlqq39gyZgO6DPyGiKrCARUSpr0d3DvsxAimIBD/ILYGZDrLN6XD5fabtIBD5FHkUd2QtEd7IxEFwwYj/BuT97KFxyvuIA3E/mG528oGSds2LNwWX","wIc9UQincukRsFJcJokIz4AHBFdXAIRZNIlUoSDDWiKbtbo1UqsLfyUCD3/ZJO72Iw0uj+S/ojIquvnhfe/4E4QktBKlD2XwNdwAOkAuKaevxQJqaMndBRFWu/yQYZKu8e","XzMhjzjl0LdZkk3X2dMjlI8xvcPg5XE29erip4vPVxf/SsCUXl182GRNf0bdfJopxQKEevJ0zQJT8INKVec0QDoHAUHe4O9tPJEC/jpTqoHuG5hUj2QZGXOfYAwMpv3OBe","x3wZ2CXSN4AoF+OgLnPJtT9MtSQYwrQMsPPvxk0L8ytm1OZ4BPP3ctvK5ZdacKm7n8Y1yp4vYFeX/26ezy4vJsY/JxDiY+/P9kPcMFfx/zjU/lSUlNJdxcFPDmEdKgx0UQ","a8mACJJ2Cmy7SyVPTRYkIwH1yGfXdAb2CUK6O0h24lmYqTwHAjc1h455SCDqC2smK9/7H8Th1+fvL88/nJOrr5/Pry4eyTdjLzdw7jwi9A7DnQmfUHsN85BI4gN6nzXcK1","F5A3A/njwMnd5uhb6Bk++AiaFSbSLzJ4y0SWOU+cAhUDXQ2BBdCyTzKYQSM2B0hNFECI8YaiYE1SEEIjSxMUPAAJ8S+C2AY8D/DB+ChwPxkBYjwrj7QoXYJGCo9m2p66Dz","NElB04xhESAqU5QvGoIJcclbYOQco89EShGkJRhhDykZMYjt0U6gCRqAYbmD1zmcXJbqBhDsUPIeoksm/ZO6ekJm+/7r5eXZT+AY3p69u7gEk/GAJCGfQBt4+nhJfff1p8","uv78EUfcEFHieppUAZ4pdQOc61y6V+wmei78cROuWIjiG06UXshnz9fHnFaOKPMT2apg0ItijGjW4qn9ruCEhmTdjcsvEwmgS9xdJRnho4nWK9p/es0x1C+CSjUZb6DWYv","EiayJCJXApKwETxwEyatVmPv285J3/q+N3JYr99YWDuWZ+3Q6axrOdYJXkPkA5d9vBzh5a61C5f/zGK4WX5j3217mS+Wzou1Gj9l0wEEMsy+v2/brogvY+wi0RhYIml9+W","yV5mJNqsEcYebvVhIRjI8rpIYwZbfJmrurmhXhG8BE2E2rTH2rWGsEwXyEqPJh4xmz1YJWC0+ckR+i94GKsTsM4zhpvKWCuVF807D3OuzAbrGupqU4OThqt0/lUNkR4chL","Wf5riL2jtg0IkGCCQs8sT5wcHx2a8WYQQsBRYKbVqMpbOQFfgzCp90uaziOf5BuhM65ophDnPXpDuSBDJvxxgzWtUxCUntVkEZ6Xfv188SaeziCriERDy5ztiNPFlIlxHH","jWp49XXywHS48sSb2F9UZVY1tf5jNAzcJmFa6kce+3NI6spYMFSu8fVx9/clPJVz5Eui+965gHpG13kb7cjSe2GCfxDUEBP08SoKqVsCBAfxOAubOaHOZTyN+blg1yrQnM","XVylYdc3LSubDXshkvki0DtGQlh7EAuwcO8aLC9IFmCKRMhlH3FqBLEPljkSqEbnaKEi8Xp+ETRkzRSkFHKMN6Yhas4Emso70iI0gDhLyNoJm4O1jEDVcAlJddZr4MZQUF","DOL64+aiG33RQIxhptp9MGQvc+Dn6DxM+VCWLaCFxpke7vF0tUxyCDkZKZvT5rCkdR7wF8eRSxBLMfxDbiMl0iVrOCj9K7L5A813QPBGtnyoMANFm7IJgZqBP4dzr9mrJT","A2v11Uat9qw5ZPx2s2HmfLxj4v7+23fbBRRHYnxqIddLL0GDZg2wQMylQRNkrQk6Z7u/xTxqWGSPILI2PK4iHbBZrHDGq1Ow8KOQw6hfPr63bGcj6Uz1u0y+HIblVQxPNs","c8rf8WV5LgYdERD13pNb/KAHvOBXptp6gOKGKCiyxFWsRH8yyj85uERiNw61K8fSx/QQD//mcJn2JpxiSPoalf7drNFXMo6/e7TWk2rS+wEJWVDMsJXCHvbP1O5taAp+AQ","xFsO7BTupdSB9UbbrMftH4IZogIwpxPBhwhIXuwfmhEv0RAF9fcvR3YVCxnIWCDI+rHJLOTakCyUBcGMUSEtl0NkvLlu0Gc2ZHjoFmLYAa/k6EQ/VBNW9MiNHDTECsCnol","CI6KtilsJaEkL7C2uz7Khzj6qhAF8DeORlW2BMBfltwFTpfR24opr+aGCqSr4OWJVGjwCFifU6QHXubYOhcrR1UFYZjLIEEaHxY6y3WXlNLI8G9YFREJPb3XwMBe9xzfSw","Z70e29lpMGWMe2p51wAv7as+S8AssW4WvbWXyLboFwzGdnaeVYMymLYR21L1pOaCUnR3+NYDO1cyxGYZF1w4H2+0w01tZvPhsigqnaxjTtScEIVMXU4gmRDqUvomdalCWX","WdHzw4SnnkdRFYGaA5HzdvGg80bEXI+3vLUnu4AUxoCs7dhY1MG8hj3PUVxLxl6UNnobZq2w4vDymJVnmQDJWj3qqWdlEKol7kDnkoIFoVEAQDf2kgcQL6gXsRxaziqXB5","UMeZQ3aTBeDamW3bOpakm4VUHx+qKCkyqlCOVmjJQ+3WC2996XoIeFrjJOQuw55ldYcQYmkWkHhIojwQOYCA0nAn6gl3TNOGSQpwR8DhHl992g2bVQRkalO6H5j0vIxkIG","N0TEAUQVsYErCCmqe71fqO3NXfzJR8mLTLss6jIoDd9YXI/gkGubgioIxT5G0RLViYFDBlWGXMjRfl1zorQG05Q8e2eSXpTPmU7MrtqJsiTsofFXqJz1diJE0OMM6n5aAG","rbjPidoNBkIJqqzeTpUCBXa6LlNqDk2wNwEZ0IhOdytkTu7ItZWXWDVpdyXgBq3zBAZDqqUKcpWhu5sqG8EoX7VW+SLV2heo8xUPG7/uGpbt2r9aeR0Sz9zD8nk3RmZ1gO","CLV4qqoFobQOrSpgaHW6jDWymjT2JBr1SXQAF199ddLKqrEsc8byPYVJtfAxZSCXmMUMf0g24+KLCULNm+b2nz1lDyXPcuUH8rDTcUJFfJeF7uhSjTsZZmG1PWB2MD1rVu","OqQG8XBC4LU5Dg7RRTpYrZpSWQlIsyjTdWdj3ZyyNQwLn1P4rwXaP4j8uhvjp1PIMawT2X7dPxGqyUYkeIkHTGN58R52md+o4DC/fYeFufzuU4wtIfk0WYrL72XFLL+7ii","N1vYfL7ZmlZYOPDGPr+IIFP6eQvzaEwyGSXTCkokQ1MIScKgPbaPd6PX5qdVzL66jLfbjcV5cHcMmbnablKkYJXDZAuwJGVjk66cpK7yDfkbZS5ImEhelOaa56Sa9pVIUp","nxdFyjUvh3wQr3mMdbG5tCnqeUVWdrVlFmiZ88lISGtpO0AYfKJapfYUa8G6sjVCN2ZRdqftvjzaLjnPLZFs0ddSzhiZsyGwPoUg4kkyhgcORmjQ+Od3H4Ms3C411fVzmW","FKZoybf6yAgO/Ph5IYFi+N1/f5JH0PaXq/12mfWkkMWTx6p67YKKnRigCWAoOS/OWer+THV6QTCwQrgknr0iHWS4fYKB1JLcd8lIiUGovKIiIKI0WD11mIxShTYVybMQ45","1v16fR0qSMUEgudV27w0Jk6V6pZj01PrbxiW5vcywMAfpRprHt8XAbrKlFUltBqDrpJIFTYGcaopIgNOXpJ2JZml8DPC8JPZHNmgZCJnb7TKWyUUilaRXbYHG+ObB9zZbl","M0rcauXE06sTd8Qss9dLmw5FXH5qrALLsbWZ8fflZsQ5GsODrM2VaQKh2w1aHk+YyTu/ly0byUhGmOShahdGGmZqRKpjayuqYm9Ns2OhzImKgzAO4P9PMW1RflymXb7m7J","8nVD00qaL/Ew8qRzocnmXKjcV6QSogqAclI02ZoUKS1W7Wxr+sICXkmWxj9sqV+Xusw22+iu2kXdMI//DGcuewoDjmbiB4yp5nvZohobWib4eJ12FFYuR8EU3ZWBryR9aK","ZY2UxZNoywLt4ShaVdhbcq3IVsOxAwbisx6C7Lh8sMY5pwQXuLZT1zliva6vW3ckr8vce0VPuw/ARM+MbZGvmkp3K9HArc2F4EdEB5T+xFw0D6lnzvla6VFs+yFE8zlsvy","GjzKl7fzGex7RbkLsHrlgcS/HLK0VsbQlTHAI2MmsFbaatDSnV0cOKqY8SwUDR44I3nENioXFLCcYPS53R2BfATlV7pSs4JQHZ0SqX0k9cbxUbNXoOS7Eilj66Nl6Zw0ZC","kHK7kOZ1UE0Vg/61Sx1hUStFkgjmZQGx+UdFIWjdi2ohFOLmY/sD1W8AfWMcj7gHwBwqBbbDKgIaoTc8DM4udVk82bvb83Y/r7L8wJqbVp54D7zs6zgoa6ImcXE/Ve0t7m","nWiLXLHp8pML7B0tl4kCbgpLZZu3q8sTZG0dCBJpPzUR+mqN4xoh5gPw3FZF4qWyU24k10yfWf1PHq6oRtQKVuZYASmVr2ErL1DeKw0BixXOpzYM1Jzzc841OyjHYxneqr","Rby/RYn0pOYmmUtAPKQ4CHjZE+vn8GMekzbfiS7zYk8ltk0GT87aXdVQtXTFChgGh7culoFc9p+XkeL2Qi62217tbW2EQ25q9EJho/E5qg3lYfVYINQOER8Ualy32lJDuu","lmQnyFa1pNS+qvJMCjLg11A8yoyjGZlCtwMrl4zapEy7bl2qJnG9VIv951KA+//77//2H6SqSRPUpFyFJrLclUcNqtluneoARjBtIoMh3ZJXr02ab6uO9SdiRHWO7Ta1bE","+cNoh0vZhUYwC4oVUeSNJNWYnuhckrzjHylGchKxee9a7aZWU5ReXCs36pd1xZDtYu4EW178pyIJ+ImGd9jHzsD0jjCMDic1nT8Ky/8xS/rMAbDg9RUDxL5vkEO4vhmWqq","8qwr3Vy1JzurrGXRMQCSm/B6y4BSMJW+iW+d7y0GP5Q8i3WivFFRVGOU/Qgxx86KinSbthPxrf0dVr+/72j/vTkl/Ead8DsogEDPnCeFYJ7ZNwoAaO2oW/ckGyHSX2e+qH","5DeShbELkZpL7Q3G2WmmkgjflruMcB+F8qzcyPyC9VN1G4Ghp3n0DRaGvcXDphy6V0hfXm1L7G+PZ3N5RnDNjbQxMGdGx/t4sE7ki34bAnyYRuX9suFCvigLwX23jPnei7","LAiICu/54zJ9xYnoKZxYsw+xjhW1FqO8P/vhA2nVFI4nleY0WeUZeYPdr2/3Ro6ls1phyA8MAy5aV5hA0pBg52SpA5mMeAI5Xlc1NxUHG8J2zJG1tQlpGMZUc9Sa1ig+s5","wFHlx4eVEJMjw1UPdVFY1TGsePIebNnoxfpyxN6QjTkNXF8QhC9dQB0YY8mWIHWq0rJmDgOrAEw0N4QaaQDtr2NlxTHv7RqJZ6rh9mr2n8/lMZXD502cri8sBVUqP7VV/P","mc9WizbeGR5JPkRyCf5PEpD8lGqjcJrV/wSWl4/xNq6Pg2B5HlRXV8u8rnxxYY788Osk6wdxKrdA53Kom2Yf0f6iZASba0EyHzcN+2GKaSiu4oTV5FX3uwdsxLCnjcneen","UXofJOMkgCSCw/JUABXk9K3BuQ0mDrMcdg4ImcpljqYjs7+Euc5gQudZ4HGGUhhT1LEkq2i0qqNq2WhZVdEoBt/yEBydlQfHC9yHut1Qdgei8w4OE22gJe9bvDxUaWmK/+","wFOjx3P153Xqw0EgyfZuIfW5o+bmqSW/yQMyyU8GC1zyY2a2BZFVeAoHp7oTZzsA9cGhAcDyTurts+SXoSBELv7lgd4zEGVX/UWoi0jEP3N201gM2Jhe8zjxrHQax2KMFc","ntQNWXhngc5mfpmvbh4su4h81/BaDcmy4Zdsut40Z5MAdQ7Z4cv8cx+mFosaonEjwoyhRXAC2RJPcs/FQP9tn9gY4x+ZXfSH4raJqrYbq+ZxH2fv2Yuap8nIiep9rfpinR","/XGKOuIpMu/wXuMJErnNZT+CizDM6KWAXJ3XZqxx7AjY+GZLtXVAjpMDOeVgvKJsKr/P0Z8Ig/5izKPM4bpPjXHEl68fiPrDHOeyEy1nLWSfLjmfSg8Pk9HJa5bUvw5pd8","3B8APKKYBF3cg1fwqqmEl7j5JMJ3xgnPq4VOUNaQ+rT07cazsJ/Pd7ZrGsV1CtUyLRajuqZ1qf0buh4mHi0e0W/W6PVUDhAMWZ76UOBAN8KbkZN3tRSZHQ7yb4CHI9iiy6","wyewCVdOdfxm0wm1aVd/WbWR6W9FeITpqFPLTmGBxN7LbNsDmFwIfgpPvRfYlfwXy6FVLc8gC6OyKTRuNpJTbJHHR1P8swv4NFEVSwPJIi3lV2XEAlIE9wG7BoEFn6r+Qg","xwS4++v/exc8ceJIxOliVjUUVhTAWtmIzlkEc0DOeLla+RnLIMdZZL7amdlIkL/Cs+oKENY2fAtlTn398/roXUuH/ngB3a3ZM9/YUVZIoq05N/Lvf/AMzOrB8+VwAA"].join("")
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
if("sira"===a)continue;const n=(e.kartlar[a]||[]).find(e=>e&&e.kod===t);if(n)return n}return null}function AYNA_TS(ts){const d=new Date(ts*1000+108e5),ik=n=>String(n).padStart(2,"0");return ik(d.getUTCDate())+"/"+ik(d.getUTCMonth()+1)+" "+ik(d.getUTCHours())+":"+ik(d.getUTCMinutes())}
function AYNA(kod,z){const f=v=>Number(v).toFixed(2),yz=y=>(y>=0?"+":"")+Number(y).toFixed(1)+"%",fiyat=z.f;
const yukHed=z.yuk&&z.yuk.length?z.yuk[z.yuk.length-1].v:null;
const asgHed=z.asg&&z.asg.length?z.asg[z.asg.length-1].v:null;
let m="🔎 <b>"+kod+"</b>  ·  <b>"+f(fiyat)+" ₺</b>"+(z.tf?"  ·  <i>"+z.tf+"</i>":"")+"\n";
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
return m+"\n<i>Seviyeler kapanışa göre değerlendirilir. Fitil kırılımı sinyal sayılmaz.</i>\n<i>⚠️ Yatırım tavsiyesi değildir.</i>"}
function P(e,t){const a=Z(e,t),z=e&&e.sozluk&&e.sozluk[t];
if(z&&a)return j(a)+"\n\n"+AYNA(t,z);
if(z)return AYNA(t,z);
if(a)return "🔎 <b>"+t+"</b> için güncel durum\n\n"+j(a);
return "🔎 <b>"+t+"</b>\n\nBu kod taramada bulunamadı. Yazımı kontrol et (örn. <code>THYAO</code>) ya da yeni tarama sonrası tekrar dene."}function PY(uname,userId,chatId){const link="https://t.me/"+uname+"?start=r"+userId,paylas="https://t.me/share/url?url="+encodeURIComponent(link)+"&text="+encodeURIComponent(DAVET_METIN),menu=u(userId);menu.inline_keyboard=[[{text:"📤 Paylaş",url:paylas}]].concat(menu.inline_keyboard);return{chat_id:chatId,parse_mode:"HTML",disable_web_page_preview:!0,text:"📤 <b>Sistemi paylaş</b>\n\nAşağıdaki düğmeye dokun, Telegram'da kime göndereceğini seç. Davet bağlantın otomatik olarak gönderilir.",reply_markup:menu}}
const Q={potansiyel:"🟩🟩🟩🟩🟩🟩🟩🟩\n📊 <b>1 SAAT</b> · orta trade\n<i>yalnız 1 saatlik sinyaller</i>\n🟩🟩🟩🟩🟩🟩🟩🟩",fibo:"🟦🟦🟦🟦🟦🟦🟦🟦\n📐 <b>4 SAAT</b> · orta vade\n<i>yalnız 4 saatlik sinyaller</i>\n🟦🟦🟦🟦🟦🟦🟦🟦",uzunvade:"🟪🟪🟪🟪🟪🟪🟪🟪\n🗓 <b>1 GÜN</b> · uzun vade\n<i>yalnız günlük sinyaller</i>\n🟪🟪🟪🟪🟪🟪🟪🟪",haftalik:"🟫🟫🟫🟫🟫🟫🟫🟫\n📅 <b>1 HAFTA</b> · pozisyon\n<i>yalnız haftalık sinyaller</i>\n🟫🟫🟫🟫🟫🟫🟫🟫",adayHafta:"🟨🟨🟨🟨🟨🟨🟨🟨\n📅 <b>1 HAFTA</b> · adaylar\n<i>henüz kırılmadı — tetik bekliyor</i>\n🟨🟨🟨🟨🟨🟨🟨🟨",adayOrta:"🟨🟨🟨🟨🟨🟨🟨🟨\n📊 <b>1 SAAT</b> · adaylar\n<i>henüz kırılmadı — tetik bekliyor</i>\n🟨🟨🟨🟨🟨🟨🟨🟨",adayOrtaVade:"🟨🟨🟨🟨🟨🟨🟨🟨\n📐 <b>4 SAAT</b> · adaylar\n<i>henüz kırılmadı — tetik bekliyor</i>\n🟨🟨🟨🟨🟨🟨🟨🟨",adayUzun:"🟨🟨🟨🟨🟨🟨🟨🟨\n🗓 <b>1 GÜN</b> · adaylar\n<i>henüz kırılmadı — tetik bekliyor</i>\n🟨🟨🟨🟨🟨🟨🟨🟨"};const _ANA={async fetch(p,A,q){ORTAM=A;const $=new URL(p.url);if(n=$.origin,
i=A.PANEL_KEY||A.PUSH_KEY||t,"/surum"===$.pathname)return new Response("Fix Borsa Sinyal worker surum "+a,{headers:{"content-type":"text/plain; charset=utf-8","Access-Control-Allow-Origin":"*"}})
;if("/setup"===$.pathname){
const e=(e,t)=>new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="margin:0;background:#0d1117;color:#e6edf3;font:15px/1.6 system-ui,sans-serif;padding:18px"><h2 style="margin:0 0 10px">'+e+"</h2>"+t+'<p style="margin-top:18px"><a href="/" style="color:#388bfd">← Durum sayfasına dön</a></p></body>',{
headers:{"content-type":"text/html; charset=utf-8"}})
;if(!A.BOT_TOKEN)return e("⚠️ Bot anahtarı yok","<p>Cloudflare'de <b>BOT_TOKEN</b> tanımlı değil. Worker → Settings → Variables and Secrets → Add: isim <code>BOT_TOKEN</code>, değer BotFather'ın verdiği anahtar. Sonra <b>Deploy</b>.</p>")
;const t=await b(A.BOT_TOKEN,"getMe",{})
;if(!t||!t.ok)return e("⚠️ Bot anahtarı geçersiz","<p>Telegram bu anahtarı tanımıyor"+(t&&t.error_code?" (hata "+t.error_code+")":"")+".</p><p>En sık sebep: değeri yapıştırırken başına/sonuna <b>tırnak</b> veya <b>boşluk</b> karışmış olması. Anahtar şuna benzer görünür: <code>1234567890:AAH...</code> — tırnak yok, boşluk yok.</p><p>BotFather'da <code>/mybots</code> → botun → <i>API Token</i> ile doğrulayıp Settings → Variables kısmına yeniden yapıştır ve <b>Deploy</b> et.</p>")
;const a=await b(A.BOT_TOKEN,"setWebhook",{url:`${$.origin}/tg`,allowed_updates:["message","callback_query"],secret_token:await whS(A)})
;await b(A.BOT_TOKEN,"setChatMenuButton",{menu_button:{type:"web_app",text:"📱 Uygulamayı aç",web_app:{url:$.origin+"/app"}}}).catch(()=>{})
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
/* Absorpsiyon havuzu her turda bir dilim ilerler; birkac dakikada
   tum evren taranmis ve surekli tazelenir olur. */
q.waitUntil(kilitli(A,"absDilim",50,()=>absDilimTara(A,[])).catch(()=>{})),
q.waitUntil(kilitli(A,"kap",90,()=>kapKontrolVeGonder(A)).catch(()=>{})),
q.waitUntil(kilitli(A,"temettu",120,()=>temettuKontrolVeGonder(A)).catch(()=>{})),
q.waitUntil(kilitli(A,"portfoySnapshot",60,()=>portfoyGunlukSnapshotAl(A)).catch(()=>{})),
saglikArtir("push")   /* sayaç bellekte artar, KV'ye en fazla 60 sn'de bir yazılır */
/* Formasyon taramasini da tetikle — arka planda, yanit beklemeden. */
;const frmDurum=await formasyonTetikle(A).catch(()=>"hata")
;const n=t.kartlar?Object.keys(t.kartlar).filter(e=>"sira"!==e).map(e=>e+":"+(t.kartlar[e]||[]).length).join(" · "):""
;return e({ok:!0,surum:a,depo:!!A.VERI,sayim:n,guncelleme:t.guncelleme,formasyon:frmDurum})}if($.pathname.startsWith("/panel")){
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
headers:{"content-type":"application/json; charset=utf-8"}})}if("/panel/ayar"===$.pathname){const e="POST"===p.method?await async function(e,t){const a={...h,...await S(e,!0),...t}
;return a.kisitMin=Math.max(0,Math.min(600,Number(a.kisitMin)||0)),a.kisitMax=Math.max(a.kisitMin,Math.min(600,Number(a.kisitMax)||0)),e.VERI&&await e.VERI.put("ayar",JSON.stringify(a)),w=a,
O=Date.now(),a}(A,t):await S(A,!0);return new Response(JSON.stringify({ayar:e}),{headers:{"content-type":"application/json; charset=utf-8"}})}if("/panel/kota"===$.pathname){
const e=await D(String(t.id||"").replace(/\D/g,""));return new Response(JSON.stringify({ok:e}),{headers:{"content-type":"application/json; charset=utf-8"}})}if("/panel/yayin"===$.pathname){
const a=String(t.metin||"").trim();if(!a)return new Response(JSON.stringify({hata:"mesaj boş"}),{status:400,headers:{"content-type":"application/json"}});const n=t.hedef||"hepsi",i=60
;let r=[],s=null,l=!0;if("test"===n)r=[...e];else if("tek"===n)r=[String(t.id||"").replace(/\D/g,"")].filter(Boolean);else if("vip"===n){const e=await E(A,!0),a=Number(t.imlec||0);r=e.slice(a,a+i),
l=a+i>=e.length,s=l?null:String(a+i)}else if(A.VERI){const e=await A.VERI.list({prefix:"u:",limit:i,cursor:t.imlec||void 0});r=e.keys.map(e=>e.name.slice(2)),l=!!e.list_complete||!e.cursor,
s=l?null:e.cursor}const o=new Set(await N(A,!0));let c=0,d=0;for(const e of r){if(o.has(String(e)))continue;const t=await b(A.BOT_TOKEN,"sendMessage",{chat_id:e,text:a,parse_mode:"HTML",
disable_web_page_preview:!0});t&&t.ok?c++:d++}return A.VERI&&l&&q.waitUntil(A.VERI.put("sonYayin",JSON.stringify({tarih:(new Date).toISOString(),metin:a.slice(0,300),hedef:n}))),
new Response(JSON.stringify({gonderilen:c,basarisiz:d,imlec:s,bitti:l}),{headers:{"content-type":"application/json; charset=utf-8"}})}if("/panel/csv"===$.pathname){
const e=await a(5e3),t=await Y(A),n=await F(A),py=await PK(A),i=new Set(await E(A,!0)),r=e=>e.map(e=>'"'+String(null==e?"":e).replace(/"/g,'""')+'"').join(",")
;let s=r(["id","ad","kullanici","katilim","davetci","davet_ettigi","paylas_tusu","sorgu","son_aktif","sinirsiz"])+"\n";for(const a of e){const e=t[String(a.id)]||{}
;s+=r([a.id,a.ad,a.kullanici,a.katilim,a.ref,n[String(a.id)]||0,py[String(a.id)]||0,e.toplam||0,e.son?new Date(1e3*e.son).toISOString():"",i.has(String(a.id))?"evet":""])+"\n"}return new Response("\ufeff"+s,{headers:{
"content-type":"text/csv; charset=utf-8","content-disposition":'attachment; filename="fixborsa-uyeler.csv"'}})}if("/panel/veri"===$.pathname){
const e=await L(A),t=await F(A),n=await Y(A),i=await E(A,!0),r=await N(A,!0),s=await S(A,!0),py=await PK(A);let l=await a(1e3);const o=e=>{const t=l.find(t=>String(t.id)===String(e))
;return t&&(t.ad||(t.kullanici?"@"+t.kullanici:""))||""};for(const e of l){const t=n[String(e.id)]||{};e.sorgu=t.toplam||0,e.sonAktif=t.son||null,e.paylas=py[String(e.id)]||0}
l.sort((e,t)=>(t.katilim||"").localeCompare(e.katilim||""));const c=Object.entries(t).map(([e,t])=>({id:e,n:t,ad:o(e),paylas:py[String(e)]||0})).sort((e,t)=>t.n-e.n).slice(0,50),d=Object.entries(n).map(([e,t])=>({id:e,
ad:o(e),toplam:t.toplam||0,potansiyel:t.potansiyel||0,fibo:t.fibo||0,detay:t.detay||0,son:t.son||null
})).sort((e,t)=>t.toplam-e.toplam).slice(0,50),u=Math.floor(Date.now()/1e3),f=Object.values(n).filter(e=>e.son&&u-e.son<86400).length,b=Object.values(n).filter(e=>e.son&&u-e.son<604800).length,p=await g(A)
;let y=null;if(A.VERI){const e=await A.VERI.get("sonYayin");e&&(y=JSON.parse(e))}return new Response(JSON.stringify({toplam:e.toplam||0,gun:e.gun||{},basis:e.basis||{},kullanicilar:l.slice(0,400),
referans:c,sorguLider:d,vip:i,engel:r,ayar:s,aktif24:f,aktif7g:b,sonYayin:y,listeGuncelleme:p?p.guncelleme:null,listeOzet:p&&p.kartlar?Object.keys(p.kartlar).filter(e=>"sira"!==e).map(e=>({ad:e,
n:p.kartlar[e].length})):[],depo:!!A.VERI,agac:l.map(e=>({id:e.id,ad:e.ad,kullanici:e.kullanici,ref:e.ref,paylas:e.paylas})),paylasToplam:Object.values(py).reduce((a,b)=>a+(Number(b)||0),0)}),{headers:{"content-type":"application/json; charset=utf-8"}})}return new Response(await async function(){if(G)return G
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
return JS({ok:!0,onay:onayli,onayMetin:onayli?null:ONAY_METIN,yon:YON,super:sup,ref:ref,kalan:ref%20===0?20:20-ref%20,fav:fav,portfoy:portfoy,portfoyGecmis:portfoyGecmis,portfoyGunluk:portfoyGunluk,portfoySektor:portfoySektor,kartlar:kart,guncelleme:gun,temelDurum:temelDurum,dusenler:(L2&&L2.dusenler)||[],
link:"https://t.me/"+un+"?start=r"+uid,davetMetin:DAVET_METIN})}
if("/api/hisse"===$.pathname){
const kod=KOD(gov.kod);if(!kod)return JS({ok:!1,hata:"kod yok"},400);
const L2=await g(A),kart=Z(L2,kod),z=L2&&L2.sozluk&&L2.sozluk[kod],fav=(await X(A,uid)).includes(kod),poz=(await XP(A,uid))[kod]||null;
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
return JS({ok:!0,kart:kart||null,ayna:z?AYNA(kod,z):"",fav:fav,poz:poz,gecmis:GC})}
if("/api/mumlar"===$.pathname){
const kod=KOD(gov.kod);if(!kod)return JS({ok:!1,hata:"kod yok"},400);
const tf=mumTfNormal(gov.tf);
const ar=MUM_ARALIK[tf];
const r=await yfMumlar(kod,ar.interval,ar.range).catch(e=>({veri:[],hatalar:["yfMumlar istisna: "+(e&&e.message||e)]}));
const mumlar=r.veri||[];
const desen=await formasyonBul(A,kod,tf);
return JS({ok:!0,mumlar:mumlar,desen:desen,tf:tf,debug:r.hatalar||[]})}
/* FORMASYON ROZETİ + LİSTESİ — ikisi de tek kaynaktan, GitHub Actions'in
   yayinladigi formasyon.json'dan okunuyor. Yahoo istegi yok, hisse basina KV
   onbellegi yok, "en fazla 48 hisse" tavani yok. */
if("/api/formasyonlar"===$.pathname){
const kodlar=[...new Set((Array.isArray(gov.kodlar)?gov.kodlar:[]).map(k=>KOD(k)).filter(Boolean))].slice(0,300);
const j=await formasyonlariGetir(A);const sonuc={};
if(j&&j.sonuc)for(const kod of kodlar){const p=j.sonuc[kod]
;if(p&&p.tip)sonuc[kod]={tip:p.tip,yon:p.yon,kalite:p.kalite||0}}
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
  /* Hedefine ulaşmış formasyon artık aktif sayılmaz, listeden düşer. */
  const hedefTamam=(hedef!=null&&fiyat!=null)?
    (d.yon==="al"?fiyat>=hedef:(d.yon==="sat"?fiyat<=hedef:false)):false;
  if(hedefTamam)continue;
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
let kapSag={};try{const h=A.VERI&&await A.VERI.get("kapSaglik");if(h)kapSag=JSON.parse(h)}catch(e){}
let fon={};try{const h=A.VERI&&await A.VERI.get("kapFon");if(h)fon=JSON.parse(h)}catch(e){}
const L2=await g(A);
const fonListe=Object.keys((fon&&fon.hisseler)||{})
  .map(k=>Object.assign({kod:k},fon.hisseler[k]))
  .sort((x,y)=>y.n-x.n).slice(0,12);
return JS({ok:!0,
  surum:a,
  sayac:sg,
  kap:{sonBasari:sg.sonKapBasari||0,ardisikHata:KAP_ARDISIK_HATA,sonHata:KAP_SON_HATA||kapSag.sonHata||"",aralikSn:Math.round(KAP_POLL_MS/1e3)},
  fon:{gun:fon.gun||"",liste:fonListe},
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
if("/api/kap"===$.pathname){
const liste=await kapListesiCache(A);
const fav=await X(A,uid),pf2=await XP(A,uid),izlenen=new Set([...fav,...Object.keys(pf2)]);
const sonuc=liste.map(d=>{
const kodlar=String(d.relatedStocks||"").split(",").map(x=>x.trim()).filter(Boolean);
return{kodlar:kodlar,konu:d.subject||"",tarih:d.publishDate||"",disclosureIndex:d.disclosureIndex,takipte:kodlar.some(k=>izlenen.has(k))}
}).filter(d=>d.kodlar.length>0)
.sort((a,b)=>(b.disclosureIndex||0)-(a.disclosureIndex||0)).slice(0,60);
/* Liste bos gelince ekranda "birazdan tekrar dene" yaziyordu ve SEBEP
   hicbir yerde gorunmuyordu. KAP disaridan cekilen bir kaynak; sorun
   bizde degil KAP tarafinda da olabilir (endpoint degisimi, IP engeli,
   zaman asimi). Teshis bilgisini yaniyla birlikte gonderiyoruz. */
return JS({ok:!0,liste:sonuc,
  hamSayi:liste.length,
  sonHata:KAP_SON_HATA||"",
  ardisikHata:KAP_ARDISIK_HATA||0,
  sonBasari:KAP_SON_BASARI||0})}
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
if("/api/tara"===$.pathname){
if(!YON)return JS({ok:!1,mesaj:"Yetkin yok."},403);
const s2=await taramaTetikle(A);
return JS({ok:!!s2.ok,mesaj:s2.mesaj})}
if("/api/absAyar"===$.pathname){
if(!YON)return JS({ok:!1,hata:"yetki yok"},403);
const ayar=await absAyarKaydet(A,gov.hacimEsik,gov.darlikEsik,gov.puanEsik);
if(!ayar)return JS({ok:!1,hata:"geçersiz değer"},400);
return JS({ok:!0,ayar:ayar})}
/* 🧠 KAP RADAR — aynı bildirimler, ama kategoriye ayrılmış ve önem
   puanına göre sıralanmış hâlde. Üstte TEFAS fon akışı şeridi var. */
if("/api/kapradar"===$.pathname){
try{
const liste=await kapListesiCache(A);
const fav=await X(A,uid),pf2=await XP(A,uid),izlenen=new Set([...fav,...Object.keys(pf2)]);
const sirket=await kapSirketOku(A);
let fon={};try{const h=A.VERI&&await A.VERI.get("kapFon");if(h){const j=JSON.parse(h);if(j.gun===onayDonemi())fon=j.hisseler||{}}}catch(e){}
const sonuc=liste.map(dd=>{
const kodlar=String(dd.relatedStocks||"").split(",").map(x=>x.trim()).filter(Boolean);
if(!kodlar.length)return null;
const kat=kapSinifla(dd.subject);
const fonSay=Math.max(...kodlar.map(k=>(fon[k]&&fon[k].n)||0),0);
return{kodlar:kodlar,sirket:sirket[kodlar[0]]||"",konu:dd.subject||"",
tarih:dd.publishDate||"",disclosureIndex:dd.disclosureIndex,
kat:kat.kod,katAd:kat.ad,ik:kat.ik,fonSay:fonSay,
onem:kapOnemDuzelt(kat.onem,dd,fonSay),
takipte:kodlar.some(k=>izlenen.has(k))}
}).filter(Boolean).sort((x,y)=>(y.onem-x.onem)||((y.disclosureIndex||0)-(x.disclosureIndex||0))).slice(0,80);
const sayim={};for(const x of sonuc)sayim[x.kat]=(sayim[x.kat]||0)+1;
let tefas=null;try{const h=A.VERI&&await A.VERI.get("tefas");if(h)tefas=JSON.parse(h)}catch(e){}
return JS({ok:!0,liste:sonuc,sayim:sayim,sirketSayisi:Object.keys(sirket).length,
kategoriler:KAP_KATEGORI.map(k=>({kod:k.kod,ad:k.ad,ik:k.ik})),tefas:tefas,
sonHata:KAP_SON_HATA||"",ardisikHata:KAP_ARDISIK_HATA||0,sonBasari:KAP_SON_BASARI||0})
}catch(err){
/* Sessiz cokme yerine sebebi dondur — ekranda "Okunamadi" yaziyordu ve
   arkasindaki gercek hata hicbir yere yazilmiyordu. */
return JS({ok:!1,liste:[],hata:String((err&&err.message)||err).slice(0,200),
sonHata:KAP_SON_HATA||""},200)}}
/* 💵 TEFAS — ikinci kaynak. "yenile:1" ile önbelleği atlayıp canlı çeker
   (bağlantıyı test etmek için). Hata varsa ham mesajı ekrana basar. */
if("/api/tefas"===$.pathname){
const paket=await tefasOzet(A,!!gov.yenile).catch(e=>({ok:!1,hata:String((e&&e.message)||e).slice(0,140)}));
return JS({ok:!0,tefas:paket})}
if("/api/temettu"===$.pathname){
const paket=await temettuListesiCache(A);
const liste=paket.liste||[];
const fav=await X(A,uid),pf3=await XP(A,uid),izlenen2=new Set([...fav,...Object.keys(pf3)]);
const gercekTarih=liste.length&&void 0!==liste[0].odemeTarihi;
const siraliListe=gercekTarih?liste.slice():liste.slice().sort((a,b)=>a.tarih<b.tarih?1:-1);
const sonuc=siraliListe.map(x=>Object.assign({},x,{takipte:izlenen2.has(x.kod)})).slice(0,80);
const cevap={ok:!0,liste:sonuc,gercekTarih:gercekTarih};
if(!liste.length&&d(uid))cevap.tani=paket.tani;
return JS(cevap)}
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
guncelleme:G2.guncelleme||null});return cikti}
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

return JS({ok:!0,kurulus:KURULUS3,bugun:bugun3,
genel:ozet(hepsi),dagilim:dagilim,dilimler:dilimler,
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
return JS({ok:!0,uye:st.toplam||0,aktif24:Object.values(kl).filter(x=>x.son&&simdi-x.son<86400).length,
super:sup,engel:eng.length,depo:!!A.VERI,
guncelleme:L2&&L2.guncelleme?new Date(L2.guncelleme).toLocaleString("tr-TR"):null,
ozet:L2&&L2.kartlar?Object.keys(L2.kartlar).filter(x=>"sira"!==x).map(x=>({ad:x,n:L2.kartlar[x].length})):[],
sonYayin:sy,panelUrl:r()})}
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
if("test"===hedef)liste=[String(uid)];
else if(A.VERI){const li=await A.VERI.list({prefix:"u:",limit:BOY,cursor:gov.imlec||void 0});
liste=li.keys.map(k=>k.name.slice(2));bitti=!!li.list_complete||!li.cursor;imlec=bitti?null:li.cursor}
const eng=new Set(await N(A,!0));let gonderilen=0,basarisiz=0;
const fid=String(gov.fileId||""),tur=String(gov.tur||"");
for(const hid of liste){if(eng.has(String(hid)))continue;
let rr;
if(fid&&"video"===tur)rr=await b(A.BOT_TOKEN,"sendVideo",{chat_id:hid,video:fid,caption:metin.slice(0,1024),parse_mode:"HTML"});
else if(fid)rr=await b(A.BOT_TOKEN,"sendPhoto",{chat_id:hid,photo:fid,caption:metin.slice(0,1024),parse_mode:"HTML"});
else rr=await b(A.BOT_TOKEN,"sendMessage",{chat_id:hid,text:metin,parse_mode:"HTML",disable_web_page_preview:!0});
rr&&rr.ok?gonderilen++:basarisiz++}
if(A.VERI&&bitti&&"test"!==hedef)q.waitUntil(A.VERI.put("sonYayin",JSON.stringify({tarih:(new Date).toISOString(),metin:metin.slice(0,300),hedef:hedef})));
return JS({ok:!0,gonderilen:gonderilen,basarisiz:basarisiz,imlec:imlec,bitti:bitti,
mesaj:"test"===hedef?"🧪 Test gönderildi ("+gonderilen+")":"gönderildi: "+gonderilen})}
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
  menu_button:{type:"web_app",text:"📱 Uygulamayı aç",web_app:{url:$.origin+"/app"}}
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
;if("mc"===r){if(!d(a))return new Response("ok");return q.waitUntil((async()=>{let metin;try{
const G5=await y(A),GD5=G5.gunler||{},bugun5=new Date(Date.now()+108e5).toISOString().slice(0,10);
const gunlukOrt=[];
for(const gun of Object.keys(GD5).sort()){
if(gun>bugun5)continue;
const kay=GD5[gun].kayitlar||{},teklestir={};
for(const key of Object.keys(kay)){
const rec=kay[key];
if(!(rec&&rec.g>0&&rec.s>0)||rec.r===0)continue;
const kod=rec.k||String(key).split("@")[0],getiri=100*(rec.s/rec.g-1);
if(Math.abs(getiri)>60)continue;
const v=teklestir[kod];
if(void 0===v||getiri>v)teklestir[kod]=getiri}
const liste=Object.values(teklestir);
if(liste.length)gunlukOrt.push(liste.reduce((a2,b2)=>a2+b2,0)/liste.length)}
if(gunlukOrt.length<10){
metin="🎲 <b>MONTE CARLO SİMÜLASYONU</b> 🔐\n<i>Yalnız yönetici görür · deneme aşamasında</i>\n\nHenüz yeterli geçmiş yok (en az 10 günlük kayıt gerekli, şu an <b>"+gunlukOrt.length+"</b>). Sistem birikmeye devam ettikçe burası dolacak."
}else{
const TRIALS=2000,GUNSAYI=30,sonuclar=[];
for(let s2=0;s2<TRIALS;s2++){let bakiye=1;
for(let g2=0;g2<GUNSAYI;g2++){const ort=gunlukOrt[Math.floor(Math.random()*gunlukOrt.length)];bakiye*=1+ort/100}
sonuclar.push(bakiye)}
sonuclar.sort((a2,b2)=>a2-b2);
const pct=p=>sonuclar[Math.min(sonuclar.length-1,Math.max(0,Math.floor(p*sonuclar.length)))];
const yz=v=>(v>=0?"+":"")+v.toFixed(1)+"%";
const p5=100*(pct(.05)-1),p25=100*(pct(.25)-1),p50=100*(pct(.5)-1),p75=100*(pct(.75)-1),p95=100*(pct(.95)-1);
const pozOran=100*sonuclar.filter(x=>x>1).length/sonuclar.length;
metin="🎲 <b>MONTE CARLO SİMÜLASYONU</b> 🔐\n<i>Yalnız yönetici görür · deneme aşamasında</i>\n\n"+
"📅 Önümüzdeki <b>"+GUNSAYI+" gün</b> için, geçmiş <b>"+gunlukOrt.length+"</b> günün günlük ortalama getiri dağılımından "+TRIALS.toLocaleString("tr-TR")+" rastgele senaryo (bootstrap) üretildi.\n\n"+
"🔴 Kötü senaryo (%5): <b>"+yz(p5)+"</b>\n"+
"🟠 Alt çeyrek (%25): <b>"+yz(p25)+"</b>\n"+
"⚪ Medyan: <b>"+yz(p50)+"</b>\n"+
"🟢 Üst çeyrek (%75): <b>"+yz(p75)+"</b>\n"+
"🟢 İyi senaryo (%95): <b>"+yz(p95)+"</b>\n\n"+
"📈 Pozitif getiri olasılığı: <b>%"+pozOran.toFixed(0)+"</b>\n\n"+
"<i>ℹ️ Yöntem: geçmiş günlerin gerçekleşmiş ortalama getirileri bir torbaya konup rastgele (yerine koyarak) çekiliyor; her deneme "+GUNSAYI+" günlük zincirleme bir yol oluşturuyor. "+TRIALS.toLocaleString("tr-TR")+" denemenin sonuç dağılımı yukarıdaki yüzdelik dilimlerdir.</i>\n"+
"<i>⚠️ Bu bir tahmin değil, geçmiş dağılımın olasılıksal yansımasıdır. Gelecek geçmişe benzemeyebilir. Yatırım tavsiyesi değildir.</i>"}
}catch(e){metin="🎲 Monte Carlo şu an hesaplanamadı, birazdan tekrar dene."}
await V(A,t,i,n,metin,{inline_keyboard:[[{text:"🔄 Yeniden çalıştır",callback_data:"mc"}],[{text:"◀️ Menü",callback_data:"menu"}]]},!0)})()),new Response("ok")}
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
export default{async fetch(p,A,q){
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
