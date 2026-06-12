# Minimalist Redesign — Design Spec

**Date:** 2026-06-12  
**Project:** Hafizu Portfolio (Next.js 16, Tailwind CSS v3)  
**Approach:** Token-first + selective component rebuild

---

## Direction

**Light Hybrid** — Notion spacing × Mux editorial bold type.  
Pure white background, charcoal text, one green accent for availability signal. No dark mode.  
Floating dark pill navbar. `max-w-4xl` (56rem) content column. Sora headings.

References:
- **Notion**: wide margins, document-like sections, type-forward hierarchy, calm whitespace
- **Mux.com**: bold oversized headings, monospace labels, sharp radii, high contrast CTAs

---

## Token System

All OKLCH color values replaced with plain hex. Dark mode removed entirely.

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#ffffff` | Page bg |
| `--foreground` | `#111111` | All primary text, borders-strong, CTAs |
| `--muted-foreground` | `#888888` | Secondary text, descriptions, meta |
| `--faint` | `#cccccc` | Project numbers, arrows, decorative |
| `--border` | `#e8e8e8` | All dividers, row separators, card borders |
| `--surface` | `#fafafa` | Skill grid cells, section bg variants |
| `--accent-green` | `#16a34a` | Available dot + badge only. Nowhere else. |
| `--green-bg` | `#f0fdf4` | Available badge background |
| `--green-border` | `#bbf7d0` | Available badge border |
| `--pill-bg` | `#111111` | Floating navbar background |
| `--pill-fg` | `#ffffff` | Floating navbar text |
| `--pill-muted` | `#888888` | Inactive nav links |

**Removed:** All indigo/primary colors, secondary teal, accent amber, all OKLCH tokens, dark mode variables.

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Heading | Sora | 900 | Section titles, hero name |
| Body | Inter | 400/500/600 | All paragraph text, descriptions |
| Mono | JetBrains Mono | 400/700 | Labels, nav links, stats, years, tags |

**Letter spacing:** Headings `-0.04em`. Mono labels `+0.08em` to `+0.14em`. Body normal.  
**Line height:** Headings `0.92–1.0`. Body `1.6–1.65`.

### Spacing & Shape

- **Content width:** `max-w-4xl` (56rem) centered, `px-8` horizontal padding
- **Section padding:** `py-14` (56px) top/bottom per section
- **Border radius:** `3px` default buttons/tags, `6px` grid containers, `999px` floating pill nav
- **Borders:** `1px solid #e8e8e8` for all row dividers and containers
- **Rule:** `2px solid #111111` — used once in hero between name and bio

---

## Component Specs

### Navbar

**Pattern:** Floating dark pill, centered, fixed top.

```
[  HF.  |  Home  Skills  Education  Experience  Work  Contact  ]
```

- Background: `#111111`, border-radius `999px`, padding `7px 16px`
- Logo `HF.` — JetBrains Mono 700, `#fff`, `tracking-[0.14em]`, right border `1px solid #333`
- Nav links — JetBrains Mono, `9px`, uppercase, `#888` inactive → `#fff` active
- Active state: text becomes `#fff`, layout-animated dot (keep existing Framer `layoutId`)
- Scrolled state: no bg change (pill already has bg). Add subtle `drop-shadow` on scroll.
- **Remove:** theme toggle button, dark/light mode switching, backdrop-blur background

### Hero Section

**Layout:** Single column, left-aligned within `max-w-4xl`.

1. **Available badge** — `inline-flex`, green border/bg, JetBrains Mono 9px uppercase, green dot (no pulse animation — static)
2. **Name** — `MUHD` / `HAFIZUDDIN` stacked, Sora 900, `clamp(3rem, 8vw, 5.5rem)`, `letter-spacing: -0.04em`, `line-height: 0.92`
3. **Rule** — `2px solid #111`, full width, `my-5`
4. **Bottom row** — flex row, bio left (`max-w-[38ch]`), stats right (12+ / 1yr)
   - Role: JetBrains Mono, `11px`, uppercase, `#888`, `tracking-[0.06em]`
   - Bio: Inter 13px, `#888`, `leading-[1.65]`
   - Stats: JetBrains Mono 700, `28px`, `#111`; label Mono 9px uppercase `#888`
5. **CTAs** — two buttons, `mt-6`
   - Primary: `bg-[#111] text-white`, Mono 10px uppercase, `px-5 py-2`, `rounded-[3px]`
   - Secondary: `border border-[#e8e8e8] text-[#888]`, same size
6. **Socials** — text links (GitHub / LinkedIn / Email), JetBrains Mono 9px uppercase, `#888` → `#111` hover

**Remove:** scroll velocity tech logo marquee, rounded-full buttons, Badge component, animated pulse on dot, profile photo grid split (photo removed — single column layout, no image).

### Projects Section

**Header row:**
- Title: `PROJECTS` — Sora 900, `clamp(2rem, 5vw, 3.5rem)`, `tracking-[-0.04em]`
- Count: JetBrains Mono 11px, `#888`, right-aligned

**Filter row:** plain buttons, Mono 9px uppercase, `border border-[#e8e8e8]`, `rounded-[2px]`. Active: `bg-[#111] text-white border-[#111]`.

**Project rows (keep list layout, refine styling):**
- `border-t border-[#e8e8e8]`, `py-3.5`, full-width flush
- Cols: `01` number (Mono 11px `#ccc`) · title (Inter 14px 600 `#111`) · tech tags (Mono 10px `#888`, hidden on mobile) · year (Mono 10px `#888`) · `→` arrow (`#ccc` → `#111` on hover)
- Hover: title stays `#111`, row gets `bg-[#fafafa]` (no color shift)
- **Remove:** large 4–5rem numbered display, `group-hover:text-primary` color transitions, featured badge

**GitHub link:** Keep, same minimal text-link style.

### Skills Section

**Layout:** CSS grid, `grid-cols-4` (desktop) → `grid-cols-2` (mobile). Grid lines via `gap-[1px] bg-[#e8e8e8]` parent trick, each cell `bg-white`.

Each cell:
- Icon: 20px (react-icons or emoji), `#888`, `mb-1.5`
- Name: JetBrains Mono 10px 700, `#111`
- Level/category: JetBrains Mono 9px, `#888`

**Remove:** current card-based layout with borders, any color accents on skill icons.

### Education Section

**Layout:** Two-column timeline grid (`80px date | 1fr content`), `border-t border-[#e8e8e8]` per row.

- Year range: JetBrains Mono 10px `#888`
- Degree title: Inter 13px 600 `#111`
- Institution: JetBrains Mono 10px `#888`
- Description: Inter 12px `#888`, `leading-[1.6]`

### Experience Section

Same two-column timeline grid as Education.

- Date range: JetBrains Mono 10px `#888`
- Role: Inter 13px 600 `#111`
- Company · Location: JetBrains Mono 10px `#888`
- Description bullets: Inter 12px `#888`

### Contact Section

**Layout:** Two-column grid (`1fr 1fr`).

**Left:**
- Headline: Sora 900, `32px`, `tracking-[-0.03em]`, `leading-[1.05]` — e.g. *"Let's build something."*
- Sub: Inter 13px `#888`

**Right:** stacked link rows. Each: `border border-[#e8e8e8] rounded-[4px] px-3.5 py-2.5`, label (Mono uppercase `#111`) + `↗` arrow (`#ccc`). Links: Email, LinkedIn, GitHub.

**Remove:** form input fields entirely. Replace with link rows only. The `/api/send-email` route is left untouched but not called from UI.

### Footer

Simple one-liner, `max-w-4xl` centered, `border-t border-[#e8e8e8]`.  
Left: `© 2026 Hafizuddin Hamid` — Mono 10px `#888`.  
Right: `Back to top ↑` — Mono 10px `#888`.

---

## globals.css Changes

1. Replace entire `:root` block — pure hex, no OKLCH, no dark mode vars
2. Remove `.dark { }` block entirely
3. Remove `grain-overlay` utility
4. Remove `dot-grid` utility
5. Remove `animate-gradient-x`, `animate-spin-slow` — unused after redesign
6. Set `--radius: 3px`
7. Base font size stays `14px`
8. Keep `@media (prefers-reduced-motion)` block

---

## app/layout.tsx Changes

- Remove `ThemeProvider` wrapper (or replace with `defaultTheme="light" enableSystem={false} forcedTheme="light"`)
- Remove dark mode toggle from Navbar
- Keep `Lenis`, `Analytics`, font imports (Sora + JetBrains Mono stay, add Inter to replace Figtree)

---

## Animation Rules

- **Keep:** Framer Motion `fadeUp` pattern (opacity + y), viewport once, stagger
- **Tune down:** reduce `y` from `24` to `12`, duration from `0.5` to `0.4`
- **Keep:** `layoutId="nav-dot"` spring on active link
- **Remove:** scroll velocity marquee entirely
- **Remove:** pulse animation on available dot (static green dot)
- **No new animations** beyond what exists

---

## Implementation Approach

**C — Token-first + selective rebuild:**

1. `globals.css` — rework tokens, remove dark mode, remove decorative utilities
2. `app/layout.tsx` — simplify ThemeProvider to light-only, swap Figtree → Inter
3. `Navbar.tsx` — rebuild JSX as floating pill, keep intersection observer logic
4. `Intro.tsx` — rewrite JSX layout, keep Framer fadeUp, remove marquee
5. `Skills.tsx` — rewrite as grid-lines grid, keep data
6. `Education.tsx` — rewrite as timeline grid, keep API fetch
7. `Experience.tsx` — rewrite as timeline grid, keep data
8. `Project.tsx` — refine row layout only, keep all fetch/filter/animation logic
9. `Contact.tsx` — rewrite as two-col links layout, remove form inputs entirely

Each component: rewrite className layer only. Zero changes to fetch logic, state, or API routes.

---

## What Gets Removed

| Item | Reason |
|------|--------|
| Dark mode (ThemeProvider toggle) | Light-only design |
| Indigo primary color | Replaced by charcoal monochrome |
| Scroll velocity tech logo marquee | Decorative noise |
| `grain-overlay` CSS | Not minimalist |
| `dot-grid` CSS | Not minimalist |
| `Badge` component usage | Plain text/mono labels instead |
| `rounded-full` buttons | Sharp `3px` radius |
| Profile photo grid column | Simplified hero layout |
| Color-tinted section backgrounds | Pure white throughout |
| Animated pulse on available dot | Static dot |

---

## Success Criteria

- Every section reads as intentional whitespace, not emptiness
- Type hierarchy clear without color — weight + size alone create order
- No color except green available signal and charcoal/white contrast
- Floating dark pill nav feels product-grade, not decorative
- All existing API/data functionality unchanged
- Lighthouse performance unchanged or improved (fewer animations, no marquee)
