import { Projects } from "@components/sections";
import { Nav, Page } from "@components/common";
import allprojects from "../../lib/DataProjects";

export default function Home({ allprojects }) {
  return (
    <Page
      title="Projects | Amir Seraj"
      description="Thirteen shipped projects, 2023 to 2026: systems that read emotion, posture and balance, plus the engineering that came before them."
      url="https://amirseraj.ir/projects"
      image="https://amirseraj.ir/images/banner.jpg"
      canonicalURL="https://amirseraj.ir/projects"
    >
      <Nav className="fixed py-3 bg-teal-900 bg-opacity-90 text-teal-50 backdrop-blur dark:bg-[#082f2c] dark:bg-opacity-90" />
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
