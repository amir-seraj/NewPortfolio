import { Link } from "@components/ui";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-5 text-center">
      <h1 className="font-heading text-5xl font-bold text-slate-900 dark:text-slate-100">
        404
      </h1>
      <p className="text-slate-600 dark:text-slate-300">
        This page does not exist. The work does.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/projects"
          className="inline-flex min-h-[44px] items-center bg-mango-300 px-6 font-heading text-sm font-bold uppercase tracking-wider text-mango-950 transition-colors hover:bg-mango-200"
        >
          See the evidence
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center px-4 text-mango-700 underline underline-offset-4 hover:text-mango-600 dark:text-mango-300 dark:hover:text-mango-200"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
