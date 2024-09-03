module.exports = {
  darkMode: "class",
  content: ["pages/**/*.{js,ts,jsx,tsx}", "components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      body: ["Mont", "sans-serif"],
      heading: ["Pop", "sans-serif"],
      mono: ["Mont", "monospace"],
    },
    extend: {
      maxWidth: {
        "8xl": "1920px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
