import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "www.pexels.com", // your new domain
      },
    ],
  },
};

export default nextConfig;
