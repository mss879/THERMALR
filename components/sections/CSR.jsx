"use client";

import ShaderField from "@/components/webgl/ShaderField";
import SplitReveal from "@/components/ui/SplitReveal";
import Reveal from "@/components/ui/Reveal";

export default function CSR() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-40">
      {/* WebGL field */}
      <ShaderField className="absolute inset-0 opacity-60" intensity={0.9} />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink" />

      <div className="shell relative">
        <div className="mb-10 flex items-center gap-4">
          <span className="eyebrow !text-turq">07 — Responsibility</span>
          <span className="h-px flex-1 bg-cream/15" />
        </div>

        <SplitReveal
          as="h2"
          className="display-lg max-w-[18ch] text-cream"
          text="A cleaner, healthier future for the generations to come."
          highlight={[1, 8]}
          stagger={0.04}
        />

        <div className="mt-12 grid gap-10 border-t border-cream/15 pt-10 md:grid-cols-2">
          <Reveal>
            <p className="text-base leading-relaxed text-cream/75">
              Climate change is a global threat that can only be overcome with
              collective effort. As a sustainability-led engineering company,
              ThermalR is obliged to make its contribution to the world.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="flex items-end">
            <p className="text-sm leading-relaxed text-cream/55">
              Corporate Social Responsibility isn&apos;t a department here — it&apos;s
              the reason the company exists. Every kilometre ridden electric is a
              small win for a cleaner planet.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
