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


---
## Actualización — modelo 3D real e interfaz de análisis (rama `futurista-3d-real`)
- **Modelo 3D reemplazado** por mallas reales de **BodyParts3D** (DBCLS, CC BY-SA 2.1 JP), obtenidas del repositorio público `olivercase/body_parts_3d_api`: radio, ulna, escafoides, semilunar, piramidal, pisiforme, trapecio, trapezoide, hueso grande y ganchoso (mano derecha, mismo sistema de coordenadas, por lo que sus posiciones relativas son las de la malla).
- Procesado reproducible en `tools/build_glb.py`: recorte de ~7,5 cm de radio y ulna, subdivisión lineal + suavizado Taubin, exportación a `public/models/muneca_bodyparts3d.glb` (~250 KB). Atribución visible en la aplicación.
- **Limitaciones honestas:** la malla de origen es de baja resolución (las superficies articulares finas no son exactas) y corresponde a un solo individuo de referencia. Las mallas tienen pequeñas aberturas (se renderizan a doble cara). El **disco articular es una figura esquemática** (BodyParts3D no lo incluye). No hay cartílago, ligamentos, tendones ni metacarpianos. Los movimientos del simulador son rotaciones rígidas ilustrativas alrededor de la cabeza del hueso grande.
- Interfaz: selección con contorno cian y resto atenuado, anillo de «análisis», rótulos («Visualización radiocarpiana», «Estructura identificada», «Análisis anatómico»), llamada flotante con conector hacia la estructura, ficha translúcida reordenada (localización, relaciones, función, biomecánica, clínica, morfología, inserciones), hotspots 2D con realce cian.
- Móvil: header sin tapar contenido (scroll-padding), pestañas con salto de línea en vez de recorte, botones ≥40 px, ficha inferior colapsable, sin desbordamiento horizontal (verificado a 360 px en las 12 pantallas).
- Verificado (Chromium headless, emulación táctil): compilación OK; 64/64 imágenes; sin errores de consola; toque en el 3D selecciona hueso y abre la ficha; orientaciones y zoom ejecutan sin error; el simulador y la evaluación cargan. No probado en dispositivos físicos ni Safari/Firefox.
- Pendiente: mallas de mayor resolución; metacarpianos; verificar el contenido de las fichas con el texto de referencia; revisar visualmente cada orientación en dispositivo real.


---
## Actualización — capas anatómicas (rama `capas-anatomicas`)
**Completado (verificado en Chromium headless, sin errores de consola):**
- Mano completa en 3D: 5 metacarpianos y 14 falanges (BodyParts3D, `public/models/mano.glb`), articulados con el carpo; interruptor «Mano completa» y encuadre «Muñeca / Mano completa».
- **Sistema de capas** (8 capas) con mostrar/ocultar, transparencia, selección, ficha y restablecer. Cada interruptor actúa sobre mallas reales (`public/models/capas.glb`). Las capas solo 2D no tienen interruptor: muestran su insignia «2D», fichas y láminas del atlas.
- 3D real adicional: 15 músculos/tendones, retináculo flexor, membrana interósea, 5 arterias parciales.
- 3D derivado (aproximación): carillas escafoidea/semilunar del radio y superficies proximales de escafoides y semilunar, por proximidad entre mallas.
- Disco articular: **solo marcador esquemático** de alambre.
- Biomecánica: jerarquía radiocarpiana/mediocarpiana (dos pivotes) con lectura de grados; reparto ilustrativo. Sin pronosupinación.
- «Exploración por separación» implementada (huesos y zonas derivadas; los tejidos blandos permanecen).
- Fichas ampliadas (terminología, definición, origen/inserción, vascularización e inervación, clínica, fuente, limitaciones) y ~60 estructuras nuevas; 3 láminas atlas nuevas con puntos (articulación abierta, vista posterior abierta, corte coronal ampliado).
- Registro por estructura en `COBERTURA.md`.

**Solo 2D (sin recurso 3D verificable):** cápsula, sinovial y recesos, cartílago, interlínea, todos los ligamentos radiocarpianos e intercarpianos, componentes del CFCT salvo la ubicación del disco (marcador), retináculo extensor, nervios, troncos arteriales radial/ulnar y redes carpianas.

**Pendiente por falta de recursos fiables:** mallas de ligamentos, cápsula, cartílago, disco y nervios (requieren segmentación de RM/TC o atlas con licencia); revisión anatómica por un docente; prueba en dispositivos físicos, Safari y Firefox.

---
## Actualización — navegación y UX (rama `ux-navegacion`)
- Ficha anatómica en móvil como *bottom sheet*: se abre sola al seleccionar (nombre, clasificación, terminología, definición/ubicación y función), se expande a ficha completa, se cierra deslizando hacia abajo o con «Cerrar»; la selección se conserva y un botón flotante permite reabrirla. No altera el tamaño ni la posición de la lámina. En escritorio se mantiene el panel lateral.
- «Ampliar en 3D» (enfoque de cámara sobre la estructura) y «Ampliar en la lámina» (vista ampliada en un modal; la lámina original no se modifica), solo cuando la estructura tiene malla o punto en la lámina activa.
- Barra de acceso rápido fija: ATLAS 2D | MODELO 3D | CAPAS (con contador) | INFORMACIÓN.
- Botón «Capas anatómicas» (con contador) sobre el visor 3D: abre un panel flotante (hoja inferior en móvil) con los mismos controles de mostrar/ocultar, transparencia, presets, fichas y láminas; se retiró la sección fija inferior sin eliminar ninguna capa ni función.
- Guía de 5 pasos descartable (se recuerda en el navegador) e indicaciones contextuales breves.
- Sin cambios en mallas, contenido científico, imágenes, colores ni tipografía.
- Verificado en Chromium (390 px, táctil): selección 2D y 3D, apertura/expansión/cierre y deslizamiento de la ficha, reapertura, modal de ampliación, ampliar en 3D, panel de capas (activación y contador), sin desbordamiento horizontal; escritorio con ficha lateral. Sin errores de consola. No probado en dispositivos físicos.

---
## Ajuste a la rúbrica (rama `estaciones-rubrica`)
Se añadieron las cuatro estaciones sin rediseñar el museo. Rutas: `#estacion-1` … `#estacion-4`, `#creditos`; las rutas previas (`#lab`, `#m-*`) siguen igual. Navegación principal y portada muestran las 4 estaciones; el laboratorio conserva los accesos rápidos Atlas 2D · Modelo 3D · Capas · Ficha.

| Criterio (peso) | Evidencia implementada | Verificación realizada | Limitaciones pendientes |
|---|---|---|---|
| Rigor anatómico (2,5) | ~60 fichas con terminología, relaciones, inserciones, clínica, fuente y limitaciones; mallas reales BodyParts3D; registro `COBERTURA.md` que distingue 3D real / derivado / esquemático / 2D; casos y preguntas con explicación | Revisión visual de capturas; coherencia de nombres entre fichas, capas y estaciones | Sin revisión por un anatomista; textos sin cita de página; no hay mallas de ligamentos, cápsula, cartílago, disco ni nervios (se declaran) |
| Funcionalidad UX (2,5) | Menú con E1–E4, Laboratorio y Módulos; barra de estación con anterior/siguiente; ficha *bottom sheet* móvil; capas flotantes; máscaras de etiquetas | Pruebas automatizadas en Chromium (escritorio y 390 px táctil): navegación entre estaciones, ficha, capas, sin desbordamiento horizontal ni errores de consola | No probado en dispositivos físicos, Safari ni Firefox |
| Estructura pedagógica (2) | E1 Preparación (objetivos, conceptos, ruta de repaso, práctica con etiquetas ocultables) → E2 Disección virtual (2 abordajes × 5 planos, progreso, objetivo, estructuras, relaciones) → E3 Casos → E4 Quiz | Recorrido completo de las 4 estaciones y de los 10 pasos de disección | La «disección» es una secuencia de capas reales + láminas 2D, no una simulación; piel, fascia, nervios, ligamentos y cápsula solo en 2D |
| Clínica y evaluación (2) | 2 casos multipaso (escafoides; CFCT) con presentación, hallazgos, 4 decisiones cada uno, explicación por opción, resumen, correlación con fichas/láminas y salto al laboratorio. Quiz: práctica rápida de 10 y examen completo de 30 (identificación 3D, ligamentos, biomecánica, clínica), opciones aleatorias, retroalimentación inmediata, puntaje total y por área, repetir | Se contestaron ambos casos completos y el quiz rápido hasta el resultado; repetir y cambiar de práctica funcionan | Contenido clínico de síntesis docente: requiere validación del docente |
| Presentación y colaboración (1) | Estética premium conservada; página «Créditos y equipo» editable (se guarda en el navegador) y datos por defecto en `src/data/equipo.ts`; fuentes y licencias visibles | Edición, guardado, recarga y pie de página verificados | Los nombres del equipo están como marcadores: deben completarse (no se inventaron) |

**Etiquetas ocultables (Estación 1):** cuatro láminas (corte coronal, ligamentos palmares y dorsales, huesos del carpo). Las etiquetas impresas se cubren con recuadros; los trazos guía permanecen y algún recuadro puede recortar levemente un borde óseo. Puntos numerados con revelado individual y «Revelar todas».

**Rama de despliegue:** no se pudo verificar desde este entorno qué rama usa Vercel para el enlace compartido (no hay acceso a Vercel). `main` contiene solo la primera versión (PR n.º 1) y no se modificó. Respaldo: las ramas `claude/museo-anatomico-radiocarpiano-tgwfph`, `futurista-3d-real`, `capas-anatomicas` y `ux-navegacion` permanecen intactas en GitHub (el envío de etiquetas de respaldo fue rechazado por el servidor). Los cambios están en la rama nueva `estaciones-rubrica`; para publicarlos como enlace compartido, apunte Vercel a esa rama o fusiónela tras revisar su vista previa.
