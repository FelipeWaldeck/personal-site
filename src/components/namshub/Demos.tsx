import React, { useState, useEffect } from 'react';
import { DingirMark } from './DingirMark';

/* Live, non-interactive previews of the three Namshub editor surfaces.
   Pure CSS-keyframe loops (no JS, no video) so they stay razor-sharp and follow
   the page's light/dark theme via the shared tokens in namshub.css. Each mirrors
   the real app component it depicts: SuggestionBlock, MarginAnnotations (Critique
   card + annotation colours), and the LibrarianPalette. */

const DINGIR = '\u{1202D}'; // 𒀭

/* A general floating surface from the system — the summoned-not-docked panel
   pattern (rounded translucent fill, 16px material blur, hairline warm border,
   mono type, accent caret). Reproduced from the app's palette styling, shown in
   the design system as a neutral component rather than a specific feature. */
export function SurfaceBubble() {
  return (
    <div className="lib-bubble" aria-label="A floating surface from the design system.">
      <div className="lib-bubble__head">
        <span className="lib-bubble__sigil" aria-hidden="true"><DingirMark color="currentColor" /></span>
        <span className="lib-bubble__ctx">Surface, summoned not docked</span>
      </div>
      <div className="lib-bubble__thread">
        <div className="lib-bubble__turn">
          <span className="lib-bubble__role">material</span>
          <span className="lib-bubble__you">A translucent panel drawn over a 16px blur of the canvas.</span>
        </div>
        <div className="lib-bubble__turn">
          <span className="lib-bubble__role">tokens</span>
          <span className="lib-bubble__lib">
            Elevated fill, a warm hairline border, 14px radius, mono type, an accent caret. Recalled
            on demand, never pinned to the frame.
          </span>
        </div>
      </div>
      <div className="lib-bubble__ask">
        <span className="lib-bubble__caret">&#x276F;</span>
        <span className="lib-bubble__placeholder">Type a command</span>
      </div>
    </div>
  );
}

/* The shelf — the real Namshub shelf row: a gathered source as title +
   dashed citation chips + indented italic quotes on an accent rule
   (faithful to the app's shelf/ShelfRow.tsx). */
export function ShelfMini() {
  return (
    <div className="shelf" aria-hidden="true">
      <div className="shelf__src">
        <p className="shelf__title">The Stack: On Software and Sovereignty</p>
        <div className="shelf__cite">
          <span className="shelf__chip">Bratton</span>
          <span className="shelf__chip">MIT Press</span>
          <span>2015</span>
        </div>
        <ul className="shelf__quotes">
          <li>“The Stack is at once a computational apparatus and a new nomos of the earth.”</li>
        </ul>
      </div>
      <div className="shelf__src">
        <p className="shelf__title">Art and Cosmotechnics</p>
        <div className="shelf__cite">
          <span className="shelf__chip">Yuk Hui</span>
          <span>2021</span>
        </div>
        <ul className="shelf__quotes">
          <li>“To think technodiversity is to refuse the universal as already given.”</li>
        </ul>
      </div>
      <div className="shelf__src">
        <p className="shelf__title">The Question Concerning Technology</p>
        <div className="shelf__cite">
          <span className="shelf__chip">Heidegger</span>
          <span>1954</span>
        </div>
        <ul className="shelf__quotes">
          <li>“The essence of technology is by no means anything technological.”</li>
        </ul>
      </div>
    </div>
  );
}

/* The three kinds of memory as a navigable hero — one large panel at a time,
   switched by the numbered tabs. The graphics are the same size, so the stage
   holds steady as you move between them. */
const MEMORY_PANELS = [
  {
    n: '01',
    title: 'Brief it once',
    render: () => <SetupCard />,
    desc: "Tell the Librarian what you're working on once, then refine it. Every reading it does is weighed against that brief.",
  },
  {
    n: '02',
    title: 'The shelf',
    render: () => <ShelfMini />,
    desc: "Everything you read, quote, or save lands on a shelf the Librarian can reach: the corpus your suggestions are drawn from, a library that's yours.",
  },
  {
    n: '03',
    title: 'It learns what you take',
    render: () => <LearnMini />,
    desc: 'The Librarian watches which suggestions you weave in and which you wave off, and recurs less where you keep saying no, getting quieter and better-aimed over time.',
  },
];

export function MemoryPanels() {
  const [active, setActive] = useState(0);
  return (
    <div className="mpanels">
      <div className="mpanels__tabs" role="tablist" aria-label="The three kinds of memory">
        {MEMORY_PANELS.map((p, idx) => (
          <button
            key={p.n}
            role="tab"
            aria-selected={idx === active}
            className={`mpanels__tab ${idx === active ? 'on' : ''}`}
            onClick={() => setActive(idx)}
          >
            <span className="mpanels__n">{p.n}</span>
            <span className="mpanels__t">{p.title}</span>
          </button>
        ))}
      </div>
      <div className="mpanels__stage">
        {MEMORY_PANELS.map((p, idx) => (
          <div key={p.n} className={`mpanels__panel ${idx === active ? 'on' : ''}`} aria-hidden={idx !== active}>
            <div className="mpanels__viz">{p.render()}</div>
            <div className="mpanels__aside">
              <p className="mpanels__desc">{p.desc}</p>
              <div className="mpanels__nav">
                <button
                  className="mpanels__arrow"
                  aria-label="Previous"
                  onClick={() => setActive((active + MEMORY_PANELS.length - 1) % MEMORY_PANELS.length)}
                >←</button>
                <span className="mpanels__count">{p.n} / 03</span>
                <button
                  className="mpanels__arrow"
                  aria-label="Next"
                  onClick={() => setActive((active + 1) % MEMORY_PANELS.length)}
                >→</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Brief it once — the real Configure-your-Librarian step (LibrarianSetup),
   compacted for the memory grid: the brief you give once, then refine. */
export function SetupCard() {
  return (
    <div className="setup" aria-hidden="true">
      <div className="setup__head">
        <span className="mono caps">Configure your Librarian</span>
        <span className="mono">1 / 5</span>
      </div>
      <h3 className="setup__q">What are you working on?</h3>
      <div className="setup__field">A triptych of essays on how AI transforms interiority…</div>
      <div className="setup__foot">
        <div className="dots"><i className="on" /><i /><i /><i /><i /></div>
        <span className="setup__next">Next</span>
      </div>
    </div>
  );
}

/* It learns what you take — the real annotation-acceptance moment: an accepted
   suggestion flashes 'edit accepted — 2.3s' (faithful to AcceptanceFlash), a
   dismissed one is struck and waved off, and recurs less. */
export function LearnMini() {
  return (
    <div className="learn" aria-hidden="true">
      <div className="learn__row">
        <span className="learn__sugg">Add a source for this claim</span>
        <span className="learn__flash">accepted · 2.3s</span>
      </div>
      <div className="learn__row">
        <span className="learn__sugg">Tighten this opening clause</span>
        <span className="learn__flash">accepted · 11s</span>
      </div>
      <div className="learn__row learn__row--off">
        <span className="learn__sugg">Rewrite this sentence</span>
        <span className="pill">waved off</span>
      </div>
      <div className="learn__row learn__row--off">
        <span className="learn__sugg">Expand this paragraph</span>
        <span className="pill">waved off</span>
      </div>
      <span className="learn__tag mono caps">↻ recurs less where you say no</span>
    </div>
  );
}

/* The Librarian's roles — the same figure, different work. Cycles through the
   real annotation types (and their colours from annotationColors.ts): the
   dingir glows in the active role's hue and leaves a note in its voice. */
const LIBRARIAN_ROLES = [
  { key: 'critique', label: 'Critique', color: '#c8a03c', note: '“Total recall with no horizon” carries the paragraph, but the claim that follows assumes it. Worth earning.' },
  { key: 'edit', label: 'Edit', color: '#a8c430', note: 'You lean on “equally” twice in one breath. Cut the second and the cadence sharpens.' },
  { key: 'factcheck', label: 'Factcheck', color: '#c8503c', note: 'The “total recall” figure is Borges by way of Funes, not the archive theorists. Check the attribution.' },
  { key: 'evidence', label: 'Evidence', color: '#64a0b4', note: 'Steyerl makes this exact point about the poor image. A citation here would do real work.' },
  { key: 'draft', label: 'Draft', color: '#9580b8', note: 'Want a bridge from “equally mute” to the reader’s stake? I can draft three.' },
];

export function LibrarianRoles() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const id = setInterval(() => setI((p) => (p + 1) % LIBRARIAN_ROLES.length), 3000);
    return () => clearInterval(id);
  }, []);
  const r = LIBRARIAN_ROLES[i];
  return (
    <div className="roles" aria-label="The Librarian taking on its various roles">
      <div className="roles__top">
        <div className="roles__mark" style={{ color: r.color, filter: `drop-shadow(0 0 22px ${r.color}55)` }}>
          <DingirMark color="currentColor" />
        </div>
        <div className="roles__note" key={i} style={{ background: `${r.color}1a`, borderColor: `${r.color}55` }}>
          <span className="roles__badge" style={{ color: r.color, borderColor: `${r.color}66` }}>{r.label}</span>
          <span className="roles__body">{r.note}</span>
        </div>
      </div>
      <div className="roles__rail">
        {LIBRARIAN_ROLES.map((rr, idx) => (
          <button
            key={rr.key}
            className={`roles__chip ${idx === i ? 'on' : ''}`}
            style={idx === i ? { color: rr.color, borderColor: `${rr.color}88`, background: `${rr.color}14` } : undefined}
            onClick={() => setI(idx)}
          >
            {rr.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ① Interstitial Critique — two paragraphs split apart and the real
   SuggestionBlock (copper left-rule, keep/dismiss/expand row) eases into the
   gap, holds, then dissolves and the paragraphs close. */
export function InterstitialDemo() {
  return (
    <div className="demo demo--itx" aria-label="A suggestion box easing in between two paragraphs, then dissolving.">
      <div className="demo__doc">
        <p className="demo__p">
          The distinction between archive and database is phenomenological, not technical. An archive
          implies provenance, the trace of a selecting hand.<span className="demo__caret" />
        </p>
        <div className="demo-itx__sugg" aria-hidden="true">
          <span className="demo-itx__label">Suggestion</span>
          <span className="demo-itx__text">
            Land writes that “nothing human makes it out of the near-future.” The tools outlast the
            assumptions we build them on.
          </span>
          <span className="demo-itx__acts">
            <b>keep this</b><i>dismiss</i><i>expand →</i>
          </span>
        </div>
        <p className="demo__p demo__p--dim">
          A database implies query, index, the assumption of completeness. The tools we write with
          inherit those assumptions wholesale.
        </p>
      </div>
    </div>
  );
}

/* ② Nomadic Annotation — a dingir reading-node pulses in at the passage, a
   phrase underlines in gold, then the real Critique margin card slides in.
   Uses the app's annotation colours (critique = gold #C8A03C). */
export function AnnotationDemo() {
  return (
    <div className="demo demo--anno" aria-label="A reading-node marking a passage, underlining it, and leaving a margin annotation.">
      <div className="demo__doc demo-anno__doc">
        <p className="demo__p">
          A database implies query, index,{' '}
          <span className="demo-anno__mark">the assumption of completeness</span>. Consider the
          affordance of an exhaustive query.
        </p>
        <p className="demo__p demo__p--dim">
          The writer who trusts their tool to remember is free to forget strategically; not
          everything needs to be held in mind at once.
        </p>
      </div>
      <aside className="demo-anno__margin" aria-hidden="true">
        <div className="demo-anno__card">
          <span className="demo-anno__badge">Critique</span>
          <span className="demo-anno__body">
            “Completeness” is doing a lot of work here; a database inherits none of the archive's
            provenance. Worth naming the trade.
          </span>
        </div>
      </aside>
    </div>
  );
}

/* ③ Librarian Call — a phrase highlights, the command palette scales in over the
   text (dingir + query), and a context-aware result types/fades in below. */
export function LibrarianDemo() {
  return (
    <div className="demo demo--lib" aria-label="The Librarian command palette opening over a passage with a context-aware answer.">
      <div className="demo__doc">
        <p className="demo__p">
          The archive is not a neutral container. What survives is what someone chose to keep, and{' '}
          <span className="demo-lib__hl">the act of keeping reshapes the thing kept</span>.
        </p>
        <p className="demo__p demo__p--dim">
          If that is true, the writer's relationship to their tools is not neutral either.
        </p>
        <div className="demo-lib__palette" aria-hidden="true">
          <div className="demo-lib__head">
            <span className="demo-lib__dingir">{DINGIR}</span>
            <span>Ask the Librarian</span>
          </div>
          <div className="demo-lib__query">
            Where else have I made this argument?<span className="demo__caret" />
          </div>
          <div className="demo-lib__result">
            You've used this framing three times. In “Total Recall” you tied it to forgetting, worth
            cross-referencing.
          </div>
        </div>
      </div>
    </div>
  );
}
