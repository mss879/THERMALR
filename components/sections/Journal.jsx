"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SplitReveal from "@/components/ui/SplitReveal";

const POSTS = [
  {
    cat: "Engineering",
    date: "Jun 2026",
    title: "Inside the falcon-shaped body of our electric motorbike",
    read: "5 min",
  },
  {
    cat: "Sustainability",
    date: "May 2026",
    title: "What 80 cents per kilometre really means for your wallet",
    read: "4 min",
  },
  {
    cat: "Energy",
    date: "Apr 2026",
    title: "Sizing a ThermalR PowerBox for your home — a quick guide",
    read: "6 min",
  },
];

export default function Journal() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from("[data-post]", {
        y: 36,
        autoAlpha: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-posts]", start: "top 84%" },
      });
    },
    { scope: root }
  );

  return (
    <section id="journal" ref={root} className="bg-ink py-24 md:py-36">
      <div className="shell">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow !text-turq">08 — Journal</span>
            <SplitReveal
              as="h2"
              className="display-lg mt-5 text-cream"
              text="Notes from the workshop"
              highlight={[2]}
            />
          </div>
          <a
            href="#contact"
            data-cursor="hover"
            className="label-mono group inline-flex items-center gap-2 text-cream/70 transition-colors hover:text-turq"
          >
            All articles
            <span className="transition-transform group-hover:translate-x-1">
              &#8594;
            </span>
          </a>
        </div>

        <div data-posts className="grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 md:grid-cols-3">
          {POSTS.map((p) => (
            <a
              key={p.title}
              href="#contact"
              data-post
              data-cursor="hover"
              className="group flex min-h-[300px] flex-col justify-between bg-ink p-7 transition-colors duration-500 hover:bg-coal"
            >
              <div className="flex items-center justify-between">
                <span className="label-mono rounded-full border border-cream/15 px-3 py-1 text-turq">
                  {p.cat}
                </span>
                <span className="label-mono text-muted">{p.date}</span>
              </div>

              <h3 className="mt-auto font-display text-xl font-bold uppercase leading-tight tracking-tight text-cream transition-colors group-hover:text-turq md:text-2xl">
                {p.title}
              </h3>

              <div className="mt-6 flex items-center justify-between border-t border-cream/10 pt-4">
                <span className="label-mono text-muted">{p.read} read</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream transition-all group-hover:border-turq group-hover:bg-turq group-hover:text-ink">
                  &#8599;
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
