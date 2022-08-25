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
      href: "https://github.com/amirseraj",
      Icon: AiFillGithub,
      title: "Github",
    },
    {
      href: "https://twitter.com/amirseraj",
      Icon: AiFillTwitterCircle,
      title: "Twitter",
    },
    {
      href: "https://www.linkedin.com/in/amirseraj/",
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
            Software Engineer
          </Text>
          <Text
            casing="uppercase"
            fontSize="xs"
            className="text-yellow-500 dark:text-yellow-300"
          >
            Music Enthusiast
          </Text>
        </Box>

        <Box>
          {links.map(({ href, Icon, title }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              className="block mb-5 dark:hover:text-yellow-500"
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
