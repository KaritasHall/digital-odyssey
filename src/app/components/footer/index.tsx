import Link from "next/link";
import { CoffeeIcon } from "../icons/coffee";
import { GithubIcon } from "../icons/github";
import { LinkedinIcon } from "../icons/linkedin";

{
  /* Actual height 44px on mobile or 64px for md + */
}
export const Footer = () => {
  return (
    <footer className="justify-center h-[44px] lg:h-[64px] flex gap-8 text-player">
      <Link
        target="_blank"
        href="www.linkedin.com/in/karitas-w-halldórsdóttir-151b86159"
      >
        <LinkedinIcon className="hover:fill-storyteller fill-player h-4 w-4 md:w-6 md:h-6" />
      </Link>
      <Link
        target="_blank"
        href="https://github.com/KaritasHall/digital-odyssey"
      >
        <GithubIcon className="hover:fill-storyteller fill-player  h-4 w-4 md:w-6 md:h-6" />
      </Link>
      <Link target="_blank" href="https://www.buymeacoffee.com/karitas">
        <CoffeeIcon className="hover:fill-storyteller fill-player h-4 w-4 md:w-6 md:h-6" />
      </Link>
    </footer>
  );
};
