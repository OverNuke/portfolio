// Default icon paths used by Marks 07-12 when no `icon` prop is supplied.
// All consumers can pass their own <svg> — the CSS module styles any SVG
// nested in an .rb button with the 1.5-stroke white treatment.

import type { ReactNode } from "react";

function path(d: string): ReactNode {
  return (
    <svg viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

export const RetroIcons = {
  download: () => path("M12 3v12m0 0l-5-5m5 5l5-5M4 21h16"),
  arrowRight: () => path("M5 12h14m-6-6l6 6-6 6"),
  arrowUpRight: () => path("M7 17L17 7M9 7h8v8"),
  paperPlane: () => path("M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"),
  check: () => path("M20 6L9 17l-5-5"),
  chevrons: () => path("M9 18l-6-6 6-6m6 12l6-6-6-6"),
  envelope: () => path("M3 7h18v12H3zM3 7l9 7 9-7"),
};
