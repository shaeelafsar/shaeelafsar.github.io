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

## Agent Reviews — Wireframes (2026-05-02)

### Deckard — Wireframe & Design System Review

**Date:** 2026-05-02  
**Status:** APPROVED WITH NOTES

Review of 8 page wireframes, design system, animation map, architecture.md, active decisions, and relevant specs.

**Page-by-page assessments:**

- **home.md** — ✅ Strong alignment with route structure and component hierarchy
- **about.md** — ⚠️ Mobile intro order conflicts with spec; global frame underspecified on tablet/desktop
- **projects.md** — ✅ Route and hierarchy alignment solid; filter URL state represented
- **project-detail.md** — ⚠️ Tech stack/metadata block not explicit; "Related/Next CTA" too vague; footer/global frame unclear
- **blog.md** — ⚠️ `CategoryRail` not clearly defined; tag implementation direction unresolved
- **blog-post.md** — ✅ Strong alignment with blog architecture; animation behavior matches decisions
- **resume.md** — ⚠️ Download action placement inconsistent; global frame not as explicit as other pages
- **contact.md** — ✅ Good alignment with contact page architecture; responsive behavior matches spec
- **design-system.md** — ⚠️ Missing explicit breakpoint section with canonical responsive breakpoints
- **animation-map.md** — ✅ Aligned with ADRs and architecture decisions

**Key consistency issues:**
1. Global frame inconsistency — add short `Global frame` section to every wireframe
2. Naming consistency drift — normalize to architecture/spec names or formally add new names
3. Footer visibility drift — either show footer in all frame sets or adopt consistent shorthand

**Verdict:** The system is close and largely architecture-aligned. Would not block implementation, but naming ambiguity, breakpoint omission, and page-level consistency issues should be cleaned up before treating docs as locked.

### Pris — Design System & Visual Tokens

**Date:** 2026-05-02  
**From:** Pris (Designer)

**Proposed design clarifications:**

1. **Expand shared visual tokens** — Add explicit tokens for radius, shadows, overlay/backdrop surfaces, focus rings, and image corner treatments
2. **Standardize motion timings** — One default enter easing `[0.21, 0.47, 0.32, 0.98]` and timing scale: 150ms micro, 300ms UI, 600ms section reveals
3. **Avoid non-essential shadow/color animation** — Prefer transform + opacity layers for premium interactions
4. **Lock long-form theming** — Dual Shiki themes for code blocks; convert MDX callouts to design tokens
5. **Add page-level art direction notes** — Hero accent language, CTA treatment, resume timeline, project/blog media rhythm, mobile menu overlay

**Font stack proposal:** `Space Grotesk` (display), `Inter` (body/UI), `JetBrains Mono` (code/metadata)

**Motion scale:** `150ms` micro, `300ms` UI, `600ms` section entry, with standardized easing.

**Why this should be shared:** Gives Rachael a concrete token contract; keeps Roy's dark-mode/reduced-motion coverage deterministic; ensures visual language consistency before implementation.

### Rachael — Wireframe Implementability Review

**Date:** 2026-05-02  
**Status:** NEEDS REVISION

**Cross-cutting frontend notes:**

- Breakpoint intent mostly 375/768/1280, but handoff needs explicit behavior for `1024-1279` range and exact switch points for nav/sidebars/2-col vs 3-col grids
- Server/Client boundaries implied, not locked. Mark these explicitly: `ThemeToggle`, `MobileMenu`, `ProjectFilter`, `ReadingProgress`, `TableOfContents`, `ContactForm`
- Data-source annotations inconsistent; label each section as MDX, frontmatter, static config, or URL-query-driven
- App Router edge states under-documented: `loading`, `error`, `not-found`, empty filtered results, external-link failure

**Page-by-page:**

- **home.md** ⚠️ — Header ownership of interactive islands needs explicit; AboutTeaser breakpoint is too loose; FeaturedProjects/BlogTeaser need data-source notes; hero decorative z-index behavior undocumented
- **about.md** ⚠️ — Multiple layout options instead of one final; TechnologiesSection data source undefined; responsive portrait block underspecified; no hover/focus treatment
- **projects.md** ⚠️ — ProjectFilter states not shown; invalid tag handling undefined; sticky row optional; 1024-1279 column behavior unspecified
- **project-detail.md** ⚠️ — Header should separate static metadata from optional external actions; MDX block inventory not locked; route-state notes missing; related navigation vague
- **blog.md** ⚠️ — CategoryRail ambiguous; PostList needs empty-state and pagination direction; data-sort and featured-post handling undefined; keyboard/focus behavior not documented
- **blog-post.md** ⚠️ — Tablet TOC collapsed pattern undefined; active heading/hash-link/Lenis offset behavior missing; route-level notes absent
- **resume.md** ✅ — Main boundaries clear; only note resume data-source split needed
- **contact.md** ❌ — **BLOCKER:** ContactForm submission contract undefined (Server Action vs third-party, success payload, validation schema, spam protection, env); form states incomplete; tablet layout "above or beside" not concrete; accessibility interactions not specified
- **design-system.md** ⚠️ — Alias radius/shadow/spacing/motion tokens into theme layer; container widths, max-width, z-index, exact breakpoint tokens missing; focus styling needs full shared recipe
- **animation-map.md** ⚠️ — Need explicit client-wrapper ownership; theme-switch/mobile-menu/form animation rules missing; scroll-reset/page-transition hash-link interaction undefined

**Verdict:** Wireframes close and mostly buildable. Would NOT start full implementation until contact form contract is finalized and responsive/client-state ambiguities are locked.

### Roy — Wireframe & Design System Testability Review

**Date:** 2026-05-02  
**Status:** NEEDS REVISION

**Review summary:** 13 ✅, 18 ⚠️, 0 ❌ across 31 specs. Strong baseline; several cross-cutting specs need edge-state definitions for deterministic E2E.

**Shared test infrastructure needed:**
- Seed content fixtures (blog posts, projects, MDX edge cases, malformed data)
- Stable browser fixtures for mobile/tablet/desktop
- Playwright runs in light/dark theme and `reducedMotion: 'reduce'`
- Contact form mocks (success, failure, loading)
- Deterministic hooks for error boundary testing
- Assertions for XML, metadata, JSON-LD, headers, sitemap

**Page-by-page:**

- **home.md** ⚠️ — Missing loading/empty/error states for FeaturedProjects and BlogTeaser; shared shell behavior underspecified; responsive assertions too ambiguous; add stable selectors
- **about.md** ⚠️ — Empty/fallback rendering undefined; accessibility markers missing; responsive "beside or below" too soft; add stable selectors
- **projects.md** ❌ — **BLOCKER:** ProjectFilter has no defined selected/hover/focus/active/disabled states; no zero-results state for tag combinations; filter update pending UI/scroll retention/focus undefined; sticky optional; missing selectors
- **project-detail.md** ⚠️ — Missing edge cases (invalid slug, missing image, absent links); long MDX handling open-ended; accessibility markers missing; add selectors
- **blog.md** ❌ — **BLOCKER:** CategoryRail ambiguous (decorative vs filter); no empty-state or pagination direction; loading/error behavior missing; responsive rhythm undefined; missing selectors
- **blog-post.md** ⚠️ — Edge cases missing (no cover, no related, long headings, wide tables); TOC keyboard/active-state/focus semantics undefined; accessibility markers missing; add selectors
- **resume.md** ⚠️ — DownloadButton missing loading/error/missing-file behavior; ExperienceTimeline needs long-entry rules; accessibility markers missing; add selectors
- **contact.md** ❌ — **BLOCKER:** Validation contract missing (required fields, email rules, length limits, error copy, inline error timing); loading/submitting/success/error/retry states undefined; field reset and focus movement unclear; missing selectors
- **design-system.md** ⚠️ — Missing state matrix for interactive components; breakpoint tokens not centralized; focus styling rules incomplete; missing QA-oriented appendix
- **animation-map.md** ⚠️ — Reduced-motion guidance solid but animation specs need test assertions; page transition fallback acceptance criteria missing; focus-visible parity missing; missing QA hooks

**Cross-page consistency:**
- Define one canonical Header/Nav/ThemeToggle/MobileMenu/Footer behavior spec
- Standardize page landmarks and shared keyboard flows
- Use consistent selectors across pages

**Proposed decisions:**
1. Adopt shared fixture content set for consistent blog/projects/resume testing
2. Treat third-party validators as release checks, not primary acceptance
3. Add deterministic QA hooks for hard-to-trigger flows

**Verdict:** Docs are visually strong but test coverage blocked by ambiguous filter behavior, incomplete form-state definitions, and missing shared accessibility/consistency contracts. Once state matrices, empty/error paths, and shared shell behavior locked, these wireframes will support deterministic E2E and accessibility testing.

### ADR-011: ContactForm submission contract

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Deckard

- **Context:** Contact form submission flow, validation, and security requirements.
- **Decision:** `ContactForm [client]` submits to a Next.js **Server Action** that validates input, applies spam checks, then sends the message through the **Resend email API**. No public client-side email key, no API route required for v1.
- **Rationale:** Server Actions provide secure handling of sensitive operations without exposing API keys. Honeypot + rate limiting prevent spam. Validation schema ensures data integrity.
- **Contract:**
  - Client component: `ContactForm [client]`
  - Server entrypoint: `sendContactMessage(formData)` in `app/contact/actions.ts`
  - Provider: `resend.emails.send(...)`
  - Response: `{ ok: boolean; status: 'success' | 'validation_error' | 'rate_limited' | 'provider_error'; message: string; fieldErrors?: Record<string, string>; }`
- **Validation schema:** name (1-100), email (valid), subject (0-120, optional), message (10-500), honeypot company field (must be empty).
- **Spam protection:** Honeypot field + rate limiting (5 submissions per 10 minutes, keyed by IP + email hash).
- **State machine:** `idle → typing → validating → submitting → success/error → retry`
- **UX:** Inline field errors on blur/submit, focus management on error/success, fields disabled during submit, status region with `role="status"` (success) or `role="alert"` (error).
- **Environment:** `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `CONTACT_RATE_LIMIT_MAX` (default 5), `CONTACT_RATE_LIMIT_WINDOW_MS` (default 600000).

### ADR-012: TagList (formerly CategoryRail) as decorative metadata

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Deckard

- **Context:** Blog categorization and filtering strategy.
- **Decision:** `CategoryRail` renamed to `TagList`. v1 tags are **decorative metadata only** on post cards and blog listing. No filtering, no client state, no URL params.
- **Rationale:** Keeps v1 simple; filtering can be added later via optional `?tag=` params without changing card metadata.
- **Note:** `ProjectFilter` owns all interactive filtering on `/projects`.

### ADR-013: ProjectFilter and URL sync for tag filtering

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Deckard

- **Context:** Projects page filtering and sticky behavior.
- **Decision:** `ProjectFilter [client]` is the only interactive filter surface on `/projects` and owns URL sync for `?tag=`.
- **State contract:** `idle` (default, All selected), `hover` (pointer only), `focus-visible` (keyboard focus ring), `active/selected` (highlighted, `aria-pressed="true"`), `loading/pending` (grid dims, active pill visible), `zero-results` (empty state), `keyboard-nav` (arrow keys move focus, Home/End jump, Enter/Space selects).
- **Sticky behavior:** Desktop (`lg` / 1024px+) only; sticky below header. Mobile/tablet: not sticky.
- **URL behavior:** Selecting tag updates to `/projects?tag={slug}`. Invalid or missing `?tag=` renders all projects. Clearing returns to `/projects`. Focus stays on pill; no scroll jump.

### ADR-014: Motion package alignment with `motion/react`

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Pris & Rachael

- **Context:** Animation library imports need standardization.
- **Decision:** Use `motion` package directly; treat `motion/react` as the canonical import path for all animation primitives.
- **Rationale:** Keeps implementation aligned with team animation contract, avoids mixed import styles, ensures shared primitives consistent across contributors.
- **Note:** All animation wrappers (FadeIn, StaggerChildren, Parallax, etc.) use Motion v12 syntax via `motion/react`.

### ADR-015: Next.js 16 View Transition API configuration

**Date:** 2026-05-02 · **Status:** Accepted · **Author:** Rachael

- **Context:** Next.js 16 exposes `experimental.viewTransition` (singular), not plural form.
- **Decision:** Foundation scaffolding uses `experimental.viewTransition: true` to compile against current Next.js 16 API.
- **Rationale:** Preserves team intent to enable native View Transitions while matching framework API. Config key will be updated if Deckard revises ADR-010 wording.

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
