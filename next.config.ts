import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/personal-website" : "",
  allowedDevOrigins: ["10.0.0.237"],
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
