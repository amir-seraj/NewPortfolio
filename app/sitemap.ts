import type { MetadataRoute } from "next";
import allprojects from "../lib/DataProjects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://amirseraj.ir";
  return [
    { url: base },
    { url: `${base}/projects` },
    ...allprojects.map((p: any) => ({ url: `${base}/projects/${p.slug}` })),
  ];
}
