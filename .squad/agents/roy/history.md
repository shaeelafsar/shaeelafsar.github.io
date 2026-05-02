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
