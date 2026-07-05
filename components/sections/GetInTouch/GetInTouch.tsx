"use client";

import { motion, useReducedMotion } from "motion/react";

import { Box, Container, Text } from "@components/ui";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

type GetInTouchProps = {
  kicker?: string | null;
  email?: string | null;
};

export const GetInTouch = ({ kicker, email }: GetInTouchProps) => {
  const reduceMotion = useReducedMotion();
  const kickerText = kicker ?? "One address. No form.";
  const emailAddress = email ?? "amirseraj.ir@gmail.com";

  return (
    <Box className="mb-20 py-16 text-center" id="contact">
      <Container>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
        >
          <Text
            className="mb-4 font-heading text-sm font-medium uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300"
            align="center"
          >
            {kickerText}
          </Text>
          <a
            href={`mailto:${emailAddress}`}
            className="inline-block font-heading text-2xl font-bold text-teal-700 underline decoration-2 underline-offset-8 transition-colors hover:text-teal-600 dark:text-teal-300 dark:hover:text-teal-200 md:text-4xl"
          >
            {emailAddress}
          </a>
        </motion.div>
      </Container>
    </Box>
  );
};
