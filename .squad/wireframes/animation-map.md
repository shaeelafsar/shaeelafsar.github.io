# Animation Choreography Map

## Global standards

- Primary library: Framer Motion (`motion/react`)
- View Transitions API first, `AnimatePresence` fallback
- Default ease: `[0.21, 0.47, 0.32, 0.98]`
- Micro interactions: CSS only, `150ms-300ms`
- Section entrances: `600ms`, `y: 32-40px`
- Stagger cadence: `0.08s` text, `0.1s` cards/items
- Reduced motion: remove motion, preserve visibility and state change

## Client wrapper ownership

| Primitive / behavior | Owner | Notes |
|---|---|---|
| `FadeIn` | client wrapper around server children | do not convert whole sections to client components |
| `StaggerChildren` | client wrapper around server lists/cards | children remain server-rendered |
| `TextReveal` | client wrapper for hero/heading text | keep content readable on first paint |
| `Parallax` | client wrapper for decorative/media layers | never wrap interactive controls |
| `PageTransition` | client wrapper at layout/page-shell level | header/footer remain stable |
| `ReadingProgress [client]` | dedicated client component | blog posts only |
| `TableOfContents [client]` | dedicated client component | blog post hash nav + active state |
| `ProjectFilter [client]` | dedicated client component | owns pending/filter-change motion only |
| `ThemeToggle [client]` | dedicated client component | icon swap only |
| `MobileMenu [client]` | dedicated client component | overlay + staggered links |
| `ContactForm [client]` | dedicated client component | field entrance + status transition |

## Page-by-page sequence

### Home
1. `Hero`
   - H1 `TextReveal` on mount
   - subtitle `FadeIn` at `0.5s`
   - CTA row `FadeIn` at `0.8s`
   - desktop accent shapes `Parallax`, speed `0.3`
2. `FeaturedProjects`
   - heading/copy `FadeIn`
   - cards `StaggerChildren`
3. `AboutTeaser`
   - text from left, image from right on desktop only
4. `BlogTeaser`
   - same pattern as featured projects
5. `CTASection`
   - centered `FadeIn`

### About
1. Intro block `FadeIn`
2. Portrait subtle parallax on tablet/desktop only
3. Philosophy section `FadeIn`
4. `SkillsGrid` category cards `StaggerChildren`
5. Interest cards `FadeIn` with short stagger

### Projects
1. Hero intro `FadeIn`
2. `ProjectFilter [client]` pill row `FadeIn`
3. `ProjectGrid` cards `StaggerChildren`
4. Filter change animates **grid only** with soft opacity transition; full-page entrance animations do not replay

### Project Detail
1. Header title/meta `FadeIn`
2. Hero image `FadeIn` + desktop parallax
3. Major MDX blocks reveal once as they cross viewport
4. CTA row `FadeIn`

### Blog
1. Hero intro `FadeIn`
2. `TagList` metadata strip `FadeIn`
3. `PostList` cards `StaggerChildren`

### Blog Post
1. `ReadingProgress [client]` appears immediately
2. `PostHeader` `FadeIn`
3. Article wrapper `FadeIn` once; internal MDX content stays stable
4. `TableOfContents [client]` has no entrance animation; active-state color transition only
5. Related posts use `StaggerChildren`

### Resume
1. Hero summary + download action `FadeIn`
2. `ExperienceTimeline` cards reveal alternately left/right on scroll
3. `SkillsGrid` categories `StaggerChildren`
4. `EducationSection` cards `FadeIn`

### Contact
1. Hero intro `FadeIn`
2. Social panel `FadeIn`
3. `ContactForm [client]` fields `StaggerChildren` on first load only
4. Success/error status region fades in quickly with no layout jump

## Additional motion rules

- **Theme switch:** `ThemeToggle [client]` icon crossfade + slight scale; page colors transition via CSS only
- **Mobile menu:** overlay fade + nav-link stagger on open; reverse faster on close
- **Form status:** success/error region crossfades in place; no page scroll jump
- **Filter pending:** grid opacity shifts to `0.6-0.7` during `useTransition`, then restores without replaying section entrances

## Scroll-triggered trigger points

| Pattern | Trigger |
|---|---|
| Standard `FadeIn` | `viewport.margin = -80px` |
| Card grids | section top reaches 75% viewport |
| Timeline entries | card top reaches 80% viewport |
| TOC active state | `rootMargin: -80px 0px -60% 0px` |
| Hero parallax-out | active from page top until hero exits |
| Reading progress | article scroll range only |

## Hover + focus-visible parity

- Every hover affordance must have a keyboard-visible equivalent state
- `Button`: hover lift pairs with focus ring and unchanged layout
- `Card`: hover shadow pairs with focus-visible outline/ring for linked cards
- `Nav` links: underline animation pairs with persistent focus-visible underline
- `Filter` pills: hover color preview pairs with focus-visible ring + selected fill
- `ThemeToggle [client]`: hover tint pairs with focus ring

## Reduced motion fallbacks

- `FadeIn`, `StaggerChildren`, `TextReveal`, `Parallax`, `PageTransition` return static content immediately
- `SmoothScrollProvider` disables Lenis and uses native scrolling
- `ReadingProgress [client]` keeps raw progress binding, no spring
- `TableOfContents [client]` still updates active state, but hash navigation jumps instantly
- Mobile menu opens/closes instantly
- Hover motion is removed; color/focus states remain

## Test assertion guidance

### Run-once vs replay
- Section entrance reveals should run **once** per page load/navigation
- Grid entrance on `/projects` should **not** replay after tag changes
- TOC active-state and reading-progress updates may replay continuously with scroll
- Mobile menu, theme toggle, and form-status transitions may replay on every user action

### View Transitions vs fallback
- Prefer feature detection over timing assertions: check `document.startViewTransition` support path when instrumented
- Acceptance for unsupported browsers: page still transitions with fallback fade; no broken shell flash
- Header/footer remain visually stable in both paths

### Stable QA notes
- Test reduced-motion mode separately; assert end states, not animation duration
- Use completion states (`aria-expanded`, `data-state`, selected styles, visible status region) instead of brittle frame timing
- Filter/hash updates should assert focus target and URL state, not elapsed milliseconds
