import { getPayload } from "payload";
import config from "@payload-config";
import { writeFileSync } from "fs";

async function run() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({ collection: "projects", limit: 100 });
  const classes = new Set<string>();
  for (const doc of docs as any[]) {
    for (const m of (doc.body as string).matchAll(/class="([^"]*)"/g)) {
      m[1].split(/\s+/).filter(Boolean).forEach((c) => classes.add(c));
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
