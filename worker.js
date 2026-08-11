const e=new Set(["6819672343"]),a="kolayfix",t="9.4";let n="",i=a;const r=()=>n+"/panel?key="+encodeURIComponent(i),s=(e,t)=>{const n=t.searchParams.get("key")
;return!!n&&(n===(e.PUSH_KEY||a)||n===(e.PANEL_KEY||e.PUSH_KEY||a))},l="https://liste.local/veri";let o=null;const c=new Set(["tavan","potansiyel","fibo"]),d=a=>e.has(String(a));function u(e){
const a=[[{text:"🏅 Bu taramanın ilk 3'ü",callback_data:"ilk3"}],[{text:"🎯 Güçlü sinyaller",callback_data:"tavan"}],[{text:"📈 Yüksek potansiyel",callback_data:"potansiyel"}],[{
text:"📐 Yeni kırılımlar",callback_data:"fibo"}]];return d(e)&&(a.push([{text:"📊 Önceki sonuçlar 🔐",callback_data:"karne"}]),n&&a.push([{text:"🛠 Yönetici paneli 🔐",url:r()}])),a.push([{
text:"🎁 Davet linkim",callback_data:"davet"}]),a.push([{text:"🔄 Yenile",callback_data:"menu"}]),{inline_keyboard:a}}
const p="👋 <b>Fix Borsa</b>\n\nAşağıdaki düğmelerden istediğin listeyi aç.\nListeler gün içinde düzenli güncellenir.\n\n<i>⚠️ Yatırım tavsiyesi değildir.</i>";async function b(e,a,t){
return fetch(`https://api.telegram.org/bot${e}/${a}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(e=>e.json()).catch(()=>null)}async function k(e){
if(o)return o;if(e.VERI){const a=await e.VERI.get("listeler");if(a)return o=JSON.parse(a),o}const a=await caches.default.match(new Request(l));return a?(o=await a.json().catch(()=>null),o):null}
const m={kisitMin:10,kisitMax:30};let f=null,y=0;async function g(e,a){if(!a&&f&&Date.now()-y<6e4)return f;let t={...m};if(e.VERI){const a=await e.VERI.get("ayar");a&&(t={...t,...JSON.parse(a)})}
return f=t,y=Date.now(),t}let h=null,w=0;async function O(e,a){if(!a&&h&&Date.now()-w<6e4)return h;if(!e.VERI)return h=[],w=Date.now(),h;const t=await e.VERI.get("vip");return h=t?JSON.parse(t):[],
w=Date.now(),h}let x=null,T=0;async function v(e,a){if(!a&&x&&Date.now()-T<6e4)return x;if(!e.VERI)return x=[],T=Date.now(),x;const t=await e.VERI.get("engel");return x=t?JSON.parse(t):[],
T=Date.now(),x}async function S(e,a){return!d(a)&&(await v(e)).includes(String(a))}function E(e){return new Request("https://kisit.local/u/"+e)}async function R(e){try{
return await caches.default.delete(E(e)),!0}catch(e){return!1}}function M(e){return void 0!==e.kalanSn&&null!==e.kalanSn?e.kalanSn:e.bitisTs?e.bitisTs-Math.floor(Date.now()/1e3):null}function N(e){
if(e.kalan)return e.kalan;const a=M(e);if(null===a)return null;if(a<=0)return"süre doldu";const t=Math.round(a/3600);return t<1?"1 saatten az":t<48?t+" saat":Math.round(t/24)+" gün"}function A(e){
return void 0!==e.kar&&null!==e.kar?Number(e.kar):e.giris>0&&e.fiyat>0?100*(Number(e.fiyat)/Number(e.giris)-1):null}const I={pot:"🎯 Potansiyel",kar:"💰 Kâr/Zarar",sure:"⏳ Kalan süre"}
;function C(e,a,t){const n=e.kartlar&&e.kartlar[a]||[],i=n.length,r=[...Array(i).keys()];if("pot"===t)return r;const s=e.kartlar&&e.kartlar.sira&&e.kartlar.sira[a]&&e.kartlar.sira[a][t]
;return Array.isArray(s)&&s.length===i?s:"kar"===t?r.sort((e,a)=>(A(n[a])??-9999)-(A(n[e])??-9999)):r.sort((e,a)=>{const t=M(n[e]),i=M(n[a]);return(null===t||t<=0?1/0:t)-(null===i||i<=0?1/0:i)})}
function D(e,a,t,n,i,r){const s=a.kartlar[t],l=Math.max(1,Math.ceil(r.length/8));let o=e+"\n";if(a.guncelleme){const e=new Date(a.guncelleme)
;o+="<i>"+String((e.getUTCHours()+3)%24).padStart(2,"0")+":"+String(e.getUTCMinutes()).padStart(2,"0")+" · "+s.length+" hisse</i>\n"}o+="<i>Sıralama: "+(I[n]||I.pot)+" · sayfa "+(i+1)+"/"+l+"</i>\n\n"
;const c=8*i;return r.slice(c,c+8).forEach((e,a)=>{o+=function(e,a){const t=e=>Number(e).toFixed(2);let n="━━━━━━━━━━━━━━━━\n"
;n+="<b>"+a+". "+(e.rozet||"▫️")+" "+e.kod+"</b>"+(e.tf?"  ·  <i>"+e.tf+"</i>":"")+"\n",
void 0!==e.giris&&null!==e.giris?n+="💵 Sinyal <b>"+t(e.giris)+"</b> → Şimdi <b>"+t(e.fiyat)+"</b>\n":n+="💵 Şimdi <b>"+t(e.fiyat)+"</b>\n";const i=A(e)
;null!==i&&(n+=(i>=0?"🟢":"🔴")+" Sinyalden bu yana: <b>"+(i>=0?"+":"")+i.toFixed(2)+"%</b>\n"),void 0!==e.hedef&&null!==e.hedef&&(n+="🎯 Hedef <b>"+t(e.hedef)+"</b>",
void 0!==e.potansiyel&&null!==e.potansiyel&&(n+=Number(e.potansiyel)<=0?"  ·  🏆 <b>TUTTU</b>":"  ·  <b>+"+Number(e.potansiyel).toFixed(1)+"%</b>"),n+="\n");const r=N(e)
;return r?n+=("süre doldu"===r?"⌛":"⏳")+" Hedefe kalan: <b>"+r+"</b>"+(e.zaman?"  ·  <i>sinyal: "+e.zaman+"</i>":"")+"\n":e.zaman&&(n+="⏱ Sinyal: <b>"+e.zaman+"</b>\n"),n}(s[e],c+a+1)}),
o+="━━━━━━━━━━━━━━━━\n<i>Hisse düğmesine dokun, tam detayını gör.</i>\n",o+="<i>⚠️ Yatırım tavsiyesi değildir.</i>",o}function B(e,a,t,n,i){
const r=e.kartlar[a],s=Math.max(1,Math.ceil(i.length/8)),l=[];l.push(["pot","kar","sure"].map(e=>({text:(e===t?"✅ ":"")+I[e],callback_data:"l:"+a+":"+e+":0"})));const o=8*n,c=i.slice(o,o+8),d=e=>{
const a=A(e),t=N(e);let n=(e.rozet||"")+e.kod;return null!==a&&(n+="  "+(a>=0?"+":"")+a.toFixed(1)+"%"),t&&(n+=" · "+("süre doldu"===t?"⌛":t.replace(" gün","g").replace(" saat","s"))),n}
;for(let e=0;e<c.length;e+=2)l.push(c.slice(e,e+2).map(e=>({text:d(r[e]),callback_data:"d:"+a+":"+e+":"+t+":"+n})));const u=[];return n>0&&u.push({text:"◀️ Önceki",callback_data:"l:"+a+":"+t+":"+(n-1)
}),n<s-1&&u.push({text:"Sonraki ▶️",callback_data:"l:"+a+":"+t+":"+(n+1)}),u.length&&l.push(u),l.push([{text:"◀️ Menü",callback_data:"menu"}]),{inline_keyboard:l}}async function K(e,a,t,n,i,r,s){
const l={chat_id:t,text:i,parse_mode:"HTML",disable_web_page_preview:!0,reply_markup:r};if(s&&!n&&a.message&&a.message.message_id){const t=await b(e.BOT_TOKEN,"editMessageText",Object.assign({
message_id:a.message.message_id},l));if(t&&t.ok)return t}return b(e.BOT_TOKEN,"sendMessage",l)}let z={},L=0;async function U(e){if(!e.VERI)return{toplam:0,basis:{},gun:{}}
;const a=await e.VERI.get("istatistik");return a?JSON.parse(a):{toplam:0,basis:{},gun:{}}}async function V(e){if(!e.VERI)return{};const a=await e.VERI.get("referanslar");return a?JSON.parse(a):{}}
function j(){return(new Date).toISOString().slice(0,10)}let Y={};async function H(e){if(!e.VERI)return{};const a=await e.VERI.get("kullanim");return a?JSON.parse(a):{}}
const P=["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"].join("")
;let W=null;const J={tavan:"🟥 <b>GÜÇLÜ SİNYALLER</b>",potansiyel:"🟩 <b>YÜKSEK POTANSİYEL</b>",fibo:"🟦 <b>YENİ KIRILIMLAR</b>"};export default{async fetch(M,I,G){const _=new URL(M.url)
;if(n=_.origin,i=I.PANEL_KEY||I.PUSH_KEY||a,"/surum"===_.pathname)return new Response("Fix Borsa worker surum "+t,{headers:{"content-type":"text/plain; charset=utf-8","Access-Control-Allow-Origin":"*"
}});if("/setup"===_.pathname){
const e=(e,a)=>new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="margin:0;background:#0d1117;color:#e6edf3;font:15px/1.6 system-ui,sans-serif;padding:18px"><h2 style="margin:0 0 10px">'+e+"</h2>"+a+'<p style="margin-top:18px"><a href="/" style="color:#388bfd">← Durum sayfasına dön</a></p></body>',{
headers:{"content-type":"text/html; charset=utf-8"}})
;if(!I.BOT_TOKEN)return e("⚠️ Bot anahtarı yok","<p>Cloudflare'de <b>BOT_TOKEN</b> tanımlı değil. Worker → Settings → Variables and Secrets → Add: isim <code>BOT_TOKEN</code>, değer BotFather'ın verdiği anahtar. Sonra <b>Deploy</b>.</p>")
;const a=await b(I.BOT_TOKEN,"getMe",{})
;if(!a||!a.ok)return e("⚠️ Bot anahtarı geçersiz","<p>Telegram bu anahtarı tanımıyor"+(a&&a.error_code?" (hata "+a.error_code+")":"")+".</p><p>En sık sebep: değeri yapıştırırken başına/sonuna <b>tırnak</b> veya <b>boşluk</b> karışmış olması. Anahtar şuna benzer görünür: <code>1234567890:AAH...</code> — tırnak yok, boşluk yok.</p><p>BotFather'da <code>/mybots</code> → botun → <i>API Token</i> ile doğrulayıp Settings → Variables kısmına yeniden yapıştır ve <b>Deploy</b> et.</p>")
;const t=await b(I.BOT_TOKEN,"setWebhook",{url:`${_.origin}/tg`,allowed_updates:["message","callback_query"]})
;return t&&t.ok?e("✅ Bağlantı kuruldu","<p>Bot: <b>@"+(a.result.username||"?")+"</b></p><p>Artık Telegram'da bota <b>/start</b> yazabilirsin.</p>"):e("⚠️ Bağlanamadı","<p>"+(t&&t.description||"bilinmeyen hata")+"</p>")
}const Z={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"POST, GET, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Max-Age":"86400"}
;if("OPTIONS"===M.method)return new Response(null,{status:204,headers:Z});if("/push"===_.pathname){const e=(e,a)=>new Response(JSON.stringify(e),{status:a||200,headers:Object.assign({
"content-type":"application/json; charset=utf-8"},Z)});if("POST"!==M.method)return e({ok:!1,hata:"POST bekleniyor"},405);if(!s(I,_))return e({ok:!1,hata:"Şifre yanlış"},401)
;const a=await M.json().catch(()=>null);if(!a||"object"!=typeof a)return e({ok:!1,hata:"Paket okunamadı"},400);a.guncelleme=(new Date).toISOString(),await async function(e,a){o=a,
e.VERI&&await e.VERI.put("listeler",JSON.stringify(a)),await caches.default.put(new Request(l),new Response(JSON.stringify(a),{headers:{"Cache-Control":"max-age=86400",
"content-type":"application/json"}}))}(I,a);const n=a.kartlar?Object.keys(a.kartlar).filter(e=>"sira"!==e).map(e=>e+":"+(a.kartlar[e]||[]).length).join(" · "):"";return e({ok:!0,surum:t,depo:!!I.VERI,
sayim:n,guncelleme:a.guncelleme})}if(_.pathname.startsWith("/panel")){if(!s(I,_))return new Response("yetkisiz",{status:401});const a="POST"===M.method?await M.json().catch(()=>({})):{},t=async e=>{
const a=[];if(!I.VERI)return a;let t=null;for(;a.length<e;){const n=await I.VERI.list({prefix:"u:",limit:1e3,cursor:t||void 0});for(const t of n.keys){const n=await I.VERI.get(t.name)
;if(n&&a.push(JSON.parse(n)),a.length>=e)break}if(n.list_complete||!n.cursor)break;t=n.cursor}return a};if("/panel/vip"===_.pathname){let e=[...await O(I,!0)];if(a.ekle){
const t=String(a.ekle).replace(/\D/g,"");t&&!e.includes(t)&&e.push(t)}return a.sil&&(e=e.filter(e=>e!==String(a.sil))),await async function(e,a){
return e.VERI&&await e.VERI.put("vip",JSON.stringify(a)),h=a,w=Date.now(),a}(I,e),a.ekle&&G.waitUntil(R(String(a.ekle).replace(/\D/g,""))),new Response(JSON.stringify({vip:e}),{headers:{
"content-type":"application/json; charset=utf-8"}})}if("/panel/engel"===_.pathname){let e=[...await v(I,!0)];if(a.ekle){const t=String(a.ekle).replace(/\D/g,"");t&&!e.includes(t)&&e.push(t)}
return a.sil&&(e=e.filter(e=>e!==String(a.sil))),await async function(e,a){return e.VERI&&await e.VERI.put("engel",JSON.stringify(a)),x=a,T=Date.now(),a}(I,e),new Response(JSON.stringify({engel:e}),{
headers:{"content-type":"application/json; charset=utf-8"}})}if("/panel/ayar"===_.pathname){const e="POST"===M.method?await async function(e,a){const t={...m,...await g(e,!0),...a}
;return t.kisitMin=Math.max(0,Math.min(600,Number(t.kisitMin)||0)),t.kisitMax=Math.max(t.kisitMin,Math.min(600,Number(t.kisitMax)||0)),e.VERI&&await e.VERI.put("ayar",JSON.stringify(t)),f=t,
y=Date.now(),t}(I,a):await g(I,!0);return new Response(JSON.stringify({ayar:e}),{headers:{"content-type":"application/json; charset=utf-8"}})}if("/panel/kota"===_.pathname){
const e=await R(String(a.id||"").replace(/\D/g,""));return new Response(JSON.stringify({ok:e}),{headers:{"content-type":"application/json; charset=utf-8"}})}if("/panel/yayin"===_.pathname){
const t=String(a.metin||"").trim();if(!t)return new Response(JSON.stringify({hata:"mesaj boş"}),{status:400,headers:{"content-type":"application/json"}});const n=a.hedef||"hepsi",i=60
;let r=[],s=null,l=!0;if("test"===n)r=[...e];else if("tek"===n)r=[String(a.id||"").replace(/\D/g,"")].filter(Boolean);else if("vip"===n){const e=await O(I,!0),t=Number(a.imlec||0);r=e.slice(t,t+i),
l=t+i>=e.length,s=l?null:String(t+i)}else if(I.VERI){const e=await I.VERI.list({prefix:"u:",limit:i,cursor:a.imlec||void 0});r=e.keys.map(e=>e.name.slice(2)),l=!!e.list_complete||!e.cursor,
s=l?null:e.cursor}const o=new Set(await v(I,!0));let c=0,d=0;for(const e of r){if(o.has(String(e)))continue;const a=await b(I.BOT_TOKEN,"sendMessage",{chat_id:e,text:t,parse_mode:"HTML",
disable_web_page_preview:!0,reply_markup:u(e)});a&&a.ok?c++:d++}return I.VERI&&l&&G.waitUntil(I.VERI.put("sonYayin",JSON.stringify({tarih:(new Date).toISOString(),metin:t.slice(0,300),hedef:n}))),
new Response(JSON.stringify({gonderilen:c,basarisiz:d,imlec:s,bitti:l}),{headers:{"content-type":"application/json; charset=utf-8"}})}if("/panel/csv"===_.pathname){
const e=await t(5e3),a=await H(I),n=await V(I),i=new Set(await O(I,!0)),r=e=>e.map(e=>'"'+String(null==e?"":e).replace(/"/g,'""')+'"').join(",")
;let s=r(["id","ad","kullanici","katilim","davetci","davet_ettigi","sorgu","son_aktif","sinirsiz"])+"\n";for(const t of e){const e=a[String(t.id)]||{}
;s+=r([t.id,t.ad,t.kullanici,t.katilim,t.ref,n[String(t.id)]||0,e.toplam||0,e.son?new Date(1e3*e.son).toISOString():"",i.has(String(t.id))?"evet":""])+"\n"}return new Response("\ufeff"+s,{headers:{
"content-type":"text/csv; charset=utf-8","content-disposition":'attachment; filename="fixborsa-uyeler.csv"'}})}if("/panel/veri"===_.pathname){
const e=await U(I),a=await V(I),n=await H(I),i=await O(I,!0),r=await v(I,!0),s=await g(I,!0);let l=await t(1e3);const o=e=>{const a=l.find(a=>String(a.id)===String(e))
;return a&&(a.ad||(a.kullanici?"@"+a.kullanici:""))||""};for(const e of l){const a=n[String(e.id)]||{};e.sorgu=a.toplam||0,e.sonAktif=a.son||null}
l.sort((e,a)=>(a.katilim||"").localeCompare(e.katilim||""));const c=Object.entries(a).map(([e,a])=>({id:e,n:a,ad:o(e)})).sort((e,a)=>a.n-e.n).slice(0,50),d=Object.entries(n).map(([e,a])=>({id:e,
ad:o(e),toplam:a.toplam||0,tavan:a.tavan||0,potansiyel:a.potansiyel||0,fibo:a.fibo||0,detay:a.detay||0,son:a.son||null
})).sort((e,a)=>a.toplam-e.toplam).slice(0,50),u=Math.floor(Date.now()/1e3),p=Object.values(n).filter(e=>e.son&&u-e.son<86400).length,b=Object.values(n).filter(e=>e.son&&u-e.son<604800).length,m=await k(I)
;let f=null;if(I.VERI){const e=await I.VERI.get("sonYayin");e&&(f=JSON.parse(e))}return new Response(JSON.stringify({toplam:e.toplam||0,gun:e.gun||{},basis:e.basis||{},kullanicilar:l.slice(0,400),
referans:c,sorguLider:d,vip:i,engel:r,ayar:s,aktif24:p,aktif7g:b,sonYayin:f,listeGuncelleme:m?m.guncelleme:null,listeOzet:m&&m.kartlar?Object.keys(m.kartlar).filter(e=>"sira"!==e).map(e=>({ad:e,
n:m.kartlar[e].length})):[],depo:!!I.VERI}),{headers:{"content-type":"application/json; charset=utf-8"}})}return new Response(await async function(){if(W)return W
;const e=Uint8Array.from(atob(P),e=>e.charCodeAt(0)),a=new Blob([e]).stream().pipeThrough(new DecompressionStream("gzip"));return W=await new Response(a).text(),W}(),{headers:{
"content-type":"text/html; charset=utf-8"}})}if("/durum"===_.pathname){const e=I.VERI?"DEPO BAĞLI ✅":"DEPO YOK ⚠️ (kullanıcılar liste göremeyebilir)",a=await k(I)
;if(!a)return new Response(e+"\nliste yok — telefondan yükle");const t=a.kartlar?Object.keys(a.kartlar).filter(e=>"sira"!==e).map(e=>e+":"+a.kartlar[e].length).join(" · "):"kart yok"
;return new Response(e+"\nliste var · "+Object.keys(a).filter(e=>"guncelleme"!==e).join(", ")+"\nkartlar: "+t+"\ngüncelleme: "+a.guncelleme)}if("/tg"===_.pathname&&"POST"===M.method){
const e=await M.json().catch(()=>null);if(!e)return new Response("ok");if(e.message){const a=e.message,t=(a.text||"").trim(),n=t.toLowerCase(),i="private"===a.chat.type;let s=null
;const l=t.match(/^\/start\s+r(\d+)/i);if(l&&(s=l[1]),await S(I,a.from.id))return new Response("ok");if(i&&G.waitUntil(async function(e,a,t){if(!e.VERI)return!1;const n="u:"+a.id
;if(await e.VERI.get(n))return!1;const i={id:a.id,ad:((a.first_name||"")+" "+(a.last_name||"")).trim(),kullanici:a.username||"",katilim:(new Date).toISOString(),ref:t||null,basis:0}
;await e.VERI.put(n,JSON.stringify(i));const r=await U(e);if(r.toplam=(r.toplam||0)+1,r.gun=r.gun||{},r.gun[j()]=(r.gun[j()]||0)+1,await e.VERI.put("istatistik",JSON.stringify(r)),
t&&String(t)!==String(a.id)){const a=await V(e);a[t]=(a[t]||0)+1,await e.VERI.put("referanslar",JSON.stringify(a))}return!0}(I,a.from,s)),
i&&(n.startsWith("/panel")||n.startsWith("/yonetici")))return d(a.from.id)?(G.waitUntil(b(I.BOT_TOKEN,"sendMessage",{chat_id:a.chat.id,parse_mode:"HTML",disable_web_page_preview:!0,
text:"🛠 <b>Yönetici paneli</b>\n\nAşağıdaki düğmeye dokun — panel tarayıcıda açılır.\n\nAdres:\n<code>"+r()+"</code>",reply_markup:{inline_keyboard:[[{text:"🛠 Paneli aç",url:r()}],[{text:"◀️ Menü",
callback_data:"menu"}]]}})),new Response("ok")):(G.waitUntil(b(I.BOT_TOKEN,"sendMessage",{chat_id:a.chat.id,text:"Bu komut yöneticiye özeldir.",reply_markup:u(a.from.id)})),new Response("ok"))
;if(i&&n.startsWith("/davet")){const e=(await b(I.BOT_TOKEN,"getMe",{}))?.result?.username||"bot",t=(await V(I))[String(a.from.id)]||0;return G.waitUntil(b(I.BOT_TOKEN,"sendMessage",{
chat_id:a.chat.id,parse_mode:"HTML",disable_web_page_preview:!0,
text:"🎁 <b>Davet linkin</b>\n\n<code>https://t.me/"+e+"?start=r"+a.from.id+"</code>\n\nBu linkle katılan herkes senin davetin sayılır.\n📊 Şu ana kadar davetin: <b>"+t+" kişi</b>\n\n<i>En çok davet edenleri ödüllendiriyoruz.</i>",
reply_markup:u(a.from.id)})),new Response("ok")}return(i||n.startsWith("/start")||n.startsWith("/liste"))&&G.waitUntil(b(I.BOT_TOKEN,"sendMessage",{chat_id:a.chat.id,text:p,parse_mode:"HTML",
reply_markup:u(a.from.id)})),new Response("ok")}if(e.callback_query){const a=e.callback_query,t=a.from.id,n="private"!==a.message.chat.type,i=n?t:a.message.chat.id,r=a.data
;if(await S(I,t))return await b(I.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:a.id,text:"Erişimin kapatılmış.",show_alert:!0}),new Response("ok");if("davet"===r){
await b(I.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:a.id});const e=(await b(I.BOT_TOKEN,"getMe",{}))?.result?.username||"bot",n=await V(I);return G.waitUntil(b(I.BOT_TOKEN,"sendMessage",{
chat_id:i,parse_mode:"HTML",disable_web_page_preview:!0,
text:"🎁 <b>Davet linkin</b>\n\n<code>https://t.me/"+e+"?start=r"+t+"</code>\n\nBu linkle katılan herkes senin davetin sayılır.\n📊 Şu ana kadar davetin: <b>"+(n[String(t)]||0)+" kişi</b>\n\n<i>En çok davet edenleri ödüllendiriyoruz.</i>",
reply_markup:u(t)})),new Response("ok")}if("menu"===r)return await b(I.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:a.id}),G.waitUntil(b(I.BOT_TOKEN,"sendMessage",{chat_id:i,text:p,
parse_mode:"HTML",reply_markup:u(t)})),new Response("ok");if("karne"===r&&!d(t))return await b(I.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:a.id,text:"🔐 Bu bölüm yöneticiye özeldir.",
show_alert:!0}),new Response("ok");const s=c.has(r)&&!await async function(e,a){return!!d(a)||(await O(e)).includes(String(a))}(I,t)?await async function(e,a){
const t=caches.default,n=E(a),i=await t.match(n);if(i){const e=parseInt(await i.text(),10)-Math.floor(Date.now()/1e3);if(e>0)return e}
const r=await g(e),s=60*(r.kisitMin+Math.floor((r.kisitMax-r.kisitMin+1)*Math.random()));if(s<=0)return 0;const l=Math.floor(Date.now()/1e3)+s;return await t.put(n,new Response(String(l),{headers:{
"Cache-Control":"max-age="+s}})),0}(I,t):0;if(s>0)return await b(I.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:a.id,
text:"⏳ Sıradaki listen "+Math.ceil(s/60)+" dakika sonra açılacak.\n\nBot çok sayıda kullanıcıya aynı anda hizmet veriyor; erişim sırayla veriliyor. Yoğunluk azaldıkça sıra hızlanır.",show_alert:!0}),
new Response("ok");await b(I.BOT_TOKEN,"answerCallbackQuery",{callback_query_id:a.id}),G.waitUntil(async function(e,a,t,n){if(z[t]=(z[t]||0)+1,n){const e=Y[n]||(Y[n]={});e[t]=(e[t]||0)+1,
e.toplam=(e.toplam||0)+1,e.son=Math.floor(Date.now()/1e3)}const i=Date.now();if(i-L<3e5||!e.VERI)return;L=i;const r=z,s=Y;z={},Y={},a.waitUntil((async()=>{const a=await U(e);a.basis=a.basis||{}
;for(const e of Object.keys(r))a.basis[e]=(a.basis[e]||0)+r[e];if(await e.VERI.put("istatistik",JSON.stringify(a)),Object.keys(s).length){const a=await H(e);for(const e of Object.keys(s)){
const t=a[e]||(a[e]={});for(const a of Object.keys(s[e]))"son"===a?t.son=s[e].son:t[a]=(t[a]||0)+s[e][a]}await e.VERI.put("kullanim",JSON.stringify(a))}})())
}(I,G,r.startsWith("d:")?"detay":r.startsWith("l:")?"sirala":r,String(t)));const l=await k(I);if(r.startsWith("d:")){
const[,e,s,o,c]=r.split(":"),d=o||"pot",p=Number(c||0),b=l&&l.kartlar&&l.kartlar[e],k=b&&b[Number(s)];let m=u(t);return b&&b.length&&(m=B(l,e,d,p,C(l,e,d))),G.waitUntil(K(I,a,i,n,k?function(e){
const a=e=>Number(e).toFixed(2);let t="━━━━━━━━━━━━━━━━\n";if(t+="<b>"+e.kod+"</b>  ·  <b>"+a(e.fiyat)+" ₺</b>\n",e.guc&&(t+=e.guc+"\n"),e.zaman&&(t+="⏱ Sinyal: "+e.zaman+(e.tf?"  ·  "+e.tf:"")+"\n"),
void 0!==e.giris&&null!==e.giris){t+="🚪 Sinyal fiyatı: <b>"+a(e.giris)+"</b>\n";const n=A(e);null!==n&&(t+=(n>=0?"🟢":"🔴")+" Sinyalden bu yana: <b>"+(n>=0?"+":"")+n.toFixed(2)+"%</b>\n")}
e.direncler&&e.direncler.length&&(t+="🧱 Dirençler: "+e.direncler.map(e=>a(e)).join(" · ")+"\n"),void 0!==e.hedef&&null!==e.hedef&&(t+="🎯 Hedef: <b>"+a(e.hedef)+"</b>\n",
void 0!==e.potansiyel&&null!==e.potansiyel&&(t+=Number(e.potansiyel)<=0?"🏆 <b>HEDEF TUTTU</b> — fiyat hedefin "+Math.abs(e.potansiyel).toFixed(1)+"% üstünde\n":(e.rozet||"➡️")+" Potansiyel: <b>+"+Number(e.potansiyel).toFixed(1)+"%</b>\n"))
;const n=N(e);return n&&(t+=("süre doldu"===n?"⌛":"⏳")+" Hedefe kalan süre: <b>"+n+"</b>\n"),t+="━━━━━━━━━━━━━━━━\n<i>⚠️ Yatırım tavsiyesi değildir.</i>",t
}(k):"Bu hisse artık listede değil. Menüden yeniden bak.",m,!0)),new Response("ok")}if("ilk3"===r){const e=l&&l.kartlar&&l.kartlar.ilk3&&l.kartlar.ilk3.length
;return G.waitUntil(K(I,a,i,n,e?function(e){const a=e.kartlar&&e.kartlar.ilk3||[],t=e=>Number(e).toFixed(2),n=["🥇","🥈","🥉"];let i="🏅 <b>BU TARAMANIN İLK 3'Ü</b>\n";if(e.guncelleme){
const a=new Date(e.guncelleme);i+="<i>"+String((a.getUTCHours()+3)%24).padStart(2,"0")+":"+String(a.getUTCMinutes()).padStart(2,"0")+" taramasından</i>\n"}return i+="\n",a.forEach((e,a)=>{
i+="━━━━━━━━━━━━━━━━\n"+n[a]+" <b>"+e.kod+"</b>"+(e.tf?"  ·  <i>"+e.tf+"</i>":"")+(e.neden?"  ·  <i>"+e.neden+"</i>":"")+"\n",
void 0!==e.giris&&null!==e.giris&&(i+="💵 Sinyal <b>"+t(e.giris)+"</b> → Şimdi <b>"+t(e.fiyat)+"</b>\n");const r=A(e)
;null!==r&&(i+=(r>=0?"🟢":"🔴")+" Sinyalden bu yana: <b>"+(r>=0?"+":"")+r.toFixed(2)+"%</b>\n"),void 0!==e.hedef&&null!==e.hedef&&(i+="🎯 Hedef <b>"+t(e.hedef)+"</b>",
void 0!==e.potansiyel&&null!==e.potansiyel&&(i+=Number(e.potansiyel)<=0?"  ·  🏆 <b>TUTTU</b>":"  ·  <b>+"+Number(e.potansiyel).toFixed(1)+"%</b>"),i+="\n");const s=N(e)
;s&&(i+=("süre doldu"===s?"⌛":"⏳")+" Hedefe kalan: <b>"+s+"</b>\n"),e.zaman&&(i+="⏱ İlk sinyal: <b>"+e.zaman+"</b>\n")}),
i+="━━━━━━━━━━━━━━━━\n<i>Sıralama tazelik, likidite ve kademe puanına göre; yalnız potansiyele göre değil.</i>\n<i>⚠️ Yatırım tavsiyesi değildir.</i>",i
}(l):"🏅 <b>BU TARAMANIN İLK 3'Ü</b>\n\nHenüz liste hazırlanmadı. Birazdan tekrar dene.",u(t),!1)),new Response("ok")}let o,m=r,f="pot",y=0;if(r.startsWith("l:")){const e=r.split(":");m=e[1],
f=e[2]||"pot",y=Number(e[3]||0)}if(l&&l.kartlar&&l.kartlar[m]&&l.kartlar[m].length){const e=C(l,m,f),t=Math.max(1,Math.ceil(e.length/8));y<0&&(y=0),y>=t&&(y=t-1);const s=J[m]||"<b>LİSTE</b>"
;return G.waitUntil(K(I,a,i,n,D(s,l,m,f,y,e),B(l,m,f,y,e),r.startsWith("l:"))),new Response("ok")}if(l&&l[m]){if(o=l[m],l.guncelleme){const e=new Date(l.guncelleme)
;o+=`\n\n<i>Son güncelleme: ${String((e.getUTCHours()+3)%24).padStart(2,"0")+":"+String(e.getUTCMinutes()).padStart(2,"0")}</i>`}}else o="⏳ Liste henüz hazırlanmadı. Birazdan tekrar dene."
;const h=function(e){const a=[];for(;e.length>3900;){let t=e.lastIndexOf("\n",3900);t<2e3&&(t=3900),a.push(e.slice(0,t)),e=e.slice(t)}return a.push(e),a}(o);return G.waitUntil((async()=>{
for(let e=0;e<h.length;e++){const r=await b(I.BOT_TOKEN,"sendMessage",{chat_id:i,text:h[e],parse_mode:"HTML",disable_web_page_preview:!0,reply_markup:e===h.length-1?u(t):void 0})
;if(n&&(!r||!1===r.ok)){const e=(await b(I.BOT_TOKEN,"getMe",{}))?.result?.username;await b(I.BOT_TOKEN,"sendMessage",{chat_id:a.message.chat.id,
text:'👋 <a href="tg://user?id='+t+'">Listeyi görmek</a> için önce botu başlatman gerekiyor: @'+(e||"bot")+" → <b>Başlat</b>. Sonra buradaki düğmeler sana özelden cevap verir.",parse_mode:"HTML",
disable_web_page_preview:!0});break}}})()),new Response("ok")}return new Response("ok")}{const e=!!I.VERI,t=await k(I);let n=null,i=!1,r=null,s="";if(I.BOT_TOKEN){try{
const e=await b(I.BOT_TOKEN,"getMe",{});e&&e.ok&&(i=!0,n=e.result.username)}catch(e){}if(i)try{const e=await b(I.BOT_TOKEN,"getWebhookInfo",{});e&&e.result&&(r=e.result.url||"",
e.result.last_error_message&&(s=e.result.last_error_message))}catch(e){}}
const l=I.PUSH_KEY||a,o=t&&t.kartlar?Object.keys(t.kartlar).filter(e=>"sira"!==e).map(e=>e+": "+t.kartlar[e].length).join(" · "):"",c=(e,a,t)=>'<div class="s '+(e?"ok":"yok")+'"><div class="i">'+(e?"✅":"⚠️")+"</div><div><b>"+a+'</b><div class="a">'+t+"</div></div></div>",d='<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Fix Borsa · Durum</title><style>body{margin:0;background:#0d1117;color:#e6edf3;font:15px/1.55 system-ui,-apple-system,sans-serif;padding:16px 14px 60px}h1{font-size:19px;margin:0 0 14px}.s{display:flex;gap:10px;background:#161b22;border:1px solid #272e37;border-radius:12px;padding:12px;margin-bottom:9px}.s.yok{border-color:#6b2b2b;background:#22171a}.i{font-size:18px;line-height:1.3}.a{color:#8b949e;font-size:13px;margin-top:3px}a.d{display:block;background:#388bfd;color:#fff;text-decoration:none;text-align:center;border-radius:11px;padding:13px;font-weight:700;margin-top:10px}a.d.ikinci{background:#21262d;border:1px solid #272e37;color:#e6edf3}code{background:#1c2330;padding:2px 6px;border-radius:5px;font-size:13px;word-break:break-all}ol{padding-left:20px;margin:8px 0 0}li{margin-bottom:7px}.kur{background:#22171a;border:1px solid #6b2b2b;border-radius:12px;padding:13px;margin-top:12px;font-size:14px}</style></head><body><h1>Fix Borsa · Durum</h1><div class="a" style="margin:-8px 0 12px">yazılım sürümü <b>9.4</b></div>'+c(i,"Bot anahtarı",I.BOT_TOKEN?i?"geçerli · @"+(n||"?"):"TANIMLI AMA GEÇERSİZ — Telegram bu anahtarı tanımıyor. Başına/sonuna tırnak veya boşluk karışmış olabilir.":"BOT_TOKEN tanımlı değil — Settings → Variables kısmından ekle")+c(!!r,"Telegram bağlantısı",r?"bağlı"+(s?" · son hata: "+s:""):"bağlı değil — aşağıdaki Bağla düğmesine bas")+c(e,"Hafıza (üye kayıtları)",e?"bağlı":"BAĞLI DEĞİL — üyeler, davetler ve panel çalışmaz")+c(!!t,"Hisse listeleri",t?"yüklü · "+(o||"")+" · "+new Date(t.guncelleme).toLocaleString("tr-TR"):"henüz yüklenmedi — telefondaki uygulamada Worker adresi <code>"+_.origin+"</code> ve şifre <code>"+l+"</code> yazılı olmalı, sonra <b>TARA VE BULUTA YÜKLE</b>")+'<a class="d" href="/panel?key='+encodeURIComponent(l)+'">🛠 Yönetici panelini aç</a><div class="a" style="margin-top:8px">Panel bir <b>web sayfası</b>, Telegram\'da değil. Telegram\'da botun menüsünde de <b>🛠 Yönetici paneli</b> düğmesi var (sadece sen görürsün) ya da bota <code>/panel</code> yazabilirsin — ikisi de bu sayfayı açar. Bu adresi telefonun ana ekranına kısayol olarak eklemen en pratiği.</div>'+(r&&i?"":'<a class="d ikinci" href="/setup">🔗 Telegram\'a bağla</a>')+'<div style="margin-top:16px" class="a">Telefondaki uygulamaya yazacakların:<br>Worker adresi: <code>'+_.origin+"</code><br>Şifre: <code>"+l+"</code></div>"+(e?"":'<div class="kur"><b>⚠️ Hafıza bağlı değil — nasıl bağlanır</b><div class="a" style="margin:6px 0">Bot listeleri gösterir ama kimin üye olduğunu, kimin kimi davet ettiğini hatırlayamaz. Panel de boş kalır. Bir kez yapılır, 2 dakika sürer:</div><ol><li>Cloudflare panelinde soldaki menüden <b>Storage &amp; Databases</b> → <b>KV</b>.</li><li><b>Create a namespace</b> / <b>Oluştur</b>. Adına <code>fixborsa</code> yaz, kaydet.</li><li>Soldan <b>Compute (Workers)</b> → bu worker\'ı aç → <b>Settings</b> → <b>Bindings</b>.</li><li><b>Add binding</b> → <b>KV namespace</b> seç.</li><li><b>Variable name</b> kutusuna tam olarak <code>VERI</code> yaz (büyük harf, Türkçe İ değil düz I).</li><li><b>KV namespace</b> kutusundan az önce oluşturduğun <code>fixborsa</code>\'ı seç ve <b>Deploy</b>.</li><li>Bu sayfayı yenile — burası ✅ olacak.</li></ol></div>')+"</body></html>"
;return new Response(d,{headers:{"content-type":"text/html; charset=utf-8"}})}}};