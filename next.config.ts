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
        hostname: 'res.cloudinary.com',
      },
    ],
    qualities: [75, 90],
    formats: ['image/webp'],
  },
};

export default nextConfig;
