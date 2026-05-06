"use client";

import { Sparkles } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { LiquidMetalShell } from "./liquid-metal-shell";

interface LiquidMetalButtonProps {
  label?: string;
  onClick?: () => void;
  viewMode?: "text" | "icon";
  variant?: "default" | "contrast" | "ghost";
}

export function LiquidMetalButton({
  label = "Get Started",
  onClick,
  viewMode = "text",
  variant = "default",
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [clickTick, setClickTick] = useState(0);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  const width = viewMode === "icon" ? 46 : 142;
  const height = 46;

  // Text/icon color per variant
  const contentColor =
    variant === "contrast"
      ? "#0B0B0B"
      : variant === "ghost"
        ? "#E4E4E4"
        : "#666666";

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClickTick((t) => t + 1);

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = { x, y, id: rippleId.current++ };

      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
    }

    onClick?.();
  };

  return (
    <div className="relative inline-block">
      <LiquidMetalShell
        width={width}
        height={height}
        variant={variant}
        isHovered={isHovered}
        isPressed={isPressed}
        ripples={ripples}
        clickTick={clickTick}
      >
        <button
          ref={buttonRef}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            outline: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            overflow: "hidden",
            borderRadius: "100px",
          }}
          aria-label={label}
        >
          {viewMode === "icon" && (
            <Sparkles
              size={16}
              style={{
                color: contentColor,
                filter: "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.5))",
                transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
          )}
          {viewMode === "text" && (
            <span
              style={{
                fontSize: "14px",
                color: contentColor,
                fontWeight: 400,
                textShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)",
                transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>
          )}
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              style={{
                position: "absolute",
                left: `${ripple.x}px`,
                top: `${ripple.y}px`,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
                pointerEvents: "none",
                animation: "ripple-animation 0.6s ease-out",
              }}
            />
          ))}
        </button>
      </LiquidMetalShell>
    </div>
  );
}
