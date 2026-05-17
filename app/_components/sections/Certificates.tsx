import { CERTIFICATES } from "@/lib/data";
import { CertificationCard } from "../ui/certifications/CertificationCard";
import { CertificationsFooter } from "../ui/certifications/CertificationsFooter";
import { CertificationsHeader } from "../ui/certifications/CertificationsHeader";
import styles from "../ui/certifications/certifications.module.css";

const HEADING_ID = "certs-heading";

export function Certificates() {
  const total = CERTIFICATES.length;
  const years = CERTIFICATES.map((c) => Number.parseInt(c.date, 10)).filter(
    (n) => Number.isFinite(n),
  );
  const yearFrom = String(Math.min(...years));
  const yearTo = String(Math.max(...years));

  return (
    <section
      id="certificates"
      className={`${styles.root} py-section-sm md:py-section`}
      aria-labelledby={HEADING_ID}
    >
      <CertificationsHeader headingId={HEADING_ID} />

      <ul className={styles.grid} aria-label="Certificate cards">
        {CERTIFICATES.map((cert, i) => (
          <li key={cert.id}>
            <CertificationCard cert={cert} index={i} total={total} />
          </li>
        ))}
      </ul>
    </section>
  );
}
