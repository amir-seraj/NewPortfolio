interface ImageItem {
  src: string;
  alt: string;
}

interface Props {
  images: ImageItem[];
  columns?: string | null;
}

const GRID_COLS: Record<string, string> = {
  "1": "grid-cols-1",
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-3",
};

export const ImageGrid = ({ images, columns }: Props) => {
  const imgs = images ?? [];
  if (imgs.length === 1) {
    return (
      <div>
        <img src={imgs[0].src} alt={imgs[0].alt} className="w-full max-w-2xl mx-auto rounded-lg shadow-lg" loading="lazy" />
      </div>
    );
  }
  return (
    <div className={`grid ${GRID_COLS[columns ?? "2"] ?? GRID_COLS["2"]} gap-4`}>
      {imgs.map((img, i) => (
        <img key={i} src={img.src} alt={img.alt} className="w-full rounded-lg shadow-md" loading="lazy" />
      ))}
    </div>
  );
};
