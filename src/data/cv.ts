export interface Education {
    institution: string;
    degree: string;
    date: string;
    details: string[];
}

export interface Experience {
    role: string;
    company: string;
    date: string;
    details: string[];
}

export interface SkillCategory {
    category: string;
    items: string;
}

export interface CVData {
    summary: string;
    education: Education[];
    experience: Experience[];
    skills: SkillCategory[];
}

export const cvData: CVData = {
    summary: "Researcher and writer interested in connection and the making of culture in a computational age. Most of what I do is writing: essays on how technical systems reshape attention, interiority, and the ways people make sense of one another. That question led me into building: I co-founded MARE and fell for making software.",
    education: [
        {
            institution: "The New Centre for Research & Practice",
            degree: "Information Architecture",
            date: "2026 - Present",
            details: [
                "Ongoing coursework in information architecture and contemporary theory."
            ]
        },
        {
            institution: "Yale-NUS College",
            degree: "Bachelor of Arts in Environmental Studies",
            date: "Aug 2020 - May 2024",
            details: [
                "Major GPA: 4.57/5.0, Cumulative GPA: 4.37/5.0. Focused on human-environment interactions through lab work and ecology courses, gaining interdisciplinary insights in architecture and art history to enhance innovative problem-solving approaches."
            ]
        },
        {
            institution: "Yale University",
            degree: "Semester Abroad",
            date: "Jan 2023 - Jun 2023",
            details: [
                "Engaged in graduate-level coursework early in undergraduate studies, focusing on sustainability topics, including Urban Food Systems, Sustainable Development Goals, and Land Use."
            ]
        },
        {
            institution: "NUS Department of Architecture",
            degree: "Certificate in Design Thinking",
            date: "Design Summer Camp, Jul 2022",
            details: [
                "Completed a 3-week program on architectural ideation, planning, and modeling for sustainable urbanism."
            ]
        }
    ],
    experience: [
        {
            role: "Co-founder",
            company: "MARE",
            date: "2025 - Present",
            details: [
                "Co-founded MARE and took it from concept to public beta, defining the research thesis behind a media-agnostic platform for reading and curating media at scale.",
                "Interviewed 200+ creatives to ground the product in real workflows, translating the findings into its core features and direction.",
                "Designed and shipped the interface and curation tools end to end, growing to a user base of 500 across a three-month public beta.",
                "Established the editorial voice and authored its essays, building a readership through the publication and its Substack."
            ]
        },
        {
            role: "Research Assistant",
            company: "Lee Kuan Yew Centre for Innovative Cities",
            date: "August 2024 - Present",
            details: [
                "Managed and contributed to 5 major reports and literature reviews on public space, placemaking, and built environments, providing insights shaping strategic discussions.",
                "Collaborated with interdisciplinary teams to explore demographic shifts, public space use, and cultural preservation strategies.",
                "Developed reports and presentations tailored for policymakers, cultural institutions, and urban planners, ensuring research was accessible and actionable.",
                "Coordinated with government agencies, researchers, and public space advocates, aligning findings with broader urban and cultural strategies."
            ]
        },
        {
            role: "Researcher",
            company: "Appetite SG/Nouri",
            date: "Jun 2023 - Dec 2023",
            details: [
                "Compiled history, recipes, and techniques of food pathways into a 10,000-word document over two months.",
                "Contextualized and presented archaeology research at a food conference in October 2023.",
                "Collaborated with chefs to integrate historical recipes and techniques into a Michelin-star menu."
            ]
        },
        {
            role: "Urban Agriculture Researcher",
            company: "Yale-NUS College",
            date: "May 2021 - Aug 2021",
            details: [
                "Conducted a 3-month research project on urban foodscapes in Singapore, interviewing 20+ farmers and business owners.",
                "Identified sustainable agricultural practices suited to high-density urban areas.",
                "Produced a 7,500-word report analyzing successful models, presented at the Summer Research Symposium."
            ]
        }
    ],
    skills: [
        {
            category: "Research & Synthesis",
            items: "Qualitative and user research, interviews, literature reviews, and turning findings into product and editorial direction."
        },
        {
            category: "Writing & Editorial",
            items: "Long-form essays and criticism, editorial direction, and clear writing on technical and cultural subjects."
        },
        {
            category: "Design & Product",
            items: "Interface design, design systems, and product direction."
        },
        {
            category: "Software & Creative Tech",
            items: "Frontend development, AI and LLM-based tools, and motion graphics."
        },
        {
            category: "Tools",
            items: "React, TypeScript, Python, Figma, Adobe Suite, Remotion, Git."
        },
        {
            category: "Languages",
            items: "Spanish (Proficient), French (Writing), Portuguese (Understanding), German (Understanding), Chinese (Learning)"
        }
    ]
};
