import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";
const prompt =
  "Behave as a text adventure game. Generate a starting location and introduction. Do not reference current events or anything outside this adventure. Write your responses in the second person. Do not summarize events or advance time in the game's story beyond the outcome of my actions. Use dialogue and concise, but detailed descriptions. Format your output like this: {Scenario description}. {Ask player what they want to do}";

const systemMessage: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
  role: "system",
  content: prompt,
};

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request

  try {
    const { messages } = await req.json();

    //Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      stream: true,
      messages: [systemMessage, ...messages],
    });
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    // Check if the error is an APIError
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      throw error;
    }
  }
}
