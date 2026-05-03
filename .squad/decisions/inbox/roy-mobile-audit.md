# Roy — Mobile audit decision

- **Date:** 2026-05-03T10:38:08.957-05:00
- **Requested by:** Shaeel Afsar
- **Decision:** Treat 360px–430px mobile widths (iPhone SE, iPhone 14/15 family, Galaxy S23 family) as required QA coverage for every primary route, and degrade heavy decorative effects on coarse-pointer/mobile devices instead of rendering the full desktop neon stack.
- **Why:** The neon overhaul introduced the highest mobile risk in animated hero treatments, overflow-prone pills/badges, and small navigation/footer touch targets. Reducing particles/glow intensity and validating against those phone widths keeps the visual direction while preventing overflow and mobile GPU strain.
- **Implementation notes:** Added a concrete viewport export, tightened mobile spacing, strengthened text wrapping, ensured 44px touch targets in navigation/footer/button surfaces, and added device-specific responsive coverage in Playwright helpers/specs.
