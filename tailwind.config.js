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
        },
        "customBlack": {
          DEFAULT: "#1A1A1F"
        },
        "customGray": {
          DEFAULT: "#E4E3EB",
          fill: "#FCFCFD",
          plc: "#85858D",
          page: "#FBFAFF",
          uploaded: "#F2F2FA"
        },
        "inputBG": {
          DEFAULT: "#F9F9FA",
          error: "#FAF2F3",
          correct: "#F8FFF8",
          focus: "#F7F7FF"
        },
        "border": {
          DEFAULT: "#E4E3EB",
          error: "#EA1919",
          correct: "#14D81C",
          focus: "#5D37F3"
        },
        "customRed": {
          DEFAULT: "#EA1919"
        },
        "textGray": {
          DEFAULT: "#85858D",
          dark: "#404049"
        },
        "imgInput": {
          DEFAULT: "#F4F3FF",
          hover: "#F1EFFB"
        }
      },
      resize: {
        none: 'none',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}