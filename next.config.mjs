/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    RAINBOWKIT_PROJECT_ID: process.env.RAINBOWKIT_PROJECT_ID,
    R2_BUCKET_URL: process.env.R2_BUCKET_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-7337cfa6ce8741dea70792ea29aa86e7.r2.dev",
      },
    ],
  },
};

export default nextConfig;
