
# Refactor Plan — Portfolio Project (Next.js)

I want to create a new refactor for the portfolio project focused on improving the visual hierarchy, component isolation, responsiveness, and overall UX/UI consistency.

## 1. Hero Section Refactor

The Hero section must become completely independent from the rest of the page sections, both visually and structurally.

### Main Goals

* The `DotField` background effect should be exclusive to the Hero section only.
* Remove any shared background behavior between Hero and other sections.
* Ensure the Hero feels like a standalone entry point for the experience.

### Things to Fix

#### LayeredText Overflow Bug

The `LayeredText` component currently has a visual issue:

* When the user is not hovering the element, a small portion of hidden text overflows outside the masked area.
* The hidden line should remain fully clipped with no visible pixels leaking outside the container.
* Review:

  * line-height
  * overflow behavior
  * transform positioning
  * subpixel rendering issues

#### Improve Paragraph and Message Presentation

The current typography and message layout feel too simple and lack personality.

Tasks:

* Propose a more polished text presentation system.
* Improve:

  * spacing
  * readability
  * visual rhythm
  * emphasis hierarchy
* Consider:

  * animated text reveal
  * highlighted keywords
  * asymmetric layouts
  * gradient text accents
  * responsive typography scaling

The final solution should match a modern and premium portfolio aesthetic.

---

## 2. Global Section Refactor

Refactor all sections to improve spacing consistency, responsiveness, and accessibility.

### Layout & Spacing Problems

#### Heading Overlap Issues

Some section headings are overlapping nearby elements.

Tasks:

* Normalize vertical spacing between headings and content.
* Create a consistent spacing system using margin/padding tokens.
* Ensure readability across all breakpoints.

### Remove Old Visual Effects

* Remove all previously added blur background effects from non-hero sections.
* Simplify the visual language to reduce noise and improve clarity.

### Accessibility & Responsiveness (WCAG)

All sections must follow responsive and accessible design principles aligned with WCAG standards.

Requirements:

* Ensure layouts adapt correctly across:

  * mobile
  * tablet
  * desktop
  * ultra-wide screens
* Improve:

  * color contrast
  * text readability
  * spacing scalability
  * keyboard navigation
  * semantic structure
* Avoid fixed heights that break content flow.
* Use fluid spacing and typography whenever possible.

---

## Expected Outcome

The refactor should produce:

* A cleaner visual hierarchy
* Better separation between sections
* Improved responsiveness
* A more premium and modern UI
* Better accessibility and maintainability
* A scalable design system for future iterations
