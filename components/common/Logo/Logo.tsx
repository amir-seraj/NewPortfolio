import { Link } from "@components/ui";

export const Logo = ({ className = "" }) => (
  <Link
    href="/"
    // p-2/-m-2 grows the tap target toward 44px without shifting layout
    className={`${className} -m-2 transform p-2 font-heading text-sm font-medium text-slate-600 hover:scale-95 hover:text-slate-700 dark:text-slate-300`}
  >
    {"<Amir/>"}
  </Link>
);
