import React from 'react';

/**
 * MareDesignSystem — the design-language board: the core four-swatch bar beside a
 * type specimen, plus a slim ink-hierarchy row. Tightened from the Paper board
 * (5R-0) to read as one calm unit. Values lifted verbatim.
 */

const SWATCHES: { name: string; hex: string; dark: boolean }[] = [
  { name: 'Carbon', hex: '#121010', dark: true },
  { name: 'Surface', hex: '#1A1715', dark: true },
  { name: 'Copper', hex: '#C4956A', dark: false },
  { name: 'Ink', hex: '#E8E4E0', dark: false },
];

const INK: [string, string][] = [
  ['ink', 'rgba(232,228,224,1)'],
  ['80', 'rgba(232,228,224,0.8)'],
  ['65', 'rgba(232,228,224,0.65)'],
  ['50', 'rgba(232,228,224,0.5)'],
  ['30', 'rgba(232,228,224,0.3)'],
  ['15', 'rgba(232,228,224,0.15)'],
  ['08', 'rgba(232,228,224,0.08)'],
];

export default function MareDesignSystem() {
  return (
    <>
      <div className="board">
        <div className="swatches">
          {SWATCHES.map((s) => (
            <div
              className="swatch"
              key={s.name}
              style={{ background: s.hex, color: s.dark ? '#E8E4E0' : '#1A1210' }}
            >
              <b>{s.name}</b>
              <code style={{ opacity: s.dark ? 0.55 : 0.7 }}>{s.hex}</code>
            </div>
          ))}
        </div>

        <div className="type">
          <div className="type__spec">
            <span className="type__serif">Frontier</span>
            <span className="type__face">Plex Serif</span>
          </div>
          <div className="type__spec">
            <span className="type__sans">Collections, clustered.</span>
            <span className="type__face">Plex Sans</span>
          </div>
          <div className="type__spec">
            <span className="type__mono">RECLUSTER · 0.4s</span>
            <span className="type__face">Plex Mono</span>
          </div>
        </div>
      </div>

      <div className="ink">
        <span className="ink__label">Ink hierarchy</span>
        {INK.map(([label, color]) => (
          <div
            className="ink__dot"
            key={label}
            title={label}
            style={{
              background: color,
              border: label === '08' ? '1px solid rgba(232,228,224,0.15)' : undefined,
            }}
          />
        ))}
      </div>
    </>
  );
}
