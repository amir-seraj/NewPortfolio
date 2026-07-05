import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@components/common";
import { Container } from "@components/ui";
import { PostCard } from "../../../components/blog/PostCard";
import { getPublishedPosts, getUsedTags } from "../../../cms/queries";

export const metadata: Metadata = {
  title: "Blog | Amir Seraj",
  description: "Notes on affective computing, HCI research, and building interactive systems.",
  alternates: { canonical: "https://amirseraj.ir/blog" },
};

export const revalidate = 60;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const [posts, allTags] = await Promise.all([getPublishedPosts(tag), getUsedTags()]);

  return (
    <main>
      <Nav className="fixed py-3 bg-white bg-opacity-75 backdrop-blur dark:bg-[#323232] dark:bg-opacity-90" />
      <Container className="pt-32 pb-20">
        <h1 className="font-heading text-4xl font-bold text-slate-900 dark:text-slate-100 md:text-5xl">Blog</h1>
        {allTags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/blog" className={!tag ? "font-bold text-teal-700 dark:text-teal-300" : "text-slate-600 dark:text-slate-300"}>All</Link>
            {allTags.map((t) => (
              <Link key={t.slug} href={`/blog?tag=${t.slug}`} className={tag === t.slug ? "font-bold text-teal-700 dark:text-teal-300" : "text-slate-600 dark:text-slate-300"}>
                {t.name}
              </Link>
            ))}
          </div>
        )}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
        {posts.length === 0 && <p className="mt-10 text-slate-600 dark:text-slate-300">Nothing here yet.</p>}
      </Container>
    </main>
  );
}
