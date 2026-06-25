"use client";

import { useState } from "react";
import SplitReveal from "@/components/ui/SplitReveal";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

const PHONES = ["076 687 2777", "074 221 6217", "074 216 1217"];
const INTERESTS = [
  "Electric MotorBike",
  "Electric Bicycle",
  "ThermalR PowerBox",
  "E-Bicycle Sharing",
  "Something else",
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-cream/10 bg-wine-3 py-24 md:py-36"
    >
      <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-turq/10 blur-[140px]" />

      <div className="shell relative">
        <div className="mb-14 flex items-center gap-4">
          <span className="eyebrow !text-turq">09 — Start Here</span>
          <span className="h-px flex-1 bg-cream/10" />
        </div>

        <div className="grid gap-16 md:grid-cols-2">
          {/* left */}
          <div>
            <SplitReveal
              as="h2"
              className="display-lg text-cream"
              text="Start small. Go electric."
              highlight={[3]}
            />
            <Reveal className="mt-7 max-w-md text-base leading-relaxed text-cream/65">
              Pick one journey and make it electric — we&apos;ll handle the rest.
              Pre-order today, or just talk it through with our team first.
            </Reveal>

            <div className="mt-12 space-y-7">
              <div>
                <p className="label-mono mb-3 text-muted">Call us</p>
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  {PHONES.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      data-cursor="hover"
                      className="font-display text-xl font-bold text-cream transition-colors hover:text-turq md:text-2xl"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-12">
                <div>
                  <p className="label-mono mb-2 text-muted">Lead time</p>
                  <p className="text-sm text-cream/80">Motorbikes — 6 months</p>
                  <p className="text-sm text-cream/80">PowerBox — 2 weeks</p>
                </div>
                <div>
                  <p className="label-mono mb-2 text-muted">Visit</p>
                  <p className="text-sm text-cream/80">ThermalR Industries</p>
                  <p className="text-sm text-cream/80">(PVT) Ltd · Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>

          {/* form */}
          <Reveal className="rounded-3xl border border-cream/10 bg-cream/[0.03] p-7 backdrop-blur-sm md:p-10">
            {sent ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-turq text-2xl text-ink">
                  &#10003;
                </span>
                <h3 className="display-md mt-6 text-cream">Thank you</h3>
                <p className="mt-3 max-w-xs text-sm text-cream/60">
                  Your request is in. Our team will reach out within one business
                  day.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-6">
                <Field label="Full name">
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    className="field"
                  />
                </Field>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      placeholder="you@email.com"
                      className="field"
                    />
                  </Field>
                  <Field label="Phone">
                    <input type="tel" placeholder="07X XXX XXXX" className="field" />
                  </Field>
                </div>
                <Field label="I'm interested in">
                  <select className="field" defaultValue={INTERESTS[0]}>
                    {INTERESTS.map((o) => (
                      <option key={o} className="bg-ink">
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Message">
                  <textarea
                    rows={3}
                    placeholder="Tell us what you're after…"
                    className="field resize-none"
                  />
                </Field>

                <div className="pt-2">
                  <MagneticButton href="#contact" onClick={submit} className="w-full">
                    Send pre-order request
                    <span aria-hidden="true">&#8594;</span>
                  </MagneticButton>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>

      <style jsx global>{`
        .field {
          width: 100%;
          border-bottom: 1px solid color-mix(in srgb, #f2f1ed 18%, transparent);
          background: transparent;
          padding: 0.6rem 0;
          font-size: 0.95rem;
          color: var(--color-cream);
          transition: border-color 0.3s ease;
          outline: none;
        }
        .field::placeholder {
          color: color-mix(in srgb, #f2f1ed 35%, transparent);
        }
        .field:focus {
          border-color: var(--color-turq);
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="label-mono mb-2 block text-muted">{label}</span>
      {children}
    </label>
  );
}
