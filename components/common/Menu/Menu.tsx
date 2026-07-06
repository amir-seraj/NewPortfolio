"use client";

import { useRouter } from "next/compat/router";
import { motion, useReducedMotion } from "motion/react";
import cn from "classnames";
import { Container, Link } from "@components/ui";
import { CloseButton } from "./Close";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const STATIC_LINKS = [
  { label: "Home", href: "/" },
  { label: "The evidence", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Who's asking", href: "/#about" },
];

export const Menu = ({ onClose, email = "amirseraj.ir@gmail.com" }) => {
  const LINKS = [
    ...STATIC_LINKS,
    { label: "Mail", href: `mailto:${email}` },
  ];
  // next/compat/router works in both the app dir (returns null) and pages
  // dir (returns the NextRouter) — plain next/router's useRouter throws
  // when mounted under the App Router, which Nav now renders into via
  // app/(site)/page.tsx.
  const router = useRouter();
  const pathname = router?.pathname;
  const reduceMotion = useReducedMotion();

  const getClasses = (path: string) =>
    cn(
      pathname === path
        ? "text-mango-700 dark:text-mango-300"
        : "hover:text-mango-700 dark:hover:text-mango-300",
      "font-heading md:ml-60 max-w-fit px-4 text-4xl font-bold uppercase tracking-tight transition-transform duration-150 ease-out hover:translate-x-1.5 md:text-5xl"
    );

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE_EXPO }}
      className="fixed top-0 left-0 z-20 h-screen w-full bg-white bg-opacity-95 dark:bg-[#000000] dark:bg-opacity-90"
    >
      <CloseButton onClose={onClose} />
      <Container className="h-full">
        <ul className="flex h-full flex-col justify-center gap-8">
          {LINKS.map(({ label, href }, idx) => (
            <motion.li
              key={href}
              initial={reduceMotion ? false : { opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: idx * 0.07,
                duration: 0.45,
                ease: EASE_EXPO,
              }}
            >
              <Link href={href} className={getClasses(href)} onClick={onClose}>
                {label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </Container>
    </motion.div>
  );
};
