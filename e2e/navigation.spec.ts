import { expect, test } from "@playwright/test";
import { expectRouteContent, gotoPage, navigationRoutes, pageRoutes, viewports } from "./test-helpers";

const homeRoute = pageRoutes[0]!;

test.describe("navigation", () => {
  test.use({ reducedMotion: "reduce" });

  test("all nav links navigate to the expected pages", async ({ page }) => {
    await page.setViewportSize(viewports.xl);
    await gotoPage(page, homeRoute);

    for (const route of [...navigationRoutes.slice(1), homeRoute]) {
      await page.getByTestId("site-nav").getByRole("link", { name: route.navLabel! }).click();
      await expect(page).toHaveURL(route.path);
      await expectRouteContent(page, route);
    }
  });

  test("404 page renders for unknown routes", async ({ page }) => {
    const notFoundRoute = pageRoutes.find((route) => route.name === "404")!;

    await gotoPage(page, notFoundRoute);
    await expectRouteContent(page, notFoundRoute);
  });

  test("back navigation returns to the previous page", async ({ page }) => {
    await page.setViewportSize(viewports.xl);
    await gotoPage(page, homeRoute);
    await page.getByTestId("site-nav").getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");

    await page.goBack();
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL("/");
    await expectRouteContent(page, homeRoute);
  });
});
