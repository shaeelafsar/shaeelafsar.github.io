import { getAllPosts } from "@/lib/blog";
import { createRssXml } from "@/lib/seo";

export async function GET() {
  const posts = await getAllPosts();
  const xml = createRssXml(posts);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
