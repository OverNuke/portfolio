import type { Certificate, CertificateCategory } from "@/types";
import { PixelIcon, PixelRune } from "./PixelIcons";
import styles from "./certifications.module.css";

const CATEGORY_CLASS: Record<CertificateCategory, string> = {
  academic: styles.cardAcademic,
  language: styles.cardLanguage,
  honors: styles.cardHonors,
};

interface Props {
  cert: Certificate;
  index: number;
  total: number;
}

export function CertificationCard({ cert, index, total }: Props) {
  const idx = String(index + 1).padStart(3, "0");
  const totalStr = String(total).padStart(3, "0");
  const cardClass = [
    styles.card,
    CATEGORY_CLASS[cert.category],
    cert.hero && styles.cardHero,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={cert.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
      aria-label={`${cert.title}, issued by ${cert.issuer} in ${cert.date}. Opens in a new tab.`}
    >
      <span className={styles.foil} aria-hidden="true" />
      <span className={styles.runes} aria-hidden="true">
        <span>
          <PixelRune />
        </span>
        <span>
          <PixelRune />
        </span>
        <span>
          <PixelRune />
        </span>
        <span>
          <PixelRune />
        </span>
      </span>

      <div className={styles.strip}>
        <span className={styles.stripCat}>
          <span className={styles.stripDot} aria-hidden="true" />
          {cert.category}
        </span>
        <span className={styles.stripId}>
          N°{idx} / {totalStr}
        </span>
      </div>

      <div className={styles.art} aria-hidden="true">
        <div className={styles.seal}>
          <PixelIcon name={cert.icon} size={cert.hero ? 76 : 60} />
        </div>
      </div>

      <div className={styles.info}>
        <span className={styles.issuer}>{cert.issuer}</span>
        <h3 className={styles.cardTitle}>{cert.title}</h3>
        <span className={styles.year}>EARNED · {cert.date}</span>
      </div>
    </a>
  );
}
