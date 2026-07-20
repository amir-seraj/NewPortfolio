# NewPortfolio

Amir Seraj's portfolio, built with Next.js 15 and a Git-backed Keystatic content studio.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the portfolio and [http://localhost:3000/keystatic](http://localhost:3000/keystatic) to manage its content. `/admin` redirects to the new studio.

Local Keystatic mode needs no database, account, or environment variables. Saving in the studio writes posts, projects, tags, and site settings into the `content/` directory; uploaded images go into `public/images/`. Commit those files like normal code.

`NEXT_PUBLIC_GA_ID` is optional. Copy `.env.example` to `.env.local` only when you need analytics or are configuring the deployed editor.

## Content workflow

The studio manages:

- blog posts and tags
- portfolio projects and case studies
- homepage copy and statistics
- site-wide settings

Posts and case studies use Keystatic's rich Markdoc editor. Public pages read the same repository files at build time, so the site has no runtime database dependency.

## Enable editing on the deployed site

Production uses Keystatic's GitHub mode with the `amir-seraj/NewPortfolio` repository. Follow the one-time GitHub App setup in the [Keystatic GitHub mode guide](https://keystatic.com/docs/github-mode), install the app on this repository, then add these variables to Vercel:

```dotenv
KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET=
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=
```

Generate `KEYSTATIC_SECRET` with `openssl rand -hex 32`. After deployment, signing into `/keystatic` lets the studio create content commits through GitHub; those commits trigger the normal Vercel deployment flow.

If the public app slug is absent, production builds still succeed but the editor and its write API remain disabled. If the slug is present while the three server credentials are missing, the build fails intentionally so a partially configured editor cannot be deployed.

## Commands

```bash
npm run dev       # local site and content studio
npm run build     # production build
npm run lint      # application lint checks
npm run test:e2e  # Playwright suite on port 3100
```

The public portfolio includes the homepage, project archive and connection map,
thirteen repository-backed case studies, field notes, and a downloadable résumé.
The active application is fully database-free; legacy Payload/Postgres files have
been removed and remain recoverable from Git history.
