/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keystatic discovers repository content at runtime. Include those files in
  // every server route bundle so hosts such as Netlify can read them after the
  // build workspace has been replaced by isolated functions.
  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
  },
  images: {
    qualities: [75, 100],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
      // GitHub-synced projects use their repo's OG card as coverImage
      // (e.g. MetaGoogler). Without this the projects timeline threw an
      // uncaught "hostname not configured" error at render.
      { protocol: "https", hostname: "opengraph.githubassets.com" },
    ],
  },
};

export default nextConfig;
