import type { MetadataRoute } from "next";
import { getProjects, getPublishedPosts } from "../cms/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://amirseraj.ir";
  const allprojects = await getProjects();
  const posts = await getPublishedPosts();
  return [
    { url: base },
    { url: `${base}/projects` },
    ...allprojects.map((p) => ({ url: `${base}/projects/${p.slug}` })),
    { url: `${base}/blog` },
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}` })),
  ];
}
