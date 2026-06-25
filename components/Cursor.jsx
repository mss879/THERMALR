"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Turquoise dot + lagging ring. Grows over interactive elements. */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    document.body.classList.add("has-cursor");

    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.15, ease: "power3" });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.15, ease: "power3" });
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });

    const move = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const over = (e) => {
      const hov = e.target.closest('a, button, [data-cursor="hover"]');
      ring.current.setAttribute("data-hover", hov ? "true" : "false");
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });

    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring hidden md:block" aria-hidden="true" />
      <div ref={dot} className="cursor-dot hidden md:block" aria-hidden="true" />
    </>
  );
}
