import { BsArrowUpCircle } from "react-icons/bs";

import { Container, Box, Text, Link } from "@components/ui";
import { Copyright } from "@components/common";

const STATIC_LINKS = [
  { label: "The evidence", href: "/projects" },
  { label: "Who's asking", href: "/#about" },
];

export const Footer = ({
  email = "amirseraj.ir@gmail.com",
}: {
  email?: string | null;
}) => {
  const LINKS = [
    { label: "Email me", href: `mailto:${email ?? "amirseraj.ir@gmail.com"}` },
    ...STATIC_LINKS,
  ];
  return (
    <footer>
      <Container className="relative mb-10 grid-cols-5 gap-20 md:grid 2xl:px-16">
        <Box className="col-span-3 max-w-lg">
          <Text
            as="h4"
            casing="uppercase"
            fontWeight="bold"
            fontSize="xl"
            className="mb-4 font-heading"
          >
            Amir Seraj
          </Text>
          <Text className="mb-6">
            Machines can learn to notice people. I teach them, one{" "}
            <code className="text-sm font-bold dark:font-medium dark:text-teal-300 2xl:text-lg">
              {"<interaction/>"}
            </code>{" "}
            at a time.
          </Text>
        </Box>
        <Box className="col-span-2 hidden md:block">
          <Text
            as="h6"
            casing="uppercase"
            fontWeight="medium"
            className="mb-4 font-heading"
          >
            Quick links
          </Text>
          {LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="mb-3 block text-base font-medium hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-300"
            >
              {label}
            </Link>
          ))}
        </Box>

        <Link
          href="#top"
          className="group absolute bottom-0 right-10 hidden items-center gap-2 text-sm font-medium uppercase text-slate-500 transition duration-300 ease-in-out hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-300 md:flex"
        >
          Back to top
          <BsArrowUpCircle className="relative -top-[2px] h-5 w-5 transform transition duration-300 ease-in-out group-hover:-translate-y-1" />
        </Link>
      </Container>

      <Copyright />
    </footer>
  );
};
