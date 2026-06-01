import React, { useState, useRef, useCallback } from 'react';
import { CAT, WORKS, LINKS, nodeById, type MapNode, type LabelPos } from '../../data/mapData';
import { linkPath } from '../../lib/mapGeometry';

const FIELD = { w: 1040, h: 820 };
const GRID = 40;
const VB0 = { x: 120, y: 90, w: 880, h: 700 };

const GRID_LINES: React.ReactNode[] = (() => {
  const lines: React.ReactNode[] = [];
  for (let gx = 0; gx <= FIELD.w; gx += GRID) lines.push(<line key={`v${gx}`} className="map-grid" x1={gx} y1={0} x2={gx} y2={FIELD.h} strokeWidth={1} />);
  for (let gy = 0; gy <= FIELD.h; gy += GRID) lines.push(<line key={`h${gy}`} className="map-grid" x1={0} y1={gy} x2={FIELD.w} y2={gy} strokeWidth={1} />);
  return lines;
})();

const col = (n: MapNode) => CAT[n.cat].color;

function labelXY(n: MapNode): { x: number; y: number; anchor: 'middle' | 'start' | 'end' } {
  const [x, y] = n.g;
  const rad = n.hub ? 12 : n.collab ? 9 : 8;
  const lbl: LabelPos = n.label;
  if (lbl === 'up') return { x, y: y - rad - 10, anchor: 'middle' };
  if (lbl === 'down') return { x, y: y + rad + 18, anchor: 'middle' };
  if (lbl === 'left') return { x: x - rad - 9, y: y + 4, anchor: 'end' };
  return { x: x + rad + 9, y: y + 4, anchor: 'start' };
}

function NodeDot({ n }: { n: MapNode }) {
  const [x, y] = n.g, c = col(n), op = n.dim ? 0.55 : 1;
  if (n.hub) return (<>
    <circle className="node-dot" cx={x} cy={y} r={12} fill={c} />
    <circle cx={x} cy={y} r={5} fill="var(--bg-primary)" />
  </>);
  if (n.collab) return <circle className="node-dot" cx={x} cy={y} r={9} fill="var(--bg-primary)" stroke={c} strokeWidth={2.5} />;
  return (<>
    <circle className="node-dot" cx={x} cy={y} r={8} fill={c} opacity={op} />
    <circle cx={x} cy={y} r={3} fill="var(--bg-primary)" opacity={op} />
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
    if (!drag.current) return;
    const r = svgRef.current!.getBoundingClientRect();
    setVb((v) => ({ ...v, x: drag.current!.vx - ((e.clientX - drag.current!.x) / r.width) * v.w, y: drag.current!.vy - ((e.clientY - drag.current!.y) / r.height) * v.h }));
  };
  const onPointerUp = () => { drag.current = null; svgRef.current?.classList.remove('dragging'); };

  return (
    <div className="mapwrap">
      <svg ref={svgRef} viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} role="img" aria-label="Relational map of work"
        onWheel={onWheel} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
        {GRID_LINES}
        <Links />
        {WORKS.map((n) => {
          const l = labelXY(n);
          return (
            <g className="map-node" data-id={n.id} key={n.id} onClick={() => onSelect(n)}>
              <NodeDot n={n} />
              <text className={n.dim ? 'dim' : ''} x={l.x} y={l.y} textAnchor={l.anchor}
                fontFamily={n.hub ? 'var(--font-primary)' : undefined}
                fontSize={n.hub ? 15 : undefined} fill={n.hub ? col(n) : undefined}>{n.title}</text>
            </g>
          );
        })}
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
