import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { getProjectsByType, getProjectById, getTypeLabel, type Project, type ProjectType } from "../data/projects";
import ProjectDetail from "./ProjectDetail";

/**
 * ViewportPanel - The Reading Surface (Editorial Grid)
 * 
 * Features:
 * - Rigid top-alignment grid (pt-32/40) for Archive
 * - Centered Museum Layout for Bio
 * - Text Scale Reduced (Body 90%, Titles 95%)
 * - Secondary "View complete archive" styling
 */

export type ViewportMode = "BIO" | "PROJECT" | "ARCHIVE";

interface ViewportPanelProps {
    mode: ViewportMode;
    selectedProjectId: string | null;
    onModeChange: (mode: ViewportMode) => void;
    onClearSelection: () => void;
}

const TYPE_ORDER: ProjectType[] = ["ESSAY_SERIES", "PUBLICATION", "ESSAY", "PROJECT"];

export default function ViewportPanel({
    mode,
    selectedProjectId,
    onModeChange,
    onClearSelection,
}: ViewportPanelProps) {

    const selectedProject = selectedProjectId ? getProjectById(selectedProjectId) : null;
    const groupedProjects = useMemo(() => getProjectsByType(), []);

    // -- STATE A: BIO -- (Reduced Scale)
    const renderBio = () => (
        <div className="w-full max-w-xl animate-fade-in text-left"> {/* Centered text alignment */}
            <div className="font-serif text-base md:text-lg leading-relaxed text-text-primary mb-12">
                <p className="mb-6">
                    Felipe Waldeck is a researcher, writer, and co-founder of <a href="https://mare.run" target="_blank" rel="noreferrer" className="text-text-primary underline decoration-pink-500/50 hover:decoration-pink-500 hover:text-pink transition-all">MARE</a>,
                    a media-agnostic research platform for navigating large, heterogeneous archives.
                </p>
                <p className="mb-6">
                    He designs computational tools and workflows that support cultural analysis and creative inquiry.
                    His work examines the intersection of infrastructure, subjectivity, and political conditions.
                </p>
            </div>

            <button
                onClick={() => onModeChange("ARCHIVE")}
                className="group font-utility text-xs uppercase tracking-widest text-green hover:text-pink transition-colors text-left"
            >
                View complete archive <span className="text-green ml-1 group-hover:ml-2 transition-all">→</span>
            </button>
        </div>
    );

    // -- STATE B: PROJECT --
    const renderProject = () => {
        if (!selectedProject) return null;
        return (
            <div className="pl-12 border-l border-white/5">
                <ProjectDetail
                    project={selectedProject}
                    accentColor="var(--text-primary)"
                    onBack={onClearSelection}
                />
            </div>
        );
    };

    // -- STATE C: ARCHIVE -- (Clean Text Index)
    const renderArchive = () => (
        <div className="w-full max-w-xl animate-fade-in pb-24 pl-12 border-l border-white/5">
            <button
                onClick={() => onModeChange("BIO")}
                className="font-utility text-xs uppercase tracking-widest text-text-primary hover:text-pink mb-12 block"
            >
                ← Return to Bio
            </button>

            {TYPE_ORDER.map((type) => {
                const typeProjects = groupedProjects[type];
                if (typeProjects.length === 0) return null;

                return (
                    <section key={type} className="mb-12">
                        <h3 className="font-utility text-[10px] tracking-widest uppercase text-green mb-6">
                            {getTypeLabel(type)}
                        </h3>

                        <div className="space-y-6">
                            {typeProjects.map((project) => (
                                <div key={project.id} className="group">
                                    <div className="flex flex-col md:flex-row md:items-baseline mb-1">
                                        <h4 className="font-serif text-base text-text-primary group-hover:text-pink transition-colors mr-3">
                                            {project.title}
                                        </h4>
                                        <span className="font-utility text-[10px] text-text-primary opacity-50">{project.date}</span>
                                    </div>
                                    <p className="font-serif text-sm text-text-primary opacity-80 leading-relaxed max-w-lg">
                                        {project.description}
                                    </p>
                                    {project.href && (
                                        <a
                                            href={project.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-2 font-utility text-[10px] uppercase tracking-widest text-pink hover:text-green transition-colors"
                                        >
                                            Read full text →
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );

    // Content Dispatcher
    const renderContent = () => {
        if (selectedProjectId) return renderProject();
        if (mode === "ARCHIVE") return renderArchive();
        return renderBio();
    };

    return (
        <div className="relative w-full h-full flex flex-col overflow-hidden">

            {/* Top Right External Nav - Rigid Alignment */}
            <div className="absolute top-12 right-12 flex gap-12 z-20 items-baseline pointer-events-auto">
                <Link
                    to="/cv"
                    className="font-serif text-pink tracking-tight hover:opacity-80 transition-opacity leading-none"
                    style={{ fontSize: "48px" }}
                >
                    CV
                </Link>
                <Link
                    to="/reading"
                    className="font-serif text-pink tracking-tight hover:opacity-80 transition-opacity leading-none"
                    style={{ fontSize: "48px" }}
                >
                    Reading
                </Link>
            </div>

            {/* Scrollable Content Area - Center Alignment for Bio */}
            <div className={`flex-1 overflow-y-auto px-12 md:px-24 pb-32 flex flex-col ${mode === "BIO" ? "justify-center items-center" : "pt-48 justify-start"}`}>
                {/* 
                   Mode: BIO -> Centered (Museum Wall Label style)
                   Mode: ARCHIVE/PROJECT -> Top Aligned (List/Detail)
               */}
                {renderContent()}
            </div>
        </div>
    );
}
