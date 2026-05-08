"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import type React from "react";
import { useEffect, useRef } from "react";

export interface LiquidMetalShellProps {
  width: number;
  height: number;
  variant?: "default" | "contrast" | "ghost";
  isHovered: boolean;
  isPressed: boolean;
  ripples?: Array<{ x: number; y: number; id: number }>;
  clickTick?: number;
  children: React.ReactNode;
}

export function LiquidMetalShell({
  width,
  height,
  variant = "default",
  isHovered,
  isPressed,
  clickTick,
  children,
}: LiquidMetalShellProps) {
  const innerWidth = width - 4;
  const innerHeight = height - 4;

  const shaderRef = useRef<HTMLDivElement>(null);
  // biome-ignore lint/suspicious/noExplicitAny: External library without types
  const shaderMount = useRef<any>(null);
  const isHoveredRef = useRef(isHovered);

  // Inject global canvas styles once
  useEffect(() => {
    const styleId = "shader-canvas-style-exploded";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-container-exploded canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes ripple-animation {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }

        /* ── Ghost variant: liquid-chrome animated treatment ─────────────── */
        @property --ghost-rotate {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --ghost-bg-x {
          syntax: "<number>";
          inherits: true;
          initial-value: 50;
        }
        @property --ghost-bg-y {
          syntax: "<number>";
          inherits: true;
          initial-value: 50;
        }
        @property --ghost-hue-shift {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --ghost-glow-opacity {
          syntax: "<number>";
          inherits: true;
          initial-value: 0.55;
        }
        @property --ghost-glow-blur {
          syntax: "<number>";
          inherits: true;
          initial-value: 14;
        }

        .ghost-metal-stack {
          --ghost-anim-speed: 7s;
          --ghost-interaction-speed: 0.55s;
          /* Palette borrowed from LiquidMetalBackground:
             E4E4E4 silver mist, 6B84D4 abyss tint, 0B0B0B page base */
          --ghost-silver: 228, 228, 228;
          --ghost-abyss: 107, 132, 212;
          --ghost-base: 11, 11, 11;
          position: absolute;
          inset: 0;
          border-radius: 100px;
          pointer-events: none;
          overflow: visible;
        }

        .ghost-metal-fill {
          position: absolute;
          inset: 2px;
          border-radius: 100px;
          background:
            radial-gradient(
              140% 320% at calc(var(--ghost-bg-x) * 1%) calc(var(--ghost-bg-y) * 1%),
              rgba(var(--ghost-silver), 0.55) 0%,
              rgba(var(--ghost-abyss), 0.32) 22%,
              rgba(40, 42, 50, 0.45) 55%,
              rgba(var(--ghost-base), 0.7) 100%
            ),
            linear-gradient(180deg, rgba(20, 20, 24, 0.4) 0%, rgba(var(--ghost-base), 0.6) 100%);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          animation: ghost-rotate-bg var(--ghost-anim-speed) linear infinite,
                     ghost-hue-drift calc(var(--ghost-anim-speed) * 2) ease-in-out infinite;
          filter: hue-rotate(calc(var(--ghost-hue-shift) * 1deg));
          overflow: hidden;
        }

        .ghost-metal-fill::before {
          /* Conic chrome rim that scans around the pill */
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 100px;
          padding: 1px;
          background: conic-gradient(
            from calc(var(--ghost-rotate) * 1deg),
            rgba(var(--ghost-silver), 0) 0deg,
            rgba(var(--ghost-silver), 0.85) 35deg,
            rgba(var(--ghost-abyss), 0.55) 80deg,
            rgba(var(--ghost-silver), 0) 160deg,
            rgba(var(--ghost-silver), 0) 360deg
          );
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          mask-composite: exclude;
          animation: ghost-rotate var(--ghost-anim-speed) linear infinite;
          pointer-events: none;
        }

        .ghost-metal-glow {
          position: absolute;
          inset: -60% -25%;
          border-radius: 999px;
          background: radial-gradient(
            55% 55% at 50% 50%,
            rgba(var(--ghost-silver), 0.4) 0%,
            rgba(var(--ghost-abyss), 0.22) 38%,
            transparent 72%
          );
          filter: blur(calc(var(--ghost-glow-blur) * 1px));
          opacity: var(--ghost-glow-opacity);
          transform: rotate(calc(var(--ghost-rotate) * 1deg));
          transform-origin: center;
          animation: ghost-rotate var(--ghost-anim-speed) linear infinite;
          z-index: -1;
          pointer-events: none;
        }

        .ghost-metal-stack[data-hover="true"] .ghost-metal-fill {
          animation-play-state: paused;
        }
        .ghost-metal-stack[data-hover="true"] .ghost-metal-fill::before {
          animation-play-state: paused;
        }
        .ghost-metal-stack[data-hover="true"] .ghost-metal-glow {
          animation-play-state: paused;
          --ghost-glow-opacity: 0.85;
          --ghost-glow-blur: 9;
          transition:
            --ghost-glow-opacity var(--ghost-interaction-speed) ease,
            --ghost-glow-blur var(--ghost-interaction-speed) ease;
        }

        @keyframes ghost-rotate {
          from { --ghost-rotate: 0; }
          to   { --ghost-rotate: 360; }
        }
        @keyframes ghost-rotate-bg {
          0%   { --ghost-bg-x: 15;  --ghost-bg-y: 30; }
          25%  { --ghost-bg-x: 85;  --ghost-bg-y: 20; }
          50%  { --ghost-bg-x: 90;  --ghost-bg-y: 75; }
          75%  { --ghost-bg-x: 10;  --ghost-bg-y: 70; }
          100% { --ghost-bg-x: 15;  --ghost-bg-y: 30; }
        }
        @keyframes ghost-hue-drift {
          0%, 100% { --ghost-hue-shift: -8; }
          50%      { --ghost-hue-shift: 8; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ghost-metal-fill,
          .ghost-metal-fill::before,
          .ghost-metal-glow {
            animation: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Initialize shader — skip entirely for ghost variant
  useEffect(() => {
    if (variant === "ghost") return;

    const loadShader = async () => {
      try {
        if (shaderRef.current) {
          if (shaderMount.current?.destroy) {
            shaderMount.current.destroy();
          }

          shaderMount.current = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            {
              u_repetition: 4,
              u_softness: 0.5,
              u_shiftRed: 0.3,
              u_shiftBlue: 0.3,
              u_distortion: 0,
              u_contour: 0,
              u_angle: 45,
              u_scale: 8,
              u_shape: 1,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.6,
          );
        }
      } catch (error) {
        console.error("Failed to load shader:", error);
      }
    };

    loadShader();

    return () => {
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
        shaderMount.current = null;
      }
    };
  }, [variant]);

  // Keep ref in sync so the burst timeout can read current hover state
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  // Respond to hover/press changes for shader speed
  useEffect(() => {
    if (variant === "ghost" || !shaderMount.current) return;
    if (isHovered) {
      shaderMount.current?.setSpeed?.(1);
    } else {
      shaderMount.current?.setSpeed?.(0.6);
    }
  }, [isHovered, variant]);

  // Click speed burst — accelerate shader on click then settle back
  useEffect(() => {
    if (!clickTick || variant === "ghost" || !shaderMount.current) return;
    shaderMount.current?.setSpeed?.(2.4);
    const t = setTimeout(() => {
      shaderMount.current?.setSpeed?.(isHoveredRef.current ? 1 : 0.6);
    }, 300);
    return () => clearTimeout(t);
  }, [clickTick, variant]);

  // Inner background per variant
  const innerBg =
    variant === "contrast"
      ? "linear-gradient(180deg, #C8C8C8 0%, #E4E4E4 100%)"
      : variant === "ghost"
        ? "transparent"
        : "linear-gradient(180deg, #202020 0%, #000000 100%)";

  return (
    <div
      style={{
        perspective: "1000px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      <div
        style={{
          position: "relative",
          width: `${width}px`,
          height: `${height}px`,
          transformStyle: "preserve-3d",
          transition:
            "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
          transform: "none",
        }}
      >
        {/* Inner background layer — z:20 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${width}px`,
            height: `${height}px`,
            transformStyle: "preserve-3d",
            transition:
              "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
            transform: `translateZ(10px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
            zIndex: 20,
          }}
        >
          {variant !== "ghost" && (
            <div
              style={{
                width: `${innerWidth}px`,
                height: `${innerHeight}px`,
                margin: "2px",
                borderRadius: "100px",
                background: innerBg,
                boxShadow: isPressed
                  ? "inset 0px 2px 4px rgba(0, 0, 0, 0.4), inset 0px 1px 2px rgba(0, 0, 0, 0.3)"
                  : "none",
                transition:
                  "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease, box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          )}
          {variant === "ghost" && (
            <div
              className="ghost-metal-stack"
              data-hover={isHovered ? "true" : "false"}
              aria-hidden="true"
            >
              <span className="ghost-metal-glow" />
              <div className="ghost-metal-fill" />
            </div>
          )}
        </div>

        {/* Shadow ring + shader canvas — z:10 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${width}px`,
            height: `${height}px`,
            transformStyle: "preserve-3d",
            transition:
              "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
            transform: `translateZ(0px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
            zIndex: 10,
          }}
        >
          <div
            style={{
              height: `${height}px`,
              width: `${width}px`,
              borderRadius: "100px",
              boxShadow: isPressed
                ? "0px 0px 0px 1px rgba(0, 0, 0, 0.5), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)"
                : isHovered
                  ? "0px 0px 0px 1px rgba(0, 0, 0, 0.4), 0px 12px 6px 0px rgba(0, 0, 0, 0.05), 0px 8px 5px 0px rgba(0, 0, 0, 0.1), 0px 4px 4px 0px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.2)"
                  : "0px 0px 0px 1px rgba(0, 0, 0, 0.3), 0px 36px 14px 0px rgba(0, 0, 0, 0.02), 0px 20px 12px 0px rgba(0, 0, 0, 0.08), 0px 9px 9px 0px rgba(0, 0, 0, 0.12), 0px 2px 5px 0px rgba(0, 0, 0, 0.15)",
              transition:
                "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease, box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
              background: "rgb(0 0 0 / 0)",
            }}
          >
            {variant !== "ghost" && (
              <div
                ref={shaderRef}
                className="shader-container-exploded"
                style={{
                  borderRadius: "100px",
                  overflow: "hidden",
                  position: "relative",
                  width: `${width}px`,
                  maxWidth: `${width}px`,
                  height: `${height}px`,
                  transition: "width 0.4s ease, height 0.4s ease",
                }}
              />
            )}
          </div>
        </div>

        {/* Children slot — z:40 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${width}px`,
            height: `${height}px`,
            zIndex: 40,
            transformStyle: "preserve-3d",
            transform: "translateZ(25px)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
