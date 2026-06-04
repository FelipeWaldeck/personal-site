import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rail from '../components/map/Rail';
import ViewToggle, { type View } from '../components/map/ViewToggle';
import MapView from '../components/map/MapView';
import IndexView from '../components/map/IndexView';
import NodeDetail from '../components/map/NodeDetail';
import { CAT, type MapNode } from '../data/mapData';
import { useBodyClass } from '../lib/useBodyClass';
import '../components/map/map.css';

export default function Home() {
  const [view, setView] = useState<View>('map');
  const [modalNode, setModalNode] = useState<MapNode | null>(null);
  const navigate = useNavigate();

  useBodyClass('detail-open', modalNode != null); // dims the bouncing horse while the panel is up

  const onSelect = (n: MapNode) => {
    if (n.caseStudy) navigate(`/work/${n.caseStudySlug ?? n.id}`);
    else setModalNode(n);
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
        <NodeDetail node={modalNode} onClose={() => setModalNode(null)} />
      </main>
    </div>
  );
}
