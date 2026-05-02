import { expect, type Page } from "@playwright/test";

export const viewports = {
  sm: { width: 375, height: 812 },
  md: { width: 768, height: 1024 },
  lg: { width: 1024, height: 768 },
  xl: { width: 1280, height: 900 },
} as const;

type PageRoute = {
  name: string;
  path: string;
  heading: string;
  headingLevel?: 1 | 2 | 3;
  status?: number;
  testId?: string;
  text?: string;
  navLabel?: string;
};

export const pageRoutes: PageRoute[] = [
  {
    name: "Home",
    path: "/",
    heading: "Shaeel Afsar",
    testId: "home-hero",
    navLabel: "Home",
  },
  {
    name: "About",
    path: "/about",
    heading: "Shaeel Afsar",
    testId: "about-intro",
    navLabel: "About",
  },
  {
    name: "Projects",
    path: "/projects",
    heading: "Projects built with product clarity and a frontend-first eye.",
    testId: "projects-filter",
    navLabel: "Projects",
  },
  {
    name: "Project Detail",
    path: "/projects/personal-website-foundation",
    heading: "Personal website foundation",
    testId: "project-mdx-body",
  },
  {
    name: "Blog",
    path: "/blog",
    heading: "Essays about frontend craft, technical systems, and the product choices behind them.",
    testId: "blog-post-list",
    navLabel: "Blog",
  },
  {
    name: "Blog Post",
    path: "/blog/foundation-systems",
    heading: "Designing the foundation for a calm, technical portfolio",
    testId: "blog-article",
  },
  {
    name: "Resume",
    path: "/resume",
    heading: "Shaeel Afsar",
    testId: "experience-timeline",
    navLabel: "Resume",
  },
  {
    name: "Contact",
    path: "/contact",
    heading: "Get in Touch",
    testId: "contact-form",
    navLabel: "Contact",
  },
  {
    name: "404",
    path: "/missing-route",
    heading: "Page not found",
    status: 404,
    text: "The page you were looking for has moved, expired, or never made it out of draft mode.",
  },
];

export const navigationRoutes = pageRoutes.filter((route) => route.navLabel);
export const responsiveRoutes = pageRoutes;

export async function gotoPage(page: Page, route: PageRoute) {
  const response = await page.goto(route.path, { waitUntil: "domcontentloaded" });

  await page.waitForLoadState("networkidle");
  expect(response?.status() ?? 0).toBe(route.status ?? 200);
}

export async function expectRouteContent(page: Page, route: PageRoute) {
  await expect(
    page.getByRole("heading", {
      level: route.headingLevel ?? 1,
      name: route.heading,
    }),
  ).toBeVisible();

  if (route.testId) {
    await expect(page.getByTestId(route.testId)).toBeVisible();
  }

  if (route.text) {
    await expect(page.getByText(route.text)).toBeVisible();
  }
}

export async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const root = document.documentElement;

    return Math.max(0, Math.ceil(root.scrollWidth - window.innerWidth));
  });

  expect(overflow).toBeLessThanOrEqual(8);
}

export async function scrollToHeadingWithOffset(page: Page, id: string, offset = 112) {
  await page.evaluate(
    ({ headingId, headingOffset }) => {
      const heading = document.getElementById(headingId);

      if (!heading) {
        return;
      }

      const top = heading.getBoundingClientRect().top + window.scrollY - headingOffset;
      window.scrollTo({ top, behavior: "auto" });
      window.dispatchEvent(new Event("scroll"));
    },
    { headingId: id, headingOffset: offset },
  );
}

export function screenshotName(viewportName: string, route: PageRoute) {
  return `${viewportName}-${route.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
}
