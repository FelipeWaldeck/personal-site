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
  it('renders the title + meta for a known design slug', () => {
    renderAt('/work/visid');
    expect(screen.getByRole('heading', { name: /Visual identity, MARE/ })).toBeInTheDocument();
  });

  it('shows a not-found message for an unknown slug', () => {
    renderAt('/work/nope');
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
