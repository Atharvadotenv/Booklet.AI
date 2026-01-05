// services/ai.service.js
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apikey: process.env.GEMINI_API_KEY
});

const MAX_CHARS = 2000;

async function generateSummary(text) {
  try {
    if (!text || text.trim().length === 0) {
      throw new Error("Empty input text");
    }

    const trimmedText =
      text.length > MAX_CHARS ? text.slice(0, MAX_CHARS) : text;

    const prompt = `
Summarize the following article in 10–15 clear bullet points.
Avoid repetition and unnecessary details.

Article:
${trimmedText}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    // 🔥 CORRECT EXTRACTION
    const parts =
      response?.candidates?.[0]?.content?.parts;

    if (!parts || !Array.isArray(parts)) {
      console.error("Unexpected Gemini response:", response);
      return "Summary could not be generated.";
    }

    const summary = parts
      .map(p => p.text)
      .join(" ")
      .trim();

    if (!summary) {
      console.warn("Gemini returned empty text");
      return "Summary could not be generated.";
    }

    return summary;

  } catch (err) {
    console.error("Gemini Service Error:", err.message);
    return "Summary could not be generated.";
  }
}

module.exports = generateSummary;
