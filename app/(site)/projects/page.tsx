import type { Metadata } from "next";

import { Nav } from "@components/common";
import { Projects } from "@components/sections";
import { getProjects, getSettings } from "../../../content/reader";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [projects, settings] = await Promise.all([getProjects(), getSettings()]);
  const years = projects.map((project) => project.year);
  const firstYear = years.length ? Math.min(...years) : new Date().getFullYear();
  const lastYear = years.length ? Math.max(...years) : firstYear;
  const range = firstYear === lastYear ? String(firstYear) : `${firstYear} to ${lastYear}`;
  const canonical = `${settings.siteUrl.replace(/\/$/, "")}/projects`;
  const description = `${projects.length} shipped projects, ${range}: systems that read emotion, posture and balance, plus the engineering that connects them.`;
  return {
    title: "Projects | Amir Seraj",
    description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      description,
      images: [settings.defaultOgImage],
    },
  };
}

export default async function ProjectsPage() {
  const [allprojects, settings] = await Promise.all([
    getProjects(),
    getSettings(),
  ]);
  return (
    <main>
      <Nav
        className="fixed border-b border-slate-300/70 bg-[#f4f1eb]/90 text-slate-900 backdrop-blur dark:border-white/10 dark:bg-[#202020]/90 dark:text-slate-100"
        email={settings.email}
      />
      <Projects allprojects={allprojects} email={settings.email} />
    </main>
  );
}
