import { expect, test } from "@playwright/test";

test("designed 404 is returned for unknown routes", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Nothing lives at this address." })
  ).toBeVisible();
});

test("crawler and identity assets are configured", async ({ request }) => {
  const favicon = await request.get("/favicon.ico");
  expect(favicon.ok()).toBeTruthy();

  const robots = await request.get("/robots.txt");
  const robotsText = await robots.text();
  expect(robotsText).toContain("Disallow: /keystatic");
  expect(robotsText).toContain("Disallow: /api/keystatic");

  const sitemap = await request.get("/sitemap.xml");
  const sitemapText = await sitemap.text();
  expect(sitemapText).toContain("/projects/shodocode");
  expect(sitemapText).toContain("/blog/what-should-an-ai-mirror-notice");
});

test("legacy admin redirects to the content studio", async ({ request }) => {
  const response = await request.get("/admin", { maxRedirects: 0 });
  expect(response.status()).toBe(307);
  expect(response.headers().location).toBe("/keystatic");
});
