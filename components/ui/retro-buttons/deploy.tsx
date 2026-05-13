"use client";

import type { ButtonHTMLAttributes } from "react";
import styles from "./retro-buttons.module.css";

interface RetroDeployProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label?: string;
  top?: string;
  yearFrom?: string;
  yearTo?: string;
}

export function RetroDeploy({
  label = "DEPLOY",
  top = "// DEPLOY",
  yearFrom = "2026",
  yearTo = "2027",
  type = "button",
  className,
  ...rest
}: RetroDeployProps) {
  return (
    <button
      type={type}
      className={`${styles.rb} ${styles.rb06}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      <span className={styles.top}>
        <span>{top}</span>
        <span className={styles.year} aria-hidden="true">
          <span className={styles.yearRoll}>
            <span>{yearFrom}</span>
            <span>{yearTo}</span>
          </span>
        </span>
      </span>
      <span className={styles.big}>{label}</span>
    </button>
  );
}
