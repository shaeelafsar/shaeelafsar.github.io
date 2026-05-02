export interface Skill {
  name: string;
  level?: string;
  keywords?: string[];
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Experience {
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  summary: string;
  highlights: string[];
  techStack: string[];
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  location?: string;
  email?: string;
  website?: string;
  experience: Experience[];
  education: Education[];
  skillCategories: SkillCategory[];
}
