'use client'

import { useEffect, useRef, useState } from 'react'
import type { Certificate, CertificateCategory } from '@/app/_lib/types'
import styles from './CertificateBento.module.css'

const catClass: Record<CertificateCategory, string> = {
  academic: styles.catAcademic,
  language: styles.catLanguage,
  honors: styles.catHonors,
}

const frameClass: Record<CertificateCategory, string> = {
  academic: styles.frameAcademic,
  language: styles.frameLanguage,
  honors: styles.frameHonors,
}

interface Props {
  certificates: Certificate[]
  /** Reserve a final "open slot" tile (multi-row growth hint). Default false. */
  showOpenSlot?: boolean
}

export function CertificateBento({ certificates, showOpenSlot = false }: Props) {
  const previewRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<Certificate | null>(null)

  // Cursor follower with lerp smoothing
  useEffect(() => {
    let raf = 0
    let mx = 0, my = 0, sx = 0, sy = 0
    const lerp = (a: number, b: number, f: number) => a + (b - a) * f

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const tick = () => {
      sx = lerp(sx, mx, 0.18); sy = lerp(sy, my, 0.18)
      if (previewRef.current) {
        previewRef.current.style.transform =
          `translate3d(${sx + 24}px, ${sy + 24}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove) }
  }, [])

  const find = (shape: Certificate['shape']) =>
    certificates.find((c) => c.shape === shape)

  const hero     = find('hero')
  const circle   = find('circle')
  const pill     = find('pill')
  const strip    = find('strip')
  const portrait = find('portrait')

  const commonProps = (c: Certificate) => ({
    href: c.href,
    target: '_blank' as const,
    rel: 'noopener noreferrer',
    onMouseEnter: () => setHovered(c),
    onMouseLeave: () => setHovered(null),
    onFocus: () => setHovered(c),
    onBlur: () => setHovered(null),
    'aria-label': `View certificate: ${c.title}`,
  })

  return (
    <>
      <div className={styles.bento}>
        {/* HERO */}
        {hero && (
          <a {...commonProps(hero)} className={`${styles.tile} ${styles.hero}`}>
            <div className={styles.heroBg} />
            <div className={styles.yearBig}>{hero.date}</div>
            <div className={styles.seal}>{hero.issuer}</div>
            <span className={`${styles.cat} ${catClass[hero.category]}`}>
              <i />{hero.category}
            </span>
            {hero.ext && <span className={styles.ftype}>{hero.ext}</span>}
            <div className={styles.meta}>
              <div className={styles.title}>{hero.title}</div>
              <div className={styles.issuer}>{hero.issuer} · {hero.date}</div>
            </div>
            <span className={styles.view}>View →</span>
          </a>
        )}

        {/* CIRCLE */}
        {circle && (
          <a {...commonProps(circle)} className={`${styles.tile} ${styles.circle}`}>
            <div className={styles.ring} />
            <span className={`${styles.cat} ${catClass[circle.category]}`} style={{ position: 'static', marginBottom: 14 }}>
              <i />{circle.category}
            </span>
            <div className={styles.titleCircle}>{circle.title}</div>
            <div className={styles.issuerCircle}>{circle.issuer} · {circle.date}</div>
            {circle.ext && <span className={styles.ftype}>{circle.ext}</span>}
          </a>
        )}

        {/* PILL */}
        {pill && (
          <a {...commonProps(pill)} className={`${styles.tile} ${styles.pill}`}>
            <span className={`${styles.cat} ${catClass[pill.category]}`}>
              <i />{pill.category}
            </span>
            <div className={styles.badgeNum}>{pill.issuer.slice(0,2).toUpperCase()}</div>
            <div className={styles.pillTitle}>{pill.title}</div>
            <div className={styles.pillIssuer}>{pill.issuer} · {pill.date}</div>
          </a>
        )}

        {/* STRIP */}
        {strip && (
          <a {...commonProps(strip)} className={`${styles.tile} ${styles.strip}`}>
            <div className={styles.bars} />
            <div className={styles.stripContent}>
              <div className={styles.stripMeta}>
                <span className={`${styles.cat} ${catClass[strip.category]}`}>
                  <i />{strip.category}
                </span>
                <span className={styles.stripTitle}>{strip.title}</span>
                <span className={styles.stripIssuer}>{strip.issuer} · {strip.date}</span>
              </div>
              <span className={styles.stripArrow}>→</span>
            </div>
          </a>
        )}

        {/* PORTRAIT */}
        {portrait && (
          <a {...commonProps(portrait)} className={`${styles.tile} ${styles.portrait}`}>
            <div className={styles.laurel} aria-hidden>
              <svg viewBox="0 0 200 200" fill="none">
                <g stroke="#C8B27A" strokeWidth="1" opacity="0.6">
                  <path d="M70 30 Q40 90 70 170" />
                  <path d="M68 50 Q40 50 30 70" />
                  <path d="M62 75 Q38 75 28 95" />
                  <path d="M62 100 Q38 100 28 120" />
                  <path d="M65 125 Q42 125 32 145" />
                  <path d="M70 150 Q50 155 45 170" />
                  <path d="M130 30 Q160 90 130 170" />
                  <path d="M132 50 Q160 50 170 70" />
                  <path d="M138 75 Q162 75 172 95" />
                  <path d="M138 100 Q162 100 172 120" />
                  <path d="M135 125 Q158 125 168 145" />
                  <path d="M130 150 Q150 155 155 170" />
                  <circle cx="100" cy="100" r="3" fill="#C8B27A" stroke="none" />
                </g>
              </svg>
            </div>
            <span className={`${styles.cat} ${catClass[portrait.category]}`}>
              <i />{portrait.category}
            </span>
            {portrait.ext && <span className={styles.ftype}>{portrait.ext}</span>}
            <div className={styles.stamp}>Cum Laude</div>
            <div className={styles.meta}>
              <div className={styles.title}>{portrait.title}</div>
              <div className={styles.issuer}>{portrait.issuer} · {portrait.date}</div>
            </div>
            <span className={styles.view}>View →</span>
          </a>
        )}

        {/* OPEN SLOT */}
        {showOpenSlot && (
          <div className={`${styles.tile} ${styles.wide}`} aria-hidden>
            <div className={styles.scrollLine} />
            <div className={styles.docIcon} />
            <span className={`${styles.cat} ${styles.catAcademic}`} style={{ opacity: 0.5 }}>
              <i />Slot
            </span>
            <div className={styles.meta}>
              <div className={styles.title} style={{ color: 'var(--color-muted)' }}>
                Open slot · future certificate
              </div>
              <div className={styles.issuer}>Grid is multi-row · grows as records are added</div>
            </div>
          </div>
        )}
      </div>

      {/* Cursor preview */}
      <div
        ref={previewRef}
        className={`${styles.cursorPreview} ${hovered ? styles.show : ''}`}
        aria-hidden
      >
        {hovered && (
          <div className={`${styles.frame} ${frameClass[hovered.category]}`}>
            <div>
              <div className={styles.frameLabel}>Preview</div>
              <div className={styles.frameTitle}>{hovered.title}</div>
              <div className={styles.frameExt}>
                {hovered.issuer}{hovered.ext ? ` · ${hovered.ext}` : ''}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
