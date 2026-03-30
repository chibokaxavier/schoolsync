import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "www.pexels.com",
      },
      {
        hostname: "api.dicebear.com",
      },
    ],
  },
};

export default nextConfig;
