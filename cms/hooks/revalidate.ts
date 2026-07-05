import { revalidatePath } from "next/cache";

// revalidatePath() throws when called outside a Next.js request scope (e.g.
// Payload Local API invocations from CLI scripts — the seed script hits this
// on every afterChange hook). Swallow that specific failure so hooks keep
// working identically inside real requests but don't crash CLI/script runs.
const safeRevalidatePath: typeof revalidatePath = (...args: any[]) => {
  try {
    // @ts-ignore — forwarding varargs to the real revalidatePath signature
    return revalidatePath(...args);
  } catch (err) {
    console.warn(
      "[revalidate] skipped — not in a Next.js request scope:",
      (err as Error)?.message ?? err
    );
  }
};

export const revalidateProject = ({ doc }: any) => {
  safeRevalidatePath("/");
  safeRevalidatePath("/projects");
  safeRevalidatePath(`/projects/${doc.slug}`);
  return doc;
};

export const revalidatePost = ({ doc }: any) => {
  safeRevalidatePath("/blog");
  if (doc._status === "published") safeRevalidatePath(`/blog/${doc.slug}`);
  return doc;
};

export const revalidateHome = ({ doc }: any) => {
  safeRevalidatePath("/");
  return doc;
};

export const revalidateEverything = ({ doc }: any) => {
  safeRevalidatePath("/", "layout");
  return doc;
};
