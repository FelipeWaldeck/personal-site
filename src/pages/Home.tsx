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
              <div key={k}><i style={{ background: CAT[k].color }} />{CAT[k].label}</div>
            ))}
          </div>
        </div>
        {view === 'map' ? <MapView onSelect={onSelect} /> : <IndexView onSelect={onSelect} />}
      </main>
    </div>
  );
}
