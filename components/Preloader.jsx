"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function Preloader() {
  const root = useRef(null);
  const countRef = useRef(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setDone(true);
        return;
      }

      document.documentElement.style.overflow = "hidden";

      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          setDone(true);
        },
      });

      tl.to(counter, {
        v: 100,
        duration: 1.1,
        ease: "power2.inOut",
        onUpdate: () => {
          if (countRef.current)
            countRef.current.textContent = String(Math.round(counter.v)).padStart(
              3,
              "0"
            );
        },
      })
        .to("[data-pl-logo]", { autoAlpha: 0, y: -20, duration: 0.5, ease: "power2.in" })
        .to("[data-pl-count]", { autoAlpha: 0, duration: 0.3 }, "<")
        .to(
          root.current,
          { yPercent: -100, duration: 0.9, ease: "expo.inOut" },
          "-=0.1"
        );
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
    >
      <div data-pl-logo className="flex flex-col items-center">
        <span className="font-display text-3xl font-black uppercase tracking-tight text-cream md:text-5xl">
          Thermal<span className="text-turq">R</span>
        </span>
        <span className="eyebrow mt-4 !text-muted">Sustainable Mobility</span>
      </div>

      <div
        data-pl-count
        className="absolute bottom-8 right-8 font-mono text-sm text-turq"
      >
        <span ref={countRef}>000</span>
        <span className="text-muted"> / 100</span>
      </div>
    </div>
  );
}
