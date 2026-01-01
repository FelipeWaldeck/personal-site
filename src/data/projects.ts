/**
 * Projects data with TypeScript types
 * Archival Workspace Edition
 */

export type ProjectType = "PLATFORM" | "WRITING" | "WORK";

export interface Project {
    id: string;
    title: string;
    type: ProjectType; // Broad Category for grouping
    subtype: string;   // "Platform", "Foundational Text", "Essay", etc.
    description: string;
    longDescription?: string; // Added for MARE platform
    href?: string;
    tags?: string[];
    date?: string;
    image?: string;
};

export const projects: Project[] = [
    // --- PLATFORM ---
    {
        id: "mare-platform",
        title: "MARE",
        type: "PLATFORM",
        subtype: "Platform",
        description: "A media-agnostic research platform foregrounding semantic proximity and relational association.",
        longDescription: "MARE is a media-agnostic research platform concerned with how humans and machines make sense of large volumes of media under contemporary computational conditions. Rather than organising material through recommendation or optimisation, MARE foregrounds semantic proximity, mood, and relational association as navigational primitives.\n\nThe platform operates as a field lab between human and machine sense-making, combining technical infrastructure with theoretical inquiry into cognition, interiority, and archival form. MARE is developed as both a working tool and an ongoing research project.",
        href: "https://mare.run",
        date: "2025-",
        image: "/assets/mare-preview.png",
    },
    {
        id: "mare-condition",
        title: "MARE: The Condition",
        type: "PLATFORM",
        subtype: "Foundational Text",
        description: "A framing text outlining the conceptual conditions that motivate MARE.",
        longDescription: "A framing text outlining the conceptual conditions that motivate MARE. Addresses media abundance, fragmentation, and the limits of optimisation-driven sense-making, and establishes the platform’s orientation toward exploratory, non-instrumental navigation.\n\nThe text absorbs the role of a manifesto without being named as one.",
        href: "https://maredotrun.substack.com/p/mare-the-condition",
        date: "2025",
    },

    // --- WRITING ---
    {
        id: "conditions-interiority",
        title: "Conditions of Interiority (1/3)",
        type: "WRITING",
        subtype: "Essay",
        description: "The first entry in a triptych examining AI, creativity, and the subject, focusing on the historical role of interiority in grounding thought and agency.",
        href: "https://maredotrun.substack.com/p/conditions-of-interiority-13",
        date: "2025",
        image: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fccffd1ba-68bd-448d-b880-23d57ee6d63a_1080x888.jpeg",
    },
    {
        id: "cybernetic-subject",
        title: "The Cybernetic Subject (2/3)",
        type: "WRITING",
        subtype: "Essay",
        description: "An analysis of interiority, cognition, and cultural production under cybernetic conditions, tracing how feedback, prediction, and computation reshape the subject.",
        href: "https://maredotrun.substack.com/p/the-cybernetic-subject-23",
        date: "2025",
        image: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff5b67bff-81f1-4608-8d55-a984f64cc238_1600x908.jpeg",
    },
    {
        id: "predictionism",
        title: "Predictionism and the Cybernetic Subject",
        type: "WRITING",
        subtype: "Essay",
        description: "A reply to Alex Danco’s A16Z newsletter, examining prediction, delegation, and the transformation of agency under contemporary technical systems.",
        href: "https://maredotrun.substack.com/p/predictionism-and-the-cybernetic",
        date: "2025",
    },

    // --- WORK ---
    {
        id: "rail-reuse",
        title: "Adaptive Reuse of Rail Infrastructure",
        type: "WORK",
        subtype: "Official Work",
        description: "An applied research and policy framework addressing the reuse of disused rail corridors as public space.",
        longDescription: "An applied research and policy framework addressing the reuse of disused rail corridors as public space, developed through case analysis and planning research.",
        href: "https://lkycic.sutd.edu.sg/publications/adaptive-reuse-of-abandoned-rail-infrastructure-playbook/",
        date: "2025",
        image: "/assets/rail-reuse.png",
    }
];

export const CURATED_PROJECT_IDS = projects.map(p => p.id);

export function getProjectById(id: string): Project | undefined {
    return projects.find((p) => p.id === id);
}

export function getProjectsByType(): Record<ProjectType, Project[]> {
    const grouped: Record<ProjectType, Project[]> = {
        PLATFORM: [],
        WRITING: [],
        WORK: [],
    };
    projects.forEach((p) => grouped[p.type].push(p));
    return grouped;
}

export function getTypeLabel(type: ProjectType): string {
    switch (type) {
        case "PLATFORM": return "Platform";
        case "WRITING": return "Writing";
        case "WORK": return "Work (Official / Institutional)";
    }
}
