/**
 * Site content helpers.
 * Currently used only by the Reading page.
 */
import readingData from './reading.json';

export function getShelves() {
  const shelves = readingData.shelves || {};
  return Object.entries(shelves)
    .filter(([key]) => key !== 'currently-reading')
    .map(([key, shelf]) => ({
      key,
      displayName: shelf.displayName,
      order: shelf.order || 99,
      books: shelf.books || [],
    }))
    .sort((a, b) => a.order - b.order);
}
