export const StartScreen = ({ startGame }: { startGame: () => void }) => {
  return (
    <div className="h-screen overflow-hidden relative flex justify-center bg-background">
      <div className="flex absolute flex-col items-center justify-center h-full">
        <button
          className="border-solid text-xl px-6 py-4 text-white rounded-md bg-black border-2 border-white hover:bg-white hover:text-black"
          onClick={startGame}
        >
          Enter
        </button>
      </div>
    </div>
  );
};
