# Projects (`/projects`) Wireframe

## Page stack

`ProjectsHero` → `ProjectFilter` → `ProjectGrid`

## Mobile — 375px

```text
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ ProjectsHero / Section              │
│ [fade-in] H1 Projects               │
│ [fade-in] intro copy                │
├─────────────────────────────────────┤
│ ProjectFilter                       │
│ [fade-in] horizontal pill scroller  │
│ [All][Next.js][AI][TS][Design]      │
├─────────────────────────────────────┤
│ ProjectGrid                         │
│ [stagger] ProjectCard 01            │
│ [stagger] ProjectCard 02            │
│ [stagger] ProjectCard 03            │
│ [stagger] ProjectCard 04            │
└─────────────────────────────────────┘
```

## Tablet — 768px

```text
┌──────────────────────────────────────────────────────────────┐
│ ProjectsHero                                                 │
│ [fade-in] H1 + body                                          │
├──────────────────────────────────────────────────────────────┤
│ ProjectFilter sticky row (optional)                          │
│ [pill buttons wrap to 2 lines if needed]                     │
├──────────────────────────────────────────────────────────────┤
│ ProjectGrid                                                  │
│ [stagger grid 2 cols] ProjectCard | ProjectCard              │
│ [stagger grid 2 cols] ProjectCard | ProjectCard              │
└──────────────────────────────────────────────────────────────┘
```

## Desktop — 1280px

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ProjectsHero                                                                 │
│ [fade-in] eyebrow                                                            │
│ [fade-in] H1 Projects                                                        │
│ [fade-in] intro copy + count                                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ ProjectFilter                                                                │
│ [fade-in] pill row: All | Next.js | TypeScript | AI | Design Systems | ...  │
├──────────────────────────────────────────────────────────────────────────────┤
│ ProjectGrid                                                                  │
│ [stagger grid 3 cols]                                                        │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                           │
│ │ ProjectCard  │ │ ProjectCard  │ │ ProjectCard  │                           │
│ │ image/title  │ │ image/title  │ │ image/title  │                           │
│ │ excerpt/tags │ │ excerpt/tags │ │ excerpt/tags │                           │
│ └──────────────┘ └──────────────┘ └──────────────┘                           │
│ more rows continue                                                           │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Navigation flow

- Each `ProjectCard` → `/projects/[slug]`
- Filter changes URL state: `?tag=`
- Header nav + footer keep access to `/contact` for conversion
