import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth-options";
import admin from "@/app/firebase/admin";
import OpenAI from "openai";

const db = admin.firestore();

interface Adventure {
  initialSystemMessage: string;
  initialUserMessage: string;
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
}

// Post new adventure to the database
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const data = await req.json();

  // If no session exists, return an error
  if (!session || !session.user || !session.user.email) {
    return new Response("Not authenticated", { status: 401 });
  }

  // Extract the chat data from the request body
  const { initialUserMessage, messages } = data as Adventure;

  // Ensure all required fields are present
  if (!initialUserMessage || !messages) {
    return new Response("Missing chat data", { status: 400 });
  }

  // Add the adventure to the database, including the user email
  await db.collection("adventures").doc(session.user.email).set({
    initialUserMessage,
    messages,
  });

  // Return the ID of the new adventure
  return Response.json({ status: "saved" });
}

// Get adventures for the current user
export async function GET() {
  const session = await getServerSession(authOptions);

  // If no session exists, return an error
  if (!session || !session.user || !session.user.email) {
    return new Response("No session", { status: 401 });
  }

  const adventureDocument = await db
    .collection("adventures")
    .doc(session.user.email)
    .get();

  if (!adventureDocument.exists) {
    return new Response("No adventure found", { status: 404 });
  }

  const adventureData = adventureDocument.data();

  return Response.json(adventureData);
}

// Delete the adventure for the current user
export async function DELETE() {
  const session = await getServerSession(authOptions);

  // If no session exists, return an error
  if (!session || !session.user || !session.user.email) {
    return new Response("No session", { status: 401 });
  }

  await db.collection("adventures").doc(session.user.email).delete();

  return Response.json({ status: "deleted" });
}
