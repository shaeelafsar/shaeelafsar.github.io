import { expect, test } from "@playwright/test";
import {
  expectMinimumTouchTarget,
  expectNoHorizontalOverflow,
  expectRouteContent,
  gotoPage,
  mobileDeviceViewports,
  responsiveRoutes,
  screenshotName,
  viewports,
} from "./test-helpers";

const responsiveViewports = [
  ["sm", viewports.sm],
  ["md", viewports.md],
  ["lg", viewports.lg],
  ["xl", viewports.xl],
] as const;

const targetMobileDevices = [
  ["iphone-se", mobileDeviceViewports.iphoneSe],
  ["iphone-14-15", mobileDeviceViewports.iphone1415],
  ["iphone-14-15-pro-max", mobileDeviceViewports.iphone1415ProMax],
  ["galaxy-s23", mobileDeviceViewports.galaxyS23],
  ["galaxy-s23-ultra", mobileDeviceViewports.galaxyS23Ultra],
] as const;

test.describe("responsive audit", () => {
  test.use({ reducedMotion: "reduce" });

  for (const [viewportName, viewport] of responsiveViewports) {
    test(`captures every page cleanly at ${viewportName}`, async ({ page }, testInfo) => {
      await page.setViewportSize(viewport);

      for (const route of responsiveRoutes) {
        await gotoPage(page, route);
        await expectRouteContent(page, route);
        await expectNoHorizontalOverflow(page);

        await page.screenshot({
          path: testInfo.outputPath(screenshotName(viewportName, route)),
          fullPage: true,
        });
      }
    });
  }

  for (const [deviceName, viewport] of targetMobileDevices) {
    test(`requested mobile routes stay within the viewport on ${deviceName}`, async ({ page }) => {
      await page.setViewportSize(viewport);

      for (const route of responsiveRoutes) {
        await gotoPage(page, route);
        await expectRouteContent(page, route);
        await expectNoHorizontalOverflow(page);
      }
    });
  }

  test("primary mobile controls meet minimum touch target sizing", async ({ page }) => {
    for (const viewport of Object.values(mobileDeviceViewports)) {
      await page.setViewportSize(viewport);
      await gotoPage(page, responsiveRoutes[0]!);

      await expectMinimumTouchTarget(page.getByTestId("theme-toggle"));
      await expectMinimumTouchTarget(page.getByTestId("mobile-menu-trigger"));
      await expectMinimumTouchTarget(page.getByRole("link", { name: "View Projects" }).first());
      await expectMinimumTouchTarget(page.getByRole("link", { name: "Get in Touch" }).first());
    }
  });

  test("navigation chrome swaps correctly between mobile and desktop layouts", async ({ page }) => {
    await page.setViewportSize(viewports.sm);
    await gotoPage(page, responsiveRoutes[0]!);
    await expect(page.getByTestId("mobile-menu-trigger")).toBeVisible();
    await expect(page.getByTestId("site-nav")).toBeHidden();

    await page.setViewportSize(viewports.xl);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    await expect(page.getByTestId("site-nav")).toBeVisible();
    await expect(page.getByTestId("mobile-menu-trigger")).toBeHidden();
  });

  test("resume timeline alternates on desktop and stacks into one column on mobile", async ({ page }) => {
    await page.setViewportSize(viewports.sm);
    await gotoPage(page, responsiveRoutes.find((route) => route.name === "Resume")!);

    const mobileButtons = page.getByTestId("experience-timeline").locator("button[aria-expanded]");
    const mobileFirst = await mobileButtons.nth(0).boundingBox();
    const mobileSecond = await mobileButtons.nth(1).boundingBox();

    expect(mobileFirst).not.toBeNull();
    expect(mobileSecond).not.toBeNull();
    expect(Math.abs((mobileFirst?.x ?? 0) - (mobileSecond?.x ?? 0))).toBeLessThan(24);

    await page.setViewportSize(viewports.xl);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");

    const desktopButtons = page.getByTestId("experience-timeline").locator("button[aria-expanded]");
    const desktopFirst = await desktopButtons.nth(0).boundingBox();
    const desktopSecond = await desktopButtons.nth(1).boundingBox();

    expect(desktopFirst).not.toBeNull();
    expect(desktopSecond).not.toBeNull();
    expect(Math.abs((desktopFirst?.x ?? 0) - (desktopSecond?.x ?? 0))).toBeGreaterThan(120);
  });
});
