import { useRef, useEffect } from "react";
import Image from "next/image";
import { Box, Container, Text, Link } from "@components/ui";
import { Copyright, Nav } from "@components/common";
import { formatDate } from "@utils/format-date";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { motion } from "framer-motion";
import {
  TwitterShareButton,
  LinkedinShareButton,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

const Badge = ({ children }) => (
  <span className="px-2 py-1 mb-2 mr-2 text-xs font-medium uppercase rounded bg-slate-200 dark:bg-slate-800 dark:text-slate-200">
    {children}
  </span>
);

const Prose = ({ children }) => (
  <Box className="prose prose-lg Code language-js prose-headings:font-heading prose-headings:uppercase prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-a:text-rose-600 dark:prose-invert">
    {children}
  </Box>
);

const Share = ({ url, title }) => (
  <Box className="flex items-center gap-2">
    <Text as="span" fontSize="sm" className="relative top-[2px] opacity-75">
      Share:
    </Text>
    <TwitterShareButton title={title} related={["amirseraj"]} url={url}>
      <TwitterIcon size={23} round />
    </TwitterShareButton>
    <LinkedinShareButton
      title={title}
      url={url}
      summary={title}
      source="amirseraj"
    >
      <LinkedinIcon size={23} round />
    </LinkedinShareButton>
  </Box>
);

const Header = ({ slug, title, readTime, publishedAt }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [title]);
  return (
    <div ref={ref}>
      <Link
        href="/projects"
        className="relative -left-[7px] mt-4 mb-5 flex items-center font-heading text-xs uppercase hover:text-rose-500 md:hidden"
      >
        <MdOutlineKeyboardArrowLeft className="w-auto h-4 mr-1" /> back to projects
      </Link>
      <Box className="flex items-center justify-between">
        <Text as="span" fontSize="sm" className="block mb-2 opacity-75 md:pt-5">
          <motion.span
            className="block"
            initial={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {formatDate(publishedAt)} — {readTime} min{readTime > 1 && "s"} read
          </motion.span>
        </Text>
        <Share url={`https://amirseraj.ir/projects/${slug}`} title={title} />
      </Box>
      <Text as="h1" fontSize="4xl" className="max-w-lg mb-8">
        <motion.span
          className="block"
          initial={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {title}
        </motion.span>
      </Text>
    </div>
  );
};

export const ProjectDetail = ({
  slug,
  title,
  body,
  coverImage,
  // tags,
  publishedAt,
  readTime,
  // otherArticles,
}) => {
  return (
    <Box className="h-screen w-full overflow-y-auto flex flex-col">
      <Nav variant="projects" />
      <Container className="">
        <Header
          title={title}
          readTime={readTime}
          slug={slug}
          publishedAt={publishedAt}
        />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.9 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Prose>
            <Image src={coverImage} alt="" width={800} height={420} objectFit="contain" />
            {/* <Box className="flex flex-wrap mt-5 2xl:mt-2">
             {tags.map((tag) => (
                <Badge key={tag}>#{tag}</Badge>
              ))} 
            </Box> */}
            <Box html={body} />
            </Prose>
        </motion.div>
      </Container>
      {/* <OtherArticles otherArticles={otherArticles} /> */}
      <Copyright />
    </Box>
  );
};
