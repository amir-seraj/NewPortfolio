import { Link } from "@components/ui";

export const Logo = ({ className = "" }) => (
  <Link
    href="/"
    className={`${className} transform font-heading text-xl font-medium text-yellow-600 hover:scale-95 hover:text-yellow-700 dark:text-yellow-500`}
  >
    {"<Amir/>"}
  </Link>
);
