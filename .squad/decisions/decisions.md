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

### ADR-007: Neon cyberpunk theme with dark-first design

**Date:** 2026-05-03T10:07 · **Status:** Accepted · **Author:** Pris

- **Context:** Portfolio needed more visual identity and polish while maintaining professional senior-engineer appearance.
- **Decision:** Adopt dark-first cyberpunk-inspired token layer in `app/globals.css` with restrained neon cyan/blue/magenta/green accents, plus shared utility treatments for glass panels, neon cards, grid overlays, underline glows, and reduced-motion-safe glitch/typing effects.
- **Rationale:** Centralizing effect language in globals keeps look consistent without one-off garish implementations. Default theme is dark-first; light mode remains secondary.
- **QA notes:** Roy should regression-check reduced-motion fallbacks, button/card hover affordances, and dark/light theme contrast on home plus shared card surfaces.

### ADR-008: Progressive motion surface enhancement

**Date:** 2026-05-03T11:07 · **Status:** Accepted · **Author:** Pris

- **Context:** Visual polish needed to respect device capabilities and accessibility settings.
- **Decision:** Use progressive enhancement in `globals.css`: default to static glass/neon surfaces, then layer scroll-driven reveals, shimmer, aurora, and tilt only when hover capability and reduced-motion settings allow it.
- **Rationale:** Keeps cyberpunk aesthetic expressive on capable devices without risking mobile ergonomics, reduced-motion accessibility, or static export compatibility.
- **Impacted areas:** Shared cards, footer, section wrappers, project cards, resume timeline, about visual treatments.

### ADR-009: Reusable motion primitives and avatar fallback

**Date:** 2026-05-03T11:07 · **Status:** Proposed → Accepted · **Author:** Rachael

- **Context:** Need consistent imagery and motion across pages without duplicated animation logic.
- **Decision:** Use one `ProfileAvatar` fallback component for personal imagery and a pair of lightweight reveal/count primitives (`ScrollReveal`, `CountUp`) for section-level motion. Wrap page shell in React `ViewTransition` for route changes.
- **Rationale:** Keeps hero, about teaser, and about page visually consistent while profile photo is pending. Static export builds succeed even without images. Adds motion without turning pages into large client islands. Consistent reduced-motion behavior.
- **Implementation:** `ProfileAvatar` tries `/images/profile.jpg`, then `.png`, then renders neon initials placeholder. `Magnetic` interactions tightened for fine-pointer devices, inert on coarse.

### ADR-010: GitHub Pages static export deployment

**Date:** 2026-05-03T09:11 · **Status:** Proposed → Accepted · **Author:** Rachael

- **Context:** Deployment strategy and infrastructure.
- **Decision:** Switch personal website deployment from Vercel to GitHub Pages using Next.js static export (`output: "export"`).
- **Rationale:** Free hosting, simple static build, no server-only features needed.
- **Implementation:** Enabled `output: "export"` and unoptimized images. Replaced route handlers and metadata routes with build-generated static files in `public/`. Replaced contact Server Action with client-side Formspree plus `mailto:` fallback. Added GitHub Actions workflow deploying `out/` to Pages.
- **Follow-up:** Replace placeholder Formspree ID with real endpoint; add `basePath` if needed for repository subpath.

### ADR-011: Neon effects as isolated client components

**Date:** 2026-05-03T10:07 · **Status:** Proposed → Accepted · **Author:** Rachael

- **Context:** Wanted futuristic visual polish without turning whole app into client-side heavy.
- **Decision:** Add neon effects via isolated `components/effects/` client wrappers and ambient layers instead of touching shared global CSS. Keep App Router pages and most layout as Server Components.
- **Rationale:** Limits bundle impact by localizing interactivity to exact effects needing browser APIs. Makes reduced-motion behavior explicit per effect. Lets Pris own `app/globals.css` while frontend ships neon hover states and ambience.
- **Implementation:** Added `GlitchText`, `NeonGlow`, `GridBackground`, `TypeWriter`, `ParticleField` as client components. Upgraded `TextReveal` with optional neon trail. Applied to hero, about teaser, CTA card, projects cards, resume timeline. Hover effects behind fine-pointer queries, particle density capped at 30.
- **Follow-up:** Extract shared neon tokens into design system if needed; consider lazy mounting for canvas effects.

### ADR-012: Mobile-first simplified presentation for coarse pointers

**Date:** 2026-05-03T10:53 · **Status:** Proposed → Accepted · **Author:** Rachael

- **Context:** Mobile rendering of hover-driven hero effects and navigation reliability.
- **Decision:** Treat coarse-pointer/mobile devices as simplified presentation mode for home hero: disable duplicate glitch layers, prefer content-height hero spacing, mount mobile nav drawer in `document.body` above sticky header effects.
- **Rationale:** Hover-driven glitch is unreliable on phones, can surface duplicate text. Viewport-height hero creates dead space when right rail is hidden. Portal-mounted nav avoids sticky header stacking context interference.
- **Implementation:** `GlitchText` hides cyan/magenta layers at `max-width: 767px` and coarse pointers. `Hero` uses mobile-first content height, keeps decorative layers `pointer-events-none`, restores taller layout from `sm` up. `MobileMenu` portals to `document.body`, explicit pointer-events separation.

### ADR-013: Mobile device QA coverage and effect degradation

**Date:** 2026-05-03T10:38 · **Status:** Proposed → Accepted · **Author:** Roy

- **Context:** Neon overhaul introduced highest mobile risk in animated hero, overflow-prone pills/badges, small touch targets.
- **Decision:** Treat 360px–430px widths (iPhone SE, iPhone 14/15, Galaxy S23) as required QA for every primary route. Degrade heavy decorative effects on coarse-pointer/mobile instead of rendering full desktop neon stack.
- **Rationale:** Keeps visual direction while preventing overflow, mobile GPU strain, and touch target failures.
- **Implementation:** Added concrete viewport export, tightened mobile spacing, strengthened text wrapping, ensured 44px touch targets in nav/footer/buttons, device-specific coverage in Playwright helpers/specs.

### ADR-014: Live-site Playwright configuration for GitHub Pages sub-path

**Date:** 2026-05-03T12:08 · **Status:** Decided · **Author:** Roy

- **Context:** Site deploys to `https://shaeelafsar.github.io/personal-website/` — GitHub Pages under non-root sub-path. Needed separate config for live-site testing.
- **Decision:** 
  1. Separate config file (`playwright.live.config.ts`) for live-site tests; no `webServer` block.
  2. No `baseURL` in live config (Playwright's `baseURL` with sub-path causes `page.goto('/')` to fail). Use absolute URLs from `BASE` constant.
  3. Helper function constructs full URLs: checks if path starts with `http`, else prepends `${ORIGIN}${path}`.
  4. Mobile menu closes via `page.keyboard.press("Escape")` for reliability.
  5. No `page.goBack()` in stateless tests; use explicit `goto()` calls instead.
- **Rationale:** Cleaner isolation than URL-flag hacks. Absolute URL duplication contained in single constant.
- **Results (2026-05-03):** 39/39 tests passed (57s, chromium). Covers: all pages (200 + title), desktop/mobile nav, content, blog, SEO, responsive (375/768/1280px), internal links, visual regression.

## User Direction

### Backend/Full-Stack Emphasis

**Date:** 2026-05-03T10:26 · **Captured by:** Shaeel Afsar (via Copilot)

- **Direction:** Site emphasis should lean backend/full-stack, not frontend-heavy. Shaeel has been mostly a backend developer with some full-stack experience.
- **Why:** User request — captured for team memory
- **Impact:** Marketing copy, project emphasis, and hero copy should reflect this positioning.
