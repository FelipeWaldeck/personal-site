import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ViewToggle from './ViewToggle';

describe('ViewToggle', () => {
  it('marks the active view and fires onChange', () => {
    const onChange = vi.fn();
    render(<ViewToggle view="map" onChange={onChange} />);
    expect(screen.getByRole('button', { name: /map/i })).toHaveClass('on');
    fireEvent.click(screen.getByRole('button', { name: /index/i }));
    expect(onChange).toHaveBeenCalledWith('index');
  });
});
