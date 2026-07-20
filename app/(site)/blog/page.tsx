import type { Metadata } from "next";
import Link from "next/link";

import { Footer, Nav } from "@components/common";
import { Container } from "@components/ui";
import { PostCard } from "../../../components/blog/PostCard";
import {
  getPublishedPosts,
  getSettings,
  getUsedTags,
} from "../../../content/reader";

export const metadata: Metadata = {
  title: "Blog | Amir Seraj",
  description:
    "Notes on affective computing, HCI research, and building interactive systems.",
  alternates: { canonical: "/blog" },
};

export const revalidate = 60;

const pillBase =
  "inline-flex min-h-[42px] items-center rounded-full border px-4 font-heading text-[10px] font-bold uppercase tracking-[0.12em] transition-colors";
const pillActive =
  "border-slate-950 bg-slate-950 text-white dark:border-mango-300 dark:bg-mango-300 dark:text-mango-950";
const pillIdle =
  "border-slate-300 text-slate-600 hover:border-slate-950 hover:text-slate-950 dark:border-white/15 dark:text-slate-300 dark:hover:border-mango-300 dark:hover:text-mango-300";

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
  const activeTag = tag ? allTags.find((item) => item.slug === tag) : undefined;
  const entryLabel = `${posts.length} ${posts.length === 1 ? "note" : "notes"}`;

  return (
    <main id="top" className="bg-[#f4f1eb] text-slate-950 dark:bg-[#202020] dark:text-white">
      <Nav
        className="fixed border-b border-slate-300/70 bg-[#f4f1eb]/90 text-slate-950 backdrop-blur dark:border-white/10 dark:bg-[#202020]/90 dark:text-white"
        email={settings.email}
      />

      <header className="relative overflow-hidden bg-[#1d1d1d] text-white">
        <span
          aria-hidden="true"
          className="absolute -bottom-[0.22em] -right-[0.04em] select-none font-heading text-[clamp(15rem,40vw,38rem)] font-bold leading-none tracking-[-0.1em] text-white/[0.025]"
        >
          N
        </span>
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-[14%] hidden w-px bg-white/[0.06] md:block"
        />
        <Container className="relative max-w-[1500px] pb-24 pt-36 md:pb-32 md:pt-44">
          <div className="max-w-5xl">
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.22em] text-mango-300">
              Field notes / {entryLabel}
            </p>
            <h1 className="mt-6 max-w-[11ch] text-balance font-heading text-[clamp(3.5rem,9vw,8.5rem)] font-bold leading-[0.92] tracking-[-0.055em]">
              Ideas still in motion.
            </h1>
            <p className="mt-8 max-w-[58ch] text-base leading-relaxed text-slate-300 md:text-xl md:leading-relaxed">
              Notes from the space between research questions and working
              prototypes—what changed, what failed, and what remains open.
            </p>
          </div>
        </Container>
      </header>

      <Container className="max-w-[1500px] pb-24 md:pb-32">
        <div className="relative -mt-7 mb-12 border border-slate-300 bg-white px-5 py-4 shadow-[0_20px_60px_-42px_rgba(15,23,42,0.45)] md:flex md:items-center md:justify-between md:px-7 dark:border-white/15 dark:bg-[#292929]">
          <p className="mb-3 font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 md:mb-0 dark:text-slate-400">
            Filter the notebook
          </p>
          <nav aria-label="Filter posts by tag" className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              aria-current={!tag ? "page" : undefined}
              className={`${pillBase} ${!tag ? pillActive : pillIdle}`}
            >
              All
            </Link>
            {allTags.map((item) => (
              <Link
                key={item.slug}
                href={`/blog?tag=${item.slug}`}
                aria-current={tag === item.slug ? "page" : undefined}
                className={`${pillBase} ${
                  tag === item.slug ? pillActive : pillIdle
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {posts.length > 0 ? (
          <div>
            <PostCard post={posts[0]} featured index={0} />
            {posts.length > 1 && (
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {posts.slice(1).map((post, index) => (
                  <PostCard key={post.id} post={post} index={index + 1} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="border border-slate-300 bg-white px-6 py-16 text-center dark:border-white/15 dark:bg-[#292929]">
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-mango-700 dark:text-mango-300">
              No signal yet
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold">
              {tag
                ? `Nothing filed under “${activeTag?.name ?? tag}” yet.`
                : "The first field note is still taking shape."}
            </h2>
            <Link
              href={tag ? "/blog" : "/projects"}
              className="mt-7 inline-flex min-h-[44px] items-center bg-slate-950 px-6 font-heading text-xs font-bold uppercase tracking-[0.14em] text-white dark:bg-mango-300 dark:text-mango-950"
            >
              {tag ? "Show all notes" : "See the projects"} →
            </Link>
          </div>
        )}
      </Container>

      <section className="bg-mango-300 text-mango-950">
        <Container className="flex max-w-[1500px] flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between md:py-20">
          <div>
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em]">
              Beyond the notebook
            </p>
            <h2 className="mt-4 max-w-[18ch] font-heading text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              The ideas have working evidence.
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex min-h-[44px] w-fit items-center border-b-2 border-mango-950 font-heading text-xs font-bold uppercase tracking-[0.14em] transition-transform hover:translate-x-1"
          >
            Explore the projects →
          </Link>
        </Container>
      </section>

      <Footer email={settings.email} />
    </main>
  );
}
