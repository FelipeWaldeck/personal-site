/**
 * Felipe Vocabulary Modes
 * 
 * 8 thematic modes, each with 8 words.
 * Daily mode is selected based on hexagram number: modeIndex = (hexagramNumber - 1) % 8
 * 
 * To adjust modes: edit the words array for each mode (max 8 words per mode)
 */

export const vocabularyModes = [
    {
        name: "STRUCTURE",
        words: ["structure", "protocol", "coordination", "logistics", "constraint", "system", "governance", "infrastructure"],
    },
    {
        name: "MEDIATION",
        words: ["mediation", "interface", "translation", "signal", "inscription", "abstraction", "framing", "articulation"],
    },
    {
        name: "INTERIORITY",
        words: ["interiority", "attention", "memory", "perception", "cognition", "affect", "trace", "subject"],
    },
    {
        name: "ARCHIVE",
        words: ["archive", "document", "index", "residue", "annotation", "record", "retrieval", "provenance"],
    },
    {
        name: "PREDICTION",
        words: ["prediction", "forecast", "optimisation", "probability", "control", "feedback", "automation", "anticipation"],
    },
    {
        name: "PUBLIC LIFE",
        words: ["public space", "infrastructure", "commons", "access", "governance", "circulation", "enclosure", "participation"],
    },
    {
        name: "FRAGMENTATION",
        words: ["fragmentation", "rupture", "drift", "noise", "decay", "contingency", "incoherence", "excess"],
    },
    {
        name: "SYNTHESIS",
        words: ["synthesis", "constellation", "mapping", "relation", "resonance", "pattern", "assemblage", "coherence"],
    },
];

/**
 * Get the daily mode based on hexagram number
 * @param {number} hexagramNumber - 1-64
 * @returns {object} - { name, words }
 */
export function getDailyMode(hexagramNumber) {
    const modeIndex = (hexagramNumber - 1) % 8;
    return vocabularyModes[modeIndex];
}

/**
 * Get date string for seeding (YYYY-MM-DD format)
 * Stable for 24 hours
 */
export function getDateSeed() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

/**
 * Simple deterministic hash from string to number
 * @param {string} str 
 * @returns {number} - 0 to 1
 */
export function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

/**
 * Get daily hexagram number (1-64) seeded by current date
 */
export function getDailyHexagramNumber() {
    const dateSeed = getDateSeed();
    const hash = hashString(dateSeed);
    return (hash % 64) + 1;
}

/**
 * Get deterministic "random" numbers seeded by date for word positioning
 * @param {number} count - Number of random values needed
 * @returns {number[]} - Array of values 0-1
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
