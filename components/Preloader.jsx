"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function Preloader({ setVideoUrl }) {
  const root = useRef(null);
  const countRef = useRef(null);
  const [done, setDone] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const progressObj = useRef({ value: 0 });

  // Preload video during preloader active phase
  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function startDownload() {
      try {
        const response = await fetch("/hero-vid.mp4", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }

        const contentLength = response.headers.get("content-length");
        const total = contentLength ? parseInt(contentLength, 10) : 0;

        if (total === 0) {
          const blob = await response.blob();
          if (active) {
            const objectUrl = URL.createObjectURL(blob);
            setVideoUrl(objectUrl);
            setDownloadProgress(100);
          }
          return;
        }

        const reader = response.body.getReader();
        let loaded = 0;
        const chunks = [];

        while (true) {
          const { done: readerDone, value } = await reader.read();
          if (readerDone) break;

          chunks.push(value);
          loaded += value.length;

          if (active) {
            const pct = Math.round((loaded / total) * 100);
            // Cap at 99 so we only trigger the final exit sequence when URL is ready
            setDownloadProgress(Math.min(pct, 99));
          }
        }

        if (!active) return;

        const blob = new Blob(chunks, { type: "video/mp4" });
        const objectUrl = URL.createObjectURL(blob);
        setVideoUrl(objectUrl);
        setDownloadProgress(100);
      } catch (err) {
        console.error("Failed to preload hero video:", err);
        if (active) {
          // Fallback to static URL
          setVideoUrl("/hero-vid.mp4");
          setDownloadProgress(100);
        }
      }
    }

    startDownload();

    return () => {
      active = false;
      controller.abort();
    };
  }, [setVideoUrl]);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setDone(true);
        return;
      }

      document.documentElement.style.overflow = "hidden";
    },
    { scope: root }
  );

  useGSAP(
    () => {
      const target = downloadProgress;
      const isFinished = target === 100;

      // Animate progress text count from 0 to 100
      gsap.to(progressObj.current, {
        value: target,
        duration: isFinished ? 0.8 : 0.3,
        ease: isFinished ? "power2.out" : "power1.out",
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = String(
              Math.round(progressObj.current.value)
            ).padStart(3, "0");
          }
        },
        onComplete: () => {
          if (isFinished) {
            // Play exit curtain animation
            const tl = gsap.timeline({
              onComplete: () => {
                document.documentElement.style.overflow = "";
                setDone(true);
              },
            });

            tl.to("[data-pl-logo]", {
              autoAlpha: 0,
              y: -20,
              duration: 0.5,
              ease: "power2.in",
            })
              .to("[data-pl-count]", { autoAlpha: 0, duration: 0.3 }, "<")
              .to(
                root.current,
                { yPercent: -100, duration: 0.9, ease: "expo.inOut" },
                "-=0.1"
              );
          }
        },
      });
    },
    { dependencies: [downloadProgress], scope: root }
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
    >
      <div data-pl-logo className="flex flex-col items-center">
        <span className="font-display text-3xl font-black uppercase tracking-tight text-cream md:text-5xl">
          Thermal<span className="text-turq">R</span>
        </span>
        <span className="eyebrow mt-4 !text-muted">Sustainable Mobility</span>
      </div>

      <div
        data-pl-count
        className="absolute bottom-8 right-8 font-mono text-sm text-turq"
      >
        <span ref={countRef}>000</span>
        <span className="text-muted"> / 100</span>
      </div>
    </div>
  );
}
