# Rachael — Avatar Fallback and Motion Primitives

- **Date:** 2026-05-03T11:07:20.721-05:00
- **Owner:** Rachael
- **Status:** Proposed

## Decision

Use one reusable `ProfileAvatar` fallback component for personal imagery and a pair of lightweight reveal/count primitives for section-level motion, instead of scattering image checks and one-off animation logic across pages.

## Why

- Keeps the hero, about teaser, and about page visually consistent while the real profile photo is still pending.
- Lets static export builds succeed even when `profile.jpg` / `profile.png` do not exist yet.
- Adds richer motion without turning server-rendered pages into large client islands.
- Makes reduced-motion behavior easier to keep consistent across sections.

## Implementation Notes

- `ProfileAvatar` tries `/images/profile.jpg`, then `/images/profile.png`, then renders a neon initials placeholder.
- `ScrollReveal` uses `useInView` for headings/content blocks, while `CountUp` animates numeric stats once they enter the viewport.
- `RootLayout` now wraps the page shell in React `ViewTransition` so the existing global view-transition CSS actually runs on route changes.
- Existing `Magnetic` interactions were tightened for fine-pointer devices and left inert on coarse pointers.

## Follow-up

- If Pris supplies a final portrait treatment later, update `ProfileAvatar` in one place instead of reworking each section.
- If more sections need motion, prefer these shared primitives before introducing page-specific animation code.
