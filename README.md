# NewPortfolio
 My New Portfolio

## Operations

**Stack:** Next 15 App Router + Payload 3 + Neon Postgres + Vercel Blob, deployed on Vercel.

### Local dev

```
npm run dev
```

Needs a `.env.local` (see `.env.example`) with:

- `DATABASE_URL` — Neon Postgres connection string
- `PAYLOAD_SECRET` — random secret (`openssl rand -hex 32`)
- `NEXT_PUBLIC_GA_ID` — Google Analytics measurement id (optional; GA disabled when empty)
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob token (optional locally; uploads fall back to `./media`)

The Payload admin UI is at `/admin`.

### Content

Everything is editable at `/admin`: posts, projects, media, tags, and the Home and Settings globals. Publishing revalidates the affected pages within ~60s max (usually instant via `afterChange`/`afterDelete` hooks).

### Scripts

- `npx payload run scripts/seed.ts` — idempotent seed. On a fresh clone this only seeds the globals and a sample post (the legacy projects source file was retired after the DB migration).
- `npx payload run scripts/extract-body-classes.ts` — regenerates `lib/body-classes.txt` from project bodies stored in the DB, since Tailwind's static scanner can't see class names living in Postgres. Runs automatically as a `prebuild` step, with the committed file as a fallback when there's no DB access (e.g. a fresh clone before seeding).
- `npx payload run scripts/migrate-body-colors.ts` — idempotent content color migration (teal/emerald → mango).
- `node scripts/check-contrast.mjs` — contrast checker; must stay all-pass whenever colors are touched.

### Migrations

After schema changes: `npx payload migrate:create <name>`, then commit the generated files under `migrations/`. The Vercel build runs `payload migrate` first (see `vercel.json`'s `buildCommand` → `build:prod`).

### Deploys

Pushing a branch creates a preview deployment. Production deploys via `vercel deploy --prod` or by merging to `main` (Git integration).

### Tests

```
npm run test:e2e
```

Runs the Playwright suite on a hermetic dev server on port 3100.

### Production database rule

Never run a write script (`scripts/seed.ts`, `scripts/convert-body-to-blocks.ts`, `scripts/migrate-body-colors.ts`) against `portfolio_prod` without `NODE_ENV=production` — dev mode writes drizzle push markers into `payload_migrations` that make the CI `payload migrate` stop on an interactive prompt and fail the build. The scripts refuse to run if you try. `build:prod` passes `--forceAcceptWarning` to clear the one historical marker.
