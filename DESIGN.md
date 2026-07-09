# Optimus Design System

## Overview

Optimus is a premium AI platform landing page built with a sophisticated, modern design system. The design emphasizes clarity, sophistication, and performance while maintaining an innovative, forward-thinking aesthetic.

---

## Color Palette

### Core Colors

All colors are defined using **OKLch color space** for perceptually uniform color selection and better dark mode support.

| Token | OKLch Value | Use Case |
|-------|-----------|----------|
| `--background` | `oklch(0.985 0.002 90)` | Page background (near white) |
| `--foreground` | `oklch(0.12 0.01 60)` | Primary text and foreground elements (dark) |
| `--primary` | `oklch(0.12 0.01 60)` | Primary brand color, buttons, accents |
| `--primary-foreground` | `oklch(0.985 0.002 90)` | Text on primary backgrounds |
| `--secondary` | `oklch(0.96 0.005 90)` | Secondary backgrounds, subtle surfaces |
| `--accent` | `oklch(0.92 0.01 90)` | Accent elements, highlights |
| `--muted` | `oklch(0.94 0.005 90)` | Muted backgrounds, disabled states |
| `--muted-foreground` | `oklch(0.45 0.02 60)` | Secondary text, subtle elements |
| `--border` | `oklch(0.88 0.01 90)` | Border colors, dividers |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Error and destructive actions |

### Chart Colors

A gradient of grays for data visualization:

- `--chart-1` through `--chart-5`: Monochromatic scale for charts and graphs

### Sidebar Colors

Specialized tokens for navigation sidebars:

- `--sidebar`: Sidebar background
- `--sidebar-foreground`: Sidebar text
- `--sidebar-primary`: Primary sidebar elements
- `--sidebar-accent`: Sidebar accent highlights

---

## Typography

### Font Stack

Three carefully selected typefaces optimize for both aesthetics and performance:

| Font | Usage | Source |
|------|-------|--------|
| **Instrument Sans** | Body text, UI elements, primary font | Google Fonts |
| **Instrument Serif** | Display headings, high-impact titles | Google Fonts |
| **JetBrains Mono** | Code, technical text, monospace content | Google Fonts |

### Type Scale

- **Display**: Large, impactful headlines using `font-display` class
- **Heading**: Prominent section titles
- **Body**: Standard paragraph and UI text at 14px minimum
- **Small**: Secondary information, captions

### Line Height

- **Body text**: `leading-relaxed` (1.625) or `leading-6` (1.5)
- **Headings**: `leading-tight` (1.25) for impact
- **Code**: `leading-relaxed` for readability

---

## Layout System

### Grid & Flexbox

**Priority Order:**

1. **Flexbox** (`flex items-center justify-between`) - Default for most layouts
2. **CSS Grid** (`grid grid-cols-3 gap-4`) - Complex 2D layouts only
3. **Avoid** - Floats, absolute positioning (unless critical)

### Spacing Scale

Uses Tailwind's semantic spacing scale:

```
Gap: gap-4, gap-x-2, gap-y-6
Padding: p-4, px-6, py-2
Margin: mx-2, my-4 (use gap instead when possible)
```

### Container Width

- **Mobile-first design** with responsive breakpoints
- **md:** Tablet and up
- **lg:** Desktop and up
- **xl:** Large screens

---

## Visual Elements & Animations

### Custom Utilities (from globals.css)

#### `.marquee` and `.marquee-reverse`
Horizontal scrolling animation for showcasing integrations or logos.

```css
animation: marquee 30s linear infinite;
animation: marquee-reverse 25s linear infinite;
```

#### `.line-reveal`
Text or content reveal animation with clip-path.

```css
clip-path: inset(0 100% 0 0);
animation: line-reveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
```

#### `.hover-lift`
Subtle lift effect on hover using transform.

```css
transform: translateY(-4px);
transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
```

#### `.letter-spin`
Individual character rotation on hover.

```css
transform: rotateY(360deg);
```

#### `.animate-char-in`
Character entrance animation with blur and translate effects.

```css
animation: char-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
```

#### `.noise-overlay`
Subtle noise texture overlay for visual depth.

```css
opacity: 0.03;
background-image: url("data:image/svg+xml,%3Csvg...");
```

#### `.border-sketch`
Decorative sketch-style border using gradient patterns.

```css
border: 1px solid transparent;
background: linear-gradient(...) padding-box, linear-gradient(...) border-box;
```

### 3D Elements

- **Animated Sphere, Tetrahedron, Wave**: React Three Fiber (r3f) components for immersive 3D visuals
- Used in hero and infrastructure sections
- GPU-accelerated for smooth performance

---

## Component Patterns

### Buttons

- Primary CTA buttons use primary color background
- Secondary buttons use secondary color
- Hover state applies `.hover-lift` class

### Cards

- White background (`bg-card`)
- Subtle border using `border-border` class
- Rounded corners at `--radius: 0.25rem`
- Optional `.noise-overlay` for texture

### Section Spacing

- Vertical padding: `py-12` to `py-24` depending on prominence
- Horizontal padding: `px-4` mobile, `px-6` tablet, `px-8` desktop
- Use `gap-y-8` between subsections

### Navigation

- Sticky header with backdrop blur
- Smooth scroll behavior
- Dark-on-light text for accessibility

---

## Accessibility

### WCAG Compliance

- **Color Contrast**: Foreground and primary colors meet AA+ standards
- **Text Sizing**: 14px minimum for body text
- **Interactive Elements**: Sufficient padding and clickable area (44px minimum)
- **Focus States**: Visible `:focus` outlines using `--ring` color

### Semantic HTML

- Use `<main>`, `<header>`, `<section>` elements
- Alt text for all non-decorative images
- ARIA labels for complex interactive components
- Screen reader only text with `.sr-only` class

---

## Dark Mode

Dark mode is supported through OKLch values in the `:root` CSS variables. The color system automatically adapts:

- Background becomes nearly black
- Foreground becomes near white
- All other colors adjust for optimal contrast

---

## Performance Considerations

### Optimizations

- Three Google Fonts loaded with subsetting (`latin` only)
- System fonts as fallbacks
- Smooth scroll behavior via CSS (`scroll-behavior: smooth`)
- Hardware-accelerated animations using `transform` only
- Noise overlay rendered at 3% opacity to minimize impact

### Loading

- Fonts loaded at layout level for critical path
- CSS variables for efficient theming
- No unused CSS classes in production

---

## Component Overview

### Landing Page Sections

1. **Navigation** (`navigation.tsx`)
   - Sticky header with smooth scroll navigation
   - Responsive menu for mobile

2. **Hero Section** (`hero-section.tsx`)
   - Large display typography
   - Animated 3D sphere background
   - Primary CTA button

3. **Features Section** (`features-section.tsx`)
   - Feature cards with icons
   - Hover lift animations

4. **How It Works** (`how-it-works-section.tsx`)
   - Step-by-step breakdown
   - Numbered cards

5. **Infrastructure** (`infrastructure-section.tsx`)
   - 3D tetrahedron visualization
   - Technical details

6. **Developers** (`developers-section.tsx`)
   - Developer-focused content
   - Code snippets display

7. **Security Section** (`security-section.tsx`)
   - Security features highlight
   - Trust indicators

8. **Testimonials** (`testimonials-section.tsx`)
   - User testimonials with avatars
   - Marquee animation for scrolling

9. **Pricing** (`pricing-section.tsx`)
   - Pricing tiers comparison
   - Plan selection

10. **Integrations** (`integrations-section.tsx`)
    - Partner logos with marquee animation
    - Integration showcase

11. **Metrics** (`metrics-section.tsx`)
    - Key statistics display
    - Number animations

12. **CTA Section** (`cta-section.tsx`)
    - Final call-to-action
    - Bottom funnel conversion

13. **Footer** (`footer-section.tsx`)
    - Navigation links
    - Company information

---

## Design Tokens Reference

### Using Design Tokens in Components

```tsx
// Background color
className="bg-background"

// Text color
className="text-foreground"

// Borders
className="border border-border"

// Cards
className="bg-card text-card-foreground"

// Rounded corners
className="rounded-lg"  // Uses --radius

// Spacing
className="p-4 gap-6 py-12"

// Custom utilities
className="hover-lift noise-overlay"
```

---

## Extending the Design System

### Adding New Colors

Add to `:root` in `globals.css`:

```css
--new-color: oklch(0.5 0.1 45);
```

Then add to `@theme`:

```css
--color-new-color: var(--new-color);
```

### Adding New Animations

Add to `@layer utilities` in `globals.css`:

```css
.your-animation {
  animation: your-animation 1s ease-in-out;
}

@keyframes your-animation {
  0% { transform: scale(0.95); }
  100% { transform: scale(1); }
}
```

### Font Adjustments

Modify `layout.tsx` imports and update the `@theme` section in `globals.css`.

---

## Resources

- [OKLch Color Format](https://oklch.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Google Fonts](https://fonts.google.com/)
- [Web Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)
