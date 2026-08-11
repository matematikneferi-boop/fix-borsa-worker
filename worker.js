const e=new Set(["6819672343"]),t="kolayfix",a="9.9";let n="",i=t;const r=()=>n+"/panel?key="+encodeURIComponent(i),s=(e,a)=>{const n=a.searchParams.get("key")
;return!!n&&(n===(e.PUSH_KEY||t)||n===(e.PANEL_KEY||e.PUSH_KEY||t))},l="https://liste.local/veri";let o=null;const c=new Set(["tavan","potansiyel","fibo"]),d=t=>e.has(String(t));function u(e){
const t=[[{text:"🏅 Bu taramanın ilk 3'ü",callback_data:"ilk3"}],[{text:"🎯 Güçlü sinyaller",callback_data:"tavan"}],[{text:"📈 Yüksek potansiyel",callback_data:"potansiyel"}],[{
text:"📐 Yeni kırılımlar",callback_data:"fibo"}],[{text:"📊 Son 7 gün karnesi",callback_data:"karne7"},{text:"📆 Uzun vadeli özet",callback_data:"yillik"}],[{text:"⭐ Takip listem",callback_data:"fav"}],[{text:"🔔 Anlık uyarı ayarları",callback_data:"alarm"}]]
;return d(e)&&(t.push([{text:"📋 Ham sonuç metni 🔐",callback_data:"karne"}]),n&&t.push([{text:"🛠 Yönetici paneli 🔐",url:r()}])),t.push([{text:"📤 Sistemi paylaş",callback_data:"davet"}]),t.push([{
text:"🔄 Yenile",callback_data:"menu"}]),{inline_keyboard:t}}
const f="👋 <b>Fix Borsa</b>\n\nAşağıdaki düğmelerden istediğin listeyi aç.\nListeler gün içinde düzenli güncellenir.\n\n🔎 <b>Hisse kodunu yaz</b> (örn. <code>THYAO</code>) — o hissenin güncel sinyal durumunu gönderirim.\n\n<i>⚠️ Yatırım tavsiyesi değildir.</i>"
;async function b(e,t,a){return fetch(`https://api.telegram.org/bot${e}/${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then(e=>e.json()).catch(()=>null)}
let p=0;const DETAY_GUN=90,OZET_GUN=365;async function y(e){if(!e.VERI)return{gunler:{},ozet:{}};const t=await e.VERI.get("gecmis");if(!t)return{gunler:{},ozet:{}};const gp=JSON.parse(t);return gp.gunler=gp.gunler||{},gp.ozet=gp.ozet||{},gp}async function k(e,t,a){if(!e.VERI)return;if(!a&&Date.now()-p<6e5)return
;p=Date.now();const n=await y(e),i=new Date((r||Date.now())+108e5).toISOString().slice(0,10);var r;const s=function(e){const t={};if(!e||!e.kartlar)return t
;for(const a of Object.keys(e.kartlar))if("sira"!==a)for(const n of e.kartlar[a]||[])n&&n.kod&&n.fiyat>0&&(t[n.kod]=Number(n.fiyat));return t}(t);if(n.gunler[i]=n.gunler[i]||{kayitlar:{}},
t.kartlar)for(const e of Object.keys(t.kartlar))if("sira"!==e)for(const a of t.kartlar[e]||[])a&&a.kod&&a.giris>0&&(n.gunler[i].kayitlar[a.kod]||(n.gunler[i].kayitlar[a.kod]={g:Number(a.giris),
s:Number(a.fiyat)||Number(a.giris),t:a.tf||""}));for(const e of Object.keys(n.gunler))for(const t of Object.keys(n.gunler[e].kayitlar))s[t]>0&&(n.gunler[e].kayitlar[t].s=s[t])
;n.ozet=n.ozet||{};const gt=Object.keys(n.gunler).sort().reverse(),gk=gt.slice(0,DETAY_GUN),gs=gt.slice(DETAY_GUN)
;for(const e of gs){if(!n.ozet[e]){const o=m(e,n.gunler[e]);if(o)n.ozet[e]=o}}const go={};for(const e of gk)go[e]=n.gunler[e];n.gunler=go
;const ot=Object.keys(n.ozet).sort().reverse();if(ot.length>OZET_GUN){const oo={};for(const e of ot.slice(0,OZET_GUN))oo[e]=n.ozet[e];n.ozet=oo}
;n.guncelleme=(new Date).toISOString(),await e.VERI.put("gecmis",JSON.stringify(n))}
function m(e,t){const a=Object.keys(t.kayitlar||{});if(!a.length)return null;let n=0,i=null,r=null;for(const e of a){const a=t.kayitlar[e];if(!(a.g>0&&a.s>0))continue;const s=100*(a.s/a.g-1);n+=s,
(!i||s>i.y)&&(i={kod:e,y:s}),(!r||s<r.y)&&(r={kod:e,y:s})}const s=a.length,l=s?n/s:0;return{gun:e,n:s,ort:l,deger:1e5*(1+l/100),eniyi:i,enkotu:r}}async function yfKapanislar(kod){try{const u="https://query1.finance.yahoo.com/v8/finance/chart/"+encodeURIComponent(kod+".IS")+"?range=1y&interval=1d"
;const res=await fetch(u,{headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}});if(!res.ok)return null;const j=await res.json().catch(()=>null)
;const rz=j&&j.chart&&j.chart.result&&j.chart.result[0];if(!rz||!rz.timestamp)return null
;const kap=rz.indicators&&rz.indicators.quote&&rz.indicators.quote[0]&&rz.indicators.quote[0].close;if(!kap)return null;const out={}
;rz.timestamp.forEach((ts,idx)=>{const c=kap[idx];if(c==null||!(c>0))return;const gun=new Date(1e3*ts+108e5).toISOString().slice(0,10);out[gun]=Number(c)})
;return out}catch(e){return null}}
async function gecmisiDoldur(e,t){if(!e.VERI)return;if(await e.VERI.get("gecmisDolduruldu"))return
;const kodlar=new Set();if(t&&t.kartlar)for(const k of Object.keys(t.kartlar))if("sira"!==k)for(const rc of t.kartlar[k]||[])rc&&rc.kod&&kodlar.add(rc.kod)
;if(!kodlar.size)return;const simdi={};for(const k of Object.keys(t.kartlar))if("sira"!==k)for(const rc of t.kartlar[k]||[])rc&&rc.kod&&rc.fiyat>0&&(simdi[rc.kod]=Number(rc.fiyat))
;const n=await y(e),bugun=new Date(Date.now()+108e5).toISOString().slice(0,10);let eklendi=0,denendi=0
;const liste=[...kodlar];for(let i=0;i<liste.length;i+=6){const grup=liste.slice(i,i+6),sonuclar=await Promise.all(grup.map(k=>yfKapanislar(k)))
;grup.forEach((kod,gi)=>{denendi++;const kap=sonuclar[gi];if(!kap)return;for(const gun of Object.keys(kap)){if(gun>=bugun)continue
;n.gunler[gun]=n.gunler[gun]||{kayitlar:{}};if(!n.gunler[gun].kayitlar[kod]){n.gunler[gun].kayitlar[kod]={g:kap[gun],s:simdi[kod]||kap[gun],t:"1G"},eklendi++}}})}
if(eklendi){n.ozet=n.ozet||{};const gt=Object.keys(n.gunler).sort().reverse(),gk=gt.slice(0,DETAY_GUN),gs=gt.slice(DETAY_GUN)
;for(const gg of gs){if(!n.ozet[gg]){const oz=m(gg,n.gunler[gg]);if(oz)n.ozet[gg]=oz}}const go={};for(const gg of gk)go[gg]=n.gunler[gg];n.gunler=go
;const ot=Object.keys(n.ozet).sort().reverse();if(ot.length>OZET_GUN){const oo={};for(const gg of ot.slice(0,OZET_GUN))oo[gg]=n.ozet[gg];n.ozet=oo}
;n.guncelleme=(new Date).toISOString(),await e.VERI.put("gecmis",JSON.stringify(n))}
if(eklendi||denendi>=kodlar.size)await e.VERI.put("gecmisDolduruldu",(new Date).toISOString())}
async function alarmKullanicilari(e){if(!e.VERI)return[];const out=[];let cursor=void 0
;for(;;){const liste=await e.VERI.list({prefix:"alarm:",limit:1e3,cursor});for(const k of liste.keys)out.push(k.name.slice(6))
;if(liste.list_complete||!liste.cursor)break;cursor=liste.cursor}return out}
async function alarmGonder(e,eski,yeni){if(!e.VERI||!e.BOT_TOKEN)return;const yeniListe=yeni&&yeni.kartlar&&yeni.kartlar.tavan||[];if(!yeniListe.length)return
;const eskiKodlar=new Set((eski&&eski.kartlar&&eski.kartlar.tavan||[]).map(x=>x&&x.kod).filter(Boolean))
;const yeniGirenler=yeniListe.filter(x=>x&&x.kod&&!eskiKodlar.has(x.kod));if(!yeniGirenler.length)return
;const kullanicilar=await alarmKullanicilari(e);if(!kullanicilar.length)return
;for(const hisse of yeniGirenler){const metin="🚨 <b>GÜÇLÜ SİNYALE GİRDİ</b>\n\n"+j(hisse)
;for(const uid of kullanicilar)await b(e.BOT_TOKEN,"sendMessage",{chat_id:uid,text:metin,parse_mode:"HTML",disable_web_page_preview:!0})}}
async function g(e){if(o)return o;if(e.VERI){
const t=await e.VERI.get("listeler");if(t)return o=JSON.parse(t),o}const t=await caches.default.match(new Request(l));return t?(o=await t.json().catch(()=>null),o):null}const h={kisitMin:10,
kisitMax:30};let w=null,O=0;async function S(e,t){if(!t&&w&&Date.now()-O<6e4)return w;let a={...h};if(e.VERI){const t=await e.VERI.get("ayar");t&&(a={...a,...JSON.parse(t)})}return w=a,O=Date.now(),a}
let T=null,x=0;async function E(e,t){if(!t&&T&&Date.now()-x<6e4)return T;if(!e.VERI)return T=[],x=Date.now(),T;const a=await e.VERI.get("vip");return T=a?JSON.parse(a):[],x=Date.now(),T}let v=null,R=0
;async function N(e,t){if(!t&&v&&Date.now()-R<6e4)return v;if(!e.VERI)return v=[],R=Date.now(),v;const a=await e.VERI.get("engel");return v=a?JSON.parse(a):[],R=Date.now(),v}async function B(e,t){
return!d(t)&&(await N(e)).includes(String(t))}function M(e){return new Request("https://kisit.local/u/"+e)}async function D(e){try{return await caches.default.delete(M(e)),!0}catch(e){return!1}}
function I(e){return void 0!==e.kar&&null!==e.kar?Number(e.kar):e.giris>0&&e.fiyat>0?100*(Number(e.fiyat)/Number(e.giris)-1):null}const A={pot:"🎯 Hedefe kalan",kar:"💰 Kâr/Zarar",yeni:"🕐 En yeni"}
;function z(e,t,a){const n=e.kartlar&&e.kartlar[t]||[],i=n.length,r=[...Array(i).keys()];if("pot"===a)return r;const s=e.kartlar&&e.kartlar.sira&&e.kartlar.sira[t]&&e.kartlar.sira[t][a]
;return Array.isArray(s)&&s.length===i?s:"kar"===a?r.sort((e,t)=>(I(n[t])??-9999)-(I(n[e])??-9999)):r.sort((e,t)=>(n[t].sinyalTs||0)-(n[e].sinyalTs||0))}function U(e,t,a,n,i,r){
const s=t.kartlar[a],l=Math.max(1,Math.ceil(r.length/8));let o=e+"\n";if(t.guncelleme){const e=new Date(t.guncelleme)
;o+="<i>"+String((e.getUTCHours()+3)%24).padStart(2,"0")+":"+String(e.getUTCMinutes()).padStart(2,"0")+" · "+s.length+" hisse</i>\n"}o+="<i>Sıralama: "+(A[n]||A.pot)+" · sayfa "+(i+1)+"/"+l+"</i>\n",
o+="<i>Düğmede: solda hedefe kalan · sağda sinyalden bu yana</i>\n\n";const c=8*i;return r.slice(c,c+8).forEach((e,t)=>{o+=function(e,t){const a=e=>Number(e).toFixed(2);let n="━━━━━━━━━━━━━━━━\n"
;n+="<b>"+t+". "+(e.rozet||"▫️")+" "+e.kod+"</b>"+(e.tf?"  ·  <i>"+e.tf+"</i>":"")+(e.etiket?"  ·  "+e.etiket:"")+"\n",
void 0!==e.giris&&null!==e.giris?n+="💵 Sinyal <b>"+a(e.giris)+"</b> → Şimdi <b>"+a(e.fiyat)+"</b>\n":n+="💵 Şimdi <b>"+a(e.fiyat)+"</b>\n";const i=I(e)
;null!==i&&(n+=(i>=0?"🟢":"🔴")+" Sinyalden bu yana: <b>"+(i>=0?"+":"")+i.toFixed(2)+"%</b>\n"),void 0!==e.hedef&&null!==e.hedef&&(n+="🎯 Hedef <b>"+a(e.hedef)+"</b>",
void 0!==e.potansiyel&&null!==e.potansiyel&&(n+=Number(e.potansiyel)<=0?"  ·  🏆 <b>TUTTU</b>":"  ·  hedefe <b>+"+Number(e.potansiyel).toFixed(1)+"%</b>"),n+="\n");const r=e.sinyalZaman||e.zaman
;return r&&(n+="🕐 <i>"+r+"</i>\n"),n}(s[e],c+t+1)}),o+="━━━━━━━━━━━━━━━━\n<i>Hisse düğmesine dokun, tam detayını gör.</i>\n",o+="<i>⚠️ Yatırım tavsiyesi değildir.</i>",o}function K(e,t,a,n,i){
const r=e.kartlar[t],s=Math.max(1,Math.ceil(i.length/8)),l=[];l.push(["pot","kar","yeni"].map(e=>({text:(e===a?"✅ ":"")+A[e],callback_data:"l:"+t+":"+e+":0"})));const o=8*n,c=i.slice(o,o+8),d=e=>{
const t=I(e),a=void 0!==e.potansiyel&&null!==e.potansiyel?Number(e.potansiyel):null,n=null===a?"":a<=0?"🏆 ":"+"+a.toFixed(1)+"% ",i=null===t?"":"  "+(t>=0?"+":"")+t.toFixed(1)+"%"
;return n+(e.rozet||"")+e.kod+i};for(let e=0;e<c.length;e+=2)l.push(c.slice(e,e+2).map(e=>({text:d(r[e]),callback_data:"d:"+t+":"+e+":"+a+":"+n})));const u=[];return n>0&&u.push({text:"◀️ Önceki",
callback_data:"l:"+t+":"+a+":"+(n-1)}),n<s-1&&u.push({text:"Sonraki ▶️",callback_data:"l:"+t+":"+a+":"+(n+1)}),u.length&&l.push(u),l.push([{text:"◀️ Menü",callback_data:"menu"}]),{inline_keyboard:l}}
async function V(e,t,a,n,i,r,s){const l={chat_id:a,text:i,parse_mode:"HTML",disable_web_page_preview:!0,reply_markup:r};if(s&&!n&&t.message&&t.message.message_id){
const a=await b(e.BOT_TOKEN,"editMessageText",Object.assign({message_id:t.message.message_id},l));if(a&&a.ok)return a}return b(e.BOT_TOKEN,"sendMessage",l)}function j(e){
const t=e=>Number(e).toFixed(2);let a="━━━━━━━━━━━━━━━━\n";if(a+="<b>"+e.kod+"</b>  ·  <b>"+t(e.fiyat)+" ₺</b>\n",e.guc&&(a+=e.guc+"\n"),e.zaman&&(a+="⏱ Sinyal: "+e.zaman+(e.tf?"  ·  "+e.tf:"")+"\n"),
void 0!==e.giris&&null!==e.giris){a+="🚪 Sinyal fiyatı: <b>"+t(e.giris)+"</b>\n";const n=I(e);null!==n&&(a+=(n>=0?"🟢":"🔴")+" Sinyalden bu yana: <b>"+(n>=0?"+":"")+n.toFixed(2)+"%</b>\n")}
return e.direncler&&e.direncler.length&&(a+="🧱 Dirençler: "+e.direncler.map(e=>t(e)).join(" · ")+"\n"),void 0!==e.hedef&&null!==e.hedef&&(a+="🎯 Hedef: <b>"+t(e.hedef)+"</b>\n",
void 0!==e.potansiyel&&null!==e.potansiyel&&(a+=Number(e.potansiyel)<=0?"🏆 <b>HEDEF TUTTU</b> — fiyat hedefin "+Math.abs(e.potansiyel).toFixed(1)+"% üstünde\n":(e.rozet||"➡️")+" Potansiyel: <b>+"+Number(e.potansiyel).toFixed(1)+"%</b>\n")),
e.sinyalZaman&&(a+="🕐 Sinyal zamanı: <b>"+e.sinyalZaman+"</b>\n"),a+="━━━━━━━━━━━━━━━━\n<i>⚠️ Yatırım tavsiyesi değildir.</i>",a}let H={},C=0;async function L(e){if(!e.VERI)return{toplam:0,basis:{},
gun:{}};const t=await e.VERI.get("istatistik");return t?JSON.parse(t):{toplam:0,basis:{},gun:{}}}async function F(e){if(!e.VERI)return{};const t=await e.VERI.get("referanslar")
;return t?JSON.parse(t):{}}function W(){return(new Date).toISOString().slice(0,10)}let _={};async function Y(e){if(!e.VERI)return{};const t=await e.VERI.get("kullanim");return t?JSON.parse(t):{}}
const J=["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"].join("")
;let G=null;async function X(e,t){if(!e.VERI)return[];const a=await e.VERI.get("fav:"+t);return a?JSON.parse(a):[]}function Z(e,t){if(!e||!e.kartlar)return null;for(const a of Object.keys(e.kartlar)){
if("sira"===a)continue;const n=(e.kartlar[a]||[]).find(e=>e&&e.kod===t);if(n)return n}return null}function P(e,t){const a=Z(e,t)
;return a?"🔎 <b>"+t+"</b> için güncel durum\n\n"+j(a):"🔎 <b>"+t+"</b>\n\nBu hisse güncel tarama listelerinde yok — şu an aktif bir sinyali bulunmuyor.\n\n<i>Yeni tarama sonrası tekrar sorabilirsin.</i>"
}function PY(uname,userId,chatId){const link="https://t.me/"+uname+"?start=r"+userId,metin="📈 Fix Borsa botunu kullanıyorum, hisse sinyallerini buradan takip ediyorum. Aşağıdaki bağlantıdan sen de katılabilirsin:",paylas="https://t.me/share/url?url="+encodeURIComponent(link)+"&text="+encodeURIComponent(metin),menu=u(userId);menu.inline_keyboard=[[{text:"📤 Paylaş",url:paylas}]].concat(menu.inline_keyboard);return{chat_id:chatId,parse_mode:"HTML",disable_web_page_preview:!0,text:"📤 <b>Sistemi paylaş</b>\n\nAşağıdaki düğmeye dokun, Telegram'da kime göndereceğini seç. Davet bağlantın otomatik olarak gönderilir.",reply_markup:menu}}
const Q={tavan:"🟥 <b>GÜÇLÜ SİNYALLER</b>",potansiyel:"🟩 <b>YÜKSEK POTANSİYEL</b>",fibo:"🟦 <b>YENİ KIRILIMLAR</b>"};export default{async fetch(p,A,q){const $=new URL(p.url);if(n=$.origin,
i=A.PANEL_KEY||A.PUSH_KEY||t,"/surum"===$.pathname)return new Response("Fix Borsa worker surum "+a,{headers:{"content-type":"text/plain; charset=utf-8","Access-Control-Allow-Origin":"*"}})
;if("/setup"===$.pathname){
const e=(e,t)=>new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="margin:0;background:#0d1117;color:#e6edf3;font:15px/1.6 system-ui,sans-serif;padding:18px"><h2 style="margin:0 0 10px">'+e+"</h2>"+t+'<p style="margin-top:18px"><a href="/" style="color:#388bfd">← Durum sayfasına dön</a></p></body>',{
headers:{"content-type":"text/html; charset=utf-8"}})
;if(!A.BOT_TOKEN)return e("⚠️ Bot anahtarı yok","<p>Cloudflare'de <b>BOT_TOKEN</b> tanımlı değil. Worker → Settings → Variables and Secrets → Add: isim <code>BOT_TOKEN</code>, değer BotFather'ın verdiği anahtar. Sonra <b>Deploy</b>.</p>")
;const t=await b(A.BOT_TOKEN,"getMe",{})
;if(!t||!t.ok)return e("⚠️ Bot anahtarı geçersiz","<p>Telegram bu anahtarı tanımıyor"+(t&&t.error_code?" (hata "+t.error_code+")":"")+".</p><p>En sık sebep: değeri yapıştırırken başına/sonuna <b>tırnak</b> veya <b>boşluk</b> karışmış olması. Anahtar şuna benzer görünür: <code>1234567890:AAH...</code> — tırnak yok, boşluk yok.</p><p>BotFather'da <code>/mybots</code> → botun → <i>API Token</i> ile doğrulayıp Settings → Variables kısmına yeniden yapıştır ve <b>Deploy</b> et.</p>")
;const a=await b(A.BOT_TOKEN,"setWebhook",{url:`${$.origin}/tg`,allowed_updates:["message","callback_query"]})
;return a&&a.ok?e("✅ Bağlantı kuruldu","<p>Bot: <b>@"+(t.result.username||"?")+"</b></p><p>Artık Telegram'da bota <b>/start</b> yazabilirsin.</p>"):e("⚠️ Bağlanamadı","<p>"+(a&&a.description||"bilinmeyen hata")+"</p>")
}const ee={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"POST, GET, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Max-Age":"86400"}
;if("OPTIONS"===p.method)return new Response(null,{status:204,headers:ee});if("/push"===$.pathname){const e=(e,t)=>new Response(JSON.stringify(e),{status:t||200,headers:Object.assign({
"content-type":"application/json; charset=utf-8"},ee)});if("POST"!==p.method)return e({ok:!1,hata:"POST bekleniyor"},405);if(!s(A,$))return e({ok:!1,hata:"Şifre yanlış"},401)
;const t=await p.json().catch(()=>null);if(!t||"object"!=typeof t)return e({ok:!1,hata:"Paket okunamadı"},400);t.guncelleme=(new Date).toISOString()
;const eskiListe=await g(A).catch(()=>null);await async function(e,t){o=t,
e.VERI&&await e.VERI.put("listeler",JSON.stringify(t)),await caches.default.put(new Request(l),new Response(JSON.stringify(t),{headers:{"Cache-Control":"max-age=86400",
"content-type":"application/json"}}))}(A,t),q.waitUntil(k(A,t).catch(()=>{})),q.waitUntil(gecmisiDoldur(A,t).catch(()=>{})),q.waitUntil(alarmGonder(A,eskiListe,t).catch(()=>{}))
;const n=t.kartlar?Object.keys(t.kartlar).filter(e=>"sira"!==e).map(e=>e+":"+(t.kartlar[e]||[]).length).join(" · "):""
;return e({ok:!0,surum:a,depo:!!A.VERI,sayim:n,guncelleme:t.guncelleme})}if($.pathname.startsWith("/panel")){if(!s(A,$))return new Response("yetkisiz",{status:401})
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
const e=await a(5e3),t=await Y(A),n=await F(A),i=new Set(await E(A,!0)),r=e=>e.map(e=>'"'+String(null==e?"":e).replace(/"/g,'""')+'"').join(",")
;let s=r(["id","ad","kullanici","katilim","davetci","davet_ettigi","sorgu","son_aktif","sinirsiz"])+"\n";for(const a of e){const e=t[String(a.id)]||{}
;s+=r([a.id,a.ad,a.kullanici,a.katilim,a.ref,n[String(a.id)]||0,e.toplam||0,e.son?new Date(1e3*e.son).toISOString():"",i.has(String(a.id))?"evet":""])+"\n"}return new Response("\ufeff"+s,{headers:{
"content-type":"text/csv; charset=utf-8","content-disposition":'attachment; filename="fixborsa-uyeler.csv"'}})}if("/panel/veri"===$.pathname){
const e=await L(A),t=await F(A),n=await Y(A),i=await E(A,!0),r=await N(A,!0),s=await S(A,!0);let l=await a(1e3);const o=e=>{const t=l.find(t=>String(t.id)===String(e))
;return t&&(t.ad||(t.kullanici?"@"+t.kullanici:""))||""};for(const e of l){const t=n[String(e.id)]||{};e.sorgu=t.toplam||0,e.sonAktif=t.son||null}
l.sort((e,t)=>(t.katilim||"").localeCompare(e.katilim||""));const c=Object.entries(t).map(([e,t])=>({id:e,n:t,ad:o(e)})).sort((e,t)=>t.n-e.n).slice(0,50),d=Object.entries(n).map(([e,t])=>({id:e,
ad:o(e),toplam:t.toplam||0,tavan:t.tavan||0,potansiyel:t.potansiyel||0,fibo:t.fibo||0,detay:t.detay||0,son:t.son||null
})).sort((e,t)=>t.toplam-e.toplam).slice(0,50),u=Math.floor(Date.now()/1e3),f=Object.values(n).filter(e=>e.son&&u-e.son<86400).length,b=Object.values(n).filter(e=>e.son&&u-e.son<604800).length,p=await g(A)
;let y=null;if(A.VERI){const e=await A.VERI.get("sonYayin");e&&(y=JSON.parse(e))}return new Response(JSON.stringify({toplam:e.toplam||0,gun:e.gun||{},basis:e.basis||{},kullanicilar:l.slice(0,400),
referans:c,sorguLider:d,vip:i,engel:r,ayar:s,aktif24:f,aktif7g:b,sonYayin:y,listeGuncelleme:p?p.guncelleme:null,listeOzet:p&&p.kartlar?Object.keys(p.kartlar).filter(e=>"sira"!==e).map(e=>({ad:e,
n:p.kartlar[e].length})):[],depo:!!A.VERI}),{headers:{"content-type":"application/json; charset=utf-8"}})}return new Response(await async function(){if(G)return G
;const e=Uint8Array.from(atob(J),e=>e.charCodeAt(0)),t=new Blob([e]).stream().pipeThrough(new DecompressionStream("gzip"));return G=await new Response(t).text(),G}(),{headers:{
"content-type":"text/html; charset=utf-8"}})}if("/durum"===$.pathname){const e=A.VERI?"DEPO BAĞLI ✅":"DEPO YOK ⚠️ (kullanıcılar liste göremeyebilir)",t=await g(A)
;if(!t)return new Response(e+"\nliste yok — telefondan yükle");const a=t.kartlar?Object.keys(t.kartlar).filter(e=>"sira"!==e).map(e=>e+":"+t.kartlar[e].length).join(" · "):"kart yok"
;return new Response(e+"\nliste var · "+Object.keys(t).filter(e=>"guncelleme"!==e).join(", ")+"\nkartlar: "+a+"\ngüncelleme: "+t.guncelleme)}if("/tg"===$.pathname&&"POST"===p.method){
const e=await p.json().catch(()=>null);if(!e)return new Response("ok");if(e.message){const t=e.message,a=(t.text||"").trim(),n=a.toLowerCase(),i="private"===t.chat.type;let s=null
;const l=a.match(/^\/start\s+r(\d+)/i);if(l&&(s=l[1]),await B(A,t.from.id))return new Response("ok");if(i&&q.waitUntil(async function(e,t,a){if(!e.VERI)return!1;const n="u:"+t.id
;if(await e.VERI.get(n))return!1;const i={id:t.id,ad:((t.first_name||"")+" "+(t.last_name||"")).trim(),kullanici:t.username||"",katilim:(new Date).toISOString(),ref:a||null,basis:0}
;await e.VERI.put(n,JSON.stringify(i));const r=await L(e);if(r.toplam=(r.toplam||0)+1,r.gun=r.gun||{},r.gun[W()]=(r.gun[W()]||0)+1,await e.VERI.put("istatistik",JSON.stringify(r)),
a&&String(a)!==String(t.id)){const t=await F(e);t[a]=(t[a]||0)+1,await e.VERI.put("referanslar",JSON.stringify(t))}return!0}(A,t.from,s)),
i&&(n.startsWith("/panel")||n.startsWith("/yonetici")))return d(t.from.id)?(q.waitUntil(b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,parse_mode:"HTML",disable_web_page_preview:!0,
text:"🛠 <b>Yönetici paneli</b>\n\nAşağıdaki düğmeye dokun — panel tarayıcıda açılır.\n\nAdres:\n<code>"+r()+"</code>",reply_markup:{inline_keyboard:[[{text:"🛠 Paneli aç",url:r()}],[{text:"◀️ Menü",
callback_data:"menu"}]]}})),new Response("ok")):(q.waitUntil(b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,text:"Bu komut yöneticiye özeldir.",reply_markup:u(t.from.id)})),new Response("ok"))
;if(i&&n.startsWith("/davet"))return q.waitUntil((async()=>{const e=(await b(A.BOT_TOKEN,"getMe",{}))?.result?.username||"bot";await b(A.BOT_TOKEN,"sendMessage",PY(e,t.from.id,t.chat.id))})()),new Response("ok")
const o=a.toUpperCase().replace(/[^A-ZÇĞİÖŞÜ]/g,"");return i&&!a.startsWith("/")&&o.length>=3&&o.length<=6&&o.length===a.trim().length?(q.waitUntil((async()=>{const e=await g(A)
;await b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,parse_mode:"HTML",disable_web_page_preview:!0,text:P(e,o),reply_markup:u(t.from.id)})})()),
new Response("ok")):((i||n.startsWith("/start")||n.startsWith("/liste"))&&q.waitUntil(b(A.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,text:f,parse_mode:"HTML",reply_markup:u(t.from.id)})),
new Response("ok"))}if(e.callback_query){const t=e.callback_query,a=t.from.id,n="private"!==t.message.chat.type,i=n?a:t.message.chat.id,r=t.data
;if(await B(A,a))return await b(A.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id,text:"Erişimin kapatılmış.",show_alert:!0}),new Response("ok");if("davet"===r){
await b(A.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id});const e=(await b(A.BOT_TOKEN,"getMe",{}))?.result?.username||"bot";return q.waitUntil(b(A.BOT_TOKEN,"sendMessage",PY(e,a,i))),new Response("ok")}
if("menu"===r)return await b(A.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id}),q.waitUntil(b(A.BOT_TOKEN,"sendMessage",{chat_id:i,text:f,parse_mode:"HTML",reply_markup:u(a)})),
new Response("ok");if("karne"===r&&!d(a))return await b(A.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id,text:"🔐 Bu bölüm yöneticiye özeldir.",show_alert:!0}),new Response("ok")
;const s=c.has(r)&&!await async function(e,t){return!!d(t)||(await E(e)).includes(String(t))}(A,a)?await async function(e,t){const a=caches.default,n=M(t),i=await a.match(n);if(i){
const e=parseInt(await i.text(),10)-Math.floor(Date.now()/1e3);if(e>0)return e}const r=await S(e),s=60*(r.kisitMin+Math.floor((r.kisitMax-r.kisitMin+1)*Math.random()));if(s<=0)return 0
;const l=Math.floor(Date.now()/1e3)+s;return await a.put(n,new Response(String(l),{headers:{"Cache-Control":"max-age="+s}})),0}(A,a):0;if(s>0)return await b(A.BOT_TOKEN,"answerCallbackQuery",{
callback_query_id:t.id,
text:"⏳ Sıradaki listen "+Math.ceil(s/60)+" dakika sonra açılacak.\n\nBot çok sayıda kullanıcıya aynı anda hizmet veriyor; erişim sırayla veriliyor. Yoğunluk azaldıkça sıra hızlanır.",show_alert:!0}),
new Response("ok");await b(A.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id}),q.waitUntil(async function(e,t,a,n){if(H[a]=(H[a]||0)+1,n){const e=_[n]||(_[n]={});e[a]=(e[a]||0)+1,
e.toplam=(e.toplam||0)+1,e.son=Math.floor(Date.now()/1e3)}const i=Date.now();if(i-C<3e5||!e.VERI)return;C=i;const r=H,s=_;H={},_={},t.waitUntil((async()=>{const t=await L(e);t.basis=t.basis||{}
;for(const e of Object.keys(r))t.basis[e]=(t.basis[e]||0)+r[e];if(await e.VERI.put("istatistik",JSON.stringify(t)),Object.keys(s).length){const t=await Y(e);for(const e of Object.keys(s)){
const a=t[e]||(t[e]={});for(const t of Object.keys(s[e]))"son"===t?a.son=s[e].son:a[t]=(a[t]||0)+s[e][t]}await e.VERI.put("kullanim",JSON.stringify(t))}})())
}(A,q,r.startsWith("d:")?"detay":r.startsWith("l:")?"sirala":r,String(a)));const l=await g(A);if(r.startsWith("d:")){
const[,e,s,o,c]=r.split(":"),d=o||"pot",f=Number(c||0),b=l&&l.kartlar&&l.kartlar[e],p=b&&b[Number(s)];let y=u(a);return b&&b.length&&(y=K(l,e,d,f,z(l,e,d))),q.waitUntil((async()=>{
if(p&&y&&y.inline_keyboard){const e=(await X(A,a)).includes(p.kod);y={inline_keyboard:[[{text:(e?"⭐ Takipten çıkar":"⭐ Takibe al")+" · "+p.kod,callback_data:"fav:"+p.kod}]].concat(y.inline_keyboard)}}
await V(A,t,i,n,p?j(p):"Bu hisse artık listede değil. Menüden yeniden bak.",y,!0)})()),new Response("ok")}if("karne7"===r)return q.waitUntil((async()=>{let e;try{e=await async function(e){
const t=await y(e),a=Object.keys(t.gunler||{}).sort().reverse().slice(0,7)
;if(!a.length)return"📊 <b>SON 7 GÜN KARNESİ</b>\n\nHenüz yeterli geçmiş birikmedi. Kayıt her taramada işleniyor; birkaç gün sonra burada dolu bir tablo olacak.";let n="📊 <b>SON 7 GÜN KARNESİ</b>\n"
;n+="<i>Her gün o günün sinyallerine 100.000 TL eşit dağıtılsaydı</i>\n\n";let i=0,r=0,s=0;for(const e of a){const a=m(e,t.gunler[e]);if(!a)continue;r++,i+=a.deger,s+=a.n
;const[l,o,c]=e.split("-"),d=a.ort>=0?"🟢":"🔴";n+="━━━━━━━━━━━━━━━━\n",n+="<b>"+c+"/"+o+"</b>  ·  "+a.n+" sinyal\n",n+=d+" Ortalama: <b>"+(a.ort>=0?"+":"")+a.ort.toFixed(2)+"%</b>\n",
n+="💰 100.000 ₺ → <b>"+Math.round(a.deger).toLocaleString("tr-TR")+" ₺</b>\n",a.eniyi&&(n+="🔝 "+a.eniyi.kod+" "+(a.eniyi.y>=0?"+":"")+a.eniyi.y.toFixed(1)+"%"),
a.enkotu&&(n+="   🔻 "+a.enkotu.kod+" "+(a.enkotu.y>=0?"+":"")+a.enkotu.y.toFixed(1)+"%"),n+="\n"}if(r){const e=i/r,t=100*(e/1e5-1);n+="━━━━━━━━━━━━━━━━\n",
n+="<b>"+r+" günün ortalaması</b>  ·  "+s+" sinyal\n",n+=(t>=0?"🟢":"🔴")+" <b>"+(t>=0?"+":"")+t.toFixed(2)+"%</b>  ·  100.000 ₺ → <b>"+Math.round(e).toLocaleString("tr-TR")+" ₺</b>\n"}
return n+="━━━━━━━━━━━━━━━━\n<i>Fiyatlar son taramaya göredir. Geçmiş performans geleceği garanti etmez.</i>\n<i>⚠️ Yatırım tavsiyesi değildir.</i>",n}(A)}catch(t){
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
;return n+"\n<i>Detaylı (hisse bazlı) kayıtlar son "+DETAY_GUN+" gün için tutulur; daha eskisi günlük özet olarak "+OZET_GUN+" güne kadar saklanır.</i>\n<i>⚠️ Yatırım tavsiyesi değildir.</i>"
}(A)}catch(t){e="📆 Özet şu an hazırlanamadı, birazdan tekrar dene."}await V(A,t,i,n,e,u(a),!1)})()),new Response("ok");if("alarm"===r||"alarm:on"===r||"alarm:off"===r)return q.waitUntil((async()=>{if(A.VERI){if("alarm:on"===r)await A.VERI.put("alarm:"+a,"1");else if("alarm:off"===r)await A.VERI.delete("alarm:"+a)}
const acik=!!(A.VERI&&await A.VERI.get("alarm:"+a))
;const metin="🔔 <b>ANLIK UYARI AYARLARI</b>\n\n"+(acik?"✅ Şu an <b>açık</b>.\n\nBir hisse 🎯 <b>Güçlü sinyaller</b> listesine girdiği an sana özelden mesaj gönderilir.":"🔕 Şu an <b>kapalı</b>.\n\nAçarsan, bir hisse 🎯 <b>Güçlü sinyaller</b> listesine girdiği an sana özelden mesaj gönderilir.")+"\n\n<i>İstediğin zaman değiştirebilirsin.</i>"
;await V(A,t,i,n,metin,{inline_keyboard:[[{text:acik?"🔕 Kapat":"🔔 Aç",callback_data:acik?"alarm:off":"alarm:on"}],[{text:"◀️ Menü",callback_data:"menu"}]]},!0)})()),new Response("ok")
;if("fav"===r||r.startsWith("fav:"))return q.waitUntil((async()=>{let e=await X(A,a)
;if(r.startsWith("fav:")){const t=r.slice(4);e=e.includes(t)?e.filter(e=>e!==t):[t,...e],await async function(e,t,a){return e.VERI&&await e.VERI.put("fav:"+t,JSON.stringify(a.slice(0,30))),a}(A,a,e)}
await V(A,t,i,n,function(e,t){
if(!t.length)return"⭐ <b>TAKİP LİSTEM</b>\n\nListen boş.\n\nBir hissenin detayını açtığında <b>⭐ Takibe al</b> düğmesi çıkar. Eklediklerin burada, anlık kâr/zararıyla toplanır."
;let a="⭐ <b>TAKİP LİSTEM</b>\n<i>"+t.length+" hisse</i>\n\n",n=0,i=0;for(const r of t){const t=Z(e,r);if(!t){a+="▫️ <b>"+r+"</b> — güncel listede yok\n";continue}const s=I(t);null!==s&&(n+=s,i++),
a+=(null===s?"▫️":s>=0?"🟢":"🔴")+" <b>"+r+"</b>  "+Number(t.fiyat).toFixed(2)+" ₺"+(null===s?"":"  ·  <b>"+(s>=0?"+":"")+s.toFixed(2)+"%</b>")+(void 0!==t.potansiyel&&null!==t.potansiyel?"  ·  hedefe +"+Number(t.potansiyel).toFixed(1)+"%":"")+"\n"
}if(i){const e=n/i;a+="\n"+(e>=0?"🟢":"🔴")+" <b>Ortalama: "+(e>=0?"+":"")+e.toFixed(2)+"%</b>"}return a+="\n\n<i>⚠️ Yatırım tavsiyesi değildir.</i>",a}(l,e),u(a),!1)})()),new Response("ok")
if("ilk3"===r){const e=l&&l.kartlar&&l.kartlar.ilk3&&l.kartlar.ilk3.length
;return q.waitUntil(V(A,t,i,n,e?function(e){const t=e.kartlar&&e.kartlar.ilk3||[],a=e=>Number(e).toFixed(2),n=["🥇","🥈","🥉"];let i="🏅 <b>BU TARAMANIN İLK 3'Ü</b>\n";if(e.guncelleme){
const t=new Date(e.guncelleme);i+="<i>"+String((t.getUTCHours()+3)%24).padStart(2,"0")+":"+String(t.getUTCMinutes()).padStart(2,"0")+" taramasından</i>\n"}return i+="\n",t.forEach((e,t)=>{
i+="━━━━━━━━━━━━━━━━\n"+n[t]+" <b>"+e.kod+"</b>"+(e.tf?"  ·  <i>"+e.tf+"</i>":"")+(e.neden?"  ·  <i>"+e.neden+"</i>":"")+"\n",
void 0!==e.giris&&null!==e.giris&&(i+="💵 Sinyal <b>"+a(e.giris)+"</b> → Şimdi <b>"+a(e.fiyat)+"</b>\n");const r=I(e)
;null!==r&&(i+=(r>=0?"🟢":"🔴")+" Sinyalden bu yana: <b>"+(r>=0?"+":"")+r.toFixed(2)+"%</b>\n"),void 0!==e.hedef&&null!==e.hedef&&(i+="🎯 Hedef <b>"+a(e.hedef)+"</b>",
void 0!==e.potansiyel&&null!==e.potansiyel&&(i+=Number(e.potansiyel)<=0?"  ·  🏆 <b>TUTTU</b>":"  ·  <b>+"+Number(e.potansiyel).toFixed(1)+"%</b>"),i+="\n");const s=e.sinyalZaman||e.zaman
;s&&(i+="🕐 <i>"+s+"</i>\n")}),i+="━━━━━━━━━━━━━━━━\n<i>Sıralama tazelik, likidite ve kademe puanına göre; yalnız hedef uzaklığına göre değil.</i>\n<i>⚠️ Yatırım tavsiyesi değildir.</i>",i
}(l):"🏅 <b>BU TARAMANIN İLK 3'Ü</b>\n\nHenüz liste hazırlanmadı. Birazdan tekrar dene.",u(a),!1)),new Response("ok")}let o,p=r,k="pot",h=0;if(r.startsWith("l:")){const e=r.split(":");p=e[1],
k=e[2]||"pot",h=Number(e[3]||0)}if(l&&l.kartlar&&l.kartlar[p]&&l.kartlar[p].length){const e=z(l,p,k),a=Math.max(1,Math.ceil(e.length/8));h<0&&(h=0),h>=a&&(h=a-1);const s=Q[p]||"<b>LİSTE</b>"
;return q.waitUntil(V(A,t,i,n,U(s,l,p,k,h,e),K(l,p,k,h,e),r.startsWith("l:"))),new Response("ok")}if(l&&l[p]){if(o=l[p],l.guncelleme){const e=new Date(l.guncelleme)
;o+=`\n\n<i>Son güncelleme: ${String((e.getUTCHours()+3)%24).padStart(2,"0")+":"+String(e.getUTCMinutes()).padStart(2,"0")}</i>`}}else o="⏳ Liste henüz hazırlanmadı. Birazdan tekrar dene."
;const w=function(e){const t=[];for(;e.length>3900;){let a=e.lastIndexOf("\n",3900);a<2e3&&(a=3900),t.push(e.slice(0,a)),e=e.slice(a)}return t.push(e),t}(o);return q.waitUntil((async()=>{
for(let e=0;e<w.length;e++){const r=await b(A.BOT_TOKEN,"sendMessage",{chat_id:i,text:w[e],parse_mode:"HTML",disable_web_page_preview:!0,reply_markup:e===w.length-1?u(a):void 0})
;if(n&&(!r||!1===r.ok)){const e=(await b(A.BOT_TOKEN,"getMe",{}))?.result?.username;await b(A.BOT_TOKEN,"sendMessage",{chat_id:t.message.chat.id,
text:'👋 <a href="tg://user?id='+a+'">Listeyi görmek</a> için önce botu başlatman gerekiyor: @'+(e||"bot")+" → <b>Başlat</b>. Sonra buradaki düğmeler sana özelden cevap verir.",parse_mode:"HTML",
disable_web_page_preview:!0});break}}})()),new Response("ok")}return new Response("ok")}{const e=!!A.VERI,a=await g(A);let n=null,i=!1,r=null,s="";if(A.BOT_TOKEN){try{
const e=await b(A.BOT_TOKEN,"getMe",{});e&&e.ok&&(i=!0,n=e.result.username)}catch(e){}if(i)try{const e=await b(A.BOT_TOKEN,"getWebhookInfo",{});e&&e.result&&(r=e.result.url||"",
e.result.last_error_message&&(s=e.result.last_error_message))}catch(e){}}
const l=A.PUSH_KEY||t,o=a&&a.kartlar?Object.keys(a.kartlar).filter(e=>"sira"!==e).map(e=>e+": "+a.kartlar[e].length).join(" · "):"",c=(e,t,a)=>'<div class="s '+(e?"ok":"yok")+'"><div class="i">'+(e?"✅":"⚠️")+"</div><div><b>"+t+'</b><div class="a">'+a+"</div></div></div>",d='<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Fix Borsa · Durum</title><style>body{margin:0;background:#0d1117;color:#e6edf3;font:15px/1.55 system-ui,-apple-system,sans-serif;padding:16px 14px 60px}h1{font-size:19px;margin:0 0 14px}.s{display:flex;gap:10px;background:#161b22;border:1px solid #272e37;border-radius:12px;padding:12px;margin-bottom:9px}.s.yok{border-color:#6b2b2b;background:#22171a}.i{font-size:18px;line-height:1.3}.a{color:#8b949e;font-size:13px;margin-top:3px}a.d{display:block;background:#388bfd;color:#fff;text-decoration:none;text-align:center;border-radius:11px;padding:13px;font-weight:700;margin-top:10px}a.d.ikinci{background:#21262d;border:1px solid #272e37;color:#e6edf3}code{background:#1c2330;padding:2px 6px;border-radius:5px;font-size:13px;word-break:break-all}ol{padding-left:20px;margin:8px 0 0}li{margin-bottom:7px}.kur{background:#22171a;border:1px solid #6b2b2b;border-radius:12px;padding:13px;margin-top:12px;font-size:14px}</style></head><body><h1>Fix Borsa · Durum</h1><div class="a" style="margin:-8px 0 12px">yazılım sürümü <b>9.9</b></div>'+c(i,"Bot anahtarı",A.BOT_TOKEN?i?"geçerli · @"+(n||"?"):"TANIMLI AMA GEÇERSİZ — Telegram bu anahtarı tanımıyor. Başına/sonuna tırnak veya boşluk karışmış olabilir.":"BOT_TOKEN tanımlı değil — Settings → Variables kısmından ekle")+c(!!r,"Telegram bağlantısı",r?"bağlı"+(s?" · son hata: "+s:""):"bağlı değil — aşağıdaki Bağla düğmesine bas")+c(e,"Hafıza (üye kayıtları)",e?"bağlı":"BAĞLI DEĞİL — üyeler, davetler ve panel çalışmaz")+c(!!a,"Hisse listeleri",a?"yüklü · "+(o||"")+" · "+new Date(a.guncelleme).toLocaleString("tr-TR"):"henüz yüklenmedi — telefondaki uygulamada Worker adresi <code>"+$.origin+"</code> ve şifre <code>"+l+"</code> yazılı olmalı, sonra <b>TARA VE BULUTA YÜKLE</b>")+'<a class="d" href="/panel?key='+encodeURIComponent(l)+'">🛠 Yönetici panelini aç</a><div class="a" style="margin-top:8px">Panel bir <b>web sayfası</b>, Telegram\'da değil. Telegram\'da botun menüsünde de <b>🛠 Yönetici paneli</b> düğmesi var (sadece sen görürsün) ya da bota <code>/panel</code> yazabilirsin — ikisi de bu sayfayı açar. Bu adresi telefonun ana ekranına kısayol olarak eklemen en pratiği.</div>'+(r&&i?"":'<a class="d ikinci" href="/setup">🔗 Telegram\'a bağla</a>')+'<div style="margin-top:16px" class="a">Telefondaki uygulamaya yazacakların:<br>Worker adresi: <code>'+$.origin+"</code><br>Şifre: <code>"+l+"</code></div>"+(e?"":'<div class="kur"><b>⚠️ Hafıza bağlı değil — nasıl bağlanır</b><div class="a" style="margin:6px 0">Bot listeleri gösterir ama kimin üye olduğunu, kimin kimi davet ettiğini hatırlayamaz. Panel de boş kalır. Bir kez yapılır, 2 dakika sürer:</div><ol><li>Cloudflare panelinde soldaki menüden <b>Storage &amp; Databases</b> → <b>KV</b>.</li><li><b>Create a namespace</b> / <b>Oluştur</b>. Adına <code>fixborsa</code> yaz, kaydet.</li><li>Soldan <b>Compute (Workers)</b> → bu worker\'ı aç → <b>Settings</b> → <b>Bindings</b>.</li><li><b>Add binding</b> → <b>KV namespace</b> seç.</li><li><b>Variable name</b> kutusuna tam olarak <code>VERI</code> yaz (büyük harf, Türkçe İ değil düz I).</li><li><b>KV namespace</b> kutusundan az önce oluşturduğun <code>fixborsa</code>\'ı seç ve <b>Deploy</b>.</li><li>Bu sayfayı yenile — burası ✅ olacak.</li></ol></div>')+"</body></html>"
;return new Response(d,{headers:{"content-type":"text/html; charset=utf-8"}})}}};