import type { Metadata } from "next";

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export const socialLinks = [
  {
    href: "https://github.com/shaeelafsar",
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/shaeel-afsar/",
    label: "LinkedIn",
  },
  {
    href: "mailto:afsarshaeel@gmail.com",
    label: "Email",
  },
] as const;

export const siteConfig = {
  name: "Shaeel Afsar",
  author: "Shaeel Afsar",
  authorTitle: "Lead Software Engineer",
  description:
    "Personal professional website, portfolio, and resume for Shaeel Afsar — Lead Software Engineer based in Chicago.",
  tagline: "Bridging technical excellence with business impact.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shaeelafsar.github.io",
  navigation: navigationLinks,
  socials: socialLinks,
  sameAs: socialLinks.filter((link) => link.href.startsWith("http")).map((link) => link.href),
  twitterHandle: undefined,
} as const;

type CreateMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  section?: string;
  tags?: string[];
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = "/og/default.svg",
  type = "website",
  publishedTime,
  section,
  tags,
}: CreateMetadataOptions = {}): Metadata {
  const metadataTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const images = [
    {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: metadataTitle,
    },
  ];
  const openGraph =
    type === "article"
      ? {
          title: metadataTitle,
          description,
          url: canonicalUrl,
          siteName: siteConfig.name,
          type: "article" as const,
          images,
          authors: [siteConfig.author],
          publishedTime,
          section,
          tags,
        }
      : {
          title: metadataTitle,
          description,
          url: canonicalUrl,
          siteName: siteConfig.name,
          type: "website" as const,
          images,
        };

  return {
    metadataBase: new URL(siteConfig.url),
    title: metadataTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    authors: [{ name: siteConfig.author }],
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description,
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
      images: [imageUrl],
    },
  };
}
