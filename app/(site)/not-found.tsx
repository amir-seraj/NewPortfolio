import { Footer, Nav } from "@components/common";
import { Container, Link } from "@components/ui";

export default function NotFound() {
  return (
    <main id="top" className="bg-[#f4f1eb] text-slate-950 dark:bg-[#202020] dark:text-white">
      <Nav className="fixed border-b border-slate-300/70 bg-[#f4f1eb]/90 text-slate-950 backdrop-blur dark:border-white/10 dark:bg-[#202020]/90 dark:text-white" />
      <section className="relative min-h-[78vh] overflow-hidden bg-[#1d1d1d] text-white">
        <span
          aria-hidden="true"
          className="absolute -bottom-[0.15em] -right-[0.04em] select-none font-heading text-[clamp(16rem,45vw,42rem)] font-bold leading-none tracking-[-0.1em] text-white/[0.035]"
        >
          404
        </span>
        <Container className="relative flex min-h-[78vh] max-w-[1320px] items-center py-32 md:py-40">
          <div>
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.22em] text-mango-300">
              404 / Signal lost
            </p>
            <h1 className="mt-6 max-w-[10ch] text-balance font-heading text-[clamp(3.5rem,9vw,8rem)] font-bold leading-[0.92] tracking-[-0.055em]">
              Nothing lives at this address.
            </h1>
            <p className="mt-7 max-w-[50ch] text-base leading-relaxed text-slate-300 md:text-lg">
              The page may have moved, but the projects and field notes are
              still very much alive.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex min-h-[48px] items-center bg-mango-300 px-6 font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-mango-950 transition-colors hover:bg-mango-200"
              >
                Explore projects →
              </Link>
              <Link
                href="/"
                className="inline-flex min-h-[48px] items-center border border-white/25 px-6 font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-white"
              >
                Return home
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </main>
  );
}
