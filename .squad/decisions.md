# Squad Decisions

## Active Decisions

### ADR-001: Framer Motion over GSAP as primary animation library

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Deckard

- **Context:** Both GSAP and Framer Motion are available. Need a primary choice.
- **Decision:** Framer Motion (Motion v12) is the primary animation library. GSAP may be added later for a single pinned-timeline section if needed.
- **Rationale:** Declarative API integrates naturally with React/Next.js. No `useEffect` cleanup pitfalls. `whileInView`, `useScroll`, `useTransform` cover 95% of needs. Avoids dual-library bundle cost.

### ADR-002: `next-mdx-remote` over `@next/mdx` for content

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Deckard

- **Context:** Need MDX for blog posts and project case studies.
- **Decision:** Use `next-mdx-remote` (RSC variant) to compile MDX from `content/` directory at build time.
- **Rationale:** Full control over frontmatter parsing, custom components, and rehype/remark plugin chain. Content lives in `content/` directory, not co-located with routes. Supports `generateStaticParams` pattern cleanly.

### ADR-003: Class-based dark mode with localStorage

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Deckard

- **Context:** Dark mode support is required.
- **Decision:** Use `dark` class on `<html>` element. Persist preference in `localStorage`. Default to `prefers-color-scheme`. Inline script in `<head>` prevents flash.
- **Rationale:** Gives users explicit control. Works with Tailwind's `dark:` variant. Inline script prevents FOUC on page load.

### ADR-004: All content statically generated — no CMS, no API routes

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Deckard

- **Context:** Content management strategy.
- **Decision:** All content (blog, projects, resume) lives as files in `content/` directory. All pages use `generateStaticParams` for static generation. No SSR, no ISR, no CMS.
- **Rationale:** Personal site with infrequent updates. File-based content is version-controlled, portable, and zero-cost. Rebuild on content change via git push.

### ADR-005: Server Components by default

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Deckard

- **Context:** Component rendering strategy.
- **Decision:** All components are Server Components unless they require event handlers, hooks, or browser APIs. Animation wrappers are the primary Client Components — they accept Server Component children.
- **Rationale:** Smaller client bundle, faster initial load. Animation components (`FadeIn`, `StaggerChildren`, etc.) are the natural boundary — they need `motion` hooks but their children are server-rendered content.

### ADR-006: Lenis for smooth scrolling

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Deckard

- **Context:** Scroll experience.
- **Decision:** Use Lenis (`@studio-freight/lenis`) as the global smooth scroll provider.
- **Rationale:** Industry standard for premium scroll feel. Provides inertia/momentum scrolling. Compatible with Framer Motion scroll hooks.

### ADR-007: Specs directory structure

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Deckard

- **Context:** Where to put component/page specifications.
- **Decision:** All specs live in `.squad/specs/` as individual markdown files per major feature/system.
- **Rationale:** Easier for agents to consume one spec at a time vs. one giant document. File names match the feature (`blog-system.md`, `home-hero.md`).

### ADR-008: File naming convention — kebab-case

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Deckard

- **Context:** File naming consistency.
- **Decision:** All files use kebab-case (`project-card.tsx`, not `ProjectCard.tsx`). Named exports for components. Default exports only for `page.tsx` and `layout.tsx`.
- **Rationale:** Consistent with Next.js conventions. Avoids case-sensitivity issues across OS.

### ADR-009: CSS transitions for hover effects

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Deckard

- **Decision:** Use CSS `transition` properties (not Framer Motion) for all hover micro-interactions (cards, buttons, nav links, images).
- **Rationale:** CSS transitions don't require Client Components — elements can remain Server Components. Better performance, smaller bundle. Framer Motion is reserved for scroll-triggered and entrance animations only.

### ADR-010: View Transitions API primary, AnimatePresence fallback

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Deckard

- **Decision:** Use the native View Transitions API (`experimental.viewTransitions: true` in Next.js 16) as the primary page transition mechanism. Framer Motion `AnimatePresence` as fallback for unsupported browsers.
- **Rationale:** Native API is more performant, integrates with browser navigation, and requires less JS. Fallback ensures consistent experience across all browsers.

### ADR-011: Dark background for OG images

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Deckard

- **Decision:** All auto-generated OG images use dark background (`#0a0a0a`) with light text, regardless of site theme.
- **Rationale:** Dark OG images have better visual contrast on social platforms (Twitter, LinkedIn, Slack all have light/white backgrounds). Consistent branding. Avoids theme-detection complexity in edge runtime.

### ADR-012: Global CSS reduced-motion safety net

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Deckard

- **Decision:** Add a global `@media (prefers-reduced-motion: reduce)` rule that sets `animation-duration` and `transition-duration` to near-zero, IN ADDITION to per-component JS checks via `useReducedMotion()`.
- **Rationale:** Defense in depth. If any component forgets the JS check, the CSS rule catches it. Also handles third-party CSS animations or any CSS transitions that bypass Framer Motion.

### ADR-013: `@media (hover: hover)` required on all hover effects

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Deckard

- **Decision:** Every CSS hover effect must be wrapped in `@media (hover: hover)` media query.
- **Rationale:** Prevents "sticky hover" on touch devices (iOS Safari, Android Chrome). Touch interactions should not leave elements in a hovered state after tap.

## Team Sync — Design Clarifications (Pris)

**Date:** 2026-05-02 · **From:** Pris (Designer)

**Proposed Design Clarifications:**

1. **Expand shared visual tokens** — Add explicit tokens for radius, shadows, overlay/backdrop surfaces, focus rings, and image corner treatments.
2. **Standardize motion timings** — Keep one default enter easing (`[0.21, 0.47, 0.32, 0.98]`) and a small timing scale: 150ms micro, 300ms UI transitions, 600ms section reveals.
3. **Avoid non-essential shadow/color animation** — Prefer transform + opacity layers for premium interactions.
4. **Lock long-form theming decisions** — Use dual Shiki themes for code blocks and convert MDX callouts to design tokens.
5. **Add page-level art direction notes** — Define hero accent language, CTA treatment, resume timeline, project/blog media rhythm, and mobile menu overlay.

## Team Sync — Implementation Clarifications (Rachael)

**Date:** 2026-05-02 · **From:** Rachael (Frontend Dev)

**Proposed Implementation Clarifications:**

1. **Lock client/server boundary strategy** — Treat `Header` and `Button` as client-safe shared primitives due to requirements in error boundaries and contact flows.
2. **Make projects filtering server-driven** — Keep tag picker as Client Component updating `?tag=`, render filtered grid on server.
3. **Finalize contact form integration** — Choose submission path (Server Action + Resend/Formspree), env vars, payload shape, response contract.
4. **Centralize hardcoded page copy and asset references** — Provide final copy and image paths for hero, about, contact sections.
5. **Scope long-form reading interactions** — Reading progress tracks article container; TOC scrolling documents reduced-motion and Lenis compatibility.

## Team Sync — Testability Review (Roy)

**Date:** 2026-05-02 · **From:** Roy (Tester)

**Testability Summary:** 13 ✅, 18 ⚠️, 0 ❌ across 31 specs. Strong baseline; several cross-cutting specs need edge-state definitions for deterministic E2E coverage.

**Shared Test Infrastructure Needed:**
- Seed content fixtures (blog posts, projects, MDX edge cases, malformed data)
- Stable browser fixtures for mobile/tablet/desktop
- Playwright runs in light/dark theme and `reducedMotion: 'reduce'`
- Contact form mocks (success, failure, loading)
- Deterministic hooks for error boundary testing
- Assertions for XML, metadata, JSON-LD, headers, sitemap

**Proposed Tester Decisions:**
1. Adopt shared fixture content set for consistent blog/projects/resume testing
2. Treat third-party validators as release checks, not primary acceptance
3. Add deterministic QA hooks for hard-to-trigger flows

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
