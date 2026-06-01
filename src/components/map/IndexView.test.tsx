import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import IndexView from './IndexView';
import { WORKS } from '../../data/mapData';

describe('IndexView', () => {
  it('renders every work as a row and fires onSelect on click', () => {
    const onSelect = vi.fn();
    render(<IndexView onSelect={onSelect} />);
    expect(screen.getAllByRole('button')).toHaveLength(WORKS.length);
    fireEvent.click(screen.getByText('MARE'));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'mare' }));
  });

  it('groups under category headings', () => {
    render(<IndexView onSelect={() => {}} />);
    expect(screen.getByRole('heading', { name: /platform/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /moving image/i })).toBeInTheDocument();
  });
});
