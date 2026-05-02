import { CERTIFICATES } from '@/app/_lib/data'
import { SectionHeading } from '../ui/SectionHeading'

export function Certificates() {
  return (
    <section id="certificates" className="py-24" aria-labelledby="certs-heading">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionHeading label="// 03" id="certs-heading">
          Certificates
        </SectionHeading>
        <ul className="space-y-4" role="list" aria-label="Certificate list">
          {CERTIFICATES.map((cert) => (
            <li
              key={`${cert.title}-${cert.date}`}
              className="border border-edge p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-accent/50 transition-colors"
            >
              <div>
                <h3 className="font-sans font-medium text-foreground">{cert.title}</h3>
                <p className="font-mono text-xs text-muted mt-1">
                  {cert.issuer} · {cert.date}
                </p>
              </div>
              {cert.href && cert.href !== '#' && (
                <a
                  href={cert.href}
                  className="font-mono text-xs text-foreground hover:text-foreground/70 transition-colors shrink-0"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View certificate: ${cert.title}`}
                >
                  View →
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
