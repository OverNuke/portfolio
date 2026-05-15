# Accessibility and WCAG Requirements

The portfolio website MUST comply with WCAG 2.2 AA standards across desktop, tablet, and mobile devices.

Accessibility is a core architectural requirement and MUST NEVER be treated as optional.

## Decision Priorities

When conflicts exist, prioritize:

1. Accessibility
2. Usability
3. Responsiveness
4. Performance
5. Visual aesthetics
6. Animations/effects

## Accessibility Enforcement Rules

NEVER:

- Break keyboard navigation
- Remove visible focus indicators
- Use color alone to convey meaning
- Create hover-only interactions
- Use inaccessible contrast ratios
- Trap keyboard focus
- Use non-semantic interactive elements
- Autoplay audio/video with sound

## Semantic HTML Rules

The application MUST:

- Use semantic HTML structure
- Preserve heading hierarchy
- Use landmarks correctly
- Use buttons for actions
- Use anchors for navigation
- Support screen readers

## Responsive Design Rules

The layout MUST:

- Follow mobile-first principles
- Support:
  - Mobile: 320px+
  - Tablet: 768px+
  - Desktop: 1280px+
- Avoid horizontal overflow
- Support 200% zoom
- Maintain minimum touch targets of 44x44px

## Interactive Components

All interactive elements MUST:

- Be keyboard accessible
- Include visible focus states
- Support screen readers
- Preserve logical tab order
- Include accessible names
- Use ARIA only when necessary

## Motion and Animation

Animations MUST:

- Respect prefers-reduced-motion
- Avoid excessive movement
- Never block interaction
- Never hide critical information

## Validation Workflow

Before finalizing any implementation, validate:

- WCAG 2.2 AA compliance
- Keyboard navigation
- Semantic HTML
- Contrast ratios
- Responsive behavior
- Focus management
- Screen reader compatibility

If violations exist:

1. Explain the issue
2. Suggest a fix
3. Refactor the implementation if necessary

## Architecture Principles

The architecture MUST prioritize:

- Accessibility-first design
- Progressive enhancement
- Maintainability
- Performance
- Reusable components
- Semantic structure

## Output Requirements

When generating or reviewing code:

- Explain accessibility decisions
- Identify WCAG risks
- Suggest improvements
- Justify architectural changes
- Highlight accessibility tradeoffs
