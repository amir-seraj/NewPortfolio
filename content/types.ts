import type { Node as MarkdocNode } from "@markdoc/markdoc";

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export type PostSummary = {
  id: string;
  slug: string;
  title: string;
  status: "draft" | "published";
  publishedAt: string;
  coverImage: string | null;
  coverAlt: string;
  tags: Tag[];
  excerpt: string;
  readingTime: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string | null;
  };
};

export type Post = PostSummary & {
  body: MarkdocNode;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  kind: string;
  description: string;
  tags: string[];
  featured: boolean;
  featuredOrder: number;
  publishedAt: string;
  year: number;
  readTime: string;
  coverImage: string;
  socialImage: string;
  body?: MarkdocNode;
};

export type Home = {
  hero?: {
    lines?: { text: string; accent?: boolean }[];
    ctaLabel?: string;
    ctaHref?: string;
    strip?: { item: string }[];
  };
  about?: {
    heading?: string;
    paragraphs?: { text: string }[];
    stats?: { value: number; label: string }[];
  };
  contact?: { kicker?: string };
};

export type Setting = {
  siteName: string;
  siteUrl: string;
  defaultDescription: string;
  defaultOgImage: string;
  email: string;
  twitterHandle: string;
};
