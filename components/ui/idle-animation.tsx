"use client";

import { motion, AnimatePresence } from "motion/react";
import { useIdlePhase, type IdlePhase } from "@/hooks/isIdle";

const GIFS: Partial<Record<IdlePhase, string>> = {
  idle: "/SonicIDLE.gif",
  waking: "/SonicIDLE3.gif",
};

const IdleAnimation = () => {
  const phase = useIdlePhase(30000, 2500);
  const src = GIFS[phase];

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          key={phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <img
            src={src}
            alt="Character Idle"
            width={150}
            style={{ imageRendering: "pixelated", width: 150, height: "auto" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IdleAnimation;
