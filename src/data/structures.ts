export type Disp = '3D real' | '3D derivado' | '3D esquemático' | '2D'
export interface Structure {
  id: string; nombre: string; tipo: string
  capa?: string; disp?: Disp; term?: string; trad?: string; definicion?: string
  ubicacion?: string; morfologia?: string; superficies?: string; relaciones?: string; inserciones?: string
  funcion?: string; biomecanica?: string; vascinerv?: string; clinica?: string; fuente?: string; limitaciones?: string
}

export const STRUCTURES: Record<string, Structure> = {
  radio: {
    id: 'radio', nombre: 'Radio (extremidad distal)', tipo: 'Hueso',
    ubicacion: 'Hueso lateral del antebrazo; su extremidad distal forma la porción proximal y principal de la articulación radiocarpiana.',
    morfologia: 'Extremidad inferior ensanchada. La cara carpiana presenta dos fosas separadas por una cresta roma: la fosa escafoidea (lateral) y la fosa semilunar (medial). Lateralmente se proyecta el proceso estiloides; medialmente, la escotadura ulnar recibe la cabeza de la ulna; dorsalmente, el tubérculo dorsal separa surcos para tendones extensores.',
    relaciones: 'Distal: escafoides y semilunar. Medial: cabeza de la ulna (articulación radioulnar distal) y disco articular. Dorsal: tendones extensores en sus compartimentos. Palmar: músculo pronador cuadrado y tendones flexores.',
    inserciones: 'Proceso estiloides: ligamento colateral radial del carpo y tendón del braquiorradial (base). Bordes de la cara carpiana: cápsula y ligamentos radiocarpianos palmar y dorsal. Base del disco articular en el borde medial de la escotadura ulnar.',
    funcion: 'Soporta la mayor parte de la carga axial transmitida desde la mano hacia el antebrazo y proporciona la cavidad glenoidea antebraquial.',
    biomecanica: 'La superficie carpiana está inclinada hacia ulnar (inclinación radial) y ligeramente hacia palmar (inclinación palmar); ambas orientan el cóndilo carpiano y son parámetros radiográficos de referencia.',
    clinica: 'Sitio frecuente de fractura: Colles (extremo distal, fragmento desplazado dorsalmente), Smith (desplazamiento palmar) y Barton (fractura marginal con subluxación carpiana). La pérdida de inclinación altera la biomecánica de la muñeca.'
  },
  ulna: {
    id: 'ulna', nombre: 'Ulna (cabeza y proceso estiloides)', tipo: 'Hueso',
    ubicacion: 'Hueso medial del antebrazo; su extremidad distal queda separada del carpo por el disco articular.',
    morfologia: 'Cabeza redondeada con circunferencia articular que se aloja en la escotadura ulnar del radio; el proceso estiloides se proyecta posteromedialmente. Un surco en la cara posterior de la cabeza aloja el tendón del extensor ulnar del carpo.',
    relaciones: 'Lateral: escotadura ulnar del radio. Distal: disco articular (no articula directamente con el carpo). Dorsal: tendón del extensor ulnar del carpo.',
    inserciones: 'Proceso estiloides: ligamento colateral ulnar del carpo y vértice del disco articular (complejo fibrocartilaginoso triangular).',
    funcion: 'Constituye el pilar fijo del antebrazo alrededor del cual rota el radio en pronosupinación; transmite una fracción menor de la carga a través del disco.',
    biomecanica: 'La longitud relativa respecto al radio (varianza ulnar) modifica la carga sobre el disco articular.',
    clinica: 'La ulna no pertenece a la articulación radiocarpiana propiamente dicha: pertenece a la radioulnar distal. Una ulna relativamente larga se asocia a síndrome de choque ulnar con sobrecarga del complejo fibrocartilaginoso.'
  },
  escafoides: {
    id: 'escafoides', nombre: 'Escafoides', tipo: 'Hueso',
    ubicacion: 'Hueso más lateral de la hilera proximal del carpo.',
    morfologia: 'Forma de barco, con polo proximal, cintura y polo distal; el tubérculo se proyecta en la cara palmar. Superficie proximal convexa para la fosa escafoidea del radio.',
    relaciones: 'Proximal: radio. Medial: semilunar y cabeza del hueso grande. Distal: trapecio y trapezoide. Su cintura cruza ambas hileras y lo vincula a la estabilidad mediocarpiana. Lateral: arteria radial en la tabaquera anatómica.',
    inserciones: 'Tubérculo: retináculo flexor (ligamento transverso del carpo) y ligamento colateral radial.',
    funcion: 'Une mecánicamente la hilera proximal con la distal.',
    biomecanica: 'Se flexiona en la desviación radial y se extiende en la ulnar; actúa como puente entre ambas hileras.',
    clinica: 'Es el hueso carpiano más fracturado; dolor en la tabaquera anatómica. Su irrigación es principalmente retrógrada (desde distal): riesgo de necrosis avascular del polo proximal y no consolidación. Las fracturas pueden no verse en la radiografía inicial.'
  },
  semilunar: {
    id: 'semilunar', nombre: 'Semilunar', tipo: 'Hueso',
    ubicacion: 'Hueso central de la hilera proximal, frente a la fosa semilunar del radio.',
    morfologia: 'Forma de media luna; cara proximal convexa, cara distal cóncava que aloja la cabeza del hueso grande.',
    relaciones: 'Proximal: radio y disco articular. Lateral: escafoides. Medial: piramidal. Distal: hueso grande. Su cara palmar se relaciona con el túnel carpiano.',
    inserciones: 'Ligamentos interóseos escafosemilunar y semilunopiramidal; ligamentos radiocarpianos palmar y dorsal.',
    funcion: 'Es la clave de la hilera proximal («segmento intercalado»), sin inserciones tendinosas.',
    biomecanica: 'Responde a las fuerzas del escafoides y del piramidal mediante los ligamentos interóseos; su posición define la alineación del carpo.',
    clinica: 'La lesión del ligamento escafosemilunar produce disociación (ensanchamiento del espacio en la radiografía). La luxación palmar puede comprimir el nervio mediano. Necrosis avascular: enfermedad de Kienböck.'
  },
  piramidal: {
    id: 'piramidal', nombre: 'Piramidal (triquetro)', tipo: 'Hueso',
    ubicacion: 'Hueso medial de la hilera proximal.',
    morfologia: 'Forma piramidal; presenta una faceta palmar para el pisiforme y una faceta distal para el hueso ganchoso.',
    relaciones: 'Lateral: semilunar. Palmar: pisiforme. Distal: hueso ganchoso. Proximal: disco articular durante la desviación ulnar.',
    inserciones: 'Ligamento colateral ulnar del carpo; ligamentos radiocarpiano dorsal e intercarpiano dorsal; ligamento ulnocarpiano palmar.',
    funcion: 'Completa el cóndilo carpiano en su borde ulnar.',
    biomecanica: 'En la desviación ulnar se desliza sobre el hueso ganchoso (movimiento helicoidal) y aumenta su contacto con el disco articular.',
    clinica: 'Sus fracturas son frecuentes (segunda en frecuencia entre las carpianas, usualmente avulsiones dorsales); la lesión del ligamento semilunopiramidal causa inestabilidad ulnar.'
  },
  pisiforme: {
    id: 'pisiforme', nombre: 'Pisiforme', tipo: 'Hueso',
    ubicacion: 'Sobre la cara palmar del piramidal, en el borde ulnar del carpo.',
    morfologia: 'Pequeño hueso sesamoideo redondeado; una sola faceta articular (con el piramidal).',
    relaciones: 'Articula únicamente con el piramidal (articulación pisipiramidal). Cercano al canal ulnar (nervio y arteria ulnares).',
    inserciones: 'Tendón del flexor ulnar del carpo, ligamentos pisoganchoso y pisometacarpiano, retináculo flexor y origen del abductor del meñique.',
    funcion: 'Aumenta el brazo de palanca del flexor ulnar del carpo.',
    biomecanica: 'Funciona como polea y punto de anclaje de los estabilizadores ulnares.',
    clinica: 'Fracturas por traumatismo directo; artrosis pisipiramidal. Referencia palpable para localizar el canal ulnar.'
  },
  trapecio: {
    id: 'trapecio', nombre: 'Trapecio', tipo: 'Hueso',
    ubicacion: 'Hueso más lateral de la hilera distal.',
    morfologia: 'Presenta una faceta en silla de montar para el primer metacarpiano y un tubérculo palmar con surco para el tendón del flexor radial del carpo.',
    relaciones: 'Proximal: escafoides. Medial: trapezoide. Distal: 1.er y 2.º metacarpianos.',
    inserciones: 'Tubérculo: retináculo flexor, abductor corto y oponente del pulgar.',
    funcion: 'Permite la movilidad del pulgar (articulación carpometacarpiana en silla).',
    biomecanica: 'Pertenece a la articulación mediocarpiana; su movilidad condiciona la oposición del pulgar.',
    clinica: 'Frecuente localización de artrosis trapeciometacarpiana (rizartrosis).'
  },
  trapezoide: {
    id: 'trapezoide', nombre: 'Trapezoide', tipo: 'Hueso',
    ubicacion: 'Hilera distal, entre el trapecio y el hueso grande.',
    morfologia: 'Pequeño, en cuña, con una carilla distal para el 2.º metacarpiano.',
    relaciones: 'Proximal: escafoides. Lateral: trapecio. Medial: hueso grande. Distal: 2.º metacarpiano.',
    inserciones: 'Sin inserciones tendinosas propias; ligamentos intercarpianos y carpometacarpianos.',
    funcion: 'Transmite fuerzas del índice al escafoides.',
    biomecanica: 'Participa en la mediocarpiana en bloque con el resto de la hilera distal, que funciona como unidad.',
    clinica: 'Raramente lesionado de forma aislada.'
  },
  grande: {
    id: 'grande', nombre: 'Hueso grande (capitato)', tipo: 'Hueso',
    ubicacion: 'Centro de la hilera distal; es el hueso más grande del carpo.',
    morfologia: 'Cabeza redondeada proximal, cuello y cuerpo; su cabeza se aloja en la concavidad formada por el escafoides y el semilunar.',
    relaciones: 'Proximal: escafoides y semilunar. Lateral: trapezoide. Medial: ganchoso. Distal: 3.er metacarpiano (también 2.º y 4.º).',
    inserciones: 'Ligamentos intercarpianos y carpometacarpianos; origen de fibras del aductor del pulgar (cabeza oblicua).',
    funcion: 'Eje central del carpo; relaciona la columna central de la mano.',
    biomecanica: 'Los movimientos de flexión-extensión y desviación se producen alrededor de la cabeza del hueso grande (mediocarpiana).',
    clinica: 'Su cabeza es la referencia de las luxaciones perisemilunares; riesgo de necrosis por irrigación distal-proximal (cuello).'
  },
  ganchoso: {
    id: 'ganchoso', nombre: 'Hueso ganchoso (hamato)', tipo: 'Hueso',
    ubicacion: 'Borde ulnar de la hilera distal.',
    morfologia: 'Cuña con gancho palmar (hámulo) y facetas distales para el 4.º y 5.º metacarpianos.',
    relaciones: 'Proximal: piramidal (y, en parte, semilunar). Lateral: hueso grande. Distal: 4.º y 5.º metacarpianos. El gancho forma la pared ulnar del túnel carpiano y se relaciona con el nervio ulnar (rama profunda).',
    inserciones: 'Gancho: retináculo flexor, flexor corto y oponente del meñique, ligamento pisoganchoso.',
    funcion: 'Cierra el borde ulnar del túnel carpiano; soporta la columna ulnar.',
    biomecanica: 'Su carilla piramidal helicoidal participa en el movimiento de desviación ulnar.',
    clinica: 'La fractura del gancho puede lesionar la rama profunda del nervio ulnar o los tendones flexores del 5.º dedo.'
  },
  disco: {
    id: 'disco', nombre: 'Disco articular (complejo fibrocartilaginoso triangular)', tipo: 'Fibrocartílago',
    ubicacion: 'Entre la cabeza de la ulna y el piramidal/semilunar, prolongando medialmente la cavidad glenoidea antebraquial.',
    morfologia: 'Fibrocartílago triangular: base en el borde medial de la escotadura ulnar del radio y vértice en la fosita del proceso estiloides de la ulna. Forma, con ligamentos radioulnares, colateral ulnar y vaina del extensor ulnar del carpo, el complejo fibrocartilaginoso triangular (CFCT).',
    relaciones: 'Proximal: cabeza de la ulna. Distal: piramidal y semilunar. Separa la cavidad radioulnar distal de la radiocarpiana.',
    inserciones: 'Radio (escotadura ulnar) y proceso estiloides de la ulna; se continúa con ligamentos radioulnares palmar y dorsal.',
    funcion: 'Une radio y ulna distalmente, amortigua la carga ulnocarpiana y estabiliza la articulación radioulnar distal.',
    biomecanica: 'Permite la pronosupinación sin perder congruencia con el carpo.',
    clinica: 'Lesiones traumáticas o degenerativas del CFCT producen dolor ulnar de la muñeca, chasquidos e inestabilidad radioulnar distal. Su perforación comunica las sinoviales radiocarpiana y radioulnar distal.'
  },
  lrcpalmar: {
    id: 'lrcpalmar', nombre: 'Ligamento radiocarpiano palmar', tipo: 'Ligamento',
    ubicacion: 'Cara palmar de la articulación; del margen anterior del radio al carpo.',
    morfologia: 'Haces oblicuos distal y medialmente hacia escafoides, semilunar, piramidal y hueso grande (porciones radioescafocapitata y radiosemilunar).',
    relaciones: 'Profundo respecto a los tendones flexores y al túnel carpiano.',
    inserciones: 'Margen anterior del radio y proceso estiloides; escafoides, semilunar, piramidal y hueso grande.',
    funcion: 'Es el principal refuerzo anterior de la cápsula y evita el desplazamiento dorsal-ulnar del carpo.',
    biomecanica: 'Restringe la extensión y transmite el movimiento del radio al carpo.',
    clinica: 'Su rotura en fracturas de Barton o luxaciones produce inestabilidad carpiana.'
  },
  lrcdorsal: {
    id: 'lrcdorsal', nombre: 'Ligamento radiocarpiano dorsal', tipo: 'Ligamento',
    ubicacion: 'Cara dorsal; del margen posterior del radio hacia la hilera proximal.',
    morfologia: 'Fibras oblicuas hacia ulnar y distal, dirigidas a semilunar y piramidal.',
    relaciones: 'Profundo a los tendones extensores y sus vainas.',
    inserciones: 'Margen posterior del radio; semilunar y piramidal.',
    funcion: 'Refuerza la cápsula posterior.',
    biomecanica: 'Limita la flexión palmar extrema.',
    clinica: 'Contribuye a la estabilidad dorsal tras fracturas distales del radio.'
  },
  lcradial: {
    id: 'lcradial', nombre: 'Ligamento colateral radial del carpo', tipo: 'Ligamento',
    ubicacion: 'Borde lateral de la articulación.',
    morfologia: 'Banda corta del proceso estiloides del radio al escafoides.',
    relaciones: 'Cercano a la arteria radial y a la tabaquera anatómica.',
    inserciones: 'Proceso estiloides del radio; escafoides (y trapecio, según descripción).',
    funcion: 'Estabiliza lateralmente.',
    biomecanica: 'Limita la desviación ulnar excesiva.',
    clinica: 'Se tensa en desviación ulnar; lesiones en caídas con la mano en abducción.'
  },
  lculnar: {
    id: 'lculnar', nombre: 'Ligamento colateral ulnar del carpo', tipo: 'Ligamento',
    ubicacion: 'Borde medial de la articulación.',
    morfologia: 'Banda del proceso estiloides de la ulna al piramidal y pisiforme.',
    relaciones: 'Cercano al tendón del extensor ulnar del carpo y al CFCT.',
    inserciones: 'Proceso estiloides de la ulna; piramidal y pisiforme.',
    funcion: 'Estabilidad medial.',
    biomecanica: 'Limita la desviación radial excesiva.',
    clinica: 'Forma parte del complejo fibrocartilaginoso triangular.'
  },
  lulnocarpiano: {
    id: 'lulnocarpiano', nombre: 'Ligamento ulnocarpiano palmar', tipo: 'Ligamento',
    ubicacion: 'Cara palmar, lado ulnar.',
    morfologia: 'Fibras del disco articular/CFCT y proceso estiloides de la ulna hacia semilunar, piramidal y hueso grande.',
    relaciones: 'Relacionado con el disco articular y la cápsula anterior.',
    inserciones: 'Disco articular y ulna distal; semilunar y piramidal.',
    funcion: 'Conecta la ulna distal con el carpo, estabilizando medialmente.',
    biomecanica: 'Transmite fuerzas ulnares de la ulna al carpo.',
    clinica: 'Su lesión forma parte de la inestabilidad ulnar del carpo.'
  },
  lrudistal: {
    id: 'lrudistal', nombre: 'Ligamentos radioulnares distales', tipo: 'Ligamento',
    ubicacion: 'Entre la escotadura ulnar del radio y la cabeza de la ulna (palmar y dorsal).',
    morfologia: 'Bandas anterior y posterior que bordean el disco articular.',
    relaciones: 'Forman los bordes del CFCT.',
    inserciones: 'Radio (escotadura ulnar) y ulna (cabeza/estiloides).',
    funcion: 'Estabilizan la articulación radioulnar distal.',
    biomecanica: 'Limitan la traslación palmar-dorsal de la cabeza ulnar durante la pronosupinación.',
    clinica: 'Su rotura causa inestabilidad radioulnar distal.'
  },
  membrana: {
    id: 'membrana', nombre: 'Membrana interósea del antebrazo', tipo: 'Ligamento',
    ubicacion: 'Entre los bordes interóseos del radio y la ulna.',
    morfologia: 'Lámina fibrosa con fibras oblicuas.',
    relaciones: 'Superficie para origen de músculos profundos del antebrazo.',
    inserciones: 'Bordes interóseos de radio y ulna.',
    funcion: 'Une ambos huesos y transmite carga del radio a la ulna.',
    biomecanica: 'Distribuye fuerzas proximalmente.',
    clinica: 'Importante en la estabilidad longitudinal del antebrazo.'
  },
  lintercarpiano: {
    id: 'lintercarpiano', nombre: 'Ligamento intercarpiano dorsal', tipo: 'Ligamento',
    ubicacion: 'Cara dorsal del carpo.',
    morfologia: 'Bandas transversales que unen piramidal con escafoides y hueso grande.',
    relaciones: 'Superficial a los ligamentos interóseos.',
    inserciones: 'Piramidal, escafoides, trapecio, trapezoide y hueso grande.',
    funcion: 'Estabiliza el carpo entre filas.',
    biomecanica: 'Coordina el movimiento de las hileras.',
    clinica: 'Lesionado en inestabilidades carpianas.'
  },
  escapira: {
    id: 'escapira', nombre: 'Ligamentos intercarpianos dorsales (escafopiramidal, trapezoescafoideo)', tipo: 'Ligamento',
    ubicacion: 'Dorso del carpo (escafopiramidal, trapezoescafoideo, trapeziopiramidal).',
    morfologia: 'Haces dorsales que unen huesos de ambas hileras.',
    relaciones: 'Cercano a tendones extensores.',
    inserciones: 'Entre escafoides, trapecio, trapezoide y piramidal, según la denominación de cada haz en la figura.',
    funcion: 'Estabilizadores intercarpianos.',
    biomecanica: 'Controlan la mediocarpiana.',
    clinica: 'Importantes para la estabilidad carpiana.'
  }
}

export interface Hotspot { id: string; x: number; y: number; label: string }
export interface View { n: number; titulo: string; hotspots: Hotspot[] }

// Coordenadas en % del ancho/alto de la imagen original (colocadas sobre las
// estructuras señaladas en los rótulos de cada figura).
export const LAB_VIEWS: View[] = [
  { n: 14, titulo: 'Corte coronal', hotspots: [
    { id: 'ulna', x: 38, y: 10, label: 'Ulna' }, { id: 'radio', x: 57, y: 13, label: 'Radio' },
    { id: 'sinovial', x: 44, y: 17, label: 'Sinovial radioulnar distal' }, { id: 'estiloides_ulnar', x: 34, y: 25, label: 'Proceso estiloides de la ulna' },
    { id: 'disco', x: 38, y: 29, label: 'Disco articular' }, { id: 'estiloides_radial', x: 63, y: 33, label: 'Proceso estiloides del radio' },
    { id: 'interlinea', x: 60, y: 40, label: 'Interlínea radiocarpiana' }, { id: 'escafoides', x: 58, y: 45, label: 'Escafoides' },
    { id: 'piramidal', x: 33, y: 45, label: 'Piramidal' }, { id: 'trapecio', x: 64, y: 56, label: 'Trapecio' } ] },
  { n: 13, titulo: 'Articulación abierta', hotspots: [
    { id: 'carilla_escafoidea', x: 42, y: 45, label: 'Superficie lateral de la carilla articular del radio' }, { id: 'carilla_semilunar', x: 50, y: 47, label: 'Superficie medial de la carilla articular del radio' },
    { id: 'disco', x: 58, y: 46, label: 'Disco articular' }, { id: 'pliegue_sinovial', x: 36, y: 58, label: 'Pliegue sinovial posterior' },
    { id: 'capsula', x: 36, y: 65, label: 'Cápsula articular' }, { id: 'receso_preestiloideo', x: 61, y: 56, label: 'Receso preestiloideo' },
    { id: 'escafoides', x: 38, y: 76, label: 'Escafoides' }, { id: 'semilunar', x: 50, y: 79, label: 'Semilunar' },
    { id: 'piramidal', x: 58, y: 76, label: 'Piramidal' }, { id: 'pliegue_sinovial', x: 47, y: 86, label: 'Pliegue sinovial anterior' } ] },
  { n: 15, titulo: 'Vista posterior abierta', hotspots: [
    { id: 'capsula', x: 60, y: 30, label: 'Cápsula' }, { id: 'semilunar', x: 53, y: 45, label: 'Semilunar' },
    { id: 'piramidal', x: 38, y: 52, label: 'Piramidal' }, { id: 'escafoides', x: 70, y: 58, label: 'Escafoides' } ] },
  { n: 19, titulo: 'Ligamentos palmares', hotspots: [
    { id: 'radio', x: 45, y: 17, label: 'Radio' }, { id: 'ulna', x: 62, y: 17, label: 'Ulna' },
    { id: 'membrana', x: 58, y: 22, label: 'Membrana interósea' }, { id: 'lrudistal', x: 56, y: 32, label: 'Lig. radioulnar distal anterior' },
    { id: 'lrcpalmar', x: 45, y: 44, label: 'Lig. radiocarpiano palmar' }, { id: 'lulnocarpiano', x: 60, y: 41, label: 'Lig. ulnocarpiano palmar' },
    { id: 'lcradial', x: 40, y: 49, label: 'Lig. colateral radial' }, { id: 'lculnar', x: 62, y: 47, label: 'Lig. colateral ulnar' },
    { id: 'piramidal', x: 59, y: 53, label: 'Piramidal' }, { id: 'trapecio', x: 40, y: 56, label: 'Trapecio' } ] },
  { n: 20, titulo: 'Ligamentos dorsales', hotspots: [
    { id: 'ulna', x: 39, y: 15, label: 'Ulna' }, { id: 'radio', x: 50, y: 16, label: 'Radio' },
    { id: 'membrana', x: 39, y: 22, label: 'Membrana interósea' }, { id: 'lrudistal', x: 39, y: 36, label: 'Lig. radioulnar distal posterior' },
    { id: 'lculnar', x: 38, y: 41, label: 'Lig. colateral ulnar' }, { id: 'lrcdorsal', x: 46, y: 44, label: 'Lig. radiocarpiano dorsal' },
    { id: 'lintercarpiano', x: 40, y: 48, label: 'Lig. intercarpiano dorsal' }, { id: 'lcradial', x: 56, y: 43, label: 'Lig. colateral radial' },
    { id: 'escapira', x: 56, y: 48, label: 'Lig. escafopiramidal' }, { id: 'piramidal', x: 38, y: 56, label: 'Piramidal' },
    { id: 'ganchoso', x: 38, y: 61, label: 'Ganchoso' } ] },
  { n: 58, titulo: 'Radiografía', hotspots: [
    { id: 'radio', x: 27, y: 8, label: 'Radio' }, { id: 'ulna', x: 11, y: 19, label: 'Ulna' },
    { id: 'semilunar', x: 18, y: 34, label: 'Semilunar' }, { id: 'escafoides', x: 30, y: 40, label: 'Escafoides' },
    { id: 'pisiforme', x: 14, y: 42, label: 'Pisiforme' }, { id: 'piramidal', x: 14, y: 52, label: 'Piramidal' },
    { id: 'trapecio', x: 36, y: 54, label: 'Trapecio' }, { id: 'ganchoso', x: 18, y: 61, label: 'Ganchoso' },
    { id: 'grande', x: 22, y: 60, label: 'Hueso grande' } ] },
  { n: 8, titulo: 'Huesos carpianos', hotspots: [
    { id: 'semilunar', x: 55, y: 23, label: 'Semilunar' }, { id: 'escafoides', x: 41, y: 30, label: 'Escafoides' },
    { id: 'piramidal', x: 65, y: 35, label: 'Piramidal' }, { id: 'pisiforme', x: 76, y: 50, label: 'Pisiforme' },
    { id: 'grande', x: 52, y: 54, label: 'Hueso grande' }, { id: 'trapecio', x: 26, y: 54, label: 'Trapecio' },
    { id: 'trapezoide', x: 40, y: 67, label: 'Trapezoide' }, { id: 'ganchoso', x: 67, y: 68, label: 'Ganchoso' } ] }
]

export const MESH_IDS = ['radio','ulna','disco','escafoides','semilunar','piramidal','pisiforme','trapecio','trapezoide','grande','ganchoso']
