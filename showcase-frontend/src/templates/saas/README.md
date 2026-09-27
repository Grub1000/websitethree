# Nexora SaaS Template

A responsive, mobile-first SaaS / developer-infrastructure landing page built with **React, TypeScript, CSS, GSAP, and Lucide icons**.

Nexora is a fictional cloud deployment platform used to demonstrate production-quality frontend architecture, responsive design, interactive infrastructure visualizations, animation, and accessibility.

> This README is primarily a development reference for remembering the implementation patterns used throughout this template.

---

## Core Principles

The template was built around a few rules:

- Mobile-first CSS
- Semantic HTML
- Accessible interactions
- Low-specificity BEM-style CSS
- CSS Grid for major layouts
- Flexbox for one-dimensional layouts
- `rem`-based responsive sizing
- CSS for simple transitions
- GSAP for complex animation
- React for state, not visual styling
- Reduced-motion support
- Reusable design tokens
- Technical visuals instead of generic SaaS decoration

The visual rule used throughout the project was:

> **Nexora should look technical before it looks futuristic.**

---

# Project Structure

```text
saas/
├── components/
│   └── Header/
│
├── sections/
│   ├── Hero/
│   ├── CredibilityStrip/
│   ├── ProductOverview/
│   ├── Story/
│   ├── GlobalArchitecture/
│   ├── Features/
│   │   └── visualizations/
│   ├── Integrations/
│   ├── Metrics/
│   ├── DeveloperTerminal/
│   ├── Pricing/
│   ├── Testimonials/
│   ├── FAQ/
│   ├── FinalCTA/
│   └── Footer/
│
├── styles/
│   ├── tokens.css
│   └── global.css
│
├── SaaSApp.tsx
└── README.md
```

Each major section owns its component and CSS.

```text
Section/
├── Section.tsx
└── Section.css
```

This keeps section-specific styling isolated while shared design decisions remain in the global design system.

---

# Design Tokens

Shared values live in:

```text
styles/tokens.css
```

Instead of repeatedly hardcoding values:

```css
color: #22d3ee;
```

use semantic tokens:

```css
color: var(--saas-color-cyan-400);
```

Tokens cover:

- colors
- spacing
- typography
- radii
- animation timing
- easing
- container widths
- z-index layers

Example:

```css
padding: var(--saas-space-6);
border: 1px solid var(--saas-color-border);
border-radius: var(--saas-radius-sm);

color: var(--saas-color-text-primary);
background: var(--saas-color-surface-1);
```

This makes large visual changes possible without editing every component.

---

# Mobile-First Responsive Design

The template is built **mobile first**.

Base styles describe the smallest layout:

```css
.example {
    display: grid;

    grid-template-columns: minmax(0, 1fr);
}
```

Larger layouts are progressively added:

```css
@media (min-width: 48rem) {
    .example {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (min-width: 64rem) {
    .example {
        grid-template-columns:
            minmax(18rem, 0.8fr)
            minmax(32rem, 1.2fr);
    }
}
```

The primary breakpoints are:

```text
BASE / MOBILE
48REM AND LARGER
64REM AND LARGER
```

Avoid thinking of breakpoints as specific devices.

They represent the point where the **layout has enough space to change**.

---

# Why `rem` Instead of `px`

Most layout dimensions and breakpoints use `rem`.

Example:

```css
@media (min-width: 48rem)
```

instead of:

```css
@media (min-width: 768px)
```

Common sizing also uses `rem`:

```css
width: 2rem;
min-height: 4rem;
max-width: 40rem;
gap: 1.5rem;
```

Benefits include:

- better scaling with user font preferences
- consistent relationship with typography
- easier responsive reasoning
- improved accessibility
- fewer arbitrary pixel measurements

Pixels are not forbidden, but they should generally be reserved for cases such as very fine visual details when appropriate.

---

# Why Not `em` Everywhere?

`em` depends on the current element's font size.

That can cause nested components to scale unexpectedly.

`rem` always references the root font size, making dimensions more predictable across deeply nested UI.

Use `em` when scaling relative to a specific component's typography is intentional.

Use `rem` for most page-level sizing.

---

# CSS Grid vs Flexbox

A useful rule used throughout Nexora:

### Use Grid for layout structure

```css
.features__workspace {
    display: grid;

    grid-template-columns:
        20rem
        minmax(0, 1fr);
}
```

Grid works well when rows and columns define the layout.

### Use Flexbox for directional relationships

```css
.footer__status {
    display: flex;
    align-items: center;
    gap: var(--saas-space-2);
}
```

Flexbox works well for:

- icon + text
- button contents
- navigation rows
- vertical stacks
- status indicators

A simple mental model:

```text
2D layout → Grid
1D layout → Flexbox
```

---

# `minmax(0, 1fr)`

This pattern appears frequently:

```css
grid-template-columns:
    20rem
    minmax(0, 1fr);
```

Using only:

```css
1fr
```

can allow intrinsic content width to prevent a Grid child from shrinking.

Using:

```css
minmax(0, 1fr)
```

explicitly allows the track to shrink to `0`, helping prevent unexpected horizontal overflow.

This is particularly useful around:

- terminal content
- dashboards
- charts
- long text
- complex visualizations

---

# BEM-Style CSS

Components use descriptive BEM-style classes:

```css
.developer-terminal {}
.developer-terminal__header {}
.developer-terminal__line {}
.developer-terminal__result {}
.developer-terminal--animate {}
```

Benefits:

- predictable ownership
- low selector specificity
- easier debugging
- minimal style leakage
- easier future modification

Avoid deep selectors such as:

```css
.page .section div ul li span {}
```

Prefer:

```css
.footer__navigation-link {}
```

---

# CSS Property Ordering

Properties follow a consistent order:

```text
1. display / layout
2. position
3. flex / grid
4. dimensions
5. padding
6. border
7. margin
8. typography / text
9. color / background
10. effects
11. transform
12. interaction
13. transition / animation
```

Example:

```css
.example {
    display: flex;
    align-items: center;

    position: relative;

    flex-shrink: 0;

    width: 2rem;
    height: 2rem;
    padding: 0.5rem;
    border: 1px solid var(--saas-color-border);
    margin-top: 1rem;

    font-size: var(--saas-text-sm);

    color: var(--saas-color-text-primary);
    background: var(--saas-color-surface-1);

    opacity: 0.8;

    transform: translateY(0);

    cursor: pointer;

    transition: opacity var(--saas-motion-fast) var(--saas-ease);
}
```

Blank lines separate major property groups.

---

# Responsive CSS Comments

Responsive rules document what they override.

Example:

```css
/*
 * OVERRIDES BASE / MOBILE:
 *
 * Base:
 *   grid-template-columns: minmax(0, 1fr);
 *
 * 64REM+:
 *   Content becomes an asymmetric two-column layout.
 *   The visualization receives more space because it
 *   contains the primary interactive content.
 */
.example {
    grid-template-columns:
        minmax(18rem, 0.8fr)
        minmax(32rem, 1.2fr);
}
```

The goal is to explain **why the breakpoint exists**, not merely repeat the CSS.

---

# React State vs CSS

React controls **application state**.

CSS controls **appearance**.

Example:

```tsx
const [activeFeature, setActiveFeature] = useState("autoscaling");
```

React determines which feature is active.

CSS determines how that active state looks.

Avoid imperative styling such as:

```tsx
element.style.background = "...";
element.style.display = "...";
```

unless a calculation or animation genuinely requires direct DOM interaction.

---

# Intersection Observer

Several visualizations start when they enter the viewport.

Typical pattern:

```tsx
useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
        return;
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setShouldAnimate(true);
                observer.disconnect();
            }
        },
        {
            threshold: 0.3,
        },
    );

    observer.observe(element);

    return () => observer.disconnect();
}, []);
```

Use this when an animation should begin only after the user reaches the component.

This is useful for:

- terminal sequences
- charts
- deployment pipelines
- infrastructure visualizations

---

# GSAP

GSAP is reserved for animation that would become difficult or fragile with CSS alone.

The largest example is:

```text
GlobalArchitecture
```

That section uses GSAP and ScrollTrigger to transform an infrastructure diagram into a global deployment network.

Conceptually:

```ts
const timeline = gsap.timeline({
    scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=...",
        scrub: true,
        pin: true,
    },
});
```

GSAP handles:

- pinned scroll sequences
- timeline coordination
- multiple dependent animation stages
- SVG network formation
- region pulses
- continuous traffic animation
- reversing state when scrolling backward

### Rule

```text
Simple hover/fade → CSS
State-driven UI → React + CSS
Viewport trigger → IntersectionObserver
Complex coordinated animation → GSAP
Scroll-linked animation → GSAP ScrollTrigger
```

---

# SVG Path Animation

Global Architecture uses SVG paths for network routes.

Traffic packets follow the actual path geometry with:

```ts
const pathLength = path.getTotalLength();
const point = path.getPointAtLength(progress * pathLength);
```

The returned point determines packet position:

```ts
gsap.set(packet, {
    x: point.x,
    y: point.y,
});
```

This is significantly more reliable than manually approximating curved route coordinates.

Remember:

```text
getTotalLength()
getPointAtLength()
```

when something needs to physically follow an SVG path.

---

# CSS Custom Properties From React

Inline styles are avoided unless they communicate calculated values to CSS.

Example:

```tsx
style={{
    "--terminal-line-order": index,
} as CSSProperties}
```

CSS then handles the visual behavior:

```css
animation-delay:
    calc(
        250ms +
        (var(--terminal-line-order) * 320ms)
    );
```

This keeps React responsible for **data/order** and CSS responsible for **animation**.

---

# Accordion Without Measuring Heights

The FAQ uses CSS Grid instead of JavaScript `scrollHeight`.

Closed:

```css
.faq__panel {
    display: grid;

    grid-template-rows: 0fr;
}
```

Open:

```css
.faq__item--open
.faq__panel {
    grid-template-rows: 1fr;
}
```

The inner element requires:

```css
.faq__panel-inner {
    min-height: 0;

    overflow: hidden;
}
```

This creates a smooth unknown-height accordion without manually calculating element height.

---

# Accessibility

Accessibility is part of the component architecture rather than a final patch.

## Semantic HTML

Use elements according to their purpose:

```html
<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
<button>
```

Do not replace everything with `<div>`.

---

## Buttons vs Links

Use:

```html
<button>
```

for actions.

Use:

```html
<a>
```

for navigation.

Do not use clickable `<div>` elements when a native interactive element already exists.

---

## Focus States

Interactive elements receive visible keyboard focus:

```css
.button:focus-visible {
    outline: 2px solid var(--saas-color-cyan-400);
    outline-offset: 0.25rem;
}
```

Never globally remove focus outlines without providing an accessible replacement.

---

## Decorative Icons

Decorative Lucide icons use:

```tsx
aria-hidden="true"
```

Example:

```tsx
<Cloud
    size={18}
    strokeWidth={1.7}
    aria-hidden="true"
/>
```

This prevents screen readers from announcing meaningless decorative graphics.

---

## Accessible Accordion

FAQ buttons expose state:

```tsx
aria-expanded={isOpen}
aria-controls={panelId}
```

The answer references its controlling button:

```tsx
role="region"
aria-labelledby={triggerId}
```

This establishes the relationship between trigger and content for assistive technology.

---

# Reduced Motion

Every meaningful animation should consider:

```css
@media (prefers-reduced-motion: reduce) {
    .example {
        animation: none;
        transition: none;
    }
}
```

For JavaScript/GSAP animation, check the user's motion preference before creating unnecessary animation.

Reduced motion should not remove information.

It should show the component in a stable completed state whenever possible.

---

# Color Semantics

Nexora uses color intentionally.

```text
Cyan   → brand / interaction
Green  → healthy / successful
Amber  → warning / attention
Red    → failure / destructive
```

Semantic colors should not become decoration.

For example, green means something is healthy:

```css
color: var(--saas-color-green);
```

It should not be used simply because a section needs more color.

The approximate visual balance is:

```text
80% navy / slate
15% white / gray
5% accent / status
```

---

# Icons

The template uses **Lucide React** for general UI icons.

Example:

```tsx
import {
    Cloud,
    Server,
    Terminal,
} from "lucide-react";
```

Use consistent thin strokes:

```tsx
strokeWidth={1.7}
```

Do not automatically place every icon inside a glowing rounded square.

Icons should support information hierarchy rather than become decoration.

### Brand Icons

Lucide is not a brand-logo library.

For example, do not use a generic icon as an official GitHub logo.

If an actual brand logo is required, use the brand's official SVG asset.

---

# Animation Philosophy

Animation should explain something.

Good uses:

- deployment progression
- autoscaling
- network traffic
- infrastructure formation
- health changes
- terminal execution
- state transitions

Avoid animation simply because an element exists.

The page intentionally alternates between high-motion and quiet sections:

```text
Hero
↓
Product interaction
↓
Story
↓
Global Architecture animation
↓
Features interaction
↓
Integrations
↓
Metrics
↓
Developer Terminal animation
↓
Pricing
↓
Testimonials
↓
FAQ interaction
↓
Final CTA
↓
Footer
```

Not every section needs to be a spectacle.

---

# Comments

Comments should explain **why**, not restate the property.

Bad:

```css
/* Set display to grid */
display: grid;
```

Useful:

```css
/*
 * The visualization receives more horizontal space because
 * it contains the primary interactive content while the
 * navigation only needs enough width for its labels.
 */
grid-template-columns:
    20rem
    minmax(0, 1fr);
```

Comment heavily around:

- GSAP
- ScrollTrigger
- IntersectionObserver
- SVG geometry
- custom properties
- Grid placement
- breakpoint overrides
- accessibility decisions
- unusual selectors
- animation lifecycle
- non-obvious React state

The purpose is to make the implementation understandable months later.

---

# Quick Reference

When building another template, remember:

```text
Responsive
→ Start with mobile
→ Add complexity only when space allows
→ Prefer rem breakpoints

Layout
→ Grid for 2D structure
→ Flexbox for 1D relationships
→ minmax(0, 1fr) prevents many overflow problems

Styling
→ Components own their CSS
→ Global files own the design system
→ Use BEM-style descriptive classes
→ Keep specificity low

React
→ State controls behavior
→ CSS controls appearance
→ Avoid imperative element.style manipulation

Animation
→ CSS for simple transitions
→ IntersectionObserver for viewport triggers
→ GSAP for timelines
→ ScrollTrigger for scroll-linked sequences

SVG
→ getTotalLength()
→ getPointAtLength()
→ useful for moving objects along paths

Accessibility
→ Semantic HTML
→ Native buttons and links
→ Visible :focus-visible states
→ aria-hidden for decorative icons
→ aria-expanded / aria-controls for accordions
→ prefers-reduced-motion

Sizing
→ rem for most dimensions
→ rem for breakpoints
→ tokens for repeated values

Maintainability
→ Comment WHY
→ Document breakpoint overrides
→ Keep each section independently understandable
```

---

# Final Reminder

The goal of this template was not simply to make a polished SaaS landing page.

It was to practice building a frontend that is:

**responsive, accessible, maintainable, interactive, explainable, and visually intentional.**

When reusing techniques from Nexora in future projects, copy the **reasoning and implementation patterns**, not necessarily the visual design.