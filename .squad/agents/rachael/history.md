# Rachael — History

## Project Context

- **Project:** Personal professional website for Shaeel Afsar
- **Stack:** Next.js + Tailwind CSS + TypeScript
- **Features:** Portfolio, blog, resume/CV, animations (full-featured)
- **User:** Shaeel Afsar

## Learnings

- **2026-05-02T16:10:31-05:00** — Most frontend specs are implementable, but the main gaps are shared client/server boundaries (`Header`, `Button`, `ProjectFilter`) rather than visual/layout direction.
- **2026-05-02T16:10:31-05:00** — Long-form content architecture is strong; remaining frontend clarifications are around TOC/reading-progress behavior, MDX image handling, and aligning compiled-content types across specs.
- **2026-05-02T16:10:31-05:00** — The only major implementation blocker is the contact form submission contract; page structure and validation are already clear.
- **2026-05-02T17:18:28-05:00** — Foundation scaffold now lives at the repo root with App Router, Tailwind v4, strict TypeScript, and `next dev --turbopack`; shared frontend helpers are in `lib/metadata.ts`, `lib/utils.ts`, and `types/*.ts`.
- **2026-05-02T17:18:28-05:00** — Active architecture decisions applied during setup: Server Components by default, `next-mdx-remote` for file-based MDX content, Lenis + Framer Motion in the dependency graph, class-based dark-mode groundwork, and reduced-motion protection in `app/globals.css`.
- **2026-05-02T17:18:28-05:00** — Repo-level linting needed an ignore update for orchestration folders (`.squad/`, `.copilot/`) because this project is scaffolded in a non-empty team workspace; Next 16 currently exposes the View Transition experiment as `experimental.viewTransition` in `next.config.ts`.
- **2026-05-02T17:18:28-05:00** — Wave 2 foundation now includes a shared shell (`Header`, `Footer`, desktop `Nav`, `ThemeToggle`, `MobileMenu`), design-system UI primitives in `components/ui/`, and global CSS tokens aligned to Pris's design-system spec.
- **2026-05-02T17:18:28-05:00** — The file-based content pipeline is live with `lib/mdx.ts`, `lib/blog.ts`, `lib/projects.ts`, `lib/resume.ts`, placeholder content under `content/`, and validated `pnpm lint && pnpm build` output on the updated shell.

## Notifications

- **2026-05-02T20:42:05Z** — Architecture and specifications ready for team review at `.squad/architecture.md` and `.squad/specs/`. See `.squad/orchestration-log/2026-05-02T2042-deckard.md` for details.
- **2026-05-02T21:10:31Z** — Design review complete. Pris flagged 5 key areas: shared visual tokens, motion timing normalization, shadow/color animation constraints, Shiki theming, and page-level art direction. Updates merged to `.squad/decisions.md`.
- **2026-05-02T21:10:31Z** — Testing review complete. Roy evaluated all 31 specs: 13 ✅, 18 ⚠️. Proposed shared fixture content set and deterministic QA hooks. Details in `.squad/orchestration-log/2026-05-02T21:10:31Z-roy.md`.
- **2026-05-02T22:18:28Z** — Phase 1 Wave 1-2 completion: Scribe processed inbox decisions (ADRs 011-015), logged orchestration events. Rachael and Pris teams completed foundation successfully. Build passing. Ready for Wave 3 (content pages).

## Implementability Review (rachael-1) — 2026-05-02

**Verdict:** NEEDS REVISION

**Review scope:** Wireframe implementability across 8 pages + design system + animation map.

**Cross-cutting issues:**
- Breakpoint intent 375/768/1280 but missing explicit behavior for 1024-1279 range
- Server/Client boundaries implied, not locked. Need explicit marking: `ThemeToggle`, `MobileMenu`, `ProjectFilter`, `ReadingProgress`, `TableOfContents`, `ContactForm`
- Data-source annotations inconsistent; should label as MDX, frontmatter, static config, or URL-query
- App Router edge states under-documented (loading, error, not-found, empty results, external-link failures)

**Critical blockers:**
- **ContactForm** — Submission contract undefined: Server Action vs third-party endpoint, success payload, validation schema, spam protection, env requirements. Form states incomplete (idle, typing, field error, submit pending, success, error, disabled).
- **ProjectFilter** — No defined state matrix for selected/hover/focus/active/disabled; zero-results handling vague
- **Blog** — CategoryRail ambiguous (decorative vs filter control); data-flow and featured-post handling unclear

**Conditional concerns:**
- home.md: Header client/server ownership unclear; AboutTeaser breakpoint loose; data-source notes needed
- about.md: Multiple layout options vs one final; responsive behavior soft
- blog-post.md: TOC collapsed pattern undefined; Lenis scroll offset behavior unclear
- design-system.md: Missing container widths, max-width, z-index tokens; focus styling incomplete

**Verdict:** Would NOT start full implementation until contact form contract finalized and responsive/client-state ambiguities locked down.
