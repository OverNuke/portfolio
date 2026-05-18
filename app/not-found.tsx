import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-canvas flex flex-col items-center justify-center px-6 text-center"
      tabIndex={-1}
    >
      <p className="font-mono text-[10px] tracking-[0.5em] text-foreground/40 uppercase mb-8">
        ERROR / 404
      </p>

      <h1
        className="text-foreground"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 200,
          fontSize: "clamp(5rem, 20vw, 14rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
        }}
      >
        404
      </h1>

      <p className="mt-10 font-mono text-sm text-muted tracking-wide max-w-xs">
        This page doesn&apos;t exist. Maybe it never did.
      </p>

      <Link
        href="/"
        className="mt-12 font-mono text-xs tracking-[0.3em] uppercase text-foreground border border-foreground/20 px-6 py-3 hover:border-foreground/60 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground"
      >
        ← Return home
      </Link>

      <p
        aria-hidden
        className="absolute bottom-8 left-8 font-mono text-[10px] tracking-[0.5em] text-foreground/40 uppercase"
      >
        2026
      </p>
    </main>
  );
}
