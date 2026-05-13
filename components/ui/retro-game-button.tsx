"use client";

import { Sparkles } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";

const PIXEL_STEP = 4;

const STEPPED_CLIP_PATH = `polygon(
  0 ${PIXEL_STEP}px,
  ${PIXEL_STEP}px ${PIXEL_STEP}px,
  ${PIXEL_STEP}px 0,
  calc(100% - ${PIXEL_STEP}px) 0,
  calc(100% - ${PIXEL_STEP}px) ${PIXEL_STEP}px,
  100% ${PIXEL_STEP}px,
  100% calc(100% - ${PIXEL_STEP}px),
  calc(100% - ${PIXEL_STEP}px) calc(100% - ${PIXEL_STEP}px),
  calc(100% - ${PIXEL_STEP}px) 100%,
  ${PIXEL_STEP}px 100%,
  ${PIXEL_STEP}px calc(100% - ${PIXEL_STEP}px),
  0 calc(100% - ${PIXEL_STEP}px)
)`;

type Variant = "default" | "ghost";

interface RetroGameButtonProps {
  label?: string;
  onClick?: () => void;
  viewMode?: "text" | "icon";
  variant?: Variant;
  icon?: React.ReactNode;
}

interface Palette {
  face: string;
  faceHover: string;
  edge: string;
  shadow: string;
  content: string;
}

const PALETTES: Record<Variant, Palette> = {
  default: {
    face: "#E4E4E4",
    faceHover: "#F2F2F2",
    edge: "#888888",
    shadow: "#0B0B0B",
    content: "#0B0B0B",
  },
  ghost: {
    face: "#12182E",
    faceHover: "#1D2645",
    edge: "#2B396D",
    shadow: "#0B0B0B",
    content: "#E4E4E4",
  },
};

export function RetroGameButton({
  label = "Get Started",
  onClick,
  viewMode = "text",
  variant = "default",
  icon,
}: RetroGameButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const width = viewMode === "icon" ? 46 : 142;
  const height = 46;
  const palette = PALETTES[variant];

  const offset = isPressed ? 0 : PIXEL_STEP;

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: `${width + PIXEL_STEP}px`,
        height: `${height + PIXEL_STEP}px`,
      }}
    >
      {/* Hard pixel shadow layer */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: PIXEL_STEP,
          left: PIXEL_STEP,
          width: `${width}px`,
          height: `${height}px`,
          background: palette.shadow,
          clipPath: STEPPED_CLIP_PATH,
          pointerEvents: "none",
        }}
      />

      {/* Button face */}
      <button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") setIsPressed(true);
        }}
        onKeyUp={(e) => {
          if (e.key === " " || e.key === "Enter") setIsPressed(false);
        }}
        aria-label={label}
        style={{
          position: "absolute",
          top: offset,
          left: offset,
          width: `${width}px`,
          height: `${height}px`,
          padding: 0,
          border: "none",
          outline: "none",
          cursor: "pointer",
          background: isHovered ? palette.faceHover : palette.face,
          clipPath: STEPPED_CLIP_PATH,
          transition: "top 60ms steps(2), left 60ms steps(2), background 80ms steps(2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          fontFamily: "var(--font-mono, ui-monospace, monospace)",
          imageRendering: "pixelated",
        }}
      >
        {/* Inner bevel — a thin inset frame echoing the edge color */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: PIXEL_STEP,
            left: PIXEL_STEP,
            right: PIXEL_STEP,
            bottom: PIXEL_STEP,
            border: `2px solid ${palette.edge}`,
            clipPath: STEPPED_CLIP_PATH,
            pointerEvents: "none",
            opacity: 0.55,
          }}
        />

        {viewMode === "icon" &&
          (icon ?? (
            <Sparkles
              size={18}
              style={{ color: palette.content }}
              aria-hidden="true"
            />
          ))}

        {viewMode === "text" && (
          <span
            style={{
              position: "relative",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: palette.content,
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
        )}
      </button>
    </div>
  );
}
