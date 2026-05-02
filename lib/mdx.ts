import type { ElementType } from "react";
import { compileMDX as compileRemoteMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/utils";

type MdxComponentMap = Record<string, ElementType>;

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

interface CompileMdxOptions {
  source: string;
  components?: MdxComponentMap;
}

function stripHeadingFormatting(value: string) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim();
}

export function extractHeadings(source: string): TocItem[] {
  return source.split("\n").flatMap((line) => {
    const match = /^(##|###)\s+(.+)$/.exec(line.trim());

    if (!match) {
      return [];
    }

    const title = stripHeadingFormatting(match[2]);
    const level = match[1].length as 2 | 3;

    return title
      ? [
          {
            id: slugify(title),
            title,
            level,
          },
        ]
      : [];
  });
}

export async function compileMDX<TFrontmatter = Record<string, unknown>>({
  source,
  components = {},
}: CompileMdxOptions) {
  return compileRemoteMDX<TFrontmatter>({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              theme: {
                light: "github-light",
                dark: "github-dark",
              },
              keepBackground: false,
              defaultLang: {
                block: "plaintext",
                inline: "text",
              },
            },
          ],
        ],
      },
    },
  });
}
