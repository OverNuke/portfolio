import styles from "./certifications.module.css";

interface Props {
  headingId: string;
}

export function CertificationsHeader({ headingId }: Props) {
  return (
    <header className={styles.head}>
      <div>
        <h2 id={headingId} className={styles.title}>
          Certifi<span className={styles.titleAccent}>cations</span>
        </h2>
      </div>

      <div className={styles.rhs}>
        <ul className={styles.legend} aria-label="Category legend">
          <li>
            <i
              className={`${styles.swatch} ${styles.swatchHonors}`}
              aria-hidden="true"
            />
            Honors
          </li>
          <li>
            <i
              className={`${styles.swatch} ${styles.swatchAcademic}`}
              aria-hidden="true"
            />
            Academic
          </li>
          <li>
            <i
              className={`${styles.swatch} ${styles.swatchLanguage}`}
              aria-hidden="true"
            />
            Language
          </li>
        </ul>
      </div>
    </header>
  );
}
