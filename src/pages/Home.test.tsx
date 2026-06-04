import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

const renderHome = () => render(<MemoryRouter><Home /></MemoryRouter>);

beforeEach(() => {
  mockNavigate.mockClear();
});

describe('Home', () => {
  it('defaults to the Map view', () => {
    const { container } = renderHome();
    expect(screen.getByRole('button', { name: /map/i })).toHaveClass('on');
    expect(container.querySelector('svg[aria-label="Relational map of work"]')).toBeInTheDocument();
  });

  it('switches to the Index view', () => {
    renderHome();
    fireEvent.click(screen.getByRole('button', { name: /index/i }));
    expect(screen.getByRole('heading', { name: /platform/i })).toBeInTheDocument();
  });

  it('opens the in-place detail panel for a non-case-study node without navigating', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    renderHome();
    // 'MARE' is a link-out node (mare.run), not a case study
    fireEvent.click(screen.getByText('MARE'));
    expect(screen.getByRole('button', { name: /back to map/i })).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(openSpy).not.toHaveBeenCalled(); // opening the panel must not yet open the tab
    openSpy.mockRestore();
  });

  it('returns to the map when Back to map is clicked', () => {
    renderHome();
    fireEvent.click(screen.getByText('MARE'));
    fireEvent.click(screen.getByRole('button', { name: /back to map/i }));
    expect(screen.queryByRole('button', { name: /back to map/i })).not.toBeInTheDocument();
  });

  it('flags the document with detail-open while the panel is up (dims the horse)', () => {
    renderHome();
    expect(document.body.classList.contains('detail-open')).toBe(false);
    fireEvent.click(screen.getByText('MARE'));
    expect(document.body.classList.contains('detail-open')).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: /back to map/i }));
    expect(document.body.classList.contains('detail-open')).toBe(false);
  });

  it("opens the external link only when the panel's CTA is clicked", () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    renderHome();
    fireEvent.click(screen.getByText('MARE'));
    fireEvent.click(screen.getByRole('button', { name: /open/i }));
    expect(openSpy).toHaveBeenCalledWith('https://mare.run', '_blank', 'noopener,noreferrer');
    openSpy.mockRestore();
  });

  it('navigates to /work/:id for a case-study (design) node', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    renderHome();
    fireEvent.click(screen.getByRole('button', { name: /index/i })); // switch to Index to click a row
    fireEvent.click(screen.getByText('Visual identity, MARE'));
    expect(mockNavigate).toHaveBeenCalledWith('/work/mare-design');
    expect(screen.queryByRole('button', { name: /back to map/i })).not.toBeInTheDocument();
    expect(openSpy).not.toHaveBeenCalled();
    openSpy.mockRestore();
  });
});
