"use client";

import { CreateMessage, useChat } from "ai/react";
import { useCallback, useState } from "react";
import { StartScreen } from "./Components/StartScreen/StartScreen";
import { ThemeName, applyTheme } from "../themes/utils";
import { themes } from "@/themes";
import { useEffect } from "react";
import { useRef } from "react";
import { ErrorMessage } from "./api/chat/types";

// Generate random theme on
const getRandomTheme = () => {
  const themeKeys = Object.keys(themes);
  const randomIndex = Math.floor(Math.random() * themeKeys.length);
  return themeKeys[randomIndex] as ThemeName;
};

const RANDOM_THEME = getRandomTheme();

let errorStatus: ErrorMessage | undefined = undefined;

export default function Chat() {
  const [gameStarted, setGameStarted] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, append, error } =
    useChat();

  if (error) {
    errorStatus = JSON.parse(error.message) as ErrorMessage;
    console.log("HALLÓ", errorStatus);
  } else {
    errorStatus = undefined;
  }

  const startGame = useCallback(() => {
    const initialMessage: CreateMessage = {
      role: "user",
      content: "Create an opening scene for my text adventure game.",
    };

    append(initialMessage);
    setGameStarted(true);
  }, [append]);

  // Scrollable div for the game content
  const divRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the div when new message is added
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    applyTheme(RANDOM_THEME);
  }, []);

  return (
    <main>
      {gameStarted ? (
        <section className="bg-background h-screen w-full p-10 md:p-20 ">
          <div className="h-2/3 md:h-1/2 overflow-y-scroll" ref={divRef}>
            {/* Rate Limit Reached Error */}
            {errorStatus?.status === 429 && (
              <h1 className="text-storyteller">
                Dear friend, the veil between worlds is thickening and our time
                has run out... <br />
                (Token limit reached - please try again later)
              </h1>
            )}

            {/* Other Errors */}
            {errorStatus !== undefined && errorStatus.status !== 429 && (
              <h1 className="text-storyteller">{errorStatus.message}</h1>
            )}

            {/* Messages */}
            {errorStatus === undefined &&
              messages.slice(1).map((m) => (
                <div
                  key={m.id}
                  className={` ${
                    m.role === "user" ? "text-player py-10" : "text-storyteller"
                  }`}
                >
                  {m.content}
                </div>
              ))}
          </div>

          <form
            className="flex-col flex gap-8 mt-16 md:mt-0 lg:mt-20 items-center md:items-start"
            onSubmit={handleSubmit}
          >
            <input
              className="rounded-md p-2 bg-background text-player w-full md:w-1/2 lg:w-1/4 placeholder-player placeholder:opacity-80 placeholder:italic focus:placeholder-transparent focus:outline-none border border-player focus:border-none"
              value={input}
              onChange={handleInputChange}
              placeholder="How do you wish to proceed?"
              aria-label="Player input"
            />
            <button
              className="border-solid border-2 border-storyteller p-2 rounded-md text-storyteller bg-inherit hover:text-player hover:border-player"
              type="submit"
            >
              PROCEED
            </button>
          </form>
        </section>
      ) : (
        <StartScreen startGame={startGame} />
      )}
    </main>
  );
}
