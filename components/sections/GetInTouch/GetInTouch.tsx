"use client";

import { motion, useReducedMotion } from "motion/react";
import { MdOutlineArrowOutward } from "react-icons/md";

import { Container } from "@components/ui";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

type GetInTouchProps = {
  kicker?: string | null;
  email?: string | null;
};

export function GetInTouch({ kicker, email }: GetInTouchProps) {
  const reduceMotion = useReducedMotion();
  const kickerText = kicker ?? "One address. No form.";
  const emailAddress = email ?? "amirseraj.ir@gmail.com";

  return (
    <section id="contact" className="bg-mango-300 text-mango-950">
      <Container className="max-w-[1500px] py-20 md:py-28 lg:py-32">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: EASE_EXPO }}
          className="grid gap-10 md:grid-cols-12 md:gap-8"
        >
          <div className="md:col-span-3">
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em]">
              04 / Start a conversation
            </p>
            <p className="mt-4 text-sm leading-relaxed opacity-75">
              {kickerText}
            </p>
          </div>

          <div className="md:col-span-9 lg:col-span-8">
            <h2 className="max-w-[17ch] text-balance font-heading text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
              Have a strange, human problem worth exploring?
            </h2>
            <a
              href={`mailto:${emailAddress}`}
              className="group mt-12 flex w-full items-end justify-between gap-5 border-b-2 border-mango-950 pb-4 font-heading text-[clamp(1.35rem,3.6vw,3.7rem)] font-bold leading-tight tracking-tight transition-opacity hover:opacity-70"
            >
              <span className="break-all">{emailAddress}</span>
              <MdOutlineArrowOutward className="mb-1 h-8 w-8 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:h-11 md:w-11" />
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
