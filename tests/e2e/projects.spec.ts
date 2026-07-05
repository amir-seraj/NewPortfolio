import { test, expect } from "@playwright/test";

test("projects explorer lists projects", async ({ page }) => {
  await page.goto("/projects");
  // Projects renders client-side (default view = graph, SVG node labels
  // from components/sections/Projects/graph.ts). "Perfect Posture" is the
  // graph label for perfect-posture-case-study, and also appears in the
  // timeline view's card title — so this holds regardless of which view is
  // active. Matches the brief's original assertion text exactly.
  // Deviation: components/common/Layout wraps every page in its own <main>,
  // and each page.tsx renders a second nested <main> — `main` resolves to 2
  // elements site-wide, so `.first()` is required to avoid a strict-mode
  // violation. The outer <main> contains the inner one, so `.first()` still
  // covers all page content.
  await expect(page.locator("main").first()).toContainText("Perfect Posture", {
    timeout: 15_000,
  });
});

test("project case study renders body", async ({ page }) => {
  await page.goto("/projects/perfect-posture-case-study");
  await expect(page.locator("h1, h2").first()).toBeVisible();
  await expect(page.locator("main").first()).toContainText(
    "Perfect Posture Case Study"
  );

  // Extra, stable assertion: prev/next chronological nav. perfect-posture
  // (2024-06-17) sits between eth-course-marketplace-blockchain (06-15) and
  // ontology-for-hiphop (07-15) in lib/DataProjects.js, so both render. The
  // labels are static template text, independent of which specific
  // neighbor is adjacent.
  await expect(page.getByText("Shipped before this")).toBeVisible();
  await expect(page.getByText("Shipped after this")).toBeVisible();
});
