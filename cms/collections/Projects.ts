import type { CollectionConfig } from "payload";
import { revalidateProject } from "../hooks/revalidate";

export const Projects: CollectionConfig = {
  slug: "projects",
  access: { read: () => true },
  admin: { useAsTitle: "title", defaultColumns: ["title", "publishedAt"] },
  hooks: { afterChange: [revalidateProject], afterDelete: [revalidateProject] },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true, admin: { position: "sidebar" } },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text", required: true }],
    },
    { name: "description", type: "textarea", required: true },
    {
      name: "body",
      type: "textarea",
      required: true,
      admin: {
        rows: 30,
        description: "Raw HTML with Tailwind classes. New class names require re-running the class extraction (happens automatically on deploy).",
      },
    },
    { name: "coverImage", type: "text", required: true, admin: { description: "Path under /public, e.g. /images/…" } },
    { name: "socialImage", type: "text", required: true },
    { name: "publishedAt", type: "text", required: true, admin: { position: "sidebar", description: "Kept as original string for explorer parity" } },
    { name: "readTime", type: "text", required: true, admin: { position: "sidebar" } },
  ],
};
