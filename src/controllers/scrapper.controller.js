const scrapper = require("../services/scrapping.service");

async function scrapperController(req, res) {
  try {
    const { type, content } = req.body;
    let articleText;

    if (type === "link") {
      articleText = await scrapper(content);
    } else if (type === "text") {
      articleText = content;
    } else {
      return res.status(400).json({
        success: false,
        message: "type must be link or text",
      });
    }

    return res.json({
      success: true,
      preview: articleText.slice(0, 400),
    });

  } catch (err) {
    // 🔹 CRITICAL: Only send err.message (string), never the whole err
    console.error("Controller error:", err.message);
    return res.status(500).json({
      success: false,
      message: err.message, // string only
    });
  }
}

module.exports = { scrapperController };
