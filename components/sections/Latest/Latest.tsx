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

export const LatestBlogs = ({ articles }) => {
  const [x, setX] = useState(0);

  const translate = (pos) => {
    setX((prev) => prev + pos);
  };

  return (
    <Container full className={s.root} id="latest">
      <Container className="mb-5">
        <Box className="flex items-center justify-between mb-7">
          <Text as="h2" fontSize="4xl">
            <motion.span
              className="block"
              initial={{ x: -10 }}
              transition={{ duration: 1 }}
              whileInView={{ x: 0 }}
            >
              Latest Blogs
            </motion.span>
          </Text>
          <Link
            href="/blog"
            className="hidden text-sm font-medium uppercase font-heading hover:text-yellow-500 dark:hover:text-yellow-500 md:block"
          >
            <motion.span
              className="block"
              initial={{ x: 10 }}
              transition={{ duration: 1 }}
              whileInView={{ x: 0 }}
            >
              See the full blog
            </motion.span>
          </Link>
        </Box>
        <Text className="md:hidden">
          <motion.span
            className="block mb-3"
            initial={{ x: -10 }}
            transition={{ duration: 0.6 }}
            whileInView={{ x: 0 }}
          >
            My blog is where I share my thoughts and experiences about tech and
            the web in general. Swipe left or right to see some of my latest
            blogs
          </motion.span>
          <Link
            href="/blog"
            className="text-sm font-medium text-yellow-500 uppercase font-heading"
          >
            See the full blog
          </Link>{" "}
        </Text>
      </Container>

      <Container className="md:hidden">
        <Swiper effect={"cards"} grabCursor={true}>
          {articles?.length &&
            articles.map(
              ({
                id,
                slug,
                title,
                published_at,
                reading_time_minutes,
                cover_image,
              }) => (
                <SwiperSlide key={id}>
                  <Card
                    slug={slug}
                    title={title}
                    date={published_at}
                    readingTime={reading_time_minutes}
                    coverImage={cover_image}
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
          {articles?.length &&
            articles.map(
              (
                {
                  id,
                  slug,
                  title,
                  published_at,
                  reading_time_minutes,
                  cover_image,
                },
                idx
              ) => (
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
                    date={published_at}
                    readingTime={reading_time_minutes}
                    coverImage={cover_image}
                  />
                </motion.div>
              )
            )}
        </Box>
      </AnimatePresence>
      <Container className="hidden md:block">
        <Button
          className={s.arrows}
          size="sm"
          disabled={x === 0}
          onClick={() => translate(510)}
        >
          <MdArrowBackIosNew className="w-auto h-6" />
          <span className="sr-only">Click to move one slide to left</span>
        </Button>
        <Button
          className={s.arrows}
          disabled={x === -1530}
          size="sm"
          onClick={() => translate(-510)}
        >
          <MdArrowForwardIos className="w-auto h-6" />
          <span className="sr-only">Click to move one slide to right</span>
        </Button>
      </Container>
    </Container>
  );
};
