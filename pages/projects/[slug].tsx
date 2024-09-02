import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";

import { Box } from "@components/ui";
import { Page } from "@components/common";
import { DetailImage } from "@components/projects";
import allprojects from "../../lib/DataProjects";
import { ProjectDetail } from "@components/projects/Detail";

interface ProjectProps {
  slug: string;
  title: string;
  description: string;
  body: string;
  coverImage: string;
  socialImage: string;
  publishedAt: string;
  canonicalURL: string;
  readTime: string;
}

function Home(project: ProjectProps) {
  const {
    slug,
    title,
    description,
    body,
    coverImage,
    socialImage,
    publishedAt,
    canonicalURL,
    readTime,
  } = project;

  useEffect(() => {
    Prism.highlightAll();
  }, [slug]);

  return (
    <Page
      title={title}
      url={canonicalURL}
      type="project"
      description={description}
      image={socialImage}
      canonicalURL={canonicalURL}
    >
      {/* <Box className="flex h-screen overflow-hidden md:grid-cols-2"> */}
        {/* <Box className="hidden h-full md:w-1/6">
          <DetailImage coverImage={coverImage} title={title} />
        </Box> */}
        <Box className="w-screen ">
          <ProjectDetail
            title={title}
            body={body}
            coverImage={coverImage}
            slug={slug}
            publishedAt={publishedAt}
            readTime={readTime}
          />
        </Box>
      {/* </Box> */}
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const project = allprojects.find((project) => project.slug === slug);
  if (!project) {
    return {
      notFound: true,
    };
  }
  return {
    props: project, // Wrap the project object in an object with a `props` key
  };
}

export async function getStaticPaths() {
  const paths = allprojects.map((project) => ({
    params: {
      slug: project.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default Home;
export {};