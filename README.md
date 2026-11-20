# RADIOCARPAL LAB
Laboratorio virtual de anatomía, biomecánica y correlación clínica de la muñeca.
PUCE Sede Santo Domingo · Medicina · Morfofunción Osteomuscular (4.º semestre).

Aplicación web estática (React + TypeScript + Vite + Tailwind + Three.js/React Three Fiber) pensada para abrirse desde un QR en la infografía física.

## Módulos
1 Inicio · 2 Atlas anatómico (zonas seleccionables, modo estudio/autoevaluación) · 3 Explorador 3D (modelo geométrico simplificado) · 4 Ligamentos y estabilidad · 5 Miología y biomecánica (simulador) · 6 Vascularización e inervación · 7 Casos clínicos (3) · 8 Autoevaluación (20 preguntas) y bibliografía APA.

## Ejecutar
```bash
npm install
npm run dev          # desarrollo (http://localhost:5173)
npm run build        # comprobación de tipos + compilación en dist/
npm run preview      # sirve dist/
npm test             # pruebas unitarias y de componentes (Vitest)
npm run test:e2e     # E2E en Chromium (requiere build previo y Playwright)
```

## Publicar (necesita tu cuenta)
- **Vercel**: importa el repositorio → *Framework* Vite, *Build* `npm run build`, *Output* `dist` (ya definido en `vercel.json`).
- **Netlify**: ya incluye `netlify.toml`.
- **GitHub Pages**: `.github/workflows/pages.yml` (en repositorios privados Pages requiere plan de pago).
Tras publicar, para la vista previa al compartir (Open Graph) cambia en `index.html` la ruta de `og:image` por la URL absoluta de `og-image.png`.

## Código QR (solo con la URL pública ya publicada)
```bash
npm run qr -- https://TU-URL-PUBLICA/
```
El script comprueba que la URL responde y es RADIOCARPAL LAB, genera el QR (negro sobre blanco, margen de seguridad), verifica que decodifica exactamente a esa URL y escribe en `qr/`: `radiocarpal-lab-qr.png` (2048 px), `radiocarpal-lab-qr.svg`, `tarjeta-qr.svg` y `tarjeta-qr.png` (tarjeta para la infografía).

## Alcance y limitaciones (declaradas)
- Las ilustraciones son **dibujos originales** (SVG); no se incluyen imágenes de libros. Las láminas escaneadas del proyecto anterior se movieron a `archivo-previo/` (no se publican).
- El modelo 3D es **geométrico y simplificado** (elipsoides/cilindros), no una malla validada. No se incluye enlace a visores externos porque no pudieron verificarse.
- El texto se redactó con conocimiento anatómico establecido; **no se citan páginas** y las obras no se consultaron página a página para esta versión. El docente debe contrastarlo; verificar también editorial/año de la bibliografía.
- Ángulos y porcentajes (rangos, irrigación del escafoides, parámetros radiográficos) son orientativos.
