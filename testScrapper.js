const scrapper = require("./src/services/scrapping.service");

(async () => {
  try {
    const text = await scrapper(
      "https://en.wikipedia.org/wiki/Web_scraping"
    );
    console.log(text.slice(0, 200)); // should print first 200 chars
  } catch (err) {
    console.error(err.message); // never log whole object
  }
})();
