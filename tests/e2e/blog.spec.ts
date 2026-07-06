import { test, expect } from "@playwright/test";

test("blog index lists the seeded post", async ({ page }) => {
  await page.goto("/blog");
  // Exactly one <main> per page (Task 14 landmark fix: Layout.tsx no longer
  // wraps pages in its own <main>), so the bare locator is unambiguous —
  // and doubles as a regression check on the single-landmark invariant.
  await expect(page.locator("main")).toContainText("Hello, blog");
});

test("post page renders body and reading time", async ({ page }) => {
  await page.goto("/blog/hello-blog");
  await expect(page.locator("article")).toContainText("created by the seed script");
  await expect(page.locator("article")).toContainText("min read");
});

test("draft posts are not public", async ({ page }) => {
  const res = await page.goto("/blog/this-should-not-exist");
  expect(res!.status()).toBe(404);
});
