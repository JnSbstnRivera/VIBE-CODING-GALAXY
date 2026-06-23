import type { ReactNode } from "react";
import ParticleText from "./ParticleText";

type Slide = { id: string; label: string; align: "start" | "center"; node: ReactNode };

const Kicker = ({ children, cyan }: { children: ReactNode; cyan?: boolean }) => (
  <div className={cyan ? "kicker kicker-cyan" : "kicker"}>{children}</div>
);

const InfoCard = ({
  tag, title, children, bebas, orange, href,
}: {
  tag: ReactNode; title: string; children: ReactNode; bebas?: boolean; orange?: boolean; href?: string;
}) => {
  const body = (
    <div className={`glass p-2.5 ${href ? "transition-colors hover:bg-white/5" : ""}`}>
      <div className={`${bebas ? "font-bebas text-3xl" : "text-xl font-extrabold"} ${orange ? "or" : "teal"} leading-none`}>
        {tag}
      </div>
      <div className="mt-1.5 text-[15px] font-extrabold text-white">{title}</div>
      <p className="mt-1 text-[13px] leading-relaxed text-white/80">{children}</p>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>{body}</a>
  ) : body;
};

const Portrait = ({ src, alt, sm }: { src: string; alt: string; sm?: boolean }) => (
  <div className="flex justify-center">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover ${sm ? "h-36 w-36 md:h-44 md:w-44" : "h-52 w-52 md:h-64 md:w-64"}`}
      style={{ boxShadow: "0 0 0 2px rgba(46,230,197,0.6), 0 0 60px -6px rgba(46,230,197,0.6)" }}
    />
  </div>
);

export const slides: Slide[] = [
  // ─── 0 · INTRO
  {
    id: "s0",
    label: "La Intención Pura",
    align: "center",
    node: (
      <div className="flex flex-col items-center">
        <Kicker>Vibe Code &amp; Willpower</Kicker>
        <div className="relative mt-2 h-[38vh] min-h-[200px] w-full">
          <h1 className="sr-only">VIBE CODE</h1>
          <ParticleText text="VIBE CODE" className="absolute inset-0 h-full w-full" />
        </div>
        <p className="mt-3 max-w-3xl text-[19px] leading-relaxed text-white/85">
          Un recorrido desde la teoría de <strong className="font-bold text-white">Claude Shannon</strong> hasta el{" "}
          <strong className="font-bold text-white">vibe coding</strong> de Andrej Karpathy, unificados bajo la mirada de{" "}
          <strong className="font-bold text-white">Hermann Hesse</strong>.
        </p>
        <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.2em] mist">
          <span>Usa las flechas o el scroll para explorar</span>
          <span className="text-base">→</span>
        </div>
      </div>
    ),
  },

  // ─── 1 · SHANNON
  {
    id: "s1",
    label: "Claude Shannon",
    align: "start",
    node: (
      <div className="grid items-center gap-8 md:grid-cols-[190px_1fr]">
        <div className="flex flex-col items-center gap-3 text-center">
          <Portrait src="/shannon.jpg" alt="Claude Shannon" sm />
          <Kicker>01 · El Fundamento</Kicker>
          <h2 className="text-2xl md:text-3xl display teal leading-tight">Claude<br />Shannon</h2>
        </div>
        <div>
          <p className="mb-4 text-[17px] text-white/80">
            El padre de la era digital y la búsqueda incansable de la{" "}
            <strong className="font-bold text-white">precisión frente al ruido</strong>.
          </p>
          <div className="grid gap-3">
            <InfoCard tag="0 / 1" title="Reducción al Binario" bebas>
              En 1948 demostró que toda información se codifica con ceros y unos. Convirtió la comunicación en ciencia exacta y matemática.
            </InfoCard>
            <InfoCard tag="↻" title="El ratón Theseus" bebas>
              En 1950 construyó un ratón magnético que aprende laberintos solo: el primer ancestro mecánico de los agentes de IA.
            </InfoCard>
            <InfoCard tag="⚡" title="Foco absoluto" bebas>
              Su concentración era legendaria — meses aislado perfeccionando autómatas. La curiosidad pura como motor.
            </InfoCard>
          </div>
        </div>
      </div>
    ),
  },

  // ─── 2 · KARPATHY
  {
    id: "s2",
    label: "Andrej Karpathy",
    align: "start",
    node: (
      <div className="grid items-center gap-8 md:grid-cols-[190px_1fr]">
        <div className="flex flex-col items-center gap-3 text-center">
          <Portrait src="/karpathy.jpg" alt="Andrej Karpathy" sm />
          <Kicker cyan>02 · El Presente</Kicker>
          <h2 className="text-2xl md:text-3xl display teal leading-tight">Andrej<br />Karpathy</h2>
        </div>
        <div>
          <p className="mb-4 text-[17px] text-white/80">
            De programar redes neuronales línea por línea a{" "}
            <strong className="font-bold text-white">orquestar código a través de la intención</strong>.
          </p>
          <div className="grid gap-3">
            <InfoCard tag="›_" title="Vibe Coding" bebas>
              Das el control a los LLMs para generar código. Te liberas de la sintaxis y te centras en la arquitectura.
            </InfoCard>
            <InfoCard tag="↗" title="Abrazar exponenciales" bebas>
              El ritmo de creación se dispara: los prototipos se vuelven reales en minutos, no semanas.
            </InfoCard>
            <InfoCard tag="🎯" title="Director de orquesta" bebas>
              La mente define los flujos; los agentes materializan la sintaxis a partir de tu voluntad lingüística.
            </InfoCard>
          </div>
        </div>
      </div>
    ),
  },

  // ─── 3 · HESSE
  {
    id: "s3",
    label: "La Frase de Demian",
    align: "center",
    node: (
      <div className="mx-auto max-w-4xl">
        <Kicker>Hermann Hesse · Demian (1919)</Kicker>
        <p className="mt-7 text-3xl md:text-[2.6rem] font-light italic leading-snug text-white">
          "Si un animal o un ser humano concentra toda su{" "}
          <span className="not-italic font-extrabold teal">atención</span> y su{" "}
          <span className="not-italic font-extrabold teal">voluntad</span> en una cosa determinada, la consigue."
        </p>
        <div className="mt-6 text-sm tracking-[0.2em] mist">— HERMANN HESSE</div>
        <p className="mx-auto mt-8 max-w-2xl text-[18px] leading-relaxed text-white/75">
          Shannon lo demostró con el bit. Karpathy lo demuestra con el prompt. La ley es universal: la{" "}
          <strong className="font-bold text-white/90">voluntad concentrada</strong> somete el medio.
        </p>
      </div>
    ),
  },

  // ─── 4 · COHERENCIA (Marco Aurelio)
  {
    id: "s4",
    label: "La Coherencia",
    align: "start",
    node: (
      <div>
        <Kicker><span className="or">Marco Aurelio</span> · La coherencia</Kicker>
        <h2 className="mt-3 text-4xl md:text-5xl">
          <span className="font-normal text-white">Pensar, hablar y actuar —{" "}</span>
          <span className="display teal">en acuerdo</span>
        </h2>
        <p className="mt-3 max-w-2xl text-[16px] text-white/80">
          El emperador estoico lo resumió hace 19 siglos: la virtud es coherencia entre lo que piensas, dices y haces. El mismo principio gobierna el buen código.
        </p>
        <div className="mt-5 grid gap-x-8 gap-y-3 md:grid-cols-3">
          <InfoCard tag="Pensar" title="= la intención">
            Qué quieres construir y por qué. La arquitectura antes de la primera línea.
          </InfoCard>
          <InfoCard tag="Hablar" title="= el prompt">
            El lenguaje con que se lo pides a la IA: claro, específico y honesto.
          </InfoCard>
          <InfoCard tag="Actuar" title="= el código" orange>
            Lo que de verdad se ejecuta. Si los tres se alinean, el software es limpio.
          </InfoCard>
        </div>
        <p className="mt-5 text-[17px] text-white/90">
          Vibe coding sin coherencia es <strong className="font-bold text-white">ruido</strong>. Con coherencia, es{" "}
          <strong className="font-extrabold or">voluntad ejecutada</strong>.
        </p>
      </div>
    ),
  },

  // ─── 5 · LA VOLUNTAD (100%)
  {
    id: "s5",
    label: "La Voluntad",
    align: "start",
    node: (
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="text-center md:text-left">
          <div className="font-bebas text-[9rem] md:text-[11rem] leading-none teal">100%</div>
          <div className="mt-1 text-sm uppercase tracking-[0.25em] text-white/80">Atención intencional</div>
        </div>
        <div>
          <Kicker cyan>La Ley de Hesse</Kicker>
          <p className="mt-3 text-[20px] font-light italic leading-snug text-white">
            "Quien concentra toda su{" "}
            <span className="not-italic font-extrabold teal">voluntad</span>{" "}
            en una cosa, la consigue."
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-white/85">
            El vibe coding no es pereza — es canalizar el 100% de la energía mental hacia el{" "}
            <strong className="font-bold text-white">objetivo final</strong>. Sin la barrera de la sintaxis, la mente se concentra con intensidad pura en la idea.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-white/65">
            Shannon frente a la entropía. Karpathy automatizando. La misma ley, distintos medios.
          </p>
        </div>
      </div>
    ),
  },

  // ─── 6 · EVOLUCIÓN (tabla síntesis)
  {
    id: "s6",
    label: "Evolución de la Creación",
    align: "start",
    node: (
      <div>
        <Kicker>La síntesis</Kicker>
        <h2 className="mt-3 text-4xl md:text-5xl">
          <span className="font-normal text-white">Evolución de la{" "}</span>
          <span className="display teal">Creación</span>
        </h2>
        <div className="mt-4 overflow-hidden text-[13px] md:text-[14px]">
          <div className="grid grid-cols-4 gap-x-4 border-b border-white/20 pb-2.5 font-bebas tracking-wide teal">
            <div>Pilar</div>
            <div>Shannon · Teoría</div>
            <div>Karpathy · Práctica</div>
            <div>Hesse · Filosofía</div>
          </div>
          {[
            ["Elemento vital", "El bit (0 y 1)", "La intención natural", "La voluntad humana"],
            ["La barrera", "El ruido en el canal", "La sintaxis del código", "La falta de enfoque"],
            ["La herramienta", "Matemática de la información", "Agentes de IA", "La concentración pura"],
            ["La meta", "Transmisión perfecta", "Software ágil", "Lograr el destino"],
            ["La coherencia", "Transmitir sin distorsión", "Decir = ejecutar", "Querer = lograr"],
          ].map((row, i) => (
            <div key={row[0]} className={`grid grid-cols-4 gap-x-4 py-2.5 ${i < 4 ? "border-b border-white/10" : ""}`}>
              <div className="font-extrabold text-white">{row[0]}</div>
              <div className="text-white/75">{row[1]}</div>
              <div className="text-white/75">{row[2]}</div>
              <div className="text-white/75">{row[3]}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] mist">La última fila — la coherencia de Marco Aurelio — une a los tres.</p>
      </div>
    ),
  },

  // ─── 7 · ECOSISTEMA
  {
    id: "s7",
    label: "El Ecosistema",
    align: "start",
    node: (
      <div>
        <Kicker cyan>El ecosistema</Kicker>
        <h2 className="mt-2 text-4xl md:text-5xl">
          <span className="font-normal text-white">Cada herramienta,{" "}</span>
          <span className="display teal">útil a su manera</span>
        </h2>
        <p className="mt-2 max-w-2xl text-[15px] text-white/80">
          No existe una sola herramienta: cada una resuelve algo. Así se construye software real — en{" "}
          <strong className="font-bold or">WindMar Home</strong> y en cualquier lugar.
        </p>
        <div className="mt-4 grid gap-x-5 gap-y-3 md:grid-cols-3">
          <InfoCard tag="React" title="Interfaces por componentes" href="https://react.dev">
            La librería estándar para construir la web moderna, pieza a pieza.
          </InfoCard>
          <InfoCard tag="Three.js" title="3D en el navegador" href="https://threejs.org">
            El motor que hace posible esta galaxia y sus planetas.
          </InfoCard>
          <InfoCard tag="Tailwind" title="Estilos sin fricción" href="https://tailwindcss.com">
            Diseño rápido y consistente sin salir del marcado.
          </InfoCard>
          <InfoCard
            tag={
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/logo-github.png" alt="GitHub" style={{ height: 24, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            }
            title="Historia y colaboración"
            orange
            href="https://github.com"
          >
            Versiona el código y trabaja en equipo. Tu red de seguridad.
          </InfoCard>
          <InfoCard
            tag={
              <svg viewBox="0 0 116 100" style={{ height: 24, display: "block" }} fill="white">
                <path d="M57.5 0L115 100H0L57.5 0z" />
              </svg>
            }
            title="Deploy instantáneo"
            orange
            href="https://vercel.com"
          >
            De un push a producción en segundos. Frontend y edge functions.
          </InfoCard>
          <InfoCard
            tag={
              <svg viewBox="0 0 24 24" style={{ height: 24, display: "block" }} fill="#3ecf8e">
                <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.1 12.888.697 14.064 1.762 14.064h9.52l.002 8.9c.015.987 1.26 1.41 1.874.638l9.261-11.653c.664-.838.067-2.013-.998-2.013h-9.522L11.9 1.036z" />
              </svg>
            }
            title="Backend al instante"
            orange
            href="https://supabase.com"
          >
            Base de datos, usuarios y auth — sin montar servidores.
          </InfoCard>
        </div>
      </div>
    ),
  },

  // ─── 8 · GIGANTES
  {
    id: "s8",
    label: "Sobre hombros de gigantes",
    align: "center",
    node: (
      <div className="mx-auto max-w-3xl">
        <Kicker>El privilegio</Kicker>
        <h2 className="mt-4 text-4xl md:text-5xl display teal">Sobre hombros de gigantes</h2>
        <p className="mt-5 text-2xl md:text-[2rem] font-light italic leading-snug text-white">
          "Si he visto más lejos, es porque estoy sentado sobre los hombros de gigantes."
        </p>
        <div className="mt-2 text-sm tracking-[0.2em] mist">— ISAAC NEWTON</div>
        <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/85">
          Cada prompt que escribes descansa sobre décadas de trabajo: el bit de{" "}
          <strong className="font-bold text-white">Shannon</strong>, las redes de{" "}
          <strong className="font-bold text-white">Karpathy</strong>, la voluntad de{" "}
          <strong className="font-bold text-white">Hesse</strong>, la coherencia de{" "}
          <strong className="font-bold text-white">Marco Aurelio</strong> — y de miles que{" "}
          <strong className="font-bold teal">aún trabajan</strong>. Tener IA hoy es un{" "}
          <strong className="font-extrabold or">privilegio construido por gigantes</strong>.
        </p>
        <p className="mt-5 text-[17px] font-medium text-white/90">
          Úsala con intención. Con gratitud. Con fundamentos.
        </p>
      </div>
    ),
  },

  // ─── 9 · CIERRE (WindMar logo grande)
  {
    id: "s9",
    label: "Cierre",
    align: "center",
    node: (
      <div className="mx-auto max-w-4xl text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/windmar-logo.png"
          alt="WindMar Home"
          className="mx-auto mb-5"
          style={{
            height: 100,
            filter: "drop-shadow(0 0 32px rgba(248,155,36,0.8)) drop-shadow(0 0 10px rgba(248,155,36,0.5))",
          }}
        />
        <h2 className="text-5xl md:text-7xl display teal">La voluntad<br />encuentra el camino.</h2>
        <p className="mx-auto mt-5 max-w-xl text-[19px] font-medium text-white/90">
          Pensar, decir y hacer — en una sola dirección.
        </p>
        <p className="mx-auto mt-2 text-[14px] tracking-wide mist">
          Un privilegio heredado. Hagámoslo valer.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] tracking-[0.2em] mist">
          <span>SHANNON</span><span className="text-white/25">·</span>
          <span>KARPATHY</span><span className="text-white/25">·</span>
          <span>HESSE</span><span className="text-white/25">·</span>
          <span>MARCO AURELIO</span><span className="text-white/25">·</span>
          <span>NEWTON</span>
        </div>
      </div>
    ),
  },
];
