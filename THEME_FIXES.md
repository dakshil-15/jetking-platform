# Light/Dark Theme Color Fixes

## Summary
Fixed light/dark theme support across all pages to ensure colors update correctly when users toggle between light and dark modes.

## Issues Fixed

### 1. **Dark Canvas Pages Not Responding to Theme Toggle**
   - **Problem**: Pages using `.dark-canvas` class (courses, centres, blog) always stayed dark
   - **Solution**: Added `:where(:not(.dark)) .dark-canvas` CSS rules with light-mode color overrides
   - **Files**: `/src/styles/dark-canvas.css`

### 2. **Missing Dark Mode Colors in Themed Pages**
   - **Problem**: Several pages had only dark mode colors defined, no light mode support
   - **Solution**: Added `html:not(.dark)` CSS rules with light-mode overrides
   - **Files**:
     - `/src/styles/blog.css` - Added light mode palette
     - `/src/styles/centres.css` - Added light mode palette with track accent colors

### 3. **Incomplete Theme Support Across Styles**
   - **Status**: ✓ Verified complete theme support on:
     - `/src/styles/globals.css` - Global theme tokens (light & dark)
     - `/src/styles/home.css` - Home v1 & v2 themes  
     - `/src/styles/professional.css` - Professional page theme
     - `/src/styles/student.css` - Student page theme
     - `/src/styles/dark-canvas.css` - Dark canvas pages (NOW FIXED)
     - `/src/styles/blog.css` - Blog pages (NOW FIXED)
     - `/src/styles/centres.css` - Centres page (NOW FIXED)

## CSS Variables Defined

### Light Mode Colors (in :not(.dark))
- **Canvas**: White (#ffffff) with subtle gradients
- **Surfaces**: Light grays (#f8f9fb, #f1f3f7)
- **Text**: Dark grays (#1d2939, #344054, #667085)
- **Accents**: Jetking red (#ea1c24, #d81f26)
- **Borders**: Subtle lines with low opacity
- **Shadows**: Light, subtle drop shadows

### Dark Mode Colors (in .dark)
- **Canvas**: Near-black (#07070c, #0b111e)
- **Surfaces**: Dark grays (#0c0c12, #101828)
- **Text**: Light grays & white (#f4f4f8, #ffffff)
- **Accents**: Bright red (#e8242b, #ff6b70)
- **Borders**: White with low opacity
- **Shadows**: Dark, dramatic drop shadows

## Theme System Flow

1. **Initial Load**: `theme-script` runs before render
   - Checks localStorage for saved theme
   - Sets `.dark` class on `<html>` element
   - Sets `colorScheme` CSS property

2. **During Use**: User clicks theme toggle
   - `toggleTheme()` saves preference to localStorage
   - Theme provider updates `.dark` class
   - CSS rules respond to class presence/absence

3. **CSS Application**: Two selector patterns
   - `html.dark` / `.dark` → Dark mode colors
   - `html:not(.dark)` / `:not(.dark)` → Light mode colors

## Testing Recommendations

- [ ] Test homepage in both light and dark modes
- [ ] Test blog pages with theme toggle
- [ ] Test courses page with theme toggle
- [ ] Test centres page with theme toggle
- [ ] Verify text contrast meets WCAG AA on both modes
- [ ] Test on mobile and desktop viewports
- [ ] Verify theme persists across page reloads
- [ ] Test on multiple browsers

## Files Modified

1. `/src/styles/dark-canvas.css` - Added light mode overrides
2. `/src/styles/blog.css` - Added light mode overrides
3. `/src/styles/centres.css` - Added light mode overrides

## No Changes Needed

- `/src/styles/globals.css` - Already had complete dark mode
- `/src/styles/home.css` - Already had complete dark mode
- `/src/styles/professional.css` - Already had complete dark mode  
- `/src/styles/student.css` - Already had complete dark mode
- `/src/styles/franchise.css` - Uses student.css tokens
- `/src/styles/parent.css` - Uses student.css tokens
- `/src/styles/chatbot.css` - Already has dark mode support
