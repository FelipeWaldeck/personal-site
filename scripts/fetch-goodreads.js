/**
 * Goodreads RSS Fetch Script
 * 
 * Usage: node scripts/fetch-goodreads.js
 * 
 * This script fetches books from Goodreads RSS feeds and updates reading.json.
 * 
 * Cover Image Extraction (in order of priority):
 * 1. book_large_image_url (largest)
 * 2. book_medium_image_url
 * 3. book_image_url
 * 4. book_small_image_url
 */

const fs = require('fs');
const path = require('path');

// Path to reading.json
const READING_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'reading.json');

/**
 * Extract content from a tag, handling CDATA wrappers
 */
function extractTagContent(xml, tagName) {
    // Pattern handles both CDATA-wrapped and plain content
    const patterns = [
        // CDATA wrapped: <tag><![CDATA[content]]></tag>
        new RegExp(`<${tagName}><!\\[CDATA\\[([^\\]]*?)\\]\\]></${tagName}>`, 's'),
        // Plain content: <tag>content</tag>
        new RegExp(`<${tagName}>([^<]*)</${tagName}>`, 's'),
    ];

    for (const pattern of patterns) {
        const match = xml.match(pattern);
        if (match && match[1]) {
            const content = match[1].trim();
            if (content && content.length > 0) {
                return content;
            }
        }
    }
    return null;
}

/**
 * Extract cover image URL from RSS item XML
 * Tries image tags in order of size preference
 */
function extractCoverUrl(itemXml) {
    // Try each image tag, largest first
    const imageTags = [
        'book_large_image_url',
        'book_medium_image_url',
        'book_image_url',
        'book_small_image_url',
    ];

    for (const tag of imageTags) {
        const url = extractTagContent(itemXml, tag);
        if (url && url.startsWith('http') && !url.includes('nophoto')) {
            return url;
        }
    }

    return null;
}

/**
 * Parse a single RSS item
 */
function parseRssItem(itemXml) {
    const title = extractTagContent(itemXml, 'title');
    const authorName = extractTagContent(itemXml, 'author_name');
    const link = extractTagContent(itemXml, 'link');
    const bookId = extractTagContent(itemXml, 'book_id');
    const cover = extractCoverUrl(itemXml);

    return { title, author: authorName, link, cover, bookId };
}

/**
 * Parse RSS feed XML
 */
function parseRssFeed(xml) {
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
        const parsed = parseRssItem(match[1]);
        if (parsed.title) {
            items.push(parsed);
        }
    }

    return items;
}

/**
 * Fetch a shelf from Goodreads RSS
 */
async function fetchShelf(url, shelfName) {
    console.log(`\nFetching shelf: ${shelfName}...`);

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; BookShelfSync/1.0)',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const xml = await response.text();
        const items = parseRssFeed(xml);

        console.log(`  Found ${items.length} books`);

        const coversFound = items.filter(i => i.cover).length;
        console.log(`  Covers found: ${coversFound}/${items.length}`);

        // Log first few for verification
        items.slice(0, 3).forEach((item, i) => {
            console.log(`    ${i + 1}. "${item.title.slice(0, 40)}..." - Cover: ${item.cover ? '✓' : '✗'}`);
        });

        return items.map((item, index) => ({
            id: `book-${shelfName}-${index}`,
            title: item.title,
            author: item.author,
            cover: item.cover,
            link: item.link,
        }));
    } catch (error) {
        console.error(`  Error fetching ${shelfName}: ${error.message}`);
        return [];
    }
}

/**
 * Main function
 */
async function main() {
    console.log('='.repeat(50));
    console.log('Goodreads RSS Fetch Script');
    console.log('='.repeat(50));

    // Read current reading.json
    const readingData = JSON.parse(fs.readFileSync(READING_JSON_PATH, 'utf8'));
    const rssConfig = readingData._rssConfig;

    if (!rssConfig || !rssConfig.shelves) {
        console.error('No RSS config found in reading.json');
        process.exit(1);
    }

    // Fetch each shelf
    for (const shelfConfig of rssConfig.shelves) {
        const books = await fetchShelf(shelfConfig.url, shelfConfig.name);

        if (books.length > 0) {
            const shelfKeyMap = {
                'currently-reading': 'currently-reading',
                'to-read': 'to-read',
                'read': 'finished',
            };

            const localShelfKey = shelfKeyMap[shelfConfig.name] || shelfConfig.name;

            if (readingData.shelves[localShelfKey]) {
                readingData.shelves[localShelfKey].books = books;
                console.log(`  Replaced ${localShelfKey} with ${books.length} books`);
            }
        }
    }

    // Write updated reading.json
    fs.writeFileSync(READING_JSON_PATH, JSON.stringify(readingData, null, 2));
    console.log('\n' + '='.repeat(50));
    console.log('Updated reading.json');
    console.log('='.repeat(50));
}

main().catch(console.error);
