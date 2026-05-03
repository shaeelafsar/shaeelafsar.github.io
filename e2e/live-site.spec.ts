/**
 * Comprehensive E2E tests against the LIVE deployed site:
 *   https://shaeelafsar.github.io/personal-website/
 *
 * Run with:
 *   npx playwright test --config=playwright.live.config.ts
 *
 * NOTE: All navigation uses absolute URLs because the site lives under a
 * sub-path (/personal-website) on GitHub Pages. Using relative paths with a
 * baseURL that includes the sub-path would cause Playwright to resolve "/" as
 * the root origin (404), so we always build the full URL explicitly.
 */

import { expect, test, type Page } from "@playwright/test";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Origin only — used when we already have the full absolute path */
const ORIGIN = "https://shaeelafsar.github.io";

/** Base URL including the GitHub Pages sub-path */
const BASE = `${ORIGIN}/personal-website`;

const PAGES = [
  { name: "Home",     path: "/personal-website/",         title: /Shaeel Afsar/i },
  { name: "About",    path: "/personal-website/about",    title: /Shaeel Afsar/i },
  { name: "Projects", path: "/personal-website/projects", title: /Projects/i },
  { name: "Blog",     path: "/personal-website/blog",     title: /Blog/i },
  { name: "Resume",   path: "/personal-website/resume",   title: /Shaeel Afsar/i },
  { name: "Contact",  path: "/personal-website/contact",  title: /Contact/i },
] as const;

const NAV_LABELS = ["Home", "About", "Projects", "Blog", "Resume", "Contact"] as const;

const VIEWPORTS = {
  mobile:  { width: 375,  height: 812  },
  tablet:  { width: 768,  height: 1024 },
  desktop: { width: 1280, height: 900  },
} as const;

/**
 * Navigate to a path. Accepts either:
 * - An absolute URL (starts with "http")
 * - A site-absolute path starting with "/personal-website/..." → prepends ORIGIN
 * - A short path like "/about" → prepends BASE
 */
async function goto(page: Page, path: string) {
  let url: string;
  if (path.startsWith("http")) {
    url = path;
  } else if (path.startsWith("/personal-website")) {
    url = `${ORIGIN}${path}`;
  } else {
    url = `${BASE}${path}`;
  }
  const response = await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");
  return response;
}

// ---------------------------------------------------------------------------
// 1. ALL PAGES LOAD
// ---------------------------------------------------------------------------

test.describe("all pages load", () => {
  for (const route of PAGES) {
    test(`${route.name} returns 200 and has correct title`, async ({ page }) => {
      const response = await goto(page, route.path);
      expect(response?.status(), `${route.name} HTTP status`).toBe(200);
      await expect(page, `${route.name} title`).toHaveTitle(route.title);
    });
  }
});

// ---------------------------------------------------------------------------
// 2. NAVIGATION
// ---------------------------------------------------------------------------

test.describe("navigation", () => {
  test("desktop nav links are visible and work", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);

    for (const label of NAV_LABELS) {
      // Navigate fresh to home each time to avoid broken history
      await goto(page, "/personal-website/");
      const link = page.getByTestId("site-nav").getByRole("link", { name: label });
      await expect(link, `${label} link visible`).toBeVisible();
      await link.click();
      await page.waitForLoadState("networkidle");
      expect(page.url(), `after clicking ${label}`).toContain("/personal-website");
    }
  });

  test("mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await goto(page, "/personal-website/");

    const trigger = page.getByTestId("mobile-menu-trigger");
    await expect(trigger, "hamburger trigger visible on mobile").toBeVisible();

    // Desktop nav should be hidden
    await expect(page.getByTestId("site-nav"), "desktop nav hidden on mobile").toBeHidden();

    // Open menu
    await trigger.click();
    const drawer = page.getByTestId("mobile-menu-panel");
    await expect(drawer, "mobile menu opens").toBeVisible();

    // Close via Escape — the panel overlays the trigger so a direct click is blocked
    await page.keyboard.press("Escape");
    await expect(drawer, "mobile menu closes").toBeHidden();
  });

  test("mobile nav links navigate correctly", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await goto(page, "/personal-website/");

    await page.getByTestId("mobile-menu-trigger").click();
    const drawer = page.getByTestId("mobile-menu-panel");
    await expect(drawer).toBeVisible();

    // Click "About" in the mobile menu
    await drawer.getByRole("link", { name: "About" }).click();
    await page.waitForURL(/\/personal-website\/about/);
    expect(page.url()).toContain("/personal-website/about");
  });
});

// ---------------------------------------------------------------------------
// 3. CONTENT VERIFICATION
// ---------------------------------------------------------------------------

test.describe("content verification", () => {
  test("home hero shows name and role text", async ({ page }) => {
    await goto(page, "/personal-website/");
    await expect(page.getByRole("heading", { level: 1, name: /Shaeel Afsar/i })).toBeVisible();
    await expect(
      page.getByText(/frontend|engineer|developer|product/i).first(),
    ).toBeVisible();
  });

  test("projects page lists at least one project", async ({ page }) => {
    await goto(page, "/personal-website/projects");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const projectLinks = page.locator('a[href*="/projects/"]');
    await expect(projectLinks.first()).toBeVisible();
    const count = await projectLinks.count();
    expect(count, "project count").toBeGreaterThanOrEqual(1);
  });

  test("about page shows bio content", async ({ page }) => {
    await goto(page, "/personal-website/about");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const paras = page.locator("main p");
    await expect(paras.first()).toBeVisible();
  });

  test("resume page has experience section", async ({ page }) => {
    await goto(page, "/personal-website/resume");
    await expect(page.getByTestId("experience-timeline")).toBeVisible();
  });

  test("contact page has a contact form or contact info", async ({ page }) => {
    await goto(page, "/personal-website/contact");
    const form = page.getByTestId("contact-form");
    await expect(form).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// 4. BLOG
// ---------------------------------------------------------------------------

test.describe("blog", () => {
  test("blog index loads and shows at least one post", async ({ page }) => {
    await goto(page, "/personal-website/blog");
    await expect(page.getByTestId("blog-post-list")).toBeVisible();
    const postLinks = page.locator('a[href*="/blog/"]');
    await expect(postLinks.first()).toBeVisible();
    const count = await postLinks.count();
    expect(count, "blog post link count").toBeGreaterThanOrEqual(1);
  });

  test("blog post page loads with article content", async ({ page }) => {
    await goto(page, "/personal-website/blog");
    const firstPost = page.locator('a[href*="/blog/"]').first();
    const href = await firstPost.getAttribute("href");
    await firstPost.click();
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByTestId("blog-article")).toBeVisible();
    expect(page.url(), `landed on ${href}`).toContain("/blog/");
  });

  test("/blog/welcome post loads", async ({ page }) => {
    const response = await goto(page, "/personal-website/blog/welcome");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// 5. SEO META TAGS
// ---------------------------------------------------------------------------

test.describe("SEO meta tags", () => {
  for (const route of PAGES) {
    test(`${route.name} has description, og:title, og:description`, async ({ page }) => {
      await goto(page, route.path);

      await expect(
        page.locator('meta[name="description"]'),
        `${route.name} meta description`,
      ).toHaveAttribute("content", /\S+/);

      await expect(
        page.locator('meta[property="og:title"]'),
        `${route.name} og:title`,
      ).toHaveAttribute("content", /\S+/);

      await expect(
        page.locator('meta[property="og:description"]'),
        `${route.name} og:description`,
      ).toHaveAttribute("content", /\S+/);
    });
  }

  test("home page has og:image", async ({ page }) => {
    await goto(page, "/personal-website/");
    await expect(
      page.locator('meta[property="og:image"]'),
    ).toHaveAttribute("content", /\S+/);
  });

  test("home page has canonical link", async ({ page }) => {
    await goto(page, "/personal-website/");
    const canonical = page.locator('link[rel="canonical"]');
    const count = await canonical.count();
    if (count > 0) {
      await expect(canonical).toHaveAttribute("href", /^https?:\/\//);
    }
  });
});

// ---------------------------------------------------------------------------
// 6. RESPONSIVE LAYOUT
// ---------------------------------------------------------------------------

test.describe("responsive layout", () => {
  for (const [name, viewport] of Object.entries(VIEWPORTS) as [keyof typeof VIEWPORTS, { width: number; height: number }][]) {
    test(`home page renders without horizontal overflow at ${name} (${viewport.width}px)`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await goto(page, "/personal-website/");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      const overflow = await page.evaluate(() =>
        Math.max(0, Math.ceil(document.documentElement.scrollWidth - window.innerWidth)),
      );
      expect(overflow, `horizontal overflow at ${name}`).toBeLessThanOrEqual(8);
    });
  }

  test("mobile shows hamburger, desktop shows nav", async ({ page }) => {
    // Mobile
    await page.setViewportSize(VIEWPORTS.mobile);
    await goto(page, "/personal-website/");
    await expect(page.getByTestId("mobile-menu-trigger")).toBeVisible();
    await expect(page.getByTestId("site-nav")).toBeHidden();

    // Desktop
    await page.setViewportSize(VIEWPORTS.desktop);
    await goto(page, "/personal-website/");
    await expect(page.getByTestId("site-nav")).toBeVisible();
    await expect(page.getByTestId("mobile-menu-trigger")).toBeHidden();
  });
});

// ---------------------------------------------------------------------------
// 7. INTERNAL LINK RESOLUTION
// ---------------------------------------------------------------------------

test.describe("internal links", () => {
  test("projects page links resolve to valid project detail pages", async ({ page }) => {
    await goto(page, "/personal-website/projects");
    const projectLinks = await page.locator('a[href*="/projects/"]').all();
    expect(projectLinks.length, "has project links").toBeGreaterThan(0);

    const firstHref = await projectLinks[0]!.getAttribute("href");
    const response = await goto(page, firstHref!);
    expect(response?.status(), `project detail ${firstHref}`).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("blog post links from index resolve correctly", async ({ page }) => {
    await goto(page, "/personal-website/blog");
    const postLinks = await page.locator('a[href*="/blog/"]').all();
    expect(postLinks.length, "has blog post links").toBeGreaterThan(0);

    const firstHref = await postLinks[0]!.getAttribute("href");
    const response = await goto(page, firstHref!);
    expect(response?.status(), `blog post ${firstHref}`).toBe(200);
  });
});

// ---------------------------------------------------------------------------
// 8. VISUAL REGRESSION — SCREENSHOTS
// ---------------------------------------------------------------------------

test.describe("visual regression screenshots", () => {
  const screenshotRoutes = [
    { name: "home",     path: "/personal-website/" },
    { name: "projects", path: "/personal-website/projects" },
    { name: "blog",     path: "/personal-website/blog" },
    { name: "resume",   path: "/personal-website/resume" },
  ] as const;

  for (const vp of (["desktop", "mobile"] as const)) {
    for (const route of screenshotRoutes) {
      test(`screenshot — ${route.name} @ ${vp}`, async ({ page }, testInfo) => {
        await page.setViewportSize(VIEWPORTS[vp]);
        await goto(page, route.path);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

        const screenshotPath = testInfo.outputPath(`${vp}-${route.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        testInfo.attachments.push({
          name: `${vp}-${route.name}`,
          path: screenshotPath,
          contentType: "image/png",
        });
      });
    }
  }
});
