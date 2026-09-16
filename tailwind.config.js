/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Ghana flag inspired palette
        forest: {
          50: "#eef5ef",
          100: "#d6e8d9",
          400: "#4a8c5a",
          600: "#2f6b3f",
          800: "#1b4529",
          900: "#12301c",
        },
        kente: {
          300: "#f2cf6b",
          400: "#e8b731",
          500: "#cf9c18",
          600: "#a97c0f",
        },
        clay: {
          400: "#d95b43",
          500: "#c0392b",
          600: "#9c2b1f",
        },
        cream: {
          50: "#fdfaf3",
          100: "#f7f0e2",
          200: "#ece0c9",
        },
        ink: {
          700: "#3a3a36",
          900: "#1a1a17",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
