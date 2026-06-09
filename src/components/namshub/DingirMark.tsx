import React, { useMemo } from 'react';
import { DINGIR_PIXEL, DINGIR_RADIUS, DINGIR_POP_MS, DINGIR_PIXELS } from './dingirMarkData';

/* The NAMSHUB DINGIR (𒀭) as pixel wedges — the real cuneiform AN sign, ported
   verbatim from the app (splash/DingirMark.tsx + dingirMarkData.ts). The
   Librarian's sigil. Pure SVG rects + currentColor, so it's crisp at any size
   and follows the case-study theme. Optional scribe stamp-in on mount. */

interface Props {
  size?: number | string;
  color?: string;
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function DingirMark({ size = '100%', color = 'currentColor', animate = false, className, style }: Props) {
  const reduced = useMemo(
    () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  );
  const stamping = animate && !reduced;

  // Center on the ink centroid, not the bbox: the AN sign's mass sits up-left,
  // so a symmetric viewBox around 0 keeps the wedge-cluster optically centered.
  const viewBox = useMemo(() => {
    let max = 0;
    for (const p of DINGIR_PIXELS) {
      max = Math.max(max, Math.abs(p.x), Math.abs(p.x + DINGIR_PIXEL), Math.abs(p.y), Math.abs(p.y + DINGIR_PIXEL));
    }
    const h = max + DINGIR_PIXEL;
    return `${-h} ${-h} ${2 * h} ${2 * h}`;
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={style}
      role="img"
      aria-label="NAMSHUB"
    >
      {DINGIR_PIXELS.map((p, i) => (
        <rect
          key={i}
          x={p.x}
          y={p.y}
          width={DINGIR_PIXEL}
          height={DINGIR_PIXEL}
          rx={DINGIR_RADIUS}
          fill={color}
          style={stamping ? { opacity: 0, animation: `dingir-stamp ${DINGIR_POP_MS}ms ease-out ${p.d}ms both` } : undefined}
        />
      ))}
    </svg>
  );
}
