import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HexagramGlyph from "./HexagramGlyph";
import { getDailyHexagram } from "../data/hexagrams";
import { getProjectById } from "../data/projects";
import type { ViewportMode } from "./ViewportPanel";

interface FieldPanelProps {
    onOpenArchive: () => void;
    selectedProjectId: string | null;
    mode?: ViewportMode;
    onSelectProject?: (id: string) => void;
    onModeChange?: (mode: ViewportMode) => void;
}

export default function FieldPanel({ onOpenArchive, selectedProjectId }: FieldPanelProps) {
    // Safety: ensure hexagram exists
    const hexagram = getDailyHexagram() || { number: 0, name: "Unknown", summary: "", lines: [0, 0, 0, 0, 0, 0] };

    // Debugging
    useEffect(() => {
        console.log("FieldPanel Rendered. ProjectId:", selectedProjectId);
    }, [selectedProjectId]);

    // -- RENDER: HEXAGRAM (Neutral State) --
    const renderHexagram = () => (
        <div className="w-full h-full flex flex-col items-center justify-center relative p-8 animate-fade-in text-center">
            <div className="flex flex-col items-center cursor-pointer group" onClick={onOpenArchive}>
                {/* Glyph */}
                <div className="mb-8 opacity-80 group-hover:opacity-100 transition-opacity duration-500 text-green">
                    <HexagramGlyph variant="solid" />
                </div>
                {/* Info */}
                <div className="max-w-sm px-4">
                    <span className="font-serif text-3xl text-green mb-2 block">
                        {hexagram.number}. {hexagram.name}
                    </span>
                    <p className="font-utility text-sm text-text-primary px-2 mb-6 opacity-80 leading-relaxed tracking-wide">
                        {hexagram.summary}
                    </p>
                </div>
            </div>
        </div>
    );

    // -- RENDER: PREVIEW CARD (Bounded Box) --
    // Replaces Hexagram on the Left when selected.
    const renderContent = () => {
        // 1. Guard Clause: No Selection
        if (!selectedProjectId) {
            return renderHexagram();
        }

        // 2. Data Fetch
        const project = getProjectById(selectedProjectId);

        // 3. Guard Clause: Project Not Found
        if (!project) {
            console.warn(`FieldPanel: Project not found for ID ${selectedProjectId}`);
            return renderHexagram();
        }

        // 4. Safe Property Access
        const title = project.title || "Untitled Project";
        const date = project.date || "";
        const subtype = (project.subtype || "Project").toUpperCase();
        // Fallback description to empty string to prevent .split() crash
        const description = project.longDescription || project.description || "";
        const imageSrc = project.image; // Can be undefined

        return (
            <div className="w-full h-full bg-bg-primary relative z-10 animate-fade-in">
                {/* 
                    Flex Container 
                    - pt-32: Ensures content starts below "Felipe Waldeck" fixed header (Safe Zone) 
                    - pb-12: Bottom padding for balance
                 */}
                <div className={`w-full h-full flex flex-col items-center px-12 md:px-16 overflow-y-auto custom-scrollbar ${imageSrc ? "justify-start pt-48 pb-12" : "justify-center pt-0 pb-0"}`}>

                    <div className="max-w-lg w-full flex flex-col items-center text-center">

                        {/* 1. TOP: Image & Header (Static) */}
                        <div className="shrink-0 w-full flex flex-col items-center mb-6">
                            {/* Bounded Image Box - Adaptive Height (Only if Image Exists) */}
                            {imageSrc && (
                                <div className="w-auto max-w-[75%] mb-8 border border-border-subtle relative shadow-2xl shadow-pink/5 group">
                                    <img
                                        src={imageSrc}
                                        alt={title}
                                        className="w-full h-auto block transition-all duration-700"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}

                            {/* Metadata */}
                            <span className="font-utility text-[10px] uppercase tracking-[0.2em] text-green mb-4 block">
                                {date} — {subtype}
                            </span>
                            <h2 className="font-serif text-3xl text-text-primary mb-2 leading-tight">
                                {title}
                            </h2>
                        </div>

                        {/* 2. MIDDLE: Text (Truncated, No Scroll) */}
                        <div className="w-full font-serif text-base text-text-primary opacity-90 leading-loose text-center mb-6">
                            <p className="line-clamp-3">
                                {description}
                            </p>
                        </div>

                        {/* 3. BOTTOM: CTA (Always Visible) */}
                        {project.href && (
                            <div className="shrink-0 pt-4 w-full flex justify-center">
                                <a
                                    href={project.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-block border border-border-subtle px-8 py-3 font-utility text-[10px] uppercase tracking-widest text-green hover:bg-green hover:text-bg-primary transition-all"
                                >
                                    Read Full Article →
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full bg-bg-primary relative border-r border-border-subtle overflow-hidden">
            {/* Name - Top Left (Fixed) */}
            <Link
                to="/"
                className="absolute top-12 left-12 z-20 font-serif text-pink tracking-tight hover:opacity-80 transition-opacity leading-none"
                style={{ fontSize: "48px" }}
            >
                Felipe Waldeck
            </Link>

            {/* Content Area */}
            {renderContent()}

            {/* Mobile Back Button (Only when previewing a project) */}
            {selectedProjectId && (
                <button
                    onClick={onOpenArchive}
                    className="md:hidden absolute top-32 left-12 z-50 font-utility text-xs uppercase tracking-widest text-text-primary border-b border-text-primary pb-1 animate-fade-in"
                >
                    ← Close Preview
                </button>
            )}
        </div>
    );
}
