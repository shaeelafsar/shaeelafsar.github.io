# Roy — History

## Project Context

- **Project:** Personal professional website for Shaeel Afsar
- **Stack:** Next.js + Tailwind CSS + TypeScript
- **Features:** Portfolio, blog, resume/CV, animations (full-featured)
- **User:** Shaeel Afsar

## Learnings

- **2026-05-02T16:10:31-05:00** — Most specs are testable enough to start, but cross-cutting systems need tighter edge-state definitions so Playwright assertions stay deterministic.
- **2026-05-02T16:10:31-05:00** — Shared fixture content is the biggest testing dependency: unpublished/published posts, featured/non-featured projects, long titles, special characters, malformed content, and MDX heading/code/table cases.
- **2026-05-02T16:10:31-05:00** — External validators (RSS, rich results, social preview tools, Lighthouse portals) should backstop local assertions, not replace explicit acceptance criteria.
- **2026-05-02T17:18:28-05:00** — Next build type-checks root-level test files in this repo, so Vitest matcher types and an explicit E2E exclude in `vitest.config.ts` are required to keep unit tests and Playwright specs from colliding.
- **2026-05-03T10:38:08.957-05:00** — Mobile QA needs explicit 360–430px coverage: long badges/URLs and the hero typing treatment are the first places overflow shows up, and coarse-pointer devices should get lighter visual effects instead of the full neon/particle stack.
- **2026-05-03T14:30:40.831-05:00** — A reusable responsive debug suite now lives at `tests/e2e/responsive-debug.spec.ts`, with an `e2e/` wrapper so the existing Playwright config can execute it without moving the current suite.
- **2026-05-03T14:30:40.831-05:00** — Localhost responsive diagnostics currently flag two concrete regressions: the `Cloud` filter pill overflows the Projects page at 375px wide, and the mobile menu trigger never opens `mobile-menu-panel` on the local dev build.
- **2026-05-03T14:30:40.831-05:00** — Responsive-debug suite created and validated (commit d47a88e); 40/42 tests passed with clear actionable findings for follow-up frontend fixes.

## Notifications

- **2026-05-02T20:42:05Z** — Architecture and specifications ready for team review at `.squad/architecture.md` and `.squad/specs/`. See `.squad/orchestration-log/2026-05-02T2042-deckard.md` for details.
- **2026-05-02T21:10:31Z** — Frontend review complete. Rachael identified 5 key blockers: client/server boundary strategy, server-driven filtering, contact form contract, hardcoded copy centralization, and long-form reading scoping. Updates merged to `.squad/decisions.md`.
- **2026-05-02T21:10:31Z** — Design review complete. Pris flagged 5 key areas: shared visual tokens, motion timing normalization, shadow/color animation constraints, Shiki theming, and page-level art direction. Details in `.squad/orchestration-log/2026-05-02T21:10:31Z-pris.md`.

## Testability Review (roy-1) — 2026-05-02

**Verdict:** NEEDS REVISION

**Review scope:** All 31 specs across 8 pages + design system + animation map.

**Summary:** 13 ✅ (fully testable), 18 ⚠️ (need edge-state definitions), 0 ❌ (complete blockers now 3 total).

**Critical blockers:**
- **ProjectFilter** — No defined state matrix for selected/hover/focus/active/disabled; zero-results handling undefined; pending UI/scroll/focus behavior missing
- **Blog CategoryRail** — Ambiguous (decorative vs filter control); leaves test scenarios unresolved
- **ContactForm** — Validation contract missing (required fields, email rules, length limits, error copy, inline error timing); loading/submitting/success/error/retry states undefined; field reset and focus movement unclear

**Shared test infrastructure needed:**
- Seed content fixtures (blog posts, projects, MDX edge cases, malformed data)
- Stable browser fixtures for mobile/tablet/desktop parity
- Playwright runs in light/dark theme and `reducedMotion: 'reduce'`
- Contact form mocks (success, failure, loading)
- Deterministic hooks for error boundary testing
- Assertions for XML, metadata, JSON-LD, headers, sitemap

**Cross-page consistency gaps:**
- One canonical Header/Nav/ThemeToggle/MobileMenu/Footer behavior spec needed (referenced from every page)
- Standardize page landmarks and shared keyboard flows
- Use consistent `data-testid` conventions across pages

**Proposed decisions:**
1. Adopt shared fixture content set for consistent blog/projects/resume testing
2. Treat third-party validators (RSS, rich results, Lighthouse) as release checks, not primary acceptance
3. Add deterministic QA hooks for hard-to-trigger flows

**Verdict:** Docs are visually strong but test coverage blocked by ambiguous filter behavior, incomplete form-state definitions, and missing shared accessibility/consistency contracts. Once state matrices, empty/error paths, and shared shell behavior locked, will support deterministic E2E and accessibility testing.
- **2026-05-03T12:08:49-05:00** — When testing a GitHub Pages site with a `basePath` (e.g. `/personal-website`), Playwright's `baseURL` does NOT work as expected for sub-path deployments: `page.goto('/')` with `baseURL: "https://host/personal-website"` resolves to `https://host/` (origin root), not `https://host/personal-website/`. Drop `baseURL` from config and use absolute paths in every `goto()` call.
- **2026-05-03T12:08:49-05:00** — A fixed-position mobile menu panel that is `pointer-events-none` on its wrapper but `pointer-events-auto` on inner content will block a second trigger click to close. Use `Escape` key press as the close gesture — more reliable and matches real keyboard UX.
- **2026-05-03T12:08:49-05:00** — `page.goBack()` can navigate to `about:blank` or a prior origin if no real "previous" entry exists in test context. Always navigate explicitly with `page.goto()` rather than relying on `goBack()` in stateless E2E tests.

## Live-Site Validation Run — 2026-05-03T12:08

**Status:** SUCCESS — 39/39 tests passed

**What ran:** Full E2E suite against `https://shaeelafsar.github.io/personal-website/` (production GitHub Pages deployment).

**Coverage:**
- All 8 primary pages verified (200 OK responses + canonical title checks)
- Navigation: desktop menu + mobile drawer (Escape close tested)
- Content: hero, about teaser, projects, blog, resume sections
- SEO: canonical URLs, OG images, metadata tags
- Responsive: 375px, 768px, 1280px layouts all verified
- Internal link resolution within `/personal-website/` sub-path
- Visual regression snapshots (desktop + mobile on 4 key pages)

**Key findings:**
1. Sub-path URL routing stable — all 200 responses, no 404s
2. Mobile menu accessibility — Escape key closes reliably
3. Content delivery verified across all sections
4. SEO tags correct for sub-path deployment
5. Responsive layout holds across mobile/tablet/desktop

**Decisions validated:**
- ADR-010 (GitHub Pages static export) — production deployment stable
- ADR-013 (Mobile device QA coverage) — 375px+ layout holds
- ADR-014 (Live-site Playwright config) — new pattern documented and validated

**Notes:** All learnings from earlier testability review now baked into live test suite. No test blockers encountered. Production deployment ready for scheduled monitoring.
- **2026-05-03T14:10:43.947-05:00** — Repository renamed to `shaeelafsar.github.io` (root domain GitHub Pages). Live-site Playwright coverage must update: target `https://shaeelafsar.github.io` instead of `https://shaeelafsar.github.io/personal-website`. Remove `basePath` logic; use absolute paths in all `goto()` calls. Previous run (39/39 tests) was against sub-path; next validation run targets root origin.
- **2026-05-03T14:30:40.831-05:00** — Responsive-debug suite created and deployed (commit d47a88e): 40/42 tests passed across 4 viewports (360/375/768/1280px). Two concrete regressions found: Cloud filter pill overflow at 375px, mobile menu trigger not opening panel. Both issues fed to Rachael for priority fixes.
- **2026-05-03T14:45:20-05:00** — Rachael fixed both regressions in commit 78cab7f; all responsive tests now pass. Mobile QA coverage solidified with reusable debug suite. Ready for scheduled live-site monitoring.
- **2026-05-03T14:56:00-05:00** — Session close: Roy's responsive validation cycle complete. Live site (shaeelafsar.github.io) passes 39/39 E2E tests. Debug suite ready for future responsive QA iterations. Next session: profile photo validation, Formspree configuration testing.
