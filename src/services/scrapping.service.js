// services/scrapping.service.js

async function scrapper(url) {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle" });

  const content = await page.content();

  await browser.close();
  return content;
}

module.exports = scrapper;
