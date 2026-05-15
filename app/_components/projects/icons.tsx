import type { SVGProps } from "react";

const baseIcon: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
  "aria-hidden": true,
};

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIcon} {...props}>
      <path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.6c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.3 5.5-6.2 0-1.3-.5-2.4-1.3-3.2.1-.3.5-1.5-.1-3.1 0 0-1.1-.3-3.5 1.3a12 12 0 00-6.2 0C6.5 2.1 5.4 2.4 5.4 2.4c-.6 1.6-.2 2.8-.1 3.1A4.6 4.6 0 004 8.7c0 4.9 2.7 5.9 5.5 6.2-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIcon} {...props}>
      <path d="M5 12h14m-6-6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIcon} {...props}>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}
