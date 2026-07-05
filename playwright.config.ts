import { defineConfig } from "@playwright/test";

// Port 3100, not Next's default 3000: a dev server was already running on
// 3000 from another session and, mid-implementation, started returning 500
// on every route (verified via curl) despite serving this repo's current
// code. Rather than depend on — or disrupt — whatever owns port 3000, this
// config starts its own `next dev` on 3100. Guarantee: a fresh server unless
// something already holds 3100 locally (reuseExistingServer attaches to an
// existing listener without verifying what it serves); in CI it always
// starts fresh and fails loudly if the port is taken.
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  use: { baseURL: "http://localhost:3100" },
  webServer: {
    command: "npm run dev -- -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
