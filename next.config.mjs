/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["gsap", "ogl"],
  },
};

export default nextConfig;
