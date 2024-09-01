import { Container, Text, Link } from "@components/ui";

export const Copyright = () => (
  <Container className="flex flex-col justify-center py-5 border-t border-slate-300 dark:border-slate-700 md:flex-row">
    <Text fontSize="sm">
      {" "}
      Copyright © {new Date().getFullYear()} | All rights reserved {"/"}{" "}
    </Text>
    <Text fontSize="sm" className="mx-1">
      {" "}
      Made with ❤️ in Italy by{" "}
      <Link
        href="https://amirseraj.ir"
        className="font-medium text-yellow-600 hover:text-yellow-700 dark:text-yellow-500"
      >
        Amir Seraj
      </Link>
      .
    </Text>
  </Container>
);
