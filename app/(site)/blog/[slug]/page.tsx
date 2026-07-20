import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer, Nav, PrismHighlight } from "@components/common";
import { Container } from "@components/ui";
import {
  ArticleProgress,
  ArticleShare,
} from "../../../../components/blog/ArticleChrome";
import { MarkdocContent } from "../../../../components/content/MarkdocContent";
import {
  getPost,
  getPublishedPosts,
  getSettings,
} from "../../../../content/reader";

type Params = { slug: string };

export const revalidate = 60;

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const settings = await getSettings();
  const url = `${settings.siteUrl}/blog/${slug}`;
  const og = post.seo.ogImage ?? post.coverImage ?? undefined;
  return {
    title: post.seo.metaTitle || post.title,
    description: post.seo.metaDescription || post.excerpt || undefined,
    alternates: { canonical: url },
    openGraph: { url, type: "article", images: og ? [og] : undefined },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [post, settings, posts] = await Promise.all([
    getPost(slug),
    getSettings(),
    getPublishedPosts(),
  ]);
  if (!post) notFound();

  const index = posts.findIndex((item) => item.slug === slug);
  const newer = index > 0 ? posts[index - 1] : null;
  const older = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;
  const publishedAt = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const url = `${settings.siteUrl}/blog/${slug}`;

  return (
    <main id="top" className="bg-[#f4f1eb] text-slate-950 dark:bg-[#202020] dark:text-white">
      <ArticleProgress />
      <Nav
        className="fixed border-b border-slate-300/70 bg-[#f4f1eb]/90 text-slate-950 backdrop-blur dark:border-white/10 dark:bg-[#202020]/90 dark:text-white"
        email={settings.email}
      />
      <PrismHighlight trigger={slug} />

      <header className="relative overflow-hidden bg-[#1d1d1d] text-white">
        <span
          aria-hidden="true"
          className="absolute -bottom-[0.2em] -right-[0.02em] select-none font-heading text-[clamp(13rem,36vw,34rem)] font-bold leading-none tracking-[-0.1em] text-white/[0.025]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <Container className="relative max-w-[1320px] pb-24 pt-32 md:pb-32 md:pt-40">
          <Link
            href="/blog"
            className="inline-flex min-h-[44px] items-center font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300 transition-colors hover:text-mango-300"
          >
            ← All field notes
          </Link>
          <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-mango-300">
                Field note {String(index + 1).padStart(2, "0")} / {String(posts.length).padStart(2, "0")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {publishedAt}<br />{post.readingTime} min read
              </p>
            </div>
            <div className="md:col-span-9 lg:col-span-8">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="border border-white/20 px-3 py-1.5 font-heading text-[9px] font-bold uppercase tracking-[0.14em] text-slate-300"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              <h1 className="mt-6 max-w-[18ch] text-balance font-heading text-[clamp(2.8rem,7vw,6.8rem)] font-bold leading-[0.96] tracking-[-0.045em]">
                {post.title}
              </h1>
              <p className="mt-7 max-w-[60ch] text-base leading-relaxed text-slate-300 md:text-xl md:leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </div>
        </Container>
      </header>

      {post.coverImage && (
        <Container className="relative z-[1] max-w-[1320px]">
          <figure className="-mt-14 md:-mt-20">
            <div className="relative aspect-[16/9] overflow-hidden border border-slate-300 bg-[#e9e5dd] shadow-[0_30px_70px_-50px_rgba(15,23,42,0.7)] dark:border-white/15 dark:bg-[#292929]">
              <Image
                src={post.coverImage}
                alt={post.coverAlt || post.title}
                fill
                priority
                sizes="(min-width: 1360px) 1280px, calc(100vw - 40px)"
                className="object-cover"
              />
            </div>
          </figure>
        </Container>
      )}

      <Container className="max-w-[1160px] py-20 md:py-28 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-[190px_minmax(0,760px)] lg:justify-between lg:gap-20">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-mango-700 dark:text-mango-300">
              Filed under
            </p>
            <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:items-start">
              {post.tags.map((tag) => (
                <li key={tag.id}>
                  <Link
                    href={`/blog?tag=${tag.slug}`}
                    className="inline-flex rounded-full border border-slate-300 px-3 py-1.5 text-xs text-slate-700 transition-colors hover:border-mango-600 hover:text-mango-700 dark:border-white/20 dark:text-slate-300 dark:hover:border-mango-300 dark:hover:text-mango-300"
                  >
                    {tag.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-slate-300 pt-6 dark:border-white/15">
              <ArticleShare url={url} title={post.title} />
            </div>
          </aside>

          <article className="blog-article prose prose-lg max-w-none prose-slate dark:prose-invert">
            <MarkdocContent node={post.body} />
          </article>
        </div>
      </Container>

      <Container className="max-w-[1160px] pb-20 md:pb-28">
        <p className="mb-5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Keep following the thread
        </p>
        <nav aria-label="More field notes" className="grid border-y border-slate-300 sm:grid-cols-2 dark:border-white/15">
          {older ? (
            <Link
              href={`/blog/${older.slug}`}
              className="group flex min-h-40 flex-col justify-between border-b border-slate-300 p-6 hover:bg-white sm:border-b-0 sm:border-r dark:border-white/15 dark:hover:bg-white/[0.04]"
            >
              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">← Older note</span>
              <span className="mt-7 font-heading text-xl font-bold leading-tight group-hover:text-mango-700 dark:group-hover:text-mango-300">{older.title}</span>
            </Link>
          ) : <span className="hidden sm:block" aria-hidden="true" />}
          {newer ? (
            <Link
              href={`/blog/${newer.slug}`}
              className="group flex min-h-40 flex-col items-end justify-between p-6 text-right hover:bg-white dark:hover:bg-white/[0.04]"
            >
              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Newer note →</span>
              <span className="mt-7 font-heading text-xl font-bold leading-tight group-hover:text-mango-700 dark:group-hover:text-mango-300">{newer.title}</span>
            </Link>
          ) : <span className="hidden sm:block" aria-hidden="true" />}
        </nav>
      </Container>

      <section className="bg-mango-300 text-mango-950">
        <Container className="flex max-w-[1320px] flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between md:py-20">
          <div>
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em]">Continue the conversation</p>
            <h2 className="mt-4 max-w-[18ch] font-heading text-3xl font-bold leading-tight tracking-tight md:text-5xl">A thought worth challenging?</h2>
          </div>
          <a href={`mailto:${settings.email}`} className="inline-flex min-h-[44px] w-fit items-center border-b-2 border-mango-950 font-heading text-xs font-bold uppercase tracking-[0.14em] transition-transform hover:translate-x-1">Write to me →</a>
        </Container>
      </section>

      <Footer email={settings.email} />
    </main>
  );
}
