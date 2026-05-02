import Image from 'next/image'
import { SOCIAL_LINKS } from '@/app/_lib/data'

export function Footer() {
  return (
    <footer className="border-t border-edge py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} Kevin S. Frías García
        </p>
        <ul className="flex items-center gap-4 pt-2 sm:pt-0" role="list" aria-label="Social links">
          {SOCIAL_LINKS.filter(l => l.icon).map(({ label, href, icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
              >
                <Image src={icon!} alt={label} width={20} height={20} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
