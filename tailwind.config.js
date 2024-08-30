// tailwind.config.js

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dellbar: ["Dellbar"],
        noor: ["Noor"],
        noorBold: ["NoorBold"],
        noorLight: ["NoorLight"],
        noorSemiBold: ["NoorSemiBold"],
        space: ["SpaceMono"],
      },
    },
  },
  plugins: [],
};
