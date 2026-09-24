import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Allow Unsplash images to be optimized by Next.js
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    // Serve images in modern formats for best performance
    formats: ["image/avif", "image/webp"],
    qualities: [25, 50, 75, 85, 90, 100],
  },
};

export default nextConfig;
