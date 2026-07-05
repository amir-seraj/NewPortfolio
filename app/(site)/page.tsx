import type { Metadata } from "next";
import { About, Evidence, GetInTouch, Hero } from "@components/sections";
import { Footer, Nav } from "@components/common";
import allprojects from "../../lib/DataProjects";

export const metadata: Metadata = {
  alternates: { canonical: "https://amirseraj.ir" },
};

export default function HomePage() {
  return (
    <main>
      <Nav className="absolute py-3 md:py-5" />
      <Hero />
      <About />
      <Evidence projects={allprojects} />
      <GetInTouch />
      <Footer />
    </main>
  );
}
