import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    viewTransition: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default nextConfig;
