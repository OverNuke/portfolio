"use client";

import dynamic from "next/dynamic";

const CinematicIntro = dynamic(
  () => import("../ui/CinematicIntro").then((m) => ({ default: m.CinematicIntro })),
  { ssr: false }
);

const DotFieldBackground = dynamic(
  () => import("./DotFieldBackground").then((m) => ({ default: m.DotFieldBackground })),
  { ssr: false }
);

const IdleAnimation = dynamic(
  () => import("@/components/ui/idle-animation"),
  { ssr: false }
);

export function ClientAnimations() {
  return (
    <>
      <CinematicIntro />
      <DotFieldBackground />
      <IdleAnimation />
    </>
  );
}
