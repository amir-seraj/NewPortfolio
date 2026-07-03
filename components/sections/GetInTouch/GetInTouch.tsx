import { motion, useReducedMotion } from "framer-motion";

import { Box, Container, Text } from "@components/ui";

const EASE_EXPO = [0.16, 1, 0.3, 1];

export const GetInTouch = () => {
  const reduceMotion = useReducedMotion();

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
            One address. No form.
          </Text>
          <a
            href="mailto:amirseraj.ir@gmail.com"
            className="inline-block font-heading text-2xl font-bold text-teal-700 underline decoration-2 underline-offset-8 transition-colors hover:text-teal-600 dark:text-teal-300 dark:hover:text-teal-200 md:text-4xl"
          >
            amirseraj.ir@gmail.com
          </a>
        </motion.div>
      </Container>
    </Box>
  );
};
