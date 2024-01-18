import type { Config } from "tailwindcss";

import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      animation: {
        reveal: "reveal 0.7s ease-in-out",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-jetbrains-mono)", ...defaultTheme.fontFamily.mono],
      },
      keyframes: {
        reveal: {
          "0%": {
            opacity: "0",
            filter: "brightness(1) blur(15px)",
            scale: "1.0125",
          },
          "10%": { opacity: "1", filter: "brightness(1.25) blur(10px)" },
          "100%": { opacity: "1", filter: "brightness(1) blur(0)", scale: "1" },
        },
      },
      lineHeight: {
        slacker: "1.75",
      },
      gridTemplateRows: {
        "max-1": "repeat(1, minmax(0, max-content))",
      },
      height: {
        "dynamic-screen": "100dvh",
      },
      minHeight: {
        "dynamic-screen": "100dvh",
      },
      maxHeight: {
        "dynamic-screen": "100dvh",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
