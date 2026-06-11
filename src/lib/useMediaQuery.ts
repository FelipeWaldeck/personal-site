import { useEffect, useState } from 'react';

/**
 * Subscribe to a CSS media query and return whether it currently matches.
 * Re-renders on viewport changes. Guards against environments without
 * `matchMedia` (SSR / older test runners) by reporting `false`.
 */
export function useMediaQuery(query: string): boolean {
  const read = () =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(query).matches
      : false;

  const [matches, setMatches] = useState(read);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange(); // sync in case the query changed between render and effect
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

// The whole site treats Tailwind's `md` (768px) as the mobile/desktop line —
// MobileNav is `md:hidden`, CV/Reading use `md:` overrides. Below it is "mobile".
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767.98px)');
}
