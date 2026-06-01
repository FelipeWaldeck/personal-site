import { describe, it, expect } from 'vitest';
import { WORKS, LINKS, CAT, nodeById } from './mapData';

describe('mapData', () => {
  it('has 16 works', () => {
    expect(WORKS).toHaveLength(16);
  });

  it('every link references existing node ids', () => {
    const ids = new Set(WORKS.map((w) => w.id));
    for (const [a, b] of LINKS) {
      expect(ids.has(a)).toBe(true);
      expect(ids.has(b)).toBe(true);
    }
  });

  it('every node category exists in CAT', () => {
    for (const w of WORKS) expect(CAT[w.cat]).toBeDefined();
  });

  it('nodeById resolves a known node', () => {
    expect(nodeById('mare')?.title).toBe('MARE');
  });

  it('marks two hubs (mare, namshub)', () => {
    expect(WORKS.filter((w) => w.hub).map((w) => w.id).sort()).toEqual(['mare', 'namshub']);
  });
});
