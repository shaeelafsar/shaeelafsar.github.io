import { expect, test, type Page } from "@playwright/test";
import { gotoPage, pageRoutes, viewports } from "./test-helpers";

async function discoverContentPaths(page: Page) {
  const paths = new Set(pageRoutes.filter((route) => route.status !== 404).map((route) => route.path));

  for (const sourcePath of ["/blog", "/projects"]) {
    await page.goto(sourcePath, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");

    const discoveredPaths = await page.evaluate(() => {
      return Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]'))
        .map((anchor) => anchor.getAttribute("href") ?? "")
        .filter((href) => href.startsWith("/blog/") || href.startsWith("/projects/"))
        .map((href) => href.split("#")[0] ?? href);
    });

    for (const path of discoveredPaths) {
      paths.add(path);
    }
  }

  return [...paths];
}

test.describe("seo audit", () => {
  test.use({ viewport: viewports.xl, reducedMotion: "reduce" });

  test("every page exposes title, description, and open graph metadata", async ({ page }) => {
    const paths = await discoverContentPaths(page);

    for (const path of paths) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle");

      await expect(page, `${path} title`).toHaveTitle(/\S+/);
      await expect(page.locator('meta[name="description"]'), `${path} description`).toHaveAttribute(
        "content",
        /\S+/,
      );

      for (const property of ["og:title", "og:description", "og:url", "og:image"]) {
        await expect(page.locator(`meta[property="${property}"]`), `${path} ${property}`).toHaveAttribute(
          "content",
          /\S+/,
        );
      }
    }
  });

  test("home and blog routes expose structured data", async ({ page }) => {
    const routes = ["/", "/blog", "/blog/foundation-systems"];

    for (const path of routes) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle");

      const payloads = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
        scripts.map((script) => script.textContent ?? "").filter(Boolean),
      );

      expect(payloads.length, `${path} should expose JSON-LD`).toBeGreaterThan(0);

      for (const payload of payloads) {
        const parsed = JSON.parse(payload) as { "@context"?: string } | Array<{ "@context"?: string }>;
        const entries = Array.isArray(parsed) ? parsed : [parsed];

        expect(entries.some((entry) => entry["@context"] === "https://schema.org"), `${path} schema context`).toBe(
          true,
        );
      }
    }
  });

  test("sitemap.xml and robots.txt are accessible", async ({ page, request }) => {
    await gotoPage(page, pageRoutes[0]!);

    const sitemapResponse = await request.get("/sitemap.xml");
    expect(sitemapResponse.ok()).toBeTruthy();
    const sitemapXml = await sitemapResponse.text();
    const sitemapCheck = await page.evaluate((xml) => {
      const document = new DOMParser().parseFromString(xml, "application/xml");

      return {
        parserError: document.querySelector("parsererror")?.textContent ?? null,
        root: document.documentElement.tagName,
        urlCount: document.querySelectorAll("urlset > url").length,
        hasHomepage: Array.from(document.querySelectorAll("url > loc")).some(
          (node) => node.textContent === "https://shaeelafsar.com/",
        ),
      };
    }, sitemapXml);

    expect(sitemapCheck.parserError).toBeNull();
    expect(sitemapCheck.root).toBe("urlset");
    expect(sitemapCheck.urlCount).toBeGreaterThan(5);
    expect(sitemapCheck.hasHomepage).toBe(true);

    const robotsResponse = await request.get("/robots.txt");
    expect(robotsResponse.ok()).toBeTruthy();
    const robotsText = await robotsResponse.text();

    expect(robotsText).toContain("User-Agent: *");
    expect(robotsText).toContain("Allow: /");
    expect(robotsText).toContain("Sitemap: https://shaeelafsar.com/sitemap.xml");
  });
});
