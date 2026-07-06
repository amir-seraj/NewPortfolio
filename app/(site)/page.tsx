import type { Metadata } from "next";
import { About, Evidence, GetInTouch, Hero } from "@components/sections";
import { Footer, Nav } from "@components/common";
import { getHome, getProjects, getSettings } from "../../cms/queries";

export const metadata: Metadata = {
  alternates: { canonical: "https://amirseraj.ir" },
};

export const revalidate = 60;

export default async function HomePage() {
  const [home, settings, projects] = await Promise.all([
    getHome(),
    getSettings(),
    getProjects(),
  ]);
  const email = settings.email;
  return (
    <main>
      <Nav className="absolute py-3 md:py-5" email={email} />
      <Hero hero={home.hero} />
      <About about={home.about} />
      <Evidence projects={projects} />
      <GetInTouch kicker={home.contact?.kicker} email={email} />
      <Footer email={email} />
    </main>
  );
}
