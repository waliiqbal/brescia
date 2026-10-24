import type { NextConfig } from "next";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

const nextConfig: NextConfig = {
  // Lets a second dev server (for tests) run beside the normal one.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    // Photos uploaded from the admin panel are served from our Cloudinary folder.
    remotePatterns: cloudName
      ? [
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
            pathname: `/${cloudName}/**`,
          },
        ]
      : [],
  },
};

export default nextConfig;
