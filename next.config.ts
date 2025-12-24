import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      { hostname: "i.ibb.co" },
      { hostname: "i.pravatar.cc" },
      { hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
