# Vibe Coding y los Fundamentos · Galaxy Edition

Presentación web (Next.js) sobre Andrej Karpathy, el *vibe coding* y por qué los **fundamentos** siguen mandando — cerrando con WindMar Home. Reconstruida desde el deck original de Claude Design, ahora con efectos controlados:

- 🌌 **Galaxia espiral 3D** de fondo (Canvas), centrada, **girando de izquierda a derecha guiada por el scroll** (al subir se devuelve) + deriva suave.
- ✨ **Título de partículas** "VIBE CODING" en paleta cósmica; pasa el mouse (o mantén click) para dispersar las partículas.
- 🔄 **Slides girando en 3D** según el scroll (el slide centrado queda plano y legible; los vecinos se inclinan y se alejan en profundidad).
- 🎨 Marca WindMar: azul `#1D429B`, naranja `#F89B24`, tipografías Montserrat + Bebas Neue.

## Correr en local

```bash
npm install
npm run dev
```

Abre http://localhost:3030 y haz scroll.

## Estructura

- `components/GalaxyBackground.tsx` — galaxia 3D (dos capas: fondo + objetos al frente).
- `components/ParticleText.tsx` — efecto de texto en partículas (reutilizable).
- `components/Deck.tsx` — orquesta el scroll y el giro 3D de los slides.
- `components/slides.tsx` — contenido de los 12 slides.

## Notas

- Las imágenes de producto (Tesla Powerwall, Qcells, Anker, logos) están como tarjetas con texto/íconos. Para usar las reales, colócalas en `public/` y reemplázalas en `slides.tsx`.
- Ajustes rápidos de la galaxia (velocidad de giro, tamaño, énfasis) están al inicio del `frame()` en `GalaxyBackground.tsx`.

## Deploy

```bash
npx vercel
```
