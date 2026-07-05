import Image from "next/legacy/image";
import cn from "classnames";

import { Link } from "@components/ui";
import { groupByYear, type ProjectData } from "./graph";
import s from "./Timeline.module.scss";

interface Props {
  projects: ProjectData[];
}

export const Timeline = ({ projects }: Props) => {
  const blocks = groupByYear(projects)
    .slice()
    .reverse()
    .map((b) => ({ ...b, projects: b.projects.slice().reverse() }));

  return (
    <>
      <div className="mb-4 rounded-lg bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600 dark:bg-[#323232] dark:text-slate-300">
        Most recent first. No categories, no reshuffling by importance
        &mdash; just the order things shipped. A gap year sits empty on
        purpose: no faked placeholder to fill the column.
      </div>

      <div className={s.wrap}>
        {blocks.map((block) => (
          <div key={block.year} className={s.yrBlock}>
            <div className={cn(s.yrMark, block.isGap && s.yrMarkGap)}>
              <span className={cn(s.pill, block.isGap && s.pillGap)}>
                {block.year}
              </span>
            </div>

            {block.isGap ? (
              <p className={s.gapNote}>
                <strong>Nothing shipped.</strong> A real gap in the
                record, not a data error.
              </p>
            ) : (
              <div className={s.list}>
                {block.projects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className={s.card}
                  >
                    <span className={s.thumb}>
                      <Image
                        src={p.coverImage}
                        layout="fill"
                        objectFit="cover"
                        alt={p.title}
                      />
                    </span>
                    <span className={s.body}>
                      <span className={s.ttl}>{p.title}</span>
                      <span className={s.tags}>
                        {p.tags.slice(0, 2).join(" · ")}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
