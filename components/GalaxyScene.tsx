"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const N = 12;

// WindMar planet accents
const ACCENTS = [
  "#f89b24",
  "#ffc06a",
  "#7ea6ff",
  "#1d6bff",
  "#ff8a3c",
  "#a9c2ff",
  "#ffb24d",
  "#4f86ff",
  "#ffd29a",
  "#6ea0ff",
  "#f89b24",
  "#9ab8ff",
];

function planetPos(i: number) {
  const ang = i * 2.3 + 0.6;
  const rad = 7 + i * 2.15;
  return new THREE.Vector3(Math.cos(ang) * rad, Math.sin(i * 0.7) * 3, Math.sin(ang) * rad);
}

function scrollT() {
  if (typeof window === "undefined") return 0;
  return Math.min(N - 1, Math.max(0, window.scrollY / window.innerHeight));
}

function makeStarTex() {
  const s = 64;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const g = c.getContext("2d")!;
  const rad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  rad.addColorStop(0, "rgba(255,255,255,1)");
  rad.addColorStop(0.3, "rgba(255,255,255,0.85)");
  rad.addColorStop(0.6, "rgba(255,255,255,0.28)");
  rad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = rad;
  g.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}

function makeNebTex(rgb: string) {
  const s = 256;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const g = c.getContext("2d")!;
  const rad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  rad.addColorStop(0, `rgba(${rgb},0.6)`);
  rad.addColorStop(0.5, `rgba(${rgb},0.13)`);
  rad.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = rad;
  g.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}

// distant starfield dome — deep space all around
function FarStars() {
  const ref = useRef<THREE.Points>(null);
  const tex = useMemo(() => makeStarTex(), []);
  const { pos, col } = useMemo(() => {
    const n = 2800;
    const p = new Float32Array(n * 3);
    const c = new Float32Array(n * 3);
    const tint = new THREE.Color("#cfe0ff");
    for (let i = 0; i < n; i++) {
      const r = 75 + Math.random() * 65;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 2 - 1);
      p.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th)], i * 3);
      const cc = tint.clone().offsetHSL((Math.random() - 0.5) * 0.12, 0, (Math.random() - 0.5) * 0.35);
      c.set([cc.r, cc.g, cc.b], i * 3);
    }
    return { pos: p, col: c };
  }, []);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.004;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[col, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.8}
        map={tex}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// drifting nebula clouds (orange / blue / violet) far behind
function NebulaClouds() {
  const ref = useRef<THREE.Group>(null);
  const clouds = useMemo(
    () => [
      { p: [-48, 8, -58] as [number, number, number], s: 72, rgb: "248,150,50" },
      { p: [56, -12, -64] as [number, number, number], s: 84, rgb: "40,90,220" },
      { p: [6, 30, -88] as [number, number, number], s: 98, rgb: "130,80,255" },
    ],
    []
  );
  const texes = useMemo(() => clouds.map((c) => makeNebTex(c.rgb)), [clouds]);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.006;
  });
  return (
    <group ref={ref}>
      {clouds.map((c, i) => (
        <sprite key={i} position={c.p} scale={[c.s, c.s, 1]}>
          <spriteMaterial
            map={texes[i]}
            transparent
            opacity={0.5}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}

function Galaxy() {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const count = 11000;
    const radius = 32;
    const branches = 3;
    const spin = 1.1;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const inside = new THREE.Color("#ffb066");
    const outside = new THREE.Color("#2f6bff");
    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 1.6) * radius;
      const branch = ((i % branches) / branches) * Math.PI * 2;
      const spinA = r * spin * 0.08;
      const rand = () => (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (r * 0.12 + 0.5));
      const x = Math.cos(branch + spinA) * r + rand();
      const y = rand() * 0.5;
      const z = Math.sin(branch + spinA) * r + rand();
      positions.set([x, y, z], i * 3);
      const c = inside.clone().lerp(outside, Math.min(1, r / radius));
      if (Math.random() < 0.08) c.set("#ffffff");
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, []);

  // soft round star sprite (kills the square-pixel look)
  const starTex = useMemo(() => {
    const s = 64;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const g = c.getContext("2d")!;
    const rad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    rad.addColorStop(0, "rgba(255,255,255,1)");
    rad.addColorStop(0.25, "rgba(255,255,255,0.9)");
    rad.addColorStop(0.55, "rgba(255,255,255,0.32)");
    rad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = rad;
    g.fillRect(0, 0, s, s);
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.04 + scrollT() * 0.0008;
  });

  return (
    <points ref={ref} rotation={[-0.42, 0, 0.16]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.55}
        map={starTex}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// procedural cratered/banded planet texture so planets aren't flat
function makePlanetTexture(hex: string) {
  const s = 256;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const g = c.getContext("2d")!;
  const base = new THREE.Color(hex);
  const rgb = (col: THREE.Color, a: number) =>
    `rgba(${(col.r * 255) | 0},${(col.g * 255) | 0},${(col.b * 255) | 0},${a})`;
  g.fillStyle = rgb(base, 1);
  g.fillRect(0, 0, s, s);
  // gas-giant bands
  for (let y = 0; y < s; y++) {
    const d = Math.sin(y * 0.05) * 0.14 + Math.sin(y * 0.013) * 0.1 + (Math.random() - 0.5) * 0.04;
    g.fillStyle = rgb(base.clone().offsetHSL(0, 0, d), 0.22);
    g.fillRect(0, y, s, 1);
  }
  // craters / mottling
  for (let i = 0; i < 1500; i++) {
    const x = Math.random() * s,
      y = Math.random() * s,
      r = Math.random() * 6 + 0.6;
    const col = base.clone().offsetHSL(0, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.6);
    g.fillStyle = rgb(col, 0.08 + Math.random() * 0.22);
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  }
  // polar caps (lighter)
  const cap = (yc: number) => {
    const grd = g.createRadialGradient(s / 2, yc, 2, s / 2, yc, s * 0.42);
    grd.addColorStop(0, rgb(base.clone().offsetHSL(0, -0.25, 0.4), 0.5));
    grd.addColorStop(1, rgb(base, 0));
    g.fillStyle = grd;
    g.fillRect(0, 0, s, s);
  };
  cap(0);
  cap(s);
  // soft sheen
  const sh = g.createRadialGradient(s * 0.34, s * 0.3, 2, s * 0.34, s * 0.3, s * 0.55);
  sh.addColorStop(0, "rgba(255,255,255,0.18)");
  sh.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = sh;
  g.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function Planet({ i, pos, color, ring }: { i: number; pos: THREE.Vector3; color: string; ring?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const [hover, setHover] = useState(false);
  const tex = useMemo(() => makePlanetTexture(color), [color]);

  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.3;
    const t = scrollT();
    const near = Math.max(0, 1 - Math.abs(i - t));
    const target = (hover ? 1.4 : 1) + near * 0.35;
    group.current.scale.lerp(new THREE.Vector3(target, target, target), 0.12);
    if (mat.current) mat.current.emissiveIntensity = 0.22 + near * 0.9 + (hover ? 0.45 : 0);
  });

  return (
    <group
      ref={group}
      position={pos}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        window.scrollTo({ top: i * window.innerHeight, behavior: "smooth" });
      }}
    >
      <mesh>
        <sphereGeometry args={[0.85, 48, 48]} />
        <meshStandardMaterial
          ref={mat}
          map={tex}
          bumpMap={tex}
          bumpScale={0.3}
          color="#ffffff"
          emissive={color}
          emissiveIntensity={0.28}
          roughness={0.82}
          metalness={0.12}
        />
      </mesh>
      {/* glow shell */}
      <mesh scale={1.45}>
        <sphereGeometry args={[0.8, 18, 18]} />
        <meshBasicMaterial color={color} transparent opacity={0.07} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* ring (some planets) */}
      {ring && (
        <mesh rotation={[Math.PI / 2.4, 0, 0.3]}>
          <ringGeometry args={[1.25, 1.95, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      )}
    </group>
  );
}

function Asteroids() {
  const ref = useRef<THREE.Group>(null);
  const rocks = useMemo(
    () =>
      Array.from({ length: 70 }, () => ({
        p: [
          (Math.random() * 2 - 1) * 40,
          (Math.random() * 2 - 1) * 14,
          (Math.random() * 2 - 1) * 40,
        ] as [number, number, number],
        s: 0.12 + Math.random() * 0.32,
        r: [Math.random() * 6, Math.random() * 6, Math.random() * 6] as [number, number, number],
      })),
    []
  );
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.012;
  });
  return (
    <group ref={ref}>
      {rocks.map((rk, i) => (
        <mesh key={i} position={rk.p} scale={rk.s} rotation={rk.r}>
          <dodecahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#566075" roughness={1} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function Rig({ positions }: { positions: THREE.Vector3[] }) {
  const { camera } = useThree();
  const focus = useRef(new THREE.Vector3(positions[0].x, positions[0].y, positions[0].z));
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(() => {
    const t = scrollT();
    const i0 = Math.floor(t);
    const i1 = Math.min(N - 1, i0 + 1);
    const f = t - i0;
    const fp = positions[i0].clone().lerp(positions[i1], f);
    focus.current.lerp(fp, 0.08);

    const dir = focus.current.clone();
    dir.y = 0;
    if (dir.lengthSq() < 0.001) dir.set(0, 0, 1);
    dir.normalize();
    const camTarget = focus.current
      .clone()
      .add(dir.multiplyScalar(12.5))
      .add(new THREE.Vector3(mouse.current.x * 2.5, 3.8 + mouse.current.y * 1.5, 0));
    camera.position.lerp(camTarget, 0.06);
    camera.lookAt(focus.current);
  });
  return null;
}

export default function GalaxyScene() {
  const positions = useMemo(() => Array.from({ length: N }, (_, i) => planetPos(i)), []);
  return (
    <Canvas
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 0 }}
      camera={{ position: [0, 4, 20], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, 0]} intensity={2.2} color="#ffae57" distance={150} decay={1.5} />
      <pointLight position={[20, 10, 20]} intensity={0.6} color="#3a6cff" distance={120} decay={1.7} />
      <FarStars />
      <NebulaClouds />
      <Galaxy />
      {positions.map((p, i) => (
        <Planet key={i} i={i} pos={p} color={ACCENTS[i % ACCENTS.length]} ring={i === 3 || i === 7 || i === 10} />
      ))}
      {positions.slice(0, -1).map((p, i) => (
        <Line
          key={i}
          points={[
            [p.x, p.y, p.z],
            [positions[i + 1].x, positions[i + 1].y, positions[i + 1].z],
          ]}
          color="#5a86ff"
          lineWidth={1}
          transparent
          opacity={0.28}
          dashed={false}
        />
      ))}
      <Asteroids />
      <Rig positions={positions} />
    </Canvas>
  );
}
