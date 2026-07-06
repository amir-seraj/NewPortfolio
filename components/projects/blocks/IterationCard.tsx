import { RichText } from "@payloadcms/richtext-lexical/react";

interface ImageItem {
  src: string;
  alt: string;
}

interface Props {
  heading: string;
  // See components/projects/blocks/RichBody.tsx for why this is `any`.
  body?: any;
  images?: ImageItem[] | null;
  columns?: string | null;
}

const GRID_COLS: Record<string, string> = {
  "1": "grid-cols-1",
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-2 lg:grid-cols-3",
};

export const IterationCard = ({ heading, body, images, columns }: Props) => {
  const imgs = images ?? [];
  const hasBody = Boolean(body);
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{heading}</h3>
      {hasBody && (
        <div className="text-gray-700 dark:text-gray-300 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_p]:mb-4 [&_p:last-child]:mb-0">
          <RichText data={body} />
        </div>
      )}
      {imgs.length === 1 && (
        <div className={hasBody ? "mt-4" : undefined}>
          <img src={imgs[0].src} alt={imgs[0].alt} className="w-full max-w-md mx-auto rounded-lg shadow-sm" loading="lazy" />
        </div>
      )}
      {imgs.length > 1 && (
        <div className={`grid ${GRID_COLS[columns ?? "2"] ?? GRID_COLS["2"]} gap-4 ${hasBody ? "mt-4" : ""}`}>
          {imgs.map((img, i) => (
            <img key={i} src={img.src} alt={img.alt} className="w-full rounded-lg shadow-sm" loading="lazy" />
          ))}
        </div>
      )}
    </div>
  );
};
