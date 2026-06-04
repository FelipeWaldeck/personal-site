import React from 'react';
import { Link } from 'react-router-dom';
import MareDesignSystem from './MareDesignSystem';
import MareModalsSheet from './MareModalsSheet';
import './mare.css';

const A = '/case-studies/mare'; // public asset root

export default function MareCaseStudy() {
  return (
    <article className="cs-mare">
      <nav className="topnav">
        <Link to="/">← Archive</Link>
        <Link to="/" className="topnav__name">FW</Link>
        <a href="https://app.mare.run" target="_blank" rel="noreferrer">app.mare.run ↗</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div>
          <div className="hero__kicker">Case study · Design · 2025 — ongoing</div>
          <h1 className="hero__title">MARE</h1>
          <p className="hero__brief">
            A media-agnostic recommendation engine — give or take; the acronym flexes by the day. A{' '}
            <em>self-organising archive</em> for the references creatives lose in the depths of
            Pinterest and Are.na. It ingests anything, writes its own context for each item, and sorts
            the whole library on its own. Co-founded with Aakarsh — we designed it together; he
            engineered it.
          </p>
        </div>
      </section>

      {/* META STRIP */}
      <dl className="meta">
        <div><dt>Role</dt><dd>Co-founder · design</dd></div>
        <div><dt>With</dt><dd>Aakarsh — design + engineering</dd></div>
        <div><dt>Year</dt><dd>2025 — ongoing</dd></div>
        <div><dt>Surfaces</dt><dd>Web app, extension, marketing</dd></div>
      </dl>

      {/* 01 — THE PROBLEM */}
      <section className="cs cs--split">
        <div>
          <div className="cs__label">01 — The problem</div>
          <h2 className="cs__heading">Not a tidier Pinterest — a different way to be on the web.</h2>
          <div className="cs__body">
            <p>
              Being an artist now means processing an endless amount of material — references saved,
              screenshotted, and then lost in the depths of Pinterest and Are.na. The first job was
              simple to name and hard to do: gather it all into one archive and make it usable again.
            </p>
            <p>
              But the ambition underneath is larger. MARE is a bet on a new way of <em>collecting</em>,
              <em> sourcing</em>, and moving through the web — closer to riding out to the frontier than
              scrolling a feed.
            </p>
          </div>
        </div>
        <aside>
          <div className="cs__note">
            <strong>Refusal</strong>
            No feed, no infinite scroll, no "for you." The library is yours; the machine organises, it
            doesn't program you.
          </div>
          <div className="cs__note">
            <strong>Ambition</strong>
            Not just storage — a new paradigm for collecting and sourcing references over time.
          </div>
          <div className="cs__note">
            <strong>Through-line</strong>
            The mare: a reliable mount that carries you to the edge of the map and back.
          </div>
        </aside>
      </section>

      {/* 02 — DESIGN LANGUAGE (identity + system, one screen) */}
      <section className="cs">
        <div className="ds-head">
          <div>
            <div className="cs__label">02 — Design language</div>
            <h2 className="cs__heading">A cyber-cowboy in a sea of SaaS purple.</h2>
            <div className="cs__body" style={{ maxWidth: 620 }}>
              <p>
                The name flexes — <em>media-agnostic recommendation engine</em> most days, research or
                agency engine on others — but the animal is constant: a mare is a creature you trust to
                carry you somewhere new. So the whole system is retro, classic, a little worn, warm
                rather than clinical: warm carbon, one copper accent, IBM Plex — a deliberate refusal
                of the purple-and-white SaaS sea.
              </p>
            </div>
          </div>
          <div className="logo-mark" role="img" aria-label="The MARE horse mark" />
        </div>
        <MareDesignSystem />
      </section>

      {/* 03 — THE ARCHIVE (density) */}
      <section className="cs">
        <div className="cs__label">03 — The archive</div>
        <h2 className="cs__heading">Everything on one page — and still navigable.</h2>
        <div className="cs__body">
          <p>
            The hardest layout problem was density. The Collections page has to hold your most recent
            ingestions, an unclustered tray, every named collection, search, and the quieter modals for
            settings and billing — all at once, without becoming a clusterfuck. Getting that to feel
            calm and browsable is the work I'm proudest of.
          </p>
        </div>
        <figure className="cs-figure">
          <img src={`${A}/collections.webp`} alt="The MARE Collections page: a left rail with recent ingestions and an unclustered tray, and a dense but legible grid of named collections." />
          <figcaption><b>Collections</b> — recent ingestions, unclustered tray, named collections, and search on one surface</figcaption>
        </figure>
      </section>

      {/* 05 — AUTOMATIC CLUSTERING */}
      <section className="cs">
        <div className="cs__label">04 — Automatic clustering</div>
        <h2 className="cs__heading">It names the collections itself.</h2>
        <div className="cs__body">
          <p>
            The part that still feels faintly insane: MARE clusters the whole library on its own and{' '}
            <em>invents the collection names</em> as it goes — sorting in seconds what would take days
            to do by hand. Balanced, Aesthetic, and Semantic lenses re-read the same library three
            ways; Recluster re-runs it as the archive grows.
          </p>
          <p>
            Because automation only earns trust if it's reversible, the supporting modals keep the
            writer in control — train the clustering on a pair, add an item to collections by hand, pin
            something where it belongs.
          </p>
        </div>
        <MareModalsSheet />
      </section>

      {/* 06 — THE ITEM (centerpiece) */}
      <section className="cs">
        <div className="cs__label">05 — The item</div>
        <h2 className="cs__heading">Point it at anything on the internet.</h2>
        <div className="cs__body">
          <p>
            Open an item and the real depth shows. MARE identifies almost any piece of media on the
            web, traces it back to its source, writes a rich context summary, re-renders it as a
            high-quality image, and lets you move it across collections — with every field editable, so
            you can <em>correct its reading</em> in a line. The same piece can sit in different
            collections under each lens; relatedness is plural.
          </p>
        </div>
        <figure className="cs-figure">
          <img src={`${A}/item-detail.webp`} alt="A MARE item detail modal: the work rendered full-size with title, artist, year, source, the collections it belongs to under each lens, themes, related items, and an editable context summary." />
          <figcaption><b>Item detail</b> — identify, source, summarise, render, and re-file any piece of media</figcaption>
        </figure>
      </section>

      {/* 07 — REFLECTION (placeholder) */}
      <section className="reflection">
        <div className="cs__label">06 — Reflection</div>
        <p className="reflection__quote" style={{ opacity: 0.4 }}>Reflection — to come.</p>
      </section>

      {/* FOOTER */}
      <footer className="cs-footer">
        <a href="https://mare.run" target="_blank" rel="noreferrer" className="cs-footer__prev">mare.run ↗</a>
        <Link to="/" className="cs-footer__back">Return to archive</Link>
        <Link to="/work/namshub" className="cs-footer__next">Next: Namshub case study →</Link>
      </footer>
    </article>
  );
}
