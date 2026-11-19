import { STRUCTURES, type Structure, type Disp } from './structures'

const SRC = 'Síntesis docente a partir de Moore (9.ª ed.), Latarjet–Ruiz Liard (5.ª ed.) y Rouvière–Delmas (11.ª ed.); sin citas de página.'
const fig = (t: string) => `${t} ${SRC}`
const L58 = 'Ilustraciones: Latarjet–Ruiz Liard, figs. 58-1 a 58-4 (galerías de los módulos 3–5).'

type P = Partial<Structure> & { id: string; nombre: string }
const add = (capa: string, disp: Disp, list: P[], tipo: string) => list.forEach(x => {
  STRUCTURES[x.id] = { tipo, capa, disp, fuente: SRC, ...x } as Structure
})

// ───────── Superficies articulares (3D derivado por proximidad / 2D)
add('superficies', '3D derivado', [
  { id: 'carilla_escafoidea', nombre: 'Carilla escafoidea del radio', term: 'Facies articularis carpalis (porción lateral, fosa escafoidea)',
    definicion: 'Porción lateral de la superficie carpiana de la extremidad distal del radio que se articula con el escafoides.',
    ubicacion: 'Cara inferior (distal) del radio, lateral a la cresta roma que la separa de la carilla semilunar.',
    morfologia: 'Superficie triangular, cóncava, revestida de cartílago hialino.', superficies: 'Articula con la superficie proximal del escafoides (articulación radiocarpiana).',
    relaciones: 'Lateral: proceso estiloides del radio. Medial: carilla semilunar. Distal: escafoides.', funcion: 'Recibe la mayor parte de la carga axial transmitida por el escafoides.',
    biomecanica: 'Orienta el cóndilo carpiano; su inclinación (radial y palmar) se mide en radiografía.', clinica: 'Las fracturas intraarticulares del radio distal pueden desnivelarla y producir artrosis radioescafoidea.',
    fuente: fig(L58), limitaciones: 'Zona calculada por proximidad (≤ 4 mm) y orientación de normales sobre la malla BodyParts3D: es una aproximación, no una segmentación anatómica del cartílago.' },
  { id: 'carilla_semilunar', nombre: 'Carilla semilunar del radio', term: 'Facies articularis carpalis (porción medial, fosa semilunar)',
    definicion: 'Porción medial de la superficie carpiana del radio que se articula con el semilunar.',
    ubicacion: 'Cara distal del radio, medial a la carilla escafoidea y lateral a la escotadura ulnar.', morfologia: 'Superficie cuadrangular, cóncava.',
    superficies: 'Articula con la superficie proximal del semilunar.', relaciones: 'Lateral: carilla escafoidea. Medial: escotadura ulnar y disco articular.',
    funcion: 'Soporta carga axial desde el semilunar.', biomecanica: 'Junto con la carilla escafoidea forma la porción radial de la cavidad glenoidea antebraquial.',
    clinica: 'Fragmento semilunar en fracturas intraarticulares (die-punch) con depresión de la superficie.', fuente: fig(L58),
    limitaciones: 'Zona calculada por proximidad (≤ 7 mm; la malla deja ~5 mm de separación por cartílago) y orientación de normales: aproximación.' },
  { id: 'sup_escafoides_prox', nombre: 'Superficie proximal del escafoides', definicion: 'Faceta convexa del escafoides que se articula con la carilla escafoidea del radio.',
    ubicacion: 'Cara proximal (superior) del escafoides.', morfologia: 'Superficie convexa, ligeramente alargada, revestida de cartílago.',
    superficies: 'Articula con la carilla escafoidea del radio.', relaciones: 'Medial: faceta para el semilunar.', funcion: 'Transmite fuerzas del carpo al radio.',
    biomecanica: 'Forma, con semilunar y piramidal, el cóndilo carpiano.', clinica: 'Cartílago afectado en la artrosis radioescafoidea (SLAC) tras inestabilidad escafolunar.', fuente: fig(L58),
    limitaciones: 'Zona derivada por proximidad (≤ 4 mm) sobre la malla.' },
  { id: 'sup_semilunar_prox', nombre: 'Superficie proximal del semilunar', definicion: 'Faceta convexa del semilunar que se articula con la carilla semilunar del radio.',
    ubicacion: 'Cara proximal del semilunar.', morfologia: 'Superficie convexa lisa.', superficies: 'Articula con la carilla semilunar del radio y, medialmente, con el disco articular.',
    relaciones: 'Lateral: escafoides. Medial: piramidal.', funcion: 'Componente central del cóndilo carpiano.', biomecanica: 'Su posición condiciona la alineación del carpo (flexión o extensión del segmento intercalado).',
    clinica: 'Necrosis avascular (Kienböck) con colapso de la superficie.', fuente: fig(L58), limitaciones: 'Zona derivada por proximidad (≤ 7 mm), pequeña por la separación de la malla: aproximación.' },
  { id: 'rel_piramidal_disco', nombre: 'Relación del piramidal con el disco articular', disp: '2D', definicion: 'Contacto variable entre la cara proximal del piramidal y la cara inferior del disco articular.',
    ubicacion: 'Borde ulnar de la cavidad glenoidea antebraquial.', morfologia: 'En la desviación ulnar el piramidal se desplaza bajo el disco; en desviación radial se aleja.',
    relaciones: 'Proximal: disco articular. Lateral: semilunar. Palmar: pisiforme.', funcion: 'Aporta continuidad entre el disco y el cóndilo carpiano.',
    biomecanica: 'El contacto aumenta con la desviación ulnar.', clinica: 'Zona de pinzamiento ulnocarpiano.', fuente: fig(L58),
    limitaciones: 'Sin malla 3D del disco articular en BodyParts3D: se estudia en las láminas 2D del atlas.' },
  { id: 'cartilago', nombre: 'Cartílago articular (hialino)', disp: '2D', definicion: 'Revestimiento hialino de las superficies articulares radiocarpianas.',
    ubicacion: 'Carillas escafoidea y semilunar del radio, y superficies proximales de escafoides, semilunar y piramidal.', morfologia: 'Capa delgada, lisa; en cortes coronales aparece como banda clara entre las superficies óseas.',
    funcion: 'Reduce la fricción y distribuye cargas.', biomecanica: 'Su espesor no se representa en las mallas, que solo contienen hueso.', clinica: 'Degeneración en artrosis tras fracturas o inestabilidad.', fuente: fig(L58),
    limitaciones: 'No hay malla de cartílago verificada: se muestra únicamente en las láminas 2D (corte coronal) y como zonas de contacto derivadas.' },
  { id: 'interlinea', nombre: 'Interlínea radiocarpiana', disp: '2D', definicion: 'Línea articular entre el radio/disco y la hilera proximal del carpo.',
    ubicacion: 'Entre la cavidad glenoidea antebraquial y el cóndilo carpiano.', morfologia: 'Curva de convexidad proximal en el corte coronal; contornea los tres huesos de la hilera proximal.',
    relaciones: 'Distal a ella: interlínea mediocarpiana. Proximal: radio y disco.', funcion: 'Plano de movimiento de la articulación radiocarpiana.', clinica: 'Referencia radiográfica de alineación.', fuente: fig(L58) },
  { id: 'estiloides_radial', nombre: 'Proceso estiloides del radio', disp: '2D', term: 'Processus styloideus radii', definicion: 'Prolongación lateral y distal de la extremidad inferior del radio.',
    ubicacion: 'Borde lateral de la extremidad distal del radio.', morfologia: 'Proyección cónica, más distal que el estiloides ulnar.', relaciones: 'Base: tendón del braquiorradial. Lateral: tabaquera anatómica.',
    inserciones: 'Ligamento colateral radial del carpo; tendón del braquiorradial (base).', funcion: 'Guía la desviación radial y ancla el ligamento colateral.', clinica: 'Su fractura aislada compromete ligamentos radiocarpianos.', fuente: fig(L58) },
  { id: 'estiloides_ulnar', nombre: 'Proceso estiloides de la ulna', disp: '2D', term: 'Processus styloideus ulnae', definicion: 'Prolongación posteromedial de la cabeza de la ulna.',
    ubicacion: 'Borde medial de la extremidad distal de la ulna.', morfologia: 'Proyección cónica pequeña; en su base se localiza la fóvea.', relaciones: 'Dorsal: surco del extensor ulnar del carpo.',
    inserciones: 'Ligamento colateral ulnar del carpo y complejo fibrocartilaginoso triangular (vértice del disco).', funcion: 'Ancla estructuras ulnares.', clinica: 'La fractura de la base puede desestabilizar el CFCT.', fuente: fig(L58) }
], 'Superficie / accidente')

// ───────── Cápsula y sinovial (2D)
add('capsula', '2D', [
  { id: 'capsula', nombre: 'Cápsula articular fibrosa', term: 'Capsula articularis', definicion: 'Manguito fibroso que rodea la articulación radiocarpiana y la une con ligamentos que la refuerzan.',
    ubicacion: 'Rodea la cavidad glenoidea antebraquial y la cara proximal de la hilera proximal del carpo.', morfologia: 'Delgada y laxa en los lados dorsal y palmar; reforzada por ligamentos.',
    inserciones: 'Proximal: márgenes de la cavidad glenoidea antebraquial (radio y disco). Distal: cara proximal de escafoides, semilunar y piramidal, cerca de sus márgenes articulares.',
    relaciones: 'Porción palmar: ligamentos radiocarpianos palmares y ulnocarpiano. Porción dorsal: ligamento radiocarpiano dorsal. Laterales: colaterales radial y ulnar. Externamente: tendones y sus vainas.',
    funcion: 'Contiene el líquido sinovial y estabiliza la articulación.', biomecanica: 'Los refuerzos ligamentarios limitan los extremos de flexión, extensión y desviaciones.', clinica: 'Ganglios y sinovitis surgen de la cápsula y sinovial; la cápsula se lesiona en luxaciones.',
    fuente: fig(L58), limitaciones: 'No existe malla 3D de la cápsula en BodyParts3D: se representa solo en láminas 2D (Latarjet, figs. 58-1 y 58-4; Rouvière, vista posterior abierta).' },
  { id: 'sinovial', nombre: 'Membrana sinovial y cavidad articular', term: 'Membrana synovialis', definicion: 'Tapiza la cara profunda de la cápsula y delimita la cavidad radiocarpiana.',
    ubicacion: 'Cara interna de la cápsula; cavidad entre el radio/disco y la hilera proximal.', morfologia: 'Forma pliegues (anterior y posterior) y recesos; la cavidad suele ser independiente de la radioulnar distal.',
    relaciones: 'Separada de la cavidad radioulnar distal por el disco articular. Puede comunicar con el receso preestiloideo y, en algunos casos, con la sinovial pisipiramidal.',
    funcion: 'Produce líquido sinovial que lubrica y nutre el cartílago.', biomecanica: 'Los pliegues acompañan el movimiento y amortiguan.', clinica: 'La perforación del disco comunica ambas cavidades; la artrografía lo evidencia.',
    fuente: fig(L58), limitaciones: 'La cavidad no tiene malla 3D: se estudia en las láminas 2D del módulo 4.' },
  { id: 'receso_preestiloideo', nombre: 'Receso preestiloideo', disp: '2D', definicion: 'Prolongación sinovial junto al proceso estiloides de la ulna.',
    ubicacion: 'Cara medial de la articulación, anterior al estiloides ulnar.', morfologia: 'Fondo de saco de la sinovial; descrito en la lámina 58-1 de Latarjet–Ruiz Liard.', relaciones: 'Cercano al disco articular.', clinica: 'Puede distenderse en sinovitis.', fuente: fig(L58) },
  { id: 'pliegue_sinovial', nombre: 'Pliegues sinoviales anterior y posterior', disp: '2D', definicion: 'Repliegues de la sinovial en las caras palmar y dorsal de la articulación.',
    ubicacion: 'Márgenes anterior y posterior de la cavidad radiocarpiana.', morfologia: 'Repliegues laminares señalados como «pliegue sinovial anterior/posterior» en la lámina 58-1.', funcion: 'Amortiguan y acompañan los movimientos.', clinica: 'Pueden pinzarse (sinovitis dorsal).', fuente: fig(L58) }
], 'Cápsula / sinovial')

// ───────── Ligamentos radiocarpianos (2D)
add('lig_rc', '2D', [
  { id: 'lradioescafocapitato', nombre: 'Ligamento radioescafocapitato', definicion: 'Fascículo palmar que une el radio con el escafoides y el hueso grande.',
    ubicacion: 'Porción lateral del ligamento radiocarpiano palmar.', morfologia: 'Banda oblicua, de lateral a medial y distal.', inserciones: 'Proceso estiloides y margen palmar del radio; cintura del escafoides y cara palmar del hueso grande.',
    relaciones: 'Profundo respecto al túnel carpiano.', funcion: 'Soporta el escafoides como una hamaca.', biomecanica: 'Limita la extensión y la supinación del carpo.', clinica: 'Lesionado en luxaciones perisemilunares.', fuente: fig('Nombre de los fascículos según texto de Moore y Rouvière; la lámina 58-2 de Latarjet rotula el conjunto como «ligamento radiocarpiano palmar».'),
    limitaciones: 'Nomenclatura de fascículos: verificar con su texto, pues varía entre autores. Sin malla 3D.' },
  { id: 'lradiolunar_largo', nombre: 'Ligamento radiolunar largo', definicion: 'Fascículo palmar del radio al semilunar.', ubicacion: 'Porción media del ligamento radiocarpiano palmar.',
    morfologia: 'Banda ancha oblicua.', inserciones: 'Margen palmar del radio (cerca de la carilla semilunar); cara palmar del semilunar.', relaciones: 'Medial al radioescafocapitato.',
    funcion: 'Estabiliza el semilunar frente al radio.', biomecanica: 'Resiste la traslación ulnar del carpo.', clinica: 'Su lesión se asocia a inestabilidad ulnocarpiana.', fuente: SRC, limitaciones: 'Nomenclatura de fascículos según textos; sin malla 3D.' },
  { id: 'lradiolunar_corto', nombre: 'Ligamento radiolunar corto', definicion: 'Fascículo palmar profundo que une el radio con el semilunar.', ubicacion: 'Profundo al radiolunar largo.',
    inserciones: 'Margen palmar del radio y cara palmar del semilunar.', funcion: 'Fija el semilunar al radio.', biomecanica: 'Estabilizador del semilunar.', clinica: 'Importante en luxaciones del semilunar.', fuente: SRC,
    limitaciones: 'Descrito en la literatura moderna; confirmar en su texto de referencia. Sin malla 3D.' },
  { id: 'lradioescafolunar', nombre: 'Fascículo radioescafolunar', definicion: 'Repliegue neurovascular entre los ligamentos radioescafocapitato y radiolunar largo.',
    ubicacion: 'Cara palmar, entre ambos fascículos radiocarpianos.', morfologia: 'Tejido con vasos y fibras nerviosas; algunos autores lo consideran más un pliegue sinovial que un ligamento mecánico.',
    funcion: 'Aporta vasos y propiocepción.', biomecanica: 'Estabilizador menor.', clinica: 'Se secciona en abordajes palmares.', fuente: SRC, limitaciones: 'Su carácter ligamentario es discutido; sin malla 3D.' },
  { id: 'lintercarpiano_palmar', nombre: 'Ligamento intercarpiano palmar (radiado del carpo)', definicion: 'Fascículos divergentes del hueso grande a los demás huesos del carpo.',
    ubicacion: 'Cara palmar, a nivel mediocarpiano.', inserciones: 'Hueso grande; escafoides, semilunar, piramidal y hueso ganchoso.', funcion: 'Estabilizador mediocarpiano.', clinica: 'Lesión en luxaciones perisemilunares.', fuente: SRC,
    limitaciones: 'Pertenece a la mediocarpiana: no es radiocarpiano propiamente dicho. Sin malla 3D.' }
], 'Ligamento')

// ───────── Estabilizadores intercarpianos (2D)
add('intercarpianos', '2D', [
  { id: 'lescafolunar', nombre: 'Ligamento escafolunar interóseo', definicion: 'Ligamento entre escafoides y semilunar que cierra el espacio entre ambos.',
    ubicacion: 'Entre los bordes proximales de escafoides y semilunar.', morfologia: 'Porciones dorsal (gruesa, la más resistente), media y palmar.', inserciones: 'Márgenes articulares proximales de escafoides y semilunar.',
    funcion: 'Mantiene la unión mecánica de ambos huesos.', biomecanica: 'Acopla la flexión del escafoides con la extensión del semilunar.', clinica: 'Su rotura causa disociación escafolunar, inestabilidad carpiana y, con el tiempo, artrosis (SLAC).', fuente: SRC, limitaciones: 'Sin malla 3D.' },
  { id: 'llunopiramidal', nombre: 'Ligamento lunopiramidal interóseo', definicion: 'Ligamento entre semilunar y piramidal.', ubicacion: 'Entre los bordes proximales de semilunar y piramidal.',
    inserciones: 'Márgenes articulares proximales de ambos huesos.', funcion: 'Mantiene la unión de la hilera proximal en su lado ulnar.', biomecanica: 'Transmite el movimiento entre ambos huesos.', clinica: 'Su lesión produce inestabilidad ulnar del carpo.', fuente: SRC, limitaciones: 'Sin malla 3D.' }
], 'Ligamento intercarpiano')

// ───────── TFCC (2D / esquemático)
add('tfcc', '2D', [
  { id: 'insercion_foveal', nombre: 'Inserciones foveales y estiloideas del CFCT', definicion: 'Puntos de anclaje ulnares del complejo fibrocartilaginoso triangular.',
    ubicacion: 'Fóvea (depresión en la base del proceso estiloides) y propio estiloides de la ulna.', morfologia: 'Fibras profundas y superficiales de los ligamentos radioulnares convergen en la base del estiloides.',
    funcion: 'Fijan el CFCT a la ulna.', biomecanica: 'Estabilizan la articulación radioulnar distal.', clinica: 'Avulsión foveal: inestabilidad radioulnar distal.', fuente: SRC, limitaciones: 'Descripción detallada en textos de cirugía de la mano; verifique con su referencia. Sin malla 3D.' },
  { id: 'lulnolunar', nombre: 'Ligamento ulnolunar', definicion: 'Fascículo ulnocarpiano palmar que une el CFCT con el semilunar.', ubicacion: 'Cara palmar del lado ulnar.',
    inserciones: 'Ligamento radioulnar palmar/fóvea; cara palmar del semilunar.', funcion: 'Une la ulna al carpo (relación ulnocarpiana, no radioulnar).', biomecanica: 'Soporta el lado ulnar del carpo.', clinica: 'Parte del complejo ulnocarpiano.', fuente: SRC, limitaciones: 'La lámina 58-2 de Latarjet rotula el conjunto como «ligamento ulnocarpiano palmar». Sin malla 3D.' },
  { id: 'lulnotriquetral', nombre: 'Ligamento ulnotriquetral', definicion: 'Fascículo ulnocarpiano palmar del CFCT al piramidal.', ubicacion: 'Cara palmar del lado ulnar.',
    inserciones: 'CFCT/estiloides; cara palmar del piramidal.', funcion: 'Une la ulna al carpo.', biomecanica: 'Soporte ulnar.', clinica: 'Su lesión forma parte del dolor ulnar de la muñeca.', fuente: SRC, limitaciones: 'Ver nota del ligamento ulnolunar. Sin malla 3D.' },
  { id: 'homologo_meniscal', nombre: 'Homólogo meniscal', definicion: 'Estructura de tejido blando en el borde ulnar del CFCT, entre ulna y piramidal.',
    ubicacion: 'Lado ulnar de la articulación, bajo el estiloides ulnar.', morfologia: 'Pliegue fibrocartilaginoso/sinovial que prolonga el disco hacia el piramidal.', funcion: 'Aumenta la congruencia ulnocarpiana.', clinica: 'Puede lesionarse junto con el CFCT.', fuente: SRC, limitaciones: 'Su descripción varía entre autores; sin malla 3D.' },
  { id: 'subvaina_ecu', nombre: 'Subvaina del extensor ulnar del carpo', definicion: 'Conducto fibroso propio del tendón del extensor ulnar del carpo.',
    ubicacion: 'Surco dorsal de la cabeza de la ulna (6.º compartimento extensor).', morfologia: 'Subvaina que forma parte del CFCT (pared dorsal).', funcion: 'Mantiene el tendón en su surco y estabiliza la articulación radioulnar distal.',
    clinica: 'Subluxación del tendón cuando se rompe.', fuente: SRC, limitaciones: 'Sin malla 3D de la subvaina; el tendón sí se representa en la capa de tendones.' }
], 'CFCT / radioulnar distal')

// ───────── Tendones sin malla 3D / regional (2D)
add('tendones', '2D', [
  { id: 'retinaculo_extensor', nombre: 'Retináculo de los extensores', definicion: 'Banda fibrosa que retiene los tendones extensores a nivel dorsal de la muñeca.',
    ubicacion: 'Dorso de la muñeca, sobre radio y ulna distales.', morfologia: 'Forma seis compartimentos osteofibrosos.', funcion: 'Evita el abombamiento de los tendones.', clinica: 'Tenosinovitis estenosante (de De Quervain en el 1.er compartimento).',
    fuente: fig('Láminas de Latarjet (vainas del dorso) en el módulo 6.'), limitaciones: 'No hay malla 3D del retináculo extensor: se estudia en láminas 2D.' },
  { id: 'compartimentos_ext', nombre: 'Compartimentos extensores (1.º a 6.º)', definicion: 'Seis conductos dorsales del retináculo de los extensores.',
    morfologia: '1.º: abductor largo y extensor corto del pulgar. 2.º: extensores radiales largo y corto del carpo. 3.º: extensor largo del pulgar. 4.º: extensor de los dedos y del índice. 5.º: extensor del meñique. 6.º: extensor ulnar del carpo.',
    relaciones: 'El tubérculo dorsal del radio (de Lister) separa el 2.º y el 3.er compartimento.', clinica: 'Sitio de tenosinovitis y de rotura tendinosa tras fracturas.', fuente: SRC, limitaciones: 'Esquema 2D; las mallas de tendones aparecen sin sus vainas.' }
], 'Estructura regional')

// ───────── Vascularización / inervación (2D)
add('vasc', '2D', [
  { id: 'a_radial', nombre: 'Arteria radial', definicion: 'Rama terminal lateral de la arteria braquial en el antebrazo.', ubicacion: 'Lateral en el antebrazo; cruza la tabaquera anatómica.',
    morfologia: 'Emite ramas carpianas palmar y dorsal.', relaciones: 'Cruza el escafoides y el trapecio en el dorso.', vascinerv: 'Irriga la articulación mediante las redes carpianas.', clinica: 'Se palpa en la muñeca; su rama dorsal irriga el polo proximal del escafoides (retrógrado).', fuente: SRC,
    limitaciones: 'BodyParts3D no contiene el tronco de la arteria radial derecha: solo ilustraciones 2D (Latarjet, láminas 59-12 y siguientes del módulo 8).' },
  { id: 'a_ulnar', nombre: 'Arteria ulnar', definicion: 'Rama terminal medial de la arteria braquial.', ubicacion: 'Medial en el antebrazo; entra a la mano por el canal ulnar.',
    relaciones: 'Lateral al nervio ulnar en la muñeca.', vascinerv: 'Ramas carpianas palmar y dorsal.', clinica: 'Lesión en traumatismo ulnar de la muñeca.', fuente: SRC, limitaciones: 'Sin tronco 3D derecho en el conjunto BodyParts3D: solo láminas 2D.' },
  { id: 'redes_carpianas', nombre: 'Redes carpianas palmar y dorsal', definicion: 'Anastomosis arteriales alrededor del carpo.', ubicacion: 'Caras palmar y dorsal del carpo.',
    morfologia: 'La red dorsal recibe ramas dorsales radial, ulnar e interóseas; la palmar, ramas palmares de radial, ulnar e interósea anterior.', vascinerv: 'Irrigan cápsula, ligamentos y huesos del carpo.', clinica: 'Base de la irrigación del escafoides y del semilunar.', fuente: SRC,
    limitaciones: 'En 3D solo se dispone de las ramas carpianas dorsales y de la interósea anterior; la red completa solo en 2D.' },
  { id: 'n_interoseo_ant', nombre: 'Nervio interóseo anterior (rama del mediano)', disp: '2D', definicion: 'Rama del nervio mediano que desciende por la membrana interósea.',
    ubicacion: 'Cara anterior de la membrana interósea del antebrazo.', vascinerv: 'Da ramos articulares a la cara palmar de la articulación de la muñeca.', funcion: 'Inerva la cápsula palmar (propiocepción y dolor).', clinica: 'Su denervación se usa en cirugía del dolor de muñeca.', fuente: SRC,
    limitaciones: 'No hay malla 3D de nervios derechos del antebrazo en BodyParts3D: ilustraciones 2D (Latarjet figs. 62-14, 62-17 y 62-18).' },
  { id: 'n_interoseo_post', nombre: 'Nervio interóseo posterior (rama del radial)', disp: '2D', definicion: 'Rama profunda del nervio radial que termina en el dorso de la muñeca.',
    ubicacion: 'Cara posterior de la membrana interósea; termina bajo el cuarto compartimento extensor.', vascinerv: 'Ramos articulares para la cara dorsal de la cápsula radiocarpiana.', clinica: 'Neurectomía en el tratamiento del dolor de muñeca.', fuente: SRC,
    limitaciones: 'Sin malla 3D: ilustraciones 2D de inervación (módulo 8).' },
  { id: 'n_mediano', nombre: 'Nervio mediano', disp: '2D', definicion: 'Nervio que atraviesa el túnel carpiano.', ubicacion: 'Palmar, bajo el retináculo flexor, entre los tendones flexores.',
    relaciones: 'Superficial a los tendones del flexor superficial de los dedos en el túnel.', clinica: 'Síndrome del túnel carpiano; compresión por luxación del semilunar.', fuente: SRC, limitaciones: 'Sin malla 3D derecha en BodyParts3D: láminas 2D (módulos 6 y 8).' },
  { id: 'n_ulnar', nombre: 'Nervio ulnar', disp: '2D', definicion: 'Nervio medial de la muñeca.', ubicacion: 'Canal ulnar, lateral al pisiforme.', relaciones: 'Rama profunda alrededor del gancho del hueso ganchoso.',
    clinica: 'Compresión en el canal ulnar; lesión en la fractura del ganchoso.', fuente: SRC, limitaciones: 'Sin malla 3D derecha: láminas 2D del módulo 8.' }
], 'Vascularización / inervación')

// ───────── Estructuras 3D reales regionales
const REAL = 'Malla BodyParts3D (© DBCLS, CC BY-SA 2.1 JP), recortada ~7,5 cm proximal a la muñeca; identidad según el nombre FMA del archivo y su posición en el atlas común.'
const m = (id: string, nombre: string, term: string, def: string, ubi: string, ins: string, func: string, bio: string, cli: string, vi?: string, extra?: string): P =>
  ({ id, nombre, term, definicion: def, ubicacion: ubi, inserciones: ins, funcion: func, biomecanica: bio, clinica: cli, vascinerv: vi, limitaciones: REAL + (extra ? ' ' + extra : '') })
add('tendones', '3D real', [
  m('fcr', 'Flexor radial del carpo', 'M. flexor carpi radialis', 'Músculo flexor superficial lateral; su tendón cruza la muñeca por su propio conducto en el surco del trapecio.', 'Cara anterior del antebrazo; tendón palmar lateral.', 'Origen: epicóndilo medial (tendón flexor común). Inserción: base del 2.º (y 3.er) metacarpiano.', 'Flexión y abducción de la mano.', 'Estabilizador dinámico palmar-radial.', 'Tendinitis; referencia para el abordaje palmar.', 'Nervio mediano.'),
  m('fcu', 'Flexor ulnar del carpo', 'M. flexor carpi ulnaris', 'Flexor medial de la muñeca; su tendón contiene el pisiforme (sesamoideo).', 'Cara anterior-medial del antebrazo.', 'Origen: epicóndilo medial y olécranon/borde posterior de la ulna. Inserción: pisiforme, ganchoso y 5.º metacarpiano (por los ligamentos pisoganchoso y pisometacarpiano).', 'Flexión y aducción de la mano.', 'Estabilizador dinámico ulnar.', 'Tendinitis calcificante cercana al pisiforme.', 'Nervio ulnar.', 'Se representan las dos cabezas (humeral y ulnar) como un solo conjunto.'),
  m('pl', 'Palmar largo', 'M. palmaris longus', 'Músculo inconstante cuyo largo tendón se inserta en el retináculo flexor y la aponeurosis palmar.', 'Cara anterior del antebrazo, centro.', 'Origen: epicóndilo medial. Inserción: retináculo flexor y aponeurosis palmar.', 'Tensa la aponeurosis palmar; flexor débil.', 'Estabilizador palmar.', 'Ausente en una proporción de personas; se usa como injerto tendinoso.', 'Nervio mediano.'),
  m('ecrl', 'Extensor radial largo del carpo', 'M. extensor carpi radialis longus', 'Extensor radial del carpo, 2.º compartimento extensor.', 'Dorso-lateral del antebrazo.', 'Origen: cresta supracondílea lateral del húmero. Inserción: base del 2.º metacarpiano.', 'Extensión y abducción de la mano.', 'Estabiliza la muñeca en extensión (agarre).', 'Tendinopatía de la intersección.', 'Nervio radial.'),
  m('ecrb', 'Extensor radial corto del carpo', 'M. extensor carpi radialis brevis', 'Extensor del carpo, 2.º compartimento.', 'Dorso-lateral del antebrazo.', 'Origen: epicóndilo lateral. Inserción: base del 3.er metacarpiano.', 'Extensión de la muñeca.', 'Estabilizador dinámico dorsal.', 'Epicondilitis lateral (origen común).', 'Nervio radial (rama profunda).'),
  m('ecu', 'Extensor ulnar del carpo', 'M. extensor carpi ulnaris', 'Extensor medial del carpo; 6.º compartimento, en el surco de la cabeza de la ulna.', 'Dorso-medial del antebrazo.', 'Origen: epicóndilo lateral y borde posterior de la ulna. Inserción: base del 5.º metacarpiano.', 'Extensión y aducción de la mano.', 'Estabilizador ulnar y de la radioulnar distal (subvaina).', 'Subluxación del tendón; dolor ulnar.', 'Nervio radial (interóseo posterior).'),
  m('apl', 'Abductor largo del pulgar', 'M. abductor pollicis longus', 'Músculo del 1.er compartimento extensor.', 'Borde radial de la muñeca.', 'Origen: radio, ulna y membrana interósea (posterior). Inserción: base del 1.er metacarpiano.', 'Abducción del pulgar y desviación radial.', 'Estabiliza el lado radial.', 'Tenosinovitis de De Quervain.', 'Nervio interóseo posterior.'),
  m('epb', 'Extensor corto del pulgar', 'M. extensor pollicis brevis', '1.er compartimento extensor.', 'Borde radial de la muñeca.', 'Origen: radio y membrana interósea. Inserción: base de la falange proximal del pulgar.', 'Extensión de la 1.ª articulación MCF.', 'Con el abductor forma el borde lateral de la tabaquera.', 'Tenosinovitis de De Quervain.', 'Nervio interóseo posterior.'),
  m('epl', 'Extensor largo del pulgar', 'M. extensor pollicis longus', '3.er compartimento; gira alrededor del tubérculo dorsal del radio.', 'Dorso del radio y pulgar.', 'Origen: ulna y membrana interósea. Inserción: base de la falange distal del pulgar.', 'Extensión del pulgar.', 'Borde medial de la tabaquera.', 'Rotura tras fractura del radio distal.', 'Nervio interóseo posterior.'),
  m('ed', 'Extensor de los dedos', 'M. extensor digitorum', 'Extensor común de los dedos II–V, 4.º compartimento.', 'Dorso del antebrazo y mano.', 'Origen: epicóndilo lateral. Inserción: expansión extensora de los dedos II–V.', 'Extensión de los dedos y, accesoriamente, de la muñeca.', 'Estabilizador dorsal.', 'Sitio de ganglios dorsales.', 'Nervio interóseo posterior.'),
  m('ei', 'Extensor del índice', 'M. extensor indicis', 'Extensor propio del índice (4.º compartimento).', 'Dorso del antebrazo distal.', 'Origen: ulna y membrana interósea (dorsal). Inserción: expansión extensora del índice.', 'Extensión del índice.', 'Contribuye a la extensión independiente del índice.', 'Donante tendinoso en transferencias.', 'Nervio interóseo posterior.'),
  m('edm', 'Extensor del meñique', 'M. extensor digiti minimi', '5.º compartimento extensor.', 'Dorso del antebrazo distal, medial.', 'Origen: epicóndilo lateral (tendón común). Inserción: expansión extensora del 5.º dedo.', 'Extensión del meñique.', 'Participa en la estabilidad dorsal ulnar.', 'Tenosinovitis rara.', 'Nervio interóseo posterior.'),
  m('fds', 'Flexor superficial de los dedos', 'M. flexor digitorum superficialis', 'Flexor de las falanges medias de los dedos II–V; sus tendones atraviesan el túnel carpiano.', 'Cara anterior del antebrazo y palma.', 'Origen: epicóndilo medial, ulna y radio. Inserción: falanges medias de II–V.', 'Flexión de la articulación IFP y MCF; flexión de la muñeca.', 'Estabilizador palmar.', 'Tenosinovitis; compresión mediana.', 'Nervio mediano.'),
  m('fdp', 'Flexor profundo de los dedos', 'M. flexor digitorum profundus', 'Flexor de las falanges distales II–V; tendones en el túnel carpiano.', 'Plano profundo anterior del antebrazo y palma.', 'Origen: ulna y membrana interósea. Inserción: falanges distales II–V.', 'Flexión de la articulación IFD y de los dedos.', 'Estabilizador palmar profundo.', 'Dedo en martillo/avulsión del flexor profundo.', 'Nervios mediano (II–III) y ulnar (IV–V).'),
  m('fpl', 'Flexor largo del pulgar', 'M. flexor pollicis longus', 'Único flexor de la falange distal del pulgar; pasa por el túnel carpiano.', 'Cara anterior-lateral del antebrazo y eminencia tenar.', 'Origen: radio y membrana interósea. Inserción: falange distal del pulgar.', 'Flexión del pulgar.', 'Estabilizador lateral palmar.', 'Rotura tras lesiones del radio distal.', 'Nervio interóseo anterior (mediano).')
], 'Músculo / tendón')
add('tendones', '3D real', [
  { id: 'retinaculo_flexor', nombre: 'Retináculo flexor (ligamento transverso del carpo)', term: 'Retinaculum musculorum flexorum', definicion: 'Banda fibrosa que cierra por delante el túnel carpiano.',
    ubicacion: 'Cara palmar del carpo, entre el tubérculo del escafoides y trapecio (lateral) y el pisiforme y gancho del ganchoso (medial).', morfologia: 'Lámina fibrosa gruesa y transversal.',
    inserciones: 'Tubérculo del escafoides y del trapecio; pisiforme y hámulo del ganchoso.', relaciones: 'Contiene tendones flexores y el nervio mediano; superficial: eminencias tenar e hipotenar.',
    funcion: 'Mantiene los tendones flexores contra el carpo.', biomecanica: 'Aumenta el brazo de palanca de los flexores.', clinica: 'Se secciona en la liberación del túnel carpiano.', vascinerv: 'Nervio mediano en profundidad.',
    fuente: SRC, limitaciones: REAL }
], 'Retináculo')
add('tfcc', '3D real', [
  { id: 'membrana', nombre: 'Membrana interósea del antebrazo', term: 'Membrana interossea antebrachii', definicion: 'Lámina fibrosa entre los bordes interóseos de radio y ulna.',
    ubicacion: 'Cuerpo del antebrazo, entre radio y ulna.', morfologia: 'Fibras oblicuas; incluye la cuerda oblicua y la banda accesoria.', inserciones: 'Bordes interóseos de radio y ulna.',
    funcion: 'Une radio y ulna y transmite carga; superficie de origen de músculos profundos.', biomecanica: 'No pertenece al CFCT ni a la radiocarpiana: estabiliza el antebrazo en el plano longitudinal.', clinica: 'Lesión en fracturas por inestabilidad longitudinal del antebrazo.',
    fuente: SRC, limitaciones: REAL + ' Se incluye en la capa 6 solo como estabilizador radioulnar vecino.' }
], 'Ligamento regional')
add('vasc', '3D real', [
  { id: 'a_interosea_ant', nombre: 'Arteria interósea anterior', term: 'A. interossea anterior', definicion: 'Rama de la arteria interósea común que desciende sobre la membrana interósea.',
    ubicacion: 'Cara anterior de la membrana interósea del antebrazo.', morfologia: 'Termina en la cara posterior mediante su rama perforante, y emite rama a la red carpiana palmar.', relaciones: 'Acompaña al nervio interóseo anterior.', vascinerv: 'Contribuye a las redes carpianas palmar y dorsal.', clinica: 'Fuente de la irrigación del antebrazo profundo.',
    fuente: SRC, limitaciones: REAL + ' Solo se dispone de su segmento distal.' },
  { id: 'a_carpiana_dorsal_r', nombre: 'Rama carpiana dorsal de la arteria radial', definicion: 'Rama de la arteria radial para la red carpiana dorsal.', ubicacion: 'Dorso del carpo, a nivel de la primera fila.',
    relaciones: 'Cruza el dorso bajo los tendones extensores.', vascinerv: 'Forma el arco carpiano dorsal con la rama ulnar y la interósea.', clinica: 'Contribuye a la irrigación del escafoides (por ramas dorsales).', fuente: SRC, limitaciones: REAL },
  { id: 'a_carpiana_dorsal_u', nombre: 'Rama carpiana dorsal de la arteria ulnar', definicion: 'Rama de la arteria ulnar para la red carpiana dorsal.', ubicacion: 'Dorso medial del carpo.',
    vascinerv: 'Completa el arco carpiano dorsal.', fuente: SRC, limitaciones: REAL },
  { id: 'arco_superficial', nombre: 'Arco palmar superficial', definicion: 'Arco arterial de la palma, principalmente de la arteria ulnar.', ubicacion: 'Palma, distal al retináculo flexor.',
    vascinerv: 'Da las arterias digitales palmares comunes.', clinica: 'Se prueba con la prueba de Allen (lectura por permeabilidad).', fuente: SRC, limitaciones: REAL + ' Es una estructura de la mano, no de la articulación radiocarpiana.' },
  { id: 'arco_profundo', nombre: 'Arco palmar profundo', definicion: 'Arco arterial profundo de la palma, principalmente de la arteria radial.', ubicacion: 'Palma, a nivel de las bases de los metacarpianos.',
    vascinerv: 'Da las arterias metacarpianas palmares.', fuente: SRC, limitaciones: REAL + ' Complementario: no pertenece a la articulación radiocarpiana.' }
], 'Arteria')

// ───────── Mano (hueso)
const DED = ['Pulgar (I)', 'Índice (II)', 'Medio (III)', 'Anular (IV)', 'Meñique (V)']
for (let i = 1; i <= 5; i++) STRUCTURES['mc' + i] = {
  id: 'mc' + i, nombre: `${i}.º metacarpiano`, tipo: 'Hueso complementario', capa: 'esqueleto', disp: '3D real', term: 'Os metacarpi ' + ['I', 'II', 'III', 'IV', 'V'][i - 1], definicion: `Hueso largo de la palma correspondiente al dedo ${DED[i - 1]}.`,
  ubicacion: 'Esqueleto de la mano distal a la fila distal del carpo.', morfologia: 'Base proximal, diáfisis y cabeza distal.', superficies: 'Base: articulaciones carpometacarpianas. Cabeza: articulación metacarpofalángica.',
  relaciones: 'Proximal: carpo (trapecio para el 1.º; trapezoide para el 2.º; grande para el 3.º; ganchoso para 4.º y 5.º).', funcion: 'Transmite fuerzas de los dedos al carpo.',
  biomecanica: 'Estructura complementaria: no forma parte de la articulación radiocarpiana.', clinica: 'Fracturas del 1.º (Bennett) y del 5.º (boxeador) son frecuentes.', fuente: SRC,
  limitaciones: 'Malla BodyParts3D (CC BY-SA 2.1 JP), baja resolución, suavizada.' }
const FAL: [string, string, string][] = [['fp', 'Falange proximal', 'Os phalangis proximalis'], ['mp', 'Falange media', 'Os phalangis medialis'], ['dp', 'Falange distal', 'Os phalangis distalis']]
for (let d = 1; d <= 5; d++) for (const [k, n, t] of FAL) {
  if (d === 1 && k === 'mp') continue
  STRUCTURES[k + d] = { id: k + d, nombre: `${n} del dedo ${DED[d - 1]}`, tipo: 'Hueso complementario', capa: 'esqueleto', disp: '3D real', term: t,
    definicion: `${n} del ${DED[d - 1].toLowerCase()}.`, ubicacion: 'Dedos de la mano.', morfologia: 'Hueso largo corto con base, diáfisis y cabeza (la distal termina en la tuberosidad).',
    funcion: 'Segmento móvil del dedo.', biomecanica: 'Estructura complementaria: no forma parte de la articulación radiocarpiana.', clinica: 'Fracturas por aplastamiento y avulsión tendinosa.', fuente: SRC,
    limitaciones: 'Malla BodyParts3D (CC BY-SA 2.1 JP), baja resolución, suavizada. El pulgar tiene solo dos falanges.' }
}
// ───────── Enriquecer fichas antiguas
const OLD: Record<string, [string, Disp, string]> = {
  radio: ['esqueleto', '3D real', 'Hueso'], ulna: ['esqueleto', '3D real', 'Hueso'], escafoides: ['esqueleto', '3D real', 'Hueso'], semilunar: ['esqueleto', '3D real', 'Hueso'],
  piramidal: ['esqueleto', '3D real', 'Hueso'], pisiforme: ['esqueleto', '3D real', 'Hueso'], trapecio: ['esqueleto', '3D real', 'Hueso'], trapezoide: ['esqueleto', '3D real', 'Hueso'],
  grande: ['esqueleto', '3D real', 'Hueso'], ganchoso: ['esqueleto', '3D real', 'Hueso'], disco: ['tfcc', '3D esquemático', 'Fibrocartílago'],
  lrcpalmar: ['lig_rc', '2D', 'Ligamento'], lrcdorsal: ['lig_rc', '2D', 'Ligamento'], lcradial: ['lig_rc', '2D', 'Ligamento'], lculnar: ['lig_rc', '2D', 'Ligamento'],
  lulnocarpiano: ['tfcc', '2D', 'Ligamento'], lrudistal: ['tfcc', '2D', 'Ligamento'], lintercarpiano: ['intercarpianos', '2D', 'Ligamento'], escapira: ['intercarpianos', '2D', 'Ligamento']
}
const TERM: Record<string, [string, string?]> = {
  radio: ['Radius'], ulna: ['Ulna'], escafoides: ['Os scaphoideum', 'Navicular de la mano (denominación tradicional)'], semilunar: ['Os lunatum', 'Lunatum'],
  piramidal: ['Os triquetrum', 'Triquetro / cuneiforme'], pisiforme: ['Os pisiforme'], trapecio: ['Os trapezium', 'Mayor multángulo (tradicional)'], trapezoide: ['Os trapezoideum', 'Menor multángulo (tradicional)'],
  grande: ['Os capitatum', 'Capitato / hueso grande'], ganchoso: ['Os hamatum', 'Hamato / unciforme'], disco: ['Discus articularis (complexus fibrocartilagineus triangularis)'],
  lrcpalmar: ['Lig. radiocarpale palmare'], lrcdorsal: ['Lig. radiocarpale dorsale'], lcradial: ['Lig. collaterale carpi radiale'], lculnar: ['Lig. collaterale carpi ulnare'],
  lulnocarpiano: ['Lig. ulnocarpale palmare'], lrudistal: ['Ligg. radioulnaria dorsale et palmare'], lintercarpiano: ['Lig. intercarpale dorsale']
}
for (const [id, [capa, disp, tipo]] of Object.entries(OLD)) {
  const s = STRUCTURES[id]; if (!s) continue
  s.capa = capa; s.disp = disp; s.tipo = tipo; s.fuente = SRC; s.term = TERM[id]?.[0]; s.trad = TERM[id]?.[1]
  if (disp === '2D') s.limitaciones = 'No existe malla 3D verificada de este ligamento: se estudia en las láminas 2D del atlas (Latarjet, figs. 58-2 y 58-3).'
  if (disp === '3D real') s.limitaciones = 'Malla BodyParts3D (CC BY-SA 2.1 JP): baja resolución, suavizada, de un individuo de referencia.'
}
if (STRUCTURES.radio) {
  STRUCTURES.radio.trad = 'El tubérculo dorsal se conoce también como tubérculo de Lister.'
  STRUCTURES.radio.vascinerv = 'Irrigado por ramas de la arteria radial y de la interósea anterior; inervación articular de los interóseos.'
}
if (STRUCTURES.escafoides) STRUCTURES.escafoides.vascinerv = 'Irrigación principalmente por ramas dorsales y palmares de la arteria radial; el polo proximal recibe flujo retrógrado.'
if (STRUCTURES.disco) { STRUCTURES.disco.limitaciones = 'No existe malla de disco articular en BodyParts3D: se muestra únicamente un marcador ESQUEMÁTICO de ubicación (malla de alambre), no una reconstrucción anatómica.'; STRUCTURES.disco.fuente = SRC }
if (STRUCTURES.lrudistal) STRUCTURES.lrudistal.nombre = 'Ligamentos radioulnares distales (palmar y dorsal)'
if (STRUCTURES.lulnocarpiano) STRUCTURES.lulnocarpiano.nombre = 'Ligamento ulnocarpiano palmar (ulnolunar y ulnotriquetral)'
if (STRUCTURES.escapira) STRUCTURES.escapira.nombre = 'Ligamentos intercarpianos dorsales (escafopiramidal y trapezoescafoideo)'
