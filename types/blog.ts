export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  image: string;
  published: boolean;
  featured: boolean;
  readingTime: string;
  content: string;
}
