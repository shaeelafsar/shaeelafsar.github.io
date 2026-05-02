# About (`/about`) Wireframe

## Page stack

`AboutIntro` → `WhatIDoSection` → `TechnologiesSection` (`SkillsGrid`) → `BeyondCodeSection`

## Mobile — 375px

```text
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ AboutIntro / Section                │
│ [fade-in] H1 About                  │
│ [fade-in] extended bio              │
│ [fade-in] OptimizedImage            │
├─────────────────────────────────────┤
│ WhatIDoSection                      │
│ [fade-in] H2 What I Do              │
│ philosophy copy                     │
├─────────────────────────────────────┤
│ TechnologiesSection                 │
│ [fade-in] H2 Technologies           │
│ [stagger] SkillsGrid item 01        │
│ [stagger] SkillsGrid item 02        │
│ [stagger] SkillsGrid item 03        │
├─────────────────────────────────────┤
│ BeyondCodeSection                   │
│ [fade-in] H2 Beyond Code            │
│ interests cards / copy              │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

## Tablet — 768px

```text
┌──────────────────────────────────────────────────────────────┐
│ AboutIntro                                                   │
│ [fade-in] H1 + bio                                           │
│ [parallax-subtle] professional photo beside or below copy    │
├──────────────────────────────────────────────────────────────┤
│ WhatIDoSection full-width narrative                          │
├──────────────────────────────────────────────────────────────┤
│ TechnologiesSection                                          │
│ [stagger grid 2 cols] SkillsGrid categories                  │
├──────────────────────────────────────────────────────────────┤
│ BeyondCodeSection                                            │
│ 2-col interest blocks / image + text                         │
└──────────────────────────────────────────────────────────────┘
```

## Desktop — 1280px

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ AboutIntro / Section                                                        │
│ ┌────────────────────────────────────┬─────────────────────────────────────┐ │
│ │ [fade-in] H1 About                 │ [parallax] OptimizedImage          │ │
│ │ extended bio / summary             │ portrait with soft frame           │ │
│ │ optional mini fact list            │                                     │ │
│ └────────────────────────────────────┴─────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────┤
│ WhatIDoSection                                                                │
│ [fade-in] H2 What I Do                                                        │
│ 2-column editorial copy / principles                                          │
├──────────────────────────────────────────────────────────────────────────────┤
│ TechnologiesSection                                                           │
│ [fade-in] H2 Technologies                                                     │
│ [stagger grid 3 cols] SkillsGrid category | category | category               │
├──────────────────────────────────────────────────────────────────────────────┤
│ BeyondCodeSection                                                             │
│ [fade-in] H2 Beyond Code                                                      │
│ 3-up interest cards or 2-col narrative + visual memorabilia                   │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Navigation flow

- Header nav to all core routes
- Inline links can point toward `/projects`, `/blog`, `/contact`
- Footer repeats social/contact exits
