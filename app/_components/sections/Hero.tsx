"use client";

import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { LayeredText } from "../ui/LayeredText";

const NAME_LINES = [
  { top: " ", bottom: "" },
  { top: "KEVIN", bottom: "SEBASTIÁN" },
  { top: "SEBASTIÁN", bottom: "FRÍAS" },
  { top: "FRÍAS", bottom: "GARCÍA" },
  { top: "GARCÍA", bottom: " " },
];

// #E4E4E4 = Silver Mist — 14.9:1 AAA on #0B0B0B
// #6B84D4 = Abyss tint  — ~5.8:1 AA  on #0B0B0B
const NAME_LINE_COLORS = ["#E4E4E4", "#6B84D4"];

export function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center pt-16 relative overflow-x-clip"
      aria-labelledby="hero-heading"
    >
      {/* Section index marker */}
      <span
        className="absolute top-8 right-8 font-mono text-[10px] tracking-[0.5em] text-foreground/15 select-none uppercase"
        aria-hidden="true"
      >
        001
      </span>

      {/* Visually hidden h1 preserves heading hierarchy for screen readers / SEO */}
      <h1 id="hero-heading" className="sr-only">
        Kevin Sebastián Frías García
      </h1>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 w-full">
        <LayeredText
          lines={NAME_LINES}
          lineColors={NAME_LINE_COLORS}
          animate={false}
          className="mb-48"
        />
        {/* Role label with accent line */}
        <div className="flex items-center gap-3 mb-6" aria-hidden="true">
          <div className="w-8 h-px bg-foreground/20" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-foreground/30 uppercase">
            Software Engineer
          </span>
        </div>
        <p className="text-muted text-lg max-w-xl leading-relaxed mb-10 border-l border-foreground/10 pl-5">
          Software engineer, like backend development but open to frontend and
          mobile.
        </p>
        <div className="flex flex-wrap gap-4">
          <LiquidMetalButton
            label="View projects"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          />
        </div>
      </div>
    </section>
  );
}
