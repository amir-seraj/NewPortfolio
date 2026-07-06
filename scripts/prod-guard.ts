/**
 * Shared guard for scripts that WRITE through the Payload Local API.
 *
 * Running `payload run <script>` in dev mode against the production
 * database silently writes drizzle push-mode markers into
 * `payload_migrations` (a `name='dev', batch=-1` row). That row makes every
 * later `payload migrate` — including the one Vercel runs during
 * `build:prod` — stop on an interactive data-loss prompt, which kills CI
 * builds (this exact failure broke the 2026-07-06 production deploy).
 *
 * Setting NODE_ENV=production keeps Payload out of push mode. So: writes to
 * portfolio_prod are only allowed when NODE_ENV=production.
 */
export function assertProdSafety(): void {
  if (
    process.env.DATABASE_URL?.includes("portfolio_prod") &&
    process.env.NODE_ENV !== "production"
  ) {
    console.error(
      "Refusing to run against portfolio_prod without NODE_ENV=production.\n" +
        "Dev mode writes push-mode markers that break CI migrations.\n" +
        "Re-run as: NODE_ENV=production DATABASE_URL=<prod> npx payload run <script>",
    );
    process.exit(1);
  }
}
