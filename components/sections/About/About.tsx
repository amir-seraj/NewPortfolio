import { Text, Box, Container, Link } from "@components/ui";
import { motion } from "framer-motion";
import { Button } from "@components/ui";

export const About = () => {
  return (
    <Container
      id="about"
      className=" grid max-w-[1180px] gap-10 md:mb-40 md:grid-cols-2 2xl:max-w-7xl"
    >
      <Box className="m-8 flex flex-col h-full">
        <Text as="h1" className="mb-6 text-3xl font-bold ">
          <motion.span
            className="block"
            initial={{ x: -10 }}
            transition={{ duration: 0.8 }}
            whileInView={{ x: 0 }}
          >
            A little bit about me
          </motion.span>
        </Text>
        <Text as="p" fontSize="md" className="mb-6 gap-5 text-sm 2xl:gap-10 ">
          I'm Amir, a passionate explorer of the intersection between technology
          and human experience. Currently pursuing my MSc in Human-Computer
          Interaction, I’m fascinated by how affective computing can transform
          user interactions. Whether I'm diving into the nuances of emotion
          recognition in gaming or tinkering with XR technologies, I’m always up
          for a challenge. With a background in computer engineering, I bring a
          strong technical foundation to my research, but it's my curiosity and
          love for problem-solving that drive me.
          {/* <Link
            className="font-medium text-slate-500 dark:text-slate-100"
            target="_blank"
            href="https://github.com/ArsalanSeraj/"
          >
            Eth Marketplace
          </Link> */}
        </Text>
        <Box>
          <a
            href="/resume.pdf"
            download="resume.pdf"
            className="m-1 font-heading text-sm uppercase"
          >
            <Button variant="primary" size="lg">
              See My Resume
            </Button>
          </a>
          <a href="/projects" className="m-1 font-heading text-sm uppercase">
            <Button variant="primary" size="lg">
              My Projects
            </Button>
          </a>
        </Box>
      </Box>
      <Box className="m-8">
        <Text as="h2" className="mb-6 text-3xl font-bold">
          My Skills
        </Text>
        <Box className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-transparent">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-4 text-left font-thin text-gray-600">
                  Technical Skills
                </th>
                <th className="p-4 text-left font-thin text-gray-600">
                  Soft Skills
                </th>
                <th className="p-4 text-left font-thin text-gray-600">
                  Other Skills
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b">
                <td className="p-4 ">
                  Python, JavaScript
                  <br />
                  OpenCV, TensorFlow, Keras{" "}
                </td>
                <td className="p-4">Teamwork and Collaboration</td>
                <td className="p-4">React, Tailwind</td>
              </tr>
              <tr className="border-b">
                <td className="p-4">
                  Dataset Creation,
                  <br />
                  Literature Review
                </td>
                <td className="p-4">Effective Communication</td>
                <td className="p-4">Node.JS, Mongodb</td>
              </tr>
              <tr className="border-b">
                <td className="p-4">
                  Data Preprocessing, <br />
                  Model Development
                </td>
                <td className="p-4">Problem-Solving and Critical Thinking</td>
                <td className="p-4">Photoshop, AfterEffects, Figma</td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Box>
    </Container>
  );
};
