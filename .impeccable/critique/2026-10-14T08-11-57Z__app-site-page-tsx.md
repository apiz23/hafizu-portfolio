---
target: app/(site)/page.tsx
total_score: 25
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 4
target_identity: "file:/Users/ocgt/Desktop/hafizu-portfolio/app/(site)/page.tsx"
target_fingerprint: "sha256:ebd94ce20b6b935d7e09236fdd51b9ff30706d37f1358dcaad0373a7bacfad8a"
target_path: /Users/ocgt/Desktop/hafizu-portfolio/app/(site)/page.tsx
timestamp: 2026-10-14T08-11-57Z
slug: app-site-page-tsx
---
# Impeccable Critique + Audit — `app/(site)/page.tsx` (portfolio homepage)

Method: ⚠️ DEGRADED: single-context (no sub-agent/Task tool exposed in this session).
Browser visualization: unavailable (no browser automation tool exposed). Detector run via CLI only.

Surface mode: Experience (portfolio / body of work). Heuristics 7 and 10 scored n/a; max renormalized to 32.

## Design Health Score (Nielsen, Experience surface)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Project skeleton rows, education spinner, active nav dot, scroll cue all present; no scroll-progress indicator |
| 2 | Match System / Real World | 4 | Plain recruiter/client language throughout, no jargon leaks |
| 3 | User Control and Freedom | 3 | Smooth-scroll nav, back-to-top, filters, pagination; no URL state, no motion toggle |
| 4 | Consistency and Standards | 3 | Strong system, but 5 sections share one header template; Contact header omits the inline h2 |
| 5 | Error Prevention | 3 | Low-risk surface; fetch failures caught with retry |
| 6 | Recognition Rather Than Recall | 3 | Persistent labelled nav, no icon-only controls |
| 7 | Flexibility and Efficiency | n/a | Experience surface; accelerators not expected |
| 8 | Aesthetic and Minimalist Design | 3 | Clean, but duplicated marquee and repeated header template add sameness, not meaning |
| 9 | Error Recovery | 3 | Retry buttons + graceful empty states; error copy is generic |
| 10 | Help and Documentation | n/a | Experience surface; docs not expected |
| **Total** | | **25/32** | **Good (78%)** |

## Design Specificity Verdict

LLM assessment: The "Violet Ink" world is genuinely authored — cream paper, deep-violet ink, single gold accent, hairline/ring borders instead of shadows, Instrument Serif display against Space Mono eyebrows. That is not a template. But two choices pull it back toward the category: (1) every section opens with the identical `eyebrow → display-md h2 → rule-b` header, and (2) the same 9-item tech marquee is rendered twice, once before Skills and once before Contact. PRODUCT.md names "identical badge headers" and "cookie-cutter section templates repeated across every section" as explicit anti-references, so the incumbent implementation is drifting toward its own stated failure mode. The hero and the Education timeline carry the most product character; the Skills/Experience/Project bodies are structurally interchangeable with any developer portfolio.

Deterministic scan: `impeccable detect` returns zero primary findings across `app/(site)/page.tsx` and the whole `components` + `app` tree (exit 0). Verified the detector is functional by scanning a deliberately failing fixture (2 low-contrast hits, exit 2). The clean result is real: the surface uses design tokens throughout and contains no inline hex. Note the detector cannot resolve Tailwind token colours, so it did not verify contrast; manual computation puts `--ink-dim` on the cream background at roughly 5.4:1, which passes WCAG AA.

Visual overlays: none. Browser injection was not attempted because no browser automation surface is exposed in this session.

## Overall Impression

A disciplined, well-built portfolio with a real visual identity and a proper reduced-motion path — unusually good foundations. The single biggest opportunity is escaping its own sameness: differentiate the section headers and give the second marquee a reason to exist.

## What's Working

- Full reduced-motion path: `MotionConfig reducedMotion="user"` in providers, plus a CSS `prefers-reduced-motion` block, plus per-component `useReducedMotion` in Intro and the splash. This is a first-class implementation, not an afterthought.
- Token discipline: zero inline hex, a coherent HSL token set, and hairline/ring shape language. The detector's clean pass across the whole tree confirms it.
- Robust data states: Project and Education both ship loading skeletons, error+retry, and specific empty states.

## Priority Issues

- **[P1] Duplicate marquee with identical content** — `app/(site)/page.tsx:38` and `:43` render the same `marqueeItems` array twice. Why it matters: the second band re-teaches the visitor nothing and reads as filler between Projects and Contact, weakening the "precision over noise" principle. Fix: give the second band distinct content (e.g. currently-learning, tools, or a pull-quote) or remove it.
- **[P1] One identical section-header template across five sections** — Skills.tsx:51, Education.tsx:124, Experience.tsx:55, Project.tsx:116, Contact.tsx:21 all use `eyebrow + display-md h2 + rule-b`. Why it matters: it is the exact "cookie-cutter section template" PRODUCT.md lists as an anti-reference, and it flattens the pacing the brief asks for. Fix: vary header treatment per section (asymmetric, oversized index numeral, full-bleed statement, etc.).
- **[P1] Homepage forced dynamic** — `app/(site)/page.tsx:12` sets `export const dynamic = "force-dynamic"`. Why it matters: the homepage is now rendered per request with a DB round-trip and loses static/CDN caching, for data that changes rarely. Fix: use ISR (`revalidate`) or fetch education client-side as the component already supports.
- **[P1] Section content hidden until hydration** — Skills.tsx:73, Experience.tsx:73, Project.tsx:256, Contact.tsx:29, Education.tsx:143 use framer `initial={{ opacity: 0 }}` with `animate` gated on `useInView`. Why it matters: the server renders these at opacity 0, so with JS disabled or slow/failed hydration the majority of the page body is invisible. Fix: render visible by default and animate from a CSS baseline, or gate the hidden state on a mounted flag.
- **[P2] Hero proof numbers may not hold up** — Intro.tsx:12 claims "12+ Projects" and "1+ Years Exp." while Experience lists a "1 mo" current role and the Projects list paginates at 5 per page. Why it matters: a recruiter cross-checking the stat against the evidence sees a mismatch, which undercuts the proof-first principle. Fix: reconcile the numbers or soften the claim.

## Persona Red Flags

- **Jordan (first-timer / recruiter)**: On a slow connection the hero copy renders before hydration, but scrolling down, the Skills, Experience and Project bodies arrive blank until framer hydrates — Jordan sees empty sections and may assume the page is broken.
- **Riley (stress tester)**: Disabling JavaScript shows empty Skills/Experience/Project/Contact bodies (framer `initial` opacity 0). Refreshing mid-scroll also resets the Projects filter and page with no URL state, so a shared link never restores context.
- **Casey (distracted mobile)**: The project category filter buttons (Project.tsx:145, `py-1.5` ≈ 28px tall) and pagination links (Project.tsx:293) sit below the 44px touch-target floor, making them fiddly one-handed.
- **Recruiter/client (project-specific)**: Reaches the footer and finds the same tech list already seen above the Skills section; the repeated band reads as padding rather than proof.

## Minor Observations

- Contact's section header rule contains only the eyebrow, unlike the other four sections which pair eyebrow + h2 (Contact.tsx:21-23).
- Recharts is bundled for a single small GPA area chart (Education.tsx:9-16); a lazy import would cut initial JS.
- Anchor scroll targets sit under the fixed 64px navbar; no `scroll-mt` is applied (Project.tsx:114 and siblings).
- Intro's portrait uses `priority` while hidden below the `xl` breakpoint (Intro.tsx:182,189), so smaller viewports still preload it.
- Error copy ("Failed to load projects", "Failed to load chart data") is generic but paired with a retry, so recovery is intact.

## Questions to Consider

- If the second marquee disappeared entirely, would the page lose anything a visitor would notice?
- What would a section header look like if it were designed for that section's content rather than reused?
- Does the homepage need to be server-rendered at all, or would a static shell with a client-fetched Education chart be faster and simpler?
