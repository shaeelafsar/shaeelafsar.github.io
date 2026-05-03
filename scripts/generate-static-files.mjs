import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const blogDir = path.join(rootDir, "content", "blog");
const projectsDir = path.join(rootDir, "content", "projects");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shaeelafsar.github.io";
const buildTimestamp = new Date("2026-05-03T09:11:36-05:00");

function absoluteUrl(urlPath = "/") {
  return new URL(urlPath, siteUrl).toString();
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function readCollection(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"));

  const items = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directory, file.name);
      const source = await fs.readFile(filePath, "utf8");
      const { data } = matter(source);

      return {
        slug: file.name.replace(/\.mdx$/, ""),
        ...data,
      };
    }),
  );

  return items.sort((left, right) => new Date(String(right.date)).getTime() - new Date(String(left.date)).getTime());
}

function createRssXml(posts) {
  const publishedPosts = posts.filter((post) => post.published !== false);
  const items = publishedPosts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(String(post.title))}</title>
      <link>${escapeXml(absoluteUrl(`/blog/${post.slug}`))}</link>
      <guid>${escapeXml(absoluteUrl(`/blog/${post.slug}`))}</guid>
      <pubDate>${escapeXml(new Date(String(post.date)).toUTCString())}</pubDate>
      <description>${escapeXml(String(post.excerpt))}</description>
    </item>`,
    )
    .join("");

  const lastBuildDate = publishedPosts[0]
    ? new Date(String(publishedPosts[0].date)).toUTCString()
    : buildTimestamp.toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml("Shaeel Afsar")}</title>
    <link>${escapeXml(absoluteUrl("/blog"))}</link>
    <description>${escapeXml("Personal professional website, portfolio, blog, and resume for Shaeel Afsar.")}</description>
    <language>en-us</language>
    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>
    ${items}
  </channel>
</rss>`;
}

function createSitemapXml(posts, projects) {
  const staticRoutes = [
    { path: "/", lastModified: buildTimestamp },
    { path: "/about", lastModified: buildTimestamp },
    { path: "/projects", lastModified: buildTimestamp },
    { path: "/blog", lastModified: buildTimestamp },
    { path: "/resume", lastModified: buildTimestamp },
    { path: "/contact", lastModified: buildTimestamp },
  ];
  const urls = [
    ...staticRoutes.map((route) => ({
      loc: absoluteUrl(route.path),
      lastModified: route.lastModified.toISOString(),
    })),
    ...posts
      .filter((post) => post.published !== false)
      .map((post) => ({
        loc: absoluteUrl(`/blog/${post.slug}`),
        lastModified: new Date(String(post.date)).toISOString(),
      })),
    ...projects.map((project) => ({
      loc: absoluteUrl(`/projects/${project.slug}`),
      lastModified: new Date(String(project.date)).toISOString(),
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${escapeXml(entry.lastModified)}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>`;
}

function createRobotsTxt() {
  return `User-Agent: *
Allow: /

Sitemap: ${absoluteUrl("/sitemap.xml")}
Host: ${siteUrl}
`;
}

async function writeIfChanged(filePath, contents) {
  let current = null;

  try {
    current = await fs.readFile(filePath, "utf8");
  } catch {
    current = null;
  }

  if (current === contents) {
    return;
  }

  await fs.writeFile(filePath, contents, "utf8");
}

async function main() {
  const [posts, projects] = await Promise.all([readCollection(blogDir), readCollection(projectsDir)]);
  const rssXml = createRssXml(posts);

  await fs.mkdir(publicDir, { recursive: true });
  await Promise.all([
    writeIfChanged(path.join(publicDir, "rss.xml"), rssXml),
    writeIfChanged(path.join(publicDir, "feed.xml"), rssXml),
    writeIfChanged(path.join(publicDir, "sitemap.xml"), createSitemapXml(posts, projects)),
    writeIfChanged(path.join(publicDir, "robots.txt"), createRobotsTxt()),
  ]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
