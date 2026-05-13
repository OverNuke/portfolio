"use client";

import type { ButtonHTMLAttributes } from "react";
import styles from "./retro-buttons.module.css";

interface RetroLaunchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label?: string;
}

export function RetroLaunch({
  label = "LAUNCH",
  type = "button",
  className,
  ...rest
}: RetroLaunchProps) {
  return (
    <button
      type={type}
      className={`${styles.rb} ${styles.rb05}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      <span className={styles.lbl}>{label}</span>
    </button>
  );
}
