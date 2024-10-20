/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    RAINBOWKIT_PROJECT_ID: process.env.RAINBOWKIT_PROJECT_ID,
  },
};

export default nextConfig;
