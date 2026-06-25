"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SplitReveal from "@/components/ui/SplitReveal";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function About() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from("[data-line]", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root }
  );

  return (
    <section id="about" ref={root} className="relative bg-ink py-24 md:py-36">
      <div className="shell">
        {/* section head */}
        <div className="mb-14 flex items-center gap-4">
          <span className="eyebrow !text-turq">01 — Who We Are</span>
          <span data-line className="h-px flex-1 bg-cream/15" />
        </div>

        <div className="grid gap-14 md:grid-cols-12">
          {/* left media + attribution */}
          <div className="md:col-span-4">
            <Reveal className="overflow-hidden rounded-2xl border border-cream/10">
              <div className="relative aspect-[4/5] w-full">
                <video
                  className="h-full w-full object-cover opacity-90"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/hero-vid.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="label-mono text-turq">Our Vision</p>
                  <p className="mt-1 max-w-[22ch] text-sm text-cream/85">
                    Among the world&apos;s leading sustainable mobility providers.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-6 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-turq/15 font-display font-bold text-turq">
                SD
              </span>
              <div>
                <p className="text-sm font-semibold text-cream">
                  Mr. Sasiranga De Silva
                </p>
                <p className="label-mono text-muted">Founder &amp; CEO</p>
              </div>
            </Reveal>
          </div>

          {/* right statement */}
          <div className="md:col-span-8 md:pl-8">
            <SplitReveal
              as="h2"
              className="display-md text-cream"
              text="We build electric vehicles and integrated transport systems that make clean mobility cost-efficient, eco-friendly and effortless."
              highlight={[2, 3, 8, 11, 12, 13]}
              scrollFill={true}
            />

            <div className="mt-12 grid gap-10 border-t border-cream/10 pt-10 md:grid-cols-2">
              <Reveal>
                <p className="text-sm leading-relaxed text-cream/65 md:text-base">
                  ThermalR Industries (PVT) Ltd develops products and services in
                  sustainable energy and transportation. A pioneer in electric
                  vehicles for the local market, we&apos;re now revolutionizing
                  transport by bringing EVs and integrated systems to local and
                  international markets.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-sm leading-relaxed text-cream/65 md:text-base">
                  Our team of locally and internationally recognized engineers
                  works with cutting-edge technology, design and simulation tools,
                  and modern manufacturing methods — built to stand among the top
                  competitors.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="mt-12">
              <MagneticButton href="#products" variant="outline">
                Explore the range
                <span aria-hidden="true">&#8594;</span>
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
