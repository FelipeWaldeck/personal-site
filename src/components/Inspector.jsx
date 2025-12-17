import React from "react";
import { Link } from "react-router-dom";

/**
 * Inspector - Detail view for a selected project
 * 
 * Shows when a project is clicked in the project field.
 * Displays title, type, description, and action link.
 */

export default function Inspector({ item, onBack, accentColor }) {
    if (!item) return null;

    const handlePrimaryAction = () => {
        if (item.isExternal && item.link) {
            window.open(item.link, "_blank", "noopener,noreferrer");
        } else if (item.route) {
            window.location.href = item.route;
        } else if (item.link) {
            window.open(item.link, "_blank", "noopener,noreferrer");
        }
    };

    // Determine action text based on type
    const actionText = item.type?.toLowerCase().includes("essay")
        ? "Read Essay →"
        : item.type?.toLowerCase().includes("publication")
            ? "View Publication →"
            : "View Project →";

    return (
        <div
            className="flex flex-col w-full h-full px-8 md:px-12 py-8"
            style={{ maxWidth: "520px", margin: "0 auto" }}
        >
            {/* Back button */}
            <button
                onClick={onBack}
                className="self-start mb-10 cursor-pointer"
                style={{
                    fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    letterSpacing: "0.05em",
                    background: "none",
                    border: "none",
                    padding: 0,
                    transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
            >
                ← Back to Daily Lens
            </button>

            {/* Inspector label */}
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
                Inspector
            </div>

            {/* Type badge */}
            <div
                style={{
                    fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                    fontSize: "9px",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "12px",
                }}
            >
                {item.type}
            </div>

            {/* Title */}
            <h2
                className="text-xl md:text-2xl mb-6"
                style={{ color: "var(--text-primary)", lineHeight: 1.3 }}
            >
                {item.title}
            </h2>

            {/* Description */}
            <p
                className="mb-8"
                style={{
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                }}
            >
                {item.blurb}
            </p>

            {/* Category tag */}
            {item.category && (
                <div className="mb-8">
                    <span
                        style={{
                            fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                            fontSize: "10px",
                            color: "var(--text-muted)",
                            backgroundColor: "var(--bg-primary)",
                            padding: "4px 10px",
                            borderRadius: "3px",
                            border: "1px solid var(--border-subtle)",
                        }}
                    >
                        {item.category}
                    </span>
                </div>
            )}

            {/* Primary action */}
            {(item.link || item.route) && (
                <button
                    onClick={handlePrimaryAction}
                    className="cursor-pointer self-start px-6 py-3"
                    style={{
                        fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                        fontSize: "12px",
                        color: "var(--bg-primary)",
                        backgroundColor: accentColor,
                        border: "none",
                        borderRadius: "4px",
                        letterSpacing: "0.05em",
                        transition: "opacity 0.15s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                >
                    {actionText}
                </button>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Footer */}
            <section
                className="pt-6"
                style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
                <div
                    className="flex justify-center gap-6"
                    style={{
                        fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                        fontSize: "11px",
                    }}
                >
                    <Link
                        to="/cv"
                        className="underline underline-offset-4"
                        style={{ color: "var(--text-muted)" }}
                    >
                        CV
                    </Link>
                </div>
            </section>
        </div>
    );
}
