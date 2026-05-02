# Deckard — History

## Project Context

- **Project:** Personal professional website for Shaeel Afsar
- **Stack:** Next.js + Tailwind CSS + TypeScript
- **Features:** Portfolio, blog, resume/CV, animations (full-featured)
- **User:** Shaeel Afsar

## Learnings

### 2026-05-02 — Architecture & Planning Session

**Architecture decisions made:**
- Framer Motion (Motion v12) as primary animation library over GSAP (ADR-001)
- `next-mdx-remote` for MDX content pipeline (ADR-002)
- Class-based dark mode with `localStorage` + inline script for FOUC prevention (ADR-003)
- All content statically generated from `content/` directory — no CMS (ADR-004)
- Server Components by default; Client Components only for interactivity/animation (ADR-005)
- Lenis for smooth scrolling (ADR-006)
- Specs in `.squad/specs/` as individual files per feature (ADR-007)
- kebab-case file naming, named exports (ADR-008)

**Key file paths:**
- Architecture: `.squad/architecture.md`
- Specs: `.squad/specs/*.md` (10 spec files)
- Decisions: `.squad/decisions/inbox/deckard-architecture.md`
- Plan: session-state `plan.md`

**Patterns:**
- Animation wrapper pattern: Client Components (`FadeIn`, `StaggerChildren`) wrap Server Component children. This is the primary server/client boundary.
- Content pipeline: `content/*.mdx` → `lib/*.ts` (compile + parse) → Server Component pages → `generateStaticParams`
- Design system: CSS custom properties for colors, `clamp()` for fluid typography, Tailwind utilities for everything else.

**User preferences:**
- Shaeel wants award-worthy, cinematic feel
- Full-featured: portfolio, blog (MDX), resume, scroll animations, dark mode
- Next.js 16, TypeScript strict, Tailwind v4, Vercel deployment

### 2026-05-02 — Specs Expansion

**New specs created (18 additional):**
- Phase 1: `project-scaffold.md`, `root-layout.md`, `theme-toggle.md`, `mobile-menu.md`, `type-definitions.md`, `utility-functions.md`
- Phase 2: `home-sections.md`, `custom-404.md`, `error-boundary.md`
- Phase 3: `mdx-components.md`, `table-of-contents.md`, `reading-progress.md`, `rss-feed.md`
- Phase 4: `page-transitions.md`, `hover-interactions.md`, `dark-mode-audit.md`, `reduced-motion.md`
- Phase 5: `seo-metadata.md`, `og-images.md`, `structured-data.md`, `vercel-deployment.md`

**Existing specs expanded (10):**
All original specs received: acceptance criteria, dependencies, accessibility sections, and responsive breakpoint tables where missing.

**Key decisions made during expansion:**
- ADR-009: CSS transitions preferred over Framer Motion for hover effects (keeps components as Server Components)
- ADR-010: View Transitions API as primary page transition mechanism, AnimatePresence as fallback
- ADR-011: Dark OG image background (#0a0a0a) for all auto-generated social images — looks good on all platforms
- ADR-012: Global CSS `@media (prefers-reduced-motion: reduce)` as safety net in addition to per-component JS checks
- ADR-013: `@media (hover: hover)` required on ALL hover effects to prevent sticky hover on touch devices

**Total spec count:** 28 files in `.squad/specs/`

### 2026-05-02 — Wireframe Architecture Review (deckard-2)

**Verdict:** APPROVED WITH NOTES

**Review scope:** 8 page wireframes, design system, animation map, architecture.md, active decisions, spec alignment.

**Key findings:**
- 4 specs fully aligned ✅, 3 need minor improvements ⚠️
- Strong route/hierarchy alignment; animation markers consistent with Framer Motion + Lenis strategy
- Global frame inconsistency across wireframes; footer visibility unclear in some pages
- Design system missing explicit breakpoint section (canonical responsive breakpoints needed)
- Naming consistency drift: `CategoryRail`, `Related/Next CTA` need formalization or clear decisions

**Recommendations:**
1. Add `Global frame` section to every wireframe using consistent convention (like home.md)
2. Normalize component names to match architecture/spec or formally add new names
3. Add explicit breakpoints section to design system
4. Lock project-detail tech/metadata block and blog tag filtering behavior before implementation

**Approval status:** System is architecture-aligned; would not block implementation, but naming/consistency issues should be cleaned up before docs are locked.
