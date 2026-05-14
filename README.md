# Kevin Sebastián Frías García — Portfolio

Personal portfolio built with Next.js 16, React 19, Tailwind CSS v4, and TypeScript.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page hot-reloads as you save files — no restart needed.

---

## How to edit your content

**Start here.** All your personal content lives in one file:

```
lib/data.ts
```

Open it and replace the placeholder entries with your real projects, certificates, and skills. The components read from this file automatically — you never touch the components themselves just to update content.

### Adding a project

```ts
// lib/data.ts
export const PROJECTS: Project[] = [
  {
    title: 'My Project',
    description: 'One or two sentences describing what it does and why it matters.',
    tags: ['Next.js', 'TypeScript'],   // technologies used
    href: 'https://live-url.com',      // live demo URL
    repo: 'https://github.com/...',    // source code URL (optional)
    featured: true,                    // optional flag, not displayed yet
  },
]
```

### Adding a certificate

```ts
export const CERTIFICATES: Certificate[] = [
  {
    title: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2024',
    href: 'https://link-to-credential.com',  // optional
  },
]
```

### Adding a skill

```ts
export const SKILLS: Skill[] = [
  { name: 'Python', category: 'language' },
  { name: 'Django', category: 'framework' },
  { name: 'Docker', category: 'tool' },
]
```

Valid categories: `'language'`, `'framework'`, `'tool'`, `'other'`.
Skills are automatically grouped by category on the page.

### Updating social links and contact email

```ts
export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/your-handle' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/your-handle' },
  { label: 'Email', href: 'mailto:your@email.com' },
]
```

The contact email in the Contact section (`app/_components/sections/Contact.tsx`) also uses a hardcoded `mailto:` — update that line when you update your real address.

---

## Project structure

```
app/
  page.tsx                     ← assembles all sections in order
  layout.tsx                   ← fonts, Navbar, Footer — applies to every page
  globals.css                  ← design tokens and base styles (edit colors here)
  _lib/
    data.ts                    ← YOUR CONTENT — edit this
    types.ts                   ← TypeScript type definitions
  _components/
    ui/
      CTAButton.tsx            ← button or link, primary/outline variants
      ProjectCard.tsx          ← card displayed in the Projects section
      SectionHeading.tsx       ← h2 heading with a mono label above it
      SkillBadge.tsx           ← individual skill pill
    layout/
      Navbar.tsx               ← fixed top nav, mobile hamburger included
      Footer.tsx               ← bottom bar with social links
    sections/
      Hero.tsx                 ← full-screen intro
      About.tsx                ← bio text
      Projects.tsx             ← project grid
      Certificates.tsx         ← certificate list
      Skills.tsx               ← skills grouped by category
      Contact.tsx              ← contact CTA
```

The `_` prefix on `_components` and `_lib` is a Next.js convention that marks those folders as **private** — they will never become URL routes by accident.

---

## How to edit the design

### Colors and fonts

Everything lives in `app/globals.css` inside the `@theme {}` block:

```css
@theme {
  --color-canvas: #0B0B0B;        /* page background */
  --color-surface-raised: #2B396D; /* card backgrounds */
  --color-accent: #00E676;        /* green highlights */
  --color-foreground: #E4E4E4;    /* primary text */
  --color-muted: #888888;         /* secondary text */
  --color-edge: #1d2645;          /* borders */
}
```

Change a value here and every component that uses that color updates instantly. This is Tailwind v4 — there is no `tailwind.config.js`. The `@theme` block IS the config.

> **WCAG note:** If you change accent or text colors, verify the contrast ratio stays above 4.5:1 for body text (AA) at [contrast-ratio.com](https://contrast-ratio.com). Current palette is fully AA/AAA compliant.

### Fonts

Fonts are loaded in `app/layout.tsx`:

```tsx
const syne = Syne({ subsets: ['latin'], variable: '--font-syne', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })
```

To swap a font, replace the import name with any font from [fonts.google.com](https://fonts.google.com). The variable name (`--font-syne`, `--font-jetbrains`) connects the font to `@theme` in `globals.css` — keep both in sync.

---

## How to edit section text

Each section is a file in `app/_components/sections/`. Open the one you want:

- `Hero.tsx` — your name, tagline, CTA buttons
- `About.tsx` — your bio paragraphs
- `Contact.tsx` — the intro text above the email button

These are the only sections with hardcoded prose. Edit the JSX directly:

```tsx
// app/_components/sections/About.tsx
<p>
  Replace this with your actual bio.
</p>
```

---

## Adding a new section

1. Create `app/_components/sections/YourSection.tsx`:

```tsx
import { SectionHeading } from '../ui/SectionHeading'

export function YourSection() {
  return (
    <section id="your-section" className="py-24" aria-labelledby="your-section-heading">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading label="// 06" id="your-section-heading">
          Your Title
        </SectionHeading>
        {/* content here */}
      </div>
    </section>
  )
}
```

2. Import and add it in `app/page.tsx`:

```tsx
import { YourSection } from './_components/sections/YourSection'

export default function Home() {
  return (
    <main id="main-content">
      ...
      <YourSection />
    </main>
  )
}
```

3. Add a nav link in `app/_components/layout/Navbar.tsx`:

```ts
const NAV_LINKS = [
  ...
  { href: '#your-section', label: 'Your Label' },
]
```

The `id` on `<section>` must match the `href` in the nav (without the `#`).

---

## Key concepts to know

### Server vs Client Components

In Next.js App Router, all components are **Server Components** by default — they render on the server and send plain HTML. They cannot use React hooks (`useState`, `useEffect`) or browser APIs.

The **only** component in this project that is a Client Component is `Navbar.tsx`, marked with `'use client'` at the top. It needs to detect scroll position and toggle the mobile menu.

> Rule of thumb: if you need `useState` or `useEffect`, add `'use client'` to that file. Keep Client Components as small and leaf-level as possible.

### Why `@/` in imports

```ts
import { PROJECTS } from '@/lib/data'
```

The `@/` is an alias for the project root, configured in `tsconfig.json`. It avoids long relative paths like `../../../_lib/data`.

### Tailwind v4 utility classes

Classes like `bg-surface-raised`, `text-accent`, `border-edge` are not built-in Tailwind classes — they are generated from your `@theme` tokens. Tailwind v4 automatically creates a `bg-{name}`, `text-{name}`, and `border-{name}` utility for every `--color-{name}` you define.

### The nav uses anchor links, not routes

Clicking "About" in the nav jumps to `<section id="about">` on the same page. This is standard HTML anchor behavior — no JavaScript routing involved. The `scroll-behavior: smooth` in `globals.css` makes it animate.

---

## Deploying

The easiest option is [Vercel](https://vercel.com) — it was made by the same team as Next.js:

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Click Deploy — no configuration needed

Vercel detects Next.js automatically and handles everything.
