import Link from "next/link";
import Image from "next/image";
import type { Post } from "../../payload-types";

export function PostCard({ post }: { post: Post }) {
  const cover = typeof post.coverImage === "object" ? post.coverImage : null;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border border-slate-200 transition-colors hover:border-teal-500 dark:border-slate-700"
    >
      {cover?.url && (
        <Image src={cover.url} alt={cover.alt ?? post.title} width={640} height={360} className="w-full object-cover" />
      )}
      <div className="p-5">
        <h2 className="font-heading text-xl font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-300">
          {post.title}
        </h2>
        {post.excerpt && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>}
        <p className="mt-3 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })}
          {post.readingTime ? ` · ${post.readingTime} min read` : null}
        </p>
      </div>
    </Link>
  );
}
