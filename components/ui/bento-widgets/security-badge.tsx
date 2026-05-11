"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Lock } from "lucide-react"

function SecurityBadge() {
  const [shields, setShields] = useState([
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setShields((prev) => {
        const nextIndex = prev.findIndex((s) => !s.active)
        if (nextIndex === -1) {
          return prev.map(() => ({ id: Math.random(), active: false }))
        }
        return prev.map((s, i) => (i === nextIndex ? { ...s, active: true } : s))
      })
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-full gap-2">
      {shields.map((shield) => (
        <motion.div
          key={shield.id}
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            shield.active ? "bg-foreground/20" : "bg-foreground/5"
          }`}
          animate={{ scale: shield.active ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Lock
            className={`w-5 h-5 ${shield.active ? "text-foreground" : "text-muted"}`}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default SecurityBadge
