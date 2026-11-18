export interface Section { h: string; p?: string; li?: string[] }
export interface Module { id: string; n: number; titulo: string; lema: string; sections: Section[]; imgs: number[]; chips?: string[] }

export const BIBLIO = [
  'Moore KL, Dalley AF, Agur AMR. Anatomía con orientación clínica. 9.ª ed.',
  'Latarjet M, Ruiz Liard A. Anatomía humana. 5.ª ed.',
  'Rouvière H, Delmas A. Anatomía humana descriptiva, topográfica y funcional. 11.ª ed.'
]

export const MODULES: Module[] = [
  { id: 'introduccion', n: 1, titulo: 'Introducción', lema: 'Definición, clasificación y relaciones de la muñeca', imgs: [26, 58, 14, 63, 7],
    sections: [
      { h: 'Definición', p: 'La articulación radiocarpiana (de la muñeca, en sentido estricto) une la extremidad distal del radio y el disco articular con la hilera proximal del carpo: escafoides, semilunar y piramidal.' },
      { h: 'Clasificación', li: ['Sinovial de tipo elipsoidea (condílea), con dos ejes de movimiento: flexión–extensión y desviaciones radial–ulnar.', 'Superficie proximal: cavidad glenoidea antebraquial (radio + disco articular).', 'Superficie distal: cóndilo carpiano (escafoides, semilunar, piramidal).'] },
      { h: 'Ubicación', p: 'Se localiza entre el antebrazo y la mano; su interlínea es convexa proximalmente y queda a la altura del proceso estiloides de la ulna y del radio.' },
      { h: 'Articulaciones vecinas — diferenciar', li: ['Radiocarpiana: radio + disco ↔ hilera proximal.', 'Radioulnar distal: cabeza ulnar ↔ escotadura ulnar del radio (pronosupinación).', 'Mediocarpiana: entre las hileras proximal y distal del carpo.', 'Intercarpianas y carpometacarpianas: más distales.'] },
      { h: 'Relaciones', p: 'Anterior: tendones flexores y túnel carpiano. Posterior: tendones extensores bajo el retináculo. Lateral: tabaquera anatómica y arteria radial. Medial: canal ulnar.' }
    ] },
  { id: 'osteologia', n: 2, titulo: 'Osteología', lema: 'Radio, ulna y huesos del carpo', imgs: [1, 27, 7, 8, 9, 3, 4, 26],
    sections: [
      { h: 'Radio distal', p: 'Extremidad ensanchada; cara carpiana con fosas escafoidea y semilunar, proceso estiloides lateral, escotadura ulnar medial y tubérculo dorsal.' },
      { h: 'Ulna distal', p: 'Cabeza con circunferencia articular y proceso estiloides posteromedial; separada del carpo por el disco articular.' },
      { h: 'Carpo — hilera proximal (lateral a medial)', li: ['Escafoides', 'Semilunar', 'Piramidal', 'Pisiforme (sesamoideo, sobre el piramidal)'] },
      { h: 'Carpo — hilera distal (lateral a medial)', li: ['Trapecio', 'Trapezoide', 'Hueso grande (capitato)', 'Hueso ganchoso (hamato)'] },
      { h: 'Uso del laboratorio', p: 'Seleccione cada hueso en el Laboratorio 2D + 3D para ver su ficha con relaciones, inserciones y correlación clínica.' }
    ] },
  { id: 'superficies', n: 3, titulo: 'Superficies articulares', lema: 'Cavidad glenoidea antebraquial y cóndilo carpiano', imgs: [13, 14, 15, 16, 17, 25],
    sections: [
      { h: 'Cavidad glenoidea antebraquial', p: 'Formada por las fosas escafoidea y semilunar del radio y por el disco articular. Es cóncava en ambos sentidos.' },
      { h: 'Cóndilo carpiano', p: 'Superficie convexa formada por escafoides, semilunar y piramidal, unidos por los ligamentos interóseos que les dan continuidad.' },
      { h: 'Cartílago hialino y disco', p: 'Las superficies están revestidas de cartílago hialino. El disco articular es fibrocartilaginoso y aumenta la congruencia en el lado ulnar.' },
      { h: 'Por qué la ulna no participa directamente', p: 'El disco articular se interpone entre la cabeza ulnar y el carpo; la radiocarpiana es radio + disco ↔ carpo.' }
    ] },
  { id: 'capsula', n: 4, titulo: 'Cápsula y sinovial', lema: 'Envoltura fibrosa y cavidad articular', imgs: [13, 14, 15, 16, 17, 22],
    sections: [
      { h: 'Cápsula articular', p: 'Manguito fibroso que rodea la articulación; se inserta proximalmente en los bordes de la cavidad glenoidea antebraquial y distalmente en la cara proximal de la hilera proximal.' },
      { h: 'Refuerzos', p: 'Ligamentos radiocarpianos palmar y dorsal, colaterales radial y ulnar, y ligamento ulnocarpiano.' },
      { h: 'Membrana sinovial y cavidad', p: 'Tapiza la cara profunda de la cápsula y forma pliegues y recesos; habitualmente es independiente de la sinovial radioulnar distal, que está separada por el disco articular. La perforación del disco pone ambas cavidades en comunicación.' },
      { h: 'Relaciones anatómicas', p: 'Tendones flexores y extensores y sus vainas sinoviales se disponen por fuera de la cápsula.' }
    ] },
  { id: 'ligamentos', n: 5, titulo: 'Ligamentos', lema: 'Estabilizadores extrínsecos e intrínsecos', imgs: [19, 20, 21, 22, 23, 24, 25],
    sections: [
      { h: 'Radiocarpianos palmares y dorsales', p: 'Los palmares son los más fuertes; los dorsales son más delgados.' },
      { h: 'Colaterales', p: 'Colateral radial (estiloides radial → escafoides) y colateral ulnar (estiloides ulnar → piramidal y pisiforme).' },
      { h: 'Estabilizadores intercarpianos', p: 'Los ligamentos interóseos escafosemilunar y semilunopiramidal unen los huesos de la hilera proximal; los ligamentos intercarpianos dorsal y palmar conectan ambas hileras.' },
      { h: 'Complejo fibrocartilaginoso triangular', p: 'Disco articular, ligamentos radioulnares dorsal y palmar, colateral ulnar y vaina del extensor ulnar del carpo.' },
      { h: 'Interacción', p: 'Los ligamentos de los hotspots del Laboratorio (vistas palmar y dorsal) incluyen ficha detallada.' }
    ] },
  { id: 'miologia', n: 6, titulo: 'Miología', lema: 'Tendones y estabilizadores dinámicos', imgs: [28, 29, 31, 32, 34, 30, 33, 35, 36, 37, 63],
    sections: [
      { h: 'Flexores', li: ['Flexor radial del carpo', 'Flexor ulnar del carpo', 'Palmar largo', 'Flexor superficial y profundo de los dedos', 'Flexor largo del pulgar'] },
      { h: 'Extensores y compartimentos dorsales', li: ['1.º: abductor largo y extensor corto del pulgar', '2.º: extensores radiales largo y corto del carpo', '3.º: extensor largo del pulgar', '4.º: extensor de los dedos y del índice', '5.º: extensor del meñique', '6.º: extensor ulnar del carpo'] },
      { h: 'Túnel carpiano', p: 'Bajo el retináculo flexor transcurren los tendones de los flexores superficial y profundo de los dedos, el flexor largo del pulgar y el nervio mediano; el flexor radial del carpo tiene su propio conducto lateral.' },
      { h: 'Estabilizadores dinámicos', p: 'Los tendones cruzan la muñeca sin insertarse en el carpo proximal (excepto el flexor ulnar del carpo en el pisiforme), actuando sobre la mano y generando compresión estabilizadora.' }
    ] },
  { id: 'biomecanica', n: 7, titulo: 'Biomecánica', lema: 'Movimientos y mediocarpiana', imgs: [40, 41, 42, 39, 38, 43, 44],
    sections: [
      { h: 'Movimientos', li: ['Flexión (≈ 80–90° según Rouvière) y extensión', 'Desviación radial (abducción) y ulnar (aducción)', 'Circunducción: combinación secuencial de los movimientos anteriores'] },
      { h: 'Participación mediocarpiana', p: 'Los movimientos de la muñeca ocurren simultáneamente en las articulaciones radiocarpiana y mediocarpiana; en la flexión predomina la mediocarpiana y en la extensión la radiocarpiana (valores relativos según los textos).' },
      { h: 'Ejes', p: 'El eje de flexión–extensión es transversal y el de desviación es anteroposterior; ambos pasan por la cabeza del hueso grande.' },
      { h: 'Simulación', p: 'Use el Simulador en el modelo 3D para observar flexión, extensión y desviaciones con fines didácticos (es una animación esquemática, no una medición).' }
    ] },
  { id: 'vascularizacion', n: 8, titulo: 'Vascularización e inervación', lema: 'Redes arteriales y nervios articulares', imgs: [45, 46, 47, 48, 49, 51, 50, 52, 53, 54, 57, 55, 56],
    sections: [
      { h: 'Arterias', p: 'Las arterias radial y ulnar y las interóseas anterior y posterior forman las redes carpianas palmar y dorsal que irrigan la cápsula y los huesos.' },
      { h: 'Contribuciones interóseas', p: 'Ramas terminales de las arterias interóseas anterior y posterior participan en las redes carpianas.' },
      { h: 'Venas', p: 'Drenan a los sistemas venosos dorsal y palmar acompañando a las arterias.' },
      { h: 'Nervios articulares', p: 'Contribuyen ramas de los nervios interóseo anterior (mediano), interóseo posterior (radial) y ramos del ulnar.' }
    ] },
  { id: 'clinica', n: 9, titulo: 'Clínica', lema: 'Traumatismos, inestabilidad y radiografía', imgs: [58, 59, 60, 61, 62, 63, 64],
    sections: [
      { h: 'Fracturas del radio distal', li: ['Colles: fractura extraarticular del extremo distal, fragmento desplazado hacia dorsal (deformidad en dorso de tenedor)', 'Smith: desplazamiento palmar', 'Barton: fractura marginal con subluxación del carpo'] },
      { h: 'Fractura del escafoides', p: 'La más frecuente del carpo; dolor en la tabaquera anatómica; riesgo de necrosis avascular del polo proximal.' },
      { h: 'Lesiones ligamentarias e inestabilidad', p: 'La lesión del ligamento escafosemilunar produce disociación; las luxaciones perisemilunares siguen secuencias de lesión carpiana.' },
      { h: 'Radiografía', p: 'Evaluar inclinación radial, inclinación palmar, varianza ulnar y alineación carpiana (proyecciones dorsopalmar y lateral).' },
      { h: 'Complejo fibrocartilaginoso triangular', p: 'Dolor ulnar, chasquido y sobrecarga ulnocarpiana; el choque ulnar se relaciona con la varianza ulnar positiva.' }
    ] },
  { id: 'evaluacion', n: 10, titulo: 'Evaluación', lema: 'Identificación 3D, preguntas y casos clínicos', imgs: [], sections: [] }
]
