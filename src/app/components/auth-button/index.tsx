import { Message } from "ai";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { ResetButton } from "../reset-button";

interface AuthButtonProps {
  gameStarted: boolean;
  messages: Message[];
}

export const AuthButton = ({ gameStarted, messages }: AuthButtonProps) => {
  const { data: session } = useSession();

  // If game is in progress, save session to local storage
  const saveGameStateTemporarily = () => {
    // Your implementation to save the game state
    if (gameStarted && messages.length > 0) {
      localStorage.setItem("tempGameState", JSON.stringify(messages));
    }
  };

  const handleAuth = async () => {
    if (session) {
      // User is logged in, handle sign out
      await signOut();
    } else {
      // Save the game state before logging in
      saveGameStateTemporarily();
      console.log("Saved in local storage");

      // Proceed with login
      await signIn();
    }
  };

  return (
    <div className="text-player p-2">
      {/* If user is logged in */}

      {session ? (
        <div className="text-xs flex justify-between">
          Hi, {session.user?.name} <br />
          <ResetButton />
          <button
            className="hover:text-storyteller text-sm"
            onClick={handleAuth}
          >
            Log out
          </button>
        </div>
      ) : (
        // If user is not logged in

        <button className="text-sm hover:text-storyteller" onClick={handleAuth}>
          Login
        </button>
      )}
    </div>
  );
};
