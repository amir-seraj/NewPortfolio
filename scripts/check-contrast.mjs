#!/usr/bin/env node
// Contrast validator for the mango accent scale (Task 13: teal -> mango).
// Computes WCAG 2.x contrast ratios for every fg/bg pairing actually used
// in the codebase after the teal -> mango swap, and asserts AA thresholds
// (4.5:1 body text, 3:1 large/bold text >=18px or >=14px bold).
//
// Run: node scripts/check-contrast.mjs

// ---- Palette under test (must match theme.extend.colors.mango in tailwind.config.cjs) ----
const mango = {
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
};

// Site neutrals the mango accent actually sits on top of.
// Note: #202020 (app/(site)/layout.tsx viewport themeColor) is browser-chrome
// metadata only, never a rendered background — the real dark body bg is
// #282828 (styles/globals.css `dark:bg-[#282828]`), so that's what we test.
const neutrals = {
  darkBody: "#282828", // styles/globals.css body dark:bg — the rendered dark background
  white: "#FFFFFF",
  slate300: "#CBD5E1", // Button.module.scss .primary bg
};

// Bespoke muted mango used only in Timeline.module.scss .gapNote (not in the scale).
const gapNote = "#CFA279";

// ---- WCAG contrast math ----
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function srgbToLinear(c) {
  const cs = c / 255;
  return cs <= 0.04045 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const [R, G, B] = [r, g, b].map(srgbToLinear);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(hexA, hexB) {
  const L1 = relativeLuminance(hexA);
  const L2 = relativeLuminance(hexB);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ---- Pairings actually used on the site after the mango swap ----
// size: "body" -> needs >=4.5:1 ; "large" -> needs >=3:1 (>=18px, or >=14px bold)
const pairs = [
  // A. mango accent text on dark backgrounds --------------------------------
  {
    label: "mango-300 on #282828 (dark body bg) — nav/footer/link accents",
    fg: mango[300],
    bg: neutrals.darkBody,
    size: "body",
    min: 4.5,
  },
  {
    label: "mango-300 on mango-950 (hero band / projects nav dark bg)",
    fg: mango[300],
    bg: mango[950],
    size: "body", // Hero strip text is text-xs (12px) bold uppercase — still <14px, treat as body
    min: 4.5,
  },
  {
    label: "mango-100 on mango-950 (nav 'projects' variant links, dark)",
    fg: mango[100],
    bg: mango[950],
    size: "body",
    min: 4.5,
  },
  {
    label: "mango-100 on mango-900 (Projects section committed surface, light-mode class)",
    fg: mango[100],
    bg: mango[900],
    size: "body",
    min: 4.5,
  },
  {
    label: "mango-50 on mango-950 (headings/body copy on deepest surface)",
    fg: mango[50],
    bg: mango[950],
    size: "body",
    min: 4.5,
  },
  {
    label: "mango-200 on mango-950 (Graph/Timeline captions, dark)",
    fg: mango[200],
    bg: mango[950],
    size: "body",
    min: 4.5,
  },
  {
    label: "mango-50 on mango-900 (Nav 'projects' variant + MailMe, light-mode bg)",
    fg: mango[50],
    bg: mango[900],
    size: "body",
    min: 4.5,
  },
  {
    label: "#CFA279 gapNote on mango-900 (Timeline gap note, light-mode surface)",
    fg: gapNote,
    bg: mango[900],
    size: "body", // 12.5px italic
    min: 4.5,
  },
  {
    label: "#CFA279 gapNote on mango-950 (Timeline gap note, dark surface)",
    fg: gapNote,
    bg: mango[950],
    size: "body",
    min: 4.5,
  },

  // B. dark text on mango button / CTA fill ---------------------------------
  // Hero.tsx:71 ships `bg-mango-300 ... text-mango-950 ... hover:bg-mango-200`.
  {
    label: "mango-950 text on mango-300 (Hero CTA default fill)",
    fg: mango[950],
    bg: mango[300],
    size: "large", // uppercase bold text-sm (14px bold)
    min: 4.5, // validated at body threshold anyway for margin
  },
  {
    label: "mango-950 text on mango-200 (Hero CTA hover fill)",
    fg: mango[950],
    bg: mango[200],
    size: "large",
    min: 4.5,
  },
  {
    label: "mango-900 text on #FFFFFF (Graph/Projects view-toggle active pill, CTA pill)",
    fg: mango[900],
    bg: neutrals.white,
    size: "body",
    min: 4.5,
  },
  {
    label: "mango-900 text on slate-300 (Button.module.scss .primary)",
    fg: mango[900],
    bg: neutrals.slate300,
    size: "body",
    min: 4.5,
  },

  // C. mango-700-ish text on white (light mode accent text/links) ----------
  {
    label: "mango-700 on #FFFFFF (headline accent, links, hovers — light mode)",
    fg: mango[700],
    bg: neutrals.white,
    size: "body",
    min: 4.5,
  },
  {
    label: "mango-800 on #FFFFFF (Detail.tsx tag badge text, light mode)",
    fg: mango[800],
    bg: neutrals.white,
    size: "body",
    min: 4.5,
  },
  {
    label: "mango-600 on #FFFFFF (hover states, light mode, e.g. GetInTouch)",
    fg: mango[600],
    bg: neutrals.white,
    size: "body",
    min: 4.5,
  },
];

let allPass = true;
console.log("Mango accent — WCAG AA contrast audit\n");
console.log(
  "pair".padEnd(74),
  "ratio".padStart(7),
  " min",
  "  result"
);
console.log("-".repeat(100));
for (const p of pairs) {
  const ratio = contrastRatio(p.fg, p.bg);
  const pass = ratio >= p.min;
  allPass = allPass && pass;
  console.log(
    p.label.padEnd(74),
    ratio.toFixed(2).padStart(7),
    String(p.min).padStart(4),
    pass ? "  PASS" : "  FAIL"
  );
}
console.log("-".repeat(100));
console.log(allPass ? "\nAll pairings pass WCAG AA.\n" : "\nSOME PAIRINGS FAIL.\n");

console.log("Mango scale:");
for (const [k, v] of Object.entries(mango)) console.log(`  mango-${k.padEnd(4)} ${v}`);

process.exit(allPass ? 0 : 1);
