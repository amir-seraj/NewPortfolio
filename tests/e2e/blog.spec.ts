import { test, expect } from "@playwright/test";

test("blog index lists a published repository post", async ({ page }) => {
  await page.goto("/blog");
  // Exactly one <main> per page (Task 14 landmark fix: Layout.tsx no longer
  // wraps pages in its own <main>), so the bare locator is unambiguous —
  // and doubles as a regression check on the single-landmark invariant.
  await expect(page.locator("main")).toContainText(
    "What should an AI mirror notice?"
  );
  const primaryNav = page.getByRole("navigation", {
    name: "Primary navigation",
  });
  await expect(
    primaryNav.getByRole("link", { name: "Writing" })
  ).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("contentinfo")).toBeVisible();
});

test("post page renders body and reading time", async ({ page }) => {
  await page.goto("/blog/what-should-an-ai-mirror-notice");
  await expect(page.locator("main")).toContainText(
    "Confidence, ambiguity, and consent"
  );
  await expect(page.locator("main")).toContainText("min read");
  await expect(page.getByText("Keep following the thread")).toBeVisible();
  await expect(page.getByText("Share note")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
});

test("draft posts are not public", async ({ page }) => {
  const res = await page.goto("/blog/this-should-not-exist");
  expect(res!.status()).toBe(404);
});
