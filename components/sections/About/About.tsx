"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Box, Container, Text } from "@components/ui";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const HEADING = "Who's asking";

const PARAGRAPHS = [
  {
    text: "Engineer's training. Researcher's questions. Three shipped systems that read emotion, posture and balance, and answer well. If software is going to watch people anyway, it should learn some manners; mine do.",
  },
];

const COUNTS = [
  { value: 13, label: "projects shipped, 2023 to 2026" },
  { value: 2, label: "installations exhibited in 2024" },
  { value: 1, label: "mirror that reads faces" },
];

type AboutProps = {
  about?: {
    heading?: string | null;
    paragraphs?: { text: string }[] | null;
    stats?: { value: number; label: string }[] | null;
  } | null;
};

const CountUp = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 700;
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          el.textContent = String(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
};

export const About = ({ about }: AboutProps) => {
  const reduceMotion = useReducedMotion();
  const heading = about?.heading ?? HEADING;
  const paragraphs = about?.paragraphs?.length ? about.paragraphs : PARAGRAPHS;
  const stats = about?.stats?.length ? about.stats : COUNTS;

  return (
    <Container
      id="about"
      className="mb-28 grid w-full gap-12 pt-24 md:grid-cols-2 md:gap-16 2xl:max-w-7xl"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASE_EXPO }}
      >
        <Text
          as="h2"
          className="mb-5 font-heading text-3xl font-bold md:text-4xl"
        >
          {heading}
        </Text>
        {paragraphs.map((p, i) => (
          <Text key={i} as="p" className="max-w-[58ch] leading-relaxed">
            {p.text}
          </Text>
        ))}
      </motion.div>
      <Box className="flex flex-col gap-6 md:pt-2">
        {stats.map(({ value, label }, i) => (
          <motion.div
            key={label}
            className="border-t border-slate-300 pt-4 dark:border-slate-600"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE_EXPO, delay: i * 0.12 }}
          >
            <span className="block font-heading text-4xl font-bold leading-tight text-mango-700 dark:text-mango-300">
              <CountUp value={value} />
            </span>
            {label}
          </motion.div>
        ))}
      </Box>
    </Container>
  );
};
