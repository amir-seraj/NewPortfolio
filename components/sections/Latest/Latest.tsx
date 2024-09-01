import { useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";

import { Box, Button, Card, Container, Link, Text } from "@components/ui";
import s from "./Latest.module.scss";
import { motion, AnimatePresence } from "framer-motion";

SwiperCore.use([EffectCards]);

export const LatestProjects = ({ projects }) => {
  const [x, setX] = useState(0);

  const translate = (pos) => {
    setX((prev) => prev + pos);
  };

  return (
    <Container full className={s.root} id="latest">
      <Container className="mb-5">
        <Box className="mb-7 flex items-center justify-between">
          <Text as="h2" fontSize="4xl">
            <motion.span
              className="block"
              initial={{ x: -10 }}
              transition={{ duration: 1 }}
              whileInView={{ x: 0 }}
            >
              Latest Projects
            </motion.span>
          </Text>
          <Link
            href="/projects"
            className="hidden font-heading text-sm font-medium uppercase hover:text-slate-500 dark:hover:text-slate-100 md:block"
          >
            <motion.span
              className="block"
              initial={{ x: 10 }}
              transition={{ duration: 1 }}
              whileInView={{ x: 0 }}
            >
              See the full project
            </motion.span>
          </Link>
        </Box>
        <Text className="md:hidden">
          <motion.span
            className="mb-3 block"
            initial={{ x: -10 }}
            transition={{ duration: 0.6 }}
            whileInView={{ x: 0 }}
          >
            My projects is where I share my thoughts and experiences about tech and
            the web in general. Swipe left or right to see some of my latest
            projects
          </motion.span>
          <Link
            href="/projects"
            className="font-heading text-sm font-medium uppercase text-slate-500"
          >
            See the all projects
          </Link>{" "}
        </Text>
      </Container>

      <Container className="md:hidden">
        <Swiper effect={"cards"} grabCursor={true}>
          {projects?.length &&
            projects.map(
              ({ id, slug, title, publishedAt, readTime, coverImage }) => (
                <SwiperSlide key={id}>
                  <Card
                    slug={slug}
                    title={title}
                    date={publishedAt}
                    readingTime={readTime}
                    coverImage={coverImage}
                  />
                </SwiperSlide>
              )
            )}
        </Swiper>
      </Container>
      <AnimatePresence>
        <Box
          className="hidden w-[3000px] gap-x-10 pl-10 transition duration-500 ease-in-out md:flex"
          style={{ transform: `translate3d(${x}px, 0px, 0px)` }}
        >
          {projects?.length &&
            projects.map(
              ({ id, slug, title, publishedAt, readTime, coverImage }, idx) => (
                <motion.div
                  key={id}
                  initial={{
                    opacity: 0,
                    y: -40,
                  }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: (idx + 0) * 0.15,
                    duration: 1,
                    ease: [0.6, 0.05, -0.01, 0.9],
                  }}
                >
                  <Card
                    slug={slug}
                    title={title}
                    date={publishedAt}
                    readingTime={readTime}
                    coverImage={coverImage}
                  />
                </motion.div>
              )
            )}
        </Box>
      </AnimatePresence>
      <Container className="hidden md:block ">
        <Button
          variant="primary"
          size="lg"
          disabled={x === 0}
          className="m-2"
          onClick={() => translate(510)}
        >
          <MdArrowBackIosNew className="" />
          <span className="sr-only">Click to move one slide to left</span>
        </Button>
        <Button
          variant="primary"
          className="m-2"
          size="lg"
          disabled={x === -1530}

          onClick={() => translate(-510)}
        >
          <MdArrowForwardIos className="" />
          <span className="sr-only">Click to move one slide to right</span>
        </Button>
      </Container>
    </Container>
  );
};
