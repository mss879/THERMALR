"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const PANELS = [
  {
    n: "01",
    label: "Design",
    title: "Revolutionary Design",
    points: [
      ["Falcon-Shaped Body", "Aerodynamic silhouette built for presence and efficiency."],
      ["Iconic Headlights", "Bright signature lighting you can spot from a distance."],
      ["1400mm Wheelbase", "Better ride quality with 170mm ground clearance."],
    ],
  },
  {
    n: "02",
    label: "Performance",
    title: "Unbeatable Performance",
    points: [
      ["Regenerative Braking", "Front & rear disk brakes that recover energy as you slow."],
      ["Fast Charging", "3.6 CEB units and just 4 hours to a full charge."],
      ["Speed & Range", "100–120 km of range at up to 110 km/h."],
    ],
  },
  {
    n: "03",
    label: "Digital Tech",
    title: "Interactive Android Display",
    points: [
      ["7″ LCD Touch", "Android-based display with speedometer and battery voltage."],
      ["Navigation", "Built-in GPS navigation and odometer at a glance."],
      ["App Ecosystem", "Install Android apps directly on your dashboard."],
    ],
  },
];

export default function FeatureShowcase() {
  const root = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const distance = () => track.current.scrollWidth - window.innerWidth;

        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar.current)
                bar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        return () => tween.scrollTrigger?.kill();
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-ink"
      aria-label="Electric MotorBike features"
    >
      {/* progress */}
      <div className="absolute left-0 top-0 z-30 h-0.5 w-full bg-cream/10">
        <div
          ref={bar}
          className="h-full w-full origin-left scale-x-0 bg-turq"
        />
      </div>

      <div
        ref={track}
        className="flex flex-col md:h-[100svh] md:flex-row md:flex-nowrap md:items-stretch"
      >
        {/* intro panel */}
        <div className="relative flex min-h-[60vh] shrink-0 flex-col justify-center overflow-hidden border-b border-cream/10 px-[var(--gutter)] py-20 md:h-full md:w-[58vw] md:border-b-0 md:border-r">
          <img
            src="/feature-bg.png"
            alt="Futuristic Electric Motorbike"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/30" />
          <div className="relative">
            <span className="eyebrow !text-turq">03 — The Flagship</span>
            <h2 className="display-xl mt-5 text-cream">
              Electric
              <br />
              <span className="text-turq">MotorBike</span>
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-cream/65 md:text-base">
              The Barbery and The Peregrine — engineered to turn heads and cut
              running costs to 80 cents per kilometre.
            </p>
            <p className="label-mono mt-10 hidden items-center gap-3 text-muted md:flex">
              Scroll to explore
              <span className="text-turq">&#8594;</span>
            </p>
          </div>
        </div>

        {/* feature panels */}
        {PANELS.map((p) => (
          <article
            key={p.n}
            className="relative flex min-h-[80vh] shrink-0 flex-col justify-center border-b border-cream/10 px-[var(--gutter)] py-20 md:h-full md:w-[46vw] md:border-b-0 md:border-r last:md:border-r-0"
          >
            <div className="pointer-events-none absolute right-6 top-1/2 -z-0 -translate-y-1/2 font-display text-[28vh] font-black leading-none text-cream/[0.03]">
              {p.n}
            </div>

            <div className="relative">
              <div className="mb-6 flex items-center gap-4">
                <span className="label-mono text-turq">/{p.n}</span>
                <span className="label-mono text-muted">{p.label}</span>
              </div>
              <h3 className="display-md max-w-[12ch] text-cream">{p.title}</h3>

              <div className="mt-10 space-y-6 border-t border-cream/10 pt-8">
                {p.points.map(([h, d]) => (
                  <div key={h} className="group flex gap-5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-turq transition-transform duration-300 group-hover:scale-150" />
                    <div>
                      <p className="text-base font-semibold text-cream">{h}</p>
                      <p className="mt-1 max-w-sm text-sm leading-relaxed text-cream/55">
                        {d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
