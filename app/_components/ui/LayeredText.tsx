"use client";

import { useEffect, useMemo, useRef } from "react";
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
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

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
          topColor: colorByWord?.[line.top.trim()] ?? lineColors?.[index % lineColors.length],
          bottomColor: colorByWord?.[line.bottom.trim()] ?? lineColors?.[index % lineColors.length],
        };
      }),
    [lines, staggerX, colorByWord, lineColors],
  );

  return (
    <div
      ref={containerRef}
      onMouseEnter={animate ? handleMouseEnter : undefined}
      onMouseLeave={animate ? handleMouseLeave : undefined}
      className={`w-fit font-sans font-black tracking-[-2px] uppercase antialiased${animate ? " cursor-pointer" : ""} text-foreground ${className}`}
      style={{ fontSize } as React.CSSProperties}
    >
      <ul className="list-none p-1 m-1 flex flex-col items-center">
        {lines.map((line, index) => {
          const translateX = calculateTranslateX(index);
          return (
            <li
              key={index}
              className="overflow-hidden relative"
              style={
                {
                  height: `${lineHeight}px`,
                  transform: `translateX(${translateX.desktop}px) skew(${index % 2 === 0 ? "60deg, -30deg" : "0deg, -30deg"}) scaleY(${index % 2 === 0 ? "0.66667" : "1.33333"})`,
                  color: colors ? colors[index % 2] : undefined,
                  "--md-height": `${lineHeightMd}px`,
                  "--md-translateX": `${translateX.mobile}px`,
                } as React.CSSProperties
              }
            >
              {line.bottom}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
