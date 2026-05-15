import styles from './certifications.module.css'

interface Props {
  total: number
  collected: number
  yearFrom: string
  yearTo: string
  headingId: string
}

export function CertificationsHeader({
  total,
  collected,
  yearFrom,
  yearTo,
  headingId,
}: Props) {
  return (
    <header className={styles.head}>
      <div>
        <p className={styles.eyebrow}>SECTION 04 · INVENTORY</p>
        <h2 id={headingId} className={styles.title}>
          Certifi<span className={styles.titleAccent}>cations</span>
        </h2>
        <p className={styles.sub}>
          {total} credentials in the collection. Hover any card to inspect the
          holographic foil ▸ click to open the original document.
        </p>
      </div>

      <div className={styles.rhs}>
        <span className={styles.count} aria-label={`${collected} of ${total} collected`}>
          {String(collected).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </span>
        Collected · {yearFrom} — {yearTo}
        <ul className={styles.legend} aria-label="Category legend">
          <li>
            <i className={`${styles.swatch} ${styles.swatchHonors}`} aria-hidden="true" />
            Honors
          </li>
          <li>
            <i className={`${styles.swatch} ${styles.swatchAcademic}`} aria-hidden="true" />
            Academic
          </li>
          <li>
            <i className={`${styles.swatch} ${styles.swatchLanguage}`} aria-hidden="true" />
            Language
          </li>
        </ul>
      </div>
    </header>
  )
}
