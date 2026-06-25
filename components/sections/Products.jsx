"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SplitReveal from "@/components/ui/SplitReveal";

const PRODUCTS = [
  {
    n: "01",
    title: "Electric MotorBike",
    desc: "A falcon-shaped electric motorbike with regenerative braking, disk brakes and a 7″ Android touch display with GPS.",
    tags: ["120 KM Range", "110 KMPH", "The Barbery · The Peregrine"],
    accent: "from-turq/30 to-turq-deep/10",
    big: "EV BIKE",
    img: "/motorbike-preview.png",
  },
  {
    n: "02",
    title: "Electric Bicycle",
    desc: "Pedal-assist e-bicycles with Shimano components, aluminium frames and colour displays — up to 100 km on a charge.",
    tags: ["4 Models", "Up to 100 KM", "From Rs.196,400"],
    accent: "from-turq-soft/30 to-wine/20",
    big: "E-CYCLE",
    img: "/ebicycle-preview.png",
  },
  {
    n: "03",
    title: "ThermalR PowerBox",
    desc: "Pure sine-wave inverter energy systems with intelligent cooling and full protection — scalable from 1 kW to 5 kW and beyond.",
    tags: ["1–8 kWh", "Solar Ready", "Pure Sine Wave"],
    accent: "from-wine/40 to-turq-deep/10",
    big: "POWER",
    img: "/powerbox-preview.png",
  },
  {
    n: "04",
    title: "E-Bicycle Sharing",
    desc: "App-based shared electric mobility for campuses, estates and cities — clean transport on demand.",
    tags: ["Fleet Ready", "App-Based", "Smart Access"],
    accent: "from-turq/25 to-ink",
    big: "SHARE",
    img: "/sharing-preview.png",
  },
  {
    n: "05",
    title: "3D Printing",
    desc: "In-house additive manufacturing for rapid prototyping and custom parts that accelerate our engineering.",
    tags: ["Prototyping", "Custom Parts", "In-House"],
    accent: "from-turq-soft/20 to-wine-2",
    big: "PRINT",
    img: "/printing-preview.png",
  },
];

export default function Products() {
  const root = useRef(null);
  const preview = useRef(null);
  const moveX = useRef(null);
  const moveY = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      moveX.current = gsap.quickTo(preview.current, "x", {
        duration: 0.55,
        ease: "power3",
      });
      moveY.current = gsap.quickTo(preview.current, "y", {
        duration: 0.55,
        ease: "power3",
      });

      gsap.utils.toArray("[data-row]").forEach((row) => {
        gsap.from(row, {
          y: 30,
          autoAlpha: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 90%" },
        });
      });
    },
    { scope: root }
  );

  const onMove = (e) => {
    const rect = root.current.getBoundingClientRect();
    moveX.current?.(e.clientX - rect.left);
    moveY.current?.(e.clientY - rect.top);
  };

  const enter = (i) => {
    setActive(i);
    gsap.to(preview.current, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" });
  };
  const leave = () => {
    gsap.to(preview.current, { autoAlpha: 0, scale: 0.9, duration: 0.3, ease: "power3.out" });
  };

  return (
    <section
      id="products"
      ref={root}
      onMouseMove={onMove}
      className="relative bg-night py-24 md:py-36"
    >
      <div className="shell">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="eyebrow !text-turq">02 — What We Build</span>
            </div>
            <SplitReveal
              as="h2"
              className="display-lg max-w-[14ch] text-cream"
              text="The ThermalR range"
              highlight={[2]}
            />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-cream/55">
            Five product lines, one mission — practical, eco-friendly mobility
            and energy that works for everyday life.
          </p>
        </div>

        {/* rows */}
        <div className="border-t border-cream/10">
          {PRODUCTS.map((p, i) => (
            <a
              key={p.n}
              href="#contact"
              data-row
              data-cursor="hover"
              onMouseEnter={() => enter(i)}
              onMouseLeave={leave}
              className="group flex items-center gap-6 border-b border-cream/10 py-7 transition-colors duration-500 hover:bg-cream/[0.03] md:gap-10 md:py-9"
            >
              <span className="label-mono w-10 shrink-0 text-muted transition-colors group-hover:text-turq">
                /{p.n}
              </span>

              <div className="flex-1">
                <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-cream transition-colors duration-300 group-hover:text-turq md:text-4xl">
                  {p.title}
                </h3>
                <div className="mt-3 hidden flex-wrap gap-x-5 gap-y-1 md:flex">
                  {p.tags.map((t) => (
                    <span key={t} className="label-mono text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <p className="hidden max-w-xs text-sm leading-relaxed text-cream/55 lg:block">
                {p.desc}
              </p>

              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/20 text-cream transition-all duration-300 group-hover:border-turq group-hover:bg-turq group-hover:text-ink">
                <span className="transition-transform duration-300 group-hover:rotate-45">
                  &#8599;
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* cursor-following preview */}
      <div
        ref={preview}
        className="pointer-events-none absolute left-0 top-0 z-20 hidden h-56 w-44 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-cream/15 opacity-0 md:block"
        style={{ transform: "translate(-50%, -50%) scale(0.9)" }}
        aria-hidden="true"
      >
        <div className="relative h-full w-full bg-coal">
          {/* background image */}
          <img
            src={PRODUCTS[active].img}
            alt=""
            className="absolute inset-0 h-full w-full object-cover z-0 opacity-70"
          />
          {/* dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/50 z-10" />

          {/* text content */}
          <div className="relative z-20 flex h-full w-full flex-col justify-between p-4">
            <span className="label-mono text-cream/90 font-bold drop-shadow-md">/{PRODUCTS[active].n}</span>
            <span className="font-display text-2xl font-extrabold uppercase leading-none text-cream drop-shadow-md">
              {PRODUCTS[active].big}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
