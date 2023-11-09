import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore } from "@/app/firebase/admin";
// import { cert } from "firebase-admin/app";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  // Authenticate users with Firebase
  adapter: FirestoreAdapter(firestore),
};
