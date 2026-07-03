import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Box, Container, Link, Text } from "@components/ui";

const EASE_EXPO = [0.16, 1, 0.3, 1];

interface Project {
  slug: string;
  title: string;
  coverImage: string;
}

interface Props {
  projects: Project[];
}

const FEATURED: Record<string, { display: string; kind: string; year: string }> =
  {
    "resilience-ai-mirror-emotional-wellbeing": {
      display: "reSilence",
      kind: "AI mirror",
      year: "2024",
    },
    "unity-at-sea-soundscape-shared-balance": {
      display: "Unity at Sea",
      kind: "Installation",
      year: "2024",
    },
    "perfect-posture-case-study": {
      display: "Perfect Posture",
      kind: "ML study",
      year: "2024",
    },
  };

const OPEN = "inset(0 0% 0 0)";
const CLOSED = "inset(0 100% 0 0)";

/**
 * Server markup ships fully visible (no reveal gating), so crawlers and
 * headless renders never see a blank section. On the client, banners still
 * below the fold get clipped and wipe open on first view. The observer
 * watches the un-clipped wrapper: a clip-path'd element reports zero
 * intersection area and would never fire.
 */
const Banner = ({
  slug,
  coverImage,
  index,
}: {
  slug: string;
  coverImage: string;
  index: number;
}) => {
  const meta = FEATURED[slug];
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"visible" | "hidden" | "revealed">(
    "visible"
  );

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduceMotion) return;
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.9) return;
    setPhase("hidden");
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        setPhase("revealed");
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  return (
    <div ref={wrapRef}>
      <motion.div
        initial={false}
        animate={{ clipPath: phase === "hidden" ? CLOSED : OPEN }}
        transition={
          phase === "revealed"
            ? { duration: 0.7, ease: EASE_EXPO, delay: (index % 3) * 0.13 }
            : { duration: 0 }
        }
      >
        <Link
          href={`/projects/${slug}`}
          className="group relative block h-[220px] overflow-hidden md:h-[280px]"
        >
          <Image
            src={coverImage}
            layout="fill"
            objectFit="cover"
            alt={`${meta.display} — ${meta.kind}`}
            className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
          <span className="absolute inset-x-6 bottom-5 z-10 flex items-baseline justify-between gap-4 md:inset-x-8">
            <span className="font-heading text-xl font-bold uppercase tracking-wide text-white md:text-3xl">
              {meta.display} · {meta.kind}
            </span>
            <span className="whitespace-nowrap font-heading text-sm text-teal-300 transition-transform duration-200 group-hover:translate-x-1.5">
              {meta.year} →
            </span>
          </span>
        </Link>
      </motion.div>
    </div>
  );
};

export const Evidence = ({ projects }: Props) => {
  const featured = Object.keys(FEATURED)
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean) as Project[];

  return (
    <Container full id="work" className="mb-28">
      <Container className="mb-8 flex items-baseline justify-between">
        <Text as="h2" className="font-heading text-3xl font-bold md:text-4xl">
          The evidence
        </Text>
        <Link
          href="/projects"
          className="font-heading text-sm font-medium uppercase tracking-wide text-teal-700 hover:underline dark:text-teal-300"
        >
          All six projects →
        </Link>
      </Container>
      <Box className="flex flex-col gap-5 px-5 md:px-10">
        {featured.map(({ slug, coverImage }, i) => (
          <Banner key={slug} slug={slug} coverImage={coverImage} index={i} />
        ))}
      </Box>
    </Container>
  );
};
