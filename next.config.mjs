/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    domains: ['static.vecteezy.com'],
  },
};

export default nextConfig;
