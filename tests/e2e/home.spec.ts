import { test, expect } from "@playwright/test";

test("homepage renders hero claim and email", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Machines can learn");

  // Deviation from brief: the homepage renders four `a[href^="mailto:"]`
  // links (SideBar icon, Nav's MailMe, Footer quick-link, GetInTouch
  // section) — two of which (Nav, GetInTouch) have the visible/accessible
  // name "amirseraj.ir@gmail.com" — so both `page.locator('a[href^="mailto:"]')`
  // and the unscoped getByRole query trip Playwright's strict-mode check.
  // `.first()` is safe here: every match has the same correct href.
  await expect(
    page.getByRole("link", { name: "amirseraj.ir@gmail.com" }).first()
  ).toHaveAttribute("href", "mailto:amirseraj.ir@gmail.com");
  await expect(page.getByRole("heading", { name: "Systems with something to prove." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Thinking in public." })).toBeVisible();
  await expect(page.getByRole("link", { name: /résumé/i }).first()).toHaveAttribute(
    "href",
    "/resume.pdf"
  );
});

test("mobile menu traps focus, closes with Escape, and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Site menu" })).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Site menu" })).toBeHidden();
  await expect(trigger).toBeFocused();
});
