import nebula1 from "./nebula1.png";
import nebula2 from "./nebula2.png";
import nebula3 from "./nebula3.png";
import nebula4 from "./nebula4.png";
import Image from "next/image";

export const StartScreen = ({ startGame }: { startGame: () => void }) => {
  return (
    <div className="h-screen relative flex justify-center">
      <div>
        <Image
          src={nebula4}
          className="absolute inset-0 object-cover h-full w-full"
          alt="nebula"
        />
        <Image
          src={nebula2}
          className="inset-0 absolute object-fit w-full h-full animate-fadeInOut"
          alt="nebula"
        />
        <Image
          src={nebula4}
          className="inset-0 absolute object-fit w-full h-full opacity-20 animate-slowPulse"
          alt="nebula"
        />
        <Image
          src={nebula2}
          className="inset-0 absolute object-fit w-full h-full opacity-5 animate-fadeInOut"
          alt="nebula"
        />
      </div>
      <div className="flex absolute flex-col items-center justify-center h-full">
        <button
          className="border-solid text-xl p-6 text-white rounded-md bg-black border-2 border-white hover:bg-white hover:text-black"
          onClick={startGame}
        >
          Enter the mist
        </button>
      </div>
    </div>
  );
};
