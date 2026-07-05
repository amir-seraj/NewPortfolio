import type { CollectionConfig } from "payload";
import { lexicalEditor, BlocksFeature, CodeBlock } from "@payloadcms/richtext-lexical";
import { revalidatePost } from "../hooks/revalidate";

const WORDS_PER_MINUTE = 200;

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    // Public reads only see published posts; authenticated (admin) reads see everything,
    // including drafts — Payload's default `find` does not filter `_status` for you when
    // drafts are enabled, so this is required to avoid leaking drafts via unauthenticated
    // GET /api/posts. See https://payloadcms.com/docs/versions/drafts#access-control.
    read: ({ req: { user } }) => {
      if (user) return true;
      return { _status: { equals: "published" } };
    },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "_status", "publishedAt", "updatedAt"],
  },
  versions: { drafts: true },
  hooks: {
    afterChange: [revalidatePost],
    beforeChange: [
      ({ data }) => {
        // reading time from Lexical body text length
        const text = JSON.stringify(data?.body ?? "");
        const words = (text.match(/\b\w+\b/g) ?? []).length;
        data.readingTime = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
        return data;
      },
    ],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true, admin: { position: "sidebar" } },
    { name: "publishedAt", type: "date", admin: { position: "sidebar" } },
    { name: "coverImage", type: "upload", relationTo: "media", admin: { position: "sidebar" } },
    { name: "tags", type: "relationship", relationTo: "tags", hasMany: true, admin: { position: "sidebar" } },
    { name: "excerpt", type: "textarea" },
    {
      name: "body",
      type: "richText",
      required: true,
      // Default Lexical feature set has no code-BLOCK (only inline `code` formatting).
      // Add the premade CodeBlock via BlocksFeature so posts can embed fenced code with
      // a language, rendered later as <pre><code class="language-…">.
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({ blocks: [CodeBlock({})] }),
        ],
      }),
    },
    { name: "readingTime", type: "number", admin: { readOnly: true, position: "sidebar" } },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "metaTitle", type: "text" },
        { name: "metaDescription", type: "textarea" },
        { name: "ogImage", type: "upload", relationTo: "media" },
      ],
    },
  ],
};
