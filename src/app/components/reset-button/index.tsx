// Function to handle session reset that returns a Start over button
import { useState } from "react";
import { TEMP_GAME_STATE_LOCALSTORAGE } from "../auth-button";
import { Modal } from "../modal";

const resetSessionOptions = { optionA: "Yes", optionB: "No" };

export const ResetButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResetConfirmation = (choice: string) => {
    setIsModalOpen(false);
    if (choice === resetSessionOptions.optionA) {
      resetSession();
    }
  };

  const resetSession = async () => {
    try {
      // API call to delete the user's session from the database
      await fetch("/api/adventures", { method: "DELETE" });
      // Clear the local storage
      localStorage.removeItem(TEMP_GAME_STATE_LOCALSTORAGE);
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error("Failed to reset session", error);
    }
  };

  return (
    <>
      <button
        className="hover:text-storyteller text-player"
        onClick={() => setIsModalOpen(true)}
      >
        Start Over
      </button>

      <Modal
        onChoice={handleResetConfirmation}
        title="Start Over"
        description="Are you sure you want to start over? This will delete your current progress."
        buttonLabel={resetSessionOptions}
        isModalOpen={isModalOpen}
      />
    </>
  );
};
