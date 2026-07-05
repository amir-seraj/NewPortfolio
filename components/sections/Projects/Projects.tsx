import { useEffect, useState, type CSSProperties } from "react";
import cn from "classnames";

import { Box, Container, Text } from "@components/ui";
import { Footer } from "@components/common";
import { GetInTouch } from "..";
import { Graph } from "./Graph";
import { Timeline } from "./Timeline";

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

type View = "graph" | "timeline";

export const Projects = ({ allprojects }: Props) => {
  const projects = allprojects.map((p) => ({ ...p, tags: p.tags ?? [] }));
  const [view, setView] = useState<View>("graph");

  // The graph is a real network diagram: readable at desktop widths, not at
  // phone width. Default narrow screens to the timeline instead.
  useEffect(() => {
    if (window.matchMedia("(max-width: 640px)").matches) setView("timeline");
  }, []);

  return (
    <Box>
      <Container className="mt-14 mb-4 md:mt-16">
        <Text
          as="h1"
          className="anim-rise font-heading text-3xl font-bold md:text-4xl"
        >
          Projects
        </Text>
      </Container>

      <Container
        className="anim-rise mb-3"
        style={{ "--stagger": 1 } as CSSProperties}
      >
        <div
          className="flex gap-2"
          role="group"
          aria-label="Choose how to explore the thirteen projects: connection graph or chronological timeline"
        >
          <button
            type="button"
            aria-pressed={view === "graph"}
            onClick={() => setView("graph")}
            className={cn(
              "rounded-full border px-4 py-2 font-heading text-xs font-semibold uppercase tracking-wide transition-colors",
              view === "graph"
                ? "border-teal-600 bg-teal-600 text-white dark:border-teal-400 dark:bg-teal-400 dark:text-[#0f172a]"
                : "border-slate-300 text-slate-600 hover:border-slate-400 dark:border-slate-600 dark:text-slate-300"
            )}
          >
            Graph view
          </button>
          <button
            type="button"
            aria-pressed={view === "timeline"}
            onClick={() => setView("timeline")}
            className={cn(
              "rounded-full border px-4 py-2 font-heading text-xs font-semibold uppercase tracking-wide transition-colors",
              view === "timeline"
                ? "border-teal-600 bg-teal-600 text-white dark:border-teal-400 dark:bg-teal-400 dark:text-[#0f172a]"
                : "border-slate-300 text-slate-600 hover:border-slate-400 dark:border-slate-600 dark:text-slate-300"
            )}
          >
            Timeline view
          </button>
        </div>
      </Container>

      <Container
        className="anim-rise pb-16"
        style={{ "--stagger": 2 } as CSSProperties}
      >
        {view === "graph" ? (
          <Graph projects={projects} />
        ) : (
          <Timeline projects={projects} />
        )}
      </Container>

      <GetInTouch />
      <Footer />
    </Box>
  );
};
