"use client";

import SplitReveal from "@/components/ui/SplitReveal";
import Reveal from "@/components/ui/Reveal";

export default function VisionMission() {
  return (
    <section className="relative border-y border-cream/10 bg-wine-3 py-24 md:py-36">
      <div className="shell">
        <div className="mb-16 flex items-center gap-4">
          <span className="eyebrow !text-turq">04 — Purpose</span>
          <span className="h-px flex-1 bg-cream/10" />
        </div>

        <div className="grid gap-16 md:grid-cols-2">
          <div className="md:border-r md:border-cream/10 md:pr-12">
            <p className="label-mono mb-6 text-turq">Our Vision</p>
            <SplitReveal
              as="h2"
              className="display-md text-cream"
              text="To be one of the world's leading sustainable mobility providers."
              highlight={[6, 7]}
            />
          </div>

          <div className="md:pl-2">
            <p className="label-mono mb-6 text-turq">Our Mission</p>
            <SplitReveal
              as="h2"
              className="display-md text-cream"
              text="Cost-efficient, eco-friendly and convenient transportation for your daily travels."
              highlight={[0, 1, 2]}
            />
          </div>
        </div>

        <Reveal className="mt-16 max-w-2xl text-sm leading-relaxed text-cream/55">
          Every product we ship moves us closer to a transport sector that runs
          cleaner, costs less and disrupts nothing about the way you live.
        </Reveal>
      </div>
    </section>
  );
}
