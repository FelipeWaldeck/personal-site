import React, { useState, useRef, useCallback } from 'react';
import { CAT, WORKS, LINKS, nodeById, type MapNode, type LabelPos } from '../../data/mapData';
import { linkPath } from '../../lib/mapGeometry';

const GRID = 40;
const VB0 = { x: 120, y: 90, w: 880, h: 700 };
// A large fixed grid plane so the grid fills the full-bleed map at any zoom/pan, rather than
// stopping at the old field edges. Not infinite — just generously sized around the content.
const PLANE = { x: -2000, y: -2000, w: 5000, h: 5000 };

const GridPlane = () => (
  <>
    <defs>
      <pattern id="mapgrid" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
        <path className="map-grid" d={`M${GRID} 0 H0 V${GRID}`} fill="none" strokeWidth={1} />
      </pattern>
    </defs>
    <rect x={PLANE.x} y={PLANE.y} width={PLANE.w} height={PLANE.h} fill="url(#mapgrid)" />
  </>
);

const col = (n: MapNode) => CAT[n.cat].color;

function labelXY(n: MapNode): { x: number; y: number; anchor: 'middle' | 'start' | 'end' } {
  const [x, y] = n.g;
  const rad = n.hub ? 17 : n.collab ? 9 : 8;
  const lbl: LabelPos = n.label;
  if (lbl === 'up') return { x, y: y - rad - 10, anchor: 'middle' };
  if (lbl === 'down') return { x, y: y + rad + 18, anchor: 'middle' };
  if (lbl === 'left') return { x: x - rad - 9, y: y + 4, anchor: 'end' };
  return { x: x + rad + 9, y: y + 4, anchor: 'start' };
}

function NodeDot({ n }: { n: MapNode }) {
  const [x, y] = n.g, c = col(n), op = n.dim ? 0.55 : 1;
  if (n.hub) return (<>
    {/* moat: a bg-coloured disc that isolates the interchange from the lines passing under it */}
    <circle cx={x} cy={y} r={15} fill="var(--bg-primary)" />
    {/* bold solid disc — the hub reads as the heaviest marker, not a hollow donut */}
    <circle className="node-dot" cx={x} cy={y} r={12} fill={c} />
  </>);
  if (n.collab) return <circle className="node-dot" cx={x} cy={y} r={9} fill="var(--bg-primary)" stroke={c} strokeWidth={2.5} />;
  return (<>
    <circle className="node-dot" cx={x} cy={y} r={8} fill={c} opacity={op} />
    <circle cx={x} cy={y} r={3} fill="var(--bg-primary)" opacity={op} />
  </>);
}

function NodeLabel({ n }: { n: MapNode }) {
  const l = labelXY(n);
  if (!n.hub) {
    return <text className={n.dim ? 'dim' : ''} x={l.x} y={l.y} textAnchor={l.anchor}>{n.title}</text>;
  }
  // hub titles sit in the densest crossing zones; a bg-coloured plate makes the lines stop
  // cleanly behind the text instead of running through it.
  const fs = 15;
  const w = n.title.length * fs * 0.62 + 14;
  const x0 = l.anchor === 'middle' ? l.x - w / 2 : l.anchor === 'end' ? l.x - w + 7 : l.x - 7;
  return (<>
    <rect className="hub-plate" x={x0} y={l.y - fs + 2} width={w} height={fs + 4} />
    <text className="hub-label" x={l.x} y={l.y} textAnchor={l.anchor}
      fontFamily="var(--font-primary)" fontSize={fs} fill={col(n)}>{n.title}</text>
  </>);
}

function Links() {
  const out: React.ReactNode[] = [];
  LINKS.forEach(([a, b, kind], i) => {
    const na = nodeById(a), nb = nodeById(b);
    if (!na || !nb) return; // skip malformed link rather than crash
    const d = linkPath(na.g, nb.g, kind);
    if (kind === 'cross' || kind === 'crossdash') {
      out.push(<path key={`${i}a`} className="map-cross" d={d} stroke={col(na)} strokeDasharray="11 11" />);
      out.push(<path key={`${i}b`} className="map-cross" d={d} stroke={col(nb)} strokeDasharray="11 11" strokeDashoffset={11} />);
    } else {
      out.push(<path key={i} className={kind === 'dash' ? 'map-dash' : 'map-spine'} d={d} stroke={col(na)} />);
    }
  });
  return <>{out}</>;
}

export default function MapView({ onSelect }: { onSelect: (n: MapNode) => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [vb, setVb] = useState({ ...VB0 });
  const drag = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);

  const zoomAt = useCallback((cx: number, cy: number, factor: number) => {
    setVb((v) => {
      const nw = Math.min(VB0.w * 2.2, Math.max(VB0.w * 0.35, v.w * factor));
      const k = nw / v.w;
      return { x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k, w: nw, h: v.h * k };
    });
  }, []);

  const toSvg = (clientX: number, clientY: number) => {
    const r = svgRef.current!.getBoundingClientRect();
    return { x: vb.x + ((clientX - r.left) / r.width) * vb.w, y: vb.y + ((clientY - r.top) / r.height) * vb.h };
  };

  const onWheel = (e: React.WheelEvent) => { const p = toSvg(e.clientX, e.clientY); zoomAt(p.x, p.y, e.deltaY > 0 ? 1.1 : 0.9); };
  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as Element).closest('g.map-node')) return; // clicks on nodes select, don't pan
    drag.current = { x: e.clientX, y: e.clientY, vx: vb.x, vy: vb.y };
    svgRef.current!.classList.add('dragging');
    svgRef.current!.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current; // capture: pointerup may null drag.current before the updater commits
    if (!d) return;
    const r = svgRef.current!.getBoundingClientRect();
    setVb((v) => ({ ...v, x: d.vx - ((e.clientX - d.x) / r.width) * v.w, y: d.vy - ((e.clientY - d.y) / r.height) * v.h }));
  };
  const onPointerUp = () => { drag.current = null; svgRef.current?.classList.remove('dragging'); };

  return (
    <div className="mapwrap">
      <svg ref={svgRef} viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} role="img" aria-label="Relational map of work"
        onWheel={onWheel} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
        <GridPlane />
        <Links />
        {WORKS.map((n) => (
          <g className="map-node" data-id={n.id} key={n.id} onClick={() => onSelect(n)}>
            <NodeDot n={n} />
            <NodeLabel n={n} />
          </g>
        ))}
      </svg>
      <div className="ctrl">
        <button title="Zoom in" onClick={() => zoomAt(vb.x + vb.w / 2, vb.y + vb.h / 2, 0.8)}>+</button>
        <button title="Zoom out" onClick={() => zoomAt(vb.x + vb.w / 2, vb.y + vb.h / 2, 1.25)}>−</button>
        <button title="Reset view" onClick={() => setVb({ ...VB0 })}>⌂</button>
      </div>
      <p className="hint">Drag to pan, scroll to zoom. Tap a stop to open the work.</p>
    </div>
  );
}
