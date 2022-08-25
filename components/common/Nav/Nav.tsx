import { FC, useState } from "react";
import { Container, Box, Link } from "@components/ui";
import { Menu } from "@components/common";
import { MailMe, MenuButton } from "..";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Logo } from "../Logo/Logo";
import { AnimatePresence } from "framer-motion";

interface Props {
  variant?: "main" | "blog";
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
          className={`right-0 top-0 left-0 z-10 dark:border-yellow-700 md:left-[81px] 2xl:left-20 ${className}`}
        >
          <Container className="flex items-center justify-between">
            <MailMe className="hidden md:block" />
            <Logo className="md:hidden" />
            <MenuButton onOpen={onOpen} />
          </Container>
        </nav>
      )}
      {variant === "blog" && (
        <Box className="sticky top-0 z-10 border-b bg-white backdrop-blur backdrop-filter dark:border-[#1A9E8F] dark:bg-[#1A9E8F] md:bg-opacity-80 md:dark:bg-opacity-90">
          <Container className="flex items-center justify-between py-3">
            <Logo className="md:hidden" />
            <Link
              href="/blog"
              className="relative items-center hidden text-xs uppercase -left-1 font-heading hover:text-yellow-500 md:flex"
            >
              <MdOutlineKeyboardArrowLeft className="w-auto h-4 mr-1" /> back to
              blog
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
