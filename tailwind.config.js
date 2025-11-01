/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    colors: {
      "custom-red": "#ff3333",
      "dark-red": "#ff1a1a",
      "accent-color": "#63B995",
      ...require('tailwindcss/colors'),
    },
    
    extend: {
      fontFamily: {
        sans: ['"PT Sans"', 'sans-serif']
      },

    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

