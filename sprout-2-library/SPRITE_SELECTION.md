# Project Sprout 2.0 — Source-verified woodland selection ledger

**Approval status: ALL PENDING.** This ledger identifies source candidates only. No map or gameplay code has been produced.

## Important verified correction
The supplied GameMaker project has **two native tile sizes**:
- `tilesets/tileset_sunnysideworld/tileset_sunnysideworld.yy`: **16×16**, 64 columns, 4,096 tile IDs. The source sprite is `sprites/spr_tileset_sunnysideworld`.
- `tilesets/tileset_forest/tileset_forest.yy`: **32×32**, 180 tile IDs, forest autotile set `forest_01`. Source sprite is `sprites/spr_tileset_sunnysideworld_forest`.

Both definitions are in `BETA Sunnyside World - Tileset_GameMaker.zip`, under `Sunnyside World - Tileset/`. Do not apply a single universal tile size to both.

## GameMaker-defined autotile groups
`tileset_sunnysideworld.yy` explicitly names: **Land, Building 01, Building 02, Inner Walls, Path 01, Path 02, Path 03, River, Clouds 01, Clouds 02, Cloud Shadow**. This is stronger evidence for usable paths and water than the earlier visual-only inventory. These groups contain 16-entry autotile masks; exact mask orientation and in-game appearance still need visual validation.

## Candidate selection (not approval)

| Feature | Verified source | Native grid | Status |
|---|---|---:|---|
| Land/ground | `tileset_sunnysideworld.yy` → `Land` | 16px | Candidate |
| Paths | same → `Path 01`, `Path 02`, `Path 03` | 16px | Candidate; compare appearances |
| Forest boundary | `tileset_forest.yy` → `forest_01` | 32px | Candidate; test canopy joins |
| Water/river | `tileset_sunnysideworld.yy` → `River` | 16px | Candidate; pond conversion not assumed |
| Cottage exterior | same → `Building 01`, `Building 02` plus `SUNNYSIDE_WORLD_BUILDINGS_V0.01.zip` | 16px / separate atlas | Candidate; choose consistent set |
| Cottage interior walls | same → `Inner Walls` | 16px | **Partial candidate**; no complete furnished interior verified |
| Vegetation/props | `SUNNYSIDE_WORLD_ASSETS_V0.2.zip` and GameMaker sprite assets | mixed | Candidate; individual sprites need manual review |
| Wildlife | GameMaker sprite directory and other packs | mixed | Not yet verified as coherent woodland wildlife |
| Ambient effects | `SUNNYSIDE_WORLD_CHIMNEYSMOKE_v1.0.zip`, `leaves_hit (1).gif` | mixed | Candidate; confirm frame timing |

## Tile coordinate rule
**Validated source indexing:** tile ID `0` is blank. For nonzero tile ID `i`, `x=((i-1)%C)*t`, `y=floor((i-1)/C)*t`, where `C` is the **source PNG's** column count (64 for main, 10 for forest), not GameMaker's packed `out_columns` (64 and 13 respectively). Source texture padding/export atlas border must not be mistaken for grid spacing. Source coordinates should be validated against source sprite and not blindly applied to packed `output_tileset.png`.

## Unresolved
- Large closed pond with every shore direction and corners: **unverified**; `River` does not prove it.
- Furnished matching cottage interior: **unverified**; `Inner Walls` only proves wall transitions.
- Dense forest visuals: `forest_01` confirmed, but assembled forest joins need preview validation.
- Wildlife animations: source-level animation frames and suitability unverified.
- Full newer V2.1 pack absent from this conversation.
- Licensing terms for public redistribution of derived complete galleries unverified.

**Next gate:** user reviews the original atlases and selects preferred `Path 01–03`, forest and cottage styles. No map until approval.

## 2026-11-08 detailed validation

Source PNGs are 1024×1024 (main, 64×64 source cells of 16px) and 320×576 (forest, 10×18 source cells of 32px). There are **183 nonzero autotile entries** across 12 GameMaker-defined groups (with 9 zero/blank entries). A private local review package contains per-group tile sheets labelled with ID and exact source x/y plus a CSV recording dimensions and alpha bounds. These sheets are individual source tiles, **not** proof of seamless assembled joins. The large pond, furnished cottage interior and wildlife remain unresolved. No map created.
