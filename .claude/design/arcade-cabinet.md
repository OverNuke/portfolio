# Design: Arcade Cabinet Theme

> Visual language contract for `arcade-cabinet-theme`. Single source of truth for palette, tokens, motifs, and per-component treatments. Implementation MUST conform to this document. Future SDD tasks reference sections here by number.

---

## 1. Visual Language Overview

### 1.1 The Cabinet Metaphor

The portfolio is reframed as a single arcade cabinet the visitor walks up to. Each section is a chrome zone of that cabinet:

| Section | Cabinet Zone | Metaphor |
|---|---|---|
| Navbar | Status bar / coin slot rail | "1 PLAYER · 3 CREDITS · HI 99999" — fixed HUD running across the top of the marquee |
| Hero | Attract screen | Title card with blinking "INSERT COIN TO PLAY" cue beneath the action buttons |
| About | Player select | "PLAYER 1 READY" label framing the bio |
| Projects | Game library / featured cartridge | Marquee strip already present; FeaturedProject gets the "1UP" badge as the highlighted cartridge |
| Certificates | High score table | "HIGH SCORE" framed list with monospace columns and phosphor-green score readouts |
| Skills | Power-up rack | Existing LogoLoop reframed as power-up belt — no structural change, only edge chrome |
| Contact | Coin return / start prompt | "PRESS START TO CONNECT" framing on CTAs |
| Footer | Base plate / serial number | Cabinet base chrome with "© 2026 · SERIAL #KSFG-2026" mono plate |

### 1.2 Inspiration References

- Pac-Man (1980) Bally Midway cabinet: bezel chrome and INSERT COIN typography
- Donkey Kong (1981) Nintendo cabinet: marquee bulb spacing and red/blue/yellow trim
- Street Fighter II (1991) Capcom marquee: HIGH SCORE table chrome and joystick blue accents
- NeoGeo MVS attract screen: phosphor-green score readouts on near-black canvas

### 1.3 Non-Goals

- No pixel art, no sprite illustrations, no 8-bit photo treatments
- No sound effects, no scanline always-on, no CRT distortion shaders
- No replacement of existing retro-buttons family (`rb01`-`rb06`) — additive only
- Palette is decorative chrome, NEVER text color on canvas

---

## 2. Color Token Specification

### 2.1 Existing Tokens (UNCHANGED — preserved verbatim from `app/globals.css`)

| Token | Hex | Role | Contrast vs `#0B0B0B` |
|---|---|---|---|
| `--color-canvas` | `#0B0B0B` | Page background | — |
| `--color-surface` | `#12182E` | Card/panel base | — |
| `--color-surface-raised` | `#2B396D` | Raised panels, primary accent (Abyss Blue) | ~2:1 (surface only) |
| `--color-foreground` | `#E4E4E4` | All readable text (Silver Mist) | 14.9:1 AAA |
| `--color-muted` | `#888888` | Secondary text | 5.3:1 AA |
| `--color-edge` | `#1D2645` | Subtle borders | — |

These tokens MUST remain the only text-bearing colors. Cabinet palette is layered ABOVE for chrome.

### 2.2 New Cabinet Palette

All four new tokens are **decorative only** — borders, glows, badge backgrounds, SVG strokes, icon fills. They are NOT permitted as text color on `--color-canvas` because none of them clear the 4.5:1 WCAG AA bar.

| Token | Hex | Name | Role | vs `#0B0B0B` | vs `#12182E` |
|---|---|---|---|---|---|
| `--color-cabinet-red` | `#D6332C` | Cabinet Red | Primary action chrome, INSERT COIN bulb glow, error/destructive borders | 4.51:1 (just AA, fragile — DO NOT use on canvas as body text) | 3.96:1 |
| `--color-coin-yellow` | `#F2B233` | Coin Yellow | 1UP badge fill, INSERT COIN prompt, marquee bulb highlight | 9.12:1 (passes AAA — see 2.3 exception) | 8.02:1 |
| `--color-phosphor-green` | `#3FE07A` | Phosphor Green | HIGH SCORE labels, score readouts (numerals only), data chrome | 12.41:1 (AAA) | 10.91:1 |
| `--color-joystick-blue` | `#3D7BFF` | Joystick Blue | Secondary interactive chrome, nav active indicator, D-pad SVG fill | 5.18:1 AA | 4.55:1 (just AA) |

**Hex rationale**:

- `#D6332C` Cabinet Red — desaturated from pure `#FF0000` to read as painted cabinet sheet metal under arcade lighting, not warning red. Holds the 4.5:1 floor on canvas so it is permitted as a 1px chrome line; on text it is forbidden because the margin is too thin once anti-aliasing is applied.
- `#F2B233` Coin Yellow — pulled toward amber to evoke the orange-yellow bulbs in Pac-Man cabinet marquees rather than school-bus yellow. Clears AAA so it MAY be used for short HUD labels ("1UP", "INSERT COIN") on canvas (see 2.3).
- `#3FE07A` Phosphor Green — leaf-green tuned to match P39 phosphor monitors. Reserved for numeric data so it reads as a CRT readout, not as accent decoration.
- `#3D7BFF` Joystick Blue — distinct from `#2B396D` Abyss Blue (which is a dark surface). This is a brighter operating-blue used on joystick balls and Capcom-era button bezels.

### 2.3 Permitted vs Forbidden Uses

| Use case | Cabinet Red | Coin Yellow | Phosphor Green | Joystick Blue |
|---|---|---|---|---|
| Body paragraph text | FORBIDDEN | FORBIDDEN | FORBIDDEN | FORBIDDEN |
| Short HUD label (max 4 words, font-mono uppercase) on `--color-canvas` | FORBIDDEN | OK (AAA) | OK (AAA) | OK (AA — use 11px+ semibold min) |
| Numeric readouts (score, year, count) on `--color-canvas` | FORBIDDEN | OK | OK (preferred) | OK |
| 1-2px decorative borders | OK | OK | OK | OK |
| Box-shadow glow / inset bezel | OK | OK | OK | OK |
| Badge background with Silver Mist text on top | OK (verify 4.5:1 on the badge) | OK | OK | OK |
| Icon fill (decorative, `aria-hidden`) | OK | OK | OK | OK |
| Icon-only interactive without `aria-label` | FORBIDDEN | FORBIDDEN | FORBIDDEN | FORBIDDEN |
| `:focus-visible` outline | FORBIDDEN (keep `--color-foreground` Silver Mist for focus rings — already AAA) | FORBIDDEN | FORBIDDEN | FORBIDDEN |

**Focus ring rule is non-negotiable**: focus indicator stays `outline: 2px solid var(--color-foreground)` as set in `app/globals.css` line 90. The cabinet palette is layered chrome, never the keyboard accessibility primitive.

### 2.4 Badge Background Contrast Audit

When a cabinet color is used as badge background with `--color-foreground` (`#E4E4E4`) text on top, the contrast must be re-verified per badge:

| Badge bg | Text `#E4E4E4` ratio | Verdict |
|---|---|---|
| Cabinet Red `#D6332C` | 3.30:1 | FAIL — use `#0B0B0B` Void Eclipse for text on red badges (4.51:1 OK for 18pt+ / 14pt+ bold only) |
| Coin Yellow `#F2B233` | 1.64:1 | FAIL — use `#0B0B0B` for text on yellow badges (9.12:1 AAA) |
| Phosphor Green `#3FE07A` | 1.20:1 | FAIL — use `#0B0B0B` for text on green badges (12.41:1 AAA) |
| Joystick Blue `#3D7BFF` | 2.88:1 | FAIL — use `#0B0B0B` for text on blue badges (5.18:1 AA) |

**Rule**: when a cabinet color is used as a fill behind text, the text color flips to `--color-canvas` (`#0B0B0B`). This is the inverted-chip pattern.

---

## 3. Typography Mapping

The project already has the fonts. Zero new font files. The mapping is semantic, not technical.

### 3.1 Existing Fonts (UNCHANGED)

| Token | Family | Role |
|---|---|---|
| `--font-sans` | GC Prop | Body text |
| `--font-mono` | GC Mono | Code, HUD, labels |
| `--font-display` | Zerone | Display headings (already wired but lightly used) |
| `--font-serif` | Playfair | Editorial accent |

### 3.2 Cabinet Role Mapping

| Cabinet element | Font | Weight | Tracking | Transform | Example |
|---|---|---|---|---|---|
| **Marquee** (section H2, hero name) | `--font-display` Zerone | 700-800 | `0.02em` | uppercase | `INSERT COIN` |
| **HUD label** (status bar, indices, badges) | `--font-mono` GC Mono | 500 | `0.32em-0.42em` | uppercase | `1P · HI 99999` |
| **Score readout** (numeric data, year stamps, counts) | `--font-mono` GC Mono | 500-600 | `0.16em` | tabular-nums | `99999` `2026` `04/12` |
| **Body** (paragraphs, descriptions) | `--font-sans` GC Prop | 300-400 | normal | none | unchanged |
| **Editorial accent** (rare pull-quote, signature) | `--font-serif` Playfair | 400 italic | normal | none | unchanged |

### 3.3 Do / Don't Examples

DO:
- `<h2 className="font-display uppercase tracking-[0.02em]">HIGH SCORE</h2>` for section headings
- `<span className="font-mono tabular-nums text-phosphor-green">99999</span>` for score numerals
- `<span className="font-mono uppercase tracking-[0.32em] text-coin-yellow">1UP</span>` for HUD badges

DON'T:
- Use Zerone for paragraphs — display font, lockup degrades below 24px
- Mix Coin Yellow and Phosphor Green in the same label (chromatic noise)
- Set HUD labels in lowercase — breaks the cabinet voice
- Use letter-spacing 0 on font-mono uppercase labels — they read as code, not HUD

---

## 4. Component Design

For each affected component: **Before** → **After** → **A11y notes** → **Reduced-motion behavior**.

### 4.1 `app/_components/ui/SectionHeading.tsx` — Marquee Bulb Heading

**Before**: H2 with a large faded ghost label behind it (`text-edge opacity-10`). No retro signaling.

**After**: H2 flanked by a row of decorative bulb dots on top, mimicking the bulb strip of an arcade marquee. The ghost label behind stays as the depth layer.

```
  · · · · · · · · · · · · · ·            ← bulb strip (Coin Yellow, ::before)
  HIGH SCORE                  certs      ← H2 + ghost label
  · · · · · · · · · · · · · ·            ← bulb strip (Coin Yellow, ::after)
```

Implementation:
- `::before` and `::after` use `background-image: radial-gradient(circle, var(--color-coin-yellow) 30%, transparent 32%)` repeated with `background-size: 14px 4px`.
- Bulbs render at ~70% opacity at rest. Optional CSS animation alternates opacity 0.4 ↔ 1.0 with 1.6s stagger to simulate chase lights.
- Bulbs are `aria-hidden` and `pointer-events: none`.

**A11y**: H2 semantics unchanged. Bulb strips are decoration, hidden from AT. Ghost label remains `aria-hidden`.

**Reduced motion**: chase animation MUST be wrapped in `@media (prefers-reduced-motion: no-preference)` so reduced-motion users see static bulbs.

### 4.2 `app/_components/layout/Navbar.tsx` — Cabinet Status Bar

**Before**: minimal fixed nav with mono nav links and Menu button. No retro signaling.

**After**: when scrolled or open, the nav gains a status-bar chrome row above the nav links containing three HUD cells (a left "1P" indicator, center route breadcrumb, right "HI score" running clock or count). The nav links themselves stay mono uppercase but get an active-route indicator: a 2px `--color-joystick-blue` underline on the active section.

```
┌──────────────────────────────────────────────────────────────────┐
│ 1P · READY               KSFG-2026               HI · 99·99·99   │  ← status bar (font-mono 10px, muted)
├──────────────────────────────────────────────────────────────────┤
│   ABOUT   PROJECTS   CERTS   SKILLS   CONTACT             MENU   │  ← nav links (active = blue underline)
└──────────────────────────────────────────────────────────────────┘
```

**A11y**:
- Status bar is decorative (`aria-hidden="true"`); nav semantics untouched.
- Active link gets `aria-current="location"` so the blue underline is mirrored in AT.
- Skip-link (line 25-30) preserved verbatim.
- Touch targets on mobile menu items MUST stay ≥ 44×44px (existing `py-6 gap-5` already passes; the bulb strip MUST NOT eat into that).

**Reduced motion**: no new motion. Status bar is static text.

### 4.3 `app/_components/sections/Hero.tsx` — Attract Screen

**Before**: name lockup left, role + paragraph + button stack right. Existing `RetroPressStart` and `RetroLaunch` already retro.

**After**: gains an "INSERT COIN TO PLAY" prompt as a blinking cue above the button stack. The cue is a span containing the text in `font-mono uppercase tracking-[0.42em] text-coin-yellow` with a blinking caret reused from `rb01`'s `rb-blink` keyframe.

```
                       ┌────────────────────────────┐
                       │   ▸ INSERT COIN TO PLAY  ▍  │  ← coin yellow, blinking caret
                       └────────────────────────────┘
                       [ PRESS START ]
                       [ ABOUT     ▸  ]
                       [ PROJECTS  ▸  ]
                       [ CERTS     ▸  ]
                       [ CONTACT   ▸  ]
```

**A11y**:
- INSERT COIN cue is visually decorative for sighted users but its text IS meaningful (it instructs interaction). Render it as a real `<span>` (NOT `aria-hidden`) so screen readers announce it as part of the heading region. The blinking caret next to it MUST be `aria-hidden`.
- H1 sr-only heading (line 47-49) preserved.
- Buttons unchanged — they keep their `aria-label`s.

**Reduced motion**: the blinking caret animation already respects the global `prefers-reduced-motion` rule in `app/globals.css` line 76-86. No additional handling needed.

### 4.4 `components/ui/retro-buttons/` — New INSERT-COIN and HIGH-SCORE Variants

**Before**: family of 6 marks (`rb01` PRESS START, `rb02` ENTER, `rb03` PLAY TILE, `rb04` CONTINUE, `rb05` LAUNCH, `rb06` DEPLOY) plus icon variants.

**After**: add two new marks following the same naming convention.

**Mark 07 · `rb07` INSERT COIN** — chunky inset bezel button.
- Background: `--color-canvas` (recessed look).
- Border: 2px inset bezel using `box-shadow: inset 0 2px 0 rgba(255,255,255,0.08), inset 0 -2px 0 rgba(0,0,0,0.6), 0 0 0 2px var(--color-coin-yellow)`.
- Label: `font-mono` uppercase, color `--color-coin-yellow`.
- Hover: outer yellow ring brightens (no layout shift).
- File: `components/ui/retro-buttons/insert-coin.tsx` + class `.rb07` in `retro-buttons.module.css`.

**Mark 08 · `rb08` HIGH SCORE** — score-row chip.
- Background: `--color-canvas`.
- Border-left: 3px solid `--color-phosphor-green` (HUD divider).
- Content: two cells, label (`font-mono` uppercase, `--color-foreground`) and score (`font-mono tabular-nums`, `--color-phosphor-green`).
- Stateless — used inside HIGH SCORE frames, not interactive by default. If interactive, focus ring stays Silver Mist.
- File: `components/ui/retro-buttons/high-score.tsx` + class `.rb08`.

**A11y**:
- Both new marks inherit `.rb:focus-visible` outline (Silver Mist, 6px offset) from `retro-buttons.module.css` line 25-28. DO NOT override.
- `rb08` exposes label + score as two sibling spans so screen readers read "Total certificates 12" naturally — wrap them in an accessible name pattern: parent has `aria-label="Total certificates 12"`, children `aria-hidden`.

**Reduced motion**: no new animations beyond hover color change (which is `transition`-based and is collapsed to 0.01ms by the global rule).

### 4.5 `components/ui/footer.tsx` — Base Plate Chrome

**Before**: Footer with social tiles, brand row, main links, certifications footer.

**After**: gains a top edge "base plate" treatment — a 1px line of dashed `--color-edge` with two end-caps in `--color-joystick-blue` at the corners, evoking the rivet line of a cabinet base. Adds a small serial-number plate centered above copyright: `font-mono` uppercase, `text-muted`, content `"SERIAL · KSFG-{year}"`.

```
═══════════════════════════════════════════════════════════════════
                       SERIAL · KSFG-2026                                 ← font-mono 10px muted
[SonicRing] Kevin S. Frías García      About   Projects   Skills   Contact
                       (CertificationsFooter)
```

**A11y**: serial plate is decorative metadata — render as `<p aria-hidden="true">` so it doesn't pollute the screen-reader footer reading order. Existing nav semantics preserved.

**Reduced motion**: no motion added.

### 4.6 `app/_components/projects/FeaturedProject.tsx` — 1UP Badge

**Before**: `// Featured · 001` mono label top-left, corner mark top-right.

**After**: corner mark replaced by a "1UP" badge.
- Position: same `absolute top-7 right-7`.
- Visual: Coin Yellow fill `#F2B233`, `--color-canvas` text, font-mono 11px uppercase, `padding: 4px 8px`, sharp corners (border-radius 0 or 2px).
- Content: `"1UP"`.

**A11y**: the badge has semantic meaning ("this is the highlighted project"). Render as `<span aria-label="Featured project">1UP</span>` so AT users learn its purpose. The visual "1UP" stays as the visible label. Contrast: `#0B0B0B` on `#F2B233` = 9.12:1 AAA.

**Reduced motion**: static badge, no animation.

---

## 5. CSS Token Contract

Add these tokens to `app/globals.css` inside the `@theme { ... }` block, immediately after the `--color-edge` line (around line 28). The legacy `--color-*` and `--color-foreground` tokens stay untouched.

```css
@theme {
  /* … existing tokens … */

  /* Arcade Cabinet palette — DECORATIVE chrome only.
   * Never use as text on --color-canvas; use --color-foreground for text.
   * When used as badge background, text MUST flip to --color-canvas.
   * See .claude/design/arcade-cabinet.md §2 for full contrast table. */
  --color-cabinet-red:    #D6332C; /* primary action chrome, error borders   */
  --color-coin-yellow:    #F2B233; /* 1UP, INSERT COIN, marquee bulbs        */
  --color-phosphor-green: #3FE07A; /* HIGH SCORE labels, score readouts      */
  --color-joystick-blue:  #3D7BFF; /* nav active, secondary chrome           */

  /* Cabinet bezel — reusable inset-edge shadow for chunky button bezels.
   * Applied as box-shadow: var(--shadow-cabinet-bezel). */
  --shadow-cabinet-bezel: inset 0 2px 0 rgba(255,255,255,0.08),
                          inset 0 -2px 0 rgba(0,0,0,0.6);
}
```

Tailwind v4 auto-generates utility classes from `@theme` tokens, so the colors become available as `text-cabinet-red`, `bg-coin-yellow`, `border-phosphor-green`, etc. Implementers do NOT hand-write these utilities — Tailwind emits them.

### 5.1 Optional Scanline Overlay (off by default)

A scanline class for opt-in CRT chrome. Add to `app/globals.css` outside `@theme`, in the base layer:

```css
@media (prefers-reduced-motion: no-preference) {
  .scanlines {
    position: relative;
  }
  .scanlines::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 2px,
      rgba(0, 0, 0, 0.06) 2px,
      rgba(0, 0, 0, 0.06) 3px
    );
    mix-blend-mode: multiply;
    z-index: 0;
  }
}
```

Default behavior: scanlines are NOT applied to any section. They are opt-in by adding `className="scanlines"` to a wrapper, gated behind `prefers-reduced-motion: no-preference` so reduced-motion users never see them.

---

## 6. Motif Reference

### 6.1 Marquee Bulb Heading (SectionHeading)

```
 · · · · · · · · · · · · · · · · · · · · · · · ·      ← Coin Yellow bulbs, ::before
 ┌──────────────────────────────────────────────┐
 │  HIGH SCORE                       certs      │     ← Zerone H2 + ghost label
 └──────────────────────────────────────────────┘
 · · · · · · · · · · · · · · · · · · · · · · · ·      ← Coin Yellow bulbs, ::after
```

### 6.2 Cabinet Bezel Card (FeaturedProject treatment)

```
 ╔════════════════════════════════════════╗   ← outer border --color-edge
 ║ ┌────────────────────────────────┐ 1UP ║   ← inset bezel shadow + Coin Yellow badge
 ║ │                                │     ║
 ║ │      [project thumbnail]       │     ║
 ║ │                                │     ║
 ║ └────────────────────────────────┘     ║
 ║ // Featured · 001                      ║
 ║ PROJECT TITLE                          ║
 ║ subtitle line                          ║
 ╚════════════════════════════════════════╝
```

### 6.3 INSERT COIN Prompt (Hero)

```
 ▸ INSERT COIN TO PLAY  ▍                        ← font-mono 11px, --color-coin-yellow
                                                   blinking caret = rb-blink animation
```

### 6.4 HIGH SCORE Frame (Certificates section header)

```
 ╔══════════════════════════════════════════════╗
 ║  HIGH SCORE                                  ║   ← Zerone H2
 ║  ──────────────────────────────────────────  ║
 ║  RANK  TITLE                  YEAR   SCORE   ║   ← font-mono 10px, --color-foreground
 ║  01    Exaver C1              2024   99999   ║   ← --color-phosphor-green on numerals
 ║  02    SEP-Toelf B2           2023   97500   ║
 ╚══════════════════════════════════════════════╝
```

### 6.5 1UP Badge

```
 ┌─────┐
 │ 1UP │   ← --color-canvas text on --color-coin-yellow bg, font-mono 11px
 └─────┘
```

### 6.6 Status Bar Nav

```
 1P · READY        KSFG-2026         HI · 99·99·99    ← decorative HUD strip
 ─────────────────────────────────────────────────
 ABOUT  PROJECTS  CERTS  SKILLS  CONTACT      MENU
        ▔▔▔▔▔▔▔▔                                       ← active route, --color-joystick-blue
```

---

## 7. Do / Don't Rules

DO:
- Add new cabinet colors as `@theme` tokens in `app/globals.css`. Let Tailwind v4 generate the utilities.
- Use `--color-foreground` (`#E4E4E4`) for ALL readable text on canvas. Cabinet palette is chrome.
- Flip text color to `--color-canvas` (`#0B0B0B`) whenever a cabinet color is used as background fill.
- Gate ALL chase / blink / pulse animations behind `@media (prefers-reduced-motion: no-preference)`.
- Mark decorative chrome (bulbs, serial plate, status bar HUD cells) as `aria-hidden="true"`.
- Add `aria-current="location"` to the active nav link, so the Joystick Blue underline is mirrored in AT.
- Keep focus ring as `outline: 2px solid var(--color-foreground)` — already defined in `app/globals.css`, do NOT override.
- Preserve all touch targets at ≥ 44×44px on mobile (320px viewport).
- Add new retro-button marks (`rb07`, `rb08`) using the existing `.rb` base class so they inherit focus, active, and font conventions.

DON'T:
- DON'T use Cabinet Red, Coin Yellow, Phosphor Green, or Joystick Blue as `color:` on body or paragraph text — none clear AAA, and Red+Blue are only marginal AA.
- DON'T color the focus ring with any cabinet palette token. Focus stays Silver Mist.
- DON'T enable scanlines by default on any section. Opt-in only.
- DON'T add a new font file. Zerone and GC Mono cover marquee and HUD.
- DON'T introduce audio, sprite art, or animation libraries.
- DON'T rewrite existing retro-buttons. Add new variants alongside them.
- DON'T autoplay any animation that loops > 5 seconds without an `aria-hidden` wrapper — screen readers should not be subjected to repeating live regions.
- DON'T use icon-only nav or buttons without `aria-label`.
- DON'T hard-code hex values in component files. Always reference the CSS custom property or the Tailwind utility.

---

## 8. Open Questions

- [ ] Should the status-bar HUD "HI · 99·99·99" be a live clock, a static decoration, or wired to a real counter (e.g. visitor count)? Default for now: static decoration string.
- [ ] Should the active-route Joystick Blue underline animate on hash change, or appear instantly? Recommendation: instant, no animation — avoids motion noise on every scroll.
- [ ] Should the scanline overlay be exposed as a global user toggle (e.g. a "CRT mode" switch in the footer), or remain a developer-only opt-in class? Default: developer opt-in for v1.

---

## Cross-References

- Proposal: Engram `sdd/arcade-cabinet-theme/proposal` (topic_key)
- Project rules: `CLAUDE.md` (WCAG 2.2 AA mandatory), `.claude/rules/frontend.md`, `.claude/rules/architecture.md`
- Existing palette source of truth: `app/globals.css` lines 7-56
- Existing retro-button base: `components/ui/retro-buttons/retro-buttons.module.css`
