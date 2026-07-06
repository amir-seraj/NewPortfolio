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

/** Composite `top` at `alpha` over an opaque `under`; returns hex. */
function blend(top, under, alpha) {
  const t = hexToRgb(top);
  const u = hexToRgb(under);
  const c = (a, b) => Math.round(a * alpha + b * (1 - alpha));
  return (
    "#" +
    [c(t.r, u.r), c(t.g, u.g), c(t.b, u.b)]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
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

  // D. CMS body content after scripts/migrate-body-colors.ts (Task 14) -----
  // Case-study info panels: `bg-mango-50` + `text-mango-900` headings.
  {
    label: "mango-900 on mango-50 (case-study info panel, light — migrated content)",
    fg: mango[900],
    bg: mango[50],
    size: "body",
    min: 4.5,
  },
  // Gradient result banners: `from-mango-600 to-mango-800 text-white`.
  // Both gradient ends must hold the white copy on their own.
  {
    label: "#FFFFFF on mango-600 (migrated gradient banner, light end)",
    fg: neutrals.white,
    bg: mango[600],
    size: "body",
    min: 4.5,
  },
  {
    label: "#FFFFFF on mango-800 (migrated gradient banner, dark end)",
    fg: neutrals.white,
    bg: mango[800],
    size: "body",
    min: 4.5,
  },
  // Same banners' supporting copy is `text-lg opacity-90` (18px = large):
  // white at 90% alpha composited onto the darker gradient start.
  {
    label: "white@90% on mango-600 (banner body copy, text-lg -> large)",
    fg: blend(neutrals.white, mango[600], 0.9),
    bg: mango[600],
    size: "large",
    min: 3,
  },
  // Dark-mode panel tint: `dark:bg-mango-900/20` composited over #282828,
  // holding `dark:text-mango-100` headings.
  {
    label: "mango-100 on mango-900@20% over #282828 (panel, dark — migrated)",
    fg: mango[100],
    bg: blend(mango[900], neutrals.darkBody, 0.2),
    size: "body",
    min: 4.5,
  },

  // E. Payload admin theme (Task 16) — app/(payload)/custom.scss ----------
  // Primary buttons (Save/Publish/login submit — `.btn--style-primary`),
  // identical in both admin themes (hardcoded, not theme-token-driven).
  {
    label: "admin: mango-950 on mango-300 (primary button fill)",
    fg: mango[950],
    bg: mango[300],
    size: "body",
    min: 4.5,
  },
  {
    label: "admin: mango-950 on mango-200 (primary button hover fill)",
    fg: mango[950],
    bg: mango[200],
    size: "body",
    min: 4.5,
  },
  // --theme-success-* remap (focus rings, Banner/toast, Pill, Dropzone).
  // Light admin theme:
  {
    label: "admin: #874606 on mango-100 (banner/toast success text, light)",
    fg: "#874606",
    bg: mango[100],
    size: "body",
    min: 4.5,
  },
  {
    label: "admin: #874606 on mango-200 (banner/toast success hover, light)",
    fg: "#874606",
    bg: mango[200],
    size: "body",
    min: 4.5,
  },
  {
    label: "admin: mango-800 on #FCDDBD success-150 (status pill, light)",
    fg: mango[800],
    bg: "#FCDDBD",
    size: "body",
    min: 4.5,
  },
  {
    label: "admin: #2F2F2F elevation-800 on #FCDDBD success-150 (dropzone, light)",
    fg: "#2F2F2F",
    bg: "#FCDDBD",
    size: "body",
    min: 4.5,
  },
  // Dark admin theme:
  {
    label: "admin: #FAC38C on mango-900 (banner/toast success text, dark)",
    fg: "#FAC38C",
    bg: mango[900],
    size: "body",
    min: 4.5,
  },
  {
    label: "admin: #FAC38C on #763D05 success-200 dark (banner/toast hover, dark)",
    fg: "#FAC38C",
    bg: "#763D05",
    size: "body",
    min: 4.5,
  },
  {
    label: "admin: mango-200 on #653404 success-150 dark (status pill, dark)",
    fg: mango[200],
    bg: "#653404",
    size: "body",
    min: 4.5,
  },
  {
    label: "admin: #FFFFFF elevation-1000 on #653404 success-150 dark (dropzone, dark)",
    fg: "#FFFFFF",
    bg: "#653404",
    size: "body",
    min: 4.5,
  },
  // Graphite surface shift sanity check — default admin body text
  // (--theme-text, untouched) on the new dark elevation-0/100 surfaces.
  {
    label: "admin: #FFFFFF on #1C1C1C (elevation-0, dark admin surface)",
    fg: "#FFFFFF",
    bg: "#1C1C1C",
    size: "body",
    min: 4.5,
  },
  {
    label: "admin: #FFFFFF on #282828 (elevation-100, dark admin surface)",
    fg: "#FFFFFF",
    bg: "#282828",
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
