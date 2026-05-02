# Home (`/`) Wireframe

## Global frame

- Persistent: `Header` / `Nav` / `ThemeToggle` / `MobileMenu` / `Footer`
- Page stack: `Hero` → `FeaturedProjects` → `AboutTeaser` → `BlogTeaser` → `CTASection`

## Mobile — 375px

```text
┌─────────────────────────────────────┐
│ Header                              │
│ [Logo]             [Theme][Menu]    │
├─────────────────────────────────────┤
│ Hero / Section (100dvh)             │
│ [text-reveal] H1 Shaeel Afsar       │
│ [fade-in] role / subtitle           │
│ [fade-in] [Button View Work]        │
│ [fade-in] [Button Get in Touch]     │
│ [parallax-out desktop-only note]    │
├─────────────────────────────────────┤
│ FeaturedProjects / Section          │
│ [fade-in] H2 Selected Work          │
│ [fade-in] supporting copy           │
│ [stagger] ProjectCard 01            │
│ [stagger] ProjectCard 02            │
│ [stagger] ProjectCard 03            │
│ [fade-in] Button View All Projects  │
├─────────────────────────────────────┤
│ AboutTeaser / Section alt bg        │
│ [fade-in] H2 About Me               │
│ body copy                           │
│ [ghost Button Learn More →]         │
│ [fade-in] OptimizedImage            │
├─────────────────────────────────────┤
│ BlogTeaser / Section                │
│ [fade-in] H2 Latest Writing         │
│ [stagger] PostCard 01               │
│ [stagger] PostCard 02               │
│ [stagger] PostCard 03               │
│ [fade-in] Button Read the Blog      │
├─────────────────────────────────────┤
│ CTASection / Section accent surface │
│ [fade-in] H2 Let's Work Together    │
│ supporting copy                     │
│ [fade-in] Button Get in Touch       │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

## Tablet — 768px

```text
┌──────────────────────────────────────────────────────────────┐
│ Header: [Logo] [Nav hidden]                [Theme][Menu]    │
├──────────────────────────────────────────────────────────────┤
│ Hero / Container                                                   │
│ [text-reveal] H1 spans 8-10 cols                                  │
│ [fade-in] subtitle max 60ch                                       │
│ [fade-in] [View Work] [Get in Touch]                              │
├──────────────────────────────────────────────────────────────┤
│ FeaturedProjects                                                  │
│ [fade-in] intro                                                   │
│ [stagger grid 2 cols] [ProjectCard] [ProjectCard]                 │
│ [stagger grid wrap] [ProjectCard]                                 │
│ [fade-in] centered CTA                                            │
├──────────────────────────────────────────────────────────────┤
│ AboutTeaser                                                       │
│ [fade-in] text block                                              │
│ [fade-in] image below or side-by-side if width allows             │
├──────────────────────────────────────────────────────────────┤
│ BlogTeaser                                                        │
│ [stagger grid 2 cols] PostCard / PostCard / PostCard              │
├──────────────────────────────────────────────────────────────┤
│ CTASection centered stack                                         │
└──────────────────────────────────────────────────────────────┘
```

## Desktop — 1280px

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Header                                                                       │
│ [Logo]   [Nav: About Projects Blog Resume Contact]   [ThemeToggle]          │
├──────────────────────────────────────────────────────────────────────────────┤
│ Hero / Section h-dvh                                                         │
│ ┌────────────────────────────────────┬─────────────────────────────────────┐ │
│ │ [text-reveal] H1 Shaeel Afsar      │ [parallax] Accent halo / grain /   │ │
│ │ [fade-in] role statement           │ floating decorative shapes          │ │
│ │ [fade-in] CTA row                  │                                     │ │
│ │ subtle scroll-out parallax         │                                     │ │
│ └────────────────────────────────────┴─────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────┤
│ FeaturedProjects / Section                                                   │
│ [fade-in] heading + copy                                                     │
│ [stagger grid 3 cols] ProjectCard | ProjectCard | ProjectCard                │
│ [fade-in] centered View All Projects                                         │
├──────────────────────────────────────────────────────────────────────────────┤
│ AboutTeaser / Section background-secondary                                   │
│ [fade-in left] text / blurb / Learn More   [fade-in right] OptimizedImage    │
├──────────────────────────────────────────────────────────────────────────────┤
│ BlogTeaser / Section                                                         │
│ [fade-in] heading + copy                                                     │
│ [stagger grid 3 cols] PostCard | PostCard | PostCard                         │
│ [fade-in] centered Read the Blog                                             │
├──────────────────────────────────────────────────────────────────────────────┤
│ CTASection / accent field                                                    │
│ [fade-in] centered pitch + primary CTA                                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Navigation flow

- `Header` logo → `/`
- Hero CTA → `/projects`, `/contact`
- `FeaturedProjects` CTA → `/projects`
- `AboutTeaser` CTA → `/about`
- `BlogTeaser` CTA → `/blog`
- `CTASection` CTA → `/contact`
- Persistent nav exposes `/about`, `/projects`, `/blog`, `/resume`, `/contact`
