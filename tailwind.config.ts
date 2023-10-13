import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        storyteller: "var(--color-storyteller)",
        player: "var(--color-player)",
        background: "var(--color-background)",
      },
      keyframes: {
        slowPulse: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
        },

        fadeInOut: {
          "0%, 100%": {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.1)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },

      animation: {
        slowPulse: "slowPulse 4s cubic-bezier(0.4, 0, 0.6, 0.4) infinite",
        fadeInOut: "fadeInOut 15s infinite",
        fadeIn: "fadeIn 2s ease-in-out",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

export default config;
