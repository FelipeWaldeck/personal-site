import { RefObject, useEffect } from 'react';

/**
 * useCursorCard — the Mare login effect: an info card that FOLLOWS the cursor
 * (a floating tooltip), not a parallax-around-a-fixed-anchor. The card tracks
 * the pointer while it's over the container, clamped so it stays within the
 * image region (never the copy on the left, never off the edges), and eases via
 * a CSS transition. When the pointer leaves, it returns to a resting spot. The
 * background image stays stable.
 *
 * Faithful to the login's `fixed pointer-events-none` card, scoped to a section
 * rather than the whole viewport so it only lives in this pane of the deck.
 */
export function useCursorCard(
  containerRef: RefObject<HTMLElement | null>,
  cardRef: RefObject<HTMLElement | null>,
  opts: { minLeftPct?: number; pad?: number } = {}
) {
  const { minLeftPct = 0.36, pad = 20 } = opts;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    // only on the desktop layout (the card is absolute there; static below 1081px)
    if (!window.matchMedia('(min-width: 1081px)').matches) return;

    let pending = false;
    let tx = 0;
    let ty = 0;

    const rest = () => {
      const c = containerRef.current;
      const card = cardRef.current;
      if (!c || !card) return;
      // resting spot: centre of the right-hand (image) region
      tx = c.clientWidth * 0.6 - card.offsetWidth / 2;
      ty = c.clientHeight / 2 - card.offsetHeight / 2;
      schedule();
    };

    const schedule = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        const card = cardRef.current;
        if (card) card.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px)`;
      });
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const c = containerRef.current;
      const card = cardRef.current;
      if (!c || !card) return;
      const r = c.getBoundingClientRect();
      const inside = e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) {
        rest();
        return;
      }
      const cw = card.offsetWidth;
      const ch = card.offsetHeight;
      const cx = e.clientX - r.left;
      const cy = e.clientY - r.top;
      // card sits up-left of the cursor (pointer near its lower-right), clamped
      let left = cx - cw - 10;
      let top = cy - ch * 0.62;
      const minLeft = r.width * minLeftPct;
      const maxLeft = r.width - cw - pad;
      left = Math.max(minLeft, Math.min(maxLeft, left));
      top = Math.max(pad, Math.min(r.height - ch - pad, top));
      tx = left;
      ty = top;
      schedule();
    };

    rest(); // initial position
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [containerRef, cardRef, minLeftPct, pad]);
}
