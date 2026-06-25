"use client";

/** Infinite CSS marquee. Duplicates content for a seamless loop. */
export default function Marquee({ items = [], reverse = false, className = "" }) {
  const row = (
    <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
      {[...items, ...items].map((it, i) => (
        <span key={i} className="inline-flex items-center">
          <span className="px-8">{it}</span>
          <span className="text-turq" aria-hidden="true">
            &#9670;
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      {row}
    </div>
  );
}
