/**
 * Hand-rolled HTML → Lexical JSON builder for Task 17's converter.
 *
 * Shapes below were verified against the actual node classes shipped in
 * this repo's node_modules (not guessed from memory):
 *  - root/paragraph/text: node_modules/lexical/Lexical.dev.mjs (ElementNode /
 *    TextNode base exportJSON) — also matches the hand-written sample
 *    Lexical doc already committed in scripts/seed.ts.
 *  - list/listitem: node_modules/@lexical/list/LexicalList.dev.mjs
 *    (ListNode/ListItemNode exportJSON).
 *  - quote: node_modules/@lexical/rich-text/LexicalRichText.dev.mjs
 *    (QuoteNode — no exportJSON override, so it's the plain ElementNode
 *    shape with type "quote").
 *  - link: node_modules/@payloadcms/richtext-lexical/dist/features/link/nodes/LinkNode.js
 *    — Payload's LinkNode wraps a `fields` object (linkType/url/newTab)
 *    rather than vanilla @lexical/link's flat url/target attributes.
 *  - linebreak: base LexicalNode.exportJSON (type + version only).
 *
 * Text format is a bitmask (IS_BOLD=1, IS_ITALIC=2, IS_CODE=16 — also from
 * Lexical.dev.mjs) so bold+italic just OR together.
 */
import { randomBytes } from "crypto";
import { type Node, type ElementNode, decodeEntities, collapseWhitespace, isElement } from "./parser";

const FORMAT = { BOLD: 1, ITALIC: 2, CODE: 16 } as const;

function objectId(): string {
  return randomBytes(12).toString("hex");
}

type LexicalNode = any;

function textNode(text: string, format = 0): LexicalNode {
  return { type: "text", text, format, version: 1, detail: 0, mode: "normal", style: "" };
}

function linebreakNode(): LexicalNode {
  return { type: "linebreak", version: 1 };
}

function linkNode(children: LexicalNode[], url: string, newTab: boolean): LexicalNode {
  return {
    type: "link",
    format: "",
    indent: 0,
    direction: "ltr",
    children,
    fields: { linkType: "custom", url, newTab },
    id: objectId(),
    version: 3,
  };
}

function elementWrap(type: string, children: LexicalNode[], extra: Record<string, unknown> = {}): LexicalNode {
  return { type, format: "", indent: 0, direction: children.length ? "ltr" : null, version: 1, children, ...extra };
}

/**
 * Builds inline (text-run) Lexical children from a node list, flattening
 * any unexpected nested block content (e.g. a stray <div><p> inside a <li>
 * — seen once, in perfect-posture's "Personas Created" list item) into the
 * same run using a linebreak, rather than failing. No text is ever dropped.
 */
export function buildInline(nodes: Node[], format = 0): LexicalNode[] {
  const out: LexicalNode[] = [];

  for (const node of nodes) {
    if (node.type === "text") {
      const text = collapseWhitespace(decodeEntities(node.value));
      if (text === "") continue;
      out.push(textNode(text, format));
      continue;
    }
    switch (node.tag) {
      case "strong":
      case "b":
        out.push(...buildInline(node.children, format | FORMAT.BOLD));
        break;
      case "em":
      case "i":
        out.push(...buildInline(node.children, format | FORMAT.ITALIC));
        break;
      case "code":
        out.push(...buildInline(node.children, format | FORMAT.CODE));
        break;
      case "span":
        out.push(...buildInline(node.children, format));
        break;
      case "br":
        out.push(linebreakNode());
        break;
      case "a": {
        const inner = buildInline(node.children, format);
        if (inner.length === 0) break; // Payload's LinkNode can't be empty
        out.push(linkNode(inner, node.attrs.href ?? "", node.attrs.target === "_blank"));
        break;
      }
      case "p":
      case "div":
      case "li":
        // Flatten unexpected nested block content onto its own line rather
        // than dropping it.
        if (out.length > 0) out.push(linebreakNode());
        out.push(...buildInline(node.children, format));
        break;
      default:
        out.push(...buildInline(node.children, format));
    }
  }

  // Trim leading/trailing whitespace-only text runs, mirroring how a
  // browser collapses whitespace at the edges of a block of inline content.
  if (out.length > 0 && out[0].type === "text") {
    out[0] = { ...out[0], text: out[0].text.replace(/^ /, "") };
    if (out[0].text === "" && out.length > 1) out.shift();
  }
  const last = out.length - 1;
  if (last >= 0 && out[last]?.type === "text") {
    out[last] = { ...out[last], text: out[last].text.replace(/ $/, "") };
    if (out[last].text === "" && out.length > 1) out.pop();
  }
  return out;
}

function buildListItem(li: ElementNode, value: number): LexicalNode {
  // A nested <ul>/<ol> inside this <li> becomes a nested list node
  // alongside the inline content, matching Lexical's own nesting model.
  const inlineKids: Node[] = [];
  const nested: LexicalNode[] = [];
  for (const child of li.children) {
    if (isElement(child, "ul") || isElement(child, "ol")) {
      nested.push(buildList(child));
    } else {
      inlineKids.push(child);
    }
  }
  const children = [...buildInline(inlineKids), ...nested];
  return { ...elementWrap("listitem", children.length ? children : [textNode("")]), value };
}

function buildList(list: ElementNode): LexicalNode {
  const isOrdered = list.tag === "ol";
  const items = list.children.filter((c): c is ElementNode => isElement(c, "li"));
  const children = items.map((li, idx) => buildListItem(li, idx + 1));
  return elementWrap("list", children, {
    listType: isOrdered ? "number" : "bullet",
    start: 1,
    tag: list.tag,
  });
}

function buildParagraph(p: ElementNode): LexicalNode {
  return elementWrap("paragraph", buildInline(p.children));
}

function buildQuote(bq: ElementNode): LexicalNode {
  return elementWrap("quote", buildInline(bq.children));
}

/**
 * Converts a list of block-level nodes (p/ul/ol/blockquote, optionally
 * wrapped in plain <div>s) into the `children` array of a Lexical root.
 * Stray text or unexpected inline content at this level is wrapped in an
 * implicit paragraph so nothing is silently dropped.
 */
export function buildBlockChildren(nodes: Node[]): LexicalNode[] {
  const out: LexicalNode[] = [];
  let pendingInline: Node[] = [];

  function flushInline(): void {
    if (pendingInline.length === 0) return;
    const inline = buildInline(pendingInline);
    if (inline.length > 0) out.push(elementWrap("paragraph", inline));
    pendingInline = [];
  }

  for (const node of nodes) {
    if (node.type === "text") {
      if (node.value.trim() === "") continue;
      pendingInline.push(node);
      continue;
    }
    switch (node.tag) {
      case "p":
        flushInline();
        out.push(buildParagraph(node));
        break;
      case "ul":
      case "ol":
        flushInline();
        out.push(buildList(node));
        break;
      case "blockquote":
        flushInline();
        out.push(buildQuote(node));
        break;
      case "div":
        flushInline();
        out.push(...buildBlockChildren(node.children));
        break;
      default:
        pendingInline.push(node);
    }
  }
  flushInline();
  return out;
}

export function wrapRichText(children: LexicalNode[]): Record<string, unknown> {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      direction: children.length ? "ltr" : null,
      version: 1,
      children,
    },
  };
}

/** Convenience: block-level nodes straight to a full richText field value. */
export function buildRichText(nodes: Node[]): Record<string, unknown> {
  return wrapRichText(buildBlockChildren(nodes));
}
