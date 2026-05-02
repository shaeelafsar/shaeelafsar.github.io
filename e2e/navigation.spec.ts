import { expect, test } from "@playwright/test";

const routes = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
] as const;

test.describe("navigation", () => {
  test("all nav links navigate to the expected pages", async ({ page }) => {
    for (const route of routes) {
      await page.goto("/");
      await page.getByTestId("site-nav").getByRole("link", { name: route.label }).click();
      await expect(page).toHaveURL(route.href);
    }
  });

  test("404 page renders for unknown routes", async ({ page }) => {
    const response = await page.goto("/missing-route");

    expect(response?.status()).toBe(404);
    await expect(page.getByText("This page could not be found.")).toBeVisible();
  });

  test("back navigation returns to the previous page", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("site-nav").getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");

    await page.goBack();

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { level: 1, name: "Shaeel Afsar" })).toBeVisible();
  });
});
