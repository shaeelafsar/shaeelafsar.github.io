# Rachael Decision Inbox — Next 16 View Transition Config

- **Date:** 2026-05-02T17:18:28-05:00
- **Requested by:** Shaeel Afsar
- **Context:** ADR-010 references `experimental.viewTransitions`, but the installed Next.js 16 config type exposes `experimental.viewTransition`.
- **Decision:** Foundation scaffolding uses `experimental.viewTransition: true` so the project compiles against the current Next.js 16 API while preserving the team intent to enable native View Transitions.
- **Impact:** Future config changes should use the singular key unless Deckard updates the ADR wording to match the framework API.
