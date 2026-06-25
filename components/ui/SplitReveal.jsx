"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

/**
 * Masked, word-by-word reveal driven by ScrollTrigger.
 * Renders as the tag you pass (default h2) and keeps text accessible.
 */
export default function SplitReveal({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.05,
  start = "top 85%",
  highlight = [],
  scrollFill = false,
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const words = ref.current.querySelectorAll("[data-w] > span");
      if (scrollFill) {
        gsap.set(words, { opacity: 0.15 });
        gsap.to(words, {
          opacity: 1,
          stagger,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 78%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        });
      } else {
        gsap.set(words, { yPercent: 115 });
        gsap.to(words, {
          yPercent: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger,
          delay,
          scrollTrigger: { trigger: ref.current, start },
        });
      }
    },
    { scope: ref, dependencies: [scrollFill] }
  );

  const words = String(text).split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => {
        const isHi = highlight.includes(i);
        return (
          <span
            key={i}
            data-w
            aria-hidden="true"
            className="inline-block overflow-hidden align-bottom mr-[0.26em]"
            style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
          >
            <span
              className="inline-block will-change-transform"
              style={isHi ? { color: "var(--color-turq)" } : undefined}
            >
              {w}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
