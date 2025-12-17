/**
 * Projects data with TypeScript types
 * Archival Workspace Edition
 */

export type ProjectType = "ESSAY" | "PUBLICATION" | "ESSAY_SERIES" | "PROJECT";

export interface Project {
    id: string;
    title: string;
    type: ProjectType;
    description: string;
    href?: string;
    tags?: string[];
    date?: string;
}

export const projects: Project[] = [
    // Core Works (The Constellation)
    {
        id: "mare-interiority",
        title: "MARE: Conditions of Interiority",
        type: "ESSAY_SERIES",
        description: "A series examining the erosion of interiority under cybernetics, prediction, and computational subjecthood.",
        href: "https://substack.com/@maredotrun",
        tags: ["philosophy", "technology"],
        date: "2024",
    },
    {
        id: "rail-infrastructure",
        title: "Adaptive Reuse of Rail Infrastructure",
        type: "PUBLICATION",
        description: "Policy and design playbook on repurposing disused rail corridors for public space and urban life.",
        href: "https://link-to-book.com",
        tags: ["urbanism", "policy"],
        date: "2023",
    },
    {
        id: "long-peace",
        title: "Long Peace & Ant War",
        type: "ESSAY",
        description: "Political reflection on stability, conflict, and asymmetry in the contemporary global order.",
        href: "https://substack.com/@felipewaldeck",
        tags: ["politics", "history"],
        date: "2025",
    },
    {
        id: "digital-gardens",
        title: "Gardens of Forking Paths",
        type: "ESSAY",
        description: "On the non-linear structure of memory and the archival capacity of digital spaces.",
        href: "https://substack.com",
        tags: ["archival", "memory"],
        date: "2024",
    },
    {
        id: "noise-signal",
        title: "Signal in the Noise",
        type: "PROJECT",
        description: "Visualizing information density in high-frequency trading algorithms.",
        href: "#",
        tags: ["visualization", "data"],
        date: "2023",
    },
    {
        id: "concrete-dreams",
        title: "Concrete Dreams",
        type: "ESSAY_SERIES",
        description: "Architectural criticism of brutalist social housing in Latin America.",
        href: "#",
        tags: ["architecture", "criticism"],
        date: "2022",
    }
];

// Curated list for the Field Panel (IDs)
export const CURATED_PROJECT_IDS = [
    "mare-interiority",
    "rail-infrastructure",
    "long-peace",
    "digital-gardens",
    "noise-signal",
    "concrete-dreams"
];

export function getProjectById(id: string): Project | undefined {
    return projects.find((p) => p.id === id);
}

export function getProjectsByType(): Record<ProjectType, Project[]> {
    const grouped: Record<ProjectType, Project[]> = {
        ESSAY_SERIES: [],
        PUBLICATION: [],
        ESSAY: [],
        PROJECT: [],
    };
    projects.forEach((p) => grouped[p.type].push(p));
    return grouped;
}

export function getTypeLabel(type: ProjectType): string {
    switch (type) {
        case "ESSAY_SERIES": return "Essay Series";
        case "PUBLICATION": return "Publication";
        case "ESSAY": return "Essay";
        case "PROJECT": return "Project";
    }
}
