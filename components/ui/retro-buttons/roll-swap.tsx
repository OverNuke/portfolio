"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { RetroIcons } from "./icons";
import styles from "./retro-buttons.module.css";

interface RetroRollSwapProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Resting icon. Defaults to a paper-plane glyph. */
  icon?: ReactNode;
  /** Icon revealed after the −72px roll. Defaults to a check. */
  hoverIcon?: ReactNode;
}

export function RetroRollSwap({
  icon,
  hoverIcon,
  type = "button",
  className,
  ...rest
}: RetroRollSwapProps) {
  return (
    <button
      type={type}
      className={`${styles.rb} ${styles.rb09}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      <span className={styles.col} aria-hidden="true">
        <span className={styles.slot}>{icon ?? RetroIcons.paperPlane()}</span>
        <span className={styles.slot}>{hoverIcon ?? RetroIcons.check()}</span>
      </span>
    </button>
  );
}
