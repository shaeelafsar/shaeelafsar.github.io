import fs from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { pageRoutes } from "../../e2e/test-helpers";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3001";
const screenshotRoot = path.join(process.cwd(), "tests", "e2e", "screenshots");

const viewportMatrix = [
  ["mobile-375x812", { width: 375, height: 812 }],
  ["tablet-768x1024", { width: 768, height: 1024 }],
  ["laptop-1366x768", { width: 1366, height: 768 }],
  ["desktop-1920x1080", { width: 1920, height: 1080 }],
] as const;

function sanitizeRouteName(routeName: string) {
  return routeName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function resolveUrl(routePath: string) {
  return new URL(routePath, `${BASE_URL}/`).toString();
}

async function gotoRoute(page: Page, route: (typeof pageRoutes)[number]) {
  const response = await page.goto(resolveUrl(route.path), { waitUntil: "domcontentloaded" });

  await page.waitForLoadState("networkidle");
  expect(response?.status() ?? 0, `${route.name} should load successfully`).toBe(route.status ?? 200);
}

async function saveViewportScreenshot(page: Page, viewportName: string, route: (typeof pageRoutes)[number]) {
  const viewportDirectory = path.join(screenshotRoot, viewportName);
  fs.mkdirSync(viewportDirectory, { recursive: true });

  await page.screenshot({
    path: path.join(viewportDirectory, `${sanitizeRouteName(route.name)}.png`),
    fullPage: true,
  });
}

async function expectNoHorizontalScrollbar(page: Page, routeName: string, viewportName: string) {
  const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - window.innerWidth));

  expect(overflow, `${routeName} has horizontal overflow at ${viewportName}`).toBeLessThanOrEqual(0);
}

type FooterAudit = {
  widthDelta: number;
  leftOffset: number;
  rightOffset: number;
  gapToDocumentBottom: number;
  gapToViewportBottom: number;
};

async function auditFooter(page: Page): Promise<FooterAudit> {
  return page.evaluate(() => {
    const footer = document.querySelector<HTMLElement>('[data-testid="site-footer"]');

    if (!footer) {
      throw new Error("Footer not found");
    }

    const rect = footer.getBoundingClientRect();
    const root = document.documentElement;
    const documentBottom = Math.max(root.scrollHeight, document.body.scrollHeight);
    const footerBottom = footer.offsetTop + footer.offsetHeight;
    const pageFitsViewport = documentBottom <= window.innerHeight + 4;

    return {
      widthDelta: Math.abs(window.innerWidth - rect.width),
      leftOffset: Math.abs(rect.left),
      rightOffset: Math.abs(window.innerWidth - rect.right),
      gapToDocumentBottom: Math.max(0, documentBottom - footerBottom),
      gapToViewportBottom: pageFitsViewport ? Math.max(0, window.innerHeight - rect.bottom) : 0,
    };
  });
}

type PositionedOffender = {
  text: string;
  position: string;
  left: number;
  right: number;
  top: number;
  bottom: number;
};

async function findOutOfBoundsPositionedText(page: Page): Promise<PositionedOffender[]> {
  return page.evaluate(() => {
    const clamp = (value: number) => Math.round(value * 100) / 100;

    return Array.from(document.querySelectorAll<HTMLElement>("body *"))
      .map((element) => {
        const style = window.getComputedStyle(element);
        const text = (element.innerText || "").trim().replace(/\s+/g, " ");
        const rect = element.getBoundingClientRect();
        const isVisible = style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
        const isPositioned = style.position === "absolute" || style.position === "fixed";
        const intersectsViewport = rect.bottom > 0 && rect.top < window.innerHeight;
        const isOutOfBounds = rect.left < 0 || rect.right > window.innerWidth || rect.top < 0 || rect.bottom > window.innerHeight;
        const looksLikeFloatingLabel = text.length <= 40;

        if (!isVisible || !isPositioned || !intersectsViewport || !looksLikeFloatingLabel || !text || !isOutOfBounds) {
          return null;
        }

        return {
          text: text.slice(0, 120),
          position: style.position,
          left: clamp(rect.left),
          right: clamp(rect.right),
          top: clamp(rect.top),
          bottom: clamp(rect.bottom),
        };
      })
      .filter((value): value is PositionedOffender => value !== null)
      .slice(0, 10);
  });
}

type TextOverflow = {
  text: string;
  left: number;
  right: number;
  top: number;
  bottom: number;
  tagName: string;
};

async function findTextOverflow(page: Page): Promise<TextOverflow[]> {
  return page.evaluate(() => {
    const clamp = (value: number) => Math.round(value * 100) / 100;

    return Array.from(document.querySelectorAll<HTMLElement>("body *"))
      .map((element) => {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const text = (element.innerText || "").trim().replace(/\s+/g, " ");
        const isVisible = style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
        const intersectsViewport = rect.bottom > 0 && rect.top < window.innerHeight;
        const hasMeaningfulText = text.length > 0 && text.length <= 200;
        const isOutOfBounds = rect.left < 0 || rect.right > window.innerWidth;

        if (!isVisible || !intersectsViewport || !hasMeaningfulText || !isOutOfBounds) {
          return null;
        }

        return {
          text,
          tagName: element.tagName.toLowerCase(),
          left: clamp(rect.left),
          right: clamp(rect.right),
          top: clamp(rect.top),
          bottom: clamp(rect.bottom),
        };
      })
      .filter((value): value is TextOverflow => value !== null)
      .slice(0, 12);
  });
}

test.describe("responsive debug diagnostics", () => {
  test.use({ reducedMotion: "reduce" });

  for (const [viewportName, viewport] of viewportMatrix) {
    for (const route of pageRoutes) {
      test(`${route.name} audit at ${viewportName}`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await gotoRoute(page, route);
        await saveViewportScreenshot(page, viewportName, route);
        await expectNoHorizontalScrollbar(page, route.name, viewportName);

        const textOverflow = await findTextOverflow(page);
        expect(textOverflow, `${route.name} has text extending outside the viewport`).toEqual([]);

        await expect(page.getByTestId("site-footer"), `${route.name} footer should be visible`).toBeVisible();
        const footer = await auditFooter(page);
        expect(footer.widthDelta, `${route.name} footer should span viewport width`).toBeLessThanOrEqual(2);
        expect(footer.leftOffset, `${route.name} footer should start at left edge`).toBeLessThanOrEqual(2);
        expect(footer.rightOffset, `${route.name} footer should end at right edge`).toBeLessThanOrEqual(2);
        expect(footer.gapToDocumentBottom, `${route.name} footer should be last content on the page`).toBeLessThanOrEqual(4);
        expect(footer.gapToViewportBottom, `${route.name} footer should sit at the bottom on shorter pages`).toBeLessThanOrEqual(4);
      });
    }
  }

  for (const [viewportName, viewport] of viewportMatrix) {
    test(`home floating positioned text stays in bounds at ${viewportName}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await gotoRoute(page, pageRoutes[0]!);

      const offenders = await findOutOfBoundsPositionedText(page);
      expect(offenders, `Found out-of-bounds absolute/fixed text at ${viewportName}`).toEqual([]);
    });
  }

  test("mobile navigation drawer opens and closes on mobile", async ({ page }) => {
    await page.setViewportSize(viewportMatrix[0][1]);
    await gotoRoute(page, pageRoutes[0]!);

    const trigger = page.getByTestId("mobile-menu-trigger");
    await expect(trigger).toBeVisible();
    await expect(page.getByTestId("site-nav")).toBeHidden();

    await trigger.click();
    await expect(page.getByTestId("mobile-menu-panel")).toBeVisible();
    await expect(page.getByTestId("mobile-menu-nav")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByTestId("mobile-menu-panel")).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("desktop navigation stays visible on desktop", async ({ page }) => {
    await page.setViewportSize(viewportMatrix[3][1]);
    await gotoRoute(page, pageRoutes[0]!);

    await expect(page.getByTestId("site-nav")).toBeVisible();
    await expect(page.getByTestId("mobile-menu-trigger")).toBeHidden();
  });
});
