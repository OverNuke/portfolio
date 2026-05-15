# Framework Philosophy

The project uses Next.js App Router architecture.

The codebase MUST follow Next.js conventions and philosophy:

- Prefer Server Components by default
- Use Client Components only when interactivity is required
- Minimize client-side JavaScript
- Prefer streaming and server rendering
- Use progressive enhancement
- Avoid unnecessary global state
- Prefer colocated logic
- Favor framework conventions over custom abstractions

## Component Architecture

Components MUST:

- Have a single responsibility
- Stay focused and composable
- Separate UI from business logic
- Prefer composition over inheritance
- Avoid deeply nested JSX
- Extract reusable patterns

## Styling Standards

The project uses Tailwind CSS.

Rules:

- Use utility-first styling
- Avoid inline styles
- Extract repeated patterns into reusable components
- Use semantic spacing and layout scales
- Preserve responsive consistency

## State Management

Prefer:

1. Server state
2. URL state
3. Local component state
4. Context only when necessary
5. Global state as a last resort

NEVER introduce global state prematurely.
