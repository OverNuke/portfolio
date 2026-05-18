"use client";

import LogoLoop from "../ui/LogoLoop";
import styles from "./skills.module.css";
import {
  ALT_TAPE_LOGOS,
  PRIMARY_TAPE_ITEMS,
  TAPE_FOOT_STATS,
  TAPE_META,
} from "./skills-data";

const loopedItems = [...PRIMARY_TAPE_ITEMS, ...PRIMARY_TAPE_ITEMS];

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <ul className="sr-only">
        {PRIMARY_TAPE_ITEMS.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>

      <header className="flex items-end justify-between gap-8 pb-10 pt-8">
        <div>
          <div
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--color-muted)]"
            aria-hidden="true"
          >
            <span className="inline-block h-px w-6 bg-[var(--color-foreground)]" />
            Live · Roster
          </div>
          <h2
            id="skills-heading"
            className="mt-3 font-display text-[clamp(2rem,4.6vw,3.5rem)] font-bold leading-none tracking-[-0.02em] text-[var(--color-foreground)]"
          >
            Skills
          </h2>
        </div>
        <div
          className="text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-[var(--color-muted)]"
          aria-hidden="true"
        >
          Auto-scroll{" "}
          <span className="text-[var(--color-foreground)]">{TAPE_META.bpm}s</span>
          <br />
          Pause on{" "}
          <span className="text-[var(--color-foreground)]">hover</span>
        </div>
      </header>

      <div className={styles.tapeFrame}>
        <div className={styles.tapeStrip} aria-hidden="true">
          <span
            className={`${styles.tapeStripLive} font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-foreground)]`}
          >
            Now Playing
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
            {TAPE_META.track}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
            BPM{" "}
            <span className="text-[var(--color-foreground)]">{TAPE_META.bpm}</span>
          </span>
        </div>

        <div className={styles.tapePrimary} aria-hidden="true">
          {loopedItems.map((item, i) => (
            <span key={`${item.name}-${i}`} className="contents">
              <span
                className={`${styles.tapeItem} font-mono text-[13px] uppercase tracking-[0.22em] text-[var(--color-foreground)]`}
              >
                <span className={styles.tapeItemCat}>{item.cat}</span>
                {item.name}
              </span>
              <span
                className={`${styles.tapeSep} font-mono text-[14px] text-[var(--color-surface-raised)]`}
              >
                +
              </span>
              {i === PRIMARY_TAPE_ITEMS.length - 1 && (
                <span className={styles.tapeCursor} />
              )}
            </span>
          ))}
        </div>

        <div className={styles.tapeAlt} aria-hidden="true">
          <LogoLoop
            logos={ALT_TAPE_LOGOS}
            speed={40}
            direction="left"
            logoHeight={48}
            gap={40}
            pauseOnHover
            ariaLabel="Technology skill logos"
          />
        </div>

        <div className={styles.tapeFoot} aria-hidden="true">
          {TAPE_FOOT_STATS.map((stat) => (
            <div key={stat.label} className={styles.tapeFootCell}>
              <span className={`${styles.tapeFootKey} font-mono`}>
                {stat.label}
              </span>
              <span className={`${styles.tapeFootValue} font-display`}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
