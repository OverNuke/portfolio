import { Fragment } from "react";
import styles from "./projects.module.css";

interface ProjectsMarqueeProps {
  items: readonly string[];
}

/** Infinite scrolling tape strip. The track is duplicated once so the
 *  -50% translate seam loops invisibly. Pure CSS — pauses under
 *  prefers-reduced-motion via the module stylesheet. */
export function ProjectsMarquee({ items }: ProjectsMarqueeProps) {
  return (
    <div
      className={`${styles.marqueeStrip} border-y border-edge py-3.5 mt-6 mb-14`}
      aria-hidden="true"
    >
      <div className={styles.marqueeTrack}>
        {[0, 1].map((loop) => (
          <Fragment key={loop}>
            {items.map((item, i) => (
              <span
                key={`${loop}-${i}`}
                className="inline-block px-8 align-middle font-mono text-xs uppercase tracking-[0.32em] text-foreground"
              >
                {item}
              </span>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
