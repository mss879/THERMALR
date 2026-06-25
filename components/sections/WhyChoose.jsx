"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SplitReveal from "@/components/ui/SplitReveal";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";

const ADV = [
  ["01", "Cost-Efficient Running", "As low as 80 cents per kilometre."],
  ["02", "Zero Tailpipe Emissions", "Fully electric, clean by design."],
  ["03", "Proven Engineering", "Built by award-winning engineers."],
  ["04", "Transparent Pricing", "Clear payment structures, no surprises."],
];

const STATS = [
  { to: 80, suffix: "¢", label: "Cost / km" },
  { to: 4, suffix: "H", label: "To full charge" },
  { to: 120, suffix: "KM", label: "Max range" },
];

export default function WhyChoose() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from("[data-adv]", {
        x: 30,
        autoAlpha: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-adv-list]", start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative bg-cream py-24 text-ink md:py-36">
      {/* faint grid */}
      <div className="pointer-events-none absolute inset-0 text-ink/40 bg-grid-lines opacity-[0.5]" />

      <div className="shell relative">
        <div className="grid gap-14 md:grid-cols-2">
          {/* heading */}
          <div>
            <span className="eyebrow !text-ink/50">03 — Why ThermalR</span>
            <SplitReveal
              as="h2"
              className="display-lg mt-5 text-ink"
              text="Why riders choose ThermalR"
              highlight={[3]}
            />
            <Reveal className="mt-6 max-w-sm text-sm leading-relaxed text-ink/55">
              We make the switch to electric simple, practical and measurable —
              for your wallet and the planet.
            </Reveal>
          </div>

          {/* advantages */}
          <div data-adv-list className="md:pt-12">
            <p className="label-mono mb-4 text-ink/45">Our advantages include:</p>
            <div className="border-t border-ink/15">
              {ADV.map(([n, h, d]) => (
                <div
                  key={n}
                  data-adv
                  className="flex items-baseline gap-5 border-b border-ink/15 py-4"
                >
                  <span className="label-mono text-ink/40">{n}</span>
                  <div>
                    <p className="font-display text-lg font-bold uppercase tracking-tight text-ink">
                      {h}
                    </p>
                    <p className="mt-0.5 text-sm text-ink/55">{d}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="label-mono mt-4 flex justify-between text-ink/40">
              <span>Source: ThermalR product data</span>
              <span>2026</span>
            </p>
          </div>
        </div>

        {/* stats */}
        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="bg-cream p-8">
              <span className="font-display text-5xl font-black leading-none text-ink md:text-6xl">
                <Counter to={s.to} suffix={s.suffix} />
              </span>
              <p className="label-mono mt-3 text-ink/50">{s.label}</p>
            </div>
          ))}
        </div>

        {/* pocket / app */}
        <div className="mt-20 grid items-center gap-12 rounded-3xl border border-ink/10 bg-white/60 p-8 md:grid-cols-2 md:p-14">
          <div>
            <span className="label-mono text-turq-deep">● Digital Tech</span>
            <SplitReveal
              as="h3"
              className="display-md mt-4 text-ink"
              text="Your ride, in your pocket"
              highlight={[3]}
            />
            <Reveal className="mt-5 max-w-md text-sm leading-relaxed text-ink/60">
              Track performance, monitor your battery and navigate with GPS — all
              from the Android-based 7″ touch display built into every ThermalR
              motorbike.
            </Reveal>
            <div className="mt-8 flex gap-8">
              <div>
                <p className="font-display text-2xl font-bold text-ink">7″</p>
                <p className="label-mono text-ink/45">LCD Touch</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-ink">GPS</p>
                <p className="label-mono text-ink/45">Navigation</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-ink">Apps</p>
                <p className="label-mono text-ink/45">Android</p>
              </div>
            </div>
          </div>

          {/* phone mock */}
          <Reveal className="flex justify-center">
            <div className="relative max-w-[280px]">
              <img
                src="/app-dashboard.png"
                alt="ThermalR Live Mobile Dashboard App"
                className="w-full rounded-[2rem] shadow-2xl border border-ink/5"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
