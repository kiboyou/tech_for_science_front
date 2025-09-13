# Tech Pour Science (Immersive 3D Landing)

A Next.js 14 + TailwindCSS project showcasing an immersive 3D landing page with react-three-fiber, drei, and optional physics via @react-three/rapier. Includes simple machine translation toggle (FR/EN) with localStorage caching.

## Requirements
- Node.js 18+

## Install & Run
```bash
npm install
npm run dev
```
Then open http://localhost:3000 and click "Ouvrir la page immersive".

## Environment
Optional: set a custom translation API endpoint.
```bash
# .env.local
NEXT_PUBLIC_MT_ENDPOINT=https://libretranslate.com/translate
```

## Build
```bash
npm run build && npm start
```

## Notes
- 3D heavy bundles are client-only via dynamic imports.
- Physics scene requires WebGL; mobile performance may vary.