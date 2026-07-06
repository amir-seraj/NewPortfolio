/**
 * Task 17 — converts legacy `projects.body` raw HTML into typed `layout`
 * blocks, for every project whose `layout` is currently empty (idempotent:
 * a project with any blocks already in `layout` is left untouched, so
 * running this twice is a no-op the second time).
 *
 * Every project is verified for text parity (see scripts/convert/parity.ts)
 * BEFORE being written: if the converted blocks don't contain exactly the
 * same visible text, the same code-block contents, and the same image
 * count as the original HTML, that project's `layout` is left empty (the
 * legacy `body` keeps rendering) and the script exits non-zero — content
 * loss is a hard failure, not a warning.
 *
 * Run:
 *   npx payload run scripts/convert-body-to-blocks.ts
 */
import { getPayload } from "payload";
import config from "@payload-config";
import { parseHtml } from "./convert/parser";
import { classifyProject, type LayoutBlock } from "./convert/classify";
import { summarizeOriginal, summarizeBlocks, checkParity } from "./convert/parity";

interface ProjectDoc {
  id: number | string;
  slug: string;
  body?: string | null;
  layout?: LayoutBlock[] | null;
}

async function run(): Promise<void> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({ collection: "projects", limit: 100 });

  let converted = 0;
  let skipped = 0;
  let failed = 0;
  const statRows: string[] = [];

  for (const doc of docs as ProjectDoc[]) {
    if (doc.layout && doc.layout.length > 0) {
      skipped++;
      console.log(`[skip] ${doc.slug}: layout already has ${doc.layout.length} block(s)`);
      continue;
    }

    const html = doc.body ?? "";
    if (html.trim() === "") {
      console.log(`[skip] ${doc.slug}: body is empty, nothing to convert`);
      skipped++;
      continue;
    }

    const nodes = parseHtml(html);
    const { blocks, counts } = classifyProject(nodes, html);

    const original = summarizeOriginal(html);
    const convertedSummary = summarizeBlocks(blocks);
    const parity = checkParity(original, convertedSummary);

    const total = blocks.length;
    const rawCount = counts.RawHtml ?? 0;
    const rawShare = total > 0 ? Math.round((rawCount / total) * 100) : 0;
    const countsStr = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([type, n]) => `${type}:${n}`)
      .join(" ");

    if (!parity.ok) {
      failed++;
      console.error(`[FAIL] ${doc.slug}: parity check failed — layout left empty, legacy body still renders`);
      console.error(parity.diff);
      statRows.push(`${doc.slug} | FAILED PARITY | ${countsStr}`);
      continue;
    }

    await payload.update({ collection: "projects", id: doc.id, data: { layout: blocks } });
    converted++;
    console.log(
      `[ok] ${doc.slug}: ${total} block(s) — ${countsStr} — RawHtml share ${rawShare}% — parity OK (prose ${original.prose.length} chars, ${original.code.length} code block(s), ${original.images} image(s))`
    );
    statRows.push(`${doc.slug} | ${total} blocks (RawHtml ${rawShare}%) | ${countsStr}`);
  }

  console.log("");
  console.log(`Converted ${converted}, skipped ${skipped} (already converted / empty), failed ${failed}.`);
  console.log("");
  console.log("Per-project stats:");
  for (const row of statRows) console.log(`  ${row}`);

  process.exit(failed > 0 ? 1 : 0);
}

// `payload run` exits as soon as this module's dynamic import resolves —
// top-level await keeps the process alive until run() actually finishes.
// See scripts/seed.ts for the original writeup of this constraint.
await run();
