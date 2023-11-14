export async function promptUserForSessionChoice() {
  return new Promise((resolve) => {
    const userChoice = window.confirm(
      "Do you want to continue with the saved session from the database? Click 'OK' for database or 'Cancel' for local storage."
    );

    resolve(userChoice ? "DATABASE" : "LOCAL_STORAGE");
  });
}
