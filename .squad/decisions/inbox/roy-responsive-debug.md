# Roy — Responsive debug test decision

- **Date:** 2026-05-03T14:30:40.831-05:00
- **Context:** Existing Playwright config still points at `e2e/`, but responsive debug coverage was requested under `tests/e2e/` and must run against whichever localhost port is already serving the app.
- **Decision:** Keep the canonical diagnostic spec in `tests/e2e/responsive-debug.spec.ts`, add a thin `e2e/responsive-debug.spec.ts` wrapper for the current runner, and make `playwright.config.ts` honor `PLAYWRIGHT_BASE_URL` while reusing an already-running dev server.
- **Why:** This avoids breaking the current suite layout, works in shared local environments where `pnpm dev` may bind to 3001/3002, and gives the team a single reusable diagnostic suite for pre-fix and post-deploy verification.
- **Observed regressions from the first run:** Projects page text overflow at 375px (`Cloud` filter pill) and a non-opening mobile menu on localhost.
