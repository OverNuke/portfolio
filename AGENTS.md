<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Self-Review Workflow

Before finalizing any implementation:

1. Validate Next.js best practices
2. Verify Server/Client boundaries
3. Check accessibility compliance
4. Review component responsibility
5. Check for unnecessary complexity
6. Ensure folder structure consistency
7. Verify responsive behavior
8. Review TypeScript safety
9. Detect anti-patterns
10. Remove dead code
<!-- END:nextjs-agent-rules -->

## Component Directory Conventions

This project intentionally maintains two component directories. They are NOT
duplicates — they serve different concerns. Do not consolidate them.

- `/app/_components/` — page-specific compositions, colocated with the App
  Router. Components here are tied to a specific page/section and are not
  meant to be reused elsewhere.
  Example: `app/_components/sections/ProjectsGrid.tsx` — the Projects section
  of the home page.

- `/components/` — truly reusable primitives, framework-agnostic UI building
  blocks. Subfolders: `ui/` (presentational primitives), and `features/` /
  `shared/` if/when needed.
  Example: `components/ui/retro-buttons/press-start.tsx` — a reusable button
  used by multiple sections.

Rule of thumb: if a component is used by exactly one page/section and
describes that page, it belongs in `/app/_components/`. If it is (or could
plausibly be) reused across pages, it belongs in `/components/`.

No barrel (`index.ts`) re-export files under `/components/` — import each
component directly from its source file.
