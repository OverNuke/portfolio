import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./icons";
import styles from "./projects.module.css";

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children">;

interface RetroSlabLinkProps extends AnchorProps {
  href: string;
  label: string;
  icon?: ReactNode;
}

/** Mark 07 — slab button: solid abyss-blue background, icon + label.
 *  Used as the primary CTA on the featured project slab. */
export function RetroSlabLink({
  href,
  label,
  icon,
  className,
  ...rest
}: RetroSlabLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-3.5",
        "bg-accent text-foreground",
        "px-5 py-4 font-mono text-[11px] font-medium",
        "uppercase tracking-[0.3em] leading-none",
        "transition-transform duration-200 ease-out active:translate-y-px",
        className,
      )}
      {...rest}
    >
      <span
        aria-hidden="true"
        className="inline-flex transition-transform duration-200 ease-out group-hover:translate-x-1.5"
      >
        {icon ?? <GithubIcon className="size-4" />}
      </span>
      <span>{label}</span>
    </a>
  );
}

interface RetroSquareLinkProps extends AnchorProps {
  href: string;
  ariaLabel: string;
  icon?: ReactNode;
}

/** Mark 12 — ghost square button with corner ticks that pop on hover/focus.
 *  Used on tile cards as a compact source link. */
export function RetroSquareLink({
  href,
  ariaLabel,
  icon,
  className,
  ...rest
}: RetroSquareLinkProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={cn(
        styles.retroSquare,
        "inline-flex items-center justify-center size-11",
        "border border-foreground text-foreground",
        "transition-transform duration-200 ease-out active:translate-y-px",
        className,
      )}
      {...rest}
    >
      <span className={styles.tickBL} aria-hidden="true" />
      <span className={styles.tickBR} aria-hidden="true" />
      {icon ?? <GithubIcon className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </a>
  );
}
