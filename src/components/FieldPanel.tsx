import React, { useState } from "react";
import { Link } from "react-router-dom";
import HexagramGlyph from "./HexagramGlyph";
import { getProjectById } from "../data/projects";
import { getHexagram } from "../data/hexagrams";

interface FieldPanelProps {
    onOpenArchive: () => void;
    selectedProjectId: string | null;
}

export default function FieldPanel({ onOpenArchive, selectedProjectId }: FieldPanelProps) {
    const [isHovered, setIsHovered] = useState(false);

    // INLINED SAFETY FALLBACK
    const hexagram = {
        number: 52,
        name: "Keeping Still",
        summary: "stopping or keeping still like a mountain; one stops at the back and does not see the person, walks in the courtyard and does not see the person, without fault."
    };

    const selectedProject = selectedProjectId ? getProjectById(selectedProjectId) : null;
    const isPreview = !!selectedProject;

    return (
        <div className="w-full h-full bg-bg-primary relative border-r border-green/20">

            {/* Name - Top Left */}
            <Link
                to="/"
                className="absolute top-12 left-12 z-20 font-serif text-pink tracking-tight hover:opacity-80 transition-opacity leading-none"
                style={{ fontSize: "48px" }}
            >
                Felipe Waldeck
            </Link>

            {/* Centered Trigger / Lens Area - Removed p-8 */}
            <div className="w-full h-full flex flex-col items-center justify-center relative">

                {/* Hexagram Lens Container */}
                <div
                    className={`
             relative cursor-pointer outline-none select-none
             transition-all duration-700 ease-out flex flex-col items-center justify-center
             ${isPreview ? "scale-100 opacity-100" : isHovered ? "opacity-90 scale-105" : "opacity-30 scale-100"}
           `}
                    onClick={isPreview ? undefined : onOpenArchive} // Neutral -> Click to Open Archive
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* The Glyph */}
                    <div className="relative z-0">
                        <HexagramGlyph variant={isPreview ? "open" : "solid"} />
                    </div>

                    {/* Neutral State: Hover Info */}
                    {!isPreview && (
                        <div
                            className={`
                    mt-2 flex flex-col items-center text-center max-w-sm px-4
                    transition-all duration-500 transform
                    ${isHovered ? "opacity-100 translate-y-0 relative" : "opacity-0 -translate-y-4 absolute top-full pointer-events-none"}
                  `}
                        >
                            <span className="font-serif text-3xl text-pink mb-2">
                                {hexagram.number}. {hexagram.name}
                            </span>
                            <p className="font-serif text-sm text-text-primary px-2 mb-4 opacity-90 leading-relaxed">
                                {hexagram.summary}
                            </p>
                            <span className="font-utility text-[10px] uppercase tracking-[0.25em] text-green border-b border-transparent hover:border-green pb-1 transition-all">
                                View Archive →
                            </span>
                        </div>
                    )}

                    {/* Preview State: Embedded Content Overlay */}
                    {isPreview && selectedProject && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-10 animate-fade-in pointer-events-none">
                            {/* Content Container */}
                            <div className="pointer-events-auto flex flex-col items-center">
                                <span className="font-utility text-[10px] uppercase tracking-[0.2em] text-green mb-4 block">
                                    {selectedProject.date || "2024"}
                                </span>
                                <h3 className="font-serif text-2xl text-text-primary mb-4 leading-tight max-w-[240px]">
                                    {selectedProject.title}
                                </h3>
                                <p className="font-serif text-xs text-text-primary opacity-80 mb-6 max-w-[220px] line-clamp-3 leading-relaxed">
                                    {selectedProject.description}
                                </p>
                                {selectedProject.href && (
                                    <a
                                        href={selectedProject.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-utility text-[10px] uppercase tracking-widest text-pink border-b border-pink hover:text-green hover:border-green transition-colors pb-1"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Read full text →
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
