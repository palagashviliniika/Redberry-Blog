/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "customPurple": {
          DEFAULT: "#5D37F3"
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}