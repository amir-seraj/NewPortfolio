import type { GlobalConfig } from "payload";
import { revalidateHome } from "../hooks/revalidate";

export const Home: GlobalConfig = {
  slug: "home",
  access: { read: () => true },
  hooks: { afterChange: [revalidateHome] },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        {
          name: "lines",
          type: "array",
          fields: [
            { name: "text", type: "text", required: true },
            { name: "accent", type: "checkbox", defaultValue: false },
          ],
        },
        { name: "ctaLabel", type: "text" },
        { name: "ctaHref", type: "text" },
        { name: "strip", type: "array", fields: [{ name: "item", type: "text", required: true }] },
      ],
    },
    {
      // Shaped to match components/sections/About/About.tsx exactly (read for this task):
      // one heading, one lead paragraph, and three animated "COUNTS" stat tiles
      // (value + label). About.tsx renders no skills list or timeline, so those
      // brief-sketched subfields are omitted here — see task-8-report.md for the
      // deviation note. `value` is `number` (not `text`) because the CountUp
      // component does arithmetic on it (Math.round(value * ...)).
      name: "about",
      type: "group",
      fields: [
        { name: "heading", type: "text" },
        { name: "paragraphs", type: "array", fields: [{ name: "text", type: "textarea", required: true }] },
        {
          name: "stats",
          type: "array",
          fields: [
            { name: "value", type: "number", required: true },
            { name: "label", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "contact",
      type: "group",
      fields: [{ name: "kicker", type: "text", defaultValue: "One address. No form." }],
    },
  ],
};
