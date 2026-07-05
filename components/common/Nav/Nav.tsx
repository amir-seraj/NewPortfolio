"use client";

import { FC, useState } from "react";
import { Container, Box, Link } from "@components/ui";
import { Menu } from "@components/common";
import { MailMe, MenuButton } from "..";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Logo } from "../Logo/Logo";
import { AnimatePresence } from "motion/react";

interface Props {
  variant?: "main" | "projects";
  className?: string;
}

export const Nav: FC<Props> = ({ className = "", variant = "main" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onOpen = () => setIsMenuOpen(true);
  const onClose = () => setIsMenuOpen(false);
  return (
    <>
      {variant === "main" && (
        <nav
          className={`right-0 top-0 left-0 z-10  dark:border-slate-700 md:left-[81px] 2xl:left-20 ${className}`}
        >
          <Container className="flex items-center justify-between ">
            <MailMe className="hidden md:block " />
            <Logo className="md:hidden" />
            <MenuButton onOpen={onOpen} />
          </Container>
        </nav>
      )}
      {variant === "projects" && (
        <Box className="sticky top-0 z-10 border-b border-teal-800 bg-teal-900 text-teal-50 backdrop-blur backdrop-filter dark:border-teal-950 dark:bg-[#062e2a] md:bg-opacity-90 md:dark:bg-opacity-90">
          <Container className="flex items-center justify-between py-3">
            <Logo className="md:hidden !text-teal-100 hover:!text-white" />
            <Link
              href="/projects"
              className="relative items-center hidden text-xs uppercase -left-1 font-heading text-teal-100 hover:text-white md:flex"
            >
              <MdOutlineKeyboardArrowLeft className="w-auto h-4 mr-1" /> back to
              Projects
            </Link>
            <MenuButton onOpen={onOpen} />
          </Container>
        </Box>
      )}
      <AnimatePresence>
        {isMenuOpen && <Menu onClose={onClose} />}
      </AnimatePresence>
    </>
  );
};
