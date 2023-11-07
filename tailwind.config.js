/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "white": "#e7ecef",
      "dark-blue": "#274c77",
      "mid-blue": "#6096ba",
      "light-blue": "#a3cef1",
      "brown": "#8b8c89",
      "grey": "#f1f5f9",
      "green": "#8fb0ad",
      "red": "#ff3333",
      "dark-red": "#ff1a1a",
    },
    extend: {
      fontFamily: {
        sans: ['"PT Sans"', 'sans-serif']
      }
    },
  },
  plugins: [],
}

