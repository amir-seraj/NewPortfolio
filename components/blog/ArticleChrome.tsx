"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { LinkedinShareButton, TwitterShareButton } from "react-share";

export function ArticleProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-mango-300"
      style={{ scaleX }}
    />
  );
}

export function ArticleShare({ url, title }: { url: string; title: string }) {
  const buttonClass =
    "!flex !min-h-[42px] !min-w-[42px] !items-center !justify-center !rounded-full !border !border-slate-300 !font-heading !text-[10px] !font-bold !text-slate-700 transition-colors hover:!border-slate-950 hover:!bg-slate-950 hover:!text-white dark:!border-white/20 dark:!text-slate-200 dark:hover:!border-mango-300 dark:hover:!bg-mango-300 dark:hover:!text-mango-950";

  return (
    <div>
      <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        Share note
      </p>
      <div className="mt-3 flex gap-2">
        <TwitterShareButton
          title={title}
          url={url}
          aria-label="Share this note on X"
          className={buttonClass}
        >
          X
        </TwitterShareButton>
        <LinkedinShareButton
          title={title}
          summary={title}
          source="Amir Seraj"
          url={url}
          aria-label="Share this note on LinkedIn"
          className={buttonClass}
        >
          in
        </LinkedinShareButton>
      </div>
    </div>
  );
}
