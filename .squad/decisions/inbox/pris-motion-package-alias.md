# Pris decision note — Motion package alignment

- **Date:** 2026-05-02T17:18:28-05:00
- **Status:** Proposed
- **Context:** The scaffold had `framer-motion` installed, but project specs and ADR-001 require Motion v12 syntax via `motion/react`.
- **Decision:** Add the `motion` package directly and treat `motion/react` as the canonical import path for all new animation primitives and future motion work.
- **Why it matters:** This keeps implementation aligned with the team animation contract, avoids mixed import styles, and makes shared primitives consistent across contributors.
