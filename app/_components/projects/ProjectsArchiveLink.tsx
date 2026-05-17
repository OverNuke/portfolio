import { ArrowRightIcon } from "./icons";

interface ProjectsArchiveLinkProps {
  href: string;
  label?: string;
}

export function ProjectsArchiveLink({
  href,
  label = "See full archive",
}: ProjectsArchiveLinkProps) {
  return (
    <div className="mt-14 flex justify-between items-center gap-4 pt-6 border-b border-edge font-mono text-[10px] uppercase tracking-[0.26em] text-muted">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 text-foreground py-2.5 transition-colors hover:text-foreground/80"
      >
        <span>{label}</span>
        <ArrowRightIcon className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1.5" />
      </a>
    </div>
  );
}
