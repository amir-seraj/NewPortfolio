import { RichText } from "@payloadcms/richtext-lexical/react";

interface Props {
  // Payload generates a loosely-typed `{ root: {...} }` shape for every
  // richText field (see payload-types.ts, e.g. Post["body"]) that doesn't
  // line up with lexical's own generic SerializedEditorState<TNodes> — `any`
  // here matches how the rest of this codebase treats CMS richText data
  // (e.g. cms/queries.ts, scripts/migrate-body-colors.ts).
  body: any;
}

// Deliberately unstyled beyond list markers: this renders inside the
// `.prose` wrapper already applied by ProjectDetail (see components/projects/Detail.tsx),
// which supplies paragraph/link/emphasis typography — same pattern the blog
// post page uses for its own <RichText />.
export const RichBody = ({ body }: Props) => (
  <div className="text-gray-700 dark:text-gray-300 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_a]:text-mango-700 dark:[&_a]:text-mango-300">
    <RichText data={body} />
  </div>
);
