"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { RetroIcons } from "./icons";
import styles from "./retro-buttons.module.css";

interface RetroDownloadProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label?: string;
  icon?: ReactNode;
}

export function RetroDownload({
  label = "DOWNLOAD CV",
  icon,
  type = "button",
  className,
  ...rest
}: RetroDownloadProps) {
  return (
    <button
      type={type}
      className={`${styles.rb} ${styles.rb07}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      <span className={styles.icoWrap} aria-hidden="true">
        {icon ?? RetroIcons.download()}
      </span>
      <span className={styles.lbl}>{label}</span>
    </button>
  );
}
