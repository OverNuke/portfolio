import { CERTIFICATES } from '@/app/_lib/data'
import { SectionHeading } from '../ui/SectionHeading'
import { CertificateBento } from '../ui/CertificateBento'

export function Certificates() {
  return (
    <section id="certificates" className="py-section-sm md:py-section px-gutter" aria-labelledby="certs-heading">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionHeading id="certs-heading">
          Certificates
        </SectionHeading>
        <CertificateBento certificates={CERTIFICATES} />
      </div>
    </section>
  )
}
