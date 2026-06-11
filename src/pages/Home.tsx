import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rail, { LATEST, SUBSTACK } from '../components/map/Rail';
import ViewToggle, { type View } from '../components/map/ViewToggle';
import MapView from '../components/map/MapView';
import IndexView from '../components/map/IndexView';
import NodeDetail from '../components/map/NodeDetail';
import MobileNav from '../components/MobileNav';
import { CAT, type MapNode } from '../data/mapData';
import { useBodyClass } from '../lib/useBodyClass';
import { useIsMobile } from '../lib/useMediaQuery';
import '../components/map/map.css';

export default function Home() {
  const [view, setView] = useState<View>('map');
  const [modalNode, setModalNode] = useState<MapNode | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useBodyClass('detail-open', modalNode != null); // dims the bouncing horse while the panel is up

  // The pan/zoom map is a desktop interaction; on a phone we always show the list.
  const activeView: View = isMobile ? 'index' : view;

  const onSelect = (n: MapNode) => {
    if (n.caseStudy) navigate(`/work/${n.caseStudySlug ?? n.id}`);
    else setModalNode(n);
  };

  return (
    <div className="app-shell">
      <Rail />
      <main className="mapstage">
        {!isMobile && (
          <div className="topbar">
            <ViewToggle view={view} onChange={setView} />
            <div className="legend">
              {(['platform', 'writing', 'design', 'video'] as const).map((k) => (
                <div key={k}>
                  <i style={{ background: CAT[k].color }} />
                  {CAT[k].label}
                </div>
              ))}
            </div>
          </div>
        )}
        {activeView === 'map' ? (
          <MapView onSelect={onSelect} />
        ) : (
          <IndexView onSelect={onSelect} />
        )}
        {isMobile && (
          <div className="mobile-latest">
            <div className="mobile-latest__lbl">Latest writing</div>
            {LATEST.map((t) => (
              <a key={t} href={SUBSTACK} target="_blank" rel="noreferrer">
                {t}
              </a>
            ))}
          </div>
        )}
        <NodeDetail node={modalNode} onClose={() => setModalNode(null)} />
      </main>
      <MobileNav activeTab="ARCHIVE" />
    </div>
  );
}
