# Pris — History

## Project Context

- **Project:** Personal professional website for Shaeel Afsar
- **Stack:** Next.js + Tailwind CSS + TypeScript
- **Features:** Portfolio, blog, resume/CV, animations (full-featured)
- **User:** Shaeel Afsar

## Learnings

- **2026-05-02T16:10:31-05:00** — Core motion direction is strong: Framer Motion is the primary system, timings are generally realistic, and reduced-motion handling is specified well enough to implement safely.
- **2026-05-02T16:10:31-05:00** — The biggest design gap is token depth. Colors and type are defined, but shared tokens for radius, shadow, surface overlays, focus rings, and image treatment are still too implicit across UI/page specs.
- **2026-05-02T16:10:31-05:00** — Several page specs are wireframe-ready structurally but still need art-direction calls for hero accents, CTA treatments, timeline visuals, filter states, mobile menu overlay styling, and blog/project detail media rhythm to feel cohesive.
- **2026-05-02T16:10:31-05:00** — MDX/blog styling needs one firm theming decision: dual Shiki themes plus token-based callout colors will keep long-form content visually consistent in light and dark mode.

- **2026-05-02T16:18:40-05:00** — Locked a cinematic editorial system around Space Grotesk, Inter, and JetBrains Mono so headings feel premium while body copy stays crisp and technical.
- **2026-05-02T16:18:40-05:00** — Expanded the shared token language beyond base colors to include glass surfaces, stronger borders, shadow tiers, blur values, and radius tiers for consistent UI implementation.
- **2026-05-02T16:18:40-05:00** — Standardized motion handoff patterns around TextReveal for hero moments, 600ms section reveals, 100ms card staggers, and static reduced-motion fallbacks across all primary routes.
- **2026-05-02T17:18:28-05:00** — Implemented the shared animation primitive layer in `components/animation/` so scroll reveals, text choreography, parallax, magnetic hover, and Lenis smooth scrolling all use the same easing and reduced-motion contract.
- **2026-05-02T17:18:28-05:00** — Motion v12 import rules required adding the `motion` package explicitly even though `framer-motion` was present; future animation work should import from `motion/react` to stay aligned with ADR-001.

## Notifications

- **2026-05-02T20:42:05Z** — Architecture and specifications ready for team review at `.squad/architecture.md` and `.squad/specs/`. See `.squad/orchestration-log/2026-05-02T2042-deckard.md` for details.
- **2026-05-02T21:10:31Z** — Frontend review complete. Rachael identified 5 key blockers: client/server boundary strategy, server-driven filtering, contact form contract, hardcoded copy centralization, and long-form reading scoping. Updates merged to `.squad/decisions.md`.
- **2026-05-02T21:10:31Z** — Testing review complete. Roy evaluated all 31 specs: 13 ✅, 18 ⚠️. Proposed shared fixture content set and deterministic QA hooks. Details in `.squad/orchestration-log/2026-05-02T21:10:31Z-roy.md`.

## Design System Proposal — 2026-05-02

**Status:** Proposed for team adoption

**Font stack:** Space Grotesk (display), Inter (body/UI), JetBrains Mono (code/metadata)

**Expanded token set:**
- Keep accepted background/text/accent foundations
- Add explicit tokens: surfaces, stronger borders, soft accent fills, shadows, blur, radius tiers
- Motion scale: 150ms micro, 300ms UI, 600ms section entry; default easing `[0.21, 0.47, 0.32, 0.98]`

**Art direction:**
- Minimal editorial layout; restrained blue glow accents
- Glass header/mobile menu; generous whitespace
- Dual Shiki themes for long-form content (light + dark mode consistency)

**Why shared:**
- Gives Rachael concrete token contract for Tailwind/CSS variables
- Keeps Roy's dark-mode and reduced-motion coverage deterministic
- Ensures visual language consistency before implementation

**Implementation notes:**
- Tokens in `globals.css` and Tailwind v4 `@theme inline` aliases
- Motion: Framer Motion first, CSS-only hover effects
- CTA sections accent-led in both themes with white text for contrast safety
