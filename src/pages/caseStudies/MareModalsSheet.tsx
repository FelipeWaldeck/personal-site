import React from 'react';

/**
 * MareModalsSheet — the "Modals Sheet — Dark" board rebuilt in HTML (not a screenshot).
 * The supporting modals that keep clustering legible and reversible: train, add, pin.
 */

const COLLECTIONS: [string, number, boolean][] = [
  ['Esoteric Diagrams', 14, true],
  ['Anatomical Studies', 9, false],
  ['Typography Archive', 23, false],
  ['Brutalist Forms', 7, false],
  ['Temple Architecture', 11, true],
];

export default function MareModalsSheet() {
  return (
    <div className="ms">
      {/* Train your clustering */}
      <div className="ms__modal">
        <div className="ms__head">
          <span className="ms__title">Train your clustering</span>
          <span className="ms__x">×</span>
        </div>
        <p className="ms__sub">Which image belongs with the anchor?</p>
        <div className="ms__train">
          <div className="ms__anchor" />
          <span className="ms__arrow">→</span>
          <div className="ms__pair">
            <div className="ms__opt ms__opt--on" /><span>A</span>
          </div>
          <div className="ms__pair">
            <div className="ms__opt" /><span>B</span>
          </div>
        </div>
        <div className="ms__foot">
          <span>Session: 7 of 20 pairs</span>
          <div className="ms__dots"><i className="on" /><i className="on" /><i /><i /><i /></div>
        </div>
      </div>

      {/* Add to Collections */}
      <div className="ms__modal">
        <div className="ms__head">
          <span className="ms__title">Add to Collections</span>
          <span className="ms__x">×</span>
        </div>
        <div className="ms__search">Search collections…</div>
        <div className="ms__list">
          {COLLECTIONS.map(([name, n, on]) => (
            <div className="ms__row" key={name}>
              <span className={`ms__check ${on ? 'on' : ''}`} />
              <span className="ms__rowname">{name}</span>
              <span className="ms__count">{n}</span>
            </div>
          ))}
        </div>
        <button className="ms__cta">Add to 2 collections</button>
      </div>

      {/* Pin item */}
      <div className="ms__modal">
        <div className="ms__head">
          <span className="ms__title">Pin item to Esoteric Diagrams</span>
          <span className="ms__x">×</span>
        </div>
        <div className="ms__search">Search items…</div>
        <div className="ms__grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className={`ms__thumb ${i === 1 ? 'on' : ''}`} key={i} />
          ))}
        </div>
        <button className="ms__cta">Pin 2 items</button>
      </div>
    </div>
  );
}
