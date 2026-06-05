import React from 'react';
import { CAT, WORKS, type Category, type MapNode } from '../../data/mapData';

const ORDER: Category[] = ['platform', 'writing', 'design', 'video'];

export default function IndexView({ onSelect }: { onSelect: (n: MapNode) => void }) {
  return (
    <div className="index">
      {ORDER.map((k) => {
        const items = WORKS.filter((w) => w.cat === k);
        if (!items.length) return null;
        return (
          <div className="group" key={k}>
            <div className="group__head">
              <h2 style={{ color: CAT[k].color }}>{CAT[k].label}</h2>
              <span>{String(items.length).padStart(2, '0')} entries</span>
            </div>
            <div className="group__rows">
              {items.map((w) => (
                <button className="row" key={w.id} onClick={() => onSelect(w)}>
                  <div className="row__t">{w.title}<small>{w.meta}</small></div>
                  <div className="row__c">›</div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
