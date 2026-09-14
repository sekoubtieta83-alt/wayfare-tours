/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        plum: {
          50: "#f6eef4",
          100: "#ecd9e6",
          400: "#7a3a67",
          600: "#54204a",
          800: "#37142f",
          900: "#240D1F",
        },
        gold: {
          300: "#e9c98a",
          400: "#d9ab54",
          500: "#c1913c",
        },
        sand: {
          50: "#fbf7f0",
          100: "#f3ead9",
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
