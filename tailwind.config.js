const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blackpearl: "#17252A",
        atoll: "#2B7A78",
        lightseagreen: "#3AAFA9",
        oyesterbay: "#DEF2F1",
        azure: "#FEFFFF",
      },
    },
  },
  plugins: [],
};
