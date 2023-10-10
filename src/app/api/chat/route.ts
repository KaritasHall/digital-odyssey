import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

const systemMessage: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
  role: "system",
  content:
    "Behave as a text adventure game full of mystery and hidden wonder. The setting is fictional - you cannot reference things from outside this world or current events. Write your responses in the second person. Limit the chronology of your outputs to the immediate aftermath of the player's actions. Do not summarize or advance beyond these actions. Include dialogue and detailed descriptions. At the end of each response, list all items the player possesses without adding or removing any, unless specified by the player. Format your responses: {Scenario description}. {Ask player what they want to do?}. {Inventory: player’s items}.",
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
