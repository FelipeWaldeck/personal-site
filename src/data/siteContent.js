/**
 * Unified Site Content
 * 
 * All content items that can appear in the Daily Index.
 * Each item has: id, title, type, blurb, route (internal) or link (external)
 * 
 * Merges: work items, reading books
 */

import workData from "./workData.json";
import readingData from "./reading.json";

// Normalize work items
const workItems = workData.data.map((item, index) => ({
    id: `work-${index}`,
    title: item.name,
    type: item.technology, // "Essay series", "Publication", "Essay"
    blurb: item.description[0].text.slice(0, 80) + "...",
    link: item.externalLink,
    isExternal: true,
    category: "work",
}));

// Normalize reading items from shelf-based structure
const readingItems = [];
const shelves = readingData.shelves || {};

Object.entries(shelves).forEach(([shelfKey, shelf]) => {
    if (shelf.books && Array.isArray(shelf.books)) {
        shelf.books.forEach((book) => {
            readingItems.push({
                id: book.id || `reading-${readingItems.length}`,
                title: book.title,
                type: "Reading",
                blurb: book.note || `By ${book.author}`,
                author: book.author,
                shelf: shelf.displayName,
                shelfKey: shelfKey,
                cover: book.cover || null,
                link: book.link || null,
                route: "/reading", // Navigate to reading page
                isExternal: false, // Default to internal, click opens reading page
                category: "reading",
            });
        });
    }
});

// Combine all content
export const allContent = [...workItems, ...readingItems];

// Export reading items separately for the Reading page
export const allReadingItems = readingItems;

// Export shelves for the Reading page
export function getShelves() {
    const shelves = readingData.shelves || {};
    return Object.entries(shelves)
        .map(([key, shelf]) => ({
            key,
            displayName: shelf.displayName,
            order: shelf.order || 99,
            books: shelf.books || [],
        }))
        .sort((a, b) => a.order - b.order);
}

/**
 * Get projects only (no reading items) for homepage
 */
export function getProjectsOnly() {
    return workItems;
}

/**
 * Get daily projects (8 projects seeded by date)
 */
export function getDailyProjects() {
    const dateSeed = getDateSeed();
    const shuffled = [...workItems].sort((a, b) => {
        const hashA = hashString(dateSeed + a.id);
        const hashB = hashString(dateSeed + b.id);
        return hashA - hashB;
    });
    return shuffled.slice(0, Math.min(8, shuffled.length));
}

/**
 * Get IDs of daily projects
 */
export function getDailyProjectIds() {
    const dailyProjects = getDailyProjects();
    return new Set(dailyProjects.map(p => p.id));
}

/**
 * Get 2-3 resonant projects based on hexagram
 */
export function getResonantProjects(count = 3) {
    const dateSeed = getDateSeed();
    const hexNum = getDailyHexagramNumber();

    // Use hexagram + date to select resonant projects
    const seed = dateSeed + "-resonant-" + hexNum;
    const shuffled = [...workItems].sort((a, b) => {
        const hashA = hashString(seed + a.id);
        const hashB = hashString(seed + b.id);
        return hashA - hashB;
    });

    return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get 8 daily items seeded by date
 * @returns {Array} 8 items for today's Daily Index
 */
export function getDailyIndex() {
    const dateSeed = getDateSeed();

    // Shuffle deterministically and pick 8
    const shuffled = [...allContent].sort((a, b) => {
        const hashA = hashString(dateSeed + a.id);
        const hashB = hashString(dateSeed + b.id);
        return hashA - hashB;
    });

    return shuffled.slice(0, 8);
}

/**
 * Get the "suggested first click" index (0-7) for today
 */
export function getSuggestedIndex() {
    const dateSeed = getDateSeed();
    const hash = hashString(dateSeed + "-suggested");
    return hash % 8;
}

// Utility functions
function getDateSeed() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

/**
 * Get date-seeded hexagram number
 */
export function getDailyHexagramNumber() {
    const dateSeed = getDateSeed();
    const hash = hashString(dateSeed);
    return (hash % 64) + 1;
}

/**
 * Get seeded random values for positioning
 */
export function getSeededRandoms(count) {
    const dateSeed = getDateSeed();
    const randoms = [];
    for (let i = 0; i < count; i++) {
        const hash = hashString(dateSeed + "-" + i);
        randoms.push((hash % 1000) / 1000);
    }
    return randoms;
}

/**
 * Get set of daily item IDs for highlighting
 */
export function getDailyItemIds() {
    const dailyItems = getDailyIndex();
    return new Set(dailyItems.map(item => item.id));
}

/**
 * Get all content items for the archive field
 */
export function getAllItems() {
    return allContent;
}
