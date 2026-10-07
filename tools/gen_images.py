"""Gera derivados responsivos (WebP) e favicons a partir dos PNGs
originais em assets/. Nunca sobrescreve/apaga os originais.
Uso: python tools/gen_images.py  (rodar da raiz do repo)"""
from pathlib import Path
from PIL import Image

ASSETS = Path(__file__).resolve().parent.parent / "assets"

def webp(src, width, out, q=82):
    im = Image.open(ASSETS / src)
    h = round(im.height * width / im.width)
    im.resize((width, h), Image.LANCZOS).save(ASSETS / out, "WEBP", quality=q)
    print(f"{out}: {width}x{h}  {(ASSETS / out).stat().st_size} B")

def favicon(src, side, out):
    im = Image.open(ASSETS / src).convert("RGBA")
    im.resize((side, side), Image.LANCZOS).save(ASSETS / out, "PNG")
    print(f"{out}: {side}x{side}  {(ASSETS / out).stat().st_size} B")

# --- screenshots do Strabo (exibidos a ~222 px de largura) ---
SHOTS = ["01-biblioteca", "02-mapa-gps-satelite", "03-pino-simbolos-fotos",
         "04-camadas-pdf", "05-camadas-bases"]
for name in SHOTS:
    for w in (444, 888):
        webp(f"{name}.png", w, f"{name}-{w}w.webp")

# --- icones de produto (exibidos a 68/116 px) ---
webp("strabo-S1-verde.png", 232, "strabo-S1-verde-232.webp")
webp("argos-icon.png", 104, "argos-icon-104.webp")

# --- favicons dimensionados da arte oficial ---
favicon("agrippa-tec-oficial-pedra.png", 32, "favicon-32.png")
favicon("agrippa-tec-oficial-pedra.png", 180, "favicon-180.png")
favicon("strabo-S1-verde.png", 32, "strabo-favicon-32.png")
favicon("strabo-S1-verde.png", 180, "strabo-favicon-180.png")

print("OK")
