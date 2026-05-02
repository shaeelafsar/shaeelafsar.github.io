# Architecture Decisions — Deckard

> **Date:** 2026-05-02 · **Author:** Deckard (Lead)

## ADR-001: Framer Motion over GSAP as primary animation library

**Context:** Both GSAP and Framer Motion are installed skills. Need a primary choice.
**Decision:** Framer Motion (Motion v12) is the primary animation library. GSAP may be added later for a single pinned-timeline section if needed.
**Rationale:** Framer Motion's declarative API integrates naturally with React/Next.js. No `useEffect` cleanup pitfalls. `whileInView`, `useScroll`, `useTransform` cover 95% of our needs. Avoids dual-library bundle cost.

## ADR-002: `next-mdx-remote` over `@next/mdx` for content

**Context:** Need MDX for blog posts and project case studies.
**Decision:** Use `next-mdx-remote` (RSC variant) to compile MDX from `content/` directory at build time.
**Rationale:** Full control over frontmatter parsing, custom components, and rehype/remark plugin chain. Content lives in `content/` directory, not co-located with routes. Supports `generateStaticParams` pattern cleanly.

## ADR-003: Class-based dark mode with localStorage

**Context:** Dark mode support is required.
**Decision:** Use `dark` class on `<html>` element. Persist preference in `localStorage`. Default to `prefers-color-scheme`. Inline script in `<head>` prevents flash.
**Rationale:** Gives users explicit control. Works with Tailwind's `dark:` variant. Inline script prevents FOUC (flash of unstyled content) on page load.

## ADR-004: All content statically generated — no CMS, no API routes

**Context:** Content management strategy.
**Decision:** All content (blog, projects, resume) lives as files in `content/` directory. All pages use `generateStaticParams` for static generation. No SSR, no ISR, no CMS.
**Rationale:** Personal site with infrequent updates. File-based content is version-controlled, portable, and zero-cost. Rebuild on content change via git push.

## ADR-005: Server Components by default

**Context:** Component rendering strategy.
**Decision:** All components are Server Components unless they require event handlers, hooks, or browser APIs. Animation wrappers are the primary Client Components — they accept Server Component children.
**Rationale:** Smaller client bundle, faster initial load. Animation components (`FadeIn`, `StaggerChildren`, etc.) are the natural boundary — they need `motion` hooks but their children are server-rendered content.

## ADR-006: Lenis for smooth scrolling

**Context:** Scroll experience.
**Decision:** Use Lenis (`@studio-freight/lenis`) as the global smooth scroll provider.
**Rationale:** Industry standard for premium scroll feel. Provides inertia/momentum scrolling. Compatible with Framer Motion scroll hooks. Recommended by premium-frontend-ui skill.

## ADR-007: Specs directory structure

**Context:** Where to put component/page specifications.
**Decision:** All specs live in `.squad/specs/` as individual markdown files per major feature/system.
**Rationale:** Easier for agents to consume one spec at a time vs. one giant document. File names match the feature (`blog-system.md`, `home-hero.md`).

## ADR-008: File naming convention — kebab-case

**Context:** File naming consistency.
**Decision:** All files use kebab-case (`project-card.tsx`, not `ProjectCard.tsx`). Named exports for components. Default exports only for `page.tsx` and `layout.tsx`.
**Rationale:** Consistent with Next.js conventions. Avoids case-sensitivity issues across OS.
