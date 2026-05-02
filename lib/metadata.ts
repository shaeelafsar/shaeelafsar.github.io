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
  description:
    "Personal professional website, portfolio, blog, and resume for Shaeel Afsar.",
  url: "https://shaeelafsar.com",
  author: "Shaeel Afsar",
  navigation: navigationLinks,
  socials: socialLinks,
} as const;

type CreateMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = "/og/default.svg",
}: CreateMetadataOptions = {}): Metadata {
  const metadataTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const canonicalUrl = new URL(path, siteConfig.url).toString();
  const imageUrl = new URL(image, siteConfig.url).toString();

  return {
    metadataBase: new URL(siteConfig.url),
    title: metadataTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    authors: [{ name: siteConfig.author }],
    openGraph: {
      title: metadataTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: metadataTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description,
      images: [imageUrl],
    },
  };
}
