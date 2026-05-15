import { ArrowRightIcon } from "./icons";

interface ProjectsArchiveLinkProps {
  total: number;
  shown: number;
  href: string;
  label?: string;
}

export function ProjectsArchiveLink({
  total,
  shown,
  href,
  label = "See full archive",
}: ProjectsArchiveLinkProps) {
  return (
    <div className="mt-14 flex justify-between items-center gap-4 pt-6 border-t border-edge font-mono text-[10px] uppercase tracking-[0.26em] text-muted">
      <span>
        End of selection ·{" "}
        <b className="text-foreground font-medium tracking-[0.26em]">
          {String(shown).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </b>
      </span>
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
