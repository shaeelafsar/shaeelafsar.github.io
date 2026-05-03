# Pris — Neon redesign

- **Date:** 2026-05-03T10:07:18.041-05:00
- **Decision:** Adopt a dark-first cyberpunk-inspired token layer in `app/globals.css` with restrained neon cyan / blue / magenta / green accents, plus shared utility treatments for glass panels, neon cards, grid overlays, underline glows, and reduced-motion-safe glitch/typing effects.
- **Why:** The portfolio needed more visual identity and polish, but still has to read as senior-engineer professional work. Centralizing the effect language in globals keeps the look consistent without pushing page-specific implementations toward garish one-offs.
- **Implementation impact:** Shared surfaces and CTA/card/button states should use the new utility classes and glow tokens first. Default theme behavior is now dark-first, while light mode remains supported as the secondary presentation.
- **QA notes:** Roy should regression-check reduced-motion fallbacks, button/card hover affordances, and dark/light theme contrast on home plus shared card surfaces.
