/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'media.dev.to'],
  },
  experimental: {
    scrollRestoration: false,
  },
};

module.exports = nextConfig;