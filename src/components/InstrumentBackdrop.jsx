import React, { useState, useMemo, useEffect } from "react";
import { hexagrams, getHexagramLines } from "../data/hexagrams";
import { getDailyHexagramNumber } from "../data/siteContent";

/**
 * InstrumentBackdrop - Minimalist hexagram display (no rings)
 * 
 * Features:
 * - Large, centered hexagram
 * - Line-by-line reveal with accent pulse
 * - Clean hover metadata
 */

// === CONFIGURATION ===
const INSTRUMENT_SCALE = 1.8;
const DEFAULT_OPACITY = 0.2;
const HOVER_OPACITY = 0.45;
const FOCUS_OPACITY = 0.6;

// Animation timing (ms)
const LINE_REVEAL_DELAY = 180;
const LINE_REVEAL_DURATION = 220;
const PULSE_DURATION = 350;

// Geometry
const HEXAGRAM_WIDTH = 80;
const SVG_SIZE = 200;

export default function InstrumentBackdrop({ onFocusChange }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [visibleLines, setVisibleLines] = useState(0);
    const [pulsingLine, setPulsingLine] = useState(-1);

    // Check for reduced motion preference
    const prefersReducedMotion = useMemo(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, []);

    // Daily hexagram
    const hexagramNumber = useMemo(() => getDailyHexagramNumber(), []);
    const accentColor = hexagramNumber % 2 === 0 ? "var(--accent-green)" : "var(--accent-pink)";
    const hexagram = hexagrams.find((h) => h.number === hexagramNumber) || hexagrams[0];
    const lines = getHexagramLines(hexagramNumber);

    const center = SVG_SIZE / 2;

    // Line-by-line reveal with per-line accent pulse
    useEffect(() => {
        if (prefersReducedMotion) {
            setVisibleLines(6);
            return;
        }

        const timers = [];

        for (let i = 0; i < 6; i++) {
            const revealTime = i * LINE_REVEAL_DELAY;

            timers.push(setTimeout(() => {
                setVisibleLines(i + 1);
                setPulsingLine(i);
            }, revealTime));

            timers.push(setTimeout(() => {
                setPulsingLine((current) => current === i ? -1 : current);
            }, revealTime + PULSE_DURATION));
        }

        return () => timers.forEach(clearTimeout);
    }, [prefersReducedMotion]);

    // Handle click to toggle focus
    const handleClick = () => {
        const newFocused = !isFocused;
        setIsFocused(newFocused);
        if (onFocusChange) onFocusChange(newFocused);
    };

    // Render hexagram line with pulse support
    const renderHexagramLine = (isYang, index) => {
        const lineHeight = 6;
        const lineGap = 14;
        const totalHeight = 6 * lineGap;
        const startY = center - totalHeight / 2 + 6;
        const y = startY + (5 - index) * lineGap;
        const x = center - HEXAGRAM_WIDTH / 2;

        const isVisible = index < visibleLines;
        const isPulsing = pulsingLine === index;

        const fillColor = isPulsing ? accentColor : "currentColor";
        const opacity = isVisible ? 1 : 0;

        const filter = isPulsing
            ? `drop-shadow(0 0 6px ${accentColor === "var(--accent-pink)" ? "#FF4FD8" : "#00C78B"})`
            : "none";

        const lineStyle = {
            opacity,
            filter,
            transition: prefersReducedMotion ? "none" : `opacity ${LINE_REVEAL_DURATION}ms ease-out, filter ${PULSE_DURATION}ms ease-in-out`,
        };

        if (isYang) {
            return (
                <rect
                    key={index}
                    x={x}
                    y={y}
                    width={HEXAGRAM_WIDTH}
                    height={lineHeight}
                    fill={fillColor}
                    rx={1}
                    style={lineStyle}
                />
            );
        } else {
            const segmentWidth = (HEXAGRAM_WIDTH - 12) / 2;
            return (
                <g key={index} style={lineStyle}>
                    <rect x={x} y={y} width={segmentWidth} height={lineHeight} fill={fillColor} rx={1} />
                    <rect x={x + HEXAGRAM_WIDTH - segmentWidth} y={y} width={segmentWidth} height={lineHeight} fill={fillColor} rx={1} />
                </g>
            );
        }
    };

    const currentOpacity = isFocused ? FOCUS_OPACITY : isHovered ? HOVER_OPACITY : DEFAULT_OPACITY;

    // Format keywords for display
    const keywordsText = Array.isArray(hexagram.keywords)
        ? hexagram.keywords.slice(0, 3).join(" · ")
        : hexagram.keywords;

    return (
        <div
            className="instrument-backdrop"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) scale(${INSTRUMENT_SCALE})`,
                zIndex: 1,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <svg
                width={SVG_SIZE}
                height={SVG_SIZE}
                viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
                style={{
                    color: "var(--text-primary)",
                    opacity: currentOpacity,
                    transition: prefersReducedMotion ? "none" : "opacity 0.15s ease",
                }}
                aria-hidden="true"
            >
                {/* Hexagram lines only - no rings */}
                {lines.map((isYang, index) => renderHexagramLine(isYang, index))}
            </svg>

            {/* Metadata on hover - cleaner and more legible */}
            <div
                style={{
                    position: "absolute",
                    bottom: "-55px",
                    opacity: isHovered ? 1 : 0,
                    transition: prefersReducedMotion ? "none" : "opacity 0.15s ease",
                    textAlign: "center",
                    pointerEvents: "none",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                }}
            >
                {/* Number and Name */}
                <div
                    style={{
                        fontSize: "15px",
                        color: "var(--text-primary)",
                        letterSpacing: "0.02em",
                        marginBottom: "4px",
                    }}
                >
                    <span
                        style={{
                            fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                            color: accentColor,
                            fontWeight: 600,
                            marginRight: "8px",
                        }}
                    >
                        {hexagram.number}
                    </span>
                    {hexagram.name_en}
                    <span
                        style={{
                            marginLeft: "8px",
                            fontSize: "14px",
                            opacity: 0.5,
                        }}
                    >
                        {hexagram.name_zh}
                    </span>
                </div>

                {/* Keywords */}
                <div
                    style={{
                        fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        letterSpacing: "0.05em",
                    }}
                >
                    {keywordsText}
                </div>
            </div>
        </div>
    );
}

// Export hexagram data for contextual lens
export function getHexagramInfo() {
    const hexagramNumber = getDailyHexagramNumber();
    const hexagram = hexagrams.find((h) => h.number === hexagramNumber) || hexagrams[0];
    const accentColor = hexagramNumber % 2 === 0 ? "var(--accent-green)" : "var(--accent-pink)";

    return {
        number: hexagramNumber,
        name_en: hexagram.name_en,
        name_zh: hexagram.name_zh,
        keywords: hexagram.keywords,
        accentColor,
    };
}
