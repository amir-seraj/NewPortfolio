import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrismHighlight } from "@components/common";
import { MarkdocContent } from "@components/content/MarkdocContent";
import { ProjectDetail } from "@components/projects/Detail";
import {
  getProject,
  getProjects,
  getSettings,
} from "../../../../content/reader";

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
  const [project, settings] = await Promise.all([
    getProject(slug),
    getSettings(),
  ]);
  if (!project) return {};
  const canonical = `${settings.siteUrl.replace(/\/$/, "")}/projects/${project.slug}`;
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
  const [project, settings, allprojects] = await Promise.all([
    getProject(slug),
    getSettings(),
    getProjects(),
  ]);
  if (!project) notFound();

  // Chronological neighbors: prev = shipped before, next = shipped after.
  const byDate = [...allprojects].sort((a, b) =>
    a.publishedAt.localeCompare(b.publishedAt)
  );
  const i = byDate.findIndex((p) => p.slug === slug);
  const toLink = (p) => (p ? { slug: p.slug, title: p.title } : null);

  return (
    <main>
      <PrismHighlight trigger={slug} />
      <ProjectDetail
        title={project.title}
        shortTitle={project.shortTitle}
        description={project.description}
        kind={project.kind}
        content={<MarkdocContent node={project.body!} />}
        coverImage={project.coverImage}
        slug={project.slug}
        publishedAt={project.publishedAt}
        readTime={project.readTime}
        tags={project.tags ?? []}
        projectNumber={i + 1}
        projectCount={byDate.length}
        prevProject={toLink(byDate[i - 1])}
        nextProject={toLink(byDate[i + 1])}
        email={settings.email}
        siteUrl={settings.siteUrl}
      />
    </main>
  );
}
