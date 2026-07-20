import { BsArrowUpCircle } from "react-icons/bs";

import { Container, Link } from "@components/ui";
import { Copyright } from "@components/common";

const NAV_LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/#about" },
  { label: "Résumé ↗", href: "/resume.pdf" },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/amir-seraj" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/amir-seraj/" },
];

export function Footer({
  email = "amirseraj.ir@gmail.com",
}: {
  email?: string | null;
}) {
  const emailAddress = email ?? "amirseraj.ir@gmail.com";

  return (
    <footer className="bg-[#1d1d1d] text-white">
      <Container className="max-w-[1500px] py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="font-heading text-2xl font-bold tracking-tight">
              Amir Seraj
            </p>
            <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-slate-400">
              Researcher and creative technologist building human-aware
              systems through affective computing, HCI, and interactive art.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="md:col-span-3">
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-mango-300">
              Explore
            </p>
            <div className="mt-5 flex flex-col items-start gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="md:col-span-3">
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-mango-300">
              Elsewhere
            </p>
            <div className="mt-5 flex flex-col items-start gap-3">
              {SOCIAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {link.label} ↗
                </Link>
              ))}
              <Link
                href={`mailto:${emailAddress}`}
                className="text-sm text-slate-300 transition-colors hover:text-white"
              >
                Email
              </Link>
            </div>
          </div>
        </div>

        <Link
          href="#top"
          className="group mt-14 inline-flex min-h-[44px] items-center gap-2 font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 transition-colors hover:text-mango-300"
        >
          Back to top
          <BsArrowUpCircle className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
        </Link>
      </Container>

      <div className="border-t border-white/10 text-slate-400">
        <Copyright />
      </div>
    </footer>
  );
}
