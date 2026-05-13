"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { LayeredText } from "../ui/LayeredText";
import { HeroDotField } from "../layout/HeroDotField";

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

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const words = PARAGRAPH.split(/(\s+)/);

  return (
    <section
      className="relative isolate min-h-screen overflow-hidden flex flex-col justify-center pt-16"
      aria-labelledby="hero-heading"
    >
      <HeroDotField />

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

      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 pb-16">
        <LayeredText
          lines={NAME_LINES}
          lineColors={NAME_LINE_COLORS}
          animate={true}
          lineGap={8}
          className="mb-12 sm:mb-16"
          fontSize="clamp(2.75rem, 8vw, 4.5rem)"
        />

        {/* Asymmetric two-column block: role label + tagline (left, w/ rule)
            and paragraph (right, offset). Falls back to a single column < lg. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-10 mb-12">
          <div className="lg:col-span-4 lg:border-l lg:border-foreground/15 lg:pl-6">
            <div className="flex items-center gap-3 mb-3" aria-hidden="true">
              <div className="w-6 h-px bg-foreground/40" />
              <span className="font-mono text-[10px] tracking-[0.4em] text-foreground/50 uppercase">
                Role
              </span>
            </div>
            <p className="font-mono text-xs sm:text-sm tracking-wide text-foreground/80 leading-relaxed">
              An alien among humans beings who codes.
            </p>
          </div>

          <motion.p
            className="lg:col-span-7 lg:col-start-6 text-muted leading-relaxed text-[clamp(1rem,1vw+0.65rem,1.2rem)] max-w-2xl"
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.04 } },
            }}
          >
            {words.map((word, i) =>
              /^\s+$/.test(word) ? (
                <span key={i}>{word}</span>
              ) : (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  {word}
                </motion.span>
              ),
            )}
          </motion.p>
        </div>

        <div className="flex flex-wrap gap-4">
          {SCROLL_TARGETS.map((t) => (
            <LiquidMetalButton
              key={t.id}
              label={t.label}
              onClick={() =>
                document
                  .getElementById(t.id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              variant={t.variant}
              viewMode="icon"
              icon={
                <Image src={t.icon} alt={t.alt} width={20} height={20} />
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
