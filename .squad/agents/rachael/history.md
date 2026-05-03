# Rachael — History

## Project Context

- **Project:** Personal professional website for Shaeel Afsar
- **Stack:** Next.js + Tailwind CSS + TypeScript
- **Features:** Portfolio, blog, resume/CV, animations (full-featured)
- **User:** Shaeel Afsar

## Learnings

- **2026-05-03T10:53:41.977-05:00** — On coarse-pointer/mobile devices, decorative text effects need a hard off-switch instead of relying on hover-only opacity; `GlitchText` now hides duplicate layers entirely on mobile to avoid stacked title copies.
- **2026-05-03T10:53:41.977-05:00** — The hero reads better on phones when it uses content-height-first spacing instead of forcing a viewport-height shell; mobile decorative layers should stay clipped and non-interactive so they never create dead space or block taps.
- **2026-05-03T10:53:41.977-05:00** — Mobile navigation overlays are safest when portaled to `document.body`, which avoids sticky-header/backdrop stacking issues and keeps the drawer tappable above all page art.
- **2026-05-02T16:10:31-05:00** — Most frontend specs are implementable, but the main gaps are shared client/server boundaries (`Header`, `Button`, `ProjectFilter`) rather than visual/layout direction.
- **2026-05-02T16:10:31-05:00** — Long-form content architecture is strong; remaining frontend clarifications are around TOC/reading-progress behavior, MDX image handling, and aligning compiled-content types across specs.
- **2026-05-02T16:10:31-05:00** — The only major implementation blocker is the contact form submission contract; page structure and validation are already clear.
- **2026-05-02T17:18:28-05:00** — Foundation scaffold now lives at the repo root with App Router, Tailwind v4, strict TypeScript, and `next dev --turbopack`; shared frontend helpers are in `lib/metadata.ts`, `lib/utils.ts`, and `types/*.ts`.
- **2026-05-02T17:18:28-05:00** — Active architecture decisions applied during setup: Server Components by default, `next-mdx-remote` for file-based MDX content, Lenis + Framer Motion in the dependency graph, class-based dark-mode groundwork, and reduced-motion protection in `app/globals.css`.
- **2026-05-02T17:18:28-05:00** — Repo-level linting needed an ignore update for orchestration folders (`.squad/`, `.copilot/`) because this project is scaffolded in a non-empty team workspace; Next 16 currently exposes the View Transition experiment as `experimental.viewTransition` in `next.config.ts`.
- **2026-05-02T17:18:28-05:00** — Wave 2 foundation now includes a shared shell (`Header`, `Footer`, desktop `Nav`, `ThemeToggle`, `MobileMenu`), design-system UI primitives in `components/ui/`, and global CSS tokens aligned to Pris's design-system spec.
- **2026-05-02T17:18:28-05:00** — The file-based content pipeline is live with `lib/mdx.ts`, `lib/blog.ts`, `lib/projects.ts`, `lib/resume.ts`, placeholder content under `content/`, and validated `pnpm lint && pnpm build` output on the updated shell.

- **2026-05-03T11:07:20.721-05:00** — A shared `ProfileAvatar` client component now handles the hero/about portrait flow: it tries `/public/images/profile.jpg` first, then `/public/images/profile.png`, and falls back to a neon `SA` initials circle so static export builds stay valid before a real photo is added.
- **2026-05-03T11:07:20.721-05:00** — Lightweight motion scales best here when split into small client primitives (`ScrollReveal`, `CountUp`) that honor reduced motion and feed server-rendered sections; React `ViewTransition` can wrap the page shell while existing CSS handles the actual cross-page fade.
- **2026-05-03T12:08:49-05:00** — GitHub Pages static export deployment validated against live site at `https://shaeelafsar.github.io/personal-website/`. All 39 integration tests passed: home/about/blog/projects/resume pages, desktop + mobile navigation, SEO tags, responsive layouts (375/768/1280px), and visual regression snapshots. No content or rendering issues on production.
- **2026-05-03T12:08:49-05:00** — The neon theme and progressive motion enhancements validated successfully on live site. Mobile menu closes via Escape reliably. Hero hero glitch and particle effects degrade correctly on coarse pointers. All lighthouse-critical elements render without jank.
- **2026-05-03T14:10:43.947-05:00** — Once the repo moves to `shaeelafsar.github.io`, GitHub Pages serves the site from the domain root, so `basePath` must stay unset and canonical/site URLs should resolve from `https://shaeelafsar.github.io`.
- **2026-05-03T14:10:43.947-05:00** — Playwright 1.59 accepts reduced-motion defaults in config via `use.contextOptions.reducedMotion`, not a top-level `use.reducedMotion`; this matters because Next build type-checks `playwright.live.config.ts`.
- **2026-05-03T14:10:43.947-05:00** — GitHub repository renamed to `shaeelafsar.github.io`; removed `basePath` from `next.config.ts` and updated all URLs to resolve from root domain. Metadata, canonical, sitemap, and robots URLs now reference `https://shaeelafsar.github.io`. Deployment verified; site live. Commit df76d03.
- **2026-05-03T14:30:40.831-05:00** — The floating hero/about skill pills were calmer and more readable once converted from animated/absolute decorations into static badge rows inside their content blocks; desktop polish here should stay anchored rather than drifting.
- **2026-05-03T14:30:40.831-05:00** — Footer and contact layouts hold together better when small screens prioritize centered/stacked content first, then switch to multi-column alignment at `lg` instead of forcing split layouts too early.
- **2026-05-03T14:30:40.831-05:00** — Static badge rows replacement was successful (commit eb6337f); responsive consistency now confirmed across hero, about, and footer surfaces.

## Notifications

- **2026-05-02T20:42:05Z** — Architecture and specifications ready for team review at `.squad/architecture.md` and `.squad/specs/`. See `.squad/orchestration-log/2026-05-02T2042-deckard.md` for details.
- **2026-05-02T21:10:31Z** — Design review complete. Pris flagged 5 key areas: shared visual tokens, motion timing normalization, shadow/color animation constraints, Shiki theming, and page-level art direction. Updates merged to `.squad/decisions.md`.
- **2026-05-02T21:10:31Z** — Testing review complete. Roy evaluated all 31 specs: 13 ✅, 18 ⚠️. Proposed shared fixture content set and deterministic QA hooks. Details in `.squad/orchestration-log/2026-05-02T21:10:31Z-roy.md`.
- **2026-05-02T22:18:28Z** — Phase 1 Wave 1-2 completion: Scribe processed inbox decisions (ADRs 011-015), logged orchestration events. Rachael and Pris teams completed foundation successfully. Build passing. Ready for Wave 3 (content pages).
- **2026-05-03T09:11:36-05:00** — GitHub Pages static export is now the deployment target: `next.config.ts` uses `output: "export"`, server-only routes were replaced with generated static files, and `pnpm build` now produces a deployable `out/` directory.
- **2026-05-03T09:11:36-05:00** — The contact page no longer depends on Server Actions; it validates client-side, posts to Formspree when configured, and falls back to `mailto:` so the static deployment stays usable without a backend.
- **2026-05-03T10:07:18.041-05:00** — Neon/cyberpunk polish now lives in isolated client-only effect primitives under `components/effects/`, which keeps page shells server-rendered while layering in hover-only lighting, glitch text, and lightweight ambient motion.
- **2026-05-03T10:07:18.041-05:00** — The safest way to add richer motion here is component-local CSS/SVG/canvas with strict reduced-motion exits and no `app/globals.css` changes; `ParticleField` stays performant by capping particles at 30 and cleaning up its animation loop on unmount.

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

## Phase 2 Execution — Wave 3 (rachael-8, 9, 10)

**2026-05-02T22:18:28Z** — Phase 2+3 tasks completed successfully across three concurrent agents (rachael-8, 9, 10). All builds passing. Cross-coverage: home, about, projects, blog, resume, contact, error pages, and sample content now live. Orchestration logs recorded in `.squad/orchestration-log/`.
