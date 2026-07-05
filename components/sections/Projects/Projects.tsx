"use client";

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
  const [view, setView] = useState<View>("graph");

  // The graph is a real network diagram: readable at desktop widths, not at
  // phone width. Default narrow screens to the timeline instead.
  useEffect(() => {
    if (window.matchMedia("(max-width: 640px)").matches) setView("timeline");
  }, []);

  return (
    <Box>
      {/* The explorer sits on a committed teal surface; the accent is the
          ground here, not a trim. Light and dark are two depths of it. */}
      <Box className="bg-teal-900 pb-16 text-teal-50 dark:bg-[#082f2c]">
        <Container className="mb-4 pt-24 md:pt-28">
          <Text
            as="h1"
            className="anim-rise font-heading text-3xl font-bold text-white md:text-4xl"
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
            aria-label="Choose how to explore the projects: connection graph or chronological timeline"
          >
            <button
              type="button"
              aria-pressed={view === "graph"}
              onClick={() => setView("graph")}
              className={cn(
                "rounded-full border px-4 py-2 font-heading text-xs font-semibold uppercase tracking-wide transition-colors",
                view === "graph"
                  ? "border-white bg-white text-teal-900"
                  : "border-teal-300/40 text-teal-100 hover:border-teal-200 hover:text-white"
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
                  ? "border-white bg-white text-teal-900"
                  : "border-teal-300/40 text-teal-100 hover:border-teal-200 hover:text-white"
              )}
            >
              Timeline view
            </button>
          </div>
        </Container>

        <Container
          className="anim-rise"
          style={{ "--stagger": 2 } as CSSProperties}
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
