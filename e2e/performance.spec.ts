import { promises as fs } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { gotoPage, pageRoutes, viewports } from "./test-helpers";

const measuredRoutes = pageRoutes.filter((route) => route.status !== 404);
const animationFiles = [
  "components/animation/fade-in.tsx",
  "components/animation/stagger-children.tsx",
  "components/animation/parallax.tsx",
  "components/animation/text-reveal.tsx",
  "components/layout/mobile-menu.tsx",
] as const;
const layoutAffectingProperties = "top|right|bottom|left|width|height";

test.describe("animation and loading performance", () => {
  test.use({ viewport: viewports.xl });

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      let cumulativeLayoutShift = 0;
      const observer = new PerformanceObserver((entries) => {
        for (const entry of entries.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & {
            hadRecentInput?: boolean;
            value?: number;
          };

          if (!layoutShiftEntry.hadRecentInput) {
            cumulativeLayoutShift += layoutShiftEntry.value ?? 0;
          }
        }
      });

      observer.observe({ type: "layout-shift", buffered: true });
      (window as Window & { __getCLS?: () => number }).__getCLS = () => cumulativeLayoutShift;
    });
  });

  test("pages stay within the local performance budget after warm navigation", async ({ page }) => {
    for (const route of measuredRoutes) {
      await gotoPage(page, route);
      await gotoPage(page, route);

      const metrics = await page.evaluate(() => {
        const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
        const getCLS = (window as Window & { __getCLS?: () => number }).__getCLS;

        return {
          responseEnd: navigationEntry?.responseEnd ?? 0,
          domContentLoaded: navigationEntry?.domContentLoadedEventEnd ?? 0,
          loadEventEnd: navigationEntry?.loadEventEnd ?? 0,
          cls: getCLS?.() ?? 0,
        };
      });

      expect(metrics.responseEnd, `${route.name} responseEnd`).toBeLessThan(1500);
      expect(metrics.domContentLoaded, `${route.name} domContentLoaded`).toBeLessThan(2500);
      expect(metrics.loadEventEnd, `${route.name} loadEventEnd`).toBeLessThan(4000);
      expect(metrics.cls, `${route.name} cumulative layout shift`).toBeLessThan(0.1);
    }
  });

  test("motion primitives avoid layout-affecting animation properties", async () => {
    const forbiddenInlineMotionProps = new RegExp(
      String.raw`\b(?:initial|animate|exit|whileInView)\s*=\s*\{\{[^}]*\b(?:${layoutAffectingProperties})\s*:`,
      "s",
    );
    const forbiddenVariantProps = new RegExp(
      String.raw`\b(?:hidden|visible|exit)\s*:\s*\{[^{}]*\b(?:${layoutAffectingProperties})\s*:`,
      "s",
    );

    for (const file of animationFiles) {
      const content = await fs.readFile(path.join(process.cwd(), file), "utf8");

      expect(content, `${file} should avoid layout properties in inline motion props`).not.toMatch(
        forbiddenInlineMotionProps,
      );
      expect(content, `${file} should avoid layout properties in motion variants`).not.toMatch(
        forbiddenVariantProps,
      );
    }
  });
});
