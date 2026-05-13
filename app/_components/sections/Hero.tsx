"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
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
  {
    id: "about",
    label: "View about me",
    icon: "/section-icons/account_circle.svg",
    alt: "Account circle icon",
    variant: "ghost" as const,
  },
  {
    id: "projects",
    label: "View projects",
    icon: "/section-icons/folder_code.svg",
    alt: "Folder with code icon",
    variant: undefined,
  },
  {
    id: "certificates",
    label: "View certificates and skills",
    icon: "/section-icons/history_edu.svg",
    alt: "History edu icon",
    variant: "ghost" as const,
  },
  {
    id: "contact",
    label: "Contact me",
    icon: "/section-icons/connect_without_contact.svg",
    alt: "Connect without contact icon",
    variant: undefined,
  },
];

// Sharp deceleration — luxury fashion pacing
const SHARP = [0.76, 0, 0.24, 1] as const;
// Hard cut — staccato entrance
const CUT = [0.7, 0, 0.3, 1] as const;

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative isolate min-h-screen overflow-hidden flex flex-col justify-center pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Visually hidden h1 preserves heading hierarchy for screen readers / SEO */}
      <h1 id="hero-heading" className="sr-only">
        Kevin Sebastián Frías García
      </h1>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-0 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-y-12 lg:gap-y-0 lg:gap-x-16 items-start">

          {/* LEFT — animated name */}
          <LayeredText
            lines={NAME_LINES}
            lineColors={NAME_LINE_COLORS}
            animate={true}
            lineGap={10}
            fontSize="clamp(2rem, 6vw, 3.5rem)"
          />

          {/* RIGHT — role, paragraph, buttons */}
          <div className="flex flex-col">

            {/* Role label */}
            <div className="mb-6 lg:mb-8 lg:border-l lg:border-foreground/15 lg:pl-6">
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
                  Role
                </motion.span>
              </div>
              <motion.p
                className="font-mono text-xs sm:text-sm tracking-wide text-foreground/80 leading-relaxed"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, delay: 0.3 }}
              >
                An alien among humans beings who codes.
              </motion.p>
            </div>

            {/* Paragraph — clip-path reveal, no word-by-word */}
            <div className="overflow-hidden mb-8 lg:mb-10">
              <motion.p
                className="text-muted leading-relaxed text-[clamp(1rem,1vw+0.65rem,1.2rem)] max-w-2xl"
                initial={prefersReducedMotion ? false : { clipPath: "inset(100% 0 0% 0)" }}
                animate={{ clipPath: "inset(0% 0 0% 0)" }}
                transition={{ duration: 0.5, delay: 0.35, ease: SHARP }}
              >
                {PARAGRAPH}
              </motion.p>
            </div>

            {/* Buttons — two rows, second row offset for asymmetric composition */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                {SCROLL_TARGETS.slice(0, 2).map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.12, delay: 0.55 + i * 0.07 }}
                  >
                    <LiquidMetalButton
                      label={t.label}
                      onClick={() =>
                        document
                          .getElementById(t.id)
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      variant={t.variant}
                      viewMode="icon"
                      icon={<Image src={t.icon} alt={t.alt} width={20} height={20} />}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-3 ml-8 sm:ml-12">
                {SCROLL_TARGETS.slice(2).map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.12, delay: 0.69 + i * 0.07 }}
                  >
                    <LiquidMetalButton
                      label={t.label}
                      onClick={() =>
                        document
                          .getElementById(t.id)
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      variant={t.variant}
                      viewMode="icon"
                      icon={<Image src={t.icon} alt={t.alt} width={20} height={20} />}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
