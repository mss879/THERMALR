"use client";

import Image from "next/image";

const COLS = [
  {
    title: "Products",
    links: [
      "Electric MotorBike",
      "Electric Bicycle",
      "ThermalR PowerBox",
      "E-Bicycle Sharing",
      "3D Printers",
    ],
  },
  {
    title: "Company",
    links: ["About Us", "Our Team", "Responsibility", "Journal"],
  },
  {
    title: "Support",
    links: ["Contact Us", "Warranties", "Terms & Conditions", "Privacy Policy"],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-ink pt-20">
      <div className="shell">
        <div className="grid gap-12 pb-16 md:grid-cols-12">
          {/* brand */}
          <div className="md:col-span-4">
            <Image
              src="/logo.png"
              alt="ThermalR"
              width={160}
              height={38}
              className="h-8 w-auto"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/55">
              Sustainable mobility products and services — engineered for a
              cleaner, more affordable tomorrow.
            </p>
            <div className="mt-7 flex gap-3">
              {["IG", "FB", "IN", "YT"].map((s) => (
                <a
                  key={s}
                  href="#contact"
                  data-cursor="hover"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-xs text-cream/70 transition-all hover:border-turq hover:bg-turq hover:text-ink"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          {COLS.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <p className="label-mono mb-5 text-turq">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#contact"
                      data-cursor="hover"
                      className="text-sm text-cream/60 transition-colors hover:text-cream"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* contact mini */}
          <div className="md:col-span-2">
            <p className="label-mono mb-5 text-turq">Reach us</p>
            <a
              href="tel:0766872777"
              className="block text-sm text-cream/60 transition-colors hover:text-cream"
            >
              076 687 2777
            </a>
            <a
              href="mailto:hello@thermalr.com"
              className="mt-3 block text-sm text-cream/60 transition-colors hover:text-cream"
            >
              hello@thermalr.com
            </a>
          </div>
        </div>

        {/* giant wordmark */}
        <div className="relative select-none">
          <p className="pointer-events-none whitespace-nowrap text-center font-display text-[20vw] font-black uppercase leading-none tracking-tighter text-cream/[0.04] md:text-[15vw]">
            ThermalR
          </p>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-cream/10 py-7 text-center md:flex-row">
          <p className="label-mono text-muted">
            © {new Date().getFullYear()} ThermalR Industries (PVT) Ltd
          </p>
          <p className="label-mono text-muted">
            Sustainable Mobility · Engineered in Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}
