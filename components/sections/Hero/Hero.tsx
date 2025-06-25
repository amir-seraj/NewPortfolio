import Image from "next/image";
import { motion } from "framer-motion";
import { AiOutlineArrowDown } from "react-icons/ai";

import { Text, Box, Container, Link, Button } from "@components/ui";

export const Hero = () => {
  return (
    <Box
      className="mb-10 flex flex-col items-center justify-center md:mb-40 md:grid md:h-screen md:grid-cols-3"
      id="top"
    >
      <Container className=" order-0 flex w-full flex-col pt-5">
        <Box className="order-1 mt-5 flex max-w-xl flex-col md:order-2">
          <Text as="h1" className="md:ml-12 pt-16 md:pt-0">
            <motion.span
              className="md:text-4xl block text-3xl text-center md:text-left "
              initial={{ y: 0, opacity: 0 }}
              transition={{ duration: 0.8 }}
              whileInView={{ y:0, opacity: 1 }}
            >
              Hi 👋🏼, I&apos;m Amir. <br /> HCI Researcher/ <br />
              Developer.
            </motion.span>
          </Text>
        </Box>
      </Container>
      <motion.div
        initial={{ opacity: 0.8 }}
        transition={{ duration: 0.6 }}
        animate={{ opacity: 1 }}
        className="md:hidden"
      >
        <Image
          src="/images/amir-banner-mobile.png"
          layout="fixed"
          height={300}
          width={300}
          objectFit="contain"
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
        className="relative left-0 order-1 mt-0 hidden h-full max-w-xl items-center justify-center pt-3 md:flex "
      >
        <Image
          src="/images/amir-banner.png"
          layout="fixed"
          width={700}
          height={700}
          objectFit="contain"
          priority
          quality={100}
          blurDataURL="/images/amir-banner.png"
          placeholder="blur"
          objectPosition="bottom"
          alt="Amir Seraj"
        />
      </motion.div>
      <Container className="md:order-0 order-1 flex w-full flex-col justify-between pb-12 pt-5">
        <Box className="order-1 mt-5 max-w-xl md:order-2 md:mt-10">
          <Text className="mb-6 text-black dark:text-white 2xl:mb-10">
            <motion.span
              className="block  text-center  md:text-left"
              initial={{ y: 20, opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              whileInView={{ y:0, opacity: 1 }}
            >
              <code className="text-2xl font-medium text-black dark:text-white md:text-2xl 2xl:text-xl">
                &lt;GREETINGS😎/&gt;, <br />
              </code>
              nice to meet you. I&apos;m a researcher and developer passionate about 
              creating meaningful interactions between humans and technology.
            </motion.span>
          </Text>
          <Box className="order-1 max-w-xl md:order-2">
            <motion.span
              className=" flex flex-col justify-center items-center"
              initial={{ y: 40, opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              whileInView={{ y: 0, opacity: 1 }}
            >

              <Link
                href="/resume.pdf"
                className="font-heading text-sm uppercase"
              >
                <Button variant="primary" size="lg" className="hidden">
                  See my Resume
                </Button>
              </Link>
            </motion.span>
          </Box>
        </Box>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          whileInView={{ y: 100, opacity: 1 }}
          className="order-2 hidden md:order-3 md:block"
        >
          <Link
            className="flex animate-bounce gap-1 font-heading text-sm uppercase text-slate-900 hover:text-slate-100 dark:text-slate-300 dark:hover:text-slate-100"
            href="#latest"
          >
            <AiOutlineArrowDown className="h-[21px] w-auto" /> scroll down
          </Link>
        </motion.div>
      </Container>
    </Box>
  );
};
