import Image from "next/image";
import type { AboutTrait } from "@/types";
import { ABOUT_PROFILE } from "@/lib/data";
import { RetroContinue } from "@/components/ui/retro-buttons/continue-button";
import { SectionHeading } from "../ui/SectionHeading";
import styles from "./about.module.css";

function TraitGauge({ label, value, max }: AboutTrait) {
  return (
    <div
      className={styles.gauge}
      role="meter"
      aria-label={`${label}: ${value} out of ${max}`}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      tabIndex={0}
    >
      <span className={styles.gaugeLbl}>{label}</span>
      <span className={styles.gaugeBar} aria-hidden="true">
        {Array.from({ length: max }, (_, i) => (
          <i key={i} className={i >= value ? styles.off : undefined} />
        ))}
      </span>
      <span className={styles.gaugeVal} aria-hidden="true">
        {value}/{max}
      </span>
    </div>
  );
}

export function About() {
  const p = ABOUT_PROFILE;
  return (
    <section
      id="about"
      className="py-section-sm md:py-section container-content"
      aria-labelledby="about-heading"
    >
      <SectionHeading id="about-heading">About me</SectionHeading>

      <article className={styles.card} aria-label="Player profile card">
        {/* Left pane — identity, bio, CTAs */}
        <div className={styles.paneL}>
          <div className={styles.idRow} aria-hidden="true">
            <span>{"// PLAYER 01"}</span>
            <b>LV {String(p.level).padStart(2, "0")}</b>
          </div>

          <h3
            className={styles.name}
            aria-label={`${p.firstName} ${p.lastName}`}
          >
            {p.firstName}
            <br />
            <span className={styles.accent}>{p.lastName}</span>
          </h3>

          <p className={styles.role}>
            {p.role} · <em>{p.roleClass}</em>
          </p>

          <p className={styles.lede}>{p.bio}</p>
          <p className={styles.bodyText}>{p.bodyText}</p>

          <div className={styles.ctaRow}>
            <a
              href={p.ctaPrimary.href}
              className={styles.ctaPrimary}
              aria-label={p.ctaPrimary.label}
            >
              <span>{p.ctaPrimary.label}</span>
              <span className={styles.caret} aria-hidden="true" />
            </a>
            <RetroContinue
              href={p.ctaSecondary.href}
              label={p.ctaSecondary.label}
            />
          </div>
        </div>

        {/* Right pane — avatar, stats, traits, spec */}
        <div className={styles.paneR}>
          <div className={styles.statBlock}>
            <div className={styles.avFrame}>
              <Image
                src={p.avatarSrc}
                alt={`${p.firstName} ${p.lastName} profile photo`}
                width={160}
                height={160}
                className={styles.avImg}
                priority
              />
              {p.avatarSrcHover && (
                <Image
                  src={p.avatarSrcHover}
                  alt=""
                  aria-hidden
                  width={160}
                  height={160}
                  className={styles.avImgOver}
                />
              )}
              <span className={styles.avTag} aria-hidden="true">
                AVATAR
              </span>
              <div className={styles.corners} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className={styles.lvRow}>
              <span aria-hidden="true">{"// STATUS"}</span>
              <dl className={styles.statRow}>
                <div>
                  <dt>LV</dt>
                  <dd>{p.level}</dd>
                </div>
                <div>
                  <dt>EXP</dt>
                  <dd>
                    {String(p.exp.current).padStart(4, "0")} /{" "}
                    {String(p.exp.max).padStart(4, "0")}
                  </dd>
                </div>
                <div>
                  <dt>SLOT</dt>
                  <dd>{String(p.slot).padStart(2, "0")}</dd>
                </div>
              </dl>
              <span
                className={`${styles.status}${p.statusOnline ? ` ${styles.statusLive}` : ""}`}
                role="status"
                aria-label={
                  p.statusOnline
                    ? "Currently online and open to work"
                    : p.status
                }
              >
                {p.status}
              </span>
            </div>
          </div>

          <div
            className={styles.gauges}
            role="group"
            aria-label="Character traits"
          >
            {p.traits.map((t) => (
              <TraitGauge key={t.label} {...t} />
            ))}
          </div>

          <dl className={styles.spec}>
            <div>
              <dt>Based</dt>
              <dd>{p.location}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{p.role}</dd>
            </div>
            <div>
              <dt>Open to</dt>
              <dd>{p.openTo}</dd>
            </div>
          </dl>
        </div>
      </article>
    </section>
  );
}
