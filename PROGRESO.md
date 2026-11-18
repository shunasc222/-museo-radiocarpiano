# PROGRESO — Museo Anatómico Interactivo · Articulación radiocarpiana

Última actualización: 18-nov-2026.

## Implementado y verificado (compilación + pruebas en Chromium headless)
- Proyecto React + TypeScript + Vite + Three.js / React Three Fiber. `npm run build` compila sin errores.
- Portada con modelo 3D protagonista (rotación lenta), título institucional y botones «Iniciar exploración» / «Explorar módulos».
- 10 módulos navegables (hash-routing, sin recargas) con texto de síntesis, galería con visor ampliado y bibliografía.
- Las 64 imágenes de `public/images` están catalogadas (`src/data/images.ts`); las rutas se cargan sin errores 404 en las pantallas probadas. Cada módulo usa varias imágenes pertinentes.
- Atlas interactivo con puntos sobre estructuras (corte coronal, ligamentos palmares, ligamentos dorsales, radiografía, huesos del carpo). La imagen no se mueve ni se escala. Las posiciones se colocaron a partir de los rótulos de cada figura y se revisaron visualmente.
- Laboratorio 2D + 3D: atlas a la izquierda, modelo 3D a la derecha, ficha anatómica (ubicación, morfología, relaciones, inserciones, función, biomecánica, clínica). La selección se sincroniza en ambos sentidos (verificado: clic en punto 2D → resalta el hueso 3D).
- Controles 3D: rotación, zoom, 6 orientaciones, reinicio, explosión, atenuación del resto, simulación esquemática de flexión/extensión/desviaciones.
- Evaluación: 10 identificaciones en 3D + 13 preguntas (3 casos clínicos), retroalimentación inmediata y resultado final.

## Limitaciones declaradas (no ocultar)
- **El modelo 3D es didáctico**: elipsoides deformadas con posiciones aproximadas (radio, ulna, disco, 8 carpianos). No es una reconstrucción exacta ni una malla escaneada; no se encontró/descargó ninguna malla con licencia verificada. Ligamentos y tendones no están modelados en 3D.
- Ligamentos: ficha + ubicación en el atlas 2D, sin correspondencia 3D.
- Solo 5 de las imágenes tienen puntos interactivos (las de mayor claridad). Las restantes están en galerías.
- Contenido textual: síntesis docente redactada con base en los textos de referencia, **sin citas de página**. Debe ser revisado por el docente antes de usarse como material oficial. Los valores angulares de biomecánica se dan solo como orden de magnitud.
- Los pies de figura indican libro de origen (según el nombre del archivo); no se asignan números de figura/página propios.
- Las amplitudes del simulador de movimiento son ilustrativas.

## Pendiente / mejoras
- Sustituir el modelo didáctico por una malla ósea de licencia verificada (p. ej., segmentación de TC con licencia abierta) y mapear los mismos IDs de estructura.
- Más puntos interactivos en otras láminas; pruebas en dispositivos reales (iOS/Android).
- Verificar sinovial y ficha de cada ligamento contra el texto de referencia.

## Publicación
Ver `README.md`.
