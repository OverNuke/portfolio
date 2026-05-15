import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/lib/projects";
import { ProjectMark } from "./marks";
import styles from "./projects.module.css";

interface ProjectThumbnailProps {
  category: ProjectCategory;
  variant: "featured" | "tile";
  tagLabel?: string;
}

/** Decorative project thumbnail: dotted abyss-blue field + centered glyph,
 *  framed by white corner ticks and a category tag. Hover lift comes from
 *  the parent (.thumbHost / .thumbHostTile classes). */
export function ProjectThumbnail({
  category,
  variant,
  tagLabel,
}: ProjectThumbnailProps) {
  const isFeatured = variant === "featured";
  const label = tagLabel ?? category;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#1a2450] isolate",
        isFeatured ? "min-h-[320px] md:min-h-[520px]" : "aspect-[4/3]",
      )}
      aria-hidden="true"
    >
      <div className={cn("absolute inset-0", styles.thumbInner)}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1.4px)",
            backgroundSize: "18px 18px",
          }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center text-white opacity-80">
        <div className="size-[38%] max-w-[140px] max-h-[140px]">
          <ProjectMark category={category} />
        </div>
      </div>

      <span
        className={cn(
          "absolute top-3.5 left-3.5 z-[2]",
          "border border-white/45 bg-canvas/55 backdrop-blur-[2px]",
          "font-mono uppercase text-white",
          isFeatured
            ? "px-2.5 py-1.5 text-[11px] tracking-[0.28em]"
            : "px-2.5 py-1.5 text-[10px] tracking-[0.24em]",
        )}
      >
        {label}
      </span>

      {/* Corner ticks */}
      <div className="absolute inset-2.5 z-[2] pointer-events-none">
        <span className="absolute top-0 left-0 size-3.5 border-t border-l border-white" />
        <span className="absolute top-0 right-0 size-3.5 border-t border-r border-white" />
        <span className="absolute bottom-0 left-0 size-3.5 border-b border-l border-white" />
        <span className="absolute bottom-0 right-0 size-3.5 border-b border-r border-white" />
      </div>
    </div>
  );
}
