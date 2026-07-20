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
        type="button"
        aria-label="Close menu"
        className="group absolute right-5 top-5 z-[1] flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 px-4 font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-mango-300 hover:text-mango-300 md:right-10 md:top-8"
        onClick={onClose}
        initial={reduceMotion ? false : { y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.15 }}
      >
        <VscChromeClose className="h-5 w-5 transition-transform group-hover:rotate-90" />
        Close
      </motion.button>
    );
  }
);

CloseButton.displayName = "CloseButton";
