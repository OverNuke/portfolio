import { useState, useRef, useEffect } from 'react'

interface ProjectPreviewHandlers {
  onMouseEnter: () => void
  onMouseLeave: () => void
  onFocus: () => void
  onBlur: () => void
}

interface UseProjectPreviewAnimationReturn {
  activeIdx: number | null
  previewRef: React.RefObject<HTMLDivElement | null>
  cardHandlers: (index: number) => ProjectPreviewHandlers
}

/**
 * Encapsulates the cursor-follow preview animation for the projects grid:
 * RAF-based cursor lerp, window mousemove tracking, and active-card state.
 *
 * Accessibility: respects `prefers-reduced-motion` — if reduced motion is
 * preferred, the lerp RAF loop is skipped and the preview snaps directly to
 * the cursor position on each mousemove.
 *
 * Keyboard: cardHandlers returns onFocus/onBlur in addition to
 * onMouseEnter/onMouseLeave so keyboard navigation triggers the same preview.
 *
 * @param projectCount number of project cards (bounds `activeIdx`)
 */
export function useProjectPreviewAnimation(
  projectCount: number,
): UseProjectPreviewAnimationReturn {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const previewRef = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  // RAF-based cursor lerp loop — writes transform directly to avoid re-renders
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!mq.matches) {
      const lerp = (a: number, b: number, f: number) => a + (b - a) * f
      const tick = () => {
        posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.15)
        posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.15)
        if (previewRef.current) {
          previewRef.current.style.transform = `translate3d(${posRef.current.x + 24}px, ${posRef.current.y - 120}px, 0)`
        }
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const onMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // Reduced motion was just enabled — cancel the running RAF loop
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = null
        }
      } else {
        // Reduced motion was just disabled — restart the RAF loop
        const lerp = (a: number, b: number, f: number) => a + (b - a) * f
        const tick = () => {
          posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.15)
          posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.15)
          if (previewRef.current) {
            previewRef.current.style.transform = `translate3d(${posRef.current.x + 24}px, ${posRef.current.y - 120}px, 0)`
          }
          rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    mq.addEventListener('change', onMotionChange)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      mq.removeEventListener('change', onMotionChange)
    }
  }, [])

  // Window mousemove — updates lerp target; snaps directly when reduced motion is preferred
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      // If reduced motion is active, snap directly (no lerp loop running)
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (previewRef.current) {
          previewRef.current.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 120}px, 0)`
        }
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const cardHandlers = (index: number): ProjectPreviewHandlers => {
    const isValid = index >= 0 && index < projectCount
    return {
      onMouseEnter: () => { if (isValid) setActiveIdx(index) },
      onMouseLeave: () => { if (isValid) setActiveIdx(null) },
      onFocus: () => { if (isValid) setActiveIdx(index) },
      onBlur: () => { if (isValid) setActiveIdx(null) },
    }
  }

  return { activeIdx, previewRef, cardHandlers }
}
