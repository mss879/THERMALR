"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

/** Counts a number up when scrolled into view. */
export default function Counter({
  to,
  from = 0,
  decimals = 0,
  className = "",
  prefix = "",
  suffix = "",
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const obj = { v: from };
      gsap.to(obj, {
        v: to,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 90%" },
        onUpdate: () => {
          if (ref.current)
            ref.current.textContent =
              prefix + obj.v.toFixed(decimals) + suffix;
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {from.toFixed(decimals)}
      {suffix}
    </span>
  );
}
