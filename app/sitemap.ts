import type { MetadataRoute } from "next";
import { getProjects } from "../cms/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://amirseraj.ir";
  const allprojects = await getProjects();
  return [
    { url: base },
    { url: `${base}/projects` },
    ...allprojects.map((p) => ({ url: `${base}/projects/${p.slug}` })),
  ];
}
