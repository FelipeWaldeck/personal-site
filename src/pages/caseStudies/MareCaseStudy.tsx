import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import MareDesignSystem from './MareDesignSystem';
import MareClustering from './MareClustering';
import MareCollections from './MareCollections';
import MareItem from './MareItem';
import { MARE_REFS } from './mareRefs';
import { useCursorCard } from './useParallax';
import './mare.css';

/* MARE case study — staged as a Namshub-style deck: sticky, scroll-snapped 100vh
   panes, one idea per screen. Ported from the Paper artboard (5R-0) and reworked
   per review. The reference belts use placeholder tiles for now — see PLACEHOLDER
   note; swap for real Mare item exports once the asset source is settled. */

// Media MARE ingests, and what it did to each — feeds the conveyor belt + hero stream.
const FACTS: [string, string][] = [
  ['Role', 'Co-founder, design'],
  ['With', 'Aakarsh, design + engineering'],
  ['Year', '2025 — ongoing'],
  ['Surfaces', 'Web app, extension, marketing'],
];

// A real Mare item tile — natural-height image, with a title/collection card on hover.
function Tile({ src, title, collection }: { src: string; title: string; collection: string }) {
  return (
    <div className="tile">
      <img className="tile__img" src={src} alt="" loading="lazy" />
      <div className="tile__hover">
        <b>{title}</b>
        <span>{collection}</span>
      </div>
    </div>
  );
}

export default function MareCaseStudy() {
  // hero stream: two vertical columns of real items, drifting opposite ways
  const half = Math.ceil(MARE_REFS.length / 2);
  const colA = [...MARE_REFS.slice(0, half), ...MARE_REFS.slice(0, half)];
  const colB = [...MARE_REFS.slice(half), ...MARE_REFS.slice(half)];

  // the item card follows the cursor (login effect); the dithered image stays stable
  const problemRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  useCursorCard(problemRef, cardRef);

  return (
    <article className="cs-mare">
      <nav className="topnav">
        <Link to="/">← Archive</Link>
        <Link to="/" className="topnav__name">m</Link>
        <a href="https://app.mare.run" target="_blank" rel="noreferrer">app.mare.run ↗</a>
      </nav>

      {/* 01 — HERO */}
      <header className="section section--hero hero">
        <div className="hero__left">
          <h1 className="hero__mare">MARE</h1>
          <p className="hero__tagline">a self-organising archive for the wild web</p>
          <p className="hero__lead">Mare is an eco-system where your references come to life.</p>
          <p className="hero__sub">
            Each item sourced and sorted as you hunt through the wild web. No feed. No followers.
            Just your own visual world.
          </p>
          <dl className="hero__facts">
            {FACTS.map(([k, v]) => (
              <React.Fragment key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </React.Fragment>
            ))}
          </dl>
        </div>
        <div className="vbelt" aria-hidden="true">
          <div className="vbelt__col">
            {colA.map((t, i) => <Tile key={`a${i}`} src={t.src} title={t.title} collection={t.collection} />)}
          </div>
          <div className="vbelt__col vbelt__col--b">
            {colB.map((t, i) => <Tile key={`b${i}`} src={t.src} title={t.title} collection={t.collection} />)}
          </div>
        </div>
      </header>

      {/* PROBLEM — the login effect: full-bleed dithered Horse Fair + cursor-following card */}
      <section className="section problem" ref={problemRef}>
        <div className="problem__dither" aria-hidden="true" />
        <div className="problem__scrim" aria-hidden="true" />
        <div className="problem__inner">
          <div className="problem__text">
            <h2 className="problem__head">New ways of seeing on the web.</h2>
            <div className="problem__body">
              <p>
                Being an artist now means wading through an endless amount of material: references
                saved, screenshotted, then lost in Pinterest, Are.na, Instagram. Mare is simple — see
                something, save it, and it lands organised in one archive.
              </p>
              <p>
                A bet on a different way of collecting: closer to riding out to the frontier than
                scrolling a feed.
              </p>
            </div>
          </div>
          <figure className="problem__card" ref={cardRef}>
              <div className="pcard__k">Title</div>
              <div className="pcard__title">The Horse Fair</div>
              <div className="pcard__k">Artist</div>
              <div className="pcard__artist">Rosa Bonheur</div>
              <div className="pcard__meta">
                <div><span className="pcard__k">Year</span><span>1852–55</span></div>
                <div><span className="pcard__k">Movement</span><span>Realism</span></div>
              </div>
              <div className="pcard__k">Description</div>
              <p className="pcard__desc">
                A monumental oil capturing the raw energy of the Parisian horse market — a swirling
                mass of Percherons and their handlers, rendered with remarkable anatomical precision.
              </p>
              <div className="pcard__tags">
                <span>animal study</span><span>equestrian</span><span>realism</span><span>movement</span>
              </div>
          </figure>
        </div>
      </section>

      {/* 02 — DESIGN LANGUAGE — four quadrants */}
      <section className="section dl">
        <div className="dl__lead">
          <h2 className="head">A cyber-cowboy in a sea of SaaS purple.</h2>
          <p className="dl__body">
            A mare is something you trust to carry you somewhere new. We've ridden horses from the
            paleolithic to the gold rush — why not now, as cyber-cowboys? Warm carbon, a copper
            accent, and IBM Plex: a deliberate turn away from the purple-and-white SaaS look.
          </p>
        </div>
        <div className="dl__horse" role="img" aria-label="The MARE horse mark" />
        <MareDesignSystem />
      </section>

      {/* 03 — ARCHIVE */}
      <section className="section section--app">
        <div className="surface">
          <div className="surface__text">
            <div className="surface__lead">
              <h2 className="head">Everything on one page, and still navigable.</h2>
            </div>
            <div className="surface__aside">
              <p className="surface__body">
                The hardest problem was density: recent ingestions, an unclustered tray, every named
                collection, search, and the quieter settings and billing modals — all at once, without
                turning into a mess.
              </p>
              <span className="surface__num">03 · Collections, dark mode</span>
            </div>
          </div>
          <MareCollections />
        </div>
      </section>

      {/* 04 — CLUSTERING */}
      <section className="section">
        <div className="head-row">
          <div className="head-row__lead">
            <h2 className="head">It names the collections itself.</h2>
          </div>
          <span className="cluster__beat">↻ 456 items · named in 0.4s</span>
        </div>
        <p className="cluster__sub">
          Save anything and MARE clusters your whole library — then writes the collection names
          itself. The same library, read three ways:
        </p>
        <MareClustering />
      </section>

      {/* 05 — ITEM */}
      <section className="section section--app">
        <div className="surface">
          <div className="surface__text">
            <div className="surface__lead">
              <h2 className="head">Point it at anything on the internet.</h2>
            </div>
            <div className="surface__aside">
              <p className="surface__body">
                Open an item and the depth shows. MARE identifies almost any piece of media, traces it
                to its source, writes a context summary, and re-renders it at high quality. Every field
                is editable, so you can correct its reading in a line.
              </p>
              <span className="surface__num">05 · Item detail, dark mode</span>
            </div>
          </div>
          <MareItem />
        </div>
      </section>

      {/* 06 — REFLECTION */}
      <section className="section reflection">
        <p className="reflection__text">
          MARE is the first thing I've designed that I use every day, and that changes how you design
          it — you stop arguing about hypothetical users and start fixing whatever annoyed you that
          morning. The harder part was co-design. Aakarsh and I draw differently, and the tool is
          better for the places where we didn't agree at first.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="foot">
        <div className="foot__links">
          <div className="foot__row">
            <span className="foot__k">Live</span>
            <a className="foot__v" href="https://mare.run" target="_blank" rel="noreferrer">mare.run</a>
          </div>
          <div className="foot__row">
            <span className="foot__k">App</span>
            <a className="foot__v foot__v--dim" href="https://app.mare.run" target="_blank" rel="noreferrer">app.mare.run</a>
          </div>
          <div className="foot__row">
            <span className="foot__k">Next</span>
            <Link className="foot__v foot__v--copper" to="/work/namshub">Namshub, case study →</Link>
          </div>
        </div>
        <div className="foot__mark">
          <div className="foot__glyph">m</div>
          <Link to="/" className="foot__back">← Back to the archive</Link>
        </div>
      </footer>
    </article>
  );
}
