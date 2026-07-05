# Blog + Full-Site CMS — Design Spec

**Date:** 2026-07-05
**Status:** Approved by Amir (brainstorming session)

## Goal

Add a blog and a browser-based admin (`/admin`) that manages **all** site content — blog posts, portfolio projects, media, homepage sections, and site settings — replacing the hardcoded `lib/DataProjects.js`. Editing happens on the live site from any browser; publishing is instant.

## Decisions (locked)

| Decision | Choice |
|---|---|
| CMS | Payload CMS 3, embedded in the Next.js app |
| Framework | Upgrade Next.js 12 → 15 (App Router), React 17 → 19 |
| Hosting | Move Netlify → Vercel (also fixes broken image optimization) |
| Database | Neon Postgres via `@payloadcms/db-postgres` |
| Media storage | Vercel Blob via `@payloadcms/storage-vercel-blob` |
| Auth | Payload built-in — single admin user (Amir), email + password |
| Editor | Lexical (Payload default rich text) |
| Blog scope | Core only: rich editor, cover image, tags, drafts/publish, slugs, SEO meta, reading time, code highlighting. No search/RSS/comments/scheduling (YAGNI). |

## Architecture

```
Next.js 15 (App Router) — one repo, one Vercel deploy
├─ app/(site)/          → public portfolio (existing design, migrated from pages/)
│   ├─ /                → homepage (reads `home` global + `settings` global)
│   ├─ /projects        → Graph + Timeline explorer (reads `projects` collection)
│   ├─ /projects/[slug] → case studies
│   ├─ /blog            → post list + tag filter
│   └─ /blog/[slug]     → post page (Lexical → HTML, Prism/Shiki code highlighting, SEO meta)
├─ app/(payload)/admin  → Payload-generated admin UI
└─ payload.config.ts    → schema definitions
```

- Public pages fetch through Payload **Local API** (direct DB access in server components — no HTTP hop).
- Rendering: static-first with ISR; `revalidate` triggered on publish via Payload hooks (`afterChange` → `revalidatePath`/`revalidateTag`).

## Content model

### Collections

- **posts** — title, slug (unique), cover image (relation → media), tags (relation → tags), excerpt, rich-text body (Lexical, code blocks + inline images enabled), SEO fields (meta title, meta description, OG image), status draft/published (Payload drafts + versions enabled), reading time (computed in `beforeChange` hook from body length).
- **projects** — full schema mirroring `lib/DataProjects.js`: title, slug, year, tech stack, links, banner/media, case-study rich body, graph relations (project↔project relationships used by the /projects explorer), timeline metadata, featured flag.
- **media** — upload collection → Vercel Blob. `alt` text **required** (WCAG rule from PRODUCT.md).
- **users** — Payload auth collection. One admin account.
- **tags** — name + slug, related from posts.

### Globals

- **home** — hero text, stats, skills, timeline entries (arrays of structured blocks matching current homepage sections).
- **settings** — SEO defaults, social links, contact email, analytics ID.

## Migration plan (ordered)

1. **Stack upgrade** on a new branch: Next 12→15, React 17→19.
   - Replace `framer-motion@6` → `motion` (React 19 compatible).
   - Drop `next-pwa` (unmaintained, breaks Next 15).
   - Replace `next-sitemap` → App Router `sitemap.ts`.
   - Audit remaining deps (`swiper`, `react-calendly`, `react-mailchimp-subscribe`, `react-share`) — upgrade or replace whatever fails React 19 peer deps.
   - Migrate `pages/` → `app/` (4 pages: index, projects index, projects/[slug], _app/_document → root layout).
2. **Parity gate:** deploy Vercel preview; verify site visually identical to production before any CMS work.
3. **Install Payload 3** — `payload.config.ts`, collections/globals above, Neon Postgres provisioned (Neon MCP available), Vercel Blob token.
4. **Seed script** — one-time migration `lib/DataProjects.js` → `projects` collection + `media` uploads. Idempotent (upsert by slug). `DataProjects.js` stays in repo until parity confirmed, then deleted.
5. **Blog public pages** — `/blog`, `/blog/[slug]`; new design work following PRODUCT.md brand (dark graphite + teal, claims-then-receipts, WCAG AA, reduced-motion).
6. **Wire homepage + settings** to globals.
7. **DNS cutover** Netlify → Vercel, last, after everything verified.

## Error handling

- DB unreachable → public pages serve last ISR-cached version (static-first; never white-screen).
- Unknown slug → 404 page.
- Seed script idempotent — safe to rerun; upserts by slug.
- Draft posts excluded from public queries; visible only through Payload admin/preview.
- Media upload failures surface in Payload admin UI (built-in).

## Testing

- Keep existing Cypress; add smoke specs: blog index renders, single post renders (incl. code block), /projects explorer works from DB data.
- Seed parity check: script compares DB project count + slugs against `DataProjects.js` before it is deleted.
- Manual acceptance: admin login → create draft → publish → post live within one ISR revalidation.

## Environment

- `DATABASE_URL` (Neon), `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN` — managed via Vercel env.

## Out of scope

Search, RSS, comments, newsletter integration, view counts, scheduled publishing, post revision UI beyond Payload's built-in versions, multi-user roles.
