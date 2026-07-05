import type { Metadata } from "next";
import { About, Evidence, GetInTouch, Hero } from "@components/sections";
import { Footer, Nav } from "@components/common";
import { getProjects } from "../../cms/queries";

export const metadata: Metadata = {
  alternates: { canonical: "https://amirseraj.ir" },
};

export const revalidate = 60;

export default async function HomePage() {
  const projects = await getProjects();
  return (
    <main>
      <Nav className="absolute py-3 md:py-5" />
      <Hero />
      <About />
      <Evidence projects={projects} />
      <GetInTouch />
      <Footer />
    </main>
  );
}
