import React, { useEffect, useRef } from 'react';

// ASCII Art defined as array of strings to avoid template literal escape hell
// Each backslash must be escaped as \\
// Each single quote must be escaped as \'
const ASCII_LINES = [
  '           /\\,%,_',
  '           \\%%%/,,\\',
  '         _.-"%%|//%',
  '       .\'  .-"  /%%%',
  '   _.-\'_.-" 0)   \\%%%',
  "  /.\\.'           \\%%%",
  '  \\ /      _,      %%%',
  '   `"---"~`\\   _,*\'\\%%\'   _,--""""-,%%,',
  '            )*^     `""~~`          \\%%%,',
  '          _/                         \\%%%',
  '      _.-`/                           |%%,___',
  '  _.-"   /      ,           ,        ,|%%   .`\\',
  " /\\     /      /             `\\       \\%'   \\ /",
  ' \\ \\ _,/      /`~-._         _,`\\      \\`""~~`',
  '  `"` /-.,_ /\'      `~"----"~    `\\     \\',
  '      \\___,\'                       \\.-"`/',
  "                                    `--'",
];

const ASCII_ART = ASCII_LINES.join('\n');

export default function BouncingAscii() {
  const containerRef = useRef(null);

  // Mutable state for the animation loop
  const state = useRef({
    x:
      typeof window !== 'undefined'
        ? Math.random() * (window.innerWidth - 300)
        : 100,
    y:
      typeof window !== 'undefined'
        ? Math.random() * (window.innerHeight - 300)
        : 100,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5,
  });

  useEffect(() => {
    let animationFrameId;
    const el = containerRef.current;

    const animate = () => {
      if (!el) return;

      const { innerWidth, innerHeight } = window;
      const rect = el.getBoundingClientRect();
      const s = state.current;

      // Update position
      s.x += s.vx;
      s.y += s.vy;

      // Wall collision - Bounce
      if (s.x + rect.width >= innerWidth) {
        s.x = innerWidth - rect.width;
        s.vx *= -1;
      } else if (s.x <= 0) {
        s.x = 0;
        s.vx *= -1;
      }

      if (s.y + rect.height >= innerHeight) {
        s.y = innerHeight - rect.height;
        s.vy *= -1;
      } else if (s.y <= 0) {
        s.y = 0;
        s.vy *= -1;
      }

      // Apply transform
      el.style.transform = `translate(${s.x}px, ${s.y}px)`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <pre
      ref={containerRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none font-mono text-[10px] leading-[10px] text-green opacity-20 md:opacity-80 select-none whitespace-pre print:hidden"
      aria-hidden="true"
    >
      {ASCII_ART}
    </pre>
  );
}
