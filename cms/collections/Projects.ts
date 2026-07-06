import type { CollectionConfig } from "payload";
import { revalidateProject } from "../hooks/revalidate";
import { projectLayoutBlocks } from "../blocks/ProjectLayoutBlocks";

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
      name: "layout",
      type: "blocks",
      blocks: projectLayoutBlocks,
      admin: {
        description: "Visual case-study editor. When this has blocks, it renders instead of the legacy HTML body below.",
      },
    },
    {
      name: "body",
      type: "code",
      required: false,
      admin: {
        language: "html",
        description: "Legacy HTML (fallback — used only when Layout is empty). Raw HTML with Tailwind classes. New class names require re-running the class extraction — this happens automatically at deploy time (see scripts/extract-body-classes.ts).",
      },
    },
    { name: "coverImage", type: "text", required: true, admin: { description: "Path under /public, e.g. /images/…" } },
    { name: "socialImage", type: "text", required: true },
    { name: "publishedAt", type: "text", required: true, admin: { position: "sidebar", description: "Kept as original string for explorer parity" } },
    { name: "readTime", type: "text", required: true, admin: { position: "sidebar" } },
  ],
};
