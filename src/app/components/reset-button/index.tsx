// Function to handle session reset that returns a Start over button
export const ResetButton = () => {
  const resetSession = async () => {
    try {
      // API call to delete the user's session from the database
      await fetch("/api/adventures", { method: "DELETE" });
      // Clear the local storage
      localStorage.removeItem("tempGameState");
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error("Failed to reset session", error);
    }
  };

  return (
    <button
      className="text-sm text-player hover:text-storyteller"
      onClick={resetSession}
    >
      Start Over
    </button>
  );
};
