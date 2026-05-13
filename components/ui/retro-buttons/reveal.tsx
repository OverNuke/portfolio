"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { RetroIcons } from "./icons";
import styles from "./retro-buttons.module.css";

interface RetroRevealProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon?: ReactNode;
}

export function RetroReveal({
  icon,
  type = "button",
  className,
  ...rest
}: RetroRevealProps) {
  return (
    <button
      type={type}
      className={`${styles.rb} ${styles.rb12}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      <span className={`${styles.tick} ${styles.tl}`} aria-hidden="true" />
      <span className={`${styles.tick} ${styles.tr}`} aria-hidden="true" />
      <span className={`${styles.tick} ${styles.bl}`} aria-hidden="true" />
      <span className={`${styles.tick} ${styles.br}`} aria-hidden="true" />
      {icon ?? RetroIcons.arrowUpRight()}
    </button>
  );
}
