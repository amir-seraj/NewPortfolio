/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com', 'media.dev.to', 'opengraph.githubassets.com'],
  },
  experimental: {
    scrollRestoration: false,
  },
};

module.exports = nextConfig;