import { useRef, useEffect } from "react";
import Image from "next/legacy/image";
import { Box, Container, Text, Link } from "@components/ui";
import { Copyright, Nav } from "@components/common";
import { formatDate } from "@utils/format-date";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { motion } from "motion/react";
import {
  TwitterShareButton,
  LinkedinShareButton,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

const Badge = ({ children }) => (
  <span className="rounded-full bg-teal-600/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-teal-800 dark:bg-teal-400/10 dark:text-teal-200">
    {children}
  </span>
);

const Prose = ({ children }) => (
  <Box className="prose prose-lg Code language-js prose-headings:font-heading prose-headings:uppercase prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-a:text-teal-700 dark:prose-invert dark:prose-a:text-teal-300">
    {children}
  </Box>
);

const Share = ({ url, title }) => (
  <Box className="flex items-center gap-2">
    <Text as="span" fontSize="sm" className="opacity-75">
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

const Header = ({ slug, title, readTime, publishedAt, tags }) => {
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
        className="relative -left-[7px] mt-4 mb-5 flex items-center font-heading text-xs uppercase hover:text-teal-600 dark:hover:text-teal-300 md:hidden"
      >
        <MdOutlineKeyboardArrowLeft className="mr-1 h-4 w-auto" /> back to
        projects
      </Link>
      <Box className="flex flex-wrap items-center justify-between gap-2 pt-2 md:pt-6">
        <Text as="span" fontSize="sm" className="opacity-75">
          <motion.span
            className="block"
            initial={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {formatDate(publishedAt)} — {readTime} min{readTime > 1 && "s"}{" "}
            read
          </motion.span>
        </Text>
        <Share url={`https://amirseraj.ir/projects/${slug}`} title={title} />
      </Box>
      <Text as="h1" fontSize="4xl" className="mt-2 mb-4">
        <motion.span
          className="block [text-wrap:balance]"
          initial={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {title}
        </motion.span>
      </Text>
      {tags.length > 0 && (
        <Box className="mb-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </Box>
      )}
    </div>
  );
};

const FooterNav = ({ prevProject, nextProject }) => (
  <Box className="mt-14 border-t border-teal-600/20 pt-8 dark:border-teal-400/20">
    <Box className="grid gap-3 sm:grid-cols-2">
      {prevProject ? (
        <Link
          href={`/projects/${prevProject.slug}`}
          className="group rounded-lg bg-teal-600/[0.07] p-4 transition-colors hover:bg-teal-600/[0.14] dark:bg-teal-400/[0.08] dark:hover:bg-teal-400/[0.14]"
        >
          <span className="flex items-center font-heading text-xs uppercase tracking-wide text-teal-700 dark:text-teal-300">
            <MdOutlineKeyboardArrowLeft className="mr-1 h-4 w-auto" />
            Shipped before this
          </span>
          <span className="mt-1 block text-sm font-medium group-hover:underline">
            {prevProject.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {nextProject && (
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group rounded-lg bg-teal-600/[0.07] p-4 text-right transition-colors hover:bg-teal-600/[0.14] dark:bg-teal-400/[0.08] dark:hover:bg-teal-400/[0.14]"
        >
          <span className="flex items-center justify-end font-heading text-xs uppercase tracking-wide text-teal-700 dark:text-teal-300">
            Shipped after this
            <MdOutlineKeyboardArrowRight className="ml-1 h-4 w-auto" />
          </span>
          <span className="mt-1 block text-sm font-medium group-hover:underline">
            {nextProject.title}
          </span>
        </Link>
      )}
    </Box>
    <Text as="p" fontSize="sm" className="mt-8 mb-2 text-center opacity-75">
      Questions about this one?
    </Text>
    <Text as="p" align="center" className="mb-4 font-heading font-medium">
      <Link
        href="mailto:amirseraj.ir@gmail.com"
        className="text-teal-700 underline decoration-teal-600/40 underline-offset-4 hover:decoration-teal-600 dark:text-teal-300 dark:decoration-teal-400/40 dark:hover:decoration-teal-300"
      >
        amirseraj.ir@gmail.com
      </Link>
    </Text>
  </Box>
);

export const ProjectDetail = ({
  slug,
  title,
  body,
  coverImage,
  tags = [],
  publishedAt,
  readTime,
  prevProject = null,
  nextProject = null,
}) => {
  return (
    <Box className="flex h-screen w-full flex-col overflow-y-auto">
      <Nav variant="projects" />
      <Container className="w-full">
        <Box className="mx-auto w-full max-w-3xl">
          <Header
            title={title}
            readTime={readTime}
            slug={slug}
            publishedAt={publishedAt}
            tags={tags}
          />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Prose>
              <Image
                src={coverImage}
                alt={`${title} — cover artwork`}
                width={800}
                height={420}
                objectFit="contain"
                className="rounded-lg bg-white"
              />
              <Box html={body} />
            </Prose>
          </motion.div>
          <FooterNav prevProject={prevProject} nextProject={nextProject} />
        </Box>
      </Container>
      <Copyright />
    </Box>
  );
};
