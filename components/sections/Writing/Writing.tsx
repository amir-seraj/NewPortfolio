import type { CSSProperties } from "react";
import Image from "next/image";
import { MdOutlineArrowForward } from "react-icons/md";

import type { PostSummary } from "../../../content/types";
import { Container, Link } from "@components/ui";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export function Writing({ posts }: { posts: PostSummary[] }) {
  const selected = posts.slice(0, 3);
  if (selected.length === 0) return null;

  return (
    <section className="border-y border-slate-200 bg-white py-24 text-slate-950 md:py-32 lg:py-40 dark:border-white/10 dark:bg-[#292929] dark:text-white">
      <Container className="max-w-[1500px]">
        <div className="mb-12 grid gap-7 md:grid-cols-2 md:items-end">
          <div>
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-mango-700 dark:text-mango-300">
              03 / Field notes
            </p>
            <h2 className="mt-5 max-w-[12ch] font-heading text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
              Thinking in public.
            </h2>
          </div>
          <div className="md:justify-self-end md:text-right">
            <p className="max-w-[42ch] text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Notes from the space between research questions and working
              prototypes—what changed, what failed, and what remains open.
            </p>
            <Link
              href="/blog"
              className="group mt-5 inline-flex min-h-[44px] items-center font-heading text-xs font-bold uppercase tracking-[0.14em] text-mango-700 dark:text-mango-300"
            >
              Read every note
              <MdOutlineArrowForward className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid border-l border-t border-slate-300 md:grid-cols-2 lg:grid-cols-4 dark:border-white/15">
          {selected.map((post, index) => (
            <article
              key={post.id}
              className={`anim-rise border-b border-r border-slate-300 dark:border-white/15 ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
              style={{ "--stagger": index } as CSSProperties}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col bg-[#f4f1eb] transition-colors hover:bg-mango-50 dark:bg-[#242424] dark:hover:bg-[#26211d]"
              >
                <div
                  className={`relative overflow-hidden border-b border-slate-300 dark:border-white/15 ${
                    index === 0 ? "aspect-[16/9]" : "aspect-[16/10]"
                  }`}
                >
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.coverAlt || post.title}
                      fill
                      sizes={
                        index === 0
                          ? "(min-width: 1024px) 50vw, 100vw"
                          : "(min-width: 1024px) 25vw, 50vw"
                      }
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                  ) : (
                    <div className="blog-card-pattern absolute inset-0" />
                  )}
                  <span className="absolute left-4 top-4 bg-mango-300 px-3 py-2 font-heading text-[9px] font-bold uppercase tracking-[0.16em] text-mango-950">
                    Note {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
                  <div>
                    <p className="font-heading text-[9px] font-bold uppercase tracking-[0.15em] text-mango-700 dark:text-mango-300">
                      {post.tags.map((tag) => tag.name).join(" · ")}
                    </p>
                    <h3
                      className={`mt-4 text-balance font-heading font-bold leading-tight tracking-tight transition-colors group-hover:text-mango-700 dark:group-hover:text-mango-300 ${
                        index === 0 ? "text-3xl md:text-4xl" : "text-2xl"
                      }`}
                    >
                      {post.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="mt-9 flex items-center justify-between gap-4 border-t border-slate-300 pt-4 dark:border-white/15">
                    <p className="font-heading text-[9px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      {formatDate(post.publishedAt)} · {post.readingTime} min
                    </p>
                    <MdOutlineArrowForward className="h-5 w-5 shrink-0 text-mango-700 transition-transform group-hover:translate-x-1 dark:text-mango-300" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
