import type { Project } from "@/types";
import { getProjectCategory, getProjectStatus } from "@/lib/projects";
import { ProjectThumbnail } from "./ProjectThumbnail";
import { TechBadgeList } from "./TechBadge";
import { StatusPill } from "./StatusPill";
import { RetroSquareLink } from "./RetroLink";
import styles from "./projects.module.css";

interface ProjectTileProps {
  project: Project;
  index: number;
}

export function ProjectTile({ project, index }: ProjectTileProps) {
  const category = getProjectCategory(project);
  const status = getProjectStatus(project);
  const yearSuffix = project.year ? ` · ${project.year}` : "";

  return (
    <article
      className={`${styles.thumbHostTile} group relative border border-edge bg-transparent flex flex-col transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-foreground focus-within:-translate-y-1 focus-within:border-foreground`}
    >
      <ProjectThumbnail category={category} variant="tile" />

      <div className="flex-1 flex flex-col gap-3.5 p-5">
        <div className="flex justify-between items-baseline gap-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted">
            {`// ${String(index).padStart(3, "0")}${yearSuffix}`}
          </span>
          <StatusPill variant={status === "Live" ? "default" : "muted"}>
            {status === "Live" ? "Live" : "Maint."}
          </StatusPill>
        </div>

        <h3 className="font-sans font-bold uppercase text-[22px] leading-tight tracking-[-0.01em]">
          {project.title}
        </h3>

        {project.subtitle && (
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            {project.subtitle}
          </p>
        )}

        <TechBadgeList tags={project.tags} size="sm" />

        <div className="mt-auto pt-2.5 flex justify-between items-center gap-3 border-t border-dashed border-edge">
          <StatusPill variant="muted">{category}</StatusPill>
          {project.repo && project.repo !== "#" ? (
            <RetroSquareLink
              href={project.repo}
              ariaLabel={`View ${project.title} source on GitHub`}
              target="_blank"
              rel="noopener noreferrer"
            />
          ) : (
            <span aria-hidden="true" className="font-mono text-[10px] tracking-[0.26em] text-muted">
              —
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
