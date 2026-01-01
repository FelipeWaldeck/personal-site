import React, { useState } from "react";
import FieldPanel from "../components/FieldPanel";
import ViewportPanel, { type ViewportMode } from "../components/ViewportPanel";
import MobileNav from "../components/MobileNav";

/**
 * Home - Archival Workspace
 * 
 * Layout:
 * - Desktop: Split Screen (Field | Viewport)
 * - Mobile: Toggle Mode (Field <-> Viewport) via Bottom Nav
 * 
 * State:
 * - viewportMode: "BIO" | "ARCHIVE"
 * - selectedProjectId: string | null
 * - mobileView: "FIELD" | "VIEWPORT" (Mobile only)
 */

type MobileView = "FIELD" | "VIEWPORT";

export default function Home() {
    const [viewportMode, setViewportMode] = useState<ViewportMode>("BIO");
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [mobileView, setMobileView] = useState<MobileView>("VIEWPORT"); // Default to Index/Bio on mobile

    // Handle project selection from Field
    const handleProjectSelect = (projectId: string) => {
        setSelectedProjectId(projectId);
        // On mobile, if selecting from Index, switch to Map (Field) to see preview
        setMobileView("FIELD");
    };

    // Handle mode change (BIO <-> ARCHIVE)
    const handleModeChange = (mode: ViewportMode) => {
        setViewportMode(mode);
        if (mode === "ARCHIVE" || mode === "BIO") {
            setSelectedProjectId(null);
        }
        // If opening archive, switch to Index view on mobile
        if (mode === "ARCHIVE") {
            setMobileView("VIEWPORT");
        }
    };

    // Clear selection
    const handleClearSelection = () => {
        setSelectedProjectId(null);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-bg-primary overflow-hidden">
            {/* Left: Field Panel (Spatial Index / Map) */}
            {/* Mobile: Visible only if mobileView === 'FIELD' */}
            {/* Desktop: Always visible (w-1/2) */}
            <div className={`${mobileView === "FIELD" ? "block" : "hidden"} md:block w-full md:w-1/2 h-screen relative md:border-r border-border-subtle`}>
                <FieldPanel
                    selectedProjectId={selectedProjectId}
                    onOpenArchive={() => handleModeChange("ARCHIVE")}
                    mode={viewportMode}
                    onSelectProject={handleProjectSelect}
                    onModeChange={handleModeChange}
                />
            </div>

            {/* Right: Viewport Panel (Reading Surface / Index) */}
            {/* Mobile: Visible only if mobileView === 'VIEWPORT' */}
            {/* Desktop: Always visible (w-1/2) */}
            <div className={`${mobileView === "VIEWPORT" ? "block" : "hidden"} md:block w-full md:w-1/2 h-screen relative`}>
                <ViewportPanel
                    mode={viewportMode}
                    selectedProjectId={selectedProjectId}
                    onModeChange={handleModeChange}
                    onClearSelection={handleClearSelection}
                    onSelectProject={handleProjectSelect}
                />
            </div>

            {/* Mobile Navigation (Bottom) */}
            <MobileNav activeTab="ARCHIVE" onArchiveClick={() => setMobileView("VIEWPORT")} />
        </div>
    );
}
