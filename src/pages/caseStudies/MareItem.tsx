import React from 'react';
import { MARE_REFS } from './mareRefs';

/**
 * MareItem — the item-detail view rebuilt as live UI (not a screenshot). A real
 * item rendered large, with the metadata panel MARE writes: source, the same
 * item filed under a different collection per lens, auto-extracted themes,
 * related items, and the context summary. Richly annotated (data-explain).
 */

// the hero item + a handful of related items, all real
const HERO =
  MARE_REFS.find((r) => /hell scroll/i.test(r.title)) ?? MARE_REFS[16] ?? MARE_REFS[0];
const RELATED = MARE_REFS.filter((r) => r.src !== HERO.src).slice(0, 5);

// the same item, named into a different collection under each lens (real names)
const LENS_COLLECTIONS: [string, string][] = [
  ['Global Religious Iconography', 'Balanced'],
  ['World Religious Iconography', 'Aesthetic'],
  ['Abstracted Knowledge Representation', 'Semantic'],
];

const THEMES = ['buddhism', 'afterlife', 'judgment', 'handscroll', 'narrative ink'];

const SWATCHES = ['#c4956a', '#8a6b3f', '#6e5a3a', '#3a3128', '#cabfb2'];

export default function MareItem() {
  return (
    <div className="mi" aria-label="A MARE item detail view, reconstructed as live UI">
      {/* left: the artwork */}
      <div className="mi__art">
        <div className="mi__arttitle">
          <span className="mi__artname">{HERO.title}</span>
          <span className="mi__artby">Unknown · 12th c.</span>
        </div>
        <div
          className="mi__image"
          style={{ backgroundImage: `url(${HERO.src})` }}
          data-explain="MARE re-renders the source at full quality."
        />
        <div className="mi__swatches" data-explain="The palette MARE pulled from the work.">
          {SWATCHES.map((c) => (
            <span key={c} className="mi__sw" style={{ background: c }} />
          ))}
        </div>
      </div>

      {/* right: the metadata MARE writes */}
      <div className="mi__panel">
        <div className="mi__src">
          <span className="mi__srctype" data-explain="Identified, then traced back to its source.">
            image / webp
          </span>
          <span className="mi__srcdate">Mar 2, 2026</span>
          <span className="mi__x">×</span>
        </div>

        <div className="mi__k">Title</div>
        <div className="mi__h1">{HERO.title}</div>
        <div className="mi__artistrow">
          <div>
            <div className="mi__k">Artist</div>
            <div className="mi__artist">Unknown</div>
          </div>
          <div>
            <div className="mi__k">Year</div>
            <div className="mi__artist">12th c.</div>
          </div>
        </div>

        <div className="mi__k" data-explain="The same item lands in a different collection under each lens.">
          Collections
        </div>
        <div className="mi__cols">
          {LENS_COLLECTIONS.map(([name, lens]) => (
            <div className="mi__col" key={lens}>
              <span className="mi__colname">{name}</span>
              <span className="mi__lens">{lens}</span>
            </div>
          ))}
        </div>

        <div className="mi__k" data-explain="Themes MARE extracted from the work.">Themes</div>
        <div className="mi__tags">
          {THEMES.map((t) => (
            <span className="mi__tag" key={t}>
              {t}
            </span>
          ))}
        </div>

        <div className="mi__k" data-explain="Other items MARE found related — across collections.">
          Related items
        </div>
        <div className="mi__related">
          {RELATED.map((r) => (
            <div key={r.src} className="mi__rel" style={{ backgroundImage: `url(${r.src})` }} />
          ))}
        </div>

        <div className="mi__k" data-explain="MARE writes the context summary itself.">Description</div>
        <p className="mi__desc">
          A Japanese handscroll depicting the Buddhist hells in vivid narrative sequence — sinners,
          demons, and the bureaucracy of judgment rendered in ink and colour on paper.
        </p>

        <div className="mi__chat" data-explain="Correct its reading in a line — every field is editable.">
          <span className="mi__caret">›</span>
          <span className="mi__chatph">Chat with Mare to edit context…</span>
        </div>
      </div>
    </div>
  );
}
