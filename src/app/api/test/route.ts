import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth-options";
import admin from "@/app/firebase/admin";
import OpenAI from "openai";

const db = admin.firestore();

interface Adventure {
  initialSystemMessage: string;
  initialUserMessage: string;
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam;
}

export async function GET() {
  const session = await getServerSession(authOptions);

  // If no session exists, return an error
  if (!session || !session.user || !session.user.email) {
    return new Response("No session", { status: 401 });
  }

  const adventureDocument = await db
    .collection("adventures")
    .where("user", "==", session.user.email)
    .get();

  const adventureData = adventureDocument.docs.map((doc) =>
    doc.data()
  ) as Adventure[];

  const adventures = adventureData.map((adventure) => {
    const combinedMessages = [];

    combinedMessages.push({
      role: "system",
      content: adventure.initialSystemMessage,
    });
    combinedMessages.push({
      role: "user",
      content: adventure.initialUserMessage,
    });
    combinedMessages.push({
      ...adventure.messages,
    });

    return combinedMessages;
  });

  return Response.json(adventures);
}
