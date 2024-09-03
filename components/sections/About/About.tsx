import { Text, Box, Container, Link } from "@components/ui";
import { motion } from "framer-motion";
import { Button } from "@components/ui";

export const About = () => {
  return (
    <Container
      id="about"
      className="flex flex-col justify-center items-center md:grid max-w-[1180px] md:gap-10 md:mb-40 md:grid-cols-2 2xl:max-w-7xl"
    >
      <Box className="m-8 flex h-full flex-col w-full">
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
          I&apos;m Amir, a passionate explorer of the intersection between
          technology and human experience. Currently pursuing my MSc in
          Human-Computer Interaction, I&apos;m fascinated by how affective
          computing can transform user interactions. Whether I&apos;m diving
          into the nuances of emotion recognition in gaming or tinkering with XR
          technologies, I&apos;m always up for a challenge. With a background in
          computer engineering, I bring a strong technical foundation to my
          research, but it&apos;s my curiosity and love for problem-solving that
          drive me.
        </Text>
        <Box>
          <Link
            href="/resume.pdf"
            className="m-1 font-heading text-sm uppercase"
          >
            <Button variant="primary" size="lg">
              See My Resume
            </Button>
          </Link>
          <Link href="/projects" className="m-1 font-heading text-sm uppercase">
            <Button variant="primary" size="lg">
              My Projects
            </Button>
          </Link>
        </Box>
      </Box>
      <Box className=" my-8 w-full">
        <Text as="h2" className="mb-6 text-3xl font-bold">
          My Skills
        </Text>
        <Box className="overflow-x-auto">
          <table className="w-full border border-gray-300 bg-transparent">
            <thead>
              <tr className="border-b text-base md:text-lg bg-gray-100">
                <th className="p-3 text-left font-thin text-gray-600">
                  Technical Skills
                </th>
                <th className="text-left font-thin text-gray-600">
                  Soft Skills
                </th>
                <th className="text-left font-thin text-gray-600">
                  Other Skills
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className=" border-b">
                <td className="p-3">
                  Python, JavaScript
                  <br />
                  OpenCV, TensorFlow, Keras{" "}
                </td>
                <td className="p-3">Teamwork and Collaboration</td>
                <td className="p-3">React, Tailwind</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">
                  Dataset Creation,
                  <br />
                  Literature Review
                </td>
                <td className="p-3">Effective Communication</td>
                <td className="p-3">Node.JS, Mongodb</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">
                  Data Preprocessing, <br />
                  Model Development
                </td>
                <td className="p-3">Problem-Solving and Critical Thinking</td>
                <td className="p-3">Photoshop, AfterEffects, Figma</td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Box>
    </Container>
  );
};
