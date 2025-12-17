import React from "react";
import { Project, getTypeLabel } from "../data/projects";

/**
 * ProjectCard - Compact project display for resonant items
 */

interface ProjectCardProps {
    project: Project;
    accentColor: string;
    onView?: () => void;
}

export default function ProjectCard({ project, accentColor, onView }: ProjectCardProps) {
    const handleClick = () => {
        if (onView) {
            onView();
        } else if (project.href) {
            window.open(project.href, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div className="mb-6">
            {/* Type label */}
            <div
                style={{
                    fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                    fontSize: "10px",
                    color: accentColor,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "8px",
                }}
            >
                {getTypeLabel(project.type)}
            </div>

            {/* Title */}
            <h3
                style={{
                    fontSize: "1.1rem",
                    color: "var(--text-primary)",
                    fontWeight: 500,
                    marginBottom: "8px",
                    lineHeight: 1.4,
                }}
            >
                {project.title}
            </h3>

            {/* Description */}
            <p
                style={{
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: "12px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                }}
            >
                {project.description}
            </p>

            {/* View link */}
            <button
                onClick={handleClick}
                style={{
                    fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                    fontSize: "12px",
                    color: accentColor,
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    letterSpacing: "0.05em",
                    transition: "opacity 0.15s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
                View →
            </button>
        </div>
    );
}
