import React from "react";

interface HexagramGlyphProps {
    className?: string;
    variant?: "solid" | "open";
}

// Configuration
const HEXAGRAM_WIDTH = 200;
const LINE_HEIGHT = 20;
const LINE_GAP = 38; // Increased from 32 for less density       
const SVG_SIZE = 400;

export default function HexagramGlyph({ className, variant = "solid" }: HexagramGlyphProps) {
    // Line configuration for 52 (Keeping Still)
    const hexagramLines = [0, 0, 1, 0, 0, 1];

    const renderLine = (isYang: 0 | 1, index: number) => {
        // Draw from top down visually
        const drawY = 40 + index * LINE_GAP;
        const x = (SVG_SIZE - HEXAGRAM_WIDTH) / 2;

        // Lens Logic: Fade middle lines (1-4) if open
        const isFrame = index === 0 || index === 5;
        const opacity = variant === "open" && !isFrame ? 0.05 : 1;

        // Structural Green
        const fillColor = "var(--accent-green)";

        if (isYang === 1) {
            return (
                <rect
                    key={index}
                    x={x}
                    y={drawY}
                    width={HEXAGRAM_WIDTH}
                    height={LINE_HEIGHT}
                    fill={fillColor}
                    opacity={opacity}
                    className="transition-opacity duration-700 ease-in-out"
                />
            );
        } else {
            const segmentWidth = (HEXAGRAM_WIDTH - 24) / 2;
            return (
                <g key={index} opacity={opacity} className="transition-opacity duration-700 ease-in-out">
                    <rect x={x} y={drawY} width={segmentWidth} height={LINE_HEIGHT} fill={fillColor} />
                    <rect x={x + HEXAGRAM_WIDTH - segmentWidth} y={drawY} width={segmentWidth} height={LINE_HEIGHT} fill={fillColor} />
                </g>
            );
        }
    };

    return (
        <div className={`inline-block select-none ${className}`}>
            <svg
                width={SVG_SIZE}
                height={300} // Cropped height to remove bottom gap
                viewBox={`0 0 ${SVG_SIZE} 300`}
                style={{ display: "block" }}
                aria-label="Structural Seal"
            >
                <defs>
                    <filter id="brush" x="-20%" y="-20%" width="140%" height="140%">
                        {/* Create organic noise for ink bleed effect */}
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
                        {/* Displace the source graphic by the noise to roughen edges */}
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
                <g filter="url(#brush)">
                    {[...hexagramLines].reverse().map((isYang, index) => renderLine(isYang as 0 | 1, index))}
                </g>
            </svg>
        </div>
    );
}
