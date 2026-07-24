import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#27343a",
        sky: "#aee8f8",
        mist: "#cdeffc",
        ochre: "#d59b3c",
        sandstone: "#ded1b6",
      },
      fontFamily: {
        sans: ["Avenir Next", "Avenir", "Helvetica Neue", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
