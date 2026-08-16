const e=new Set(["6819672343"]),t="kolayfix",a="11.2";let n="",i=t;const r=()=>n+"/panel?key="+encodeURIComponent(i),s=(e,a)=>{const n=a.searchParams.get("key")
;return!!n&&(n===(e.PUSH_KEY||t)||n===(e.PANEL_KEY||e.PUSH_KEY||t))},l="https://liste.local/veri";let o=null;const c=new Set(["tavan","potansiyel","fibo","uzunvade","aday","adayKisa","adayOrta","adayOrtaVade","adayUzun"]),EM=new Set(["menu","davet","bilgi"]),d=t=>e.has(String(t));let BUN=null,KVSON=0
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
t.push([{text:"🏅 Bu taramanın ilk 3'ü",callback_data:"ilk3"}],
[{text:"⚡ 15 DAKİKA · kısa trade",callback_data:"tavan"}],[{text:"🟨 15 dakika adayları (Süper Üyelik)",callback_data:"adayKisa"}],
[{text:"📊 1 SAAT · orta trade",callback_data:"potansiyel"}],[{text:"🟨 1 saat adayları (Süper Üyelik)",callback_data:"adayOrta"}],
[{text:"📐 4 SAAT · orta vade",callback_data:"fibo"}],[{text:"🟨 4 saat adayları (Süper Üyelik)",callback_data:"adayOrtaVade"}],
[{text:"🗓 1 GÜN · uzun vade",callback_data:"uzunvade"}],[{text:"🟨 1 gün adayları (Süper Üyelik)",callback_data:"adayUzun"}],
[{text:"⭐ Takip listem",callback_data:"fav"}],[{text:"👑 Anlık uyarı ayarları (Süper Üyelik)",callback_data:"alarm"}],[{text:"ℹ️ Sistem nedir? Nasıl kullanılır?",callback_data:"bilgi"}]);
return d(e)&&(t.push([{text:"📋 Ham sonuç metni 🔐",callback_data:"karne"}]),n&&t.push([{text:"🛠 Yönetici paneli 🔐",url:r()}])),t.push([BUN?{text:"📤 Sistemi paylaş",url:"https://t.me/share/url?url="+encodeURIComponent("https://t.me/"+BUN+"?start=r"+e)+"&text="+encodeURIComponent(DAVET_METIN)}:{text:"📤 Sistemi paylaş",callback_data:"davet"}]),t.push([{
text:"🔄 Yenile",callback_data:"menu"}]),{inline_keyboard:t}}
const f="👋 <b>Fix Borsa Sinyal</b>\n<i>BIST hisselerini gün boyu tarar, kırılım ve hedefleri gösterir.</i>\n\n🏅 <b>İlk 3</b> — bugün öne çıkan üç hisse\n⚡ <b>Kısa Trade</b> · 15DK — en net kurulumlar\n📊 <b>Orta Trade</b> · 1SA — hedefi en uzak olanlar\n📐 <b>Orta Vade</b> · 4SA — bugün taze kıranlar\n🗓 <b>Uzun Vade</b> · 1G — günlük pivot kırılımları\n🪜 <b>Adaylar</b> 👑 — her tarama için henüz kırmadı ama hazır <i>(Süper Üyelik)</i>\n⭐ <b>Takip listem</b> — kendi hisselerin, anlık kâr/zarar\n👑 <b>Anlık uyarı</b> — kısa trade sinyaline giren hisse anında sana gelir <i>(Süper Üyelik)</i>\n\n🔎 <b>Hisse kodunu yaz</b> (örn. <code>THYAO</code>) — yukarı ve aşağı hedeflerini birlikte gönderirim.\n\n📤 <b>Süper Üyelik:</b> her 20 davette 1 ay açılır, davet ettikçe uzar.\n\n🤖 <i>Yapay zekâ tabanlı otomatik tarama · 120.657 bar</i>\n\n<i>⚠️ Yatırım tavsiyesi değildir. Bu sonuçlarla işlem yapmak tehlikelidir; anaparanı kaybedebilirsin.</i>"
;async function b(e,t,a){return fetch(`https://api.telegram.org/bot${e}/${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then(e=>e.json()).catch(()=>null)}
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
async function yfMumCek(host,kod){const u="https://"+host+"/v8/finance/chart/"+encodeURIComponent(kod+".IS")+"?range=6mo&interval=1d&_="+Date.now()
;let res;try{res=await fetch(u,{headers:Object.assign({},YF_HEADERS,{"Cache-Control":"no-cache"}),cache:"no-store"})}catch(e){return{hata:"fetch istisnası: "+(e&&e.message||e)}}
;if(!res.ok)return{hata:"HTTP "+res.status+" ("+host+")"};const j=await res.json().catch(()=>null)
;if(!j)return{hata:"JSON parse edilemedi ("+host+")"}
;const rz=j&&j.chart&&j.chart.result&&j.chart.result[0];if(!rz||!rz.timestamp)return{hata:"Yahoo hatası: "+JSON.stringify((j.chart&&j.chart.error)||j).slice(0,200)}
;const q=rz.indicators&&rz.indicators.quote&&rz.indicators.quote[0];if(!q)return{hata:"quote alanı yok ("+host+")"};const out=[]
;rz.timestamp.forEach((ts,idx)=>{const c=q.close&&q.close[idx];if(c==null||!(c>0))return
;const o=q.open&&q.open[idx],hi=q.high&&q.high[idx],lo=q.low&&q.low[idx],ac=(o>0)?o:c
;out.push({time:ts,open:ac,high:(hi>0)?Math.max(hi,ac,c):Math.max(ac,c),low:(lo>0)?Math.min(lo,ac,c):Math.min(ac,c),close:c})})
;const canliF=rz.meta&&Number(rz.meta.regularMarketPrice),canliZ=rz.meta&&Number(rz.meta.regularMarketTime)
;if(canliF>0&&canliZ>0&&out.length){const son=out[out.length-1]
;const gunSon=Math.floor((son.time+108e5)/864e5),gunCanli=Math.floor((canliZ+108e5)/864e5)
;if(gunCanli===gunSon){son.close=canliF;son.high=Math.max(son.high,canliF);son.low=Math.min(son.low,canliF)}
else if(gunCanli>gunSon)out.push({time:canliZ,open:son.close,high:Math.max(son.close,canliF),low:Math.min(son.close,canliF),close:canliF})}
;if(!out.length)return{hata:"0 bar döndü ("+host+")"}
;return{veri:out}}
async function yfMumlar(kod){const hatalar=[]
;try{const a=await yfMumCek("query1.finance.yahoo.com",kod);if(a.veri&&a.veri.length>=5)return{veri:a.veri,hatalar:hatalar};hatalar.push(a.hata||("sadece "+((a.veri&&a.veri.length)||0)+" bar döndü (query1)"))}catch(e){hatalar.push("query1 istisna: "+(e&&e.message||e))}
try{const b=await yfMumCek("query2.finance.yahoo.com",kod);if(b.veri&&b.veri.length>=5)return{veri:b.veri,hatalar:hatalar};hatalar.push(b.hata||("sadece "+((b.veri&&b.veri.length)||0)+" bar döndü (query2)"))}catch(e){hatalar.push("query2 istisna: "+(e&&e.message||e))}
console.error("yfMumlar: her iki host de başarısız",kod,hatalar);return{veri:[],hatalar:hatalar}}
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
/* Grafik gunluk mumlarla ciziliyor. Bu yuzden cizgiler yalnizca 1G
   formasyonundan alinir — 15 dakikalik bir kamanin cizgisi gunluk grafige
   yanlis oturur. Diger dilimler Formasyon sekmesinde listelenir. */
async function formasyonBul(A,kod){
  const j=await formasyonlariGetir(A);
  const p=j&&j.sonuc&&j.sonuc[kod];
  return(p&&p.gunluk)||null;
}
/* TEK TUŞ: "TARA VE BULUTA YÜKLE" /push'a ulaştığı anda GitHub'daki formasyon
   taramasını da başlatır. Böylece tarayıcıdan tek düğmeye basmak yetiyor.
   KISITLAMA: sürekli modda /push 10 saniyede bir gelebilir; her seferinde
   tarama başlatmak hem GitHub'ı hem Yahoo'yu boğar. Bu yüzden en fazla
   FORMASYON_ARALIK'ta bir tetikleniyor — arada gelen istekler sessizce
   yok sayılır. Zamanlanmış (cron) taramalar bundan bağımsız devam eder.
   Kurulum: Cloudflare'de GH_TOKEN adında bir Secret tanımlanmalı. */
const FORMASYON_ARALIK=18e5; /* 30 dakika */
let _fTetik=0;
async function formasyonTetikle(A){
  if(!A||!A.GH_TOKEN)return"token yok";
  const simdi=Date.now();
  if(simdi-_fTetik<FORMASYON_ARALIK)return"beklemede";
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
    return r.ok?"başlatıldı":("github "+r.status);
  }catch(e){return"hata"}
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
const ALARM_MAX_ALICI=45;
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
async function alarmGonder(e,eski,yeni){if(!e.VERI||!e.BOT_TOKEN)return;
const yeniListe=yeni&&yeni.kartlar&&yeni.kartlar.tavan||[];
if(!yeniListe.length)return;
const gecmis=await alarmGecmisi(e),bilinen=new Set(gecmis.kodlar||[]);
/* ALARM SADECE GERÇEKTEN GÜÇLÜ OLANLARA:
   ⚪ İZLEMEDE (hiçbir kademesi kırılmamış) ve hedefini çoktan aşmış
   hisseler bildirim göndermez. Listede dururlar; ama 11 hisselik bir
   yığın yerine 3-4 gerçek sinyal gelmesi mesajın değerini korur. */
const uygun=yeniListe.filter(x=>x&&x.kod
&&!(null!=x.potansiyel&&Number(x.potansiyel)<=0)
&&!/İZLEMEDE/.test(String(x.guc||"")));
const yeniGirenler=uygun.filter(x=>!bilinen.has(x.kod));
if(!yeniGirenler.length)return;
for(const x of yeniGirenler)bilinen.add(x.kod);
await e.VERI.put("alarmGun",JSON.stringify({gun:onayDonemi(),kodlar:[...bilinen].slice(-300)}));
const kullanicilar=await alarmKullanicilari(e);
if(!kullanicilar.length)return;
const baslik=yeniGirenler.length>1?"🚨 <b>"+yeniGirenler.length+" YENİ GÜÇLÜ SİNYAL</b>\n\n":"🚨 <b>GÜÇLÜ SİNYALE GİRDİ</b>\n\n";
const metin=baslik+yeniGirenler.slice(0,6).map(hisse=>j(hisse)).join("\n")+
(yeniGirenler.length>6?"\n<i>…ve "+(yeniGirenler.length-6)+" hisse daha. Menüden ⚡ Kısa Trade listesine bak.</i>":"");
for(const uid of kullanicilar.slice(0,ALARM_MAX_ALICI))await b(e.BOT_TOKEN,"sendMessage",{chat_id:uid,text:metin,parse_mode:"HTML",disable_web_page_preview:!0})}
/* ============ 📰 KAP ANLIK BİLDİRİM ============
   kap.org.tr resmi/belgeli bir dış geliştirici API'si sunmuyor, ama sitenin
   kendi Next.js uygulamasının kullandığı uç nokta kimlik doğrulama istemiyor
   ve herkese açık veridir (KAP'ın kendi mevzuat amacı zaten "kamuya açıklama").
   KIRILGAN: KAP bu uç noktayı habersiz değiştirebilir/kapatabilir — bu yüzden
   her adım try/catch içinde, hata durumunda sessizce vazgeçer, botun geri
   kalanını asla etkilemez. */
const KAP_API="https://www.kap.org.tr/tr/api/disclosure/members/byCriteria";
const KAP_POLL_MS=175000;
async function kapBildirimleriGetir(gunSayisi){
const simdi=new Date(Date.now()+108e5),bas=new Date(simdi.getTime()-gunSayisi*864e5),fmt=d=>d.toISOString().slice(0,10);
try{
const r=await fetch(KAP_API,{method:"POST",headers:{"Content-Type":"application/json","Referer":"https://www.kap.org.tr/tr/bildirim-sorgu","User-Agent":YF_UA},body:JSON.stringify({fromDate:fmt(bas),toDate:fmt(simdi),mkkMemberOidList:[],subjectList:[]})});
if(!r.ok)return[];const j=await r.json().catch(()=>null);return Array.isArray(j)?j:[]
}catch(err){return[]}}
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
return liste.filter(d=>d.subject&&d.subject.indexOf(TEMETTU_KONU)>=0&&d.relatedStocks)
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
return liste}
/* ============ 💰 GERÇEK ÖDEME TARİHLİ TEMETTÜ TAKVİMİ (v2) ============
   Yukarıdaki temettuTakvimiGetir() sadece "kâr payı dağıtım KARARI açıklandı"
   bildirimini verir — ödeme tarihi KAP'ın temel API'sinde yapılandırılmış
   alan olarak yok. Bunun yerine ahlatciyatirim.com.tr'nin (lisanslı aracı
   kurum) temettü takvimi sayfası kullanılıyor: bu sayfa KAP bildirimlerini
   zaten ayrıştırıp "Hak Kazanma" ve "Ödeme Tarihi"ni ayrı sütun olarak,
   sunucu tarafında render edilmiş düz HTML tablo halinde veriyor — JS
   çalıştırmaya/headless tarayıcıya gerek yok, normal fetch yeterli. */
const AHLATCI_TEMETTU_URL="https://www.ahlatciyatirim.com.tr/temettu";
const AY_TR={"Oca":1,"Şub":2,"Mar":3,"Nis":4,"May":5,"Haz":6,"Tem":7,"Ağu":8,"Eyl":9,"Eki":10,"Kas":11,"Ara":12};
const AHLATCI_HEADERS={"User-Agent":YF_UA,"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","Accept-Language":"tr-TR,tr;q=0.9,en;q=0.8","Referer":"https://www.google.com/"};
function stripEtiket(h){return String(h||"").replace(/<[^>]*>/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g," ").trim()}
function trTarihToISO(s){const m=String(s||"").trim().match(/(\d{1,2})\s+([A-Za-zÇŞĞÜÖİçşğüöı]{3})\w*\s+(\d{4})/);
if(!m)return null;const ay=AY_TR[m[2]];if(!ay)return null;return m[3]+"-"+String(ay).padStart(2,"0")+"-"+m[1].padStart(2,"0")}
/* Başlık metni tam eşleşmezse (site tasarımı ufak değişmişse) tüm sayfayı
   tara — Durum sütunu zaten sadece "Yaklaşan" satırları filtreliyor, yanlış
   tabloya (Teklif/Arşiv) düşme riski Durum kontrolüyle zaten engelleniyor. */
async function temettuSayfasiCek(sayfa,tani){
const url=sayfa<=1?AHLATCI_TEMETTU_URL:AHLATCI_TEMETTU_URL+"?sayfa="+sayfa;
let r;try{r=await fetch(url,{headers:AHLATCI_HEADERS,cf:{cacheTtl:0}})}catch(err){tani.push("fetch hatası s"+sayfa+": "+String(err&&err.message||err));return[]}
if(!r.ok){tani.push("HTTP "+r.status+" s"+sayfa);return[]}
const html=await r.text();
tani.push("s"+sayfa+" html "+html.length+" byte");
const basI=html.indexOf("Yaklaşan Temettü");
const bitI=html.indexOf("Teklif Aşamasındaki");
const parca=basI>=0?html.slice(basI,bitI>basI?bitI:html.length):html;
const satirlar=parca.match(/<tr[\s\S]*?<\/tr>/g)||[];
tani.push("s"+sayfa+" "+satirlar.length+" <tr>, baslikBulundu="+(basI>=0));
const cikti=[];
for(const satir of satirlar){
const linkm=satir.match(/hisse=([A-Z0-9]{2,6})/);if(!linkm)continue;
const hucreler=(satir.match(/<td[\s\S]*?<\/td>/g)||[]).map(stripEtiket);
if(hucreler.length<8)continue;
const durum=hucreler[7];if(!/Yaklaşan/i.test(durum))continue;
const hakKazanma=hucreler[1],odemeTarihi=hucreler[2];
cikti.push({kod:linkm[1],hakKazanma:hakKazanma,hakKazanmaISO:trTarihToISO(hakKazanma),
odemeTarihi:odemeTarihi,odemeTarihiISO:trTarihToISO(odemeTarihi),
brut:hucreler[3],net:hucreler[4],verimBrut:hucreler[5],verimNet:hucreler[6]})}
tani.push("s"+sayfa+" "+cikti.length+" satır ayıklandı");
return cikti}
async function temettuTakvimiGercekGetir(sayfaSayisi,tani){
const tumu=[];
for(let s=1;s<=(sayfaSayisi||3);s++){
let sayfaVerisi;try{sayfaVerisi=await temettuSayfasiCek(s,tani)}catch(err){tani.push("s"+s+" istisna: "+String(err&&err.message||err));break}
if(!sayfaVerisi.length)break;
tumu.push(...sayfaVerisi)}
tumu.sort((a,b)=>(a.odemeTarihiISO||"9999")<(b.odemeTarihiISO||"9999")?-1:1);
return tumu}
async function temettuListesiCache(e){
const c=e.VERI&&await e.VERI.get("temettuCacheV2");
if(c){try{const j=JSON.parse(c);if(Date.now()-j.ts<18e5)return{liste:j.liste,tani:["v2 kv cache"]}}catch(err){}}
const tani=[];
let liste=[];
try{liste=await temettuTakvimiGercekGetir(3,tani)}catch(err){tani.push("genel istisna: "+String(err&&err.message||err))}
if(liste.length){if(e.VERI)await e.VERI.put("temettuCacheV2",JSON.stringify({ts:Date.now(),liste:liste.slice(0,150)}));return{liste:liste,tani:tani}}
if(e.VERI)await e.VERI.put("temettuSonHata",JSON.stringify({ts:Date.now(),tani:tani})).catch(()=>{});
/* ahlatciyatirim erişilemezse (site değişti/düştü/engelledi) eski KAP-duyuru
   listesine düş — en azından "yeni karar açıklandı" bilgisi kaybolmasın. */
const eskiC=e.VERI&&await e.VERI.get("temettuCache");
if(eskiC){try{const j=JSON.parse(eskiC);if(Date.now()-j.ts<18e5)return{liste:j.liste,tani:tani.concat(["eski kv cache"])}}catch(err){}}
let eski=[];try{eski=await temettuTakvimiGetir(45)}catch(err){tani.push("eski KAP istisnası: "+String(err&&err.message||err))}
if(e.VERI&&eski.length)await e.VERI.put("temettuCache",JSON.stringify({ts:Date.now(),liste:eski.slice(0,150)}));
return{liste:eski,tani:tani}}
async function g(e){if(o)return o;if(e.VERI){
const t=await e.VERI.get("listeler");if(t)return o=JSON.parse(t),o}const t=await caches.default.match(new Request(l));return t?(o=await t.json().catch(()=>null),o):null}const h={kisitMin:7,
kisitMax:18};let w=null,O=0;async function S(e,t){if(!t&&w&&Date.now()-O<6e4)return w;let a={...h};if(e.VERI){const t=await e.VERI.get("ayar");t&&(a={...a,...JSON.parse(t)})}return w=a,O=Date.now(),a}
let T=null,x=0;async function E(e,t){if(!t&&T&&Date.now()-x<6e4)return T;if(!e.VERI)return T=[],x=Date.now(),T;const a=await e.VERI.get("vip");return T=a?JSON.parse(a):[],x=Date.now(),T}let v=null,R=0
;async function N(e,t){if(!t&&v&&Date.now()-R<6e4)return v;if(!e.VERI)return v=[],R=Date.now(),v;const a=await e.VERI.get("engel");return v=a?JSON.parse(a):[],R=Date.now(),v}async function B(e,t){
return!d(t)&&(await N(e)).includes(String(t))}function M(e){return new Request("https://kisit.local/u/"+e)}function M60(e){return new Request("https://kisit60.local/u/"+e)}async function D(e){try{return await caches.default.delete(M(e)),!0}catch(e){return!1}}
function I(e){return void 0!==e.kar&&null!==e.kar?Number(e.kar):e.giris>0&&e.fiyat>0?100*(Number(e.fiyat)/Number(e.giris)-1):null}const A={pot:"🎯 Hedefe kalan",kar:"💰 Kâr/Zarar",yeni:"🕐 En yeni"}
;function z(e,t,a){const n=e.kartlar&&e.kartlar[t]||[],i=n.length,r=[...Array(i).keys()];if("pot"===a)return r;const s=e.kartlar&&e.kartlar.sira&&e.kartlar.sira[t]&&e.kartlar.sira[t][a]
;return Array.isArray(s)&&s.length===i?s:"kar"===a?r.sort((e,t)=>(I(n[t])??-9999)-(I(n[e])??-9999)):r.sort((e,t)=>(n[t].sinyalTs||0)-(n[e].sinyalTs||0))}function U(e,t,a,n,i,r,YON){
const s=t.kartlar[a],l=Math.max(1,Math.ceil(r.length/8));let o=e+"\n";if(t.guncelleme&&YON){const e=new Date(t.guncelleme)
;o+="<i>"+String((e.getUTCHours()+3)%24).padStart(2,"0")+":"+String(e.getUTCMinutes()).padStart(2,"0")+" · "+s.length+" hisse</i>\n"}else o+="<i>"+s.length+" hisse</i>\n";o+="<i>Sıralama: "+(A[n]||A.pot)+" · sayfa "+(i+1)+"/"+l+"</i>\n",
o+="<i>Düğmede: solda hedefe kalan · sağda "+("aday"===a?"tetiğe kalan 🔓":"sinyalden bu yana")+"</i>\n\n";const c=8*i;return r.slice(c,c+8).forEach((e,t)=>{o+=function(e,t){const a=e=>Number(e).toFixed(2);let n="━━━━━━━━━━━━━━━━\n"
;n+="<b>"+t+". "+(e.rozet||"▫️")+" "+e.kod+"</b>"+(e.tf?"  ·  <i>"+e.tf+"</i>":"")+(e.etiket?"  ·  "+e.etiket:"")+"\n",
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
  --t15:#f85149; --t1s:#3fb950; --t4s:#58a6ff; --t1g:#a371f7; --tad:#d29922;
}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{margin:0;background:var(--bg);color:var(--yazi);
  font:15px/1.45 -apple-system,system-ui,"Segoe UI",Roboto,sans-serif;
  padding-bottom:calc(18px + env(safe-area-inset-bottom))}
.ust{position:sticky;top:0;z-index:20;background:var(--bg);
  padding:10px 12px 0;border-bottom:1px solid var(--ciz)}
.baslik{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}
.baslik h1{font-size:16px;margin:0;font-weight:800;letter-spacing:.2px}
.saat{font-size:11.5px;color:var(--soluk);font-variant-numeric:tabular-nums}
.sekmeler{display:flex;gap:6px;overflow-x:auto;padding-bottom:9px;scrollbar-width:none}
.sekmeler::-webkit-scrollbar{display:none}
.sek{flex:0 0 auto;background:var(--kart);border:1px solid var(--ciz);color:var(--soluk);
  border-radius:999px;padding:7px 13px;font-size:13px;font-weight:700;white-space:nowrap}
.sek.on{color:#fff;border-color:transparent}
.sek.on[data-r="15DK"]{background:var(--t15)}
.sek.on[data-r="1SA"]{background:var(--t1s);color:#08150c}
.sek.on[data-r="4SA"]{background:var(--t4s);color:#07182b}
.sek.on[data-r="1G"]{background:var(--t1g)}
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
.sag{text-align:right;flex:0 0 auto}
.fiyat{font-weight:800;font-size:15px;font-variant-numeric:tabular-nums}
.yuzde{font-size:12px;font-weight:700;margin-top:3px;font-variant-numeric:tabular-nums}
.ye{color:var(--yes)} .kr{color:var(--kir)} .sa{color:var(--sar)} .so{color:var(--soluk)}
.rz{font-size:13px;margin-right:2px}
.bos{text-align:center;color:var(--soluk);padding:38px 18px;font-size:13.5px;line-height:1.7}
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
.pz{display:flex;gap:6px;margin-bottom:10px;overflow-x:auto;scrollbar-width:none}
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
.gez{display:flex;gap:8px;align-items:center;padding:9px 0 2px}
.gez button{flex:0 0 auto;background:var(--kart);border:1px solid var(--ciz);color:var(--yazi);
  border-radius:9px;padding:8px 15px;font-size:13px;font-weight:700}
.gez button:disabled{opacity:.32}
.gez .nerede{flex:1;text-align:center;font-size:12px;color:var(--soluk);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
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
  <div class="baslik"><h1>📊 Fix Borsa Sinyal</h1><div class="saat" id="saat"></div></div>
  <div class="sekmeler" id="sekmeler"></div>
  <div class="serit" id="serit"></div>
  <div class="gez">
    <button id="gezGeri">◀ Geri</button>
    <div class="nerede" id="nerede"></div>
    <button id="gezIleri">İleri ▶</button>
  </div>
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
var D=null, sekme="tavan", sira="pot", adayTf="adayKisa", presetSec="kaliteli";
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
  if(sekme==="perf")return"📈 Performans";
  if(sekme==="davet")return"📤 Davet";
  if(sekme==="panel")return"🛠 Panel";
  if(sekme==="fav")return"⭐ Takip listem";
  if(sekme==="preset")return"🎛 Hazır filtreler";
  if(sekme==="kap")return"📰 KAP Bildirimleri";
  if(sekme==="temettu")return"💰 Temettü Takvimi";
  if(sekme==="aday")return(TF[adayTf]?TF[adayTf].ad:"Adaylar");
  return TF[sekme]?TF[sekme].ik+" "+TF[sekme].ad:"";
}
function gezCiz(){
  var g=el("gezGeri"),i=el("gezIleri");
  if(!g||!i)return;
  g.disabled=yolIx<=0;i.disabled=yolIx>=yol.length-1;
  el("nerede").textContent=ekranAdi();
  tgGeriDugme();
}
function tgGeriDugme(){
  try{
    var acik=el("katman").classList.contains("ac");
    if(acik||yolIx>0)TG.BackButton.show();else TG.BackButton.hide();
  }catch(e){}
}
var TF={tavan:{ad:"15 DAKİKA",kisa:"15DK",r:"15DK",ik:"⚡",renk:"var(--t15)"},
        potansiyel:{ad:"1 SAAT",kisa:"1SA",r:"1SA",ik:"📊",renk:"var(--t1s)"},
        fibo:{ad:"4 SAAT",kisa:"4SA",r:"4SA",ik:"📐",renk:"var(--t4s)"},
        uzunvade:{ad:"1 GÜN",kisa:"1G",r:"1G",ik:"🗓",renk:"var(--t1g)"},
        adayKisa:{ad:"15 DAKİKA adayları",kisa:"15DK",r:"aday",ik:"🟨",renk:"var(--tad)"},
        adayOrta:{ad:"1 SAAT adayları",kisa:"1SA",r:"aday",ik:"🟨",renk:"var(--tad)"},
        adayOrtaVade:{ad:"4 SAAT adayları",kisa:"4SA",r:"aday",ik:"🟨",renk:"var(--tad)"},
        adayUzun:{ad:"1 GÜN adayları",kisa:"1G",r:"aday",ik:"🟨",renk:"var(--tad)"}};
function E(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
function N(v,b){return(v==null||isNaN(v))?"—":Number(v).toFixed(b==null?2:b)}
function Y(v){if(v==null||isNaN(v))return"";return(v>=0?"+":"")+Number(v).toFixed(2)+"%"}
function el(id){return document.getElementById(id)}
function post(yol,gov){
  gov=gov||{}; gov.initData=(TG&&TG.initData)||"";
  return fetch(yol,{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify(gov)}).then(function(r){return r.json()});
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
  ["tavan","potansiyel","fibo","uzunvade"].forEach(function(k){
    var t=TF[k],n=(D.kartlar&&D.kartlar[k]&&D.kartlar[k].length)||0;
    s.push('<button class="sek'+(sekme===k?" on":"")+'" data-r="'+t.r+'" data-s="'+k+'">'+
      t.ik+" "+t.kisa+(n?' <span style="opacity:.75">'+n+"</span>":"")+"</button>");
  });
  s.push('<button class="sek'+(sekme==="aday"?" on":"")+'" data-r="aday" data-s="aday">🟨 Adaylar</button>');
  s.push('<button class="sek'+(sekme==="kama"?" on":"")+'" data-r="nötr" data-s="kama">📐 Formasyon</button>');
  s.push('<button class="sek'+(sekme==="perf"?" on":"")+'" data-r="nötr" data-s="perf">📈 Performans</button>');
  s.push('<button class="sek'+(sekme==="fav"?" on":"")+'" data-r="nötr" data-s="fav">⭐ Takip</button>');
  s.push('<button class="sek'+(sekme==="preset"?" on":"")+'" data-r="nötr" data-s="preset">🎛 Presetler</button>');
  s.push('<button class="sek'+(sekme==="kap"?" on":"")+'" data-r="nötr" data-s="kap">📰 KAP</button>');
  s.push('<button class="sek'+(sekme==="temettu"?" on":"")+'" data-r="nötr" data-s="temettu">💰 Temettü</button>');
  s.push('<button class="sek'+(sekme==="davet"?" on":"")+'" data-r="nötr" data-s="davet">📤 Davet</button>');
  if(D.yon)s.push('<button class="sek'+(sekme==="panel"?" on":"")+'" data-r="nötr" data-s="panel">🛠 Panel</button>');
  el("sekmeler").innerHTML=s.join("");
  [].forEach.call(el("sekmeler").children,function(b){
    b.onclick=function(){tit();sekme=b.dataset.s;sira="pot";ciz();window.scrollTo(0,0)};
    b.oncontextmenu=function(e2){e2.preventDefault()};
  });
}
function ciz(){
  yolYaz();
  el("saat").textContent=(D.yon&&D.guncelleme)?("🔐 son tarama "+D.guncelleme):"";
  seritCiz();
  sekCiz();
  if(sekme==="perf")return perfCiz();
  if(sekme==="kama")return kamaCiz();
  if(sekme==="davet")return davetCiz();
  if(sekme==="panel")return panelCiz();
  if(sekme==="fav")return favCiz();
  if(sekme==="preset")return presetCiz();
  if(sekme==="kap")return kapCiz();
  if(sekme==="temettu")return temettuCiz();
  if(sekme==="aday")return adayCiz();
  listeCiz(sekme);
}
/* ---------- KAYAN YAZI ----------
   İçerik veriden üretilir: hangi dilimde kaç sinyal var, günün en iyileri,
   davet durumu ve sabit uyarı. Kesintisiz akması için içerik iki kez basılır. */
/* Kayan yazı artık YALNIZ son sinyalleri, rastgele karışık sırada gösterir —
   dilim sayacı / üyelik / sabit uyarı metinleri kaldırıldı. */
function seritCiz(){
  var hepsi=[];
  ["tavan","potansiyel","fibo","uzunvade"].forEach(function(k){
    (D.kartlar&&D.kartlar[k]||[]).forEach(function(x){
      var kr=kar(x);if(kr!=null)hepsi.push({kod:x.kod,y:kr,tf:TF[k].kisa});
    });
  });
  if(!hepsi.length){el("serit").innerHTML="";return}
  /* Fisher-Yates karıştır — her açılışta farklı bir sıra/seçim görünsün */
  for(var i=hepsi.length-1;i>0;i--){
    var j=Math.floor(Math.random()*(i+1)),t=hepsi[i];hepsi[i]=hepsi[j];hepsi[j]=t;
  }
  var gosterilen=hepsi.slice(0,20);
  var par=gosterilen.map(function(x){
    return (x.y>=0?"🟢":"🔴")+" <b>"+E(x.kod)+"</b> "+Y(x.y)+' <span class="ay2">'+x.tf+"</span>";
  });
  var ic=par.join('<span class="ay">◆</span>');
  /* hız: içerik ne kadar uzunsa animasyon o kadar sürsün, aksi halde çok
     sinyal olduğunda şerit okunamayacak kadar hızlı akıyordu. */
  var sure=Math.max(45,Math.round(gosterilen.length*4.2));
  el("serit").innerHTML='<span style="animation-duration:'+sure+'s">'+ic+'<span class="ay">◆</span>'+ic+'<span class="ay">◆</span></span>';
}
function sirCiz(akt){
  var o=[["pot","🎯 Hedefe kalan"],["kar","💰 Kâr/Zarar"],["yeni","🕐 En yeni"]];
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
  var ix=(D.kartlar&&D.kartlar.sira&&D.kartlar.sira[ad]&&D.kartlar.sira[ad][sira])||null;
  if(ix&&ix.length===l.length)return ix.map(function(i){return l[i]});
  var c=l.slice();
  if(sira==="kar")c.sort(function(a,b){return(kar(b)==null?-9999:kar(b))-(kar(a)==null?-9999:kar(a))});
  else if(sira==="yeni")c.sort(function(a,b){return(b.sinyalTs||0)-(a.sinyalTs||0)});
  return c;
}
function satirHtml(k,ad){
  var t=TF[ad]||{kisa:k.tf||"",renk:"var(--ciz)"};
  var kr=kar(k), pot=(k.potansiyel==null?null:Number(k.potansiyel));
  var sag=(pot==null)?"":(pot<=0?'<span class="sa">🏆 TUTTU</span>':'<span class="so">hedefe <b>+'+pot.toFixed(1)+"%</b></span>");
  var alt=[];
  alt.push(t.kisa);
  if(k.tetik!=null)alt.push("🔓 tetik "+N(k.tetik)+(k.tetikYuzde!=null?" · %"+Number(k.tetikYuzde).toFixed(1)+" kaldı":""));
  else if(k.giris!=null)alt.push("sinyal "+N(k.giris));
  if(k.sinyalZaman||k.zaman)alt.push(k.sinyalZaman||k.zaman);
  return '<div class="satir" data-kod="'+E(k.kod)+'" data-l="'+ad+'" style="border-left-color:'+t.renk+'">'+
    '<div class="sol"><div class="kod">'+(k.rozet?'<span class="rz">'+k.rozet+"</span>":"")+E(k.kod)+"</div>"+
    '<div class="altbilgi">'+E(alt.join(" · "))+"</div></div>"+
    '<div class="sag"><div class="fiyat">'+N(k.fiyat)+" ₺</div>"+
    '<div class="yuzde '+(kr==null?"so":(kr>=0?"ye":"kr"))+'">'+(kr==null?sag:Y(kr))+"</div></div></div>";
}
function satirBagla(){
  [].forEach.call(document.querySelectorAll("[data-kod]"),function(b){
    b.onclick=function(){tit();detay(b.dataset.kod,b.dataset.l)};
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
function listeCiz(ad){
  var l=dizil(ad), t=TF[ad];
  if(!l.length){
    el("govde").innerHTML='<div class="bos"><b>'+t.ik+" "+t.ad+'</b><br><br>Şu an bu dilimde sinyal yok.<br>'+
      'Zayıf sinyalle liste doldurulmuyor — üç şartı birden sağlayan hisse çıkmadığında liste boş kalır.</div>';
    return;
  }
  el("govde").innerHTML=sirCiz(sira)+l.map(function(k){return satirHtml(k,ad)}).join("")+
    '<div class="uyari">⚠️ Yatırım tavsiyesi değildir. Teknik tarama geleceği bilmez.</div>';
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
  var alt=["adayKisa","adayOrta","adayOrtaVade","adayUzun"];
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
var FDILIM=[["hepsi","Tümü"],["15DK","15DK"],["1SA","1SA"],["4SA","4SA"],
            ["1G","1G"],["1HAF","Hafta"],["1AY","Ay"]];
function kamaGoster(){
  var tum=(kamaD&&kamaD.sonuc)||[];
  var l=fDilim==="hepsi"?tum:tum.filter(function(x){return x.tf===fDilim});
  var h='';
  if(tum.length){
    h+='<div class="pz">'+FDILIM.map(function(x){
      var n=x[0]==="hepsi"?tum.length:tum.filter(function(y){return y.tf===x[0]}).length;
      if(x[0]!=="hepsi"&&!n)return"";
      return '<button class="sir'+(fDilim===x[0]?" on":"")+'" data-fd="'+x[0]+'">'+
        x[1]+' <b>'+n+'</b></button>';
    }).join("")+"</div>";
  }
  if(kamaD&&kamaD.eksik)h+='<div class="bos" style="padding:10px 14px;font-size:12.5px">⏳ Formasyon dosyası henüz yayınlanmadı — tarama gecelik çalışır.</div>';
  else if(kamaD&&kamaD.guncelleme)h+='<div class="et" style="padding:8px 14px;font-size:11.5px">🕒 Son tarama: '+E(String(kamaD.guncelleme).slice(0,16).replace("T"," "))+'</div>';
  if(!l.length){
    h+='<div class="bos"><b>📐 Formasyonlar</b><br><br>'+
      (tum.length?"Bu zaman diliminde formasyon yok — üstten başka bir dilim seç."
                 :"Şu an hiçbir hissede yeterli kalitede formasyon (kama, üçgen, bayrak, ikili dip) tespit edilmedi.<br>Formasyonlar sürekli değişir, birazdan tekrar bakın.")+
      "</div>";
    el("govde").innerHTML=h; fdBagla(); return;
  }
  h+=l.map(function(x){
    var renk=x.yon==="al"?"#3fb950":(x.yon==="sat"?"#f85149":"#d29922");
    var ikon=x.yon==="al"?"📈":"📉";
    return '<div class="satir" data-kod="'+E(x.kod)+'" data-l="'+E(x.tf)+'" style="border-left-color:'+renk+'">'+
      '<div class="sol"><div class="kod">'+E(x.kod)+'</div>'+
      '<div class="altbilgi">'+ikon+' '+E(x.tip)+' · '+E(x.tf||"")+'</div></div>'+
      '<div class="sag"><div class="yuzde so">kalite <b>%'+x.kalite+'</b></div></div></div>';
  }).join('');
  el("govde").innerHTML=h;
  satirBagla(); fdBagla();
}
/* Zaman dilimi süzgeci: veri zaten yüklü, filtreleme tamamen tarayıcıda —
   yeni istek atılmaz. */
function fdBagla(){
  Array.prototype.forEach.call(document.querySelectorAll("[data-fd]"),function(b){
    b.onclick=function(){tit();fDilim=b.dataset.fd;kamaGoster()};
  });
}
/* HAZIR PRESETLER: dört ana listeyi (tavan/potansiyel/fibo/uzunvade) birleştirip
   var olan alanlarla (kalite, potansiyel, sinyalTs, kar) hazır filtreler sunar.
   Yabancı payı / temettü verimi gibi KAP-kaynaklı alanlar şu an taramada YOK,
   bu yüzden yalnız gerçekten hesaplanabilen filtreler eklendi — yanlış/boş
   veri göstermemek için. */
function presetCiz(){
  var hepsi=[];
  ["tavan","potansiyel","fibo","uzunvade"].forEach(function(ad){
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
function kapCiz(){
  el("govde").innerHTML='<div class="yukleniyor">yükleniyor…</div>';
  post("/api/kap",{}).then(function(v){
    var liste=(v&&v.liste)||[];
    if(!liste.length){
      el("govde").innerHTML='<div class="bos"><b>📰 KAP Bildirimleri</b><br><br>Şu an gösterilecek bildirim yok.<br>Birazdan tekrar dene.</div>';
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
/* 💰 Temettü sekmesi: ahlatciyatirim.com.tr'nin (lisanslı aracı kurum,
   KAP kaynaklı) temettü takvimi sayfasından çekilen GERÇEK ödeme tarihli
   yaklaşan kar payı takvimi. Site geçici erişilemezse eski KAP-duyuru
   listesine (sadece "karar açıklandı" haberi, ödeme tarihi yok) düşülür —
   bu durumda gercekTarih=false döner ve satır görünümü buna göre değişir. */
function temettuCiz(){
  el("govde").innerHTML='<div class="yukleniyor">yükleniyor…</div>';
  post("/api/temettu",{}).then(function(v){
    var liste=(v&&v.liste)||[],gercek=!!(v&&v.gercekTarih);
    if(!liste.length){
      el("govde").innerHTML='<div class="bos"><b>💰 Temettü Takvimi</b><br><br>Şu an gösterilecek kayıt yok.<br>Birazdan tekrar dene.</div>'+
        (v&&v.tani?'<div class="uyari" style="text-align:left;white-space:pre-wrap">TANI (sadece admin):\\n'+E(v.tani.join("\\n"))+'</div>':"");
      return;
    }
    if(gercek){
      el("govde").innerHTML=liste.map(function(x){
        return '<div class="satir">'+
          '<div class="sol"><div class="kod">'+E(x.kod)+
          (x.takipte?' <span class="rozet">⭐ izlediğin</span>':"")+'</div>'+
          '<div class="altbilgi">Hak kazanma '+E(x.hakKazanma||"—")+' · Pay başı net '+E(x.net||"—")+'</div></div>'+
          '<div class="sag"><div class="yuzde so">💵 '+E(x.odemeTarihi||"—")+'</div></div></div>';
      }).join("")+'<div class="uyari">Kaynak: ahlatciyatirim.com.tr (KAP bildirimlerine dayanır) · net tutarlar %15 stopaj esas alınarak hesaplanmıştır. Yatırım tavsiyesi değildir.</div>';
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
function favCiz(){
  var f=D.fav||[], bul=[];
  f.forEach(function(kod){
    var k=null,ad=null;
    Object.keys(D.kartlar||{}).forEach(function(a){
      if(a==="sira"||k)return;
      var x=(D.kartlar[a]||[]).filter(function(y){return y.kod===kod})[0];
      if(x){k=x;ad=a}
    });
    if(k)bul.push({k:k,ad:ad}); else bul.push({k:{kod:kod,fiyat:null},ad:"tavan",yok:true});
  });
  if(!bul.length){
    el("govde").innerHTML='<div class="bos"><b>⭐ Takip listem</b><br><br>Listen boş.<br>'+
      "Bir hissenin detayını aç, <b>⭐ Takibe al</b>'a dokun — burada toplanır.</div>";
    return;
  }
  var pf=D.portfoy||{};
  el("govde").innerHTML=portfoyOzetiCiz(pf,bul)+bul.map(function(x){
    var satir=x.yok?'<div class="satir" data-kod="'+E(x.k.kod)+'" data-l="tavan">'+
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
      if(k.giris!=null)h+='<div class="sat"><span class="et">Sinyal fiyatı</span><b>'+N(k.giris)+" ₺</b></div>";
      h+='<div class="sat"><span class="et">Şimdi</span><b>'+N(k.fiyat)+" ₺</b></div>";
      if(kr!=null)h+='<div class="sat"><span class="et">Sinyalden bu yana</span><b class="'+(kr>=0?"ye":"kr")+'">'+Y(kr)+"</b></div>";
      if(k.tetik!=null)h+='<div class="sat"><span class="et">🔓 Tetik seviyesi</span><b>'+N(k.tetik)+
        (k.tetikYuzde!=null?" ("+Number(k.tetikYuzde).toFixed(2)+"% kaldı)":"")+"</b></div>";
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
    h+='<div class="kutu"><h3>📊 Grafik<span id="desenRozet"></span></h3><div id="mumKutu" class="mumKutu"><div class="yukleniyor" style="padding:20px 0">grafik yükleniyor…</div></div></div>';
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
    if(poz)h+='<button class="dg ik" id="portfoySil" style="opacity:.7">🗑 Portföyden çıkar</button>';
    h+='<button class="dg" id="paylasDg">📤 Paylaş</button>';
    h+='<div class="uyari">⚠️ Yatırım tavsiyesi değildir.</div>';
    K.innerHTML=h;
    grafikCiz(kod);
    el("dkapat").onclick=function(){tit();K.classList.remove("ac");K.innerHTML="";tgGeriDugme();if(sekme==="fav")basla()};
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
        if(r&&r.ok){D.portfoy=r.portfoy;K.classList.remove("ac");K.innerHTML="";tgGeriDugme();if(sekme==="fav")basla()}
      });
    }
    if(el("portfoySil"))el("portfoySil").onclick=portfoySilTikla;
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
function grafikCiz(kod,deneme){
  deneme=deneme||0;
  if(!window.LightweightCharts&&deneme<20){setTimeout(function(){grafikCiz(kod,deneme+1)},150);return}
  post("/api/mumlar",{kod:kod}).then(function(v){
    var kutu=el("mumKutu"); if(!kutu)return;
    try{
      if(!window.LightweightCharts){kutu.innerHTML='<p class="bilgi">Grafik kütüphanesi yüklenemedi (internet bağlantısını kontrol et).</p>';return}
      var veri=(v&&v.mumlar)||[];
      if(!v||!v.ok||veri.length<5){
        var dbg=(v&&v.debug&&v.debug.length)?('<br><span style="font-size:11px;opacity:.7">'+v.debug.join('<br>')+'</span>'):'';
        kutu.innerHTML='<p class="bilgi">Bu hisse için grafik verisi yetersiz.'+dbg+'</p>';return}
      kutu.innerHTML='';
      var chart=LightweightCharts.createChart(kutu,{
        width:kutu.clientWidth||320, height:220,
        layout:{background:{color:"transparent"},textColor:"#e6edf3"},
        grid:{vertLines:{color:"#262d38"},horzLines:{color:"#262d38"}},
        timeScale:{timeVisible:false,secondsVisible:false},
        rightPriceScale:{borderVisible:false}
      });
      var seri=chart.addSeries(LightweightCharts.CandlestickSeries,{
        upColor:"#3fb950",downColor:"#f85149",borderVisible:false,
        wickUpColor:"#3fb950",wickDownColor:"#f85149"
      });
      seri.setData(veri.map(function(b){return{time:b.time,open:b.open,high:b.high,low:b.low,close:b.close}}));
      var rz=el("desenRozet"),d=v&&v.desen;
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
      }else if(rz)rz.innerHTML="";
      chart.timeScale().fitContent();
      var yenidenBoyutla=function(){try{chart.applyOptions({width:kutu.clientWidth||320})}catch(e){}};
      window.addEventListener("resize",yenidenBoyutla);
    }catch(e){
      var k2=el("mumKutu"); if(k2)k2.innerHTML='<p class="bilgi">Grafik çizilemedi.</p>';
    }
  }).catch(function(){var k2=el("mumKutu"); if(k2)k2.innerHTML='<p class="bilgi">Grafik verisi alınamadı.</p>'});
}
var perfD=null, perfDonem="a1";
var DONEM=[["h1","Son 1 hafta"],["a1","Son 1 ay"],["a3","Son 3 ay"],["y1","Son 1 yıl"]];
var DRENK={"15DK":"var(--t15)","1SA":"var(--t1s)","4SA":"var(--t4s)","1G":"var(--t1g)"};
var DAD={"15DK":"⚡ 15 DAKİKA","1SA":"📊 1 SAAT","4SA":"📐 4 SAAT","1G":"🗓 1 GÜN"};
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
el("gezGeri").onclick=function(){tit();yolGit(-1)};
el("gezIleri").onclick=function(){tit();yolGit(1)};
try{
  TG.BackButton.onClick(function(){
    var K=el("katman");
    if(K.classList.contains("ac")){K.classList.remove("ac");K.innerHTML="";tgGeriDugme();if(sekme==="fav")basla();return}
    if(yolIx>0){yolGit(-1);return}
    TG.close();
  });
}catch(e){}
basla();
</script></body></html>
`;
const BILGI_METIN="ℹ️ <b>YUMATU 1 NEDİR?</b>\n\nBIST hisseleri için otomatik teknik tarama yapan bir <b>yapay zekâ</b> sistemidir. Sonuçlar <b>120.657 barlık</b> geçmiş veri üzerinde çalışan tarama motorundan çıkar. Gün içinde düzenli aralıklarla taranır, sonuçlar burada listelenir.\n\n<b>İçermez:</b> insan görüşü, şirket analizi, haber ya da bilanço değerlendirmesi. Yalnızca fiyat ve hacim matematiğidir.\n\n<b>4 liste — her biri YALNIZ kendi zaman diliminden:</b>\n⚡ <b>15 DAKİKA</b> — yalnız 15 dakikalık sinyaller\n📊 <b>1 SAAT</b> — yalnız 1 saatlik sinyaller\n📐 <b>4 SAAT</b> — yalnız 4 saatlik sinyaller\n🗓 <b>1 GÜN</b> — yalnız günlük sinyaller\n\nBir liste başka bir dilimin sinyalini <b>asla</b> göstermez; başlıkta yazan dilim ile kartın içindeki dilim her zaman aynıdır.\n\n🔎 <b>Hisse sorgulama</b>\nSohbete hisse kodunu yaz (örn. <code>THYAO</code>). O hissenin <b>iki yönünü birden</b> gönderirim: yukarı için direnç ve yükseliş hedefi, aşağı için destek ve düşüş hedefi. Hisse listelerde olmasa bile cevap alırsın.\n\n<b>Diğer düğmeler:</b>\n🏅 <b>İlk 3\'ü</b> — son taramanın en iyi 3 sonucu\n⭐ <b>Takip listem</b> — seçtiğin hisseleri anlık kâr/zararıyla takip et; eklemek/çıkarmak için hep aynı ⭐ düğmesine dokun\n🟨 <b>Adaylar</b> 👑 — her dilim için <i>henüz kırmadı ama makul mesafede.</i> Tetik seviyesini ve kırarsa gideceği hedefi gösterir; yani sinyal oluşmadan ÖNCE görürsün <b>(Süper Üyelik)</b>\n👑 <b>Anlık uyarı (Süper Üyelik)</b> — bir hisse 15 DAKİKA listesine girdiği an sana özel mesaj gelir\n\n<b>Süper Üyelikte neler açılıyor?</b>\n🟨 Aday listeleri (her dilim için)\n👑 Anlık uyarı mesajları\n⏳ Bekleme yok — listeler ve hisse sorguları anında\n\n<b>Süper Üyelik nasıl kazanılır?</b>\n📤 Sistemi paylaş düğmesiyle arkadaşlarını davet et. Davet sayacın hiç sıfırlanmaz, tüm zamanların toplamı olarak birikir. <b>Her 20 davette</b> süper üyeliğin <b>1 ay</b> açılır ya da (zaten süper üyeysen) mevcut süren üzerine <b>1 ay daha eklenir</b> — yani davet etmeye devam ettikçe süper üyeliğin otomatik uzar.\n\n<b>Neden bazen bekleme çıkıyor?</b>\nSistem çok sayıda kullanıcıya aynı anda hizmet verir; bu yüzden bazı işlemlerde kısa bir bekleme uygulanır. Bu, herkesin hizmeti düzgün alabilmesi içindir.\n\n<b>🔴 RİSK UYARISI</b>\n• Buradaki hiçbir çıktı <b>yatırım tavsiyesi değildir</b>.\n• Teknik tarama <b>geleceği bilmez</b>; hedefler tutmayabilir.\n• Geçmiş performans gelecek için <b>garanti vermez</b>.\n• Borsada <b>anaparanın tamamını kaybedebilirsin</b>.\n• Bu sonuçlara dayanarak işlem yapmak <b>tehlikelidir</b>. Sorumluluk tamamen sana aittir.\n\n<i>⚠️ Yatırım tavsiyesi değildir.</i>";function FAVKB(e){const t=[];for(let a=0;a<e.length;a+=2)t.push(e.slice(a,a+2).map(a=>({text:"❌ "+a,callback_data:"fav:"+a})));return t.push([{text:"◀️ Menü",callback_data:"menu"}]),{inline_keyboard:t}}
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
const J=["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"].join("")
;let G=null;async function X(e,t){if(!e.VERI)return[];const a=await e.VERI.get("fav:"+t);return a?JSON.parse(a):[]}
/* PORTFÖY: fav (⭐ takip) listesinden bilerek AYRI bir KV anahtarı.
   fav yalnız "izle", portfoy ise "lot + maliyet" tutar — birini bozmadan
   diğerini eklemek/kaldırmak için yapısal olarak birbirinden bağımsız. */
async function XP(e,t){if(!e.VERI)return{};const a=await e.VERI.get("portfoy:"+t);return a?JSON.parse(a):{}}
async function XPSET(e,t,a){e.VERI&&await e.VERI.put("portfoy:"+t,JSON.stringify(a))}
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
const Q={tavan:"🟥🟥🟥🟥🟥🟥🟥🟥\n⚡ <b>15 DAKİKA</b> · kısa trade\n<i>yalnız 15 dakikalık sinyaller</i>\n🟥🟥🟥🟥🟥🟥🟥🟥",potansiyel:"🟩🟩🟩🟩🟩🟩🟩🟩\n📊 <b>1 SAAT</b> · orta trade\n<i>yalnız 1 saatlik sinyaller</i>\n🟩🟩🟩🟩🟩🟩🟩🟩",fibo:"🟦🟦🟦🟦🟦🟦🟦🟦\n📐 <b>4 SAAT</b> · orta vade\n<i>yalnız 4 saatlik sinyaller</i>\n🟦🟦🟦🟦🟦🟦🟦🟦",uzunvade:"🟪🟪🟪🟪🟪🟪🟪🟪\n🗓 <b>1 GÜN</b> · uzun vade\n<i>yalnız günlük sinyaller</i>\n🟪🟪🟪🟪🟪🟪🟪🟪",adayKisa:"🟨🟨🟨🟨🟨🟨🟨🟨\n⚡ <b>15 DAKİKA</b> · adaylar\n<i>henüz kırılmadı — tetik bekliyor</i>\n🟨🟨🟨🟨🟨🟨🟨🟨",adayOrta:"🟨🟨🟨🟨🟨🟨🟨🟨\n📊 <b>1 SAAT</b> · adaylar\n<i>henüz kırılmadı — tetik bekliyor</i>\n🟨🟨🟨🟨🟨🟨🟨🟨",adayOrtaVade:"🟨🟨🟨🟨🟨🟨🟨🟨\n📐 <b>4 SAAT</b> · adaylar\n<i>henüz kırılmadı — tetik bekliyor</i>\n🟨🟨🟨🟨🟨🟨🟨🟨",adayUzun:"🟨🟨🟨🟨🟨🟨🟨🟨\n🗓 <b>1 GÜN</b> · adaylar\n<i>henüz kırılmadı — tetik bekliyor</i>\n🟨🟨🟨🟨🟨🟨🟨🟨"};export default{async fetch(p,A,q){const $=new URL(p.url);if(n=$.origin,
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
"content-type":"application/json; charset=utf-8"},ee)});if("POST"!==p.method)return e({ok:!1,hata:"POST bekleniyor"},405);if(!s(A,$))return e({ok:!1,hata:"Şifre yanlış"},401)
;const t=await p.json().catch(()=>null);if(!t||"object"!=typeof t)return e({ok:!1,hata:"Paket okunamadı"},400);t.guncelleme=(new Date).toISOString()
;const eskiListe=await g(A).catch(()=>null);await async function(e,t){o=t;
/* KV YAZMA KORUMASI: sürekli mod (10 sn'de bir tarama) KV'nin günlük
   ücretsiz yazma sınırını (1000) yakabilir. Önbellek HER ZAMAN tazelenir
   (bedava ve hızlı); kalıcı KV yazımı en fazla 2 dakikada bir yapılır.
   Bot okurken önce bellek, sonra KV, sonra önbelleğe bakar; aradaki
   farkta bile veri tazedir. */
const SIMDI=Date.now();
if(e.VERI&&(SIMDI-KVSON>12e4)){KVSON=SIMDI;await e.VERI.put("listeler",JSON.stringify(t))}
await caches.default.put(new Request(l),new Response(JSON.stringify(t),{headers:{"Cache-Control":"max-age=86400",
"content-type":"application/json"}}))}(A,t),q.waitUntil(k(A,t).catch(()=>{})),q.waitUntil(gecmisiDoldur(A,t).catch(()=>{})),q.waitUntil(alarmGonder(A,eskiListe,t).catch(()=>{})),q.waitUntil(kapKontrolVeGonder(A).catch(()=>{})),q.waitUntil(temettuKontrolVeGonder(A).catch(()=>{}))
/* Formasyon taramasini da tetikle — arka planda, yanit beklemeden. */
;const frmDurum=await formasyonTetikle(A).catch(()=>"hata")
;const n=t.kartlar?Object.keys(t.kartlar).filter(e=>"sira"!==e).map(e=>e+":"+(t.kartlar[e]||[]).length).join(" · "):""
;return e({ok:!0,surum:a,depo:!!A.VERI,sayim:n,guncelleme:t.guncelleme,formasyon:frmDurum})}if($.pathname.startsWith("/panel")){if(!s(A,$))return new Response("yetkisiz",{status:401})
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
ad:o(e),toplam:t.toplam||0,tavan:t.tavan||0,potansiyel:t.potansiyel||0,fibo:t.fibo||0,detay:t.detay||0,son:t.son||null
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
const YON=d(uid),KOD=v=>String(v||"").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,10),ID=v=>String(v||"").replace(/\D/g,"");
if("/api/veri"===$.pathname){
const L2=await g(A),sup=await suparUyeMi(A,uid),ref=(await F(A))[String(uid)]||0,fav=await X(A,uid),portfoy=await XP(A,uid);
const un=BUN||await botAd(A).catch(()=>null)||"bot";
const kart={};
if(L2&&L2.kartlar)for(const k of Object.keys(L2.kartlar)){
if("sira"===k){kart.sira=L2.kartlar.sira;continue}
if(k.indexOf("aday")===0&&!sup)continue;
kart[k]=L2.kartlar[k]}
let gun=null;
/* Son tarama saati YALNIZ yöneticiye gösterilir. */
if(YON&&L2&&L2.guncelleme){const dt=new Date(L2.guncelleme);gun=String((dt.getUTCHours()+3)%24).padStart(2,"0")+":"+String(dt.getUTCMinutes()).padStart(2,"0")}
const onayli=await onayVarMi(A,uid);
return JS({ok:!0,onay:onayli,onayMetin:onayli?null:ONAY_METIN,yon:YON,super:sup,ref:ref,kalan:ref%20===0?20:20-ref%20,fav:fav,portfoy:portfoy,kartlar:kart,guncelleme:gun,link:"https://t.me/"+un+"?start=r"+uid,davetMetin:DAVET_METIN})}
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
const r=await yfMumlar(kod).catch(e=>({veri:[],hatalar:["yfMumlar istisna: "+(e&&e.message||e)]}));
const mumlar=r.veri||[];
const desen=await formasyonBul(A,kod);
return JS({ok:!0,mumlar:mumlar,desen:desen,debug:r.hatalar||[]})}
/* FORMASYON ROZETİ + LİSTESİ — ikisi de tek kaynaktan, GitHub Actions'in
   yayinladigi formasyon.json'dan okunuyor. Yahoo istegi yok, hisse basina KV
   onbellegi yok, "en fazla 48 hisse" tavani yok. */
if("/api/formasyonlar"===$.pathname){
const kodlar=[...new Set((Array.isArray(gov.kodlar)?gov.kodlar:[]).map(k=>KOD(k)).filter(Boolean))].slice(0,300);
const j=await formasyonlariGetir(A);const sonuc={};
if(j&&j.sonuc)for(const kod of kodlar){const p=j.sonuc[kod]
;if(p&&p.tip)sonuc[kod]={tip:p.tip,yon:p.yon,kalite:p.kalite||0}}
return JS({ok:!0,sonuc:sonuc})}
if("/api/kamalar"===$.pathname){
const L2=await g(A);
const oncelik=["tavan","potansiyel","fibo","uzunvade","adayKisa","adayOrta","adayOrtaVade","adayUzun"];
const kodTf={};
if(L2&&L2.kartlar)for(const tf of oncelik){
  for(const rc of L2.kartlar[tf]||[])if(rc&&rc.kod&&!(rc.kod in kodTf))kodTf[rc.kod]=tf;
}
const j=await formasyonlariGetir(A);
if(!j||!j.sonuc)return JS({ok:!0,sonuc:[],eksik:!0,guncelleme:null});
const grup=typeof gov.grup==="string"?gov.grup:"";
const sonuc=[];
for(const kod of Object.keys(j.sonuc)){
  const p=j.sonuc[kod];if(!p||!p.tip)continue;
  const dl=Array.isArray(p.dilimler)&&p.dilimler.length?p.dilimler
    :[{tf:p.tf||"1G",tip:p.tip,yon:p.yon,kalite:p.kalite||0}];
  for(const d of dl){
    if(grup&&p.grup!==grup)continue;
    sonuc.push({kod:kod,tf:d.tf||"",tip:d.tip,yon:d.yon,kalite:d.kalite||0,grup:p.grup||""});
  }
}
sonuc.sort((a,b)=>b.kalite-a.kalite);
return JS({ok:!0,sonuc:sonuc.slice(0,300),eksik:!1,guncelleme:j.guncelleme||null})}

if("/api/fav"===$.pathname){
const kod=KOD(gov.kod);if(!kod)return JS({ok:!1,hata:"kod yok"},400);
let f=await X(A,uid);const ekli=!f.includes(kod);f=ekli?[kod,...f]:f.filter(x=>x!==kod);f=f.slice(0,30);
if(A.VERI)await A.VERI.put("fav:"+uid,JSON.stringify(f));
return JS({ok:!0,fav:f,ekli:ekli})}
if("/api/portfoy"===$.pathname){
const kod=KOD(gov.kod);if(!kod)return JS({ok:!1,hata:"kod yok"},400);
let pf=await XP(A,uid);
if(gov.sil){delete pf[kod]}else{
const lot=Number(gov.lot),mal=Number(gov.maliyet);
if(!(lot>0)||!(mal>0))return JS({ok:!1,hata:"lot/maliyet gecersiz"},400);
pf[kod]={lot:lot,maliyet:mal,eklendi:(pf[kod]&&pf[kod].eklendi)||Date.now()}}
await XPSET(A,uid,pf);
return JS({ok:!0,portfoy:pf})}
if("/api/kap"===$.pathname){
const liste=await kapListesiCache(A);
const fav=await X(A,uid),pf2=await XP(A,uid),izlenen=new Set([...fav,...Object.keys(pf2)]);
const sonuc=liste.map(d=>{
const kodlar=String(d.relatedStocks||"").split(",").map(x=>x.trim()).filter(Boolean);
return{kodlar:kodlar,konu:d.subject||"",tarih:d.publishDate||"",disclosureIndex:d.disclosureIndex,takipte:kodlar.some(k=>izlenen.has(k))}
}).filter(d=>d.kodlar.length>0)
.sort((a,b)=>(b.disclosureIndex||0)-(a.disclosureIndex||0)).slice(0,60);
return JS({ok:!0,liste:sonuc})}
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
const TFL=["15DK","1SA","4SA","1G"],
DUZELT=t=>({"15D":"15DK","1S":"1SA","4S":"4SA","1G":"1G","15DK":"15DK","1SA":"1SA","4SA":"4SA"})[t]||t;
const bos=()=>({n:0,kaz:0,top:0,zirve:0,eniyi:null,enkotu:null,hedefN:0,hedefTut:0,direncN:0,direncDon:0});
const kapat=o=>o.n?{n:o.n,isabet:100*o.kaz/o.n,ort:o.top/o.n,zirve:o.zirve/o.n,
eniyi:o.eniyi,enkotu:o.enkotu,on10k:Math.round(10000*(1+(o.top/o.n)/100)),
hedefN:o.hedefN,hedefTut:o.hedefTut,direncN:o.direncN,direncDon:o.direncDon}:null;
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
seri:seri.slice(-30)}};
return JS({ok:!0,donem:{h1:olc(7),a1:olc(30),a3:olc(90),y1:olc(365)},
guncelleme:G2.guncelleme||null})}
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
const DUZELT=t=>({"15D":"15DK","1S":"1SA","4S":"4SA","1G":"1G","15DK":"15DK","1SA":"1SA","4SA":"4SA"})[t]||t;
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
i&&(n.startsWith("/panel")||n.startsWith("/yonetici")))return d(t.from.id)?(q.waitUntil(b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,parse_mode:"HTML",disable_web_page_preview:!0,
text:"🛠 <b>Yönetici paneli</b>\n\nAşağıdaki düğmeye dokun — panel tarayıcıda açılır.\n\nAdres:\n<code>"+r()+"</code>",reply_markup:{inline_keyboard:[[{text:"🛠 Paneli aç",url:r()}],[{text:"◀️ Menü",
callback_data:"menu"}]]}})),new Response("ok")):(q.waitUntil(b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,text:"Bu komut yöneticiye özeldir.",reply_markup:u(t.from.id)})),new Response("ok"))
;if(i&&n.startsWith("/davet"))return q.waitUntil((async()=>{const e=(await b(A.BOT_TOKEN,"getMe",{}))?.result?.username||"bot";await b(A.BOT_TOKEN,"sendMessage",PY(e,t.from.id,t.chat.id))})()),new Response("ok")
const o=a.toUpperCase().replace(/[^A-ZÇĞİÖŞÜ]/g,"");return i&&!a.startsWith("/")&&o.length>=3&&o.length<=6&&o.length===a.trim().length?(q.waitUntil((async()=>{const e=await g(A)
;await b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,parse_mode:"HTML",disable_web_page_preview:!0,text:P(e,o),reply_markup:u(t.from.id)})})()),
new Response("ok")):((i||n.startsWith("/start")||n.startsWith("/liste"))&&q.waitUntil(b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,text:f,parse_mode:"HTML",reply_markup:u(t.from.id)})),
new Response("ok"))}if(e.callback_query){const t=e.callback_query,a=t.from.id,n="private"!==t.message.chat.type,i=n?a:t.message.chat.id,r=t.data
;if(await B(A,a))return await b(A.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id,text:"Erişimin kapatılmış.",show_alert:!0}),new Response("ok");
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