const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()

export async function summarizeText(text) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const key = process.env.myKey;
  const userPrompt = "Summarize this given text." + text;
  const genAI = new GoogleGenerativeAI(key);
  var summary;
  async function run() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(userPrompt);
        const response = await result.response;
        summary = await response.text(); 
        console.log(summary);
    } catch (error) {
        console.error(error);
    }
  }
  
  await run();
  return summary;
}