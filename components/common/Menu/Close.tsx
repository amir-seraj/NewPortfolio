"use client";

import { forwardRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { VscChromeClose } from "react-icons/vsc";

export const CloseButton = forwardRef<HTMLButtonElement, { onClose: () => void }>(
  ({ onClose }, ref) => {
    const reduceMotion = useReducedMotion();
    return (
      <motion.button
        ref={ref}
        // p-3/-m-3: 44px hit area around the glyph + label
        className="group fixed right-8 top-7 -m-3 flex items-center gap-2 p-3 md:right-12"
        onClick={onClose}
        initial={reduceMotion ? false : { y: -60, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <VscChromeClose className="w-auto h-6 transition duration-300 ease-in-out transform group-hover:rotate-90 group-hover:text-mango-600 dark:group-hover:text-mango-300" />
        <span className="text-sm tracking-widest uppercase font-heading group-hover:scale-95">
          Close
        </span>
      </motion.button>
    );
  }
);

CloseButton.displayName = "CloseButton";
