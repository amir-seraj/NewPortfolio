import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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

export default withPayload(nextConfig);
