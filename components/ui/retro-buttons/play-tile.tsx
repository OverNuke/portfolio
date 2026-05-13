"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./retro-buttons.module.css";

interface RetroPlayTileProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Resting icon. Defaults to the design's white play triangle. */
  icon?: ReactNode;
  /**
   * If provided, replaces the resting icon on hover with a cascading
   * sequence (80 / 160 / 240 ms delays per design). Pass `undefined`
   * to suppress the cascade — the resting icon then stays put on hover.
   */
  hoverIcons?: ReactNode[];
}

const DEFAULT_HOVER_ICONS: ReactNode[] = ["▸", "▸", "▸"];

export function RetroPlayTile({
  icon,
  hoverIcons,
  type = "button",
  className,
  ...rest
}: RetroPlayTileProps) {
  const hasDefaultIcon = icon === undefined;
  const restingIcon = hasDefaultIcon ? <span className={styles.tri} /> : icon;

  // If the caller passes a custom icon but no hoverIcons, we suppress the
  // cascade (semantic: GitHub icon shouldn't morph into play chevrons).
  // If the caller passes hoverIcons explicitly, honor them.
  // If the caller uses the default play triangle, use the default cascade.
  const cascade =
    hoverIcons ?? (hasDefaultIcon ? DEFAULT_HOVER_ICONS : undefined);

  const tileClass = cascade
    ? `${styles.rb} ${styles.rb03}`
    : `${styles.rb} ${styles.rb03} ${styles.rb03Static}`;

  return (
    <button
      type={type}
      className={`${tileClass}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      <span className={styles.glyph} aria-hidden="true">
        {restingIcon}
        {cascade && (
          <span className={styles.ticks}>
            {cascade.map((node, i) => (
              <span key={i}>{node}</span>
            ))}
          </span>
        )}
      </span>
    </button>
  );
}
