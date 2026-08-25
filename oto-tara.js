/* ================== 🤖 OTOMATİK TARA VE BULUTA YÜKLE (DÖNGÜ) ==================
   ESKİ HALİ TEK TARAMA YAPIYORDU. Ölçülen tablo şuydu:
       kurulum (checkout + npm + tarayıcı açılışı) ....... ~40 sn
       tarama ............................................ ~45 sn
       runner kapanır, 8 dakika HİÇBİR ŞEY OLMAZ
   Yani zamanın ~%10'unda tarıyor, %90'ında bekliyorduk. yumatu.html içindeki
   "sürekli mod" burada hiç devreye girmiyor, çünkü o döngü sayfa açık kalınca
   çalışıyor; Playwright ise tek taramadan sonra tarayıcıyı kapatıyordu.

   YENİ HALİ: sayfa BİR KEZ açılır, aynı sekmede tarama arka arkaya tekrarlanır.
   Kurulum maliyeti bir kez ödenir, sonrası saf tarama. 8 dakikada bir gelen
   yeni tetikleme (bekçi + cron) bu çalışmayı cancel-in-progress ile keser ve
   yerine tazesini başlatır — yani zincir kopmaz.

   Seans penceresi burada uygulanır (TR 09:40–18:30, hafta içi). Runner UTC
   çalıştığı için saat açıkça TR'ye çevriliyor; sunucunun yerel saatine
   güvenilmiyor. Pencere dışındaysa iş hemen ve BAŞARILI biter — boşuna
   tarayıcı açıp Yahoo'yu dövmez.
*/
const { chromium } = require("playwright");

const URL = "http://127.0.0.1:8080/yumatu.html";
const TUR_ARASI_MS      = 2000;    /* tarama bitince bir sonrakine kadar */
const AZAMI_CALISMA_DK  = 25;      /* workflow timeout 30 dk; altında kalıyoruz */
const TEK_TUR_ASIMI_DK  = 8;       /* bir tarama bu kadarda bitmezse tarayıcı sağlıksız */
const SEANS_BAS_DK      = 580;     /* 09:40 TR */
const SEANS_BITIS_DK    = 1110;    /* 18:30 TR */

/* Runner UTC'dir; TR sabit UTC+3 (2016'dan beri yaz saati yok). */
function trSaat() {
  const d = new Date(Date.now() + 3 * 3600 * 1000);
  return { gun: d.getUTCDay(), dk: d.getUTCHours() * 60 + d.getUTCMinutes(),
           metin: String(d.getUTCHours()).padStart(2, "0") + ":" +
                  String(d.getUTCMinutes()).padStart(2, "0") };
}
function seansAcikMi() {
  /* Elle "Run workflow" ile tetiklenince seans kısıtı uygulanmaz — kod
     değişikliğini seans dışında (ör. akşam) test edebilmek için. Cron'dan
     gelen otomatik taramalar hâlâ sadece seans içinde çalışır. */
  if (process.env.GITHUB_EVENT_NAME === "workflow_dispatch") return true;
  const { gun, dk } = trSaat();
  if (gun === 0 || gun === 6) return false;               /* Pazar / Cumartesi */
  return dk >= SEANS_BAS_DK && dk <= SEANS_BITIS_DK;
}
const bekle = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const t0 = Date.now();
  const s = trSaat();

  if (!seansAcikMi()) {
    console.log(`🌙 Seans kapalı (TR ${s.metin}). Tarama yapılmadı — 09:40–18:30, hafta içi.`);
    process.exit(0);
  }

  let tarayici = null, sayfa = null;
  let basariliTur = 0, hataliTur = 0;

  try {
    tarayici = await chromium.launch();
    sayfa = await tarayici.newPage();
    sayfa.on("pageerror", (e) => console.log("[sayfa hatası]", e.message));
    sayfa.on("console", (m) => { if (m.type() === "error") console.log("[konsol hata]", m.text()); });

    console.log(`Sayfa açılıyor... (TR ${s.metin})`);
    await sayfa.goto(URL, { waitUntil: "load", timeout: 60000 });
    await sayfa.waitForSelector("#zincirBtn", { timeout: 30000 });

    /* Hangi sürümün çalıştığını loga bas: yanlış/bayat dosya sessizce
       çalışırsa saatler kaybettiriyor. */
    const surum = await sayfa.evaluate(() =>
      (typeof YAMA_SURUM !== "undefined" ? YAMA_SURUM : "(sürüm damgası yok — ESKİ DOSYA)")
    ).catch(() => "(okunamadı)");
    console.log("🏷️ sürüm:", surum);

    while (true) {
      const gecen = (Date.now() - t0) / 60000;
      if (gecen >= AZAMI_CALISMA_DK) { console.log(`⏹ ${AZAMI_CALISMA_DK} dk doldu, temiz çıkılıyor.`); break; }
      if (!seansAcikMi())            { console.log(`🌙 Seans kapandı (TR ${trSaat().metin}), döngü bitti.`); break; }

      const turBas = Date.now();
      try {
        await sayfa.evaluate(() => window.zincirCalistir("oto"));
        /* zincirCalistir kendi içinde await'li; döndüğünde tur bitmiştir. */
      } catch (e) {
        hataliTur++;
        console.log("[tur hatası]", e && e.message ? e.message : e);
        if (hataliTur >= 3) { console.log("✗ Üst üste hata, döngü durduruluyor."); break; }
        await bekle(5000);
        continue;
      }

      const html = await sayfa.locator("#zincirDurum").innerHTML().catch(() => "");
      const metin = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      const sn = ((Date.now() - turBas) / 1000).toFixed(1);
      const iyi = !!metin && !/BULUTA YÜKLENEMEDİ|hata:/i.test(metin);

      if (iyi) { basariliTur++; hataliTur = 0; } else { hataliTur++; }
      console.log(`${iyi ? "✅" : "⚠️"} tur ${basariliTur + hataliTur} · ${sn} sn · ${metin.slice(0, 180)}`);

      if (hataliTur >= 3) { console.log("✗ Üst üste 3 başarısız tur, döngü durduruluyor."); break; }

      if ((Date.now() - turBas) / 60000 > TEK_TUR_ASIMI_DK) {
        console.log("✗ Tur anormal uzun sürdü, tarayıcı sağlıksız olabilir — çıkılıyor.");
        break;
      }
      await bekle(TUR_ARASI_MS);
    }
  } catch (e) {
    console.error("✗ Script hatası:", e && e.message ? e.message : e);
  } finally {
    if (tarayici) await tarayici.close().catch(() => {});
  }

  const dk = ((Date.now() - t0) / 60000).toFixed(1);
  console.log(`Bitti: ${basariliTur} başarılı tur · ${dk} dakika.`);
  /* Tek bir tur bile başardıysak çalışma BAŞARILIDIR. Aksi halde yeşil tik
     yanıltıcı olurdu: hiç tarama yapılmadan "tamamlandı" görürdün. */
  process.exit(basariliTur > 0 ? 0 : 1);
})();
