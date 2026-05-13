"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { RetroIcons } from "./icons";
import styles from "./retro-buttons.module.css";

interface RetroExternalProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label?: string;
  /** Resting icon (slides out right on hover). Defaults to arrow-right. */
  icon?: ReactNode;
  /** Hover icon (slides in from left). Defaults to arrow-up-right. */
  hoverIcon?: ReactNode;
}

export function RetroExternal({
  label = "VISIT SITE",
  icon,
  hoverIcon,
  type = "button",
  className,
  ...rest
}: RetroExternalProps) {
  return (
    <button
      type={type}
      className={`${styles.rb} ${styles.rb08}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      <span className={styles.lbl}>{label}</span>
      <span className={styles.icoTrack} aria-hidden="true">
        <span className={`${styles.slot} ${styles.out}`}>
          {icon ?? RetroIcons.arrowRight()}
        </span>
        <span className={`${styles.slot} ${styles.in}`}>
          {hoverIcon ?? RetroIcons.arrowUpRight()}
        </span>
      </span>
    </button>
  );
}
