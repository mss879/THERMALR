"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SplitReveal from "@/components/ui/SplitReveal";

const TEAM = [
  ["Sasiranga De Silva", "Founder & CEO", "SD"],
  ["Ramesh Warusavitharana", "Senior Mechanical Engineer", "RW"],
  ["Rumal Meepagala", "Mechatronics Engineer", "RM"],
  ["Ganeshan Gowtham", "Assistant Mechanical Engineer", "GG"],
  ["Imesh Sachintha", "Electronics Engineer", "IS"],
];

export default function Team() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from("[data-member]", {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: "[data-team-grid]", start: "top 82%" },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-night py-24 md:py-36">
      <div className="shell">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow !text-turq">06 — The Team</span>
            <SplitReveal
              as="h2"
              className="display-lg mt-5 max-w-[16ch] text-cream"
              text="The engineers behind the machines"
              highlight={[1]}
            />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-cream/55">
            Locally and internationally recognized engineers building with
            cutting-edge tools and modern manufacturing.
          </p>
        </div>

        <div
          data-team-grid
          className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-5"
        >
          {TEAM.map(([name, role, initials], i) => (
            <div
              key={name}
              data-member
              className="group relative flex min-h-[220px] flex-col justify-between bg-night p-6 transition-colors duration-500 hover:bg-coal"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-turq/25 to-wine/30 font-display font-bold text-turq">
                  {initials}
                </span>
                <span className="label-mono text-muted">
                  0{i + 1}
                </span>
              </div>
              <div>
                <p className="font-display text-lg font-bold uppercase leading-tight tracking-tight text-cream transition-colors group-hover:text-turq">
                  {name}
                </p>
                <p className="label-mono mt-2 text-muted">{role}</p>
              </div>
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-turq transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
