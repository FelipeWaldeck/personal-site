import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getShelves } from "../data/siteContent";

/**
 * Reading Page - Goodreads-style book display with vertical cards
 * 
 * Features:
 * - Sections by shelf (Currently Reading, Up Next, Finished, Reference)
 * - Vertical book cards with prominent covers
 * - Fallback placeholder for missing/broken images
 * - External links to Goodreads
 */

export default function Reading() {
  const shelves = getShelves();

  return (
    <div
      className="min-h-screen py-8"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Site mark */}
      <Link to="/" className="site-mark">
        Felipe Waldeck
      </Link>

      {/* Header */}
      <div className="px-8 md:px-32 pt-12">
        <h1
          className="text-3xl md:text-5xl text-center pt-4"
          style={{ color: "var(--text-primary)" }}
        >
          Reading
        </h1>
        <p
          className="text-center pt-4 max-w-xl mx-auto"
          style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}
        >
          Books I'm reading, planning to read, and have finished.
        </p>
      </div>

      {/* Shelves */}
      <div className="px-8 md:px-16 lg:px-32 pt-8">
        {shelves.map((shelf) => (
          <section key={shelf.key} className="mb-16">
            {/* Shelf header */}
            <h2
              className="text-xl md:text-2xl mb-8 pb-2"
              style={{
                color: "var(--text-primary)",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              {shelf.displayName}
              <span
                className="ml-3 text-sm"
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
                }}
              >
                {shelf.books.length}
              </span>
            </h2>

            {/* Book grid - vertical cards */}
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              }}
            >
              {shelf.books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {shelf.books.length === 0 && (
              <p style={{ color: "var(--text-muted)" }}>No books in this shelf.</p>
            )}
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div className="px-8 md:px-32 pt-8 pb-16">
        <p
          className="text-center text-sm"
          style={{
            color: "var(--text-muted)",
            fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace",
          }}
        >
          Data synced from Goodreads
        </p>
      </div>
    </div>
  );
}

/**
 * BookCard - Vertical book card with cover and fallback
 */
function BookCard({ book }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    if (book.link) {
      window.open(book.link, "_blank", "noopener,noreferrer");
    }
  };

  // Determine if we should show placeholder
  const showPlaceholder = !book.cover || imageError;

  return (
    <div
      onClick={handleClick}
      className="flex flex-col cursor-pointer group"
      style={{ transition: "transform 0.15s ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Cover container */}
      <div
        className="relative w-full mb-3"
        style={{
          aspectRatio: "2/3",
          backgroundColor: "var(--bg-secondary)",
          borderRadius: "4px",
          overflow: "hidden",
          border: "1px solid var(--border-subtle)",
          transition: "border-color 0.15s ease, box-shadow 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--accent-green)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border-subtle)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Actual image (hidden if error/not loaded) */}
        {book.cover && !imageError && (
          <img
            src={book.cover}
            alt={book.title}
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: imageLoaded ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          />
        )}

        {/* Placeholder - shown while loading or on error */}
        {(showPlaceholder || !imageLoaded) && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-3"
            style={{
              backgroundColor: "var(--bg-secondary)",
              opacity: imageLoaded && !showPlaceholder ? 0 : 1,
              transition: "opacity 0.2s ease",
            }}
          >
            {/* Book icon placeholder */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-muted)"
              strokeWidth="1"
              className="mb-2"
              style={{ opacity: 0.4 }}
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: "10px",
                textAlign: "center",
                lineHeight: 1.3,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {book.title}
            </div>
          </div>
        )}

        {/* External link indicator */}
        {book.link && (
          <div
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
            style={{
              backgroundColor: "rgba(0,0,0,0.7)",
              borderRadius: "4px",
              padding: "4px",
              transition: "opacity 0.15s ease",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
        )}
      </div>

      {/* Book info */}
      <div className="px-1">
        <h3
          className="font-bold text-sm leading-tight mb-1"
          style={{
            color: "var(--text-primary)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
          title={book.title}
        >
          {book.title}
        </h3>
        <p
          className="text-xs"
          style={{
            color: "var(--text-secondary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {book.author}
        </p>
      </div>
    </div>
  );
}
