import Image from "next/image";
import cn from "classnames";

import { Link } from "@components/ui";
import { groupByYear, type ProjectData } from "./graph-data";
import s from "./Timeline.module.scss";

interface Props {
  projects: ProjectData[];
}

export const Timeline = ({ projects }: Props) => {
  const blocks = groupByYear(projects)
    .slice()
    .reverse()
    .map((block) => ({
      ...block,
      projects: block.projects.slice().reverse(),
    }));

  return (
    <section aria-labelledby="timeline-title">
      <div className={s.intro}>
        <div>
          <h2 id="timeline-title" className={s.heading}>
            Chronological archive
          </h2>
          <p className={s.subheading}>
            Most recent first. Every shipped project keeps its place in the
            record.
          </p>
        </div>
        <span className={s.total}>{projects.length} case studies</span>
      </div>

      <div className={s.wrap}>
        {blocks.map((block) => (
          <section key={block.year} className={s.yrBlock}>
            <header className={cn(s.yrMark, block.isGap && s.yrMarkGap)}>
              <span className={cn(s.pill, block.isGap && s.pillGap)}>
                {block.year}
              </span>
              <span className={s.yearCount}>
                {block.isGap
                  ? "quiet year"
                  : `${block.projects.length} project${
                      block.projects.length === 1 ? "" : "s"
                    }`}
              </span>
            </header>

            {block.isGap ? (
              <p className={s.gapNote}>
                Nothing shipped publicly this year. The gap is part of the
                record.
              </p>
            ) : (
              <div className={s.list}>
                {block.projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className={s.card}
                  >
                    <span className={s.thumb}>
                      <Image
                        src={project.coverImage}
                        fill
                        sizes="(min-width: 961px) 30vw, (min-width: 641px) 46vw, calc(100vw - 40px)"
                        className="object-cover"
                        alt=""
                      />
                    </span>
                    <span className={s.body}>
                      <span className={s.tags}>
                        {project.tags.slice(0, 2).join(" · ")}
                      </span>
                      <span className={s.ttl}>{project.title}</span>
                      <span className={s.description}>
                        {project.description}
                      </span>
                      <span className={s.read}>View case study →</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </section>
  );
};
