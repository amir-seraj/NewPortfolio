import type { ComponentType } from "react";
import { ResultBanner } from "./ResultBanner";
import { SectionHeading } from "./SectionHeading";
import { RichBody } from "./RichBody";
import { Callout } from "./Callout";
import { IterationCard } from "./IterationCard";
import { ImageGrid } from "./ImageGrid";
import { CodeSnippet } from "./CodeSnippet";
import { RawHtml } from "./RawHtml";

const COMPONENTS: Record<string, ComponentType<any>> = {
  ResultBanner,
  SectionHeading,
  RichBody,
  Callout,
  IterationCard,
  ImageGrid,
  CodeSnippet,
  RawHtml,
};

interface LayoutBlock {
  id?: string | null;
  blockType: string;
  [key: string]: unknown;
}

interface Props {
  blocks: LayoutBlock[];
}

// One entry per block gets its own vertical rhythm here (space-y-8, matching
// the ~2rem gaps already used throughout the legacy case-study HTML) so
// individual block components don't need to own their own margins.
export const BlockRenderer = ({ blocks }: Props) => (
  <div className="space-y-8">
    {blocks.map((block, i) => {
      const Component = COMPONENTS[block.blockType];
      if (!Component) {
        // A block type the renderer doesn't know (e.g. schema grew a new
        // block without a matching component). Skipping silently would
        // hide the content loss — warn loudly instead.
        console.warn(
          `BlockRenderer: no component registered for blockType "${block.blockType}" (block ${i}) — block skipped`
        );
        return null;
      }
      return <Component key={block.id ?? i} {...block} />;
    })}
  </div>
);
