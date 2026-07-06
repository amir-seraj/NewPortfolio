interface Props {
  text: string;
  level?: string | null;
}

export const SectionHeading = ({ text, level }: Props) => {
  if (level === "h3") {
    return <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{text}</h3>;
  }
  return <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{text}</h2>;
};
