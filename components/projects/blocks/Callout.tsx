import { RichText } from "@payloadcms/richtext-lexical/react";

const TONE_STYLES: Record<string, { box: string; heading: string }> = {
  info: { box: "bg-blue-50 dark:bg-blue-900/20", heading: "text-blue-900 dark:text-blue-100" },
  success: { box: "bg-green-50 dark:bg-green-900/20", heading: "text-green-800 dark:text-green-200" },
  warning: { box: "bg-yellow-50 dark:bg-yellow-900/20", heading: "text-yellow-800 dark:text-yellow-200" },
  neutral: { box: "bg-gray-50 dark:bg-gray-800", heading: "text-gray-900 dark:text-white" },
};

interface Props {
  tone?: string | null;
  heading?: string | null;
  // See components/projects/blocks/RichBody.tsx for why this is `any`.
  body: any;
}

export const Callout = ({ tone, heading, body }: Props) => {
  const t = TONE_STYLES[tone ?? "info"] ?? TONE_STYLES.info;
  return (
    <div className={`p-6 rounded-lg ${t.box}`}>
      {heading && <h3 className={`text-xl font-semibold mb-3 ${t.heading}`}>{heading}</h3>}
      <div className="text-gray-700 dark:text-gray-300 leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0">
        <RichText data={body} />
      </div>
    </div>
  );
};
