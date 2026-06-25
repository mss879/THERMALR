"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Blog", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const bar = useRef(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  // intro
  useEffect(() => {
    gsap.fromTo(
      bar.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 1.1 }
    );
  }, []);

  // track scrolled state for styles
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        ref={bar}
        className="fixed inset-x-0 top-0 z-50 flex justify-center m-0 p-0"
        style={{ opacity: 0, top: "0px" }}
      >
        <div
          className={`nav-trapezoid relative flex w-[94vw] md:w-[85vw] max-w-6xl items-center justify-between bg-turq/95 backdrop-blur-md px-6 py-[3px] shadow-lg transition-colors duration-500 md:px-14 md:py-[4px]`}
        >
          {/* top accent line */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-ink z-20" />

          {/* logo */}
          <a
            href="#top"
            onClick={(e) => go(e, "#top")}
            className="flex items-center gap-2"
            aria-label="ThermalR home"
          >
            <Image
              src="/logo.png"
              alt="ThermalR"
              width={250}
              height={60}
              priority
              className="h-[50px] md:h-[60px] w-auto brightness-0 transition-opacity duration-300 hover:opacity-85"
              style={{ width: "auto" }}
            />
          </a>

          {/* desktop links */}
          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => go(e, l.href)}
                data-cursor="hover"
                className="group relative rounded-full px-4 py-2 text-[0.8rem] font-bold tracking-wider uppercase text-ink/75 transition-colors hover:text-ink font-display"
              >
                {l.label}
                <span className="absolute inset-x-4 bottom-1.5 h-0.5 origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* cta + burger */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => go(e, "#contact")}
              data-cursor="hover"
              className="hidden px-6 py-2 text-[0.78rem] font-bold tracking-wider uppercase text-ink border border-ink/30 bg-ink/5 transition-all duration-300 hover:bg-ink hover:text-cream hover:border-ink hover:shadow-[0_0_15px_rgba(6,6,8,0.2)] skew-x-[-15deg] sm:inline-flex font-display"
            >
              <span className="block skew-x-[15deg]">Pre-Order</span>
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 md:hidden ${
                open ? "border-cream/15 text-cream" : "border-ink/15 text-ink"
              }`}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 top-0 h-px w-full transition-transform duration-300 ${
                    open ? "translate-y-1.5 rotate-45 bg-cream" : "bg-ink"
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full transition-transform duration-300 ${
                    open ? "-translate-y-1.5 -rotate-45 bg-cream" : "bg-ink"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 transition-[opacity,visibility] duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2">
          {LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="display-md py-1 text-cream transition-colors hover:text-turq"
              style={{
                transform: open ? "translateY(0)" : "translateY(20px)",
                opacity: open ? 1 : 0,
                transition: `transform .5s ${0.05 * i + 0.1}s var(--ease-out-expo), opacity .5s ${
                  0.05 * i + 0.1
                }s ease`,
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="mt-12 eyebrow">Contact · 076 687 2777</div>
      </div>

      <style jsx>{`
        .nav-trapezoid {
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 18px 100%);
        }
        @media (min-width: 768px) {
          .nav-trapezoid {
            clip-path: polygon(0 0, 100% 0, calc(100% - 36px) 100%, 36px 100%);
          }
        }
      `}</style>
    </>
  );
}
