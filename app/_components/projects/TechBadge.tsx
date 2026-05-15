import { cn } from "@/lib/utils";

interface TechBadgeProps {
  children: React.ReactNode;
  size?: "sm" | "md";
}

export function TechBadge({ children, size = "md" }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-edge text-foreground font-mono",
        "uppercase leading-none whitespace-nowrap",
        "transition-colors duration-200",
        size === "md"
          ? "px-2.5 py-1.5 text-[10px] tracking-[0.22em]"
          : "px-2 py-1 text-[9px] tracking-[0.22em]",
      )}
    >
      {children}
    </span>
  );
}

export function TechBadgeList({
  tags,
  size = "md",
}: {
  tags: readonly string[];
  size?: "sm" | "md";
}) {
  return (
    <ul className="flex flex-wrap gap-2 list-none" aria-label="Technologies used">
      {tags.map((tag) => (
        <li key={tag}>
          <TechBadge size={size}>{tag}</TechBadge>
        </li>
      ))}
    </ul>
  );
}
