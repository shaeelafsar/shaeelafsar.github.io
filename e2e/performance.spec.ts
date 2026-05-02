import { promises as fs } from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { gotoPage, pageRoutes, viewports } from "./test-helpers";

type WebVitalsSnapshot = {
  lcp: number | null;
  cls: number;
  fid: number | null;
  inp: number | null;
  supported: {
    lcp: boolean;
    cls: boolean;
    fid: boolean;
    inp: boolean;
  };
};

const measuredRoutes = pageRoutes.filter((route) => route.status !== 404);
const webVitalsRoutes = measuredRoutes.filter((route) =>
  ["Home", "Projects", "Blog", "Blog Post", "Project Detail", "Contact"].includes(route.name),
);
const animationFiles = [
  "components/animation/fade-in.tsx",
  "components/animation/stagger-children.tsx",
  "components/animation/parallax.tsx",
  "components/animation/text-reveal.tsx",
  "components/layout/mobile-menu.tsx",
] as const;
const layoutAffectingProperties = "top|right|bottom|left|width|height";

async function installWebVitalsObserver(page: Page) {
  await page.addInitScript(() => {
    const supportedEntryTypes = PerformanceObserver.supportedEntryTypes ?? [];
    const metrics: WebVitalsSnapshot = {
      lcp: null,
      cls: 0,
      fid: null,
      inp: null,
      supported: {
        lcp: supportedEntryTypes.includes("largest-contentful-paint"),
        cls: supportedEntryTypes.includes("layout-shift"),
        fid: supportedEntryTypes.includes("first-input"),
        inp: supportedEntryTypes.includes("event"),
      },
    };

    if (metrics.supported.lcp) {
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          metrics.lcp = entry.startTime;
        }
      });

      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    }

    if (metrics.supported.cls) {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & {
            hadRecentInput?: boolean;
            value?: number;
          };

          if (!layoutShiftEntry.hadRecentInput) {
            metrics.cls += layoutShiftEntry.value ?? 0;
          }
        }
      });

      clsObserver.observe({ type: "layout-shift", buffered: true });
    }

    if (metrics.supported.fid) {
      const fidObserver = new PerformanceObserver((list) => {
        const firstInput = list.getEntries()[0] as PerformanceEntry & {
          processingStart?: number;
          startTime: number;
        };

        if (firstInput) {
          metrics.fid = (firstInput.processingStart ?? firstInput.startTime) - firstInput.startTime;
        }
      });

      fidObserver.observe({ type: "first-input", buffered: true });
    }

    if (metrics.supported.inp) {
      const inpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const eventEntry = entry as PerformanceEntry & {
            duration?: number;
            interactionId?: number;
          };

          if ((eventEntry.interactionId ?? 0) > 0) {
            metrics.inp = Math.max(metrics.inp ?? 0, eventEntry.duration ?? 0);
          }
        }
      });

      inpObserver.observe({ type: "event", buffered: true, durationThreshold: 16 });
    }

    (window as Window & { __webVitalsSnapshot?: WebVitalsSnapshot }).__webVitalsSnapshot = metrics;
  });
}

async function getWebVitals(page: Page): Promise<WebVitalsSnapshot> {
  return page.evaluate(() => {
    const metrics = (window as Window & { __webVitalsSnapshot?: WebVitalsSnapshot }).__webVitalsSnapshot;

    return {
      lcp: metrics?.lcp ?? null,
      cls: metrics?.cls ?? 0,
      fid: metrics?.fid ?? null,
      inp: metrics?.inp ?? null,
      supported: metrics?.supported ?? {
        lcp: false,
        cls: false,
        fid: false,
        inp: false,
      },
    };
  });
}

test.describe("animation and loading performance", () => {
  test.use({ viewport: viewports.xl });

  test.beforeEach(async ({ page }) => {
    await installWebVitalsObserver(page);
  });

  test("pages stay within the local performance budget after warm navigation", async ({ page }) => {
    for (const route of measuredRoutes) {
      await gotoPage(page, route);
      await gotoPage(page, route);

      const metrics = await page.evaluate(() => {
        const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
        const clsValue =
          (window as Window & { __webVitalsSnapshot?: WebVitalsSnapshot }).__webVitalsSnapshot?.cls ?? 0;

        return {
          responseEnd: navigationEntry?.responseEnd ?? 0,
          domContentLoaded: navigationEntry?.domContentLoadedEventEnd ?? 0,
          loadEventEnd: navigationEntry?.loadEventEnd ?? 0,
          cls: clsValue,
        };
      });

      expect(metrics.responseEnd, `${route.name} responseEnd`).toBeLessThan(1500);
      expect(metrics.domContentLoaded, `${route.name} domContentLoaded`).toBeLessThan(2500);
      expect(metrics.loadEventEnd, `${route.name} loadEventEnd`).toBeLessThan(4000);
      expect(metrics.cls, `${route.name} cumulative layout shift`).toBeLessThan(0.1);
    }
  });

  test("key pages stay within web vitals budgets when supported by the browser", async ({ page }) => {
    for (const route of webVitalsRoutes) {
      await gotoPage(page, route);
      await page.locator("main").click({ position: { x: 24, y: 24 } });
      await page.waitForTimeout(150);

      const metrics = await getWebVitals(page);

      if (metrics.supported.lcp) {
        expect(metrics.lcp, `${route.name} LCP should be captured`).not.toBeNull();
        expect(metrics.lcp ?? Number.POSITIVE_INFINITY, `${route.name} LCP`).toBeLessThan(4000);
      }

      if (metrics.supported.cls) {
        expect(metrics.cls, `${route.name} CLS`).toBeLessThan(0.1);
      }

      if (metrics.supported.fid && metrics.fid !== null) {
        expect(metrics.fid, `${route.name} FID`).toBeLessThan(200);
      }

      if (metrics.supported.inp && metrics.inp !== null) {
        expect(metrics.inp, `${route.name} INP`).toBeLessThan(200);
      }
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
