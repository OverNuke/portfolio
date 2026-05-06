"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { useEffect, useRef } from "react";

export interface LiquidMetalBackgroundProps {
  speed?: number;
  opacity?: number;
}

export function LiquidMetalBackground({
  speed = 0.6,
  opacity = 0.3,
}: LiquidMetalBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // biome-ignore lint/suspicious/noExplicitAny: External library without types
  const shaderMount = useRef<any>(null);

  // Inject global canvas styles once
  useEffect(() => {
    const styleId = "shader-canvas-style-fill";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-container-fill canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 0 !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Initialize ShaderMount on mount, destroy on unmount
  useEffect(() => {
    const loadShader = async () => {
      try {
        if (containerRef.current) {
          if (shaderMount.current?.destroy) {
            shaderMount.current.destroy();
          }

          shaderMount.current = new ShaderMount(
            containerRef.current,
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
            speed,
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
  }, []);

  // Update speed when prop changes
  useEffect(() => {
    shaderMount.current?.setSpeed?.(speed);
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className="shader-container-fill"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        opacity: opacity,
        pointerEvents: "none",
      }}
    />
  );
}
