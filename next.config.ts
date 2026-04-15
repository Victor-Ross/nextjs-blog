import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Match your local dev port (e.g., 3000)
        pathname: "/**", // Allows all image paths under this host
      },
    ],
  },
};

module.exports = nextConfig;
