# Spec: Resume Page

> **Components:** `components/resume/*.tsx`, `app/resume/` · **Owner:** Rachael

---

## Data Source

`content/resume.json` — structured data following JSON Resume schema (jsonresume.org).

```ts
// types/resume.ts
interface Resume {
  basics: {
    name: string;
    label: string;
    email: string;
    url: string;
    summary: string;
    location: { city: string; region: string; country: string };
    profiles: { network: string; url: string; username: string }[];
  };
  work: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  projects?: ProjectRef[];
}

interface WorkExperience {
  company: string;
  position: string;
  url?: string;
  startDate: string;
  endDate?: string;        // Omitted = current
  summary: string;
  highlights: string[];
}

interface Education {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
}

interface SkillCategory {
  name: string;             // e.g., "Frontend", "Backend", "DevOps"
  keywords: string[];       // e.g., ["React", "Next.js", "TypeScript"]
}
```

## Page (`app/resume/page.tsx`) — Server Component

- Load `resume.json` via `lib/resume.ts`
- Render sections: summary, experience timeline, skills grid, education
- Download button links to `/resume.pdf` in public/

**Metadata:**
```ts
export const metadata: Metadata = {
  title: 'Resume — Shaeel Afsar',
  description: 'Professional experience, skills, and education.',
};
```

## Components

### `ExperienceTimeline` (`experience-timeline.tsx`) — Server Component

```ts
interface ExperienceTimelineProps {
  experiences: WorkExperience[];
}
```

Vertical timeline with alternating left/right cards on desktop, single column on mobile. Each card: company, role, date range, summary, highlights. Connected by a vertical line with dot markers.

**Animation:** Each timeline card wrapped in `FadeIn` with alternating `direction` (left/right). Staggered on scroll.

### `SkillsGrid` (`skills-grid.tsx`) — Server Component

```ts
interface SkillsGridProps {
  skills: SkillCategory[];
}
```

Grid of skill categories. Each category: heading + list of keyword badges. Responsive: 1 col mobile, 2 col tablet, 3+ col desktop.

**Animation:** `StaggerChildren` on the grid. Each category fades in.

### `EducationSection` (`education-section.tsx`) — Server Component

```ts
interface EducationSectionProps {
  education: Education[];
}
```

Simple list/cards for education entries. Institution, degree, dates.

### `DownloadButton` (`download-button.tsx`) — Server Component

```ts
// No props — links to /resume.pdf
```

Styled button linking to the PDF resume. Uses `<a>` with `download` attribute.

---

## Responsive

| Breakpoint | Layout |
|-----------|--------|
| Mobile | Single-column timeline, stacked skills, full-width cards |
| Desktop (`lg+`) | Alternating timeline, multi-column skills grid |

## Animations

- Timeline cards: `FadeIn` with alternating left/right direction
- Skills grid: `StaggerChildren`
- Section headings: `TextReveal` or `FadeIn`
