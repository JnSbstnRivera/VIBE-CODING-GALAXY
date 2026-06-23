"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Stars, Sparkles, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { createNoise2D } from "simplex-noise";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { slides } from "./slides";

const N = slides.length;

// teal / cyan + orange accents
const ACCENTS = [
  "#2ee6c5",
  "#38bdf8",
  "#f89b24",
  "#5eead4",
  "#67d4ff",
  "#ffb24d",
  "#22d3ee",
  "#34e3c4",
  "#7dd3fc",
  "#f89b24",
  "#2ee6c5",
  "#5cc8ff",
  "#ffb24d",
  "#5eead4",
];

function planetPos(i: number) {
  const ang = i * 2.3 + 0.6;
  const rad = 7 + i * 2.1;
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

// rich procedural planet surface via simplex-noise (fBm + latitude bands)
function makePlanetTexture(hex: string) {
  const noise = createNoise2D();
  const s = 256;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const g = c.getContext("2d")!;
  const base = new THREE.Color(hex);
  const img = g.createImageData(s, s);
  const d = img.data;
  const tmp = new THREE.Color();
  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      let n = 0,
        amp = 0.5,
        freq = 0.014;
      for (let o = 0; o < 5; o++) {
        n += noise(x * freq, y * freq) * amp;
        freq *= 2;
        amp *= 0.5;
      }
      n += Math.sin(y * 0.05) * 0.22; // gas-giant banding
      const pole = 1 - Math.abs((y / s) * 2 - 1) * 0.5; // darker poles
      const l = THREE.MathUtils.clamp(0.5 + n * 0.55, 0, 1) * pole;
      tmp.copy(base).offsetHSL(0, (n) * 0.06, (l - 0.5) * 0.75);
      const idx = (y * s + x) * 4;
      d[idx] = (tmp.r * 255) | 0;
      d[idx + 1] = (tmp.g * 255) | 0;
      d[idx + 2] = (tmp.b * 255) | 0;
      d[idx + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function Galaxy() {
  const ref = useRef<THREE.Points>(null);
  const tex = useMemo(() => makeStarTex(), []);
  const { positions, colors } = useMemo(() => {
    const count = 11000;
    const radius = 32;
    const branches = 3;
    const spin = 1.1;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const inside = new THREE.Color("#9ff5e0");
    const outside = new THREE.Color("#2bb8ff");
    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 1.6) * radius;
      const branch = ((i % branches) / branches) * Math.PI * 2;
      const spinA = r * spin * 0.08;
      const rand = () => Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (r * 0.12 + 0.5);
      const x = Math.cos(branch + spinA) * r + rand();
      const y = rand() * 0.5;
      const z = Math.sin(branch + spinA) * r + rand();
      positions.set([x, y, z], i * 3);
      const c = inside.clone().lerp(outside, Math.min(1, r / radius));
      const roll = Math.random();
      if (roll < 0.07) c.set("#f89b24"); // orange sparkle
      else if (roll < 0.14) c.set("#ffffff");
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
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
        map={tex}
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

function NebulaClouds() {
  const ref = useRef<THREE.Group>(null);
  const clouds = useMemo(
    () => [
      { p: [-48, 8, -58] as [number, number, number], s: 72, rgb: "46,230,197" },
      { p: [56, -12, -64] as [number, number, number], s: 84, rgb: "56,189,248" },
      { p: [6, 30, -88] as [number, number, number], s: 98, rgb: "248,155,36" },
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
            opacity={0.45}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}

// real deep-field photo on an inverted sphere → authentic deep space
function NebulaSky() {
  const tex = useTexture("/nebula.jpg");
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[220, 40, 40]} />
      <meshBasicMaterial map={tex} side={THREE.BackSide} transparent opacity={0.5} depthWrite={false} toneMapped={false} />
    </mesh>
  );
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
      <mesh scale={1.45}>
        <sphereGeometry args={[0.8, 18, 18]} />
        <meshBasicMaterial color={color} transparent opacity={0.07} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {ring && (
        <mesh rotation={[Math.PI / 2.4, 0, 0.3]}>
          <ringGeometry args={[1.25, 1.95, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      )}
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
      <pointLight position={[0, 0, 0]} intensity={1.8} color="#5fe9d0" distance={150} decay={1.5} />
      <pointLight position={[20, 10, 20]} intensity={0.6} color="#f89b24" distance={120} decay={1.7} />

      <Suspense fallback={null}>
        <NebulaSky />
      </Suspense>
      <Stars radius={140} depth={70} count={3500} factor={4} saturation={0} fade speed={0.6} />
      <Sparkles count={70} scale={[70, 34, 70]} size={3} speed={0.25} color="#9ff5e0" opacity={0.7} />
      <NebulaClouds />
      <Galaxy />

      {positions.map((p, i) => (
        <Planet key={i} i={i} pos={p} color={ACCENTS[i % ACCENTS.length]} ring={i === 3 || i === 7 || i === 11} />
      ))}
      {positions.slice(0, -1).map((p, i) => (
        <Line
          key={i}
          points={[
            [p.x, p.y, p.z],
            [positions[i + 1].x, positions[i + 1].y, positions[i + 1].z],
          ]}
          color="#3fe0c8"
          lineWidth={1}
          transparent
          opacity={0.26}
          dashed={false}
        />
      ))}

      <Rig positions={positions} />

      <EffectComposer>
        <Bloom intensity={0.75} luminanceThreshold={0.25} luminanceSmoothing={0.4} mipmapBlur />
        <Vignette offset={0.22} darkness={0.9} eskil={false} />
        <Noise opacity={0.04} />
      </EffectComposer>
    </Canvas>
  );
}
