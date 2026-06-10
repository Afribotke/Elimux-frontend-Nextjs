/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0D1F3C",
        gold: "#C8973A",
        ink: "#1A2035",
      },
    },
  },
  plugins: [],
};
