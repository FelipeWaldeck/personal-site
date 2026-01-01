import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { getProjectsByType, getProjectById, getTypeLabel, type Project, type ProjectType } from "../data/projects";
import ProjectDetail from "./ProjectDetail";
import HexagramGlyph from "./HexagramGlyph";
import { getDailyHexagram } from "../data/hexagrams";

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
    onSelectProject: (id: string) => void; // Added prop
}

const TYPE_ORDER: ProjectType[] = ["PLATFORM", "WRITING", "WORK"];

export default function ViewportPanel({
    mode,
    selectedProjectId,
    onModeChange,
    onClearSelection,
    onSelectProject, // Destructure
}: ViewportPanelProps) {

    const hexagram = getDailyHexagram() || { number: 0, name: "Unknown", summary: "", lines: [0, 0, 0, 0, 0, 0] };

    const selectedProject = selectedProjectId ? getProjectById(selectedProjectId) : null;
    const groupedProjects = useMemo(() => getProjectsByType(), []);

    // -- STATE A: BIO --
    const renderBio = () => (
        <div className="w-full max-w-xl animate-fade-in text-left flex flex-col gap-4 md:gap-0">


            <div className="font-serif text-xl md:text-2xl leading-relaxed text-text-primary mb-6">
                <p className="mb-6">
                    Felipe Waldeck is a researcher and writer working on the cultural and political consequences of contemporary technical systems.
                </p>
                <p className="mb-6">
                    He is the co-founder of <a href="https://mare.run" target="_blank" rel="noreferrer" className="text-text-primary underline decoration-pink-500/50 hover:decoration-pink-500 hover:text-pink transition-all">MARE</a>,
                    a platform for exploring and organising fragmented media archives.
                </p>
                <p className="mb-6">
                    His work combines critical theory, archival research, and experimental systems design.
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

    // -- STATE B: PROJECT DETAIL --
    // Rendered when a project is selected
    const renderProjectDetail = () => {
        if (!selectedProject) return null;
        // Check if ProjectDetail component exists/is imported, otherwise inline
        // Assuming it's imported as 'ProjectDetail' from earlier context
        return (
            <div className="pl-12 border-l border-border-subtle animate-fade-in custom-scrollbar">
                <ProjectDetail
                    project={selectedProject}
                    accentColor="var(--text-primary)"
                    onBack={onClearSelection}
                />
            </div>
        );
    };

    // -- STATE C: ARCHIVE INDEX --
    const renderArchiveIndex = () => (
        <div className="w-full max-w-xl animate-fade-in pb-24 md:pl-12">

            {TYPE_ORDER.map((type) => {
                const typeProjects = groupedProjects[type];
                if (typeProjects.length === 0) return null;

                return (
                    <section key={type} className="mb-12">
                        <h3 className="font-utility text-sm tracking-widest uppercase text-green mb-6 border-b border-border-subtle/30 pb-2">
                            {getTypeLabel(type)}
                        </h3>

                        <div className="space-y-6">
                            {typeProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className={`group cursor-pointer transition-all duration-300 hover:pl-2`}
                                    onClick={() => onSelectProject(project.id)}
                                >
                                    <div className="flex flex-col mb-1">
                                        <h4 className="font-serif text-2xl text-text-primary group-hover:text-pink transition-colors">
                                            {project.title}
                                        </h4>
                                        <span className="font-utility text-sm text-text-primary opacity-50 uppercase tracking-wider">
                                            {project.subtype} {project.date && `— ${project.date}`}
                                        </span>
                                    </div>
                                    {/* Description removed for less verbosity */}
                                </div>
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );



    // -- CONTENT RENDERER --
    // Locked to Archive Index (Menu) when in ARCHIVE mode.
    // Selection updates the FieldPanel (Left) instead of drilling down here.
    const renderContent = () => {
        if (mode === "BIO") return renderBio();
        return renderArchiveIndex();
    };

    return (
        <div className="relative w-full h-full flex flex-col overflow-hidden bg-bg-primary">

            {/* Mobile Header (Hidden on Desktop) */}
            <div className="md:hidden flex flex-col items-center px-8 pt-20 mb-0 relative z-20 text-center">
                <Link
                    to="/"
                    className="font-serif text-pink tracking-tight hover:opacity-80 transition-opacity leading-none mb-6"
                    style={{ fontSize: "48px" }}
                >
                    Felipe Waldeck
                </Link>

                {/* Mobile Hexagram Info (Restored here, Side-by-Side) */}
                {mode === "BIO" && (
                    <div className="w-full max-w-xl flex flex-row items-center justify-center gap-4 text-left border border-green p-4 mb-6">
                        <div className="w-24 shrink-0 text-green opacity-90">
                            <HexagramGlyph variant="solid" className="w-full h-auto" />
                        </div>
                        <div className="flex-1">
                            <span className="font-serif text-3xl text-green block leading-none mb-2">
                                {hexagram.number}. {hexagram.name}
                            </span>
                            <p className="font-utility text-xs text-text-primary opacity-80 leading-relaxed">
                                {hexagram.summary}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Top Right External Nav - Rigid Alignment (Desktop Only) */}
            <div className="hidden md:flex absolute top-12 right-12 z-20 pointer-events-auto gap-8">
                <Link to="/cv" className="font-utility text-xs uppercase tracking-widest text-text-primary hover:text-pink transition-colors">
                    CV
                </Link>
                <Link to="/reading" className="font-utility text-xs uppercase tracking-widest text-text-primary hover:text-pink transition-colors">
                    Reading
                </Link>
            </div>

            {/* Scrollable Content Area - Center Alignment for Bio */}
            <div className={`flex-1 overflow-y-auto px-12 md:px-24 pb-12 md:pb-32 flex flex-col ${mode === "BIO" ? "justify-center items-center pt-0" : "pt-8 md:pt-48 justify-start"}`}>
                {/* 
                   Mode: BIO -> Centered (Museum Wall Label style)
                   Mode: ARCHIVE/PROJECT -> Top Aligned (List/Detail)
               */}
                {renderContent()}
            </div>
        </div>
    );
}
