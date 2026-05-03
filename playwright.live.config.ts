import { defineConfig } from "@playwright/test";

/**
 * Config for running E2E tests against the live deployed site.
 * Run with: npx playwright test --config=playwright.live.config.ts
 */
export default defineConfig({
  testDir: "./e2e",
  testMatch: "live-site.spec.ts",
  fullyParallel: false,
  timeout: 30_000,
  retries: 1,
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    reducedMotion: "reduce",
  },
  projects: [
    {
      name: "chromium-live",
      use: {
        browserName: "chromium",
        viewport: { width: 1280, height: 900 },
      },
    },
  ],
  // No webServer — tests hit the live GitHub Pages URL
});
