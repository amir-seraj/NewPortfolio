/**
 * Top-level HTML → typed-block classifier (Task 17).
 *
 * Governing rule, applied uniformly everywhere below: a structure becomes a
 * typed block only when it unambiguously matches one of the seven shapes;
 * anything else — including a "confidence downgrade" case like a grid whose
 * cells don't *all* type cleanly — falls back to `RawHtml`, verbatim, via
 * `rawOf()` (an exact source slice, never a re-serialization). That fallback
 * is deliberate, not a bug: see the Task 17 report for the per-project
 * RawHtml share this produces and why.
 *
 * Two specific judgment calls worth flagging up front:
 *  - Grids: a `<div class="grid ...">` only unwraps into N separate blocks
 *    (stacked, losing the side-by-side arrangement) when *every* cell types
 *    cleanly. If even one cell doesn't, the whole row stays one RawHtml
 *    block so the visual grid is preserved exactly. A plain `space-y-*`
 *    wrapper (already a vertical stack) always unwraps — there's no
 *    side-by-side layout to lose.
 *  - `ResultBanner.paragraphs` is plain text (a `textarea` array, per the
 *    approved design), so a paragraph that was entirely wrapped in
 *    `<em>`/`<strong>` (the closing "reflection" banners) loses that
 *    emphasis. No text is lost — see scripts/convert/text.ts for the
 *    parity guard that verifies exactly that.
 */
import {
  type Node,
  type ElementNode,
  isElement,
  significantChildren,
  rawOf,
  hasUndecodedEntities,
} from "./parser";
import { buildRichText } from "./lexical";
import { extractVisible, rawTextOf, textOfInline } from "./text";

export type LayoutBlock = { blockType: string } & Record<string, any>;

/** Low-confidence guard: if a node's decoded visible text still contains
 * something entity-shaped, our NAMED_ENTITIES table doesn't know it — a
 * typed block would render the literal "&whatever;" to readers, while a
 * RawHtml fallback lets the browser (which knows every entity) decode it
 * correctly. So such sections always fall back to RawHtml, verbatim. */
function proseHasUndecodedEntities(node: ElementNode): boolean {
  return hasUndecodedEntities(extractVisible([node]).prose);
}

function imgField(node: ElementNode): { src: string; alt: string } {
  return { src: node.attrs.src ?? "", alt: node.attrs.alt ?? "" };
}

function gridColumns(cls: string): string {
  const m = /grid-cols-(\d)/.exec(cls);
  return m ? m[1] : "2";
}

/** True if a node (or any descendant) is something none of our block bodies
 * can represent: images, icons, code, tables, or a nested colored/grid box. */
function hasComplexDescendant(node: Node): boolean {
  if (node.type === "text") return false;
  if (["img", "svg", "pre", "table"].includes(node.tag)) return true;
  if (node.tag === "div" && (/\bbg-/.test(node.attrs.class ?? "") || /\bgrid\b/.test(node.attrs.class ?? ""))) {
    return true;
  }
  return node.children.some(hasComplexDescendant);
}

/** A bare, unstyled <div> (no bg-, no complex content) used purely to
 * group an h4 + list — e.g. resilience-ai's "Core Technical Components"
 * sub-cards. Safe to flatten into a card's body. */
function isBareTextSubcard(node: Node): boolean {
  if (!isElement(node, "div")) return false;
  if (/\bbg-/.test(node.attrs.class ?? "")) return false;
  return !hasComplexDescendant(node);
}

/** A grid cell that can be flattened into a card's body without losing
 * anything: either a bare text subcard (div wrapping a heading+list) or a
 * plain p/ul/ol/blockquote sitting directly in the grid (e.g. two <ul>s
 * side by side, no wrapping <div> at all — common in jobify/ontology). */
function isFlattenableGridCell(node: Node): boolean {
  if (isBareTextSubcard(node)) return true;
  if (!isElement(node)) return false;
  if (!["p", "ul", "ol", "blockquote"].includes(node.tag)) return false;
  return !hasComplexDescendant(node);
}

const RESULT_BANNER_TONES: Record<string, string> = {
  "mango-600|mango-700": "mango",
  "mango-600|mango-800": "mango-deep",
  "green-500|blue-600": "green",
  "indigo-500|purple-600": "indigo",
  "orange-500|red-600": "orange",
  "blue-500|purple-600": "blue",
  "purple-500|pink-600": "purple",
};

function tryResultBanner(node: ElementNode): LayoutBlock | null {
  const cls = node.attrs.class ?? "";
  if (!cls.includes("bg-gradient-to-r") || !cls.includes("text-white")) return null;
  const fromM = /\bfrom-([a-z]+-\d+)\b/.exec(cls);
  const toM = /\bto-([a-z]+-\d+)\b/.exec(cls);
  if (!fromM || !toM) return null;
  const tone = RESULT_BANNER_TONES[`${fromM[1]}|${toM[1]}`];
  if (!tone) return null; // unrecognized gradient — not confident enough to type

  const kids = significantChildren(node);
  if (kids.length === 0 || !isElement(kids[0]) || !["h2", "h3"].includes((kids[0] as ElementNode).tag)) {
    return null;
  }
  const heading = textOfInline(kids[0]);
  const paragraphs: { text: string }[] = [];
  let chips: { label: string }[] = [];

  for (const k of kids.slice(1)) {
    if (!isElement(k)) continue;
    if (k.tag === "p") {
      paragraphs.push({ text: textOfInline(k) });
    } else if (k.tag === "div") {
      const spanKids = significantChildren(k).filter((c) => isElement(c, "span")) as ElementNode[];
      const allSpans = significantChildren(k).length > 0 && significantChildren(k).every((c) => isElement(c, "span"));
      if (!allSpans) return null; // unexpected nested content — bail
      chips = spanKids.map((s) => ({ label: textOfInline(s) }));
    } else {
      return null;
    }
  }

  return { blockType: "ResultBanner", heading, paragraphs, chips, tone };
}

const CALLOUT_TONE_BY_COLOR: Record<string, string> = {
  blue: "info",
  indigo: "info",
  mango: "info",
  purple: "info",
  green: "success",
  yellow: "warning",
  orange: "warning",
  red: "warning",
  gray: "neutral",
};

function tryCallout(node: ElementNode): LayoutBlock | null {
  const cls = node.attrs.class ?? "";
  if (cls.includes("bg-gradient-to") || cls.includes("bg-white")) return null;
  const colorM = /\bbg-([a-z]+)-(?:50|100|800|900)\b/.exec(cls);
  if (!colorM) return null;
  const tone = CALLOUT_TONE_BY_COLOR[colorM[1]];
  if (!tone) return null;

  const kids = significantChildren(node);
  if (kids.length === 0) return null;
  if (
    kids.some(
      (k) => !isElement(k) || !["h3", "h4", "p", "blockquote", "ul", "ol"].includes((k as ElementNode).tag)
    )
  ) {
    return null;
  }
  if (kids.some(hasComplexDescendant)) return null;

  const headingNode =
    isElement(kids[0]) && ["h3", "h4"].includes((kids[0] as ElementNode).tag) ? (kids[0] as ElementNode) : undefined;
  const bodyNodes = headingNode ? kids.slice(1) : kids;
  if (bodyNodes.length === 0) return null;

  return {
    blockType: "Callout",
    tone,
    heading: headingNode ? textOfInline(headingNode) : undefined,
    body: buildRichText(bodyNodes),
  };
}

function tryIterationCard(node: ElementNode): LayoutBlock | null {
  const cls = node.attrs.class ?? "";
  if (cls.includes("bg-gradient-to")) return null;
  const looksCardish = /\bbg-(white|gray-50)\b/.test(cls) && /\brounded/.test(cls);
  if (!looksCardish) return null;

  const kids = significantChildren(node);
  if (kids.length === 0 || !isElement(kids[0]) || !["h3", "h4"].includes((kids[0] as ElementNode).tag)) {
    return null;
  }
  const heading = textOfInline(kids[0]);

  const images: { src: string; alt: string }[] = [];
  const bodyNodes: Node[] = [];
  let colsHint: string | undefined;

  for (const k of kids.slice(1)) {
    if (!isElement(k)) continue;
    if (k.tag === "img") {
      images.push(imgField(k));
      continue;
    }
    if (k.tag === "div") {
      const dCls = k.attrs.class ?? "";
      const dKids = significantChildren(k);
      const allImgs = dKids.length > 0 && dKids.every((c) => isElement(c, "img"));
      if (allImgs) {
        images.push(...(dKids as ElementNode[]).map(imgField));
        const gm = /grid-cols-(\d)/.exec(dCls);
        if (gm) colsHint = gm[1];
      } else if (dCls.includes("grid") && dKids.length > 0 && dKids.every(isFlattenableGridCell)) {
        for (const sub of dKids as ElementNode[]) {
          bodyNodes.push(...(sub.tag === "div" ? significantChildren(sub) : [sub]));
        }
      } else {
        return null; // nested colored sub-box etc — too complex, bail whole card
      }
      continue;
    }
    if (["p", "ul", "ol", "blockquote"].includes(k.tag)) {
      if (hasComplexDescendant(k)) return null;
      bodyNodes.push(k);
      continue;
    }
    return null;
  }

  return {
    blockType: "IterationCard",
    heading,
    body: bodyNodes.length ? buildRichText(bodyNodes) : undefined,
    images,
    columns: colsHint ?? (images.length >= 3 ? "3" : "2"),
  };
}

function tryImageGrid(node: ElementNode): LayoutBlock | null {
  const cls = node.attrs.class ?? "";
  if (!cls.includes("grid")) return null;
  const kids = significantChildren(node);
  if (kids.length === 0 || !kids.every((k) => isElement(k, "img"))) return null;
  return { blockType: "ImageGrid", images: (kids as ElementNode[]).map(imgField), columns: gridColumns(cls) };
}

function trySingleImageDiv(node: ElementNode): LayoutBlock | null {
  const kids = significantChildren(node);
  if (kids.length === 1 && isElement(kids[0], "img")) {
    return { blockType: "ImageGrid", images: [imgField(kids[0] as ElementNode)], columns: "1" };
  }
  return null;
}

function guessLanguage(code: string): string {
  if (/^\s*(def |import |from \S+ import)/.test(code)) return "python";
  if (/pragma solidity|^\s*(enum|struct)\s+\w+\s*\{/.test(code)) return "solidity";
  if (/=>|const |function |describe\(/.test(code)) return "javascript";
  return "text";
}

function codeSnippetBlock(pre: ElementNode): LayoutBlock {
  const codeChild = pre.children.find((c) => isElement(c, "code")) as ElementNode | undefined;
  const code = rawTextOf(codeChild ?? pre);
  return { blockType: "CodeSnippet", language: guessLanguage(code), code };
}

function rawHtmlBlock(node: ElementNode, source: string): LayoutBlock {
  return { blockType: "RawHtml", html: rawOf(source, node) };
}

const LAYOUT_ONLY_DISQUALIFIERS = /\bbg-|gradient|shadow|\brounded/;

/** Classifies one top-level <div>. Always returns 1+ blocks (never fails —
 * the final fallback is a verbatim RawHtml block). */
function classifyDiv(node: ElementNode, source: string): LayoutBlock[] {
  // Entity-decode guard (see proseHasUndecodedEntities): anything our
  // decoder can't fully decode stays RawHtml so the browser decodes it.
  if (proseHasUndecodedEntities(node)) return [rawHtmlBlock(node, source)];

  const banner = tryResultBanner(node);
  if (banner) return [banner];
  const card = tryIterationCard(node);
  if (card) return [card];
  const callout = tryCallout(node);
  if (callout) return [callout];
  const imgGrid = tryImageGrid(node);
  if (imgGrid) return [imgGrid];
  const single = trySingleImageDiv(node);
  if (single) return [single];

  const cls = node.attrs.class ?? "";
  const kids = significantChildren(node);
  const isLayoutOnly = !LAYOUT_ONLY_DISQUALIFIERS.test(cls);

  if (isLayoutOnly && kids.length > 0 && kids.every((k) => isElement(k, "div"))) {
    const elKids = kids as ElementNode[];
    const isGrid = /\bgrid\b/.test(cls);
    const childResults = elKids.map((k) => classifyDiv(k, source));
    const allSingleTyped = childResults.every((r) => r.length === 1 && r[0].blockType !== "RawHtml");
    // A `space-y-*` wrapper is already a vertical stack, so unwrapping is
    // free. A `grid` wrapper only unwraps when every cell types cleanly —
    // otherwise stacking would visibly break an intentional side-by-side
    // layout, so the whole row stays one RawHtml block instead.
    if (!isGrid || allSingleTyped) {
      return childResults.flat();
    }
  }

  return [rawHtmlBlock(node, source)];
}

function isSimpleTopLevelProse(node: Node): boolean {
  if (!isElement(node)) return false;
  if (!["p", "ul", "ol", "blockquote"].includes(node.tag)) return false;
  return !hasComplexDescendant(node);
}

export interface ClassifyResult {
  blocks: LayoutBlock[];
  counts: Record<string, number>;
}

export function classifyProject(nodes: Node[], source: string): ClassifyResult {
  const elements = nodes.filter((n): n is ElementNode => isElement(n));
  const blocks: LayoutBlock[] = [];
  let pending: Node[] = [];

  const push = (block: LayoutBlock) => blocks.push(block);

  function flushRichBody(): void {
    if (pending.length === 0) return;
    push({ blockType: "RichBody", body: buildRichText(pending) });
    pending = [];
  }

  for (const node of elements) {
    if (isSimpleTopLevelProse(node) && !proseHasUndecodedEntities(node)) {
      pending.push(node);
      continue;
    }
    flushRichBody();

    // Entity-decode guard, same rule as classifyDiv: any section whose
    // decoded text still looks entity-shaped is low-confidence → RawHtml.
    if (isElement(node, "h2") || isElement(node, "h3")) {
      if (proseHasUndecodedEntities(node)) {
        push(rawHtmlBlock(node, source));
      } else {
        push({ blockType: "SectionHeading", text: textOfInline(node), level: node.tag });
      }
      continue;
    }
    if (isElement(node, "div")) {
      for (const b of classifyDiv(node, source)) push(b);
      continue;
    }
    if (isElement(node, "pre")) {
      // Same guard for code: unknown entities inside <pre><code> would
      // stay literal in a CodeSnippet but be decoded by the browser in
      // RawHtml — fall back when in doubt.
      if (hasUndecodedEntities(rawTextOf(node))) {
        push(rawHtmlBlock(node, source));
      } else {
        push(codeSnippetBlock(node));
      }
      continue;
    }
    // Anything else at the top level (stray img/table/svg/heading level)
    // that we don't have an explicit rule for — verbatim fallback.
    push(rawHtmlBlock(node, source));
  }
  flushRichBody();

  const counts: Record<string, number> = {};
  for (const b of blocks) counts[b.blockType] = (counts[b.blockType] ?? 0) + 1;

  return { blocks, counts };
}
