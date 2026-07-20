import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PostSummary } from "../../content/types";

type PostCardProps = {
  post: PostSummary;
  featured?: boolean;
  index?: number;
};

const formatPublishedDate = (date?: string | null) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

export function PostCard({ post, featured = false, index = 0 }: PostCardProps) {
  const cover = post.coverImage;
  const tags = post.tags;
  const date = formatPublishedDate(post.publishedAt);
  const noteNumber = String(index + 1).padStart(2, "0");

  return (
    <article
      className="anim-rise"
      style={{ "--stagger": index } as CSSProperties}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={`group grid overflow-hidden border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-mango-500 hover:shadow-[0_18px_50px_-28px_rgba(44,23,2,0.65)] dark:border-slate-700 dark:bg-[#303030] dark:hover:border-mango-300 ${
          featured ? "md:grid-cols-[1.35fr_1fr]" : "h-full grid-rows-[auto_1fr]"
        }`}
      >
        <div
          className={`relative overflow-hidden ${
            featured ? "min-h-[270px] md:min-h-[430px]" : "aspect-[16/10]"
          }`}
        >
          {cover ? (
            <Image
              src={cover}
              alt={post.coverAlt || post.title}
              fill
              priority={featured}
              sizes={
                featured
                  ? "(min-width: 768px) 55vw, 100vw"
                  : "(min-width: 768px) 50vw, 100vw"
              }
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />
          ) : (
            <div
              className="blog-card-pattern absolute inset-0"
              aria-hidden="true"
            >
              <span className="absolute -right-12 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full border border-mango-300/40" />
              <span className="absolute -right-2 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full border border-mango-300/60 transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute bottom-6 left-6 font-heading text-[clamp(3rem,9vw,8rem)] font-bold leading-none text-mango-300/20">
                {noteNumber}
              </span>
            </div>
          )}
          <span className="absolute left-5 top-5 bg-mango-300 px-3 py-2 font-heading text-[0.65rem] font-bold uppercase tracking-[0.16em] text-mango-950">
            {featured ? "Latest note" : `Field note ${noteNumber}`}
          </span>
        </div>

        <div
          className={`flex flex-col ${
            featured ? "justify-between p-6 md:p-9" : "p-6"
          }`}
        >
          <div>
            {tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-x-3 gap-y-1 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-mango-700 dark:text-mango-300">
                {tags.map((tag) => (
                  <span key={tag.id}>{tag.name}</span>
                ))}
              </div>
            )}
            <h2
              className={`font-heading font-bold leading-tight text-slate-900 transition-colors group-hover:text-mango-700 dark:text-slate-100 dark:group-hover:text-mango-300 ${
                featured ? "text-3xl md:text-4xl" : "text-2xl"
              }`}
            >
              {post.title}
            </h2>
            {post.excerpt && (
              <p
                className={`mt-4 leading-relaxed text-slate-600 dark:text-slate-300 ${
                  featured ? "text-base md:text-lg" : "text-sm"
                }`}
              >
                {post.excerpt}
              </p>
            )}
          </div>

          <div
            className={`${
              featured ? "mt-10" : "mt-8"
            } flex items-end justify-between gap-5 border-t border-slate-200 pt-4 dark:border-slate-700`}
          >
            <p className="font-heading text-[0.68rem] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
              {date}
              {date && post.readingTime ? " · " : null}
              {post.readingTime ? `${post.readingTime} min read` : null}
            </p>
            <span className="shrink-0 font-heading text-sm font-semibold text-mango-700 transition-transform duration-300 group-hover:translate-x-1.5 dark:text-mango-300">
              Read →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
