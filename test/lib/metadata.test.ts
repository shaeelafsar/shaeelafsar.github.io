import { describe, expect, it } from "vitest";
import { createMetadata, siteConfig } from "@/lib/metadata";

describe("metadata", () => {
  it("exposes the required site config fields", () => {
    expect(siteConfig.name).toBeTruthy();
    expect(siteConfig.description).toBeTruthy();
    expect(siteConfig.url).toBe("https://shaeelafsar.com");
    expect(siteConfig.author).toBe("Shaeel Afsar");
  });

  it("creates metadata with the expected defaults and overrides", () => {
    const metadata = createMetadata({
      title: "Projects",
      description: "Selected case studies and writing.",
      path: "/projects",
      image: "/og/projects.png",
    });

    expect(metadata.metadataBase?.toString()).toBe("https://shaeelafsar.com/");
    expect(metadata.title).toBe("Projects | Shaeel Afsar");
    expect(metadata.description).toBe("Selected case studies and writing.");
    expect(metadata.alternates?.canonical).toBe("https://shaeelafsar.com/projects");
    expect(metadata.authors).toEqual([{ name: "Shaeel Afsar" }]);
    expect(metadata.openGraph).toMatchObject({
      title: "Projects | Shaeel Afsar",
      description: "Selected case studies and writing.",
      url: "https://shaeelafsar.com/projects",
      siteName: "Shaeel Afsar",
      type: "website",
    });
    expect(metadata.openGraph?.images).toEqual([
      {
        url: "https://shaeelafsar.com/og/projects.png",
        width: 1200,
        height: 630,
        alt: "Projects | Shaeel Afsar",
      },
    ]);
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Projects | Shaeel Afsar",
      description: "Selected case studies and writing.",
      images: ["https://shaeelafsar.com/og/projects.png"],
    });
  });
});
