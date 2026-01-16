// controllers/post.controller.js
const scrapper = require("../services/scrapping.service");

const postModel = require("../models/post.model");

const generateSummary = require("../services/ai.service");

async function userPostController(req, res) {
  try {
    const { contentType, value } = req.body;

    if (!contentType || !value) {
      return res.status(400).json({ message: "contentType and value are required" });
    }

    if (!["text", "link"].includes(contentType)) {
      return res.status(400).json({ message: "contentType must be 'text' or 'link'" });
    }

    // 1️⃣ Get article text
    let articleText = contentType === "link" ? await scrapper(value) : value;

    if (!articleText || articleText.trim() === "") {
      return res.status(400).json({ message: "Article content is empty" });
    }

    // 2️⃣ Generate AI summary
    const aiOutput = await generateSummary(articleText);

    // 3️⃣ Save post
    const post = await postModel.create({
      contentType,
      originalContent: articleText,
      aiContent: aiOutput,
      userId: req.user._id
    });

    return res.status(201).json({
      message: "Post created successfully",
      post
    });

  } catch (err) {
    console.error("Post controller error:", err);

    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { userPostController };
