import type { MetadataRoute } from "next";
import { getSettings } from "../content/reader";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings();
  const base = settings.siteUrl.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/keystatic", "/api/keystatic"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
