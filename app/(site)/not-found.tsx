import { Link } from "@components/ui";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6">
      <h1 className="font-heading text-5xl font-bold text-slate-900 dark:text-slate-100">404</h1>
      <p className="text-slate-600 dark:text-slate-300">This page does not exist.</p>
      <Link href="/" className="text-mango-700 underline dark:text-mango-300">Back home</Link>
    </main>
  );
}
