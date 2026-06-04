# Node detail surfaces — design

**Date:** 2026-06-01
**Branch:** feat/map-index-home
**Status:** approved, implementing

## Goal

Wire map/index node clicks to the right detail surface: a lightweight **modal** for
quick-info nodes, and full **case-study pages** for design work. Port the two finished
mockups (`public/mockups/case-study-mare-identity.html`, `case-study-namshub.html`) into
React and retire the orphaned `projects.ts` / `ProjectDetail.tsx`.

## Decisions (from brainstorming)

1. **Surface model:** modal for quick info, full page for design work — decided _per node_,
   not per category (MARE hub → modal, Namshub hub → page, despite both being `platform`).
2. **Mapping:** per-node pages with stubs. `visid` and `namshub` render finished case
   studies; `iface`, `ns-visid`, `ns-iface` render a "coming soon" stub.
3. **Modal content:** extend `MapNode` with optional `blurb`/`tags`/`image`; render
   gracefully (published shows blurb + CTA, forthcoming shows just title + meta). Migrate
   copy out of `projects.ts`, then retire it.

## Surface routing

Add `caseStudy?: boolean` to nodes that open a page: `visid`, `iface`, `ns-visid`,
`ns-iface`, `namshub`. `Home.onSelect(node)` becomes:

```
node.caseStudy ? navigate(`/work/${node.id}`) : openModal(node)
```

The modal shows an "Open ↗" CTA only when `node.href` exists. This makes the existing
`external` field redundant (caseStudy owns page-vs-modal; href owns the CTA) — **remove
`external`** and update nodes + tests.

| Node(s)                             | Surface                           |
| ----------------------------------- | --------------------------------- |
| 7 writing, MARE hub, Sydney (video) | Modal (CTA → external where href) |
| `visid`                             | Page → MARE-identity case study   |
| `namshub`                           | Page → Namshub case study         |
| `iface`, `ns-visid`, `ns-iface`     | Page → "coming soon" stub         |

## Components

- **`NodeModal.tsx`** — ported from `01-asymmetric-rail-modal.html`. Local state in `Home`
  (selected node + open flag), not a route. `role="dialog"`, `aria-modal`, focus trap,
  Escape + backdrop click to close, focus returns to trigger. Published vs forthcoming
  rendering keyed on presence of `blurb`/`href`.
- **`CaseStudy.tsx`** — registry/dispatch on slug: `visid` → `<MareIdentityCaseStudy/>`,
  `namshub` → `<NamshubCaseStudy/>`, other `caseStudy` slugs → existing placeholder with
  node title/meta, unknown slug → "not found".
- **`MareIdentityCaseStudy.tsx`** — port of the MARE-identity mockup (CSS/SVG-driven, no
  external assets). Scoped wrapper class to avoid generic class-name leakage.
- **`NamshubCaseStudy.tsx`** — port of the Namshub mockup, wiring real assets from
  `public/case-studies/namshub/` via root-absolute paths (`/case-studies/namshub/...`).
  Bloom renders as static `bloom-mark.png` (matches mockup); `bloom.riv` is a future
  enhancement, out of scope.

## Data

- Extend `MapNode`: `blurb?: string`, `tags?: string[]`, `image?: string`. Remove `external`.
- Migrate copy from `projects.ts` into matching nodes (`mare`, `cond`, `interior`, `cyber`,
  `predict`).
- Delete `projects.ts` and `ProjectDetail.tsx` (no live importers; confirmed via grep).

## Testing (TDD)

- `Home`: writing / MARE-hub click opens modal (no navigation); design / `namshub` click
  navigates to `/work/:id`. (Replaces the current "MARE opens new tab" test.)
- `NodeModal`: published vs forthcoming variants; Escape + backdrop close; CTA only with href.
- `CaseStudy`: dispatches the right component for `visid` / `namshub`; placeholder for the
  three stub slugs; not-found for garbage.
- `mapData`: updated for removed `external` field + new optional fields.

## Out of scope (YAGNI)

Rive runtime, modal deep-linking/routing, new case-study content beyond the two ported
mockups, map layout/composition changes.
