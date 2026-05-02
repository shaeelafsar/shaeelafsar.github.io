import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default nextConfig;
