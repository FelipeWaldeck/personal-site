import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SplashField, GlyphField } from '../../components/namshub/Ambient';
import { InterstitialDemo, AnnotationDemo, LibrarianDemo, SurfaceBubble, MemoryPanels, LibrarianRoles } from '../../components/namshub/Demos';
import './namshub.css';

const DINGIR = '\u{1202D}';
const A = '/case-studies/namshub'; // public asset root (marks + images)

/* Namshub case study — ported from the Paper redesign. Scoped under .cs-namshub.
   Real ambient behaviour: boot-splash dither (SplashField), drifting cuneiform
   (GlyphField), and hover-to-expand interactions. */

function Swatch({ name, hex, dark }: { name: string; hex: string; dark: boolean }) {
  return (
    <div className="swatch" style={{ background: hex }}>
      <span className="swatch__name" style={{ color: dark ? '#ECE8E0' : '#24221E' }}>{name}</span>
      <span className="swatch__hex" style={{ color: dark ? '#807A70' : '#645D52' }}>{hex}</span>
    </div>
  );
}


export default function NamshubCaseStudy() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  return (
    <article className="cs-namshub" data-theme={theme}>
      <nav className="topnav">
        <Link to="/" className="topnav__back">← Archive</Link>
        <div className="topnav__theme" role="group" aria-label="Theme">
          <button className={theme === 'light' ? 'on' : ''} onClick={() => setTheme('light')} aria-pressed={theme === 'light'}>Light</button>
          <span className="slash">/</span>
          <button className={theme === 'dark' ? 'on' : ''} onClick={() => setTheme('dark')} aria-pressed={theme === 'dark'}>Dark</button>
        </div>
        <div className="topnav__right">
          <Link to="/" className="topnav__name">{DINGIR} FW</Link>
          <a href="https://namshub.run" target="_blank" rel="noreferrer" className="topnav__ns">namshub.run ↗</a>
        </div>
      </nav>

      {/* 1 — SPLASH OPENER (full screen) */}
      <header className="splash">
        <SplashField />
        <div className="splash__kicker">
          <span className="dot" /> Case study&nbsp;&nbsp;/&nbsp;&nbsp;Ambient AI writing environment
        </div>
        <div className="splash__meta">
          <span>Design + engineering</span>
          <span>2025 — 2026</span>
          <span>Solo project</span>
        </div>
        <div className="splash__mark">
          <p className="splash__eyebrow">A Mare writing instrument</p>
          <h1 className="splash__wordmark">namshub</h1>
          <p className="splash__tagline">
            A writing instrument inspired by Snow Crash's Librarian. Writing with AI beyond prompts
            and rewrites.
          </p>
        </div>
        <div className="splash__cue">
          <span className="key">space</span>
          <span className="slash">/</span>
          <span className="key">enter</span>
          <span className="cue__label">to begin</span>
        </div>
      </header>

      {/* 2 — MINIMAL, YET DEFINED — body + design system beside it */}
      <section className="section minimal">
        <div className="section__head">
          <h2 className="display h-section">Between Cuneiform and CRTs</h2>
        </div>
        <div className="minimal__row">
          <div className="minimal__body">
            <p>
              Before any AI features, a writing tool needs to accommodate writers who need focus for
              their best work. Drawing inspiration from the minimalism of Typora and the cyberpunk
              surroundings of Snow Crash, Namshub utilises CRT aesthetics blended with the tones of old
              parchment and sumerian tablets.
            </p>
            <p>
              Namshub is primarily light-mode, with Satoshi chosen to remind users that they are at an
              intersection between quills, typewriters and keyboards, an ancient practice that remains
              in every keystroke.
            </p>
          </div>

          <div className="ds">
            <div className="ds__palette" data-active={theme}>
              <div className="ds__bar ds__bar--light">
                <Swatch name="Canvas" hex="#EAE5DC" dark={false} />
                <Swatch name="Surface" hex="#D0CBC2" dark={false} />
                <Swatch name="Ink" hex="#24221E" dark />
                <Swatch name="Copper" hex="#8E5F2C" dark />
              </div>
              <div className="ds__bar ds__bar--dark">
                <Swatch name="Canvas" hex="#141210" dark />
                <Swatch name="Surface" hex="#1C1A16" dark />
                <Swatch name="Ink" hex="#ECE8E0" dark={false} />
                <Swatch name="Acid" hex="#A8C430" dark={false} />
              </div>
            </div>

            <div className="ds__type">
              <div className="ds__spec"><span className="synkopy">namshub</span><span className="ds__face">Synkopy</span></div>
              <div className="ds__spec"><span className="satoshi">The page is the document.</span><span className="ds__face">Satoshi</span></div>
              <div className="ds__spec"><span className="mono caps">Factcheck · Recluster</span><span className="ds__face">JetBrains Mono</span></div>
            </div>

            <div className="ds__bubble">
              <SurfaceBubble />
            </div>
          </div>
        </div>
      </section>

      {/* 3 — THESIS + hover-to-expand interactions */}
      <section className="section thesis">
        <div className="thesis__body">
          <p className="thesis__lead">
            Every writing tool focuses on monastic minimalism or covering the writing interface with
            prompts. Namshub explores what it means to have the calm of a blank page with emergent
            critique, emanating from between the text and on the sides.
          </p>
          <p className="thesis__sub">
            Namshub evokes only the essential surfaces for helping writing, balancing utility with the
            silence needed for thought.
          </p>
        </div>

        <div className="surfaces">
          <div className="ia">
            <div className="ia__sum">
              <span className="ia__name">Interstitial Critique</span>
              <span className="ia__gloss">between the lines</span>
              <span className="ia__chev" aria-hidden="true">⤢</span>
            </div>
            <div className="ia__preview"><InterstitialDemo /></div>
          </div>

          <div className="ia">
            <div className="ia__sum">
              <span className="ia__name">Nomadic Annotation</span>
              <span className="ia__gloss">in the margin</span>
              <span className="ia__chev" aria-hidden="true">⤢</span>
            </div>
            <div className="ia__preview"><AnnotationDemo /></div>
          </div>

          <div className="ia">
            <div className="ia__sum">
              <span className="ia__name">Librarian Call</span>
              <span className="ia__gloss">on demand</span>
              <span className="ia__chev" aria-hidden="true">⤢</span>
            </div>
            <div className="ia__preview"><LibrarianDemo /></div>
          </div>
        </div>
      </section>

      {/* 4 — AI AS A CO-INHABITANT */}
      <section className="section co">
        <div className="co__row">
          <div className="co__body">
            <p>
              Snow Crash's Librarian inspires this project to go beyond the typical model of an AI
              assistant. Through most SaaS developed in the AI Boom, AI has been pigeonholed into the
              passive role of agreeing with the user and providing on-demand generation, whether that
              be of text, edits or simply praise. The Librarian is opinionated, deeply contextual, and
              works tirelessly to find the right sources to prove you right, or most importantly, wrong.
            </p>
          </div>
          <div className="co__media">
            <LibrarianRoles />
          </div>
        </div>
      </section>

      {/* 5 — MEMORY (over a drifting glyph field) */}
      <section className="section memory">
        <GlyphField density={0.7} />
        <div className="memory__inner">
          <div className="section__head">
            <div>
              <p className="kicker"><span className="dot" /> Memory</p>
              <h2 className="display h-section">What does a word processor know about you?</h2>
            </div>
          </div>

          <div className="memory__intro">
            <p>
              Writing surfaces are necessarily tabula rasas, clear of context, quiet to invoke new
              writing. However, this form of creating has relied on the assumed interiority and
              supremacy of the singular author. For an era where new intelligences and infrastructures
              are emerging, the surface for writing must adapt as well.
            </p>
          </div>

          <MemoryPanels />
        </div>
      </section>

      {/* 6 — LESSONS */}
      <section className="section lessons">
        <div className="section__head">
          <h2 className="display h-section">Three things I'll carry forward</h2>
        </div>
        <div className="lessons__grid">
          <div className="lesson">
            <span className="lesson__num">01</span>
            <p>
              The shape of an AI feature is decided by the surrounding UI, not the model. The same API
              call produces a tool, a co-writer, or a hostile interruption depending on where its output
              lands and how it competes for attention. The interesting design work is almost always the
              chrome, not the prompt.
            </p>
          </div>
          <div className="lesson">
            <span className="lesson__num">02</span>
            <p>
              Restraint compounds. Every UI element I removed made the remaining ones more legible, and
              the cumulative effect across four redesigns was disproportionate. By the end, a 16-pixel
              margin change or a 200-millisecond easing curve was doing real perceptual work.
            </p>
          </div>
          <div className="lesson">
            <span className="lesson__num">03</span>
            <p>
              Working solo across design and engineering let me make decisions that would be hard to
              defend in a team. "Delete the AI panel" was not a meeting-friendly proposal. The cost is
              that every wrong decision is mine; the benefit is a single sustained point of view.
            </p>
          </div>
        </div>
      </section>

      {/* 7 — FOOTER */}
      <footer className="footer">
        <dl className="footer__list">
          <div className="footer__row"><dt>Live</dt><dd><a href="https://namshub.run" target="_blank" rel="noreferrer">namshub.run</a></dd></div>
          <div className="footer__row"><dt>Built with</dt><dd>Tauri v2, React, TipTap, Rive, Anthropic SDK.</dd></div>
        </dl>
        <Link to="/" className="footer__back">← Back to the map</Link>
      </footer>
    </article>
  );
}
