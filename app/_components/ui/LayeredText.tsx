"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import type React from "react";

interface LayeredTextLine {
  top: string;
  bottom: string;
}

interface LayeredTextProps {
  lines?: LayeredTextLine[];
  colorByWord?: Record<string, string>;
  fontSize?: string;
  fontSizeMd?: string;
  lineHeight?: number;
  lineHeightMd?: number;
  staggerX?: number;
  staggerXMd?: number;
  lineColors?: string[];
  animate?: boolean;
  className?: string;
  lineGap?: number;
}

const DEFAULT_LINES: LayeredTextLine[] = [
  { top: " ", bottom: "INFINITE" },
  { top: "INFINITE", bottom: "PROGRESS" },
  { top: "PROGRESS", bottom: "INNOVATION" },
  { top: "INNOVATION", bottom: "FUTURE" },
  { top: "FUTURE", bottom: "DREAMS" },
  { top: "DREAMS", bottom: "ACHIEVEMENT" },
  { top: "ACHIEVEMENT", bottom: " " },
];

export function LayeredText({
  lines = DEFAULT_LINES,
  colorByWord,
  fontSize = "77px",
  fontSizeMd = "36px",
  lineHeight = 96,
  lineHeightMd = 44,
  staggerX = 20,
  staggerXMd = 8,
  lineColors,
  animate = true,
  className = "",
  lineGap = 0,
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!animate) return;

    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const isMd = window.matchMedia("(min-width: 768px)").matches;
      if (!isMd) return;
      const travel = isMd ? lineHeight : lineHeightMd;

      timelineRef.current = gsap.timeline({ paused: true });
      timelineRef.current.to("p", {
        y: -travel,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.06,
      });
    }, container);

    return () => {
      ctx.revert();
      timelineRef.current = null;
    };
  }, [animate, lines, lineHeight, lineHeightMd]);

  const handleMouseEnter = () => timelineRef.current?.play();
  const handleMouseLeave = () => timelineRef.current?.reverse();

  const activeLineHeight = isMobile ? lineHeightMd : lineHeight;
  const activeStaggerX = isMobile ? staggerXMd : staggerX;

  const rows = useMemo(
    () =>
      lines.map((line, index) => {
        const even = index % 2 === 0;
        const skew = even
          ? "skew(60deg, -30deg) scaleY(0.66667)"
          : "skew(0deg, -30deg) scaleY(1.33333)";
        return {
          line,
          transform: `translateX(${index * activeStaggerX}px) ${skew}`,
          topColor:
            colorByWord?.[line.top.trim()] ??
            lineColors?.[index % lineColors.length],
          bottomColor:
            colorByWord?.[line.bottom.trim()] ??
            lineColors?.[index % lineColors.length],
        };
      }),
    [lines, activeStaggerX, colorByWord, lineColors],
  );

  return (
    <div
      ref={containerRef}
      onMouseEnter={animate ? handleMouseEnter : undefined}
      onMouseLeave={animate ? handleMouseLeave : undefined}
      className={`w-max justify-self-center font-sans font-black tracking-[-1px] uppercase antialiased${animate ? " cursor-pointer" : ""} text-foreground ${className}`}
      style={
        {
          fontSize,
          fontWeight: 900,
        } as React.CSSProperties
      }
    >
      <ul
        className="list-none flex flex-col items-center "
        style={{ gap: lineGap > 0 ? `${lineGap}px` : undefined }}
      >
        {rows.map((row, index) => (
          <li
            key={index}
            className="relative"
            style={
              {
                width: "max-content",
                height: `${activeLineHeight}px`,
                transform: row.transform,
                color: row.topColor,
                overflow: "clip",
                clipPath: "inset(0)",
                willChange: "transform",
              } as React.CSSProperties
            }
          >
            <p
              style={{
                height: `${activeLineHeight}px`,
                lineHeight: `${activeLineHeight}px`,
                margin: 0,
              }}
            >
              {row.line.top}
            </p>
            <p
              style={{
                height: `${activeLineHeight}px`,
                lineHeight: `${activeLineHeight}px`,
                margin: 0,
              }}
            >
              {row.line.bottom}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
