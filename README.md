# Museo Anatómico Interactivo — Articulación radiocarpiana
PUCE Sede Santo Domingo · Medicina · Morfofunción Osteomuscular.

**Repositorio privado**: las ilustraciones (`public/images`) están protegidas por derechos de autor.

## Ver en el celular
**Opción rápida (misma red Wi-Fi):** `npm i && npm run dev` y abrir en el celular la dirección `Network` que muestra Vite (puerto 5173).

**Publicar (recomendado, funciona con repos privados):** importar el repositorio en Vercel, Netlify o Cloudflare Pages
con *Build command* `npm run build` y *Output directory* `dist`. Mantén el acceso restringido (protección por contraseña/Vercel Authentication) por los derechos de las imágenes.

**GitHub Pages:** `.github/workflows/pages.yml` publica `dist`; en repos privados Pages exige un plan de pago. Activar en Settings → Pages → Source: GitHub Actions y ejecutar el flujo desde la rama que prefieras (el flujo se activa con `main`).

Ver `PROGRESO.md` para alcance y limitaciones.

## Créditos del modelo 3D
Huesos: BodyParts3D © DBCLS, CC BY-SA 2.1 JP (https://lifesciencedb.jp/bp3d/). Mallas redistribuidas con modificaciones (`tools/build_glb.py`); el archivo `public/models/muneca_bodyparts3d.glb` hereda la licencia CC BY-SA 2.1 JP.
