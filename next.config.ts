import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'image.onoffice.de',
      },
      {
        protocol: 'https',
        hostname: 'smart.onoffice.de',
      },
    ],
    qualities: [75, 90],
    formats: ['image/webp'],
  },
};

export default nextConfig;
