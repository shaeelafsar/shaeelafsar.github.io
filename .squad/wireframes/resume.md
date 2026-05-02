# Resume (`/resume`) Wireframe

## Page stack

`ResumeHero` → `DownloadButton` → `ExperienceTimeline` → `SkillsGrid` → `EducationSection`

## Mobile — 375px

```text
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ ResumeHero                          │
│ [fade-in] H1 Resume                 │
│ [fade-in] summary copy              │
│ [fade-in] DownloadButton            │
├─────────────────────────────────────┤
│ ExperienceTimeline                  │
│ [fade-in] card 01                   │
│ [fade-in] card 02                   │
│ [fade-in] card 03                   │
│ single line + dot markers           │
├─────────────────────────────────────┤
│ SkillsGrid                          │
│ [stagger] category 01               │
│ [stagger] category 02               │
│ [stagger] category 03               │
├─────────────────────────────────────┤
│ EducationSection                    │
│ [fade-in] school card(s)            │
└─────────────────────────────────────┘
```

## Tablet — 768px

```text
┌──────────────────────────────────────────────────────────────┐
│ ResumeHero + DownloadButton                                 │
├──────────────────────────────────────────────────────────────┤
│ ExperienceTimeline                                           │
│ vertical spine with wider cards                              │
├──────────────────────────────────────────────────────────────┤
│ SkillsGrid [stagger grid 2 cols]                             │
├──────────────────────────────────────────────────────────────┤
│ EducationSection cards                                       │
└──────────────────────────────────────────────────────────────┘
```

## Desktop — 1280px

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ResumeHero                                                                    │
│ [fade-in] H1 Resume                                                           │
│ [fade-in] summary / key stats                          [fade-in] DownloadButton│
├──────────────────────────────────────────────────────────────────────────────┤
│ ExperienceTimeline                                                            │
│                │                                                              │
│ [fade-in left] card 01  ●  [fade-in right] card 02                            │
│ [fade-in left] card 03  ●  [fade-in right] card 04                            │
│ alternating left/right around central line                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│ SkillsGrid                                                                    │
│ [stagger grid 3 cols] category | category | category                          │
├──────────────────────────────────────────────────────────────────────────────┤
│ EducationSection                                                              │
│ [fade-in] institution cards / credentials                                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Navigation flow

- `DownloadButton` → `/resume.pdf`
- Resume can cross-link to `/projects` and `/contact`
- Header/footer keep all primary route exits available
