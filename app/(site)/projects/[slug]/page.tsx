import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Box } from "@components/ui";
import { PrismHighlight } from "@components/common";
import { ProjectDetail } from "@components/projects/Detail";
import { getProject, getProjects, getSettings } from "../../../../cms/queries";

interface Params {
  slug: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  const allprojects = await getProjects();
  return allprojects.map((project) => ({ slug: project.slug }));
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  const canonical = `https://amirseraj.ir/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      images: [project.socialImage],
      type: "article",
    },
    twitter: { images: [project.socialImage] },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([getProject(slug), getSettings()]);
  if (!project) notFound();

  // Chronological neighbors: prev = shipped before, next = shipped after.
  const allprojects = await getProjects();
  const byDate = [...allprojects].sort((a, b) =>
    a.publishedAt.localeCompare(b.publishedAt)
  );
  const i = byDate.findIndex((p) => p.slug === slug);
  const toLink = (p) => (p ? { slug: p.slug, title: p.title } : null);

  return (
    <main>
      <PrismHighlight trigger={slug} />
      <Box className="w-full">
        <ProjectDetail
          title={project.title}
          body={project.body}
          layout={project.layout}
          coverImage={project.coverImage}
          slug={project.slug}
          publishedAt={project.publishedAt}
          readTime={project.readTime}
          tags={project.tags ?? []}
          prevProject={toLink(byDate[i - 1])}
          nextProject={toLink(byDate[i + 1])}
          email={settings.email}
        />
      </Box>
    </main>
  );
}
