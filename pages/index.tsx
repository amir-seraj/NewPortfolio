import { About, Evidence, GetInTouch, Hero } from "@components/sections";
import { Footer, Nav, Page } from "@components/common";
import allprojects from "../lib/DataProjects";

export default function Home() {
  return (
    <Page
      title="Amir Seraj | HCI Researcher & Developer"
      description="Machines can learn to notice people — I teach them. Affective computing, emotion recognition and interactive systems. MSc HCI, Genova."
      url="https://amirseraj.ir"
      image="https://amirseraj.ir/images/banner.jpg"
      canonicalURL="https://amirseraj.ir"
    >
      <Nav className="absolute py-3 md:py-5" />

      <Hero />
      <About />
      <Evidence projects={allprojects} />
      <GetInTouch />
      <Footer />
    </Page>
  );
}
