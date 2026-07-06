import type { Metadata } from "next";
import { Projects } from "@components/sections";
import { Nav } from "@components/common";
import { getProjects, getSettings } from "../../../cms/queries";

export const metadata: Metadata = {
  title: "Projects | Amir Seraj",
  description:
    "Thirteen shipped projects, 2023 to 2026: systems that read emotion, posture and balance, plus the engineering that came before them.",
  alternates: { canonical: "https://amirseraj.ir/projects" },
  openGraph: {
    url: "https://amirseraj.ir/projects",
    images: ["/images/banner.jpg"],
  },
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const [allprojects, settings] = await Promise.all([
    getProjects(),
    getSettings(),
  ]);
  return (
    <main>
      <Nav
        className="fixed py-3 bg-mango-900 bg-opacity-90 text-mango-50 backdrop-blur dark:bg-mango-950 dark:bg-opacity-90"
        email={settings.email}
      />
      <Projects allprojects={allprojects} email={settings.email} />
    </main>
  );
}
