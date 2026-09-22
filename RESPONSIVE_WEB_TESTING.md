# Responsive Web Testing Specification

## Purpose

This document defines the responsive web development and QA requirements for a modern website.

The objective is to ensure that the website:

* Works across mobile, tablet, laptop, desktop, and large displays.
* Responds correctly to different viewport widths and heights.
* Supports portrait and landscape orientations.
* Handles modern foldable and unusual viewport configurations.
* Remains usable at browser zoom levels and accessibility text scaling.
* Works with touch, mouse, keyboard, and hybrid input devices.
* Handles safe areas, notches, dynamic browser UI, and mobile viewport changes.
* Maintains visual consistency without relying on device-specific hacks.
* Uses fluid responsive behavior rather than designing exclusively around named devices.

---

# 1. Core Responsive Principles

## 1.1 CSS viewport is the source of truth

Responsive layouts MUST be based on the CSS viewport rather than physical device resolution.

Do NOT create layouts based exclusively on:

* Physical screen resolution
* Device model names
* Device pixel dimensions
* Pixel density
* Retina resolution

For example, a device with a physical resolution of:

```text
1179 × 2556
```

may expose a very different CSS viewport to the website.

Use CSS pixels and responsive layout rules.

---

# 2. Supported Viewport Widths

The website MUST be tested across the following representative CSS viewport widths.

## 2.1 Mobile

| Width | Category                                |
| ----: | ---------------------------------------- |
| 320px | Small mobile                            |
| 360px | Standard mobile                         |
| 375px | Mobile                                  |
| 390px | Modern large mobile                     |
| 393px | Modern mobile                           |
| 402px | Modern mobile                           |
| 412px | Large mobile                            |
| 414px | Large mobile                            |
| 430px | Extra-large mobile                      |
| 480px | Large Android / small tablet-like width |

### Minimum mobile requirement

The website MUST remain usable at:

```text
320px
```

No horizontal scrolling should occur unless horizontal scrolling is an intentional part of the UI.

---

# 3. Mobile Height Testing

Width alone is insufficient.

Test multiple heights at representative mobile widths.

Recommended:

```text
320 × 568
320 × 640

360 × 640
360 × 740
360 × 800

375 × 667
375 × 812

390 × 667
390 × 844
390 × 852
390 × 932

393 × 852

402 × 874

412 × 915

414 × 896

430 × 932
```

Check for:

* Hero sections
* Sticky navigation
* Bottom navigation
* Modals
* Dropdowns
* Cookie banners
* Fixed buttons
* Chat widgets
* Forms
* Keyboard interactions
* Content clipping

---

# 4. Mobile Orientation

Every major mobile layout MUST be tested in both orientations.

## Portrait

Examples:

```text
320 × 568
360 × 800
390 × 844
412 × 915
430 × 932
```

## Landscape

Examples:

```text
568 × 320
640 × 360
667 × 375
800 × 360
844 × 390
915 × 412
932 × 430
```

The layout MUST NOT assume that a mobile device is always portrait.

---

# 5. Tablet Viewports

Test the following widths:

|  Width | Category                  |
| -----: | -------------------------- |
|  600px | Small tablet              |
|  640px | Small tablet              |
|  667px | Tablet / landscape mobile |
|  720px | Tablet                    |
|  744px | Tablet                    |
|  768px | Standard tablet           |
|  800px | Tablet                    |
|  820px | Modern tablet             |
|  834px | Large tablet              |
|  900px | Large tablet              |
|  960px | Large tablet              |
| 1024px | Tablet / small desktop    |

---

# 6. Tablet Height Testing

Recommended representative viewports:

```text
600 × 960
640 × 1024

768 × 1024
800 × 1280

820 × 1180
834 × 1194

900 × 1200

1024 × 1366
```

Also test landscape:

```text
1024 × 768
1180 × 820
1194 × 834
1280 × 800
1366 × 1024
```

---

# 7. Laptop Viewports

Test:

```text
1024 × 768
1152 × 768
1280 × 720
1280 × 800
1280 × 960
1366 × 768
1366 × 864
1440 × 900
1440 × 960
1536 × 864
1536 × 960
1600 × 900
1680 × 1050
```

Pay particular attention to:

* Navigation
* Multi-column layouts
* Sidebars
* Tables
* Data-heavy interfaces
* Hero sections
* Cards
* Modal widths
* Maximum content width

---

# 8. Desktop Viewports

Test:

```text
1280 × 720
1280 × 800

1366 × 768
1366 × 864

1440 × 900
1440 × 1080

1536 × 864
1536 × 960

1600 × 900

1680 × 1050

1920 × 1080
1920 × 1200
```

The layout MUST NOT become excessively stretched on large displays.

Use a sensible maximum content width.

Example:

```css
.container {
  width: min(100% - 32px, 1200px);
  margin-inline: auto;
}
```

The exact maximum width may vary according to the design.

---

# 9. Large and Ultra-Wide Displays

Test:

```text
1920 × 1080
1920 × 1200

2560 × 1440
2560 × 1600

3440 × 1440

3840 × 2160

5120 × 2880

6016 × 3384

7680 × 4320
```

Requirements:

* Content must remain readable.
* Text should not span excessively wide lines.
* Navigation should remain usable.
* Cards should not become unnecessarily enormous.
* Images should maintain appropriate aspect ratios.
* Main content should use a maximum width where appropriate.
* Backgrounds may span the viewport while content remains constrained.

---

# 10. Recommended Responsive Breakpoints

Do not treat these as mandatory device breakpoints.

Breakpoints should be selected based on where the content needs to change.

A reasonable starting point is:

```css
/* Mobile first */

/* Small tablet */
@media (min-width: 600px) {
}

/* Tablet */
@media (min-width: 768px) {
}

/* Small desktop */
@media (min-width: 1024px) {
}

/* Desktop */
@media (min-width: 1280px) {
}

/* Large desktop */
@media (min-width: 1536px) {
}

/* Very large screens */
@media (min-width: 1920px) {
}
```

Do NOT create a separate breakpoint for every device.

---

# 11. Content-Driven Breakpoints

Before adding a breakpoint, determine:

1. What content is breaking?
2. Why does the current layout no longer work?
3. Can fluid CSS solve the problem?
4. Can flexbox or grid solve the problem?
5. Can container queries solve the problem?
6. Is the breakpoint genuinely necessary?

Avoid device-specific code such as:

```css
/* Avoid */
@media (width: 390px) {
}

@media (width: 393px) {
}

@media (width: 412px) {
}
```

Prefer ranges:

```css
@media (min-width: 768px) {
}
```

or fluid behavior.

---

# 12. Fluid Responsive Design

Prefer fluid values when appropriate.

Example:

```css
font-size: clamp(1rem, 2vw, 1.5rem);
```

```css
padding-inline: clamp(1rem, 4vw, 4rem);
```

```css
gap: clamp(0.75rem, 2vw, 2rem);
```

Use:

* `clamp()`
* `%`
* `rem`
* `em`
* `vw`
* `vh`
* `dvh`
* CSS Grid
* Flexbox
* Container queries
* `min()`
* `max()`

Avoid excessive hardcoded pixel dimensions.

---

# 13. Container Queries

Where components need to respond to their own available space, consider container queries.

Example:

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 600px) {
  .card {
    grid-template-columns: 1fr 1fr;
  }
}
```

Do not rely exclusively on viewport media queries for reusable components.

---

# 14. Mobile Navigation

Test navigation at:

```text
320px
360px
375px
390px
412px
430px
480px
600px
768px
820px
1024px
```

Check:

* Logo
* Menu button
* Navigation links
* Dropdowns
* Search
* Account controls
* CTA buttons
* Overflow
* Focus state
* Touch target size
* Menu scrolling
* Menu closing
* Escape key
* Outside-click behavior

No navigation item should be:

* clipped
* inaccessible
* overlapping another element
* impossible to tap
* hidden without an alternative

---

# 15. Touch Targets

Interactive controls MUST have adequate touch target dimensions.

Test:

* Buttons
* Links
* Icons
* Checkboxes
* Radio buttons
* Dropdowns
* Tabs
* Pagination
* Close buttons
* Hamburger menus

Avoid tiny icon-only controls.

Where possible, use sufficiently large interactive areas rather than relying only on the visible icon dimensions.

---

# 16. Safe Areas

Modern mobile devices may have:

* Notches
* Rounded corners
* Home indicators
* Camera cutouts
* Status bars

Test layouts with safe-area insets.

Example:

```css
padding-top: env(safe-area-inset-top);
padding-right: env(safe-area-inset-right);
padding-bottom: env(safe-area-inset-bottom);
padding-left: env(safe-area-inset-left);
```

For bottom-fixed UI:

```css
padding-bottom: calc(
  16px + env(safe-area-inset-bottom)
);
```

Verify:

* Bottom navigation
* Fixed CTA
* Cookie banners
* Modals
* Chat widgets
* Sticky controls

---

# 17. Viewport Height

Do not assume:

```css
height: 100vh;
```

is always equivalent to the visible mobile browser height.

Where appropriate, use:

```css
min-height: 100dvh;
```

Consider:

```css
svh
lvh
dvh
```

Test when:

* Browser address bar is visible
* Browser address bar collapses
* Keyboard opens
* Keyboard closes
* Device rotates

---

# 18. Foldable Devices

The website MUST remain usable on foldable devices.

Test:

* Folded state
* Unfolded state
* Narrow viewport
* Wide viewport
* Portrait
* Landscape
* Transition between states

Potential viewport ranges:

```text
320–420px
600–720px
720–1000px+
```

Do not assume a tablet-width viewport always represents a conventional tablet.

---

# 19. Browser Zoom

Test desktop browser zoom at:

```text
80%
90%
100%
110%
125%
150%
175%
200%
```

At 200% zoom:

* Content must remain accessible.
* Text must not overlap.
* Controls must remain usable.
* Horizontal scrolling should be minimized.
* Important content must not disappear.
* Navigation must remain accessible.

---

# 20. Text Scaling

Test increased text sizes where supported.

Check:

* Headings
* Paragraphs
* Buttons
* Navigation
* Forms
* Tables
* Cards
* Modals
* Error messages
* Toasts

Never rely on fixed heights for content containers containing text unless there is a strong reason.

Avoid:

```css
height: 50px;
overflow: hidden;
```

for dynamic text content.

Prefer:

```css
min-height: 50px;
```

when appropriate.

---

# 21. Accessibility

Test:

* Keyboard navigation
* Screen reader navigation
* Focus indicators
* Skip links
* Heading hierarchy
* Semantic HTML
* Form labels
* Error messages
* ARIA where necessary
* Color contrast
* Reduced motion
* Text scaling
* Zoom

Keyboard-only users MUST be able to access every interactive function.

---

# 22. Keyboard Testing

Use:

```text
Tab
Shift + Tab
Enter
Space
Escape
Arrow keys
Home
End
```

Check:

* Navigation
* Dropdowns
* Dialogs
* Forms
* Menus
* Tabs
* Accordions
* Pagination
* Custom controls

Focus MUST remain visible.

---

# 23. Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce) {
}
```

Animations should be reduced or disabled where appropriate.

Test:

* Page transitions
* Carousels
* Scroll animations
* Hover animations
* Modal animations
* Loading animations

---

# 24. Color Scheme

Test:

```text
Light mode
Dark mode
System preference
```

Check:

* Text contrast
* Borders
* Icons
* Images
* Forms
* Disabled controls
* Focus indicators
* Error states
* Success states
* Hover states

Do not communicate important information using color alone.

---

# 25. Input Methods

Test:

## Touch

* Tap
* Swipe
* Scroll
* Long press
* Touch drag

## Mouse

* Click
* Hover
* Right click where applicable
* Scroll
* Drag

## Keyboard

* Tab
* Enter
* Space
* Escape
* Arrow keys

## Hybrid

Test devices that support:

* Touch + mouse
* Touch + keyboard
* Stylus + touch
* Trackpad + keyboard

---

# 26. Hover Behavior

Do not make critical functionality available only through hover.

Bad:

```text
Hover → reveals only way to access content
```

Better:

```text
Click/tap → accessible interaction
Hover → optional enhancement
```

Test hover-dependent UI on touch devices.

---

# 27. Forms

Test forms at all major viewport categories.

Check:

* Input widths
* Labels
* Placeholder text
* Validation
* Error messages
* Keyboard
* Autocomplete
* Password fields
* Date fields
* Select controls
* Checkboxes
* Radio buttons
* Submit buttons

Test long error messages.

Example:

```text
Your password must contain at least 12 characters, one uppercase
letter, one lowercase letter, one number, and one special character.
```

The UI must expand rather than clip the message.

---

# 28. Tables

Tables require special responsive treatment.

Test:

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1280px+
* 1920px+

Possible strategies:

* Horizontal scrolling
* Responsive column reduction
* Stacked rows
* Card transformation
* Priority columns

Do not simply shrink a complex table until it becomes unreadable.

---

# 29. Images

Test images at:

```text
320px
390px
768px
1024px
1440px
1920px
2560px+
```

Verify:

* Correct aspect ratio
* No unexpected stretching
* Appropriate cropping
* Lazy loading
* Responsive image sizes
* `srcset`
* `sizes`
* WebP/AVIF where appropriate
* Alt text
* Loading states

---

# 30. Typography

Test:

* Very small viewport
* Very large viewport
* Long headings
* Short headings
* Long paragraphs
* Large text
* Small text
* User text scaling

Check for:

* Orphaned headings
* Overflow
* Unwanted wrapping
* Excessive line length
* Incorrect line height
* Button text wrapping
* Navigation text wrapping

---

# 31. Content Stress Testing

Responsive QA MUST include unusual content.

Test:

```text
Short title
Very long title

Short name
Very long name

Short button label
Very long button label

1 item
100 items
10,000 items

Empty state
Loading state
Error state
Success state
```

The layout should respond to content rather than assuming ideal content.

---

# 32. Localization

If the website supports multiple languages, test:

* English
* Long-word languages
* Languages with different text lengths
* RTL languages if supported
* Different date formats
* Different number formats
* Currency formats

RTL example:

```text
English:
Navigation → Content

RTL:
Content ← Navigation
```

---

# 33. Browser Testing

At minimum test modern versions of:

* Chrome
* Safari
* Firefox
* Edge

Also test:

* Mobile Safari
* Chrome Android

Where relevant, test embedded browsers/webviews such as:

* In-app browsers
* Social media browsers
* WebViews
* PWA environments

Do not assume that a website working in desktop Chrome means it works everywhere.

---

# 34. Browser Feature Differences

Check:

* CSS Grid
* Flexbox
* Container queries
* `dvh`
* `svh`
* `lvh`
* `clamp()`
* `aspect-ratio`
* `backdrop-filter`
* Sticky positioning
* Dialog behavior
* Form controls
* Date inputs
* File inputs

Provide fallbacks where required.

---

# 35. Network Conditions

Test:

```text
Fast connection
Normal connection
Slow connection
Offline
Intermittent connection
```

Check:

* Loading indicators
* Skeleton screens
* Image loading
* API failures
* Retry behavior
* Offline states
* Cached content
* Error messages

---

# 36. Performance Testing

Measure:

* First Contentful Paint
* Largest Contentful Paint
* Cumulative Layout Shift
* Interaction to Next Paint
* JavaScript execution
* Image size
* CSS size
* Font loading
* API latency

Watch for:

* Layout shifts
* Oversized images
* Blocking JavaScript
* Excessive animations
* Large bundles
* Unnecessary requests

---

# 37. Layout Stability

During loading:

```text
Header should not jump.
Images should reserve space.
Fonts should not cause major layout shifts.
Buttons should not move unexpectedly.
Content should not shift significantly.
```

Use explicit image dimensions or aspect ratios where appropriate.

Example:

```css
img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```

---

# 38. Fixed and Sticky Elements

Test:

* Sticky header
* Sticky sidebar
* Bottom navigation
* Floating action buttons
* Chat widgets
* Cookie banners
* Fixed CTA buttons

Verify they do not:

* Cover content
* Cover form controls
* Block keyboard focus
* Overlap each other
* Extend outside the viewport
* Ignore safe-area insets

---

# 39. Modals and Dialogs

Test at:

```text
320 × 568
360 × 640
390 × 844
430 × 932
768 × 1024
1024 × 768
1440 × 900
1920 × 1080
```

Check:

* Open
* Close
* Escape
* Outside click where appropriate
* Keyboard focus
* Screen reader behavior
* Scrolling
* Long content
* Short content
* Mobile keyboard
* Landscape

---

# 40. Dropdowns and Menus

Verify:

* Menu fits within viewport.
* Menu does not render off-screen.
* Long menu items wrap correctly.
* Touch interaction works.
* Keyboard interaction works.
* Escape closes the menu.
* Focus is handled correctly.
* Nested menus remain usable.

---

# 41. Horizontal Overflow

At every supported viewport, check:

```javascript
document.documentElement.scrollWidth
document.documentElement.clientWidth
```

Unexpected horizontal overflow MUST be investigated.

Common causes:

* Fixed-width elements
* Large images
* Long text
* Absolute positioning
* Negative margins
* Wide tables
* Third-party widgets
* Long URLs
* Code blocks

---

# 42. Minimum Acceptance Criteria

A responsive implementation is considered acceptable only when:

* [ ] No unintended horizontal scrolling exists.
* [ ] Content is readable at 320px width.
* [ ] Layout works at 360px.
* [ ] Layout works at 390px.
* [ ] Layout works at 430px.
* [ ] Layout works at 768px.
* [ ] Layout works at 1024px.
* [ ] Layout works at 1280px.
* [ ] Layout works at 1440px.
* [ ] Layout works at 1920px.
* [ ] Layout remains reasonable at 2560px+.
* [ ] Portrait works.
* [ ] Landscape works.
* [ ] Foldable-like widths work.
* [ ] Browser zoom up to 200% is usable.
* [ ] Keyboard navigation works.
* [ ] Touch interaction works.
* [ ] Focus indicators are visible.
* [ ] Forms remain usable.
* [ ] Modals remain usable.
* [ ] Navigation remains usable.
* [ ] Images do not distort.
* [ ] Text does not unexpectedly overflow.
* [ ] Long content does not break the layout.
* [ ] Loading states work.
* [ ] Error states work.
* [ ] Empty states work.
* [ ] Dark/light modes work if supported.
* [ ] Reduced motion is respected.
* [ ] Safe areas are handled.
* [ ] Mobile viewport height behavior is correct.
* [ ] Performance is acceptable.
* [ ] Accessibility checks pass.

---

# 43. Recommended QA Matrix

Use this as the minimum regression matrix:

| ID  | Width | Height | Orientation | Category      |
| --- | ----: | -----: | ----------- | -------------- |
| M01 |   320 |    568 | Portrait    | Small mobile  |
| M02 |   360 |    800 | Portrait    | Mobile        |
| M03 |   375 |    812 | Portrait    | Mobile        |
| M04 |   390 |    844 | Portrait    | Modern mobile |
| M05 |   393 |    852 | Portrait    | Modern mobile |
| M06 |   412 |    915 | Portrait    | Large mobile  |
| M07 |   430 |    932 | Portrait    | Large mobile  |
| M08 |   667 |    375 | Landscape   | Mobile        |
| T01 |   600 |    960 | Portrait    | Small tablet  |
| T02 |   768 |   1024 | Portrait    | Tablet        |
| T03 |   820 |   1180 | Portrait    | Tablet        |
| T04 |   834 |   1194 | Portrait    | Tablet        |
| T05 |  1024 |    768 | Landscape   | Tablet        |
| L01 |  1024 |    768 | Landscape   | Laptop        |
| L02 |  1280 |    720 | Landscape   | Laptop        |
| L03 |  1366 |    768 | Landscape   | Laptop        |
| L04 |  1440 |    900 | Landscape   | Desktop       |
| L05 |  1536 |    864 | Landscape   | Desktop       |
| D01 |  1920 |   1080 | Landscape   | Full HD       |
| D02 |  2560 |   1440 | Landscape   | 2K/QHD        |
| D03 |  3840 |   2160 | Landscape   | 4K            |
| D04 |  5120 |   2880 | Landscape   | 5K            |

---

# 44. Priority Test Matrix

If time is limited, test these first:

```text
320 × 568
360 × 800
390 × 844
430 × 932
768 × 1024
1024 × 768
1280 × 720
1366 × 768
1440 × 900
1920 × 1080
2560 × 1440
3840 × 2160
```

Then test:

```text
Portrait
Landscape
200% zoom
Keyboard navigation
Touch interaction
Long content
Long forms
Modal dialogs
Slow network
Dark mode
Reduced motion
```

---

# 45. Responsive Development Checklist

## Layout

* [ ] Mobile-first CSS
* [ ] Fluid containers
* [ ] Appropriate max-width
* [ ] Responsive grid
* [ ] Responsive flex layouts
* [ ] No unnecessary fixed widths
* [ ] No unnecessary fixed heights
* [ ] Content-driven breakpoints
* [ ] Container queries where appropriate

## Typography

* [ ] Fluid font sizes
* [ ] Correct line height
* [ ] Long text tested
* [ ] Text scaling tested
* [ ] 200% zoom tested

## Navigation

* [ ] Mobile menu
* [ ] Tablet navigation
* [ ] Desktop navigation
* [ ] Keyboard accessible
* [ ] Touch accessible
* [ ] Dropdown positioning
* [ ] Focus management

## Components

* [ ] Buttons
* [ ] Cards
* [ ] Forms
* [ ] Tables
* [ ] Modals
* [ ] Tabs
* [ ] Accordions
* [ ] Dropdowns
* [ ] Tooltips
* [ ] Toasts
* [ ] Pagination

## Mobile

* [ ] Safe areas
* [ ] Dynamic viewport height
* [ ] Touch targets
* [ ] Keyboard behavior
* [ ] Landscape
* [ ] Foldable-like widths
* [ ] Browser chrome changes

## Accessibility

* [ ] Keyboard
* [ ] Screen reader
* [ ] Focus
* [ ] Contrast
* [ ] Reduced motion
* [ ] Text scaling
* [ ] Semantic HTML

## Performance

* [ ] Images optimized
* [ ] Fonts optimized
* [ ] JavaScript optimized
* [ ] CSS optimized
* [ ] Layout shift minimized
* [ ] Slow network tested
* [ ] Loading states implemented

---

# 46. Claude Testing Instructions

When using Claude to test a website implementation, Claude should evaluate the website against this specification.

For each viewport, inspect:

1. Overall layout
2. Header
3. Navigation
4. Hero
5. Main content
6. Cards
7. Forms
8. Tables
9. Footer
10. Fixed/sticky elements
11. Modals
12. Overflow
13. Typography
14. Images
15. Spacing
16. Interactive controls
17. Accessibility
18. Loading/error states

For every failure, report:

```text
Viewport:
Width:
Height:
Orientation:
Component:
Severity:
Problem:
Expected behavior:
Observed behavior:
Recommended fix:
```

Severity:

```text
P0 = Blocks core usage
P1 = Major responsive/accessibility issue
P2 = Noticeable issue
P3 = Minor visual issue
```

---

# 47. Claude Responsive QA Output Format

Claude should produce a report using this structure:

```markdown
# Responsive QA Report

## Executive Summary

Overall status:
Critical issues:
Major issues:
Minor issues:

## Viewport Results

| Viewport | Status | Issues |
|---|---|---|
| 320 × 568 | PASS/FAIL | ... |
| 360 × 800 | PASS/FAIL | ... |
| 390 × 844 | PASS/FAIL | ... |
| 430 × 932 | PASS/FAIL | ... |
| 768 × 1024 | PASS/FAIL | ... |
| 1024 × 768 | PASS/FAIL | ... |
| 1280 × 720 | PASS/FAIL | ... |
| 1440 × 900 | PASS/FAIL | ... |
| 1920 × 1080 | PASS/FAIL | ... |
| 2560 × 1440 | PASS/FAIL | ... |
| 3840 × 2160 | PASS/FAIL | ... |

## Critical Issues

### Issue 1

Viewport:
Component:
Severity:

Problem:

Expected:

Actual:

Recommended fix:

## Accessibility

Keyboard:
Focus:
Screen reader:
Contrast:
Zoom:
Reduced motion:

## Performance

LCP:
INP:
CLS:
Network:

## Final Checklist

- [ ] Mobile
- [ ] Tablet
- [ ] Desktop
- [ ] Large displays
- [ ] Landscape
- [ ] Foldable
- [ ] Keyboard
- [ ] Touch
- [ ] Zoom
- [ ] Accessibility
- [ ] Performance
```

---

# 48. Final Principle

The goal is NOT to make a separate design for every device.

The goal is:

```text
320px
   ↓
Fluid responsive layout
   ↓
Mobile
   ↓
Tablet
   ↓
Laptop
   ↓
Desktop
   ↓
Large desktop
   ↓
4K / 5K / 8K
```

The website should behave continuously across this range.

Use breakpoints when the **content requires a layout change**, not merely because a particular device exists.

The final implementation should be:

* Fluid
* Accessible
* Touch-friendly
* Keyboard-friendly
* Content-driven
* Device-independent
* Orientation-aware
* Foldable-aware
* High-resolution compatible
* Performance-conscious
* Robust against unusual content
* Robust against viewport changes

---

# 49. Definition of Done

Responsive development is complete only when:

> The website works correctly across the defined viewport matrix, orientations, input methods, zoom levels, accessibility settings, browser environments, and content conditions without unintended clipping, overflow, overlap, or loss of functionality.

A responsive website MUST adapt to the viewport rather than being optimized for a fixed list of device models.
