import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type {
  Post,
  Project as ProjectDoc,
  Home,
  Setting,
  Tag,
} from "../payload-types";

// Projects.tags is an array field (`{ tag: string }[]`) in the CMS schema,
// but every consuming component (Projects/Graph/Timeline explorer, Evidence,
// ProjectDetail) expects plain `tags: string[]` — matching the shape
// `lib/DataProjects.js` always had. Map here so components stay untouched.
export type Project = Omit<ProjectDoc, "tags"> & { tags: string[] };

async function payload() {
  return getPayload({ config });
}

const mapProjectTags = (docs: ProjectDoc[]): Project[] =>
  docs.map((d) => ({ ...d, tags: d.tags?.map((t) => t.tag) ?? [] }));

export async function getProjects(): Promise<Project[]> {
  const p = await payload();
  const { docs } = await p.find({
    collection: "projects",
    limit: 100,
    sort: "createdAt",
  });
  return mapProjectTags(docs);
}

// generateMetadata() and the page component both resolve the same slug for
// every statically generated project page — React.cache() dedupes that
// within a single render pass instead of hitting the DB twice per path.
export const getProject = cache(
  async (slug: string): Promise<Project | null> => {
    const p = await payload();
    const { docs } = await p.find({
      collection: "projects",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    return mapProjectTags(docs)[0] ?? null;
  }
);

export async function getPublishedPosts(tagSlug?: string): Promise<Post[]> {
  const p = await payload();
  const where: any = { _status: { equals: "published" } };
  if (tagSlug) where["tags.slug"] = { equals: tagSlug };
  const { docs } = await p.find({
    collection: "posts",
    where,
    sort: "-publishedAt",
    limit: 100,
  });
  return docs;
}

// Tags actually attached to a published post — used to build the /blog tag
// filter without ever offering a tag whose posts are all drafts. Dedupes by
// slug (a Map keyed on slug beats the brief's JSON.stringify-round-trip
// dedup and keeps the resolved Tag object shape throughout).
export async function getUsedTags(): Promise<Tag[]> {
  const posts = await getPublishedPosts();
  const bySlug = new Map<string, Tag>();
  for (const post of posts) {
    for (const t of post.tags ?? []) {
      if (typeof t === "object") bySlug.set(t.slug, t);
    }
  }
  return Array.from(bySlug.values());
}

// generateMetadata() and the page component both resolve the same slug for
// every statically generated post page — React.cache() dedupes that
// within a single render pass instead of hitting the DB twice per path.
export const getPost = cache(async (slug: string): Promise<Post | null> => {
  const p = await payload();
  const { docs } = await p.find({
    collection: "posts",
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }] },
    limit: 1,
  });
  return docs[0] ?? null;
});

export async function getHome(): Promise<Home> {
  const p = await payload();
  return p.findGlobal({ slug: "home" });
}

// layout.tsx's generateMetadata() and every page's render (each threads
// settings.email into Nav/Footer/etc — Task 11) resolve this same global
// within one request — React.cache() dedupes that instead of hitting the
// DB once per call site, same reasoning as getProject/getPost above.
export const getSettings = cache(async (): Promise<Setting> => {
  const p = await payload();
  return p.findGlobal({ slug: "settings" });
});
