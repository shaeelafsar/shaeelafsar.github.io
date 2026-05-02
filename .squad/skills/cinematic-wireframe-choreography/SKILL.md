---
name: "cinematic-wireframe-choreography"
description: "Create implementation-ready wireframes that align responsive layout, exact component names, and motion cues."
domain: "design-system"
confidence: "high"
source: "earned"
---

## Context
Use this when a team needs handoff-quality wireframes for a premium frontend before visual implementation begins.

## Patterns
- Document each route separately.
- Always show three breakpoints: `375px`, `768px`, `1280px`.
- Use the exact component names from specs (`Hero`, `ProjectGrid`, `TableOfContents`, etc.).
- Mark motion inline inside the wireframe with tags like `[fade-in]`, `[stagger]`, `[parallax]`, `[text-reveal]`.
- Include the page stack first, then ASCII layout, then navigation flow.
- Keep global chrome (`Header`, `Footer`, `ThemeToggle`, `MobileMenu`) visible when it affects layout decisions.
- Treat editorial rhythm as part of the wireframe: narrow reading columns, grid counts, sticky sidebars, CTA placement.

## Examples
- Home pages: hero first, then proof, personality, writing, CTA.
- Blog posts: fixed `ReadingProgress`, `PostHeader`, narrow article column, sticky `TableOfContents` on desktop only.
- Resume pages: alternating desktop timeline, single-column mobile fallback.

## Anti-Patterns
- Do not describe layout only in prose.
- Do not omit breakpoint changes.
- Do not invent component names that diverge from the approved specs.
- Do not separate animation notes into a disconnected appendix only; keep them visible at component level.
