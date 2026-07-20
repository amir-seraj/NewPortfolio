import { test, expect } from "@playwright/test";

test("projects explorer lists projects", async ({ page }) => {
  await page.goto("/projects");
  // The editorial timeline is the calm default; the optional connection view
  // uses the same project data from graph-data.ts. "Perfect Posture" appears
  // in both, so this remains stable if the visitor switches views.
  // Exactly one <main> per page (Task 14 landmark fix), so the bare locator
  // is strict-mode safe and asserts the single-landmark invariant.
  await expect(page.locator("main")).toContainText("Perfect Posture", {
    timeout: 15_000,
  });
  await expect(page.getByText("13 case studies")).toBeVisible();
  const primaryNav = page.getByRole("navigation", {
    name: "Primary navigation",
  });
  await expect(
    primaryNav.getByRole("link", { name: "Projects" })
  ).toHaveAttribute("aria-current", "page");
});

test("connection view exposes every CMS project", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "Connections" }).click();
  const graph = page.getByRole("group", {
    name: /Interactive graph of 13 projects/i,
  });
  await expect(graph).toBeVisible();
  await expect(graph.locator('g[role="button"]')).toHaveCount(13);
  await graph.locator('g[role="button"]').first().focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("link", { name: /Read case study/i })).toBeVisible();
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
  // repository-backed Markdoc body is rendered by Detail.tsx.
  await expect(
    page.getByRole("heading", {
      name: "Iteration 1: Problem Identification and Initial Concept",
    })
  ).toBeVisible();
  await expect(page.locator("main")).toContainText(
    "Prolonged gaming sessions can lead to various health issues"
  );

  // Extra, stable assertion: the redesigned chronological project navigation.
  // perfect-posture sits between other archive entries, so both links render.
  await expect(page.getByText("Earlier project")).toBeVisible();
  await expect(page.getByText("Later project")).toBeVisible();
  await expect(page.getByText("Project brief")).toBeVisible();
  await expect(page.getByText("Continue the conversation")).toBeVisible();
});
