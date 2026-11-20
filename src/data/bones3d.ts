import type { Structure } from './structures'
import { STRUCTURE_BY_ID } from './structures'

export type Bone3DId = 'radio' | 'ulna' | 'disco' | 'escafoides' | 'semilunar' | 'piramidal' | 'pisiforme' | 'trapecio' | 'trapezoide' | 'hueso_grande' | 'ganchoso'

export const BONE3D_ORDER: Bone3DId[] = ['radio', 'ulna', 'disco', 'escafoides', 'semilunar', 'piramidal', 'pisiforme', 'trapecio', 'trapezoide', 'hueso_grande', 'ganchoso']

export const BONE3D_GROUP: Record<Bone3DId, 'antebrazo' | 'proximal' | 'distal'> = {
  radio: 'antebrazo', ulna: 'antebrazo', disco: 'antebrazo',
  escafoides: 'proximal', semilunar: 'proximal', piramidal: 'proximal', pisiforme: 'proximal',
  trapecio: 'distal', trapezoide: 'distal', hueso_grande: 'distal', ganchoso: 'distal',
}

export const BONE3D_NAME: Record<Bone3DId, string> = {
  radio: 'Radio distal', ulna: 'Ulna distal', disco: 'Disco articular', escafoides: 'Escafoides', semilunar: 'Semilunar',
  piramidal: 'Piramidal', pisiforme: 'Pisiforme', trapecio: 'Trapecio', trapezoide: 'Trapezoide', hueso_grande: 'Hueso grande', ganchoso: 'Ganchoso',
}

const MAP: Partial<Record<Bone3DId, string>> = {
  radio: 'radio-distal', ulna: 'ulna-distal', disco: 'disco', escafoides: 'escafoides', semilunar: 'semilunar', piramidal: 'piramidal', pisiforme: 'pisiforme',
}

const distal = (p: Omit<Structure, 'grupo' | 'participacion' | 'enEsquema' | 'num' | 'hijos' | 'pista'>): Structure => ({
  ...p, grupo: 'Carpo', participacion: 'relacionada', enEsquema: false, num: 0, pista: '',
})

const DISTAL: Partial<Record<Bone3DId, Structure>> = {
  trapecio: distal({
    id: 'trapecio', nombre: 'Trapecio', participacionNota: 'Fila distal del carpo: no participa en la articulación radiocarpiana (pertenece a la mediocarpiana y a la trapeciometacarpiana).',
    ubicacion: 'Hueso más lateral de la fila distal, en la base del pulgar.',
    descripcion: 'Hueso irregular con una superficie en silla de montar para el 1.er metacarpiano y un tubérculo palmar que forma el borde lateral del túnel del carpo.',
    funcion: 'Articula con el escafoides, el trapezoide y los metacarpianos 1.º y 2.º; su articulación en silla permite la oposición del pulgar.',
    relaciones: 'Proximal: escafoides. Palmar: tendón del flexor radial del carpo en su canal. Dorsal-lateral: arteria radial en la tabaquera.',
    clinica: 'Sede de artrosis trapeciometacarpiana (rizartrosis), frecuente en mujeres mayores.',
  }),
  trapezoide: distal({
    id: 'trapezoide', nombre: 'Trapezoide', participacionNota: 'Fila distal del carpo: no participa en la articulación radiocarpiana.',
    ubicacion: 'Entre el trapecio y el hueso grande, en la fila distal.',
    descripcion: 'El hueso más pequeño de la fila distal, en forma de cuña, con base dorsal más ancha.',
    funcion: 'Articula con el escafoides, el trapecio, el hueso grande y el 2.º metacarpiano.',
    relaciones: 'Proximal: escafoides. Distal: base del 2.º metacarpiano.',
    clinica: 'Su fractura o luxación es rara.',
  }),
  hueso_grande: distal({
    id: 'hueso_grande', nombre: 'Hueso grande (capitato)', participacionNota: 'Fila distal del carpo: su cabeza forma parte de la articulación mediocarpiana.',
    ubicacion: 'Centro de la fila distal; su eje coincide con el del 3.er metacarpiano.',
    descripcion: 'El hueso más grande del carpo, con cabeza, cuello y cuerpo. La cabeza se aloja en la concavidad formada por el escafoides y el semilunar.',
    funcion: 'Es la columna central del carpo y transmite la carga del 3.er metacarpiano al semilunar y al escafoides.',
    relaciones: 'Proximal: escafoides y semilunar. Distal: 3.er metacarpiano. A los lados: trapezoide y ganchoso.',
    clinica: 'Su irrigación es retrógrada, como la del escafoides; una fractura del cuello puede dar necrosis avascular.',
  }),
  ganchoso: distal({
    id: 'ganchoso', nombre: 'Ganchoso (hamate)', participacionNota: 'Fila distal del carpo: no participa en la articulación radiocarpiana.',
    ubicacion: 'Lado ulnar de la fila distal.',
    descripcion: 'Hueso en cuña con un gancho (hámulo) palmar que forma el borde ulnar del túnel del carpo.',
    funcion: 'Articula con el hueso grande, el piramidal y los metacarpianos 4.º y 5.º; el gancho es polea para los tendones flexores y anclaje del ligamento pisoganchoso.',
    relaciones: 'Palmar: canal de Guyon y rama profunda del nervio ulnar rodean el gancho. Proximal: piramidal (y semilunar según la posición).',
    clinica: 'La fractura del gancho (golf, béisbol) causa dolor hipotenar y puede lesionar el nervio ulnar o romper tendones flexores.',
  }),
}

export function bone3DInfo(id: Bone3DId): Structure {
  const sid = MAP[id]
  return sid ? STRUCTURE_BY_ID[sid] : DISTAL[id]!
}
