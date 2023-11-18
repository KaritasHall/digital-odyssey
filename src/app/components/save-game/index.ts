import OpenAI from "openai";

export interface Adventure {
  initialUserMessage: string;
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
}

// A function that sends a post request to the server to save the game
export default async function saveGame(adventure: Adventure) {
  try {
    const response = await fetch("/api/adventures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adventure),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error saving adventure:", error);
    // Handle errors
  }
}
