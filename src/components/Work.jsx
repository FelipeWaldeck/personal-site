import React, { useState } from "react";
import workData from "../data/workData.json";

export default function Work() {
  const [currentWork, setCurrentWork] = useState(workData.data[0].name);

  return (
    <div className="flex flex-wrap justify-center items-center">
      {/* Project titles - clickable list */}
      <div className="pb-8 px-5 flex flex-wrap justify-center items-center">
        {workData.data.map((work, key) => (
          <h3
            key={key}
            className="cursor-pointer px-5 py-1 text-lg"
            style={{
              color:
                work.name === currentWork
                  ? "var(--text-primary)"
                  : "var(--text-muted)",
            }}
            onClick={() => setCurrentWork(work.name)}
          >
            {work.name}
          </h3>
        ))}
      </div>

      {/* Selected project display */}
      {workData.data
        .filter((work) => work.name === currentWork)
        .map((work, key) => (
          <div key={key} className="flex justify-center items-center flex-col">
            <a
              className="flex justify-center items-center flex-col"
              href={work.externalLink}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={work.media[0].link}
                alt={work.name}
                className="work-img"
              ></img>
            </a>
            <div className="px-12 md:px-24 py-8 text-center">
              <p style={{ color: "var(--text-secondary)" }}>
                <span className="font-bold" style={{ color: "var(--text-primary)" }}>Type:</span>{" "}
                {work.technology}
              </p>
              <p className="pt-4 text-left" style={{ color: "var(--text-secondary)" }}>
                {work.description[0].text}
                {work.externalLink && (
                  <>
                    {" "}
                    <a
                      className="font-bold underline underline-offset-4"
                      href={work.externalLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "var(--accent-green)" }}
                    >
                      Read
                    </a>
                  </>
                )}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
