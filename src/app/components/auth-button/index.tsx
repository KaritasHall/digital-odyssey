import { Message } from "ai";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export const TEMP_GAME_STATE_LOCALSTORAGE = "tempGameState";

export interface AuthButtonProps {
  gameStarted: boolean;
  messages: Message[];
}

export const AuthButton = ({ gameStarted, messages }: AuthButtonProps) => {
  const { data: session } = useSession();

  // If game is in progress, save session to local storage
  const saveGameStateTemporarily = () => {
    // Your implementation to save the game state
    if (gameStarted && messages.length > 0) {
      localStorage.setItem(
        TEMP_GAME_STATE_LOCALSTORAGE,
        JSON.stringify(messages)
      );
    }
  };

  const handleAuth = async () => {
    if (session) {
      // User is logged in, handle sign out
      await signOut();
    } else {
      // Save the game state before logging in
      saveGameStateTemporarily();

      // Proceed with login
      await signIn();
    }
  };

  return (
    <div className="hover:text-storyteller text-player">
      {/* If user is logged in */}

      {session ? (
        <button onClick={handleAuth}>Log out</button>
      ) : (
        // If user is not logged in

        <button onClick={handleAuth}>Login</button>
      )}
    </div>
  );
};
