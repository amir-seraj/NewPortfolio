import { getPayload } from "payload";
import config from "@payload-config";
import { writeFileSync } from "fs";

function collectClasses(html: string, classes: Set<string>): void {
  for (const m of html.matchAll(/class="([^"]*)"/g)) {
    m[1].split(/\s+/).filter(Boolean).forEach((c) => classes.add(c));
  }
}

async function run() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({ collection: "projects", limit: 100 });
  const classes = new Set<string>();
  for (const doc of docs as any[]) {
    // Legacy fallback body — still scanned even though it's optional now
    // (Task 17): projects not yet converted, or converted-with-fallback,
    // still render this HTML.
    collectClasses((doc.body as string | null | undefined) ?? "", classes);

    // Task 17: `layout` blocks carry Tailwind classes two ways —
    // RawHtml.html is raw markup (same regex as body), while the seven
    // typed block components carry their classes in JSX source, which
    // Tailwind's own content scanner already sees natively (no DB scan
    // needed for those).
    for (const block of (doc.layout as any[] | null | undefined) ?? []) {
      if (block?.blockType === "RawHtml" && typeof block.html === "string") {
        collectClasses(block.html, classes);
      }
    }
  }
  writeFileSync("lib/body-classes.txt", [...classes].sort().join("\n"));
  console.log(`Extracted ${classes.size} classes to lib/body-classes.txt`);
  process.exit(0);
}

// See scripts/seed.ts for why this must be a top-level `await` rather than
// a fire-and-forget call — `payload run` exits as soon as the dynamic
// import resolves, which otherwise races this function's async work.
await run();
