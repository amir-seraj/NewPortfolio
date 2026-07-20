"use client";

import Image from "next/image";
import { type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import {
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import { Copyright, Nav } from "@components/common";
import { Container, Link } from "@components/ui";
import { formatDate } from "@utils/format-date";

import styles from "./Detail.module.scss";

interface ProjectLink {
  slug: string;
  title: string;
}

interface ProjectDetailProps {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  kind: string;
  content: ReactNode;
  coverImage: string;
  tags?: string[];
  publishedAt: string;
  readTime: string;
  projectNumber: number;
  projectCount: number;
  prevProject?: ProjectLink | null;
  nextProject?: ProjectLink | null;
  email?: string | null;
  siteUrl?: string;
}

const padNumber = (value: number) => String(value).padStart(2, "0");

function Share({ url, title }: { url: string; title: string }) {
  return (
    <div>
      <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        Share case study
      </p>
      <div className="mt-3 flex gap-2">
        <TwitterShareButton
          title={title}
          related={["amirseraj"]}
          url={url}
          aria-label="Share this project on X"
          className="!flex !min-h-[42px] !min-w-[42px] !items-center !justify-center !rounded-full !border !border-slate-300 !font-heading !text-xs !font-bold !text-slate-700 transition-colors hover:!border-slate-950 hover:!bg-slate-950 hover:!text-white dark:!border-white/20 dark:!text-slate-200 dark:hover:!border-mango-300 dark:hover:!bg-mango-300 dark:hover:!text-mango-950"
        >
          X
        </TwitterShareButton>
        <LinkedinShareButton
          title={title}
          url={url}
          summary={title}
          source="amirseraj"
          aria-label="Share this project on LinkedIn"
          className="!flex !min-h-[42px] !min-w-[42px] !items-center !justify-center !rounded-full !border !border-slate-300 !font-heading !text-[10px] !font-bold !text-slate-700 transition-colors hover:!border-slate-950 hover:!bg-slate-950 hover:!text-white dark:!border-white/20 dark:!text-slate-200 dark:hover:!border-mango-300 dark:hover:!bg-mango-300 dark:hover:!text-mango-950"
        >
          in
        </LinkedinShareButton>
      </div>
    </div>
  );
}

function ProjectNavigation({
  prevProject,
  nextProject,
}: {
  prevProject?: ProjectLink | null;
  nextProject?: ProjectLink | null;
}) {
  if (!prevProject && !nextProject) return null;

  return (
    <nav
      aria-label="More projects"
      className="grid border-y border-slate-300 sm:grid-cols-2 dark:border-white/15"
    >
      {prevProject ? (
        <Link
          href={`/projects/${prevProject.slug}`}
          className="group flex min-h-44 flex-col justify-between border-b border-slate-300 p-6 transition-colors hover:bg-white sm:border-b-0 sm:border-r md:p-9 dark:border-white/15 dark:hover:bg-white/[0.04]"
        >
          <span className="flex items-center font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            <MdOutlineKeyboardArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Earlier project
          </span>
          <span className="mt-8 max-w-[27ch] font-heading text-xl font-bold leading-tight text-slate-950 group-hover:text-mango-700 md:text-2xl dark:text-white dark:group-hover:text-mango-300">
            {prevProject.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" aria-hidden="true" />
      )}

      {nextProject ? (
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group flex min-h-44 flex-col items-end justify-between p-6 text-right transition-colors hover:bg-white md:p-9 dark:hover:bg-white/[0.04]"
        >
          <span className="flex items-center font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Later project
            <MdOutlineKeyboardArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="mt-8 max-w-[27ch] font-heading text-xl font-bold leading-tight text-slate-950 group-hover:text-mango-700 md:text-2xl dark:text-white dark:group-hover:text-mango-300">
            {nextProject.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" aria-hidden="true" />
      )}
    </nav>
  );
}

export function ProjectDetail({
  slug,
  title,
  shortTitle,
  description,
  kind,
  content,
  coverImage,
  tags = [],
  publishedAt,
  readTime,
  projectNumber,
  projectCount,
  prevProject = null,
  nextProject = null,
  email = "amirseraj.ir@gmail.com",
  siteUrl = "https://amirseraj.ir",
}: ProjectDetailProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const readingProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });
  const projectUrl = `${siteUrl.replace(/\/$/, "")}/projects/${slug}`;
  const emailAddress = email ?? "amirseraj.ir@gmail.com";

  return (
    <article className="min-h-screen bg-[#f4f1eb] text-slate-900 dark:bg-[#202020] dark:text-slate-100">
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-mango-300"
        style={{ scaleX: readingProgress }}
      />
      <Nav variant="projects" email={emailAddress} />

      <header className="relative overflow-hidden bg-[#1d1d1d] text-white">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-[0.08em] -top-[0.3em] select-none font-heading text-[clamp(13rem,34vw,34rem)] font-bold leading-none tracking-[-0.09em] text-white/[0.025]"
        >
          {padNumber(projectNumber)}
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-[12%] top-0 hidden w-px bg-white/[0.06] md:block"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-[12%] top-0 hidden w-px bg-white/[0.06] md:block"
        />

        <Container className="relative max-w-[1500px] pb-28 pt-10 md:pb-40 md:pt-16 lg:pb-48">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <Link
              href="/projects"
              className="inline-flex min-h-[44px] items-center font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300 transition-colors hover:text-mango-300"
            >
              <MdOutlineKeyboardArrowLeft className="mr-1 h-4 w-4" />
              All projects
            </Link>

            <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-mango-300">
                  Case study {padNumber(projectNumber)} / {padNumber(projectCount)}
                </p>
                <p className="mt-4 max-w-[22ch] text-sm leading-relaxed text-slate-400">
                  {kind}
                </p>
              </div>

              <div className="md:col-span-9 lg:col-span-8">
                <h1 className="max-w-[18ch] text-balance font-heading text-[clamp(2.75rem,7vw,7.5rem)] font-bold leading-[0.96] tracking-[-0.04em] text-white">
                  {title}
                </h1>
                <p className="mt-8 max-w-[62ch] text-base leading-relaxed text-slate-300 md:text-xl md:leading-relaxed">
                  {description}
                </p>

                <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/15 pt-6 md:mt-14">
                  <div>
                    <dt className="font-heading text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Shipped
                    </dt>
                    <dd className="mt-1 text-sm text-slate-200">
                      {formatDate(publishedAt)}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-heading text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Reading time
                    </dt>
                    <dd className="mt-1 text-sm text-slate-200">
                      {readTime} min read
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </motion.div>
        </Container>
      </header>

      <Container className="relative z-[1] max-w-[1500px]">
        <motion.figure
          className="-mt-16 md:-mt-24 lg:-mt-28"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12 }}
        >
          <div className="relative aspect-[4/3] overflow-hidden border border-slate-300 bg-[#e9e5dd] shadow-[0_35px_80px_-55px_rgba(15,23,42,0.65)] md:aspect-[16/9] dark:border-white/15 dark:bg-[#292929]">
            <Image
              src={coverImage}
              alt={`${title} — project cover`}
              fill
              priority
              sizes="(min-width: 1600px) 1420px, (min-width: 768px) calc(100vw - 160px), calc(100vw - 40px)"
              className="object-contain p-4 md:p-8 lg:p-12"
            />
          </div>
          <figcaption className="flex items-start justify-between gap-6 border-x border-b border-slate-300 px-4 py-3 font-heading text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500 md:px-5 dark:border-white/15 dark:text-slate-400">
            <span>{shortTitle}</span>
            <span className="text-right">Selected project view</span>
          </figcaption>
        </motion.figure>
      </Container>

      <Container className="max-w-[1320px] py-20 md:py-28 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-[220px_minmax(0,760px)] lg:justify-between lg:gap-20">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-mango-700 dark:text-mango-300">
              Project brief
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {kind}
            </p>

            {tags.length > 0 && (
              <div className="mt-8 border-t border-slate-300 pt-6 dark:border-white/15">
                <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Tools & disciplines
                </p>
                <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:items-start">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-slate-300 px-3 py-1.5 text-xs text-slate-700 dark:border-white/20 dark:text-slate-300"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 border-t border-slate-300 pt-6 dark:border-white/15">
              <Share url={projectUrl} title={title} />
            </div>
          </aside>

          <section aria-label={`${shortTitle} case study`}>
            <p className="mb-5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-mango-700 dark:text-mango-300">
              The case study
            </p>
            <div
              className={`${styles.prose} prose prose-lg max-w-none prose-slate dark:prose-invert`}
            >
              {content}
            </div>
          </section>
        </div>
      </Container>

      <section className="bg-mango-300 text-mango-950">
        <Container className="max-w-[1320px] py-14 md:flex md:items-end md:justify-between md:gap-12 md:py-20">
          <div>
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em]">
              Continue the conversation
            </p>
            <h2 className="mt-4 max-w-[18ch] font-heading text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              Curious about a decision behind this project?
            </h2>
          </div>
          <Link
            href={`mailto:${emailAddress}`}
            className="mt-8 inline-flex min-h-[44px] shrink-0 items-center border-b-2 border-mango-950 font-heading text-sm font-bold uppercase tracking-[0.14em] transition-transform hover:translate-x-1 md:mt-0"
          >
            Ask me anything
            <MdOutlineKeyboardArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Container>
      </section>

      <Container className="max-w-[1320px] py-16 md:py-24">
        <p className="mb-5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Keep exploring
        </p>
        <ProjectNavigation
          prevProject={prevProject}
          nextProject={nextProject}
        />
      </Container>

      <Copyright />
    </article>
  );
}
