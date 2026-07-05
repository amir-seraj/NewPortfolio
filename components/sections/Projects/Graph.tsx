import { useMemo, useState } from "react";
import cn from "classnames";

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
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-lg bg-teal-50/70 px-3.5 py-2.5 text-[11px] text-teal-800 dark:bg-teal-950/30 dark:text-teal-200">
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-1.5 w-1.5 rounded-full border-[1.5px] border-teal-600/50 dark:border-teal-400/50" />
          <i className="inline-block h-3 w-3 rounded-full border-[1.5px] border-teal-600/50 dark:border-teal-400/50" />
          Size = shared-tag connections
        </span>
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-[2px] w-4 bg-teal-600/40 dark:bg-teal-400/40" />
          Shared tag
        </span>
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-full border-[1.5px] border-dashed border-slate-400 dark:border-slate-500" />
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
                  active
                    ? "stroke-teal-600 dark:stroke-teal-400"
                    : "stroke-teal-600/25 dark:stroke-teal-400/25",
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
                      ? "fill-teal-600 stroke-teal-600 dark:fill-teal-400 dark:stroke-teal-400"
                      : isConn
                      ? "fill-teal-300 stroke-teal-400 dark:fill-teal-800 dark:stroke-teal-600"
                      : isolated
                      ? "fill-slate-200 stroke-slate-400 dark:fill-[#3a3a3a] dark:stroke-slate-500"
                      : "fill-teal-200 stroke-teal-500/60 dark:fill-teal-900 dark:stroke-teal-400/50"
                  )}
                />
                <text
                  x={n.x + n.labelDx}
                  y={n.y + n.labelDy}
                  textAnchor={n.labelAnchor}
                  className={cn(
                    "font-body text-[12px] transition-[fill] duration-200",
                    isSel
                      ? "fill-teal-700 font-semibold dark:fill-teal-300"
                      : "fill-slate-700 dark:fill-slate-200"
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
        className="min-h-[220px] min-w-0 overflow-y-auto overflow-x-hidden rounded-lg border border-teal-600/20 bg-teal-50/70 p-4 dark:border-teal-400/20 dark:bg-teal-950/30 md:w-1/2"
        aria-live="polite"
      >
        {selectedNode ? (
          <>
            <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
              {selectedNode.title}
            </h3>
            <p className="mt-1 text-xs text-teal-700 dark:text-teal-300">
              {selectedNode.tags.join(", ")}
            </p>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
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
                      <span className="font-medium text-slate-900 dark:text-white">
                        {other?.title}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        : {e.sharedTags.join(", ")}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400">
                No shared tags with any other project here. A genuine
                outlier, not a bug.
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Click or press Enter on any node to see its shared-technology
            connections.
          </p>
        )}
      </div>
      </div>
    </>
  );
};
