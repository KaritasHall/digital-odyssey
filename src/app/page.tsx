"use client";

import { CreateMessage, useChat } from "ai/react";
import { useCallback, useState } from "react";
import { StartScreen } from "./Components/StartScreen/StartScreen";
import { applyTheme } from "../themes/utils";
import { themes } from "@/themes";
import { useEffect } from "react";

export default function Chat() {
  const [gameStarted, setGameStarted] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, append } =
    useChat();

  const startGame = useCallback(() => {
    const initialMessage: CreateMessage = {
      role: "user",
      content: "Create an opening scene for my text adventure game.",
    };

    append(initialMessage);
    setGameStarted(true);
  }, [append]);

  // Apply theme
  const getRandomTheme = () => {
    const themeKeys = Object.keys(themes);
    const randomIndex = Math.floor(Math.random() * themeKeys.length);
    return themeKeys[randomIndex];
  };

  const [theme, setTheme] = useState(getRandomTheme());
  // Run applyTheme on every new render
  useEffect(() => {
    return applyTheme(theme);
  }, [theme]);

  console.log(theme);

  return (
    <main>
      {gameStarted ? (
        <div>
          <section className="bg-background h-screen w-full px-20 pt-20">
            {messages.slice(1).map((m) => (
              <div
                key={m.id}
                className={` ${
                  m.role === "user" ? "text-player py-10" : "text-storyteller"
                }`}
              >
                {m.content}
              </div>
            ))}

            <form className="flex space-x-4 my-20" onSubmit={handleSubmit}>
              <input
                className="rounded-md p-2 bg-background text-player w- max-w-[50%]"
                value={input}
                onChange={handleInputChange}
                placeholder="What do you want to do?"
                aria-label="Player input"
              />
              <button
                className="border-solid border-2 border-white p-2 rounded-md text-white"
                type="submit"
              >
                Send
              </button>
            </form>
          </section>
        </div>
      ) : (
        <StartScreen startGame={startGame} />
      )}
    </main>
  );
}
