import type { ReactNode } from "react";
import ParticleText from "./ParticleText";

type Slide = { id: string; label: string; align: "start" | "center"; node: ReactNode };

const Kicker = ({ children, cyan }: { children: ReactNode; cyan?: boolean }) => (
  <div className={cyan ? "kicker kicker-cyan" : "kicker"}>{children}</div>
);

// frameless titled item (icon/word + title + text)
const InfoCard = ({
  tag,
  title,
  children,
  bebas,
  orange,
}: {
  tag: ReactNode;
  title: string;
  children: ReactNode;
  bebas?: boolean;
  orange?: boolean;
}) => (
  <div className="glass p-3">
    <div className={`${bebas ? "font-bebas text-3xl" : "text-2xl font-extrabold"} ${orange ? "or" : "teal"} leading-none`}>
      {tag}
    </div>
    <div className="mt-2 text-[18px] font-extrabold text-white">{title}</div>
    <p className="mt-1 text-[15px] leading-relaxed text-white/85">{children}</p>
  </div>
);

const Portrait = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex justify-center">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={src}
      alt={alt}
      className="h-52 w-52 rounded-full object-cover md:h-64 md:w-64"
      style={{ boxShadow: "0 0 0 2px rgba(46,230,197,0.6), 0 0 80px -6px rgba(46,230,197,0.6)" }}
    />
  </div>
);

export const slides: Slide[] = [
  // ───────────────────────── 0 · INTRO
  {
    id: "s0",
    label: "La Intención Pura",
    align: "center",
    node: (
      <div className="flex flex-col items-center">
        <Kicker>Vibe Code &amp; Willpower</Kicker>
        <div className="relative mt-2 h-[44vh] min-h-[280px] w-full">
          <h1 className="sr-only">La Intención Pura</h1>
          <ParticleText text="INTENCIÓN PURA" className="absolute inset-0 h-full w-full" />
        </div>
        <p className="mt-2 max-w-3xl text-[21px] leading-relaxed text-white/85">
          Un recorrido desde la teoría de <strong className="font-bold text-white">Claude Shannon</strong> hasta el{" "}
          <strong className="font-bold text-white">vibe coding</strong> de Andrej Karpathy, unificados bajo la mirada de{" "}
          <strong className="font-bold text-white">Hermann Hesse</strong>.
        </p>
        <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.2em] mist bob">
          <span>Desplázate para explorar el cosmos</span>
          <span className="text-base">↓</span>
        </div>
      </div>
    ),
  },

  // ───────────────────────── 1 · SHANNON (sección)
  {
    id: "s1",
    label: "Claude Shannon",
    align: "center",
    node: (
      <div className="mx-auto max-w-3xl">
        <Kicker>01 / El Fundamento</Kicker>
        <h2 className="mt-4 text-5xl md:text-7xl display teal">Claude Shannon</h2>
        <div className="mx-auto mt-5 h-px w-16 bg-teal-300/70" />
        <p className="mx-auto mt-6 max-w-2xl text-[21px] text-white/85">
          El padre de la era digital y la búsqueda incansable de la{" "}
          <strong className="font-bold text-white">precisión frente al ruido</strong>.
        </p>
      </div>
    ),
  },

  // ───────────────────────── 2 · LA OBSESIÓN POR EL BIT
  {
    id: "s2",
    label: "La Obsesión por el Bit",
    align: "start",
    node: (
      <div>
        <Kicker>Shannon · La teoría</Kicker>
        <h2 className="mt-3 text-4xl md:text-6xl">
          <span className="font-normal text-white">La Obsesión por el </span>
          <span className="display teal">Bit</span>
        </h2>
        <div className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
          <InfoCard tag="0 / 1" title="Reducción al Binario" bebas>
            En su tesis de 1948 demostró que toda la información se puede codificar con ceros y unos. Convirtió la
            comunicación en una ciencia exacta y matemática.
          </InfoCard>
          <InfoCard tag="↻" title="El ratón Theseus" bebas>
            En 1950 construyó a Theseus, un ratón magnético capaz de aprender y resolver laberintos solo. El primer
            ancestro mecánico de los agentes de IA actuales.
          </InfoCard>
        </div>
      </div>
    ),
  },

  // ───────────────────────── 3 · FOCO (foto Shannon)
  {
    id: "s3",
    label: "Foco y Dedicación",
    align: "start",
    node: (
      <div className="grid items-center gap-10 md:grid-cols-[1fr_260px]">
        <div>
          <Kicker>Concentración</Kicker>
          <h2 className="mt-3 text-4xl md:text-6xl">
            <span className="font-normal text-white">Foco y </span>
            <span className="display teal">Dedicación Absoluta</span>
          </h2>
          <p className="mt-5 max-w-xl text-[19px] leading-relaxed text-white/85">
            Shannon no solo teorizó: construyó sus propias máquinas. Su concentración era legendaria — meses aislado
            perfeccionando ratones mecánicos y autómatas de ajedrez.
          </p>
          <p className="mt-4 max-w-xl text-[19px] leading-relaxed text-white/85">
            El trabajo no era una tarea impuesta, sino un fin guiado por la{" "}
            <strong className="font-bold text-white">pura curiosidad</strong>: volcar toda la mente en el problema, sin
            ruido externo.
          </p>
        </div>
        <Portrait src="/shannon.jpg" alt="Claude Shannon" />
      </div>
    ),
  },

  // ───────────────────────── 4 · KARPATHY (sección)
  {
    id: "s4",
    label: "Andrej Karpathy",
    align: "center",
    node: (
      <div className="mx-auto max-w-3xl">
        <Kicker cyan>02 / El Presente Exponencial</Kicker>
        <h2 className="mt-4 text-5xl md:text-7xl display teal">Andrej Karpathy</h2>
        <div className="mx-auto mt-5 h-px w-16 bg-teal-300/70" />
        <p className="mx-auto mt-6 max-w-2xl text-[21px] text-white/85">
          De programar redes neuronales línea por línea a{" "}
          <strong className="font-bold text-white">orquestar código a través de la intuición</strong>.
        </p>
      </div>
    ),
  },

  // ───────────────────────── 5 · LA ERA DEL VIBE CODING
  {
    id: "s5",
    label: "La Era del Vibe Coding",
    align: "start",
    node: (
      <div>
        <Kicker>Karpathy · La práctica</Kicker>
        <h2 className="mt-3 text-4xl md:text-6xl">
          <span className="font-normal text-white">La Era del </span>
          <span className="display teal">Vibe Coding</span>
        </h2>
        <div className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-3">
          <InfoCard tag="›_" title="Olvidar la sintaxis" bebas>
            Das el control a los LLMs para que generen el código. Te liberas de los detalles para centrarte en la
            arquitectura.
          </InfoCard>
          <InfoCard tag="↗" title="Abrazar exponenciales" bebas>
            El ritmo de creación se dispara: los prototipos se vuelven reales en minutos.
          </InfoCard>
          <InfoCard tag="🤖" title="Ingeniería agéntica" bebas>
            Karpathy hoy prefiere llamarlo así: dirigir, vigilar y guiar entidades que programan por nosotros.
          </InfoCard>
        </div>
      </div>
    ),
  },

  // ───────────────────────── 6 · DE LA LÍNEA AL FLUJO (foto Karpathy)
  {
    id: "s6",
    label: "De la Línea al Flujo",
    align: "start",
    node: (
      <div className="grid items-center gap-10 md:grid-cols-[260px_1fr]">
        <Portrait src="/karpathy.jpg" alt="Andrej Karpathy" />
        <div>
          <Kicker cyan>La intención es el idioma</Kicker>
          <h2 className="mt-3 text-4xl md:text-6xl">
            <span className="font-normal text-white">De la Línea al </span>
            <span className="display teal">Flujo</span>
          </h2>
          <p className="mt-5 max-w-xl text-[19px] leading-relaxed text-white/85">
            Excofundador de OpenAI y exdirector de IA en Tesla, mostró que escribir código tradicional ya no es el cuello
            de botella. El programador moderno actúa como un{" "}
            <strong className="font-bold text-white">director de orquesta</strong>.
          </p>
          <p className="mt-4 max-w-xl text-[19px] leading-relaxed text-white/85">
            La mente humana define los flujos y la verificación; los LLMs materializan la sintaxis a partir de nuestra{" "}
            <strong className="font-bold text-white">voluntad lingüística</strong>.
          </p>
        </div>
      </div>
    ),
  },

  // ───────────────────────── 7 · LA LEY DE LA VOLUNTAD (sección)
  {
    id: "s7",
    label: "La Ley de la Voluntad",
    align: "center",
    node: (
      <div className="mx-auto max-w-3xl">
        <Kicker cyan>03 / La Conexión Filosófica</Kicker>
        <h2 className="mt-4 text-5xl md:text-7xl display teal">La Ley de la Voluntad</h2>
        <div className="mx-auto mt-5 h-px w-16 bg-teal-300/70" />
        <p className="mx-auto mt-6 max-w-2xl text-[21px] text-white/85">
          Cómo un clásico de la literatura universal describe perfectamente el éxito en el desarrollo de software
          moderno.
        </p>
      </div>
    ),
  },

  // ───────────────────────── 8 · LA FRASE DE DEMIAN (Hesse)
  {
    id: "s8",
    label: "La Frase de Demian",
    align: "center",
    node: (
      <div className="mx-auto max-w-4xl">
        <Kicker>Hermann Hesse · Demian (1919)</Kicker>
        <p className="mt-6 text-3xl md:text-5xl font-light italic leading-snug text-white">
          “Si un animal o un ser humano concentra toda su{" "}
          <span className="not-italic font-extrabold teal">atención</span> y su{" "}
          <span className="not-italic font-extrabold teal">voluntad</span> en una cosa determinada, la consigue.”
        </p>
        <div className="mt-6 text-sm tracking-[0.2em] mist">— HERMANN HESSE</div>
      </div>
    ),
  },

  // ───────────────────────── 9 · LA COHERENCIA (Marco Aurelio)
  {
    id: "s9",
    label: "La Coherencia",
    align: "start",
    node: (
      <div>
        <Kicker orange>Marco Aurelio · La coherencia</Kicker>
        <h2 className="mt-3 text-4xl md:text-6xl">
          <span className="font-normal text-white">Pensar, hablar y actuar — </span>
          <span className="display teal">en acuerdo</span>
        </h2>
        <p className="mt-5 max-w-2xl text-[19px] text-white/85">
          El emperador estoico lo resumió hace 19 siglos: la virtud es la coherencia entre lo que piensas, dices y
          haces. El mismo principio gobierna el buen código.
        </p>
        <div className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-3">
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
        <p className="mt-7 text-[19px] text-white/90">
          Vibe coding sin coherencia es <strong className="font-bold text-white">ruido</strong>. Con coherencia, es{" "}
          <strong className="font-extrabold or">voluntad ejecutada</strong>.
        </p>
      </div>
    ),
  },

  // ───────────────────────── 10 · ATENCIÓN EN EL PROPÓSITO
  {
    id: "s10",
    label: "Atención en el Propósito",
    align: "start",
    node: (
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="text-center md:text-left">
          <div className="font-bebas text-8xl md:text-9xl leading-none teal">100%</div>
          <div className="mt-1 text-sm uppercase tracking-[0.25em] text-white/85">Atención intencional</div>
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">El poder de la voluntad despejada</h3>
          <p className="mt-4 text-[18px] leading-relaxed text-white/85">
            El vibe coding no se trata de pereza: es canalizar el 100% de la energía mental hacia el{" "}
            <strong className="font-bold text-white">objetivo final</strong>. Al remover la barrera de la sintaxis, la
            mente se concentra con intensidad pura en la idea.
          </p>
          <p className="mt-4 text-[18px] leading-relaxed text-white/85">
            La tenacidad de Shannon frente a la entropía y la de Karpathy para automatizar demuestran la ley de Hesse:
            la dedicación al propósito somete el medio para conseguir el fin.
          </p>
        </div>
      </div>
    ),
  },

  // ───────────────────────── 11 · EVOLUCIÓN DE LA CREACIÓN (tabla)
  {
    id: "s11",
    label: "Evolución de la Creación",
    align: "start",
    node: (
      <div>
        <Kicker>La síntesis</Kicker>
        <h2 className="mt-3 text-4xl md:text-6xl">
          <span className="font-normal text-white">Evolución de la </span>
          <span className="display teal">Creación</span>
        </h2>
        <div className="mt-7 overflow-hidden text-[15px] md:text-[16px]">
          <div className="grid grid-cols-4 gap-x-4 border-b border-white/20 pb-3 font-bebas tracking-wide teal">
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
            <div
              key={row[0]}
              className={`grid grid-cols-4 gap-x-4 py-3 ${i < 4 ? "border-b border-white/10" : ""}`}
            >
              <div className="font-extrabold text-white">{row[0]}</div>
              <div className="text-white/80">{row[1]}</div>
              <div className="text-white/80">{row[2]}</div>
              <div className="text-white/80">{row[3]}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[13px] mist">La última fila —la coherencia— es la idea de Marco Aurelio que une a los tres.</p>
      </div>
    ),
  },

  // ───────────────────────── 12 · EL ECOSISTEMA (librerías + infra)
  {
    id: "s12",
    label: "El Ecosistema",
    align: "start",
    node: (
      <div>
        <Kicker cyan>El ecosistema</Kicker>
        <h2 className="mt-3 text-4xl md:text-6xl">
          <span className="font-normal text-white">Cada herramienta, </span>
          <span className="display teal">útil a su manera</span>
        </h2>
        <p className="mt-4 max-w-2xl text-[18px] text-white/85">
          No existe una sola herramienta: cada una resuelve algo. Así se construye software real — en{" "}
          <strong className="font-bold or">WindMar Home</strong> y en cualquier lugar.
        </p>
        <div className="mt-7 grid gap-x-8 gap-y-5 md:grid-cols-3">
          <InfoCard tag="React" title="Interfaces por componentes">
            La librería estándar para construir la web moderna, pieza a pieza.
          </InfoCard>
          <InfoCard tag="Three.js" title="3D en el navegador">
            El motor que hace posible esta galaxia y sus planetas.
          </InfoCard>
          <InfoCard tag="Tailwind" title="Estilos sin fricción">
            Diseño rápido y consistente sin salir del marcado.
          </InfoCard>
          <InfoCard
            tag={
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/logo-github.png" alt="GitHub" style={{ height: 32, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            }
            title="Historia y colaboración"
            orange
          >
            Versiona el código y trabaja en equipo. Tu red de seguridad.
          </InfoCard>
          <InfoCard
            tag={
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/logo-vercel.png" alt="Vercel" style={{ height: 32, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            }
            title="Deploy instantáneo"
            orange
          >
            De un push a producción en segundos. Frontend y edge functions.
          </InfoCard>
          <InfoCard
            tag={
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/logo-supabase.png" alt="Supabase" style={{ height: 32, objectFit: "contain" }} />
            }
            title="Backend al instante"
            orange
          >
            Base de datos, usuarios y auth — sin montar servidores.
          </InfoCard>
        </div>
      </div>
    ),
  },

  // ───────────────────────── 13 · SOBRE HOMBROS DE GIGANTES
  {
    id: "s13",
    label: "Sobre hombros de gigantes",
    align: "center",
    node: (
      <div className="mx-auto max-w-3xl">
        <Kicker>El privilegio</Kicker>
        <h2 className="mt-4 text-4xl md:text-6xl display teal">Sobre hombros de gigantes</h2>
        <p className="mt-6 text-2xl md:text-3xl font-light italic leading-snug text-white">
          “Si he visto más lejos, es porque estoy sentado sobre los hombros de gigantes.”
        </p>
        <div className="mt-3 text-sm tracking-[0.2em] mist">— ISAAC NEWTON</div>
        <p className="mx-auto mt-7 max-w-2xl text-[19px] leading-relaxed text-white/85">
          Cada prompt que escribes hoy descansa sobre décadas de trabajo: el bit de{" "}
          <strong className="font-bold text-white">Shannon</strong>, las redes de{" "}
          <strong className="font-bold text-white">Karpathy</strong>, la voluntad de{" "}
          <strong className="font-bold text-white">Hesse</strong>, la coherencia de{" "}
          <strong className="font-bold text-white">Marco Aurelio</strong> — y de miles que{" "}
          <strong className="font-bold teal">aún trabajan</strong>. Tener IA hoy no es un derecho: es un{" "}
          <strong className="font-extrabold or">privilegio construido por gigantes</strong>.
        </p>
        <p className="mt-6 text-[18px] font-medium text-white/90">
          Úsala con intención. Con gratitud. Con fundamentos.
        </p>
      </div>
    ),
  },

  // ───────────────────────── 14 · CIERRE
  {
    id: "s14",
    label: "Cierre",
    align: "center",
    node: (
      <div className="mx-auto max-w-4xl">
        <h2 className="text-5xl md:text-7xl display teal">La voluntad encuentra el camino.</h2>
        <p className="mx-auto mt-6 max-w-xl text-[20px] font-medium text-white/90">
          Pensar, decir y hacer — en una sola dirección.
        </p>
        <p className="mx-auto mt-3 text-[15px] tracking-wide mist">
          Un privilegio heredado. Hagámoslo valer.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm tracking-[0.18em] mist">
          <span>SHANNON</span><span className="text-white/30">·</span>
          <span>KARPATHY</span><span className="text-white/30">·</span>
          <span>HESSE</span><span className="text-white/30">·</span>
          <span>MARCO AURELIO</span>
        </div>
        <div className="mt-8 inline-flex items-center gap-3 rounded-full glass px-6 py-3">
          <span className="text-xl font-black tracking-tight text-white">WINDMAR</span>
          <span className="text-xl font-light tracking-[0.3em] or">HOME</span>
        </div>
      </div>
    ),
  },
];
