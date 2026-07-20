"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@components/ui";

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
  projectCount?: number;
  projectYearRange?: string;
};

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduceMotion) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const startedAt = performance.now();
        const duration = 700;
        const tick = (now: number) => {
          const progress = Math.min(1, (now - startedAt) / duration);
          element.textContent = String(
            Math.round(value * (1 - Math.pow(1 - progress, 3)))
          );
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [value, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}

export function About({ about, projectCount, projectYearRange }: AboutProps) {
  const reduceMotion = useReducedMotion();
  const heading = about?.heading ?? HEADING;
  const paragraphs = about?.paragraphs?.length ? about.paragraphs : PARAGRAPHS;
  const configuredStats = about?.stats?.length ? about.stats : COUNTS;
  const stats = configuredStats.map((stat, index) =>
    index === 0 && projectCount !== undefined
      ? {
          value: projectCount,
          label: `projects shipped${projectYearRange ? `, ${projectYearRange}` : ""}`,
        }
      : stat
  );

  return (
    <section id="about" className="bg-[#1d1d1d] text-white">
      <Container className="max-w-[1320px] py-24 md:py-32 lg:py-40">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            className="md:col-span-4"
          >
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-mango-300">
              01 / Point of view
            </p>
            <h2 className="mt-5 max-w-[11ch] font-heading text-4xl font-bold leading-[1.02] tracking-tight md:text-5xl">
              {heading}
            </h2>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.68, ease: EASE_EXPO, delay: 0.1 }}
            className="md:col-span-8 lg:col-span-7 lg:col-start-6"
          >
            {paragraphs.map((paragraph, index) => (
              <p
                key={`${paragraph.text}-${index}`}
                className="mb-6 text-balance text-xl leading-relaxed text-slate-200 last:mb-0 md:text-2xl md:leading-relaxed lg:text-3xl"
              >
                {paragraph.text}
              </p>
            ))}
            <p className="mt-8 max-w-[58ch] text-sm leading-relaxed text-slate-400 md:text-base">
              My work sits where machine perception meets interaction design:
              rigorous enough to measure, thoughtful enough to question what
              should be measured in the first place.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 grid border-y border-white/15 md:mt-28 md:grid-cols-3 md:divide-x md:divide-white/15">
          {stats.map(({ value, label }, index) => (
            <motion.div
              key={label}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                duration: 0.6,
                ease: EASE_EXPO,
                delay: index * 0.1,
              }}
              className="grid grid-cols-[76px_1fr] items-center gap-5 border-b border-white/15 py-7 last:border-b-0 md:block md:border-b-0 md:px-8 md:py-9 md:first:pl-0 md:last:pr-0"
            >
              <span className="font-heading text-5xl font-bold leading-none text-mango-300 md:text-6xl">
                <CountUp value={value} />
              </span>
              <p className="mt-0 max-w-[22ch] text-sm leading-relaxed text-slate-300 md:mt-4">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
