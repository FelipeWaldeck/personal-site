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
      <div className="rail__name">Felipe<br />Waldeck</div>
      <p className="rail__bio">
        Researcher and writer on the cultural and political consequences of contemporary technical systems. Co-founder of MARE.
      </p>
      <nav className="rail__nav">
        <Link to="/cv">CV</Link>
        <Link to="/reading">Reading</Link>
        <a href="https://maredotrun.substack.com" target="_blank" rel="noreferrer">Substack ↗</a>
      </nav>
      <div className="rail__lbl">Latest writing</div>
      <div className="rail__latest">
        {LATEST.map((t) => (
          <a key={t} href="https://maredotrun.substack.com" target="_blank" rel="noreferrer">{t}</a>
        ))}
      </div>
      <div className="rail__hex">
        {/* Hexagram 52 ䷳ Gèn / Keeping Still — top→bottom: yang, yin, yin, yang, yin, yin */}
        <div className="glyph" aria-hidden="true">
          <i />
          <div className="split"><i /><i /></div>
          <div className="split"><i /><i /></div>
          <i />
          <div className="split"><i /><i /></div>
          <div className="split"><i /><i /></div>
        </div>
        <span>#52 · Keeping Still</span>
      </div>
    </aside>
  );
}
