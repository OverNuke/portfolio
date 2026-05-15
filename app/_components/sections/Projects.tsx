import { PROJECTS, SOCIAL_LINKS } from "@/lib/data";
import { splitProjects } from "@/lib/projects";
import { ProjectsHeader } from "../projects/ProjectsHeader";
import { ProjectsMarquee } from "../projects/ProjectsMarquee";
import { FeaturedProject } from "../projects/FeaturedProject";
import { ProjectTile } from "../projects/ProjectTile";
import { ProjectsArchiveLink } from "../projects/ProjectsArchiveLink";

export function Projects() {
  const { featured, tiles } = splitProjects(PROJECTS);
  if (!featured) return null;

  const shown = 1 + tiles.length;
  const marqueeItems = [
    "★ Now Playing",
    ...PROJECTS.map((p) => `· ${p.title}${p.year ? ` · ${p.year}` : ""}`),
    "★ Insert Coin",
  ];
  const archiveHref =
    SOCIAL_LINKS.find((l) => l.label === "GitHub")?.href ?? "#projects";

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative container-content py-24 pb-36"
    >
      <ProjectsHeader
        sectionIndex="SECTION · 003"
        shown={shown}
        featured={1}
        updated="2025"
      />

      <ProjectsMarquee items={marqueeItems} />

      <FeaturedProject project={featured} index={1} />

      <div className="flex items-center gap-5 mb-6 font-mono text-[10px] uppercase tracking-[0.32em] text-muted">
        <span>
          <b className="text-foreground font-medium tracking-[0.32em]">
            {"// More builds"}
          </b>
        </span>
        <span aria-hidden="true" className="flex-1 h-px bg-edge" />
        <span>{String(tiles.length).padStart(2, "0")} entries</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiles.map((project, i) => (
          <ProjectTile key={project.title} project={project} index={i + 2} />
        ))}
      </div>

      <ProjectsArchiveLink
        total={PROJECTS.length}
        shown={shown}
        href={archiveHref}
      />
    </section>
  );
}
