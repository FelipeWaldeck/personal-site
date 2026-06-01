import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MapView from './MapView';
import { WORKS, LINKS } from '../../data/mapData';

describe('MapView', () => {
  it('renders one group per node with its title', () => {
    const { container } = render(<MapView onSelect={() => {}} />);
    expect(container.querySelectorAll('g.map-node')).toHaveLength(WORKS.length);
    expect(screen.getByText('MARE')).toBeInTheDocument();
  });

  it('renders link paths (spine + cross + dash)', () => {
    const { container } = render(<MapView onSelect={() => {}} />);
    const paths = container.querySelectorAll('path.map-spine, path.map-cross, path.map-dash');
    expect(paths.length).toBeGreaterThanOrEqual(LINKS.length);
  });

  it('fires onSelect with the node when a node is clicked', () => {
    const onSelect = vi.fn();
    const { container } = render(<MapView onSelect={onSelect} />);
    const mareNode = container.querySelector('g.map-node[data-id="mare"]') as SVGGElement;
    fireEvent.click(mareNode);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'mare' }));
  });
});
