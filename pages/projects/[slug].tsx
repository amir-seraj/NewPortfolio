import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";

import { Page } from "@components/common";
import allprojects from "../../lib/DataProjects";
import { ProjectDetail } from "@components/projects/Detail";

interface ProjectLink {
  slug: string;
  title: string;
}

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
  tags: string[];
  prevProject: ProjectLink | null;
  nextProject: ProjectLink | null;
}

function ProjectPage(project: ProjectProps) {
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
    tags,
    prevProject,
    nextProject,
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
      <ProjectDetail
        title={title}
        body={body}
        coverImage={coverImage}
        slug={slug}
        publishedAt={publishedAt}
        readTime={readTime}
        tags={tags}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const project = allprojects.find((p) => p.slug === slug);
  if (!project) {
    return { notFound: true };
  }
  // Chronological neighbors: prev = shipped before, next = shipped after.
  const byDate = [...allprojects].sort((a, b) =>
    a.publishedAt.localeCompare(b.publishedAt)
  );
  const i = byDate.findIndex((p) => p.slug === slug);
  const toLink = (p) => (p ? { slug: p.slug, title: p.title } : null);
  return {
    props: {
      ...project,
      tags: project.tags ?? [],
      prevProject: toLink(byDate[i - 1]),
      nextProject: toLink(byDate[i + 1]),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: allprojects.map((project) => ({
      params: { slug: project.slug },
    })),
    fallback: false,
  };
}

export default ProjectPage;
export {};
