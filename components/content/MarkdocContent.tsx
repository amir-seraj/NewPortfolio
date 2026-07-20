import React from "react";
import Markdoc, { type Node as MarkdocNode } from "@markdoc/markdoc";

export function MarkdocContent({ node }: { node: MarkdocNode }) {
  const renderable = Markdoc.transform(node);
  return <>{Markdoc.renderers.react(renderable, React)}</>;
}
