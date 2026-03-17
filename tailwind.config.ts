import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B1E1E",
        secondary: "#EBAD30",
        background: "#F7F1E6",
        accent: "#FFFFFF",
        textDefault: "#4A3F35",
      },
      textColor: {
        DEFAULT: "#4A3F35",
      },
      backgroundColor: {
        DEFAULT: "#F7F1E6",
      }
    },
  },
  plugins: [],
};
export default config;
