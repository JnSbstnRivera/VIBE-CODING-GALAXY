import type { ReactNode } from "react";
import ParticleText from "./ParticleText";

type Slide = { id: string; label: string; align: "start" | "center"; node: ReactNode };

const Kicker = ({ children, orange }: { children: ReactNode; orange?: boolean }) => (
  <div className={orange ? "kicker" : "kicker kicker-blue"}>{children}</div>
);

// reusable numbered / titled card
const InfoCard = ({
  tag,
  title,
  children,
  bebas,
  orange,
}: {
  tag: string;
  title: string;
  children: ReactNode;
  bebas?: boolean;
  orange?: boolean;
}) => (
  <div className="glass p-5">
    <div className={`${bebas ? "font-bebas text-3xl" : "text-2xl font-extrabold"} ${orange ? "or" : "lav"} leading-none`}>
      {tag}
    </div>
    <div className="mt-2 text-[17px] font-extrabold text-white">{title}</div>
    <p className="mt-1 text-sm text-white/85">{children}</p>
  </div>
);

export const slides: Slide[] = [
  // ───────────────────────── 0 · HERO
  {
    id: "s0",
    label: "Hero",
    align: "center",
    node: (
      <div className="flex flex-col items-center">
        <Kicker>Andrej Karpathy · El arte de programar</Kicker>
        <div className="relative mt-2 h-[46vh] min-h-[300px] w-full">
          <h1 className="sr-only">Vibe Coding</h1>
          <ParticleText text="VIBE CODING" className="absolute inset-0 h-full w-full" />
        </div>
        <p className="mt-2 max-w-2xl text-[22px] text-white/80">
          Dejarse llevar por <strong className="font-extrabold text-white">las vibras del código</strong>. Y por qué,
          en el fondo, los <strong className="font-extrabold or">fundamentos</strong> siguen mandando.
        </p>
        <div className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.2em] mist bob">
          <span>Desplázate para explorar el cosmos</span>
          <span className="text-base">↓</span>
        </div>
      </div>
    ),
  },

  // ───────────────────────── 1 · QUIÉN ES
  {
    id: "s1",
    label: "Quién es",
    align: "start",
    node: (
      <div className="grid items-center gap-8 md:grid-cols-[260px_1fr]">
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/karpathy.jpg"
            alt="Andrej Karpathy"
            className="h-48 w-48 rounded-full object-cover md:h-60 md:w-60"
            style={{ boxShadow: "0 0 0 2px rgba(248,155,36,0.65), 0 0 70px -6px rgba(248,155,36,0.75)" }}
          />
        </div>
        <div>
          <Kicker orange>¿Quién es?</Kicker>
          <h2 className="mt-2 text-5xl md:text-7xl">
            <span className="font-normal text-white">Andrej </span>
            <span className="display text-white">Karpathy</span>
          </h2>
          <p className="mt-4 max-w-xl text-[20px] leading-relaxed text-white/85">
            Una de las voces más influyentes de la IA moderna.{" "}
            <strong className="font-bold text-white">Miembro fundador de OpenAI</strong>, ex–director de IA en{" "}
            <strong className="font-bold text-white">Tesla</strong> y profesor en{" "}
            <strong className="font-bold text-white">Stanford</strong>.
          </p>
          <p className="mt-5 text-xl font-extrabold leading-snug text-white">
            “El lenguaje de programación más caliente es el inglés.”
          </p>
          <div className="mt-2 text-sm mist">— Andrej Karpathy, 2023</div>
        </div>
      </div>
    ),
  },

  // ───────────────────────── 2 · TRAYECTORIA
  {
    id: "s2",
    label: "Trayectoria",
    align: "start",
    node: (
      <div>
        <Kicker>Trayectoria</Kicker>
        <h2 className="mt-3 text-4xl md:text-6xl">
          <span className="font-normal text-white">Una década </span>
          <span className="display text-white">definiendo la IA</span>
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["2015", "Stanford · CS231n", "Crea y enseña el primer gran curso de deep learning para visión por computador."],
            ["2015", "OpenAI", "Miembro fundador del laboratorio que hoy define la frontera de la IA."],
            ["2017", "Tesla · Autopilot", "Director de IA. Lidera la visión del auto que conduce solo."],
            ["2023", "Regreso a OpenAI", "Vuelve a trabajar en los grandes modelos de lenguaje."],
            ["2024", "Eureka Labs", "Funda su propia escuela: educación reinventada con IA."],
          ].map(([y, t, d]) => (
            <InfoCard key={t} tag={y} title={t} bebas orange>
              {d}
            </InfoCard>
          ))}
          <div className="glass flex items-center p-5">
            <p className="text-[13px] mist">
              De la conducción autónoma a la energía: la misma ingeniería que mueve a Tesla impulsa el{" "}
              <strong className="text-white">Powerwall</strong> que instalamos.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // ───────────────────────── 3 · EL TUIT
  {
    id: "s3",
    label: "El tweet",
    align: "start",
    node: (
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <Kicker>2 de febrero, 2025</Kicker>
          <h2 className="mt-3 text-5xl md:text-7xl">
            <span className="font-normal text-white">El tuit que </span>
            <span className="display text-white">nombró una era</span>
          </h2>
          <p className="mt-5 max-w-xl text-[20px] leading-relaxed text-white/80">
            Lo escribió como un pensamiento al pasar. Hoy{" "}
            <strong className="font-extrabold or">+4.5 millones de vistas</strong> después, “vibe coding” es Palabra del
            Año y un sector de miles de millones.
          </p>
        </div>
        <div className="glass p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 font-black text-white">
              AK
            </div>
            <div>
              <div className="font-extrabold text-white">Andrej Karpathy</div>
              <div className="text-[13px] mist">@karpathy</div>
            </div>
          </div>
          <p className="mt-4 text-[21px] font-medium leading-relaxed text-white">
            “There&apos;s a new kind of coding I call <span className="font-extrabold or">&apos;vibe coding&apos;</span>,
            where you fully give in to the vibes, embrace exponentials, and forget that the code even exists.”
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-white/80">
            “Una nueva forma de programar: te dejas llevar por las vibras, abrazas lo exponencial y te olvidas de que el
            código existe.”
          </p>
          <div className="mt-4 text-[13px] mist">5:17 PM · 2 feb 2025</div>
        </div>
      </div>
    ),
  },

  // ───────────────────────── 4 · QUÉ ES
  {
    id: "s4",
    label: "Qué es",
    align: "start",
    node: (
      <div>
        <Kicker>¿Qué es, en realidad?</Kicker>
        <h2 className="mt-3 max-w-4xl text-4xl md:text-6xl leading-snug">
          <span className="font-normal text-white">“No es realmente programar. </span>
          <span className="display text-white">Veo cosas, digo cosas, ejecuto y copio-pego</span>
          <span className="font-normal text-white"> — y casi siempre funciona.”</span>
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <InfoCard tag="01" title="Describes la intención" bebas>
            Hablas en lenguaje natural. La IA escribe el código por ti.
          </InfoCard>
          <InfoCard tag="02" title="Aceptas sin revisar" bebas>
            ¿Hay un error? Se lo pegas a la IA y le pides que lo arregle.
          </InfoCard>
          <InfoCard tag="03" title="El código crece solo" bebas>
            Más allá de lo que entiendes. Y ahí empieza el riesgo.
          </InfoCard>
        </div>
      </div>
    ),
  },

  // ───────────────────────── 5 · SOFTWARE 2.0
  {
    id: "s5",
    label: "Software 2.0",
    align: "start",
    node: (
      <div>
        <Kicker>Su gran idea · 2017</Kicker>
        <h2 className="mt-3 text-5xl md:text-7xl">
          <span className="font-normal text-white">Software </span>
          <span className="display text-white">2.0</span>
        </h2>
        <p className="mt-5 max-w-2xl text-[20px] text-white/80">
          Mucho antes del vibe coding, Karpathy ya lo había anticipado: la programación estaba cambiando de raíz.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="glass p-6">
            <div className="text-[15px] font-extrabold mist">Software 1.0</div>
            <p className="mt-2 text-xl font-semibold text-white">El humano escribe cada instrucción.</p>
            <p className="mt-2 text-[15px] text-white/85">
              Líneas de código explícitas. Lógica que tú diseñas, depuras y entiendes paso a paso.
            </p>
          </div>
          <div className="glass p-6">
            <div className="text-[15px] font-extrabold or">Software 2.0</div>
            <p className="mt-2 text-xl font-semibold text-white">Los datos escriben el código.</p>
            <p className="mt-2 text-[15px] text-white/80">
              Curas datos, entrenas una red neuronal y los <strong className="font-bold text-white">pesos</strong> se
              vuelven el programa. El vibe coding es su consecuencia natural.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // ───────────────────────── 6 · EL MAESTRO
  {
    id: "s6",
    label: "El maestro",
    align: "start",
    node: (
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <Kicker>El otro Karpathy</Kicker>
          <h2 className="mt-3 text-4xl md:text-6xl">
            <span className="font-normal text-white">El mejor profesor de IA </span>
            <span className="display text-white">enseña desde cero</span>
          </h2>
          <p className="mt-5 text-[20px] leading-relaxed text-white/80">
            El mismo que acuñó “vibe coding” dedica su vida a lo contrario: a que entiendas{" "}
            <strong className="font-bold text-white">cómo funciona todo por dentro</strong>. Construye una red neuronal,
            letra por letra, frente a millones de estudiantes.
          </p>
          <p className="mt-5 text-[20px] font-bold or">
            “Para usar bien la IA, primero hay que entender cómo piensa.”
          </p>
        </div>
        <div className="grid gap-4">
          <InfoCard tag="▶" title="Neural Networks: Zero to Hero">
            Serie en YouTube: de cero a construir un modelo tipo GPT.
          </InfoCard>
          <InfoCard tag="{ }" title="nanoGPT · micrograd">
            Código mínimo y legible para entender lo esencial sin magia.
          </InfoCard>
          <InfoCard tag="✺" title="Eureka Labs">
            Su apuesta: enseñar los fundamentos a una nueva generación.
          </InfoCard>
        </div>
      </div>
    ),
  },

  // ───────────────────────── 7 · LA TRAMPA
  {
    id: "s7",
    label: "La trampa",
    align: "start",
    node: (
      <div>
        <Kicker orange>La letra pequeña</Kicker>
        <h2 className="mt-3 text-4xl md:text-6xl">
          <span className="font-normal text-white">El propio Karpathy avisó: </span>
          <span className="display text-white">esto tiene trampa</span>
          <span className="font-normal text-white">.</span>
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <InfoCard tag="⚠" title="La IA se traba">
            “A veces no puede arreglar un bug y pido cambios al azar hasta que desaparece.”
          </InfoCard>
          <InfoCard tag="⚠" title="Deuda técnica oculta">
            Código que nadie entiende = bugs escondidos y sistemas frágiles.
          </InfoCard>
          <InfoCard tag="⚠" title="Atrofia de habilidad">
            Si la IA piensa por ti siempre, dejas de saber pensar el problema.
          </InfoCard>
        </div>
        <p className="mt-8 text-[17px] text-white/85">
          Él mismo lo dijo: ideal para <strong className="font-bold text-white">proyectos de fin de semana</strong>. No
          para lo que tiene que <strong className="font-extrabold or">funcionar de verdad</strong>.
        </p>
      </div>
    ),
  },

  // ───────────────────────── 8 · LA TESIS
  {
    id: "s8",
    label: "La tesis",
    align: "center",
    node: (
      <div className="mx-auto max-w-4xl">
        <Kicker>El punto de todo esto</Kicker>
        <h2 className="mt-4 text-5xl md:text-7xl display text-white">
          El vibe coding es <span className="or">genial</span>.
          <br />
          Pero sin <span className="or">fundamentos</span>, te estancas.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[21px] text-white/85">
          Las vibras te llevan lejos y rápido. Los fundamentos te dicen{" "}
          <strong className="font-bold text-white">a dónde</strong>, y te traen de vuelta cuando algo se rompe.
        </p>
      </div>
    ),
  },

  // ───────────────────────── 9 · LAS HERRAMIENTAS (stack para vibe codear)
  {
    id: "s9",
    label: "Las herramientas",
    align: "start",
    node: (
      <div>
        <Kicker orange>Con qué lo construimos</Kicker>
        <h2 className="mt-3 text-4xl md:text-6xl">
          <span className="font-normal text-white">Las herramientas para </span>
          <span className="display or">vibe codear con fundamentos</span>
        </h2>
        <p className="mt-5 max-w-2xl text-[20px] text-white/85">
          En WindMar Home no solo vendemos energía: construimos nuestro propio software —{" "}
          <strong className="font-bold text-white">cotizadores, dashboards y agentes de IA</strong>. Estas son las
          piezas que nos dejan ir rápido sin perder el control.
        </p>
        <div className="mt-8 grid gap-x-10 gap-y-7 md:grid-cols-3">
          <InfoCard tag="GitHub" title="Historia y red de seguridad" orange>
            Versiona el código. Ramas, historial y colaboración: si algo se rompe, vuelves atrás.
          </InfoCard>
          <InfoCard tag="Vercel" title="Publicar en segundos" orange>
            Cada cambio sube solo y queda en línea con su propia URL. Del código a producción sin fricción.
          </InfoCard>
          <InfoCard tag="Supabase" title="Backend al instante" orange>
            Base de datos, usuarios y autenticación listos — sin montar ni mantener servidores.
          </InfoCard>
          <InfoCard tag="Next.js" title="La base de las apps" orange>
            El framework (React) con el que construimos webs rápidas y listas para producción.
          </InfoCard>
          <InfoCard tag="Claude" title="El copiloto con criterio" orange>
            Escribe y explica el código a tu lado: las vibras, pero con fundamentos detrás.
          </InfoCard>
          <InfoCard tag="n8n · Zoho" title="Todo conectado" orange>
            Automatizaciones y CRM enlazados para que los datos fluyan entre cada herramienta.
          </InfoCard>
        </div>
      </div>
    ),
  },

  // ───────────────────────── 10 · POR QUÉ LOS FUNDAMENTOS
  {
    id: "s10",
    label: "Por qué los fundamentos",
    align: "start",
    node: (
      <div>
        <Kicker>La lección que nos llevamos</Kicker>
        <h2 className="mt-3 text-4xl md:text-6xl">
          <span className="font-normal lav">En el código o en la energía, </span>
          <span className="display lav">los fundamentos no se delegan</span>
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <InfoCard tag="01" title="Entender el sistema" bebas orange>
            No basta con el resultado. Saber por qué funciona es lo que te deja mejorarlo.
          </InfoCard>
          <InfoCard tag="02" title="Saber depurar" bebas orange>
            Cuando algo falla —y va a fallar— los fundamentos son los que lo arreglan.
          </InfoCard>
          <InfoCard tag="03" title="Diseñar para que dure" bebas orange>
            Un sistema —solar o de software— se construye para resistir años, no un fin de semana.
          </InfoCard>
        </div>
        <p className="mt-8 text-4xl md:text-6xl display text-white">
          La IA <span className="or">acelera a quien sabe</span>. Y multiplica los{" "}
          <span className="or">errores de quien no</span>.
        </p>
      </div>
    ),
  },

  // ───────────────────────── 11 · CIERRE
  {
    id: "s11",
    label: "Cierre",
    align: "center",
    node: (
      <div className="mx-auto max-w-3xl">
        <h2 className="text-5xl md:text-7xl display lav">
          Usa las <span className="or">vibras</span>.
          <br />
          Domina los <span className="or">fundamentos</span>.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[20px] font-medium text-white/90">
          No es solo energía, ni solo código. Es saber lo que haces — para ti y para tu familia.
        </p>
        <div className="mt-10 inline-flex items-center gap-3 rounded-full glass px-6 py-3">
          <span className="text-xl font-black tracking-tight text-white">WINDMAR</span>
          <span className="text-xl font-light tracking-[0.3em] or">HOME</span>
        </div>
      </div>
    ),
  },
];
