#!/usr/bin/env python3
"""Generate a local, searchable audit of user-supplied Sunnyside ZIP files.

Usage:
  python sprout-2-library/tools/audit_assets.py --input-dir ./sources --output-dir ./private-audit
Requires: Pillow (pip install Pillow).
Does not upload or redistribute original sprites.
"""
import argparse, csv, hashlib, html, io, json, re, zipfile
from collections import Counter
from pathlib import Path
from PIL import Image

CATEGORIES = [
    "01 Terrain & Tilesets", "02 Buildings & Structures", "03 Trees & Vegetation",
    "04 Crops & Farming", "05 Animals & Wildlife", "06 Effects & Animation",
    "07 Props & Objects", "08 UI & Icons", "09 Characters",
    "10 Editable Source Files", "11 GameMaker Project Files",
    "12 Other Images", "13 Other / Metadata",
]
def category(path):
    s = path.lower()
    if "tileset" in s: return CATEGORIES[0]
    if any(k in s for k in ("building","house","roof","wall","door","fence","bridge","structure")): return CATEGORIES[1]
    if "/plants/" in s or any(k in s for k in ("tree","mushroom","flower","grass","bush","foliage")): return CATEGORIES[2]
    if "/crops/" in s: return CATEGORIES[3]
    if "/animals/" in s: return CATEGORIES[4]
    if "/vfx/" in s: return CATEGORIES[5]
    if "/other/" in s: return CATEGORIES[6]
    if "/ui/" in s: return CATEGORIES[7]
    if "/characters/" in s or "character" in s or "human" in s: return CATEGORIES[8]
    if s.endswith((".aseprite",".ase",".psd")): return CATEGORIES[9]
    if s.endswith((".yy",".yyp")): return CATEGORIES[10]
    if s.endswith((".png",".gif",".jpg",".jpeg",".webp")): return CATEGORIES[11]
    return CATEGORIES[12]

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input-dir", type=Path, required=True)
    ap.add_argument("--output-dir", type=Path, required=True)
    args = ap.parse_args()
    args.output_dir.mkdir(parents=True, exist_ok=True)
    thumbs = args.output_dir / "thumbnails"
    thumbs.mkdir(exist_ok=True)
    rows = []
    def scan(z, source, prefix="", depth=0):
        for entry in z.infolist():
            n = entry.filename
            if entry.is_dir() or n.startswith("__MACOSX/") or "/__MACOSX/" in n or Path(n).name.startswith("._"):
                continue
            path = prefix + n
            ext = Path(n).suffix.lower()
            row = dict(source=source, path=path, category=category(path), extension=ext,
                       bytes=entry.file_size, width="", height="", frames="", thumbnail="", sha256="", status="Indexed")
            if ext in (".png",".gif",".jpg",".jpeg",".webp"):
                try:
                    data = z.read(entry)
                    with Image.open(io.BytesIO(data)) as im:
                        row["width"], row["height"] = im.size
                        row["frames"] = getattr(im, "n_frames", 1)
                        im.seek(0)
                        preview = im.convert("RGBA")
                        preview.thumbnail((132,108), Image.Resampling.NEAREST)
                        frame = Image.new("RGBA",(144,120),"#344038")
                        frame.alpha_composite(preview, ((144-preview.width)//2,(120-preview.height)//2))
                        filename = hashlib.sha256((source+path).encode()).hexdigest()[:20]+".png"
                        frame.convert("RGB").save(thumbs/filename)
                        row["thumbnail"] = "thumbnails/"+filename
                        row["sha256"] = hashlib.sha256(data).hexdigest()
                except Exception as exc:
                    row["status"] = "Preview error: " + str(exc)[:100]
            elif ext == ".zip" and depth < 3:
                try:
                    with zipfile.ZipFile(io.BytesIO(z.read(entry))) as inner:
                        scan(inner, source, path+" :: ", depth+1)
                except Exception as exc:
                    row["status"] = "Nested ZIP error: "+str(exc)[:100]
            rows.append(row)
    for p in sorted(args.input_dir.glob("*.zip")):
        with zipfile.ZipFile(p) as z: scan(z,p.name)
    for p in sorted(args.input_dir.glob("*.aseprite")):
        rows.append(dict(source="Standalone",path=p.name,category=CATEGORIES[9],extension=".aseprite",
                         bytes=p.stat().st_size,width="",height="",frames="",thumbnail="",
                         sha256=hashlib.sha256(p.read_bytes()).hexdigest(),status="Indexed"))
    rows.sort(key=lambda r:(r["category"],r["source"],r["path"]))
    if not rows: raise SystemExit("No ZIP or Aseprite files found in input directory.")
    with (args.output_dir/"inventory.csv").open("w",encoding="utf-8-sig",newline="") as f:
        writer=csv.DictWriter(f,fieldnames=list(rows[0]))
        writer.writeheader();writer.writerows(rows)
    counts=Counter(r["category"] for r in rows)
    (args.output_dir/"summary.json").write_text(json.dumps({"total":len(rows),"categories":counts},indent=2))
    css="""body{background:#17251d;color:#eaf0e3;font:14px system-ui;margin:0}
    header{padding:15px;position:sticky;top:0;background:#17251df5}a{color:#b5e5ac}
    input{padding:10px;width:min(90%,450px)}main{padding:12px;display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px}
    article{background:#2b4131;border-radius:8px;padding:8px;overflow-wrap:anywhere}img{width:100%;height:120px;object-fit:contain;image-rendering:pixelated}
    small{display:block;color:#c1d0c2}code{font-size:10px}article[hidden]{display:none}"""
    links=[]
    for cat in CATEGORIES:
        subset=[r for r in rows if r["category"]==cat]
        page=cat[:2]+".html"
        links.append(f'<p><a href="{page}">{html.escape(cat)}</a> — {len(subset):,} entries</p>')
        cards=[]
        for r in subset:
            thumb=f'<img loading="lazy" src="{r["thumbnail"]}" alt="">' if r["thumbnail"] else "<p>No image preview</p>"
            name=html.escape(Path(r["path"]).name)
            path=html.escape(r["path"])
            cards.append(f'<article data-search="{html.escape((r["path"]+" "+r["source"]).lower(),quote=True)}">{thumb}<b>{name}</b><small>{html.escape(r["source"])} · {r["width"]}×{r["height"]} · {r["extension"]}</small><details><summary>Source path</summary><code>{path}</code></details></article>')
        doc=f"""<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>{css}</style><header><a href="index.html">← Categories</a><h2>{html.escape(cat)}</h2><input id="q" placeholder="Search file or path" oninput="filter()"></header><main>{''.join(cards)}</main><script>function filter(){{let q=document.querySelector('#q').value.toLowerCase();for(let x of document.querySelectorAll('article'))x.hidden=!x.dataset.search.includes(q)}}</script>"""
        (args.output_dir/page).write_text(doc,encoding="utf-8")
    (args.output_dir/"index.html").write_text(f'<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>{css}</style><header><h1>Project Sprout 2.0 — Private Asset Gallery</h1><p>{len(rows):,} indexed file entries. Source: user-provided archives. <a href="inventory.csv">Inventory CSV</a></p></header><section style="padding:16px">{"".join(links)}</section>',encoding="utf-8")
    print("Created",args.output_dir/"index.html", "with",len(rows),"entries")
if __name__ == "__main__": main()
