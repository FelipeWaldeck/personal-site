import React from 'react';
import { Link } from 'react-router-dom';
import './namshub.css';

const A = '/case-studies/namshub'; // public asset root

export default function NamshubCaseStudy() {
  return (
    <article className="cs-namshub">
      <nav className="topnav">
        <Link to="/">← Archive</Link>
        <Link to="/" className="topnav__name">FW</Link>
        <a href="https://namshub.run" target="_blank" rel="noreferrer" className="topnav__ns">namshub.run ↗</a>
      </nav>

      {/* 1 — HERO */}
      <section className="hero">
        <div className="grid">
          <h1 className="display hero__title" style={{ gridColumn: '1 / 9' }}>Namshub</h1>
          <div className="hero__rhs" style={{ gridColumn: '9 / 13' }}>
            <p className="hero__sub">An ambient AI writing environment for long-form work.</p>
            <p className="hero__meta">Design + engineering<br />2025 — 2026<br />Solo project</p>
          </div>
        </div>
        <div className="hero__image-wrap">
          <img
            src={`${A}/hero-still.jpg`}
            alt="Namshub editor at rest. A passage of essay text on a dark warm surface with line numbers in the gutter."
          />
        </div>
      </section>

      {/* 2 — THESIS */}
      <section className="thesis">
        <div className="grid">
          <div className="col-4-10">
            <p>
              I built Namshub because the current shape of AI in writing tools is wrong for the kind
              of writing I care about. Almost every tool treats AI as a respondent: you open a panel,
              you type a prompt, it answers. The interaction is transactional, the panel competes for
              attention with the text, and the writer's relationship to the work flattens into
              request-and-receive.
            </p>
            <p>
              Namshub starts from a different premise. The AI lives <em>in</em> the writing
              environment, not next to it. It reads the page with you, leaves observations in the
              margins, and offers continuations between paragraphs that you can take or ignore. There
              is no chat window. The presence is felt before it is read.
            </p>
            <p>
              Two claims hold the project together, and the rest of this page is in service of them.
              First: the writing environment has to be quiet before an ambient AI presence is legible
              at all. Second: once it is quiet, the relationship between writer and AI can become
              reciprocal — two readers of the same page, one of whom is also writing it.
            </p>
          </div>
        </div>
      </section>

      {/* 3 — QUIET FIRST */}
      <section className="quiet-first">
        <div className="grid">
          <h2 className="display h-section">The environment<br />had to be quiet first</h2>
          <div className="quiet-first__body">
            <p>
              Before I could put an AI presence anywhere on the page, I had to take almost everything
              else off it. The first six months of the project were a long subtraction: a self-audit
              scored an early version 3.2 out of 5 on basic atmosphere, and the diagnosis was the same
              every time — too many surfaces, too many borders, too much chrome trying to look
              professional.
            </p>
            <p>
              Four redesigns later, the editor has no top bar, no status bar, no sidebar in its
              default state. The page is the document, the margins are negative space, and the only
              persistent UI is a small breathing mark in the corner. Borders dissolve into the
              background rather than terminating in lines. Surfaces emerge from the canvas through
              glow instead of resting on it. Hover states bloom; transitions take 300 to 400
              milliseconds and use spring easing instead of step functions.
            </p>
            <p>
              Most of this is technically unremarkable — translucent surfaces, backdrop blur, slow
              timing curves. The harder part was deciding, again and again, that the right answer was
              to remove a thing rather than redesign it. A panel that needed three rounds of polish to
              feel right was almost always a panel that should not have existed.
            </p>
          </div>
        </div>

        <div className="quiet-first__image">
          <img
            src={`${A}/poster-librarian.jpg`}
            alt="The Namshub editor with the command palette summoned over a passage of essay text. The chrome appears only when needed."
          />
          <p className="caption quiet-first__cap">
            Chrome appears only on demand. The command palette summoned over a still page — no panel,
            no docked sidebar, no persistent toolbar.
          </p>
        </div>
      </section>

      {/* 4 — CO-INHABITANT */}
      <section className="co-inhabitant">
        <div className="grid">
          <h2 className="display h-section co-inhabitant__heading">AI as a co-inhabitant</h2>

          <div className="co-inhabitant__body">
            <p>
              The Librarian is the AI presence in Namshub. I avoided "assistant" deliberately —
              assistants wait to be asked. The Librarian reads the page alongside the writer and
              leaves traces of its reading: a note in the margin where it noticed an argument was
              thin, a continuation in faint type at the end of a paragraph that has trailed off, a
              source suggestion when a claim seems to want one. None of these are modal. None of them
              block writing. Most of them go unanswered, and that is fine.
            </p>
            <p>
              The conceptual move I am proudest of is putting the Librarian's visible body — a small
              drawn mark called the Bloom — in the document margin rather than in a corner widget. The
              Bloom wanders. It pauses beside sections it is reading. It pulses when it has an
              observation ready. The writer can ignore it indefinitely, and when they do, it
              eventually drifts to a different paragraph.
            </p>
            <p>
              The technical surface underneath is fairly straightforward — a state machine for the
              Bloom's three modes (focus, pause, move), a context-injection pipeline that lets the
              model see what section the Bloom is "looking at," and an ambient ghost-text channel that
              surfaces low-confidence continuations without interrupting. The interesting work is
              upstream of the code: deciding what kinds of AI utterances are allowed, what voices the
              Librarian speaks in, and when silence is the correct response.
            </p>
          </div>

          <div className="co-inhabitant__media">
            <video
              src={`${A}/videos/librarian.mp4`}
              poster={`${A}/poster-librarian.jpg`}
              autoPlay muted loop playsInline
              aria-label="The Librarian command palette opening over an essay passage and accepting a question, with the page text and margin remaining quiet."
            />
            <p className="caption">
              The Librarian summoned ambiently. Context comes from the writer's existing drafts, not
              from a fresh prompt.
            </p>
          </div>
        </div>
      </section>

      {/* 5 — IN PRACTICE */}
      <section className="practice-intro">
        <div className="grid">
          <div className="col-4-10">
            <h2 className="display h-section">What it looks like<br />in practice</h2>
            <p className="practice-intro__sub">
              Three concrete moments, in order of how often a writer encounters them.
            </p>
          </div>
        </div>
      </section>

      {/* 5a — Margin annotation */}
      <section className="practice-block">
        <div className="grid">
          <div className="practice-block__heading">
            <p className="label-mono">01</p>
            <h3 className="h-sub">Margin annotation</h3>
          </div>
          <div className="practice-block__copy">
            <p>
              When the Librarian notices something — an unsupported claim, a contradiction, a thread
              it would like to pull — it leaves a small annotation in the margin beside the relevant
              passage. The annotation card itself is a glass surface that the writer expands on
              demand. There is no badge counter, no inbox to clear. The card persists until it is
              addressed or dismissed.
            </p>
          </div>
        </div>
        <div className="practice-block__media--bleed">
          <video
            src={`${A}/videos/annotations.mp4`}
            poster={`${A}/poster-annotations.jpg`}
            autoPlay muted loop playsInline
            aria-label="Four annotation cards — labelled FACTCHECK, CRITIQUE, EDIT, EVIDENCE — sitting in the right margin alongside an essay passage about archives and databases."
          />
          <p className="caption practice-block__cap">
            Margin notes from the Librarian. Four kinds — factcheck, critique, edit, evidence —
            addressable in any order or ignored entirely.
          </p>
        </div>
      </section>

      {/* 5b — Ambient ghost text */}
      <section className="practice-block practice-block--reversed">
        <div className="grid">
          <div className="practice-block__media">
            <video
              src={`${A}/videos/interstitials.mp4`}
              poster={`${A}/poster-interstitials.jpg`}
              autoPlay muted loop playsInline
              aria-label="A paragraph of essay text trailing off, with a faint ambient observation appearing between paragraphs and then dissolving."
            />
            <p className="caption">
              Observations between paragraphs. They appear in the writer's existing line of attention,
              not in a panel, and dissolve when the writer moves on.
            </p>
          </div>
          <div className="practice-block__heading">
            <p className="label-mono">02</p>
            <h3 className="h-sub">Ambient ghost text</h3>
          </div>
          <div className="practice-block__copy">
            <p>
              Between paragraphs, the Librarian occasionally offers a possible continuation as faint
              ghost type at the end of the line. Tab accepts. Anything else dismisses. Most of the time
              the ghost is wrong, or the writer wanted to go somewhere else, and the dismissal is
              silent.
            </p>
          </div>
        </div>
      </section>

      {/* 5c — Bloom */}
      <section className="practice-block practice-block--bloom">
        <div className="grid">
          <div className="bloom-stage">
            <img
              src={`${A}/logos/bloom-mark.png`}
              alt="The Bloom: a painterly drawn flower mark, monochrome, isolated on a dark background."
            />
          </div>
          <div className="bloom-text">
            <p className="label-mono">03</p>
            <h3 className="h-sub">The Bloom as state</h3>
            <p>
              The Bloom is also a state indicator. It breathes slowly when idle, pulses gently when
              the Librarian has produced an observation, and dims when the writer is in flow and the AI
              has temporarily withdrawn. Across a session it functions as a tonal reading of the
              writing environment — a small organic mark that signals whether the page is being
              watched, addressed, or left alone.
            </p>
            <p className="caption" style={{ marginTop: 28 }}>
              Drawn in Rive, state-aware. Breathes when idle, pulses when an observation is ready, dims
              when the writer is in flow.
            </p>
          </div>
        </div>
      </section>

      {/* 6 — WHAT I LEARNED */}
      <section className="lessons">
        <div className="grid">
          <div className="lessons__intro">
            <h2 className="display h-section">What I learned</h2>
            <p>Three things I will carry into the next thing I build.</p>
          </div>

          <div className="lesson">
            <p className="lesson__num">One</p>
            <p>
              The shape of an AI feature is decided by the surrounding UI, not by the model. The same
              Anthropic API call produces a tool, a co-writer, or a hostile interruption depending on
              where its output lands on the page and how it competes for attention. The interesting
              design work is almost always the chrome, not the prompt.
            </p>
          </div>

          <div className="lesson">
            <p className="lesson__num">Two</p>
            <p>
              Restraint compounds. Every UI element I removed in Namshub made the remaining elements
              more legible, and the cumulative effect across four redesigns was disproportionate. By
              the end, design moves that would have been invisible in the early version — a 16-pixel
              margin change, a 200-millisecond easing curve — were doing real perceptual work.
            </p>
          </div>

          <div className="lesson">
            <p className="lesson__num">Three</p>
            <p>
              Working solo across design and engineering let me make decisions that would have been
              difficult to defend in a team. "Delete the AI panel" was not a meeting-friendly proposal.
              The cost of solo work is the cost of every wrong decision being mine; the benefit is that
              the project gets to have a single sustained point of view.
            </p>
          </div>
        </div>
      </section>

      {/* 7 — FOOTER */}
      <footer className="footer">
        <div className="grid">
          <div className="footer__list">
            <dl className="footer__row"><dt>Live</dt><dd><a href="https://namshub.run" target="_blank" rel="noreferrer">namshub.run</a></dd></dl>
            <dl className="footer__row"><dt>Source</dt><dd><a href="https://github.com/FelipeWaldeck/namshub" target="_blank" rel="noreferrer">github.com/FelipeWaldeck/namshub</a></dd></dl>
            <dl className="footer__row"><dt>Mac alpha</dt><dd><a href="https://github.com/FelipeWaldeck/namshub/releases" target="_blank" rel="noreferrer">download (v0.1.1, Apple Silicon, unsigned)</a></dd></dl>
            <dl className="footer__row"><dt>Built with</dt><dd>Tauri v2, React, TipTap, Rive, Anthropic SDK.</dd></dl>
          </div>
          <div className="footer__back-col">
            <Link to="/" className="footer__back">
              <img src={`${A}/logos/bloom-pixel.svg`} alt="" aria-hidden="true" />
              ← Back to work
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
