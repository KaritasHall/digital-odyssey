import Link from "next/link";
// Simple button that shows the text "Buy me a coffee" and links to the Buy Me a Coffee page

export const CoffeeButton = () => {
  return (
    <Link
      className="bg-transparent border-2 border-storyteller p-4 rounded-md text-storyteller hover:text-player hover:border-player"
      target="_blank"
      href="https://www.buymeacoffee.com/karitas"
    >
      Buy me a coffee ☕
    </Link>
  );
};
