import { getAllPosts } from "@/lib/blog";
import { createRssXml } from "@/lib/seo";

export async function GET() {
  const posts = await getAllPosts();
  const body = createRssXml(posts);

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
