'use client'

import { gsap } from 'gsap'
import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import styles from './BubbleMenu.module.css'

type MenuItem = {
  label: string
  href: string
  ariaLabel?: string
  rotation?: number
  hoverStyles?: {
    bgColor?: string
    textColor?: string
  }
}

export type BubbleMenuProps = {
  logo: ReactNode | string
  onMenuClick?: (open: boolean) => void
  className?: string
  style?: CSSProperties
  menuAriaLabel?: string
  menuBg?: string
  menuContentColor?: string
  useFixedPosition?: boolean
  items?: MenuItem[]
  animationEase?: string
  animationDuration?: number
  staggerDelay?: number
}

const DEFAULT_ITEMS: MenuItem[] = [
  { label: 'about', href: '#about', ariaLabel: 'About me', rotation: -8, hoverStyles: { bgColor: '#2B396D', textColor: '#E4E4E4' } },
  { label: 'projects', href: '#projects', ariaLabel: 'Projects', rotation: 8, hoverStyles: { bgColor: '#2B396D', textColor: '#E4E4E4' } },
  { label: 'certificates', href: '#certificates', ariaLabel: 'Certificates', rotation: -5, hoverStyles: { bgColor: '#2B396D', textColor: '#E4E4E4' } },
  { label: 'skills', href: '#skills', ariaLabel: 'Skills', rotation: 8, hoverStyles: { bgColor: '#2B396D', textColor: '#E4E4E4' } },
  { label: 'contact', href: '#contact', ariaLabel: 'Contact', rotation: -8, hoverStyles: { bgColor: '#2B396D', textColor: '#E4E4E4' } },
]

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = 'Toggle menu',
  menuBg = '#12182E',
  menuContentColor = '#E4E4E4',
  useFixedPosition = true,
  items,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12,
}: BubbleMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  const overlayRef = useRef<HTMLDivElement>(null)
  const bubblesRef = useRef<HTMLAnchorElement[]>([])
  const labelRefs = useRef<HTMLSpanElement[]>([])
  const toggleButtonRef = useRef<HTMLButtonElement>(null)

  const menuItems = items?.length ? items : DEFAULT_ITEMS

  const containerCls = [
    useFixedPosition ? 'fixed' : 'absolute',
    'left-4 right-4 top-8',
    'px-5 sm:px-6 md:px-8',
    'pointer-events-none',
    'z-[1001]',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handleToggle = () => {
    const next = !isMenuOpen
    if (next) setShowOverlay(true)
    setIsMenuOpen(next)
    onMenuClick?.(next)
  }

  const handleClose = () => {
    setIsMenuOpen(false)
    onMenuClick?.(false)
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose()
  }

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
        toggleButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  useEffect(() => {
    const overlay = overlayRef.current
    const bubbles = bubblesRef.current.filter(Boolean)
    const labels = labelRefs.current.filter(Boolean)
    if (!overlay || !bubbles.length) return

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' })
      gsap.killTweensOf([...bubbles, ...labels])
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' })
      gsap.set(labels, { y: 24, autoAlpha: 0 })

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05)
        const tl = gsap.timeline({ delay })
        tl.to(bubble, { scale: 1, duration: animationDuration, ease: animationEase })
        if (labels[i]) {
          tl.to(labels[i], { y: 0, autoAlpha: 1, duration: animationDuration, ease: 'power3.out' }, `-=${animationDuration * 0.9}`)
        }
      })
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels])
      gsap.to(labels, { y: 24, autoAlpha: 0, duration: 0.2, ease: 'power3.in' })
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' })
          setShowOverlay(false)
        },
      })
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay])

  useEffect(() => {
    const handleResize = () => {
      if (!isMenuOpen) return
      const bubbles = bubblesRef.current.filter(Boolean)
      const isDesktop = window.innerWidth >= 900
      bubbles.forEach((bubble, i) => {
        const item = menuItems[i]
        if (bubble && item) {
          gsap.set(bubble, { rotation: isDesktop ? (item.rotation ?? 0) : 0 })
        }
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen, menuItems])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1002] focus:px-4 focus:py-2 focus:bg-accent focus:text-canvas focus:font-mono focus:text-sm"
      >
        Skip to content
      </a>

      <nav className={containerCls} style={style} aria-label="Main navigation">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.3)] pointer-events-auto h-12 md:h-14 pl-6 pr-5 sm:pl-7 sm:pr-6 md:pl-10 md:pr-9 will-change-transform no-underline"
            aria-label="Back to top"
            style={{ background: menuBg, minHeight: '48px', borderRadius: '9999px' }}
          >
            <span className="inline-flex items-center justify-center w-[128px] md:w-[136px] h-full">
              {typeof logo === 'string' ? (
                <img src={logo} alt="Logo" className="max-h-[60%] max-w-full object-contain block" />
              ) : (
                logo
              )}
            </span>
          </a>

          <button
            ref={toggleButtonRef}
            type="button"
            className="inline-flex flex-col items-center justify-center rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.3)] pointer-events-auto w-12 h-12 md:w-14 md:h-14 border-0 cursor-pointer p-0 will-change-transform"
            onClick={handleToggle}
            aria-label={menuAriaLabel}
            aria-expanded={isMenuOpen}
            aria-controls="bubble-overlay"
            style={{ background: menuBg }}
          >
            <span
              className={styles.menuLine}
              style={{
                width: 26,
                height: 2,
                background: menuContentColor,
                transform: isMenuOpen ? 'translateY(4px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className={styles.menuLine}
              style={{
                marginTop: '6px',
                width: 26,
                height: 2,
                background: menuContentColor,
                transform: isMenuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {showOverlay && (
        <div
          id="bubble-overlay"
          ref={overlayRef}
          className={`${useFixedPosition ? 'fixed' : 'absolute'} inset-0 flex items-center justify-center pointer-events-auto z-[1000] ${styles.overlay}`}
          aria-hidden={!isMenuOpen}
          onClick={handleBackdropClick}
        >
          <ul
            className={`list-none m-0 px-6 w-full max-w-[1600px] mx-auto flex flex-wrap gap-x-0 gap-y-1 pointer-events-auto ${styles.pillList}`}
            role="menu"
            aria-label="Navigation links"
          >
            {menuItems.map((item, idx) => (
              <li
                key={item.label}
                role="none"
                className={`flex justify-center items-stretch [flex:0_0_calc(100%/3)] box-border ${styles.pillCol}`}
              >
                <a
                  role="menuitem"
                  href={item.href}
                  aria-label={item.ariaLabel ?? item.label}
                  className={`w-full rounded-[999px] no-underline shadow-[0_4px_14px_rgba(0,0,0,0.25)] flex items-center justify-center relative box-border whitespace-nowrap overflow-hidden ${styles.pillLink}`}
                  style={
                    {
                      '--item-rot': `${item.rotation ?? 0}deg`,
                      '--hover-bg': item.hoverStyles?.bgColor ?? '#f3f4f6',
                      '--hover-color': item.hoverStyles?.textColor ?? menuContentColor,
                      background: menuBg,
                      color: menuContentColor,
                      minHeight: 'var(--pill-min-h, 160px)',
                      padding: 'clamp(1.5rem, 3vw, 8rem) 0',
                      fontSize: 'clamp(1.5rem, 4vw, 4rem)',
                      fontWeight: 600,
                      lineHeight: 0,
                      willChange: 'transform',
                      height: 10,
                    } as CSSProperties
                  }
                  ref={(el) => {
                    if (el) bubblesRef.current[idx] = el
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span
                    className="inline-block"
                    style={{ willChange: 'transform, opacity', height: '1.2em', lineHeight: 1.2 }}
                    ref={(el) => {
                      if (el) labelRefs.current[idx] = el
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
