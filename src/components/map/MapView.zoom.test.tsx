import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import MapView from './MapView';

describe('MapView pan/zoom', () => {
  it('zoom-in button shrinks the viewBox width', () => {
    const { container } = render(<MapView onSelect={() => {}} />);
    const svg = container.querySelector('svg')!;
    const before = svg.getAttribute('viewBox')!.split(' ').map(Number)[2];
    fireEvent.click(container.querySelector('button[title="Zoom in"]')!);
    const after = svg.getAttribute('viewBox')!.split(' ').map(Number)[2];
    expect(after).toBeLessThan(before);
  });

  it('reset button restores the initial viewBox', () => {
    const { container } = render(<MapView onSelect={() => {}} />);
    const svg = container.querySelector('svg')!;
    const initial = svg.getAttribute('viewBox')!;
    fireEvent.click(container.querySelector('button[title="Zoom in"]')!);
    fireEvent.click(container.querySelector('button[title="Reset view"]')!);
    expect(svg.getAttribute('viewBox')).toBe(initial);
  });
});
