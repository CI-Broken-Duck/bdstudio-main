# Broken Duck Media – Branding Guide

**EdTech SaaS. AI-Enhanced. Locally Built.**  
Building modern educational tools for tutoring centers and language schools in Chiang Mai, Thailand.

---

## 1. Brand Identity

- **Name:** Broken Duck Media
- **Mission:** Empower small educational institutions with custom-built, AI-enhanced software platforms at an affordable price.
- **Region:** Local-first in Chiang Mai, Thailand — with scalable potential.
- **Tone of Voice:**  
  - Friendly but professional  
  - Technically competent  
  - Clean, modern, and concise

---

## 2. Logo Guidelines

- **Primary Logo:** BD monogram with integrated “broken duck” symbol
- **Shape:** Square / 1:1 ratio preferred
- **Color:** Black on white or white on black
- **Acceptable Usage:**
  - In navigation headers, footers, loading screens
  - Not distorted, rotated, or color-altered
- **Minimum Size:** 64x64px for digital use

---

## 3. Color Palette

| Role                 | Variable                 | Hex       |
|----------------------|--------------------------|-----------|
| Primary Theme        | `--color-theme`          | `#DEB126` |
| Background (dark)    | `--color-bg`             | `#0b0b0c` |
| Text (primary)       | `--color-text`           | `#ffffff` |
| Text (secondary)     | `--color-text-secondary` | `hsl(48, 12%, 70%)` |
| Accent (highlight)   | `--color-highlight`      | `rgba(222, 177, 38, 0.1)` |
| Error                | `--color-red`            | `#DE5267` |
| Success              | `--color-green`          | `#21881c` |

---

## 4. Typography

- **Primary Font:** `"PT Sans", Inter, system-ui, sans-serif`
- **Mono Font (code/AI UI):** `"Roboto Mono", monospace`
- **Weights:** Regular (400), Semi-bold (600)
- **Use Cases:**
  - Headlines: `h1`, `h2`, `h3` → `font-weight: 600`
  - Paragraphs: Default `font-weight: 400`
  - Buttons & CTAs: Uppercase optional, bold, high contrast

---

## 5. UI Design Guidelines

### Buttons
```css
button {
  background-color: var(--color-theme);
  color: var(--color-bg-dark);
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
}
