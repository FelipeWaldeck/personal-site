# Map / Index Home — Implementation Spec

**Date:** 2026-06-01
**Status:** Approved direction, ready for implementation plan
**Prototype:** `public/mockups/map.html` (+ `public/mockups/system.css`) — the live, working source of truth. Treat it as the spec for behaviour and visual language.

---

## 1. Goal

Replace the current `Home.tsx` (Field/Viewport split) with a new landing experience: a persistent identity **rail** beside a stage that toggles between two views of the same work — a calm **Index** (list archive) and a bold **Map** (relational transit diagram). The Map is the default landing view and the distinctive object; the Index is the legible fallback.

The thesis: the site is a small demonstration of MARE's own idea — work arranged by _relation_, not ranking. Color tags medium; position encodes relatedness; lines carry meaning by their shape.

## 2. Scope

**In scope (this spec):**

- New `Home.tsx`: rail + Index/Map toggle.
- Map view: SVG transit diagram, fixed (authored) layout, pan + zoom, no visitor dragging.
- Index view: the existing calm asymmetric archive, grouped by category.
- A shared `mapData` module (the single `WORKS` + `LINKS` dataset both views read from).
- Node click → routes to a dedicated case-study page (route + a reusable `CaseStudy` page component with placeholder content where real assets don't yet exist). Writing nodes whose home is Substack link out instead.

**Explicitly out of scope (later specs):**

- Authoring/drag UI (that lived only in the mockup to compose the layout; production layout is baked in).
- Rebuilding `/reading`, `/cv`, `/Miscellaneous` — keep as-is.
- Real case-study content/photography (pages ship with structured placeholders).
- Mobile drag/physics; the almanac and note lenses (dropped earlier).

## 3. Visual language (locked)

From `system.css` — rooted in the OG `src/styles/index.css`:

- **Canvas** `#141810`, **ink** `#e6e6ea`, brand **pink** `#ff6392`, **green** `#98ce00`.
- **Category palette:** Platform = pink `#ff6392`, Writing = green `#98ce00`, Design = gold `#e8b04b` (ext), Moving Image = blue `#6ea8d8` (ext).
- **Type:** Libre Baskerville (titles/serif), DM Sans (utility/labels). Mono-style uppercase labels at `0.22em` tracking.
- **Lines:** heavy 7px. **Sequence** = solid straight, routed orthogonally on the grid (source color). **Relation** = two-tone slashed (`11 11`, both endpoint colors interleaved), 7px; either a smooth curve (`cross`) or contoured/orthogonal (`crossdash`). **Forthcoming/loose** = dotted (`dash`).
- **Nodes (capsule stops):** standard = filled color disc r8 + bg core r3. Hub (MARE, Namshub) = filled disc r12 + bg core r5. Collab = hollow ring r9, 2.5px stroke. Dimmed nodes (forthcoming / ongoing) at 0.55 opacity.
- **Grid:** faint dot/line grid behind the map = the structure. Always visible in Map view.

## 4. Data model

One module, `src/data/mapData.ts`, exporting the dataset both views consume. Derived from `projects.ts` where possible; the map adds layout + relations.

```ts
type Category = 'platform' | 'writing' | 'design' | 'video';
type LinkKind = 'flow' | 'cross' | 'crossdash' | 'dash';
//   flow      = sequence step, solid straight (grid-routed)
//   cross     = relation, two-tone slashed smooth curve
//   crossdash = relation, two-tone slashed contoured (orthogonal)
//   dash      = forthcoming / loose downstream, dotted straight

interface MapNode {
  id: string;
  cat: Category;
  title: string;
  meta: string; // date · series · role
  g: [number, number]; // authored grid position (from Export)
  label: 'up' | 'down' | 'left' | 'right';
  hub?: boolean; // MARE, Namshub
  collab?: boolean; // Shortwave (hollow ring)
  dim?: boolean; // forthcoming / ongoing
  href?: string; // external (Substack) OR internal case-study slug
  external?: boolean; // true → open href in new tab; false → route to /work/:slug
}

type MapLink = [fromId: string, toId: string, kind: LinkKind];
```

The canonical `WORKS` array + `LINKS` array are copied verbatim from the final `map.html` (including the exported `g:[x,y]` coordinates from Felipe's arrangement). Categories drive both the Map node color and the Index grouping. **Single source of truth** — Index and Map never diverge.

## 5. Components

```
Home.tsx
├─ Rail            (identity: name, bio, nav, latest-writing, hexagram #52)
├─ ViewToggle      (Index ⇄ Map, top of stage)
├─ MapView         ('use client' leaf; SVG render + pan/zoom)
│   ├─ renderLinks(WORKS, LINKS)   // ortho() + smooth() routing, two-tone slash
│   └─ renderNodes(WORKS)          // capsule stops, labels, click handlers
└─ IndexView       (category groups → rows; row click = same nav as node click)
```

- **MapView** is a pure render of `mapData` at the authored coords — no force layout, no drag. Pan (drag empty space) + zoom (scroll / +/−/reset) only, ported from the mockup's `viewBox` logic. `viewBox` initial frame fits the authored arrangement.
- **Node/row click** → `onSelect(node)`: if `external`, `window.open(href)`; else `navigate('/work/' + slug)`.
- **IndexView** reuses the row styling already in the mockup (`group__head` + `row`), grouped by `CAT` order.
- Each unit is independently testable: `MapView` takes `{nodes, links, onSelect}`; `IndexView` takes `{nodes, onSelect}`; neither knows about routing.

## 6. Routing

Add to `App.jsx`:

```
<Route path="/work/:slug" element={<CaseStudy />} />
```

`CaseStudy` reads `:slug` → looks up the node in `mapData` → renders a structured page (hero + meta strip + sections + back-to-map). Where real content is absent, render labelled placeholders (`{/* TODO: hero image */}`) rather than fake screenshots. Keep `/`, `/reading`, `/cv`, `/Miscellaneous`, `*` unchanged.

Writing nodes (`external: true`) skip the route and open Substack.

## 7. Responsive

- Desktop (≥820px): rail (300px) + stage grid, as the mockup.
- Mobile (<820px): rail collapses to a stacked top header (name, bio, nav). Map view becomes pan/zoom on a full-width SVG; Index is the recommended default on small screens (denser maps are hard on phones). The toggle persists.

## 8. Verification

- Map and Index render the same set of works from `mapData` (count parity test).
- Every node has a resolvable action (`href` present, or a `/work/:slug` that the CaseStudy lookup resolves).
- No label collisions at the authored zoom (the mockup's `getBoundingClientRect` collision check, kept as a dev assertion).
- Pan/zoom works; layout is not draggable in production.
- Lighthouse/build pass; no console errors.

## 9. Open items to confirm during build

- **Case-study content:** which nodes have real assets now vs. placeholder. (Namshub has assets in `public/case-studies/namshub/`; others TBD.)
- **Shortwave** credit copy finalised ("Creative Consultant, Sydney Opera House — Vivid Live").
- **Zones of Coupling III** stays dimmed/forthcoming until published.
- Confirm whether `projects.ts` becomes the source that `mapData` derives from, or `mapData` supersedes it.
