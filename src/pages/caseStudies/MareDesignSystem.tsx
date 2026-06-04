import React from 'react';

/**
 * MareDesignSystem — the MARE design-system board rebuilt in HTML (not a screenshot)
 * so tokens and type stay crisp. Values are lifted verbatim from the live board.
 */

const DARK_SURFACES: [string, string, string][] = [
  ['--mare-bg', '#121010', 'Page'],
  ['--mare-surface', '#1A1715', 'Panels'],
  ['--mare-surface-raised', '#221F1C', 'Cards'],
  ['--mare-surface-warm', '#1E1814', 'Hover'],
  ['--mare-surface-dim', '#161412', 'Recessed'],
  ['--mare-surface-input', '#1E1B19', 'Inputs'],
];

const INK = [
  ['ink', 1],
  ['80', 0.8],
  ['65', 0.65],
  ['50', 0.5],
  ['30', 0.3],
  ['15', 0.15],
] as const;

const TYPE: [string, string][] = [
  ['Page Title — 40', 'ds-t40'],
  ['Heading — 32', 'ds-t32'],
  ['Detail — 28', 'ds-t28'],
  ['Heading 2 — 24', 'ds-t24'],
  ['Item Title — 20', 'ds-t20'],
];

const LIGHT_SURFACES: [string, string][] = [
  ['#FFFBFB', 'bg'],
  ['#FFFFFF', 'surface'],
  ['#FFF4EF', 'warm'],
  ['#F4F4F4', 'dim'],
  ['#EAEAEA', 'input'],
];

export default function MareDesignSystem() {
  return (
    <div className="ds">
      <div className="ds__col">
        <div className="ds__label">Dark surfaces</div>
        <div className="ds__swatches">
          {DARK_SURFACES.map(([token, hex, role]) => (
            <div className="ds__swatch" key={token}>
              <div className="ds__chip" style={{ background: hex }} />
              <code>{hex}</code>
              <span>{role}</span>
            </div>
          ))}
        </div>

        <div className="ds__label">Ink hierarchy</div>
        <div className="ds__ink">
          {INK.map(([name, op]) => (
            <div className="ds__inkcell" key={name}>
              <div className="ds__inkdot" style={{ background: `rgba(232,228,224,${op})` }} />
              <span>{name}</span>
            </div>
          ))}
          <div className="ds__inkcell">
            <div className="ds__inkdot ds__inkdot--accent" />
            <span>accent</span>
          </div>
        </div>

        <div className="ds__label">Light mode — warm gallery</div>
        <div className="ds__light">
          {LIGHT_SURFACES.map(([hex, role]) => (
            <div className="ds__lightchip" key={role} style={{ background: hex }}>
              <span>{role}</span>
            </div>
          ))}
          <div className="ds__lightchip ds__lightchip--accent"><span>accent</span></div>
        </div>
      </div>

      <div className="ds__col">
        <div className="ds__label">Type — IBM Plex Serif / Sans</div>
        <div className="ds__type">
          {TYPE.map(([label, cls]) => (
            <div className={`ds__typerow ${cls}`} key={cls}>{label}</div>
          ))}
          <div className="ds__typerow ds__tbody">Body 16 — the quick brown fox</div>
          <div className="ds__typerow ds__tlabel">Label 14 medium</div>
          <div className="ds__typerow ds__tmicro">MICRO 10 — SECTION LABELS</div>
        </div>

        <div className="ds__label">Glass card</div>
        <div className="ds__card">
          <div className="ds__cardk">Title</div>
          <div className="ds__cardt">The Horse Fair</div>
          <div className="ds__cardk">Artist</div>
          <div className="ds__carda">Rosa Bonheur</div>
          <div className="ds__tags">
            <span>animal study</span><span>realism</span><span>equestrian</span>
          </div>
        </div>
      </div>
    </div>
  );
}
