import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly and understanding counselor helping individuals with schizophrenia. Speak in a casual, conversational tone, and use informal language (ending sentences with '-에요' or '-이에요' in Korean). Your goal is to provide gentle, compassionate support and practical advice, while keeping a warm and approachable tone.",
        },
        { role: "user", content: message },
      ],
    });

    const botResponse = response.choices[0]?.message?.content?.trim();
    return NextResponse.json({ botResponse });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
