"use client"

import { motion } from "motion/react"
import { Globe } from "lucide-react"
import type { Certificate } from "@/types"
import TypeTester from "./bento-widgets/type-tester"
import LayoutAnimation from "./bento-widgets/layout-animation"
import GlobalNetwork from "./bento-widgets/global-network"
import SpeedIndicator from "./bento-widgets/speed-indicator"
import SecurityBadge from "./bento-widgets/security-badge"

export interface CertificatesBentoProps {
  certs: Certificate[]
}

const WIDGETS = [TypeTester, LayoutAnimation, GlobalNetwork, SpeedIndicator, SecurityBadge]

const GRID_SPANS = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-2",
  "md:col-span-2 md:row-span-2",
  "md:col-span-2",
  "md:col-span-3",
]

export function CertificatesBento({ certs }: CertificatesBentoProps) {
  const cells = certs.slice(0, 5)

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]">
      {cells.map((cert, i) => {
        const WidgetComponent = WIDGETS[i]
        const spanClass = GRID_SPANS[i]

        return (
          <motion.a
            key={cert.title}
            href={cert.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${cert.title} certificate`}
            className={`group flex flex-col bg-card border border-edge rounded-xl p-8 overflow-hidden no-underline text-foreground hover:border-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas)] ${spanClass}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex-1">
              <WidgetComponent />
            </div>
            <div className="mt-4">
              <h3 className="font-mono text-xl text-foreground font-medium flex items-center gap-2">
                {i === 2 && <Globe className="w-5 h-5 shrink-0" />}
                {cert.title}
              </h3>
              <p className="text-muted text-sm mt-1">{cert.issuer}</p>
              <p className="font-mono text-muted text-xs mt-1">{cert.date}</p>
            </div>
          </motion.a>
        )
      })}

      {/* Cell 6: empty placeholder — Fill later */}
      <div
        className="hidden md:flex md:col-span-3 bg-card border border-edge rounded-xl p-8"
        aria-hidden="true"
      />
    </div>
  )
}
