"use client";

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import styles from "./retro-buttons.module.css";

interface RetroEnterProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label?: string;
  chevron?: ReactNode;
  minWidth?: number;
}

export function RetroEnter({
  label = "ENTER",
  chevron = "▸",
  minWidth,
  type = "button",
  className,
  style,
  ...rest
}: RetroEnterProps) {
  const mergedStyle: CSSProperties | undefined =
    minWidth !== undefined ? { ...style, minWidth: `${minWidth}px` } : style;

  return (
    <button
      type={type}
      className={`${styles.rb} ${styles.rb02}${className ? ` ${className}` : ""}`}
      style={mergedStyle}
      {...rest}
    >
      <span className={styles.row}>
        <span>{label}</span>
        <span className={styles.chev} aria-hidden="true">
          {chevron}
        </span>
      </span>
    </button>
  );
}
