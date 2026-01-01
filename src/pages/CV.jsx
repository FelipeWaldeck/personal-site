import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cvData } from '../data/cv';
import MobileNav from '../components/MobileNav';

export default function CV() {
  // Add print class to body when mounting this page to ensure overrides work if needed
  // (though media query works globally, this is safe)
  useEffect(() => {
    document.body.classList.add('cv-page');
    return () => document.body.classList.remove('cv-page');
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-8 md:py-24 print:py-0 bg-bg-primary text-text-primary print:bg-white print:text-black">
      <style>{`
                @media print {
                    @page {
                        margin: 1.5cm;
                        size: auto; 
                    }
                    body {
                        margin: 0;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    /* Hide browser default headers/footers by clearing page margin content if supported, 
                       but standard @page margin usually suffices to let us control our own. 
                       However, removing them entirely often requires user browser settings. 
                       We can try to minimize impact. */
                }
            `}</style>

      {/* Header / Nav - Print Hidden */}
      {/* Mobile: Relative flow. Desktop: Fixed top-left. */}
      <div className="relative mb-8 px-8 md:px-0 pt-12 md:fixed md:top-12 md:left-12 md:m-0 md:p-0 z-50 print:hidden text-center md:text-left">
        <Link
          to="/"
          className="font-serif text-pink tracking-tight hover:opacity-80 transition-opacity leading-none"
          style={{ fontSize: '48px' }}
        >
          Felipe Waldeck
        </Link>
      </div>

      <div className="fixed top-12 right-12 z-50 print:hidden pointer-events-auto hidden md:block">
        <button
          onClick={handlePrint}
          className="font-utility text-[10px] uppercase tracking-widest text-green border border-green/30 px-4 py-2 hover:bg-green hover:text-bg-primary transition-all"
        >
          Print / Save PDF
        </button>
      </div>

      {/* Resume Container */}
      <div className="max-w-3xl mx-auto px-8 print:px-0 print:max-w-none print:pb-0 pb-32">
        {/* Header (Print Only Name) */}
        <div className="hidden print:flex flex-row justify-between items-end mb-4 border-b border-black pb-2">
          <h1 className="text-2xl font-bold uppercase tracking-widest leading-none">
            Felipe Waldeck
          </h1>
          <p className="text-[10px] text-gray-600 leading-none">
            felipewaldeck.com
          </p>
        </div>

        {/* Summary */}
        <section className="mb-12 print:mb-3">
          <h2 className="font-utility text-xs uppercase tracking-[0.2em] text-green mb-6 print:mb-1 print:text-black print:text-[9px] print:font-bold border-b border-white/10 print:border-gray-200 pb-0.5">
            Summary
          </h2>
          <p className="font-serif text-base md:text-lg leading-relaxed opacity-90 print:text-[10px] print:leading-snug print:opacity-100 text-justify">
            {cvData.summary}
          </p>
        </section>

        {/* Education */}
        <section className="mb-12 print:mb-3">
          <h2 className="font-utility text-xs uppercase tracking-[0.2em] text-green mb-6 print:mb-1 print:text-black print:text-[9px] print:font-bold border-b border-white/10 print:border-gray-200 pb-0.5">
            Education
          </h2>
          <div className="space-y-8 print:space-y-2">
            {cvData.education.map((edu, index) => (
              <div key={index} className="break-inside-avoid">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-0">
                  <h3 className="font-serif text-xl text-pink print:text-black print:text-[11px] font-bold">
                    {edu.institution}
                  </h3>
                  <span className="font-utility text-xs opacity-60 print:text-black print:opacity-100 print:text-[9px] whitespace-nowrap">
                    {edu.degree}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <p className="font-utility text-[10px] uppercase tracking-wider text-green print:text-gray-600 print:font-normal opacity-80 print:text-[8px]">
                    {edu.date}
                  </p>
                </div>
                <ul className="space-y-0.5">
                  {edu.details.map((detail, i) => (
                    <li
                      key={i}
                      className="font-serif text-sm opacity-80 print:opacity-100 leading-relaxed print:text-[10px] print:leading-tight"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-12 print:mb-3">
          <h2 className="font-utility text-xs uppercase tracking-[0.2em] text-green mb-6 print:mb-1 print:text-black print:text-[9px] print:font-bold border-b border-white/10 print:border-gray-200 pb-0.5">
            Professional Experience
          </h2>
          <div className="space-y-8 print:space-y-2">
            {cvData.experience.map((exp, index) => (
              <div key={index} className="break-inside-avoid">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-0">
                  <h3 className="font-serif text-xl text-pink print:text-black print:text-[11px] font-bold">
                    {exp.role}
                  </h3>
                  <span className="font-utility text-xs opacity-60 print:text-black print:opacity-100 print:text-[9px]">
                    {exp.company}
                  </span>
                </div>
                <p className="font-utility text-[10px] uppercase tracking-wider text-green print:text-gray-600 print:font-normal mb-1 opacity-80 print:text-[8px]">
                  {exp.date}
                </p>
                <ul className="space-y-0.5">
                  {exp.details.map((detail, i) => (
                    <li
                      key={i}
                      className="font-serif text-sm opacity-80 print:opacity-100 leading-relaxed pl-3 relative before:content-['-'] before:absolute before:left-0 before:opacity-50 print:text-[10px] print:leading-tight"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills - Compact Grid for Print */}
        <section className="mb-12 print:mb-0">
          <h2 className="font-utility text-xs uppercase tracking-[0.2em] text-green mb-6 print:mb-1 print:text-black print:text-[9px] print:font-bold border-b border-white/10 print:border-gray-200 pb-0.5">
            Skills
          </h2>
          <div className="space-y-3 print:space-y-1 print:grid print:grid-cols-2 print:gap-x-4">
            {cvData.skills.map((skill, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-baseline print:flex-col print:items-start break-inside-avoid"
              >
                <span className="font-bold font-serif text-sm text-pink print:text-black min-w-[200px] mb-1 md:mb-0 print:text-[10px] print:mb-0">
                  {skill.category}
                </span>
                <span className="font-serif text-sm opacity-80 print:opacity-100 print:text-[10px]">
                  {skill.items}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Print Footer - Minimal */}
        <div className="hidden print:block mt-4 pt-2 border-t border-gray-200 text-center text-[8px] text-gray-500">
          References available upon request.
        </div>
      </div>

      <MobileNav activeTab="CV" />
    </div>
  );
}
