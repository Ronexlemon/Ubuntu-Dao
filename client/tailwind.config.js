/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        about: "url('../src/assets/about.svg')",
        landing: "url('../src/assets/background.svg')",
      },
      backgroundColor: {
        button: "#000",
        section: "#F1F1F4",
      },
      colors: {
        text: "#282828",
      },
      fontSize: {},
      height: {},
      width: {},
    },

    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};
