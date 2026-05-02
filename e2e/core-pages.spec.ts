import { expect, test } from "@playwright/test";
import {
  expectRouteContent,
  gotoPage,
  navigationRoutes,
  pageRoutes,
  scrollToHeadingWithOffset,
  viewports,
} from "./test-helpers";

const homeRoute = pageRoutes[0]!;
const projectRoute = pageRoutes.find((route) => route.name === "Projects")!;
const blogPostRoute = pageRoutes.find((route) => route.name === "Blog Post")!;
const contactRoute = pageRoutes.find((route) => route.name === "Contact")!;

const viewportMatrix = [
  ["mobile", viewports.sm],
  ["tablet", viewports.md],
  ["desktop", viewports.xl],
] as const;

test.describe("core page coverage", () => {
  test.use({ reducedMotion: "reduce" });

  for (const [viewportName, viewport] of viewportMatrix) {
    test(`all core pages render at ${viewportName} width`, async ({ page }) => {
      await page.setViewportSize(viewport);

      for (const route of pageRoutes) {
        await gotoPage(page, route);
        await expectRouteContent(page, route);
      }
    });
  }

  test("desktop navigation visits every primary page", async ({ page }) => {
    await page.setViewportSize(viewports.xl);
    await gotoPage(page, homeRoute);

    const sequence = [...navigationRoutes.slice(1), homeRoute];

    for (const route of sequence) {
      await page.getByTestId("site-nav").getByRole("link", { name: route.navLabel! }).click();
      await expect(page).toHaveURL(route.path);
      await expectRouteContent(page, route);
    }
  });

  test("mobile navigation opens, closes, and visits every primary page", async ({ page }) => {
    await page.setViewportSize(viewports.sm);
    await gotoPage(page, homeRoute);

    const trigger = page.getByTestId("mobile-menu-trigger");
    const sequence = [...navigationRoutes.slice(1), homeRoute];

    for (const route of sequence) {
      await trigger.click();
      await expect(page.getByTestId("mobile-menu-panel")).toBeVisible();
      await page.getByTestId("mobile-menu-nav").getByRole("link", { name: route.navLabel! }).click();
      await expect(page.getByTestId("mobile-menu-panel")).toBeHidden();
      await expect(page).toHaveURL(route.path);
      await expectRouteContent(page, route);
    }

    await trigger.click();
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("mobile-menu-panel")).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("dark mode toggle persists across reloads and page changes", async ({ page }) => {
    await page.setViewportSize(viewports.xl);
    await gotoPage(page, homeRoute);

    const html = page.locator("html");
    const toggle = page.getByTestId("theme-toggle");

    if (await html.evaluate((element) => element.classList.contains("dark"))) {
      await toggle.click();
      await expect(html).not.toHaveClass(/dark/);
    }

    await toggle.click();
    await expect(html).toHaveClass(/dark/);
    await expect.poll(() => page.evaluate(() => window.localStorage.getItem("theme"))).toBe("dark");

    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    await expect(html).toHaveClass(/dark/);

    await page.getByTestId("site-nav").getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
    await expect(html).toHaveClass(/dark/);

    await page.getByTestId("theme-toggle").click();
    await expect(html).not.toHaveClass(/dark/);
    await expect.poll(() => page.evaluate(() => window.localStorage.getItem("theme"))).toBe("light");
  });

  test("project filters update active state and URL", async ({ page }) => {
    await page.setViewportSize(viewports.xl);
    await gotoPage(page, projectRoute);

    const allFilter = page.getByTestId("filter-pill-all");
    const frontendFilter = page.getByTestId("filter-pill-frontend");
    const backendFilter = page.getByTestId("filter-pill-backend");

    await expect(allFilter).toHaveAttribute("aria-pressed", "true");

    await frontendFilter.click();
    await expect(page).toHaveURL(/\/projects\?tag=frontend$/);
    await expect(frontendFilter).toHaveAttribute("aria-pressed", "true");
    await expect(allFilter).toHaveAttribute("aria-pressed", "false");
    await expect(page.getByTestId("projects-grid").getByText("Frontend", { exact: true }).first()).toBeVisible();

    await backendFilter.click();
    await expect(page).toHaveURL(/\/projects\?tag=backend$/);
    await expect(backendFilter).toHaveAttribute("aria-pressed", "true");
    await expect(frontendFilter).toHaveAttribute("aria-pressed", "false");
    await expect(page.getByTestId("projects-grid").getByText("Backend", { exact: true }).first()).toBeVisible();

    await allFilter.click();
    await expect(page).toHaveURL("/projects");
    await expect(allFilter).toHaveAttribute("aria-pressed", "true");
  });

  test("contact form shows validation errors and then submits successfully", async ({ page }) => {
    await page.setViewportSize(viewports.xl);
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
      "I would like help validating the final responsive and accessibility pass for this launch.",
    );
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByRole("button", { name: "Sending..." })).toBeDisabled();
    await expect(page.getByTestId("contact-status")).toContainText(
      "Thanks — your message was sent successfully. I’ll get back to you soon.",
    );
    await expect(page.getByTestId("contact-name")).toHaveValue("");
    await expect(page.getByTestId("contact-email")).toHaveValue("");
    await expect(page.getByTestId("contact-message")).toHaveValue("");
  });

  test("contact form can surface the mocked service error state", async ({ page }) => {
    await page.setViewportSize(viewports.xl);
    await gotoPage(page, contactRoute);

    await page.getByTestId("contact-name").fill("Roy Tester");
    await page.getByTestId("contact-email").fill("tester@example.com");
    await page.getByTestId("contact-subject").fill("demo error please");
    await page.getByTestId("contact-message").fill(
      "Trigger the demo failure so the error state remains covered in the end-to-end suite.",
    );
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByTestId("contact-status")).toContainText(
      "The message service is temporarily unavailable. Please try again in a moment.",
    );
    await expect(page.getByTestId("contact-name")).toHaveValue("Roy Tester");
  });

  test("desktop blog posts render a table of contents with scroll spy highlighting", async ({ page }) => {
    await page.setViewportSize(viewports.xl);
    await gotoPage(page, blogPostRoute);

    const toc = page.locator('[data-testid="table-of-contents"]:visible');
    const tocButton = toc.getByRole("button", { name: "Design tokens before components" });

    await expect(toc).toBeVisible();
    await scrollToHeadingWithOffset(page, "design-tokens-before-components");
    await expect(tocButton).toHaveClass(/bg-accent-soft/);
  });
});
