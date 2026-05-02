# Blog (`/blog`) Wireframe

## Page stack

`BlogHero` → `CategoryRail` (tag summary) → `PostList`

## Mobile — 375px

```text
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ BlogHero                            │
│ [fade-in] H1 Blog                   │
│ [fade-in] intro copy                │
├─────────────────────────────────────┤
│ CategoryRail                        │
│ [fade-in] tags / topics pills       │
├─────────────────────────────────────┤
│ PostList                            │
│ [stagger] PostCard 01               │
│ [stagger] PostCard 02               │
│ [stagger] PostCard 03               │
│ [stagger] PostCard 04               │
└─────────────────────────────────────┘
```

## Tablet — 768px

```text
┌──────────────────────────────────────────────────────────────┐
│ BlogHero                                                     │
│ [fade-in] title + intro                                      │
├──────────────────────────────────────────────────────────────┤
│ CategoryRail pills wrap across rows                          │
├──────────────────────────────────────────────────────────────┤
│ PostList                                                     │
│ [stagger] PostCard                                           │
│ [stagger] PostCard                                           │
│ [stagger] PostCard                                           │
└──────────────────────────────────────────────────────────────┘
```

## Desktop — 1280px

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ BlogHero                                                                     │
│ [fade-in] eyebrow                                                            │
│ [fade-in] H1 Blog                                                            │
│ [fade-in] intro copy                                                         │
├──────────────────────────────────────────────────────────────────────────────┤
│ CategoryRail / metadata strip                                                │
│ [fade-in] tags, post count, editorial note                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│ PostList                                                                     │
│ [stagger] PostCard 01                                                        │
│ [stagger] PostCard 02                                                        │
│ [stagger] PostCard 03                                                        │
│ [stagger] PostCard 04                                                        │
│ vertical editorial rhythm; cards separated by generous whitespace            │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Navigation flow

- Each `PostCard` → `/blog/[slug]`
- Tags may remain decorative or later link to filtered states
- Header and footer expose resume/contact routes for conversion
