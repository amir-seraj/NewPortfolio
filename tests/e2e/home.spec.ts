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
});
