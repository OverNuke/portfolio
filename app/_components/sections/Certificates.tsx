import { CERTIFICATES } from '@/app/_lib/data'
import { SectionHeading } from '../ui/SectionHeading'
import { CertificateBento } from '../ui/CertificateBento'

export function Certificates() {
  return (
    <section id="certificates" className="py-32 px-6 bg-surface/50 backdrop-blur-xl ring-1 ring-edge/30 rounded-2xl" aria-labelledby="certs-heading">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionHeading label="// 03" id="certs-heading">
          Certificates
        </SectionHeading>
        <CertificateBento certificates={CERTIFICATES} />
      </div>
    </section>
  )
}
