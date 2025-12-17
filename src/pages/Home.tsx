import React, { useState } from "react";
import FieldPanel from "../components/FieldPanel";
import ViewportPanel, { type ViewportMode } from "../components/ViewportPanel";

/**
 * Home - Archival Workspace
 * 
 * Layout:
 * - Left: FieldPanel (Spatial Index) - Fixed, non-scrolling
 * - Right: ViewportPanel (Reading Surface) - Scrolling
 * 
 * State:
 * - viewportMode: "BIO" | "ARCHIVE"
 * - selectedProjectId: string | null
 */

export default function Home() {
    const [viewportMode, setViewportMode] = useState<ViewportMode>("BIO");
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

    // Handle project selection from Field
    const handleProjectSelect = (projectId: string) => {
        setSelectedProjectId(projectId);
        // Note: We don't change viewportMode to "PROJECT" explicitly
        // The presence of selectedProjectId overrides the view in ViewportPanel
    };

    // Handle mode change (BIO <-> ARCHIVE)
    const handleModeChange = (mode: ViewportMode) => {
        setViewportMode(mode);
        if (mode === "ARCHIVE" || mode === "BIO") {
            setSelectedProjectId(null); // Clear selection when switching main modes
        }
    };

    // Clear selection (return to previous mode, or just clear detail)
    const handleClearSelection = () => {
        setSelectedProjectId(null);
    };

    // Dim Field when in ARCHIVE mode or reading a project
    // "Focus" moves to the right panel
    const fieldDimmed = viewportMode === "ARCHIVE" || selectedProjectId !== null;

    return (
        <div className="min-h-screen flex bg-bg-primary overflow-hidden">
            {/* Left: Field Panel (Spatial Index) */}
            <div className="hidden md:block w-1/2 h-screen relative border-r border-border-subtle">
                <FieldPanel
                    selectedProjectId={selectedProjectId}
                    onOpenArchive={() => handleModeChange("ARCHIVE")}
                />
            </div>

            {/* Right: Viewport Panel (Reading Surface) */}
            {/* On mobile, this takes full width. On desktop, it's the right half. */}
            {/* TODO: Mobile layout strategy is simple stacking for now, but design spec focused on dual stela */}
            <div className="w-full md:w-1/2 h-screen relative">
                <ViewportPanel
                    mode={viewportMode}
                    selectedProjectId={selectedProjectId}
                    onModeChange={handleModeChange}
                    onClearSelection={handleClearSelection}
                />
            </div>
        </div>
    );
}
