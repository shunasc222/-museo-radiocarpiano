"""Genera mano.glb (metacarpianos y falanges) y capas.glb (músculos/tendones, retináculo flexor,
membrana interósea, arterias parciales y zonas de contacto articular DERIVADAS por proximidad)
a partir de mallas BodyParts3D (DBCLS, CC BY-SA 2.1 JP). Uso: python3 -I tools/build_glb_capas.py <dir_obj>"""
import sys, glob, os, re, numpy as np, trimesh
from trimesh import smoothing
from scipy.spatial import cKDTree
SRC = sys.argv[1] if len(sys.argv) > 1 else '/tmp/claude-0/s/bp2'
BONES = sys.argv[2] if len(sys.argv) > 2 else '/tmp/claude-0/s/bp'
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'models')

def load(path): return trimesh.load(path, force='mesh', process=True)
def find(d, fj): return glob.glob(os.path.join(d, fj + '_*'))[0]
cap = load(find(BONES, 'FJ3361'))
C = cap.centroid.copy()
ZCUT = C[2] + 75
def tf(v):
    v = v - C
    return np.column_stack([v[:, 0], v[:, 2], -v[:, 1]]) * 0.1   # (x,y,z)->(x,z,-y), 1 u = 1 cm
def prep(m, subdiv=True):
    m = m.copy()
    if subdiv: m = m.subdivide(); smoothing.filter_taubin(m, lamb=0.5, nu=0.53, iterations=10)
    return m
def emit(scene, name, m, crop=False):
    m = m.copy()
    if crop: m = m.slice_plane(np.array([0, 0, ZCUT]), np.array([0, 0, -1]))
    if len(m.faces) == 0: print('VACÍO', name); return
    mm = trimesh.Trimesh(tf(m.vertices), m.faces, process=False); mm.fix_normals()
    scene.add_geometry(mm, node_name=name, geom_name=name); print(name, len(mm.faces))

# ---- mano.glb
hand = {'FJ3350':'mc1','FJ3352':'mc2','FJ3354':'mc3','FJ3356':'mc4','FJ3358':'mc5','FJ3327':'fp1','FJ3198':'dp1',
 'FJ3322':'fp2','FJ3303':'mp2','FJ3193':'dp2','FJ3325':'fp3','FJ3306':'mp3','FJ3196':'dp3','FJ3326':'fp4','FJ3292':'mp4','FJ3197':'dp4','FJ3323':'fp5','FJ3304':'mp5','FJ3194':'dp5'}
sc = trimesh.Scene()
for fj, n in hand.items(): emit(sc, n, prep(load(find(SRC, fj))))
sc.export(os.path.join(OUT, 'mano.glb'))

# ---- capas.glb
sc = trimesh.Scene()
soft = {'FJ1496':'fcr','FJ1502':'pl','FJ1473':'fcu_h','FJ1518':'fcu_u','FJ1490':'ecrl','FJ1489':'ecrb','FJ1472':'ecu','FJ1484':'apl','FJ1494':'epb','FJ1495':'epl',
 'FJ1492':'ed','FJ1493':'ei','FJ1491':'edm','FJ1475':'fds','FJ1497':'fdp','FJ1498':'fpl','FJ1476':'membrana','FJ1471':'retinaculo',
 'FJ2266':'a_interosea_ant','FJ2283':'a_carpiana_dorsal_r','FJ2288':'a_carpiana_dorsal_u','FJ2279':'arco_profundo','FJ2300':'arco_superficial','FJ2289':'a_metacarpiana_palmar'}
for fj, n in soft.items():
    m = load(find(SRC, fj)); emit(sc, n, m, crop=n not in ('retinaculo','arco_profundo','arco_superficial','a_metacarpiana_palmar','a_carpiana_dorsal_r','a_carpiana_dorsal_u'))
# zonas de contacto derivadas (proximidad + orientación de normales), sobre las mallas ya procesadas
def bone(fj): return prep(load(find(BONES, fj)))
R, U, S, Lu = bone('FJ3349'), bone('FJ3391'), bone('FJ3383'), bone('FJ3374')
def patch(A, B, thr, name, ndot=0.35):
    d, i = cKDTree(B.vertices).query(A.vertices)
    vec = B.vertices[i] - A.vertices; dist = np.linalg.norm(vec, axis=1) + 1e-9
    ok = (d < thr) & (np.einsum('ij,ij->i', A.vertex_normals, vec / dist[:, None]) > ndot)
    f = A.faces[ok[A.faces].all(axis=1)]
    if len(f) < 4: print('PATCH VACÍO', name); return
    p = trimesh.Trimesh(A.vertices + A.vertex_normals * 0.15, f, process=False)  # +0,15 mm contra z-fighting
    p.remove_unreferenced_vertices(); emit(sc, name, p)
patch(R, S, 4.0, 'sup_radio_escafoidea'); patch(R, Lu, 7.0, 'sup_radio_semilunar')
patch(S, R, 4.0, 'sup_escafoides_prox'); patch(Lu, R, 7.0, 'sup_semilunar_prox')
sc.export(os.path.join(OUT, 'capas.glb'))
