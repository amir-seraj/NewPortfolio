"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { MdOutlineArrowForward } from "react-icons/md";

import { Container, Link } from "@components/ui";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

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

type HeroProps = {
  hero?: {
    lines?: { text: string; accent?: boolean | null }[] | null;
    ctaLabel?: string | null;
    ctaHref?: string | null;
    strip?: { item: string }[] | null;
  } | null;
};

export function Hero({ hero }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const lines = hero?.lines?.length ? hero.lines : LINES;
  const strip = hero?.strip?.length ? hero.strip.map((s) => s.item) : STRIP;
  const ctaLabel = hero?.ctaLabel ?? "See the evidence";
  const ctaHref = hero?.ctaHref ?? "#work";

  return (
    <section
      id="top"
      className="overflow-hidden border-b border-slate-300 bg-[#f4f1eb] text-slate-950 dark:border-white/10 dark:bg-[#202020] dark:text-white"
    >
      <Container className="grid min-h-[92vh] max-w-[1500px] items-center gap-12 pb-14 pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(330px,0.48fr)] lg:gap-16 lg:pb-20 lg:pt-32">
        <div className="relative z-[1]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_EXPO }}
            className="flex items-center gap-3"
          >
            <span className="h-2 w-2 rounded-full bg-mango-500 dark:bg-mango-300" />
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
              Researcher · Creative technologist · Human first
            </p>
          </motion.div>

          <h1 className="mt-8 max-w-[12ch] text-balance font-heading text-[clamp(3.15rem,8.2vw,8.4rem)] font-bold leading-[0.92] tracking-[-0.055em]">
            {lines.map(({ text, accent }, index) => (
              <span key={`${text}-${index}`} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={
                    accent
                      ? "block text-mango-700 dark:text-mango-300"
                      : "block"
                  }
                  initial={reduceMotion ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.75,
                    ease: EASE_EXPO,
                    delay: 0.08 + index * 0.12,
                  }}
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_EXPO, delay: 0.48 }}
            className="mt-8 flex flex-col items-start gap-7 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-[54ch] text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
              I design intelligent systems that read emotion, movement, and
              context—then turn those signals into interactions people can
              actually feel.
            </p>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link
                href={ctaHref}
                className="group inline-flex min-h-[48px] items-center bg-slate-950 px-6 font-heading text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-mango-700 dark:bg-mango-300 dark:text-mango-950 dark:hover:bg-mango-200"
              >
                {ctaLabel}
                <MdOutlineArrowForward className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/resume.pdf"
                target="_blank"
                className="inline-flex min-h-[48px] items-center border border-slate-300 px-5 font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700 transition-colors hover:border-slate-950 hover:text-slate-950 dark:border-white/20 dark:text-slate-300 dark:hover:border-white dark:hover:text-white"
              >
                Résumé ↗
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.figure
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: EASE_EXPO, delay: 0.25 }}
          className="relative mx-auto w-full max-w-[520px] border border-slate-800 bg-[#1d1d1d] text-white shadow-[0_40px_90px_-60px_rgba(15,23,42,0.85)] lg:mx-0"
        >
          <div className="relative aspect-square overflow-hidden">
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-mango-300/20"
            />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-mango-300/20"
            />
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-1/2 h-px bg-white/[0.08]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 top-0 w-px bg-white/[0.08]"
            />
            <Image
              src="/images/amir-banner-mobile.png"
              alt="Amir Seraj"
              fill
              priority
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 520px, calc(100vw - 40px)"
              className="object-contain object-bottom p-4 pb-0"
            />
            <span className="absolute left-5 top-5 bg-mango-300 px-3 py-2 font-heading text-[9px] font-bold uppercase tracking-[0.16em] text-mango-950">
              Human in the loop
            </span>
          </div>
          <figcaption className="flex items-center justify-between border-t border-white/15 px-5 py-3 font-heading text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
            <span>Amir Seraj</span>
            <span>Genova, Italy</span>
          </figcaption>
        </motion.figure>
      </Container>

      <div className="border-t border-slate-300 dark:border-white/10">
        <Container className="grid max-w-[1500px] divide-y divide-slate-300 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 dark:divide-white/10">
          {strip.map((item, index) => (
            <motion.div
              key={item}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: EASE_EXPO,
                delay: 0.68 + index * 0.08,
              }}
              className="flex items-center gap-4 px-4 py-4 first:pl-0 sm:first:pl-4 lg:px-6"
            >
              <span className="font-heading text-[9px] font-bold tabular-nums text-mango-700 dark:text-mango-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.13em] text-slate-700 dark:text-slate-300">
                {item}
              </span>
            </motion.div>
          ))}
        </Container>
      </div>
    </section>
  );
}
