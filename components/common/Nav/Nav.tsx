"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import { Container, Link } from "@components/ui";
import { Menu } from "../Menu/Menu";
import { MenuButton } from "../Menu/Button";
import { Logo } from "../Logo/Logo";

const LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/#about" },
  { label: "Résumé", href: "/resume.pdf", external: true },
];

interface Props {
  variant?: "main" | "projects";
  className?: string;
  email?: string | null;
}

const isActiveRoute = (pathname: string, href: string) => {
  if (href === "/projects") return pathname.startsWith("/projects");
  if (href === "/blog") return pathname.startsWith("/blog");
  return false;
};

export function Nav({
  className = "",
  variant = "main",
  email = "amirseraj.ir@gmail.com",
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const baseClass =
    variant === "projects"
      ? "sticky border-b border-slate-300/70 bg-[#f4f1eb]/90 text-slate-950 backdrop-blur dark:border-white/10 dark:bg-[#202020]/90 dark:text-white"
      : className;

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className={`left-0 right-0 top-0 z-40 ${baseClass}`}
      >
        <Container className="flex max-w-[1500px] items-center justify-between py-3">
          <div className="flex items-center gap-5">
            <Logo className="!text-current" />
            {variant === "projects" && (
              <Link
                href="/projects"
                className="hidden min-h-[44px] items-center border-l border-current/15 pl-5 font-heading text-[10px] font-bold uppercase tracking-[0.14em] opacity-70 transition-opacity hover:opacity-100 sm:flex"
              >
                <MdOutlineKeyboardArrowLeft className="mr-1 h-4 w-4" />
                Project archive
              </Link>
            )}
          </div>

          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((link) => {
              const active = isActiveRoute(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex min-h-[44px] items-center border-b-2 font-heading text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
                    active
                      ? "border-mango-600 text-slate-950 dark:border-mango-300 dark:text-white"
                      : "border-transparent text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                  {link.external && <span aria-hidden="true"> ↗</span>}
                </Link>
              );
            })}
            <Link
              href={`mailto:${email ?? "amirseraj.ir@gmail.com"}`}
              className="inline-flex min-h-[42px] items-center rounded-full bg-slate-950 px-5 font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-mango-700 dark:bg-mango-300 dark:text-mango-950 dark:hover:bg-mango-200"
            >
              Let&apos;s talk
            </Link>
          </div>

          <MenuButton
            ref={menuButtonRef}
            onOpen={() => setIsMenuOpen(true)}
            expanded={isMenuOpen}
          />
        </Container>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <Menu
            onClose={() => setIsMenuOpen(false)}
            email={email ?? undefined}
            returnFocusRef={menuButtonRef}
          />
        )}
      </AnimatePresence>
    </>
  );
}
