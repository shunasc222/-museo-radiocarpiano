// Datos editables del equipo. Los valores por defecto son marcadores: edítelos aquí (permanente)
// o desde la página «Créditos y equipo» (se guarda solo en el navegador de quien edita).
export interface Integrante { nombre: string; rol: string }
export interface Equipo { curso: string; docente: string; fecha: string; integrantes: Integrante[] }
export const EQUIPO_POR_DEFECTO: Equipo = {
  curso: 'Morfofunción Osteomuscular · Medicina · PUCE Sede Santo Domingo',
  docente: 'Docente: por completar',
  fecha: 'Noviembre de 2026',
  integrantes: [
    { nombre: 'Integrante 1 — por completar', rol: 'Contribución: por completar' },
    { nombre: 'Integrante 2 — por completar', rol: 'Contribución: por completar' },
    { nombre: 'Integrante 3 — por completar', rol: 'Contribución: por completar' }
  ]
}
