# Rachael — Neon Effects Pattern

- **Date:** 2026-05-03T10:07:18.041-05:00
- **Owner:** Rachael
- **Status:** Proposed

## Decision

Add futuristic visual polish through isolated `components/effects/` client wrappers and ambient layers instead of touching shared global CSS.

## Why

- Keeps App Router pages and most layout structure as Server Components.
- Limits bundle impact by localizing interactivity to the exact effects that need browser APIs.
- Makes reduced-motion behavior explicit per effect instead of relying on global overrides.
- Lets Pris keep ownership of `app/globals.css` while frontend still ships neon hover states and hero ambience.

## Implementation Notes

- Added `GlitchText`, `NeonGlow`, `GridBackground`, `TypeWriter`, and `ParticleField` as client components.
- Upgraded `TextReveal` with optional neon trail support and added a reusable `SlideIn` motion primitive.
- Applied the new effects to the home hero, about teaser, CTA card, projects cards, and resume timeline.
- Kept hover-driven effects behind fine-pointer hover media queries and capped particle density at 30.

## Follow-up

- If Pris wants stronger visual cohesion later, extract shared neon color tokens into the design system instead of duplicating per-component color values.
- If we add more ambient canvas effects, consider route-level lazy mounting so only above-the-fold art loads on hero surfaces.
