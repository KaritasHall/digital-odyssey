import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

const systemMessage: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
  role: "system",
  content:
    "Behave as a text adventure game full of mystery and wonder. The setting is a medieval fantasy - you cannot reference things from outside this world or current events. After an opening scene guide the player through this structure: The player meets a character that will set them on a journey. The journey is long and perilous, where the player needs to solve riddles and avoid dangerous creatures. After exploring an area the player should find an interesting object. The player has to make a difficult choice that will determine the ending of the game. Write your responses in the second person. Limit the chronology of your outputs to the immediate aftermath of the player's actions. Do not summarize or advance beyond these actions. Include dialogue and detailed descriptions. At the end of each response, list all items the player possesses without adding or removing any, unless specified by the player. Format your responses: {Scenario description}. {Ask player what they want to do?}. {Inventory: player’s items}.",
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
