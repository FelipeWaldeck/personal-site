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

  it('flags exactly the case-study nodes', () => {
    expect(WORKS.filter((w) => w.caseStudy).map((w) => w.id).sort()).toEqual(
      ['iface', 'ns-iface', 'ns-visid', 'namshub', 'visid'].sort()
    );
  });

  it('routes both MARE design nodes to the shared mare-design case study', () => {
    expect(nodeById('visid')?.caseStudySlug).toBe('mare-design');
    expect(nodeById('iface')?.caseStudySlug).toBe('mare-design');
  });

  it('routes the MARE hub to a modal, not a case study', () => {
    expect(nodeById('mare')?.caseStudy).toBeFalsy();
    expect(nodeById('mare')?.href).toBe('https://mare.run');
  });

  it('migrates blurb copy onto modal nodes', () => {
    expect(nodeById('mare')?.blurb).toMatch(/media-agnostic research platform/i);
    expect(nodeById('cond')?.blurb).toBeTruthy();
  });

  it('leaves forthcoming nodes without a blurb or href', () => {
    const zones3 = nodeById('zones3');
    expect(zones3?.blurb).toBeUndefined();
    expect(zones3?.href).toBeUndefined();
  });

  it('no longer carries the legacy external flag', () => {
    expect(WORKS.every((w) => !('external' in w))).toBe(true);
  });
});
