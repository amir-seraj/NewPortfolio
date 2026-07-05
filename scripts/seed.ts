import { existsSync } from "fs";
import { getPayload } from "payload";
import config from "@payload-config";

async function run() {
  const payload = await getPayload({ config });

  // --- projects: upsert by slug ---
  // `lib/DataProjects.js` is deleted at the end of this task (Step 7 of the
  // brief) once its content lives in Postgres. Guard the import so this
  // script still seeds globals + a sample post on a fresh clone that never
  // had the file.
  const dataProjectsPath = "lib/DataProjects.js";
  if (existsSync(dataProjectsPath)) {
    // @ts-ignore — plain JS data module
    const { default: allprojects } = await import("../lib/DataProjects.js");

    for (const p of allprojects as any[]) {
      const existing = await payload.find({
        collection: "projects",
        where: { slug: { equals: p.slug } },
        limit: 1,
      });
      const data = {
        title: p.title,
        slug: p.slug,
        tags: (p.tags ?? []).map((t: string) => ({ tag: t })),
        description: p.description,
        body: p.body,
        coverImage: p.coverImage,
        socialImage: p.socialImage,
        publishedAt: p.publishedAt,
        readTime: p.readTime,
      };
      if (existing.docs[0]) {
        await payload.update({ collection: "projects", id: existing.docs[0].id, data });
      } else {
        await payload.create({ collection: "projects", data });
      }
    }

    // --- parity check ---
    const { totalDocs, docs } = await payload.find({ collection: "projects", limit: 100 });
    const dbSlugs = new Set(docs.map((d: any) => d.slug));
    const srcSlugs = (allprojects as any[]).map((p) => p.slug);
    const missing = srcSlugs.filter((s) => !dbSlugs.has(s));
    if (totalDocs !== srcSlugs.length || missing.length) {
      console.error("PARITY FAIL", { totalDocs, expected: srcSlugs.length, missing });
      process.exit(1);
    }
    console.log(`Parity OK: ${totalDocs} projects`);
  } else {
    console.log(`${dataProjectsPath} not found — skipping project seed (fresh clone, already migrated).`);
  }

  // --- home global (copy extracted from Hero.tsx / About.tsx / GetInTouch.tsx) ---
  await payload.updateGlobal({
    slug: "home",
    data: {
      hero: {
        lines: [
          { text: "Machines can learn", accent: false },
          { text: "to notice people.", accent: false },
          { text: "I teach them.", accent: true },
        ],
        ctaLabel: "See the evidence",
        ctaHref: "#work",
        strip: [
          { item: "Affective computing" },
          { item: "Emotion recognition" },
          { item: "Interactive art" },
          { item: "MSc HCI · Genova" },
        ],
      },
      // Real About.tsx copy (task-8-report.md "about" contract: heading +
      // lead paragraph + numeric stats — no skills list).
      about: {
        heading: "Who's asking",
        paragraphs: [
          {
            text: "Engineer's training. Researcher's questions. Three shipped systems that read emotion, posture and balance, and answer well. If software is going to watch people anyway, it should learn some manners; mine do.",
          },
        ],
        stats: [
          { value: 13, label: "projects shipped, 2023 to 2026" },
          { value: 2, label: "installations exhibited in 2024" },
          { value: 1, label: "mirror that reads faces" },
        ],
      },
      contact: { kicker: "One address. No form." },
    },
  });

  // --- settings global ---
  await payload.updateGlobal({
    slug: "settings",
    data: {
      siteName: "Amir Seraj",
      siteUrl: "https://amirseraj.ir",
      defaultDescription:
        "Machines can learn to notice people — I teach them. Affective computing, emotion recognition and interactive systems. MSc HCI, Genova.",
      defaultOgImage: "/images/banner.jpg",
      email: "amirseraj.ir@gmail.com",
      twitterHandle: "@amirseraj",
    },
  });

  // --- sample post (only if no posts exist) ---
  const posts = await payload.find({ collection: "posts", limit: 1 });
  if (posts.totalDocs === 0) {
    await payload.create({
      collection: "posts",
      draft: false,
      data: {
        title: "Hello, blog",
        slug: "hello-blog",
        publishedAt: new Date().toISOString(),
        excerpt: "First post — the CMS works.",
        _status: "published",
        body: {
          root: {
            type: "root", format: "", indent: 0, version: 1, direction: "ltr",
            children: [
              {
                type: "paragraph", format: "", indent: 0, version: 1, direction: "ltr",
                children: [{ type: "text", text: "This post was created by the seed script. Edit or delete it in /admin.", format: 0, version: 1, detail: 0, mode: "normal", style: "" }],
              },
            ],
          },
        },
      },
    });
  }

  console.log("Seed complete");
  process.exit(0);
}

// `payload run <script>` dynamically imports this module and calls
// process.exit(0) as soon as that import's promise resolves — which happens
// as soon as the module finishes *synchronous* evaluation, not when a
// fire-and-forget `run()` call's internal promise settles. A plain `run();`
// here raced Payload's own exit and killed the process before any of the
// async work (or its console.log/process.exit calls) ran — reproduced with
// zero output. Top-level `await` makes the dynamic import itself wait for
// this promise, so the process only exits after `run()` actually finishes.
await run();
