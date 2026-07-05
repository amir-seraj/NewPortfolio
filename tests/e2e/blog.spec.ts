import { test, expect } from "@playwright/test";

test("blog index lists the seeded post", async ({ page }) => {
  await page.goto("/blog");
  // Deviation from brief: components/common/Layout wraps every page in its
  // own <main>, and each page.tsx (this one included) renders a second,
  // nested <main> — `main` resolves to 2 elements site-wide (see
  // tests/e2e/projects.spec.ts), so `.first()` is required to avoid a
  // strict-mode violation. The outer <main> contains the inner one, so
  // `.first()` still covers all page content.
  await expect(page.locator("main").first()).toContainText("Hello, blog");
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
