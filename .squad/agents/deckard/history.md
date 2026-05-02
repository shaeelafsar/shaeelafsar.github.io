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
