export {}
import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";

import { Box } from "@components/ui";
import { Page } from "@components/common";
import {  DetailImage } from "@components/projects";
import allprojects from "./DataProjects";
import { ProjectDetail } from "@components/projects/Detail";

export default function Home(allprojects) {
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
  } = allprojects;


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
      <Box className="flex h-screen overflow-hidden md:grid-cols-2">
        <Box className=" w-1/6 h-full">
        <DetailImage coverImage={coverImage}           title={title}/>
        </Box>
        <Box className="w-5/6">
        <ProjectDetail
          title={title}
          body={body}
          coverImage={coverImage}
          slug={slug}
          // tags={tags}
          publishedAt={publishedAt}
          readTime={readTime}
        />
        </Box>
      </Box>
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
      props:
      project
    }
};
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
