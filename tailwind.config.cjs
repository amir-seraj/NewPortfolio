module.exports = {
  // "media", not "class": the dark theme follows the visitor's OS preference.
  // The old class strategy needed hooks/theme.ts to stamp `.dark` on <html>,
  // but no component ever mounted it, so every dark: style was unreachable.
  // A toggle would add UI chrome, a tab stop, persisted state and a no-FOUC
  // script for a 30-second-visit audience (PRODUCT.md: "One address, no
  // form" — no settings, no friction). System preference makes both fully
  // styled themes reachable with zero JS; viewport themeColor already keys
  // off prefers-color-scheme the same way (see Task 14 report, decision #2).
  darkMode: "media",
  content: [
    "app/**/*.{js,ts,jsx,tsx}",
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
      colors: {
        // Brand accent (evolved from teal/emerald — see PRODUCT.md, 2026-07-06).
        // Tuned so every pairing actually used on the site clears WCAG AA;
        // see scripts/check-contrast.mjs for the validated pairs.
        mango: {
          50: "#FEF7F0",
          100: "#FDE8D3",
          200: "#FBD1A7",
          300: "#F9B571",
          400: "#F7993B",
          500: "#F5800A",
          600: "#AB5907",
          700: "#984F06",
          800: "#763D05",
          900: "#532B03",
          950: "#2C1702",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
