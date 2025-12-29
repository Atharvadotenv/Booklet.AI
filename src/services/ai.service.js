const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apikey : process.env.GEMINI_API_KEY
});

async function Summary() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  
}



module.exports=Summary;