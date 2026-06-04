import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CaseStudy from './CaseStudy';

const renderAt = (path: string) => render(
  <MemoryRouter initialEntries={[path]}>
    <Routes><Route path="/work/:slug" element={<CaseStudy />} /></Routes>
  </MemoryRouter>
);

describe('CaseStudy', () => {
  it('renders the comprehensive MARE design case study for /work/mare-design', () => {
    renderAt('/work/mare-design');
    expect(screen.getByRole('heading', { name: 'MARE' })).toBeInTheDocument();
    // identity content is folded in
    expect(screen.getByRole('heading', { name: /cyber-cowboy/i })).toBeInTheDocument();
    // the item/clustering centerpiece is present
    expect(screen.getByRole('heading', { name: /names the collections itself/i })).toBeInTheDocument();
  });

  it('renders the finished Namshub case study for /work/namshub', () => {
    renderAt('/work/namshub');
    expect(screen.getByRole('heading', { name: 'Namshub' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /co-inhabitant/i })).toBeInTheDocument();
  });

  it('falls back to a coming-soon stub for a node without a dedicated page', () => {
    // a valid node id that has no finished case study and no caseStudySlug
    renderAt('/work/predict');
    expect(screen.getByRole('heading', { name: /Predictionism/ })).toBeInTheDocument();
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });

  it('resolves a shared canonical page via caseStudySlug on direct visit (ns-visid → Namshub)', () => {
    renderAt('/work/ns-visid');
    expect(screen.getByRole('heading', { name: 'Namshub' })).toBeInTheDocument();
  });

  it('shows a not-found message for an unknown slug', () => {
    renderAt('/work/nope');
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it('flags the document with detail-open while mounted (dims the horse)', () => {
    renderAt('/work/visid');
    expect(document.body.classList.contains('detail-open')).toBe(true);
  });
});
