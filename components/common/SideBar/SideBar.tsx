import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillMail,
} from "react-icons/ai";

import { Box, Link, Text } from "@components/ui";
import s from "./SideBar.module.scss";
import { Logo } from "../Logo/Logo";

export const SideBar = () => {
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
      href: "mailto:amirseraj.ir@gmail.com",
      Icon: AiFillMail,
      title: "Email",
    },
  ];

  return (
    <Box className={s.root}>
      <Box className={s.main}>
        <Logo />
        <Box className={s.bar}>
          <Text as="h5" casing="uppercase" className="mb-1 font-heading">
            Designer / Developer
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
