import { Projects } from "@components/sections";
import { Nav, Page } from "@components/common";
import allprojects from "./DataProjects";

export default function Home({ allprojects }) {
  return (
    <Page
      title="Amir Seraj | Software Engineer"
      description="I am a Software Engineer, Music Enthusiast based in Isfahan, Iran."
      url="https://amirseraj.ir"
      // keywords="Amir, Seraj,Amir Seraj,Seraj, software engineer, Iran, Isfahan software developer, Iran developer, software development blog, BlockChain, Solidity, React Developer, React Blog"
      image="https://amirseraj.ir/images/banner.jpg"
      canonicalURL="https://amirseraj.ir"
    >
      <Nav className="fixed py-3 bg-white bg-opacity-75 border-b backdrop-blur dark:bg-[#232B2B] dark:bg-opacity-90" />
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
