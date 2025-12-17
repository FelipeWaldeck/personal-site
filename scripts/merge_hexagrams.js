const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, '../src/data/hexagrams.ts');
const jsonPath = path.join(__dirname, '../src/data/scraped_hexagrams.json');

try {
    const tsContent = fs.readFileSync(tsPath, 'utf8');
    const scrapedContent = fs.readFileSync(jsonPath, 'utf8');
    const scrapedData = JSON.parse(scrapedContent);

    // Extract the array content using Regex to avoid full file eval issues
    const arrayMatch = tsContent.match(/export const hexagrams: Hexagram\[\] = \[\s*([\s\S]*?)\];/);

    if (!arrayMatch) {
        console.error("Could not find hexagrams array in ts file");
        process.exit(1);
    }

    const arrayBody = arrayMatch[1];

    // Evaluate the array body to get objects
    // We assume the body is valid JS/JSON-like structure
    const oldHexagrams = eval(`[${arrayBody}]`);

    // Merge Data
    const newHexagrams = oldHexagrams.map(old => {
        const scraped = scrapedData.find(s => s.number === old.number);

        if (scraped) {
            // Merge logic
            return {
                number: old.number,
                name: scraped.name, // Use new name (e.g. "Qian")
                hanzi: old.hanzi,   // Keep existing Hanzi
                lines: old.lines,   // Keep existing lines (Critical)
                summary: scraped.description, // Use new description
                tags: old.tags      // Keep existing tags
            };
        }
        return old;
    });

    // Reconstruct File
    // We want output similar to the original formatting if possible, but JSON is fine.
    // We mask the JSON.stringify to remove quotes from keys to look like TS? 
    // JSON is valid TS.

    const newContent = `/**
 * Hexagram data with TypeScript types
 * Minimal data for I-Ching lens display
 */

export interface Hexagram {
    number: number;
    name: string;
    hanzi: string;
    lines: (0 | 1)[]; // 6 lines bottom->top, 1=yang solid, 0=yin broken
    summary: string;
    tags: string[];
}

/**
 * All 64 hexagrams with summaries
 */
export const hexagrams: Hexagram[] = ${JSON.stringify(newHexagrams, null, 4)
            .replace(/"(\w+)":/g, '$1:') // Remove quotes from keys
            .replace(/"/g, '"')          // meaningful quotes stay
            .replace(/lines:\s*\[\s*([\d,\s]+)\s*\]/g, (match, content) => {
                // Compact lines array: lines: [1, 1, 1, 1, 1, 1]
                return `lines: [${content.replace(/\s+/g, ' ').trim()}]`;
            })
        };

/**
 * Get hexagram by number
 */
export function getHexagram(number: number): Hexagram {
    return hexagrams.find((h) => h.number === number) || hexagrams[0];
}
`;

    fs.writeFileSync(tsPath, newContent);
    console.log(`Successfully merged ${newHexagrams.length} hexagrams.`);

} catch (err) {
    console.error("Error during merge:", err);
    process.exit(1);
}
