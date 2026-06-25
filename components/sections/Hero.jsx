"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const STATS = [
  { v: "120", u: "KM", l: "Range" },
  { v: "110", u: "KMPH", l: "Top Speed" },
  { v: "80¢", u: "/KM", l: "Running Cost" },
];

export default function Hero() {
  const root = useRef(null);
  const video = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // intro (runs after preloader curtain lifts ~1.2s)
      const tl = gsap.timeline({ delay: reduce ? 0 : 1.25 });
      tl.from("[data-hero-line] > span", {
        yPercent: 120,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.12,
      })
        .from(
          "[data-hero-fade]",
          { y: 24, autoAlpha: 0, duration: 1, ease: "expo.out", stagger: 0.12 },
          "-=0.9"
        )
        .from(
          "[data-hero-video]",
          { scale: 1.15, autoAlpha: 0, duration: 1.6, ease: "expo.out" },
          0
        );

      if (reduce) return;

      // scroll parallax
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      st.to("[data-hero-content]", { yPercent: -28, ease: "none" }, 0)
        .to(video.current, { yPercent: 16, scale: 1.12, ease: "none" }, 0)
        .to("[data-hero-overlay]", { opacity: 0.85, ease: "none" }, 0);
    },
    { scope: root }
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative h-[100svh] min-h-[640px] p-[10px] bg-turq"
    >
      <div className="relative h-full w-full flex flex-col overflow-hidden bg-ink rounded-2xl">
        {/* video */}
        <div data-hero-video className="absolute inset-0">
          <video
            ref={video}
            className="h-full w-full scale-110 object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster=""
          >
            <source src="/hero-vid.mp4" type="video/mp4" />
          </video>
        </div>

        {/* overlays */}
        <div
          data-hero-overlay
          className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,transparent,rgba(6,6,8,0.55))]" />
        <div className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-[linear-gradient(115deg,rgba(52,227,205,0.12),transparent_40%)]" />

        {/* content */}
        <div
          data-hero-content
          className="shell relative z-10 mt-auto flex flex-1 flex-col justify-end pb-10 pt-28"
        >
          <div
            data-hero-fade
            className="mb-7 flex items-center gap-3 text-turq"
          >
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-turq" />
            <span className="eyebrow !text-turq">
              ThermalR Industries — EV &amp; Energy
            </span>
          </div>

          <h1 className="display-lg max-w-[16ch] text-cream" style={{ fontSize: "clamp(1.8rem, 4.8vw, 4.8rem)" }}>
            <span data-hero-line className="reveal-line">
              <span>Sustainable</span>
            </span>
            <span data-hero-line className="reveal-line">
              <span>Mobility,</span>
            </span>
            <span data-hero-line className="reveal-line text-turq">
              <span>Engineered.</span>
            </span>
          </h1>

          <div className="mt-9 flex flex-col gap-8 border-t border-cream/10 pt-7 md:flex-row md:items-end md:justify-between">
            <p
              data-hero-fade
              className="max-w-md text-balance text-sm leading-relaxed text-cream/70 md:text-base"
            >
              Pioneering electric vehicles and integrated transportation systems —
              for local and international markets. We cut emissions, not corners.
            </p>

            <div data-hero-fade className="flex gap-10">
              {STATS.map((s) => (
                <div key={s.l} className="flex flex-col">
                  <span className="font-display text-3xl font-extrabold leading-none text-cream md:text-4xl">
                    {s.v}
                    <span className="ml-1 text-sm text-turq">{s.u}</span>
                  </span>
                  <span className="label-mono mt-2 text-muted">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div
          data-hero-fade
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        >
          <span className="label-mono text-muted">Scroll</span>
          <span className="relative block h-12 w-px overflow-hidden bg-cream/15">
            <span className="absolute inset-x-0 top-0 h-4 animate-[scrollLine_1.8s_ease-in-out_infinite] bg-turq" />
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(300%);
          }
        }
      `}</style>
    </section>
  );
}
