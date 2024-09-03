import { BsArrowUpCircle } from "react-icons/bs";

import { Container, Box, Text, Link } from "@components/ui";
import { Subscribe, Copyright } from "@components/common";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer id="subscribe">
      <Container className="relative grid-cols-5 gap-20 mb-10 md:grid 2xl:px-16">
        <Box className="max-w-lg col-span-2">
          <Text
            as="h4"
            casing="uppercase"
            fontWeight="medium"
            fontSize="xl"
            className="mb-4 font-heading"
          >
            <motion.span
              className="block"
              initial={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              whileInView={{ opacity: 1 }}
            >
              Amir Seraj
            </motion.span>
          </Text>
          <Text className="mb-6">
            <motion.span
              className="block"
              initial={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              whileInView={{ opacity: 1 }}
            >
              An engineer who is trying to make the
              world a better place one{" "}
              <code className="text-sm font-bold dark:font-medium dark:text-slate-300 2xl:text-lg">
                {"<commit/>"}
              </code>{" "}
              at a time 😎.
            </motion.span>
          </Text>
          <Box className="hidden col-span-2 md:block">
            <Text
              as="h6"
              casing="uppercase"
              fontWeight="medium"
              className="mb-4 font-heading"
            >
              <motion.span
                className="block"
                initial={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                whileInView={{ opacity: 1 }}
              >
                Quick Links
              </motion.span>
            </Text>
            <motion.span
              className="block"
              initial={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              whileInView={{ opacity: 1 }}
            >
              <Link
                href="mailto:amirseraj.ir@gmail.com"
                className="block mb-3 text-base font-medium hover:text-slate-500 dark:hover:text-slate-100 dark:text-slate-300"
              >
                <code>{"<Email me/>"}</code>
              </Link>
              <Link
                href="/projects"
                className="block mb-3 text-base font-medium hover:text-slate-500 dark:hover:text-slate-100 dark:text-slate-300"
              >
                <code>{"<See the Projects/>"}</code>
              </Link>
              <Link
                href="/#about"
                className="block mb-3 text-base font-medium hover:text-slate-500 dark:hover:text-slate-100 dark:text-slate-300"
              >
                <code>{"<About Amir/>"}</code>
              </Link>
            </motion.span>
          </Box>
        </Box>
        {/* <Box className="hidden col-span-2 md:block">
          <Subscribe />
        </Box> */}

        <Link
          href="#top"
          className="absolute bottom-0 items-center hidden gap-2 text-sm font-medium text-slate-500 uppercase transition duration-300 ease-in-out group right-10 hover:text-slate-100 dark:text-slate-300 md:flex"
        >
          Back to top
          <BsArrowUpCircle className="relative -top-[2px] h-5 w-5 transform transition duration-300 ease-in-out group-hover:-translate-y-1" />
        </Link>
      </Container>

      <Copyright />
    </footer>
  );
};
