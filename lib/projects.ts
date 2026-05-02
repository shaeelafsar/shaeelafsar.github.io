import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import type { Project } from "@/types/project";

const projectsDirectory = path.join(process.cwd(), "content/projects");

type ProjectFrontmatter = Partial<Omit<Project, "content">>;

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  try {
    const filePath = path.join(projectsDirectory, `${slug}.mdx`);
    const source = await readFile(filePath, "utf8");
    const { data, content } = matter(source);
    const frontmatter = data as ProjectFrontmatter;

    return {
      slug: frontmatter.slug ?? slug,
      title: frontmatter.title ?? slug,
      date: frontmatter.date ?? "2026-05-02T17:18:28-05:00",
      excerpt: frontmatter.excerpt ?? "",
      category: frontmatter.category ?? "Full Stack",
      tags: frontmatter.tags ?? [],
      image: frontmatter.image ?? "/images/projects/placeholder.svg",
      featured: frontmatter.featured ?? false,
      liveUrl: frontmatter.liveUrl,
      githubUrl: frontmatter.githubUrl,
      content,
    };
  } catch {
    return null;
  }
});

export const getAllProjects = cache(async (): Promise<Project[]> => {
  try {
    const files = await readdir(projectsDirectory);
    const slugs = files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
    const projects = await Promise.all(slugs.map((slug) => getProjectBySlug(slug)));

    return projects
      .filter((project): project is Project => project !== null)
      .sort((left, right) => {
        if (left.featured !== right.featured) {
          return Number(right.featured) - Number(left.featured);
        }

        return new Date(right.date).getTime() - new Date(left.date).getTime();
      });
  } catch {
    return [];
  }
});

export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  const projects = await getAllProjects();

  return projects.filter((project) => project.featured);
});
