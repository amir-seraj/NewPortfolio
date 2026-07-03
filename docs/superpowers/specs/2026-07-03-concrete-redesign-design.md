# amirseraj.ir — Concrete Redesign (Night Pour)

**Date:** 2026-07-03
**Status:** awaiting owner approval
**Decided via:** three option rounds on the artifact board (six languages → Signal×Concrete iteration → execution picks), independently critic-scored, impeccable skill applied throughout.

## Locked decisions

| Axis | Pick | Score |
|---|---|---|
| Design language | Concrete (brutalist) — all sections | — |
| Palette | **Night Pour** — bg `#161616`, chalk `#e6e6e6`, accent `#ff4b21` | — |
| Type | **Archivo Black** (display) + **Archivo** variable (body) | — |
| Motion tier | **Measured** | — |
| Nav | Corner Frame — **Ledger** execution | 8.75 |
| Hero | Rebuttal — **Quiet Ledger** execution | 8.3 |
| About + Skills | Census — **As Filed** execution | 8.5 |
| Projects | Poster Wall — **Quiet Proof** execution | 8.5 |
| Contact | Tear-Off — **Street Paste** execution | 8.0 |
| Footer | Grid Bank — **As Poured** execution | 8.5 |

## System contracts

### Palette (Night Pour)
Sections were specced on light concrete; global mapping: concrete `#ececec` → `#161616`, ink `#111111` → `#e6e6e6` (chalk), vermilion `#e63311` → `#ff4b21`. Rules:

- Chalk on night = 14.5:1; body text always chalk.
- `#ff4b21` on `#161616` = 5.41:1 — the accent **may** be body-size text (links, census figures, small stamps). This is unique to Night Pour; use it, but **halve the accent budget** vs the light specs: outlined type and 2px borders glow on dark.
- Inverted cells (the census/footer "filled" state) = chalk background + night text.
- Outlined display type: reduce `-webkit-text-stroke` from 2px to 1.5px on dark to control glow.
- Tokens as CSS custom properties: `--night`, `--chalk`, `--pour` (+ derived `--chalk-60` etc.). No other colors exist.

### Type
- Archivo Black, subset to used glyphs (~14KB woff2) + Archivo variable text subset (~18KB). Self-hosted in `public/fonts/` with `@font-face` (repo is Next 12 — no `next/font`; do not add a Google Fonts `<link>`).
- `font-display: swap` with metric-matched Arial Black fallback (`size-adjust`/`ascent-override`) — zero CLS. Fonts preloaded before the load stamp runs (Measured-tier requirement).
- Display letter-spacing floor −0.04em; hero clamp ceiling ≤6rem-equivalent per impeccable; `text-wrap: balance` on headings.

### Motion (Measured tier, reconciled with picked executions)
Two sanctioned behavior classes, all hard cuts, zero easing, no transitions property anywhere:

1. **Once-per-visit load stamp** — the hero band wipe (`clip-path` in `steps(5)`, ≤500ms, sessionStorage-gated, replayable via the period square).
2. **One-frame state flips** — hover/tap/click: nav corner flips, poster spec-chip inversion, footer cell fills, tear-off tear (two hard frames), census cell inversion.

Additionally allowed because they are *measured, user-initiated, discrete* (the executions were picked for exactly this honesty):
- Nav gauge swaps (reports the project nearest viewport center; no timers).
- Hero one-way inversion latch at 50% scroll (+hysteresis; listener removed after firing).
- Footer visited-cell fills (sessionStorage route flags).
- Street Paste consequences: torn-tab pile + 0.15°/tear poster sag (deterministic, recomputed from sessionStorage).

**Banned:** marquees, timer-driven cycling, easing curves, scroll-linked interpolation, autonomous motion of any kind.
**prefers-reduced-motion:** load stamp skipped (final layout instantly); all one-frame state changes remain (zero animation frames); pile/sag replaced by a plain "TABS TAKEN: n" state.

### Accessibility & perf
- Every interactive cell/tab is a real `<button>`/`<a>` with `aria-pressed`/`aria-label`; focus-visible = 2px `--pour` outline.
- Tap targets ≥44px; hover-only information does not exist anywhere.
- Cropped display type: crop ≤20% of glyph area, one edge, full text in `aria-label`.
- Budgets: nav JS <1.5KB; hero <1KB; whole-page JS excluding React runtime <8KB; no images in chrome; zero CLS.

## Section specs (Night Pour values)

### 1. Nav — Corner Frame / Ledger
Four fixed corner blocks (2px chalk borders, night fill): AMIR / SERAJ (top, `clamp(24px,2.4vw,32px)`), WORK / MAIL ME (bottom). Top-center lozenge (2px chalk border, fixed 170px measure): "HCI — GENOVA" in the hero; past hero it becomes a **gauge** reporting whichever project article is nearest viewport center (IntersectionObserver, no timers); click jumps to `#work`. Accent appears **nowhere at rest** — only under pointer/finger (one-frame `--pour` fill). Mobile <720px: two 48px bands (top: AMIR SERAJ + gauge; bottom: WORK | MAIL ME); <400px gauge falls back to ordinals "02/03". Touch: no compact halving, targets stay ≥44px.

### 2. Hero — Rebuttal / Quiet Ledger
100svh, 55/45 bands split by 2px chalk rule. Top (night): "MACHINES DON'T FEEL." chalk Archivo Black `clamp(2.75rem,7vw,8.25rem)`, 0.35ch crop off the M; the period is a **`--pour` square button** (44px hit area) that replays the stamp. Bottom (`--pour`): "SO I TEACH THEM TO NOTICE." night text, final 0.75ch cropping right. Info block bottom-right (34ch): name / AFFECTIVE COMPUTING & EMOTION RECOGNITION / MSc — GENOVA, ITALY / email / button "SEE THE EVIDENCE ↓". Load: 5-step hard wipe. At 50% scroll: one-way inversion — after it, the accent survives only as the period square + button outline (**the retreat**). Breakpoint 640px: predetermined line breaks, crops preserved.

### 3. About — Census / As Filed
Full-bleed grid; 2px gaps ARE the grid (gap color = chalk on night ground — i.e. container bg `--chalk`, cells `--night`). Desktop 6 cols × 4 rows; SERAJ spans 4×2, `clamp(7rem,17vw,20rem)`, cropped ≤20% top/left. 16 fact cells: numeral top-left (`clamp(3.5rem,7vw,7.5rem)`), label 12px/700 uppercase bottom-left. Copy (verbatim): A CENSUS OF ONE / MSC HCI — UNIVERSITY OF GENOVA / BSC COMPUTER ENGINEERING / 1 MIRROR THAT READS FACES — RESILENCE, 2025 / 2 INSTALLATIONS SHIPPED 2025 / 1 SPINE MODEL — PERFECT POSTURE, 2024 / 1 HIP-HOP ONTOLOGY — OWL / 1 BLOCKCHAIN PHASE (2023, NO REGRETS) / PYTHON — 6 YEARS / 2 DEPTH CAMERAS / 1 EYESWEB PIPELINE — UNITY AT SEA / 1 MERN STACK — JOBIFY / AFFECTIVE COMPUTING — DAILY / AMIRSERAJ.IR@GMAIL.COM. 8 cells pre-inverted (chalk bg), two empty, **AFFECT.** solid `--pour` at row 3/col 5 — interior, found not featured. Click = permanent one-way inversion (sessionStorage), cells are `<button aria-pressed>`. Tablet 4 cols; mobile 2 cols, gaps kept.

### 4. Projects — Poster Wall / Quiet Proof
Grid boxed at max-width 1200px, 2px chalk outer border, 4 cols, rows `minmax(200px,23vh)`. Placement: reSilence 2×2, Unity at Sea 2×1, counter tile, Perfect Posture, then Hip-Hop Ontology / Ethereum / Jobify / contact tile. Display scale restrained (reSilence `clamp(96px,12vw,168px)`), crops right-edge only, titles read on first pass. Outlines limited to Unity at Sea + Ethereum. **Spec plates**: 2px-bordered night chips with chalk text, 12px/1.4, glued over the letterforms. Copy per tile: RESILENCE "AI MIRROR · REAL-TIME EMOTION RECOGNITION · GENOVA 2025" / UNITY AT SEA "KINECT + EYESWEB · FULL-BODY INSTALLATION · 2025" / PERFECT POSTURE "ML STUDY · POSTURE CLASSIFICATION · 2024" / HIP-HOP ONTOLOGY "OWL · DOMAIN ONTOLOGY" / ETHEREUM "SMART-CONTRACT COURSE MARKETPLACE · 2023" / JOBIFY "MERN · JOB-TRACKING APP". Counter tile = the section's only `--pour`: "6 BUILDS / 3 SENSORS / 1 MIRROR / 0 TEMPLATES" (never changes). Zero JS in this section; hover/focus inverts the spec chip only. Tiles link to case pages (existing `/projects` routes). <900px: 2 cols.

### 5. Contact — Tear-Off / Street Paste
Full-bleed section with exposed 12-col grid (1px chalk verticals at 8% opacity). Poster max 720px, 2px chalk border, rotated −0.8°, pinned by four 14×14px `--pour` corner squares. Headline lines sized per-line in cqw to fill the measure: WANTED: (`--pour`) / HARD PROBLEMS (outlined 1.5px) / ABOUT HOW MACHINES (chalk) / READ PEOPLE. (`--pour`). Sub-line: "Reward: I'll build the answer. Previous cases: a mirror that reads emotion, an installation balanced on two strangers." 8 tear-off tabs (156px, email rotated 90°); tear = 2 hard frames, clipboard copy, jagged clip-path stub "TAKEN" (`--pour` stamp). Torn tabs land in a 90px floor strip at deterministic angles; poster sags 0.15°/tear (cap −2°). Counter stamp top-right, rotated −8°: "TABS YOU'VE TAKEN: n". All torn → "OUT OF TABS. IT'S AMIRSERAJ.IR@GMAIL.COM ANYWAY." (live mailto). Small print: "POSTED GENOVA — 2026". One real mailto (tab 1), clones aria-hidden. sessionStorage persists tears/pile/sag. Mobile <560px: full-bleed, rotation 0, two staples, counter inside.

### 6. Footer — Grid Bank / As Poured
3×2 grid (2px gaps + outer frame on chalk ground, cells night), cells min-height 22vh: RESILENCE ("AI MIRROR — 2025") / UNITY AT SEA ("KINECT + EYESWEB — 2025") / GITHUB ("JOBIFY · HIP-HOP ONTOLOGY") / EMAIL ("AMIRSERAJ.IR@GMAIL.COM") / CV.PDF ("MSC HCI — GENOVA") / TOP ↑ ("HARD CUT"). Labels `clamp(3rem,7vw,8.5rem)` bottom-left, right-edge crop ≤0.15em, full text in aria-label. **Visit record:** opened sections render filled (chalk bg, night outlined type), unvisited outlined — sessionStorage route flags. Hover = one-frame `--pour` fill. EMAIL copies address, swaps to "COPIED." 1.2s. TOP ↑ = `scrollTo(0,0)`, instant. Strip: "© 2026 AMIR SERAJ. POURED IN GENOVA." Tablet 2×3, mobile 1×6 (120px cells).

## Implementation notes

- Repo: `~/Projects/NewPortfolio`, Next.js 12 / React 17 / Tailwind, pages router. Node 18 required (`.nvmrc` present). Redesign replaces `components/sections/*` and `components/common/Nav|Footer`; `Page` SEO wrapper, `lib/DataProjects.js`, and `/projects` case routes stay.
- Tailwind: extend theme with the three tokens; delete unused palette utilities. Swiper dependency drops with the old Latest section.
- Next.js upgrade is **out of scope** for this redesign (separate task; current stack renders everything above).
- Imagery: poster wall tiles are type-first by design; case pages keep existing project screenshots. reSilence/Unity at Sea installation photos (dark-room shots) suit Night Pour if added later — not blocking.

## Out of scope
- `/projects` case-study page redesign (phase 2 — same language, needs its own option round).
- Blog/dev.to integration (currently commented out — stays out).
- Next 13+/App Router migration.

## Open questions (non-blocking, defaults chosen)
- CV: spec keeps `resume.pdf` link in footer CV.PDF cell. Confirm the PDF is current.
- GitHub cell links to `github.com/amir-seraj` (SSH identity observed). Confirm preferred public handle vs `github.com/amirseraj` used in old copy.
