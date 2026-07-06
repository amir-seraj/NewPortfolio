interface Props {
  html?: string | null;
}

// The lossless escape hatch (Task 17) — anything the converter or an author
// can't cleanly express with the other seven block types lands here
// verbatim, rendered exactly like the legacy `body` field always was.
export const RawHtml = ({ html }: Props) => <div dangerouslySetInnerHTML={{ __html: html ?? "" }} />;
