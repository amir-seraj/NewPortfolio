import { execFileSync } from "node:child_process";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import { pathToFileURL } from "node:url";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const repositoryRoot = process.cwd();
const sourceRevision = "59f4ff6^:lib/DataProjects.js";

const displayMetadata = {
  "perfect-posture-case-study": {
    shortTitle: "Perfect Posture",
    kind: "HCI case study",
    featuredOrder: 3,
  },
  "unity-at-sea-soundscape-shared-balance": {
    shortTitle: "Unity at Sea",
    kind: "Interactive installation",
    featuredOrder: 2,
  },
  "resilience-ai-mirror-emotional-wellbeing": {
    shortTitle: "reSilence",
    kind: "Affective installation",
    featuredOrder: 1,
  },
  "ontology-for-hiphop": {
    shortTitle: "Hip-Hop Ontology",
    kind: "Knowledge design",
  },
  "eth-course-marketplace-blockchain": {
    shortTitle: "Course Marketplace",
    kind: "Web3 capstone",
  },
  "jobify-full-stack-job-tracker": {
    shortTitle: "Jobify",
    kind: "Full-stack application",
  },
  "emotion-recognition-games-dataset": {
    shortTitle: "Emotion Recognition",
    kind: "Research dataset",
  },
  "facial-verification": {
    shortTitle: "Facial Verification",
    kind: "Computer vision",
  },
  "arts-for-wellbeing": {
    shortTitle: "Arts for Wellbeing",
    kind: "Research project",
  },
  "ai-image-video-pipeline-framework": {
    shortTitle: "AI Media Pipeline",
    kind: "AI framework",
  },
  metagoogler: {
    shortTitle: "MetaGoogler",
    kind: "Desktop application",
  },
  shodocode: {
    shortTitle: "Shodocode",
    kind: "Learning product",
  },
  "est-generic-event-boundary-detector-thesis": {
    shortTitle: "EST Thesis",
    kind: "MSc thesis",
  },
};

function yamlString(value) {
  return JSON.stringify(value);
}

function serializeProject(project, coverImage, metadata) {
  return [
    `title: ${yamlString(project.title)}`,
    `shortTitle: ${yamlString(metadata.shortTitle)}`,
    `kind: ${yamlString(metadata.kind)}`,
    `description: ${yamlString(project.description)}`,
    "tags:",
    ...project.tags.map((tag) => `  - ${yamlString(tag)}`),
    `featured: ${Boolean(metadata.featuredOrder)}`,
    `featuredOrder: ${metadata.featuredOrder ?? 0}`,
    `publishedAt: ${yamlString(project.publishedAt)}`,
    `readTime: ${Number.parseInt(project.readTime, 10)}`,
    `coverImage: ${yamlString(coverImage)}`,
    "",
  ].join("\n");
}

function createTurndownService() {
  const service = new TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "_",
  });
  service.use(gfm);
  service.remove(["script", "style", "svg"]);
  service.addRule("embedded-media", {
    filter: ["iframe", "video", "audio"],
    replacement(_content, node) {
      const source =
        node.getAttribute("src") ??
        node.querySelector?.("source")?.getAttribute("src");
      return source ? `\n\n[Open embedded media](${source})\n\n` : "";
    },
  });
  return service;
}

function toMarkdoc(html, service) {
  return `${service
    .turndown(html)
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()}\n`;
}

async function materializeBodyImages(markdoc, slug) {
  const imagePattern = /!\[[^\]]*\]\((\/images\/[^)\s]+)/g;
  const replacements = new Map();
  const imageDirectory = join(
    repositoryRoot,
    "public",
    "images",
    "project-content",
    slug
  );

  for (const match of markdoc.matchAll(imagePattern)) {
    const source = match[1];
    if (replacements.has(source)) continue;
    const filename = basename(source);
    const destinationUrl = `/images/project-content/${slug}/${filename}`;
    await mkdir(imageDirectory, { recursive: true });
    await copyFile(
      join(repositoryRoot, "public", source.replace(/^\//, "")),
      join(imageDirectory, filename)
    );
    replacements.set(source, destinationUrl);
  }

  return markdoc.replace(imagePattern, (match, source) =>
    match.replace(source, replacements.get(source) ?? source)
  );
}

async function materializeCover(project) {
  const source = project.coverImage;
  const isRemote = /^https?:\/\//.test(source);
  const extension = isRemote ? ".png" : extname(source) || ".png";
  const imageDirectory = join(
    repositoryRoot,
    "public",
    "images",
    "projects",
    project.slug
  );
  const destination = join(imageDirectory, `coverImage${extension}`);
  await mkdir(imageDirectory, { recursive: true });

  if (isRemote) {
    const response = await fetch(source);
    if (!response.ok) {
      throw new Error(`Could not download ${source}: ${response.status}`);
    }
    await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  } else {
    const sourceFile = join(
      repositoryRoot,
      "public",
      source.replace(/^\//, "")
    );
    await copyFile(sourceFile, destination);
  }

  return `/images/projects/${project.slug}/coverImage${extension}`;
}

async function main() {
  const source = execFileSync("git", ["show", sourceRevision], {
    cwd: repositoryRoot,
    encoding: "utf8",
  });
  const sourceModule = await import(
    `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
  );
  const projects = sourceModule.default;
  const turndown = createTurndownService();

  for (const project of projects) {
    const metadata = displayMetadata[project.slug];
    if (!metadata) throw new Error(`Missing display metadata for ${project.slug}`);

    const projectDirectory = join(
      repositoryRoot,
      "content",
      "projects",
      project.slug
    );
    await mkdir(projectDirectory, { recursive: true });
    const coverImage = await materializeCover(project);
    const body = await materializeBodyImages(
      toMarkdoc(project.body, turndown),
      project.slug
    );
    await Promise.all([
      writeFile(
        join(projectDirectory, "index.yaml"),
        serializeProject(project, coverImage, metadata)
      ),
      writeFile(
        join(projectDirectory, "body.mdoc"),
        body
      ),
    ]);
  }

  console.log(`Restored ${projects.length} projects from ${sourceRevision}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
