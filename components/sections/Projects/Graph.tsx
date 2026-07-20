"use client";

import { useMemo, useState } from "react";
import cn from "classnames";

import { Link } from "@components/ui";
import { buildGraph, GRAPH_VIEWBOX, type ProjectData } from "./graph-data";

interface Props {
  projects: ProjectData[];
}

export const Graph = ({ projects }: Props) => {
  const { nodes, edges } = useMemo(() => buildGraph(projects), [projects]);
  const bySlug = useMemo(
    () => new Map(projects.map((project) => [project.slug, project])),
    [projects]
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered ?? selected;

  const neighbors = useMemo(() => {
    const related = new Set<string>();
    if (!active) return related;
    edges.forEach((edge) => {
      if (edge.a === active) related.add(edge.b);
      if (edge.b === active) related.add(edge.a);
    });
    return related;
  }, [active, edges]);

  const selectedNode = selected
    ? nodes.find((node) => node.slug === selected)
    : null;
  const selectedProject = selected ? bySlug.get(selected) : null;
  const selectedEdges = selected
    ? edges.filter((edge) => edge.a === selected || edge.b === selected)
    : [];
  const sharedTags = Array.from(
    new Set(selectedEdges.flatMap((edge) => edge.sharedTags))
  );

  const selectNode = (slug: string) => {
    setSelected((current) => (current === slug ? null : slug));
  };

  return (
    <section aria-labelledby="connection-map-title">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="connection-map-title"
            className="font-heading text-xl font-bold text-slate-950 dark:text-white"
          >
            Project connections
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Select a project to reveal the shared tools and research themes.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-2">
            <i className="h-3 w-3 rounded-full border-2 border-mango-600 bg-mango-100 dark:border-mango-300 dark:bg-mango-300/20" />
            Larger node, more connections
          </span>
          <span className="flex items-center gap-2">
            <i className="h-px w-5 bg-slate-400 dark:bg-slate-600" />
            Shared tag
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-[#171717] dark:shadow-none">
        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${GRAPH_VIEWBOX.w} ${GRAPH_VIEWBOX.h}`}
            role="group"
            aria-label={`Interactive graph of ${projects.length} projects connected by shared tags. Tab between projects and press Enter or Space to inspect one.`}
            className="block aspect-[15/8] w-full min-w-[720px]"
            onClick={(event) => {
              if (event.target === event.currentTarget) setSelected(null);
            }}
          >
            <g>
              {edges.map((edge, index) => {
                const isActive = active === edge.a || active === edge.b;
                const isDimmed = active !== null && !isActive;
                return (
                  <line
                    key={`${edge.a}-${edge.b}-${index}`}
                    x1={edge.x1}
                    y1={edge.y1}
                    x2={edge.x2}
                    y2={edge.y2}
                    strokeWidth={isActive ? 2.2 : 1.15}
                    className={cn(
                      "transition-[stroke,opacity] duration-200",
                      isActive
                        ? "stroke-mango-600 dark:stroke-mango-300"
                        : "stroke-slate-300 dark:stroke-slate-700",
                      isDimmed && "opacity-15"
                    )}
                  />
                );
              })}
            </g>

            <g>
              {nodes.map((node) => {
                const isSelected = selected === node.slug;
                const isActive = active === node.slug;
                const isConnected = neighbors.has(node.slug);
                const isDimmed =
                  active !== null &&
                  !isActive &&
                  !isConnected &&
                  !isSelected;
                const isIsolated = node.degree === 0;

                return (
                  <g
                    key={node.slug}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    aria-label={`${node.label}, ${node.degree} connection${
                      node.degree === 1 ? "" : "s"
                    }`}
                    className={cn(
                      "cursor-pointer transition-opacity duration-200",
                      isDimmed && "opacity-25"
                    )}
                    onClick={() => selectNode(node.slug)}
                    onKeyDown={(event) => {
                      if (event.key !== "Enter" && event.key !== " ") return;
                      event.preventDefault();
                      selectNode(node.slug);
                    }}
                    onMouseEnter={() => setHovered(node.slug)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <title>{`${node.title}: ${node.tags.join(", ")}`}</title>
                    {(isSelected || isActive) && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.r + 6}
                        className="fill-mango-300/15 stroke-mango-500/30 dark:fill-mango-300/10 dark:stroke-mango-300/30"
                        strokeWidth={1}
                      />
                    )}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r}
                      strokeWidth={isSelected ? 2.5 : 1.7}
                      strokeDasharray={isIsolated ? "3 3" : undefined}
                      className={cn(
                        "transition-[fill,stroke] duration-200",
                        isSelected
                          ? "fill-slate-950 stroke-slate-950 dark:fill-mango-300 dark:stroke-mango-200"
                          : isConnected
                          ? "fill-mango-200 stroke-mango-600 dark:fill-mango-300/80 dark:stroke-mango-200"
                          : isIsolated
                          ? "fill-white stroke-slate-400 dark:fill-[#171717] dark:stroke-slate-500"
                          : "fill-white stroke-mango-600 dark:fill-[#282828] dark:stroke-mango-300"
                      )}
                    />
                    <text
                      x={node.x + node.labelDx}
                      y={node.y + node.labelDy}
                      textAnchor={node.labelAnchor}
                      className={cn(
                        "font-body text-[11px] transition-[fill] duration-200",
                        isSelected || isActive
                          ? "fill-slate-950 font-semibold dark:fill-white"
                          : "fill-slate-600 dark:fill-slate-300"
                      )}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {selectedNode && selectedProject && (
          <aside
            className="relative border-t border-slate-200 bg-white p-5 md:absolute md:bottom-5 md:right-5 md:w-[360px] md:rounded-xl md:border md:border-slate-200 md:shadow-2xl dark:border-white/10 dark:bg-[#242424]"
            aria-live="polite"
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-4 top-3 grid h-9 w-9 place-items-center rounded-full text-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="Close project details"
            >
              ×
            </button>
            <p className="pr-10 font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-mango-700 dark:text-mango-300">
              {selectedNode.degree} shared connection
              {selectedNode.degree === 1 ? "" : "s"}
            </p>
            <h3 className="mt-2 pr-8 font-heading text-xl font-bold leading-tight text-slate-950 dark:text-white">
              {selectedProject.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {selectedProject.description}
            </p>
            {sharedTags.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {sharedTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-mango-100 px-2.5 py-1 text-[10px] font-semibold text-mango-900 dark:bg-mango-300/10 dark:text-mango-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                A genuine outlier in this archive—no shared tags yet.
              </p>
            )}
            <Link
              href={`/projects/${selectedNode.slug}`}
              className="mt-5 inline-flex min-h-[42px] items-center rounded-full bg-slate-950 px-5 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-mango-700 dark:bg-mango-300 dark:text-mango-950 dark:hover:bg-mango-200"
            >
              Read case study →
            </Link>
          </aside>
        )}
      </div>
    </section>
  );
};
