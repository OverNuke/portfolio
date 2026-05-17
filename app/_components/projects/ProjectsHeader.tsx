interface ProjectsHeaderProps {
  fontSize?: string;
}

export function ProjectsHeader({
  fontSize = "clamp(40px, 6vw, 72px)",
}: ProjectsHeaderProps) {
  return (
    <>
      <header className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 items-end pt-10 md:pt-14 pb-10 mb-7 border-t border-edge">
        <div className="flex flex-col gap-3.5">
          <h2
            id="projects-heading"
            className="font-sans font-extrabold leading-[1] tracking-tight"
            style={{ fontSize }}
          >
            Projects
          </h2>
        </div>
      </header>
    </>
  );
}
