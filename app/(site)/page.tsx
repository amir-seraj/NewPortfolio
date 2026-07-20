import type { Metadata } from "next";
import {
  About,
  Evidence,
  GetInTouch,
  Hero,
  Writing,
} from "@components/sections";
import { Footer, Nav } from "@components/common";
import {
  getHome,
  getProjects,
  getPublishedPosts,
  getSettings,
} from "../../content/reader";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export const revalidate = 60;

export default async function HomePage() {
  const [home, settings, projects, posts] = await Promise.all([
    getHome(),
    getSettings(),
    getProjects(),
    getPublishedPosts(),
  ]);
  const email = settings.email;
  const projectYears = projects.map((project) => project.year);
  const firstProjectYear = projectYears.length
    ? Math.min(...projectYears)
    : new Date().getFullYear();
  const lastProjectYear = projectYears.length
    ? Math.max(...projectYears)
    : firstProjectYear;
  const projectYearRange =
    firstProjectYear === lastProjectYear
      ? String(firstProjectYear)
      : `${firstProjectYear} to ${lastProjectYear}`;
  return (
    <main className="bg-[#f4f1eb] dark:bg-[#202020]">
      <Nav
        className="fixed border-b border-slate-300/70 bg-[#f4f1eb]/90 text-slate-950 backdrop-blur dark:border-white/10 dark:bg-[#202020]/90 dark:text-white"
        email={email}
      />
      <Hero hero={home.hero} />
      <About
        about={home.about}
        projectCount={projects.length}
        projectYearRange={projectYearRange}
      />
      <Evidence projects={projects} />
      <Writing posts={posts} />
      <GetInTouch kicker={home.contact?.kicker} email={email} />
      <Footer email={email} />
    </main>
  );
}
