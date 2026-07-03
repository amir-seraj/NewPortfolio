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

export const Projects = ({ allprojects }: Props) => {
  const sorted = [...allprojects].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
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
          Eleven shipped projects, 2023 to 2026: systems that read emotion,
          posture and balance, plus the engineering that came before them.
        </Text>
      </Container>
      <Box className="mt-8 flex flex-col gap-5 px-5 pb-16 md:px-10">
        {sorted.map(
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
      <GetInTouch />
      <Footer />
    </Box>
  );
};
