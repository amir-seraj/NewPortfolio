/**
 * Migrate legacy accent color classes inside CMS project `body` HTML
 * (Task 14, debt #3 — the Task 13 teal→mango swap covered components, but
 * project bodies authored in the DB still carry teal/emerald classes).
 *
 * What it does
 * ------------
 * Rewrites Tailwind color utilities **inside `class="..."` attributes only**
 * (never prose text) for every doc in the `projects` collection:
 *
 *   teal-<stop>    -> mango-<stop>   (accent hue: follows the brand accent)
 *   emerald-<stop> -> mango-<stop>   (emerald was teal's sibling accent)
 *
 * Exception (documented judgment call): `from-teal-500` / `from-teal-600`
 * appear only as gradient banner surfaces that carry white text. A literal
 * stop-for-stop swap to mango-500 (#F5800A) would put white text on a
 * 2.2:1 surface — worse than the teal it replaces. Those two map to
 * mango-600 (#AB5907, 4.7:1 with white) so the migrated content clears the
 * same WCAG AA bar the component swap was held to (scripts/check-contrast.mjs).
 *
 * Deliberately left alone: blue/purple/indigo/green/red/yellow/orange/gray
 * classes. Those are semantic info/warning/example boxes in the case-study
 * prose, not brand accent usage — recoloring them all mango would flatten
 * meaning (see PRODUCT.md "Honest signals").
 *
 * One carve-out to that rule: blue gradient stops that live in the SAME
 * class attribute as a teal stop (`from-teal-500 to-blue-600`,
 * `from-teal-100 to-blue-100`). There the blue is half of the old teal→blue
 * accent gradient, not an info box; leaving it produces an orange→blue
 * banner that reads as a bug. Those companion stops move onto the mango
 * ramp (one stop darker/lighter than the `from`, so the gradient keeps its
 * direction).
 *
 * Idempotent: the rewrite only matches teal/emerald tokens; a second run
 * finds nothing to change and writes nothing.
 *
 * Run (dev DB — DATABASE_URL from .env.local):
 *   npx payload run scripts/migrate-body-colors.ts -- --dry   # report only
 *   npx payload run scripts/migrate-body-colors.ts            # apply
 */
import { getPayload } from "payload";
import config from "@payload-config";

const DRY = process.argv.includes("--dry");

/** stop-for-stop hue swap, with the contrast exception described above */
function migrateClassList(cls: string): string {
  // Companion blue stops inside a teal gradient (see header carve-out).
  if (/\b(?:from|via|to)-(?:teal|emerald)-\d/.test(cls)) {
    cls = cls
      .replace(/\bto-blue-600\b/g, "to-mango-800")
      .replace(/\bto-blue-100\b/g, "to-mango-200")
      .replace(/\bdark:to-blue-900\/30\b/g, "dark:to-mango-950/30");
  }
  return cls
    // white text sits on these gradient stops — darken to keep AA (see header)
    .replace(/\bfrom-teal-(500|600)\b/g, "from-mango-600")
    .replace(/\b(teal|emerald)-(\d{2,3})\b/g, "mango-$2");
}

function migrateBody(html: string): string {
  return html.replace(
    /class="([^"]*)"/g,
    (_m, cls: string) => `class="${migrateClassList(cls)}"`
  );
}

async function run() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({ collection: "projects", limit: 100 });

  let changed = 0;
  for (const doc of docs as { id: number | string; slug: string; body: string }[]) {
    const before = doc.body ?? "";
    const after = migrateBody(before);
    if (after === before) continue;
    changed++;

    const hits = [...before.matchAll(/\b(?:teal|emerald)-\d{2,3}(?:\/\d+)?\b/g)].map(
      (m) => m[0]
    );
    const counts = hits.reduce<Record<string, number>>((acc, h) => {
      acc[h] = (acc[h] ?? 0) + 1;
      return acc;
    }, {});
    console.log(`${DRY ? "[dry] " : ""}${doc.slug}:`);
    for (const [token, n] of Object.entries(counts).sort()) {
      console.log(`  ${token} ×${n}`);
    }

    if (!DRY) {
      await payload.update({
        collection: "projects",
        id: doc.id,
        data: { body: after },
      });
    }
  }

  console.log(
    `${DRY ? "[dry] " : ""}${changed}/${docs.length} project bodies ${
      DRY ? "would change" : "updated"
    }.`
  );
  process.exit(0);
}

// Top-level await: `payload run` exits when the dynamic import resolves —
// same constraint as scripts/seed.ts / scripts/extract-body-classes.ts.
await run();
