import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost } from "@/types/blog";

const blogDirectory = path.join(process.cwd(), "content/blog");

type BlogFrontmatter = Partial<Omit<BlogPost, "content" | "readingTime">>;

export const getPostSlugs = cache(async () => {
  try {
    const files = await readdir(blogDirectory);

    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
});

export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    const filePath = path.join(blogDirectory, `${slug}.mdx`);
    const source = await readFile(filePath, "utf8");
    const { data, content } = matter(source);
    const frontmatter = data as BlogFrontmatter;

    return {
      slug: frontmatter.slug ?? slug,
      title: frontmatter.title ?? slug,
      date: frontmatter.date ?? "2026-05-02T17:18:28-05:00",
      excerpt: frontmatter.excerpt ?? "",
      tags: frontmatter.tags ?? [],
      image: frontmatter.image ?? "/images/blog/placeholder.jpg",
      published: frontmatter.published ?? true,
      featured: frontmatter.featured ?? false,
      readingTime: readingTime(content).text,
      content,
    };
  } catch {
    return null;
  }
});

export const getAllPosts = cache(async (): Promise<BlogPost[]> => {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  return posts
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());
});
