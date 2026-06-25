"use client";

import Marquee from "@/components/ui/Marquee";

const ITEMS = [
  "Electric Motorbikes",
  "E-Bicycles",
  "PowerBox Energy",
  "E-Bicycle Sharing",
  "3D Printing",
  "Zero Emissions",
  "Engineered in Sri Lanka",
];

export default function MarqueeBand() {
  return (
    <div className="border-y border-cream/10 bg-wine/20 py-5">
      <Marquee
        items={ITEMS}
        className="font-display text-xl font-bold uppercase tracking-tight text-cream/90 md:text-2xl"
      />
    </div>
  );
}
