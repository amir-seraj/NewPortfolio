"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { MdOutlineArrowForward } from "react-icons/md";

import { Container, Link } from "@components/ui";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

interface Project {
  slug: string;
  title: string;
  shortTitle?: string;
  kind?: string;
  description?: string;
  tags?: string[];
  year?: number;
  featured?: boolean;
  featuredOrder?: number;
  coverImage: string;
}

interface Props {
  projects: Project[];
}

function ProjectCard({
  project,
  index,
  lead = false,
}: {
  project: Project;
  index: number;
  lead?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const displayTitle = project.shortTitle || project.title;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.68, ease: EASE_EXPO, delay: index * 0.08 }}
      className={lead ? "lg:col-span-2" : ""}
    >
      <Link
        href={`/projects/${project.slug}`}
        className={`group grid h-full overflow-hidden border border-slate-300 bg-white transition-colors hover:border-mango-600 dark:border-white/15 dark:bg-[#292929] dark:hover:border-mango-300 ${
          lead ? "lg:grid-cols-[1.3fr_0.7fr]" : "grid-rows-[auto_1fr]"
        }`}
      >
        <div
          className={`relative overflow-hidden border-b border-slate-300 bg-[#e9e5dd] dark:border-white/15 dark:bg-[#242424] ${
            lead
              ? "aspect-[16/11] lg:aspect-auto lg:min-h-[540px] lg:border-b-0 lg:border-r"
              : "aspect-[16/10]"
          }`}
        >
          <Image
            src={project.coverImage}
            alt={`${displayTitle} — ${project.kind || "project"}`}
            fill
            sizes={
              lead
                ? "(min-width: 1024px) 58vw, 100vw"
                : "(min-width: 1024px) 36vw, 100vw"
            }
            className="object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-[1.025] md:p-8"
          />
          <span className="absolute left-4 top-4 bg-slate-950 px-3 py-2 font-heading text-[9px] font-bold uppercase tracking-[0.16em] text-white dark:bg-mango-300 dark:text-mango-950">
            Project {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className={`flex flex-col justify-between ${lead ? "p-6 md:p-9" : "p-6"}`}>
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-heading text-[9px] font-bold uppercase tracking-[0.16em] text-mango-700 dark:text-mango-300">
              <span>{project.kind || "Project"}</span>
              {project.year && (
                <>
                  <span className="h-1 w-1 rounded-full bg-current opacity-50" />
                  <span>{project.year}</span>
                </>
              )}
            </div>
            <h3
              className={`mt-5 text-balance font-heading font-bold leading-[1.05] tracking-tight text-slate-950 transition-colors group-hover:text-mango-700 dark:text-white dark:group-hover:text-mango-300 ${
                lead ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
              }`}
            >
              {project.title}
            </h3>
            {project.description && (
              <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {project.description}
              </p>
            )}
          </div>

          <div className="mt-10 flex items-end justify-between gap-5 border-t border-slate-200 pt-5 dark:border-white/10">
            <div className="flex max-w-[75%] flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500 dark:text-slate-400">
              {project.tags?.slice(0, 3).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <MdOutlineArrowForward className="h-5 w-5 shrink-0 text-mango-700 transition-transform group-hover:translate-x-1 dark:text-mango-300" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function Evidence({ projects }: Props) {
  const explicitlyFeatured = projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
  const featured = (
    explicitlyFeatured.length > 0
      ? explicitlyFeatured
      : projects.slice(-3).reverse()
  ).slice(0, 3);

  return (
    <section
      id="work"
      className="bg-[#f4f1eb] py-24 text-slate-950 md:py-32 lg:py-40 dark:bg-[#202020] dark:text-white"
    >
      <Container className="max-w-[1500px]">
        <div className="mb-12 flex flex-col gap-7 border-b border-slate-300 pb-8 md:flex-row md:items-end md:justify-between dark:border-white/15">
          <div>
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-mango-700 dark:text-mango-300">
              02 / Selected work
            </p>
            <h2 className="mt-5 max-w-[13ch] font-heading text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
              Systems with something to prove.
            </h2>
          </div>
          <div className="md:text-right">
            <p className="max-w-[42ch] text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Three projects where sensing, interpretation, and interaction
              meet in public—not just in a notebook.
            </p>
            <Link
              href="/projects"
              className="group mt-5 inline-flex min-h-[44px] items-center font-heading text-xs font-bold uppercase tracking-[0.14em] text-mango-700 dark:text-mango-300"
            >
              Explore all {projects.length} projects
              <MdOutlineArrowForward className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              lead={index === 0}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
