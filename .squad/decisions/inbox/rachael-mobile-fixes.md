# Rachael — Mobile Hero and Nav Fixes

- **Date:** 2026-05-03T10:53:41.977-05:00
- **Owner:** Rachael
- **Status:** Proposed

## Decision

Treat coarse-pointer/mobile devices as a simplified presentation mode for the home hero: disable duplicate glitch layers, prefer content-height hero spacing, and mount the mobile nav drawer in `document.body` so it sits above sticky header effects.

## Why

- Hover-driven glitch layers are not reliable on phones and can surface duplicate text copies.
- Viewport-height hero shells create unnecessary dead space once the decorative right rail is hidden.
- Sticky headers with blur/filter effects can interfere with fixed descendants, so portal-mounted navigation is more dependable for tapping.

## Implementation Notes

- `GlitchText` now hides its cyan/magenta duplicate layers for `max-width: 767px` and coarse pointers.
- `Hero` now uses mobile-first content height, keeps decorative layers `pointer-events-none`, and still restores the taller centered layout from `sm` upward.
- `MobileMenu` now portals the overlay to `document.body` and uses explicit pointer-events separation between backdrop and drawer content.

## Follow-up

- If more decorative hero effects are added, validate them on 360px/375px viewports before merging.
- If other overlays are introduced, prefer the same portal pattern so interactive layers are not trapped inside visual stacking contexts.
