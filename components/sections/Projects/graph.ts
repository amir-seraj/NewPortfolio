export interface ProjectData {
  slug: string;
  title: string;
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

export const GRAPH_VIEWBOX = { w: 600, h: 320 };

// Hand-placed for these thirteen known projects: a visual layout only,
// not derived from data. Compact on purpose — this sits beside its detail
// panel, not full-width — with enough room between labels to stay
// readable at that size. Edges and node size below ARE derived from the
// real tags in lib/DataProjects.js, so the diagram can't drift from it.
const LAYOUT: Record<
  string,
  {
    x: number;
    y: number;
    dx: number;
    dy: number;
    anchor: "start" | "middle" | "end";
    label: string;
  }
> = {
  "resilience-ai-mirror-emotional-wellbeing": {
    x: 185,
    y: 175,
    dx: 0,
    dy: 30,
    anchor: "middle",
    label: "reSilence",
  },
  "emotion-recognition-games-dataset": {
    x: 285,
    y: 110,
    dx: 18,
    dy: 4,
    anchor: "start",
    label: "Emotion Rec.",
  },
  "facial-verification": {
    x: 265,
    y: 230,
    dx: 0,
    dy: 27,
    anchor: "middle",
    label: "Facial Verification",
  },
  "ai-image-video-pipeline-framework": {
    x: 100,
    y: 120,
    dx: -16,
    dy: 4,
    anchor: "end",
    label: "AI Pipeline",
  },
  metagoogler: {
    x: 118,
    y: 235,
    dx: -18,
    dy: 4,
    anchor: "end",
    label: "MetaGoogler",
  },
  "est-generic-event-boundary-detector-thesis": {
    x: 285,
    y: 42,
    dx: 0,
    dy: -16,
    anchor: "middle",
    label: "EST Thesis",
  },
  "arts-for-wellbeing": {
    x: 350,
    y: 175,
    dx: 0,
    dy: 27,
    anchor: "middle",
    label: "Arts for Wellbeing",
  },
  "perfect-posture-case-study": {
    x: 86,
    y: 42,
    dx: 0,
    dy: -13,
    anchor: "middle",
    label: "Perfect Posture",
  },
  "unity-at-sea-soundscape-shared-balance": {
    x: 97,
    y: 278,
    dx: 0,
    dy: 20,
    anchor: "middle",
    label: "Unity at Sea",
  },
  shodocode: {
    x: 480,
    y: 105,
    dx: -15,
    dy: 4,
    anchor: "end",
    label: "Shodocode",
  },
  "eth-course-marketplace-blockchain": {
    x: 550,
    y: 48,
    dx: 0,
    dy: -13,
    anchor: "middle",
    label: "Marketplace",
  },
  "jobify-full-stack-job-tracker": {
    x: 550,
    y: 163,
    dx: 0,
    dy: 20,
    anchor: "middle",
    label: "Jobify",
  },
  "ontology-for-hiphop": {
    x: 440,
    y: 255,
    dx: 0,
    dy: 17,
    anchor: "middle",
    label: "Hip-Hop Ontology",
  },
};

const RADIUS_MIN = 7;
const RADIUS_MAX = 15;

export function buildGraph(projects: ProjectData[]): {
  nodes: GraphNode[];
  edges: GraphEdge[];
} {
  const degree: Record<string, number> = {};
  projects.forEach((p) => (degree[p.slug] = 0));
  const edges: GraphEdge[] = [];

  for (let i = 0; i < projects.length; i++) {
    for (let j = i + 1; j < projects.length; j++) {
      const a = projects[i];
      const b = projects[j];
      const shared = a.tags.filter((t) => b.tags.includes(t));
      if (shared.length === 0) continue;
      const pa = LAYOUT[a.slug];
      const pb = LAYOUT[b.slug];
      if (!pa || !pb) continue;
      degree[a.slug] += 1;
      degree[b.slug] += 1;
      edges.push({
        a: a.slug,
        b: b.slug,
        sharedTags: shared,
        x1: pa.x,
        y1: pa.y,
        x2: pb.x,
        y2: pb.y,
      });
    }
  }

  const maxDegree = Math.max(...Object.values(degree), 1);
  const nodes: GraphNode[] = projects
    .filter((p) => LAYOUT[p.slug])
    .map((p) => {
      const pos = LAYOUT[p.slug];
      const deg = degree[p.slug];
      const r = Math.round(
        RADIUS_MIN + (RADIUS_MAX - RADIUS_MIN) * (deg / maxDegree)
      );
      return {
        slug: p.slug,
        title: p.title,
        label: pos.label,
        tags: p.tags,
        degree: deg,
        x: pos.x,
        y: pos.y,
        r,
        labelDx: pos.dx,
        labelDy: pos.dy,
        labelAnchor: pos.anchor,
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
  projects.forEach((p) => {
    const y = new Date(p.publishedAt).getFullYear();
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(p);
  });
  const years = Array.from(byYear.keys());
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const blocks: YearBlock[] = [];
  for (let y = minYear; y <= maxYear; y++) {
    const list = (byYear.get(y) ?? [])
      .slice()
      .sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
    blocks.push({ year: y, projects: list, isGap: list.length === 0 });
  }
  return blocks;
}
