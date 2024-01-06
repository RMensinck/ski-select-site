/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    colors: {
      "custom-white": "#e7ecef",
      "dark-blue": "#274c77",
      "mid-blue": "#6096ba",
      "light-blue": "#a3cef1",
      "custom-brown": "#8b8c89",
      "custom-grey": "#f1f5f9",
      "custom-green": "#8fb0ad",
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

