import trimesh,glob,numpy as np
from trimesh import smoothing
names={'radius':'radio','ulna':'ulna','scaphoid':'escafoides','lunate':'semilunar','triquetral':'piramidal','pisiform':'pisiforme','trapezium':'trapecio','trapezoid':'trapezoide','capitate':'grande','hamate':'ganchoso'}
meshes={}
for f in sorted(glob.glob('/tmp/claude-0/s/bp/*.obj')):
    key=f.split('_')[-1][6:-4]
    m=trimesh.load(f,force='mesh',process=True)
    meshes[names[key]]=m
# centro de referencia: cabeza del hueso grande
c=meshes['grande'].centroid.copy()
ZCUT=c[2]+75
out=trimesh.Scene()
for k,m in meshes.items():
    m=m.copy()
    if k in('radio','ulna'):
        m=m.slice_plane(np.array([0,0,ZCUT]),np.array([0,0,-1]))
    m=m.subdivide()
    smoothing.filter_taubin(m,lamb=0.5,nu=0.53,iterations=10)
    v=m.vertices-c
    # BodyParts3D (x,y,z) -> escena (x, z, -y), 1 unidad = 1 cm
    v=np.column_stack([v[:,0],v[:,2],-v[:,1]])*0.1
    f=m.faces[:,[0,2,1]]  # conserva orientación: la transformación es rotación propia, se mantiene el orden
    f=m.faces
    mm=trimesh.Trimesh(v,f,process=False); mm.fix_normals()
    out.add_geometry(mm,node_name=k,geom_name=k)
    print(k,len(f),np.round(mm.bounds,2).tolist())
out.export('/home/user/-museo-radiocarpiano/public/models/muneca_bodyparts3d.glb')
