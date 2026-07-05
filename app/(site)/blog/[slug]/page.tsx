import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Nav, PrismHighlight } from "@components/common";
import { Container } from "@components/ui";
import { getPost, getPublishedPosts, getSettings } from "../../../../cms/queries";

type Params = { slug: string };

export const revalidate = 60;

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const settings = await getSettings();
  const url = `${settings.siteUrl}/blog/${slug}`;
  const og = typeof post.seo?.ogImage === "object" ? post.seo?.ogImage?.url : undefined;
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt || undefined,
    alternates: { canonical: url },
    openGraph: { url, type: "article", images: og ? [og] : undefined },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const cover = typeof post.coverImage === "object" ? post.coverImage : null;

  return (
    <main>
      <Nav className="fixed py-3 bg-white bg-opacity-75 backdrop-blur dark:bg-[#323232] dark:bg-opacity-90" />
      <PrismHighlight trigger={slug} />
      <Container className="pt-32 pb-20">
        <article className="prose prose-slate mx-auto dark:prose-invert lg:prose-lg">
          <h1 className="font-heading">{post.title}</h1>
          <p className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
            {post.readingTime ? ` · ${post.readingTime} min read` : null}
          </p>
          {cover?.url && (
            <Image src={cover.url} alt={cover.alt ?? post.title} width={1280} height={720} priority className="w-full" />
          )}
          <RichText data={post.body} />
        </article>
      </Container>
    </main>
  );
}
