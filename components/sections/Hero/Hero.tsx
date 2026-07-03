import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Box, Container, Link } from "@components/ui";

const EASE_EXPO = [0.16, 1, 0.3, 1];

const LINES = [
  { text: "Machines can learn", accent: false },
  { text: "to notice people.", accent: false },
  { text: "I teach them.", accent: true },
];

const STRIP = [
  "Affective computing",
  "Emotion recognition",
  "Interactive art",
  "MSc HCI · Genova",
];

export const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <Box id="top">
      <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-6 pt-24 md:grid md:min-h-[86vh] md:grid-cols-5 md:gap-6 md:pt-10">
        <Box className="order-1 w-full md:order-none md:col-span-3">
          <h1 className="font-heading text-4xl font-bold leading-[1.06] tracking-tight text-slate-900 dark:text-slate-100 md:text-6xl 2xl:text-7xl">
            {LINES.map(({ text, accent }, i) => (
              <span key={text} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={
                    accent ? "block text-teal-700 dark:text-teal-300" : "block"
                  }
                  initial={reduceMotion ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: EASE_EXPO,
                    delay: 0.05 + i * 0.13,
                  }}
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-9"
          >
            <Link
              href="#work"
              className="inline-block bg-teal-300 px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider text-teal-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-teal-200 active:scale-95"
            >
              See the evidence
            </Link>
          </motion.div>
        </Box>
        <motion.div
          className="md:col-span-2"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.35 }}
        >
          <Image
            src="/images/amir-banner.png"
            width={560}
            height={640}
            objectFit="contain"
            objectPosition="bottom"
            priority
            quality={100}
            alt="Amir Seraj"
          />
        </motion.div>
      </Container>

      <Box
        className="flex flex-wrap gap-x-9 gap-y-2 bg-[#0f2e2a] px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.14em] text-teal-300 md:px-12 md:text-sm"
        role="presentation"
      >
        {STRIP.map((item, i) => (
          <motion.span
            key={item}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: EASE_EXPO,
              delay: 0.7 + i * 0.09,
            }}
          >
            {item}
          </motion.span>
        ))}
      </Box>
    </Box>
  );
};
