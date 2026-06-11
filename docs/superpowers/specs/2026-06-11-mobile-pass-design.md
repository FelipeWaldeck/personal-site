# Mobile pass — design

Date: 2026-06-11
Branch target: `main` (small, self-contained)

## Goal

Make the site usable on a phone. Two surfaces are at fault:

1. **Home** renders a pan/zoom SVG relational map (`MapView`) with 8–12px tap
   targets in dense crossing lines, `touch-action: none`, no pinch zoom. Wrong
   interaction for a thumb.
2. **Case studies** (`MareCaseStudy`, `NamshubCaseStudy`) are scroll-driven
   sticky decks / live-UI reconstructions built for desktop width.

Decision: **don't make the map or the case studies work on mobile.** On the
home, fall back to the list (`IndexView`) we already have. On case studies,
show a short "best on desktop" gate. **Follow the house mobile format** the rest
of the site already uses (CV, Reading): Tailwind mobile-first + the existing
bottom `MobileNav` tab bar, at the `md` breakpoint.

Out of scope: CV and Reading routes (already mobile-responsive in this format;
spot-check only, no redesign).

## Breakpoint: one line at 768px (Tailwind `md`)

The whole site already treats **`md` = 768px** as the mobile/desktop line:
`MobileNav` is `md:hidden`, and CV/Reading use `md:` overrides. The map work was
built separately with an **820px** breakpoint in `map.css`. Unify on **768px** so
"map gone", "layout stacked", "case-study gated", and "bottom nav appears" are
all the same number — no dead zones (e.g. avoid 800px showing both a bottom nav
and a desktop map).

Concretely: change the existing `@media (max-width: 820px)` / `(min-width: 821px)`
blocks in `map.css` to **767.98px / 768px**, and the `useIsMobile` query to match.

## New: `useIsMobile` hook

`src/lib/useMediaQuery.ts` — a `matchMedia`-based hook.

```ts
export function useMediaQuery(query: string): boolean;
export function useIsMobile(): boolean; // max-width: 767.98px  → Tailwind md line
```

- Subscribes to `matchMedia(query)` change events; returns current match.
- SSR-safe-ish guard (`typeof window === 'undefined'` → false) even though this
  is a Vite SPA, so it never throws under test.
- jsdom has no `matchMedia`; add a mock in `src/setupTests.js` so existing
  `Home.test.tsx` / `CaseStudy.test.tsx` keep passing (default: not matching →
  desktop behaviour, preserving current test expectations).

Why JS and not pure CSS: `Home` mounts only one of `MapView`/`IndexView`, and
the case studies should not mount at all on mobile (their scroll/parallax
listeners would still run if merely `display:none`).

## 1. Home → index-only on mobile

`src/pages/Home.tsx`:

- `const isMobile = useIsMobile()`.
- Effective view = `isMobile ? 'index' : view`. The toggle state is ignored
  while mobile (no need to reset it).
- Don't render `ViewToggle` or the `legend` when mobile → the `topbar`
  collapses. (Index has its own colour-coded group headers, so the legend is
  redundant.)
- Render a **mobile-only "Latest writing" block after the index** (see rail
  trim below).
- Render `<MobileNav activeTab="ARCHIVE" />` so the phone gets the same bottom
  tab bar (Archive / CV / Reading) as the rest of the site. Add bottom padding
  to the index so the last entries clear the fixed nav.

`src/components/map/Rail.tsx`:

- Export `LATEST` so Home can reuse the same three links for the mobile footer
  block (single source of truth).
- No structural change to the rail itself.

`src/components/map/map.css` (`@media (max-width: 767.98px)`):

- Trim the stacked rail to essentials: **hide `.rail__lbl` + `.rail__latest`
  (the desktop "Latest writing" block) and `.rail__hex` (decorative hexagram).**
  Mobile rail = name, bio, nav.
- Reduce rail padding so name/bio/nav don't eat the first screen.
- The mobile "Latest writing" block renders below the index (work first).
- Entries (`.row`): increase vertical padding to a comfortable tap target
  (~20–22px), keep the existing 1-column reflow (`.group__rows` already drops to
  one column at phone width).

`.node-detail` (CSS only — no component change):

- On mobile, make `.node-detail` `position: fixed; inset: 0` (full-screen
  overlay) instead of absolute-within-`.mapstage`. **Bug fix:** stacked layout
  means `.mapstage` no longer covers the viewport, so an absolute panel would
  leave the rail visible above it when a non-case-study entry is tapped.

## 2. Case studies → desktop gate

`src/pages/CaseStudy.tsx`:

- `const isMobile = useIsMobile()`.
- If `isMobile`, return a small gate `<main>` instead of the case-study
  component (and instead of the stub): kicker + title (the node's title when
  known), a line — _"This case study is built for a larger screen. Come back
  from a desktop to read it."_ — a `← Back` link to `/`, and `<MobileNav />` so
  the dead-end still has the standard bottom nav to escape with.
- The gate returns **before** `FINISHED[...]` is mounted, so the heavy
  components never run on mobile.

The two finished case-study components themselves need no change — gating at the
route level keeps them desktop-only without touching their internals.

## Testing

- `useMediaQuery` unit test: mock `matchMedia`, assert it reflects match state
  and updates on change events.
- `setupTests.js` `matchMedia` mock keeps `Home.test.tsx` and
  `CaseStudy.test.tsx` green (they assert desktop content).
- Manual: load `/` and `/work/namshub`, `/work/mare-design` at ~390px, ~767px,
  ~768px and ~1280px; confirm index-only + gate + bottom nav below 768, map +
  full study at/above 768, and no dead zone around the breakpoint.

## Files touched

- `src/lib/useMediaQuery.ts` (new) + test
- `src/setupTests.js` (matchMedia mock)
- `src/pages/Home.tsx` (index-only, MobileNav, mobile Latest-writing block)
- `src/pages/CaseStudy.tsx` (gate + MobileNav)
- `src/components/map/Rail.tsx` (export LATEST)
- `src/components/map/map.css` (820→768 breakpoint, rail trim, entry padding,
  index bottom padding for the fixed nav, `.node-detail` full-screen on mobile,
  case-study gate styles)
