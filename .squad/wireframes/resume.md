# Resume (`/resume`) Wireframe

## Global Frame

- Persistent shell on every breakpoint: `Header` → page `<main>` → `Footer`
- `Header` contains `Nav`, `ThemeToggle [client]`, and `MobileMenu [client]`
- Breakpoint contract:
  - `< 768`: stacked hero and single-column timeline
  - `768-1023`: widened single-column timeline, 2-col skills
  - `1024-1279`: compact desktop alternating timeline + inline nav
  - `1280+`: wide desktop alternating timeline
- Shared test IDs: `site-header`, `site-nav`, `theme-toggle`, `mobile-menu-trigger`, `site-footer`

## Page stack

`ResumeHero` (includes `DownloadButton`) → `ExperienceTimeline` → `SkillsGrid` → `EducationSection`

## Client / server ownership

- Server sections only: `ResumeHero`, `DownloadButton`, `ExperienceTimeline`, `SkillsGrid`, `EducationSection`
- Client islands in shell only: `ThemeToggle [client]`, `MobileMenu [client]`

## Data flow

- Core resume data: `content/resume.json` via `lib/resume.ts`
- Hero intro copy: static page copy paired with structured basics summary from `resume.json`
- Download asset: `public/resume.pdf`

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
│ single column cards + spine         │
├─────────────────────────────────────┤
│ SkillsGrid                          │
│ stacked categories                  │
├─────────────────────────────────────┤
│ EducationSection                    │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

## Tablet — 768-1023px

```text
┌──────────────────────────────────────────────────────────────┐
│ ResumeHero (DownloadButton remains inside hero)              │
├──────────────────────────────────────────────────────────────┤
│ ExperienceTimeline: single-column, wider cards               │
├──────────────────────────────────────────────────────────────┤
│ SkillsGrid: locked 2-col grid                                │
├──────────────────────────────────────────────────────────────┤
│ EducationSection                                             │
└──────────────────────────────────────────────────────────────┘
```

## Compact desktop — 1024-1279px

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ResumeHero: summary left, DownloadButton right                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ ExperienceTimeline: alternating left/right around central spine             │
├──────────────────────────────────────────────────────────────────────────────┤
│ SkillsGrid: locked 3-col grid                                               │
├──────────────────────────────────────────────────────────────────────────────┤
│ EducationSection                                                            │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Wide desktop — 1280px+

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ResumeHero: summary left, DownloadButton right                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ ExperienceTimeline alternating left/right                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│ SkillsGrid / 3-col grid                                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│ EducationSection                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│ Footer                                                                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

## States

- Download ready: button links to `/resume.pdf` with file-type label
- Download pending check: optional short inline loading label while verifying asset existence on first render
- Missing file: disable primary download action and show fallback copy with contact link
- Download error: keep user on page, show inline retry/help text near the button
- Empty resume sections: hide the section instead of rendering empty containers; preserve heading order for remaining sections
- Global error: page-level error boundary preserves the hero shell and shows recovery copy

## Accessibility + interaction notes

- Timeline uses ordered-list semantics
- Download action label includes file type, e.g. "Download resume PDF"
- Long timeline entries wrap naturally; no truncation on mobile
- Reduced motion keeps card order consistent even when entrance motion is removed

## Suggested test IDs

- `resume-hero`
- `resume-download`
- `experience-timeline`
- `skills-grid`
- `education-section`
