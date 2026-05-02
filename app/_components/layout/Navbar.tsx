'use client'

import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#certificates', label: 'Certs' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-canvas focus:font-mono focus:text-sm"
      >
        Skip to content
      </a>
      <header
        className={`fixed top-0 left-4 right-4 z-40 transition-all duration-300 ${
          scrolled || isOpen ? 'bg-canvas/95 backdrop-blur-sm border-b border-edge' : ''
        }`}
      >
        <nav
          className="max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
         

          <ul className="hidden sm:flex items-center gap-6" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="font-mono text-xs text-muted hover:text-foreground transition-colors uppercase tracking-wider"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="sm:hidden font-mono text-xs text-muted hover:text-foreground transition-colors uppercase tracking-wider"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </nav>

        {isOpen && (
          <div id="mobile-menu" className="sm:hidden border-t border-edge">
            <ul
              className="max-w-6xl mx-auto px-6 sm:px-8 py-6 flex flex-col gap-5"
              role="list"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-mono text-sm text-muted hover:text-foreground transition-colors uppercase tracking-wider"
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  )
}
