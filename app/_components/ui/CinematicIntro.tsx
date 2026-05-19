"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import gsap from "gsap";

/* ──────────────────────────────────────────────────────────────────────────
 * Cinematic typography intro.
 *
 * Each beat picks a different typographic treatment — condensed, tracked,
 * compressed, weight-swap, monogram. Beat cadence is driven by a GSAP
 * timeline; per-beat typography uses framer-motion variants with hard cuts.
 *
 * Beats:
 *   0  KEVIN       — display, scale punch
 *   1  SEBASTIÁN   — ultra-condensed (scaleX clamp)
 *   2  FRÍAS       — wide tracking expansion
 *   3  GARCÍA      — bold weight swap, vertical compression
 *   4  [KSFG]      — mono monogram (logo-system moment)
 *   5  KEVIN       — settled display, final hold
 * ──────────────────────────────────────────────────────────────────────── */

type Treatment =
  | "display"
  | "condensed"
  | "tracked"
  | "compressed"
  | "monogram"
  | "settled";

type Beat = {
  label: string;
  treatment: Treatment;
  /** crop label shown in the corner alongside the beat number */
  tag: string;
};

const BEATS: Beat[] = [
  { label: "KEVIN", treatment: "display", tag: "I" },
  { label: "SEBASTIÁN", treatment: "condensed", tag: "II" },
  { label: "FRÍAS", treatment: "tracked", tag: "III" },
  { label: "GARCÍA", treatment: "compressed", tag: "IV" },
  { label: "KSFG", treatment: "monogram", tag: "V" },
  { label: "KEVIN", treatment: "settled", tag: "VI" },
];

const BEAT_MS = 760;
const FINAL_HOLD_S = 1.4;
const STORAGE_KEY = "intro:played";

export function CinematicIntro() {
  const prefersReducedMotion = useReducedMotion();
  // Start active so the overlay is present in the SSR'd HTML and covers
  // the hero before hydration completes. The effect below flips it off
  // when the intro has already played this session or motion is reduced.
  const [active, setActive] = useState(true);
  const [beat, setBeat] = useState(0);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const dismiss = useCallback(() => {
    tlRef.current?.kill();
    tlRef.current = null;
    setActive(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    const target = document.getElementById("main-content");
    (target ?? document.body).focus?.();
  }, []);

  useEffect(() => {
    let played = false;
    try {
      played = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {}
    if (played || prefersReducedMotion || window.innerWidth < 640) {
      if (window.innerWidth < 640) {
        try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
      }
      setActive(false);
      return;
    }

    // Lock scroll while the intro plays.
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = prevOverflow;
        dismiss();
      },
    });

    BEATS.forEach((_, i) => {
      tl.call(() => setBeat(i), undefined, i * (BEAT_MS / 1000));
    });
    // Hold the final beat slightly longer before dismissal.
    tl.to({}, { duration: FINAL_HOLD_S });

    tlRef.current = tl;

    return () => {
      tl.kill();
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [prefersReducedMotion, dismiss]);

  // Park focus on the overlay and handle keyboard interactions while active.
  useEffect(() => {
    if (!active) return;
    overlayRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, dismiss]);

  const current = BEATS[beat];

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="intro"
          ref={overlayRef}
          tabIndex={-1}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onClick={dismiss}
          role="presentation"
          className="fixed inset-0 z-9999 flex items-center justify-center bg-canvas text-foreground cursor-pointer select-none outline-none"
        >
          <CornerMarks beat={current.tag} total={BEATS.length} />

          <div className="relative flex h-full w-full items-center justify-center px-8">
            <AnimatePresence mode="wait">
              <BeatLayer key={beat} beat={current} />
            </AnimatePresence>
          </div>

          <SkipHint />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────────────────────── Beat renderer ───────────────────────── */

function BeatLayer({ beat }: { beat: Beat }) {
  switch (beat.treatment) {
    case "display":
      return <DisplayBeat label={beat.label} />;
    case "condensed":
      return <CondensedBeat label={beat.label} />;
    case "tracked":
      return <TrackedBeat label={beat.label} />;
    case "compressed":
      return <CompressedBeat label={beat.label} />;
    case "monogram":
      return <MonogramBeat label={beat.label} />;
    case "settled":
      return <SettledBeat label={beat.label} />;
  }
}

const HARD_CUT = { duration: 0.14, ease: [0.7, 0, 0.3, 1] as const };
const SOFT_CUT = { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const };

/** Beat 0 — KEVIN, display, scale punch on enter, scale-down on exit */
function DisplayBeat({ label }: { label: string }) {
  return (
    <motion.h2
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.04, opacity: 0 }}
      transition={HARD_CUT}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 200,
        fontSize: "clamp(4rem, 14vw, 12rem)",
        lineHeight: 0.9,
        letterSpacing: "-0.04em",
      }}
      className="text-foreground"
    >
      {label}
    </motion.h2>
  );
}

/** Beat 1 — SEBASTIÁN, ultra-condensed (scaleX clamp) */
function CondensedBeat({ label }: { label: string }) {
  return (
    <motion.h2
      initial={{ scaleX: 1, opacity: 0 }}
      animate={{ scaleX: 0.34, opacity: 1 }}
      exit={{ scaleX: 0.34, opacity: 0 }}
      transition={HARD_CUT}
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 900,
        fontSize: "clamp(5rem, 18vw, 16rem)",
        lineHeight: 0.85,
        letterSpacing: "-0.02em",
        transformOrigin: "center",
      }}
      className="text-foreground whitespace-nowrap"
    >
      {label}
    </motion.h2>
  );
}

/** Beat 2 — FRÍAS, wide tracking, light weight, sliced reveal */
function TrackedBeat({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(100% 0 0 0)" }}
      transition={SOFT_CUT}
      className="overflow-hidden"
    >
      <h2
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 200,
          fontSize: "clamp(2rem, 6vw, 5rem)",
          letterSpacing: "0.5em",
          paddingLeft: "0.5em", // optical compensation for trailing tracking
        }}
        className="text-foreground whitespace-nowrap"
      >
        {label}
      </h2>
    </motion.div>
  );
}

/** Beat 3 — GARCÍA, vertical compression + bold weight swap */
function CompressedBeat({ label }: { label: string }) {
  const letters = Array.from(label);
  return (
    <motion.h2
      initial={{ scaleY: 1.6, opacity: 0 }}
      animate={{ scaleY: 0.62, opacity: 1 }}
      exit={{ scaleY: 0.62, opacity: 0 }}
      transition={HARD_CUT}
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 900,
        fontSize: "clamp(6rem, 20vw, 18rem)",
        lineHeight: 1,
        letterSpacing: "-0.06em",
        transformOrigin: "center",
      }}
      className="text-foreground flex"
    >
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.18, delay: i * 0.018, ease: [0.7, 0, 0.3, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.h2>
  );
}

/** Beat 4 — [KSFG], small monogram framed by brackets — logo-system moment */
function MonogramBeat({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={HARD_CUT}
      className="flex items-center gap-4 text-foreground"
      style={{
        fontFamily: "var(--font-mono)",
        fontWeight: 500,
        fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
        letterSpacing: "0.35em",
      }}
    >
      <span aria-hidden className="opacity-60">
        [
      </span>
      <span>{label}</span>
      <span aria-hidden className="opacity-60">
        ]
      </span>
    </motion.div>
  );
}

/** Beat 5 — KEVIN, settled — soft fade, sits on screen before dismissal */
function SettledBeat({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={SOFT_CUT}
      className="flex flex-col items-center"
    >
      <span
        aria-hidden
        className="font-mono text-[10px] tracking-[0.5em] text-foreground/40 uppercase mb-14 sm:mb-16"
      >
        — portfolio —
      </span>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 200,
          fontSize: "clamp(4rem, 14vw, 12rem)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          paddingTop: "0.12em",
          paddingBottom: "0.12em",
        }}
        className="text-foreground"
      >
        {label}
      </h2>
      <span
        aria-hidden
        className="font-mono text-[10px] tracking-[0.4em] text-foreground/40 uppercase mt-14 sm:mt-16"
      >
        Kevin · Sebastián · Frías · García
      </span>
    </motion.div>
  );
}

/* ───────────────────────── Chrome ───────────────────────── */

function CornerMarks({ beat, total }: { beat: string; total: number }) {
  return (
    <>
      <span
        aria-hidden
        className="absolute top-8 left-8 font-mono text-[10px] tracking-[0.5em] text-foreground/40 uppercase"
      >
        Intro / {beat}
      </span>
      <span
        aria-hidden
        className="absolute top-8 right-8 font-mono text-[10px] tracking-[0.5em] text-foreground/40 uppercase"
      >
        00{total}
      </span>
      <span
        aria-hidden
        className="absolute bottom-8 left-8 font-mono text-[10px] tracking-[0.5em] text-foreground/40 uppercase"
      >
        2026
      </span>
    </>
  );
}

function SkipHint() {
  return (
    <span
      aria-hidden
      className="absolute bottom-8 right-8 font-mono text-[10px] tracking-[0.4em] text-foreground/40 uppercase"
    >
      Tap to skip
    </span>
  );
}
