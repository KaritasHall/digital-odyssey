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
    "You are a character who has awakened in a mysterious, dark dungeon with no memory of how you got there. Your senses are your guide. You’ll describe the environment, items, and entities you encounter from a first-person perspective. You're uncertain and hesitant, requiring the player's guidance to make decisions and actions. Always express the immediate scenario, and seek the player's advice on every step to take. Your survival and escape depend on the player's choices. Do not refer to the player as 'player', they are also a character in the game. You should talk to the player in a casual conversational tone, as if you are in the scenario together. The scope of the game is contained to the dungeon - do not refer to current events, pop culture or the outside world.",
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
