import { revalidatePath } from "next/cache";

export const revalidateProject = ({ doc }: any) => {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${doc.slug}`);
  return doc;
};

export const revalidatePost = ({ doc }: any) => {
  revalidatePath("/blog");
  if (doc._status === "published") revalidatePath(`/blog/${doc.slug}`);
  return doc;
};

export const revalidateHome = ({ doc }: any) => {
  revalidatePath("/");
  return doc;
};

export const revalidateEverything = ({ doc }: any) => {
  revalidatePath("/", "layout");
  return doc;
};
