# Approved source asset mapping — 2026-11-08

User-approved visual direction: Cute Fantasy outdoor woodland/cottage exterior; Wooden Interior House indoor cottage. **This is a planning inventory, not implementation authorisation.**

Source-only local inventory `Project_Sprout_2_Approved_Asset_Mapping.zip` contains `IMPLEMENTATION_MAPPING.md` and `approved_source_inventory.csv`. Audited 50 PNGs across the two uploaded packages; no original sprites included in public GitHub.

## Source dimensions
- Cute Fantasy: `Tiles/Grass_Middle.png`, `Path_Middle.png`, `Water_Middle.png` each 16×16; `Path_Tile.png`, `Water_Tile.png` 48×96; `Outdoor decoration/House_1_Wood_Base_Blue.png` 96×128; `Oak_Tree.png` 64×80; `Oak_Tree_Small.png` 96×48.
- Wooden Interior House: `tileset/wooden interior/wooden_interior_tileset.png` 224×112; `objects/wooden_furnitures.png` 272×192. These sheets have 16px-grid-compatible dimensions, **but individual furniture objects span multiple cells**.

## Design constraints
- Source-space 16px grid; integer nearest-neighbour rendering; exact crop boundaries and entrance anchors still to verify.
- Treat sprite bounding boxes separately from collision footprints. Exterior/interior camera transition must avoid previously observed snapping/freezing.
- Wildlife candidate Sunnyside bird/fish sprites **not approved**.
- Wooden Interior House EULA permits incorporated game use, not standalone redistribution/AI training. Cute Fantasy Free non-commercial/no-redistribution restriction still blocks unreviewed public deployment.
- No map, gameplay or main branch changes.

Next: source-only sprite crop/anchor atlas and door alignment audit before any construction.
