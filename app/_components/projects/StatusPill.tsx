import { cn } from "@/lib/utils";

interface StatusPillProps {
  children: React.ReactNode;
  variant?: "default" | "muted";
}

export function StatusPill({ children, variant = "default" }: StatusPillProps) {
  const isMuted = variant === "muted";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10px]",
        "tracking-[0.26em] uppercase",
        isMuted ? "text-muted" : "text-foreground",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          isMuted ? "bg-muted" : "bg-foreground",
        )}
      />
      {children}
    </span>
  );
}
