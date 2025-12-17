import React from "react";

export default function About() {
  return (
    <div className="flex justify-left items-left flex-col px-8">
      <div className="w-5/6 md:w-3/4 pb-4">
        <p className="pt-8" style={{ color: "var(--text-secondary)" }}>
          Felipe Waldeck is a researcher, writer, and a co-founder of MARE,
          a media-agnostic research platform for organising and navigating large, heterogeneous archives.
          Through MARE, he works on the design of computational tools and workflows that support research, cultural
          analysis, and creative inquiry across disciplines.
        </p>
        <p className="pt-4 pb-2" style={{ color: "var(--text-secondary)" }}>
          Previously, Felipe has worked on academic and policy-oriented research in urban studies, with a focus on public space,
          infrastructure, and adolescent wellbeing.
          He is the co-author of Adaptive Reuse of Abandoned Rail Infrastructure,
          a playbook examining the transformation of disused rail corridors into
          public and civic spaces. Alongside institutional research, he writes essays on technology,
          subjectivity, and contemporary political conditions.
        </p>
        <div className="pt-4">
          <a
            href="mailto:felipe@example.com"
            target="_blank"
            rel="noreferrer"
            className="pr-4 underline underline-offset-4"
            style={{ color: "var(--text-primary)" }}
          >
            Email
          </a>
          <a
            href="https://substack.com/@felipewaldeck"
            target="_blank"
            rel="noreferrer"
            className="pr-4 underline underline-offset-4"
            style={{ color: "var(--text-primary)" }}
          >
            Substack
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="pr-4 underline underline-offset-4"
            style={{ color: "var(--text-primary)" }}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
