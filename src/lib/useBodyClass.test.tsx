import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { useBodyClass } from './useBodyClass';

function Probe({ active }: { active: boolean }) {
  useBodyClass('detail-open', active);
  return null;
}

afterEach(() => {
  cleanup();
  document.body.className = '';
});

describe('useBodyClass', () => {
  it('adds the class when active and removes it when inactive', () => {
    const { rerender } = render(<Probe active />);
    expect(document.body.classList.contains('detail-open')).toBe(true);

    rerender(<Probe active={false} />);
    expect(document.body.classList.contains('detail-open')).toBe(false);
  });

  it('removes the class on unmount', () => {
    const { unmount } = render(<Probe active />);
    expect(document.body.classList.contains('detail-open')).toBe(true);
    unmount();
    expect(document.body.classList.contains('detail-open')).toBe(false);
  });
});
