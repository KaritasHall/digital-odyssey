"use client";
import { CreateMessage, Message, useChat } from "ai/react";
import { useCallback, useState } from "react";
import { StartScreen } from "./components/start-screen";
import { ThemeName, applyTheme } from "../themes/utils";
import { themes } from "@/themes";
import { useEffect } from "react";
import { useRef } from "react";
import { ErrorMessage } from "./api/chat/types";
import { CoffeeButton } from "./components/coffe-button";
import Link from "next/link";
import { CoffeeIcon } from "./components/icons/coffee";
import { GithubIcon } from "./components/icons/github";
import { LinkedinIcon } from "./components/icons/linkedin";
import { useSession } from "next-auth/react";
import saveGame, { Adventure } from "./components/save-game";
import { TEMP_GAME_STATE_LOCALSTORAGE } from "./components/auth-button";
import { Navbar } from "./components/navbar";
import { Modal } from "./components/modal";

// Generate random theme on page load
const getRandomTheme = () => {
  const themeKeys = Object.keys(themes);
  const randomIndex = Math.floor(Math.random() * themeKeys.length);
  return themeKeys[randomIndex] as ThemeName;
};

const RANDOM_THEME = getRandomTheme();

let errorStatus: ErrorMessage | undefined = undefined;

const userOptions = {
  optionA: "Load saved game",
  optionB: "Continue with new game",
};

export default function Chat() {
  const [kickstartedGame, setKickstartedGame] = useState(false);
  const [savedMessageCount, setSavedMessageCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    error,
    isLoading,
    setMessages,
  } = useChat();

  const { status } = useSession();

  // Load saved game from database (we need the initial message + all following messages)
  const loadAdventureFromDatabase = useCallback(
    (data: Adventure) => {
      const savedAdventure: Message[] = [];
      savedAdventure.push({
        id: "initial",
        role: "user",
        content: data.initialUserMessage,
      });

      data.messages.forEach((message, index) => {
        savedAdventure.push({
          id: index.toString(),
          role: message.role,
          content: message.content ?? "",
        });
      });

      setMessages(savedAdventure);
    },
    [setMessages]
  );

  // Handle user choice between local storage and database session
  const handleUserChoice = async (userChoice: string) => {
    const response = await fetch("/api/adventures");
    const tempGameState = localStorage.getItem(TEMP_GAME_STATE_LOCALSTORAGE);
    setIsModalOpen(false);

    if (userChoice === userOptions.optionA) {
      const data = (await response.json()) as Adventure;
      loadAdventureFromDatabase(data);
      localStorage.removeItem(TEMP_GAME_STATE_LOCALSTORAGE);
    } else if (tempGameState != null && userChoice === userOptions.optionB) {
      const savedAdventure = JSON.parse(tempGameState) as Message[];
      setMessages(savedAdventure);
      localStorage.removeItem(TEMP_GAME_STATE_LOCALSTORAGE);
    }
    setGameStarted(true);
  };

  // Save game to database. Only save if there are new messages.
  const saveChat = useCallback(() => {
    if (messages.length > savedMessageCount) {
      const adventure: Adventure = {
        initialUserMessage: messages[0].content,
        messages: messages.slice(1).map((m) => ({
          content: m.content,
          role: m.role,
        })),
      };
      if (status === "authenticated") {
        saveGame(adventure);
      }
      setSavedMessageCount(messages.length);
    }
  }, [messages, savedMessageCount, status]);

  // Only save when message has been sent to user (not mid stream)
  useEffect(() => {
    if (isLoading === false && messages.length > 0) {
      saveChat();
    }
  }, [isLoading, messages.length, saveChat]);

  if (error) {
    errorStatus = JSON.parse(error.message) as ErrorMessage;
  } else {
    errorStatus = undefined;
  }

  // New game = user is not logged in
  const startNewGame = useCallback(() => {
    const initialMessage: CreateMessage = {
      role: "user",
      content: "Create an opening scene for my text adventure game.",
    };

    append(initialMessage);
    setGameStarted(true);
  }, [append]);

  // Fetch saved game = user is logged in
  const startGame = useCallback(async () => {
    // When user starts new game without logging in, it gets saved to local storage
    // This allows new users to continue their game after logging in
    if (status === "authenticated") {
      const tempGameState = localStorage.getItem(TEMP_GAME_STATE_LOCALSTORAGE);
      const response = await fetch("/api/adventures");
      const sessionExistsInDb = response.status !== 404;

      // If both local storage and database session exists for the user
      // Prompt user to choose between the two
      if (tempGameState && sessionExistsInDb) {
        // Prompt user to choose between local storage session or database session
        setIsModalOpen(true);
        return;
      }

      if (tempGameState) {
        const savedAdventure = JSON.parse(tempGameState) as Message[];
        setMessages(savedAdventure);
        localStorage.removeItem(TEMP_GAME_STATE_LOCALSTORAGE);
        setGameStarted(true);
        return;
      }

      if (sessionExistsInDb) {
        const data = (await response.json()) as Adventure;
        loadAdventureFromDatabase(data);
        setGameStarted(true);
        return;
      }

      startNewGame();
    } else {
      startNewGame();
    }
  }, [setMessages, startNewGame, status, loadAdventureFromDatabase]);

  // Auto start game if user is logged in
  useEffect(() => {
    if (status === "authenticated" && !gameStarted && !kickstartedGame) {
      setKickstartedGame(true);
      startGame();
    }
  }, [status, setGameStarted, startGame, gameStarted, kickstartedGame]);

  // Scrollable div for the game content
  const divRef = useRef<HTMLDivElement>(null);

  // Div scrolls to the bottom of the div when new message is added
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTo({
        top: divRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    applyTheme(RANDOM_THEME);
  }, []);

  return (
    <main>
      {gameStarted ? (
        <section className="bg-background h-[100dvh] w-full flex flex-col items-center justify-between">
          <div className="w-full">
            <Navbar gameStarted={gameStarted} messages={messages} />
          </div>

          <div className="flex flex-col w-full max-w-[1100px] text-sm lg:text-base h-[calc(100%-44px)] lg:h-[calc(100%-64px)] relative pt-10">
            <div
              className="overflow-y-scroll adventure-scrollbar relative h-[calc(100%-166px)] lg:h-[calc(100%-206px)] px-6 lg:px-0"
              ref={divRef}
            >
              <div className="sticky top-0 w-full bg-gradient-to-b h-6 from-background" />
              {/* Rate Limit Reached Error */}
              {errorStatus?.status === 429 && (
                <>
                  <h1 className="text-storyteller">
                    Dear friend, the veil between worlds is thickening and our
                    time has run out... <br />
                    If you are seeing this message it means that the monthly
                    cost limit for the AI has been reached
                    <br />
                    If you enjoyed this experience, you can show your support by
                    buying me a coffee.
                  </h1>
                  <CoffeeButton />
                </>
              )}

              {/* Other Errors */}
              {errorStatus !== undefined && errorStatus.status !== 429 && (
                <h1 className="text-storyteller">
                  An evil force has prevented me from continuing my story...
                  <br /> ({errorStatus.message}) <br />
                  Please try again later, friend.
                </h1>
              )}

              {/* Messages */}
              {errorStatus === undefined &&
                messages.slice(1).map((m) => (
                  <div
                    key={m.id}
                    className={
                      m.role === "user"
                        ? "text-player py-10 italic"
                        : "text-storyteller leading-6 lg:leading-7"
                    }
                  >
                    {m.content}
                  </div>
                ))}
            </div>

            {messages.length >= 2 && (
              <>
                <form
                  className="flex-col w-full flex gap-8 items-center justify-center md:items-start animate-fadeIn bottom-0 absolute px-6 lg:px-0 h-[166px] lg:h-[206px]"
                  onSubmit={handleSubmit}
                >
                  <input
                    className="rounded-md p-2 bg-background text-player w-full md:w-1/2 placeholder-player placeholder:opacity-80 placeholder:italic focus:outline-none focus:placeholder-transparent border border-player"
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
              </>
            )}
          </div>
          {/* Actual height 44px on mobile or 64px for md + */}
          <footer className="justify-center h-[44px] lg:h-[64px] flex gap-8 text-player">
            <Link
              target="_blank"
              href="www.linkedin.com/in/karitas-w-halldórsdóttir-151b86159"
            >
              <LinkedinIcon
                className="hover:fill-storyteller fill-player"
                width={24}
                height={24}
              />
            </Link>
            <Link
              target="_blank"
              href="https://github.com/KaritasHall/digital-odyssey"
            >
              <GithubIcon
                className="hover:fill-storyteller fill-player"
                width={24}
                height={24}
              />
            </Link>
            <Link target="_blank" href="https://www.buymeacoffee.com/karitas">
              <CoffeeIcon
                className="hover:fill-storyteller fill-player"
                width={24}
                height={24}
              />
            </Link>
          </footer>
        </section>
      ) : (
        <StartScreen startGame={startGame} />
      )}
      <Modal
        onChoice={handleUserChoice}
        title="Save new game?"
        description="You already have a saved game. Do you want to load it or continue with current game?"
        buttonLabel={userOptions}
        isModalOpen={isModalOpen}
      />
    </main>
  );
}
