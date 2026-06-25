"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Magnetic CTA. Pulls toward the cursor and lifts its label.
 * Renders an <a> so it can anchor-scroll to page sections.
 */
export default function MagneticButton({
  children,
  href = "#",
  variant = "solid",
  className = "",
  onClick,
}) {
  const ref = useRef(null);
  const labelRef = useRef(null);

  const move = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.32, y: y * 0.5, duration: 0.6, ease: "expo.out" });
    gsap.to(labelRef.current, {
      x: x * 0.14,
      y: y * 0.22,
      duration: 0.6,
      ease: "expo.out",
    });
  };

  const reset = () => {
    gsap.to([ref.current, labelRef.current], {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const base =
    "group relative inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-300";
  const styles =
    variant === "solid"
      ? "bg-turq text-ink hover:bg-turq-bright"
      : variant === "outline"
      ? "border border-cream/25 text-cream hover:border-turq hover:text-turq"
      : "bg-cream text-ink hover:bg-white";

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={reset}
      data-cursor="hover"
      className={`${base} ${styles} ${className}`}
    >
      <span ref={labelRef} className="inline-flex items-center gap-3">
        {children}
      </span>
    </a>
  );
}
