import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth-options";
import admin from "@/app/firebase/admin";

const db = admin.firestore();

export async function GET() {
  const session = await getServerSession(authOptions);

  // If no session exists, return an error
  if (!session || !session.user || !session.user.email) {
    return new Response("No session", { status: 401 });
  }
  // Update the user in the database and set name to the user's name
  await db
    .collection("users")
    .doc(session.user.email)
    .set({ name: session.user.name }, { merge: true });

  // Get the user's data from the database
  const user = await db
    .collection("users")
    .doc(session.user.email)
    .get()
    .then((doc) => doc.data());

  console.log(session);
  return Response.json(user);
}
