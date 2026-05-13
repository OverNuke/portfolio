"use client";

import type { ButtonHTMLAttributes } from "react";
import styles from "./retro-buttons.module.css";

interface RetroPressStartProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label?: string;
}

export function RetroPressStart({
  label = "PRESS START",
  type = "button",
  className,
  ...rest
}: RetroPressStartProps) {
  return (
    <button
      type={type}
      className={`${styles.rb} ${styles.rb01}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      <span className={styles.lbl}>{label}</span>
      <span className={styles.caret} aria-hidden="true" />
    </button>
  );
}
