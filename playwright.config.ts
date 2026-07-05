import { defineConfig } from "@playwright/test";

// Port 3100, not the brief's default 3000: a dev server was already running
// on 3000 from another session and, mid-implementation, started returning
// 500 on every route (verified via curl) despite serving this repo's current
// code. Rather than depend on — or disrupt — whatever owns port 3000, this
// config spins up its own dedicated `next dev` on 3100, making the test run
// hermetic and independent of other sessions.
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  use: { baseURL: "http://localhost:3100" },
  webServer: {
    command: "npm run dev -- -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
