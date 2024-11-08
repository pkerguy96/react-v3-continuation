/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        catrina: {
          100: "#53197b",
          200: "#7a3cc3",
        },
        night: {
          100: "#061d45",
          200: "#33085e",
        },
        aymen: {
          100: "#008080",
          200: "#43e1b0",
          300: "#97fcdc",
        },
        peach: {
          100: "#e1b7ee",
          200: "#eeb7e6",
          300: "#eeb7d0",
        },
        lake: {
          100: "#255dce",
          200: "#1c9fe7",
        },
        sky: {
          100: "#1e8cd6",
          200: "#39bbdb",
        },
      },
    },
  },

  plugins: [],
  darkMode: "class",
};
