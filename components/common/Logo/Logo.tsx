import { Link } from "@components/ui";

export const Logo = ({ className = "" }) => (
  <Link
    href="/"
    className={`${className} transform font-heading text-sm font-medium text-slate-600 hover:scale-95 hover:text-slate-700 dark:text-slate-300`}
  >
    {"<Amir/>"}
  </Link>
);
