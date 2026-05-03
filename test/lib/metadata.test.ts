import { describe, expect, it } from "vitest";
import { createMetadata, siteConfig } from "@/lib/metadata";

describe("metadata", () => {
  it("exposes the required site config fields", () => {
    expect(siteConfig.name).toBeTruthy();
    expect(siteConfig.description).toBeTruthy();
    expect(siteConfig.url).toBe("https://shaeelafsar.github.io");
    expect(siteConfig.author).toBe("Shaeel Afsar");
  });

  it("creates website metadata with the expected defaults and overrides", () => {
    const metadata = createMetadata({
      title: "Projects",
      description: "Selected case studies and writing.",
      path: "/projects",
      image: "/images/projects/personal-website-foundation.svg",
    });

    expect(metadata.metadataBase?.toString()).toBe("https://shaeelafsar.github.io/");
    expect(metadata.title).toBe("Projects | Shaeel Afsar");
    expect(metadata.description).toBe("Selected case studies and writing.");
    expect(metadata.alternates?.canonical).toBe("https://shaeelafsar.github.io/projects");
    expect(metadata.authors).toEqual([{ name: "Shaeel Afsar" }]);
    expect(metadata.openGraph).toMatchObject({
      title: "Projects | Shaeel Afsar",
      description: "Selected case studies and writing.",
      url: "https://shaeelafsar.github.io/projects",
      siteName: "Shaeel Afsar",
      type: "website",
    });
    expect(metadata.openGraph?.images).toEqual([
      {
        url: "https://shaeelafsar.github.io/images/projects/personal-website-foundation.svg",
        width: 1200,
        height: 630,
        alt: "Projects | Shaeel Afsar",
      },
    ]);
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Projects | Shaeel Afsar",
      description: "Selected case studies and writing.",
      creator: "@shaeelafsar",
      site: "@shaeelafsar",
      images: ["https://shaeelafsar.github.io/images/projects/personal-website-foundation.svg"],
    });
  });

  it("creates article metadata for dynamic content", () => {
    const metadata = createMetadata({
      title: "Shipping server components without losing the human feel",
      description: "A post on balancing performance and polish.",
      path: "/blog/shipping-server-components",
      image: "/images/blog/shipping-server-components.svg",
      type: "article",
      publishedTime: "2026-04-02T09:00:00-05:00",
      section: "Blog",
      tags: ["nextjs", "react"],
    });

    expect(metadata.openGraph).toMatchObject({
      type: "article",
      publishedTime: "2026-04-02T09:00:00-05:00",
      section: "Blog",
      tags: ["nextjs", "react"],
      authors: ["Shaeel Afsar"],
    });
  });
});
