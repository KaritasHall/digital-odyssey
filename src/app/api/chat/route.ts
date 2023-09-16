import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

const systemMessage: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
  role: "system",
  content:
    "Behave as a text adventure game. Write your responses in the second person. Limit the chronology of your responses to the moments following any action I dictate. Do not summarize events or advance time in the game's story beyond the outcome of my actions. Use dialogue and concise, but detailed descriptions. At the end of your output include all items that I currently possess. Do not add items that I have not picked up or remove any items that I have not lost, dropped, etc. Game Parameters - Themes:[Mystery, Adventure, Dark]. Format your output like this: {Scenario description}. {Ask player what they want to do}. {Inventory: items in my possession}.",
};

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
  console.log(messages);

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages: [systemMessage, ...messages],
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
