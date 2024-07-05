import express from "express";
const airouter = express.Router();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const parseSuggestions = (text) => {
  // Remove all occurrences of '\n', '\', and '/'
  const cleanedText = text.replace(/\\/g, "").replace(/\//g, "");

  // Split the text by newline to find the suggestions
  const parts = cleanedText.split("\n");

  // Extract suggestions from the cleaned text, removing empty lines
  const suggestions = parts
    .filter((suggestion) => suggestion.trim() !== "")
    .map((suggestion, index) => ({
      l: index + 1,
      text: suggestion.trim(),
    }));

  return suggestions;
};

airouter.post("/search", async (req, res) => {
  try {
    console.log("ai search");
    const { title, text } = req.body;
    const prompt = `I'm trying to write an article/book. Give me 3-5 suggestions which include any grammatical mistakes, rewriting the text so far, switching out some words or even adding some sentences. This is what I have so far: Title: ${title}, and the text: ${text}. Dont say anything except the suggestions and split all the suggestions with a new line, else keep wrting a single suggestion in one line , don't Bold anything`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const res_text = response.text();
    // console.log(res_text);
    const suggestions = parseSuggestions(res_text);
    // console.log(suggestions);
    return res.status(200).send({ suggestions });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default airouter;
