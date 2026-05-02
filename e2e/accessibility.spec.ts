import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { expectRouteContent, gotoPage, pageRoutes, viewports } from "./test-helpers";

async function expectAllImagesHaveAltText(page: import("@playwright/test").Page) {
  const imagesWithoutAlt = await page.evaluate(() => {
    const isVisibleElement = (element: Element) => {
      if (!(element instanceof HTMLElement)) {
        return false;
      }

      if (element.hidden || element.getAttribute("aria-hidden") === "true") {
        return false;
      }

      const style = window.getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden";
    };

    return Array.from(document.querySelectorAll("img"))
      .filter((image) => isVisibleElement(image))
      .map((image) => image.getAttribute("alt") ?? "")
      .filter((alt) => alt.trim().length === 0);
  });

  expect(imagesWithoutAlt).toEqual([]);
}

async function expectHeadingOrder(page: import("@playwright/test").Page) {
  const headingLevels = await page.evaluate(() => {
    const isVisibleElement = (element: Element) => {
      if (!(element instanceof HTMLElement)) {
        return false;
      }

      if (element.hidden || element.getAttribute("aria-hidden") === "true") {
        return false;
      }

      const style = window.getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden";
    };

    return Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
      .filter((heading) => isVisibleElement(heading))
      .map((heading) => Number.parseInt(heading.tagName.slice(1), 10));
  });

  expect(headingLevels[0]).toBe(1);

  for (let index = 1; index < headingLevels.length; index += 1) {
    expect(headingLevels[index]! - headingLevels[index - 1]!).toBeLessThanOrEqual(1);
  }
}

async function expectVisibleFormControlsAreLabeled(page: import("@playwright/test").Page) {
  const unlabeledControls = await page.evaluate(() => {
    const isVisibleElement = (element: Element) => {
      if (!(element instanceof HTMLElement)) {
        return false;
      }

      if (element.hidden || element.getAttribute("aria-hidden") === "true") {
        return false;
      }

      const style = window.getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden";
    };

    return Array.from(document.querySelectorAll("input, textarea, select"))
      .filter((control) => {
        const element = control as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

        if (element.type === "hidden") {
          return false;
        }

        return isVisibleElement(element);
      })
      .map((control) => {
        const element = control as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        const label = element.labels?.[0]?.textContent?.trim();
        const ariaLabel = element.getAttribute("aria-label")?.trim();
        const ariaLabelledBy = element.getAttribute("aria-labelledby")?.trim();

        return {
          name: element.getAttribute("name") ?? element.id,
          labeled: Boolean(label || ariaLabel || ariaLabelledBy),
        };
      })
      .filter((control) => !control.labeled);
  });

  expect(unlabeledControls).toEqual([]);
}

test.describe("accessibility audit", () => {
  test.use({ reducedMotion: "reduce", viewport: viewports.xl });

  for (const route of pageRoutes) {
    test(`${route.name} passes axe and semantic accessibility checks`, async ({ page }) => {
      await gotoPage(page, route);
      await expectRouteContent(page, route);

      const accessibilityScan = await new AxeBuilder({ page }).analyze();

      expect(accessibilityScan.violations).toEqual([]);
      await expectAllImagesHaveAltText(page);
      await expectHeadingOrder(page);
      await expectVisibleFormControlsAreLabeled(page);
    });
  }

  test("keyboard navigation keeps focus visible on shared and form controls", async ({ page, browserName }) => {
    await gotoPage(page, pageRoutes[0]!);

    const skipLink = page.getByRole("link", { name: "Skip to content" });
    for (let index = 0; index < 3; index += 1) {
      await page.keyboard.press("Tab");
      if (await skipLink.evaluate((element) => element === document.activeElement)) {
        break;
      }
    }
    await expect(skipLink).toBeVisible();

    const homeLink = page.getByRole("link", { name: /^Shaeel Afsar/ });
    if (browserName !== "webkit") {
      if (await skipLink.evaluate((element) => element === document.activeElement)) {
        await expect(skipLink).toBeFocused();
        await page.keyboard.press("Tab");
      }
      await expect(homeLink).toBeFocused();
      await expect(homeLink).toBeInViewport();
    }

    await gotoPage(page, pageRoutes.find((route) => route.name === "Contact")!);

    const nameInput = page.getByTestId("contact-name");
    for (let index = 0; index < 20; index += 1) {
      if (await nameInput.evaluate((element) => element === document.activeElement)) {
        break;
      }

      await page.keyboard.press("Tab");
    }

    await expect(nameInput).toBeFocused();
    await expect(nameInput).toBeInViewport();
  });
});
