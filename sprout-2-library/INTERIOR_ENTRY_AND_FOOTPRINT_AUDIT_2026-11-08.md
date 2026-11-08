# Interior entry anchor and furniture footprint audit — 2026-11-08

User-approved art: Cute Fantasy exterior, Wooden Interior House interior. This is **technical planning only**, not game construction.

Inspected original uploaded `Wooden Interior House.zip`:
- `examples/example_01.png`: **192×144px**, visible bottom-centre entry.
- `examples/example_02.png`: **164×176px** (width not a multiple of 16).
- `examples/example_03.png`: **144×144px**.
- `examples/example_04.png`: **304×304px**.
- `objects/wooden_furnitures.png`: **272×192px**.
- `tileset/wooden interior/wooden_interior_tileset.png`: **224×112px**.

Private review `Project_Sprout_2_Interior_Anchor_Audit.zip` contains source-only annotated example 01, dimensions CSV, findings. Yellow entrance candidate x=80..112,y=112..128; green **proposed** indoor spawn (96,112), in example-01 pixel coordinates. **Not tested for collision or guaranteed walkability.** The example PNG is a composed illustration, not a ready-made engine tilemap or collision mask.

Implementation plan: hand-define atlas crops and per-object floor-contact/collision footprints; keep doorway trigger separate from decorative house sprite; set scene-specific camera target and release movement controls after transition. Confirm through gameplay tests only after explicit build authorization.

Do not publish source art/contact sheets to public GitHub. Cute Fantasy Free non-commercial/no-redistribution rights remain a public-deployment blocker. Original project untouched.
