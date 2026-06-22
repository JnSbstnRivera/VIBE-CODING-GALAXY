"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; z: number; s: number; b: number; t: number; tw: number };

export default function GalaxyBackground() {
  const bgRef = useRef<HTMLCanvasElement>(null);
  const fgRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const bg = bgRef.current!;
    const fg = fgRef.current!;
    const bx = bg.getContext("2d")!;
    const fx = fg.getContext("2d")!;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0,
      H = 0,
      raf = 0;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      for (const c of [bg, fg]) {
        c.width = W * DPR;
        c.height = H * DPR;
      }
      bx.setTransform(DPR, 0, 0, DPR, 0, 0);
      fx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    window.addEventListener("resize", resize);
    resize();

    const sprite = (rgb: string) => {
      const s = 64;
      const c = document.createElement("canvas");
      c.width = c.height = s;
      const g = c.getContext("2d")!;
      const rad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      rad.addColorStop(0, "rgba(255,255,255,0.95)");
      rad.addColorStop(0.25, `rgba(${rgb},0.85)`);
      rad.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = rad;
      g.fillRect(0, 0, s, s);
      return c;
    };
    // WindMar palette: white, light blue, brand orange, brand blue, warm gold
    const tints = [
      sprite("255,255,255"),
      sprite("150,185,255"),
      sprite("248,155,36"),
      sprite("80,130,235"),
      sprite("255,200,130"),
    ];

    const neb = (rgb: string) => {
      const s = 512;
      const c = document.createElement("canvas");
      c.width = c.height = s;
      const g = c.getContext("2d")!;
      const rad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      rad.addColorStop(0, `rgba(${rgb},0.4)`);
      rad.addColorStop(0.4, `rgba(${rgb},0.12)`);
      rad.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = rad;
      g.fillRect(0, 0, s, s);
      return c;
    };
    // WindMar nebula: orange glow, brand blue, deep blue
    const nebs = [neb("248,155,36"), neb("40,90,200"), neb("20,55,140")];

    const disk: P[] = [];
    const TURNS = 2.6,
      ARMS = 3,
      ND = 1000;
    for (let i = 0; i < ND; i++) {
      const t = Math.pow(Math.random(), 0.6);
      const arm = i % ARMS;
      const ang = arm * ((Math.PI * 2) / ARMS) + t * TURNS * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
      const tint = t < 0.25 ? 0 : t < 0.5 ? (Math.random() < 0.6 ? 2 : 1) : Math.random() < 0.5 ? 3 : 4;
      disk.push({
        x: Math.cos(ang) * t,
        y: Math.sin(ang) * t,
        z: (Math.random() - 0.5) * 0.05 * (1 - t * 0.6),
        s: (t < 0.2 ? 2.6 : 1.6) * (0.7 + Math.random() * 0.7),
        b: 0.5 + 0.5 * (1 - t),
        t: tint,
        tw: 0,
      });
    }
    const stars: P[] = [];
    const NS = 420;
    for (let j = 0; j < NS; j++)
      stars.push({
        x: (Math.random() * 2 - 1) * 1.6,
        y: (Math.random() * 2 - 1) * 1.6,
        z: (Math.random() * 2 - 1) * 1.6,
        s: 0.6 + Math.random() * 1.8,
        b: 0.3 + Math.random() * 0.6,
        t: Math.random() < 0.7 ? 0 : 1,
        tw: Math.random() * 6.28,
      });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let mx = 0,
      my = 0,
      tmx = 0,
      tmy = 0;
    const onMove = (e: PointerEvent) => {
      tmx = (e.clientX / W) * 2 - 1;
      tmy = (e.clientY / H) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const prog = () => {
      const se = document.scrollingElement || document.documentElement;
      const m = se.scrollHeight - se.clientHeight;
      return m > 0 ? Math.min(1, Math.max(0, se.scrollTop / m)) : 0;
    };

    const start = performance.now();
    function frame(now: number) {
      const time = (now - start) / 1000;
      const p = prog();
      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;
      bx.clearRect(0, 0, W, H);
      fx.clearRect(0, 0, W, H);

      // nebula clouds, centered
      bx.globalCompositeOperation = "lighter";
      const cx = W / 2 + mx * 30;
      const cy = H * 0.52 + my * 22;
      for (let n = 0; n < nebs.length; n++) {
        const na = time * 0.01 * (n + 1) + n * 2;
        const nr = Math.min(W, H) * (1.0 + n * 0.28);
        const nx = cx + Math.cos(na) * W * 0.08;
        const ny = cy + Math.sin(na * 0.8) * H * 0.06;
        bx.globalAlpha = 0.42;
        bx.drawImage(nebs[n], nx - nr / 2, ny - nr / 2, nr, nr);
      }

      // spins LEFT -> RIGHT, driven mainly by scroll (reverses on scroll-up) + gentle idle drift
      const spin = p * Math.PI * 2 * 2.5 + time * (reduce ? 0.01 : 0.05) + mx * 0.2;
      const tilt = 0.98 + my * 0.16 - p * 0.14;
      const D = 1.8 - p * 0.5;
      const spread = Math.min(W, H) * 0.72;
      const cs = Math.cos(spin),
        sn = Math.sin(spin),
        ct = Math.cos(tilt),
        st = Math.sin(tilt);

      const plot = (pt: P, canFront: boolean, twk: boolean) => {
        const x1 = pt.x * cs - pt.y * sn;
        const y1 = pt.x * sn + pt.y * cs;
        const y2 = y1 * ct - pt.z * st;
        const z2 = y1 * st + pt.z * ct;
        const zc = z2 + D;
        if (zc <= 0.05) return;
        const sc = 1 / zc;
        const sx = cx + x1 * sc * spread;
        const sy = cy + y2 * sc * spread;
        if (sx < -80 || sx > W + 80 || sy < -80 || sy > H + 80) return;
        const size = pt.s * sc * 1.4;
        let a = pt.b * Math.min(1, sc * 0.9);
        if (twk) a *= 0.6 + 0.4 * Math.sin(time * 3 + pt.tw);
        if (a <= 0.01) return;
        const front = canFront && zc < D * 0.55;
        const ctx = front ? fx : bx;
        if (front) a *= 0.7;
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = Math.min(1, a);
        ctx.drawImage(tints[pt.t], sx - size, sy - size, size * 2, size * 2);
      };

      for (const d of disk) plot(d, false, false);
      for (const s of stars) plot(s, true, true);

      bx.globalAlpha = 1;
      fx.globalAlpha = 1;
      bx.globalCompositeOperation = "source-over";
      fx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <canvas ref={bgRef} className="fixed inset-0 h-full w-full -z-10 pointer-events-none" />
      <canvas ref={fgRef} className="fixed inset-0 h-full w-full z-30 pointer-events-none" />
    </>
  );
}
