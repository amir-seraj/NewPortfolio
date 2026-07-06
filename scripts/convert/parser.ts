/**
 * Minimal, scoped HTML parser for Task 17's body → blocks converter.
 *
 * This is NOT a general HTML5 parser. It only needs to handle the specific,
 * consistently-authored HTML subset found in the 13 `projects.body` values
 * (div/p/ul/ol/li/h2-h5/img/a/strong/em/b/i/code/pre/span/blockquote/br/svg,
 * always double-quoted attributes, no raw `>` inside attribute values). Given
 * that guarantee, a hand-rolled tag-stack parser is far less risk than a new
 * dependency (explicitly disallowed) or a fragile giant regex.
 */

export interface TextNode {
  type: "text";
  value: string;
}

export interface ElementNode {
  type: "element";
  tag: string;
  attrs: Record<string, string>;
  children: Node[];
  /** Byte offsets into the original source string this node was parsed
   * from — lets RawHtml fallback recover the exact original markup
   * (verbatim, not a re-serialization) for any node. */
  start: number;
  end: number;
}

export type Node = TextNode | ElementNode;

const VOID_TAGS = new Set([
  "img",
  "br",
  "hr",
  "input",
  "meta",
  "link",
  "source",
  "col",
  "area",
  "base",
]);

const RAW_TEXT_TAGS = new Set(["script", "style"]);

function parseAttrs(raw: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*("([^"]*)"|'([^']*)'|[^\s"'=<>`]+))?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    const name = m[1].toLowerCase();
    const value = m[3] !== undefined ? m[3] : m[4] !== undefined ? m[4] : m[2] !== undefined ? m[2] : "";
    attrs[name] = value;
  }
  return attrs;
}

/** Parses an HTML fragment into a flat array of top-level nodes. */
export function parseHtml(html: string): Node[] {
  const n = html.length;
  let i = 0;

  function parseChildren(insideTag: boolean): Node[] {
    const nodes: Node[] = [];
    while (i < n) {
      if (html[i] === "<") {
        if (html.startsWith("<!--", i)) {
          const end = html.indexOf("-->", i + 4);
          i = end === -1 ? n : end + 3;
          continue;
        }
        if (html[i + 1] === "/") {
          const end = html.indexOf(">", i);
          i = end === -1 ? n : end + 1;
          if (insideTag) return nodes; // closes the current element
          continue; // stray/mismatched close tag at top level — ignore
        }
        const tagMatch = /^<([a-zA-Z][a-zA-Z0-9]*)/.exec(html.slice(i));
        if (tagMatch) {
          const tag = tagMatch[1].toLowerCase();
          const tagStart = i;
          const gt = html.indexOf(">", i);
          if (gt === -1) {
            i = n;
            break;
          }
          const rawInner = html.slice(i + 1 + tag.length, gt);
          const selfClosing = rawInner.trimEnd().endsWith("/");
          const attrs = parseAttrs(selfClosing ? rawInner.trimEnd().slice(0, -1) : rawInner);
          i = gt + 1;
          if (VOID_TAGS.has(tag) || selfClosing) {
            nodes.push({ type: "element", tag, attrs, children: [], start: tagStart, end: i });
          } else if (RAW_TEXT_TAGS.has(tag)) {
            const closeRe = new RegExp(`</${tag}\\s*>`, "i");
            const m2 = closeRe.exec(html.slice(i));
            i = m2 ? i + m2.index + m2[0].length : n;
            nodes.push({ type: "element", tag, attrs, children: [], start: tagStart, end: i });
          } else {
            const children = parseChildren(true);
            nodes.push({ type: "element", tag, attrs, children, start: tagStart, end: i });
          }
          continue;
        }
        // Bare '<' that isn't a tag start — treat as literal text.
        nodes.push({ type: "text", value: "<" });
        i++;
        continue;
      }
      const nextLt = html.indexOf("<", i);
      const text = nextLt === -1 ? html.slice(i) : html.slice(i, nextLt);
      i = nextLt === -1 ? n : nextLt;
      if (text) nodes.push({ type: "text", value: text });
    }
    return nodes;
  }

  return parseChildren(false);
}

export function isElement(node: Node, tag?: string): node is ElementNode {
  return node.type === "element" && (tag === undefined || node.tag === tag);
}

export function classList(node: ElementNode): string[] {
  return (node.attrs.class ?? "").split(/\s+/).filter(Boolean);
}

export function hasClass(node: ElementNode, ...substrings: string[]): boolean {
  const cls = node.attrs.class ?? "";
  return substrings.some((s) => cls.includes(s));
}

/** Non-whitespace-only element/text children (drops stray indentation text nodes). */
export function significantChildren(node: ElementNode): Node[] {
  return node.children.filter((c) => c.type === "element" || c.value.trim() !== "");
}

/** Exact original markup for a node — a verbatim slice, never a re-serialization. */
export function rawOf(source: string, node: ElementNode): string {
  return source.slice(node.start, node.end);
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  mdash: "—",
  ndash: "–",
  middot: "·",
  times: "×",
  divide: "÷",
  harr: "↔",
  rarr: "→",
  larr: "←",
  bull: "•",
  hellip: "…",
  copy: "©",
  reg: "®",
  trade: "™",
  deg: "°",
};

export function decodeEntities(text: string): string {
  return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (whole, ent: string) => {
    if (ent[0] === "#") {
      const isHex = ent[1]?.toLowerCase() === "x";
      const code = isHex ? parseInt(ent.slice(2), 16) : parseInt(ent.slice(1), 10);
      return Number.isNaN(code) ? whole : String.fromCodePoint(code);
    }
    return NAMED_ENTITIES[ent] ?? whole;
  });
}

/** Collapses all whitespace runs (including newlines) to a single space. */
export function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, " ");
}
