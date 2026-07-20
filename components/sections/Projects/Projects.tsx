"use client";

import { useState, type CSSProperties } from "react";
import cn from "classnames";

import { Box, Container, Text } from "@components/ui";
import { Footer } from "@components/common";
import { GetInTouch } from "..";
import { Graph } from "./Graph";
import { Timeline } from "./Timeline";

interface Project {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  tags?: string[];
}

interface Props {
  allprojects: Project[];
  email?: string | null;
}

type View = "graph" | "timeline";

export const Projects = ({ allprojects, email }: Props) => {
  const projects = allprojects.map((p) => ({ ...p, tags: p.tags ?? [] }));
  const [view, setView] = useState<View>("timeline");
  const years = projects.map((project) =>
    new Date(project.publishedAt).getFullYear()
  );
  const firstYear = years.length ? Math.min(...years) : new Date().getFullYear();
  const lastYear = years.length ? Math.max(...years) : firstYear;
  const yearRange = firstYear === lastYear ? String(firstYear) : `${firstYear}—${lastYear}`;

  return (
    <Box id="top">
      <Box className="bg-[#f4f1eb] pb-20 text-slate-900 dark:bg-[#202020] dark:text-slate-100">
        <Container className="pt-28 md:pt-32">
          <div className="anim-rise flex flex-col gap-7 border-b border-slate-300 pb-8 md:flex-row md:items-end md:justify-between dark:border-white/10">
            <div className="max-w-3xl">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-mango-700 dark:text-mango-300">
                {projects.length} projects · {yearRange}
              </p>
              <Text
                as="h1"
                className="mt-3 font-heading text-4xl font-bold tracking-tight text-slate-950 md:text-6xl dark:text-white"
              >
                Work, in context.
              </Text>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
                Browse the archive chronologically, or trace the technologies
                and questions that connect one experiment to the next.
              </p>
            </div>

            <div
              className="grid w-fit grid-cols-2 rounded-full border border-slate-300 bg-white/60 p-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
              role="group"
              aria-label="Choose chronological timeline or project connection graph"
            >
              <button
                type="button"
                aria-pressed={view === "timeline"}
                onClick={() => setView("timeline")}
                className={cn(
                  "min-h-[40px] rounded-full px-4 font-heading text-[11px] font-bold uppercase tracking-[0.12em] transition-colors",
                  view === "timeline"
                    ? "bg-slate-950 text-white shadow-sm dark:bg-mango-300 dark:text-mango-950"
                    : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                )}
              >
                Timeline
              </button>
              <button
                type="button"
                aria-pressed={view === "graph"}
                onClick={() => setView("graph")}
                className={cn(
                  "min-h-[40px] rounded-full px-4 font-heading text-[11px] font-bold uppercase tracking-[0.12em] transition-colors",
                  view === "graph"
                    ? "bg-slate-950 text-white shadow-sm dark:bg-mango-300 dark:text-mango-950"
                    : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                )}
              >
                Connections
              </button>
            </div>
          </div>
        </Container>

        <Container
          className="anim-rise pt-8 md:pt-10"
          style={{ "--stagger": 1 } as CSSProperties}
        >
          {view === "graph" ? (
            <Graph projects={projects} />
          ) : (
            <Timeline projects={projects} />
          )}
        </Container>
      </Box>

      <GetInTouch email={email} />
      <Footer email={email} />
    </Box>
  );
};
