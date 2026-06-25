"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SplitReveal from "@/components/ui/SplitReveal";

const BARS = [
  ["01", "Money burned on fuel", "/cost", 88],
  ["02", "Emissions you could cut", "/planet", 100],
  ["03", "Maintenance you could avoid", "/upkeep", 64],
  ["04", "Time lost at fuel stations", "/time", 42],
];

export default function CostBars() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray("[data-bar]").forEach((bar) => {
        const fill = bar.querySelector("[data-fill]");
        const pill = bar.querySelector("[data-pill]");
        const pct = bar.dataset.pct;
        gsap.fromTo(
          fill,
          { width: "0%" },
          {
            width: pct + "%",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: bar, start: "top 88%" },
          }
        );
        gsap.fromTo(
          pill,
          { left: "0%", autoAlpha: 0 },
          {
            left: pct + "%",
            autoAlpha: 1,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: bar, start: "top 88%" },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-ink py-24 md:py-32">
      <div className="shell">
        <div className="mb-14 max-w-3xl">
          <span className="eyebrow !text-turq">05 — The Cost of Combustion</span>
          <SplitReveal
            as="h2"
            className="display-lg mt-5 text-cream"
            text="The longer you wait, the more it costs you."
            highlight={[6, 7]}
          />
        </div>

        <div>
          {BARS.map(([n, label, tag, pct]) => (
            <div
              key={n}
              data-bar
              data-pct={pct}
              className="relative border-t border-cream/10 py-5 last:border-b"
            >
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="label-mono text-muted">{n}/</span>
                  <span className="font-display text-sm font-bold uppercase tracking-wide text-cream md:text-base">
                    {label}
                  </span>
                </div>
                <span className="label-mono text-muted">{tag}</span>
              </div>

              {/* track */}
              <div className="relative mt-4 h-px w-full bg-cream/10">
                <div
                  data-fill
                  className="absolute left-0 top-0 h-px bg-turq"
                  style={{ width: 0 }}
                />
                <span
                  data-pill
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-turq px-3 py-1 font-mono text-xs font-bold text-ink"
                  style={{ left: 0 }}
                >
                  +{pct}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-md text-sm leading-relaxed text-cream/50">
          Switching to electric isn&apos;t just cleaner — it&apos;s cheaper,
          quieter and quicker to live with. Every month on petrol is money you
          won&apos;t get back.
        </p>
      </div>
    </section>
  );
}
