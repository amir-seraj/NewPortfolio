interface Props {
  language?: string | null;
  code?: string | null;
}

// `language` is metadata for the admin editor only (Payload's code field
// doesn't support per-instance dynamic Monaco highlighting) — it isn't
// rendered here, matching the legacy <pre><code> markup exactly.
export const CodeSnippet = ({ code }: Props) => (
  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
    <code>{code}</code>
  </pre>
);
