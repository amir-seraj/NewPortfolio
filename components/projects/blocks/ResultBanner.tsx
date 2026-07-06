// Reproduces the gradient hero/reflection banner pattern used at the top
// (and often the bottom) of every legacy case-study body, e.g.:
//   <div class="mb-8 p-6 bg-gradient-to-r from-mango-600 to-mango-700
//     text-white rounded-lg">...
// Vertical spacing between blocks is handled by BlockRenderer's own
// `space-y-8` wrapper, not by this component, so no mb-8/mt-12 here.

const TONE_GRADIENTS: Record<string, string> = {
  mango: "from-mango-600 to-mango-700",
  "mango-deep": "from-mango-600 to-mango-800",
  green: "from-green-500 to-blue-600",
  indigo: "from-indigo-500 to-purple-600",
  orange: "from-orange-500 to-red-600",
  blue: "from-blue-500 to-purple-600",
  purple: "from-purple-500 to-pink-600",
};

interface Chip {
  label: string;
}

interface Paragraph {
  text: string;
}

interface Props {
  heading: string;
  paragraphs?: Paragraph[] | null;
  chips?: Chip[] | null;
  tone?: string | null;
}

export const ResultBanner = ({ heading, paragraphs, chips, tone }: Props) => {
  const gradient = TONE_GRADIENTS[tone ?? "mango"] ?? TONE_GRADIENTS.mango;
  return (
    <div className={`p-6 bg-gradient-to-r ${gradient} text-white rounded-lg`}>
      <h2 className="text-2xl font-bold mb-2 text-white">{heading}</h2>
      {(paragraphs ?? []).map((p, i) => (
        <p key={i} className={i === 0 ? "text-lg opacity-90 mb-4" : "opacity-90 mb-4"}>
          {p.text}
        </p>
      ))}
      {(chips ?? []).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {chips!.map((c, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-white/20 text-sm">
              {c.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
