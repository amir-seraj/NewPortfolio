import Image from "next/image";
import { Text, Box, Container, Link } from "@components/ui";
import { motion } from "framer-motion";
import { Button } from "@components/ui";

export const About = () => {
  return (
    <Container
      id="about"
      className=" grid max-w-[1180px] gap-10 md:mb-40 md:grid-cols-5 2xl:max-w-7xl"
    >
      <Box className="m-3 md:col-span-3 md:mt-20">
        <Text as="h2" className="mb-5" fontSize="4xl">
          <motion.span
            className="block"
            initial={{ x: -10 }}
            transition={{ duration: 0.8 }}
            whileInView={{ x: 0 }}
          >
            A little bit about me
          </motion.span>
        </Text>
        <Text className="gap-5 md:columns-2 2xl:gap-10">
          Hello there, my name is Amir, a passionate Software Developer from
          Isfahan, Iran. I currently work as a{" "}
          <span className="font-medium">Web Developer</span> as a{" "}
          <Link
            className="font-medium text-yellow-500 dark:text-yellow-500"
            target="_blank"
            href="https://github.com/amir-seraj"
          >
            Freelancer
          </Link>
          . I&lsquo;m obsessed with making best user experience in all aspects
          of web, I&lsquo;ve worked on a variety of projects, ranging from
          back-end or front-end to smart contracts, such as{" "}
          <Link
            className="font-medium text-yellow-500 dark:text-yellow-500"
            target="_blank"
            href="https://github.com/ArsalanSeraj/jobify"
          >
            Jobify
          </Link>
          ,{" "}
          <Link
            className="font-medium text-yellow-500 dark:text-yellow-500"
            target="_blank"
            href="https://github.com/ArsalanSeraj/"
          >
            Eth Marketplace
          </Link>
          , and{" "}
          <Link
            className="font-medium text-yellow-500 dark:text-yellow-500"
            target="_blank"
            href="https://github.com/ArsalanSeraj/Animations-Effects"
          >
            Animation-Effects
          </Link>
          .
        </Text>
        <Button
          variant="primary"
          size="lg"
          target="_blank"
          href="/myResume.pdf"
          className="mt-8 mr-3 text-sm uppercase font-heading"
        >
          See my resume
        </Button>
      </Box>
      <motion.div
        initial={{ translateX: 30 }}
        transition={{ duration: 1 }}
        whileInView={{ translateX: 0 }}
        className="h-34 relative mb-20 flex items-start justify-center md:col-span-2 md:h-[360px]  2xl:h-[420px]"
      >
        <Image
          src="/images/me.png"
          layout="fixed"
          height={400}
          width={400}
          alt="Amir"
          quality={100}
        />
      </motion.div>
    </Container>
  );
};
