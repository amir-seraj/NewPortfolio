import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { InlineWidget } from "react-calendly";
import {
  About,
  GetInTouch,
  Hero,
  // LatestBlogs,
  // TechStack,
} from "@components/sections";
import { Footer, Nav, Page } from "@components/common";
import { Box } from "@components/ui";
import { VscChromeClose } from "react-icons/vsc";
import { LatestProjects } from "@components/sections/Latest/Latest";
import allprojects from "./projects/DataProjects";

export default function Home({ articles }) {
  const [schedule, setSchedule] = useState(false);
  const router = useRouter();
  const { action } = router.query;

  useEffect(() => {
    if (action === "schedule") {
      setSchedule(true);
    }
  }, [router, action]);

  return (
    <Page
      title="Amir Seraj | UX Designer"
      description="I am a UX Designer/Web Developer,Based in Genova, Italy."
      url="https://amirseraj.ir"
      // keywords="Amir, Seraj,Amir Seraj, Seraj, software engineer,Designer, Developer, Italy, Genova, software developer, Italy developer, software development blog, BlockChain, Solidity, React Developer, React Blog"
      image="https://amirseraj.ir/images/banner.jpg"
      canonicalURL="https://amirseraj.ir"
    >
      <Nav className="absolute py-3 md:py-5" />

      <Hero />
      <About />
      <LatestProjects projects={allprojects} />
      <GetInTouch />
      {/* <TechStack /> */}
      <Footer />
      {/* {schedule && (
        <Box className="fixed inset-0 z-30 bg-black bg-opacity-20 md:pt-20">
          <button
            className="absolute flex items-center gap-2 right-8 top-7 md:right-12"
            onClick={() => setSchedule(false)}
          >
            <VscChromeClose className="w-auto h-8 text-white transition duration-300 ease-in-out transform hover:rotate-90 hover:text-yellow-500" />
          </button>
          <InlineWidget
            url="https://calendly.com/amirseraj-ir"
            iframeTitle="Scheduling Page"
            pageSettings={{
              hideGdprBanner: true,
            }}
          />
        </Box>
      )} */}
    </Page>
  );
}

// export async function getStaticProps() {
//   const res = await fetch(
//     `https://dev.to/api/articles?username=amirseraj&per_page=5&state=all`
//   );
//   const articles = await res?.json();

//   return {
//     props: {
//       articles,
//     },
//     revalidate: 60,
//   };
// }
