import { Link } from "@components/ui";

export const Logo = ({ className = "" }) => (
  <Link
    href="/"
    className={`${className} -m-2 inline-flex min-h-[44px] items-center gap-2 p-2 font-heading text-xs font-bold uppercase tracking-[0.12em] text-slate-700 transition-colors hover:text-slate-950 dark:text-slate-200 dark:hover:text-white`}
  >
    <span>Amir Seraj</span>
    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-mango-500 dark:bg-mango-300" />
  </Link>
);
