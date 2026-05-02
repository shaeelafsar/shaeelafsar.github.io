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
    href: "https://www.linkedin.com/in/shaeelafsar",
    label: "LinkedIn",
  },
  {
    href: "https://x.com/shaeelafsar",
    label: "Twitter/X",
  },
  {
    href: "mailto:hello@shaeelafsar.com",
    label: "Email",
  },
] as const;

export const siteConfig = {
  name: "Shaeel Afsar",
  author: "Shaeel Afsar",
  authorTitle: "Frontend Engineer & Product-Focused Software Developer",
  description:
    "Personal professional website, portfolio, blog, and resume for Shaeel Afsar.",
  tagline: "Thoughtful interfaces, polished frontends, and product clarity.",
  url: "https://shaeelafsar.com",
  navigation: navigationLinks,
  socials: socialLinks,
  sameAs: socialLinks.filter((link) => link.href.startsWith("http")).map((link) => link.href),
  twitterHandle: "@shaeelafsar",
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
  image = "/opengraph-image",
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
