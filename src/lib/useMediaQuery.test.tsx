import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, act, cleanup } from '@testing-library/react';
import { useMediaQuery, useIsMobile } from './useMediaQuery';

/**
 * Controllable matchMedia stub: lets a test flip `matches` and fire a `change`
 * event the way a real viewport resize would.
 */
function installMatchMedia(initial: boolean) {
  let listeners: Array<() => void> = [];
  const state = { matches: initial };
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    get matches() {
      return state.matches;
    },
    media: query,
    onchange: null,
    addEventListener: (_: string, cb: () => void) => listeners.push(cb),
    removeEventListener: (_: string, cb: () => void) => {
      listeners = listeners.filter((l) => l !== cb);
    },
    dispatchEvent: () => false,
  }));
  return {
    set(v: boolean) {
      state.matches = v;
      act(() => listeners.forEach((l) => l()));
    },
  };
}

function Probe({ query }: { query: string }) {
  const matches = useMediaQuery(query);
  return <span data-testid="m">{matches ? 'yes' : 'no'}</span>;
}

function MobileProbe() {
  return <span data-testid="m">{useIsMobile() ? 'mobile' : 'desktop'}</span>;
}

afterEach(cleanup);

describe('useMediaQuery', () => {
  it('reflects the initial match state', () => {
    installMatchMedia(true);
    render(<Probe query="(max-width: 767.98px)" />);
    expect(screen.getByTestId('m').textContent).toBe('yes');
  });

  it('updates when the media query change event fires', () => {
    const mql = installMatchMedia(false);
    render(<Probe query="(max-width: 767.98px)" />);
    expect(screen.getByTestId('m').textContent).toBe('no');
    mql.set(true);
    expect(screen.getByTestId('m').textContent).toBe('yes');
  });

  it('useIsMobile is true below the md breakpoint', () => {
    installMatchMedia(true);
    render(<MobileProbe />);
    expect(screen.getByTestId('m').textContent).toBe('mobile');
  });

  it('useIsMobile is false above the md breakpoint', () => {
    installMatchMedia(false);
    render(<MobileProbe />);
    expect(screen.getByTestId('m').textContent).toBe('desktop');
  });
});
