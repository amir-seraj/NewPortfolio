import { useRouter } from "next/router";
import { motion } from "framer-motion";
import cn from "classnames";
import { Container, Link } from "@components/ui";
import { CloseButton } from "./Close";

export const Menu = ({ onClose }) => {
  const { pathname } = useRouter();
  const links = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "About",
      href: "/#about",
    },
    // {
    //   label: "Subscribe",
    //   href: "/#subscribe",
    // },
    // {
    //   label: "My Resume",
    //   href: "/myResume.pdf",
    // },
  ];

  const getClasses = (path: string) => {
    return cn(
      {
        "text-slate-200": pathname === path,
      },
      "font-heading md:ml-60 max-w-xs px-4 text-4xl uppercase transition duration-100 ease-linear hover:translate-x-1"
    );
  };

  const menuVariants = {
    initial: {
      opacity: 0,
      y: -20,
      scale: 1.2,
    },
    enter: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 1,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  return (
    <motion.div
      variants={menuVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed top-0 left-0 z-20 h-screen w-full bg-white bg-opacity-90 backdrop-blur backdrop-filter dark:bg-[#000000bc] dark:bg-opacity-80 dark:backdrop-blur"
    >
      <CloseButton onClose={onClose} />
      <Container className="h-full">
        <ul className="flex flex-col justify-center h-full gap-10">
          {links.map(({ label, href }, idx) => (
            <motion.li
              key={href}
              className="hover:text-slate-500"
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: idx * 0.3,
                duration: 1,
                ease: [0.6, 0.05, -0.01, 0.9],
              }}
              whileHover={{
                x: 10,
                transition: {
                  duration: 0.1,
                  ease: [0.6, 0.05, -0.01, 0.9],
                },
              }}
              exit={{
                opacity: 0,
                x: -20,
                transition: {
                  duration: 0.5,
                  ease: [0.6, 0.05, -0.01, 0.9],
                  delay: idx * 0.3,
                },
              }}
            >
              <Link
                href={href}
                target={href.startsWith("http") ? "_blank" : "_self"}
                className={getClasses(href)}
                onClick={onClose}
              >
                {label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </Container>
    </motion.div>
  );
};
