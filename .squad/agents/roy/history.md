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
