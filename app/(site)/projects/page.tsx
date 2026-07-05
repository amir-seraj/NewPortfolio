import type { Metadata } from "next";
import { Projects } from "@components/sections";
import { Nav } from "@components/common";
import allprojects from "../../../lib/DataProjects";

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

export default function ProjectsPage() {
  return (
    <main>
      <Nav className="fixed py-3 bg-teal-900 bg-opacity-90 text-teal-50 backdrop-blur dark:bg-[#082f2c] dark:bg-opacity-90" />
      <Projects allprojects={allprojects} />
    </main>
  );
}
