import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Rail from './Rail';

describe('Rail', () => {
  it('renders the name and nav links', () => {
    render(<MemoryRouter><Rail /></MemoryRouter>);
    expect(screen.getByText(/Felipe/)).toBeInTheDocument();
    expect(screen.getByText(/Reading/i)).toBeInTheDocument();
    expect(screen.getByText(/Keeping Still/i)).toBeInTheDocument();
  });
});
