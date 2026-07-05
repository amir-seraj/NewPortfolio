module.exports = {
  darkMode: "class",
  content: [
    "app/**/*.{js,ts,jsx,tsx}",
    "pages/**/*.{js,ts,jsx,tsx}",
    "components/**/*.{js,ts,jsx,tsx}",
    "lib/**/*.{js,ts}",
    // Project `body` HTML now lives in Postgres, not lib/DataProjects.js, so
    // Tailwind's static class scanner can't see those class names anymore.
    // scripts/extract-body-classes.ts regenerates this file from the DB
    // (via the `prebuild` script); it's also committed so builds without DB
    // access (e.g. a fresh clone before seeding) still have a safelist.
    "lib/body-classes.txt",
  ],
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
