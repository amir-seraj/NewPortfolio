/**
 * Parity guard for the body → blocks converter: proves the converter never
 * drops content by comparing visible text (and exact code-block text, and
 * image counts) between the original HTML and the resulting blocks.
 */
import { parseHtml } from "./parser";
import { extractVisible, extractVisibleFromLexicalNodes, normalizeProse } from "./text";
import type { LayoutBlock } from "./classify";

export interface VisibleSummary {
  prose: string;
  code: string[];
  images: number;
}

export function summarizeOriginal(html: string): VisibleSummary {
  const nodes = parseHtml(html);
  const { prose, code } = extractVisible(nodes);
  const images = (html.match(/<img\b/gi) ?? []).length;
  return { prose, code, images };
}

function bodyChildren(body: unknown): unknown[] {
  if (!body || typeof body !== "object") return [];
  const root = (body as { root?: { children?: unknown[] } }).root;
  return root?.children ?? [];
}

export function summarizeBlocks(blocks: LayoutBlock[]): VisibleSummary {
  const proseParts: string[] = [];
  const code: string[] = [];
  let images = 0;

  for (const b of blocks) {
    switch (b.blockType) {
      case "ResultBanner":
        proseParts.push(b.heading ?? "");
        for (const p of b.paragraphs ?? []) proseParts.push(p.text ?? "");
        for (const c of b.chips ?? []) proseParts.push(c.label ?? "");
        break;
      case "SectionHeading":
        proseParts.push(b.text ?? "");
        break;
      case "RichBody":
        proseParts.push(extractVisibleFromLexicalNodes(bodyChildren(b.body)));
        break;
      case "Callout":
        if (b.heading) proseParts.push(b.heading);
        proseParts.push(extractVisibleFromLexicalNodes(bodyChildren(b.body)));
        break;
      case "IterationCard":
        proseParts.push(b.heading ?? "");
        if (b.body) proseParts.push(extractVisibleFromLexicalNodes(bodyChildren(b.body)));
        images += (b.images ?? []).length;
        break;
      case "ImageGrid":
        images += (b.images ?? []).length;
        break;
      case "CodeSnippet":
        code.push(b.code ?? "");
        break;
      case "RawHtml": {
        const html: string = b.html ?? "";
        const sub = extractVisible(parseHtml(html));
        proseParts.push(sub.prose);
        code.push(...sub.code);
        images += (html.match(/<img\b/gi) ?? []).length;
        break;
      }
      default:
        break;
    }
  }

  return { prose: normalizeProse(proseParts.join(" ")), code, images };
}

export interface ParityResult {
  ok: boolean;
  diff?: string;
}

function firstDiffIndex(a: string, b: string): number {
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) if (a[i] !== b[i]) return i;
  return len;
}

function context(a: string, b: string): string {
  const idx = firstDiffIndex(a, b);
  const start = Math.max(0, idx - 50);
  return [
    `    first diff at char ${idx} (original len ${a.length}, converted len ${b.length})`,
    `    original : …${JSON.stringify(a.slice(start, idx + 50))}…`,
    `    converted: …${JSON.stringify(b.slice(start, idx + 50))}…`,
  ].join("\n");
}

export function checkParity(original: VisibleSummary, converted: VisibleSummary): ParityResult {
  if (original.prose !== converted.prose) {
    return { ok: false, diff: `  prose mismatch:\n${context(original.prose, converted.prose)}` };
  }
  if (original.code.length !== converted.code.length || original.code.some((c, i) => c !== converted.code[i])) {
    return {
      ok: false,
      diff: `  code block mismatch: original had ${original.code.length} block(s), converted has ${converted.code.length}\n${original.code
        .map((c, i) => (c !== converted.code[i] ? `    [${i}]\n${context(c, converted.code[i] ?? "")}` : ""))
        .filter(Boolean)
        .join("\n")}`,
    };
  }
  if (original.images !== converted.images) {
    return { ok: false, diff: `  image count mismatch: original had ${original.images}, converted has ${converted.images}` };
  }
  return { ok: true };
}
