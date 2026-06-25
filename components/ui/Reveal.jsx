"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

/** Generic fade + rise on scroll into view. */
export default function Reveal({
  children,
  className = "",
  y = 40,
  delay = 0,
  duration = 1,
  start = "top 88%",
  as: Tag = "div",
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.from(ref.current, {
        y,
        autoAlpha: 0,
        duration,
        delay,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
