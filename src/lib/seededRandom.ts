/**
 * Seeded random number generator for deterministic daily selection
 * 
 * Usage:
 *   const rng = createSeededRandom("2024-12-16");
 *   const value = rng(); // 0-1
 */

export function createSeededRandom(seed: string): () => number {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    // Mulberry32 PRNG
    let state = Math.abs(hash);

    return function (): number {
        state = (state + 0x6D2B79F5) | 0;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/**
 * Get today's date seed in YYYY-MM-DD format
 */
export function getDateSeed(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

/**
 * Deterministically select items from array using seeded random
 */
export function selectDailyItems<T>(items: T[], count: number, seed: string): T[] {
    const rng = createSeededRandom(seed);
    const shuffled = [...items].sort(() => rng() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get daily hexagram number (1-64)
 */
export function getDailyHexagramNumber(seed: string): number {
    const rng = createSeededRandom(seed);
    return Math.floor(rng() * 64) + 1;
}
