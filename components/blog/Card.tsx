import Image from "next/image";
import { Box, Link, Text } from "@components/ui";
import { formatDate } from "@utils/format-date";

export const Card = ({
  title,
  description,
  coverImage,
  date,
  slug,
  readTime,
  variant = "md",
}) => {
  return (
    <Link href={`/blog/${slug}`} className="block group">
      <Image
        src={coverImage}
        width={600}
        height={360}
        quality={100}
        objectFit="cover"
        placeholder="blur"
        blurDataURL="/images/blog-placeholder.png"
        className="transition duration-200 ease-in-out bg-slate-50 group-hover:scale-110 dark:bg-slate-800"
        alt=""
      />

      <Box className="flex items-center justify-between">
        <Text as="span" fontSize="sm" className="opacity-75">
          {formatDate(date)}
        </Text>

        <Text as="span" fontSize="sm" className="opacity-75">
          {readTime} min{readTime > 1 && "s"} read
        </Text>
      </Box>

      <Text
        as="h3"
        fontSize="lg"
        fontWeight="medium"
        className="mt-2 mb-1 group-hover:underline md:hidden"
      >
        {title}
      </Text>
      <Text
        as="h3"
        fontWeight="medium"
        fontSize={variant === "md" ? "3xl" : "xl"}
        className="hidden mt-2 mb-1 group-hover:underline md:block"
      >
        {title}
      </Text>

      <Text as="p" className="hidden opacity-75 md:block">
        {description}
      </Text>
    </Link>
  );
};
