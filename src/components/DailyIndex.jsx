import React, { useState, useMemo } from "react";
import { getProjectsOnly, getDailyProjectIds, getSeededRandoms } from "../data/siteContent";

/**
 * ProjectField - Left panel showing projects only (no reading)
 * 
 * Daily projects are highlighted with higher opacity and closer to center.
 * Clicking a project triggers the Inspector view (via onItemSelect).
 * 
 * CONFIG:
 * - DAILY_OPACITY/NON_DAILY_OPACITY: visibility levels
 * - DAILY_SIZE/NON_DAILY_SIZE: font sizes
 */

// === APPEARANCE ===
const DAILY_OPACITY = 0.6;
const NON_DAILY_OPACITY = 0.3;
const FOCUSED_OPACITY = 0.95;
const DAILY_SIZE = 0.95;
const NON_DAILY_SIZE = 0.75;

// === COLLISION / DISPERSION ===
const MIN_WORD_PADDING = 18;
const MAX_PLACEMENT_ATTEMPTS = 200;
const WORD_HEIGHT_ESTIMATE = 24;
const CHAR_WIDTH_ESTIMATE = 7;

// === EXCLUSION ZONES ===
const EXCLUSION_NAME_TOP = 14;
const EXCLUSION_NAME_LEFT = 35;
const EXCLUSION_CENTER_X = 50;
const EXCLUSION_CENTER_Y = 50;
const EXCLUSION_CENTER_RADIUS = 26;
const EDGE_MARGIN = 6;

// Estimate word bounding box
function estimateWordBox(title, x, y, isDaily) {
    const widthPx = title.length * CHAR_WIDTH_ESTIMATE * (isDaily ? 1.1 : 1);
    const widthPercent = widthPx / 8;
    const heightPercent = WORD_HEIGHT_ESTIMATE / 8;
    return { left: x, right: x + widthPercent, top: y, bottom: y + heightPercent };
}

// Check box overlap
function boxesOverlap(box1, box2, padding = 0) {
    const paddingPercent = padding / 8;
    return !(
        box1.right + paddingPercent < box2.left ||
        box1.left > box2.right + paddingPercent ||
        box1.bottom + paddingPercent < box2.top ||
        box1.top > box2.bottom + paddingPercent
    );
}

// Exclusion zone checks
function inSiteMarkZone(x, y) {
    return y < EXCLUSION_NAME_TOP && x < EXCLUSION_NAME_LEFT;
}

function inHexagramZone(x, y) {
    const dx = x - EXCLUSION_CENTER_X;
    const dy = y - EXCLUSION_CENTER_Y;
    return Math.sqrt(dx * dx + dy * dy) < EXCLUSION_CENTER_RADIUS;
}

function isValidPlacement(box) {
    if (box.left < EDGE_MARGIN || box.right > 100 - EDGE_MARGIN) return false;
    if (box.top < EDGE_MARGIN || box.bottom > 100 - EDGE_MARGIN) return false;
    const centerX = (box.left + box.right) / 2;
    const centerY = (box.top + box.bottom) / 2;
    if (inSiteMarkZone(centerX, centerY)) return false;
    if (inHexagramZone(centerX, centerY)) return false;
    return true;
}

export default function DailyIndex({
    isFocused = false,
    selectedItem = null,
    onItemSelect = () => { },
    focusModeActive = false
}) {
    const [hoveredItem, setHoveredItem] = useState(null);

    // Get projects only (no reading)
    const allProjects = useMemo(() => getProjectsOnly(), []);
    const dailyProjectIds = useMemo(() => getDailyProjectIds(), []);
    const randomValues = useMemo(() => getSeededRandoms(3000), []);

    // Calculate positions for all projects
    const positions = useMemo(() => {
        const placed = [];
        const posMap = {};

        // Sort: daily projects first for central placement priority
        const sortedProjects = [...allProjects].sort((a, b) => {
            const aDaily = dailyProjectIds.has(a.id) ? 0 : 1;
            const bDaily = dailyProjectIds.has(b.id) ? 0 : 1;
            return aDaily - bDaily;
        });

        sortedProjects.forEach((project, i) => {
            const isDaily = dailyProjectIds.has(project.id);
            let bestPosition = null;
            let attempt = 0;

            while (attempt < MAX_PLACEMENT_ATTEMPTS && !bestPosition) {
                const randIdx = (i * MAX_PLACEMENT_ATTEMPTS + attempt) * 2;

                let candidateX, candidateY;
                if (isDaily) {
                    // Daily projects: more central placement
                    candidateX = EDGE_MARGIN + randomValues[randIdx % randomValues.length] * (100 - EDGE_MARGIN * 2 - 15);
                    candidateY = EDGE_MARGIN + randomValues[(randIdx + 1) % randomValues.length] * (100 - EDGE_MARGIN * 2 - 10);
                } else {
                    // Non-daily: full dispersion
                    candidateX = EDGE_MARGIN + randomValues[(randIdx + 500) % randomValues.length] * (100 - EDGE_MARGIN * 2);
                    candidateY = EDGE_MARGIN + randomValues[(randIdx + 501) % randomValues.length] * (100 - EDGE_MARGIN * 2);
                }

                const box = estimateWordBox(project.title, candidateX, candidateY, isDaily);

                if (!isValidPlacement(box)) {
                    attempt++;
                    continue;
                }

                let hasCollision = false;
                for (const placedItem of placed) {
                    if (boxesOverlap(box, placedItem.box, MIN_WORD_PADDING)) {
                        hasCollision = true;
                        break;
                    }
                }

                if (!hasCollision) {
                    bestPosition = { x: candidateX, y: candidateY, box };
                }
                attempt++;
            }

            // Fallback position
            if (!bestPosition) {
                const row = Math.floor(i / 4);
                const col = i % 4;
                const x = EDGE_MARGIN + col * 22;
                const y = EDGE_MARGIN + 15 + row * 10;
                const box = estimateWordBox(project.title, x, y, isDaily);
                bestPosition = { x, y, box };
            }

            placed.push(bestPosition);
            posMap[project.id] = { x: bestPosition.x, y: bestPosition.y };
        });

        return posMap;
    }, [allProjects, dailyProjectIds, randomValues]);

    return (
        <>
            {/* Project field */}
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
                {allProjects.map((project) => {
                    const pos = positions[project.id];
                    if (!pos) return null;

                    const isDaily = dailyProjectIds.has(project.id);
                    const isHovered = hoveredItem === project.id;
                    const isSelected = selectedItem?.id === project.id;

                    // In focus mode, dim all except selected
                    if (focusModeActive && selectedItem && !isSelected) {
                        return null;
                    }

                    // Determine opacity
                    let opacity = isDaily ? DAILY_OPACITY : NON_DAILY_OPACITY;
                    if (isHovered || isSelected) opacity = FOCUSED_OPACITY;
                    else if (isFocused && isDaily) opacity = DAILY_OPACITY + 0.1;

                    // Determine color
                    const accentColor = isSelected
                        ? "var(--accent-pink)"
                        : isHovered
                            ? "var(--accent-green)"
                            : "var(--text-primary)";

                    const fontSize = isDaily ? DAILY_SIZE : NON_DAILY_SIZE;

                    return (
                        <span
                            key={project.id}
                            onMouseEnter={() => setHoveredItem(project.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                            onClick={() => onItemSelect(project)}
                            style={{
                                position: "absolute",
                                top: `${pos.y}%`,
                                left: `${pos.x}%`,
                                fontSize: `${fontSize}rem`,
                                fontFamily: "inherit",
                                color: accentColor,
                                opacity,
                                whiteSpace: "nowrap",
                                userSelect: "none",
                                letterSpacing: "0.02em",
                                cursor: "pointer",
                                pointerEvents: "auto",
                                transition: "opacity 0.2s ease, color 0.15s ease",
                                textDecoration: isHovered || isSelected ? "underline" : "none",
                                textUnderlineOffset: "4px",
                                textDecorationColor: isHovered ? "var(--accent-green)" : "var(--accent-pink)",
                                fontWeight: isDaily ? 500 : 400,
                            }}
                        >
                            {project.title}
                        </span>
                    );
                })}
            </div>

            {/* Hover preview (only when no item selected) */}
            {hoveredItem && !selectedItem && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "24px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 10,
                        backgroundColor: "var(--bg-secondary)",
                        border: "1px solid var(--border-subtle)",
                        padding: "10px 14px",
                        borderRadius: "4px",
                        maxWidth: "320px",
                        pointerEvents: "none",
                    }}
                >
                    {(() => {
                        const project = allProjects.find(p => p.id === hoveredItem);
                        if (!project) return null;
                        return (
                            <>
                                <div
                                    style={{
                                        fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                                        fontSize: "9px",
                                        color: "var(--accent-green)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.1em",
                                        marginBottom: "6px",
                                    }}
                                >
                                    {project.type}
                                </div>
                                <div style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                                    {project.blurb}
                                </div>
                            </>
                        );
                    })()}
                </div>
            )}
        </>
    );
}
