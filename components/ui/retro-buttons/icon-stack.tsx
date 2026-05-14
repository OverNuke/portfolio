"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { RetroIcons } from "./icons";
import styles from "./retro-buttons.module.css";

interface RetroIconStackProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label?: string;
  icon?: ReactNode;
}

export function RetroIconStack({
  label = "CONTACT",
  icon,
  type = "button",
  className,
  ...rest
}: RetroIconStackProps) {
  return (
    <button
      type={type}
      className={`${styles.rb} ${styles.rb11}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      <span className={styles.icoPad} aria-hidden="true">
        {icon ?? RetroIcons.envelope()}
      </span>
      <span className={styles.lbl}>{label}</span>
      <span className={styles.rule} aria-hidden="true" />
    </button>
  );
}
