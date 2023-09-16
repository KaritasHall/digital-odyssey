"use client";

import { CreateMessage, useChat } from "ai/react";
import { useCallback, useEffect, useState } from "react";

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
    <main className="m-20">
      {gameStarted ? (
        <>
          <section className="mb-auto m">
            {messages.slice(1).map((m) => (
              <div className="mb-4" key={m.id}>
                {m.role === "user" ? "User: " : "AI: "}
                {m.content}
              </div>
            ))}
          </section>
          <form className="flex space-x-4" onSubmit={handleSubmit}>
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
        <button onClick={startGame}>start game</button>
      )}
    </main>
  );
}
