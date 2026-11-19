export type LayerId = 'esqueleto' | 'superficies' | 'capsula' | 'lig_rc' | 'intercarpianos' | 'tfcc' | 'tendones' | 'vasc'
export type Frame = 'fore' | 'prox' | 'dist' | 'static'
export type FileKey = 'bones' | 'hand' | 'capas' | 'none'
export interface MeshDef { id: string; sid: string; file: FileKey; node: string; layer: LayerId; frame: Frame; color: string; parent?: string; hand?: boolean; fade?: boolean }

const BONE = '#e7dcc4'
const bone = (id: string, frame: Frame, extra: Partial<MeshDef> = {}): MeshDef => ({ id, sid: id, file: 'bones', node: id, layer: 'esqueleto', frame, color: BONE, fade: true, ...extra })
const hand = (id: string): MeshDef => ({ id, sid: id, file: 'hand', node: id, layer: 'esqueleto', frame: 'dist', color: '#d6caae', hand: true })
const soft = (id: string, sid: string, node: string, layer: LayerId, color: string, frame: Frame = 'static', fade = true): MeshDef => ({ id, sid, file: 'capas', node, layer, frame, color, fade })

export const MESHES: MeshDef[] = [
  bone('radio', 'fore'), bone('ulna', 'fore'),
  bone('escafoides', 'prox'), bone('semilunar', 'prox'), bone('piramidal', 'prox'), bone('pisiforme', 'prox'),
  bone('trapecio', 'dist'), bone('trapezoide', 'dist'), bone('grande', 'dist'), bone('ganchoso', 'dist'),
  ...['mc1', 'mc2', 'mc3', 'mc4', 'mc5', 'fp1', 'dp1', 'fp2', 'mp2', 'dp2', 'fp3', 'mp3', 'dp3', 'fp4', 'mp4', 'dp4', 'fp5', 'mp5', 'dp5'].map(hand),
  // superficies articulares: zonas DERIVADAS por proximidad sobre las mallas óseas
  { id: 'sup_radio_escafoidea', sid: 'carilla_escafoidea', file: 'capas', node: 'sup_radio_escafoidea', layer: 'superficies', frame: 'fore', color: '#3fc8e8', parent: 'radio' },
  { id: 'sup_radio_semilunar', sid: 'carilla_semilunar', file: 'capas', node: 'sup_radio_semilunar', layer: 'superficies', frame: 'fore', color: '#2fa6c6', parent: 'radio' },
  { id: 'sup_escafoides_prox', sid: 'sup_escafoides_prox', file: 'capas', node: 'sup_escafoides_prox', layer: 'superficies', frame: 'prox', color: '#3fc8e8', parent: 'escafoides' },
  { id: 'sup_semilunar_prox', sid: 'sup_semilunar_prox', file: 'capas', node: 'sup_semilunar_prox', layer: 'superficies', frame: 'prox', color: '#2fa6c6', parent: 'semilunar' },
  // TFCC: marcador esquemático (sin malla) + membrana interósea (malla real)
  { id: 'disco', sid: 'disco', file: 'none', node: 'disco', layer: 'tfcc', frame: 'fore', color: '#7fe3ff' },
  soft('membrana', 'membrana', 'membrana', 'tfcc', '#8fb8c9'),
  // tendones y retináculo
  soft('fcr', 'fcr', 'fcr', 'tendones', '#b5675c'), soft('fcu_h', 'fcu', 'fcu_h', 'tendones', '#a85a52'), soft('fcu_u', 'fcu', 'fcu_u', 'tendones', '#a85a52'),
  soft('pl', 'pl', 'pl', 'tendones', '#c4806a'), soft('ecrl', 'ecrl', 'ecrl', 'tendones', '#c28a5b'), soft('ecrb', 'ecrb', 'ecrb', 'tendones', '#b87d4f'),
  soft('ecu', 'ecu', 'ecu', 'tendones', '#a8704a'), soft('apl', 'apl', 'apl', 'tendones', '#d19a63'), soft('epb', 'epb', 'epb', 'tendones', '#c58e5c'),
  soft('epl', 'epl', 'epl', 'tendones', '#bd8554'), soft('ed', 'ed', 'ed', 'tendones', '#a9835f'), soft('ei', 'ei', 'ei', 'tendones', '#b8926a'),
  soft('edm', 'edm', 'edm', 'tendones', '#c09c70'), soft('fds', 'fds', 'fds', 'tendones', '#9d5f58'), soft('fdp', 'fdp', 'fdp', 'tendones', '#8f524d'),
  soft('fpl', 'fpl', 'fpl', 'tendones', '#b36e62'),
  soft('retinaculo_flexor', 'retinaculo_flexor', 'retinaculo', 'tendones', '#d9c68f', 'static', false),
  // arterias (parciales)
  soft('a_interosea_ant', 'a_interosea_ant', 'a_interosea_ant', 'vasc', '#d9584c'),
  soft('a_carpiana_dorsal_r', 'a_carpiana_dorsal_r', 'a_carpiana_dorsal_r', 'vasc', '#e0665a', 'static', false),
  soft('a_carpiana_dorsal_u', 'a_carpiana_dorsal_u', 'a_carpiana_dorsal_u', 'vasc', '#e0665a', 'static', false),
  soft('arco_superficial', 'arco_superficial', 'arco_superficial', 'vasc', '#e6584a', 'static', false),
  soft('arco_profundo', 'arco_profundo', 'arco_profundo', 'vasc', '#c9473d', 'static', false)
]

export interface LayerDef { id: LayerId; n: number; titulo: string; badge: '3D' | '3D parcial' | '2D' | '2D + marcador'; nota: string; plates: number[]; items: string[] }
export const LAYERS: LayerDef[] = [
  { id: 'esqueleto', n: 1, titulo: 'Esqueleto completo', badge: '3D', nota: 'Antebrazo distal, carpo y mano (BodyParts3D). Metacarpianos y falanges son estructuras complementarias.',
    plates: [7, 26, 3, 4, 8, 58], items: ['radio', 'ulna', 'estiloides_radial', 'estiloides_ulnar', 'escafoides', 'semilunar', 'piramidal', 'pisiforme', 'trapecio', 'trapezoide', 'grande', 'ganchoso', 'mc1', 'mc2', 'mc3', 'mc4', 'mc5'] },
  { id: 'superficies', n: 2, titulo: 'Superficies articulares y cartílagos', badge: '3D parcial', nota: 'Zonas de contacto DERIVADAS por proximidad sobre las mallas; el cartílago y la interlínea solo en 2D.',
    plates: [13, 14, 15, 16, 17], items: ['carilla_escafoidea', 'carilla_semilunar', 'sup_escafoides_prox', 'sup_semilunar_prox', 'rel_piramidal_disco', 'cartilago', 'interlinea'] },
  { id: 'capsula', n: 3, titulo: 'Cápsula articular y sinovial', badge: '2D', nota: 'Sin malla 3D verificada: se estudia en láminas 2D auténticas.',
    plates: [13, 15, 16, 17, 14], items: ['capsula', 'sinovial', 'receso_preestiloideo', 'pliegue_sinovial'] },
  { id: 'lig_rc', n: 4, titulo: 'Ligamentos radiocarpianos', badge: '2D', nota: 'Sin malla 3D verificada: láminas 2D con puntos seleccionables.',
    plates: [19, 20, 23, 24], items: ['lrcpalmar', 'lradioescafocapitato', 'lradiolunar_largo', 'lradiolunar_corto', 'lradioescafolunar', 'lrcdorsal', 'lcradial', 'lculnar'] },
  { id: 'intercarpianos', n: 5, titulo: 'Estabilizadores intercarpianos', badge: '2D', nota: 'Sin malla 3D verificada. Pertenecen a la mediocarpiana/intercarpianas.',
    plates: [20, 21, 22, 25, 24], items: ['lescafolunar', 'llunopiramidal', 'lintercarpiano', 'lintercarpiano_palmar', 'escapira'] },
  { id: 'tfcc', n: 6, titulo: 'CFCT y estabilizadores radioulnares', badge: '2D + marcador', nota: 'Disco: solo marcador esquemático de alambre (no es una malla anatómica). Membrana interósea: malla real.',
    plates: [14, 17, 19, 20, 27], items: ['disco', 'lrudistal', 'insercion_foveal', 'lulnocarpiano', 'lulnolunar', 'lulnotriquetral', 'homologo_meniscal', 'subvaina_ecu', 'membrana'] },
  { id: 'tendones', n: 7, titulo: 'Tendones y estabilizadores musculares', badge: '3D parcial', nota: 'Mallas reales de músculos y retináculo flexor; el retináculo extensor y las vainas solo en 2D.',
    plates: [28, 29, 31, 32, 34, 30, 33, 63, 35], items: ['fcr', 'fcu', 'pl', 'ecrl', 'ecrb', 'ecu', 'apl', 'epb', 'epl', 'ed', 'ei', 'edm', 'fds', 'fdp', 'fpl', 'retinaculo_flexor', 'retinaculo_extensor', 'compartimentos_ext'] },
  { id: 'vasc', n: 8, titulo: 'Vascularización e inervación', badge: '3D parcial', nota: 'Arterias: solo ramas disponibles en BodyParts3D. Troncos radial/ulnar y todos los nervios solo en 2D.',
    plates: [45, 46, 47, 48, 52, 53, 54, 57], items: ['a_interosea_ant', 'a_carpiana_dorsal_r', 'a_carpiana_dorsal_u', 'arco_superficial', 'arco_profundo', 'a_radial', 'a_ulnar', 'redes_carpianas', 'n_interoseo_ant', 'n_interoseo_post', 'n_mediano', 'n_ulnar'] }
]

// Biomecánica ilustrativa: ángulo total y reparto radiocarpiano/mediocarpiano (valores didácticos).
export type Motion = 'neutro' | 'flexion' | 'extension' | 'radial' | 'ulnar'
export const MOTION: Record<Motion, { axis: 'x' | 'z'; total: number; rc: number }> = {
  neutro: { axis: 'x', total: 0, rc: 0.5 }, flexion: { axis: 'x', total: 70, rc: 0.4 }, extension: { axis: 'x', total: 60, rc: 0.6 },
  radial: { axis: 'z', total: 20, rc: 0.4 }, ulnar: { axis: 'z', total: 35, rc: 0.6 }
}
