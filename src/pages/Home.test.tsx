import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

const renderHome = () => render(<MemoryRouter><Home /></MemoryRouter>);

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

  it('shows the rail identity in both views', () => {
    renderHome();
    expect(screen.getByText(/Felipe/)).toBeInTheDocument();
  });
});
