import React, { useState, useMemo } from "react";
import { hexagrams, getHexagramLines } from "../data/hexagrams";

/**
 * HexagramBackdrop - Subtle I Ching hexagram behind the name
 * 
 * Configuration:
 * - DOT_MATRIX_MODE: Set to true for dot-matrix style lines
 * - Accent colors: Defined in CSS variables --accent-pink, --accent-green
 * - Opacity: Adjust LINE_OPACITY_DEFAULT and LINE_OPACITY_HOVER
 */

// Configuration toggles
const DOT_MATRIX_MODE = false; // Set to true for dot-matrix style
const LINE_OPACITY_DEFAULT = 0.12;
const LINE_OPACITY_HOVER = 0.35;

export default function HexagramBackdrop() {
    const [isHovered, setIsHovered] = useState(false);

    // Generate random hexagram once per session (useMemo with empty deps)
    const hexagramNumber = useMemo(() => {
        return Math.floor(Math.random() * 64) + 1;
    }, []);

    const hexagram = hexagrams.find((h) => h.number === hexagramNumber) || hexagrams[0];
    const lines = getHexagramLines(hexagramNumber);

    // Render a single line (yang = solid, yin = broken)
    const renderLine = (isYang, index) => {
        const lineHeight = 6;
        const lineGap = 14;
        const lineWidth = 80;

        if (DOT_MATRIX_MODE) {
            // Dot-matrix style
            const dotCount = 12;
            const dots = [];
            for (let i = 0; i < dotCount; i++) {
                // For yin (broken), skip middle dots
                if (!isYang && i >= 5 && i <= 6) continue;
                dots.push(
                    <circle
                        key={i}
                        cx={8 + i * 7}
                        cy={lineHeight / 2}
                        r={2.5}
                        fill="currentColor"
                    />
                );
            }
            return (
                <g
                    key={index}
                    transform={`translate(0, ${(5 - index) * lineGap})`}
                >
                    {dots}
                </g>
            );
        } else {
            // Pure lines style (default)
            if (isYang) {
                // Solid line
                return (
                    <rect
                        key={index}
                        x={0}
                        y={(5 - index) * lineGap}
                        width={lineWidth}
                        height={lineHeight}
                        fill="currentColor"
                        rx={1}
                    />
                );
            } else {
                // Broken line (two segments with gap)
                const segmentWidth = (lineWidth - 12) / 2;
                return (
                    <g key={index}>
                        <rect
                            x={0}
                            y={(5 - index) * lineGap}
                            width={segmentWidth}
                            height={lineHeight}
                            fill="currentColor"
                            rx={1}
                        />
                        <rect
                            x={lineWidth - segmentWidth}
                            y={(5 - index) * lineGap}
                            width={segmentWidth}
                            height={lineHeight}
                            fill="currentColor"
                            rx={1}
                        />
                    </g>
                );
            }
        }
    };

    return (
        <div
            className="hexagram-backdrop"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 0,
                pointerEvents: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
            }}
        >
            {/* Hexagram SVG */}
            <svg
                width="80"
                height="90"
                viewBox="0 0 80 90"
                style={{
                    color: isHovered
                        ? "var(--accent-green, #00C78B)"
                        : "rgba(0,0,0,1)",
                    opacity: isHovered ? LINE_OPACITY_HOVER : LINE_OPACITY_DEFAULT,
                    transition: "opacity 0.15s ease, color 0.15s ease",
                }}
                aria-hidden="true"
            >
                {lines.map((isYang, index) => renderLine(isYang, index))}
            </svg>

            {/* Metadata - visible on hover */}
            <div
                style={{
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.15s ease",
                    textAlign: "center",
                    fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                    fontSize: "11px",
                    color: "var(--accent-pink, #FF4FD8)",
                    pointerEvents: "none",
                    userSelect: "none",
                }}
            >
                <div style={{ fontWeight: 600 }}>
                    {hexagram.number}. {hexagram.name_en}
                </div>
                <div style={{ fontSize: "14px", marginTop: "2px" }}>
                    {hexagram.name_zh}
                </div>
                {hexagram.keywords && (
                    <div style={{ marginTop: "4px", opacity: 0.7 }}>
                        {hexagram.keywords}
                    </div>
                )}
            </div>
        </div>
    );
}
