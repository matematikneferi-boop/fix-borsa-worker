/* ================== 🐂🐻 HİSSE TARAMASI (MALBOĞA) — HARİCİ OTOMATİK TARAMA ==================
   NEDEN BU DOSYA VAR:
   Worker içindeki eski yöntem, her çalıştırmada yalnızca ~10 saniyelik bir
   CPU bütçesiyle evrenin küçük bir DİLİMİNİ tarıyordu (mbDilimTara). 400+
   hisse × 7 zaman dilimini bu şekilde bitirmek dakikalar/saatler sürüyordu
   — "veriler geç geliyor" şikayetinin kaynağı buydu.

   Bu script GitHub Actions'ta çalışır: CPU sınırı yok, ~25-30 dakika zamanı
   var. Hesaplama motoru (mbMotor, mb571Seri, mbEnerjiTara vb.) Worker'daki
   worker.js'den BİREBİR AYNI kopyalandı — sonuçlar birebir aynı olsun diye
   tek bir satırı bile değiştirilmedi. Tarayıcıya (Playwright) hiç gerek
   yok: bütün hesap saf veri çekme (Yahoo Finance) + matematik, DOM/JS
   motoru gerektirmiyor. Bu yüzden Fibo Tarama'dan (oto-tara.js) daha basit
   ve daha hızlı: sayfa açmadan, doğrudan Node ile çalışır.

   AKIŞ:
   1) Worker'dan güncel hisse evrenini çeker (/evren-liste) — evren
      kaynağı TEK YERDE (Worker'da) kalır, burada tekrarlanmaz.
   2) Her hisse için TÜM zaman dilimlerini (5DK,15DK,1SA,4SA,1G,1HAF,1AY)
      hesaplar — 1SA/4SA aynı saatlik veriyi paylaşır (mbTekHisse'deki
      gibi), Yahoo'ya gereksiz ikinci istek atılmaz.
   3) Sonuçları zaman dilimine göre gruplayıp Worker'a basar (/push-malboga)
      — dilim dilim değil, HER TF İÇİN TAM SONUÇ tek seferde yazılır.

   Worker'daki eski dilimli tarama (scheduled cron / mbAlarmOncelikliTara)
   bu script'ten BAĞIMSIZ, dokunulmadan çalışmaya devam eder — aynı KV
   anahtarını paylaştıkları için çakışma yaşanmaz, sadece bu script çok
   daha sık tam-tazeleme yapar. İstenirse Cloudflare panelinden o Cron
   Trigger daha sonra kapatılabilir; zorunlu değil.
*/

const WORKER_URL = (process.env.WORKER_URL || "").replace(/\/+$/, "");
const PUSH_KEY   = process.env.PUSH_KEY || "";
const ES         = Number(process.env.HISSE_ES || 20);   /* eşzamanlı istek sayısı */
const SEANS_BAS_DK   = 580;   /* 09:40 TR */
const SEANS_BITIS_DK = 1110;  /* 18:30 TR */

if (!WORKER_URL || !PUSH_KEY) {
  console.error("✗ WORKER_URL ve/veya PUSH_KEY tanımlı değil (GitHub secret olarak eklenmeli).");
  process.exit(1);
}

/* Runner UTC'dir; TR sabit UTC+3 (2016'dan beri yaz saati yok). */
function trSaat() {
  const d = new Date(Date.now() + 3 * 3600 * 1000);
  return { gun: d.getUTCDay(), dk: d.getUTCHours() * 60 + d.getUTCMinutes(),
           metin: String(d.getUTCHours()).padStart(2, "0") + ":" + String(d.getUTCMinutes()).padStart(2, "0") };
}
function seansAcikMi() {
  if (process.env.GITHUB_EVENT_NAME === "workflow_dispatch") return true;
  const { gun, dk } = trSaat();
  if (gun === 0 || gun === 6) return false;
  return dk >= SEANS_BAS_DK && dk <= SEANS_BITIS_DK;
}

/* ================== ⬇️ worker.js'DEN BİREBİR KOPYALANAN HESAPLAMA MOTORU ⬇️ ================== */

const YF_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
const YF_HEADERS = { "User-Agent": YF_UA, "Accept": "application/json, text/plain, */*" };

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

function mbBarsSince(seri,son){
  for(let k=son;k>=0;k--)if(seri[k])return son-k;
  return null;
}
function mbMalTopDagit(m){
  const n=m.length,mt=new Array(n).fill(false),md=new Array(n).fill(false);
  for(let i=19;i<n;i++){
    let pl=Infinity,ph=-Infinity;
    for(let k=i-10;k<=i-1;k++){const b=m[k];if(b.low<pl)pl=b.low;if(b.high>ph)ph=b.high}
    let s=0;for(let k=i-19;k<=i;k++)s+=m[k].hacim;
    const vs=s/20,c=m[i],v=c.hacim,v1=m[i-1].hacim;
    mt[i]= c.low<pl  && c.close>c.open && c.close>pl && v>vs && v>v1;
    md[i]= c.high>ph && c.close<c.open && c.close<ph && v>vs && v<v1;
  }
  return[mt,md];
}
function mbPivot571(src,zaman,i,uzun,tepeMi){
  if(i<uzun)return null;
  const fiyat=src[i-uzun];
  if(!isFinite(fiyat))return null;
  for(let j=0;j<=uzun*2;j++){
    const k=i-j;if(k<0)continue;
    if(tepeMi?src[k]>fiyat:src[k]<fiyat)return null;
  }
  return{t:zaman[i-uzun],p:fiyat};
}
function mb571Seri(m,depth,lowTh,upTh,rev){
  const n=m.length,uzun=Math.floor(depth/2);
  const high=m.map(x=>x.high),low=m.map(x=>x.low),zaman=m.map(x=>x.time);
  let pivotsH=[],pivotsL=[],lastH=null,lastL=null;
  let isHighLast=false,startPrice=NaN,endPrice=NaN,offset=NaN,diff=NaN;
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
    if(pivotsH.length>200){pivotsH.shift();degisti=true}
    if(pivotsL.length>200){pivotsL.shift();degisti=true}
    if(!degisti)isHighLast=yerlesikIHL;
    if(degisti&&pivotsH.length>0&&pivotsL.length>0){
      const hc=pivotsH.slice(),lc=pivotsL.slice();
      let kilit=0;
      while(hc.length>0&&lc.length>0){
        if(++kilit>5000)break;
        lastH=hc.pop();lastL=lc.pop();
        isHighLast=lastH.t>lastL.t;
        let piv=isHighLast?hc:lc;
        for(let k=piv.length-1;k>=0;k--){
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
      yerlesikIHL=isHighLast;
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
const MB_DEPTH=10,MB_LOW_TH=1.0,MB_UP_TH=0.236,MB_REV=false,MB_PENCERE=700;
function mbDurum571Seri(m){
  return mb571Seri(m,MB_DEPTH,MB_LOW_TH,MB_UP_TH,MB_REV)
    .map(x=>(x&&isFinite(x.doyum)&&isFinite(x.close))?(x.doyum>x.close?"BOĞA":"AYI"):null);
}
const EZ_MINBARS=8, EZ_ATRMULT=2.5;
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
    let kirUp=false,kirDn=false;
    if(aktif&&aktif.isActive&&a!==null){
      if(b.close>aktif.top){
        kirUp=true;aktif.isActive=false;aktif.isBroken=true;aktif.breakDir="Bullish";aktif.endBar=i;
        const rsk=aktif.top-(aktif.bottom-a*0.5);
        aktif.entryPrice=aktif.top;aktif.slPrice=aktif.bottom-a*0.5;
        aktif.tp1Price=aktif.top+rsk;aktif.tp2Price=aktif.top+rsk*1.5;aktif.tp3Price=aktif.top+rsk*2;
      }else if(b.close<aktif.bottom){
        kirDn=true;aktif.isActive=false;aktif.isBroken=true;aktif.breakDir="Bearish";aktif.endBar=i;
        const rsk2=(aktif.top+a*0.5)-aktif.bottom;
        aktif.entryPrice=aktif.bottom;aktif.slPrice=aktif.top+a*0.5;
        aktif.tp1Price=aktif.bottom-rsk2;aktif.tp2Price=aktif.bottom-rsk2*1.5;aktif.tp3Price=aktif.bottom-rsk2*2;
      }
    }
    if(sikisma){
      if(rHigh===null){rHigh=lkH;rLow=lkL;rStart=i-4;barsIn=5}
      else if(b.high<=rHigh+a*0.1&&b.low>=rLow-a*0.1){
        rHigh=Math.max(rHigh,b.high);rLow=Math.min(rLow,b.low);barsIn++;
      }else{rHigh=null;rLow=null;barsIn=0}
    }else{rHigh=null;rLow=null;barsIn=0}
    if(barsIn===minBars&&rHigh!==null){
      const z={startBar:rStart,endBar:i,top:rHigh,bottom:rLow,isActive:true,isBroken:false,
        breakDir:"",touchesTop:0,touchesBottom:0,energy:null,phase:"",direction:"",
        dirConfidence:null,breakoutQuality:null,gravityCenter:null,instFootprint:null,
        entryPrice:null,slPrice:null,tp1Price:null,tp2Price:null,tp3Price:null};
      if(aktif&&aktif.isActive)aktif.isActive=false;
      aktif=z;zones.push(z);while(zones.length>10)zones.shift();
    }
    if(aktif&&aktif.isActive&&!kirUp&&!kirDn){
      const dur=i-aktif.startBar,rngH=aktif.top-aktif.bottom,tol=rngH*0.1;
      if(b.high<=aktif.top+tol&&b.low>=aktif.bottom-tol){
        aktif.endBar=i;
        aktif.energy=ezEnerji(dur,rngH,a);
        aktif.phase=ezEvre(dur);
        if(i===son)ezAgirOlc(m,avol,aktif,i);
      }
    }
  }
  if(aktif&&!aktif.isActive&&aktif.isBroken&&aktif.breakoutQuality===null&&
     aktif.endBar>aktif.startBar){
    if(aktif.energy===null)aktif.energy=ezEnerji(aktif.endBar-aktif.startBar,
      aktif.top-aktif.bottom,atr[aktif.endBar]);
    if(!aktif.phase)aktif.phase=ezEvre(aktif.endBar-aktif.startBar);
    ezAgirOlc(m,avol,aktif,aktif.endBar);
  }
  return{aktif:aktif,zones:zones,atr:atr[son]};
}
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
           ezUst:(kap>z.top?1:0),
           ezMes:null,ezTp1:null,ezEvre:z.phase||""};
  if(z.isActive){o.ezAct=1;if(kap<=z.top&&kap>=z.bottom)o.ezIns=1}
  if(z.isBroken&&z.breakDir==="Bullish")o.ezAge=son-z.endBar;
  if(z.tp1Price!==null&&isFinite(z.tp1Price))o.ezTp1=EZ_Y2(z.tp1Price);
  else if(isFinite(r.atr))o.ezTp1=EZ_Y2(z.top+(z.top-(z.bottom-r.atr*0.5)));
  if(z.top!==null&&kap>0)o.ezMes=EZ_Y2(Math.abs(z.top-kap)/kap*100);
  return o;
}
function mbMotor(mumlar){
  if(!mumlar||mumlar.length<25)return null;
  const m=mumlar.slice(-MB_PENCERE);
  if(m.length<25)return null;
  const son=m.length-1;
  const[mtS,mdS]=mbMalTopDagit(m);
  const st=mbDurum571Seri(m);
  const lv=mb571Seri(m,MB_DEPTH,MB_LOW_TH,MB_UP_TH,MB_REV)[son];

  const topHam=mbBarsSince(mtS,son),dagHam=mbBarsSince(mdS,son);
  const top_raw=topHam===null?9999:topHam,dag_raw=dagHam===null?9999:dagHam;
  const top_yas=top_raw<=5?top_raw:9999,dag_yas=dag_raw<=5?dag_raw:9999;

  const degisti=st.map((v,i)=>v!==(i===0?null:st[i-1]));
  const ageBs=mbBarsSince(degisti,son);
  const rej_yas=ageBs===null?0:ageBs;
  const rej_scan_yas=rej_yas<=5?rej_yas:9999;

  const rej=st[son],onceki=son>0?st[son-1]:null;
  const boga=rej==="BOĞA";
  const ayi=rej!==null&&!boga;
  const boga_gec=boga&&!(onceki==="BOĞA");
  const ayi_gec=ayi&&(onceki==="BOĞA");
  const mt=mtS[son],md=mdS[son];
  const son_yas=Math.min(Math.min(top_yas,dag_yas),rej_scan_yas);

  const mal_txt=mt?"TOP☀ 0B":md?"DAĞ☀ 0B":(top_yas<=dag_yas?"TOP "+top_yas+"B":"DAĞ "+dag_yas+"B");
  const gec_txt=boga_gec?"BOĞA 0B":ayi_gec?"AYI 0B":((boga?"BOĞA ":ayi?"AYI ":"? ")+rej_yas+"B");
  const son_txt=mt?"BUGÜN TOP":md?"BUGÜN DAĞ":boga_gec?"BUGÜN BOĞA":ayi_gec?"BUGÜN AYI":"DEVAM";

  let durum=0,yas=9999;
  if(topHam!==null||dagHam!==null){
    const tj=topHam===null?999999:topHam,dj=dagHam===null?999999:dagHam;
    if(tj<=dj){durum=1;yas=tj}else{durum=-1;yas=dj}
  }
  const dip=!!(lv&&isFinite(lv.stop)&&isFinite(lv.s236)&&isFinite(lv.s786)&&
    isFinite(lv.close)&&isFinite(lv.doyum)&&lv.stop<lv.close&&lv.close<lv.s786&&lv.doyum>lv.close);

  const dip382=!!(dip&&isFinite(lv.s382)&&lv.close<lv.s382);
  const dip236=!!(dip&&isFinite(lv.s236)&&lv.close<lv.s236);
  let oran=null;
  if(lv&&isFinite(lv.stop)&&isFinite(lv.s786)&&isFinite(lv.close)&&lv.s786!==lv.stop)
    oran=Math.round(((lv.close-lv.stop)/((lv.s786-lv.stop)/0.786))*1000)/1000;
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
    fiyat:Math.round(m[son].close*100)/100,zaman:m[son].time};
}

const MB_TF={
  "5DK" :{ad:"5 dakika", ik:"⚡", interval:"5m",  range:"1mo"},
  "15DK":{ad:"15 dakika",ik:"⏱",  interval:"15m", range:"1mo"},
  "1SA" :{ad:"1 saat",   ik:"🕐", interval:"60m", range:"2y"},
  "4SA" :{ad:"4 saat",   ik:"🕓", interval:"60m", range:"2y", grupSaat:4},
  "1G"  :{ad:"1 gün",    ik:"🗓",  interval:"1d",  range:"5y",  hayaletAt:true},
  "1HAF":{ad:"1 hafta",  ik:"📅", interval:"1wk", range:"max", hayaletAt:true},
  "1AY" :{ad:"1 ay",     ik:"🗂",  interval:"1mo", range:"max", hayaletAt:true}
};
const MB_TF_LISTE=["5DK","15DK","1SA","4SA","1G","1HAF","1AY"];
const mbHayaletAt=m=>m.filter(b=>b.hacim>0||b.high!==b.low);
const mbTfNormal=t=>MB_TF[t]?t:"1G";
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
/* ================== ⬆️ HESAPLAMA MOTORU SONU (worker.js ile birebir aynı) ⬆️ ================== */

const bekle = (ms) => new Promise((r) => setTimeout(r, ms));

/* Tek hisse — TÜM zaman dilimleri, ortak Yahoo önbelleğiyle (1SA/4SA
   aynı saatlik veriyi paylaşır → hisse başına 7 değil 5 istek). */
async function tumTfHesapla(kod) {
  const onbellek = {};
  const satir = {};
  for (const tf of MB_TF_LISTE) {
    try {
      const s = await mbOlc(kod, tf, onbellek);
      if (s) satir[tf] = s;
    } catch (_) { /* bu hisse/tf atlanır, tarama durmaz */ }
  }
  return satir;
}

/* Basit eşzamanlı havuz — evren listesini ES parçada işler. */
async function havuzdaIsle(liste, es, isci) {
  let sira = 0;
  const calis = async () => {
    while (sira < liste.length) {
      const i = sira++;
      await isci(liste[i], i);
    }
  };
  await Promise.all(Array.from({ length: Math.min(es, liste.length) }, calis));
}

async function pushYap(tf, sonuc) {
  const u = `${WORKER_URL}/push-malboga?key=${encodeURIComponent(PUSH_KEY)}`;
  const res = await fetch(u, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ tf, sonuc }),
  });
  const j = await res.json().catch(() => null);
  if (!res.ok || !j || !j.ok) {
    throw new Error(`push-malboga(${tf}) başarısız: HTTP ${res.status} ${j ? JSON.stringify(j) : ""}`);
  }
  return j;
}

(async () => {
  const t0 = Date.now();
  const s = trSaat();

  if (!seansAcikMi()) {
    console.log(`🌙 Seans kapalı (TR ${s.metin}). Tarama yapılmadı — 09:40–18:30, hafta içi.`);
    process.exit(0);
  }

  console.log(`▶️ Hisse Taraması başlıyor (TR ${s.metin}) — Worker: ${WORKER_URL}`);

  let kodlar;
  try {
    const r = await fetch(`${WORKER_URL}/evren-liste?key=${encodeURIComponent(PUSH_KEY)}`);
    const j = await r.json();
    if (!r.ok || !j || !j.ok || !Array.isArray(j.kodlar)) throw new Error("evren-liste geçersiz cevap");
    kodlar = j.kodlar;
  } catch (e) {
    console.error("✗ Evren listesi alınamadı:", e && e.message ? e.message : e);
    process.exit(1);
  }
  console.log(`📋 Evren: ${kodlar.length} hisse`);
  if (!kodlar.length) { console.log("⚠️ Evren boş, çıkılıyor."); process.exit(0); }

  /* tf → { kod: sonuç } biriktir */
  const tfSonuc = {};
  for (const tf of MB_TF_LISTE) tfSonuc[tf] = {};

  let islenen = 0, hataliHisse = 0;
  await havuzdaIsle(kodlar, ES, async (kod) => {
    try {
      const satir = await tumTfHesapla(kod);
      for (const tf of MB_TF_LISTE) if (satir[tf]) tfSonuc[tf][kod] = satir[tf];
    } catch (_) { hataliHisse++; }
    islenen++;
    if (islenen % 50 === 0) console.log(`… ${islenen}/${kodlar.length} hisse işlendi`);
  });

  const dk1 = ((Date.now() - t0) / 60000).toFixed(1);
  console.log(`🧮 Hesaplama bitti: ${islenen} hisse, ${dk1} dk. Şimdi Worker'a basılıyor…`);

  let basariliTf = 0;
  for (const tf of MB_TF_LISTE) {
    const sonuc = tfSonuc[tf];
    const n = Object.keys(sonuc).length;
    try {
      await pushYap(tf, sonuc);
      basariliTf++;
      console.log(`✅ ${tf}: ${n} hisse basıldı`);
    } catch (e) {
      console.error(`✗ ${tf} basılamadı:`, e && e.message ? e.message : e);
    }
    await bekle(300);
  }

  const dk = ((Date.now() - t0) / 60000).toFixed(1);
  console.log(`Bitti: ${basariliTf}/${MB_TF_LISTE.length} zaman dilimi basıldı · ${dk} dakika.`);
  process.exit(basariliTf > 0 ? 0 : 1);
})();
