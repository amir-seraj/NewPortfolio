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
      {/* mango, not yellow: yellow-600 on white was 3.2:1 (AA fail) and
          off the brand accent scale. */}
      <Link
        href="https://amirseraj.ir"
        className="font-medium text-mango-700 hover:text-mango-600 dark:text-mango-300 dark:hover:text-mango-200"
      >
        Amir Seraj
      </Link>
      .
    </Text>
  </Container>
);
