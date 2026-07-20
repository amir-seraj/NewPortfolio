"use client";

import { type RefObject, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

import { Container, Link } from "@components/ui";
import { CloseButton } from "./Close";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/#about" },
  { label: "Résumé", href: "/resume.pdf", external: true },
];

const isActiveRoute = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/";
  return !href.includes("#") && pathname.startsWith(href);
};

export function Menu({
  onClose,
  email = "amirseraj.ir@gmail.com",
  returnFocusRef,
}: {
  onClose: () => void;
  email?: string;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const returnFocusElement = returnFocusRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      returnFocusElement?.focus();
    };
  }, [onClose, returnFocusRef]);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE_EXPO }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#1d1d1d] text-white"
    >
      <CloseButton ref={closeRef} onClose={onClose} />
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 select-none font-heading text-[42vw] font-bold leading-[0.7] tracking-[-0.1em] text-white/[0.025]"
      >
        M
      </span>

      <Container className="relative flex min-h-full max-w-[1500px] flex-col justify-between py-24 md:py-28">
        <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-mango-300">
          Navigate the portfolio
        </p>

        <nav aria-label="Menu navigation" className="my-16">
          <ul className="border-t border-white/15">
            {LINKS.map((link, index) => {
              const active = isActiveRoute(pathname, link.href);
              return (
                <motion.li
                  key={link.href}
                  initial={reduceMotion ? false : { opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.08 + index * 0.06,
                    duration: 0.48,
                    ease: EASE_EXPO,
                  }}
                  className="border-b border-white/15"
                >
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    aria-current={active ? "page" : undefined}
                    onClick={onClose}
                    className="group flex min-h-[72px] items-center justify-between gap-6 py-4 md:min-h-[88px]"
                  >
                    <span
                      className={`font-heading text-3xl font-bold leading-none tracking-tight transition-colors md:text-5xl ${
                        active
                          ? "text-mango-300"
                          : "text-white group-hover:text-mango-300"
                      }`}
                    >
                      {link.label}
                    </span>
                    <span className="font-heading text-[10px] font-bold tabular-nums tracking-[0.16em] text-slate-500">
                      {String(index + 1).padStart(2, "0")}
                      {link.external ? " ↗" : ""}
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <a href={`mailto:${email}`} className="hover:text-mango-300">
            {email}
          </a>
          <p>Genova, Italy · Available for thoughtful collaborations</p>
        </div>
      </Container>
    </motion.div>
  );
}
