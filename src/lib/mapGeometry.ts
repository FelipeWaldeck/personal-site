import type { LinkKind } from '../data/mapData';

type Pt = { x: number; y: number };
const toPt = (p: [number, number]): Pt => ({ x: p[0], y: p[1] });

export function roundedPath(pts: Pt[], r: number): string {
  if (pts.length < 2) return '';
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p0 = pts[i - 1], p1 = pts[i], p2 = pts[i + 1];
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
  const p = toPt(a), q = toPt(b);
  if (Math.abs(p.x - q.x) < 2 || Math.abs(p.y - q.y) < 2) return `M${p.x} ${p.y} L${q.x} ${q.y}`;
  return roundedPath([p, { x: p.x, y: q.y }, q], 14);
}

export function smooth(a: [number, number], b: [number, number]): string {
  const p = toPt(a), q = toPt(b);
  const dx = q.x - p.x, dy = q.y - p.y;
  if (Math.abs(dx) >= Math.abs(dy)) {
    const c = Math.abs(dx) * 0.45;
    return `M${p.x} ${p.y} C ${p.x + Math.sign(dx) * c} ${p.y}, ${q.x - Math.sign(dx) * c} ${q.y}, ${q.x} ${q.y}`;
  }
  const c = Math.abs(dy) * 0.45;
  return `M${p.x} ${p.y} C ${p.x} ${p.y + Math.sign(dy) * c}, ${q.x} ${q.y - Math.sign(dy) * c}, ${q.x} ${q.y}`;
}

/** cross = smooth curve; flow/crossdash/dash = orthogonal grid route */
export function linkPath(a: [number, number], b: [number, number], kind: LinkKind): string {
  return kind === 'cross' ? smooth(a, b) : ortho(a, b);
}
