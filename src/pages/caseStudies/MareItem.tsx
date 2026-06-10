import React from 'react';
import { MARE_REFS } from './mareRefs';

/**
 * MareItem — the item-detail view rebuilt as live UI (not a screenshot). A real,
 * well-sourced item rendered at its natural size, with the metadata MARE writes:
 * source, the same item filed under a different collection per lens, auto
 * themes, related items, and the context summary. Richly annotated.
 */

const HERO =
  MARE_REFS.find((r) => /ghost in the shell|innocence/i.test(r.title)) ??
  MARE_REFS.find((r) => /low.?polygon|robot|cyber|machine/i.test(r.title)) ??
  MARE_REFS[12] ??
  MARE_REFS[0];
const RELATED = MARE_REFS.filter((r) => r.src !== HERO.src).slice(0, 5);

// the same item, named into a different collection under each lens (real names)
const LENS_COLLECTIONS: [string, string][] = [
  ['Digital Futures Art', 'Balanced'],
  ['Neo-Japan Futurism', 'Aesthetic'],
  ['Abstracted Knowledge Representation', 'Semantic'],
];

const THEMES = ['cyberpunk', 'cybernetics', 'posthuman', 'anime', 'key art'];

const SWATCHES = ['#8fa6a8', '#3f5a62', '#2a363c', '#191f24', '#c4956a'];

export default function MareItem() {
  return (
    <div className="mi" aria-label="A MARE item detail view, reconstructed as live UI">
      {/* left: the artwork */}
      <div className="mi__art">
        <div className="mi__arttitle">
          <span className="mi__artname">Ghost in the Shell 2: Innocence</span>
          <span className="mi__artby">Mamoru Oshii · Production I.G · 2004</span>
        </div>
        <div className="mi__image" data-explain="Re-rendered from the source.">
          <img src={HERO.src} alt="Ghost in the Shell 2: Innocence key art" />
        </div>
        <div className="mi__swatches" data-explain="Palette, auto-extracted.">
          {SWATCHES.map((c) => (
            <span key={c} className="mi__sw" style={{ background: c }} />
          ))}
        </div>
      </div>

      {/* right: the metadata MARE writes */}
      <div className="mi__panel">
        <div className="mi__src">
          <span className="mi__srctype" data-explain="Traced to its source.">
            image / jpeg
          </span>
          <span className="mi__srcdate">Jan 14, 2026</span>
          <span className="mi__x">×</span>
        </div>

        <div className="mi__k">Title</div>
        <div className="mi__h1">Ghost in the Shell 2: Innocence</div>
        <div className="mi__artistrow">
          <div>
            <div className="mi__k">Source</div>
            <div className="mi__artist">Mamoru Oshii · Production I.G</div>
          </div>
          <div>
            <div className="mi__k">Year</div>
            <div className="mi__artist">2004</div>
          </div>
        </div>

        <div className="mi__k" data-explain="A different collection per lens.">
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

        <div className="mi__k" data-explain="Auto-extracted themes.">Themes</div>
        <div className="mi__tags">
          {THEMES.map((t) => (
            <span className="mi__tag" key={t}>
              {t}
            </span>
          ))}
        </div>

        <div className="mi__k" data-explain="Related across collections.">
          Related items
        </div>
        <div className="mi__related">
          {RELATED.map((r) => (
            <div key={r.src} className="mi__rel" style={{ backgroundImage: `url(${r.src})` }} />
          ))}
        </div>

        <div className="mi__k" data-explain="Auto-written summary.">Description</div>
        <p className="mi__desc">
          Theatrical key art for Mamoru Oshii's Ghost in the Shell 2: Innocence, the 2004 sequel
          that follows the cyborg detective Batou through a noir investigation into gynoids that
          turn on their owners. The composition pairs Batou's basset hound with a doll-like figure,
          staging the film's central question of where the human ends and the manufactured begins.
          Oshii treats memory, the body, and the soul as porous and copyable, a meditation on
          cybernetic life that reads as prescient now. Production I.G's compositing and Kenji
          Kawai's score made it a landmark of the medium's turn toward photoreal CG.
        </p>

        <div className="mi__chat" data-explain="Every field stays editable.">
          <span className="mi__caret">›</span>
          <span className="mi__chatph">Chat with Mare to edit context…</span>
        </div>
      </div>
    </div>
  );
}
