export interface Project {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  image: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  content: string;
}
