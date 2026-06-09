import React, { useEffect, useRef } from 'react';

/* Ambient canvas pieces for the Namshub case study, ported from the real app
   (BootSplash.tsx dithered field + the ambient glyph field). Both are pure
   procedural canvases — no assets — so they match the product exactly. */

const BAYER_4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(
  (v) => (v + 0.5) / 16,
);

const FIELD_SCALE = 4;
const FIELD_SPEED = 0.45;
// Warm two-layer ink: base "shoulders" + golden "crests", on dark carbon.
const INK = { r: 215, g: 142, b: 112, a: 73 };
const CREST = { r: 245, g: 200, b: 130, a: 95 };

function useReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );
}

/** The boot-splash dithered warm field. Fills its positioned parent. */
export function SplashField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let raf = 0;

    function fit() {
      const rect = cvs!.getBoundingClientRect();
      W = Math.max(1, Math.ceil(rect.width / FIELD_SCALE));
      H = Math.max(1, Math.ceil(rect.height / FIELD_SCALE));
      cvs!.width = W;
      cvs!.height = H;
    }
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(cvs);

    function render(t: number) {
      const img = ctx!.createImageData(W, H);
      const tt = t * FIELD_SPEED;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const u = x / W;
          const v = y / H;
          const wave =
            Math.sin(u * Math.PI * 2.4 + tt * 0.00018) * 0.32 +
            Math.sin(v * Math.PI * 1.6 + tt * 0.00011) * 0.2 +
            Math.sin((u + v * 0.8) * Math.PI * 3.6 + tt * 0.00026) * 0.14;
          const n = 0.5 + wave * 0.5;
          const thr = BAYER_4[(y & 3) * 4 + (x & 3)];
          const i = (y * W + x) * 4;
          if (n > thr + 0.45) {
            img.data[i] = CREST.r;
            img.data[i + 1] = CREST.g;
            img.data[i + 2] = CREST.b;
            img.data[i + 3] = CREST.a;
          } else if (n > thr + 0.2) {
            img.data[i] = INK.r;
            img.data[i + 1] = INK.g;
            img.data[i + 2] = INK.b;
            img.data[i + 3] = INK.a;
          }
        }
      }
      ctx!.putImageData(img, 0, 0);
    }

    if (useReducedMotion()) {
      render(0);
    } else {
      const loop = (t: number) => {
        render(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        imageRendering: 'pixelated',
        pointerEvents: 'none',
      }}
    />
  );
}

// Dingir + a handful of cuneiform signs that drift in the ambient field.
const GLYPHS = ['\u{1202D}', '\u{12000}', '\u{12038}', '\u{1203A}', '\u{12014}', '\u{12026}'];

interface Drifter {
  x: number;
  y: number;
  size: number;
  glyph: string;
  vx: number;
  drift: number;
  phase: number;
  opacity: number;
}

/** A slow ambient field of cuneiform drifting behind a section. */
export function GlyphField({ density = 0.6 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let raf = 0;
    let drifters: Drifter[] = [];
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    function seed() {
      // Deterministic-ish scatter without Math.random reliance issues; uses a
      // cheap hash so the field looks organic but stable across resizes.
      const count = Math.floor((W * H) / 26000 * density);
      drifters = Array.from({ length: count }, (_, k) => {
        const h = Math.sin(k * 12.9898) * 43758.5453;
        const r1 = h - Math.floor(h);
        const r2 = (Math.sin(k * 78.233) * 12543.182) % 1;
        const r3 = (Math.sin(k * 39.425) * 9123.77) % 1;
        return {
          x: Math.abs(r1) * W,
          y: Math.abs(r2) * H,
          size: 16 + Math.abs(r3) * 26,
          glyph: GLYPHS[k % GLYPHS.length],
          vx: 0.04 + Math.abs(r1) * 0.08,
          drift: 6 + Math.abs(r2) * 10,
          phase: Math.abs(r3) * Math.PI * 2,
          opacity: 0.04 + Math.abs(r3) * 0.06,
        };
      });
    }

    function fit() {
      const rect = cvs!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      cvs!.width = W * dpr;
      cvs!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(cvs);

    const reduced = useReducedMotion();

    function frame(t: number) {
      ctx!.clearRect(0, 0, W, H);
      ctx!.textBaseline = 'middle';
      for (const d of drifters) {
        const x = (d.x + t * 0.02 * d.vx * 60) % (W + 60) - 30;
        const y = d.y + Math.sin(t * 0.0004 + d.phase) * d.drift;
        ctx!.font = `${d.size}px "Noto Sans Cuneiform", serif`;
        ctx!.fillStyle = `rgba(200, 149, 106, ${d.opacity})`;
        ctx!.fillText(d.glyph, x, y);
      }
      if (!reduced) raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
