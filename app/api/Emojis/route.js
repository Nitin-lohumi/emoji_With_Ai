import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.API_KEY);

export async function POST(req) {
  try {
    const { data, language } = await req.json(); // Extract both values properly

    if (!data) {
      return NextResponse.json(
        { msg: "Please provide emoji input!" },
        { status: 400 }
      );
    }
    if (language == "panjabi") {
      const prompt = `Translate the given emoji to text in english but it would be panjabi language: ${data} in max only two line`;
      const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const resp = await result.response.text(); 
      return NextResponse.json({ response: resp, msg: "Success" });
    }
    const prompt = `Translate the given emoji to text in ${language} language: ${data} in max only two line `;
    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const resp = await result.response.text(); // Ensure response extraction

    return NextResponse.json({ response: resp, msg: "Success" });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { msg: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
