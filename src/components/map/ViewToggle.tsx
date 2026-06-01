import React from 'react';

export type View = 'index' | 'map';

export default function ViewToggle({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  return (
    <div className="toggle">
      <button className={view === 'index' ? 'on' : ''} onClick={() => onChange('index')}>Index</button>
      <button className={view === 'map' ? 'on' : ''} onClick={() => onChange('map')}>Map</button>
    </div>
  );
}
