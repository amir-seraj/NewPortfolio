/**
 * Visible-text extraction, shared by the classifier's "is this simple
 * enough to type?" heuristics and the parity guard that verifies the
 * converter never drops content.
 *
 * Two kinds of content are compared separately because they have different
 * whitespace semantics:
 *  - "prose": everything rendered as normal text — whitespace-collapsed,
 *    like a browser would render it (and like `alt`/`href` attributes,
 *    which are NOT visible text, are correctly excluded either way).
 *  - "code": the exact (whitespace-preserving) contents of every <pre><code>
 *    block, in document order — compared verbatim, not collapsed, since
 *    indentation inside code is meaningful.
 */
import { type Node, decodeEntities, collapseWhitespace, isElement } from "./parser";

export interface VisibleText {
  prose: string;
  code: string[];
}

export function rawTextOf(node: Node): string {
  if (node.type === "text") return decodeEntities(node.value);
  if (node.tag === "svg") return ""; // icon markup, never visible text
  return node.children.map(rawTextOf).join("");
}

/** Decoded, whitespace-collapsed, trimmed text of a node — for headings/labels. */
export function textOfInline(node: Node): string {
  return collapseWhitespace(rawTextOf(node)).trim();
}

/** Walks a node list, splitting out <pre> code contents from normal prose. */
export function extractVisible(nodes: Node[]): VisibleText {
  const code: string[] = [];
  const proseParts: string[] = [];

  function walk(node: Node): void {
    if (node.type === "text") {
      const t = collapseWhitespace(decodeEntities(node.value));
      if (t.trim() !== "") proseParts.push(t);
      return;
    }
    if (node.tag === "svg") return; // icon paths, not visible text
    if (node.tag === "pre") {
      code.push(rawTextOf(node));
      return;
    }
    for (const child of node.children) walk(child);
  }

  for (const node of nodes) walk(node);

  return { prose: normalizeProse(proseParts.join(" ")), code };
}

export function normalizeProse(text: string): string {
  return collapseWhitespace(text).trim();
}

/** Same shape, for content that already went through the Lexical builder. */
export function extractVisibleFromLexicalNodes(children: unknown[]): string {
  const parts: string[] = [];
  function walk(node: unknown): void {
    if (!node || typeof node !== "object") return;
    const n = node as { type?: string; text?: string; children?: unknown[] };
    if (n.type === "text" && typeof n.text === "string") {
      if (n.text.trim() !== "") parts.push(n.text);
      return;
    }
    if (n.type === "linebreak") return;
    if (Array.isArray(n.children)) {
      for (const c of n.children) walk(c);
    }
  }
  for (const c of children) walk(c);
  return parts.join(" ");
}

export function isSimpleInlineNode(node: Node): boolean {
  if (node.type === "text") return true;
  const inlineTags = new Set(["em", "i", "strong", "b", "a", "br", "code", "span", "sup", "sub"]);
  if (!inlineTags.has(node.tag)) return false;
  return node.children.every(isSimpleInlineNode);
}

/** A <p>/<li> is "simple" if it only contains inline formatting — no nested
 * divs, images, or other block content that would need special handling. */
export function isSimpleBlock(node: Node): boolean {
  if (!isElement(node)) return false;
  if (!["p", "li"].includes(node.tag)) return false;
  return node.children.every(isSimpleInlineNode);
}
