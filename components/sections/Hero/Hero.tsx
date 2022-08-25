import Image from "next/image";
import { motion } from "framer-motion";
import { AiOutlineArrowDown } from "react-icons/ai";

import { Text, Box, Container, Link, Button } from "@components/ui";
import { Calendy } from "@components/common";

export const Hero = () => {
  return (
    <Box className="grid mb-10 md:mb-40 md:h-screen md:grid-cols-3" id="top">
      <Container className="flex flex-col justify-between order-1 w-full pt-5 pb-12 md:order-0">
        <Box className="flex flex-col items-center justify-center order-1 max-w-xl mt-5 md:order-2">
          <Text as="h1" className="md:ml-12 md:mt-32" fontSize="5xl">
            <motion.span
              className="block"
              initial={{ y: 0, opacity: 0 }}
              transition={{ duration: 0.8 }}
              whileInView={{ y: 80, opacity: 1 }}
            >
              Hi 👋🏼, I’m Amir. <br /> Software Engineer, Music Enthusiast.
            </motion.span>{" "}
          </Text>{" "}
          <Box className="order-1 max-w-xl mt-10 md:order-2">
            <motion.span
              className="block"
              initial={{ y: 40, opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              whileInView={{ y: 30, opacity: 1 }}
            >
              {" "}
              <Image
                src="/images/arrow.png"
                layout="fixed"
                height={100}
                width={100}
                alt="#"
              ></Image>
              <Button
                variant="primary"
                size="lg"
                target="_blank"
                href="/myResume.pdf"
                className="text-sm uppercase font-heading"
              >
                See my resume
              </Button>
            </motion.span>
          </Box>
        </Box>
      </Container>
      <motion.div
        initial={{ opacity: 0.8 }}
        transition={{ duration: 0.6 }}
        animate={{ opacity: 1 }}
        className="relative mx-7 mt-[74px] h-[20vh]  md:hidden  "
      >
        <Image
          src="/images/amir-banner.png"
          layout="fixed"
          height={280}
          width={280}
          objectFit="cover"
          objectPosition="bottom"
          priority
          quality={100}
          blurDataURL="/images/amir-banner.png"
          placeholder="blur"
          alt="Amir Seraj"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0.8 }}
        transition={{ duration: 0.6 }}
        animate={{ opacity: 1 }}
        className="relative left-0 items-center justify-center order-1 hidden h-full max-w-xl pt-3 mt-0 md:flex"
      >
        <Image
          src="/images/amir-banner.png"
          layout="fill"
          objectFit="cover"
          priority
          quality={100}
          blurDataURL="/images/amir-banner.png"
          placeholder="blur"
          alt="Amir Seraj"
        />
      </motion.div>{" "}
      <Container className="flex flex-col justify-between order-1 w-full pt-5 pb-12 md:order-0">
        <Box className="md:mb-10" />
        <Box className="order-1 max-w-xl mt-5 md:order-2 md:mt-10">
          <Text className="mb-6 text-black dark:text-white 2xl:mb-10">
            <motion.span
              className="block"
              initial={{ y: 20, opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              whileInView={{ y: 0, opacity: 1 }}
            >
              <code className="text-2xl font-medium text-black dark:text-white md:text-4xl 2xl:text-xl">
                &lt;HELLO WORLD😎/&gt;, <br />
              </code>
              nice to meet you. This is the place that you can get in touch with
              me, you can get to know me more by reading my blog.
            </motion.span>
          </Text>
          <Box className="flex">
            <motion.div
              initial={{ x: -10 }}
              transition={{ duration: 1, delay: 0.4 }}
              whileInView={{ x: 0 }}
            >
              <Button
                variant="primary"
                size="lg"
                href="/blog"
                className="mr-3 text-sm uppercase font-heading"
              >
                Read my blog
              </Button>
            </motion.div>
            <motion.div
              initial={{ x: 10 }}
              transition={{ duration: 1, delay: 0.4 }}
              whileInView={{ x: 0 }}
            >
              <Calendy>Schedule meeting</Calendy>
            </motion.div>
          </Box>
        </Box>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="order-2 hidden md:order-3 md:block"
        >
          <Link
            className="flex gap-1 text-sm uppercase animate-bounce font-heading text-slate-900 hover:text-yellow-500 dark:text-slate-200 dark:hover:text-yellow-500"
            href="#latest"
          >
            <AiOutlineArrowDown className="h-[21px] w-auto" /> scroll down
          </Link>
        </motion.div>
      </Container>
    </Box>
  );
};
