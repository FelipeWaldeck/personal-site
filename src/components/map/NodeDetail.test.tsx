import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NodeDetail from './NodeDetail';
import { nodeById } from '../../data/mapData';

const mare = nodeById('mare')!; // published platform node: blurb + href + tags
const zones3 = nodeById('zones3')!; // forthcoming node: no blurb, no href

afterEach(() => {
  vi.restoreAllMocks();
});

describe('NodeDetail', () => {
  it('renders nothing when no node is selected', () => {
    const { container } = render(<NodeDetail node={null} onClose={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders a published node as a labelled region with blurb, tags, and CTA', () => {
    render(<NodeDetail node={mare} onClose={() => {}} />);
    expect(screen.getByRole('region', { name: /MARE/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'MARE' })).toBeInTheDocument();
    expect(screen.getByText(/media-agnostic research platform/i)).toBeInTheDocument();
    expect(screen.getByText(/archive · ai · cognition · platform/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open/i })).toBeInTheDocument();
  });

  it('is not a modal dialog (the rail stays interactive)', () => {
    render(<NodeDetail node={mare} onClose={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the external href in a new tab when the CTA is clicked', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<NodeDetail node={mare} onClose={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /open/i }));
    expect(openSpy).toHaveBeenCalledWith('https://mare.run', '_blank', 'noopener,noreferrer');
  });

  it('renders a forthcoming node without a CTA', () => {
    render(<NodeDetail node={zones3} onClose={() => {}} />);
    expect(screen.getByRole('heading', { name: /Zones of Coupling III/ })).toBeInTheDocument();
    expect(screen.getByText('Forthcoming.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /open|read/i })).not.toBeInTheDocument();
  });

  it('calls onClose on the Back-to-map control and on Escape', () => {
    const onClose = vi.fn();
    render(<NodeDetail node={mare} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /back to map/i }));
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
