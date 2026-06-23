"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { slides } from "./slides";

const GalaxyScene = dynamic(() => import("./GalaxyScene"), { ssr: false });

export default function Deck() {
  const [active, setActive] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);

  const goTo = (i: number) => {
    const target = Math.max(0, Math.min(slides.length - 1, i));
    window.scrollTo({ top: target * window.innerHeight, behavior: "smooth" });
  };

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const t = Math.min(slides.length - 1, Math.max(0, window.scrollY / window.innerHeight));
      const a = Math.round(t);
      const frac = Math.abs(t - a);
      if (overlayRef.current) overlayRef.current.style.opacity = String(Math.max(0, 1 - frac * 2.1));
      if (a !== activeRef.current) {
        activeRef.current = a;
        setActive(a);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); goTo(activeRef.current + 1); }
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   { e.preventDefault(); goTo(activeRef.current - 1); }
    };
    window.addEventListener("keydown", onKey);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("keydown", onKey); };
  }, []);

  const s = slides[active];

  return (
    <>
      <GalaxyScene />

      {/* legibility scrim + edge vignette (frameless, just a calm dark pocket for the text) */}
      <div
        className="pointer-events-none fixed inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(72% 82% at 50% 50%, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 46%, rgba(0,0,0,0) 78%)",
        }}
      />

      {/* vertical scroll room → flying between planets */}
      <div style={{ height: `${slides.length * 100}vh` }} aria-hidden />

      {/* floating content for the focused planet (frameless) */}
      <div className="pointer-events-none fixed inset-0 z-10 flex items-center py-16 overflow-hidden">
        <div ref={overlayRef} className="w-full px-[7vw]">
          <div
            key={active}
            className={`planet-card planet-enter pointer-events-auto mx-auto max-w-4xl ${
              s.align === "center" ? "text-center" : ""
            }`}
          >
            {s.node}
          </div>
        </div>
      </div>

      {/* progress dots */}
      <div className="pointer-events-none fixed right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        {slides.map((_, i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full transition-all"
            style={{
              background: i === active ? "#2ee6c5" : "rgba(255,255,255,0.25)",
              boxShadow: i === active ? "0 0 10px #2ee6c5" : "none",
              transform: i === active ? "scale(1.4)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* prev / next buttons */}
      <div className="fixed bottom-6 left-1/2 z-20 -translate-x-1/2 flex items-center gap-5">
        <button
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/70 backdrop-blur transition hover:border-teal-400/60 hover:text-teal-300 disabled:opacity-20"
          aria-label="Anterior"
        >
          ←
        </button>
        <span className="text-[11px] uppercase tracking-[0.22em] text-white/40 select-none">
          {active + 1} / {slides.length}
        </span>
        <button
          onClick={() => goTo(active + 1)}
          disabled={active === slides.length - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/70 backdrop-blur transition hover:border-teal-400/60 hover:text-teal-300 disabled:opacity-20"
          aria-label="Siguiente"
        >
          →
        </button>
      </div>
    </>
  );
}
