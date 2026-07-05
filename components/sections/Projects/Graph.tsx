"use client";

import { useMemo, useState } from "react";
import cn from "classnames";

import { Link } from "@components/ui";
import { buildGraph, GRAPH_VIEWBOX, type ProjectData } from "./graph";

interface Props {
  projects: ProjectData[];
}

export const Graph = ({ projects }: Props) => {
  const { nodes, edges } = useMemo(() => buildGraph(projects), [projects]);
  const bySlug = useMemo(
    () => new Map(projects.map((p) => [p.slug, p])),
    [projects]
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  const neighbors = useMemo(() => {
    const set = new Set<string>();
    if (!selected) return set;
    edges.forEach((e) => {
      if (e.a === selected) set.add(e.b);
      if (e.b === selected) set.add(e.a);
    });
    return set;
  }, [selected, edges]);

  const selectNode = (slug: string) => {
    if (locked && selected === slug) {
      setSelected(null);
      setLocked(false);
    } else {
      setSelected(slug);
      setLocked(true);
    }
  };
  const hoverNode = (slug: string | null) => {
    if (!locked) setSelected(slug);
  };
  const resetAll = () => {
    setSelected(null);
    setLocked(false);
  };

  const selectedNode = selected ? nodes.find((n) => n.slug === selected) : null;
  const selectedEdges = selected
    ? edges.filter((e) => e.a === selected || e.b === selected)
    : [];

  return (
    <>
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-lg bg-white/[0.06] px-3.5 py-2.5 text-[11px] text-teal-100">
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-1.5 w-1.5 rounded-full border-[1.5px] border-teal-200/70" />
          <i className="inline-block h-3 w-3 rounded-full border-[1.5px] border-teal-200/70" />
          Size = shared-tag connections
        </span>
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-[2px] w-4 bg-teal-200/60" />
          Shared tag
        </span>
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-full border-[1.5px] border-dashed border-teal-200/60" />
          No shared tags with anything here
        </span>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <svg
          viewBox={`0 0 ${GRAPH_VIEWBOX.w} ${GRAPH_VIEWBOX.h}`}
          role="group"
          aria-label="Interactive graph of thirteen projects connected by shared tags. Tab between projects, press Enter or Space to trace connections."
          className="block w-full self-center md:w-1/2"
          onClick={(e) => {
            if (e.target === e.currentTarget) resetAll();
          }}
        >
          <g>
            {edges.map((e, i) => {
              const active = selected === e.a || selected === e.b;
              const dim = selected !== null && !active;
              return (
                <line
                  key={i}
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x2}
                  y2={e.y2}
                  strokeWidth={active ? 2.5 : 1.5}
                  className={cn(
                    "transition-[stroke,opacity] duration-200",
                    active ? "stroke-white" : "stroke-teal-200/30",
                    dim && "opacity-10"
                  )}
                />
              );
            })}
          </g>
          <g>
            {nodes.map((n) => {
              const isSel = selected === n.slug;
              const isConn = neighbors.has(n.slug);
              const dim = selected !== null && !isSel && !isConn;
              const isolated = n.degree === 0;
              return (
                <g
                  key={n.slug}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSel}
                  aria-label={`${n.label}, ${n.degree} connection${
                    n.degree === 1 ? "" : "s"
                  }`}
                  className={cn(
                    "cursor-pointer outline-none transition-opacity duration-200",
                    dim && "opacity-25"
                  )}
                  onClick={() => selectNode(n.slug)}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter" && e.key !== " ") return;
                    e.preventDefault();
                    selectNode(n.slug);
                  }}
                  onMouseEnter={() => hoverNode(n.slug)}
                  onMouseLeave={() => hoverNode(null)}
                >
                  <title>{`${n.title}: ${n.tags.join(", ")}`}</title>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.r}
                    strokeWidth={1.5}
                    strokeDasharray={isolated ? "3 3" : undefined}
                    className={cn(
                      "transition-[fill,stroke] duration-200",
                      isSel
                        ? "fill-white stroke-white"
                        : isConn
                        ? "fill-teal-200 stroke-teal-100"
                        : isolated
                        ? "fill-transparent stroke-teal-200/70"
                        : "fill-teal-300/80 stroke-teal-200/70"
                    )}
                  />
                  <text
                    x={n.x + n.labelDx}
                    y={n.y + n.labelDy}
                    textAnchor={n.labelAnchor}
                    className={cn(
                      "font-body text-[12px] transition-[fill] duration-200",
                      isSel ? "fill-white font-semibold" : "fill-teal-50"
                    )}
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        <div
          className="min-h-[220px] min-w-0 overflow-y-auto overflow-x-hidden rounded-lg border border-teal-300/25 bg-white/[0.06] p-4 md:w-1/2"
          aria-live="polite"
        >
          {selectedNode ? (
            <>
              <h3 className="font-heading text-base font-bold text-white">
                {selectedNode.title}
              </h3>
              <p className="mt-1 text-xs text-teal-200">
                {selectedNode.tags.join(", ")}
              </p>
              <p className="mt-1.5 text-xs text-teal-100/80">
                {selectedNode.degree} shared-technology connection
                {selectedNode.degree === 1 ? "" : "s"}
              </p>
              {selectedEdges.length > 0 ? (
                <ul className="mt-2.5 flex flex-col gap-1.5 text-sm">
                  {selectedEdges.map((e, i) => {
                    const otherSlug = e.a === selectedNode.slug ? e.b : e.a;
                    const other = bySlug.get(otherSlug);
                    return (
                      <li key={i}>
                        <span className="font-medium text-white">
                          {other?.title}
                        </span>
                        <span className="text-teal-100/80">
                          : {e.sharedTags.join(", ")}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-2.5 text-sm text-teal-100/80">
                  No shared tags with any other project here. A genuine
                  outlier, not a bug.
                </p>
              )}
              <Link
                href={`/projects/${selectedNode.slug}`}
                className="mt-4 inline-flex min-h-[44px] items-center rounded-full bg-white px-5 font-heading text-xs font-semibold uppercase tracking-wide text-teal-900 transition-colors hover:bg-teal-100"
              >
                Read the case study
              </Link>
            </>
          ) : (
            <p className="text-sm text-teal-100/80">
              Click or press Enter on any node to see its shared-technology
              connections.
            </p>
          )}
        </div>
      </div>
    </>
  );
};
