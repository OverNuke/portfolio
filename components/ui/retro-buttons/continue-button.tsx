"use client";

import type { ButtonHTMLAttributes } from "react";
import styles from "./retro-buttons.module.css";

interface RetroContinueProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label?: string;
  indexFrom?: string;
  indexTo?: string;
}

export function RetroContinue({
  label = "CONTINUE",
  indexFrom = "01",
  indexTo = "02",
  type = "button",
  className,
  ...rest
}: RetroContinueProps) {
  return (
    <button
      type={type}
      className={`${styles.rb} ${styles.rb04}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      <span className={styles.index} aria-hidden="true">
        <span className={styles.indexRoll}>
          <span>{indexFrom}</span>
          <span>{indexTo}</span>
        </span>
      </span>
      <span className={styles.lbl}>{label}</span>
    </button>
  );
}
