import type { LayerId } from './model3d'
import type { ViewKey } from '../components/Wrist3D'

// ───────── Estación 1: máscaras que cubren el TEXTO de las etiquetas impresas (x1,y1,x2,y2 en %)
export const PLATE_MASKS: Record<number, [number, number, number, number][]> = {
  8: [[65, 20.5, 77, 25], [20.5, 29, 32, 33.5], [71.5, 34.5, 82, 39], [15, 44.5, 24, 49], [81.5, 48.5, 92, 53], [9.5, 51.5, 19, 56], [8.5, 64.5, 20, 69.5], [72.5, 70.5, 83, 75]],
  14: [[42, 1, 61, 6], [25, 9, 34.5, 13.5], [61.5, 12.5, 67, 17.5], [15, 20.3, 31.5, 24.5], [23, 27.3, 31.5, 31.5], [64.5, 31.3, 80.5, 35.5], [65, 37.3, 77.2, 41.5], [62.7, 42, 69.5, 46.2], [65, 46, 79, 50], [68.7, 53, 74, 57], [70.5, 58, 83, 64.5], [15, 40.8, 28, 45], [18, 75.7, 29, 80], [13, 79.8, 34.5, 84], [28, 83.8, 38.5, 88], [41.5, 84, 51, 88.5], [55, 83.8, 65.5, 88], [70, 73.8, 78.5, 78], [60.2, 79.8, 81.3, 84]],
  19: [[45, 4.8, 49.5, 8.5], [64, 4.8, 69, 10.5], [28, 25.3, 39, 31.5], [25, 36.7, 37.6, 43], [26, 45.7, 38.8, 49.5], [28, 54.5, 33.5, 58.2], [66.8, 17.8, 76.8, 28], [67.5, 29.2, 76.5, 35.8], [66.2, 36, 76.8, 42.6], [65.4, 43, 73.5, 49.3], [66, 50, 72, 54], [27, 78.5, 37.5, 82.5], [35.5, 83.2, 46.5, 87.5], [46.5, 84.4, 57.5, 88.5], [57, 83, 68, 87], [63.5, 78, 74, 82.2]],
  20: [[37.5, 9.7, 45.5, 13.7], [47.5, 8.3, 52, 12], [22.5, 19, 34.8, 23.2], [59, 28.5, 69.5, 35.5], [16.5, 35.7, 33.6, 39.7], [24, 38.8, 35, 42.7], [21, 41.7, 35, 45.6], [21.3, 45.8, 35, 49.8], [21, 49.2, 35, 53], [31, 52.5, 37, 56.2], [29, 58.8, 35, 62.5], [60, 41.8, 70, 45.8], [61, 45.3, 72.8, 49.2], [62, 48.8, 75, 52.7], [64.3, 52.6, 76.8, 56.4], [65, 56.8, 80, 60.6], [24.2, 78.2, 34.8, 82], [31.2, 81.8, 41.7, 85.8], [42, 82.5, 50.5, 86.5], [53, 81.5, 63.5, 85.5], [65.5, 77.8, 76.4, 81.7]]
}
export const PRACTICE_PLATES = [14, 19, 20, 8]

export const OBJETIVOS = [
  'Distinguir las articulaciones radiocarpiana, radioulnar distal y mediocarpiana.',
  'Identificar los huesos y las superficies articulares que forman la radiocarpiana (cavidad glenoidea antebraquial y cóndilo carpiano).',
  'Describir la cápsula, la sinovial y los ligamentos radiocarpianos, y su orientación palmar y dorsal.',
  'Reconocer las relaciones regionales: tendones, retináculos, vasos y nervios que cruzan la muñeca.',
  'Aplicar el vocabulario anatómico para leer una lámina o una radiografía de la muñeca.'
]
export const CONCEPTOS: [string, string][] = [
  ['Articulación radiocarpiana', 'Elipsoidea (condílea): radio + disco articular ↔ escafoides, semilunar y piramidal. Flexión–extensión y desviaciones radial–ulnar.'],
  ['Cavidad glenoidea antebraquial', 'Fosas escafoidea y semilunar del radio más el disco articular.'],
  ['Cóndilo carpiano', 'Superficie convexa de escafoides, semilunar y piramidal, unidos por ligamentos interóseos.'],
  ['Ulna y radiocarpiana', 'La ulna no articula con el carpo: el disco articular se interpone (articulación radioulnar distal ≠ radiocarpiana).'],
  ['Cápsula y sinovial', 'Manguito fibroso reforzado por ligamentos; sinovial habitualmente independiente de la radioulnar distal.'],
  ['Ligamentos radiocarpianos', 'Palmares (más fuertes), dorsal, colateral radial y colateral ulnar. Los intercarpianos y el CFCT son sistemas distintos.'],
  ['Relaciones regionales', 'Palmar: túnel carpiano. Dorsal: seis compartimentos extensores. Lateral: tabaquera anatómica y arteria radial. Medial: canal ulnar.']
]
export const REPASO_MODULOS = [
  ['osteologia', 'Osteología', 'Radio, ulna y huesos del carpo'], ['superficies', 'Superficies articulares', 'Cavidad glenoidea y cóndilo carpiano'],
  ['capsula', 'Cápsula y sinovial', 'Inserciones, cavidad y relaciones'], ['ligamentos', 'Ligamentos', 'Radiocarpianos, intercarpianos y CFCT'],
  ['miologia', 'Relaciones regionales: tendones', 'Flexores, extensores y túnel carpiano'], ['introduccion', 'Introducción', 'Definición, clasificación y articulaciones vecinas']
] as const

// ───────── Estación 2: disección virtual
export type Capa3D = Partial<Record<LayerId, { on: boolean; op: number }>>
export interface Item { id?: string; nombre: string; pista?: string }
export interface Paso {
  titulo: string; objetivo: string; plano: string
  modelo: { layers: Capa3D; view: ViewKey; hand: boolean; nota3d: string } | null
  placas: number[]; identificar: Item[]; relaciones: string; limit?: string
}
const sk = (op = 1) => ({ esqueleto: { on: true, op } })
export const DISECCION: Record<'palmar' | 'dorsal', Paso[]> = {
  palmar: [
    { titulo: 'Orientación superficial', plano: 'Plano 0 · Relieves y referencias', objetivo: 'Localizar y nombrar los relieves óseos palpables de la cara palmar de la muñeca.',
      modelo: { layers: sk(), view: 'palmar', hand: false, nota3d: 'Se muestra solo el esqueleto: la piel no tiene malla 3D.' }, placas: [8, 58],
      identificar: [{ id: 'pisiforme', nombre: 'Pisiforme', pista: 'Se palpa en el borde ulnar, distal al pliegue de la muñeca.' }, { id: 'escafoides', nombre: 'Tubérculo del escafoides', pista: 'Relieve lateral que se palpa en la base de la eminencia tenar.' }, { id: 'trapecio', nombre: 'Tubérculo del trapecio' }, { id: 'ganchoso', nombre: 'Gancho del hueso ganchoso' }, { id: 'estiloides_radial', nombre: 'Proceso estiloides del radio' }],
      relaciones: 'El pisiforme y el gancho del ganchoso delimitan medialmente el túnel carpiano; el tubérculo del escafoides y del trapecio lo delimitan lateralmente. Estos cuatro relieves son los anclajes del retináculo flexor.' },
    { titulo: 'Piel, tejido subcutáneo y fascia', plano: 'Plano 1 · Superficial', objetivo: 'Reconocer estructuras superficiales: ramos cutáneos, tendón del palmar largo y paso de nervios a la mano.',
      modelo: null, placas: [53, 51],
      identificar: [{ id: 'n_mediano', nombre: 'Nervio mediano', pista: 'Se hace superficial entre los tendones del palmar largo y del flexor radial del carpo, antes del túnel carpiano.' }, { id: 'n_ulnar', nombre: 'Nervio ulnar' }, { id: 'a_ulnar', nombre: 'Arteria ulnar' }, { nombre: 'Aponeurosis palmar', pista: 'Lámina fibrosa palmar que continúa el tendón del palmar largo.' }],
      relaciones: 'El nervio y la arteria ulnares pasan por el canal ulnar, lateral al pisiforme; el nervio mediano se dirige al túnel carpiano bajo el retináculo flexor.',
      limit: 'Sin malla 3D de piel, fascia ni nervios: este plano se estudia solo con ilustraciones 2D auténticas (Latarjet, Moore).' },
    { titulo: 'Tendones y retináculo flexor', plano: 'Plano 2 · Tendinoso', objetivo: 'Identificar los tendones flexores, el retináculo flexor y el contenido del túnel carpiano.',
      modelo: { layers: { esqueleto: { on: true, op: 0.3 }, tendones: { on: true, op: 0.85 } }, view: 'palmar', hand: false, nota3d: 'Capa 3D «Tendones»: músculos y retináculo flexor (BodyParts3D), sin vainas sinoviales.' }, placas: [28, 36, 63],
      identificar: [{ id: 'retinaculo_flexor', nombre: 'Retináculo flexor' }, { id: 'fcr', nombre: 'Flexor radial del carpo' }, { id: 'pl', nombre: 'Palmar largo' }, { id: 'fcu', nombre: 'Flexor ulnar del carpo' }, { id: 'fds', nombre: 'Flexor superficial de los dedos' }, { id: 'fdp', nombre: 'Flexor profundo de los dedos' }, { id: 'fpl', nombre: 'Flexor largo del pulgar' }, { id: 'n_mediano', nombre: 'Nervio mediano' }],
      relaciones: 'Bajo el retináculo flexor pasan los tendones del flexor superficial y profundo de los dedos, el flexor largo del pulgar y el nervio mediano. El flexor radial del carpo tiene su propio conducto lateral; el palmar largo es superficial al retináculo.' },
    { titulo: 'Estructuras capsuloligamentosas palmares', plano: 'Plano 3 · Capsuloligamentoso', objetivo: 'Reconocer los ligamentos que refuerzan la cápsula palmar y su orientación.',
      modelo: { layers: sk(0.35), view: 'palmar', hand: false, nota3d: 'No existen mallas de ligamentos ni de cápsula: se muestran los huesos en transparencia como referencia y los ligamentos solo en la lámina 2D.' }, placas: [19, 23, 21],
      identificar: [{ id: 'capsula', nombre: 'Cápsula articular' }, { id: 'lrcpalmar', nombre: 'Ligamento radiocarpiano palmar' }, { id: 'lradioescafocapitato', nombre: 'Radioescafocapitato' }, { id: 'lradiolunar_largo', nombre: 'Radiolunar largo' }, { id: 'lulnocarpiano', nombre: 'Ligamento ulnocarpiano palmar' }, { id: 'lcradial', nombre: 'Colateral radial' }, { id: 'lculnar', nombre: 'Colateral ulnar' }, { id: 'lrudistal', nombre: 'Radioulnar distal (palmar)' }],
      relaciones: 'Los fascículos radiocarpianos palmares se dirigen de lateral-proximal a medial-distal, hacia el escafoides, el semilunar y el hueso grande. El ligamento ulnocarpiano pertenece al complejo ulnar (CFCT), no a los radiocarpianos propiamente dichos.',
      limit: 'Ligamentos solo en 2D. No se simulan ligamentos con cintas ficticias.' },
    { titulo: 'Relaciones articulares profundas', plano: 'Plano 4 · Articular', objetivo: 'Comprender las superficies articulares, la sinovial y el disco que se ven al abrir la articulación.',
      modelo: { layers: { esqueleto: { on: true, op: 0.55 }, superficies: { on: true, op: 0.95 }, tfcc: { on: true, op: 0.9 } }, view: 'palmar', hand: false, nota3d: 'Superficies articulares derivadas por proximidad (aproximación) y marcador esquemático del disco.' }, placas: [13, 14, 17],
      identificar: [{ id: 'carilla_escafoidea', nombre: 'Carilla escafoidea del radio' }, { id: 'carilla_semilunar', nombre: 'Carilla semilunar del radio' }, { id: 'disco', nombre: 'Disco articular' }, { id: 'escafoides', nombre: 'Escafoides' }, { id: 'semilunar', nombre: 'Semilunar' }, { id: 'piramidal', nombre: 'Piramidal' }, { id: 'sinovial', nombre: 'Membrana sinovial y cavidad' }, { id: 'interlinea', nombre: 'Interlínea radiocarpiana' }],
      relaciones: 'El radio y el disco forman la cavidad glenoidea antebraquial; escafoides, semilunar y piramidal forman el cóndilo. El disco separa la cavidad radiocarpiana de la radioulnar distal.' }
  ],
  dorsal: [
    { titulo: 'Orientación superficial', plano: 'Plano 0 · Relieves y referencias', objetivo: 'Localizar los relieves óseos palpables del dorso de la muñeca.',
      modelo: { layers: sk(), view: 'dorsal', hand: false, nota3d: 'Se muestra solo el esqueleto: la piel no tiene malla 3D.' }, placas: [7, 26],
      identificar: [{ id: 'radio', nombre: 'Tubérculo dorsal del radio (de Lister)', pista: 'Relieve dorsal del radio; separa los compartimentos extensores 2.º y 3.º.' }, { id: 'estiloides_radial', nombre: 'Proceso estiloides del radio' }, { id: 'ulna', nombre: 'Cabeza de la ulna' }, { id: 'estiloides_ulnar', nombre: 'Proceso estiloides de la ulna' }, { id: 'escafoides', nombre: 'Escafoides (tabaquera anatómica)' }],
      relaciones: 'La tabaquera anatómica es la depresión lateral del dorso: su suelo lo forman el escafoides y el trapecio, y la cruza la arteria radial.' },
    { titulo: 'Piel, tejido subcutáneo y fascia', plano: 'Plano 1 · Superficial', objetivo: 'Reconocer venas y ramos cutáneos del dorso de la mano y la muñeca.',
      modelo: null, placas: [50, 57],
      identificar: [{ nombre: 'Red venosa dorsal', pista: 'Plexo venoso superficial del dorso de la mano (lámina de Rouvière).' }, { nombre: 'Vena cefálica del pulgar' }, { nombre: 'Vena basílica' }, { nombre: 'Ramos dorsales de los nervios radial y ulnar', pista: 'Ramos sensitivos cutáneos del dorso.' }],
      relaciones: 'Estas estructuras discurren sobre el retináculo extensor, en el tejido subcutáneo.', limit: 'Sin mallas 3D de venas ni nervios: solo ilustraciones 2D.' },
    { titulo: 'Tendones y retináculo extensor', plano: 'Plano 2 · Tendinoso', objetivo: 'Identificar los seis compartimentos extensores y sus tendones.',
      modelo: { layers: { esqueleto: { on: true, op: 0.3 }, tendones: { on: true, op: 0.85 } }, view: 'dorsal', hand: false, nota3d: 'Capa 3D «Tendones» (BodyParts3D). El retináculo extensor y las vainas solo en 2D.' }, placas: [33, 34, 31],
      identificar: [{ id: 'apl', nombre: 'Abductor largo del pulgar (1.º)' }, { id: 'epb', nombre: 'Extensor corto del pulgar (1.º)' }, { id: 'ecrl', nombre: 'Extensor radial largo del carpo (2.º)' }, { id: 'ecrb', nombre: 'Extensor radial corto del carpo (2.º)' }, { id: 'epl', nombre: 'Extensor largo del pulgar (3.º)' }, { id: 'ed', nombre: 'Extensor de los dedos (4.º)' }, { id: 'ei', nombre: 'Extensor del índice (4.º)' }, { id: 'edm', nombre: 'Extensor del meñique (5.º)' }, { id: 'ecu', nombre: 'Extensor ulnar del carpo (6.º)' }, { id: 'retinaculo_extensor', nombre: 'Retináculo extensor' }],
      relaciones: '1.º: abductor largo + extensor corto del pulgar; 2.º: extensores radiales; 3.º: extensor largo del pulgar (rodea el tubérculo de Lister); 4.º: extensor de los dedos + del índice; 5.º: extensor del meñique; 6.º: extensor ulnar del carpo, sobre la cabeza de la ulna.' },
    { titulo: 'Estructuras capsuloligamentosas dorsales', plano: 'Plano 3 · Capsuloligamentoso', objetivo: 'Reconocer los ligamentos dorsales radiocarpianos e intercarpianos.',
      modelo: { layers: sk(0.35), view: 'dorsal', hand: false, nota3d: 'Sin mallas de ligamentos: huesos en transparencia como referencia; ligamentos solo en la lámina 2D.' }, placas: [20, 24, 22],
      identificar: [{ id: 'lrcdorsal', nombre: 'Ligamento radiocarpiano dorsal' }, { id: 'lintercarpiano', nombre: 'Ligamento intercarpiano dorsal' }, { id: 'lcradial', nombre: 'Colateral radial' }, { id: 'lculnar', nombre: 'Colateral ulnar' }, { id: 'escapira', nombre: 'Escafopiramidal / trapezoescafoideo' }, { id: 'lrudistal', nombre: 'Radioulnar distal (dorsal)' }, { id: 'lescafolunar', nombre: 'Escafolunar interóseo (profundo)' }],
      relaciones: 'El ligamento radiocarpiano dorsal va del radio hacia semilunar y piramidal; el intercarpiano dorsal une el piramidal con los huesos laterales. Los tendones extensores y sus vainas son superficiales a estos ligamentos.',
      limit: 'Ligamentos solo en 2D.' },
    { titulo: 'Relaciones articulares profundas', plano: 'Plano 4 · Articular', objetivo: 'Ver la cápsula abierta por detrás, las superficies articulares y el disco.',
      modelo: { layers: { esqueleto: { on: true, op: 0.55 }, superficies: { on: true, op: 0.95 }, tfcc: { on: true, op: 0.9 } }, view: 'dorsal', hand: false, nota3d: 'Superficies derivadas por proximidad (aproximación); disco como marcador esquemático.' }, placas: [15, 14, 13],
      identificar: [{ id: 'capsula', nombre: 'Cápsula (seccionada)' }, { id: 'semilunar', nombre: 'Semilunar' }, { id: 'escafoides', nombre: 'Escafoides' }, { id: 'piramidal', nombre: 'Piramidal' }, { id: 'disco', nombre: 'Disco articular' }, { id: 'subvaina_ecu', nombre: 'Subvaina del extensor ulnar del carpo' }, { id: 'carilla_semilunar', nombre: 'Carilla semilunar del radio' }],
      relaciones: 'Al abrir la cápsula por el dorso se ve el cóndilo carpiano frente a la cavidad glenoidea antebraquial; la subvaina del extensor ulnar del carpo forma parte de la pared dorsal del CFCT.' }
  ]
}

// ───────── Estación 3: casos clínicos
export interface Op { t: string; ok?: boolean; fb: string }
export interface Preg { q: string; op: Op[]; porque: string; cat: string }
export interface Caso { id: string; titulo: string; tema: string; presentacion: string[]; hallazgos: string[]; preguntas: Preg[]; resumen: string; estructuras: string[]; placas: number[] }
export const CASOS: Caso[] = [
  { id: 'escafoides', titulo: 'Caída sobre la mano extendida', tema: 'Sospecha de lesión del escafoides',
    presentacion: ['Hombre de 22 años, futbolista aficionado, que cae sobre la mano derecha en extensión y desviación radial hace dos días.', 'Dolor en el borde radial de la muñeca, tumefacción leve y dolor al agarrar objetos.'],
    hallazgos: ['Dolor a la presión de la tabaquera anatómica y del tubérculo del escafoides.', 'Dolor con la compresión axial del pulgar.', 'Radiografía inicial (proyecciones habituales) sin fractura evidente.'],
    preguntas: [
      { cat: 'Razonamiento', q: '¿Qué estructura es la más probablemente lesionada?', porque: 'El mecanismo (caída con extensión y desviación radial) y la sensibilidad en la tabaquera apuntan al escafoides, el hueso carpiano más fracturado.',
        op: [{ t: 'Escafoides', ok: true, fb: 'Correcto: mecanismo y localización del dolor coinciden con el escafoides.' }, { t: 'Disco articular (CFCT)', fb: 'El CFCT produce dolor ulnar, no radial.' }, { t: 'Hueso ganchoso', fb: 'Su gancho duele en el lado ulnar palmar.' }, { t: 'Pisiforme', fb: 'Dolor ulnar palmar; mecanismo distinto.' }] },
      { cat: 'Anatomía', q: 'La tabaquera anatómica está limitada lateralmente por…', porque: 'Lateral: abductor largo y extensor corto del pulgar. Medial: extensor largo del pulgar. Suelo: escafoides y trapecio; la cruza la arteria radial.',
        op: [{ t: 'Abductor largo y extensor corto del pulgar', ok: true, fb: 'Correcto.' }, { t: 'Extensor largo del pulgar', fb: 'Ese tendón forma el límite medial, no el lateral.' }, { t: 'Flexor radial del carpo', fb: 'Es palmar, no dorsal.' }, { t: 'Extensor radial largo del carpo', fb: 'Discurre en el 2.º compartimento, medial a la tabaquera.' }] },
      { cat: 'Decisión', q: 'Con radiografía inicial normal y alta sospecha, ¿qué conducta es la más adecuada?', porque: 'La fractura puede no verse al inicio. Se inmoviliza como precaución (espica de pulgar) y se confirma con reevaluación/imagen avanzada.',
        op: [{ t: 'Inmovilizar con férula de espica de pulgar y confirmar con reevaluación o imagen avanzada (RM/TC)', ok: true, fb: 'Correcto: evita desplazamiento y no pierde el diagnóstico.' }, { t: 'Alta sin inmovilización porque la radiografía es normal', fb: 'Una radiografía inicial normal no descarta fractura de escafoides.' }, { t: 'Solicitar solo ecografía de partes blandas', fb: 'No resuelve la sospecha ósea.' }] },
      { cat: 'Razonamiento', q: '¿Por qué las fracturas de la cintura o del polo proximal tienen riesgo de necrosis avascular?', porque: 'Su irrigación principal es retrógrada, desde ramas de la arteria radial que entran por la región distal; el polo proximal queda poco irrigado.',
        op: [{ t: 'Irrigación predominantemente retrógrada: el polo proximal depende de vasos que entran distalmente', ok: true, fb: 'Correcto.' }, { t: 'Porque no tiene cartílago articular', fb: 'La mayor parte del hueso está cubierta de cartílago; ese no es el motivo.' }, { t: 'Porque lo irriga el nervio mediano', fb: 'Los nervios no irrigan; la irrigación es arterial (arteria radial).' }] }
    ],
    resumen: 'El escafoides cruza ambas hileras del carpo y su cintura es la zona más frecuente de fractura. La sensibilidad en la tabaquera anatómica y una radiografía inicial normal obligan a inmovilizar y confirmar.',
    estructuras: ['escafoides', 'carilla_escafoidea', 'a_radial', 'apl', 'epb', 'epl', 'lcradial', 'radio'], placas: [58, 45, 14] },
  { id: 'cfct', titulo: 'Dolor ulnar de la muñeca', tema: 'Posible lesión del complejo fibrocartilaginoso triangular',
    presentacion: ['Mujer de 35 años, carpintera, con dolor en el borde ulnar de la muñeca derecha desde hace tres meses, que empeoró tras una caída con la mano en pronación.', 'Refiere chasquidos al girar el antebrazo y dolor al apoyar peso.'],
    hallazgos: ['Dolor a la presión sobre la fóvea ulnar, entre el estiloides ulnar y el tendón del flexor ulnar del carpo.', 'Dolor con desviación ulnar y carga axial.', 'Radiografía: ulna proporcionalmente larga (varianza ulnar positiva), sin fractura.'],
    preguntas: [
      { cat: 'Razonamiento', q: '¿Qué estructura debe sospecharse como origen principal del dolor?', porque: 'Dolor ulnar, chasquidos con pronosupinación y carga ulnar sugieren lesión o sobrecarga del CFCT.',
        op: [{ t: 'Complejo fibrocartilaginoso triangular', ok: true, fb: 'Correcto.' }, { t: 'Ligamento colateral radial', fb: 'Es lateral: dolor radial.' }, { t: 'Fractura del escafoides', fb: 'Produciría dolor en la tabaquera.' }, { t: 'Retináculo flexor', fb: 'Produce síntomas del túnel carpiano (mediano).' }] },
      { cat: 'Anatomía', q: '¿Cuál de estos elementos forma parte del CFCT?', porque: 'El CFCT incluye el disco articular, los ligamentos radioulnares dorsal y palmar, el colateral ulnar y la subvaina del extensor ulnar del carpo (y el homólogo meniscal).',
        op: [{ t: 'Ligamentos radioulnares distales palmar y dorsal', ok: true, fb: 'Correcto.' }, { t: 'Ligamento radioescafocapitato', fb: 'Es un fascículo radiocarpiano palmar, no del CFCT.' }, { t: 'Ligamento escafolunar interóseo', fb: 'Es intercarpiano.' }] },
      { cat: 'Biomecánica', q: '¿Por qué aumenta el dolor en desviación ulnar con carga?', porque: 'En desviación ulnar el piramidal se desliza bajo el disco y aumenta el contacto ulnocarpiano; con ulna larga la sobrecarga es mayor (choque ulnar).',
        op: [{ t: 'Aumenta el contacto del piramidal con el disco articular y la carga ulnocarpiana', ok: true, fb: 'Correcto.' }, { t: 'Porque el escafoides se separa del radio', fb: 'Eso ocurre en la disociación escafolunar, no con este dolor.' }, { t: 'Porque se tensa el retináculo flexor', fb: 'No es la causa del dolor ulnar con la desviación.' }] },
      { cat: 'Decisión', q: '¿Qué estudio ayuda a confirmar la lesión del disco y a diferenciar de inestabilidad radioulnar distal?', porque: 'La radiografía mide la varianza ulnar; la RM/artro-RM o la artroscopía evalúan el disco y sus inserciones. La perforación comunica las cavidades radiocarpiana y radioulnar distal.',
        op: [{ t: 'RM o artro-RM (o artroscopía) tras radiografías para varianza ulnar', ok: true, fb: 'Correcto.' }, { t: 'Solo gammagrafía de columna', fb: 'No se relaciona con la región.' }, { t: 'No se requieren estudios; se descarta el diagnóstico', fb: 'Con clínica compatible debe confirmarse.' }] }
    ],
    resumen: 'El CFCT estabiliza la radioulnar distal y amortigua la carga ulnocarpiana. No es un ligamento propio de la radiocarpiana: pertenece al complejo ulnar. Su perforación comunica dos cavidades sinoviales.',
    estructuras: ['disco', 'lrudistal', 'insercion_foveal', 'lulnolunar', 'lulnotriquetral', 'homologo_meniscal', 'subvaina_ecu', 'ulna', 'estiloides_ulnar', 'rel_piramidal_disco'], placas: [14, 17, 19] }
]
