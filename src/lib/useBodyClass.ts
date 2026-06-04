import { useEffect } from 'react';

/**
 * Toggle a class on <body> while a condition holds. Used to signal "a detail
 * surface is open" across the router boundary (Home's panel and case-study
 * pages), so app-level chrome like the bouncing horse can dim itself via CSS.
 * The class is always removed on unmount.
 */
export function useBodyClass(className: string, active: boolean) {
  useEffect(() => {
    if (!active) return;
    document.body.classList.add(className);
    return () => document.body.classList.remove(className);
  }, [className, active]);
}
