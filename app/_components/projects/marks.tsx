import type { ReactElement } from "react";
import type { ProjectCategory } from "@/lib/projects";

const wrapper = {
  viewBox: "0 0 64 64",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
};

const MARKS: Record<ProjectCategory, ReactElement> = {
  Backend: (
    <svg {...wrapper}>
      <circle cx="14" cy="46" r="7" />
      <circle cx="50" cy="46" r="7" />
      <path d="M20 41L54 8M44 41L10 8M32 28v8" />
    </svg>
  ),
  Mobile: (
    <svg {...wrapper}>
      <path d="M32 8a12 12 0 00-12 12c0 9 12 24 12 24s12-15 12-24a12 12 0 00-12-12z" />
      <circle cx="32" cy="20" r="4" />
    </svg>
  ),
  Module: (
    <svg {...wrapper}>
      <rect x="10" y="14" width="44" height="36" />
      <path d="M10 22h44M18 30h28M18 36h20M18 42h24" />
    </svg>
  ),
  Frontend: (
    <svg {...wrapper}>
      <path d="M8 12h48v40H8zM8 20h48M14 16h2M20 16h2M26 16h2M16 32l-4 4 4 4M48 32l4 4-4 4M30 28l4 16" />
    </svg>
  ),
  Project: (
    <svg {...wrapper}>
      <rect x="12" y="12" width="40" height="40" />
      <path d="M22 22h20v20H22zM12 32h10M42 32h10M32 12v10M32 42v10" />
    </svg>
  ),
};

export function ProjectMark({ category }: { category: ProjectCategory }) {
  return MARKS[category];
}
