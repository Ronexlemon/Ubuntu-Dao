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
        section: "#F3F3F3",
        sidebg: "#FEE1D0",
        sideHover: "#ece8ff",
        dashboardButton: "#39425C",
        dashHeading: "#C4F1FF",
      },
      colors: {
        text: "#282828",
        sideText: "#39425C",
        dashHeading: "#030067",
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
