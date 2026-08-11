const e=new Set(["6819672343"]),t="kolayfix",a="9.8";let n="",i=t;const r=()=>n+"/panel?key="+encodeURIComponent(i),s=(e,a)=>{const n=a.searchParams.get("key")
;return!!n&&(n===(e.PUSH_KEY||t)||n===(e.PANEL_KEY||e.PUSH_KEY||t))},l="https://liste.local/veri";let o=null;const c=new Set(["tavan","potansiyel","fibo"]),d=t=>e.has(String(t));function u(e){
const t=[[{text:"🏅 Bu taramanın ilk 3'ü",callback_data:"ilk3"}],[{text:"🎯 Güçlü sinyaller",callback_data:"tavan"}],[{text:"📈 Yüksek potansiyel",callback_data:"potansiyel"}],[{
text:"📐 Yeni kırılımlar",callback_data:"fibo"}]];return d(e)&&(t.push([{text:"📊 Önceki sonuçlar 🔐",callback_data:"karne"}]),n&&t.push([{text:"🛠 Yönetici paneli 🔐",url:r()}])),t.push([{
text:"🎁 Davet linkim",callback_data:"davet"}]),t.push([{text:"🔄 Yenile",callback_data:"menu"}]),{inline_keyboard:t}}
const p="👋 <b>Fix Borsa</b>\n\nAşağıdaki düğmelerden istediğin listeyi aç.\nListeler gün içinde düzenli güncellenir.\n\n<i>⚠️ Yatırım tavsiyesi değildir.</i>";async function f(e,t,a){
return fetch(`https://api.telegram.org/bot${e}/${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then(e=>e.json()).catch(()=>null)}async function b(e){
if(o)return o;if(e.VERI){const t=await e.VERI.get("listeler");if(t)return o=JSON.parse(t),o}const t=await caches.default.match(new Request(l));return t?(o=await t.json().catch(()=>null),o):null}
const m={kisitMin:10,kisitMax:30};let k=null,y=0;async function g(e,t){if(!t&&k&&Date.now()-y<6e4)return k;let a={...m};if(e.VERI){const t=await e.VERI.get("ayar");t&&(a={...a,...JSON.parse(t)})}
return k=a,y=Date.now(),a}let h=null,w=0;async function O(e,t){if(!t&&h&&Date.now()-w<6e4)return h;if(!e.VERI)return h=[],w=Date.now(),h;const a=await e.VERI.get("vip");return h=a?JSON.parse(a):[],
w=Date.now(),h}let x=null,T=0;async function S(e,t){if(!t&&x&&Date.now()-T<6e4)return x;if(!e.VERI)return x=[],T=Date.now(),x;const a=await e.VERI.get("engel");return x=a?JSON.parse(a):[],
T=Date.now(),x}async function E(e,t){return!d(t)&&(await S(e)).includes(String(t))}function v(e){return new Request("https://kisit.local/u/"+e)}async function R(e){try{
return await caches.default.delete(v(e)),!0}catch(e){return!1}}function B(e){return void 0!==e.kar&&null!==e.kar?Number(e.kar):e.giris>0&&e.fiyat>0?100*(Number(e.fiyat)/Number(e.giris)-1):null}
const M={pot:"🎯 Hedefe kalan",kar:"💰 Kâr/Zarar",yeni:"🕐 En yeni"};function N(e,t,a){const n=e.kartlar&&e.kartlar[t]||[],i=n.length,r=[...Array(i).keys()];if("pot"===a)return r
;const s=e.kartlar&&e.kartlar.sira&&e.kartlar.sira[t]&&e.kartlar.sira[t][a]
;return Array.isArray(s)&&s.length===i?s:"kar"===a?r.sort((e,t)=>(B(n[t])??-9999)-(B(n[e])??-9999)):r.sort((e,t)=>(n[t].sinyalTs||0)-(n[e].sinyalTs||0))}function D(e,t,a,n,i,r){
const s=t.kartlar[a],l=Math.max(1,Math.ceil(r.length/8));let o=e+"\n";if(t.guncelleme){const e=new Date(t.guncelleme)
;o+="<i>"+String((e.getUTCHours()+3)%24).padStart(2,"0")+":"+String(e.getUTCMinutes()).padStart(2,"0")+" · "+s.length+" hisse</i>\n"}o+="<i>Sıralama: "+(M[n]||M.pot)+" · sayfa "+(i+1)+"/"+l+"</i>\n",
o+="<i>Düğmede: solda hedefe kalan · sağda sinyalden bu yana</i>\n\n";const c=8*i;return r.slice(c,c+8).forEach((e,t)=>{o+=function(e,t){const a=e=>Number(e).toFixed(2);let n="━━━━━━━━━━━━━━━━\n"
;n+="<b>"+t+". "+(e.rozet||"▫️")+" "+e.kod+"</b>"+(e.tf?"  ·  <i>"+e.tf+"</i>":"")+(e.etiket?"  ·  "+e.etiket:"")+"\n",
void 0!==e.giris&&null!==e.giris?n+="💵 Sinyal <b>"+a(e.giris)+"</b> → Şimdi <b>"+a(e.fiyat)+"</b>\n":n+="💵 Şimdi <b>"+a(e.fiyat)+"</b>\n";const i=B(e)
;null!==i&&(n+=(i>=0?"🟢":"🔴")+" Sinyalden bu yana: <b>"+(i>=0?"+":"")+i.toFixed(2)+"%</b>\n"),void 0!==e.hedef&&null!==e.hedef&&(n+="🎯 Hedef <b>"+a(e.hedef)+"</b>",
void 0!==e.potansiyel&&null!==e.potansiyel&&(n+=Number(e.potansiyel)<=0?"  ·  🏆 <b>TUTTU</b>":"  ·  hedefe <b>+"+Number(e.potansiyel).toFixed(1)+"%</b>"),n+="\n");const r=e.sinyalZaman||e.zaman
;return r&&(n+="🕐 <i>"+r+"</i>\n"),n}(s[e],c+t+1)}),o+="━━━━━━━━━━━━━━━━\n<i>Hisse düğmesine dokun, tam detayını gör.</i>\n",o+="<i>⚠️ Yatırım tavsiyesi değildir.</i>",o}function A(e,t,a,n,i){
const r=e.kartlar[t],s=Math.max(1,Math.ceil(i.length/8)),l=[];l.push(["pot","kar","yeni"].map(e=>({text:(e===a?"✅ ":"")+M[e],callback_data:"l:"+t+":"+e+":0"})));const o=8*n,c=i.slice(o,o+8),d=e=>{
const t=B(e),a=void 0!==e.potansiyel&&null!==e.potansiyel?Number(e.potansiyel):null,n=null===a?"":a<=0?"🏆 ":"+"+a.toFixed(1)+"% ",i=null===t?"":"  "+(t>=0?"+":"")+t.toFixed(1)+"%"
;return n+(e.rozet||"")+e.kod+i};for(let e=0;e<c.length;e+=2)l.push(c.slice(e,e+2).map(e=>({text:d(r[e]),callback_data:"d:"+t+":"+e+":"+a+":"+n})));const u=[];return n>0&&u.push({text:"◀️ Önceki",
callback_data:"l:"+t+":"+a+":"+(n-1)}),n<s-1&&u.push({text:"Sonraki ▶️",callback_data:"l:"+t+":"+a+":"+(n+1)}),u.length&&l.push(u),l.push([{text:"◀️ Menü",callback_data:"menu"}]),{inline_keyboard:l}}
async function I(e,t,a,n,i,r,s){const l={chat_id:a,text:i,parse_mode:"HTML",disable_web_page_preview:!0,reply_markup:r};if(s&&!n&&t.message&&t.message.message_id){
const a=await f(e.BOT_TOKEN,"editMessageText",Object.assign({message_id:t.message.message_id},l));if(a&&a.ok)return a}return f(e.BOT_TOKEN,"sendMessage",l)}let z={},U=0;async function K(e){
if(!e.VERI)return{toplam:0,basis:{},gun:{}};const t=await e.VERI.get("istatistik");return t?JSON.parse(t):{toplam:0,basis:{},gun:{}}}async function V(e){if(!e.VERI)return{}
;const t=await e.VERI.get("referanslar");return t?JSON.parse(t):{}}function C(){return(new Date).toISOString().slice(0,10)}let j={};async function H(e){if(!e.VERI)return{}
;const t=await e.VERI.get("kullanim");return t?JSON.parse(t):{}}
const W=["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"].join("")
;let L=null;const Y={tavan:"🟥 <b>GÜÇLÜ SİNYALLER</b>",potansiyel:"🟩 <b>YÜKSEK POTANSİYEL</b>",fibo:"🟦 <b>YENİ KIRILIMLAR</b>"};export default{async fetch(M,F,J){const X=new URL(M.url)
;if(n=X.origin,i=F.PANEL_KEY||F.PUSH_KEY||t,"/surum"===X.pathname)return new Response("Fix Borsa worker surum "+a,{headers:{"content-type":"text/plain; charset=utf-8","Access-Control-Allow-Origin":"*"
}});if("/setup"===X.pathname){
const e=(e,t)=>new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="margin:0;background:#0d1117;color:#e6edf3;font:15px/1.6 system-ui,sans-serif;padding:18px"><h2 style="margin:0 0 10px">'+e+"</h2>"+t+'<p style="margin-top:18px"><a href="/" style="color:#388bfd">← Durum sayfasına dön</a></p></body>',{
headers:{"content-type":"text/html; charset=utf-8"}})
;if(!F.BOT_TOKEN)return e("⚠️ Bot anahtarı yok","<p>Cloudflare'de <b>BOT_TOKEN</b> tanımlı değil. Worker → Settings → Variables and Secrets → Add: isim <code>BOT_TOKEN</code>, değer BotFather'ın verdiği anahtar. Sonra <b>Deploy</b>.</p>")
;const t=await f(F.BOT_TOKEN,"getMe",{})
;if(!t||!t.ok)return e("⚠️ Bot anahtarı geçersiz","<p>Telegram bu anahtarı tanımıyor"+(t&&t.error_code?" (hata "+t.error_code+")":"")+".</p><p>En sık sebep: değeri yapıştırırken başına/sonuna <b>tırnak</b> veya <b>boşluk</b> karışmış olması. Anahtar şuna benzer görünür: <code>1234567890:AAH...</code> — tırnak yok, boşluk yok.</p><p>BotFather'da <code>/mybots</code> → botun → <i>API Token</i> ile doğrulayıp Settings → Variables kısmına yeniden yapıştır ve <b>Deploy</b> et.</p>")
;const a=await f(F.BOT_TOKEN,"setWebhook",{url:`${X.origin}/tg`,allowed_updates:["message","callback_query"]})
;return a&&a.ok?e("✅ Bağlantı kuruldu","<p>Bot: <b>@"+(t.result.username||"?")+"</b></p><p>Artık Telegram'da bota <b>/start</b> yazabilirsin.</p>"):e("⚠️ Bağlanamadı","<p>"+(a&&a.description||"bilinmeyen hata")+"</p>")
}const Z={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"POST, GET, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Max-Age":"86400"}
;if("OPTIONS"===M.method)return new Response(null,{status:204,headers:Z});if("/push"===X.pathname){const e=(e,t)=>new Response(JSON.stringify(e),{status:t||200,headers:Object.assign({
"content-type":"application/json; charset=utf-8"},Z)});if("POST"!==M.method)return e({ok:!1,hata:"POST bekleniyor"},405);if(!s(F,X))return e({ok:!1,hata:"Şifre yanlış"},401)
;const t=await M.json().catch(()=>null);if(!t||"object"!=typeof t)return e({ok:!1,hata:"Paket okunamadı"},400);t.guncelleme=(new Date).toISOString(),await async function(e,t){o=t,
e.VERI&&await e.VERI.put("listeler",JSON.stringify(t)),await caches.default.put(new Request(l),new Response(JSON.stringify(t),{headers:{"Cache-Control":"max-age=86400",
"content-type":"application/json"}}))}(F,t);const n=t.kartlar?Object.keys(t.kartlar).filter(e=>"sira"!==e).map(e=>e+":"+(t.kartlar[e]||[]).length).join(" · "):"";return e({ok:!0,surum:a,depo:!!F.VERI,
sayim:n,guncelleme:t.guncelleme})}if(X.pathname.startsWith("/panel")){if(!s(F,X))return new Response("yetkisiz",{status:401});const t="POST"===M.method?await M.json().catch(()=>({})):{},a=async e=>{
const t=[];if(!F.VERI)return t;let a=null;for(;t.length<e;){const n=await F.VERI.list({prefix:"u:",limit:1e3,cursor:a||void 0});for(const a of n.keys){const n=await F.VERI.get(a.name)
;if(n&&t.push(JSON.parse(n)),t.length>=e)break}if(n.list_complete||!n.cursor)break;a=n.cursor}return t};if("/panel/vip"===X.pathname){let e=[...await O(F,!0)];if(t.ekle){
const a=String(t.ekle).replace(/\D/g,"");a&&!e.includes(a)&&e.push(a)}return t.sil&&(e=e.filter(e=>e!==String(t.sil))),await async function(e,t){
return e.VERI&&await e.VERI.put("vip",JSON.stringify(t)),h=t,w=Date.now(),t}(F,e),t.ekle&&J.waitUntil(R(String(t.ekle).replace(/\D/g,""))),new Response(JSON.stringify({vip:e}),{headers:{
"content-type":"application/json; charset=utf-8"}})}if("/panel/engel"===X.pathname){let e=[...await S(F,!0)];if(t.ekle){const a=String(t.ekle).replace(/\D/g,"");a&&!e.includes(a)&&e.push(a)}
return t.sil&&(e=e.filter(e=>e!==String(t.sil))),await async function(e,t){return e.VERI&&await e.VERI.put("engel",JSON.stringify(t)),x=t,T=Date.now(),t}(F,e),new Response(JSON.stringify({engel:e}),{
headers:{"content-type":"application/json; charset=utf-8"}})}if("/panel/ayar"===X.pathname){const e="POST"===M.method?await async function(e,t){const a={...m,...await g(e,!0),...t}
;return a.kisitMin=Math.max(0,Math.min(600,Number(a.kisitMin)||0)),a.kisitMax=Math.max(a.kisitMin,Math.min(600,Number(a.kisitMax)||0)),e.VERI&&await e.VERI.put("ayar",JSON.stringify(a)),k=a,
y=Date.now(),a}(F,t):await g(F,!0);return new Response(JSON.stringify({ayar:e}),{headers:{"content-type":"application/json; charset=utf-8"}})}if("/panel/kota"===X.pathname){
const e=await R(String(t.id||"").replace(/\D/g,""));return new Response(JSON.stringify({ok:e}),{headers:{"content-type":"application/json; charset=utf-8"}})}if("/panel/yayin"===X.pathname){
const a=String(t.metin||"").trim();if(!a)return new Response(JSON.stringify({hata:"mesaj boş"}),{status:400,headers:{"content-type":"application/json"}});const n=t.hedef||"hepsi",i=60
;let r=[],s=null,l=!0;if("test"===n)r=[...e];else if("tek"===n)r=[String(t.id||"").replace(/\D/g,"")].filter(Boolean);else if("vip"===n){const e=await O(F,!0),a=Number(t.imlec||0);r=e.slice(a,a+i),
l=a+i>=e.length,s=l?null:String(a+i)}else if(F.VERI){const e=await F.VERI.list({prefix:"u:",limit:i,cursor:t.imlec||void 0});r=e.keys.map(e=>e.name.slice(2)),l=!!e.list_complete||!e.cursor,
s=l?null:e.cursor}const o=new Set(await S(F,!0));let c=0,d=0;for(const e of r){if(o.has(String(e)))continue;const t=await f(F.BOT_TOKEN,"sendMessage",{chat_id:e,text:a,parse_mode:"HTML",
disable_web_page_preview:!0});t&&t.ok?c++:d++}return F.VERI&&l&&J.waitUntil(F.VERI.put("sonYayin",JSON.stringify({tarih:(new Date).toISOString(),metin:a.slice(0,300),hedef:n}))),
new Response(JSON.stringify({gonderilen:c,basarisiz:d,imlec:s,bitti:l}),{headers:{"content-type":"application/json; charset=utf-8"}})}if("/panel/csv"===X.pathname){
const e=await a(5e3),t=await H(F),n=await V(F),i=new Set(await O(F,!0)),r=e=>e.map(e=>'"'+String(null==e?"":e).replace(/"/g,'""')+'"').join(",")
;let s=r(["id","ad","kullanici","katilim","davetci","davet_ettigi","sorgu","son_aktif","sinirsiz"])+"\n";for(const a of e){const e=t[String(a.id)]||{}
;s+=r([a.id,a.ad,a.kullanici,a.katilim,a.ref,n[String(a.id)]||0,e.toplam||0,e.son?new Date(1e3*e.son).toISOString():"",i.has(String(a.id))?"evet":""])+"\n"}return new Response("\ufeff"+s,{headers:{
"content-type":"text/csv; charset=utf-8","content-disposition":'attachment; filename="fixborsa-uyeler.csv"'}})}if("/panel/veri"===X.pathname){
const e=await K(F),t=await V(F),n=await H(F),i=await O(F,!0),r=await S(F,!0),s=await g(F,!0);let l=await a(1e3);const o=e=>{const t=l.find(t=>String(t.id)===String(e))
;return t&&(t.ad||(t.kullanici?"@"+t.kullanici:""))||""};for(const e of l){const t=n[String(e.id)]||{};e.sorgu=t.toplam||0,e.sonAktif=t.son||null}
l.sort((e,t)=>(t.katilim||"").localeCompare(e.katilim||""));const c=Object.entries(t).map(([e,t])=>({id:e,n:t,ad:o(e)})).sort((e,t)=>t.n-e.n).slice(0,50),d=Object.entries(n).map(([e,t])=>({id:e,
ad:o(e),toplam:t.toplam||0,tavan:t.tavan||0,potansiyel:t.potansiyel||0,fibo:t.fibo||0,detay:t.detay||0,son:t.son||null
})).sort((e,t)=>t.toplam-e.toplam).slice(0,50),u=Math.floor(Date.now()/1e3),p=Object.values(n).filter(e=>e.son&&u-e.son<86400).length,f=Object.values(n).filter(e=>e.son&&u-e.son<604800).length,m=await b(F)
;let k=null;if(F.VERI){const e=await F.VERI.get("sonYayin");e&&(k=JSON.parse(e))}return new Response(JSON.stringify({toplam:e.toplam||0,gun:e.gun||{},basis:e.basis||{},kullanicilar:l.slice(0,400),
referans:c,sorguLider:d,vip:i,engel:r,ayar:s,aktif24:p,aktif7g:f,sonYayin:k,listeGuncelleme:m?m.guncelleme:null,listeOzet:m&&m.kartlar?Object.keys(m.kartlar).filter(e=>"sira"!==e).map(e=>({ad:e,
n:m.kartlar[e].length})):[],depo:!!F.VERI}),{headers:{"content-type":"application/json; charset=utf-8"}})}return new Response(await async function(){if(L)return L
;const e=Uint8Array.from(atob(W),e=>e.charCodeAt(0)),t=new Blob([e]).stream().pipeThrough(new DecompressionStream("gzip"));return L=await new Response(t).text(),L}(),{headers:{
"content-type":"text/html; charset=utf-8"}})}if("/durum"===X.pathname){const e=F.VERI?"DEPO BAĞLI ✅":"DEPO YOK ⚠️ (kullanıcılar liste göremeyebilir)",t=await b(F)
;if(!t)return new Response(e+"\nliste yok — telefondan yükle");const a=t.kartlar?Object.keys(t.kartlar).filter(e=>"sira"!==e).map(e=>e+":"+t.kartlar[e].length).join(" · "):"kart yok"
;return new Response(e+"\nliste var · "+Object.keys(t).filter(e=>"guncelleme"!==e).join(", ")+"\nkartlar: "+a+"\ngüncelleme: "+t.guncelleme)}if("/tg"===X.pathname&&"POST"===M.method){
const e=await M.json().catch(()=>null);if(!e)return new Response("ok");if(e.message){const t=e.message,a=(t.text||"").trim(),n=a.toLowerCase(),i="private"===t.chat.type;let s=null
;const l=a.match(/^\/start\s+r(\d+)/i);if(l&&(s=l[1]),await E(F,t.from.id))return new Response("ok");if(i&&J.waitUntil(async function(e,t,a){if(!e.VERI)return!1;const n="u:"+t.id
;if(await e.VERI.get(n))return!1;const i={id:t.id,ad:((t.first_name||"")+" "+(t.last_name||"")).trim(),kullanici:t.username||"",katilim:(new Date).toISOString(),ref:a||null,basis:0}
;await e.VERI.put(n,JSON.stringify(i));const r=await K(e);if(r.toplam=(r.toplam||0)+1,r.gun=r.gun||{},r.gun[C()]=(r.gun[C()]||0)+1,await e.VERI.put("istatistik",JSON.stringify(r)),
a&&String(a)!==String(t.id)){const t=await V(e);t[a]=(t[a]||0)+1,await e.VERI.put("referanslar",JSON.stringify(t))}return!0}(F,t.from,s)),
i&&(n.startsWith("/panel")||n.startsWith("/yonetici")))return d(t.from.id)?(J.waitUntil(f(F.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,parse_mode:"HTML",disable_web_page_preview:!0,
text:"🛠 <b>Yönetici paneli</b>\n\nAşağıdaki düğmeye dokun — panel tarayıcıda açılır.\n\nAdres:\n<code>"+r()+"</code>",reply_markup:{inline_keyboard:[[{text:"🛠 Paneli aç",url:r()}],[{text:"◀️ Menü",
callback_data:"menu"}]]}})),new Response("ok")):(J.waitUntil(f(F.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,text:"Bu komut yöneticiye özeldir.",reply_markup:u(t.from.id)})),new Response("ok"))
;if(i&&n.startsWith("/davet")){const e=(await f(F.BOT_TOKEN,"getMe",{}))?.result?.username||"bot",a=(await V(F))[String(t.from.id)]||0;return J.waitUntil(f(F.BOT_TOKEN,"sendMessage",{
chat_id:t.chat.id,parse_mode:"HTML",disable_web_page_preview:!0,
text:"🎁 <b>Davet linkin</b>\n\n<code>https://t.me/"+e+"?start=r"+t.from.id+"</code>\n\nBu linkle katılan herkes senin davetin sayılır.\n📊 Şu ana kadar davetin: <b>"+a+" kişi</b>\n\n<i>En çok davet edenleri ödüllendiriyoruz.</i>",
reply_markup:u(t.from.id)})),new Response("ok")}return(i||n.startsWith("/start")||n.startsWith("/liste"))&&J.waitUntil(f(F.BOT_TOKEN,"sendMessage",{chat_id:t.chat.id,text:p,parse_mode:"HTML",
reply_markup:u(t.from.id)})),new Response("ok")}if(e.callback_query){const t=e.callback_query,a=t.from.id,n="private"!==t.message.chat.type,i=n?a:t.message.chat.id,r=t.data
;if(await E(F,a))return await f(F.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id,text:"Erişimin kapatılmış.",show_alert:!0}),new Response("ok");if("davet"===r){
await f(F.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id});const e=(await f(F.BOT_TOKEN,"getMe",{}))?.result?.username||"bot",n=await V(F);return J.waitUntil(f(F.BOT_TOKEN,"sendMessage",{
chat_id:i,parse_mode:"HTML",disable_web_page_preview:!0,
text:"🎁 <b>Davet linkin</b>\n\n<code>https://t.me/"+e+"?start=r"+a+"</code>\n\nBu linkle katılan herkes senin davetin sayılır.\n📊 Şu ana kadar davetin: <b>"+(n[String(a)]||0)+" kişi</b>\n\n<i>En çok davet edenleri ödüllendiriyoruz.</i>",
reply_markup:u(a)})),new Response("ok")}if("menu"===r)return await f(F.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id}),J.waitUntil(f(F.BOT_TOKEN,"sendMessage",{chat_id:i,text:p,
parse_mode:"HTML",reply_markup:u(a)})),new Response("ok");if("karne"===r&&!d(a))return await f(F.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id,text:"🔐 Bu bölüm yöneticiye özeldir.",
show_alert:!0}),new Response("ok");const s=c.has(r)&&!await async function(e,t){return!!d(t)||(await O(e)).includes(String(t))}(F,a)?await async function(e,t){
const a=caches.default,n=v(t),i=await a.match(n);if(i){const e=parseInt(await i.text(),10)-Math.floor(Date.now()/1e3);if(e>0)return e}
const r=await g(e),s=60*(r.kisitMin+Math.floor((r.kisitMax-r.kisitMin+1)*Math.random()));if(s<=0)return 0;const l=Math.floor(Date.now()/1e3)+s;return await a.put(n,new Response(String(l),{headers:{
"Cache-Control":"max-age="+s}})),0}(F,a):0;if(s>0)return await f(F.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id,
text:"⏳ Sıradaki listen "+Math.ceil(s/60)+" dakika sonra açılacak.\n\nBot çok sayıda kullanıcıya aynı anda hizmet veriyor; erişim sırayla veriliyor. Yoğunluk azaldıkça sıra hızlanır.",show_alert:!0}),
new Response("ok");await f(F.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:t.id}),J.waitUntil(async function(e,t,a,n){if(z[a]=(z[a]||0)+1,n){const e=j[n]||(j[n]={});e[a]=(e[a]||0)+1,
e.toplam=(e.toplam||0)+1,e.son=Math.floor(Date.now()/1e3)}const i=Date.now();if(i-U<3e5||!e.VERI)return;U=i;const r=z,s=j;z={},j={},t.waitUntil((async()=>{const t=await K(e);t.basis=t.basis||{}
;for(const e of Object.keys(r))t.basis[e]=(t.basis[e]||0)+r[e];if(await e.VERI.put("istatistik",JSON.stringify(t)),Object.keys(s).length){const t=await H(e);for(const e of Object.keys(s)){
const a=t[e]||(t[e]={});for(const t of Object.keys(s[e]))"son"===t?a.son=s[e].son:a[t]=(a[t]||0)+s[e][t]}await e.VERI.put("kullanim",JSON.stringify(t))}})())
}(F,J,r.startsWith("d:")?"detay":r.startsWith("l:")?"sirala":r,String(a)));const l=await b(F);if(r.startsWith("d:")){
const[,e,s,o,c]=r.split(":"),d=o||"pot",p=Number(c||0),f=l&&l.kartlar&&l.kartlar[e],b=f&&f[Number(s)];let m=u(a);return f&&f.length&&(m=A(l,e,d,p,N(l,e,d))),J.waitUntil(I(F,t,i,n,b?function(e){
const t=e=>Number(e).toFixed(2);let a="━━━━━━━━━━━━━━━━\n";if(a+="<b>"+e.kod+"</b>  ·  <b>"+t(e.fiyat)+" ₺</b>\n",e.guc&&(a+=e.guc+"\n"),e.zaman&&(a+="⏱ Sinyal: "+e.zaman+(e.tf?"  ·  "+e.tf:"")+"\n"),
void 0!==e.giris&&null!==e.giris){a+="🚪 Sinyal fiyatı: <b>"+t(e.giris)+"</b>\n";const n=B(e);null!==n&&(a+=(n>=0?"🟢":"🔴")+" Sinyalden bu yana: <b>"+(n>=0?"+":"")+n.toFixed(2)+"%</b>\n")}
return e.direncler&&e.direncler.length&&(a+="🧱 Dirençler: "+e.direncler.map(e=>t(e)).join(" · ")+"\n"),void 0!==e.hedef&&null!==e.hedef&&(a+="🎯 Hedef: <b>"+t(e.hedef)+"</b>\n",
void 0!==e.potansiyel&&null!==e.potansiyel&&(a+=Number(e.potansiyel)<=0?"🏆 <b>HEDEF TUTTU</b> — fiyat hedefin "+Math.abs(e.potansiyel).toFixed(1)+"% üstünde\n":(e.rozet||"➡️")+" Potansiyel: <b>+"+Number(e.potansiyel).toFixed(1)+"%</b>\n")),
e.sinyalZaman&&(a+="🕐 Sinyal zamanı: <b>"+e.sinyalZaman+"</b>\n"),a+="━━━━━━━━━━━━━━━━\n<i>⚠️ Yatırım tavsiyesi değildir.</i>",a}(b):"Bu hisse artık listede değil. Menüden yeniden bak.",m,!0)),
new Response("ok")}if("ilk3"===r){const e=l&&l.kartlar&&l.kartlar.ilk3&&l.kartlar.ilk3.length;return J.waitUntil(I(F,t,i,n,e?function(e){
const t=e.kartlar&&e.kartlar.ilk3||[],a=e=>Number(e).toFixed(2),n=["🥇","🥈","🥉"];let i="🏅 <b>BU TARAMANIN İLK 3'Ü</b>\n";if(e.guncelleme){const t=new Date(e.guncelleme)
;i+="<i>"+String((t.getUTCHours()+3)%24).padStart(2,"0")+":"+String(t.getUTCMinutes()).padStart(2,"0")+" taramasından</i>\n"}return i+="\n",t.forEach((e,t)=>{
i+="━━━━━━━━━━━━━━━━\n"+n[t]+" <b>"+e.kod+"</b>"+(e.tf?"  ·  <i>"+e.tf+"</i>":"")+(e.neden?"  ·  <i>"+e.neden+"</i>":"")+"\n",
void 0!==e.giris&&null!==e.giris&&(i+="💵 Sinyal <b>"+a(e.giris)+"</b> → Şimdi <b>"+a(e.fiyat)+"</b>\n");const r=B(e)
;null!==r&&(i+=(r>=0?"🟢":"🔴")+" Sinyalden bu yana: <b>"+(r>=0?"+":"")+r.toFixed(2)+"%</b>\n"),void 0!==e.hedef&&null!==e.hedef&&(i+="🎯 Hedef <b>"+a(e.hedef)+"</b>",
void 0!==e.potansiyel&&null!==e.potansiyel&&(i+=Number(e.potansiyel)<=0?"  ·  🏆 <b>TUTTU</b>":"  ·  <b>+"+Number(e.potansiyel).toFixed(1)+"%</b>"),i+="\n");const s=e.sinyalZaman||e.zaman
;s&&(i+="🕐 <i>"+s+"</i>\n")}),i+="━━━━━━━━━━━━━━━━\n<i>Sıralama tazelik, likidite ve kademe puanına göre; yalnız hedef uzaklığına göre değil.</i>\n<i>⚠️ Yatırım tavsiyesi değildir.</i>",i
}(l):"🏅 <b>BU TARAMANIN İLK 3'Ü</b>\n\nHenüz liste hazırlanmadı. Birazdan tekrar dene.",u(a),!1)),new Response("ok")}let o,m=r,k="pot",y=0;if(r.startsWith("l:")){const e=r.split(":");m=e[1],
k=e[2]||"pot",y=Number(e[3]||0)}if(l&&l.kartlar&&l.kartlar[m]&&l.kartlar[m].length){const e=N(l,m,k),a=Math.max(1,Math.ceil(e.length/8));y<0&&(y=0),y>=a&&(y=a-1);const s=Y[m]||"<b>LİSTE</b>"
;return J.waitUntil(I(F,t,i,n,D(s,l,m,k,y,e),A(l,m,k,y,e),r.startsWith("l:"))),new Response("ok")}if(l&&l[m]){if(o=l[m],l.guncelleme){const e=new Date(l.guncelleme)
;o+=`\n\n<i>Son güncelleme: ${String((e.getUTCHours()+3)%24).padStart(2,"0")+":"+String(e.getUTCMinutes()).padStart(2,"0")}</i>`}}else o="⏳ Liste henüz hazırlanmadı. Birazdan tekrar dene."
;const h=function(e){const t=[];for(;e.length>3900;){let a=e.lastIndexOf("\n",3900);a<2e3&&(a=3900),t.push(e.slice(0,a)),e=e.slice(a)}return t.push(e),t}(o);return J.waitUntil((async()=>{
for(let e=0;e<h.length;e++){const r=await f(F.BOT_TOKEN,"sendMessage",{chat_id:i,text:h[e],parse_mode:"HTML",disable_web_page_preview:!0,reply_markup:e===h.length-1?u(a):void 0})
;if(n&&(!r||!1===r.ok)){const e=(await f(F.BOT_TOKEN,"getMe",{}))?.result?.username;await f(F.BOT_TOKEN,"sendMessage",{chat_id:t.message.chat.id,
text:'👋 <a href="tg://user?id='+a+'">Listeyi görmek</a> için önce botu başlatman gerekiyor: @'+(e||"bot")+" → <b>Başlat</b>. Sonra buradaki düğmeler sana özelden cevap verir.",parse_mode:"HTML",
disable_web_page_preview:!0});break}}})()),new Response("ok")}return new Response("ok")}{const e=!!F.VERI,a=await b(F);let n=null,i=!1,r=null,s="";if(F.BOT_TOKEN){try{
const e=await f(F.BOT_TOKEN,"getMe",{});e&&e.ok&&(i=!0,n=e.result.username)}catch(e){}if(i)try{const e=await f(F.BOT_TOKEN,"getWebhookInfo",{});e&&e.result&&(r=e.result.url||"",
e.result.last_error_message&&(s=e.result.last_error_message))}catch(e){}}
const l=F.PUSH_KEY||t,o=a&&a.kartlar?Object.keys(a.kartlar).filter(e=>"sira"!==e).map(e=>e+": "+a.kartlar[e].length).join(" · "):"",c=(e,t,a)=>'<div class="s '+(e?"ok":"yok")+'"><div class="i">'+(e?"✅":"⚠️")+"</div><div><b>"+t+'</b><div class="a">'+a+"</div></div></div>",d='<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Fix Borsa · Durum</title><style>body{margin:0;background:#0d1117;color:#e6edf3;font:15px/1.55 system-ui,-apple-system,sans-serif;padding:16px 14px 60px}h1{font-size:19px;margin:0 0 14px}.s{display:flex;gap:10px;background:#161b22;border:1px solid #272e37;border-radius:12px;padding:12px;margin-bottom:9px}.s.yok{border-color:#6b2b2b;background:#22171a}.i{font-size:18px;line-height:1.3}.a{color:#8b949e;font-size:13px;margin-top:3px}a.d{display:block;background:#388bfd;color:#fff;text-decoration:none;text-align:center;border-radius:11px;padding:13px;font-weight:700;margin-top:10px}a.d.ikinci{background:#21262d;border:1px solid #272e37;color:#e6edf3}code{background:#1c2330;padding:2px 6px;border-radius:5px;font-size:13px;word-break:break-all}ol{padding-left:20px;margin:8px 0 0}li{margin-bottom:7px}.kur{background:#22171a;border:1px solid #6b2b2b;border-radius:12px;padding:13px;margin-top:12px;font-size:14px}</style></head><body><h1>Fix Borsa · Durum</h1><div class="a" style="margin:-8px 0 12px">yazılım sürümü <b>9.8</b></div>'+c(i,"Bot anahtarı",F.BOT_TOKEN?i?"geçerli · @"+(n||"?"):"TANIMLI AMA GEÇERSİZ — Telegram bu anahtarı tanımıyor. Başına/sonuna tırnak veya boşluk karışmış olabilir.":"BOT_TOKEN tanımlı değil — Settings → Variables kısmından ekle")+c(!!r,"Telegram bağlantısı",r?"bağlı"+(s?" · son hata: "+s:""):"bağlı değil — aşağıdaki Bağla düğmesine bas")+c(e,"Hafıza (üye kayıtları)",e?"bağlı":"BAĞLI DEĞİL — üyeler, davetler ve panel çalışmaz")+c(!!a,"Hisse listeleri",a?"yüklü · "+(o||"")+" · "+new Date(a.guncelleme).toLocaleString("tr-TR"):"henüz yüklenmedi — telefondaki uygulamada Worker adresi <code>"+X.origin+"</code> ve şifre <code>"+l+"</code> yazılı olmalı, sonra <b>TARA VE BULUTA YÜKLE</b>")+'<a class="d" href="/panel?key='+encodeURIComponent(l)+'">🛠 Yönetici panelini aç</a><div class="a" style="margin-top:8px">Panel bir <b>web sayfası</b>, Telegram\'da değil. Telegram\'da botun menüsünde de <b>🛠 Yönetici paneli</b> düğmesi var (sadece sen görürsün) ya da bota <code>/panel</code> yazabilirsin — ikisi de bu sayfayı açar. Bu adresi telefonun ana ekranına kısayol olarak eklemen en pratiği.</div>'+(r&&i?"":'<a class="d ikinci" href="/setup">🔗 Telegram\'a bağla</a>')+'<div style="margin-top:16px" class="a">Telefondaki uygulamaya yazacakların:<br>Worker adresi: <code>'+X.origin+"</code><br>Şifre: <code>"+l+"</code></div>"+(e?"":'<div class="kur"><b>⚠️ Hafıza bağlı değil — nasıl bağlanır</b><div class="a" style="margin:6px 0">Bot listeleri gösterir ama kimin üye olduğunu, kimin kimi davet ettiğini hatırlayamaz. Panel de boş kalır. Bir kez yapılır, 2 dakika sürer:</div><ol><li>Cloudflare panelinde soldaki menüden <b>Storage &amp; Databases</b> → <b>KV</b>.</li><li><b>Create a namespace</b> / <b>Oluştur</b>. Adına <code>fixborsa</code> yaz, kaydet.</li><li>Soldan <b>Compute (Workers)</b> → bu worker\'ı aç → <b>Settings</b> → <b>Bindings</b>.</li><li><b>Add binding</b> → <b>KV namespace</b> seç.</li><li><b>Variable name</b> kutusuna tam olarak <code>VERI</code> yaz (büyük harf, Türkçe İ değil düz I).</li><li><b>KV namespace</b> kutusundan az önce oluşturduğun <code>fixborsa</code>\'ı seç ve <b>Deploy</b>.</li><li>Bu sayfayı yenile — burası ✅ olacak.</li></ol></div>')+"</body></html>"
;return new Response(d,{headers:{"content-type":"text/html; charset=utf-8"}})}}};