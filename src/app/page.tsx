"use client";

import { CreateMessage, useChat } from "ai/react";
import { useCallback, useState } from "react";
import { StartScreen } from "./Components/StartScreen/StartScreen";

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

  return (
    <main>
      {gameStarted ? (
        <>
          <section className="mb-auto m-20">
            {messages.slice(1).map((m) => (
              <div className="mb-4" key={m.id}>
                {m.role === "user" ? "User: " : "AI: "}
                {m.content}
              </div>
            ))}
          </section>
          <form className="flex space-x-4 m-20" onSubmit={handleSubmit}>
            <input
              className="rounded-md p-2 text-black"
              value={input}
              onChange={handleInputChange}
              placeholder="Say something..."
            />
            <button
              className="border-solid border-2 border-white p-2 rounded-md"
              type="submit"
            >
              Send
            </button>
          </form>
        </>
      ) : (
        <StartScreen startGame={startGame} />
      )}
    </main>
  );
}
