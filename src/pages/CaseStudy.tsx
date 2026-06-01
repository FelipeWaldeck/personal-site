import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { nodeById, CAT } from '../data/mapData';
import '../components/map/map.css';

export default function CaseStudy() {
  const { slug } = useParams();
  const node = slug ? nodeById(slug) : undefined;

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
