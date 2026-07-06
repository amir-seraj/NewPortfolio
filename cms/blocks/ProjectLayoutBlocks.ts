import type { Block } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

// Task 17: visual block editor for project case studies.
//
// Each block here reproduces one recurring visual pattern found across the
// 13 existing case-study bodies (see scripts/convert/ for the converter that
// maps legacy raw HTML onto these). Block *names* are fixed by the approved
// design — only field shapes were tuned against the actual corpus.
//
// `RawHtml` is the deliberate, lossless escape hatch: anything a case study
// needs that isn't one of the other seven shapes can always be authored (or
// converted) as raw HTML without losing content.

const richText = () => lexicalEditor();

export const ResultBannerBlock: Block = {
  slug: "ResultBanner",
  labels: { singular: "Result Banner", plural: "Result Banners" },
  fields: [
    { name: "heading", type: "text", required: true },
    {
      name: "paragraphs",
      type: "array",
      admin: { description: "One or more lines of banner copy, in order." },
      fields: [{ name: "text", type: "textarea", required: true }],
    },
    {
      name: "chips",
      type: "array",
      admin: { description: "Small pill badges (tech tags, topic tags) under the banner copy." },
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "tone",
      type: "select",
      defaultValue: "mango",
      admin: {
        description:
          "Gradient used for the banner surface. Mango is the on-brand default for new banners — the other options exist only to reproduce gradients already used by older case studies.",
      },
      options: [
        { label: "Mango", value: "mango" },
        { label: "Mango (deep)", value: "mango-deep" },
        { label: "Green → Blue", value: "green" },
        { label: "Indigo → Purple", value: "indigo" },
        { label: "Orange → Red", value: "orange" },
        { label: "Blue → Purple", value: "blue" },
        { label: "Purple → Pink", value: "purple" },
      ],
    },
  ],
};

export const SectionHeadingBlock: Block = {
  slug: "SectionHeading",
  labels: { singular: "Section Heading", plural: "Section Headings" },
  fields: [
    { name: "text", type: "text", required: true },
    {
      name: "level",
      type: "select",
      defaultValue: "h2",
      options: [
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
      ],
    },
  ],
};

export const RichBodyBlock: Block = {
  slug: "RichBody",
  labels: { singular: "Rich Body", plural: "Rich Bodies" },
  fields: [
    {
      name: "body",
      type: "richText",
      required: true,
      editor: richText(),
      admin: { description: "Paragraphs, bullet/numbered lists, and inline em/strong/links." },
    },
  ],
};

export const CalloutBlock: Block = {
  slug: "Callout",
  labels: { singular: "Callout", plural: "Callouts" },
  fields: [
    {
      name: "tone",
      type: "select",
      defaultValue: "info",
      options: [
        { label: "Info", value: "info" },
        { label: "Success", value: "success" },
        { label: "Warning", value: "warning" },
        { label: "Neutral", value: "neutral" },
      ],
    },
    { name: "heading", type: "text" },
    { name: "body", type: "richText", required: true, editor: richText() },
  ],
};

export const IterationCardBlock: Block = {
  slug: "IterationCard",
  labels: { singular: "Iteration Card", plural: "Iteration Cards" },
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "body", type: "richText", editor: richText() },
    {
      name: "images",
      type: "array",
      fields: [
        { name: "src", type: "text", required: true, admin: { description: "Path under /public, e.g. /images/…" } },
        { name: "alt", type: "text", required: true },
      ],
    },
    {
      name: "columns",
      type: "select",
      defaultValue: "2",
      options: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
      ],
    },
  ],
};

export const ImageGridBlock: Block = {
  slug: "ImageGrid",
  labels: { singular: "Image Grid", plural: "Image Grids" },
  fields: [
    {
      name: "images",
      type: "array",
      required: true,
      fields: [
        { name: "src", type: "text", required: true, admin: { description: "Path under /public, e.g. /images/…" } },
        { name: "alt", type: "text", required: true },
      ],
    },
    {
      name: "columns",
      type: "select",
      defaultValue: "2",
      options: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
      ],
    },
  ],
};

export const CodeSnippetBlock: Block = {
  slug: "CodeSnippet",
  labels: { singular: "Code Snippet", plural: "Code Snippets" },
  fields: [
    { name: "language", type: "text", admin: { description: "Free text, e.g. javascript, python, solidity — display label only." } },
    { name: "code", type: "code" },
  ],
};

export const RawHtmlBlock: Block = {
  slug: "RawHtml",
  labels: { singular: "Raw HTML (fallback)", plural: "Raw HTML blocks" },
  fields: [
    {
      name: "html",
      type: "code",
      required: true,
      admin: {
        language: "html",
        description:
          "Lossless escape hatch — used by the converter for anything that doesn't cleanly fit the other block types, and available here for the same reason.",
      },
    },
  ],
};

export const projectLayoutBlocks: Block[] = [
  ResultBannerBlock,
  SectionHeadingBlock,
  RichBodyBlock,
  CalloutBlock,
  IterationCardBlock,
  ImageGridBlock,
  CodeSnippetBlock,
  RawHtmlBlock,
];
