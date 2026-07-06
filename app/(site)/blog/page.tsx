import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@components/common";
import { Container } from "@components/ui";
import { PostCard } from "../../../components/blog/PostCard";
import { getPublishedPosts, getSettings, getUsedTags } from "../../../cms/queries";

export const metadata: Metadata = {
  title: "Blog | Amir Seraj",
  description: "Notes on affective computing, HCI research, and building interactive systems.",
  alternates: { canonical: "https://amirseraj.ir/blog" },
};

export const revalidate = 60;

// 44px-tall pill filters; the active tag is filled mango and announced via
// aria-current. All pairings AA (scripts/check-contrast.mjs: mango-700/white,
// mango-950/mango-300).
const pillBase =
  "inline-flex min-h-[44px] items-center rounded-full border px-4 font-heading text-xs font-semibold uppercase tracking-wide transition-colors";
const pillActive =
  "border-mango-700 bg-mango-700 text-white dark:border-mango-300 dark:bg-mango-300 dark:text-mango-950";
const pillIdle =
  "border-slate-300 text-slate-700 hover:border-mango-600 hover:text-mango-700 dark:border-slate-600 dark:text-slate-300 dark:hover:border-mango-300 dark:hover:text-mango-300";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const [posts, allTags, settings] = await Promise.all([
    getPublishedPosts(tag),
    getUsedTags(),
    getSettings(),
  ]);
  const activeTag = tag ? allTags.find((t) => t.slug === tag) : undefined;

  return (
    <main>
      <Nav
        className="fixed py-3 bg-white bg-opacity-75 backdrop-blur dark:bg-[#323232] dark:bg-opacity-90"
        email={settings.email}
      />
      <Container className="pt-32 pb-20">
        <h1 className="font-heading text-4xl font-bold text-slate-900 dark:text-slate-100 md:text-5xl">
          Blog
        </h1>
        <p className="mt-3 max-w-[58ch] text-slate-600 dark:text-slate-300">
          Notes on affective computing, HCI research, and building interactive
          systems.
        </p>
        {allTags.length > 0 && (
          <nav aria-label="Filter posts by tag" className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/blog"
              aria-current={!tag ? "true" : undefined}
              className={`${pillBase} ${!tag ? pillActive : pillIdle}`}
            >
              All
            </Link>
            {allTags.map((t) => (
              <Link
                key={t.slug}
                href={`/blog?tag=${t.slug}`}
                aria-current={tag === t.slug ? "true" : undefined}
                className={`${pillBase} ${tag === t.slug ? pillActive : pillIdle}`}
              >
                {t.name}
              </Link>
            ))}
          </nav>
        )}
        {posts.length > 0 ? (
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : tag ? (
          // Filter produced nothing: name the tag, offer the way back.
          <div className="mt-14">
            <p className="text-slate-900 dark:text-slate-100">
              No posts tagged &ldquo;{activeTag?.name ?? tag}&rdquo; yet.
            </p>
            <Link
              href="/blog"
              className="mt-4 inline-flex min-h-[44px] items-center text-mango-700 underline underline-offset-4 hover:text-mango-600 dark:text-mango-300 dark:hover:text-mango-200"
            >
              Show all posts
            </Link>
          </div>
        ) : (
          // Nothing published at all: point at the shipped evidence instead.
          <div className="mt-14">
            <p className="text-slate-900 dark:text-slate-100">
              Nothing published here yet. The receipts live in the projects.
            </p>
            <Link
              href="/projects"
              className="mt-5 inline-flex min-h-[44px] items-center bg-mango-300 px-6 font-heading text-sm font-bold uppercase tracking-wider text-mango-950 transition-colors hover:bg-mango-200"
            >
              See the evidence
            </Link>
          </div>
        )}
      </Container>
    </main>
  );
}
