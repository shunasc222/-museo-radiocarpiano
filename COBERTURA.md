# Cobertura anatómica — registro de verificación

Fuente 3D única: **BodyParts3D** (© DBCLS, CC BY-SA 2.1 JP), mano derecha, obtenida del repositorio público `olivercase/body_parts_3d_api` (archivos con nombre FMA). Posiciones relativas = las del atlas común. Procesado: `tools/build_glb.py` y `tools/build_glb_capas.py` (recorte proximal ~7,5 cm, subdivisión lineal, suavizado Taubin). Escala 1 u = 1 cm.
Verificación aplicada: (a) identidad por nombre FMA del archivo; (b) coordenadas en un mismo sistema; (c) revisión visual en capturas (Chromium headless). No hay revisión por un anatomista.

| Estructura | Capa | Fuente | Disponibilidad | Verificación | Limitaciones |
|---|---|---|---|---|---|
| Radio, ulna (distales) | 1 Esqueleto | BodyParts3D | 3D real | identidad FMA + visual | baja resolución; recortados y desvanecidos hacia proximal |
| Escafoides, semilunar, piramidal, pisiforme | 1 | BodyParts3D | 3D real | idem | baja resolución |
| Trapecio, trapezoide, grande, ganchoso | 1 | BodyParts3D | 3D real | idem | idem |
| 5 metacarpianos, 14 falanges | 1 (complementarias) | BodyParts3D | 3D real | identidad FMA + visual (dedos extendidos) | no pertenecen a la radiocarpiana; el pulgar tiene 2 falanges |
| Procesos estiloides radial/ulnar | 1 | láminas 2D | 2D (ficha y punto en atlas) | rótulo de la lámina | no segmentados en 3D |
| Carilla escafoidea / semilunar del radio; superficies proximales de escafoides y semilunar | 2 Superficies | derivado de las mallas | 3D derivado | zonas por proximidad (≤4–7 mm) + normales; revisión visual | **aproximación**, no es cartílago ni segmentación |
| Cartílago articular, interlínea, relación piramidal–disco | 2 | láminas 2D (Latarjet 58-1/58-4) | 2D | rótulos de lámina | sin malla |
| Cápsula fibrosa, sinovial, receso preestiloideo, pliegues sinoviales | 3 | láminas 2D (Latarjet 58-1, Rouvière) | 2D | rótulos de lámina | sin malla en ningún recurso disponible |
| Lig. radiocarpiano palmar y fascículos (radioescafocapitato, radiolunar largo/corto, radioescafolunar), dorsal, colaterales radial y ulnar | 4 | láminas 2D (Latarjet 58-2/58-3) | 2D | rótulos de lámina; nomenclatura de fascículos de textos | **no hay mallas de ligamentos**; no se dibujan cintas ficticias |
| Lig. escafolunar y lunopiramidal interóseos, intercarpianos dorsal/palmar, escafopiramidal | 5 | láminas 2D | 2D | ídem | sin malla |
| Disco articular | 6 CFCT | — | 3D esquemático | marcador de alambre posicionado por la geometría de radio/ulna | **no es una reconstrucción**; solo indica ubicación |
| Lig. radioulnares, inserciones foveales, ulnolunar, ulnotriquetral, homólogo meniscal, subvaina del ECU | 6 | texto + láminas 2D | 2D | descripción de síntesis | sin malla; verificar detalle con el texto |
| Membrana interósea | 6 (vecina) | BodyParts3D FJ1476 | 3D real | identidad FMA | no es del CFCT |
| FCR, FCU (2 cabezas), PL, ECRL, ECRB, ECU, APL, EPB, EPL, ED, EI, EDM, FDS, FDP, FPL | 7 Tendones | BodyParts3D | 3D real | identidad FMA | músculos recortados; sin vainas; estáticos durante la animación |
| Retináculo flexor | 7 | BodyParts3D FJ1471 | 3D real | identidad FMA | — |
| Retináculo extensor, compartimentos | 7 | láminas 2D | 2D | — | sin malla |
| Aa. interósea anterior, ramas carpianas dorsales radial/ulnar, arcos palmares | 8 | BodyParts3D | 3D parcial | identidad FMA | los troncos radial/ulnar derechos **no existen** en el conjunto |
| Redes carpianas, a. radial, a. ulnar | 8 | láminas 2D | 2D | — | sin malla |
| Nn. interóseos anterior/posterior, mediano, ulnar, ramos articulares | 8 | láminas 2D (Latarjet 62-14/62-17/62-18) | 2D | — | BodyParts3D carece de nervios derechos de antebrazo/muñeca |

Textos de las fichas: síntesis docente sin citas de página; deben ser revisados por el docente. Los valores de reparto radiocarpiano/mediocarpiano del simulador son didácticos (no provienen de una cifra única de los textos).
