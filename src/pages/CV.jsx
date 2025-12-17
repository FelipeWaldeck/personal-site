import React from "react";
import { Link } from "react-router-dom";
import cvData from "../data/cv.json";

export default function CV() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen py-8 print:py-4" style={{ backgroundColor: "var(--bg-primary)" }}>
            {/* Site mark */}
            <Link to="/" className="site-mark print:hidden">Felipe Waldeck</Link>

            {/* Title */}
            <div className="px-8 md:px-32 pt-12">
                <h1 className="text-3xl md:text-5xl text-center pt-4 print:text-3xl print:pt-2" style={{ color: "var(--text-primary)" }}>
                    Curriculum Vitae
                </h1>
                <div className="text-center pt-4 print:hidden">
                    <button
                        onClick={handlePrint}
                        className="underline underline-offset-4 text-lg"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Print / Save as PDF
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex justify-center pt-8">
                <div className="w-5/6 md:w-3/4 print:w-full">
                    {/* Summary */}
                    {cvData.summary && (
                        <section className="pb-8 print:pb-4">
                            <h2 className="font-bold text-xl pb-2" style={{ color: "var(--text-primary)" }}>About</h2>
                            <p style={{ color: "var(--text-secondary)" }}>{cvData.summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {cvData.experience && cvData.experience.length > 0 && (
                        <section className="pb-8 print:pb-4">
                            <h2 className="font-bold text-xl pb-4" style={{ color: "var(--text-primary)" }}>Experience</h2>
                            <div className="space-y-6 print:space-y-3">
                                {cvData.experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex flex-wrap justify-between items-baseline gap-2">
                                            <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>{exp.title}</h3>
                                            <span
                                                className="text-sm"
                                                style={{
                                                    fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                                                    color: "var(--text-muted)",
                                                }}
                                            >
                                                {exp.period}
                                            </span>
                                        </div>
                                        <p style={{ color: "var(--text-secondary)" }}>
                                            {exp.company}
                                            {exp.location && ` · ${exp.location}`}
                                        </p>
                                        {exp.bullets && (
                                            <ul className="pt-2 space-y-1">
                                                {exp.bullets.map((bullet, i) => (
                                                    <li key={i} className="pl-4" style={{ color: "var(--text-secondary)" }}>
                                                        – {bullet}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {cvData.education && cvData.education.length > 0 && (
                        <section className="pb-8 print:pb-4">
                            <h2 className="font-bold text-xl pb-4" style={{ color: "var(--text-primary)" }}>Education</h2>
                            <div className="space-y-4 print:space-y-2">
                                {cvData.education.map((edu, index) => (
                                    <div key={index}>
                                        <div className="flex flex-wrap justify-between items-baseline gap-2">
                                            <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>{edu.degree}</h3>
                                            <span
                                                className="text-sm"
                                                style={{
                                                    fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                                                    color: "var(--text-muted)",
                                                }}
                                            >
                                                {edu.period}
                                            </span>
                                        </div>
                                        <p style={{ color: "var(--text-secondary)" }}>
                                            {edu.institution}
                                            {edu.location && ` · ${edu.location}`}
                                        </p>
                                        {edu.notes && (
                                            <p className="pt-1 italic text-sm" style={{ color: "var(--text-muted)" }}>
                                                {edu.notes}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {cvData.projects && cvData.projects.length > 0 && (
                        <section className="pb-8 print:pb-4">
                            <h2 className="font-bold text-xl pb-4" style={{ color: "var(--text-primary)" }}>Projects</h2>
                            <div className="space-y-4 print:space-y-2">
                                {cvData.projects.map((project, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>{project.name}</h3>
                                        <p style={{ color: "var(--text-secondary)" }}>{project.description}</p>
                                        {project.technologies && (
                                            <p
                                                className="pt-1 text-sm"
                                                style={{
                                                    fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                                                    color: "var(--text-muted)",
                                                }}
                                            >
                                                {project.technologies.join(" · ")}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Writing / Talks */}
                    {cvData.writing && cvData.writing.length > 0 && (
                        <section className="pb-8 print:pb-4">
                            <h2 className="font-bold text-xl pb-4" style={{ color: "var(--text-primary)" }}>Writing & Talks</h2>
                            <div className="space-y-2">
                                {cvData.writing.map((item, index) => (
                                    <p key={index}>
                                        <span className="font-bold" style={{ color: "var(--text-primary)" }}>{item.title}</span>
                                        <span style={{ color: "var(--text-secondary)" }}>
                                            {" "} — {item.venue}
                                            {item.type && (
                                                <span
                                                    className="text-sm"
                                                    style={{ fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace" }}
                                                >
                                                    {" "}({item.type})
                                                </span>
                                            )}
                                        </span>
                                    </p>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Links */}
                    {cvData.links && cvData.links.length > 0 && (
                        <section className="pb-16 print:pb-8">
                            <h2 className="font-bold text-xl pb-4" style={{ color: "var(--text-primary)" }}>Links</h2>
                            <div className="flex flex-wrap gap-4">
                                {cvData.links.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-bold underline underline-offset-4"
                                        style={{ color: "var(--accent-green)" }}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
