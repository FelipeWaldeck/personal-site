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
    summary: "Writer and researcher passionate about understanding how people shape, experience, and sustain public spaces. Through research, storytelling, and engagement, I translate complex urban insights into compelling reports, presentations, and initiatives that connect policy, culture, and community needs. With experience in placemaking, public space analysis, and community-driven projects, I enjoy working across disciplines to bring ideas into action and foster meaningful connections between people and places.",
    education: [
        {
            institution: "Yale-NUS College",
            degree: "Bachelor of Arts in Environmental Studies",
            date: "Aug 2020 - May 2024",
            details: [
                "Major GPA: 4.57/5.0, Cumulative GPA: 4.37/5.0. Focused on human-environment interactions through lab work and ecology courses, gaining interdisciplinary insights in architecture and art history to enhance innovative problem-solving approaches."
            ]
        },
        {
            institution: "NUS Department of Architecture",
            degree: "Certificate in Design Thinking",
            date: "Design Summer Camp, Jul 2022",
            details: [
                "Completed a 3-week program on architectural ideation, planning, and modeling for sustainable urbanism."
            ]
        },
        {
            institution: "Yale University",
            degree: "Semester Abroad",
            date: "Jan 2023 - Jun 2023",
            details: [
                "Engaged in graduate-level coursework early in undergraduate studies, focusing on sustainability topics, including Urban Food Systems, Sustainable Development Goals, and Land Use."
            ]
        }
    ],
    experience: [
        {
            role: "Research Assistant",
            company: "Lee Kuan Yew Centre for Innovative Cities",
            date: "August 2024 - Present",
            details: [
                "Managed and contributed to 5 major major reports and literature reviews on public space, placemaking, and built environments, providing insights shaping strategic discussions.",
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
        },
        {
            role: "Team Member",
            company: "On-Hand Agrarian",
            date: "Nov 2021 - Jan 2022",
            details: [
                "Supported development of three urban farms in Singapore, coordinated logistics for 60+ weekly customers.",
                "Conducted educational tours of mangroves, engaging the public in local ecosystem awareness and sustainable food practices."
            ]
        },
        {
            role: "Microbiologist Assistant",
            company: "Yale-NUS College",
            date: "Jan 2022 - May 2022",
            details: [
                "Organized a research project analyzing 451 shark fin samples, coordinating large-scale DNA gathering, processing, and barcoding."
            ]
        }
    ],
    skills: [
        {
            category: "Project & Stakeholder Management",
            items: "Coordinating research projects, working with policymakers and cultural institutions."
        },
        {
            category: "Public Engagement & Communication",
            items: "Presenting research, engaging communities, and translating findings into reports."
        },
        {
            category: "Data Visualization & GIS",
            items: "Mapping public space usage, analyzing demographic and spatial trends."
        },
        {
            category: "Survey & Qualitative Analysis",
            items: "Conducting interviews, synthesizing insights, and structuring key takeaways."
        },
        {
            category: "Technical Skills",
            items: "Adobe Suite (Photoshop, Illustrator), QGIS, Microsoft Office, Figma (Learning), Python (Learning)"
        },
        {
            category: "Languages",
            items: "Spanish (Proficient), French (Writing), Portuguese (Understanding), German (Understanding), Chinese (Learning)"
        }
    ]
};
