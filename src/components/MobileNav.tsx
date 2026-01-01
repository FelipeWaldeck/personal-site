import React from "react";
import { Link } from "react-router-dom";

interface MobileNavProps {
    activeTab?: "ARCHIVE" | "CV" | "READING";
    onArchiveClick?: () => void;
}

export default function MobileNav({ activeTab, onArchiveClick }: MobileNavProps) {
    return (
        <div className="fixed bottom-0 left-0 w-full md:hidden bg-bg-primary border-t border-border-subtle z-50 animate-fade-in flex print:hidden">
            {/* Archive (Home) */}
            {onArchiveClick ? (
                <button
                    onClick={onArchiveClick}
                    className={`flex-1 py-6 text-center font-utility text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${activeTab === "ARCHIVE" ? "text-pink bg-pink/5" : "text-text-primary opacity-50 hover:opacity-100"
                        }`}
                >
                    Archive
                </button>
            ) : (
                <Link
                    to="/"
                    className={`flex-1 py-6 text-center font-utility text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${activeTab === "ARCHIVE" ? "text-pink bg-pink/5" : "text-text-primary opacity-50 hover:opacity-100"
                        }`}
                >
                    Archive
                </Link>
            )}

            {/* CV */}
            <Link
                to="/cv"
                className={`flex-1 py-6 text-center font-utility text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${activeTab === "CV" ? "text-pink bg-pink/5" : "text-text-primary opacity-50 hover:opacity-100"
                    }`}
            >
                CV
            </Link>

            {/* Reading */}
            <Link
                to="/reading"
                className={`flex-1 py-6 text-center font-utility text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${activeTab === "READING" ? "text-pink bg-pink/5" : "text-text-primary opacity-50 hover:opacity-100"
                    }`}
            >
                Reading
            </Link>
        </div>
    );
}
