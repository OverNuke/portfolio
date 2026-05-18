"use client";

import {
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import styles from "./retro-buttons.module.css";

type BaseProps = {
  label?: string;
  countFrom?: number;
  countTo?: number;
  intervalMs?: number;
  gameOverLabel?: string;
  className?: string;
};

type AsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | keyof BaseProps> & {
    href?: never;
  };

type AsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | keyof BaseProps> & {
    href: string;
  };

type RetroContinueProps = AsButton | AsAnchor;

export function RetroContinue({
  label = "CONTINUE",
  countFrom = 9,
  countTo = 0,
  intervalMs = 1000,
  gameOverLabel = "GAME OVER",
  className,
  ...rest
}: RetroContinueProps) {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(countFrom);
  const [isGameOver, setIsGameOver] = useState(false);

  const countToRef = useRef(countTo);
  const intervalMsRef = useRef(intervalMs);

  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => {
      setCurrent((prev) => {
        const next = prev - 1;
        if (next <= countToRef.current) {
          setIsGameOver(true);
          clearInterval(id);
          return countToRef.current;
        }
        return next;
      });
    }, intervalMsRef.current);
    return () => clearInterval(id);
  }, [started]);

  const cls = `${styles.rb} ${styles.rb04}${isGameOver ? ` ${styles.rb04GameOver}` : ""}${className ? ` ${className}` : ""}`;
  const ariaLabel = isGameOver
    ? gameOverLabel
    : started
      ? `${label} — ${current} seconds remaining`
      : label;

  const inner = (
    <>
      <span className={styles.index} aria-hidden="true">
        <span key={current} className={styles.countDigit}>
          {String(current)}
        </span>
      </span>
      <span className={styles.lbl}>{isGameOver ? gameOverLabel : label}</span>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {isGameOver ? gameOverLabel : ""}
      </span>
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { onMouseEnter: _me, onFocus: _f, ...anchorRest } = rest as AsAnchor;
    return (
      <a
        className={cls}
        aria-label={ariaLabel}
        onMouseEnter={(e) => { setStarted(true); _me?.(e); }}
        onFocus={(e) => { setStarted(true); _f?.(e); }}
        {...anchorRest}
      >
        {inner}
      </a>
    );
  }

  const { onMouseEnter: _me, onFocus: _f, type = "button", ...buttonRest } = rest as AsButton;
  return (
    <button
      type={type}
      className={cls}
      aria-label={ariaLabel}
      onMouseEnter={(e) => { setStarted(true); _me?.(e); }}
      onFocus={(e) => { setStarted(true); _f?.(e); }}
      {...buttonRest}
    >
      {inner}
    </button>
  );
}
