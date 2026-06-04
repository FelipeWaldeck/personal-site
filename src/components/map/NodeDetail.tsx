import React, { useEffect, useRef } from 'react';
import { CAT, type MapNode } from '../../data/mapData';

interface NodeDetailProps {
  node: MapNode | null;
  onClose: () => void;
}

function ctaLabel(node: MapNode): string {
  if (node.cat === 'writing') return 'Read full text ↗';
  try {
    return `Open ${new URL(node.href!).hostname.replace(/^www\./, '')} ↗`;
  } catch {
    return 'Open ↗';
  }
}

/**
 * NodeDetail — an in-place preview panel for nodes that link out rather than to a
 * case study. It fills the mapstage (the column right of the rail) instead of taking
 * over the whole viewport, so the rail stays live and the map sits intact underneath.
 * Published nodes show a blurb, tags, and an external CTA; forthcoming nodes show just
 * title + meta.
 */
export default function NodeDetail({ node, onClose }: NodeDetailProps) {
  const backRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!node) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    backRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prevFocus?.focus?.();
    };
  }, [node, onClose]);

  if (!node) return null;

  const cat = CAT[node.cat];

  return (
    <section className="node-detail" role="region" aria-label={node.title}>
      <button ref={backRef} className="node-detail__back" onClick={onClose}>
        ← Back to map
      </button>

      <div className="node-detail__body">
        {node.image && (
          <div
            className="node-detail__image"
            role="img"
            aria-label={`${node.title} preview`}
            style={{ backgroundImage: `url('${node.image}')` }}
          />
        )}

        <div className="node-detail__text">
          <div className="node-detail__kicker" style={{ color: cat.color }}>
            {cat.label} · {node.meta}
          </div>
          <h1 className="node-detail__title" id="node-detail-title">
            {node.title}
          </h1>

          {node.blurb ? (
            <p className="node-detail__desc">{node.blurb}</p>
          ) : (
            <p className="node-detail__desc node-detail__desc--quiet">Forthcoming.</p>
          )}

          {node.tags && node.tags.length > 0 && (
            <div className="node-detail__tags">{node.tags.join(' · ')}</div>
          )}

          {node.href && (
            <button
              className="node-detail__cta"
              onClick={() => window.open(node.href!, '_blank', 'noopener,noreferrer')}
            >
              {ctaLabel(node)}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
