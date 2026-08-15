/* ================== 🤖 OTOMATİK TARA VE BULUTA YÜKLE ==================
   Bu script yumatu.html'i GÖRÜNMEZ bir tarayıcıda açar ve sayfadaki
   "🔁 TARA VE BULUTA YÜKLE" butonunun arkasındaki zincirCalistir()
   fonksiyonunu senin yerine çağırır. Sayfa kodu HİÇ DEĞİŞTİRİLMEZ —
   aynı tarama mantığı, aynı sonuç, elle basmakla birebir aynı.

   yumatu.html içindeki ☁️ Worker adresi ve şifre alanları zaten HTML'in
   içine varsayılan olarak yazılı (bulutUrl / bulutKey input'ları), bu
   yüzden bu scriptin ekstra bir ayara ihtiyacı yok.
*/
const { chromium } = require("playwright");

const URL = "http://127.0.0.1:8080/yumatu.html";
const ZAMAN_ASIMI_DK = 25;

(async () => {
  const zamanlayici = setTimeout(() => {
    console.error(`✗ Zaman aşımı: ${ZAMAN_ASIMI_DK} dakikada tarama bitmedi.`);
    process.exit(1);
  }, ZAMAN_ASIMI_DK * 60 * 1000);

  let basarili = false;
  try {
    const tarayici = await chromium.launch();
    const sayfa = await tarayici.newPage();

    sayfa.on("pageerror", (e) => console.log("[sayfa hatası]", e.message));
    sayfa.on("console", (m) => {
      if (m.type() === "error") console.log("[konsol hata]", m.text());
    });

    console.log("Sayfa açılıyor...");
    await sayfa.goto(URL, { waitUntil: "load", timeout: 60000 });
    await sayfa.waitForSelector("#zincirBtn", { timeout: 30000 });

    console.log("Tarama + buluta yükleme zinciri başlatılıyor (biraz sürebilir)...");
    await sayfa.evaluate(() => window.zincirCalistir("oto"));

    const html = await sayfa.locator("#zincirDurum").innerHTML().catch(() => "");
    const metin = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    console.log("Sonuç:", metin || "(boş — buton bulunamadı ya da zincir hiç çalışmadı)");

    basarili = !!metin && !/BULUTA YÜKLENEMEDİ|hata:/i.test(metin);

    await tarayici.close();
  } catch (e) {
    console.error("✗ Script hatası:", e && e.message ? e.message : e);
    basarili = false;
  } finally {
    clearTimeout(zamanlayici);
  }

  if (!basarili) {
    console.error("✗ Tarama/yükleme başarısız görünüyor.");
    process.exit(1);
  }
  console.log("✅ Tamamlandı.");
})();
