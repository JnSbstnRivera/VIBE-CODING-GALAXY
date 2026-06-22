"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { slides } from "./slides";

const GalaxyScene = dynamic(() => import("./GalaxyScene"), { ssr: false });

export default function Deck() {
  const [active, setActive] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const t = Math.min(slides.length - 1, Math.max(0, window.scrollY / window.innerHeight));
      const a = Math.round(t);
      const frac = Math.abs(t - a);
      // content fades out between planets (immersive transition), sharp on a planet
      if (overlayRef.current) overlayRef.current.style.opacity = String(Math.max(0, 1 - frac * 2.1));
      if (a !== activeRef.current) {
        activeRef.current = a;
        setActive(a);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
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
      <div className="pointer-events-none fixed inset-0 z-10 flex items-center">
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
              background: i === active ? "#f89b24" : "rgba(255,255,255,0.25)",
              boxShadow: i === active ? "0 0 10px #f89b24" : "none",
              transform: i === active ? "scale(1.4)" : "scale(1)",
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none fixed bottom-5 left-1/2 z-20 -translate-x-1/2 text-[11px] uppercase tracking-[0.25em] text-white/55">
        Scroll para volar · clic en un planeta ↔
      </div>
    </>
  );
}
