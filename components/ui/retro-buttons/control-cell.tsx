"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { RetroIcons } from "./icons";
import styles from "./retro-buttons.module.css";

interface RetroControlCellProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label?: string;
  icon?: ReactNode;
}

export function RetroControlCell({
  label = "SOURCE",
  icon,
  type = "button",
  className,
  ...rest
}: RetroControlCellProps) {
  return (
    <button
      type={type}
      className={`${styles.rb} ${styles.rb10}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      <span className={styles.cellI} aria-hidden="true">
        {icon ?? RetroIcons.chevrons()}
      </span>
      <span className={styles.cellT}>{label}</span>
    </button>
  );
}
