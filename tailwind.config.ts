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
        primary: "#00AEEF",
        secondary: "#FFD166",
        accent: "#F77F00",
        background: "#FFFFFF",
        textDefault: "#333333",
      },
      textColor: {
        DEFAULT: "#333333",
      },
      backgroundColor: {
        DEFAULT: "#FFFFFF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
