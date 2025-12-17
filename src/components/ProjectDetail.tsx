import React from "react";
import { Project, getTypeLabel } from "../data/projects";

/**
 * ProjectDetail - Text-only detail view
 */

interface ProjectDetailProps {
    project: Project;
    accentColor: string;
    onBack: () => void;
}

export default function ProjectDetail({ project, accentColor, onBack }: ProjectDetailProps) {
    const handleView = () => {
        if (project.href) {
            window.open(project.href, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div className="w-full max-w-2xl animate-fade-in pb-24">
            {/* Back text */}
            <button
                onClick={onBack}
                className="font-utility text-xs uppercase tracking-widest text-text-primary hover:text-pink mb-12"
            >
                ← Return
            </button>

            {/* Type label - Quieter */}
            <div className="font-utility text-[10px] tracking-[0.2em] uppercase text-green mb-8">
                {getTypeLabel(project.type)}
            </div>

            {/* Title - Reduced Scale */}
            <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-8 leading-tight">
                {project.title}
            </h2>

            {/* Description - Reduced Scale */}
            <p className="font-serif text-lg text-text-primary opacity-80 leading-relaxed mb-12">
                {project.description}
            </p>

            {/* Tags - Comma separated text instead of chips */}
            {project.tags && project.tags.length > 0 && (
                <div className="font-utility text-sm text-text-primary opacity-50 mb-12">
                    {project.tags.join(", ")}
                </div>
            )}

            {/* Action link */}
            {project.href && (
                <button
                    onClick={handleView}
                    className="font-utility text-base text-pink hover:text-green transition-colors border-b border-pink hover:border-green pb-1"
                >
                    {project.type === "ESSAY" || project.type === "ESSAY_SERIES" ? "Read full text" : "View project"} →
                </button>
            )}
        </div>
    );
}
