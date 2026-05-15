import { CERTIFICATES } from '@/lib/data'
import { SectionHeading } from '../ui/SectionHeading'
import { CertificateBento } from '../ui/CertificateBento'

export function Certificates() {
  return (
    <section id="certificates" className="py-section-sm md:py-section" aria-labelledby="certs-heading">
      <div className="container-content">
        <SectionHeading id="certs-heading">
          Certificates
        </SectionHeading>
        <CertificateBento certificates={CERTIFICATES} />
      </div>
    </section>
  )
}
