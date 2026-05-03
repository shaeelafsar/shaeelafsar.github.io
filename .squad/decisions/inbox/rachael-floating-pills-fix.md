# Rachael — Floating pills fix

- **Date:** 2026-05-03T14:30:40.831-05:00
- **Decision:** Replace animated floating skill pills/badges with static, in-flow badge rows for hero/about surfaces, and keep footer multi-column alignment gated to larger breakpoints.
- **Reasoning:** The floating badges felt distracting on laptop/desktop and could visually drift away from their parent cards. Static badge rows preserve the content signal without creating motion noise, and delaying footer column splits until `lg` keeps alignment cleaner at tablet widths.
- **Frontend impact:** Hero, about teaser, and about portrait badges should stay non-animated unless there is a strong interaction-specific reason to reintroduce motion.
