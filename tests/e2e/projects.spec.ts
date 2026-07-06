import { test, expect } from "@playwright/test";

test("projects explorer lists projects", async ({ page }) => {
  await page.goto("/projects");
  // Projects renders client-side (default view = graph, SVG node labels
  // from components/sections/Projects/graph.ts). "Perfect Posture" is the
  // graph label for perfect-posture-case-study, and also appears in the
  // timeline view's card title — so this holds regardless of which view is
  // active. Matches the brief's original assertion text exactly.
  // Exactly one <main> per page (Task 14 landmark fix), so the bare locator
  // is strict-mode safe and asserts the single-landmark invariant.
  await expect(page.locator("main")).toContainText("Perfect Posture", {
    timeout: 15_000,
  });
});

test("project case study renders body", async ({ page }) => {
  await page.goto("/projects/perfect-posture-case-study");
  await expect(page.locator("h1, h2").first()).toBeVisible();
  await expect(page.locator("main")).toContainText(
    "Perfect Posture Case Study"
  );

  // Body-content assertions (Task 17): these strings exist ONLY in the
  // case-study body — never in the title ("Perfect Posture Case Study") or
  // description ("Enhancing Gamers' Health Through Ergonomic Intervention")
  // fields — so they can't be satisfied by the page header. With the
  // project's `layout` populated (13/13 converted), Detail.tsx renders them
  // through BlockRenderer: the h3 is an IterationCard heading, the sentence
  // is Callout richText body content.
  await expect(
    page.getByRole("heading", {
      name: "Iteration 1: Problem Identification and Initial Concept",
    })
  ).toBeVisible();
  await expect(page.locator("main")).toContainText(
    "Prolonged gaming sessions can lead to various health issues"
  );

  // Extra, stable assertion: prev/next chronological nav. perfect-posture
  // (2024-06-17) sits between eth-course-marketplace-blockchain (06-15) and
  // ontology-for-hiphop (07-15) in lib/DataProjects.js, so both render. The
  // labels are static template text, independent of which specific
  // neighbor is adjacent.
  await expect(page.getByText("Shipped before this")).toBeVisible();
  await expect(page.getByText("Shipped after this")).toBeVisible();
});
