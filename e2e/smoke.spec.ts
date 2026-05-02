import { expect, test } from "@playwright/test";

const navLabels = ["Home", "About", "Projects", "Blog", "Resume", "Contact"];

test.describe("smoke", () => {
  test("home page loads without errors", async ({ page }) => {
    const response = await page.goto("/");

    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { level: 1, name: "Shaeel Afsar" })).toBeVisible();
  });

  test("navigation links are present and visible", async ({ page }) => {
    await page.goto("/");

    const nav = page.getByTestId("site-nav");
    await expect(nav).toBeVisible();

    for (const label of navLabels) {
      await expect(nav.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("header and footer are rendered", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("site-header")).toBeVisible();
    await expect(page.getByTestId("site-footer")).toBeVisible();
  });

  test("dark mode toggle updates the html class", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("theme", "light");
    });
    await page.goto("/");

    const html = page.locator("html");
    const toggle = page.getByTestId("theme-toggle");

    await expect(html).not.toHaveClass(/dark/);
    await toggle.click();
    await expect(html).toHaveClass(/dark/);
    await toggle.click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test("mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const trigger = page.getByTestId("mobile-menu-trigger");
    await trigger.click();
    await expect(page.getByTestId("mobile-menu-panel")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByTestId("mobile-menu-panel")).toBeHidden();
  });

  test("page title and meta description are set", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("Shaeel Afsar");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      "Personal professional website, portfolio, blog, and resume for Shaeel Afsar.",
    );
  });
});
