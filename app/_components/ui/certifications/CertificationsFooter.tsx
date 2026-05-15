import styles from './certifications.module.css'

type KeyHint = {
  caps: string[]
  label: string
  gold?: boolean
}

const KEY_HINTS: readonly KeyHint[] = [
  { caps: ['↑', '↓'], label: 'Select' },
  { caps: ['A'], label: 'Open', gold: true },
  { caps: ['B'], label: 'Back' },
  { caps: ['L', 'R'], label: 'Sort' },
]

export function CertificationsFooter() {
  return (
    <div className={styles.footer} aria-hidden="true">
      <div className={styles.footerRow}>
        <ul className={styles.keys}>
          {KEY_HINTS.map(({ caps, label, gold }) => (
            <li
              key={label}
              className={`${styles.key} ${gold ? styles.keyGold : ''}`}
            >
              {caps.map((c) => (
                <i key={c} className={styles.keyCap}>{c}</i>
              ))}
              <b className={styles.keyLabel}>{label}</b>
            </li>
          ))}
        </ul>
        <span className={styles.start}>▸ Press Start</span>
      </div>
    </div>
  )
}
