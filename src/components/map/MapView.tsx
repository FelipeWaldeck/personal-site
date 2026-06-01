import React from 'react';
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
  return (
    <div className="mapwrap">
      <svg viewBox={`${VB0.x} ${VB0.y} ${VB0.w} ${VB0.h}`} role="img" aria-label="Relational map of work">
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
      <p className="hint">Series run along the grid; relations curve across it. Tap a stop to open the work.</p>
    </div>
  );
}
