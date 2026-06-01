# Map / Index Home — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `Home.tsx` with a persistent identity rail + an Index⇄Map toggle, where the Map is an SVG transit diagram of the work (fixed authored layout, pan/zoom) and nodes route to case-study pages or out to Substack.

**Architecture:** One data module (`mapData.ts`) is the single source of truth for both views. Pure geometry helpers (`mapGeometry.ts`) are unit-tested in isolation. `MapView` and `IndexView` are presentation components taking `{nodes, links, onSelect}` / `{nodes, onSelect}` — neither knows about routing; `Home.tsx` owns navigation. A new `/work/:slug` route renders `CaseStudy`.

**Tech Stack:** React 18 + TypeScript, Vite, React Router v6, **Vitest** + @testing-library/react + jsdom. SVG rendered declaratively via JSX (not imperative `createElementNS` like the mockup). Styling via the existing CSS-variable system in `src/styles/index.css`.

**Reference:** `public/mockups/map.html` + `public/mockups/system.css` are the working prototype. Port behaviour/visuals from there. Spec: `docs/superpowers/specs/2026-06-01-map-index-home-design.md`.

---

## File structure

- `src/data/mapData.ts` — **Create.** `Category`, `LinkKind`, `MapNode`, `MapLink` types; `CAT` palette; `WORKS` (verbatim coords from `map.html`); `LINKS`; helper `nodeById`. Source of truth.
- `src/lib/mapGeometry.ts` — **Create.** Pure functions: `roundedPath`, `ortho`, `smooth`, `linkPath`. No DOM. Unit-tested.
- `src/components/map/MapView.tsx` — **Create.** SVG render of nodes+links + pan/zoom. `'use client'` not needed (Vite SPA, not RSC).
- `src/components/map/IndexView.tsx` — **Create.** Category-grouped list.
- `src/components/map/Rail.tsx` — **Create.** Identity column (name, bio, nav, latest writing, hexagram).
- `src/components/map/ViewToggle.tsx` — **Create.** Index/Map segmented control.
- `src/components/map/map.css` — **Create.** Styles ported from `system.css` + map-specific rules, scoped under `.mapstage`/`.rail`.
- `src/pages/Home.tsx` — **Rewrite.** Composes Rail + ViewToggle + MapView/IndexView; owns `onSelect` navigation.
- `src/pages/CaseStudy.tsx` — **Create.** `/work/:slug` page; looks up node, renders hero + meta + placeholder sections + back link.
- `src/App.jsx` — **Modify.** Add `/work/:slug` route.
- Test files colocated as `*.test.ts(x)` beside each unit.

---

## Task 1: Design tokens in global CSS

**Files:**

- Modify: `src/styles/index.css` (`:root` block, after line ~21)

- [ ] **Step 1: Add the category + extended tokens to `:root`**

In `src/styles/index.css`, inside the existing `:root { ... }` block (right after `--border-subtle`), add:

```css
/* Map system (from public/mockups/system.css) */
--bg-raise: #1b2017;
--ink-dim: rgba(230, 230, 234, 0.62);
--ink-faint: rgba(230, 230, 234, 0.4);
--line-soft: rgba(255, 99, 146, 0.12);
--cat-platform: var(--accent-pink);
--cat-writing: var(--accent-green);
--cat-design: #e8b04b;
--cat-video: #6ea8d8;
```

- [ ] **Step 2: Verify the app still builds**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/styles/index.css
git commit -m "feat: add map design tokens to global CSS"
```

---

## Task 2: Map data module

**Files:**

- Create: `src/data/mapData.ts`
- Test: `src/data/mapData.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/data/mapData.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { WORKS, LINKS, CAT, nodeById } from './mapData';

describe('mapData', () => {
  it('has 15 works', () => {
    expect(WORKS).toHaveLength(15);
  });

  it('every link references existing node ids', () => {
    const ids = new Set(WORKS.map((w) => w.id));
    for (const [a, b] of LINKS) {
      expect(ids.has(a)).toBe(true);
      expect(ids.has(b)).toBe(true);
    }
  });

  it('every node category exists in CAT', () => {
    for (const w of WORKS) expect(CAT[w.cat]).toBeDefined();
  });

  it('nodeById resolves a known node', () => {
    expect(nodeById('mare')?.title).toBe('MARE');
  });

  it('marks two hubs (mare, namshub)', () => {
    expect(
      WORKS.filter((w) => w.hub)
        .map((w) => w.id)
        .sort()
    ).toEqual(['mare', 'namshub']);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/data/mapData.test.ts`
Expected: FAIL — cannot resolve `./mapData`.

- [ ] **Step 3: Create the data module**

Create `src/data/mapData.ts` (coordinates copied verbatim from `public/mockups/map.html`):

```ts
export type Category = 'platform' | 'writing' | 'design' | 'video';
export type LinkKind = 'flow' | 'cross' | 'crossdash' | 'dash';
export type LabelPos = 'up' | 'down' | 'left' | 'right';

export interface MapNode {
  id: string;
  cat: Category;
  title: string;
  meta: string;
  g: [number, number]; // authored grid position
  label: LabelPos;
  hub?: boolean;
  collab?: boolean;
  dim?: boolean;
  href?: string; // external URL or internal slug
  external?: boolean; // true → open href; false/undefined → /work/:id
}

export type MapLink = [from: string, to: string, kind: LinkKind];

export const CAT: Record<Category, { label: string; color: string }> = {
  platform: { label: 'Platform', color: '#ff6392' },
  writing: { label: 'Writing', color: '#98ce00' },
  design: { label: 'Design', color: '#e8b04b' },
  video: { label: 'Moving Image', color: '#6ea8d8' },
};

export const WORKS: MapNode[] = [
  {
    id: 'cond',
    cat: 'writing',
    g: [560, 280],
    label: 'up',
    title: 'MARE: The Condition',
    meta: '2025 · framing text — where it begins',
    external: true,
    href: 'https://maredotrun.substack.com/p/mare-the-condition',
  },
  {
    id: 'predict',
    cat: 'writing',
    g: [440, 320],
    label: 'left',
    title: 'Predictionism',
    meta: '2025 · essay',
    external: true,
    href: 'https://maredotrun.substack.com/p/predictionism-and-the-cybernetic',
  },
  {
    id: 'interior',
    cat: 'writing',
    g: [400, 440],
    label: 'left',
    title: 'Conditions of Interiority',
    meta: 'Nov 2025 · Interiority I',
    external: true,
    href: 'https://maredotrun.substack.com/p/conditions-of-interiority-13',
  },
  {
    id: 'cyber',
    cat: 'writing',
    g: [400, 520],
    label: 'left',
    title: 'The Cybernetic Subject',
    meta: 'Dec 2025 · Interiority II',
    external: true,
    href: 'https://maredotrun.substack.com/p/the-cybernetic-subject-23',
  },
  {
    id: 'afterint',
    cat: 'writing',
    g: [400, 600],
    label: 'left',
    title: 'After Interiority',
    meta: 'Jan 2026 · Interiority III',
    external: true,
    href: 'https://maredotrun.substack.com',
  },
  {
    id: 'flesh',
    cat: 'writing',
    g: [480, 680],
    label: 'up',
    title: 'The Technical Flesh',
    meta: 'Mar 2026 · Coupling, pt. 1 of 2',
    external: true,
    href: 'https://maredotrun.substack.com',
  },
  {
    id: 'zones1',
    cat: 'writing',
    g: [520, 720],
    label: 'right',
    title: 'Zones of Coupling I',
    meta: 'Apr 2026 · Possession',
    external: true,
    href: 'https://maredotrun.substack.com',
  },
  {
    id: 'zones2',
    cat: 'writing',
    g: [520, 760],
    label: 'right',
    title: 'Zones of Coupling II',
    meta: 'May 2026 · Manifestation',
    external: true,
    href: 'https://maredotrun.substack.com',
  },
  {
    id: 'zones3',
    cat: 'writing',
    g: [520, 800],
    label: 'right',
    dim: true,
    title: 'Zones of Coupling III',
    meta: 'forthcoming',
  },
  {
    id: 'mare',
    cat: 'platform',
    g: [680, 280],
    label: 'up',
    hub: true,
    title: 'MARE',
    meta: '2025– · platform',
    external: true,
    href: 'https://mare.run',
  },
  {
    id: 'visid',
    cat: 'design',
    g: [800, 280],
    label: 'up',
    title: 'Visual identity, MARE',
    meta: '2025',
  },
  {
    id: 'iface',
    cat: 'design',
    g: [920, 280],
    label: 'up',
    title: 'Interface, MARE',
    meta: '2025',
  },
  {
    id: 'namshub',
    cat: 'platform',
    g: [680, 440],
    label: 'left',
    hub: true,
    title: 'Namshub',
    meta: '2025– · ambient writing platform · namshub.observer',
    external: true,
    href: 'https://namshub.observer',
  },
  {
    id: 'ns-visid',
    cat: 'design',
    g: [800, 440],
    label: 'down',
    title: 'Visual identity, Namshub',
    meta: '2026',
  },
  {
    id: 'ns-iface',
    cat: 'design',
    g: [960, 440],
    label: 'down',
    title: 'Interface, Namshub',
    meta: '2026',
  },
  {
    id: 'sydney',
    cat: 'video',
    g: [680, 160],
    label: 'up',
    collab: true,
    title: 'Shortwave × Soft Centre',
    meta: '2026 · Sydney Opera House, Vivid Live · Creative Consultant',
    external: true,
    href: 'https://www.sydneyoperahouse.com/vivid-live/shortwave-x-soft-centre',
  },
];

export const LINKS: MapLink[] = [
  ['cond', 'predict', 'flow'],
  ['predict', 'interior', 'flow'],
  ['interior', 'cyber', 'flow'],
  ['cyber', 'afterint', 'flow'],
  ['afterint', 'flesh', 'flow'],
  ['flesh', 'zones1', 'flow'],
  ['zones1', 'zones2', 'flow'],
  ['zones2', 'zones3', 'dash'],
  ['cond', 'mare', 'cross'],
  ['mare', 'visid', 'cross'],
  ['visid', 'iface', 'flow'],
  ['mare', 'sydney', 'cross'],
  ['mare', 'namshub', 'cross'],
  ['flesh', 'namshub', 'crossdash'],
  ['namshub', 'ns-visid', 'cross'],
  ['ns-visid', 'ns-iface', 'flow'],
];

const byId = WORKS.reduce<Record<string, MapNode>>(
  (m, w) => ((m[w.id] = w), m),
  {}
);
export const nodeById = (id: string): MapNode | undefined => byId[id];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/data/mapData.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/data/mapData.ts src/data/mapData.test.ts
git commit -m "feat: add mapData source of truth for Map/Index views"
```

---

## Task 2.5: Confirm node action mapping with user

Before relying on `external`/`href`, confirm two open items from the spec §9:

- Which design/platform nodes should get real `/work/:slug` case-study pages vs. external links. Current `mapData` sets all writing + MARE + Namshub + Sydney as `external:true`; the four design nodes (`visid`, `iface`, `ns-visid`, `ns-iface`) have no `href` → they route to `/work/:id`.
- Whether the `afterint`/`flesh`/`zones*` Substack URLs above are correct (some are placeholders pointing at the publication root).

- [ ] **Step 1:** Surface these to the user; apply any corrections to `mapData.ts`; re-run `npx vitest run src/data/mapData.test.ts`; commit if changed.

---

## Task 3: Geometry helpers (pure, unit-tested)

**Files:**

- Create: `src/lib/mapGeometry.ts`
- Test: `src/lib/mapGeometry.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/mapGeometry.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { roundedPath, ortho, smooth, linkPath } from './mapGeometry';

const A: [number, number] = [100, 100];
const B: [number, number] = [300, 300];

describe('mapGeometry', () => {
  it('roundedPath starts with a moveto at the first point', () => {
    expect(
      roundedPath(
        [
          { x: 10, y: 20 },
          { x: 30, y: 40 },
        ],
        5
      )
    ).toMatch(/^M10 20/);
  });

  it('ortho on a straight horizontal run is a single line', () => {
    expect(ortho([0, 50], [200, 50])).toBe('M0 50 L200 50');
  });

  it('ortho on a diagonal produces an L-shaped path (has a Q elbow)', () => {
    expect(ortho(A, B)).toContain('Q');
  });

  it('smooth produces a cubic bezier', () => {
    expect(smooth(A, B)).toContain('C');
  });

  it('linkPath uses smooth for cross and ortho for flow/crossdash/dash', () => {
    expect(linkPath(A, B, 'cross')).toContain('C');
    expect(linkPath(A, B, 'crossdash')).toContain('Q'); // orthogonal
    expect(linkPath([0, 50], [200, 50], 'flow')).toBe('M0 50 L200 50');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/mapGeometry.test.ts`
Expected: FAIL — cannot resolve `./mapGeometry`.

- [ ] **Step 3: Implement the helpers**

Create `src/lib/mapGeometry.ts` (ported from `map.html`, typed; points are `[x,y]` tuples):

```ts
import type { LinkKind } from '../data/mapData';

type Pt = { x: number; y: number };
const toPt = (p: [number, number]): Pt => ({ x: p[0], y: p[1] });

export function roundedPath(pts: Pt[], r: number): string {
  if (pts.length < 2) return '';
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p0 = pts[i - 1],
      p1 = pts[i],
      p2 = pts[i + 1];
    const v1 = { x: p1.x - p0.x, y: p1.y - p0.y };
    const v2 = { x: p2.x - p1.x, y: p2.y - p1.y };
    const l1 = Math.hypot(v1.x, v1.y) || 1;
    const l2 = Math.hypot(v2.x, v2.y) || 1;
    const rr = Math.min(r, l1 / 2, l2 / 2);
    d += ` L${p1.x - (v1.x / l1) * rr} ${p1.y - (v1.y / l1) * rr} Q${p1.x} ${p1.y} ${p1.x + (v2.x / l2) * rr} ${p1.y + (v2.y / l2) * rr}`;
  }
  const last = pts[pts.length - 1];
  return d + ` L${last.x} ${last.y}`;
}

export function ortho(a: [number, number], b: [number, number]): string {
  const p = toPt(a),
    q = toPt(b);
  if (Math.abs(p.x - q.x) < 2 || Math.abs(p.y - q.y) < 2)
    return `M${p.x} ${p.y} L${q.x} ${q.y}`;
  return roundedPath([p, { x: p.x, y: q.y }, q], 14);
}

export function smooth(a: [number, number], b: [number, number]): string {
  const p = toPt(a),
    q = toPt(b);
  const dx = q.x - p.x,
    dy = q.y - p.y;
  if (Math.abs(dx) >= Math.abs(dy)) {
    const c = Math.abs(dx) * 0.45;
    return `M${p.x} ${p.y} C ${p.x + Math.sign(dx) * c} ${p.y}, ${q.x - Math.sign(dx) * c} ${q.y}, ${q.x} ${q.y}`;
  }
  const c = Math.abs(dy) * 0.45;
  return `M${p.x} ${p.y} C ${p.x} ${p.y + Math.sign(dy) * c}, ${q.x} ${q.y - Math.sign(dy) * c}, ${q.x} ${q.y}`;
}

/** cross = smooth curve; flow/crossdash/dash = orthogonal grid route */
export function linkPath(
  a: [number, number],
  b: [number, number],
  kind: LinkKind
): string {
  return kind === 'cross' ? smooth(a, b) : ortho(a, b);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/mapGeometry.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/mapGeometry.ts src/lib/mapGeometry.test.ts
git commit -m "feat: add pure map geometry helpers"
```

---

## Task 4: Map + rail CSS

**Files:**

- Create: `src/components/map/map.css`

- [ ] **Step 1: Create the stylesheet**

Create `src/components/map/map.css` (ported from `public/mockups/map.html` `<style>` + `system.css`; relies on tokens added in Task 1):

```css
.app-shell {
  display: grid;
  grid-template-columns: 300px 1fr;
  min-height: 100vh;
}

/* Rail */
.rail {
  padding: 52px 32px;
  border-right: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  box-sizing: border-box;
}
.rail__name {
  font-family: var(--font-primary);
  font-size: 32px;
  line-height: 1.12;
  letter-spacing: -0.01em;
  color: var(--accent-pink);
}
.rail__bio {
  font-size: 13.5px;
  line-height: 1.55;
  opacity: 0.85;
  margin: 22px 0 0;
}
.rail__nav {
  display: flex;
  gap: 18px;
  margin-top: 28px;
}
.rail__nav a {
  font-family: var(--font-utility);
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.55;
}
.rail__nav a:hover {
  opacity: 1;
  color: var(--accent-pink);
}
.rail__lbl {
  font-family: var(--font-utility);
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent-green);
  opacity: 0.9;
  margin: 46px 0 14px;
}
.rail__latest {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.rail__latest a {
  font-size: 13.5px;
  line-height: 1.3;
  opacity: 0.85;
}
.rail__latest a:hover {
  opacity: 1;
  color: var(--accent-pink);
}
.rail__hex {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-top: auto;
  padding-top: 40px;
}
.rail__hex .glyph {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 30px;
  flex-shrink: 0;
}
.rail__hex .glyph i {
  height: 4px;
  background: var(--accent-green);
  display: block;
}
.rail__hex .glyph .split {
  display: flex;
  gap: 6px;
}
.rail__hex .glyph .split i {
  flex: 1;
}
.rail__hex span {
  font-family: var(--font-utility);
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent-green);
  opacity: 0.8;
}

/* Stage + toggle */
.mapstage {
  padding: 32px 40px 40px;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.toggle {
  display: inline-flex;
  border: 1px solid rgba(230, 230, 234, 0.22);
}
.toggle button {
  font-family: var(--font-utility);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-primary);
  opacity: 0.55;
  background: transparent;
  border: 0;
  padding: 8px 22px;
  cursor: pointer;
}
.toggle button.on {
  background: var(--accent-pink);
  color: var(--bg-primary);
  opacity: 1;
  font-weight: 600;
}
.legend {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}
.legend div {
  display: flex;
  align-items: center;
  gap: 7px;
  font-family: var(--font-utility);
  font-size: 10px;
  opacity: 0.7;
}
.legend i {
  width: 16px;
  height: 3px;
  border-radius: 2px;
  display: block;
}
.legend i.ring {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: transparent;
  border: 2px solid var(--text-primary);
}

/* Map svg */
.mapwrap {
  margin-top: 16px;
  border: 1px solid var(--line-soft);
  position: relative;
  overflow: hidden;
  background: var(--bg-primary);
}
.mapwrap svg {
  display: block;
  width: 100%;
  height: 620px;
  cursor: grab;
  touch-action: none;
}
.mapwrap svg.dragging {
  cursor: grabbing;
}
.map-grid {
  stroke: rgba(230, 230, 234, 0.05);
}
.map-spine {
  stroke-width: 7;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.map-cross {
  stroke-width: 7;
  fill: none;
  stroke-linecap: butt;
  stroke-linejoin: round;
}
.map-dash {
  stroke-dasharray: 1 11;
  stroke-width: 7;
  fill: none;
  opacity: 0.7;
  stroke-linecap: round;
}
.map-node text {
  font-family: var(--font-utility);
  font-size: 11px;
  fill: var(--text-primary);
}
.map-node text.dim {
  opacity: 0.7;
}
.map-node {
  cursor: pointer;
}
.map-node:hover text {
  fill: #fff;
}
.map-node:hover .node-dot {
  opacity: 0.8;
}
.ctrl {
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  gap: 6px;
}
.ctrl button {
  font-family: var(--font-utility);
  font-size: 14px;
  height: 30px;
  min-width: 30px;
  padding: 0 8px;
  background: var(--bg-raise);
  color: var(--text-primary);
  border: 1px solid var(--line-soft);
  cursor: pointer;
}
.hint {
  font-family: var(--font-utility);
  font-size: 11px;
  opacity: 0.45;
  margin-top: 14px;
}

/* Index */
.index {
  margin-top: 16px;
  max-width: 900px;
}
.group {
  margin-top: 36px;
}
.group__head {
  display: flex;
  align-items: baseline;
  gap: 16px;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 8px;
}
.group__head h2 {
  font-family: var(--font-utility);
  font-size: 11px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  margin: 0;
}
.group__head span {
  font-family: var(--font-utility);
  font-size: 10px;
  letter-spacing: 0.18em;
  opacity: 0.4;
}
.row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: baseline;
  padding: 15px 0;
  border-bottom: 1px solid var(--line-soft);
  cursor: pointer;
  background: none;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  width: 100%;
  text-align: left;
  color: inherit;
}
.row:hover .row__t {
  color: var(--accent-pink);
}
.row__t {
  font-family: var(--font-primary);
  font-size: 20px;
  transition: color 0.2s;
}
.row__t small {
  display: block;
  font-family: var(--font-utility);
  font-size: 11px;
  opacity: 0.5;
  margin-top: 4px;
}
.row__c {
  font-family: var(--font-utility);
  font-size: 14px;
  opacity: 0.45;
}

@media (max-width: 820px) {
  .app-shell {
    grid-template-columns: 1fr;
  }
  .rail {
    position: static;
    height: auto;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/map/map.css
git commit -m "feat: add map/rail/index stylesheet"
```

---

## Task 5: Rail component

**Files:**

- Create: `src/components/map/Rail.tsx`
- Test: `src/components/map/Rail.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/map/Rail.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Rail from './Rail';

describe('Rail', () => {
  it('renders the name and nav links', () => {
    render(
      <MemoryRouter>
        <Rail />
      </MemoryRouter>
    );
    expect(screen.getByText(/Felipe/)).toBeInTheDocument();
    expect(screen.getByText(/Reading/i)).toBeInTheDocument();
    expect(screen.getByText(/Keeping Still/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/map/Rail.test.tsx`
Expected: FAIL — cannot resolve `./Rail`.

- [ ] **Step 3: Implement the component**

Create `src/components/map/Rail.tsx`:

```tsx
import React from 'react';
import { Link } from 'react-router-dom';

const LATEST = [
  'Zones of Coupling (2/2) — Manifestation',
  'Zones of Coupling (1/2) — Possession',
  'The Technical Flesh (1/2)',
];

export default function Rail() {
  return (
    <aside className="rail">
      <div className="rail__name">
        Felipe
        <br />
        Waldeck
      </div>
      <p className="rail__bio">
        Researcher and writer on the cultural and political consequences of
        contemporary technical systems. Co-founder of MARE.
      </p>
      <nav className="rail__nav">
        <Link to="/cv">CV</Link>
        <Link to="/reading">Reading</Link>
        <a
          href="https://maredotrun.substack.com"
          target="_blank"
          rel="noreferrer"
        >
          Substack ↗
        </a>
      </nav>
      <div className="rail__lbl">Latest writing</div>
      <div className="rail__latest">
        {LATEST.map((t) => (
          <a
            key={t}
            href="https://maredotrun.substack.com"
            target="_blank"
            rel="noreferrer"
          >
            {t}
          </a>
        ))}
      </div>
      <div className="rail__hex">
        <div className="glyph">
          <i />
          <i />
          <div className="split">
            <i />
            <i />
          </div>
          <div className="split">
            <i />
            <i />
          </div>
          <div className="split">
            <i />
            <i />
          </div>
          <div className="split">
            <i />
            <i />
          </div>
        </div>
        <span>#52 · Keeping Still</span>
      </div>
    </aside>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/map/Rail.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/map/Rail.tsx src/components/map/Rail.test.tsx
git commit -m "feat: add identity Rail component"
```

---

## Task 6: ViewToggle component

**Files:**

- Create: `src/components/map/ViewToggle.tsx`
- Test: `src/components/map/ViewToggle.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/map/ViewToggle.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ViewToggle from './ViewToggle';

describe('ViewToggle', () => {
  it('marks the active view and fires onChange', () => {
    const onChange = vi.fn();
    render(<ViewToggle view="map" onChange={onChange} />);
    expect(screen.getByRole('button', { name: /map/i })).toHaveClass('on');
    fireEvent.click(screen.getByRole('button', { name: /index/i }));
    expect(onChange).toHaveBeenCalledWith('index');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/map/ViewToggle.test.tsx`
Expected: FAIL — cannot resolve `./ViewToggle`.

- [ ] **Step 3: Implement the component**

Create `src/components/map/ViewToggle.tsx`:

```tsx
import React from 'react';

export type View = 'index' | 'map';

export default function ViewToggle({
  view,
  onChange,
}: {
  view: View;
  onChange: (v: View) => void;
}) {
  return (
    <div className="toggle">
      <button
        className={view === 'index' ? 'on' : ''}
        onClick={() => onChange('index')}
      >
        Index
      </button>
      <button
        className={view === 'map' ? 'on' : ''}
        onClick={() => onChange('map')}
      >
        Map
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/map/ViewToggle.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/map/ViewToggle.tsx src/components/map/ViewToggle.test.tsx
git commit -m "feat: add Index/Map ViewToggle"
```

---

## Task 7: IndexView component

**Files:**

- Create: `src/components/map/IndexView.tsx`
- Test: `src/components/map/IndexView.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/map/IndexView.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import IndexView from './IndexView';
import { WORKS } from '../../data/mapData';

describe('IndexView', () => {
  it('renders every work as a row and fires onSelect on click', () => {
    const onSelect = vi.fn();
    render(<IndexView onSelect={onSelect} />);
    expect(screen.getAllByRole('button')).toHaveLength(WORKS.length);
    fireEvent.click(screen.getByText('MARE'));
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'mare' })
    );
  });

  it('groups under category headings', () => {
    render(<IndexView onSelect={() => {}} />);
    expect(
      screen.getByRole('heading', { name: /platform/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /moving image/i })
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/map/IndexView.test.tsx`
Expected: FAIL — cannot resolve `./IndexView`.

- [ ] **Step 3: Implement the component**

Create `src/components/map/IndexView.tsx`:

```tsx
import React from 'react';
import { CAT, WORKS, type Category, type MapNode } from '../../data/mapData';

const ORDER: Category[] = ['platform', 'writing', 'design', 'video'];

export default function IndexView({
  onSelect,
}: {
  onSelect: (n: MapNode) => void;
}) {
  return (
    <div className="index">
      {ORDER.map((k) => {
        const items = WORKS.filter((w) => w.cat === k);
        if (!items.length) return null;
        return (
          <div className="group" key={k}>
            <div className="group__head">
              <h2 style={{ color: CAT[k].color }}>{CAT[k].label}</h2>
              <span>{String(items.length).padStart(2, '0')} entries</span>
            </div>
            {items.map((w) => (
              <button className="row" key={w.id} onClick={() => onSelect(w)}>
                <div className="row__t">
                  {w.title}
                  <small>{w.meta}</small>
                </div>
                <div className="row__c">›</div>
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/map/IndexView.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/map/IndexView.tsx src/components/map/IndexView.test.tsx
git commit -m "feat: add IndexView list of works"
```

---

## Task 8: MapView — static SVG render (no pan/zoom yet)

**Files:**

- Create: `src/components/map/MapView.tsx`
- Test: `src/components/map/MapView.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/map/MapView.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MapView from './MapView';
import { WORKS, LINKS } from '../../data/mapData';

describe('MapView', () => {
  it('renders one group per node with its title', () => {
    const { container } = render(<MapView onSelect={() => {}} />);
    expect(container.querySelectorAll('g.map-node')).toHaveLength(WORKS.length);
    expect(screen.getByText('MARE')).toBeInTheDocument();
  });

  it('renders link paths (spine + cross + dash)', () => {
    const { container } = render(<MapView onSelect={() => {}} />);
    // each cross/crossdash draws TWO paths (two-tone), flow/dash one
    const paths = container.querySelectorAll(
      'path.map-spine, path.map-cross, path.map-dash'
    );
    expect(paths.length).toBeGreaterThanOrEqual(LINKS.length);
  });

  it('fires onSelect with the node when a node is clicked', () => {
    const onSelect = vi.fn();
    const { container } = render(<MapView onSelect={onSelect} />);
    const mareNode = container.querySelector(
      'g.map-node[data-id="mare"]'
    ) as SVGGElement;
    fireEvent.click(mareNode);
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'mare' })
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/map/MapView.test.tsx`
Expected: FAIL — cannot resolve `./MapView`.

- [ ] **Step 3: Implement the static render**

Create `src/components/map/MapView.tsx` (pan/zoom added in Task 9; for now a fixed `viewBox`):

```tsx
import React from 'react';
import {
  CAT,
  WORKS,
  LINKS,
  nodeById,
  type MapNode,
  type LabelPos,
} from '../../data/mapData';
import { linkPath } from '../../lib/mapGeometry';

const FIELD = { w: 1040, h: 820 };
const GRID = 40;
const VB0 = { x: 120, y: 90, w: 880, h: 700 };

const col = (n: MapNode) => CAT[n.cat].color;

function labelXY(n: MapNode): {
  x: number;
  y: number;
  anchor: 'middle' | 'start' | 'end';
} {
  const [x, y] = n.g;
  const rad = n.hub ? 12 : n.collab ? 9 : 8;
  const lbl: LabelPos = n.label;
  if (lbl === 'up') return { x, y: y - rad - 10, anchor: 'middle' };
  if (lbl === 'down') return { x, y: y + rad + 18, anchor: 'middle' };
  if (lbl === 'left') return { x: x - rad - 9, y: y + 4, anchor: 'end' };
  return { x: x + rad + 9, y: y + 4, anchor: 'start' };
}

function NodeDot({ n }: { n: MapNode }) {
  const [x, y] = n.g,
    c = col(n),
    op = n.dim ? 0.55 : 1;
  if (n.hub)
    return (
      <>
        <circle className="node-dot" cx={x} cy={y} r={12} fill={c} />
        <circle cx={x} cy={y} r={5} fill="var(--bg-primary)" />
      </>
    );
  if (n.collab)
    return (
      <circle
        className="node-dot"
        cx={x}
        cy={y}
        r={9}
        fill="var(--bg-primary)"
        stroke={c}
        strokeWidth={2.5}
      />
    );
  return (
    <>
      <circle className="node-dot" cx={x} cy={y} r={8} fill={c} opacity={op} />
      <circle cx={x} cy={y} r={3} fill="var(--bg-primary)" opacity={op} />
    </>
  );
}

function Links() {
  const out: React.ReactNode[] = [];
  LINKS.forEach(([a, b, kind], i) => {
    const na = nodeById(a)!,
      nb = nodeById(b)!;
    const d = linkPath(na.g, nb.g, kind);
    if (kind === 'cross' || kind === 'crossdash') {
      out.push(
        <path
          key={`${i}a`}
          className="map-cross"
          d={d}
          stroke={col(na)}
          strokeDasharray="11 11"
        />
      );
      out.push(
        <path
          key={`${i}b`}
          className="map-cross"
          d={d}
          stroke={col(nb)}
          strokeDasharray="11 11"
          strokeDashoffset={11}
        />
      );
    } else {
      out.push(
        <path
          key={i}
          className={kind === 'dash' ? 'map-dash' : 'map-spine'}
          d={d}
          stroke={col(na)}
        />
      );
    }
  });
  return <>{out}</>;
}

export default function MapView({
  onSelect,
}: {
  onSelect: (n: MapNode) => void;
}) {
  const gridLines: React.ReactNode[] = [];
  for (let gx = 0; gx <= FIELD.w; gx += GRID)
    gridLines.push(
      <line
        key={`v${gx}`}
        className="map-grid"
        x1={gx}
        y1={0}
        x2={gx}
        y2={FIELD.h}
        strokeWidth={1}
      />
    );
  for (let gy = 0; gy <= FIELD.h; gy += GRID)
    gridLines.push(
      <line
        key={`h${gy}`}
        className="map-grid"
        x1={0}
        y1={gy}
        x2={FIELD.w}
        y2={gy}
        strokeWidth={1}
      />
    );

  return (
    <div className="mapwrap">
      <svg
        viewBox={`${VB0.x} ${VB0.y} ${VB0.w} ${VB0.h}`}
        role="img"
        aria-label="Relational map of work"
      >
        {gridLines}
        <Links />
        {WORKS.map((n) => {
          const l = labelXY(n);
          return (
            <g
              className="map-node"
              data-id={n.id}
              key={n.id}
              onClick={() => onSelect(n)}
            >
              <NodeDot n={n} />
              <text
                className={n.dim ? 'dim' : ''}
                x={l.x}
                y={l.y}
                textAnchor={l.anchor}
                fontFamily={n.hub ? 'var(--font-primary)' : undefined}
                fontSize={n.hub ? 15 : undefined}
                fill={n.hub ? col(n) : undefined}
              >
                {n.title}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="hint">
        Series run along the grid; relations curve across it. Tap a stop to open
        the work.
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/map/MapView.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/map/MapView.tsx src/components/map/MapView.test.tsx
git commit -m "feat: add static MapView SVG render"
```

---

## Task 9: MapView — pan & zoom

**Files:**

- Modify: `src/components/map/MapView.tsx`
- Test: `src/components/map/MapView.zoom.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/map/MapView.zoom.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import MapView from './MapView';

describe('MapView pan/zoom', () => {
  it('zoom-in button shrinks the viewBox width', () => {
    const { container } = render(<MapView onSelect={() => {}} />);
    const svg = container.querySelector('svg')!;
    const before = svg.getAttribute('viewBox')!.split(' ').map(Number)[2];
    fireEvent.click(container.querySelector('button[title="Zoom in"]')!);
    const after = svg.getAttribute('viewBox')!.split(' ').map(Number)[2];
    expect(after).toBeLessThan(before);
  });

  it('reset button restores the initial viewBox', () => {
    const { container } = render(<MapView onSelect={() => {}} />);
    const svg = container.querySelector('svg')!;
    const initial = svg.getAttribute('viewBox')!;
    fireEvent.click(container.querySelector('button[title="Zoom in"]')!);
    fireEvent.click(container.querySelector('button[title="Reset view"]')!);
    expect(svg.getAttribute('viewBox')).toBe(initial);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/map/MapView.zoom.test.tsx`
Expected: FAIL — no zoom buttons exist yet.

- [ ] **Step 3: Add pan/zoom state to MapView**

In `src/components/map/MapView.tsx`, replace the `export default function MapView` body with a version holding `viewBox` in state and wiring pointer/wheel/buttons. Add these imports at the top: `import React, { useState, useRef, useCallback } from 'react';`

Replace the component with:

```tsx
export default function MapView({
  onSelect,
}: {
  onSelect: (n: MapNode) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [vb, setVb] = useState({ ...VB0 });
  const drag = useRef<{ x: number; y: number; vx: number; vy: number } | null>(
    null
  );

  const gridLines: React.ReactNode[] = [];
  for (let gx = 0; gx <= FIELD.w; gx += GRID)
    gridLines.push(
      <line
        key={`v${gx}`}
        className="map-grid"
        x1={gx}
        y1={0}
        x2={gx}
        y2={FIELD.h}
        strokeWidth={1}
      />
    );
  for (let gy = 0; gy <= FIELD.h; gy += GRID)
    gridLines.push(
      <line
        key={`h${gy}`}
        className="map-grid"
        x1={0}
        y1={gy}
        x2={FIELD.w}
        y2={gy}
        strokeWidth={1}
      />
    );

  const zoomAt = useCallback((cx: number, cy: number, factor: number) => {
    setVb((v) => {
      const nw = Math.min(VB0.w * 2.2, Math.max(VB0.w * 0.35, v.w * factor));
      const k = nw / v.w;
      return {
        x: cx - (cx - v.x) * k,
        y: cy - (cy - v.y) * k,
        w: nw,
        h: v.h * k,
      };
    });
  }, []);

  const toSvg = (clientX: number, clientY: number) => {
    const r = svgRef.current!.getBoundingClientRect();
    return {
      x: vb.x + ((clientX - r.left) / r.width) * vb.w,
      y: vb.y + ((clientY - r.top) / r.height) * vb.h,
    };
  };

  const onWheel = (e: React.WheelEvent) => {
    const p = toSvg(e.clientX, e.clientY);
    zoomAt(p.x, p.y, e.deltaY > 0 ? 1.1 : 0.9);
  };
  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as Element).closest('g.map-node')) return; // clicks on nodes select, don't pan
    drag.current = { x: e.clientX, y: e.clientY, vx: vb.x, vy: vb.y };
    svgRef.current!.classList.add('dragging');
    svgRef.current!.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const r = svgRef.current!.getBoundingClientRect();
    setVb((v) => ({
      ...v,
      x: drag.current!.vx - ((e.clientX - drag.current!.x) / r.width) * v.w,
      y: drag.current!.vy - ((e.clientY - drag.current!.y) / r.height) * v.h,
    }));
  };
  const onPointerUp = () => {
    drag.current = null;
    svgRef.current?.classList.remove('dragging');
  };

  return (
    <div className="mapwrap">
      <svg
        ref={svgRef}
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        role="img"
        aria-label="Relational map of work"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {gridLines}
        <Links />
        {WORKS.map((n) => {
          const l = labelXY(n);
          return (
            <g
              className="map-node"
              data-id={n.id}
              key={n.id}
              onClick={() => onSelect(n)}
            >
              <NodeDot n={n} />
              <text
                className={n.dim ? 'dim' : ''}
                x={l.x}
                y={l.y}
                textAnchor={l.anchor}
                fontFamily={n.hub ? 'var(--font-primary)' : undefined}
                fontSize={n.hub ? 15 : undefined}
                fill={n.hub ? col(n) : undefined}
              >
                {n.title}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="ctrl">
        <button
          title="Zoom in"
          onClick={() => zoomAt(vb.x + vb.w / 2, vb.y + vb.h / 2, 0.8)}
        >
          +
        </button>
        <button
          title="Zoom out"
          onClick={() => zoomAt(vb.x + vb.w / 2, vb.y + vb.h / 2, 1.25)}
        >
          −
        </button>
        <button title="Reset view" onClick={() => setVb({ ...VB0 })}>
          ⌂
        </button>
      </div>
      <p className="hint">
        Drag to pan, scroll to zoom. Tap a stop to open the work.
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Run all MapView tests to verify they pass**

Run: `npx vitest run src/components/map/MapView.test.tsx src/components/map/MapView.zoom.test.tsx`
Expected: PASS (5 tests total).

- [ ] **Step 5: Commit**

```bash
git add src/components/map/MapView.tsx src/components/map/MapView.zoom.test.tsx
git commit -m "feat: add pan/zoom to MapView"
```

---

## Task 10: New Home page

**Files:**

- Rewrite: `src/pages/Home.tsx`
- Test: `src/pages/Home.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/pages/Home.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

const renderHome = () =>
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

describe('Home', () => {
  it('defaults to the Map view', () => {
    const { container } = renderHome();
    expect(screen.getByRole('button', { name: /map/i })).toHaveClass('on');
    expect(
      container.querySelector('svg[aria-label="Relational map of work"]')
    ).toBeInTheDocument();
  });

  it('switches to the Index view', () => {
    renderHome();
    fireEvent.click(screen.getByRole('button', { name: /index/i }));
    expect(
      screen.getByRole('heading', { name: /platform/i })
    ).toBeInTheDocument();
  });

  it('shows the rail identity in both views', () => {
    renderHome();
    expect(screen.getByText(/Felipe/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/Home.test.tsx`
Expected: FAIL — old Home renders Field/Viewport, no Map svg / Index heading.

- [ ] **Step 3: Rewrite Home.tsx**

Replace the entire contents of `src/pages/Home.tsx` with:

```tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rail from '../components/map/Rail';
import ViewToggle, { type View } from '../components/map/ViewToggle';
import MapView from '../components/map/MapView';
import IndexView from '../components/map/IndexView';
import { CAT, type MapNode } from '../data/mapData';
import '../components/map/map.css';

export default function Home() {
  const [view, setView] = useState<View>('map');
  const navigate = useNavigate();

  const onSelect = (n: MapNode) => {
    if (n.external && n.href) window.open(n.href, '_blank', 'noopener');
    else navigate(`/work/${n.id}`);
  };

  return (
    <div className="app-shell">
      <Rail />
      <main className="mapstage">
        <div className="topbar">
          <ViewToggle view={view} onChange={setView} />
          <div className="legend">
            {(['platform', 'writing', 'design', 'video'] as const).map((k) => (
              <div key={k}>
                <i style={{ background: CAT[k].color }} />
                {CAT[k].label}
              </div>
            ))}
          </div>
        </div>
        {view === 'map' ? (
          <MapView onSelect={onSelect} />
        ) : (
          <IndexView onSelect={onSelect} />
        )}
      </main>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/pages/Home.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home.tsx src/pages/Home.test.tsx
git commit -m "feat: rewrite Home with rail + Index/Map toggle"
```

---

## Task 11: CaseStudy page + route

**Files:**

- Create: `src/pages/CaseStudy.tsx`
- Test: `src/pages/CaseStudy.test.tsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Write the failing test**

Create `src/pages/CaseStudy.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CaseStudy from './CaseStudy';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/work/:slug" element={<CaseStudy />} />
      </Routes>
    </MemoryRouter>
  );

describe('CaseStudy', () => {
  it('renders the title + meta for a known design slug', () => {
    renderAt('/work/visid');
    expect(
      screen.getByRole('heading', { name: /Visual identity, MARE/ })
    ).toBeInTheDocument();
  });

  it('shows a not-found message for an unknown slug', () => {
    renderAt('/work/nope');
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/CaseStudy.test.tsx`
Expected: FAIL — cannot resolve `./CaseStudy`.

- [ ] **Step 3: Implement CaseStudy**

Create `src/pages/CaseStudy.tsx`:

```tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { nodeById, CAT } from '../data/mapData';
import '../components/map/map.css';

export default function CaseStudy() {
  const { slug } = useParams();
  const node = slug ? nodeById(slug) : undefined;

  if (!node) {
    return (
      <main style={{ padding: '64px 40px', maxWidth: 720, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-utility)' }}>Work not found.</p>
        <Link to="/" style={{ color: 'var(--accent-pink)' }}>
          ← Back to the map
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: '64px 40px', maxWidth: 860, margin: '0 auto' }}>
      <Link
        to="/"
        style={{
          fontFamily: 'var(--font-utility)',
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--accent-green)',
        }}
      >
        ← Back to the map
      </Link>
      <div
        style={{
          fontFamily: 'var(--font-utility)',
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: CAT[node.cat].color,
          marginTop: 32,
        }}
      >
        {CAT[node.cat].label}
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-primary)',
          fontSize: 44,
          margin: '8px 0 0',
          color: 'var(--accent-pink)',
        }}
      >
        {node.title}
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-utility)',
          fontSize: 13,
          color: 'var(--ink-dim)',
        }}
      >
        {node.meta}
      </p>
      {/* TODO: hero image (public/case-studies/<slug>/), numbered sections, full-bleed media, reflection */}
      <div
        style={{
          marginTop: 40,
          border: '1px dashed var(--line-soft)',
          padding: 40,
          fontFamily: 'var(--font-utility)',
          fontSize: 13,
          color: 'var(--ink-faint)',
        }}
      >
        Case study content coming soon.
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Add the route in App.jsx**

In `src/App.jsx`, add the import near the other page imports:

```jsx
import CaseStudy from './pages/CaseStudy';
```

And add this `<Route>` inside `<Routes>` (before the `path="*"` catch-all):

```jsx
<Route exact path="/work/:slug" element={<CaseStudy></CaseStudy>}></Route>
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/pages/CaseStudy.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add src/pages/CaseStudy.tsx src/pages/CaseStudy.test.tsx src/App.jsx
git commit -m "feat: add CaseStudy page and /work/:slug route"
```

---

## Task 12: Remove the obsolete learn-react test + cleanup

**Files:**

- Modify/Delete: `src/App.test.js`
- Check: orphaned `FieldPanel.tsx`, `ViewportPanel.tsx`, `MobileNav.tsx`, `ProjectDetail.tsx`

- [ ] **Step 1: Replace the stale App test**

The old `src/App.test.js` asserts "learn react" text that no longer exists. Replace its contents with a smoke test:

```js
import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders the rail identity on the home route', () => {
  render(<App />);
  expect(screen.getByText(/Felipe/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the full suite**

Run: `npm run test:run`
Expected: all tests PASS (mapData, mapGeometry, Rail, ViewToggle, IndexView, MapView ×2, Home, CaseStudy, App).

- [ ] **Step 3: Check for now-orphaned components**

Run: `git grep -l "FieldPanel\|ViewportPanel\|MobileNav" -- src`
Expected: only their own files reference them (Home no longer imports them).
If confirmed orphaned, delete `src/components/FieldPanel.tsx`, `src/components/ViewportPanel.tsx`, `src/components/MobileNav.tsx` and any test files. Do NOT delete `HexagramGlyph.tsx` or `ProjectDetail.tsx` without checking other routes (`Renders`, etc.) first with `git grep`.

- [ ] **Step 4: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint passes (fix any new warnings in created files).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: update App smoke test, remove orphaned Field/Viewport components"
```

---

## Task 13: Manual verification in the running app

**Files:** none (verification only)

- [ ] **Step 1: Run the dev server**

Run: `npm run dev`
Open the printed localhost URL.

- [ ] **Step 2: Verify against this checklist**

- Lands on Map view; rail shows name/bio/nav/latest/hexagram.
- Map shows 15 capsule nodes, two cored hubs (MARE, Namshub), heavy green writing trail, two-tone slashed relations (Condition→MARE, MARE→Namshub, Flesh→Namshub contoured).
- Drag empty space pans; scroll zooms; +/−/⌂ work.
- Toggle → Index shows category groups; clicking a writing row opens Substack (new tab); clicking a design row (e.g. Visual identity, MARE) navigates to `/work/visid` and shows the case-study placeholder; back link returns to `/`.
- No console errors.
- Resize below 820px: rail stacks on top, layout holds.

- [ ] **Step 3: Note any defects** and fix in follow-up commits referencing this task.

---

## Notes for the implementer

- **Test runner is Vitest** (`npx vitest run <file>` for one file, `npm run test:run` for all). jsdom is configured via `vite.config.ts`.
- SVG is rendered with **JSX**, not the mockup's imperative `createElementNS`. Behaviour/geometry must match `public/mockups/map.html` exactly; that file is the reference.
- CSS-variable names differ from the mockup: production uses the OG names `--bg-primary`, `--text-primary`, `--accent-pink`, `--accent-green`, `--font-primary`, `--font-utility` (Task 1 adds the rest). Do not introduce the mockup's `--bg`/`--ink` aliases.
- jsdom does not implement `setPointerCapture`/`getBoundingClientRect` sizing; pan tests only assert zoom-button viewBox math (which is pure state). Don't write pan tests that depend on real layout boxes.
