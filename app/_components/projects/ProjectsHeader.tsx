interface ProjectsHeaderProps {
  sectionIndex: string;
  shown: number;
  featured: number;
  updated: string;
}

export function ProjectsHeader({
  sectionIndex,
  shown,
  featured,
  updated,
}: ProjectsHeaderProps) {
  return (
    <>
      <span
        aria-hidden="true"
        className="hidden md:block absolute top-14 right-[clamp(1.5rem,4vw,3.5rem)] font-mono text-[10px] uppercase tracking-[0.5em] text-foreground/20 select-none"
      >
        {sectionIndex}
      </span>

      <header className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 items-end pb-7 mb-7 border-b border-edge">
        <div className="flex flex-col gap-3.5">
          <p className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.36em] text-muted">
            <span aria-hidden="true" className="w-7 h-px bg-foreground" />
            Selected work
          </p>
          <h2
            id="projects-heading"
            className="font-sans font-extrabold leading-[0.92] tracking-[-0.025em]"
            style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
          >
            Projects
          </h2>
        </div>
        <dl className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted text-left sm:text-right leading-[1.8]">
          <div>
            <dt className="inline">Showing — </dt>
            <dd className="inline text-foreground font-medium">
              {String(shown).padStart(2, "0")}
            </dd>
          </div>
          <div>
            <dt className="inline">Featured — </dt>
            <dd className="inline text-foreground font-medium">
              {String(featured).padStart(2, "0")}
            </dd>
          </div>
          <div>
            <dt className="inline">Updated — </dt>
            <dd className="inline text-foreground font-medium">{updated}</dd>
          </div>
        </dl>
      </header>
    </>
  );
}
