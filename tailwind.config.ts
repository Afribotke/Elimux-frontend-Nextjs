import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0D1F3C",
          50: "#E7EBF2",
          100: "#C3CDDD",
          600: "#15315E",
          700: "#0D1F3C",
          800: "#0A1830",
          900: "#070F1F"
        },
        gold: {
          DEFAULT: "#C8973A",
          50: "#FBF4E7",
          100: "#F2E0BD",
          500: "#C8973A",
          600: "#A87D2A"
        }
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
