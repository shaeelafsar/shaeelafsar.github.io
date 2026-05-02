import { expect, test, type BrowserContext, type Page } from "@playwright/test";
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

async function createAuditPage(context: BrowserContext) {
  const auditPage = await context.newPage();
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  auditPage.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  auditPage.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  await auditPage.addInitScript(() => {
    const imageErrors: string[] = [];

    window.addEventListener(
      "error",
      (event) => {
        const target = event.target;

        if (target instanceof HTMLImageElement) {
          imageErrors.push(target.currentSrc || target.src || target.getAttribute("src") || "unknown-image");
        }
      },
      true,
    );

    (window as Window & { __imageErrors?: string[] }).__imageErrors = imageErrors;
  });

  return { auditPage, consoleErrors, pageErrors };
}

async function expectNoBrokenImages(page: Page) {
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll<HTMLImageElement>("img"));

    for (const image of images) {
      image.scrollIntoView({ block: "center", behavior: "auto" });
      if (!image.complete) {
        await new Promise((resolve) => window.setTimeout(resolve, 50));
      }
    }
  });

  const brokenImages = await page.locator("img").evaluateAll((images) => {
    return images
      .map((image) => {
        const element = image as HTMLImageElement;

        return {
          src: element.currentSrc || element.src,
          complete: element.complete,
          naturalWidth: element.naturalWidth,
        };
      })
      .filter((image) => image.src && image.complete && image.naturalWidth === 0);
  });
  const imageErrors = await page.evaluate(() => {
    return (window as Window & { __imageErrors?: string[] }).__imageErrors ?? [];
  });

  expect(brokenImages).toEqual([]);
  expect(imageErrors).toEqual([]);
}

async function collectInternalLinks(page: Page) {
  return page.evaluate(() => {
    const origin = window.location.origin;

    return Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]'))
      .map((anchor) => anchor.href)
      .filter((href) => href.startsWith(origin))
      .map((href) => {
        const url = new URL(href);
        return `${url.pathname}${url.search}`;
      });
  });
}

const homeRoute = pageRoutes[0]!;
const contactRoute = pageRoutes.find((route) => route.name === "Contact")!;
const resumeRoute = pageRoutes.find((route) => route.name === "Resume")!;

test.describe("final qa regression", () => {
  test.use({ reducedMotion: "reduce", viewport: viewports.xl });

  test("every page loads without console errors and without broken images", async ({ page }) => {
    const paths = await discoverContentPaths(page);

    for (const path of paths) {
      const { auditPage, consoleErrors, pageErrors } = await createAuditPage(page.context());
      const response = await auditPage.goto(path, { waitUntil: "domcontentloaded" });

      await auditPage.waitForLoadState("networkidle");
      expect(response?.status() ?? 0, `${path} status`).toBe(path === "/nonexistent-page" ? 404 : 200);
      expect([...consoleErrors, ...pageErrors], `${path} client errors`).toEqual([]);
      await expectNoBrokenImages(auditPage);
      await auditPage.close();
    }
  });

  test("all internal links resolve without broken destinations", async ({ page, request }) => {
    const paths = await discoverContentPaths(page);
    const links = new Set<string>();

    for (const path of paths) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle");

      for (const link of await collectInternalLinks(page)) {
        links.add(link);
      }
    }

    for (const link of links) {
      const response = await request.get(link);
      expect(response.status(), `${link} should resolve successfully`).toBeLessThan(400);
    }
  });

  test("blog posts render mdx content correctly", async ({ page }) => {
    const blogPaths = (await discoverContentPaths(page)).filter((path) => path.startsWith("/blog/"));

    expect(blogPaths.length).toBeGreaterThan(0);

    for (const path of blogPaths) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle");
      await expect(page.getByTestId("blog-article")).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator('[data-testid="blog-article"] h2').first()).toBeVisible();
    }

    await page.goto("/blog/foundation-systems", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    await expect(page.locator('[data-testid="blog-article"] table')).toBeVisible();
    await expect(page.locator('[data-testid="blog-article"] pre')).toBeVisible();
    await expect(page.locator('[data-testid="blog-article"] blockquote, [data-testid="blog-article"] [role="note"]').first()).toBeVisible();
  });

  test("project detail pages render correctly", async ({ page }) => {
    const projectPaths = (await discoverContentPaths(page)).filter((path) => path.startsWith("/projects/"));

    expect(projectPaths.length).toBeGreaterThan(0);

    for (const path of projectPaths) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle");
      await expect(page.getByTestId("project-detail-header")).toBeVisible();
      await expect(page.getByTestId("project-hero-image")).toBeVisible();
      await expect(page.getByTestId("project-mdx-body")).toBeVisible();
    }

    await page.goto("/projects/personal-website-foundation", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    await expect(page.locator('[data-testid="project-mdx-body"] table')).toBeVisible();
    await expect(page.locator('[data-testid="project-mdx-body"] pre')).toBeVisible();
  });

  test("contact form validation and success states work", async ({ page }) => {
    await gotoPage(page, contactRoute);

    await page.getByTestId("contact-email").fill("tester@example.com");
    await page.getByTestId("contact-message").fill("short");
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByTestId("contact-status")).toContainText(
      "Please review the highlighted fields and try again.",
    );
    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(page.getByText("Please share a bit more detail.")).toBeVisible();

    await page.getByTestId("contact-name").fill("Roy Tester");
    await page.getByTestId("contact-message").fill(
      "I am running the final regression pass to verify content, interactions, and release readiness.",
    );
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByRole("button", { name: "Sending..." })).toBeDisabled();
    await expect(page.getByTestId("contact-status")).toContainText(
      "Thanks — your message was sent successfully. I’ll get back to you soon.",
    );
  });

  test("resume data is visible and mobile navigation plus theme persistence work", async ({ page }) => {
    await gotoPage(page, resumeRoute);
    await expect(page.getByTestId("resume-hero")).toContainText("Shaeel Afsar");
    await expect(page.getByText("Independent Consulting")).toBeVisible();
    await expect(page.getByText("DevOps & Tooling")).toBeVisible();
    await expect(page.getByTestId("resume-download")).toHaveAttribute("href", "/resume.pdf");

    await page.setViewportSize(viewports.sm);
    await gotoPage(page, homeRoute);

    const html = page.locator("html");
    const themeToggle = page.getByTestId("theme-toggle");

    if (await html.evaluate((element) => element.classList.contains("dark"))) {
      await themeToggle.click();
      await expect(html).not.toHaveClass(/dark/);
    }

    await themeToggle.click();
    await expect(html).toHaveClass(/dark/);

    await page.getByTestId("mobile-menu-trigger").click();
    await expect(page.getByTestId("mobile-menu-panel")).toBeVisible();
    await page.getByTestId("mobile-menu-nav").getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
    await expect(html).toHaveClass(/dark/);
  });

  test("rss feed is valid xml and 404 page renders correctly", async ({ page, request }) => {
    const rssResponse = await request.get("/rss.xml");
    expect(rssResponse.ok()).toBeTruthy();
    const rssXml = await rssResponse.text();
    const rssCheck = await page.evaluate((xml) => {
      const document = new DOMParser().parseFromString(xml, "application/xml");

      return {
        parserError: document.querySelector("parsererror")?.textContent ?? null,
        root: document.documentElement.tagName,
        itemCount: document.querySelectorAll("rss > channel > item").length,
      };
    }, rssXml);

    expect(rssCheck.parserError).toBeNull();
    expect(rssCheck.root).toBe("rss");
    expect(rssCheck.itemCount).toBeGreaterThan(0);

    const response = await page.goto("/nonexistent-page", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");

    expect(response?.status() ?? 0).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
    await expect(page.getByText("The page you were looking for has moved")).toBeVisible();
  });
});
