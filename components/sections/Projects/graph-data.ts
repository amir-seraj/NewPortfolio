export interface ProjectData {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
}

export interface GraphNode {
  slug: string;
  title: string;
  label: string;
  tags: string[];
  degree: number;
  x: number;
  y: number;
  r: number;
  labelDx: number;
  labelDy: number;
  labelAnchor: "start" | "middle" | "end";
}

export interface GraphEdge {
  a: string;
  b: string;
  sharedTags: string[];
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const GRAPH_VIEWBOX = { w: 760, h: 400 };

const RADIUS_MIN = 7;
const RADIUS_MAX = 15;
const FORCE_ITERATIONS = 180;

type SimulationNode = {
  slug: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type EdgeSeed = {
  a: string;
  b: string;
  sharedTags: string[];
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const readableLabel = (project: ProjectData) => {
  const label = project.shortTitle?.trim() || project.title.trim();
  return label.length > 24 ? `${label.slice(0, 22).trimEnd()}…` : label;
};

/**
 * A small deterministic force layout keeps the graph CMS-safe: every project
 * receives a position, including entries created after the current archive.
 * Initial positions and iteration counts are fixed, so server and client
 * renders remain identical without storing presentation coordinates in content.
 */
function calculatePositions(projects: ProjectData[], edges: EdgeSeed[]) {
  const ordered = [...projects].sort((a, b) => a.slug.localeCompare(b.slug));
  const centerX = GRAPH_VIEWBOX.w / 2;
  const centerY = GRAPH_VIEWBOX.h / 2;
  const count = Math.max(ordered.length, 1);
  const simulation: SimulationNode[] = ordered.map((project, index) => {
    const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
    const ring = 0.78 + (index % 3) * 0.08;
    return {
      slug: project.slug,
      x: centerX + Math.cos(angle) * 270 * ring,
      y: centerY + Math.sin(angle) * 142 * ring,
      vx: 0,
      vy: 0,
    };
  });
  const bySlug = new Map(simulation.map((node) => [node.slug, node]));

  for (let iteration = 0; iteration < FORCE_ITERATIONS; iteration++) {
    for (let i = 0; i < simulation.length; i++) {
      for (let j = i + 1; j < simulation.length; j++) {
        const a = simulation[i];
        const b = simulation[j];
        const dx = b.x - a.x || 0.01;
        const dy = b.y - a.y || 0.01;
        const distanceSquared = Math.max(dx * dx + dy * dy, 100);
        const distance = Math.sqrt(distanceSquared);
        const force = 1150 / distanceSquared;
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;
        a.vx -= fx;
        a.vy -= fy;
        b.vx += fx;
        b.vy += fy;
      }
    }

    edges.forEach((edge) => {
      const a = bySlug.get(edge.a);
      const b = bySlug.get(edge.b);
      if (!a || !b) return;
      const dx = b.x - a.x || 0.01;
      const dy = b.y - a.y || 0.01;
      const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
      const target = 128;
      const force = (distance - target) * 0.0018;
      const fx = (dx / distance) * force;
      const fy = (dy / distance) * force;
      a.vx += fx;
      a.vy += fy;
      b.vx -= fx;
      b.vy -= fy;
    });

    simulation.forEach((node) => {
      node.vx += (centerX - node.x) * 0.0008;
      node.vy += (centerY - node.y) * 0.0012;
      node.vx *= 0.82;
      node.vy *= 0.82;
      node.x = clamp(node.x + node.vx, 76, GRAPH_VIEWBOX.w - 76);
      node.y = clamp(node.y + node.vy, 48, GRAPH_VIEWBOX.h - 48);
    });
  }

  return new Map(
    simulation.map((node) => [
      node.slug,
      { x: Math.round(node.x), y: Math.round(node.y) },
    ])
  );
}

export function buildGraph(projects: ProjectData[]): {
  nodes: GraphNode[];
  edges: GraphEdge[];
} {
  const degree: Record<string, number> = {};
  projects.forEach((project) => (degree[project.slug] = 0));
  const edgeSeeds: EdgeSeed[] = [];

  for (let i = 0; i < projects.length; i++) {
    for (let j = i + 1; j < projects.length; j++) {
      const a = projects[i];
      const b = projects[j];
      const bTags = new Set(b.tags.map((tag) => tag.toLocaleLowerCase()));
      const shared = a.tags.filter((tag) => bTags.has(tag.toLocaleLowerCase()));
      if (shared.length === 0) continue;
      degree[a.slug] += 1;
      degree[b.slug] += 1;
      edgeSeeds.push({ a: a.slug, b: b.slug, sharedTags: shared });
    }
  }

  const positions = calculatePositions(projects, edgeSeeds);
  const maxDegree = Math.max(...Object.values(degree), 1);
  const nodes: GraphNode[] = projects.map((project) => {
    const position = positions.get(project.slug) ?? {
      x: GRAPH_VIEWBOX.w / 2,
      y: GRAPH_VIEWBOX.h / 2,
    };
    const nodeDegree = degree[project.slug];
    const radius = Math.round(
      RADIUS_MIN + (RADIUS_MAX - RADIUS_MIN) * (nodeDegree / maxDegree)
    );
    const onLeft = position.x < GRAPH_VIEWBOX.w / 2;
    return {
      slug: project.slug,
      title: project.title,
      label: readableLabel(project),
      tags: project.tags,
      degree: nodeDegree,
      x: position.x,
      y: position.y,
      r: radius,
      labelDx: onLeft ? -(radius + 7) : radius + 7,
      labelDy: 4,
      labelAnchor: onLeft ? "end" : "start",
    };
  });

  const edges: GraphEdge[] = edgeSeeds.map((edge) => {
    const a = positions.get(edge.a)!;
    const b = positions.get(edge.b)!;
    return {
      ...edge,
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
    };
  });

  return { nodes, edges };
}

export interface YearBlock {
  year: number;
  projects: ProjectData[];
  isGap: boolean;
}

export function groupByYear(projects: ProjectData[]): YearBlock[] {
  const byYear = new Map<number, ProjectData[]>();
  projects.forEach((project) => {
    const year = new Date(project.publishedAt).getFullYear();
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(project);
  });
  const years = Array.from(byYear.keys());
  if (years.length === 0) return [];
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const blocks: YearBlock[] = [];
  for (let year = minYear; year <= maxYear; year++) {
    const list = (byYear.get(year) ?? [])
      .slice()
      .sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
    blocks.push({ year, projects: list, isGap: list.length === 0 });
  }
  return blocks;
}
