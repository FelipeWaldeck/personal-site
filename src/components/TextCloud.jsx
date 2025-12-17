import React, { useMemo } from "react";
import { getDailyHexagramNumber, getDailyMode, getSeededRandoms } from "../data/vocabulary";

/**
 * TextCloud - Felipe's daily vocabulary words
 * 
 * Displays 6-8 words from the daily mode, positioned around the left panel.
 * Words are sparse, low opacity, and never overlap the name.
 * 
 * Configuration:
 * - WORD_COUNT: Number of words to display (6-10)
 * - BASE_OPACITY: Default word opacity
 * - HIGHLIGHT_OPACITY: Opacity for 1-2 highlighted words
 * - WORD_SIZE: Font size in rem
 */

// === CONFIGURATION ===
const WORD_COUNT = 8;              // Words to display from mode
const BASE_OPACITY = 0.12;         // Very subtle
const HIGHLIGHT_OPACITY = 0.4;     // Slightly more visible for highlighted
const WORD_SIZE = 0.9;             // rem
const HIGHLIGHT_COUNT = 2;         // Number of words to highlight with accent

export default function TextCloud() {
  // Get daily hexagram and mode
  const hexagramNumber = useMemo(() => getDailyHexagramNumber(), []);
  const dailyMode = useMemo(() => getDailyMode(hexagramNumber), [hexagramNumber]);

  // Accent color based on hexagram (even = green, odd = pink)
  const accentColor = hexagramNumber % 2 === 0
    ? "var(--accent-green, #00C78B)"
    : "var(--accent-pink, #FF4FD8)";

  // Get seeded random positions (stable for the day)
  const randomValues = useMemo(() => {
    return getSeededRandoms(WORD_COUNT * 3); // Need x, y, and selection randoms
  }, []);

  // Select words to display
  const wordsToShow = useMemo(() => {
    const words = [...dailyMode.words];
    // Shuffle deterministically using seeded randoms
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(randomValues[i] * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    return words.slice(0, WORD_COUNT);
  }, [dailyMode.words, randomValues]);

  // Determine which words to highlight (first HIGHLIGHT_COUNT based on seed)
  const highlightedIndices = useMemo(() => {
    const indices = new Set();
    for (let i = 0; i < HIGHLIGHT_COUNT && i < wordsToShow.length; i++) {
      indices.add(Math.floor(randomValues[WORD_COUNT + i] * wordsToShow.length) % wordsToShow.length);
    }
    return indices;
  }, [randomValues, wordsToShow.length]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {wordsToShow.map((word, i) => {
        // Position words in the margins, avoiding center (where name is)
        // Use zones: top, bottom, left edge, right edge of the left panel
        const zone = i % 4;
        let top, left;

        switch (zone) {
          case 0: // Top area
            top = 8 + randomValues[i] * 15; // 8-23%
            left = 10 + randomValues[i + WORD_COUNT] * 35; // 10-45%
            break;
          case 1: // Bottom area
            top = 75 + randomValues[i] * 18; // 75-93%
            left = 10 + randomValues[i + WORD_COUNT] * 35;
            break;
          case 2: // Left edge
            top = 25 + randomValues[i] * 50; // 25-75%
            left = 3 + randomValues[i + WORD_COUNT] * 12; // 3-15%
            break;
          case 3: // Right edge (but still in left panel)
          default:
            top = 25 + randomValues[i] * 50;
            left = 38 + randomValues[i + WORD_COUNT] * 10; // 38-48%
            break;
        }

        const isHighlighted = highlightedIndices.has(i);

        return (
          <span
            key={`${word}-${i}`}
            style={{
              position: "absolute",
              top: `${top}%`,
              left: `${left}%`,
              fontSize: `${WORD_SIZE}rem`,
              fontFamily: "inherit",
              color: isHighlighted ? accentColor : "rgba(0,0,0,1)",
              opacity: isHighlighted ? HIGHLIGHT_OPACITY : BASE_OPACITY,
              whiteSpace: "nowrap",
              userSelect: "none",
              letterSpacing: "0.02em",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
