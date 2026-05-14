"use client";

import { useState, useRef, useEffect } from "react";
import { Caveat } from "next/font/google";
import { PROJECTS } from "@/app/_lib/data";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "500"] });

type CardLayout = {
  colClass: string;
  transformClass: string;
  plaqueLabel: string;
  hasOuterBorder: boolean;
  hasInnerBorder: boolean;
};

const CARD_LAYOUTS: CardLayout[] = [
  {
    colClass: "xl:col-span-7",
    transformClass: "",
    plaqueLabel: "BARBERSHOP · BOOKING API",
    hasOuterBorder: false,
    hasInnerBorder: false,
  },
  {
    colClass: "xl:col-start-8 xl:col-span-5",
    transformClass: "xl:translate-y-12 xl:rotate-[0.6deg]",
    plaqueLabel: "ACOPIATECH · E-WASTE",
    hasOuterBorder: true,
    hasInnerBorder: false,
  },
  {
    colClass: "xl:col-span-5",
    transformClass: "xl:-translate-y-3",
    plaqueLabel: "ODOO · DOC WORKFLOW",
    hasOuterBorder: false,
    hasInnerBorder: false,
  },
  {
    colClass: "xl:col-start-6 xl:col-span-7",
    transformClass: "xl:translate-y-2 xl:-rotate-[0.5deg]",
    plaqueLabel: "THIS SITE · PORTFOLIO",
    hasOuterBorder: false,
    hasInnerBorder: true,
  },
];

export function ProjectsGrid() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // Direct DOM update for cursor lerp to avoid re-renders per frame
  useEffect(() => {
    const lerp = (a: number, b: number, f: number) => a + (b - a) * f;
    const tick = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.15);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.15);
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${posRef.current.x + 24}px, ${posRef.current.y - 120}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const projects = PROJECTS.slice(0, 4);

  return (
    <>
      <section
        id="projects"
        className="relative max-w-[1280px] mx-auto px-8 pt-24 pb-40"
        aria-labelledby="projects-heading"
      >
        {/* ── Section head row ──────────────────────── */}
        <div className="relative flex flex-wrap justify-between items-end gap-8 border-b border-dashed border-border pb-7 mb-16">
          <div>
            <h2
              id="projects-heading"
              className="font-sans font-semibold text-foreground leading-[0.92] tracking-[-0.035em]"
              style={{ fontSize: "clamp(56px, 7vw, 96px)" }}
            >
              Projects
              <span className="italic font-normal" style={{ color: "#b9b9b9" }}>
                .
              </span>
            </h2>
            <p className="font-mono text-xs tracking-[0.18em] uppercase text-muted mt-[18px]">
              04 pieces · 2023 — 2025 · ongoing
            </p>
          </div>

          <div
            className="font-mono text-[11px] text-muted text-right leading-[1.7] tracking-[0.08em]"
            aria-hidden="true"
          >
            <div>
              <span style={{ color: "#5a5a5a" }}>CURATED&nbsp;BY&nbsp;</span>
              <span className="text-foreground">K. FRIAS</span>
            </div>
            <div>
              <span style={{ color: "#5a5a5a" }}>MEDIUM&nbsp;</span>
              <span className="text-foreground">CODE / SYSTEMS</span>
            </div>
            <div>
              <span style={{ color: "#5a5a5a" }}>HOVER&nbsp;</span>
              <span className="text-foreground">→ PREVIEW</span>
            </div>
            <div>
              <span style={{ color: "#5a5a5a" }}>CLICK&nbsp;</span>
              <span className="text-foreground">→ CASE&nbsp;STUDY</span>
            </div>
          </div>

          {/* Handwritten margin note */}
          <span
            className={`${caveat.className} hidden xl:block absolute text-[22px] leading-[1.1] pointer-events-none opacity-85 -rotate-[4deg]`}
            style={{ color: "#c9b46b", top: "-8px", left: "38%" }}
            aria-hidden="true"
          >
            selected, not all
          </span>

          {/* Curved arrow */}
          <svg
            className="hidden xl:block absolute"
            style={{ top: "10px", left: "56%", width: "90px", height: "36px" }}
            viewBox="0 0 90 36"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 26 C 20 6, 50 6, 78 16"
              stroke="#c9b46b"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M70 10 L 80 16 L 72 22"
              stroke="#c9b46b"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
          </svg>
        </div>

        {/* ── Hand-drawn scribble annotations ───────── */}
        <div
          className="hidden xl:block absolute inset-0 pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          {/* Dashed circle around the break-out card (c2) */}
          <svg
            className="absolute"
            style={{
              top: "380px",
              right: "-10px",
              width: "360px",
              height: "380px",
            }}
            viewBox="0 0 360 380"
            fill="none"
          >
            <path
              d="M340 30 C 360 200, 280 360, 60 350 C -20 320, 10 80, 200 20 C 290 -5, 345 20, 340 30 Z"
              stroke="#c9b46b"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="2 4"
              fill="none"
              opacity="0.55"
            />
          </svg>

          {/* Arrow pointing toward card 3 */}
          <svg
            className="absolute"
            style={{
              top: "760px",
              left: "-30px",
              width: "240px",
              height: "90px",
            }}
            viewBox="0 0 240 90"
            fill="none"
          >
            <path
              d="M10 70 C 60 30, 140 20, 220 40"
              stroke="#c9b46b"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M210 30 L 224 40 L 212 52"
              stroke="#c9b46b"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
          </svg>
        </div>

        {/* Margin notes */}
        <span
          className={`${caveat.className} hidden xl:block absolute text-[22px] leading-[1.1] pointer-events-none opacity-85 rotate-[3deg] w-[160px]`}
          style={{ color: "#c9b46b", top: "720px", left: "-8px" }}
          aria-hidden="true"
        >
          favorite —<br />
          backend felt clean
        </span>
        <span
          className={`${caveat.className} hidden xl:block absolute text-[22px] leading-[1.1] pointer-events-none opacity-85 -rotate-[4deg] text-right w-[180px]`}
          style={{ color: "#c9b46b", top: "470px", right: "-10px" }}
          aria-hidden="true"
        >
          break-out card
          <br />
          (on purpose ↘)
        </span>

        {/* ── 12-col project grid ───────────────────── */}
        <div className="relative z-10 grid xl:grid-cols-12 gap-5 xl:gap-x-6 xl:gap-y-7">
          {projects.map((project, i) => {
            const layout = CARD_LAYOUTS[i];
            if (!layout) return null;

            return (
              <div
                key={project.title}
                className={`col-span-full ${layout.colClass} ${layout.transformClass} relative`}
              >
                {/* Card body — native anchor for full keyboard + semantic link support */}
                <a
                  href={project.href}
                  aria-label={`Open ${project.title} case study`}
                  className="relative flex flex-col min-h-[340px] border border-[#1d2645] no-underline text-inherit transition-[border-color,background-color] duration-250"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(18,24,46,0.55) 0%, rgba(11,11,11,0.6) 100%)",
                    padding: "28px 28px 24px",
                    transition:
                      "border-color .25s ease, background-color .25s ease, transform .35s cubic-bezier(.2,.7,.2,1)",
                    display: "flex",
                  }}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                >
                  {/* Paper-edge double border on c2 (break-out) */}
                  {layout.hasOuterBorder && (
                    <div
                      className="hidden xl:block absolute pointer-events-none border border-[#14192e]"
                      style={{ inset: "-6px" }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Inner dashed inset border on c4 */}
                  {layout.hasInnerBorder && (
                    <div
                      className="absolute inset-1 border border-dashed pointer-events-none"
                      style={{ borderColor: "rgba(228,228,228,0.06)" }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Museum plaque header */}
                  <div className="flex justify-between items-start gap-4 mb-[22px] pb-4 border-b border-[#1d2645]">
                    <div className="font-mono text-[11px] text-muted tracking-[0.16em] leading-[1.7]">
                      <div>
                        <span className="text-foreground font-medium">
                          Nº {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div>{layout.plaqueLabel}</div>
                    </div>
                    <div
                      className="font-mono text-[10.5px] text-right leading-[1.7] tracking-[0.1em]"
                      style={{ color: "#5a5a5a" }}
                    >
                      {project.year ?? "—"}
                      <br />
                      {project.medium ?? "—"}
                    </div>
                  </div>

                  {/* Project title */}
                  <h3
                    className="font-sans font-medium text-foreground leading-[1.02] tracking-[-0.024em] mb-[14px] transition-[letter-spacing] duration-250"
                    style={{ fontSize: "clamp(28px, 2.6vw, 38px)" }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="font-mono text-[12.5px] leading-[1.6] text-muted max-w-[46ch] mb-auto pb-6">
                    {project.description}
                  </p>

                  {/* Footer: tags row (github link moved outside as sibling) */}
                  <div className="flex justify-between items-end gap-4 border-t border-dashed border-[#1d2645] pt-4">
                    <ul
                      className="flex flex-wrap gap-[6px] list-none"
                      style={{ maxWidth: "70%" }}
                    >
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="font-mono text-[10.5px] tracking-[0.06em] text-muted px-2 py-1 border border-[#1d2645] lowercase leading-none"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    {/* Spacer so footer row keeps its layout even without github link */}
                    <span aria-hidden="true" />
                  </div>
                </a>

                {/* GitHub link — sibling to card anchor to avoid nested <a> */}
                {project.repo && project.repo !== "#" && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} on GitHub`}
                    className="absolute bottom-[28px] right-[28px] font-mono text-[11px] text-muted no-underline tracking-[0.08em] border-b border-transparent whitespace-nowrap pb-0.5 transition-[color,border-color] duration-200 hover:text-foreground hover:border-foreground z-10"
                    style={{ lineHeight: "1" }}
                  >
                    <span style={{ color: "#5a5a5a", marginRight: "6px" }}>
                      [ ]
                    </span>
                    github&nbsp;→
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Floating cursor-follow preview ──────────── */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 w-[320px] h-[200px] rounded-[14px] overflow-hidden z-[80] will-change-transform"
        style={{
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(228,228,228,0.06)",
          background: "#12182E",
          opacity: activeIdx !== null ? 1 : 0,
          scale: activeIdx !== null ? "1" : "0.8",
          transition:
            "opacity 0.3s cubic-bezier(0.4,0,0.2,1), scale 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
        aria-hidden="true"
      >
        <div className="relative w-full h-full">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="absolute inset-0 w-full h-full"
              style={{
                background: "#12182E",
                backgroundImage: project.image
                  ? `url(${project.image})`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: activeIdx === i ? 1 : 0,
                filter: activeIdx === i ? "none" : "blur(10px)",
                transform: activeIdx === i ? "scale(1)" : "scale(1.1)",
                transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {!project.image && (
                <PreviewPlaceholder index={i} title={project.title} />
              )}
            </div>
          ))}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(180deg, transparent 55%, rgba(11,11,11,0.7) 100%)",
            }}
          />

          {/* Project name label */}
          <div
            className="absolute left-3 bottom-2.5 font-mono text-[10.5px] tracking-[0.1em] uppercase z-[2]"
            style={{
              color: "rgba(228,228,228,0.85)",
              textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            }}
          >
            {activeIdx !== null
              ? projects[activeIdx]?.title.toUpperCase()
              : "— hover —"}
          </div>
        </div>
      </div>
    </>
  );
}

// SVG-patterned placeholder shown when project.image is absent
function PreviewPlaceholder({
  index,
  title,
}: {
  index: number;
  title: string;
}) {
  const patterns: Array<{
    type: "lines" | "dots";
    angle?: number;
    size: string;
  }> = [
    { type: "lines", angle: 35, size: "10px 10px" },
    { type: "lines", angle: -35, size: "10px 10px" },
    { type: "dots", size: "12px 12px" },
    { type: "lines", angle: 45, size: "14px 14px" },
  ];
  const pat = patterns[index % patterns.length];

  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            pat.type === "dots"
              ? "radial-gradient(circle, #2B396D 1.4px, transparent 1.4px)"
              : `repeating-linear-gradient(${pat.angle}deg, #2B396D 0px, #2B396D 4px, transparent 4px, transparent 10px)`,
          backgroundSize: pat.size,
          opacity: 0.7,
        }}
      />
      <span className="relative font-mono text-[10px] tracking-[0.2em] uppercase text-center px-4 text-foreground/60">
        {title}
      </span>
    </div>
  );
}
