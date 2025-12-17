import React, { useMemo } from "react";
import { getDailyHexagramNumber, getResonantProjects } from "../data/siteContent";
import { getHexagram } from "../data/hexagrams";

/**
 * ContextualLens - Structured right panel with I-Ching lens + resonant projects
 * 
 * Section A: DAILY LENS - Hexagram info (number, name, description, keywords)
 * Section B: RESONANT PROJECTS - 2-3 projects selected by hexagram
 * 
 * Vertically centered in the right half of the screen.
 */

export default function ContextualLens() {
    // Get daily hexagram info
    const hexagramNumber = useMemo(() => getDailyHexagramNumber(), []);
    const hexagram = useMemo(() => getHexagram(hexagramNumber), [hexagramNumber]);

    // Accent color (even = green, odd = pink)
    const accentColor = hexagramNumber % 2 === 0 ? "var(--accent-green)" : "var(--accent-pink)";

    // Get resonant projects (2-3)
    const resonantProjects = useMemo(() => getResonantProjects(3), []);

    // Handle project click
    const handleProjectClick = (project) => {
        if (project.isExternal && project.link) {
            window.open(project.link, "_blank", "noopener,noreferrer");
        } else if (project.route) {
            window.location.href = project.route;
        }
    };

    return (
        <div
            className="flex flex-col justify-center w-full px-8 md:px-12"
            style={{ maxWidth: "520px", margin: "0 auto" }}
        >
            {/* ============================================ */}
            {/* SECTION A: DAILY LENS */}
            {/* ============================================ */}
            <section className="mb-10">
                {/* Section label */}
                <div
                    style={{
                        fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                        fontSize: "10px",
                        color: accentColor,
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        marginBottom: "20px",
                    }}
                >
                    Daily Lens
                </div>

                {/* Hexagram header */}
                <div className="mb-6">
                    <h2
                        className="text-xl md:text-2xl mb-2"
                        style={{ color: "var(--text-primary)", lineHeight: 1.3 }}
                    >
                        <span
                            style={{
                                fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                                color: accentColor,
                                fontWeight: 600,
                                marginRight: "10px",
                            }}
                        >
                            {hexagram.number}
                        </span>
                        {hexagram.name_en}
                        <span
                            className="ml-2"
                            style={{ fontSize: "1.1rem", opacity: 0.6 }}
                        >
                            {hexagram.name_zh}
                        </span>
                    </h2>
                </div>

                {/* Description */}
                <p
                    className="mb-6"
                    style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        lineHeight: 1.7,
                    }}
                >
                    {hexagram.description}
                </p>

                {/* Keywords */}
                <div
                    className="flex flex-wrap gap-2"
                    style={{
                        fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                        fontSize: "10px",
                        color: "var(--text-muted)",
                        letterSpacing: "0.05em",
                    }}
                >
                    {(Array.isArray(hexagram.keywords) ? hexagram.keywords : hexagram.keywords?.split(", ") || []).slice(0, 5).map((kw, i) => (
                        <span
                            key={i}
                            style={{
                                padding: "3px 8px",
                                backgroundColor: "var(--bg-primary)",
                                borderRadius: "3px",
                                border: "1px solid var(--border-subtle)",
                            }}
                        >
                            {kw}
                        </span>
                    ))}
                </div>
            </section>

            {/* ============================================ */}
            {/* SECTION B: RESONANT PROJECTS */}
            {/* ============================================ */}
            <section>
                {/* Section label */}
                <div
                    style={{
                        fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                        fontSize: "10px",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        marginBottom: "20px",
                    }}
                >
                    Resonant Projects
                </div>

                {/* Project list */}
                <div className="space-y-6">
                    {resonantProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group"
                        >
                            {/* Type */}
                            <div
                                style={{
                                    fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                                    fontSize: "9px",
                                    color: accentColor,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    marginBottom: "6px",
                                }}
                            >
                                {project.type}
                            </div>

                            {/* Title */}
                            <h3
                                className="text-base mb-2"
                                style={{
                                    color: "var(--text-primary)",
                                    fontWeight: 500,
                                    lineHeight: 1.4,
                                }}
                            >
                                {project.title}
                            </h3>

                            {/* Blurb */}
                            <p
                                className="mb-3"
                                style={{
                                    fontSize: "13px",
                                    color: "var(--text-secondary)",
                                    lineHeight: 1.6,
                                }}
                            >
                                {project.blurb}
                            </p>

                            {/* Action link */}
                            <button
                                onClick={() => handleProjectClick(project)}
                                className="cursor-pointer"
                                style={{
                                    fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                                    fontSize: "11px",
                                    color: accentColor,
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    letterSpacing: "0.05em",
                                    transition: "opacity 0.15s ease",
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                            >
                                View →
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
