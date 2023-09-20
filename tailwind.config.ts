import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slowPulse: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
        },
        invertPulse: {
          "0%, 100%": {
            opacity: "0.3",
          },
          "50%": {
            opacity: "1",
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
      },

      animation: {
        slowPulse: "slowPulse 4s cubic-bezier(0.4, 0, 0.6, 0.4) infinite",
        invertPulse: "invertPulse 4s cubic-bezier(0.4, 0, 0.6, 0.4) infinite",
        fadeIn: "fadeIn 10s infinite",
        fadeInOut: "fadeInOut 15s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
