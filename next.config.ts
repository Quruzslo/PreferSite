import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/.well-known/ai-catalog.json",
        destination: "/.well-known/ard.json",
      },
    ];
  },
};

export default nextConfig;
