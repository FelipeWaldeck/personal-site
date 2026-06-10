import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MARE_REFS } from './mareRefs';

/**
 * MareClustering — the "it names the collections itself" slide, faithful to the
 * real Recluster: each lens both RENAMES the collections and RESCRAMBLES which
 * items fall into them. Three collection cards rewrite their names and the same
 * items FLIP between them on every cycle. Lens names + counts are real (456-item
 * account); the same library, read three ways.
 */

const TILES = MARE_REFS.slice(0, 12);

// each lens: three real collection names (+ real counts) and a partition of the
// 12 items across them — the partition differs per lens, so items visibly re-sort
const LENSES: {
  name: string;
  gloss: string;
  buckets: { name: string; count: number; items: number[] }[];
}[] = [
  {
    name: 'Balanced',
    gloss: 'weighs look and meaning together',
    buckets: [
      { name: 'Visualizing Abstract Concepts', count: 39, items: [0, 3, 6, 9] },
      { name: 'Digital Futures Art', count: 37, items: [1, 4, 7, 10] },
      { name: 'Abstract & Architectural Visions', count: 37, items: [2, 5, 8, 11] },
    ],
  },
  {
    name: 'Aesthetic',
    gloss: 'groups by how it looks',
    buckets: [
      { name: 'Post-Digital Visual Culture', count: 160, items: [0, 1, 2, 3] },
      { name: 'World Religious Iconography', count: 62, items: [4, 5, 6, 7] },
      { name: 'Neo-Japan Futurism', count: 53, items: [8, 9, 10, 11] },
    ],
  },
  {
    name: 'Semantic',
    gloss: 'groups by what it means',
    buckets: [
      { name: 'Abstracted Knowledge Representation', count: 358, items: [2, 7, 10, 1] },
      { name: 'Dystopian Social Commentary', count: 16, items: [0, 5, 8, 11] },
      { name: 'Retro Game Environments', count: 15, items: [3, 4, 6, 9] },
    ],
  },
];

export default function MareClustering() {
  const [lens, setLens] = useState(0);
  const boardRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<Map<string, DOMRect>>(new Map());

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setLens((l) => (l + 1) % LENSES.length), 6500);
    return () => clearInterval(id);
  }, []);

  // FLIP across cards: each item glides from its old slot to its new one
  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const tiles = Array.from(board.querySelectorAll<HTMLElement>('[data-tile]'));
    tiles.forEach((t) => {
      const key = t.dataset.tile!;
      const prev = posRef.current.get(key);
      const rect = t.getBoundingClientRect();
      if (prev) {
        const dx = prev.left - rect.left;
        const dy = prev.top - rect.top;
        if (dx || dy) {
          t.style.transition = 'none';
          t.style.transform = `translate(${dx}px, ${dy}px)`;
          requestAnimationFrame(() => {
            t.style.transition = 'transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1)';
            t.style.transform = '';
          });
        }
      }
      posRef.current.set(key, rect);
    });
  }, [lens]);

  const active = LENSES[lens];

  return (
    <div className="recluster">
      <div className="recluster__bar">
        <div className="recluster__tabs" role="tablist" aria-label="Clustering lens">
          {LENSES.map((l, i) => (
            <button
              key={l.name}
              role="tab"
              aria-selected={i === lens}
              className={`recluster__tab ${i === lens ? 'on' : ''}`}
              onClick={() => setLens(i)}
            >
              {l.name}
            </button>
          ))}
        </div>
        <p className="recluster__gloss">
          <span className="recluster__lens">{active.name}</span> {active.gloss}
        </p>
      </div>

      <div className="recluster__board" ref={boardRef}>
        {active.buckets.map((b, slot) => (
          <div className="ccard" key={slot}>
            <div className="ccard__head">
              <span className="ccard__name" key={b.name}>{b.name}</span>
              <span className="ccard__count">{b.count}</span>
            </div>
            <div className="ccard__grid">
              {b.items.map((idx) => {
                const t = TILES[idx];
                return (
                  <div className="rtile" data-tile={t.src} key={t.src}>
                    <div className="rtile__img" style={{ backgroundImage: `url(${t.src})` }} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
