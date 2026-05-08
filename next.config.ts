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
  // Remove hardcoded Turbopack root to allow it to be detected automatically in CI/CD environments.

};

export default nextConfig;
