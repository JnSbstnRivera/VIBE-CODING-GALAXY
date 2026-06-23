"use client";

import { useEffect, useRef } from "react";

type Part = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  ms: number;
  mf: number;
  sz: number;
  sc: [number, number, number];
  tc: [number, number, number];
  w: number;
  br: number;
  dead: boolean;
};

// teal / cyan + orange accent + white
const PALETTE: [number, number, number][] = [
  [46, 230, 197],
  [56, 189, 248],
  [248, 155, 36],
  [255, 255, 255],
];

export default function ParticleText({
  text = "VIBE CODING",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const parts: Part[] = [];
    let W = 0,
      H = 0,
      raf = 0;
    const mouse = { x: -9999, y: -9999, down: false };
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    function fitFont(o: CanvasRenderingContext2D, t: string, maxW: number, maxH: number) {
      let size = Math.min(maxH * 0.64, 380);
      o.font = `900 ${size}px Arial, Helvetica, sans-serif`;
      while (size > 18 && o.measureText(t).width > maxW * 0.94) {
        size -= 4;
        o.font = `900 ${size}px Arial, Helvetica, sans-serif`;
      }
      return size;
    }

    function build() {
      const parent = cv.parentElement!;
      W = cv.width = Math.max(2, Math.floor(parent.clientWidth * DPR));
      H = cv.height = Math.max(2, Math.floor(parent.clientHeight * DPR));
      const oc = document.createElement("canvas");
      oc.width = W;
      oc.height = H;
      const o = oc.getContext("2d")!;
      o.fillStyle = "#fff";
      o.textAlign = "center";
      o.textBaseline = "middle";
      const words = text.split(" ");
      let size = fitFont(o, text, W, H);
      let lines = [text];
      if (words.length > 1 && o.measureText(text).width > W * 0.86) {
        const mid = Math.ceil(words.length / 2);
        lines = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
        const longer = lines[0].length >= lines[1].length ? lines[0] : lines[1];
        size = fitFont(o, longer, W, H);
      }
      o.font = `900 ${size}px Arial, Helvetica, sans-serif`;
      const lh = size * 1.05;
      const sy = H / 2 - ((lines.length - 1) * lh) / 2;
      lines.forEach((ln, i) => o.fillText(ln, W / 2, sy + i * lh));

      const data = o.getImageData(0, 0, W, H).data;
      const step = Math.max(3, Math.round(4 * DPR));
      const coords: number[] = [];
      for (let y = 0; y < H; y += step)
        for (let x = 0; x < W; x += step) if (data[(y * W + x) * 4 + 3] > 130) coords.push(x, y);
      const n = coords.length / 2;
      for (let i = n - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        const ax = coords[i * 2],
          ay = coords[i * 2 + 1];
        coords[i * 2] = coords[j * 2];
        coords[i * 2 + 1] = coords[j * 2 + 1];
        coords[j * 2] = ax;
        coords[j * 2 + 1] = ay;
      }
      const col = PALETTE[(Math.random() * PALETTE.length) | 0];
      let k = 0;
      for (; k < n; k++) {
        let p = parts[k];
        if (!p) {
          p = {
            x: rnd(0, W),
            y: rnd(0, H),
            vx: 0,
            vy: 0,
            tx: 0,
            ty: 0,
            ms: rnd(4, 10) * DPR,
            mf: 0,
            sz: rnd(1.7, 3.8) * DPR,
            sc: [0, 0, 0],
            tc: [0, 0, 0],
            w: 0,
            br: rnd(0.012, 0.03),
            dead: false,
          };
          p.mf = p.ms * 0.05;
          parts.push(p);
        }
        p.sc = [
          p.sc[0] + (p.tc[0] - p.sc[0]) * p.w,
          p.sc[1] + (p.tc[1] - p.sc[1]) * p.w,
          p.sc[2] + (p.tc[2] - p.sc[2]) * p.w,
        ];
        p.tc = Math.random() < 0.16 ? [255, 255, 255] : col;
        p.w = 0;
        p.tx = coords[k * 2];
        p.ty = coords[k * 2 + 1];
        p.dead = false;
      }
      for (; k < parts.length; k++) {
        const q = parts[k];
        q.dead = true;
        q.tx = rnd(-W * 0.3, W * 1.3);
        q.ty = rnd(-H * 0.3, H * 1.3);
        q.tc = [0, 0, 0];
        q.w = 0;
      }
    }

    const ro = new ResizeObserver(() => build());
    ro.observe(cv.parentElement!);
    build();

    const toLocal = (clientX: number, clientY: number) => {
      const r = cv.getBoundingClientRect();
      return { x: ((clientX - r.left) / r.width) * W, y: ((clientY - r.top) / r.height) * H };
    };
    const onMove = (e: PointerEvent) => {
      const l = toLocal(e.clientX, e.clientY);
      mouse.x = l.x;
      mouse.y = l.y;
    };
    const onDown = () => (mouse.down = true);
    const onUp = () => (mouse.down = false);
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.down = false;
    };
    cv.parentElement!.addEventListener("pointermove", onMove);
    cv.parentElement!.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    cv.parentElement!.addEventListener("pointerleave", onLeave);

    function frame() {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.16)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      const repelR = 60 * DPR;
      for (const p of parts) {
        // mouse repel / scatter (hold to blow apart)
        if (mouse.x > -9000) {
          const ddx = p.x - mouse.x,
            ddy = p.y - mouse.y;
          const dm = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dm < repelR) {
            const f = ((repelR - dm) / repelR) * (mouse.down ? 6 : 2.2);
            p.vx += (ddx / (dm || 1)) * f;
            p.vy += (ddy / (dm || 1)) * f;
          }
        }
        const dx = p.tx - p.x,
          dy = p.ty - p.y,
          d = Math.sqrt(dx * dx + dy * dy);
        const prox = d < 100 * DPR ? d / (100 * DPR) : 1;
        const mg = d || 1;
        const stx = (dx / mg) * p.ms * prox - p.vx;
        const sty = (dy / mg) * p.ms * prox - p.vy;
        const sm = Math.sqrt(stx * stx + sty * sty) || 1;
        p.vx += (stx / sm) * p.mf;
        p.vy += (sty / sm) * p.mf;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;
        if (p.w < 1) p.w = Math.min(1, p.w + p.br);
        if (p.dead && (p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20)) continue;
        const cr = p.sc[0] + (p.tc[0] - p.sc[0]) * p.w;
        const cg = p.sc[1] + (p.tc[1] - p.sc[1]) * p.w;
        const cb = p.sc[2] + (p.tc[2] - p.sc[2]) * p.w;
        ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},0.92)`;
        ctx.fillRect(p.x, p.y, p.sz, p.sz);
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      cv.parentElement?.removeEventListener("pointermove", onMove);
      cv.parentElement?.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      cv.parentElement?.removeEventListener("pointerleave", onLeave);
    };
  }, [text]);

  return <canvas ref={ref} className={className} />;
}
