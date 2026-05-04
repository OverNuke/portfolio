"use client";

import { useEffect, useRef } from "react";
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
  className?: string;
}

const DEFAULT_LINES: LayeredTextLine[] = [
  { top: " ", bottom: "INFINITE" },
  { top: "INFINITE", bottom: "PROGRESS" },
  { top: "PROGRESS", bottom: "INNOVATION" },
  { top: "INNOVATION", bottom: "FUTURE" },
  { top: "FUTURE", bottom: "DREAMS" },
  { top: "DREAMS", bottom: "ACHIEVEMENT" },
  { top: "ACHIEVEMENT", bottom: " " },
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
  className = "",
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const paragraphs = container.querySelectorAll("p");
    const isMd = window.matchMedia("(min-width: 768px)").matches;
    const travel = isMd ? lineHeight : lineHeightMd;

    timelineRef.current = gsap.timeline({ paused: true });
    timelineRef.current.to(paragraphs, {
      y: -travel,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.06,
    });

    const enter = () => timelineRef.current?.play();
    const leave = () => timelineRef.current?.reverse();
    container.addEventListener("mouseenter", enter);
    container.addEventListener("mouseleave", leave);

    return () => {
      container.removeEventListener("mouseenter", enter);
      container.removeEventListener("mouseleave", leave);
      timelineRef.current?.kill();
    };
  }, [lines, lineHeight, lineHeightMd]);

  const colorFor = (word: string) => {
    const key = word.trim();
    return key ? colorByWord?.[key] : undefined;
  };

  return (
    <div
      ref={containerRef}
      className={`w-full font-sans font-black tracking-[-2px] uppercase antialiased cursor-pointer text-foreground ${className}`}
      style={{ fontSize } as React.CSSProperties}
    >
      <ul className="list-none p-0 m-0 flex flex-col items-start">
        {lines.map((line, index) => {
          const even = index % 2 === 0;
          const tx = index * staggerX;
          const txMd = index * staggerXMd;
          const skew = even
            ? "skew(60deg, -30deg) scaleY(0.66667)"
            : "skew(0deg, -30deg) scaleY(1.33333)";
          return (
            <li
              key={index}
              className="overflow-hidden relative origin-left"
              style={
                {
                  height: `${lineHeight}px`,
                  transform: `translateX(${tx}px) ${skew}`,
                  "--md-height": `${lineHeightMd}px`,
                  "--md-translateX": `${txMd}px`,
                } as React.CSSProperties
              }
            >
              <p
                className="m-0 pr-6 whitespace-nowrap"
                style={{
                  height: `${lineHeight}px`,
                  lineHeight: `${lineHeight}px`,
                  color: colorFor(line.top),
                }}
              >
                {line.top}
              </p>
              <p
                className="m-0 pr-6 whitespace-nowrap"
                style={{
                  height: `${lineHeight}px`,
                  lineHeight: `${lineHeight}px`,
                  color: colorFor(line.bottom),
                }}
              >
                {line.bottom}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
