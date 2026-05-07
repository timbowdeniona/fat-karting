import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Explicitly set the Turbopack root to ignore the home-level package-lock.json
  // @ts-ignore - Turbopack config
  turbopack: {
    root: "/home/timbowden/dev/fat-karting",
  },
};

export default nextConfig;
