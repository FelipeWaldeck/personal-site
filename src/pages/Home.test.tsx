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

  it('opens an external node in a new tab without navigating', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    renderHome();
    // 'MARE' is an external platform node (href https://mare.run)
    fireEvent.click(screen.getByText('MARE'));
    expect(openSpy).toHaveBeenCalledWith('https://mare.run', '_blank', 'noopener,noreferrer');
    expect(mockNavigate).not.toHaveBeenCalled();
    openSpy.mockRestore();
  });

  it('navigates to /work/:id for an internal (design) node', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    renderHome();
    fireEvent.click(screen.getByRole('button', { name: /index/i })); // switch to Index to click a row
    // 'Visual identity, MARE' (id visid) is internal — no external href
    fireEvent.click(screen.getByText('Visual identity, MARE'));
    expect(mockNavigate).toHaveBeenCalledWith('/work/visid');
    expect(openSpy).not.toHaveBeenCalled();
    openSpy.mockRestore();
  });
});
