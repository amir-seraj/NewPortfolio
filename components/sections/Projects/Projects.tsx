import type { CSSProperties } from "react";
import Image from "next/image";

import { Box, Container, Link, Text } from "@components/ui";
import { Footer } from "@components/common";
import { GetInTouch } from "..";

interface Project {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  publishedAt: string;
  readTime: number;
  tags?: string[];
}

interface Props {
  allprojects: Project[];
}

const year = (date: string) => new Date(date).getFullYear() || "";

// Real photos and installation shots that can carry a full-bleed hero
// treatment without fighting baked-in text. Ordered flagship-first.
const CASE_STUDY_SLUGS = [
  "shodocode",
  "est-generic-event-boundary-detector-thesis",
  "resilience-ai-mirror-emotional-wellbeing",
  "unity-at-sea-soundscape-shared-balance",
  "perfect-posture-case-study",
];

export const Projects = ({ allprojects }: Props) => {
  const bySlug = new Map(allprojects.map((p) => [p.slug, p]));
  const caseStudies = CASE_STUDY_SLUGS.map((slug) => bySlug.get(slug)).filter(
    Boolean
  ) as Project[];
  const caseStudySlugs = new Set(CASE_STUDY_SLUGS);
  const alsoShipped = allprojects
    .filter((p) => !caseStudySlugs.has(p.slug))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <Box>
      <Container className="mt-24 mb-3 md:mt-28">
        <Text
          as="h1"
          className="anim-rise font-heading text-4xl font-bold md:text-5xl"
        >
          The evidence, all of it.
        </Text>
        <Text
          as="p"
          className="anim-rise mt-3 max-w-[60ch] text-slate-600 dark:text-slate-300"
          style={{ "--stagger": 1 } as CSSProperties}
        >
          Thirteen shipped projects, 2023 to 2026: systems that read emotion,
          posture and balance, plus the engineering that came before them.
        </Text>
      </Container>

      <Container className="mt-14 mb-4">
        <Text
          as="h2"
          className="font-heading text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
        >
          Case studies
        </Text>
      </Container>
      <Box className="flex flex-col gap-5 px-5 md:px-10">
        {caseStudies.map(
          ({ slug, title, description, coverImage, publishedAt }, idx) => (
            <div
              key={slug}
              className="anim-rise"
              style={{ "--stagger": idx + 2 } as CSSProperties}
            >
              <Link
                href={`/projects/${slug}`}
                className="group relative block h-[240px] overflow-hidden md:h-[300px]"
              >
                <Image
                  src={coverImage}
                  layout="fill"
                  objectFit="cover"
                  alt={title}
                  className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
                <span className="absolute inset-x-6 bottom-5 z-10 md:inset-x-8">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="font-heading text-xl font-bold uppercase leading-tight tracking-wide text-white md:text-3xl">
                      {title}
                    </span>
                    <span className="whitespace-nowrap font-heading text-sm text-teal-300 transition-transform duration-200 group-hover:translate-x-1.5">
                      {year(publishedAt)} →
                    </span>
                  </span>
                  <span className="mt-1.5 hidden max-w-[70ch] text-sm text-slate-200 md:block">
                    {description}
                  </span>
                </span>
              </Link>
            </div>
          )
        )}
      </Box>

      <Container className="mt-16 mb-4">
        <Text
          as="h2"
          className="font-heading text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
        >
          Also shipped
        </Text>
      </Container>
      <Container className="grid grid-cols-1 gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {alsoShipped.map(
          (
            { slug, title, description, coverImage, publishedAt, tags },
            idx
          ) => (
            <Link
              key={slug}
              href={`/projects/${slug}`}
              className="anim-rise group block"
              style={{ "--stagger": idx + caseStudies.length + 2 } as CSSProperties}
            >
              <span className="relative block aspect-video overflow-hidden rounded bg-slate-100 dark:bg-black">
                <Image
                  src={coverImage}
                  layout="fill"
                  objectFit="contain"
                  alt={title}
                  className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </span>
              <span className="mt-3 flex items-baseline justify-between gap-3">
                <span className="font-heading text-base font-bold leading-tight">
                  {title}
                </span>
                <span className="whitespace-nowrap font-heading text-xs text-teal-700 transition-transform duration-200 group-hover:translate-x-1 dark:text-teal-300">
                  {year(publishedAt)} →
                </span>
              </span>
              <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">
                {description}
              </span>
              {tags && tags.length > 0 && (
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-300 px-2.5 py-0.5 text-xs text-slate-600 dark:border-slate-600 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              )}
            </Link>
          )
        )}
      </Container>

      <GetInTouch />
      <Footer />
    </Box>
  );
};
