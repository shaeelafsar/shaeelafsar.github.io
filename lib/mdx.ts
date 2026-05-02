import type { ElementType } from "react";
import { compileMDX as compileRemoteMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

type MdxComponentMap = Record<string, ElementType>;

interface CompileMdxOptions {
  source: string;
  components?: MdxComponentMap;
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
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["anchor-heading"],
              },
            },
          ],
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
