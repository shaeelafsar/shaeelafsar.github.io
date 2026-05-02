# Animation Choreography Map

## Global standards

- Primary library: Framer Motion (`motion/react`)
- GSAP reserved only for a future pinned timeline if one section truly needs it
- Default ease: `[0.21, 0.47, 0.32, 0.98]`
- Micro interactions: CSS only, `150ms-300ms`
- Section entrances: `600ms`, `y: 32-40px`
- Stagger cadence: `0.08s` text, `0.1s` cards/items
- Reduced motion: remove motion, preserve visibility and state change

## Page-by-page sequence

### Home
1. `Hero`
   - H1 `TextReveal` on mount
   - subtitle `FadeIn` at `0.5s`
   - CTA row `FadeIn` at `0.8s`
   - desktop accent shapes `Parallax`, speed `0.3`
2. `FeaturedProjects`
   - heading/copy `FadeIn` when top enters ~75% viewport
   - cards `StaggerChildren`
   - CTA fades after cards
3. `AboutTeaser`
   - text from left, image from right for converging reveal
4. `BlogTeaser`
   - same pattern as featured projects
5. `CTASection`
   - one centered `FadeIn`; optional slow background glow drift

### About
1. Intro block `FadeIn`
2. Portrait subtle scroll-linked parallax or slight scale drift
3. Philosophy section `FadeIn`
4. `SkillsGrid` category cards `StaggerChildren`
5. Interest cards `FadeIn` with short stagger

### Projects
1. Hero intro `FadeIn`
2. `ProjectFilter` pill row `FadeIn`
3. `ProjectGrid` cards `StaggerChildren`
4. Filter change should not replay full page animation; only grid content updates softly

### Project Detail
1. Header title/meta `FadeIn`
2. Hero image `FadeIn` + desktop parallax
3. Major MDX blocks reveal one by one as they cross viewport
4. Media blocks can use gentle image parallax only when full-width and not performance-heavy

### Blog
1. Hero intro `FadeIn`
2. Tag/category rail `FadeIn`
3. `PostList` cards `StaggerChildren`

### Blog Post
1. `ReadingProgress` appears immediately
2. `PostHeader` `FadeIn`
3. Article wrapper `FadeIn` once; internal MDX content stays stable
4. `TableOfContents` has no entrance animation; only active-state color transition
5. Related posts use `StaggerChildren`

### Resume
1. Hero summary and `DownloadButton` `FadeIn`
2. `ExperienceTimeline` cards reveal alternately left/right on scroll
3. `SkillsGrid` categories `StaggerChildren`
4. `EducationSection` cards `FadeIn`

### Contact
1. Hero intro `FadeIn`
2. Social panel `FadeIn`
3. `ContactForm` fields `StaggerChildren` on first load
4. Success/error states fade in instantly without layout jump

## Scroll-triggered trigger points

| Pattern | Trigger |
|---|---|
| Standard `FadeIn` | `viewport.margin = -80px` |
| Card grids | section top reaches 75% viewport |
| Timeline entries | card top reaches 80% viewport |
| TOC active state | `rootMargin: -80px 0px -60% 0px` |
| Hero parallax-out | active from page top until hero exits |
| Reading progress | full article scroll range |

## Page transitions

- Use View Transitions API first, `AnimatePresence` fallback
- Exit: `opacity 1→0`, `y 0→-8`, `200ms`
- Enter: `opacity 0→1`, `y 8→0`, `300ms`
- Header/footer remain stable; only page body transitions
- Scroll resets to top after navigation

## Hover + micro-interaction inventory

- `Button`: scale `1.03` on hover, `0.98` on active
- `Card`: scale `1.02` + deeper shadow on hover
- Project card media: image zoom `1.05`
- `Nav` links: accent underline via `scaleX`
- Footer/social icons: scale `1.15` + accent color
- Filter pills: background/border/color transition only
- Theme toggle: icon crossfade, instant in reduced motion

## Reduced motion fallbacks

- `FadeIn`, `StaggerChildren`, `TextReveal`, `Parallax`, `PageTransition` return static content
- `SmoothScrollProvider` disables Lenis and uses native scrolling
- `ReadingProgress` keeps raw progress binding, no spring
- Header remains visible; no hide/reveal animation
- Mobile menu opens/closes instantly
- Hover motion is removed; color/focus states remain
