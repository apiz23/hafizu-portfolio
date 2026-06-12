# Portfolio Redesign — Editorial Direction

**Date:** 2026-06-12  
**Status:** Approved  

## Overview

Full visual redesign of hafizu-portfolio. Direction: Editorial & Bold — each section gets a unique visual treatment. No repeated badge-header template. Typography carries hierarchy. Same stack (Next.js, Tailwind, Framer Motion).

## Page Structure

```
Hero          — typographic name, inline stats, CTAs
Skills        — proficiency bars, 2-col, tinted bg
Experience    — horizontal timeline rows, mono year
Education     — single large block, no card wrapper
Projects      — numbered index list, full-width rows
Contact       — large text + email link, social icons
```

Navbar dock and scroll-to-top: unchanged.

## Section Specs

### 1. Hero

- Full-viewport section
- Name `MUHAFIZUDDIN` in Sora Black, ~14–18vw, uppercase, tracking tighter (`tracking-tighter`), breaks across 3 lines: `MUHA / FIZ / UDDIN`
- One letter or syllable accent in `text-primary` (indigo)
- Top: available badge with pulse dot — `Available for opportunities · Johor, MY`
- Horizontal rule (2px, `bg-foreground`) splits name from bottom row
- Bottom row: role + short bio (left), two stat numbers right (`12+ Projects`, `1yr XP`)
- CTAs: `View Work ↓` (primary, rounded-full) + `Resume ↗` (outline, rounded-full)
- Tech logo scroll strip (ScrollVelocityRow) below — unchanged
- **No photo. No blur orbs. No card wrapper.**
- Animation: existing `fadeUp` stagger preserved

### 2. Skills (NEW)

- No badge section header — just `SKILLS` large left-aligned in Sora Black, muted
- Two-column layout: **Frontend** | **Backend & Tools**
- Each skill row: icon + name left, filled bar right
  - Bar: indigo fill (`bg-primary`), muted track (`bg-muted`), no percentage label
  - Height: 5–6px, rounded-full
- Frontend skills (with bar fill %): React 90%, Next.js 92%, TypeScript 82%, Tailwind CSS 88%
- Backend & Tools: Node.js 75%, Supabase/PostgreSQL 78%, Git/GitHub 90%, Docker 55%
- Below bars: icon strip for secondary tools — smaller, muted, no bars (just presence)
- Section background: `bg-primary/[0.02]` — slight indigo tint to distinguish from neighbors
- Animation: bars animate width from 0 on scroll entry (`whileInView`)

### 3. Experience

- No card wrapper — each role is a full-width row with `border-t` only
- Row layout: `YEAR · COMPANY` in JetBrains Mono (muted, small) left | role title in Sora bold center | achievement bullets right
- On mobile: stacks vertically
- Hover: subtle `bg-primary/5` row highlight
- No repeated badge header — section label: `EXPERIENCE` large left-aligned

### 4. Education

- Single large block — NOT the same layout as Experience
- University name large (Sora Bold), degree below it, CGPA right-aligned on same line as degree
- Small tag cloud of relevant modules/coursework below (optional, subtle)
- Section label: `EDUCATION` large left-aligned

### 5. Projects (UPDATED)

- Section header: `PROJECTS` Sora Black left-aligned + total count or year range right-aligned on same line
- Category filter: text-only pills above list (All / Full Stack / Web App / Frontend) — no icons
- Each project = full-width row:
  ```
  [NUM]  [★ FEATURED]  [TITLE]  ··········  [TECH · TECH]  [YEAR]  [→]
  ──────────────────────────────────────────────────────────────────────
  ```
  - `NUM` (`01`, `02`, `03`) in Sora Black ~3rem, muted grey → indigo on hover
  - Title in Sora semibold
  - Tech tags inline, muted text (no badge borders)
  - Entire row is `<Link>` — goes to `visit_link`
  - `→` arrow nudges right (`group-hover:translate-x-1`) 
  - Featured projects: small `FEATURED` micro-label in indigo before title
- No project images in list view
- "View all on GitHub" link at bottom — unchanged

### 6. Contact

- No form card visible by default
- Large Sora heading: `Let's work together.`
- Email as large clickable link (`hafizu2302@gmail.com`) — `mailto:` href
- Optional: clicking email reveals inline Resend form (progressive disclosure)
- Below: GitHub · LinkedIn · Twitter — icon row with horizontal rule above
- Minimal padding, centered

## New Files

- `components/Skills.tsx` — new section component
- Edits to: `Intro.tsx`, `Experience.tsx`, `Education.tsx`, `Project.tsx`, `Contact.tsx`
- `app/page.tsx` — insert `<Skills />` between `<Intro />` and `<Education />`

## Design Constraints

- Fonts: Sora (headings/display), Figtree (body), JetBrains Mono (code/meta)
- Colors: OKLCH indigo `oklch(0.51 0.23 277)` primary, tinted neutrals
- Light mode default, dark mode supported
- **BANNED:** gradient text, glassmorphism, animated border trick, 3+ blur orbs, rotate-360 hover, identical section badge headers
- Framer Motion: preserve existing animation variants, add `whileInView` bar animation for Skills

## Out of Scope

- Blog teaser section (not selected)
- Testimonials (not selected)
- "Currently" section (not selected)
- Journey timeline (not selected)
- Multi-page routing — stays single-page
