import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export const StartScreen = ({ startGame }: { startGame: () => void }) => {
  const { status } = useSession();

  if (status === "authenticated" || status === "loading") {
    return null;
  }
  return (
    <div className="h-screen overflow-hidden relative flex justify-center bg-background">
      <div className="flex absolute flex-col items-center justify-center h-full gap-4">
        <button
          className="border-solid text-xl px-6 py-4 text-white rounded-md bg-black border-2 border-white hover:bg-white hover:text-black"
          onClick={startGame}
        >
          Start new game
        </button>

        <button
          className="text-lg hover:text-storyteller text-player"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};
