"use client";

import { useEffect } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error — Something went wrong",
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="min-h-screen bg-canvas flex flex-col items-center justify-center px-6 text-center"
      tabIndex={-1}
    >
      <p className="font-mono text-[10px] tracking-[0.5em] text-foreground/40 uppercase mb-8">
        SYSTEM / ERROR
      </p>

      <h1
        className="text-foreground"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 200,
          fontSize: "clamp(3rem, 12vw, 9rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
        }}
      >
        CRASH
      </h1>

      <p className="mt-10 font-mono text-sm text-muted tracking-wide max-w-xs">
        Something broke on our end. Try again or go back home.
      </p>

      <div className="mt-12 flex gap-6">
        <button
          onClick={reset}
          className="font-mono text-xs tracking-[0.3em] uppercase text-foreground border border-foreground/20 px-6 py-3 hover:border-foreground/60 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground"
        >
          Try again
        </button>
        <a
          href="/"
          className="font-mono text-xs tracking-[0.3em] uppercase text-muted border border-foreground/10 px-6 py-3 hover:border-foreground/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground"
        >
          ← Home
        </a>
      </div>

      <p
        aria-hidden
        className="absolute bottom-8 left-8 font-mono text-[10px] tracking-[0.5em] text-foreground/40 uppercase"
      >
        2026
      </p>
    </main>
  );
}
