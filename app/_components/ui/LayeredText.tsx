"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
  fontSize = "72px",
  fontSizeMd = "36px",
  lineHeight = 88,
  lineHeightMd = 44,
  staggerX = 14,
  staggerXMd = 8,
  lineColors,
  animate = true,
  className = "",
  lineGap = 0,
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [extraBottom, setExtraBottom] = useState(0);

  useEffect(() => {
    if (!animate) return;

    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const isMd = window.matchMedia("(min-width: 768px)").matches;
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

  const rows = useMemo(
    () =>
      lines.map((line, index) => {
        const even = index % 2 === 0;
        const skew = even
          ? "skew(60deg, -30deg) scaleY(0.66667)"
          : "skew(0deg, -30deg) scaleY(1.33333)";
        return {
          line,
          transform: `translateX(${index * staggerX}px) ${skew}`,
          topColor:
            colorByWord?.[line.top.trim()] ??
            lineColors?.[index % lineColors.length],
          bottomColor:
            colorByWord?.[line.bottom.trim()] ??
            lineColors?.[index % lineColors.length],
        };
      }),
    [lines, staggerX, colorByWord, lineColors],
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function measure() {
      const listEl = container!.querySelector("ul");
      if (!listEl) return;
      const ulBottom = listEl.getBoundingClientRect().bottom;
      let maxBottom = ulBottom;
      listEl.querySelectorAll("li").forEach((li) => {
        maxBottom = Math.max(maxBottom, li.getBoundingClientRect().bottom);
      });
      const overflow = Math.max(0, maxBottom - ulBottom);
      setExtraBottom((prev) =>
        Math.abs(prev - overflow) > 0 ? overflow : prev,
      );
    }

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [rows]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={animate ? handleMouseEnter : undefined}
      onMouseLeave={animate ? handleMouseLeave : undefined}
      className={`w-fit font-sans font-black tracking-[-2px] uppercase antialiased${animate ? " cursor-pointer" : ""} text-foreground ${className}`}
      style={
        {
          fontSize,
          fontWeight: 900,
          ...(extraBottom > 0 && { paddingBottom: `${extraBottom}px` }),
        } as React.CSSProperties
      }
    >
      <ul
        className="list-none p-1 m-1 flex flex-col items-center"
        style={{ gap: lineGap > 0 ? `${lineGap}px` : undefined }}
      >
        {rows.map((row, index) => (
          <li
            key={index}
            className="relative"
            style={
              {
                height: `${lineHeight}px`,
                transform: row.transform,
                color: row.topColor,
                "--md-height": `${lineHeightMd}px`,
                overflow: 'hidden',
              } as React.CSSProperties
            }
          >
            <p style={{ lineHeight: `${lineHeight}px` }}>{row.line.top}</p>
            <p style={{ lineHeight: `${lineHeight}px` }}>{row.line.bottom}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
