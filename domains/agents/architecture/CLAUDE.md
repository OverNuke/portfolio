# Project Structure

Follow a scalable feature-oriented architecture.

## App Structure

/app
  /(marketing)
  /(dashboard)
  /api
  /globals.css
  /layout.tsx
  /page.tsx

/components
  /ui
  /shared
  /features

/lib
  /utils
  /services
  /validators

/hooks

/types

/styles

## Rules

- Shared reusable UI goes in `/components/ui`
- Feature-specific components go in `/components/features`
- Business logic MUST NOT live inside UI components
- Utility functions belong in `/lib/utils`
- API communication belongs in `/lib/services`
- Validation schemas belong in `/lib/validators`

## Anti-Patterns to Avoid

NEVER:

- Create massive components
- Mix business logic with presentation
- Duplicate UI patterns
- Use deeply nested prop drilling
- Overuse useEffect
- Use client-side fetching unnecessarily
- Create unnecessary abstractions
- Use index as React keys
- Store derived state
- Add premature optimizations
- Create global state without justification
- Use barrel exports excessively

## Dependency Rules

Before adding a dependency:

1. Verify it is necessary
2. Prefer native Next.js or React solutions
3. Prefer lightweight libraries
4. Avoid overlapping libraries
5. Justify large dependencies

NEVER:

- Add dependencies for trivial utilities
- Introduce abandoned packages
- Duplicate framework capabilities
