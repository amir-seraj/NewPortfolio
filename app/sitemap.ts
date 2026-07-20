import type { MetadataRoute } from "next";
import { getProjects, getPublishedPosts, getSettings } from "../content/reader";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allprojects, posts, settings] = await Promise.all([
    getProjects(),
    getPublishedPosts(),
    getSettings(),
  ]);
  const base = settings.siteUrl.replace(/\/$/, "");
  return [
    { url: base },
    { url: `${base}/projects` },
    ...allprojects.map((p) => ({ url: `${base}/projects/${p.slug}` })),
    { url: `${base}/blog` },
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}` })),
  ];
}
