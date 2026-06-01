import { describe, it, expect } from 'vitest';
import { roundedPath, ortho, smooth, linkPath } from './mapGeometry';

const A: [number, number] = [100, 100];
const B: [number, number] = [300, 300];

describe('mapGeometry', () => {
  it('roundedPath starts with a moveto at the first point', () => {
    expect(roundedPath([{ x: 10, y: 20 }, { x: 30, y: 40 }], 5)).toMatch(/^M10 20/);
  });

  it('ortho on a straight horizontal run is a single line', () => {
    expect(ortho([0, 50], [200, 50])).toBe('M0 50 L200 50');
  });

  it('ortho on a diagonal produces an L-shaped path (has a Q elbow)', () => {
    expect(ortho(A, B)).toContain('Q');
  });

  it('smooth produces a cubic bezier', () => {
    expect(smooth(A, B)).toContain('C');
  });

  it('linkPath uses smooth for cross and ortho for flow/crossdash/dash', () => {
    expect(linkPath(A, B, 'cross')).toContain('C');
    expect(linkPath(A, B, 'crossdash')).toContain('Q'); // orthogonal
    expect(linkPath([0, 50], [200, 50], 'flow')).toBe('M0 50 L200 50');
  });
});
