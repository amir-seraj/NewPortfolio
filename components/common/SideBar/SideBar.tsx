import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillMail,
} from "react-icons/ai";

import { Box, Link, Text } from "@components/ui";
import s from "./SideBar.module.scss";
import { Logo } from "../Logo/Logo";

export const SideBar = ({
  email = "amirseraj.ir@gmail.com",
}: {
  email?: string | null;
}) => {
  const links = [
    {
      href: "https://github.com/amir-seraj",
      Icon: AiFillGithub,
      title: "Github ",
    },

    {
      href: "https://www.linkedin.com/in/amir-seraj/",
      Icon: AiFillLinkedin,
      title: "Linkedin",
    },
    {
      href: `mailto:${email ?? "amirseraj.ir@gmail.com"}`,
      Icon: AiFillMail,
      title: "Email",
    },
  ];

  return (
    <Box className={s.root}>
      <Box className={s.main}>
        <Logo />
        <Box className={s.bar}>
          {/* p, not h5: this rail label sat before the page h1 in the
              heading outline (h5 -> h1 skip on every page). */}
          <Text as="p" casing="uppercase" className="mb-1 font-heading">
            Researcher / Developer
          </Text>
          <Text
            casing="uppercase"
            fontSize="xs"
            className="text-slate-500 dark:text-slate-300"
          >
            Problem Solving Enthusiast
          </Text>
        </Box>

        <Box>
          {links.map(({ href, Icon, title }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              className="block mb-5 dark:hover:text-slate-100"
            >
              <Icon className={s.icon} />
              <span className="sr-only">Connect with Amir on {title}</span>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
