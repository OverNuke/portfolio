"use client";

import { motion, useReducedMotion } from "motion/react";
import { RetroPressStart } from "@/components/ui/retro-buttons/press-start";
import { RetroLaunch } from "@/components/ui/retro-buttons/launch";
import { LayeredText } from "../ui/LayeredText";

const NAME_LINES = [
  { top: "Kevin", bottom: "García" },
  { top: "Sebastián", bottom: "Frías" },
  { top: "Frías", bottom: "Sebastián" },
  { top: "García", bottom: "Kevin" },
];

// #E4E4E4 = Silver Mist — 14.9:1 AAA on #0B0B0B
// #6B84D4 = Abyss tint  — ~5.8:1 AA  on #0B0B0B
const NAME_LINE_COLORS = ["#E4E4E4", "#6B84D4"];

const PARAGRAPH =
  "Software engineer, like backend development but open to frontend and mobile.";

const SCROLL_TARGETS = [
  { id: "about", label: "ABOUT", aria: "View about me" },
  { id: "projects", label: "PROJECTS", aria: "View projects" },
  {
    id: "certificates",
    label: "CERTIFICATES",
    aria: "View certificates and skills",
  },
  { id: "contact", label: "CONTACT", aria: "Contact me" },
] as const;

// Sharp deceleration — luxury fashion pacing
const SHARP = [0.76, 0, 0.24, 1] as const;
// Hard cut — staccato entrance
const CUT = [0.7, 0, 0.3, 1] as const;

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative isolate min-h-screen overflow-hidden flex flex-col justify-center pt-navbar-offset py-section-sm md:py-section"
      aria-labelledby="hero-heading"
    >
      {/* Visually hidden h1 preserves heading hierarchy for screen readers / SEO */}
      <h1 id="hero-heading" className="sr-only">
        Kevin Sebastián Frías García
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-y-0 lg:gap-x-16 items-center">
          {/* LEFT — animated name */}
          <LayeredText
            lines={NAME_LINES}
            lineColors={NAME_LINE_COLORS}
            animate={true}
            lineGap={10}
            fontSize="clamp(2rem, 6vw, 3.5rem)"
          />

          {/* RIGHT — role, paragraph, buttons */}
          <div className="flex flex-col gap-content">
            {/* Role label */}
            <div>
              <div className="flex items-center gap-3 mb-3" aria-hidden="true">
                <motion.div
                  className="w-6 h-px bg-foreground/40 origin-left"
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.25, delay: 0.1, ease: CUT }}
                />
                <motion.span
                  className="font-mono text-[10px] tracking-[0.4em] text-foreground/50 uppercase"
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15, delay: 0.2 }}
                >
                  An alien among humans beings who codes.
                </motion.span>
              </div>
            </div>

            {/* Paragraph — clip-path reveal, no word-by-word */}
            <div className="overflow-hidden">
              <motion.p
                className="text-muted leading-relaxed text-[clamp(1rem,1vw+0.65rem,1.2rem)] max-w-2xl"
                initial={
                  prefersReducedMotion
                    ? false
                    : { clipPath: "inset(100% 0 0% 0)" }
                }
                animate={{ clipPath: "inset(0% 0 0% 0)" }}
                transition={{ duration: 0.5, delay: 0.35, ease: SHARP }}
              >
                {PARAGRAPH}
              </motion.p>
            </div>

            {/* Buttons — retro game start menu */}
            <div className="flex flex-col gap-2">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.12, delay: 0.55 }}
                aria-hidden="true"
              >
                <RetroPressStart tabIndex={-1} className="pointer-events-none" />
              </motion.div>
              {SCROLL_TARGETS.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.12, delay: 0.65 + i * 0.07 }}
                >
                  <RetroLaunch
                    label={t.label}
                    aria-label={t.aria}
                    onClick={() =>
                      document
                        .getElementById(t.id)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}
