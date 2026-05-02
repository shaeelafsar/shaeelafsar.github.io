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
      image: frontmatter.image ?? "/images/blog/placeholder.svg",
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

export const getAllPostTags = cache(async (): Promise<string[]> => {
  const posts = await getAllPosts();

  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort((left, right) =>
    left.localeCompare(right),
  );
});

export const getRelatedPosts = cache(async (slug: string, limit = 3): Promise<BlogPost[]> => {
  const posts = await getAllPosts();
  const currentPost = posts.find((post) => post.slug === slug);

  if (!currentPost) {
    return [];
  }

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => currentPost.tags.includes(tag)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => {
      if (left.score !== right.score) {
        return right.score - left.score;
      }

      return new Date(right.post.date).getTime() - new Date(left.post.date).getTime();
    })
    .slice(0, limit)
    .map((entry) => entry.post);
});
