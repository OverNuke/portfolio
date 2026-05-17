import type { Project } from "@/types";
import { getProjectCategory, getProjectStatus } from "@/lib/projects";
import { ProjectThumbnail } from "./ProjectThumbnail";
import { TechBadgeList } from "./TechBadge";
import { StatusPill } from "./StatusPill";
import { RetroSlabLink } from "./RetroLink";
import styles from "./projects.module.css";

interface FeaturedProjectProps {
  project: Project;
  index?: number;
}

export function FeaturedProject({ project, index = 1 }: FeaturedProjectProps) {
  const category = getProjectCategory(project);
  const status = getProjectStatus(project);
  const indexLabel = `// Featured · ${String(index).padStart(3, "0")}`;

  return (
    <article
      className={`${styles.thumbHost} relative grid md:grid-cols-[1.15fr_0.85fr] border border-edge bg-canvas mb-20 transition-colors duration-300 hover:border-foreground focus-within:border-foreground`}
    >
      <div className="border-b md:border-b-0 md:border-r border-edge">
        <ProjectThumbnail category={category} variant="featured" />
      </div>

      <div className="relative flex flex-col gap-8 p-9 md:p-12">
        <span
          aria-hidden="true"
          className="absolute top-7 right-7 size-3.5 border-t border-r border-foreground"
        />

        <p className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.34em] text-foreground">
          {indexLabel}
          <span aria-hidden="true" className="w-10 h-px bg-foreground" />
        </p>

        <h3
          className="font-sans font-extrabold uppercase leading-[0.9] tracking-[-0.03em]"
          style={{ fontSize: "clamp(44px, 6vw, 76px)" }}
        >
          {project.title}
        </h3>

        {project.subtitle && (
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-foreground">
            {project.subtitle}
          </p>
        )}

        <p className="text-sm leading-[1.65] text-muted font-light max-w-[42ch] text-pretty">
          {project.description}
        </p>

        <TechBadgeList tags={project.tags} />

        <div className="mt-auto pt-5 flex justify-between items-center gap-4 border-t border-dashed border-edge">
          <StatusPill>
            {status} · {category}
          </StatusPill>
          {project.repo && project.repo !== "#" ? (
            <RetroSlabLink
              href={project.repo}
              label="View Source"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source on GitHub`}
            />
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-muted">
              Source unavailable
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
