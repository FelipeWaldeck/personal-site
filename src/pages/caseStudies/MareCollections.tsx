import React from 'react';
import { MARE_REFS } from './mareRefs';

/**
 * MareCollections — the Collections page rebuilt as live UI (not a screenshot):
 * crisp at any resolution, theme-able, and richly annotated — hover almost any
 * region for an explanation (data-explain). Driven by the real items + real
 * collection names pulled from the account.
 */

const BY_COLLECTION = MARE_REFS.reduce<Record<string, typeof MARE_REFS>>((acc, r) => {
  (acc[r.collection] ??= []).push(r);
  return acc;
}, {});

const DESCRIPTIONS: Record<string, string> = {
  'Visualizing Abstract Concepts':
    'Visualizations spanning scientific, philosophical, and esoteric systems of knowledge.',
  'Digital Futures Art':
    'Algorithmic glitches, abstract forms, retro-game aesthetics, and transhumanist visions.',
  'Abstract & Architectural Visions':
    'Abstract painting, surreal architecture, and speculative structural design.',
  'Post-Internet Visual Art':
    'Net-native imagery, post-digital culture, and the visual language of the feed.',
  'Global Religious Iconography':
    'Devotional images, sacred diagrams, and iconography across traditions.',
};

const COLLECTIONS = Object.entries(BY_COLLECTION)
  .filter(([, items]) => items.length >= 4)
  .slice(0, 3);

const SIDE = MARE_REFS.slice(5, 9);

const LENSES = [
  { name: 'Balanced', on: true, why: 'Weighs look and meaning together.' },
  { name: 'Aesthetic', on: false, why: 'Groups by how things look.' },
  { name: 'Semantic', on: false, why: 'Groups by what things mean.' },
];

export default function MareCollections() {
  return (
    <div className="mc" aria-label="The MARE Collections page, reconstructed as live UI">
      {/* top bar */}
      <div className="mc__bar">
        <div className="mc__brand">
          <span className="mc__m" data-explain="Your whole visual library, one workspace.">
            <span className="mc__horse" aria-hidden="true" />
          </span>
          <span className="mc__title">Collections</span>
        </div>
        <div className="mc__search" data-explain="Search every collection and item at once.">
          Search collections…
        </div>
        <div className="mc__chrome">
          <span className="mc__plan" data-explain="Free tier — 91 of 100 items used.">
            Free 91/100
          </span>
          <span className="mc__icon" />
          <span className="mc__icon" />
        </div>
      </div>

      {/* lenses + stats */}
      <div className="mc__lenses">
        {LENSES.map((l) => (
          <span
            key={l.name}
            className={`mc__lens ${l.on ? 'mc__lens--on' : ''}`}
            data-explain={l.why}
          >
            {l.name}
          </span>
        ))}
        <span className="mc__recluster" data-explain="Re-runs clustering as the archive grows — in seconds.">
          ↻ Recluster
        </span>
        <span className="mc__stats" data-explain="456 items, 450 auto-clustered into named collections.">
          456 items · 450 clustered · 6 unclustered
        </span>
      </div>

      <div className="mc__body">
        {/* sidebar */}
        <aside className="mc__side">
          <div className="mc__sect">
            <div className="mc__secthead" data-explain="New saves wait here until MARE clusters them.">
              <span>Unclustered</span>
              <span className="mc__badge">6</span>
            </div>
            <div className="mc__rows">
              {SIDE.slice(0, 2).map((it) => (
                <div className="mc__row" key={it.src}>
                  <div className="mc__thumb" style={{ backgroundImage: `url(${it.src})` }} />
                  <span className="mc__rowname">{it.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mc__sect">
            <div className="mc__secthead" data-explain="The latest things you saved.">
              <span>Recent items</span>
            </div>
            <div className="mc__rows">
              {SIDE.slice(2).map((it) => (
                <div className="mc__row" key={it.src}>
                  <div className="mc__thumb" style={{ backgroundImage: `url(${it.src})` }} />
                  <span className="mc__rowname">{it.title}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* main: collection rows */}
        <div className="mc__main">
          {COLLECTIONS.map(([name, items], ci) => (
            <div className="mc__col" key={name}>
              <div className="mc__colhead">
                <span className="mc__colname" data-explain="MARE invented this collection name itself.">
                  {name}
                </span>
                <span className="mc__colcount">{(items.length + ci) * 9 + 30} items</span>
              </div>
              <p className="mc__coldesc">{DESCRIPTIONS[name] ?? 'A collection MARE named and filled on its own.'}</p>
              <div className="mc__cards">
                {items.slice(0, 5).map((it, i) => (
                  <div className="mc__card" key={it.src}>
                    <div
                      className="mc__cardimg"
                      data-explain={
                        ci === 0 && i === 1
                          ? 'Every item: identified, sourced, summarised, and re-rendered at full quality.'
                          : undefined
                      }
                    >
                      <img src={it.src} alt="" loading="lazy" />
                    </div>
                    <div className="mc__cardmeta">
                      <span className="mc__cardname">{it.title}</span>
                      <span className="mc__cardcount">{(i + 3) * 4} core · +{i * 6 + 7}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
