import "server-only";

import { cache } from "react";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../keystatic.config";
import type { Home, Post, PostSummary, Project, Setting, Tag } from "./types";

const reader = createReader(process.cwd(), keystaticConfig);

const getAllTags = cache(async (): Promise<Tag[]> => {
  const entries = await reader.collections.tags.all();
  return entries.map(({ slug, entry }) => ({
    id: slug,
    slug,
    name: entry.name,
  }));
});

const getTagsBySlug = cache(async () => {
  const tags = await getAllTags();
  return new Map(tags.map((tag) => [tag.slug, tag]));
});

const toPostSummary = async (
  slug: string,
  entry: Awaited<ReturnType<typeof reader.collections.posts.readOrThrow>>
): Promise<PostSummary> => {
  const tagsBySlug = await getTagsBySlug();
  return {
    id: slug,
    slug,
    title: entry.title,
    status: entry.status,
    publishedAt: entry.publishedAt,
    coverImage: entry.coverImage,
    coverAlt: entry.coverAlt,
    tags: entry.tags
      .map((tagSlug) => tagsBySlug.get(tagSlug))
      .filter((tag): tag is Tag => Boolean(tag)),
    excerpt: entry.excerpt,
    readingTime: entry.readingTime,
    seo: {
      metaTitle: entry.seo.metaTitle,
      metaDescription: entry.seo.metaDescription,
      ogImage: entry.seo.ogImage,
    },
  };
};

export async function getPublishedPosts(
  tagSlug?: string
): Promise<PostSummary[]> {
  const entries = await reader.collections.posts.all();
  const posts = await Promise.all(
    entries
      .filter(({ entry }) => entry.status === "published")
      .filter(({ entry }) => !tagSlug || entry.tags.includes(tagSlug))
      .map(({ slug, entry }) => toPostSummary(slug, entry))
  );
  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getUsedTags(): Promise<Tag[]> {
  const posts = await getPublishedPosts();
  const used = new Map<string, Tag>();
  posts.forEach((post) => post.tags.forEach((tag) => used.set(tag.slug, tag)));
  return Array.from(used.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  const entry = await reader.collections.posts.read(slug);
  if (!entry || entry.status !== "published") return null;
  const [{ node }, summary] = await Promise.all([
    entry.body(),
    toPostSummary(slug, entry),
  ]);
  return { ...summary, body: node };
});

const toProject = (
  slug: string,
  entry: Awaited<ReturnType<typeof reader.collections.projects.readOrThrow>>
): Project => ({
  id: slug,
  slug,
  title: entry.title,
  shortTitle: entry.shortTitle,
  kind: entry.kind,
  description: entry.description,
  tags: [...entry.tags],
  featured: entry.featured,
  featuredOrder: entry.featuredOrder,
  publishedAt: entry.publishedAt,
  year: new Date(entry.publishedAt).getFullYear(),
  readTime: String(entry.readTime),
  coverImage: entry.coverImage,
  socialImage: entry.coverImage,
});

export async function getProjects(): Promise<Project[]> {
  const entries = await reader.collections.projects.all();
  return entries
    .map(({ slug, entry }) => toProject(slug, entry))
    .sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
}

export const getProject = cache(
  async (slug: string): Promise<Project | null> => {
    const entry = await reader.collections.projects.read(slug);
    if (!entry) return null;
    const { node } = await entry.body();
    return { ...toProject(slug, entry), body: node };
  }
);

export const getHome = cache(async (): Promise<Home> => {
  const home = await reader.singletons.home.read();
  if (!home) return {};
  return {
    hero: {
      lines: home.hero.lines.map((line) => ({ ...line })),
      ctaLabel: home.hero.ctaLabel,
      ctaHref: home.hero.ctaHref,
      strip: home.hero.strip.map((item) => ({ item })),
    },
    about: {
      heading: home.about.heading,
      paragraphs: home.about.paragraphs.map((text) => ({ text })),
      stats: home.about.stats.map((stat) => ({ ...stat })),
    },
    contact: { kicker: home.contactKicker },
  };
});

export const getSettings = cache(async (): Promise<Setting> => {
  const settings = await reader.singletons.settings.read();
  return {
    siteName: settings?.siteName ?? "Amir Seraj",
    siteUrl: settings?.siteUrl ?? "https://amirseraj.ir",
    defaultDescription:
      settings?.defaultDescription ??
      "Machines can learn to notice people — I teach them.",
    defaultOgImage: settings?.defaultOgImage ?? "/images/social-card.png",
    email: settings?.email ?? "amirseraj.ir@gmail.com",
    twitterHandle: settings?.twitterHandle ?? "@amirseraj",
  };
});
