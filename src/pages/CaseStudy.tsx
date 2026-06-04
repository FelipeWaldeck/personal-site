import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { nodeById, CAT } from '../data/mapData';
import MareCaseStudy from './caseStudies/MareCaseStudy';
import NamshubCaseStudy from './caseStudies/NamshubCaseStudy';
import { useBodyClass } from '../lib/useBodyClass';
import '../components/map/map.css';

// Slugs with a fully built case study. Other case-study nodes fall back to the stub.
// 'mare-design' is the shared canonical slug for both MARE design nodes (visid + iface).
const FINISHED: Record<string, React.FC> = {
  'mare-design': MareCaseStudy,
  namshub: NamshubCaseStudy,
};

export default function CaseStudy() {
  const { slug } = useParams();
  const node = slug ? nodeById(slug) : undefined;

  useBodyClass('detail-open', true); // dims the bouncing horse while reading a case study

  // Finished case studies are keyed by slug and may use a canonical slug (e.g. 'mare-design')
  // that isn't itself a map node, so check the registry before the not-found guard. A node may
  // also point at a shared canonical page via caseStudySlug (e.g. ns-visid → namshub), so honour
  // that here too — this keeps direct/shared URLs in sync with how the map navigates.
  const effectiveSlug = node?.caseStudySlug ?? slug;
  const Finished = effectiveSlug ? FINISHED[effectiveSlug] : undefined;
  if (Finished) return <Finished />;

  if (!node) {
    return (
      <main style={{ padding: '64px 40px', maxWidth: 720, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-utility)' }}>Work not found.</p>
        <Link to="/" style={{ color: 'var(--accent-pink)' }}>← Back to the map</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: '64px 40px', maxWidth: 860, margin: '0 auto' }}>
      <Link to="/" style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent-green)' }}>← Back to the map</Link>
      <div style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: CAT[node.cat].color, marginTop: 32 }}>{CAT[node.cat].label}</div>
      <h1 style={{ fontFamily: 'var(--font-primary)', fontSize: 44, margin: '8px 0 0', color: 'var(--accent-pink)' }}>{node.title}</h1>
      <p style={{ fontFamily: 'var(--font-utility)', fontSize: 13, color: 'var(--ink-dim)' }}>{node.meta}</p>
      {/* TODO: hero image (public/case-studies/<slug>/), numbered sections, full-bleed media, reflection */}
      <div style={{ marginTop: 40, border: '1px dashed var(--line-soft)', padding: 40, fontFamily: 'var(--font-utility)', fontSize: 13, color: 'var(--ink-faint)' }}>
        Case study content coming soon.
      </div>
    </main>
  );
}
