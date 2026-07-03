import { Projects } from "@components/sections";
import { Nav, Page } from "@components/common";
import allprojects from "../../lib/DataProjects";

export default function Home({ allprojects }) {
  return (
    <Page
      title="Projects | Amir Seraj"
      description="Twelve shipped projects, 2023 to 2026: systems that read emotion, posture and balance, plus the engineering that came before them."
      url="https://amirseraj.ir/projects"
      image="https://amirseraj.ir/images/banner.jpg"
      canonicalURL="https://amirseraj.ir/projects"
    >
      <Nav className="fixed py-3 bg-white bg-opacity-75  backdrop-blur dark:bg-[#323232] dark:bg-opacity-90" />
      <Projects allprojects={allprojects} />
    </Page>
  );
}

export async function getStaticProps() {

  return {
    props: {
      allprojects,
    },
    revalidate: 60,
  };
}
