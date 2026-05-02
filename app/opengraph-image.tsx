import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og";
import { siteConfig } from "@/lib/metadata";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Portfolio · Writing · Case Studies",
    title: siteConfig.name,
    description: `${siteConfig.author} — ${siteConfig.tagline}`,
    meta: ["Frontend engineer", "Next.js · React · TypeScript"],
    badges: ["Projects", "Blog", "Resume"],
  });
}
