const puppeteer = require("puppeteer");

async function scrapper(url) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 });

    const text = await page.evaluate(() =>
      document.body ? document.body.innerText : ""
    );

    return text;

  } catch (err) {
    // STRING ONLY
    console.error("Scrape error:", err.message);
    throw new Error("Failed to scrape the article");
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = scrapper;
