import { Projects } from "@components/sections";
import { Nav, Page } from "@components/common";
import allprojects from "../../lib/DataProjects";

export default function Home({ allprojects }) {
  return (
    <Page
      title="Amir Seraj | HCI Researcher & Full-Stack Developer"
      description="Exploring the intersection of technology and human experience through interactive systems, blockchain development, and affective computing research."
      url="https://amirseraj.ir"
      // keywords="Amir, Seraj,Amir Seraj,Seraj, software engineer, Iran, Isfahan software developer, Iran developer, software development blog, BlockChain, Solidity, React Developer, React Blog"
      image="https://amirseraj.ir/images/banner.jpg"
      canonicalURL="https://amirseraj.ir"
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
