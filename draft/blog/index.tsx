// import { Blog } from "@components/sections";
// import { Nav, Page } from "@components/common";

// export default function Home({ articles }) {
//   return (
//     <Page
//       title="Amir Seraj | Software Engineer"
//       description="I am a Software Engineer, Music Enthusiast based in Isfahan, Iran."
//       url="https://amirseraj.ir"
//       keywords="Amir, Seraj,Amir Seraj,Seraj, software engineer, Iran, Isfahan software developer, Iran developer, software development blog, BlockChain, Solidity, React Developer, React Blog"
//       image="https://amirseraj.ir/images/banner.jpg"
//       canonicalURL="https://amirseraj.ir"
//     >
//       <Nav className="fixed py-3 bg-white bg-opacity-75 border-b backdrop-blur dark:bg-slate-900 dark:bg-opacity-90" />
//       <Blog articles={articles} />
//     </Page>
//   );
// }

// export async function getStaticProps() {
//   const res = await fetch(
//     `https://dev.to/api/articles?username=amirseraj&state=all`
//   );
//   const articles = await res.json();

//   return {
//     props: {
//       articles,
//     },
//     revalidate: 60,
//   };
// }
